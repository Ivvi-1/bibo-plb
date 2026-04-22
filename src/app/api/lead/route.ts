import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function escapeMarkdown(s: string): string {
  return s.replace(/([_*`\[\]])/g, "\\$1");
}

function trim(s: unknown, max: number): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — настоящий пользователь не заполнит скрытое поле
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = trim(body.name, 200);
  const company = trim(body.company, 200);
  const contact = trim(body.contact, 200);
  const task = trim(body.task, 4000);
  const role = trim(body.role, 50);
  const source = trim(body.source, 50);

  if (!contact || (!name && !company && !task)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const header = source === "p2" ? "🔵 *Новая заявка — BIBO PLB /p2*" : "🟢 *Новая заявка — BIBO PLB*";

  const lines = [
    header,
    "",
    `*Имя:* ${escapeMarkdown(name) || "—"}`,
    `*Компания:* ${escapeMarkdown(company) || "—"}`,
    `*Контакт:* ${escapeMarkdown(contact) || "—"}`,
  ];
  if (role) lines.push(`*Роль:* ${escapeMarkdown(role)}`);
  lines.push(`*Задача:* ${escapeMarkdown(task) || "—"}`);
  lines.push(`*IP:* ${ip}`);

  const text = lines.join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Telegram error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

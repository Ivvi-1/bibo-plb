import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, company, contact, task, role, source } = await req.json();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const header = source === "p2" ? "🔵 *Новая заявка — BIBO PLB /p2*" : "🟢 *Новая заявка — BIBO PLB*";

  const lines = [
    header,
    "",
    `*Имя:* ${name || "—"}`,
    `*Компания:* ${company || "—"}`,
    `*Контакт:* ${contact || "—"}`,
  ];
  if (role) lines.push(`*Роль:* ${role}`);
  lines.push(`*Задача:* ${task || "—"}`);

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

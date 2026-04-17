@AGENTS.md

# BIBO PLB — Документация проекта

> Читать целиком перед началом работы. Актуально на 2026-04-17.

---

## 1. Общее

**Проект:** Лендинг BIBO PLB — AI Product Platform
**Домен:** https://biboplb.pro (live) + https://bibo-plb-production.up.railway.app (Railway default)
**Папка проекта:** `D:\work\bibo-app`
**GitHub:** https://github.com/Ivvi-1/bibo-plb (branch `master`, auto-deploy НЕТ)
**Railway CLI token (user account token):** переменная `RAILWAY_TOKEN` в `D:\work\.claude\secrets.env` (работает и для GraphQL, и для `railway up` через `RAILWAY_API_TOKEN=...`)

**Статус:** актуальный v2-дизайн (нейросеть-созвездие) живёт на корневых URL `/en`, `/ru`, `/uk`. Старый v1-дизайн удалён из прода, его файлы архивированы в `docs/backup/v1-design-2026-04-17/`.

---

## 2. Стек

- **Next.js 16.2.3** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4** (через `@import "tailwindcss"` в `globals.css`, без `tailwind.config.js`)
- **Framer Motion 12** (fade-in через `FadeIn.tsx`)
- **next-intl 4** — локализация EN / RU / UK (роутинг `/en/...`, `/ru/...`, `/uk/...`)
- **next/font/google** — Inter (основной) + Instrument Serif (italic-акценты в заголовках)
- **SVG + CSS** для анимаций созвездия — НЕ Lottie, НЕ GSAP

### Особенности Next.js 16 (легко споткнуться)
- Middleware называется `proxy.ts`, функция — `proxy` (не `default`).
- `output: standalone` несовместим с `next start` — текущий конфиг без standalone.
- Статические страницы генерируются в билд-тайме; `/[locale]` — `ƒ` (dynamic rendering).

---

## 3. Структура репозитория

```
bibo-app/
├── messages/
│   ├── en.json          # только неймспейс "p2" (v1-ключи удалены)
│   ├── ru.json          # то же
│   └── uk.json          # то же
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx    # Inter + Instrument Serif, NextIntlClientProvider, SEO-метаданные
│   │   │   └── page.tsx      # композиция P2-секций (главная)
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.ts  # POST /api/lead → Telegram (принимает role + source)
│   │   ├── globals.css       # Tailwind + p2-токены + @keyframes p2-dash-flow, p2-pulse, p2-marquee
│   │   └── layout.tsx        # root html/body
│   ├── components/
│   │   ├── FadeIn.tsx                     # универсальный fade-in с IntersectionObserver
│   │   └── p2/
│   │       ├── NeonPath.tsx               # переиспользуемая SVG-линия + бегущая точка
│   │       ├── P2Navbar.tsx               # hamburger-меню для мобилки, lang switcher
│   │       ├── P2Hero.tsx                 # созвездие (desktop и mobile SVG), hover-подсветка
│   │       ├── P2Capabilities.tsx         # 4 пиллара (AI / Product / Cloud / Growth)
│   │       ├── P2Products.tsx             # 4 карточки продуктов с внешними ссылками
│   │       ├── P2Process.tsx              # 4-шаговый таймлайн с горизонтальным tracer
│   │       ├── P2Partnership.tsx          # 3 формата сотрудничества
│   │       ├── P2Contact.tsx              # форма → /api/lead с source="p2"
│   │       └── P2Footer.tsx
│   ├── i18n/
│   │   └── routing.ts
│   └── proxy.ts                           # next-intl middleware (proxy, не middleware)
├── public/
├── docs/
│   ├── plans/                             # старые спеки (сохранены)
│   └── backup/v1-design-2026-04-17/       # архив старого дизайна
│       ├── README.md
│       ├── messages/*.json                # полные JSON с v1-ключами
│       └── src/...                        # старые Navbar/Hero/About/.../Footer
├── bibo/                                  # исходное ТЗ клиента
├── i18n.ts                                # next-intl конфиг
├── next.config.ts
├── tsconfig.json                          # exclude: node_modules, docs
└── package.json
```

---

## 4. Дизайн-система v2 (в globals.css)

### CSS-переменные (`:root`)
```css
--p2-bg:         #ffffff;                     /* основной фон */
--p2-bg-soft:    #fafaf7;                     /* фон вторых секций */
--p2-ink:        #0a0a0a;                     /* основной текст */
--p2-ink-2/3/4:  #2a2a2a / #6b6b6b / #9a9a9a; /* текстовая иерархия */
--p2-line:       #e8e6df;                     /* бордеры */
--p2-line-2:     #f1efe8;
--p2-accent:     #2d5bff;                     /* единственный акцент (синий) */
--p2-accent-soft:rgba(45,91,255,.08);
--p2-neon:       #4f7fff;                     /* цвет свечения tracer-точек */
```

### Ключевые классы
- `.p2-body` — базовый body-класс (фон, цвет, letter-spacing)
- `.p2-serif` — Instrument Serif italic (через CSS var `--font-instrument-serif`)
- `.p2-eyebrow` — мелкие uppercase-лейблы над заголовками
- `.p2-neon-glow` — `drop-shadow` для светящихся SVG-точек
- `.p2-tracer-line` / `.p2-base-line` — используются в мелких tracer'ах; в Hero'е tracer-ы inline-стилизованы для точного контроля
- `.p2-card` — карточки с бордером и hover-lift
- `.p2-pulse-ring` — пульсирующее кольцо вокруг хаба
- `.p2-grid-bg` — dotted-pattern фон
- `.p2-spotlight` — radial-gradient подсветка за hero

### Keyframes
- `p2-dash-flow` — прогон stroke-dashoffset для tracer-линий
- `p2-pulse` — масштабирование центрального узла
- `p2-marquee` — (зарезервирован, сейчас не используется)

### Типографика
- **Inter** 400/500/600/700 (кириллица + латиница)
- **Instrument Serif** 400 italic — только для акцентных слов в заголовках (`p2.hero.headline_b`)

---

## 5. Ключевые страницы и секции

Все секции в одном `<main>` (`src/app/[locale]/page.tsx`):

1. **P2Navbar** — fixed header с `backdrop-blur`; на <md — `<button aria-label="Toggle menu">` + drawer с nav/CTA/lang switcher.
2. **P2Hero** — главная визуальная "фишка":
   - Заголовок: `headline_a` + Instrument Serif italic `headline_b` (синий).
   - SVG-созвездие:
     - **Desktop SVG** (viewBox `0 0 1000 500`): 4 shipped-продукта по углам + 8 named upcoming ghosts + ~8 мелких звёзд + dotted constellation-линки + медленные communication pulses между узлами + slow outer-ring tracer.
     - **Mobile SVG** (viewBox `0 0 420 540`): только 4 upcoming (HR, Legal, Health, Retail) ромбом вокруг хаба, 4 unnamed stars, более крупные подписи.
   - Hover (или tap) на shipped-продукт (`Reputar`, `Mooly`, `Gedell`, `Lem`) — подсвечивается его линия к хабу, имя становится синим, halo вокруг точки увеличивается.
3. **P2Capabilities** — 4 пиллара с SVG-иконками.
4. **P2Products** — 4 ссылочные карточки на внешние домены продуктов.
5. **P2Process** — 4 шага (Discover → Design → Ship → Scale) с пунктирной линией-хронологией и медленным синим пульсом.
6. **P2Partnership** — 3 формата работы (Service / Founding / Co-invest).
7. **P2Contact** — форма `name / company / contact / role-pills / message` → `POST /api/lead` с `source: "p2"`.
8. **P2Footer** — логотип + email + копирайт.

### Четыре продукта (shipped)
| Ключ | Имя | Тег (i18n) | Внешний домен |
|---|---|---|---|
| reputar | Reputar | Reputation AI | https://reputar.tech |
| mooly   | Mooly   | Real Estate AI | https://mooly.tech |
| gedell  | Gedell  | Investment AI | https://gedell.tech |
| lem     | Lem     | Group Monitoring AI | https://lem.in.ua |

### Восемь upcoming (в созвездии — только названия, сайтов ещё нет)
HR AI, Legal AI, Logistics AI, Finance AI, Health AI, Retail AI, Travel AI, Education AI.

---

## 6. API: `/api/lead`

**Файл:** `src/app/api/lead/route.ts`
**Метод:** `POST`
**Body:** `{ name, company, contact, task, role?, source? }`

Отправляет сообщение в Telegram-бота:
- Если `source === "p2"` — заголовок `🔵 Новая заявка — BIBO PLB /p2`
- Иначе — `🟢 Новая заявка — BIBO PLB`
- Строка `Роль:` добавляется, если поле заполнено
- chat_id фиксированный через env (не в коде)

**Env (Railway):**
- `TELEGRAM_BOT_TOKEN` — токен `dubai-re-bot`
- `TELEGRAM_CHAT_ID` — `718191655`

---

## 7. Локализация (next-intl)

- 3 локали: `en`, `ru`, `uk` (дефолт — `en` после апрельской правки, см. git log)
- Все ключи внутри одного `p2` namespace (`p2.nav`, `p2.hero`, …, `p2.footer`)
- Компоненты зовут `useTranslations("p2.X")`
- Переключение языка: в `P2Navbar` собирает новый pathname, заменяя первый сегмент на код локали
- **Чтобы добавить новый язык:** создать `messages/xx.json` (скопировать `en.json`), добавить `xx` в `src/i18n/routing.ts`, перевести все ключи

---

## 8. Railway-деплой

**Project ID:** `f56833d5-d507-426a-a977-df271263114e`
**Service ID (bibo-plb):** `e62fb68b-f1f6-452f-b687-a852e0ae0fd1`
**Environment ID:** `7dd31ed3-8569-4658-8f1a-4ea0ccad45f4`
**Dashboard:** https://railway.com/project/f56833d5-d507-426a-a977-df271263114e

**Auto-deploy из GitHub НЕ настроен** — деплоить руками через CLI:
```bash
cd D:/work/bibo-app
RAILWAY_API_TOKEN=$(grep '^RAILWAY_TOKEN=' D:/work/.claude/secrets.env | cut -d= -f2) \
  railway up --service e62fb68b-f1f6-452f-b687-a852e0ae0fd1 --detach
```

> ВАЖНО: для `railway up` использовать env-var `RAILWAY_API_TOKEN` (не `RAILWAY_TOKEN`), иначе CLI пишет `Invalid RAILWAY_TOKEN`.

### Переменные окружения в Railway
| Переменная | Значение |
|---|---|
| TELEGRAM_BOT_TOKEN | токен dubai-re-bot |
| TELEGRAM_CHAT_ID | 718191655 |

### Polling статуса деплоя через GraphQL
```bash
curl -s -X POST https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"query { deployment(id: \"<DEPLOY_ID>\") { status } }"}'
```

---

## 9. DNS / Домен

**Регистратор:** NIC.UA
**Логин:** `1020038@gmail.com`
**Пароль:** `181183Dge`
**Auth-code (для переноса):** `mrr@nWZM02_Wgea1`

### Текущие DNS-записи (2026-04-17, после миграции target'а)
| Тип | Имя | Значение |
|---|---|---|
| CNAME | @ | `x7yq4w6c.up.railway.app.` |
| TXT | _railway-verify | `railway-verify=8126c991355196864d02b84146ad602025a0182becd53439389f1613e776135d` |

### Railway custom domains (service bibo-plb)
- `biboplb.pro` → status: `VALID`, target `x7yq4w6c.up.railway.app`

> **Если Railway попросит сменить target ещё раз** — поменять CNAME `@` в NIC.UA на новый `XXXX.up.railway.app.` (точка обязательна). Сайт работает и во время пропагейшна (старый target обычно остаётся живым ~часы).

---

## 10. Локальная разработка

```bash
cd D:/work/bibo-app
npm run dev
```
Открыть http://localhost:3000/en (или `/ru`, `/uk`).

Если после очистки `.next/` dev-сервер упал с `ENOENT: routes-manifest.json` — перезапустить `npm run dev`.

### Продакшн-билд локально
```bash
npx next build
# затем
npm start
```

### Type-check без билда
```bash
npx tsc --noEmit
```

---

## 11. Архив v1-дизайна

**Папка:** `docs/backup/v1-design-2026-04-17/`
**Что внутри:**
- `src/components/` — старые Navbar / Hero / About / ValueProps / Models / Products / Process / Trust / ContactForm / Footer
- `src/app/locale/page.tsx` — старый композер главной
- `messages/*.json` — полные i18n-файлы с v1-ключами (`nav`, `hero`, `about`, `value`, …)
- `README.md` — инструкция по восстановлению

Папка исключена из `tsconfig.json` (`exclude: ["node_modules", "docs"]`), чтобы TS-проверка не требовала `@/components/Navbar` и т.п.

**Git history** остаётся основным источником правды (коммит `b998ef5` — миграция v2 в корень). Архив — просто удобный snapshot.

---

## 12. Что сделано в сессии 2026-04-17

### Mooly/Raven-правки на v1 (раньше в тот же день)
- В `Products.tsx` / `Footer.tsx`: вкладка **Raven → Lem** со ссылкой на `https://lem.in.ua`, карточки сделаны полностью кликабельными (не только иконка).
- В `messages/{en,ru,uk}.json`: ключи `raven_*` → `lem_*` + актуальные описания (TG/WA group monitoring).
- Коммит `2b3df79`.

### Новый дизайн `/p2` (v2)
- Создан `src/components/p2/` (8 компонентов) + отдельная подстраница `src/app/[locale]/p2/`.
- i18n-namespace `p2.*` добавлен во все 3 локали.
- `/api/lead` научился принимать `role` и `source` — лиды с нового лендинга помечаются `🔵 /p2`.
- Hero-созвездие: 4 shipped + 8 upcoming, hover-подсветка на shipped-узлах, slow-ring tracer, communication pulses между ghost-узлами.
- Mobile-версия: отдельный SVG viewBox, hamburger-меню drawer, адаптивные паддинги/типографика.
- Темп tracer'ов специально замедлен (dash-flow 16–34s) — пользователь хотел "медленные тусклые линии, как у langchain.com".
- Hover на `Reputar / Mooly / Gedell / Lem` — подсветка пути к хабу, имя становится синим.
- Несколько итераций по обратной связи: constellation с ghost-продуктами → calmer tracers → hover-highlight → mobile.

### Миграция v2 в корень
- `/[locale]/page.tsx` и `/[locale]/layout.tsx` переведены на P2-компоненты + Instrument Serif.
- `/[locale]/p2/` удалён.
- Старые v1-компоненты и i18n-ключи удалены, сохранены в `docs/backup/v1-design-2026-04-17/`.
- `tsconfig.json`: `exclude` расширен на `docs`.
- Коммит `b998ef5`, задеплоено.

### DNS
- target `biboplb.pro` обновлён с `e8a48mut.up.railway.app.` → `x7yq4w6c.up.railway.app.` по запросу Railway. SSL статус `VALID`, даунтайма не было.

---

## 13. Backlog / что надо доделать

### Обязательные — ✅ все сделаны 2026-04-17
- [x] **og:image** — `src/app/[locale]/opengraph-image.tsx` генерит 1200×630 PNG через `ImageResponse` для каждой локали. Заголовок и подпись берутся из `LOCALE_COPY`.
- [x] **Favicon** — `src/app/icon.svg` + `src/app/apple-icon.svg`, starburst-стиль (тёмный квадрат + белый вложенный + синяя точка).
- [x] **Canonical + hreflang** — в `[locale]/layout.tsx` через `generateMetadata` + `alternates.canonical` + `alternates.languages` (включая `x-default`). Отдельные тексты title/description для каждой локали в `LOCALE_COPY`.
- [x] **sitemap.xml + robots.txt** — `src/app/sitemap.ts` и `src/app/robots.ts` через MetadataRoute-конвенции. Автогенерятся в билде.
- [x] **Аналитика** — Plausible-скрипт в `[locale]/layout.tsx`, гейтится через `process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN`. Чтобы включить: зарегистрироваться на plausible.io, добавить сайт `biboplb.pro`, выставить в Railway `NEXT_PUBLIC_ANALYTICS_DOMAIN=biboplb.pro`, редеплой. Без этой env-переменной скрипт не грузится.
- [x] **JSON-LD Organization** (бонусом) — `schema.org/Organization` в `<head>` со ссылками на 4 продукта (reputar / mooly / gedell / lem). Улучшает богатые сниппеты в Google.

### Желательные
- [ ] Cookie/GDPR баннер (особенно для UA-пользователей).
- [ ] Автодеплой из GitHub — сейчас `repoTriggers.edges: []`. Привязать репо к service в Railway dashboard, чтобы `git push` сам триггерил билд.
- [ ] Rate-limit на `/api/lead` (сейчас можно сломать телеграм-квоту ботом — спамом). Простое решение: IP-based rate-limit через Upstash Redis.
- [ ] Валидация входных полей формы (сейчас пустые значения проходят насквозь в Telegram).
- [ ] Honeypot-поле против спам-ботов.
- [ ] Страницы `/privacy`, `/terms` — сейчас нет, для юзер-флоу инвесторов/партнёров желательны.

### Косметика / полировка
- [ ] На мобилке в контактной форме tap на role-pill иногда зумит страницу в Safari (font-size: 13px при ширине input ниже 16px). Поднять до 16px или добавить `meta viewport user-scalable=no` (не делать второе — accessibility).
- [ ] Пустые labels `<text>…` в ghost-узлах Hero'е читаются screen-reader'ом как ничего — норма, но можно добавить `aria-hidden` на мелкие unnamed stars.
- [ ] В `P2Navbar` при открытом мобильном меню `body.overflow = hidden` — сейчас работает, но если пользователь переключит ориентацию, может остаться заблокированным. Протестировать.

### Возможные следующие большие задачи
- [ ] Блог / case-studies на отдельном роуте (`/case/mooly`, `/case/lem`) — для SEO и разогрева лидов.
- [ ] Stripe-интеграция, если будет партнёрский self-serve апгрейд.
- [ ] Локаль AR / FR, если пойдут лиды из региона.

---

## 14. Быстрые команды (cheat sheet)

```bash
# Разработка
cd D:/work/bibo-app && npm run dev

# Type-check
npx tsc --noEmit

# Билд (обязательно перед деплоем в неуверенных случаях)
npx next build

# Деплой
RAILWAY_API_TOKEN=$(grep '^RAILWAY_TOKEN=' D:/work/.claude/secrets.env | cut -d= -f2) \
  railway up --service e62fb68b-f1f6-452f-b687-a852e0ae0fd1 --detach

# Коммит + пуш (деплой через CLI, не через авто-деплой)
git add <конкретные файлы>
git commit -m "..."
git push origin master
```

### ⚠️ Важные запреты
- **НИКОГДА** не делать `git add -A` или `git add .` — защита от случайного коммита `D:/work/.claude/secrets.env`. Добавлять только по конкретным путям.
- **НИКОГДА** не коммитить `secrets.env`.
- При работе с DNS (NIC.UA) — trailing dot в CNAME обязательна.
- Не использовать `output: standalone` в `next.config.ts` — несовместимо с `next start`.

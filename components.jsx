/* global React */
const { useState } = React;

// ---------- Shared bits ----------
const Overline = ({ children, className = '' }) => (
  <div className={`ovl ${className}`}>{children}</div>
);
const Arr = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Btn = ({ variant = 'primary', size = 'md', children, ...p }) => (
  <button className={`btn btn-${variant} btn-${size}`} {...p}>{children}</button>
);

// Lucide-style inline icons (stroke 1.5px). Only utility shapes.
const I = {
  grid: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  store: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l1.5-3h15L21 7"/><path d="M3 7v13h18V7"/><path d="M3 7c0 2 1.5 3 3 3s3-1 3-3 1.5 3 3 3 3-1 3-3 1.5 3 3 3 3-1 3-3"/></svg>,
  list: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  users: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  out: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>,
  doc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>,
  book: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  code: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  bell: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  panel: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>,
};

// ---------- Nav ----------
function Nav() {
  return (
    <nav className="nav">
      <span className="logo">oplatum<span className="dot">.</span></span>
      <div className="nav-links">
        <a className="link active">Продукт</a>
        <a className="link">Индустрии</a>
        <a className="link">Тарифы</a>
        <a className="link">Документация</a>
      </div>
      <div className="nav-spacer" />
      <span className="ghost-link">Войти</span>
      <Btn>Подключиться <Arr /></Btn>
    </nav>
  );
}

// ---------- Admin Mockup (replaces QR block) ----------
// Stylized HTML/CSS reproduction of the Oplatum admin dashboard.
// All numbers are placeholders.
function AdminMockup() {
  return (
    <div className="admin-mock">
      <div className="admin-window">
        {/* SIDEBAR */}
        <aside className="adm-side">
          <div className="adm-side-logo">oplatum</div>

          <div className="adm-group-h">Основное</div>
          <div className="adm-nav-item active">{I.grid}<span>Дашборд</span></div>
          <div className="adm-nav-item">{I.store}<span>Мой мерчант</span></div>
          <div className="adm-nav-item">{I.list}<span>Транзакции</span></div>
          <div className="adm-nav-item">{I.users}<span>Клиенты</span></div>

          <div className="adm-group-h">Финансы</div>
          <div className="adm-nav-item">{I.out}<span>Выплаты</span></div>
          <div className="adm-nav-item">{I.doc}<span>Отчёты</span></div>

          <div className="adm-group-h">Разработчикам</div>
          <div className="adm-nav-item">{I.book}<span>Руководство</span></div>
          <div className="adm-nav-item">{I.code}<span>API Справочник</span></div>
        </aside>

        {/* MAIN */}
        <div className="adm-main">
          <header className="adm-top">
            <div className="adm-top-l">
              <span className="adm-toggle">{I.panel}</span>
              <span className="adm-top-title">Дашборд</span>
            </div>
            <div className="adm-top-r">
              <span className="adm-bell">{I.bell}<span className="adm-dot" /></span>
            </div>
          </header>

          <div className="adm-content">
            <h2 className="adm-h2">Дашборд</h2>
            <div className="adm-sub">Обзор ваших платежей и последняя активность</div>

            <div className="adm-tabs">
              <span className="adm-tab">Сегодня</span>
              <span className="adm-tab">7 дней</span>
              <span className="adm-tab active">30 дней</span>
              <span className="adm-tab">Всё время</span>
            </div>

            <div className="adm-grid">
              <div className="adm-cell">
                <div className="adm-cell-h">Оборот (Gross)</div>
                <div className="adm-cell-num blue">1 247 891 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Все входящие платежи</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Возвраты</div>
                <div className="adm-cell-num">18 320 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Сумма возвратов</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Чистый объём (Net)</div>
                <div className="adm-cell-num">1 229 571 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Gross минус возвраты</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Транзакции</div>
                <div className="adm-cell-num">142</div>
                <div className="adm-cell-cap">138 завершено</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Ошибки / Ожидание</div>
                <div className="adm-cell-num">4 / 2</div>
                <div className="adm-cell-cap">Требуют внимания</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Комиссия за период</div>
                <div className="adm-cell-num">49 916 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Удержано из завершённых</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* stylized mockup, replace with real screenshot when data is populated */}
      <div className="admin-mock-note">// stylized mockup, replace with real screenshot</div>
    </div>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <Overline>Платежи · Россия</Overline>
        <h1>
          Платёжная инфраструктура с <span className="accent-blue">settle 1 день</span>
        </h1>
        <p className="lead">
          Приём по СБП, СБП-подписки, оплата по QR и USDT-расчёты для цифровых продуктов. Лицензированный российский процессор НКО «МОБИ.Деньги», ЦБ РФ №3523-К.
        </p>
        <div className="cta-row">
          <Btn size="lg">Подключиться <Arr /></Btn>
          <Btn variant="secondary" size="lg">Документация</Btn>
        </div>
        <div className="hero-meta">
          <span className="hero-meta-num">от 4%</span>
          <span className="hero-meta-lbl">базовая ставка<br/>с первого платежа</span>
          <span className="divider" />
          <span className="hero-meta-num">1 день</span>
          <span className="hero-meta-lbl">settlement<br/>в RUB или USDT</span>
        </div>
      </div>
      <AdminMockup />
    </section>
  );
}

// ---------- Trust strip ----------
function TrustStrip() {
  return (
    <section className="trust">
      <div className="metric-card">
        <div className="ovl-m">Ставка</div>
        <div className="num blue">от 4%</div>
        <div className="lbl">Базовая ставка<br/>с первого платежа</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Settlement</div>
        <div className="num">1 день</div>
        <div className="lbl">До зачисления<br/>на ваш счёт</div>
      </div>
      <div className="metric-card">
        <div className="ovl-m">ЦБ РФ</div>
        <div className="num">3523-К</div>
        <div className="lbl">Лицензия НКО<br/>«МОБИ.Деньги»</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Валюты</div>
        <div className="num">RUB · USDT</div>
        <div className="lbl">Settlement в рублях<br/>и стейблах</div>
      </div>
    </section>
  );
}

// ---------- Cases (testimonial + logos) ----------
// placeholder testimonial + logos, replace when team supplies real ones
function CasesStrip() {
  const logos = ['AcmeBot', 'PixelLab', 'KodHaus', 'Студия 4', 'MetaShop', 'GameForge'];
  return (
    <section className="section">
      <Overline>01 · Кейсы</Overline>
      <h2>Уже принимают платежи через Oplatum</h2>
      <div className="quote-card">
        <div className="quote-mark">«</div>
        <p className="quote-body">Подключили СБП-подписки за день, settlement пришёл на следующее утро. Поддержка 4 часа в договоре — реально работает.</p>
        <div className="quote-author">
          <span className="quote-name">Анна Кн.</span>
          <span className="quote-role">CEO digital-school</span>
        </div>
      </div>
      <div className="logo-strip">
        {logos.map((l, i) => <span key={i} className="logo-mark">{l}</span>)}
      </div>
    </section>
  );
}

// ---------- Industries ----------
// placeholder metrics, replace with real numbers from Oplatum team
const INDUSTRIES = [
  { n: '02', tag: 'Telegram-экономика', h: 'Подписки и приём платежей в ботах', problem: 'Нет легального способа провести подписку резидента РФ через Stripe.', solution: 'СБП-подписки с settlement в RUB на расчётный счёт.', metric: '+38%', metricLabel: 'конверсия в оплату' },
  { n: '03', tag: 'Gaming', h: 'Микроплатежи и продажа внутриигровых паков', problem: 'Платёжные провайдеры блокируют тематику и удерживают средства.', solution: 'Tolerant-acquiring: gaming, лутбоксы, премиум-паки.', metric: '< 2 сек', metricLabel: 'до подтверждения' },
  { n: '04', tag: 'EdTech', h: 'Курсы, подписки, рассрочка', problem: 'Сложно собрать платежи за длинные продукты с возвратами.', solution: 'Подписки + сплит-платежи + автоматический рефанд.', metric: '0.4%', metricLabel: 'rate возвратов' },
  { n: '05', tag: 'SaaS', h: 'Recurring billing для B2B-инструментов', problem: 'Карты не подходят для долгосрочных корпоративных подписок.', solution: 'СБП-подписки с актом и счётом-фактурой автоматом.', metric: '24 ч', metricLabel: 'до интеграции' },
  { n: '06', tag: 'Иностранные юрлица', h: 'USDT settlement для не-резидентов', problem: 'Иностранцу нельзя завести расчётный счёт в РФ.', solution: 'Settle в USDT на ваш кошелёк. Договор — лицензированный процессор.', metric: '0.8%', metricLabel: 'комиссия конвертации' },
];

function IndustryCard({ item }) {
  return (
    <div className="industry-card">
      <Overline>{item.n} · {item.tag}</Overline>
      <h3>{item.h}</h3>
      <div className="industry-row"><span className="k">Проблема</span><span className="v">{item.problem}</span></div>
      <div className="industry-row"><span className="k">Решение</span><span className="v">{item.solution}</span></div>
      <div className="industry-metric">
        <span className="num">{item.metric}</span>
        <span className="lbl">{item.metricLabel}</span>
      </div>
    </div>
  );
}

function IndustryGrid() {
  return (
    <section className="section">
      <Overline>02 · Индустрии</Overline>
      <h2>Решения для пяти ниш цифровой экономики</h2>
      <p className="sub">Один процессор, разные сценарии расчёта. Подбираем условия под ваш бизнес.</p>
      <div className="industry-grid">
        {INDUSTRIES.map((it, i) => <IndustryCard key={i} item={it} />)}
      </div>
    </section>
  );
}

// ---------- Calculator ----------
function Calculator() {
  const [val, setVal] = useState(2500000);
  const tier = val < 5_000_000 ? 0 : val < 20_000_000 ? 1 : val < 50_000_000 ? 2 : 3;
  const rateLabel = ['от 4%', 'от 4%', 'индивидуально', 'индивидуально'][tier];
  const tierNote = [
    'Базовая ставка для всех новых клиентов',
    'Базовая ставка с первого платежа',
    'Условия согласуем с менеджером',
    'Персональные условия для крупного оборота',
  ][tier];
  const fmt = (n) => '₽ ' + n.toLocaleString('ru-RU').replace(/,/g, ' ');

  return (
    <div className="calc">
      <h3>Рассчитайте условия</h3>
      <div className="calc-sub">Базовая ставка — от 4%. Для крупных оборотов согласуем индивидуально.</div>
      <div className="calc-label">Месячный оборот, ₽</div>
      <input className="calc-input" type="text" value={fmt(val)} onChange={(e) => setVal(parseInt(e.target.value.replace(/\D/g, '')) || 0)} />
      <div className="calc-scale">
        {[0,1,2,3].map(i => (
          <div key={i} className={`step ${i < tier ? 'passed' : i === tier ? 'active' : ''}`} />
        ))}
      </div>
      <div className="calc-ticks">
        <span>до 5М</span><span>5–20М</span><span>20–50М</span><span>от 50М</span>
      </div>
      <div className="calc-out">
        <span className="lbl">Ваша ставка</span>
        <span className="rate">{rateLabel}</span>
      </div>
      <div className="calc-note">{tierNote}</div>
      <Btn size="lg">Получить условия <Arr /></Btn>
    </div>
  );
}

function PricingSection() {
  return (
    <section className="section two-col">
      <div>
        <Overline>03 · Тарифы</Overline>
        <h2>Прозрачно и без скрытых строк</h2>
        <p className="sub">Базовая ставка — от 4% с первого платежа. Для оборотов от 20 миллионов в месяц условия согласуем индивидуально. Settlement всегда в течение одного дня.</p>
        <ul className="bullets">
          <li>Прозрачная ставка от 4% — публичная сетка</li>
          <li>Договор — НКО «МОБИ.Деньги», ЦБ РФ</li>
          <li>Возврат, рефанд, диспуты — автоматически</li>
        </ul>
      </div>
      <Calculator />
    </section>
  );
}

// ---------- Telegram bot block ----------
function TelegramBlock() {
  return (
    <section className="section">
      <div className="tg-block">
        <div className="chat">
          <div className="chat-head">
            <div className="avatar">o</div>
            <div>
              <div className="name">Oplatum bot</div>
              <div className="meta-x">online</div>
            </div>
          </div>
          <div className="msg msg-bot">Подключим за 24 часа. Какой у вас оборот?</div>
          <div className="msg msg-me">~ 8М ₽/мес</div>
          <div className="msg msg-bot">Базовая ставка от 4%. Открыть условия?</div>
          <div className="msg msg-bot pay">Открыть → @oplatum_bot</div>
        </div>
        <div>
          <Overline>04 · Onboarding · Telegram</Overline>
          <h3>Подключение через бота</h3>
          <p className="lead">Пишете в @oplatum_bot — менеджер открывает условия за один день. Без длинных форм и встреч.</p>
          <Btn size="lg">Открыть бота <Arr /></Btn>
        </div>
      </div>
    </section>
  );
}

// ---------- Code + AI ----------
function DevAi() {
  return (
    <section className="section two-col">
      <div className="codeblock">
        <div className="codeblock-head">
          <div className="dots">
            <div className="dot" style={{background:'#FF5F57'}}/>
            <div className="dot" style={{background:'#FEBC2E'}}/>
            <div className="dot" style={{background:'#28C840'}}/>
          </div>
          <span className="filename">create_payment.ts</span>
          <button className="copy">copy</button>
        </div>
        <pre className="codeblock-body">
<span className="com">{`// Создаём платёж через СБП`}</span>{'\n'}
<span className="fn">const</span>{` payment = `}<span className="fn">await</span>{` oplatum.payments.`}<span className="fn">create</span>{`({\n`}
{`  `}<span className="key">amount</span>{`: `}<span className="num">12500</span>{`,\n`}
{`  `}<span className="key">currency</span>{`: `}<span className="str">"RUB"</span>{`,\n`}
{`  `}<span className="key">method</span>{`: `}<span className="str">"sbp"</span>{`,\n`}
{`  `}<span className="key">description</span>{`: `}<span className="str">"Подписка Pro"</span>{`,\n`}
{`  `}<span className="key">return_url</span>{`: `}<span className="str">"https://app.example.ru/ok"</span>{`\n`}
{`});`}
        </pre>
      </div>
      <div>
        <Overline>05 · Dev / AI</Overline>
        <h2>API и MCP-сервер для агентов</h2>
        <p className="sub">REST + webhooks для команды разработки. MCP-сервер для Claude и других агентов — пусть они интегрируют сами.</p>
        <div className="cta-row">
          <Btn>Документация <Arr /></Btn>
          <Btn variant="ghost">MCP-эндпоинт →</Btn>
        </div>
      </div>
    </section>
  );
}

// ---------- Roadmap ----------
function Roadmap() {
  const items = ['Карты', 'Mass payouts', 'MCP-сервер для AI-агентов', 'Telegram Mini App native', 'Multi-currency settlement'];
  return (
    <section className="section">
      <Overline>06 · Roadmap</Overline>
      <h2>Что готовим в ближайшие месяцы</h2>
      <p className="sub">Сейчас — СБП и СБП-подписки с settle 1 день.</p>
      <div className="roadmap-chips">
        {items.map((it, i) => <span key={i} className="roadmap-chip">{it}</span>)}
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const FAQS = [
  { q: 'Кто несёт лицензионную ответственность?', a: 'НКО «МОБИ.Деньги», ЦБ РФ №3523-К. Oplatum — продуктовый и технологический слой поверх процессора. Все платежи проходят по 161-ФЗ.' },
  { q: 'Можно ли settle в USDT для иностранного юрлица?', a: 'Да. Договор заключается с лицензированным процессором, settlement приходит на ваш USDT-кошелёк. Комиссия конвертации — 0.8%.' },
  { q: 'Сколько времени занимает интеграция?', a: 'От одного дня. SDK для Node, Python, PHP. Готовые модули для Tilda, Bitrix, custom-стэков.' },
  { q: 'Какая ставка комиссии?', a: 'Базовая публичная ставка — от 4% с первого платежа. Для оборотов от 20 миллионов рублей в месяц условия согласуем индивидуально.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <Overline>07 · Вопросы</Overline>
      <h2>Часто спрашивают</h2>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <div className="faq-head">
              <span className="q">{f.q}</span>
              <span className="toggle">{open === i ? '×' : '+'}</span>
            </div>
            {open === i && <div className="faq-body">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="logo">oplatum<span className="dot">.</span></div>
          <div className="tag">Платёжная инфраструктура для цифровых товаров и Telegram-экономики.</div>
        </div>
        <div>
          <div className="col-h">Продукт</div>
          <a>СБП-приём</a><a>СБП-подписки</a><a>USDT settlement</a><a>API</a>
        </div>
        <div>
          <div className="col-h">Индустрии</div>
          <a>Telegram</a><a>Gaming</a><a>EdTech</a><a>SaaS</a>
        </div>
        <div>
          <div className="col-h">Документация</div>
          <a>Quickstart</a><a>Reference</a><a>Webhooks</a><a>Changelog</a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 Oplatum · НКО «МОБИ.Деньги», ЦБ РФ №3523-К</span>
        <span>hello@oplatum.ru</span>
      </div>
    </footer>
  );
}

// ---------- App ----------
function App() {
  return (
    <div className="page">
      <Nav />
      <Hero />
      <TrustStrip />
      <CasesStrip />
      <IndustryGrid />
      <PricingSection />
      <TelegramBlock />
      <DevAi />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

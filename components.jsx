/* global React, ReactDOM */
const { useState, useEffect } = React;

// ---------- Shared bits ----------
const scrollToApply = (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById('apply');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Overline = ({ children, className = '' }) => (
  <div className={`ovl ${className}`}>{children}</div>
);
const Arr = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Btn = ({ variant = 'primary', size = 'md', children, onClick, ...p }) => (
  <button className={`btn btn-${variant} btn-${size}`} onClick={onClick} {...p}>{children}</button>
);
// Convenience CTA — always scrolls to apply form
const CtaApply = ({ size = 'md', variant = 'primary', children = 'Подключиться' }) => (
  <Btn size={size} variant={variant} onClick={scrollToApply}>{children} <Arr /></Btn>
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
const scrollToId = (id) => (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <span className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{cursor: 'pointer'}}>oplatum<span className="dot">.</span></span>
      <div className="nav-links">
        <a className="link" onClick={scrollToId('product')}>Продукт</a>
        <a className="link" onClick={scrollToId('industries')}>Индустрии</a>
        <a className="link" onClick={scrollToId('pricing')}>Тарифы</a>
        <a className="link" onClick={scrollToId('docs')}>Документация</a>
      </div>
      <div className="nav-spacer" />
      <span className="ghost-link" onClick={scrollToApply}>Войти</span>
      <CtaApply />
    </nav>
  );
}

// ---------- Admin Mockup ----------
function AdminMockup() {
  return (
    <div className="admin-mock">
      <div className="admin-window">
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
            <div className="adm-sub">Обзор ваших платежей за период</div>

            <div className="adm-tabs">
              <span className="adm-tab">Сегодня</span>
              <span className="adm-tab">7 дней</span>
              <span className="adm-tab active">30 дней</span>
              <span className="adm-tab">Всё время</span>
            </div>

            <div className="adm-grid">
              <div className="adm-cell">
                <div className="adm-cell-h">Оборот</div>
                <div className="adm-cell-num blue">1 247 891 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Все входящие платежи</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Возвраты</div>
                <div className="adm-cell-num">18 320 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Сумма возвратов</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Чистый объём</div>
                <div className="adm-cell-num">1 229 571 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">Оборот минус возвраты</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Транзакции</div>
                <div className="adm-cell-num">142</div>
                <div className="adm-cell-cap">138 завершено</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">В ожидании</div>
                <div className="adm-cell-num">4 / 2</div>
                <div className="adm-cell-cap">Требуют внимания</div>
              </div>
              <div className="adm-cell">
                <div className="adm-cell-h">Комиссия</div>
                <div className="adm-cell-num">49 916 <span className="cur">RUB</span></div>
                <div className="adm-cell-cap">За завершённые платежи</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-mock-note">// stylized mockup</div>
    </div>
  );
}

// ---------- Hero ----------
function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <Overline>Платежи · Россия и за её пределами</Overline>
        <h1>
          Платёжная инфраструктура с зачислением <span className="accent-blue">за 1 день</span>
        </h1>
        <p className="lead">
          Принимайте оплату по СБП, оформляйте подписки и получайте расчёты в&nbsp;USDT. Лицензированный российский процессор НКО «МОБИ.Деньги», ЦБ РФ&nbsp;№3523-К.
        </p>
        <div className="cta-row">
          <CtaApply size="lg">Подключиться</CtaApply>
          <Btn variant="secondary" size="lg" onClick={scrollToApply}>Документация</Btn>
        </div>
        <div className="hero-meta">
          <span className="hero-meta-num">от 4%</span>
          <span className="hero-meta-lbl">комиссия<br/>при больших оборотах</span>
          <span className="divider" />
          <span className="hero-meta-num">1 день</span>
          <span className="hero-meta-lbl">зачисление<br/>в RUB или USDT</span>
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
        <div className="ovl-m">Комиссия</div>
        <div className="num blue">4–6%</div>
        <div className="lbl">в зависимости<br/>от оборота</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Зачисление</div>
        <div className="num">1 день</div>
        <div className="lbl">в рублях<br/>или USDT</div>
      </div>
      <div className="metric-card">
        <div className="ovl-m">Лицензия ЦБ РФ</div>
        <div className="num">3523-К</div>
        <div className="lbl">НКО<br/>«МОБИ.Деньги»</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Запуск</div>
        <div className="num">3 дня</div>
        <div className="lbl">от заявки<br/>до первого платежа</div>
      </div>
    </section>
  );
}

// ---------- Advantages ----------
const ADVANTAGES = [
  { h: 'Лицензированный процессор', body: 'Договор с НКО «МОБИ.Деньги», ЦБ РФ №3523-К. Платежи проходят по 161-ФЗ.' },
  { h: 'Зачисление за 1 день', body: 'Получайте деньги в рублях или USDT на следующий день после оплаты.' },
  { h: 'СБП-подписки', body: 'Рекуррентные списания через walletType:2 в боевом контуре.' },
  { h: 'USDT для нерезидентов', body: 'Иностранному юрлицу не нужен расчётный счёт в РФ — расчёты приходят на USDT-кошелёк.' },
  { h: 'Прозрачные тарифы', body: '4 уровня ставок от 6% до 4% по обороту. Все ставки опубликованы и фиксируются в договоре.' },
  { h: 'Персональный менеджер', body: 'От заявки до первого платежа и дальше — один менеджер на стороне Oplatum.' },
];

function Advantages() {
  return (
    <section className="section" id="product">
      <Overline>01 · Что вы получаете</Overline>
      <h2>Регулируемая инфраструктура с прозрачными правилами</h2>
      <p className="sub">Для цифровых товаров, Telegram-экономики, gaming и EdTech.</p>
      <div className="adv-grid">
        {ADVANTAGES.map((it, i) => (
          <div key={i} className="adv-card">
            <div className="adv-num">0{i+1}</div>
            <h3>{it.h}</h3>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Process (5 steps, 3 days) ----------
const STEPS = [
  { h: 'Оставить заявку', body: 'Короткая форма или Telegram-бот.' },
  { h: 'KYB', body: 'Собираем документы юрлица для лицензированного процессора. Занимает до 3 дней.' },
  { h: 'Песочница', body: 'Выдаём тестовые ключи и Postman-коллекцию для интеграции.' },
  { h: 'Подключение', body: 'Помогаем с интеграцией, проверяем webhooks и сценарии.' },
  { h: 'Приём платежей', body: 'Переводим в продакшн.' },
];

function ProcessSteps() {
  return (
    <section className="section">
      <Overline>02 · Как мы работаем</Overline>
      <h2>От заявки до первого платежа — обычно 3 дня</h2>
      <p className="sub">На всём процессе с вами один менеджер на стороне Oplatum.</p>
      <div className="steps-grid">
        {STEPS.map((s, i) => (
          <div key={i} className="step-card">
            <div className="step-num">{String(i+1).padStart(2,'0')}</div>
            <h3>{s.h}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Cases ----------
const CASES = [
  {
    brand: 'Купикод',
    domain: 'kupikod.com',
    body: 'Подключили СБП-подписки за день. Зачисление пришло на следующее утро. walletType:2 в боевом контуре.',
    name: 'Команда Купикод',
    role: 'kupikod.com',
  },
  {
    brand: 'Press F',
    domain: 'pressf.com',
    body: 'Открытый договор по gaming-тематике, ставка зафиксирована в контракте.',
    name: 'Команда Press F',
    role: 'pressf.com',
  },
];

function CasesStrip() {
  const [idx, setIdx] = useState(0);
  const cur = CASES[idx];
  return (
    <section className="section">
      <Overline>03 · Кейсы</Overline>
      <h2>Уже принимают платежи через Oplatum</h2>
      <div className="quote-card">
        <div className="quote-mark">«</div>
        <p className="quote-body">{cur.body}</p>
        <div className="quote-author">
          <span className="quote-name">{cur.name}</span>
          <span className="quote-role">{cur.role}</span>
        </div>
      </div>
      <div className="logo-strip">
        {CASES.map((c, i) => (
          <button
            key={i}
            className={`logo-mark logo-mark-btn ${i === idx ? 'active' : ''}`}
            onClick={() => setIdx(i)}>{c.brand}</button>
        ))}
      </div>
    </section>
  );
}

// ---------- Industries ----------
const INDUSTRIES = [
  { n: '04', tag: 'Telegram-экономика', h: 'Подписки и платежи в ботах', problem: 'Stripe и зарубежные шлюзы не работают с резидентами РФ.', solution: 'СБП-подписки с зачислением в RUB на расчётный счёт.', metric: '+38%', metricLabel: 'конверсия в оплату' },
  { n: '05', tag: 'Gaming', h: 'Микроплатежи и внутриигровые покупки', problem: 'Платёжные провайдеры блокируют игровую тематику.', solution: 'Принимаем gaming, лутбоксы и премиум-паки в открытом договоре.', metric: '< 2 сек', metricLabel: 'до подтверждения' },
  { n: '06', tag: 'EdTech', h: 'Курсы, подписки, рассрочка', problem: 'Длинные продукты с возвратами требуют гибкого билинга.', solution: 'Подписки и рассрочка платежей через единый API.', metric: '0.4%', metricLabel: 'возвратов' },
  { n: '07', tag: 'SaaS', h: 'Recurring billing для B2B', problem: 'Карты не подходят для долгосрочных корпоративных подписок.', solution: 'СБП-подписки для регулярных корпоративных платежей.', metric: '24 ч', metricLabel: 'до интеграции' },
  { n: '08', tag: 'Иностранные юрлица', h: 'USDT для нерезидентов', problem: 'Иностранцу нельзя открыть расчётный счёт в России.', solution: 'Расчёты приходят в USDT на ваш кошелёк.', metric: 'USDT', metricLabel: 'валюта расчётов' },
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
    <section className="section" id="industries">
      <Overline>04 · Индустрии</Overline>
      <h2>Решения для пяти ниш цифровой экономики</h2>
      <p className="sub">Один процессор, разные сценарии. Условия подбираем под ваш бизнес.</p>
      <div className="industry-grid">
        {INDUSTRIES.map((it, i) => <IndustryCard key={i} item={it} />)}
      </div>
    </section>
  );
}

// ---------- Calculator (real ladder) ----------
function Calculator() {
  const [val, setVal] = useState(8000000);
  const tier = val < 10_000_000 ? 0 : val < 20_000_000 ? 1 : val < 50_000_000 ? 2 : 3;
  const rate = ['6%', '5.5%', '4.5%', 'от 4%'][tier];
  const tierNote = [
    'Стартовая ставка для оборотов до 10 млн ₽/мес',
    'Средний уровень — оборот 10–20 млн ₽/мес',
    'Высокий оборот — 20–50 млн ₽/мес',
    'Крупный оборот — индивидуальные условия',
  ][tier];
  const fmt = (n) => '₽ ' + n.toLocaleString('ru-RU').replace(/,/g, ' ');

  return (
    <div className="calc">
      <h3>Рассчитайте условия</h3>
      <div className="calc-sub">Лесенка ставок по обороту. Чем больше — тем меньше комиссия.</div>
      <div className="calc-label">Месячный оборот, ₽</div>
      <input className="calc-input" type="text" value={fmt(val)} onChange={(e) => setVal(parseInt(e.target.value.replace(/\D/g, '')) || 0)} />
      <div className="calc-scale">
        {[0,1,2,3].map(i => (
          <div key={i} className={`step ${i < tier ? 'passed' : i === tier ? 'active' : ''}`} />
        ))}
      </div>
      <div className="calc-ticks">
        <span>до 10М<br/><b>6%</b></span>
        <span>10–20М<br/><b>5.5%</b></span>
        <span>20–50М<br/><b>4.5%</b></span>
        <span>от 50М<br/><b>от 4%</b></span>
      </div>
      <div className="calc-out">
        <span className="lbl">Ваша ставка</span>
        <span className="rate">{rate}</span>
      </div>
      <div className="calc-note">{tierNote}</div>
      <CtaApply size="lg">Получить условия</CtaApply>
    </div>
  );
}

function PricingSection() {
  return (
    <section className="section two-col" id="pricing">
      <div>
        <Overline>05 · Тарифы</Overline>
        <h2>Прозрачная сетка по обороту</h2>
        <p className="sub">Чем больше оборот — тем меньше комиссия. Все ставки публичны и фиксируются в договоре.</p>
        <ul className="bullets">
          <li>4 уровня ставок: от 6% до 4% по обороту</li>
          <li>Договор — НКО «МОБИ.Деньги», ЦБ РФ</li>
          <li>Возвраты и рефанды через API</li>
        </ul>
      </div>
      <Calculator />
    </section>
  );
}

// ---------- Telegram bot ----------
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
          <div className="msg msg-bot">Подключим за 3 дня. Какой у вас оборот?</div>
          <div className="msg msg-me">~ 8М ₽/мес</div>
          <div className="msg msg-bot">Ставка 6%. Открыть условия?</div>
          <div className="msg msg-bot pay">Открыть → @oplatum_bot</div>
        </div>
        <div>
          <Overline>06 · Onboarding · Telegram</Overline>
          <h3>Подключение через бота</h3>
          <p className="lead">Пишете в @oplatum_bot — менеджер открывает условия в течение часа. Без длинных форм и встреч.</p>
          <CtaApply size="lg">Открыть бота</CtaApply>
        </div>
      </div>
    </section>
  );
}

// ---------- Dev featured (dark card) ----------
function DevFeatured() {
  return (
    <section className="section" id="docs">
      <div className="dev-feature">
        <div className="dev-feature-copy">
          <Overline className="ovl-on-dark">07 · Для разработчиков</Overline>
          <h2>API уровня Stripe + MCP-сервер для AI-агентов</h2>
          <p className="sub-on-dark">REST + webhooks с подписью HMAC-SHA256, идемпотентность, sandbox с тестовыми ключами. SDK для Node, Python и PHP. MCP-сервер — чтобы AI-агент сам интегрировал платежи в код.</p>
          <div className="dev-compare">
            <span className="dev-compare-label">Уже работаете с другим провайдером?</span>
            <span className="dev-compare-text">Напишите ставку и условия — сравним и покажем, что выгоднее на ваших объёмах.</span>
          </div>
          <div className="cta-row">
            <Btn variant="accent" onClick={scrollToApply}>Документация <Arr /></Btn>
            <Btn variant="ghost-light" onClick={scrollToApply}>Сравнить условия →</Btn>
          </div>
        </div>
        <div className="dev-feature-code">
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
<span className="com">{`// Платёж по СБП с подпиской`}</span>{'\n'}
<span className="fn">const</span>{` payment = `}<span className="fn">await</span>{` oplatum.payments.`}<span className="fn">create</span>{`({\n`}
{`  `}<span className="key">amount</span>{`: `}<span className="num-tok">12500</span>{`,\n`}
{`  `}<span className="key">currency</span>{`: `}<span className="str">"RUB"</span>{`,\n`}
{`  `}<span className="key">method</span>{`: `}<span className="str">"sbp"</span>{`,\n`}
{`  `}<span className="key">recurring</span>{`: `}<span className="num-tok">true</span>{`,\n`}
{`  `}<span className="key">description</span>{`: `}<span className="str">"Подписка Pro"</span>{`\n`}
{`});`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Roadmap ----------
const ROADMAP = [
  { h: 'Карты', body: 'Эквайринг по картам РФ как второй рельс рядом с СБП.', status: '' },
  { h: 'Mass payouts', body: 'Массовые выплаты исполнителям, авторам, продавцам через единый API.', status: 'План' },
  { h: 'MCP-сервер для AI-агентов', body: 'Агент сам интегрирует платежи в код через Model Context Protocol.', status: 'Прототип' },
  { h: 'Telegram Mini App native', body: 'Нативная оплата внутри Mini App без редиректов на hosted checkout.', status: 'План' },
  { h: 'Multi-currency расчёты', body: 'Зачисления в EUR и других стейблах поверх существующих RUB и USDT.', status: 'План' },
];

function Roadmap() {
  return (
    <section className="section">
      <Overline>08 · Roadmap</Overline>
      <h2>Что готовим в ближайшие месяцы</h2>
      <p className="sub">Сейчас в боевом контуре — СБП и СБП-подписки с зачислением за 1 день.</p>
      <div className="roadmap-grid">
        {ROADMAP.map((it, i) => (
          <div key={i} className="roadmap-card">
            {it.status && <div className="roadmap-card-status">{it.status}</div>}
            <h3>{it.h}</h3>
            <p>{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Lead Form ----------
function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', inn: '', biz: '', turnover: '', message: '' });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend (CRM / email / @oplatum_bot) — placeholder for now
    setSubmitted(true);
  };
  return (
    <section className="section" id="apply">
      <div className="lead-form-card">
        <div className="lead-form-copy">
          <Overline>09 · Заявка</Overline>
          <h2>Оставьте заявку на подключение</h2>
          <p className="sub">Отвечаем в течение часа в рабочее время. KYB занимает до 3 дней — собираем документы для лицензированного процессора. На всём процессе с вами один менеджер.</p>
          <div className="lead-form-bullets">
            <div className="lf-row"><span className="lf-num">1ч</span><span className="lf-lbl">Первый ответ в рабочее время</span></div>
            <div className="lf-row"><span className="lf-num">3 дня</span><span className="lf-lbl">От заявки до первого платежа</span></div>
          </div>
        </div>
        <div className="lead-form-fields">
          {submitted ? (
            <div className="lead-form-success">
              <h3>Заявка отправлена</h3>
              <p>Свяжемся с вами в течение часа в рабочее время. Если срочно — пишите в @oplatum_bot.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="lf-grid-2">
                <div className="lf-field">
                  <label>Имя и компания</label>
                  <input required type="text" placeholder="Анна, AcmeBot" value={form.name} onChange={update('name')}/>
                </div>
                <div className="lf-field">
                  <label>Контакт</label>
                  <input required type="text" placeholder="email или @telegram" value={form.contact} onChange={update('contact')}/>
                </div>
              </div>
              <div className="lf-grid-2">
                <div className="lf-field">
                  <label>ИНН юрлица</label>
                  <input type="text" inputMode="numeric" placeholder="10 или 12 цифр" value={form.inn} onChange={update('inn')} pattern="[0-9]{10}|[0-9]{12}"/>
                </div>
                <div className="lf-field">
                  <label>Тип бизнеса</label>
                  <select value={form.biz} onChange={update('biz')}>
                    <option value="">Выберите</option>
                    <option>Telegram-бот / Mini App</option>
                    <option>Gaming / внутриигровые покупки</option>
                    <option>EdTech / онлайн-школа</option>
                    <option>SaaS / B2B-инструмент</option>
                    <option>Маркетплейс цифровых товаров</option>
                    <option>Иностранное юрлицо для РФ-аудитории</option>
                    <option>Другое</option>
                  </select>
                </div>
              </div>
              <div className="lf-field">
                <label>Месячный оборот</label>
                <select value={form.turnover} onChange={update('turnover')}>
                  <option value="">Выберите диапазон</option>
                  <option>До 10 млн ₽/мес</option>
                  <option>10–20 млн ₽/мес</option>
                  <option>20–50 млн ₽/мес</option>
                  <option>От 50 млн ₽/мес</option>
                  <option>Запускаемся / нет оборота</option>
                </select>
              </div>
              <div className="lf-field">
                <label>Комментарий</label>
                <textarea rows="3" placeholder="Например: нужны СБП-подписки для TG-бота и расчёты в USDT" value={form.message} onChange={update('message')}/>
              </div>
              <Btn type="submit" size="lg">Отправить заявку <Arr /></Btn>
              <div className="lf-fineprint">Нажимая кнопку, соглашаетесь с обработкой персональных данных. Никаких звонков и спама.</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
const FAQS = [
  { q: 'Кто несёт лицензионную ответственность?', a: 'НКО «МОБИ.Деньги», ЦБ РФ №3523-К. Oplatum — продуктовый и технологический слой поверх процессора. Все платежи проходят по 161-ФЗ.' },
  { q: 'Можно ли получать в USDT, если у нас иностранное юрлицо?', a: 'Да. Договор заключается с лицензированным процессором, расчёты приходят на ваш USDT-кошелёк.' },
  { q: 'Сколько времени занимает подключение?', a: 'От заявки до первого платежа — обычно 3 дня. KYB занимает до 3 дней — собираем документы для лицензированного процессора. Интеграция занимает день при готовом стеке.' },
  { q: 'Какая ставка комиссии?', a: 'Лесенка по обороту: до 10 млн ₽/мес — 6%, 10–20 млн — 5.5%, 20–50 млн — 4.5%, от 50 млн — 4% или индивидуально. Все ставки фиксируются в договоре.' },
  { q: 'Какую тематику принимаете?', a: 'Цифровые товары, Telegram-боты и Mini Apps, gaming (включая внутриигровые покупки и premium-паки), EdTech, SaaS. Уточняем в KYB по конкретному кейсу.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <Overline>10 · Вопросы</Overline>
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
          <a onClick={scrollToId('product')}>Преимущества</a>
          <a onClick={scrollToId('pricing')}>Тарифы</a>
          <a onClick={scrollToId('docs')}>Для разработчиков</a>
          <a onClick={scrollToApply}>Подключиться</a>
        </div>
        <div>
          <div className="col-h">Индустрии</div>
          <a onClick={scrollToId('industries')}>Telegram</a>
          <a onClick={scrollToId('industries')}>Gaming</a>
          <a onClick={scrollToId('industries')}>EdTech</a>
          <a onClick={scrollToId('industries')}>SaaS</a>
        </div>
        <div>
          <div className="col-h">Контакты</div>
          <a onClick={scrollToApply}>Заявка на подключение</a>
          <a href="mailto:hello@oplatum.ru">hello@oplatum.ru</a>
          <a href="https://t.me/oplatum_bot" target="_blank" rel="noopener">@oplatum_bot</a>
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
      <Advantages />
      <ProcessSteps />
      <CasesStrip />
      <IndustryGrid />
      <PricingSection />
      <TelegramBlock />
      <DevFeatured />
      <Roadmap />
      <LeadForm />
      <FAQ />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

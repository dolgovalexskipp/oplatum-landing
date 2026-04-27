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
          Платёжная инфраструктура с интеграцией <span className="accent-blue">за 1 день</span>
        </h1>
        <p className="lead">
          СБП, СБП-подписки и USDT-расчёты для цифровых продуктов. Подключение без бумаг и долгого ожидания — отвечаем в день обращения.
        </p>
        <div className="cta-row">
          <CtaApply size="lg">Подключиться</CtaApply>
          <Btn variant="secondary" size="lg" onClick={scrollToApply}>Документация</Btn>
        </div>
        <div className="hero-meta">
          <span className="hero-meta-num">60k+</span>
          <span className="hero-meta-lbl">транзакций<br/>в день</span>
          <span className="divider" />
          <span className="hero-meta-num">99.9%</span>
          <span className="hero-meta-lbl">uptime<br/>платёжного шлюза</span>
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
        <div className="ovl-m">Объём</div>
        <div className="num blue">60k+</div>
        <div className="lbl">транзакций<br/>в день</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Uptime</div>
        <div className="num">99.9%</div>
        <div className="lbl">доступность<br/>платёжного шлюза</div>
      </div>
      <div className="metric-card">
        <div className="ovl-m">Скорость</div>
        <div className="num">&lt;&nbsp;2&nbsp;сек</div>
        <div className="lbl">от инициации<br/>до подтверждения</div>
      </div>
      <div className="metric-card bar">
        <div className="ovl-m">Интеграция</div>
        <div className="num">1 день</div>
        <div className="lbl">от заявки<br/>до приёма платежей</div>
      </div>
    </section>
  );
}

// ---------- Advantages ----------
const ADVANTAGES = [
  { h: 'Подключение за 1 день', body: 'Без бумажной волокиты и долгих согласований. Заявка утром — приём платежей вечером.' },
  { h: 'Uptime 99.9%', body: 'Стабильная работа платёжного шлюза. Резервирование на стороне инфраструктуры.' },
  { h: 'Скорость подтверждения', body: 'Менее 2 секунд от инициации платежа до подтверждения у клиента.' },
  { h: 'Зачисление за 1 день', body: 'Получайте деньги в рублях или USDT на следующий день после оплаты.' },
  { h: 'СБП-подписки', body: 'Рекуррентные списания через walletType:2 в боевом контуре.' },
  { h: 'USDT для нерезидентов', body: 'Иностранному юрлицу не нужен расчётный счёт в РФ — расчёты приходят на USDT-кошелёк.' },
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

// ---------- Product Features (full inventory from API spec) ----------
const FEATURES = [
  { tag: 'СБП', h: 'Приём по СБП QR', body: 'Динамический QR-код на сумму платежа. Создание через POST /payments/create-code, статус через webhook или polling.' },
  { tag: 'СБП', h: 'СБП-подписки', body: 'Рекуррентные списания через walletType:2. Привязка с выбором банка из списка СБП, множественные привязки на одного клиента.' },
  { tag: 'Checkout', h: 'Hosted-страница оплаты', body: 'Готовая страница чекаута на нашем домене — Checkout Sessions API. Без своего фронта на стороне мерчанта.' },
  { tag: 'Checkout', h: 'Платёжные ссылки', body: 'Одиночные ссылки для outreach, Telegram-ботов и email-кампаний.' },
  { tag: 'API', h: 'Customers API', body: 'Управление клиентами и их платёжными привязками: GET / POST / PATCH / DELETE.' },
  { tag: 'API', h: 'Events API', body: 'Журнал всех событий с пагинацией и фильтрами. Реплей webhooks из истории.' },
  { tag: 'API', h: 'Webhooks с подписью', body: 'HMAC-SHA256 в заголовках, retry-policy с экспоненциальным backoff.' },
  { tag: 'API', h: 'Идемпотентность', body: 'Idempotency-Key на POST-запросах. Повторная отправка не создаёт дубликат.' },
  { tag: 'Dev', h: 'Sandbox', body: 'Тестовый режим с парой ключей ak_test_/sk_test_. Управление результатом платежа для прогонки сценариев.' },
  { tag: 'Dev', h: 'Возвраты через API', body: 'Полный или частичный refund через POST /payments/:id/refund.' },
  { tag: 'Admin', h: 'Личный кабинет', body: 'Дашборд GMV/refunds/net/fees, транзакции, клиенты, выплаты, отчёты, API-логи, вебхуки.' },
  { tag: 'Dev', h: 'SDK и инструменты', body: 'Готовые библиотеки на Node.js, Python и PHP. Postman-коллекция и интерактивная консоль в документации.' },
];

function ProductFeatures() {
  return (
    <section className="section">
      <Overline>02 · Возможности</Overline>
      <h2>Что внутри платформы</h2>
      <p className="sub">Полноценный платёжный стек поверх лицензированного процессора — от приёма СБП до webhooks с подписью и личного кабинета.</p>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-tag">{f.tag}</div>
            <h3>{f.h}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- Process (3 steps, 1 day) ----------
const STEPS = [
  { h: 'Оставить заявку', body: 'Короткая форма или Telegram-бот. Отвечаем в течение часа в рабочее время.' },
  { h: 'Получить ключи', body: 'Выдаём тестовые ключи песочницы. Команда разработки начинает интеграцию в тот же день.' },
  { h: 'Принимать платежи', body: 'После короткой проверки переводим в боевой контур. Зачисление — на следующий день.' },
];

function ProcessSteps() {
  return (
    <section className="section">
      <Overline>03 · Как мы работаем</Overline>
      <h2>От заявки до первого платежа — один день</h2>
      <p className="sub">Без бумаг и долгих согласований. На всём пути с вами один менеджер.</p>
      <div className="steps-grid steps-grid-3">
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

// ---------- Proof of Concept (replaces named cases) ----------
function ProofOfConcept() {
  return (
    <section className="section">
      <Overline>04 · В цифрах</Overline>
      <h2>Платёжный шлюз в боевом контуре</h2>
      <p className="sub">Платформа уже работает с реальным трафиком. Конкретные кейсы и логотипы клиентов раскрываем под NDA в KYB.</p>
      <div className="proof-card">
        <div className="proof-main">
          <div className="proof-num">60 000<span className="proof-num-suffix">+</span></div>
          <div className="proof-lbl">транзакций обрабатываем в день</div>
        </div>
        <div className="proof-stats">
          <div className="proof-stat">
            <div className="proof-stat-num">99.9%</div>
            <div className="proof-stat-lbl">Uptime платёжного шлюза</div>
          </div>
          <div className="proof-stat">
            <div className="proof-stat-num">&lt; 2 сек</div>
            <div className="proof-stat-lbl">До подтверждения платежа</div>
          </div>
          <div className="proof-stat">
            <div className="proof-stat-num">24/7</div>
            <div className="proof-stat-lbl">Мониторинг и поддержка</div>
          </div>
          <div className="proof-stat">
            <div className="proof-stat-num">8</div>
            <div className="proof-stat-lbl">Релизов API за квартал</div>
          </div>
        </div>
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
      <Overline>05 · Индустрии</Overline>
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
        <Overline>06 · Тарифы</Overline>
        <h2>Прозрачная сетка по обороту</h2>
        <p className="sub">Чем больше оборот — тем меньше комиссия. Все ставки публичны и фиксируются в договоре.</p>
        <ul className="bullets">
          <li>4 уровня ставок: от 6% до 4% по обороту</li>
          <li>Договор с российским лицензированным эквайером</li>
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
          <Overline>07 · Onboarding · Telegram</Overline>
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
          <Overline className="ovl-on-dark">08 · Для разработчиков</Overline>
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
      <Overline>09 · Roadmap</Overline>
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
          <Overline>10 · Заявка</Overline>
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
  { q: 'Кто несёт лицензионную ответственность?', a: 'Российский лицензированный эквайер — наш партнёр по процессингу. Oplatum — продуктовый и технологический слой поверх. Все платежи проходят по 161-ФЗ.' },
  { q: 'Можно ли получать в USDT, если у нас иностранное юрлицо?', a: 'Да. Расчёты приходят на ваш USDT-кошелёк, расчётный счёт в РФ не нужен.' },
  { q: 'Сколько времени занимает подключение?', a: 'Один день. Утром — заявка и быстрая проверка, днём — выдаём ключи песочницы, к вечеру можно принимать платежи в боевом контуре.' },
  { q: 'Какая ставка комиссии?', a: 'Лесенка по обороту: до 10 млн ₽/мес — 6%, 10–20 млн — 5.5%, 20–50 млн — 4.5%, от 50 млн — 4% или индивидуально. Все ставки фиксируются в договоре.' },
  { q: 'Какой объём вы обрабатываете?', a: 'Платформа обрабатывает 60 000+ транзакций в день в боевом контуре. Uptime платёжного шлюза — 99.9%, среднее время до подтверждения — менее 2 секунд.' },
  { q: 'Какую тематику принимаете?', a: 'Цифровые товары, Telegram-боты и Mini Apps, gaming (включая внутриигровые покупки и premium-паки), EdTech, SaaS. Уточняем в KYB по конкретному кейсу.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <Overline>11 · Вопросы</Overline>
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
        <span>© 2026 Oplatum</span>
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
      <ProductFeatures />
      <ProcessSteps />
      <ProofOfConcept />
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

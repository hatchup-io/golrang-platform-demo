import {
  atHomeItems,
  campaignItem,
  cartVariants,
  economicAlternatives,
  frequentItems,
  guestMenu,
  guestRequest,
  money,
  persona,
  recommendedVariant,
  tapsiTrip,
  toFa,
  wallet,
} from './data'
import { AppTopbar, Chip, ProductRow } from './ui'

const MONTHLY_CART_TOTAL = 3_180_000
const MONTHLY_CART_COUNT = 24

// ── مرحله ۱: شناخت اولیه ───────────────────────────────────────────────────
export function OnboardingScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="پروفایل شما ساخته شد" />
      <div className="card">
        <div className="card-title">🎯 آنچه پلتفرم درباره شما می‌داند</div>
        <div className="product">
          <div className="thumb cat-dairy">👨‍👩‍👧‍👦</div>
          <div className="meta">
            <b>{persona.household}</b>
            <small>ساکن {persona.city}</small>
          </div>
        </div>
        <div className="product">
          <div className="thumb cat-grocery">⚖️</div>
          <div className="meta">
            <b>اولویت‌های خرید</b>
            <small>{persona.priorities.join(' · ')}</small>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">
          💰 هدف مالی <Chip tone="violet">فعال</Chip>
        </div>
        <b style={{ fontSize: 13 }}>{persona.goalTitle}</b>
        <div className="progress warn">
          <i style={{ width: `${(persona.spentSoFar / persona.monthlyBudget) * 100}%` }} />
        </div>
        <div className="total-row" style={{ paddingTop: 4 }}>
          <span>مصرف‌شده: {money(persona.spentSoFar)} ت</span>
          <span>سقف ماهانه: {money(persona.monthlyBudget)} ت</span>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--surface-2)' }}>
        <small style={{ fontSize: 12, color: 'var(--ink-2)' }}>
          پلتفرم فقط «حداقل شناخت لازم» را می‌گیرد تا بتواند کمک کند — نه بیشتر. این
          پروفایل مبنای همه پیشنهادهای بعدی است.
        </small>
      </div>
    </>
  )
}

// ── مرحله ۲: تشخیص نیاز ────────────────────────────────────────────────────
export function NeedDetectionScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="دستیار هوشمند" />
      <div className="chat">
        <div className="bubble ai">
          <b>⏰ زمان خرید ماهانه رسیده است</b>
          <br />
          بر اساس الگوی خرید شما، حدود ۲۸ روز از خرید عمده قبلی می‌گذرد. چند قلم
          پرتکرار احتمالاً رو به اتمام‌اند.
        </div>
        <div className="bubble ai" style={{ animationDelay: '0.15s' }}>
          می‌خواهید یک سبد پیشنهادی برایتان آماده کنم؟ سعی می‌کنم در سقف بودجه
          بمانید.
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-title">
          🔮 اقلام پیش‌بینی‌شده <Chip tone="blue">۶ قلم پرتکرار</Chip>
        </div>
        {frequentItems.slice(0, 4).map((p) => (
          <ProductRow
            key={p.id}
            p={p}
            right={<Chip tone="gray">در حال اتمام</Chip>}
          />
        ))}
      </div>
    </>
  )
}

// ── مرحله ۳: ساخت پیشنهاد (سبد هوشمند) ─────────────────────────────────────
export function SmartCartScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="سبد پیشنهادی ماهانه" />

      <div className="card">
        <div className="card-title">🛒 اقلام پرتکرار</div>
        {frequentItems.map((p) => (
          <ProductRow key={p.id} p={p} />
        ))}
      </div>

      <div className="card">
        <div className="card-title">
          💡 دو جایگزین اقتصادی <Chip tone="green">پیشنهاد صرفه‌جویی</Chip>
        </div>
        {economicAlternatives.map((a) => (
          <ProductRow
            key={a.to.id}
            p={a.to}
            right={
              <div style={{ textAlign: 'left' }}>
                <div className="price">{money(a.to.price)} ت</div>
                <small style={{ color: 'var(--c-green)', fontSize: 11 }}>
                  {money(a.saving)} ت کمتر
                </small>
              </div>
            }
          />
        ))}
      </div>

      <div className="card" style={{ borderColor: '#ffd9e6' }}>
        <div className="card-title">
          🎁 محصول کمپینی <Chip tone="pink">کش‌بک ۱۵٪</Chip>
        </div>
        <ProductRow p={campaignItem} />
      </div>

      <div className="card" style={{ background: 'var(--surface-2)' }}>
        <div className="card-title">
          🏠 اقلامی که احتمالاً در خانه دارید — حذف شد
        </div>
        {atHomeItems.map((p) => (
          <ProductRow
            key={p.id}
            p={p}
            removed
            right={<Chip tone="gray">حذف خودکار</Chip>}
          />
        ))}
      </div>

      <div className="total-row">
        <span>جمع سبد ماهانه ({toFa(MONTHLY_CART_COUNT)} قلم)</span>
        <b>{money(MONTHLY_CART_TOTAL)} ت</b>
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Chip tone="green">🚚 ارسال رایگان اوکالا — سفارش بالای ۱۰۰ هزار تومان</Chip>
      </div>
    </>
  )
}

// ── مرحله ۴: گفت‌وگو (افزودن مهمانی با صدا) ────────────────────────────────
export function ConversationScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="گفت‌وگو با دستیار" />

      <div className="chat">
        <div className="bubble user">{guestRequest}</div>
        <div className="voice-row">
          <div className="wave">
            {[10, 18, 8, 20, 12, 16, 9].map((h, i) => (
              <i key={i} style={{ height: h, animationDelay: `${i * 0.09}s` }} />
            ))}
          </div>
          <div className="mic">🎙️</div>
        </div>

        <div className="bubble ai">
          فهمیدم! برای شام شش‌نفره جمعه، این منو را پیشنهاد می‌دهم و همه چیز را در
          سقف پنج میلیون نگه می‌دارم:
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-title">
          🍽️ {guestMenu.title}
          <Chip tone="orange">{toFa(guestMenu.serves)} نفره</Chip>
        </div>
        <small style={{ color: 'var(--muted)', fontSize: 11.5 }}>
          زمان آماده‌سازی حدود {toFa(guestMenu.prepMinutes)} دقیقه
        </small>
        <div style={{ marginTop: 8 }}>
          {guestMenu.ingredients.map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
          <ProductRow
            p={guestMenu.readyItem}
            right={<Chip tone="pink">آماده — تپسی‌فود</Chip>}
          />
        </div>
        <div className="total-row">
          <span>افزوده‌شده به سبد</span>
          <b>
            {money(
              guestMenu.ingredients.reduce((s, p) => s + p.price, 0) +
                guestMenu.readyItem.price,
            )}{' '}
            ت
          </b>
        </div>
      </div>
    </>
  )
}

// ── مرحله ۵: بهینه‌سازی (سه نسخه سبد) ──────────────────────────────────────
export function OptimizationScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="سه نسخه از سبد شما" />
      <div className="card" style={{ marginBottom: 12 }}>
        <small style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>
          هر نسخه در سقف بودجه پنج میلیونی است. تفاوت قیمت و دلیل انتخاب محصولات برای
          هر کدام مشخص است.
        </small>
      </div>

      <div className="variants">
        {cartVariants.map((v) => {
          const sel = v.id === recommendedVariant
          return (
            <div key={v.id} className={`variant${sel ? ' sel' : ''}`}>
              <div className="v-head">
                <b style={{ color: v.color }}>
                  {v.label}
                  {sel && (
                    <Chip tone="violet"> پیشنهاد دستیار</Chip>
                  )}
                </b>
                <span className="v-total">{money(v.total)} ت</span>
              </div>
              <ul className="v-reasons">
                {v.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── مرحله ۶: پرداخت و ثبت سفارش ────────────────────────────────────────────
export function PaymentScreen() {
  const total = cartVariants.find((v) => v.id === recommendedVariant)!.total
  const fromWallet = wallet.balance
  const fromCashback = wallet.cashback
  const remaining = total - fromWallet - fromCashback
  return (
    <>
      <AppTopbar name={persona.name} sub="پرداخت و ثبت سفارش" />

      <div className="card">
        <div className="card-title">
          🧾 صورتحساب <Chip tone="violet">نسخه متعادل</Chip>
        </div>
        <div className="total-row" style={{ paddingTop: 0 }}>
          <span>جمع سبد</span>
          <b>{money(total)} ت</b>
        </div>
      </div>

      <div className="card">
        <div className="card-title">👛 کیف پول یکپارچه</div>
        <div className="product">
          <div className="thumb cat-hygiene">💳</div>
          <div className="meta">
            <b>موجودی کیف پول</b>
            <small>استفاده در این پرداخت</small>
          </div>
          <div className="price" style={{ color: 'var(--c-green)' }}>
            − {money(fromWallet)} ت
          </div>
        </div>
        <div className="product">
          <div className="thumb cat-ready">🎁</div>
          <div className="meta">
            <b>کش‌بک قابل استفاده</b>
            <small>از خریدهای پیشین اکوسیستم</small>
          </div>
          <div className="price" style={{ color: 'var(--c-green)' }}>
            − {money(fromCashback)} ت
          </div>
        </div>
        <div className="product">
          <div className="thumb cat-dairy">🏦</div>
          <div className="meta">
            <b>مانده قابل پرداخت</b>
            <small>کارت بانکی</small>
          </div>
          <div className="price">{money(remaining)} ت</div>
        </div>
      </div>

      <button className="cta">پرداخت و ثبت سفارش · {money(remaining)} تومان</button>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <Chip tone="green">✓ سفارش با موفقیت ثبت شد</Chip>
      </div>
    </>
  )
}

// ── مرحله ۷: خدمت مکمل (سفر تپسی) ──────────────────────────────────────────
export function TapsiScreen() {
  return (
    <>
      <AppTopbar name={persona.name} sub="خدمت مکمل هوشمند" />

      <div className="card" style={{ background: '#eafaf3', borderColor: '#cdefe0' }}>
        <div className="card-title">
          ✅ سفارش خرید ثبت شد <Chip tone="green">در حال آماده‌سازی</Chip>
        </div>
        <small style={{ color: 'var(--ink-2)', fontSize: 12.5 }}>
          تحویل اوکالا (شبکه افق کوروش): پنجشنبه ۱۰ تا ۱۴ · ارسال رایگان
        </small>
      </div>

      <div className="card" style={{ borderColor: '#ffe0a3' }}>
        <div className="card-title">
          🚕 سفر تپسی برای روز مهمانی آماده شد
        </div>
        <div className="product">
          <div className="thumb cat-staple">📅</div>
          <div className="meta">
            <b>
              {tapsiTrip.day} · ساعت {tapsiTrip.time}
            </b>
            <small>{tapsiTrip.reason}</small>
          </div>
        </div>
        <div className="product">
          <div className="thumb cat-grocery">📍</div>
          <div className="meta">
            <b>مبدأ</b>
            <small>{tapsiTrip.origin}</small>
          </div>
        </div>
        <div className="product">
          <div className="thumb cat-protein">🏁</div>
          <div className="meta">
            <b>مقصد</b>
            <small>{tapsiTrip.destination}</small>
          </div>
          <div className="price">≈ {money(tapsiTrip.estimatedFare)} ت</div>
        </div>
        <button className="cta" style={{ background: 'linear-gradient(135deg,#ff8a3d,#ff4d8d)' }}>
          تأیید و زمان‌بندی سفر
        </button>
      </div>

      <div className="card" style={{ background: 'var(--surface-2)' }}>
        <small style={{ fontSize: 12, color: 'var(--ink-2)' }}>
          پلتفرم فقط تاکسی سفارش نمی‌دهد؛ زمان مهمانی، خرید و برنامه روز شما را
          هم‌زمان در نظر می‌گیرد — یک زنجیره کامل از نیاز تا اجرا.
        </small>
      </div>
    </>
  )
}

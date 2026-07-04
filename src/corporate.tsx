import { corporate, money, toFa } from './data'

export function CorporateDashboard() {
  const c = corporate
  const maxRate = Math.max(c.purchaseRateTarget, c.purchaseRateControl)
  const upliftRel = Math.round(
    ((c.purchaseRateTarget - c.purchaseRateControl) / c.purchaseRateControl) * 100,
  )

  return (
    <div className="dashboard">
      <div className="dash-head">
        <div>
          <h3>پنل شرکتی — نتیجه کمپین</h3>
          <div className="sub">
            {c.campaignName} · {c.company} · {c.window}
          </div>
        </div>
        <span className="env">محیط مدیریت B2B</span>
      </div>

      {/* شاخص‌های کلیدی */}
      <div className="dash-grid">
        <div className="kpi">
          <div className="k-label">فروش افزایشی نسبت به کنترل</div>
          <div className="k-value">
            +{toFa(c.incrementalBuyers)} <span className="unit">خرید</span>
          </div>
          <div className="k-delta up">≈ {money(c.incrementalRevenue)} تومان ارزش</div>
        </div>
        <div className="kpi">
          <div className="k-label">اثر بر میانگین مبلغ سبد</div>
          <div className="k-value">
            +{toFa(c.basketUplift)}
            <span className="unit"> ٪</span>
          </div>
          <div className="k-delta up">نسبت به گروه کنترل</div>
        </div>
        <div className="kpi">
          <div className="k-label">بازده هزینه تبلیغات (ROAS)</div>
          <div className="k-value">
            {toFa(c.roas)}
            <span className="unit"> برابر</span>
          </div>
          <div className="k-delta up">سودآور</div>
        </div>
        <div className="kpi">
          <div className="k-label">اندازه گروه هدف / کنترل</div>
          <div className="k-value">{toFa(c.targetSize.toLocaleString('en-US'))}</div>
          <div className="k-delta" style={{ color: 'var(--muted)' }}>
            کنترل: {toFa(c.controlSize.toLocaleString('en-US'))}
          </div>
        </div>
      </div>

      <div className="dash-cols">
        {/* قیف تبدیل */}
        <div className="panel">
          <h4>قیف تبدیل کمپین</h4>
          <div className="funnel">
            {c.funnel.map((f) => (
              <div className="funnel-row" key={f.stage}>
                <span>{f.stage}</span>
                <div className="funnel-bar" style={{ width: `${f.pct}%` }}>
                  {toFa(f.value.toLocaleString('en-US'))}
                </div>
                <span className="pct">{toFa(f.pct)}٪</span>
              </div>
            ))}
          </div>
        </div>

        {/* مقایسه هدف/کنترل */}
        <div className="panel">
          <h4>نرخ خرید: گروه هدف در برابر کنترل</h4>
          <div className="compare-bars">
            <div className="cbar target">
              <div
                className="bar"
                style={{ height: `${(c.purchaseRateTarget / maxRate) * 100}%` }}
              >
                <b>{toFa(c.purchaseRateTarget)}٪</b>
              </div>
              <span className="lbl">گروه هدف</span>
            </div>
            <div className="cbar control">
              <div
                className="bar"
                style={{ height: `${(c.purchaseRateControl / maxRate) * 100}%` }}
              >
                <b>{toFa(c.purchaseRateControl)}٪</b>
              </div>
              <span className="lbl">گروه کنترل</span>
            </div>
          </div>
          <div className="uplift-note">
            📈 فروش افزایشی واقعی: +{toFa((c.purchaseRateTarget - c.purchaseRateControl).toFixed(1))} واحد
            درصدی (~{toFa(upliftRel)}٪ رشد نسبی) — تفاوت واقعی کمپین، نه صرفاً خریدهای
            طبیعی.
          </div>
        </div>
      </div>

      <div className="dash-cols" style={{ paddingTop: 0 }}>
        {/* آفر A/B */}
        <div className="panel">
          <h4>مقایسه نسخه‌های آفر (A/B)</h4>
          {c.offerVariants.map((o) => (
            <div className="offer" key={o.id}>
              <div>
                <b style={{ fontSize: 13 }}>{o.label}</b>
                {o.winner && <div className="winner">✓ نسخه برنده</div>}
              </div>
              <div
                className="o-rate"
                style={{ color: o.winner ? 'var(--c-green)' : 'var(--muted)' }}
              >
                {toFa(o.purchaseRate)}٪
              </div>
            </div>
          ))}
          <div className="uplift-note" style={{ background: '#f0ebff', borderColor: '#e2d8ff', color: 'var(--c-primary)' }}>
            💡 پیشنهاد تحلیلی: بودجه باقی‌مانده به نسخه «ارسال رایگان» تخصیص یابد.
          </div>
        </div>

        {/* خلاصه زنجیره */}
        <div className="panel">
          <h4>زنجیره کامل: از نیاز تا اندازه‌گیری</h4>
          <div className="funnel" style={{ gap: 12 }}>
            {[
              ['۱ · شناخت مصرف‌کننده', 'پروفایل خانواده و هدف مالی'],
              ['۲ · پیشنهاد هوشمند', 'محصول کمپینی در سبد واقعی'],
              ['۳ · خرید واقعی', 'پرداخت از کیف پول یکپارچه'],
              ['۴ · اندازه‌گیری نتیجه', 'فروش افزایشی نسبت به کنترل'],
            ].map(([t, s], i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div
                  style={{
                    flex: '0 0 auto',
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: 'var(--c-primary)',
                    color: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {toFa(i + 1)}
                </div>
                <div>
                  <b style={{ fontSize: 12.5 }}>{t}</b>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="full-note">
        این دمو نشان می‌دهد پروژه یک زنجیره کامل از «شناخت نیاز» تا «خرید» و
        «اندازه‌گیری نتیجه» را پوشش می‌دهد — تجربه مصرف‌کننده و نتیجه سازمانی در یک
        جریان واحد.
      </div>
    </div>
  )
}

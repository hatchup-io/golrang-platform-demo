import { useState, type ReactNode } from 'react'
import { steps, toFa } from './data'
import {
  ConversationScreen,
  NeedDetectionScreen,
  OnboardingScreen,
  OptimizationScreen,
  PaymentScreen,
  SmartCartScreen,
  TapsiScreen,
} from './consumer'
import { CorporateDashboard } from './corporate'
import { PhoneFrame } from './ui'

// متن روایت هر مرحله برای پنل کناری
const narration: Record<
  string,
  { lead: string; points: string[]; callout: string }
> = {
  onboarding: {
    lead: 'کاربر پس از ثبت‌نام مشخص می‌کند خانواده چهار نفره دارد، قیمت و کیفیت برایش مهم است و می‌خواهد هزینه ماهانه را کنترل کند.',
    points: [
      'دریافت حداقل شناخت لازم، نه حداکثر داده',
      'تعریف هدف و بودجه پایه در همان ابتدا',
      'این پروفایل مبنای همه پیشنهادهای بعدی است',
    ],
    callout: 'شخصی‌سازی از لحظه اول آغاز می‌شود؛ نه با پرسشنامه طولانی، بلکه با چند انتخاب ساده.',
  },
  need: {
    lead: 'سیستم متوجه می‌شود زمان معمول خرید ماهانه رسیده و چند محصول پرتکرار احتمالاً نیاز به خرید مجدد دارند.',
    points: [
      'پیش‌بینی نیاز بر پایه الگوی رفتار کاربر',
      'دستیار پیش‌دستانه گفت‌وگو را آغاز می‌کند',
      'کاربر منتظر نمی‌ماند تا خودش متوجه شود',
    ],
    callout: 'تفاوت کلیدی با اپ‌های امروزی: پلتفرم «همراه تصمیم‌گیری» است، نه صرفاً ابزار انجام یک خدمت.',
  },
  cart: {
    lead: 'یک سبد اولیه هوشمند ساخته می‌شود که فراتر از یک فهرست خرید ساده است.',
    points: [
      'محصولات پرتکرار خانواده',
      'دو جایگزین اقتصادی برای صرفه‌جویی',
      'یک محصول دارای کمپین با کش‌بک',
      'حذف خودکار اقلامی که احتمالاً در خانه موجودند',
    ],
    callout: 'سبد نه صرفاً پر می‌شود، بلکه با در نظر گرفتن بودجه و موجودی خانه بهینه می‌شود.',
  },
  talk: {
    lead: 'کاربر با صدا می‌گوید: «جمعه هم مهمان داریم، برای شام شش نفر اضافه کن ولی بودجه کل از پنج میلیون بیشتر نشود.»',
    points: [
      'درک فرمان صوتی و محدودیت بودجه',
      'پیشنهاد منو و محاسبه مواد لازم',
      'اصلاح لحظه‌ای سبد در همان گفت‌وگو',
      'ترکیب اوکالا و تپسی‌فود در یک سفارش',
    ],
    callout: 'دستیار صرفاً چت‌بات نیست؛ نیت کاربر را به یک برنامه اجرایی کامل تبدیل می‌کند.',
  },
  optimize: {
    lead: 'سیستم سه نسخه از سبد را نشان می‌دهد تا انتخاب آگاهانه در دست کاربر باشد.',
    points: [
      'نسخه اقتصادی، متعادل و باکیفیت‌تر',
      'تفاوت قیمت و دلیل هر انتخاب شفاف است',
      'همه نسخه‌ها در سقف بودجه پنج میلیونی',
    ],
    callout: 'به‌جای یک پیشنهاد تحمیلی، کنترل نهایی با کاربر می‌ماند — با درک کامل تفاوت‌ها.',
  },
  pay: {
    lead: 'کاربر بخشی از مبلغ را از کیف پول یکپارچه و کش‌بک می‌پردازد و سفارش را ثبت می‌کند.',
    points: [
      'کیف پول و کش‌بک قابل استفاده در کل اکوسیستم',
      'خرید و پرداخت واقعی، نه صرفاً نمایشی',
      'ثبت سفارش در همان جریان گفت‌وگو',
    ],
    callout: 'اعتبار و کش‌بک به‌جای امتیازهای پراکنده، یک موجودی واحد قابل مصرف در چند سرویس است.',
  },
  tapsi: {
    lead: 'برای روز مهمانی، پلتفرم سفر تپسی را بر اساس ساعت اعلام‌شده به‌صورت خودکار آماده می‌کند.',
    points: [
      'اتصال خرید، زمان مهمانی و برنامه روز',
      'پیشنهاد خدمت مکمل در زمان مناسب',
      'یک زنجیره کامل از نیاز تا اجرا',
    ],
    callout: 'ارزش واقعی اکوسیستم اینجاست: سرویس‌های مستقل در قالب یک تجربه یکپارچه با هم همکاری می‌کنند.',
  },
  corporate: {
    lead: 'در پنل شرکتی، مدیر نتیجه همان کمپینی را می‌بیند که در سبد کاربر ظاهر شد.',
    points: [
      'گروه هدف در برابر گروه کنترل',
      'قیف تبدیل: نمایش تا خرید',
      'فروش افزایشی واقعی و اثر بر مبلغ سبد',
      'مقایسه A/B نسخه‌های آفر',
    ],
    callout: 'همان تجربه مصرف‌کننده، اکنون به‌صورت نتیجه قابل‌اندازه‌گیری سازمانی دیده می‌شود — در یک جریان واحد.',
  },
}

export default function App() {
  const [i, setI] = useState(0)
  const step = steps[i]

  const consumerScreens: Record<string, ReactNode> = {
    onboarding: <OnboardingScreen />,
    need: <NeedDetectionScreen />,
    cart: <SmartCartScreen />,
    talk: <ConversationScreen />,
    optimize: <OptimizationScreen />,
    pay: <PaymentScreen />,
    tapsi: <TapsiScreen />,
  }

  const n = narration[step.key]

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" />
          <div className="brand-text">
            <b>پلتفرم هوشمند گلرنگ</b>
            <span>دموی اثبات مفهوم · تجربه مصرف‌کننده تا نتیجه سازمانی</span>
          </div>
        </div>
        <span className="header-badge">سناریوی ۸ مرحله‌ای · سکشن ۲۰ پروپوزال</span>
      </header>

      <nav className="stepper" aria-label="مراحل دمو">
        {steps.map((s, idx) => (
          <button
            key={s.key}
            className={`step-pill${idx === i ? ' active' : idx < i ? ' done' : ''}`}
            onClick={() => setI(idx)}
          >
            <span className="num">{idx < i ? '✓' : toFa(s.n)}</span>
            {s.title}
          </button>
        ))}
      </nav>

      <main className="stage">
        <div className="stage-main" key={step.key}>
          {step.surface === 'phone' ? (
            <PhoneFrame>{consumerScreens[step.key]}</PhoneFrame>
          ) : (
            <CorporateDashboard />
          )}
        </div>

        <aside className="narration" key={`n-${step.key}`}>
          <div className="eyebrow">مرحله {toFa(step.n)} از ۸</div>
          <h2>{step.title}</h2>
          <p className="lead">{n.lead}</p>
          <ul>
            {n.points.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
          <div className="callout">
            <b>چرا مهم است؟ </b>
            {n.callout}
          </div>
        </aside>
      </main>

      <footer className="footer-nav">
        <button
          className="nav-btn"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
        >
          → مرحله قبل
        </button>
        <span className="nav-progress">
          {toFa(i + 1)} / {toFa(steps.length)}
        </span>
        <button
          className="nav-btn primary"
          onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
          disabled={i === steps.length - 1}
        >
          مرحله بعد ←
        </button>
      </footer>
    </div>
  )
}

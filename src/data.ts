// ─────────────────────────────────────────────────────────────────────────
//  داده‌های دموی پلتفرم هوشمند گلرنگ
//  بر اساس سکشن ۲۰ پروپوزال: «تجربه دموی اولیه و سناریوی اثبات مفهوم»
// ─────────────────────────────────────────────────────────────────────────

/** تبدیل ارقام لاتین به فارسی */
export function toFa(input: string | number): string {
  const fa = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return String(input).replace(/\d/g, (d) => fa[Number(d)])
}

/** قالب‌بندی مبلغ تومانی با جداکننده هزارگان و ارقام فارسی */
export function money(n: number): string {
  return toFa(n.toLocaleString('en-US'))
}

export type Category = 'grocery' | 'staple' | 'hygiene' | 'dairy' | 'protein' | 'ready'

export interface Product {
  id: string
  title: string
  brand?: string
  service: string // سرویس ارائه‌دهنده (اوکالا، تپسی‌فود، ...)
  price: number
  qty: number
  category: Category
  note?: string // برچسب توضیحی روی محصول
  tag?: 'frequent' | 'alt' | 'campaign' | 'guest' | 'athome'
}

// ── پرسونای کاربر (مرحله اول: شناخت اولیه) ─────────────────────────────────
export const persona = {
  name: 'خانم رضایی',
  household: 'خانواده چهار نفره',
  priorities: ['قیمت مناسب', 'کیفیت قابل‌اعتماد'],
  goalTitle: 'کنترل هزینه خرید ماهانه',
  monthlyBudget: 8_000_000,
  spentSoFar: 5_100_000,
  city: 'تهران',
}

// ── کیف پول یکپارچه ────────────────────────────────────────────────────────
export const wallet = {
  balance: 1_320_000,
  cashback: 210_000, // کش‌بک قابل استفاده
}

// ── سبد پیشنهادی اولیه (مرحله سوم: ساخت پیشنهاد) ───────────────────────────
// همه اقلام از اوکالا (بازوی آنلاین شبکه افق کوروش) تأمین می‌شوند.
// برندهای اکتیو، فامیلا، اویلا، مرسی، اوه و ساحل کنار از خانواده گلرنگ‌اند؛
// کاله، تلاونگ و گلستان برندهای پرفروش ایرانی در دسته‌هایی هستند که گلرنگ تولید نمی‌کند.
export const frequentItems: Product[] = [
  { id: 'rice', title: 'برنج ایرانی طارم ساحل کنار ۵ کیلوگرم', brand: 'ساحل کنار', service: 'اوکالا', price: 780_000, qty: 1, category: 'staple', tag: 'frequent' },
  { id: 'oil', title: 'روغن سرخ‌کردنی فامیلا ۱٫۸ لیتر', brand: 'فامیلا', service: 'اوکالا', price: 165_000, qty: 1, category: 'grocery', tag: 'frequent' },
  { id: 'milk', title: 'شیر پرچرب کاله ۱ لیتری (بسته ۶ عددی)', brand: 'کاله', service: 'اوکالا', price: 210_000, qty: 1, category: 'dairy', tag: 'frequent' },
  { id: 'egg', title: 'تخم‌مرغ تلاونگ بسته ۲۰ عددی', brand: 'تلاونگ', service: 'اوکالا', price: 190_000, qty: 1, category: 'protein', tag: 'frequent' },
  { id: 'dish', title: 'مایع ظرفشویی اکتیو ۳٫۵ لیتر', brand: 'اکتیو', service: 'اوکالا', price: 145_000, qty: 1, category: 'hygiene', tag: 'frequent' },
  { id: 'tissue', title: 'دستمال کاغذی مرسی (بسته ۶ قلو)', brand: 'مرسی', service: 'اوکالا', price: 132_000, qty: 1, category: 'hygiene', tag: 'frequent' },
]

// دو جایگزین اقتصادی
export const economicAlternatives: {
  replaces: string
  from: Product
  to: Product
  saving: number
}[] = [
  {
    replaces: 'rice',
    from: frequentItems[0],
    to: { id: 'rice-alt', title: 'برنج ایرانی اسپه درجه ۲ ۵ کیلوگرم', brand: 'اسپه', service: 'اوکالا', price: 620_000, qty: 1, category: 'staple', tag: 'alt', note: 'جایگزین اقتصادی' },
    saving: 160_000,
  },
  {
    replaces: 'oil',
    from: frequentItems[1],
    to: { id: 'oil-alt', title: 'روغن مایع آفتابگردان اویلا ۱٫۸ لیتر', brand: 'اویلا', service: 'اوکالا', price: 128_000, qty: 1, category: 'grocery', tag: 'alt', note: 'جایگزین اقتصادی' },
    saving: 37_000,
  },
]

// یک محصول دارای کمپین (همان محصولی که در پنل سازمانی اندازه‌گیری می‌شود)
export const campaignItem: Product = {
  id: 'campaign',
  title: 'مایع دستشویی اوه فرمول نچرال — محصول جدید',
  brand: 'اوه',
  service: 'اوکالا',
  price: 98_000,
  qty: 1,
  category: 'hygiene',
  tag: 'campaign',
  note: 'کش‌بک کمپین ۱۵٪',
}

// اقلامی که احتمالاً هنوز در خانه موجودند و فعالانه حذف شده‌اند
export const atHomeItems: Product[] = [
  { id: 'salt', title: 'نمک یددار گلها ۵۰۰ گرم', brand: 'گلها', service: 'اوکالا', price: 22_000, qty: 1, category: 'grocery', tag: 'athome', note: 'احتمالاً موجود است' },
  { id: 'turmeric', title: 'زردچوبه گلستان ۱۰۰ گرم', brand: 'گلستان', service: 'اوکالا', price: 35_000, qty: 1, category: 'grocery', tag: 'athome', note: 'احتمالاً موجود است' },
]

// ── سناریوی مهمانی (مرحله چهارم: گفت‌وگو) ──────────────────────────────────
export const guestRequest =
  'جمعه هم مهمان داریم، برای شام شش نفر هم اضافه کن ولی بودجه کل از پنج میلیون بیشتر نشود.'

export const guestMenu = {
  title: 'زرشک‌پلو با مرغ + مخلفات',
  serves: 6,
  prepMinutes: 75,
  ingredients: [
    { id: 'chicken', title: 'مرغ کامل تازه پویا پروتئین ۳ کیلوگرم', brand: 'پویا پروتئین', service: 'اوکالا', price: 540_000, qty: 1, category: 'protein' as Category, tag: 'guest' as const },
    { id: 'barberry', title: 'زرشک پفکی اعلا ۲۰۰ گرم', service: 'اوکالا', price: 96_000, qty: 1, category: 'grocery' as Category, tag: 'guest' as const },
    { id: 'saffron', title: 'زعفران سرگل گلستان ۱ مثقال', brand: 'گلستان', service: 'اوکالا', price: 320_000, qty: 1, category: 'grocery' as Category, tag: 'guest' as const },
    { id: 'salad', title: 'سبزیجات سالاد شیرازی', service: 'اوکالا', price: 85_000, qty: 1, category: 'grocery' as Category, tag: 'guest' as const },
    { id: 'drink', title: 'دوغ کاله ۱٫۵ لیتر (۲ عدد)', brand: 'کاله', service: 'اوکالا', price: 110_000, qty: 1, category: 'grocery' as Category, tag: 'guest' as const },
  ],
  readyItem: { id: 'dessert', title: 'دسر ژله‌ای مجلسی (۶ نفره)', service: 'تپسی‌فود', price: 180_000, qty: 1, category: 'ready' as Category, tag: 'guest' as const, note: 'آماده — از تپسی‌فود' },
}

// ── سه نسخه سبد (مرحله پنجم: بهینه‌سازی) ────────────────────────────────────
export interface CartVariant {
  id: 'economy' | 'balanced' | 'premium'
  label: string
  total: number
  color: string
  reasons: string[]
}

export const cartVariants: CartVariant[] = [
  {
    id: 'economy',
    label: 'اقتصادی',
    total: 4_280_000,
    color: 'var(--c-green)',
    reasons: [
      'استفاده از جایگزین‌های ارزان‌تر برنج و روغن',
      'حذف اقلام موجود در خانه',
      'انتخاب برند اقتصادی برای مخلفات',
    ],
  },
  {
    id: 'balanced',
    label: 'متعادل',
    total: 4_650_000,
    color: 'var(--c-primary)',
    reasons: [
      'تعادل میان قیمت و کیفیت',
      'حفظ برندهای پرتکرار خانواده',
      'بهره‌گیری از کش‌بک محصول کمپینی',
    ],
  },
  {
    id: 'premium',
    label: 'باکیفیت‌تر',
    total: 4_980_000,
    color: 'var(--c-orange)',
    reasons: [
      'برندهای اصلی و مرغ تازه ممتاز',
      'زعفران سرگل درجه یک برای مهمانی',
      'در محدوده بودجه پنج میلیونی',
    ],
  },
]
export const recommendedVariant: CartVariant['id'] = 'balanced'

// ── سفر مکمل تپسی (مرحله هفتم) ──────────────────────────────────────────────
export const tapsiTrip = {
  day: 'جمعه',
  time: '۱۸:۳۰',
  origin: 'منزل — خیابان ولیعصر',
  destination: 'قنادی محله برای تهیه شیرینی تازه',
  estimatedFare: 145_000,
  reason: 'بر اساس ساعت مهمانی اعلام‌شده، پیش از رسیدن مهمان‌ها آماده شده است.',
}

// ── پنل سازمانی B2B (مرحله هشتم: نمایش سازمانی) ────────────────────────────
export const corporate = {
  campaignName: 'معرفی مایع دستشویی اوه فرمول نچرال',
  company: 'گروه صنعتی گلرنگ — واحد بهداشتی',
  window: '۱۴ روز اجرا',
  targetSize: 12_400,
  controlSize: 3_100,
  funnel: [
    { stage: 'نمایش پیشنهاد', value: 12_400, pct: 100 },
    { stage: 'باز کردن', value: 7_940, pct: 64 },
    { stage: 'پذیرش پیشنهاد', value: 2_980, pct: 24 },
    { stage: 'خرید', value: 1_860, pct: 15 },
  ],
  purchaseRateTarget: 15.0, // نرخ خرید گروه هدف (٪)
  purchaseRateControl: 9.2, // نرخ خرید گروه کنترل (٪)
  incrementalBuyers: 719, // خرید افزایشی نسبت به کنترل
  incrementalRevenue: 70_400_000, // ارزش فروش افزایشی (تومان)
  basketUplift: 8.4, // اثر بر میانگین مبلغ سبد (٪)
  roas: 4.2,
  offerVariants: [
    { id: 'a', label: 'نسخه A — ارسال رایگان', purchaseRate: 16.1, winner: true },
    { id: 'b', label: 'نسخه B — کش‌بک ۱۵٪', purchaseRate: 13.9, winner: false },
  ],
}

// ── تعریف هشت مرحله سناریوی دمو ─────────────────────────────────────────────
export interface StepDef {
  n: number
  key: string
  title: string
  subtitle: string
  surface: 'phone' | 'dashboard'
}

export const steps: StepDef[] = [
  { n: 1, key: 'onboarding', title: 'شناخت اولیه', subtitle: 'ثبت‌نام و تعریف اولویت‌ها و هدف مالی', surface: 'phone' },
  { n: 2, key: 'need', title: 'تشخیص نیاز', subtitle: 'دستیار زمان خرید ماهانه را پیش‌بینی می‌کند', surface: 'phone' },
  { n: 3, key: 'cart', title: 'ساخت پیشنهاد', subtitle: 'سبد هوشمند با جایگزین، کمپین و حذف اقلام موجود', surface: 'phone' },
  { n: 4, key: 'talk', title: 'گفت‌وگو', subtitle: 'افزودن مهمانی جمعه با فرمان صوتی و بودجه مشخص', surface: 'phone' },
  { n: 5, key: 'optimize', title: 'بهینه‌سازی', subtitle: 'سه نسخه سبد؛ اقتصادی، متعادل و باکیفیت‌تر', surface: 'phone' },
  { n: 6, key: 'pay', title: 'پرداخت و ثبت سفارش', subtitle: 'پرداخت بخشی از مبلغ از کیف پول یکپارچه', surface: 'phone' },
  { n: 7, key: 'tapsi', title: 'خدمت مکمل', subtitle: 'آماده‌سازی خودکار سفر تپسی برای روز مهمانی', surface: 'phone' },
  { n: 8, key: 'corporate', title: 'نمایش سازمانی', subtitle: 'اندازه‌گیری نتیجه کمپین در پنل شرکتی B2B', surface: 'dashboard' },
]

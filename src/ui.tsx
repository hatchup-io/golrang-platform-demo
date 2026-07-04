import type { ReactNode } from 'react'
import type { Category, Product } from './data'
import { money, toFa } from './data'

// شکلک نماینده هر دسته کالا
const catEmoji: Record<Category, string> = {
  staple: '🍚',
  grocery: '🫙',
  hygiene: '🧴',
  dairy: '🥛',
  protein: '🥚',
  ready: '🍮',
}

export function ProductRow({
  p,
  removed = false,
  right,
}: {
  p: Product
  removed?: boolean
  right?: ReactNode
}) {
  return (
    <div className={`product${removed ? ' removed' : ''}`}>
      <div className={`thumb cat-${p.category}`}>{catEmoji[p.category]}</div>
      <div className="meta">
        <b>{p.title}</b>
        <small>
          {p.service}
          {p.note ? ` · ${p.note}` : ''}
        </small>
      </div>
      {right ?? <div className="price">{money(p.price)} ت</div>}
    </div>
  )
}

// قاب موبایل با نوار وضعیت و ساختار اسکرول
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="status-bar">
          <span>{toFa('9:41')}</span>
          <span className="dots">
            <i />
            <i />
            <i />
            <span style={{ marginInlineStart: 4 }}>{toFa('۹۶٪')}</span>
          </span>
        </div>
        <div className="screen-body">{children}</div>
      </div>
    </div>
  )
}

// سربرگ داخل اپ (سلام + آواتار)
export function AppTopbar({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="app-topbar">
      <div className="hi">
        <b>سلام {name} 👋</b>
        <br />
        <span>{sub}</span>
      </div>
      <div className="avatar">{name.replace('خانم ', '').charAt(0)}</div>
    </div>
  )
}

export function Chip({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={`chip ${tone}`}>{children}</span>
}

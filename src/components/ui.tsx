import type { ReactNode } from 'react'

export function Dot({ c, pulse = false }: { c: 'green' | 'amber' | 'red' | 'blue' | 'gray'; pulse?: boolean }) {
  const cls = {
    green: 'bg-emerald-400 shadow-[0_0_8px_#4ade80]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    red: 'bg-red-400 shadow-[0_0_8px_#f87171]',
    blue: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]',
    gray: 'bg-slate-600',
  }
  return <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${cls[c]} ${pulse ? 'animate-pulse-slow' : ''}`} />
}

export function Pill({ label, c }: { label: string; c: 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'purple' }) {
  const cls = {
    green: 'bg-emerald-900/25 text-emerald-400 border-emerald-800/50',
    amber: 'bg-amber-900/25 text-amber-400 border-amber-800/50',
    red: 'bg-red-900/25 text-red-400 border-red-800/50',
    blue: 'bg-blue-900/25 text-blue-400 border-blue-800/50',
    gray: 'bg-slate-800/60 text-slate-400 border-slate-700/50',
    purple: 'bg-purple-900/25 text-purple-400 border-purple-800/50',
  }
  return (
    <span className={`font-mono text-[9px] font-bold px-2 py-[3px] rounded border tracking-[0.14em] uppercase select-none ${cls[c]}`}>
      {label}
    </span>
  )
}

export function Card({
  children, className = '', glow,
}: { children: ReactNode; className?: string; glow?: 'amber' | 'red' | 'green' | 'blue' }) {
  const glowCls = {
    amber: 'border-amber-800/60 shadow-[0_0_20px_rgba(245,158,11,0.08)]',
    red: 'border-red-800/60 shadow-[0_0_20px_rgba(239,68,68,0.1)]',
    green: 'border-emerald-800/60 shadow-[0_0_20px_rgba(74,222,128,0.08)]',
    blue: 'border-blue-800/60 shadow-[0_0_20px_rgba(96,165,250,0.08)]',
  }
  return (
    <div className={`bg-[#0b1120] border border-[#1a2d45] rounded-lg overflow-hidden ${glow ? glowCls[glow] : ''} ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, extra }: { title: string; extra?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a2d45] bg-[#070e1c]">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.16em]">{title}</span>
      {extra}
    </div>
  )
}

export function KV({ k, v, mono = false, vcolor }: { k: string; v: ReactNode; mono?: boolean; vcolor?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-slate-500 text-xs">{k}</span>
      <span className={`text-xs ${mono ? 'font-mono' : ''} ${vcolor ?? 'text-slate-200'}`}>{v}</span>
    </div>
  )
}

export function Btn({
  children, onClick, variant = 'default', disabled = false, size = 'md', className = '',
}: {
  children: ReactNode
  onClick?: () => void
  variant?: 'default' | 'primary' | 'danger' | 'amber' | 'ghost' | 'green'
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded transition-all cursor-pointer select-none border'
  const sizes = { sm: 'text-[11px] px-3 py-1.5', md: 'text-xs px-4 py-2', lg: 'text-sm px-5 py-2.5' }
  const variants = {
    default: 'bg-[#111d35] border-[#253d5a] text-slate-200 hover:bg-[#172444] hover:border-[#3a5578]',
    primary: 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500',
    danger: 'bg-red-900/40 border-red-700/60 text-red-300 hover:bg-red-900/60 hover:border-red-600',
    amber: 'bg-amber-900/30 border-amber-700/50 text-amber-300 hover:bg-amber-900/50',
    ghost: 'bg-transparent border-[#1a2d45] text-slate-400 hover:text-slate-200 hover:border-[#253d5a]',
    green: 'bg-emerald-900/30 border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/50',
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-base font-semibold text-slate-100 mb-1">{children}</h2>
}

export function SectionSubtitle({ children }: { children: ReactNode }) {
  return <p className="text-xs text-slate-500 mb-4 leading-relaxed">{children}</p>
}

export function Divider() {
  return <div className="border-t border-[#1a2d45] my-3" />
}

export function SuccessBanner({ children }: { children: ReactNode }) {
  return (
    <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-lg p-4 animate-slide-in">
      <div className="flex items-start gap-3">
        <Dot c="green" />
        <div className="text-xs text-emerald-300 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function InfoBox({ children, color = 'blue' }: { children: ReactNode; color?: 'blue' | 'amber' | 'red' }) {
  const cls = {
    blue: 'bg-blue-900/15 border-blue-800/40 text-blue-300',
    amber: 'bg-amber-900/15 border-amber-800/40 text-amber-300',
    red: 'bg-red-900/15 border-red-800/40 text-red-300',
  }
  return (
    <div className={`border rounded p-3 text-xs leading-relaxed ${cls[color]}`}>{children}</div>
  )
}

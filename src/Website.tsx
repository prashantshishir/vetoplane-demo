import { useState, useEffect, useRef } from 'react'

interface WebsiteProps {
  onEnterDemo: () => void
  onWatchAutoDemo: () => void
}

export default function Website({ onEnterDemo, onWatchAutoDemo }: WebsiteProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const navLinks = [
    { label: 'Product', id: 'product' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Use Cases', id: 'use-cases' },
    { label: 'Architecture', id: 'architecture' },
    { label: 'Founder', id: 'about' },
  ]

  return (
    <div className="min-h-screen bg-[#03050c] text-slate-200" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ── Nav ── */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#04070f]/95 backdrop-blur border-b border-[#111d30]' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/assets/vetoplane-logo.png" alt="VetoPlane" className="h-11 w-auto object-contain" style={{ maxWidth: 258, mixBlendMode: 'screen' }} />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-[13px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                {l.label}
              </button>
            ))}
            <button onClick={onEnterDemo}
              className="text-[13px] text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
              Demo ↗
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onEnterDemo}
              className="text-[13px] text-slate-300 hover:text-white px-4 py-1.5 rounded border border-[#1a2d45] hover:border-[#253d5a] transition-colors cursor-pointer">
              View Demo
            </button>
            <button onClick={() => scrollTo('contact')}
              className="text-[13px] font-medium text-white px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer">
              Talk to VetoPlane
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-slate-400 hover:text-slate-200 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#111d30] bg-[#04070f]/98 px-6 py-4 flex flex-col gap-4">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-sm text-slate-300 hover:text-white text-left cursor-pointer">{l.label}</button>
            ))}
            <button onClick={onEnterDemo} className="text-sm text-blue-400 hover:text-blue-300 text-left cursor-pointer">Demo ↗</button>
            <button onClick={() => { scrollTo('contact'); setMobileOpen(false) }}
              className="text-sm font-medium text-white px-4 py-2 rounded bg-blue-600 text-center cursor-pointer">Talk to VetoPlane</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)'
        }} />

        <div className="relative max-w-5xl w-full text-center space-y-8">
          {/* Eyebrow */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-700/40 bg-blue-900/15 text-[11px] font-semibold text-blue-400 tracking-[0.15em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Agent Execution Security &amp; Governance
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 leading-[1.05] tracking-tight">
              The Control Plane for<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #818cf8 100%)' }}>
                Autonomous AI Execution.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              VetoPlane is the execution-control layer between autonomous AI agents and the enterprise systems they can affect — governing identity, policy, approvals, runtime execution and evidence at transaction time.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={onWatchAutoDemo}
              className="flex items-center gap-2 px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-blue-900/40 cursor-pointer">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
              Watch Auto Demo
            </button>
            <button onClick={onEnterDemo}
              className="px-6 py-3 rounded border border-[#1a2d45] hover:border-[#253d5a] text-slate-300 hover:text-white font-medium transition-colors cursor-pointer">
              Explore Interactive Demo
            </button>
            <button onClick={() => scrollTo('architecture')}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer">
              Explore the Architecture →
            </button>
          </div>
        </div>

        {/* Hero architecture visualization */}
        <div className="relative mt-16 w-full max-w-4xl">
          <HeroArchDiagram onEnterDemo={onWatchAutoDemo} />
        </div>
      </section>

      {/* ── Inflection Point ── */}
      <section id="how-it-works" className="py-28 px-6 border-t border-[#0d1829]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">The Problem</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight mb-6">
              Software Is Becoming Agentic.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Earlier generations of software primarily responded to explicit application workflows.
              Modern AI agents can interpret goals, select tools, invoke APIs, modify records, and continue execution across multiple systems.
            </p>
          </div>

          <EvolutionTimeline />

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="inline-block px-6 py-4 rounded-xl border border-amber-700/30 bg-amber-900/10">
              <p className="text-amber-300 font-medium text-lg leading-relaxed">
                The security boundary is changing — because the software itself can now decide what action to take.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Security Problem ── */}
      <section className="py-28 px-6 bg-[#04070f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-amber-500 tracking-[0.2em] uppercase mb-4">New Attack Surface</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
              When Software Can Act, Access Control<br className="hidden md:block" /> Isn't the Whole Story.
            </h2>
          </div>

          <SecurityCompare />

          <div className="mt-16 text-center">
            <p className="text-slate-400 text-lg">
              <span className="text-slate-200 font-medium">VetoPlane adds an execution-control layer</span> for autonomous software.
            </p>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="product" className="py-28 px-6 border-t border-[#0d1829]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Platform</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              An Execution Control Plane<br className="hidden md:block" /> for AI Agents
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Access control answers WHO. VetoPlane governs WHAT HAPPENS.
            </p>
          </div>

          <CapabilityCards />
        </div>
      </section>

      {/* ── Transaction Governance ── */}
      <section className="py-28 px-6 bg-[#04070f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Transaction-Level Governance</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              Don't Just Authorize the Agent.<br className="hidden md:block" /> Govern the Transaction.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Every agent execution is evaluated at transaction time — not just at login.
              VetoPlane knows exactly who is acting, what they're trying to do, and whether that action is permitted to execute.
            </p>
          </div>

          <TransactionGovViz onEnterDemo={onWatchAutoDemo} />
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section id="use-cases" className="py-28 px-6 border-t border-[#0d1829]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Audiences</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">Built for Every Enterprise Leader</h2>
          </div>
          <AudienceCards />
        </div>
      </section>

      {/* ── Architecture ── */}
      <section id="architecture" className="py-28 px-6 bg-[#04070f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Architecture</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight mb-4">
              Add an Execution-Control Layer Without Replacing<br className="hidden md:block" /> What You Already Operate.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              VetoPlane's execution gateway deploys inside your environment, beside your existing API gateway and MCP server.
              The control plane manages identity, policy, and configuration. Your existing infrastructure stays in place.
            </p>
          </div>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* ── Demo CTA ── */}
      <section className="py-28 px-6 border-t border-[#0d1829]">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase">Interactive Demo</div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
            See VetoPlane in Action.
          </h2>
          <p className="text-slate-400 text-lg">
            Walk through a complete end-to-end scenario: agent registration, tool binding, policy, stale configuration reconciliation, human approval, execution, and ledger — all in a live interactive prototype.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={onWatchAutoDemo}
              className="flex items-center gap-2 px-8 py-3.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-base transition-all hover:shadow-xl hover:shadow-blue-900/40 cursor-pointer">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
              Watch Auto Demo
            </button>
            <button onClick={onEnterDemo}
              className="px-8 py-3.5 rounded border border-[#1a2d45] hover:border-[#253d5a] text-slate-300 hover:text-white font-medium text-base transition-colors cursor-pointer">
              Explore Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section id="about" className="py-28 px-6 bg-[#04070f] border-t border-[#0d1829]">
        <FounderSection onTalkToFounder={() => setChatOpen(true)} />
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6 border-t border-[#0d1829]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
            Talk to VetoPlane.
          </h2>
          <p className="text-slate-400 text-lg">
            We're speaking with a focused set of enterprises and investors thinking seriously about autonomous execution governance.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Design Partners', desc: 'Production deployments where execution governance matters' },
              { title: 'Investors', desc: 'Backing infrastructure for the agentic era' },
            ].map(c => (
              <div key={c.title} className="p-6 rounded-xl border border-[#1a2d45] bg-[#060b17] text-left space-y-2 hover:border-[#253d5a] transition-colors">
                <div className="font-semibold text-slate-100">{c.title}</div>
                <div className="text-sm text-slate-400">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="pt-4 space-y-4">
            <button onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-base transition-all hover:shadow-xl hover:shadow-blue-900/40 cursor-pointer">
              Connect with Prashant →
            </button>
            <div className="text-sm text-slate-500">
              or email directly:{' '}
              <a href="mailto:support@vetoplane.com" className="font-mono text-blue-400 hover:text-blue-300 transition-colors">
                support@vetoplane.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Chat Modal ── */}
      {chatOpen && <FounderChatModal onClose={() => setChatOpen(false)} />}

      {/* ── Footer ── */}
      <footer className="border-t border-[#0d1829] py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src="/assets/vetoplane-logo.png" alt="VetoPlane" className="h-10 w-auto object-contain" style={{ maxWidth: 235, mixBlendMode: 'screen' }} />
          </div>
          <div className="text-[11px] text-slate-600 font-mono">Agent Execution Control Plane · Governing what autonomous agents are allowed to execute.</div>
          <button onClick={onEnterDemo} className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
            Interactive Demo ↗
          </button>
        </div>
      </footer>
    </div>
  )
}

// ── Founder Section ────────────────────────────────────────────────────────────
function FounderSection({ onTalkToFounder }: { onTalkToFounder: () => void }) {
  const cards = [
    { stat: '25+ Years', label: 'Engineering & Technology Leadership' },
    { stat: 'Cloud + SaaS', label: 'Infrastructure & Platform Systems' },
    { stat: 'Global Scale', label: 'Multi-Region Enterprise Platforms' },
    { stat: 'AI Infrastructure', label: 'RAG · Agentic AI · MCP · Multi-Agent Systems' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="text-[11px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Built by an Infrastructure &amp; Technology Executive</div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Prashant Shishir
        </h2>
        <p className="text-slate-400 mt-3 text-lg">Founder, VetoPlane</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Avatar column */}
        <div className="lg:col-span-2 flex flex-col items-center gap-6">
          <div className="relative w-52 h-64">
            <img
              src="/assets/founder-photo.jpg"
              alt="Prashant Shishir, Founder of VetoPlane"
              className="w-52 h-64 rounded-2xl object-cover object-center border border-blue-700/40 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-blue-600/20" />
          </div>

          <div className="text-center space-y-1">
            <div className="text-lg font-semibold text-slate-100">Prashant Shishir</div>
            <div className="text-sm text-blue-400 font-medium">Founder</div>
            <div className="text-xs text-slate-500">VetoPlane</div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <button onClick={onTalkToFounder}
              className="w-full py-2.5 px-4 rounded border border-blue-700/40 bg-blue-900/20 text-blue-300 hover:bg-blue-900/40 text-sm font-medium transition-colors cursor-pointer">
              Talk to the Founder
            </button>
          </div>
        </div>

        {/* Bio column */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              Prashant Shishir is an engineering and technology executive with 25+ years of experience building and scaling cloud infrastructure, distributed platforms, SaaS/PaaS products, enterprise databases, SRE organizations and enterprise AI capabilities.
            </p>
            <p>
              His career has focused on a recurring challenge: how do you turn increasingly powerful technology into infrastructure that enterprises can operate safely, reliably and at scale?
            </p>
            <p>
              He has built and led global engineering organizations, large-scale cloud and SaaS platforms, multi-region infrastructure, enterprise modernization programs and AI initiatives spanning RAG, agentic AI, MCP ecosystems, multi-agent orchestration and AI-augmented operations.
            </p>
          </div>

          <div className="border-l-2 border-blue-700/40 pl-5 py-2">
            <p className="text-slate-200 text-base leading-relaxed">
              VetoPlane extends that experience into a new infrastructure problem created by autonomous software.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-blue-700/20 bg-blue-950/10">
            <p className="text-slate-200 font-medium leading-relaxed">
              "When AI agents can take actions on behalf of people and businesses, enterprises need a control layer for what those actions are actually allowed to execute."
            </p>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Prashant founded VetoPlane to build that layer — connecting agent identity, deterministic policy, transaction-level governance, human approval, runtime enforcement and execution evidence into a single control plane.
          </p>

          {/* Credibility cards */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {cards.map(c => (
              <div key={c.stat} className="p-4 rounded-xl border border-[#111d30] bg-[#060b17]">
                <div className="text-blue-400 font-bold text-sm mb-1">{c.stat}</div>
                <div className="text-xs text-slate-500">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const CONTACT_EMAIL = 'support@vetoplane.com'

// ── Founder Chat Modal ─────────────────────────────────────────────────────────
function FounderChatModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [intent, setIntent] = useState('General Inquiry')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)

  const INTENTS = ['Design Partnership', 'Investor', 'Architecture Question', 'General Inquiry']

  const handleSend = () => {
    if (!name.trim()) return
    const now = new Date().toLocaleString('en-US', { timeZoneName: 'short' })
    const subject = `VetoPlane Inquiry — ${intent} — ${name}`
    const body = [
      `Name: ${name}`,
      email ? `Email: ${email}` : '',
      company ? `Company: ${company}` : '',
      role ? `Role: ${role}` : '',
      `Intent: ${intent}`,
      `Date: ${now}`,
      '',
      `Message:`,
      message || '(no message)',
    ].filter(Boolean).join('\n')

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl
    setOpened(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-md bg-[#060b17] border border-[#1a2d45] rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#111d30]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-blue-700/40 bg-blue-900/20 flex items-center justify-center text-xs font-bold text-blue-400">PS</div>
            <div>
              <div className="text-sm font-semibold text-slate-100">Prashant Shishir</div>
              <div className="text-[10px] text-slate-500">Founder, VetoPlane</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 transition-colors cursor-pointer text-lg leading-none">×</button>
        </div>

        {opened ? (
          <div className="px-5 py-12 text-center space-y-4">
            <div className="text-2xl text-emerald-400">✓</div>
            <div className="text-slate-200 font-medium">Your email client is ready.</div>
            <p className="text-sm text-slate-400">
              Your message has been composed and addressed to{' '}
              <span className="font-mono text-blue-400">{CONTACT_EMAIL}</span>.
              Send it from your email client to complete delivery.
            </p>
            <button onClick={onClose} className="mt-4 px-6 py-2 rounded border border-[#1a2d45] text-slate-400 hover:text-slate-200 text-sm transition-colors cursor-pointer">Close</button>
          </div>
        ) : (
          <div className="px-5 py-5 space-y-4">
            <div className="p-3 rounded-lg bg-[#080e1c] border border-[#0d1829] text-sm text-slate-400 leading-relaxed">
              Connect directly with Prashant to discuss design partnerships, investor conversations, or architecture questions.
            </div>
            <div className="space-y-3">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name *" required
                className="w-full px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-700/60" />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email" type="email"
                className="w-full px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-700/60" />
              <div className="grid grid-cols-2 gap-3">
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company"
                  className="px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-700/60" />
                <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role / Title"
                  className="px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-700/60" />
              </div>
              <select value={intent} onChange={e => setIntent(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm focus:outline-none focus:border-blue-700/60">
                {INTENTS.map(i => <option key={i}>{i}</option>)}
              </select>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="What would you like to discuss?"
                className="w-full px-3 py-2.5 rounded-lg bg-[#080e1c] border border-[#1a2d45] text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-700/60 resize-none" />
            </div>
            <button onClick={handleSend} disabled={!name.trim()}
              className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors cursor-pointer">
              Send Message →
            </button>
            <div className="text-center text-[10px] text-slate-600 font-mono">
              Delivered to {CONTACT_EMAIL}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Hero Architecture Diagram ──────────────────────────────────────────────────
function HeroArchDiagram({ onEnterDemo }: { onEnterDemo: () => void }) {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [txPos, setTxPos] = useState(0)

  useEffect(() => {
    let raf: number
    let start: number | null = null
    const CYCLE = 4000
    const animate = (ts: number) => {
      if (!start) start = ts
      const elapsed = (ts - start) % CYCLE
      setTxPos(elapsed / CYCLE)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  const controlNodes = [
    { id: 'identity', label: 'Identity', desc: 'Every agent action carries a verified execution identity — agent, tenant, environment.' },
    { id: 'policy', label: 'Policy', desc: 'Deterministic rules define what can execute automatically, what requires approval, and what is denied.' },
    { id: 'approval', label: 'Approval', desc: 'Transaction-bound approval gates tied to exact execution ID, arguments, and policy version.' },
    { id: 'execution', label: 'Execution', desc: 'Controlled execution with idempotency, rate limits, and fail-closed enforcement.' },
    { id: 'evidence', label: 'Evidence', desc: 'Every decision creates an immutable execution record — the complete chain of who, what, why, and what happened.' },
  ]

  const outerNodes = [
    { id: 'agents', label: 'AI Agents', pos: 'top' },
    { id: 'gateways', label: 'Existing Gateways', pos: 'top2' },
    { id: 'mcp', label: 'MCP / APIs / SaaS', pos: 'bottom2' },
    { id: 'enterprise', label: 'Enterprise Systems', pos: 'bottom' },
  ]

  // Particle moves: agents→gateways→agentsentry→mcp→enterprise
  const segments = [0, 0.2, 0.4, 0.7, 0.9, 1.0]
  const getParticlePos = (t: number) => {
    // map t→ vertical fraction in diagram
    if (t < 0.2) return { top: `${(t / 0.2) * 12}%`, opacity: 1 }
    if (t < 0.4) return { top: `${12 + ((t - 0.2) / 0.2) * 10}%`, opacity: 1 }
    if (t < 0.7) return { top: `${22 + ((t - 0.4) / 0.3) * 44}%`, opacity: 1 }
    if (t < 0.9) return { top: `${66 + ((t - 0.7) / 0.2) * 16}%`, opacity: 1 }
    return { top: `${82 + ((t - 0.9) / 0.1) * 14}%`, opacity: t > 0.97 ? (1 - (t - 0.97) / 0.03) : 1 }
  }
  const particle = getParticlePos(txPos)

  return (
    <div className="relative flex flex-col md:flex-row gap-8 items-start">
      {/* Main flow */}
      <div className="flex-1 relative">
        <div className="relative bg-[#060b17] border border-[#111d30] rounded-2xl p-8 overflow-hidden">
          {/* Particle */}
          <div className="absolute left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/60 z-20 transition-none pointer-events-none"
            style={{ top: particle.top, opacity: particle.opacity }} />

          <div className="flex flex-col items-center gap-0">
            {/* AI Agents */}
            <FlowNode label="AI Agents" color="slate" />
            <FlowArrow />
            <FlowNode label="Existing Gateways" color="slate" sub="Your existing API gateway — unchanged" />
            <FlowArrow />

            {/* VetoPlane block */}
            <div className="w-full border border-blue-700/40 rounded-xl bg-blue-950/10 p-4">
              <div className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase text-center mb-3">VetoPlane</div>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {controlNodes.map((n, i) => (
                  <div key={n.id} className="flex items-center gap-1.5">
                    <button
                      onMouseEnter={() => setActiveNode(n.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold border cursor-pointer transition-all ${
                        activeNode === n.id
                          ? 'bg-blue-700/40 border-blue-500/60 text-blue-200'
                          : 'bg-blue-900/20 border-blue-700/30 text-blue-300 hover:border-blue-600/50'
                      }`}
                    >{n.label}</button>
                    {i < controlNodes.length - 1 && <span className="text-blue-700 text-[10px]">→</span>}
                  </div>
                ))}
              </div>
              {activeNode && (
                <div className="mt-3 px-3 py-2 rounded bg-[#060b17] border border-blue-900/40 text-[11px] text-slate-300 text-center">
                  {controlNodes.find(n => n.id === activeNode)?.desc}
                </div>
              )}
            </div>

            <FlowArrow />
            <FlowNode label="MCP / APIs / SaaS / Databases" color="slate" />
            <FlowArrow />
            <FlowNode label="Enterprise Systems" color="slate" />
          </div>

          <div className="mt-5 pt-4 border-t border-[#0d1829] text-center text-[11px] text-slate-500">
            Works with the infrastructure enterprises already operate.
          </div>
        </div>
      </div>

      {/* Right sidebar: CTA */}
      <div className="md:w-64 flex flex-col gap-4">
        <div className="bg-[#060b17] border border-[#111d30] rounded-xl p-5 space-y-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Interactive Demo</div>
          <p className="text-sm text-slate-400">Walk the complete end-to-end governance flow — agent registration through execution ledger.</p>
          <button onClick={onEnterDemo}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
            Open Demo
          </button>
        </div>
        <div className="bg-[#060b17] border border-[#111d30] rounded-xl p-5 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Architecture</div>
          <div className="text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Customer-hosted gateway</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />VetoPlane control plane</div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" />Existing infrastructure preserved</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowNode({ label, color, sub }: { label: string; color: string; sub?: string }) {
  return (
    <div className="w-full">
      <div className={`flex flex-col items-center justify-center px-4 py-2.5 rounded-lg border text-sm font-medium ${
        color === 'slate' ? 'border-[#1a2d45] bg-[#080e1c] text-slate-300' : 'border-blue-700/50 bg-blue-900/20 text-blue-200'
      }`}>
        {label}
        {sub && <div className="text-[10px] text-slate-500 font-normal mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

function FlowArrow() {
  return <div className="text-slate-700 text-xs leading-none py-1">↓</div>
}

// ── Evolution Timeline ─────────────────────────────────────────────────────────
function EvolutionTimeline() {
  const items = [
    { label: 'Applications', dim: true },
    { label: 'APIs', dim: true },
    { label: 'Cloud Services', dim: true },
    { label: 'SaaS Platforms', dim: true },
    { label: 'RAG / Copilots', dim: false },
    { label: 'Tool-Calling Agents', dim: false, accent: true },
    { label: 'Autonomous Agents', dim: false, accent: true, hot: true },
    { label: 'Multi-Agent Systems', dim: false, accent: true, hot: true },
  ]

  return (
    <div className="flex flex-col items-center gap-0 max-w-sm mx-auto">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col items-center w-full">
          <div className={`w-full text-center px-5 py-2.5 rounded-lg text-sm font-medium border transition-all ${
            item.hot
              ? 'border-blue-600/50 bg-blue-900/20 text-blue-200 shadow-sm shadow-blue-900/30'
              : item.accent
              ? 'border-[#1a2d45] bg-[#060b17] text-slate-300'
              : 'border-[#0d1829] bg-transparent text-slate-600'
          }`}>
            {item.label}
            {item.hot && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-700/30 text-blue-400">NOW</span>}
          </div>
          {i < items.length - 1 && <div className="text-slate-700 text-xs py-0.5">↓</div>}
        </div>
      ))}
    </div>
  )
}

// ── Security Comparison ────────────────────────────────────────────────────────
function SecurityCompare() {
  const traditional = [
    'Identity & authentication',
    'Authorization & RBAC',
    'Network controls',
    'API gateway',
    'Rate limiting',
    'Secrets management',
    'Infrastructure policy',
  ]
  const agentQuestions = [
    'Which agent is requesting?',
    'Which tenant?',
    'Which tool and version?',
    'What exact arguments?',
    'Which policy version evaluated this?',
    'Does this require human approval?',
    'Has this exact transaction already been approved?',
    'Can the agent be immediately suspended?',
    'What happened downstream?',
    'What evidence remains?',
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-[#1a2d45] bg-[#060b17] p-6">
        <div className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">Traditional Controls</div>
        <div className="space-y-2">
          {traditional.map(item => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-slate-400">
              <span className="w-4 h-4 rounded flex items-center justify-center bg-emerald-900/30 border border-emerald-700/30 flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[#0d1829] text-[11px] text-slate-500">
          These still matter. VetoPlane adds a layer above them.
        </div>
      </div>

      <div className="rounded-xl border border-blue-700/30 bg-[#060b17] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-950/10" />
        <div className="relative">
          <div className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mb-4">Agent Execution Questions</div>
          <div className="space-y-2">
            {agentQuestions.map(item => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="w-4 h-4 rounded flex items-center justify-center bg-blue-900/40 border border-blue-700/40 flex-shrink-0 mt-0.5">
                  <span className="text-[8px] text-blue-400 font-bold">?</span>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Capability Cards ───────────────────────────────────────────────────────────
function CapabilityCards() {
  const caps = [
    {
      icon: '◈', title: 'Agent Identity',
      desc: 'Know which autonomous actor is requesting execution. Every transaction carries agent ID, tenant, and environment — evaluated at runtime.',
      accent: 'blue',
    },
    {
      icon: '⊞', title: 'Tool Registry',
      desc: 'Control which tools and immutable tool versions an agent can invoke. Policy decisions cannot silently change because a downstream schema changed.',
      accent: 'blue',
    },
    {
      icon: '⊟', title: 'Deterministic Policy',
      desc: 'Evaluate execution against explicit business and security rules. Allow, require approval, or deny — at the transaction level, not the session level.',
      accent: 'blue',
    },
    {
      icon: '⊕', title: 'Human Approval',
      desc: 'Transaction-bound approval gates for high-risk actions. Approval is tied to the exact execution ID, arguments, tool version, and policy version — single-use and expiring.',
      accent: 'amber',
    },
    {
      icon: '⊘', title: 'Runtime Protection',
      desc: 'Rate limits, agent suspension, configuration freshness, fail-closed enforcement, and replay protection. Control the execution plane in real time.',
      accent: 'amber',
    },
    {
      icon: '≡', title: 'Execution Ledger',
      desc: 'Every agent action creates an immutable execution record — who acted, what was attempted, which policy decided, what approval existed, and what actually executed downstream.',
      accent: 'emerald',
    },
    {
      icon: '⊗', title: 'Tenant Isolation',
      desc: 'Execution context and policy boundaries remain isolated across tenants and environments. One agent cannot affect another tenant\'s execution path.',
      accent: 'emerald',
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {caps.map(c => (
        <div key={c.title} className={`p-5 rounded-xl border bg-[#060b17] hover:border-[#253d5a] transition-colors group ${
          c.accent === 'blue' ? 'border-[#111d30]'
          : c.accent === 'amber' ? 'border-[#111d30]'
          : 'border-[#111d30]'
        }`}>
          <div className={`text-xl mb-3 ${
            c.accent === 'blue' ? 'text-blue-400'
            : c.accent === 'amber' ? 'text-amber-400'
            : 'text-emerald-400'
          }`}>{c.icon}</div>
          <div className="font-semibold text-slate-200 mb-2 text-sm">{c.title}</div>
          <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ── Transaction Governance Visualization ──────────────────────────────────────
function TransactionGovViz({ onEnterDemo }: { onEnterDemo: () => void }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const govFields = [
    { label: 'WHO',          value: 'Customer Support Agent', sub: 'agent-support-prod-01',                color: 'blue' },
    { label: 'TENANT',       value: 'Acme Commerce',          sub: 'tenant-acme-prod',                    color: 'blue' },
    { label: 'WHAT',         value: 'delete_customer',        sub: 'tool call',                           color: 'blue' },
    { label: 'VERSION',      value: 'v1',                     sub: 'immutable — schema locked',           color: 'blue' },
    { label: 'ARGUMENTS',    value: 'CUST-10482',             sub: 'customer_id: CUST-10482',             color: 'amber' },
    { label: 'EXEC ID',      value: 'EXE-10482-7A91',         sub: 'single-use · expires in 08:42',       color: 'blue' },
    { label: 'POLICY',       value: 'v43',                    sub: 'Customer Support Production Policy',  color: 'blue' },
    { label: 'RISK',         value: 'CRITICAL / IRREVERSIBLE', sub: 'destructive action classification', color: 'amber' },
    { label: 'DECISION',     value: 'REQUIRE APPROVAL',       sub: 'critical action — human gate',        color: 'red' },
  ]

  useEffect(() => {
    if (!playing) return
    timerRef.current = setTimeout(() => setStep(s => (s + 1) % (govFields.length + 1)), step === 0 ? 1200 : 900)
    return () => clearTimeout(timerRef.current)
  }, [step, playing])

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      {/* Left: transaction card */}
      <div className="bg-[#060b17] border border-[#111d30] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Agent Transaction — Governance Decision
        </div>

        <div className="font-mono text-sm bg-[#030509] border border-[#0d1829] rounded-lg p-4 space-y-1">
          <div className="text-emerald-400">Customer Support Agent</div>
          <div className="text-slate-400 text-xs">↓ autonomous tool call</div>
          <div className="text-blue-300">delete_customer</div>
          <div className="text-slate-500 text-xs">  customer_id: CUST-10482</div>
          <div className="text-slate-600 text-xs mt-1">VetoPlane intercepts before enterprise system</div>
        </div>

        <div className="space-y-2">
          {govFields.map((f, i) => (
            <div key={f.label}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg border text-sm transition-all duration-300 ${
                i < step
                  ? f.color === 'red'
                    ? 'border-red-700/40 bg-red-900/15'
                    : f.color === 'amber'
                    ? 'border-amber-700/30 bg-amber-900/10'
                    : 'border-blue-700/25 bg-blue-900/10'
                  : 'border-[#0d1829] bg-transparent'
              }`}>
              <div className={`text-[9px] font-bold tracking-wider w-16 flex-shrink-0 ${
                i < step
                  ? f.color === 'red' ? 'text-red-400' : f.color === 'amber' ? 'text-amber-400' : 'text-blue-400'
                  : 'text-slate-700'
              }`}>{f.label}</div>
              <div className={`font-semibold transition-colors ${
                i < step
                  ? f.color === 'red' ? 'text-red-300' : f.color === 'amber' ? 'text-amber-200' : 'text-slate-100'
                  : 'text-slate-700'
              }`}>{f.value}</div>
              {i < step && <div className={`text-[10px] ml-auto flex-shrink-0 ${
                f.color === 'red' ? 'text-red-500' : 'text-slate-500'
              }`}>{f.sub}</div>}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={() => { setPlaying(!playing) }}
            className="text-[11px] px-3 py-1.5 rounded border border-[#1a2d45] text-slate-400 hover:text-slate-200 hover:border-[#253d5a] transition-colors cursor-pointer">
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setStep(0) }}
            className="text-[11px] px-3 py-1.5 rounded border border-[#1a2d45] text-slate-400 hover:text-slate-200 hover:border-[#253d5a] transition-colors cursor-pointer">
            Restart
          </button>
          <button onClick={onEnterDemo}
            className="ml-auto text-[11px] px-3 py-1.5 rounded bg-blue-900/30 border border-blue-700/40 text-blue-300 hover:bg-blue-900/50 transition-colors cursor-pointer">
            Full Demo →
          </button>
        </div>
      </div>

      {/* Right: explanation */}
      <div className="space-y-6">
        <div className="space-y-4">
          {[
            {
              title: 'Not session-level. Transaction-level.',
              body: 'Traditional access control authorizes the agent to connect. VetoPlane evaluates whether this specific action, with these arguments, under this policy, is permitted to execute right now.',
            },
            {
              title: 'Every field is bound.',
              body: 'The governance decision references the exact agent, tenant, tool version, argument set, policy version, and execution ID. There is no generic "action permission." There is a specific permitted transaction.',
            },
            {
              title: 'Approval is single-use.',
              body: 'When approval is required, it is cryptographically bound to the exact transaction. Approving this execution does not permit the next one. The approval is single-use and consumed before execution.',
            },
            {
              title: 'Evidence is automatic.',
              body: 'Every governance decision creates an execution record. The ledger provides a complete chain from agent request through policy evaluation, approval, downstream execution, and final outcome.',
            },
          ].map(item => (
            <div key={item.title} className="border-l-2 border-[#1a2d45] pl-4 space-y-1">
              <div className="text-sm font-semibold text-slate-200">{item.title}</div>
              <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Audience Cards ─────────────────────────────────────────────────────────────
function AudienceCards() {
  const audiences = [
    {
      role: 'Founder',
      headline: 'Deploy autonomous AI with defined execution boundaries.',
      points: [
        'Autonomous agents are becoming business actors',
        'This creates a new enterprise execution risk',
        'VetoPlane creates a deterministic control layer',
        'Works with existing infrastructure',
        'Platform scales across the enterprise',
      ],
    },
    {
      role: 'CTO',
      headline: 'Add an execution-control layer without replacing what you already operate.',
      points: [
        'Customer-hosted execution gateway',
        'Existing gateway preserved',
        'Control plane vs execution plane separation',
        'Fail-closed enforcement',
        'MCP and API integration',
      ],
    },
    {
      role: 'CISO',
      headline: 'Make autonomous execution explicit, bounded, observable and revocable.',
      points: [
        'Deterministic, auditable policy',
        'Transaction-bound approvals with replay protection',
        'Emergency agent suspension',
        'Fail-closed on control plane disconnect',
        'Complete execution evidence chain',
      ],
    },
    {
      role: 'CPO',
      headline: 'Move from AI that recommends actions to AI that can safely execute them.',
      points: [
        'Policy defines execution boundaries for autonomous actions',
        'Approval gates introduced selectively',
        'No need to build execution governance',
        'Transaction-level control over agent actions',
        'Ship agentic features with confidence',
      ],
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {audiences.map(a => (
        <div key={a.role} className="bg-[#060b17] border border-[#111d30] rounded-xl p-5 hover:border-[#1a2d45] transition-colors">
          <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border border-blue-700/40 text-blue-400 mb-3">{a.role}</div>
          <p className="text-sm font-semibold text-slate-200 leading-snug mb-4">{a.headline}</p>
          <ul className="space-y-1.5">
            {a.points.map(p => (
              <li key={p} className="flex items-start gap-2 text-xs text-slate-500">
                <span className="text-blue-600 mt-0.5 flex-shrink-0">·</span>{p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ── Architecture Diagram ──────────────────────────────────────────────────────
function ArchitectureDiagram() {
  const controlPlane = [
    'Agent Registry', 'Tool Registry', 'Policy Engine',
    'Approval Service', 'Fleet Management', 'Audit & Ledger',
  ]
  const execPlane = [
    'Identity Resolution', 'Policy Enforcement', 'Argument Validation',
    'Rate Limiting', 'Approval Gates', 'Idempotency', 'Execution Controls',
  ]

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Customer environment */}
        <div className="md:col-span-2 rounded-xl border border-[#1a2d45] bg-[#060b17] p-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Customer Environment</div>
          <div className="flex flex-col gap-3">
            <ArchBox label="AI Agent" sub="Customer's autonomous agent" color="slate" />
            <div className="flex items-center gap-1 self-center text-slate-700 text-xs">↓ tool call</div>
            <ArchBox label="Existing API Gateway" sub="Preserved — no changes required" color="slate" />
            <div className="flex items-center gap-1 self-center text-slate-700 text-xs">↓ intercepted</div>
            <div className="rounded-lg border border-blue-700/40 bg-blue-950/10 p-4">
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">VetoPlane Execution Gateway</div>
              <div className="flex flex-wrap gap-1.5">
                {execPlane.map(e => (
                  <span key={e} className="px-2 py-0.5 rounded text-[10px] bg-blue-900/20 border border-blue-800/30 text-blue-300">{e}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1 self-center text-slate-700 text-xs">↓ authorized execution</div>
            <ArchBox label="Existing MCP Server / APIs / SaaS" sub="Preserved — no changes required" color="slate" />
          </div>
        </div>

        {/* Control plane */}
        <div className="rounded-xl border border-[#1a2d45] bg-[#060b17] p-6">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">VetoPlane Control Plane</div>
          <div className="space-y-2">
            {controlPlane.map(c => (
              <div key={c} className="px-3 py-2 rounded-lg bg-[#080e1c] border border-[#0d1829] text-[11px] text-slate-300">{c}</div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-slate-600">
            Configures the execution gateway. Policy, identity, and configuration are pushed from the control plane and enforced locally.
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'No Rip-and-Replace', desc: 'Existing API gateways and MCP servers remain. VetoPlane adds a layer; it does not replace.' },
          { title: 'Fail-Closed', desc: 'If the control plane is unavailable, the execution gateway enforces within its freshness window — then fails closed.' },
          { title: 'Tenant-Isolated', desc: 'Each tenant\'s execution context and policy boundary is independent. Cross-tenant isolation is architectural.' },
        ].map(item => (
          <div key={item.title} className="p-4 rounded-xl border border-[#0d1829] bg-[#060b17]">
            <div className="text-xs font-semibold text-slate-300 mb-1.5">{item.title}</div>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchBox({ label, sub, color }: { label: string; sub?: string; color: string }) {
  return (
    <div className={`px-4 py-3 rounded-lg border text-sm font-medium ${
      color === 'slate' ? 'border-[#1a2d45] bg-[#080e1c] text-slate-300' : 'border-blue-700/50 bg-blue-900/20 text-blue-200'
    }`}>
      {label}
      {sub && <div className="text-[10px] text-slate-500 font-normal mt-0.5">{sub}</div>}
    </div>
  )
}

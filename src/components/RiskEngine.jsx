import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Calendar, FolderOpen, Lock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const riskCards = [
  {
    icon: Wallet,
    title: 'Margin Check',
    description: 'Before copying, the system checks: Required Margin > Available Margin → Trade Blocked. Child accounts are never over-leveraged.',
    badge: 'Required Margin > Balance = ⛔ BLOCKED',
  },
  {
    icon: Calendar,
    title: 'Daily Trade Limits',
    description: 'Each child has a configurable maximum trades-per-day limit. Once hit, no further copies are executed until the next trading day.',
    progress: { label: 'Daily Limit: 18/20 trades used', value: 90 },
  },
  {
    icon: FolderOpen,
    title: 'Max Open Positions',
    description: 'A cap on simultaneously open positions prevents portfolio over-exposure. New copies are queued until positions close.',
    counter: 'Open Positions: 8/10',
  },
  {
    icon: Lock,
    title: 'Exposure Control',
    description: 'Capital allocation limits ensure no single instrument or sector consumes too much of a child\'s total portfolio.',
    donut: true,
  },
]

const terminalLines = [
  { text: '[14:32:01] Incoming Trade: NIFTY 24600 CE BUY x50', color: 'text-primary' },
  { text: '[14:32:01] Checking Child A... ✅ Margin OK → Executing', color: 'text-green-400' },
  { text: '[14:32:01] Checking Child B... ✅ Margin OK → Executing', color: 'text-green-400' },
  { text: '[14:32:01] Checking Child C... ⛔ Margin insufficient → Blocked', color: 'text-red-400' },
  { text: '[14:32:01] Checking Child D... ⚠️ Daily limit reached → Skipped', color: 'text-yellow-400' },
  { text: '[14:32:02] Executed: 2/4 children ✅ | Blocked: 2 ⛔', color: 'text-primary' },
]

function DonutChart() {
  const segments = [
    { label: 'NIFTY', value: 35, color: '#5B5FEE' },
    { label: 'BANKNIFTY', value: 25, color: '#22C55E' },
    { label: 'RELIANCE', value: 20, color: '#F59E0B' },
    { label: 'Cash', value: 20, color: '#1C1C2E' },
  ]

  let cumulativePercent = 0
  const radius = 30
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="w-16 h-16 -rotate-90">
        {segments.map((seg, i) => {
          const strokeDasharray = `${(seg.value / 100) * circumference} ${circumference}`
          const strokeDashoffset = -cumulativePercent * circumference
          cumulativePercent += seg.value / 100
          return (
            <circle
              key={i}
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="10"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all"
            />
          )
        })}
      </svg>
      <div className="space-y-1">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }}></span>
            <span className="text-muted">{seg.label} {seg.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RiskEngine() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= terminalLines.length) {
          return 0
        }
        return prev + 1
      })
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 lg:py-28 bg-dark/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            Risk Management  -  Built Into Every Trade
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto">
            Copy Trading&apos;s Risk Engine runs before every single replication. No trade copies to a child unless it passes all risk checks.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left - Risk Rule Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {riskCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl p-5 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold font-heading mb-1">{card.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mb-3">{card.description}</p>
                      {card.badge && (
                        <span className="inline-block px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                          {card.badge}
                        </span>
                      )}
                      {card.progress && (
                        <div>
                          <div className="flex justify-between text-[10px] text-muted mb-1">
                            <span>{card.progress.label}</span>
                          </div>
                          <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${card.progress.value}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full bg-primary rounded-full"
                            />
                          </div>
                        </div>
                      )}
                      {card.counter && (
                        <p className="text-sm font-mono text-primary">{card.counter}</p>
                      )}
                      {card.donut && <DonutChart />}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right - Terminal Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-dark/80">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <span className="ml-3 text-xs text-muted font-mono">Risk Engine Log</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs space-y-1.5 min-h-[280px]">
              {terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i < visibleLines ? 1 : 0, x: i < visibleLines ? 0 : -10 }}
                  transition={{ duration: 0.25 }}
                  className={line.color}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-primary ml-0.5"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



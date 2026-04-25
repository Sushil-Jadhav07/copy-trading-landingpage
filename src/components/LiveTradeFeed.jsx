import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const initialTrades = [
  { id: 1, time: '14:32:05', action: 'MASTER BUY', instrument: 'NIFTY 24500 CE', qty: 50, detail: '3 children OK', status: 'success', badgeColor: 'bg-primary text-white' },
  { id: 2, time: '14:32:06', action: 'COPIED', instrument: 'Child A - NIFTY 24500 CE', qty: 50, detail: '+Rs0', status: 'executing', badgeColor: 'bg-emerald-600 dark:bg-emerald-500 text-white' },
  { id: 3, time: '14:32:06', action: 'COPIED', instrument: 'Child B - NIFTY 24500 CE', qty: 100, detail: '2x', status: 'done', badgeColor: 'bg-emerald-600 dark:bg-emerald-500 text-white' },
  { id: 4, time: '14:31:48', action: 'MASTER SELL', instrument: 'RELIANCE', qty: 10, detail: '5 children OK', status: 'success', badgeColor: 'bg-amber-600 dark:bg-amber-500 text-white' },
  { id: 5, time: '14:31:49', action: 'RISK BLOCK', instrument: 'Child D - Insufficient margin', qty: '-', detail: 'Blocked', status: 'blocked', badgeColor: 'bg-red-600 dark:bg-red-500 text-white' },
]

const newTradeTemplates = [
  { action: 'MASTER BUY', instrument: 'BANKNIFTY 48000 CE', qty: 25, detail: '4 children OK', status: 'success', badgeColor: 'bg-primary text-white' },
  { action: 'COPIED', instrument: 'Child C - BANKNIFTY 48000 CE', qty: 12, detail: '0.5x', status: 'done', badgeColor: 'bg-emerald-600 dark:bg-emerald-500 text-white' },
  { action: 'MASTER SELL', instrument: 'INFY', qty: 20, detail: '2 children OK', status: 'success', badgeColor: 'bg-amber-600 dark:bg-amber-500 text-white' },
  { action: 'RISK BLOCK', instrument: 'Child E - Daily limit reached', qty: '-', detail: 'Skipped', status: 'blocked', badgeColor: 'bg-red-600 dark:bg-red-500 text-white' },
  { action: 'COPIED', instrument: 'Child A - RELIANCE', qty: 10, detail: '+Rs120', status: 'done', badgeColor: 'bg-emerald-600 dark:bg-emerald-500 text-white' },
]

export default function LiveTradeFeed() {
  const [trades, setTrades] = useState(initialTrades)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrades(prev => {
        const template = newTradeTemplates[Math.floor(Math.random() * newTradeTemplates.length)]
        const now = new Date()
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
        const newTrade = {
          id: Date.now(),
          time: timeStr,
          ...template,
        }
        return [newTrade, ...prev.slice(0, 9)]
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-4">
              <Radio size={12} /> Live Feed
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-extrabold font-heading mb-4">
              Watch Trades Copy in Real Time
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted mb-8 leading-relaxed">
              Every time a Master places a trade, Ascentra capital instantly broadcasts it to all subscribed children. Here&apos;s a live simulation of what that looks like.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-3">
              {[
                'Trades captured via real-time broker API hooks',
                'Risk engine validates in parallel',
                'Children execute simultaneously via thread pool',
                'Full pipeline: <100ms end-to-end',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Side - Trade Feed Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card rounded-2xl border border-border overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold font-heading">Live Trade Feed</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Connected
              </span>
            </div>

            <div className="p-4 space-y-2 max-h-[420px] overflow-hidden">
              <AnimatePresence initial={false}>
                {trades.map((trade) => (
                  <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg bg-card border border-border/60 text-sm"
                  >
                    <span className="text-[10px] text-muted font-mono shrink-0 w-14">{trade.time}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${trade.badgeColor}`}>
                      {trade.action}
                    </span>
                    <span className="flex-1 truncate text-xs text-foreground">{trade.instrument}</span>
                    {trade.qty !== '-' && <span className="text-[10px] text-muted shrink-0">x{trade.qty}</span>}
                    <span className={`text-[10px] shrink-0 ${
                      trade.status === 'blocked' ? 'text-red-600 dark:text-red-400' :
                      trade.status === 'done' ? 'text-emerald-600 dark:text-emerald-400' :
                      trade.status === 'executing' ? 'text-primary' :
                      'text-muted'
                    }`}>{trade.detail}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



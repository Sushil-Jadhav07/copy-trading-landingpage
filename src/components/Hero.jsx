import { motion } from 'framer-motion'
import { ArrowRight, Play, Check } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const blobAnimation = {
  scale: [1, 1.15, 1],
  opacity: [0.15, 0.25, 0.15],
}

const blobTransition = {
  repeat: Infinity,
  duration: 8,
  ease: 'easeInOut',
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-24 lg:pt-32 pb-16 overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        animate={blobAnimation}
        transition={blobTransition}
        className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-primary rounded-full blur-[120px] pointer-events-none"
        style={{ opacity: 0.15 }}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-50px] right-[-50px] w-[400px] h-[400px] bg-purple-700 rounded-full blur-[100px] pointer-events-none"
        style={{ opacity: 0.1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-sm font-medium">
                ⚡ India's Fastest Copy Trading Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-[38px] lg:text-[68px] font-extrabold font-heading leading-[1.1] tracking-tight mb-6"
            >
              <span className="block">Copy Expert Trades.</span>
              <span className="block text-primary">Multiply Your Returns.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={fadeUp} className="text-lg text-muted mb-8 max-w-xl leading-relaxed">
              Copy Trading replicates trades from Master accounts to unlimited Child accounts in under 100ms  -  across Zerodha, Groww, Angel One, Upstox & Dhan. Set scaling factors, manage risk, and trade smarter  -  automatically.
            </motion.p>

            {/* CTA Row */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Start Copy Trading <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-primary text-primary font-semibold rounded-xl hover:bg-primary/10 transition-colors"
              >
                <Play size={16} /> Watch How It Works
              </motion.button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 sm:gap-6 text-sm text-muted">
              {[
                'No credit card required',
                '<100ms latency',
                '5+ brokers',
                'NSE & BSE supported',
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary" /> {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="ml-3 text-sm font-semibold font-heading">Copy Trading Dashboard</span>
                </div>
                <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Live
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* P&L Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted mb-1">Today&apos;s P&L</p>
                    <p className="text-xl lg:text-2xl font-bold text-green-400 font-heading">+₹14,280</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Win Rate</p>
                    <p className="text-xl lg:text-2xl font-bold text-primary font-heading">73.4%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-1">Active Trades</p>
                    <p className="text-xl lg:text-2xl font-bold text-foreground font-heading">12</p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="border border-border rounded-xl p-4">
                  <p className="text-xs text-muted mb-3">P&L Trend (Today)</p>
                  <svg viewBox="0 0 300 80" className="w-full h-16">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="0,65 40,55 80,58 120,42 160,38 200,25 240,20 280,10 300,5 300,80 0,80"
                      fill="url(#chartGrad)"
                    />
                    <polyline
                      points="0,65 40,55 80,58 120,42 160,38 200,25 240,20 280,10 300,5"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex justify-between text-[10px] text-muted mt-1">
                    <span>9:15</span>
                    <span>10:00</span>
                    <span>11:00</span>
                    <span>12:30</span>
                    <span>14:00</span>
                  </div>
                </div>

                {/* Active Trades Table */}
                <div>
                  <p className="text-xs text-muted mb-2">Active Positions</p>
                  <div className="space-y-2">
                    {[
                      { instrument: 'NIFTY 24500 CE', type: 'BUY', qty: 50, pnl: '+₹3,200', pnlColor: 'text-green-400', badgeColor: 'bg-green-500/30 text-white' },
                      { instrument: 'RELIANCE', type: 'BUY', qty: 10, pnl: '+₹860', pnlColor: 'text-green-400', badgeColor: 'bg-green-500/30 text-white' },
                      { instrument: 'BANKNIFTY PE', type: 'SELL', qty: 25, pnl: '-₹420', pnlColor: 'text-red-400', badgeColor: 'bg-red-500/30 text-white' },
                    ].map((trade) => (
                      <div key={trade.instrument} className="flex items-center justify-between text-sm py-2 px-3 rounded-lg bg-dark/50 border border-border/50">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${trade.badgeColor}`}>{trade.type}</span>
                          <span className="font-medium">{trade.instrument}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-muted text-xs">Qty: {trade.qty}</span>
                          <span className={`font-semibold ${trade.pnlColor}`}>{trade.pnl}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Child Accounts */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted">Children Copying: <span className="text-foreground font-semibold">8 active</span></span>
                  <div className="flex -space-x-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: ['#5B5FEE', '#22C55E', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'][i] }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



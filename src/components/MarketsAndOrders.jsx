import { motion } from 'framer-motion'
import { TrendingUp, BarChart2, DollarSign, Briefcase, ShoppingCart, Crosshair, ShieldAlert, AlertTriangle, Navigation, Package, GitBranch } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const markets = [
  { icon: TrendingUp, name: 'NSE', desc: 'National Stock Exchange  -  equity, index, F&O', color: 'bg-blue-500/20 text-blue-400' },
  { icon: BarChart2, name: 'BSE', desc: 'Bombay Stock Exchange  -  equity segments', color: 'bg-purple-500/20 text-purple-400' },
  { icon: DollarSign, name: 'F&O', desc: 'Futures & Options  -  NIFTY, BANKNIFTY, stock F&O', color: 'bg-green-500/20 text-green-400' },
  { icon: Briefcase, name: 'Equity', desc: 'Cash market delivery & intraday trading', color: 'bg-orange-500/20 text-orange-400' },
]

const orderTypes = [
  { icon: ShoppingCart, name: 'Market Order', desc: 'Execute immediately at best available price. Ideal for fast entries/exits.' },
  { icon: Crosshair, name: 'Limit Order', desc: 'Set your exact price. Order executes only when the market reaches your target.' },
  { icon: ShieldAlert, name: 'Stop Loss', desc: 'Protect your capital. Triggered when price hits your stop level.' },
  { icon: AlertTriangle, name: 'Stop Loss Market', desc: 'Stop loss that converts to market order on trigger for guaranteed exit.' },
  { icon: Navigation, name: 'Trailing Stop Loss', desc: 'Dynamic stop loss that follows price movement  -  locks in profits automatically.' },
  { icon: Package, name: 'Basket Orders', desc: 'Execute multiple buy/sell orders simultaneously across instruments with one click.' },
  { icon: GitBranch, name: 'OCO (One Cancels Other)', desc: 'Two orders linked  -  when one executes, the other is auto-cancelled.' },
]

export default function MarketsAndOrders() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Card - Supported Markets */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border rounded-2xl p-6 lg:p-8"
          >
            <h3 className="text-2xl font-bold font-heading mb-2">Supported Markets</h3>
            <p className="text-muted text-sm mb-6">Trade Across All Major Indian Markets</p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {markets.map((market, i) => {
                const Icon = market.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark/40 border border-border/50 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg ${market.color} flex items-center justify-center shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{market.name}</h4>
                      <p className="text-xs text-muted">{market.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Card - Order Types */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-card border border-border rounded-2xl p-6 lg:p-8"
          >
            <h3 className="text-2xl font-bold font-heading mb-2">All Order Types Supported</h3>
            <p className="text-muted text-sm mb-6">Every Order Type a Pro Trader Needs</p>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {orderTypes.map((order, i) => {
                const Icon = order.icon
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-3 py-3 px-4 rounded-xl border-l-[3px] border-l-primary bg-dark/30 transition-all"
                  >
                    <Icon size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{order.name}</h4>
                      <p className="text-xs text-muted leading-relaxed">{order.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



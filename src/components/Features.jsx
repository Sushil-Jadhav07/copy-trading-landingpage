import { motion } from 'framer-motion'
import { Zap, Building2, ClipboardList, Shield, Scale, BarChart3, RefreshCw, Radio, Lock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const features = [
  {
    icon: Zap,
    title: 'Sub-100ms Trade Replication',
    description: 'Our async event-driven engine processes and replicates trades across all child accounts in under 100 milliseconds  -  regardless of how many children are subscribed.',
  },
  {
    icon: Building2,
    title: 'Multi-Broker Architecture',
    description: 'Plug-and-play broker adapters support Zerodha, Groww, Angel One, Upstox, and Dhan. Add new brokers without touching core platform code.',
  },
  {
    icon: ClipboardList,
    title: '7 Order Types Supported',
    description: 'Market, Limit, Stop Loss, Stop Loss Market, Trailing Stop, Basket Orders, and OCO Orders  -  every order type a professional trader needs.',
  },
  {
    icon: Shield,
    title: 'Intelligent Risk Engine',
    description: 'Auto balance checks block trades if required margin exceeds available margin. Position limits, daily trade caps, and exposure limits enforced before each replication.',
  },
  {
    icon: Scale,
    title: 'Per-Child Scaling Factors',
    description: 'Masters configure scaling per child  -  0.5x, 1x, 2x, or custom. The system auto-calculates quantity for each child\'s account size and risk tolerance.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time P&L Dashboards',
    description: 'Live WebSocket-powered dashboards for all roles. See realized P&L, unrealized P&L, win rate, child-vs-master performance  -  updated tick by tick.',
  },
  {
    icon: RefreshCw,
    title: 'Automatic Retry & Failure Handling',
    description: 'If a child\'s trade fails at the broker level, the system retries automatically, logs the error, and sends instant notifications  -  zero manual intervention needed.',
  },
  {
    icon: Radio,
    title: 'WebSocket Live Updates',
    description: 'Every trade, position change, and P&L update is pushed to the frontend via WebSocket in real-time. No page refreshes, no polling delays.',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'JWT auth, role-based access control, VPC network isolation, HTTPS/TLS encryption, IAM roles, and OTP verification  -  bank-level security throughout.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            Platform Features Built for Professional Traders
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto">
            Everything from execution to risk control  -  designed for speed, reliability, and scale.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 0 32px rgba(91,95,238,0.18)' }}
                className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 border-l-[3px] border-l-primary"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}



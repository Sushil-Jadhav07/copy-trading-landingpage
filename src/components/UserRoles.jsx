import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Crown, FileText, Check, PauseCircle, PlayCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const roles = [
  {
    id: 'admin',
    label: 'Admin',
    icon: Shield,
    title: 'Admin  -  Platform Control Center',
    description: 'The Admin controls the entire platform ecosystem  -  from user creation to system monitoring.',
    capabilities: [
      'Create and manage Master accounts',
      'Create and manage Child accounts',
      'Assign and configure broker connections per user',
      'Activate or deactivate any user account',
      'Monitor all trade logs across all users',
      'View system health, uptime, and error logs',
      'Manage subscription plans and billing',
      'Access full analytics dashboard',
      'Configure risk limits at the platform level',
    ],
    mockup: (
      <div className="bg-dark/60 rounded-xl border border-border p-4">
        <p className="text-xs text-muted mb-3">User Management</p>
        <div className="space-y-2">
          {[
            { name: 'Rajesh M.', role: 'Master', status: 'Active', broker: 'Zerodha' },
            { name: 'Priya S.', role: 'Child', status: 'Active', broker: 'Groww' },
            { name: 'Ankit D.', role: 'Master', status: 'Active', broker: 'Angel One' },
            { name: 'Sneha K.', role: 'Child', status: 'Paused', broker: 'Upstox' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-card/60 text-xs">
              <span className="text-foreground font-medium w-24">{user.name}</span>
              <span className="text-primary w-16">{user.role}</span>
              <span className={`px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'} w-14 text-center`}>{user.status}</span>
              <span className="text-muted w-20 text-right">{user.broker}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'master',
    label: 'Master',
    icon: Crown,
    title: 'Master  -  Expert Trade Leader',
    description: 'The Master is the expert trader whose every move is replicated to their subscriber pool.',
    capabilities: [
      'Execute trades on any connected broker (app, web, or platform)',
      'Trades captured automatically  -  no extra steps',
      'Select which child accounts copy their trades',
      'Set and modify per-child scaling factors (0.5x to 10x)',
      'View real-time consolidated P&L across all children',
      'Monitor child performance vs own performance',
      'Cancel or modify trades  -  changes propagate instantly',
      'View full trade history with replication logs',
      'Pause copying for specific children independently',
    ],
    mockup: (
      <div className="bg-dark/60 rounded-xl border border-border p-4 space-y-4">
        <div>
          <p className="text-xs text-muted mb-2">Quick Trade</p>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-card/60 border border-border text-xs text-foreground">NIFTY 24500 CE</div>
            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-xs font-semibold">BUY</button>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold">SELL</button>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted mb-2">Children & Scaling</p>
          <div className="space-y-2">
            {[
              { child: 'Child A', scaling: '1x', status: 'Active', pnl: '+₹4,200' },
              { child: 'Child B', scaling: '2x', status: 'Active', pnl: '+₹8,400' },
              { child: 'Child C', scaling: '0.5x', status: 'Paused', pnl: '₹0' },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-card/60 text-xs">
                <span className="text-foreground w-16">{row.child}</span>
                <span className="text-primary font-semibold">{row.scaling}</span>
                <span className="flex items-center gap-1">
                  {row.status === 'Active' ? <PlayCircle size={10} className="text-green-400" /> : <PauseCircle size={10} className="text-yellow-400" />}
                  <span className={row.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}>{row.status}</span>
                </span>
                <span className={`${row.pnl.startsWith('+') ? 'text-green-400' : 'text-muted'} w-16 text-right`}>{row.pnl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'child',
    label: 'Child',
    icon: FileText,
    title: 'Child  -  Automated Trade Follower',
    description: 'The Child subscribes to a Master and automatically mirrors every trade  -  with full control over their own risk.',
    capabilities: [
      'Browse and subscribe to available Master traders',
      'All Master trades auto-copied to their account',
      'Configure personal scaling factor (independent of Master\'s setting)',
      'Pause copying instantly  -  no trades copied while paused',
      'Resume copying with one click',
      'Execute their own independent personal trades simultaneously',
      'View personal P&L vs Master P&L side-by-side',
      'View full history of all copied trades',
      'Receive real-time notifications on each copied trade',
    ],
    mockup: (
      <div className="bg-dark/60 rounded-xl border border-border p-4 space-y-4">
        <div className="bg-card/60 rounded-lg p-4 border border-primary/20">
          <p className="text-xs text-muted mb-2">P&L Comparison (Today)</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-muted">Master P&L</p>
              <p className="text-lg font-bold text-green-400 font-heading">+₹12,400</p>
            </div>
            <div>
              <p className="text-[10px] text-muted">Your P&L (0.5x)</p>
              <p className="text-lg font-bold text-green-400 font-heading">+₹6,200</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted mb-2">My Subscription</p>
          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-card/60 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">RM</div>
              <div>
                <p className="text-foreground font-medium">Rajesh M.</p>
                <p className="text-muted">Professional Trader</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px]">Active</span>
          </div>
        </div>
      </div>
    ),
  },
]

export default function UserRoles() {
  const [activeTab, setActiveTab] = useState('master')

  const activeRole = roles.find(r => r.id === activeTab)

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            One Platform, Three Powerful Roles
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto">
            Copy Trading is designed with a clear role hierarchy  -  each role has exactly the access and tools it needs.
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 mb-12"
        >
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === role.id
                    ? 'bg-primary text-white'
                    : 'bg-card text-muted border border-border hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {role.label}
              </button>
            )
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-10 items-start"
          >
            {/* Left - Capabilities */}
            <div>
              <h3 className="text-2xl font-bold font-heading mb-3">{activeRole.title}</h3>
              <p className="text-muted mb-6">{activeRole.description}</p>
              <div className="space-y-3">
                {activeRole.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Mockup */}
            <div>
              {activeRole.mockup}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}



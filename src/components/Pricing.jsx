import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 999,
    annualPrice: 799,
    description: 'Individual traders and investors just getting started',
    features: [
      { text: '1 Master account', included: true },
      { text: 'Up to 3 Child accounts', included: true },
      { text: 'All 5 brokers supported', included: true },
      { text: 'All 7 order types', included: true },
      { text: 'Basic P&L dashboard', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced risk engine', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 2999,
    annualPrice: 2399,
    description: 'Active traders and small investment groups',
    features: [
      { text: '1 Master account', included: true },
      { text: 'Up to 15 Child accounts', included: true },
      { text: 'All 5 brokers supported', included: true },
      { text: 'All 7 order types', included: true },
      { text: 'Full risk engine (margin, position & exposure limits)', included: true },
      { text: 'Real-time P&L & analytics dashboard', included: true },
      { text: 'WebSocket live feed', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom scaling per child', included: true },
      { text: 'White-label option', included: false },
    ],
    cta: 'Get Started →',
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'Professional fund managers & trading firms',
    features: [
      { text: 'Unlimited Master accounts', included: true },
      { text: 'Unlimited Child accounts', included: true },
      { text: 'All brokers + custom broker adapter', included: true },
      { text: 'Full risk engine', included: true },
      { text: 'White-label branding', included: true },
      { text: 'Dedicated cloud infrastructure', included: true },
      { text: 'SLA: 99.9% uptime guarantee', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access for custom integrations', included: true },
      { text: 'Custom compliance reports', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            Simple Pricing. No Hidden Fees.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Choose the plan that fits your trading operation. Upgrade or downgrade anytime.
          </motion.p>

          {/* Toggle */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 p-1 bg-card border border-border rounded-xl">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isAnnual ? 'bg-primary text-white' : 'text-muted'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isAnnual ? 'bg-primary text-white' : 'text-muted'}`}
            >
              Annual
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isAnnual ? 'bg-white/20' : 'bg-green-500/20 text-green-400'}`}>
                20% OFF
              </span>
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8, boxShadow: plan.popular ? '0 0 48px rgba(0,200,150,0.28)' : '0 0 32px rgba(0,200,150,0.2)' }}
              className={`bg-card border rounded-2xl p-6 lg:p-8 transition-all relative ${
                plan.popular ? 'border-primary scale-[1.03] shadow-xl shadow-primary/10' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold font-heading mb-1">{plan.name}</h3>
              <p className="text-xs text-muted mb-4">{plan.description}</p>

              <div className="mb-6">
                {plan.monthlyPrice !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-heading">₹{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="text-muted">/month</span>
                  </div>
                ) : (
                  <div className="text-3xl font-extrabold font-heading">Custom Pricing</div>
                )}
                {isAnnual && plan.annualPrice && (
                  <p className="text-xs text-green-400 mt-1">Billed annually at ₹{plan.annualPrice * 12}/year</p>
                )}
              </div>

              <div className="space-y-2.5 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2.5 text-sm">
                    {feature.included ? (
                      <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X size={16} className="text-muted/50 shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-muted' : 'text-muted/50'}>{feature.text}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-hover'
                    : 'border border-border text-muted hover:border-primary hover:text-foreground'
                }`}
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}



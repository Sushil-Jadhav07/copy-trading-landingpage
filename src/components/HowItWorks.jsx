import { motion } from 'framer-motion'
import { Target, Zap, Search, Scale, CheckCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const steps = [
  {
    icon: Target,
    title: 'Master Executes Trade',
    description: 'The Master trader places an order  -  on any supported broker\'s app, website, or our platform. Market, Limit, Stop Loss, Trailing  -  any order type is captured instantly.',
  },
  {
    icon: Zap,
    title: 'System Captures the Event',
    description: 'Our real-time event pipeline captures the trade signal the moment it is placed  -  with zero polling delay.',
  },
  {
    icon: Search,
    title: 'Risk Engine Validates',
    description: 'Before replicating, our Risk Engine checks each child\'s available margin, position limits, daily trade count, and exposure cap. Only valid trades proceed.',
  },
  {
    icon: Scale,
    title: 'Scaling Factor Applied',
    description: 'Each child has a custom scaling multiplier set by the Master. Child A at 1x gets the same size. Child B at 2x gets double. Child C at 0.5x gets half  -  automatically calculated.',
  },
  {
    icon: CheckCircle,
    title: 'Child Trades Execute',
    description: 'All eligible child accounts receive and execute the trade in parallel through our execution engine. The full pipeline completes in <100ms.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            How Ascentra capital Works
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto">
            From master trade execution to child account replication  -  all in under 100 milliseconds.
          </motion.p>
        </motion.div>

        {/* Desktop: Horizontal flow with connecting line */}
        <div className="hidden lg:block relative">
          {/* Dashed connecting line */}
          <div className="absolute top-10 left-[10%] right-[10%] border-t-2 border-dashed border-primary/30"></div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-5 gap-6 relative"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="text-center relative"
                >
                  {/* Step circle */}
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary flex items-center justify-center relative z-10 shadow-lg shadow-primary/30">
                    <Icon size={28} className="text-white" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-6 bg-card border border-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary z-20">
                    {i + 1}
                  </div>

                  <h3 className="text-sm font-bold font-heading mb-2 px-1">{step.title}</h3>
                  <p className="text-xs text-muted leading-relaxed px-1">{step.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-primary/30"></div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-10"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-5 relative"
                >
                  <div className="w-16 h-16 shrink-0 rounded-full bg-primary flex items-center justify-center relative z-10 shadow-lg shadow-primary/30">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-primary">STEP {i + 1}</span>
                    </div>
                    <h3 className="text-base font-bold font-heading mb-1">{step.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}



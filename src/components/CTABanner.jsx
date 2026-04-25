import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-purple-900/20"></div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
            🚀 Now in Early Access
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl lg:text-[52px] font-extrabold font-heading leading-tight mb-5">
            Start Copying Expert Trades Today.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Join thousands of Indian traders automating their portfolio with Copy Trading. Set up in minutes. Trade smarter from day one.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors pulse-glow"
            >
              Create Free Account <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:bg-card transition-colors"
            >
              Talk to Sales
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-6 justify-center text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-primary" /> Bank-level security
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-primary" /> &lt;100ms latency
            </span>
            <span className="flex items-center gap-1.5">
              🇮🇳 Built for India
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}



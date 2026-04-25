import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const faqs = [
  {
    question: 'What is copy trading?',
    answer: 'Copy trading is an automated system where trades placed by an expert Master trader are instantly replicated to one or more Child accounts  -  proportionally scaled based on account size or a custom factor. You benefit from expert trading without having to analyze markets yourself.',
  },
  {
    question: 'How fast does Copy Trading replicate trades?',
    answer: 'Copy Trading replicates trades in under 100ms end-to-end. Broker API latency accounts for 30-40ms. Our system\'s async event pipeline handles the remaining 60-70ms  -  covering risk checks, scaling, and multi-account execution in parallel.',
  },
  {
    question: 'Which brokers are supported?',
    answer: 'Currently Zerodha, Groww, Angel One, Upstox, and Dhan. Our plug-and-play adapter architecture means new brokers can be added without platform redesign. More brokers are being added regularly.',
  },
  {
    question: 'What markets can I trade?',
    answer: 'NSE and BSE equity segments, F&O (Futures & Options including NIFTY, BANKNIFTY, stock F&O), and intraday/delivery equity. More markets coming soon.',
  },
  {
    question: 'Can a Child account trade independently while copying?',
    answer: 'Yes. Child accounts can place their own personal trades independently, at any time, even while copy trading is active. Copied trades and personal trades are tracked separately in the dashboard.',
  },
  {
    question: 'What happens if a child doesn\'t have enough margin?',
    answer: 'The Risk Engine automatically blocks the trade for that child and logs the failure. Other eligible children still receive the copy. The blocked child is notified instantly, and the event is logged for the Admin to review.',
  },
  {
    question: 'Can the Master control which children copy their trades?',
    answer: 'Yes. Masters select exactly which child accounts copy their trades and can add or remove children anytime. They can also pause copying for a specific child without affecting others.',
  },
  {
    question: 'Is Copy Trading SEBI compliant?',
    answer: 'Copy Trading is a technology platform that provides trade replication infrastructure. It does not provide trading advice, signals, or financial recommendations. All trading decisions are made by the Master trader. Users are responsible for their own trading compliance.',
  },
  {
    question: 'How is my data secured?',
    answer: 'We use JWT authentication, role-based access control, VPC network isolation, HTTPS/TLS encryption everywhere, IAM roles for cloud resources, and OTP verification. Broker API tokens are encrypted in-memory using Redis  -  never stored in plain text.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-semibold text-sm pr-4">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 text-muted"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-muted leading-relaxed border-t border-border/50 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}



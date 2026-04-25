import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const brokers = [
  { name: 'Zerodha', color: '#00C896' },
  { name: 'Groww', color: '#22C55E' },
  { name: 'Angel One', color: '#F59E0B' },
  { name: 'Upstox', color: '#8B5CF6' },
  { name: 'Dhan', color: '#00C896' },
]

export default function BrokerMarquee() {
  const allBrokers = [...brokers, ...brokers, ...brokers, ...brokers]

  return (
    <section id="brokers" className="py-12 border-y border-border overflow-hidden">
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-muted mb-8"
      >
        Works Seamlessly With Your Broker
      </motion.p>

      {/* Marquee Row 1 */}
      <div className="relative mb-4">
        <div className="flex marquee-track" style={{ width: 'max-content' }}>
          {allBrokers.map((broker, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-3 px-6 py-3 bg-card border border-border rounded-xl"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: broker.color }}
              ></span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{broker.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="relative">
        <div className="flex marquee-track-reverse" style={{ width: 'max-content' }}>
          {[...allBrokers].reverse().map((broker, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-3 px-6 py-3 bg-card border border-border rounded-xl opacity-60"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: broker.color }}
              ></span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{broker.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



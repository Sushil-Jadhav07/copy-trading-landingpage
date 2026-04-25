import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const stats = [
  { value: '< 100ms', numericValue: 100, suffix: 'ms', prefix: '< ', label: 'Average Trade Replication Latency', isText: true },
  { value: '5+', numericValue: 5, suffix: '+', prefix: '', label: 'Indian Brokers Supported', isText: true },
  { value: '99.9%', numericValue: 99.9, suffix: '%', prefix: '', label: 'Platform Uptime SLA', isText: false },
  { value: '3', numericValue: 3, suffix: '', prefix: '', label: 'Admin, Master & Child Architecture', isText: true },
]

function CountUp({ target, suffix, prefix, isText, inView }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    if (isText) {
      setCount(target)
      return
    }

    const duration = 1500
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(1)))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, target, isText])

  return <span>{isText ? `${prefix}${target}${suffix}` : `${prefix}${count}${suffix}`}</span>
}

export default function StatsBar() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 lg:py-20">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`text-center ${i < stats.length - 1 ? 'lg:border-r lg:border-border' : ''}`}
              >
                <div className="text-3xl lg:text-5xl font-extrabold font-heading text-primary mb-2">
                  <CountUp
                    target={stat.numericValue}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    isText={stat.isText}
                    inView={inView}
                  />
                </div>
                <p className="text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}



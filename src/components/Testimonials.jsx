import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const testimonials = [
  {
    stars: 5,
    quote: 'I manage 15 child accounts for my clients. Ascentra capital makes it effortless  -  I place one trade and all 15 execute in seconds. The scaling factor feature is a game changer.',
    name: 'Rajesh M.',
    role: 'Professional Trader',
    location: 'Mumbai',
    initials: 'RM',
    color: '#00C896',
  },
  {
    stars: 5,
    quote: "As a child subscriber, I love that I can pause copying anytime and adjust my own scaling. My drawdown is half of what it was when I was trading manually.",
    name: 'Priya S.',
    role: 'Retail Investor',
    location: 'Bangalore',
    initials: 'PS',
    color: '#22C55E',
  },
  {
    stars: 5,
    quote: 'The risk engine saved us multiple times. It blocked trades when margins were tight instead of over-leveraging. That alone is worth the subscription.',
    name: 'Ankit D.',
    role: 'Fund Manager',
    location: 'Delhi',
    initials: 'AD',
    color: '#F59E0B',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((current + 1) % testimonials.length)
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-extrabold font-heading mb-4">
            Trusted by Traders Across India
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted max-w-2xl mx-auto">
            From first-time investors to professional fund managers  -  Ascentra capital scales with you.
          </motion.p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="hidden lg:grid grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: '0 0 32px rgba(0,200,150,0.2)' }}
              className="bg-card border border-border rounded-2xl p-6 relative transition-all"
            >
              <Quote size={32} className="text-primary/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}, {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <Quote size={28} className="text-primary/30 mb-3" />
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonials[current].stars)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-5">{testimonials[current].quote}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: testimonials[current].color }}
                  >
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonials[current].name}</p>
                    <p className="text-xs text-muted">{testimonials[current].role}, {testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <button onClick={prev} className="p-2 rounded-full bg-card border border-border text-muted hover:text-foreground transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-4' : 'bg-[#1C1C2E]'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-card border border-border text-muted hover:text-foreground transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}



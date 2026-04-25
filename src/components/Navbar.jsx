import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import logo from '../assets/whitelogo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const navLinks = [
  { label: 'Home', href: '#home' },

  { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
  { label: 'Brokers', href: '#brokers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href) => {
    setActiveLink(href)
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#home" className="flex items-center gap-2" onClick={() => handleLinkClick('#home')}>
            <img src={logo} alt="Ascentra Capital" className="h-10 lg:h-[60px] w-auto object-contain" />
          </a>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                variants={fadeUp}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                className={`relative text-sm font-medium transition-colors ${
                  activeLink === link.href ? 'text-primary' : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}
              </motion.a>
            ))}
          </motion.div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 text-sm font-medium text-muted border border-border rounded-lg hover:border-primary hover:text-foreground transition-colors"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors"
            >
              Start Free Trial
            </motion.button>
          </div>

          <button
            onClick={onToggleTheme}
            aria-label="Toggle light and dark theme"
            className="hidden lg:inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card text-muted hover:text-foreground hover:border-primary transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle light and dark theme"
              className="p-2 text-foreground"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-foreground"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-card/95 backdrop-blur-md border-b border-border"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                  className={`block py-2 text-sm font-medium ${
                    activeLink === link.href ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <button className="w-full py-2.5 text-sm font-medium text-muted border border-border rounded-lg">
                  Sign In
                </button>
                <button className="w-full py-2.5 text-sm font-semibold text-white bg-primary rounded-lg">
                  Start Free Trial
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}




import { motion } from 'framer-motion'
import { Globe, Mail, MessageSquare, AtSign } from 'lucide-react'
import logo from '../assets/whitelogo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'API Documentation', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  markets: [
    { label: 'NSE & BSE Trading', href: '#' },
    { label: 'F&O Ascentra capital', href: '#' },
    { label: 'Zerodha Integration', href: '#' },
    { label: 'Angel One Integration', href: '#' },
    { label: 'All Brokers ->', href: '#brokers' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const socialIcons = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Mail, href: '#', label: 'Email' },
  { icon: MessageSquare, href: '#', label: 'Community' },
  { icon: AtSign, href: '#', label: 'Social' },
]

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <a href="#home" className="inline-block mb-4">
              <img src={logo} alt="Ascentra Capital" className="h-[100px] w-auto object-contain" />
            </a>
            <p className="text-sm text-muted mb-5 leading-relaxed">
              India&apos;s fastest Ascentra capital platform. Built for retail traders and professional fund managers.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold mb-4">Markets & Brokers</h4>
            <ul className="space-y-2.5">
              {footerLinks.markets.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted">
              &copy; 2025 Ascentra capital Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Made with care in India
            </p>
          </div>
          <p className="text-[10px] text-muted/50 text-center mt-3">
            Ascentra capital is a technology platform. We do not provide financial advice. All trading carries risk.
          </p>
        </div>
      </div>
    </footer>
  )
}

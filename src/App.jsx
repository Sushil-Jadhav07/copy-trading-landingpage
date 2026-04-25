import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BrokerMarquee from './components/BrokerMarquee'
import StatsBar from './components/StatsBar'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import LiveTradeFeed from './components/LiveTradeFeed'
import UserRoles from './components/UserRoles'
import MarketsAndOrders from './components/MarketsAndOrders'
import RiskEngine from './components/RiskEngine'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <BrokerMarquee />
      <StatsBar />
      <HowItWorks />
      <Features />
      <LiveTradeFeed />
      <UserRoles />
      <MarketsAndOrders />
      <RiskEngine />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}

export default App




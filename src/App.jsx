import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustBar from './components/sections/TrustBar'
import Features from './components/sections/Features'
import HowItWorks from './components/sections/HowItWorks'
import Manifesto from './components/sections/Manifesto'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <Manifesto />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

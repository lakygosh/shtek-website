/*
 * NOTE: Image Optimization (Story 4.1)
 * All visual assets are SVG/JSX inline — no raster images to optimize.
 * When real images are added in the future, use WebP format with <picture>
 * elements and provide fallback JPEG/PNG for older browsers.
 * Example:
 *   <picture>
 *     <source srcSet="/images/hero.webp" type="image/webp" />
 *     <img src="/images/hero.jpg" alt="..." loading="lazy" />
 *   </picture>
 */
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustBar from './components/sections/TrustBar'
import Features from './components/sections/Features'
import HowItWorks from './components/sections/HowItWorks'
import IdealLifePromo from './components/sections/IdealLifePromo'
import Testimonials from './components/sections/Testimonials'
import Comparison from './components/sections/Comparison'
import Pricing from './components/sections/Pricing'
import FAQ from './components/sections/FAQ'
import About from './components/sections/About'
import Privacy from './components/sections/Privacy'
import Manifesto from './components/sections/Manifesto'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <>
      {/* Skip-to-content link for keyboard/screen-reader users (Story 4.3) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <IdealLifePromo />
        <Testimonials />
        <Comparison />
        <Pricing />
        <FAQ />
        <About />
        <Privacy />
        <Manifesto />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

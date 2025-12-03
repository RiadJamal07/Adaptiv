import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './components/Services';
import Packages from './pages/Packages';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';
import HyperplexedCarousel from './components/HyperplexedCarousel';
import QuoteInterstitial from './components/QuoteInterstitial';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import FilmGrain from './components/FilmGrain';
import heroVideo from './assets/hero-video.mp4';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  // Preload hero video during preloader phase
  useEffect(() => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = heroVideo;
    video.load();
  }, []);

  // Refresh ScrollTrigger after loading completes
  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  return (
    <SmoothScroll>
      <FilmGrain />
      <CustomCursor />
      {loading && <Preloader setLoading={setLoading} />}

      {!loading && (
        <div className="app-container">
          <Navbar />
          <section id="home"><Home /></section>

          <QuoteInterstitial
            text="Redefining limits, fighting for wins, bringing it all in all ways. Defining a legacy."
            highlightWords={['redefining', 'wins', 'legacy']}
          />

          <section id="gallery">
            <HyperplexedCarousel />
          </section>

          <QuoteInterstitial
            text="It never gets easier, you just get faster."
            highlightWords={['faster']}
          />

          <section id="about"><About /></section>
          <section id="services"><Services /></section>
          <section id="packages"><Packages /></section>
          <section id="testimonials"><Testimonials /></section>
          <section id="contact"><Contact /></section>
        </div>
      )}
    </SmoothScroll>
  );
}

export default App;

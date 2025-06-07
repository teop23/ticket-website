import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { HowToPlay } from './pages/HowToPlay';
import { Footer } from './components/Footer';
import { Winners } from './pages/Winners';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <HowItWorks />
            <FAQ />
          </>
        } />
        <Route path="/winners" element={<Winners />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
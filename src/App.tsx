import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Winners } from './pages/Winners';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen">
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
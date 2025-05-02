import React from 'react';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import UseCasesSection from './components/sections/UseCasesSection';
import SpecsSection from './components/sections/SpecsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <SpecsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EverythingInBetweenSection } from './components/EverythingInBetweenSection';
import { PlansPricingBanner } from './components/PlansPricingBanner';
import { SecuritySection } from './components/SecuritySection';
import { GetInspiredSection } from './components/GetInspiredSection';
import { PricingSection } from './components/PricingSection';
import { TryNexVsmBanner } from './components/TryNexVsmBanner';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

export function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: { mode: 'trial', plan: 'Professional' }
  });

  const handleOpenTrial = (data = {}) => {
    setModalState({
      isOpen: true,
      initialData: { mode: data.mode || 'trial', plan: data.plan || 'Professional' }
    });
  };

  const handleOpenDemo = (data = {}) => {
    setModalState({
      isOpen: true,
      initialData: { mode: 'demo', plan: data.plan || 'Enterprise' }
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0D0D0D] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative antialiased transition-colors duration-200">
      
      {/* 1. Global Navigation Bar (Sticky, Adaptive Black/White Logo, Interactive Hover Dropdowns) */}
      <Navbar 
        onOpenTrial={handleOpenTrial} 
        onOpenDemo={handleOpenDemo}
        onNavigatePricing={scrollToPricing}
        onNavigateHome={scrollToHome}
      />

      <main className="flex-1">
        {/* 2. Hero: "Now you can / CSM, Smart Improve, FSM / all in one place." */}
        <Hero 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 3. Carousel: "Use NexVSM for CSM, FSM, and everything in between." */}
        <EverythingInBetweenSection 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 4. Rounded Banner Card: "Plans and pricing" (with "Learn more >" linking to #pricing) */}
        <PlansPricingBanner 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 5. Security & Trust: "Designed to keep you safe" (2 side-by-side cards + verified capabilities) */}
        <SecuritySection 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 6. Customer Stories: "Get inspired" (3 photography case cards) */}
        <GetInspiredSection 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 7. Comprehensive Plans & Pricing Table (#pricing anchor) */}
        <div id="pricing">
          <PricingSection 
            onOpenTrial={handleOpenTrial} 
          />
        </div>

        {/* 8. Pre-Footer Banner Card: Footnote + "Try NexVSM today" (with "Download app >") */}
        <TryNexVsmBanner 
          onOpenTrial={handleOpenTrial} 
        />
      </main>

      {/* 9. Minimalist Global Footer (Adaptive Black/White Logo, Categorized Columns, Language) */}
      <Footer 
        onOpenTrial={handleOpenTrial} 
        onOpenDemo={handleOpenDemo} 
      />

      {/* 10. Interactive Conversion Modal */}
      <LeadModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        initialData={modalState.initialData}
      />
    </div>
  );
}

export default App;

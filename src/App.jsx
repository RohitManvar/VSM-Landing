import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { PlansPricingBanner } from './components/PlansPricingBanner';
import { SecuritySection } from './components/SecuritySection';
import { MadeForSection } from './components/MadeForSection';
import { PricingSection } from './components/PricingSection';
import { TryVsmBanner } from './components/TryVsmBanner';
import { Footer } from './components/Footer';
import { ScrollStory } from './components/story/ScrollStory';
import { STORIES } from './components/story/storyContent';
import { LeadModal } from './components/LeadModal';
import { LegalPage } from './components/LegalPage';
import { goToSignup, goToPlanCheckout } from './config/app';
import { findPolicy } from './config/legal';

// Policy pages live at hash routes like #/terms so they work on any static host
// without server rewrites. Plain anchors (#pricing) still mean "home page, scroll here".
function useHash() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export function App() {
  const hash = useHash();
  const policy = hash.startsWith('#/') ? findPolicy(hash.slice(2)) : null;
  // The About page (brand story) lives at a hash route, like the policy pages. It is hidden
  // for now: no links point to it and #/about shows the home page. Flip this to bring it back.
  const ABOUT_ENABLED = false;
  const isAbout = ABOUT_ENABLED && hash === '#/about';

  // Opening a policy or the About page starts at the top; returning home to an anchor
  // scrolls to it once the home sections have rendered again.
  useEffect(() => {
    if (policy || isAbout) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = hash.replace(/^#\/?/, '');
    if (!id) return;
    // 'instant': the page-wide smooth scrolling gets interrupted while the home
    // sections are still mounting, leaving the page stuck near the top.
    // #csm / #smart-improve / #fsm are steps of the desktop scroll story (it scrolls to them
    // itself); on phones, where that story isn't shown, they go to the product showcase.
    const PRODUCT_STEPS = ['csm', 'smart-improve', 'fsm'];
    const raf = requestAnimationFrame(() => {
      if (PRODUCT_STEPS.includes(id)) {
        if (!document.querySelector('section[aria-label="VSM 4.0 overview"]')) {
          document.getElementById('product-showcase')?.scrollIntoView({ behavior: 'instant' });
        }
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, policy, isAbout]);
  // True while the scroll story's intro statement is on screen (desktop only).
  const [introActive, setIntroActive] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    initialData: { mode: 'trial', plan: 'Trial' }
  });

  // Trial buttons go to the app's self-serve sign-up; paid plan buttons go there
  // too but carry the plan, so the app opens the Razorpay checkout after sign-in.
  // Only demo and sales requests open the contact modal.
  const handleOpenTrial = (data = {}) => {
    if (data.mode === 'demo') {
      handleOpenDemo(data);
      return;
    }
    if (data.mode === 'buy') {
      goToPlanCheckout(data.planId, data.cycle);
      return;
    }
    goToSignup();
  };

  const handleOpenDemo = (data = {}) => {
    setModalState({
      isOpen: true,
      initialData: { mode: 'demo', plan: data.plan || null }
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'pricing'; // on a policy page: go home, then scroll
    }
  };

  const scrollToHome = () => {
    if (policy || isAbout) window.location.hash = '';
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
        minimal={!policy && !isAbout && introActive}
      />

      <main className="flex-1">
        {policy ? (
          <LegalPage policy={policy} />
        ) : isAbout ? (
          /* About: the brand story — what the logo means, and who builds VSM 4.0 */
          <ScrollStory key="about" story={STORIES.about} onOpenTrial={handleOpenTrial} />
        ) : (
        <>
        {/* 2. 3D scroll story: glass intro → hero → CSM / Improve / FSM → feature cards */}
        <ScrollStory key="landing" story={STORIES.landing} onOpenTrial={handleOpenTrial} onIntroChange={setIntroActive} />

        {/* 4. Rounded Banner Card: "Plans and pricing" (with "Learn more >" linking to #pricing) */}
        <PlansPricingBanner 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 5. Security & Trust: "Designed to keep you safe" (2 side-by-side cards + verified capabilities) */}
        <SecuritySection 
          onOpenTrial={handleOpenTrial} 
        />

        {/* 6. Who it's for: "Made for the people who improve flow" (audiences + real screens) */}
        <MadeForSection />

        {/* 7. Comprehensive Plans & Pricing Table (#pricing anchor) */}
        <div id="pricing">
          <PricingSection 
            onOpenTrial={handleOpenTrial} 
          />
        </div>

        {/* 8. Pre-Footer Banner Card: Footnote + "Try VSM 4.0 today"  */}
        <TryVsmBanner
          onOpenTrial={handleOpenTrial}
        />
        </>
        )}
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

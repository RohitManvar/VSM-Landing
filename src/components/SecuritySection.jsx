import React from 'react';
import { ShieldCheck, Lock, Key, Server, Users, Database } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export const SecuritySection = ({ onOpenTrial }) => {
  const { theme } = useTheme();

  const capabilities = [
    {
      icon: <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      title: 'Secure Account Access',
      description: 'Industry-standard authentication and session safeguards protecting your Lean project data.'
    },
    {
      icon: <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      title: 'Role-Based Permissions (RBAC)',
      description: 'Granular workspace permissions ensure team members only see authorized plant cells.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      title: 'Zero Public Model Training',
      description: 'Proprietary cycle times, machine parameters, and scrap rates are never used to train public AI models.'
    },
    {
      icon: <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
      title: 'Encrypted Data Transmission',
      description: 'All telemetry feeds and project saves are transmitted via modern encrypted TLS protocols.'
    },
    {
      icon: <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      title: 'Independent Workspaces',
      description: 'Isolate multiple client projects into distinct, independent workspaces with strict boundaries.'
    },
    {
      icon: <Server className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
      title: 'Reliable Cloud Uptime',
      description: 'High-availability cloud environment designed for continuous uptime across distributed plant operations.'
    }
  ];

  return (
    <section id="security" className="py-20 md:py-32 bg-white dark:bg-[#0D0D0D] text-black dark:text-white transition-colors duration-200 border-b border-neutral-200/70 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* HEADLINE: "Designed to keep you safe" (Exact ChatGPT Reference)           */}
        {/* ========================================================================= */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.12] text-black dark:text-white">
              Designed to keep you safe
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
              We're committed to protecting our customer and user data; NexVSM is built with your security and privacy in mind.
            </p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 2 SIDE-BY-SIDE CARDS (Exact Match to Image 7)                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Card 1: User privacy */}
          <ScrollReveal direction="up" delay={100} duration={600}>
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-[#F9F9FB] dark:bg-[#141414] p-8 sm:p-10 text-left h-full flex flex-col justify-between transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-3">
                  User privacy
                </h3>
                <p className="text-sm sm:text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  You choose how your proprietary factory data is used, and we make it easy to control your privacy choices. Your routing secrets, machine cycle times, and operational metrics are never shared or used to train public models.
                </p>
              </div>

              <div className="pt-6 sm:pt-8">
                <button
                  onClick={() => onOpenTrial({ mode: 'trial' })}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  Learn more
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Industrial safety & RBAC (Teen safety equivalent in industrial context) */}
          <ScrollReveal direction="up" delay={200} duration={600}>
            <div className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-[#F9F9FB] dark:bg-[#141414] p-8 sm:p-10 text-left h-full flex flex-col justify-between transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white mb-3">
                  Industrial governance &amp; RBAC
                </h3>
                <p className="text-sm sm:text-[14px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  Enterprise-grade security controls in NexVSM ensure plant managers can set strict role-based access permissions, Single Sign-On (SSO) via Okta and Azure AD, and full audit trails for plant engineers.
                </p>
              </div>

              <div className="pt-6 sm:pt-8">
                <button
                  onClick={() => onOpenTrial({ mode: 'demo' })}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  Learn more
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 6 Grid Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto pt-6 border-t border-neutral-100 dark:border-neutral-800/60">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="p-3 text-left">
              <div className="mb-2">{cap.icon}</div>
              <h4 className="text-xs font-bold text-black dark:text-white leading-snug">{cap.title}</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">{cap.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  BarChart3, 
  FileSpreadsheet, 
  Maximize2,
  Clock,
  TrendingDown,
  Percent,
  Timer
} from 'lucide-react';
import { SITE_DATA } from '../config/siteData';

export const ProductShowcase = ({ onOpenTrial }) => {
  const [activeBlock, setActiveBlock] = useState('builder');
  const [zoomModalImage, setZoomModalImage] = useState(null);

  // Quick live interactive calculator for KPI showcase
  const [dailyDemand, setDailyDemand] = useState(450);
  const [availableHours, setAvailableHours] = useState(15.0);
  const taktTime = Math.round(((availableHours * 3600) / dailyDemand) * 10) / 10;

  return (
    <section id="product" className="py-20 md:py-32 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>{SITE_DATA.showcase.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {SITE_DATA.showcase.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            {SITE_DATA.showcase.subheadline}
          </p>
        </div>

        {/* Tab Navigation for 3 Showcase Blocks */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-2xs gap-1">
            {SITE_DATA.showcase.blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => setActiveBlock(block.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  activeBlock === block.id
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {block.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Showcase Content */}
        <div className="mt-12 sm:mt-16">
          {SITE_DATA.showcase.blocks.map((block) => {
            if (block.id !== activeBlock) return null;

            return (
              <div
                key={block.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Column: Descriptive Text & Features */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 mb-3">
                    {block.tag}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {block.headline}
                  </h3>

                  <p className="mt-4 text-base text-slate-600 leading-relaxed">
                    {block.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="mt-6 space-y-3">
                    {block.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="text-sm text-slate-700 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Live Interactive Widget if KPIs Block */}
                  {block.id === 'kpis' && (
                    <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-800 mb-2">
                        <span className="flex items-center gap-1.5">
                          <Timer className="w-4 h-4 text-blue-600" />
                          Live In-App Takt Formula
                        </span>
                        <span className="font-mono text-blue-700 font-extrabold text-sm">
                          {taktTime}s / unit
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                        <div>
                          <label className="text-[11px] text-slate-600 font-medium block">Daily Demand</label>
                          <input 
                            type="number" 
                            value={dailyDemand} 
                            onChange={(e) => setDailyDemand(Math.max(1, Number(e.target.value)))}
                            className="w-full mt-1 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-600 font-medium block">Available Shift Hours</label>
                          <input 
                            type="number" 
                            step="0.5"
                            value={availableHours} 
                            onChange={(e) => setAvailableHours(Math.max(1, Number(e.target.value)))}
                            className="w-full mt-1 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA button */}
                  <div className="mt-8">
                    <button
                      onClick={() => onOpenTrial({ mode: 'trial' })}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 active:bg-slate-950 transition-colors shadow-xs"
                    >
                      <span>Explore this feature in trial</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Real Application Screenshot Preview */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-950 p-2 sm:p-3 shadow-elevated group">
                    
                    {/* Browser / Window Header */}
                    <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 border-b border-slate-800/80 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">
                        VSM Cloud — {block.title}
                      </span>
                      <button
                        onClick={() => setZoomModalImage(block.image)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Click to view full image"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="relative rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={block.image}
                        alt={`VSM Cloud ${block.title}`}
                        className="w-full h-auto object-cover max-h-[520px] rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = block.fallbackImage;
                        }}
                      />

                      {/* Verified Product Badge overlay */}
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-700/80 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Verified VSM Cloud Production Screenshot</span>
                      </div>
                    </div>

                    {/* Screenshot Caption */}
                    <div className="mt-2.5 px-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Live software view from actual engineering deployment</span>
                      <span className="font-mono text-slate-400">No mockups</span>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal for Zooming Screenshot */}
      {zoomModalImage && (
        <div 
          onClick={() => setZoomModalImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-150 cursor-pointer"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-xl border border-slate-700 bg-slate-900 p-2">
            <img 
              src={zoomModalImage} 
              alt="Zoomed Product View" 
              className="w-full h-auto object-contain rounded"
            />
            <button
              onClick={() => setZoomModalImage(null)}
              className="absolute top-4 right-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700"
            >
              Close [ESC]
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

'use client';

import { useRef, useState, useEffect } from 'react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

/**
 * 2-column editorial hero (used when heroImageUrl is set OR preset is editorial/magazine/storyteller).
 * Left: text + CTA, Right: hero image or decorative placeholder.
 */
function HeroEditorial({ config, name, tagline, parallaxY, fadeOpacity, t }: {
  config: SiteConfig;
  name: string;
  tagline: string;
  parallaxY: string;
  fadeOpacity: number;
  t: (key: string) => string;
}) {
  return (
    <>
      <div className="absolute inset-0 z-0 mesh-gradient-bg" />
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 hero-editorial"
        style={{ opacity: fadeOpacity }}
      >
        {/* Left col: text */}
        <div className="hero-text-col flex flex-col justify-center">
          <span className="section-label animate-fade-up">Personal Brand</span>
          <h1
            className="hero-name-gradient text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-4 animate-fade-up"
          >
            {name}
          </h1>
          <p className="text-[clamp(1.1rem,2.5vw,1.375rem)] mb-10 max-w-sm leading-relaxed animate-fade-up animate-fade-up-d1"
            style={{ color: 'var(--text-secondary)' }}>
            {tagline}
          </p>
          <a
            href="#contact"
            className="self-start inline-flex items-center gap-2 px-9 py-4 rounded-full text-white font-semibold text-base shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up animate-fade-up-d2 btn-press"
            style={{ background: 'var(--brand-gradient)', boxShadow: '0 4px 20px color-mix(in srgb, var(--brand-primary) 30%, transparent)' }}
          >
            {t('hero.cta')}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>

        {/* Right col: hero image or decorative block */}
        <div
          className="hero-img-col animate-fade-up animate-fade-up-d1"
          style={{ transform: `translateY(${parallaxY})` }}
        >
          <div className="hero-image-wrapper">
            {config.heroImageUrl ? (
              <img
                src={config.heroImageUrl}
                alt={name}
                loading="eager"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-primary-subtle, rgba(238,91,43,0.08)) 0%, color-mix(in oklch, var(--brand-secondary, #f59e0b) 12%, transparent) 100%)',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Centered hero — used for "minimal" preset or when no image is set.
 */
function HeroCentered({ config, name, tagline, parallaxY, fadeOpacity, t }: {
  config: SiteConfig;
  name: string;
  tagline: string;
  parallaxY: string;
  fadeOpacity: number;
  t: (key: string) => string;
}) {
  return (
    <>
      {config.heroImageUrl && (
        <div
          className="absolute inset-0 z-0"
          style={{ transform: config.parallaxEnabled ? `translateY(${parallaxY})` : undefined }}
        >
          <img src={config.heroImageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}
      {!config.heroImageUrl && (
        <div className="absolute inset-0 z-0 mesh-gradient-bg" />
      )}
      <div
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl"
        style={{ opacity: fadeOpacity }}
      >
        <span className="section-label animate-fade-up" style={{ color: config.heroImageUrl ? 'rgba(255,255,255,0.7)' : undefined }}>
          Personal Brand
        </span>
        <h1
          className={`text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 animate-fade-up ${config.heroImageUrl ? 'text-white' : 'hero-name-gradient'}`}
        >
          {name}
        </h1>
        <p className={`text-[clamp(1.1rem,2.5vw,1.5rem)] mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up animate-fade-up-d1 ${config.heroImageUrl ? 'text-white/80' : ''}`}
          style={!config.heroImageUrl ? { color: 'var(--text-secondary)' } : undefined}>
          {tagline}
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up animate-fade-up-d2 btn-press"
          style={{ background: 'var(--brand-gradient)', boxShadow: '0 4px 20px color-mix(in srgb, var(--brand-primary) 30%, transparent)' }}
        >
          {t('hero.cta')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
      {!config.heroImageUrl && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[80px]" fill="currentColor" style={{ color: 'var(--bg, #ffffff)' }}>
            <path d="M0,0 C300,100 900,20 1200,80 L1200,120 L0,120 Z" className="dark:fill-[#0f0f0f]" />
          </svg>
        </div>
      )}
    </>
  );
}

export function HeroSection({ config }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const tagline = locale === 'en' && config.taglineEn ? config.taglineEn : config.tagline;

  useEffect(() => {
    if (!config.parallaxEnabled) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const h = el.offsetHeight;
      if (h > 0) setScrollY(Math.max(0, Math.min(1, -rect.top / h)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [config.parallaxEnabled]);

  const parallaxY = `${scrollY * 30}%`;
  const fadeOpacity = Math.max(0, 1 - scrollY * 1.25);

  // Use editorial 2-col layout when: has image AND not minimal, OR explicit editorial/magazine/storyteller
  const useEditorial =
    config.designPreset === 'editorial' ||
    config.designPreset === 'magazine' ||
    config.designPreset === 'storyteller' ||
    (!!config.heroImageUrl && config.designPreset !== 'minimal');

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[auto] md:min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      {useEditorial ? (
        <HeroEditorial
          config={config}
          name={name}
          tagline={tagline}
          parallaxY={parallaxY}
          fadeOpacity={fadeOpacity}
          t={t}
        />
      ) : (
        <HeroCentered
          config={config}
          name={name}
          tagline={tagline}
          parallaxY={parallaxY}
          fadeOpacity={fadeOpacity}
          t={t}
        />
      )}
    </section>
  );
}

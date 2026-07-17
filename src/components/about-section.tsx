'use client';

import { AnimatedReveal } from './animated-reveal';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

export function AboutSection({ config }: Props) {
  const { locale, t } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const story = locale === 'en' && config.storyEn ? config.storyEn : config.story;

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 section-alt">
      <div className="max-w-4xl mx-auto">
        <AnimatedReveal variant="slide-left">
          <span className="section-label">{t('about.title')}</span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-[-0.02em] mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            {locale === 'en' ? `Hello, I'm ${name}.` : `안녕하세요, ${name}입니다.`}
          </h2>
          <p
            className="text-[1.125rem] leading-[1.85] whitespace-pre-line max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {story}
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
}

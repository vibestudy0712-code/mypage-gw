'use client';

import { AnimatedReveal } from './animated-reveal';
import type { ValueItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  values: ValueItem[];
}

export function ValuesSection({ values }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="values" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedReveal>
          <div className="text-center mb-12">
            <span className="section-label">{t('values.title')}</span>
            <h2
              className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-[-0.02em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {locale === 'en' ? 'What I Stand For' : '제가 믿는 것들'}
            </h2>
          </div>
        </AnimatedReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 stagger-children">
          {values.map((value, i) => {
            const title = locale === 'en' && value.titleEn ? value.titleEn : value.title;
            const desc = locale === 'en' && value.descEn ? value.descEn : value.desc;
            return (
              <AnimatedReveal key={i} delay={i * 100} variant="scale">
                <div className="value-card hover-glow">
                  <div className="value-icon">
                    <span>{value.emoji}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

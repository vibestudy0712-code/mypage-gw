'use client';

import { AnimatedReveal } from './animated-reveal';
import { CountUp } from './count-up';
import type { HighlightItem } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  highlights: HighlightItem[];
}

/** "84,000+" → { num: 84000, suffix: "+" } / "312주" → { num: 312, suffix: "주" } */
function parseNumericValue(raw: string): { num: number; suffix: string } | null {
  const match = raw.match(/^([\d,]+)(.*)$/);
  if (!match) return null;
  const num = parseInt(match[1].replace(/,/g, ''), 10);
  if (isNaN(num)) return null;
  return { num, suffix: match[2] ?? '' };
}

export function HighlightsSection({ highlights }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="highlights" className="py-20 sm:py-28 px-4 sm:px-6 section-alt">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedReveal>
          <span className="section-label">{t('highlights.title')}</span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-[-0.02em] mb-12"
            style={{ color: 'var(--text-primary)' }}
          >
            {locale === 'en' ? 'By the Numbers' : '숫자로 보는 여정'}
          </h2>
        </AnimatedReveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const label = locale === 'en' && item.labelEn ? item.labelEn : item.label;
            const rawValue = locale === 'en' && item.valueEn ? item.valueEn : item.value;
            const parsed = parseNumericValue(rawValue);
            return (
              <AnimatedReveal key={i} delay={i * 100}>
                <div className="highlight-item hover-glow">
                  <div className="highlight-number">
                    {parsed ? (
                      <CountUp end={parsed.num} suffix={parsed.suffix} />
                    ) : (
                      <span>{rawValue}</span>
                    )}
                  </div>
                  <div className="highlight-label">{label}</div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

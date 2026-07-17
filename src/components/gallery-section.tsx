'use client';

import { AnimatedReveal } from './animated-reveal';
import { useLocale } from '@/lib/i18n';

interface Props {
  images: string[];
}

export function GallerySection({ images }: Props) {
  const { locale, t } = useLocale();

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedReveal>
          <div className="text-center mb-12">
            <span className="section-label">{t('gallery.title')}</span>
            <h2
              className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-[-0.02em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {locale === 'en' ? 'Moments' : '순간들'}
            </h2>
          </div>
        </AnimatedReveal>

        <div className="masonry-gallery">
          {images.map((src, i) => (
            <AnimatedReveal key={i} delay={i * 60}>
              <div className="masonry-item">
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                />
                <div className="masonry-overlay" />
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

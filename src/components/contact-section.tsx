'use client';

import { AnimatedReveal } from './animated-reveal';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props {
  config: SiteConfig;
}

/** Inline SVG icons per platform (no icon-font dependency) */
function PlatformIcon({ platform }: { platform: string }) {
  switch (platform.toLowerCase()) {
    case 'youtube':
      return (
        <svg viewBox="0 0 28.57 20" width="22" height="16" style={{ flexShrink: 0 }}>
          <path fill="#FF0000" d="M27.97 3.12A3.58 3.58 0 0 0 25.45.6C23.21 0 14.28 0 14.28 0S5.36 0 3.12.6A3.58 3.58 0 0 0 .6 3.12 37.6 37.6 0 0 0 0 10a37.6 37.6 0 0 0 .6 6.88A3.58 3.58 0 0 0 3.12 19.4c2.24.6 11.16.6 11.16.6s8.93 0 11.17-.6a3.58 3.58 0 0 0 2.52-2.52A37.6 37.6 0 0 0 28.57 10a37.6 37.6 0 0 0-.6-6.88z"/>
          <path fill="#FFF" d="M11.43 14.29 18.86 10l-7.43-4.29v8.58z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" style={{ flexShrink: 0 }}>
          <defs><radialGradient id="ig-grad" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs>
          <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)"/>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="#fff" strokeWidth="1.5"/>
          <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="1.5"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2" style={{ flexShrink: 0 }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.06a8.27 8.27 0 0 0 4.84 1.55V7.17a4.85 4.85 0 0 1-1.07-.48z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      );
  }
}

/** Label for each platform */
function platformLabel(platform: string): string {
  const labels: Record<string, string> = {
    youtube: 'YouTube', instagram: 'Instagram', twitter: 'Twitter',
    x: 'X (Twitter)', github: 'GitHub', linkedin: 'LinkedIn', tiktok: 'TikTok',
  };
  return labels[platform.toLowerCase()] ?? platform.charAt(0).toUpperCase() + platform.slice(1);
}

export function ContactSection({ config }: Props) {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedReveal>
          <span className="section-label">Contact</span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-[-0.02em] mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('contact.title')}
          </h2>
        </AnimatedReveal>

        <AnimatedReveal delay={100}>
          <p className="text-[1.05rem] leading-relaxed mb-10 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('contact.desc')}
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={200}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="contact-link"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {config.email}
              </a>
            )}
            {config.socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <PlatformIcon platform={social.platform} />
                {platformLabel(social.platform)}
              </a>
            ))}
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.tagline,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.tagline,
    type: 'profile',
    images: ['/api/og'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

/** Map fontFamily setting to a CDN href. Returns null for system fonts. */
function getFontHref(font: string): string | null {
  const map: Record<string, string> = {
    Pretendard: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    'Noto Sans KR': 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap',
    'IBM Plex Sans KR': 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap',
    '나눔고딕': 'https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap',
    '나눔명조': 'https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap',
    'Gmarket Sans': 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    Inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
    Poppins: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap',
  };
  return map[font] ?? map['Pretendard'];
}

/** CSS font-family stack per setting */
function getFontStack(font: string): string {
  const stacks: Record<string, string> = {
    Pretendard: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    'Noto Sans KR': "'Noto Sans KR', sans-serif",
    'IBM Plex Sans KR': "'IBM Plex Sans KR', sans-serif",
    '나눔고딕': "'Nanum Gothic', sans-serif",
    '나눔명조': "'Nanum Myeongjo', serif",
    'Gmarket Sans': "'GmarketSans', 'Pretendard Variable', sans-serif",
    Inter: "Inter, system-ui, sans-serif",
    Poppins: "Poppins, system-ui, sans-serif",
  };
  return stacks[font] ?? stacks['Pretendard'];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontHref = getFontHref(siteConfig.fontFamily);
  const fontStack = getFontStack(siteConfig.fontFamily);

  return (
    <html lang="ko" data-preset={siteConfig.designPreset || 'creator'} suppressHydrationWarning>
      <head>
        {fontHref && (
          <link
            rel="stylesheet"
            crossOrigin="anonymous"
            href={fontHref}
          />
        )}
        {/* Inline critical font-family override */}
        <style dangerouslySetInnerHTML={{ __html: `body { font-family: ${fontStack}; }` }} />
        {/* Theme init — runs before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
        {/* Google Analytics */}
        {siteConfig.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${siteConfig.gaId}');`,
              }}
            />
          </>
        )}
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: siteConfig.name,
              description: siteConfig.tagline,
              ...(siteConfig.email ? { email: siteConfig.email } : {}),
              ...(siteConfig.socials?.length ? { sameAs: siteConfig.socials.map((s: { url: string }) => s.url) } : {}),
            }),
          }}
        />
      </head>
      <body className="antialiased" style={{ background: 'var(--bg, #ffffff)', color: 'var(--text-primary, #1a1a1a)' }}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:text-sm">본문으로 바로가기</a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import '@/app/globals.css';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                // Respect saved/device preference so the day/night toggle works.
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/coi-serviceworker.js`}
          data-coi="true"
          async
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Loading splash — shows before hydration (incl. after the COI service-worker reload)
            so users see feedback instead of a blank page; removed after first paint. */}
        <div id="__ot_loading" style={{position:'fixed',inset:0,zIndex:99999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem',background:'#f4f6fa',color:'#1f2430'}}>
          <div style={{fontSize:'2rem',fontWeight:700,letterSpacing:'.15em'}}>⚡ OFFICETOOLS</div>
          <div style={{width:'min(220px,70vw)',height:3,background:'rgba(0,255,245,.15)',borderRadius:2,overflow:'hidden'}}>
            <div id="__ot_bar" style={{width:'40%',height:'100%',background:'linear-gradient(90deg,#00fff5,#ff00ff)',animation:'__otslide 1.2s ease-in-out infinite'}}></div>
          </div>
          <div style={{fontSize:'.75rem',letterSpacing:'.2em',opacity:.6}}>LOADING...</div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          setTimeout(function(){
            var s=document.getElementById('__ot_loading');
            if(s){s.style.transition='opacity .3s';s.style.opacity='0';setTimeout(function(){s.remove();},320);}
          }, 400);
        ` }} />
        {children}
      </body>
    </html>
  );
}

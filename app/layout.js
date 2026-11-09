import './globals.css';

export const metadata = {
  title: 'GabinetAK HUB | Plataforma de Mobilização Eleitoral e Gestão de Gabinete',
  description: 'Plataforma SaaS com inteligência política, segurança de nível militar AES-256-GCM, LGPD e automação de campanha.',
  icons: {
    icon: '/logo/icon.svg',
    shortcut: '/logo/icon.svg',
    apple: '/logo/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <head>
        <link rel="icon" href="/logo/icon.svg" type="image/svg+xml" />
        {/* CSS Crítico Síncrono no Head: Impede estritamente FOUC de logos e SVGs gigantes no carregamento/F5 */}
        <style dangerouslySetInnerHTML={{__html: `
          img[src*="/logo/icon.svg"],
          img[src*="icon.svg"],
          .brand-icon-img {
            width: 32px !important;
            height: 32px !important;
            max-width: 32px !important;
            max-height: 32px !important;
            object-fit: cover !important;
            display: block !important;
          }
          .brand-icon-box {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            min-height: 32px !important;
            max-width: 32px !important;
            max-height: 32px !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
          }
          img[src*="/logo/horizontal.svg"],
          img[src*="horizontal.svg"],
          .logo-svg {
            height: 40px !important;
            max-height: 44px !important;
            width: auto !important;
            max-width: 190px !important;
            object-fit: contain !important;
            display: block !important;
          }
          .sidebar.collapsed .logo-svg {
            height: 32px !important;
            max-height: 32px !important;
            max-width: 32px !important;
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

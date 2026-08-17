import './globals.css';

export const metadata = {
  title: 'Elegiv Gestão 360 | Plataforma de Mobilização Eleitoral e Gestão de Gabinete',
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
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

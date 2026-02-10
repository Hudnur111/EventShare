import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="description" content="EventShare - Modern Event Photo Collection Platform" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%2338bdf8' width='100' height='100' rx='20'/><text x='50' y='65' font-size='60' font-weight='bold' fill='%230a0e27' text-anchor='middle' font-family='sans-serif'>E</text></svg>" />

        {/* No robots yet - update when ready */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
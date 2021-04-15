import Document, { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/Inter.var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link
            rel="alternate icon"
            type="image/png"
            href="/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="alternate icon"
            type="image/png"
            href="/favicon-16x16.png"
            sizes="16x16"
          />
          <link rel="alternate icon" href="/favicon.ico" />
          <link
            href="/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link href="/site.webmanifest" rel="manifest" />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Cloudflare Web Analytics */}
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.ANALYTICS_TOKEN}"}`}
          />
        </body>
      </Html>
    );
  }
}

export default AppDocument;

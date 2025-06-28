import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Jarvis Assistant - Assistente vocale e AI personale" />
        <meta name="author" content="Jarvis AI" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Jarvis Assistant" />
        <meta property="og:description" content="Assistente AI vocale e personale" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

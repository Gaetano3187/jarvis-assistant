import type { AppProps } from 'next/app';
import '../styles/globals.css';
import ThemeProvider from '../components/ThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

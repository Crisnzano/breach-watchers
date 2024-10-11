import LayoutPage from '../dashboard/Layout';
import '@/styles/globals.css'; // Import your global CSS

function MyApp({ Component, pageProps }: any) {
  return (
    <LayoutPage>
      <Component {...pageProps} />
    </LayoutPage>
  );
}

export default MyApp;

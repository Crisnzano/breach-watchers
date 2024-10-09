import Layout from '../Layout';
import '@/styles/globals.css'; // Import your global CSS

function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

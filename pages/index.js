import Welcome from '../components/welcome/welcome';
import Layout from '../components/layout';

export default function Home() {

  return (
    <div>
      <Welcome />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
}
import Layout from '../../components/Layout';
import { useGetItemsQuery } from '../../redux/slices/homeSlice';

function Home() {
  const { data } = useGetItemsQuery(1);
  return <Layout>Home {data?.[0].id}</Layout>;
}

export default Home;

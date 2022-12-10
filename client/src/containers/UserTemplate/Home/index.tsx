import { Box } from '@mui/material';
import Header from '../../../components/Header';
import { useGetItemsQuery } from '../../../redux/slices/homeSlice';

function Home() {
  const { data } = useGetItemsQuery(1);
  console.log('data', data);
  return (
    <Box>
      <Header />
      Home
    </Box>
  );
}

export default Home;

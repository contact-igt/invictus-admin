import Stack from '@mui/material/Stack';
import PetTipsDetails from 'components/sections/pettips/tips-details';
import { useParams } from 'react-router-dom';

const PetTipsDetailPage = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const id = tipId ? parseInt(tipId, 10) : NaN;


  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <PetTipsDetails tipId={id} />
    </Stack>
  );
};

export default PetTipsDetailPage;

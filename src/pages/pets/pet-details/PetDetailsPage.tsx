import Stack from '@mui/material/Stack';
import PetDetails from 'components/sections/pets/pet-details/PetDetailPage';
import { useParams } from 'react-router-dom';

const PetDetailsPage = () => {
  const { petId } = useParams<{ petId: string }>();
  const id = petId ? parseInt(petId, 10) : NaN;
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <PetDetails petId={id} />
    </Stack>
  );
};

export default PetDetailsPage;

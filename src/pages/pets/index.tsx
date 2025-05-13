import Stack from '@mui/material/Stack';
import PetsListing from 'components/sections/pets';

const Pets = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <PetsListing />
    </Stack>
  );
};

export default Pets;

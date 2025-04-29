import Stack from '@mui/material/Stack';
import UpcomingEvents from 'components/sections/upcoming-events';

const PetTips = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <UpcomingEvents />
    </Stack>
  );
};

export default PetTips;

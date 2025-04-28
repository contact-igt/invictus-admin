import Stack from '@mui/material/Stack';
import UpcomingTask from 'components/sections/dashboard/upcoming-task';

const PetTips = () => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
      <Stack p={3.5} spacing={3.5} direction="column" width={{ xs: 1, md: 'calc(100% - 460px)' }}>
        <UpcomingTask />
      </Stack>
    </Stack>
  );
};

export default PetTips;

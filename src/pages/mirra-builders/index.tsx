import Stack from '@mui/material/Stack';
import MirraBuildersSection from 'components/sections/mirra-builders';

const MirraBuilders = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <MirraBuildersSection />
    </Stack>
  );
};

export default MirraBuilders;

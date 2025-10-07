import Stack from '@mui/material/Stack';
import KrInstituteSection from 'components/sections/kr-institue';

const KrInstitute = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <KrInstituteSection />
    </Stack>
  );
};

export default KrInstitute;

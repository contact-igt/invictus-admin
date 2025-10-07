import Stack from '@mui/material/Stack';
import RamanansFinancialSection from 'components/sections/ramanansFinancial';

const RamanansFinancial = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <RamanansFinancialSection />
    </Stack>
  );
};

export default RamanansFinancial;

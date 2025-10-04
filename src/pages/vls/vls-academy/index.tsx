import Stack from '@mui/material/Stack';
import VlsLawAcademySection from 'components/sections/vls/vls-law-academy';

const VlsAcademy = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
           <VlsLawAcademySection/>
        </Stack>
    );
};

export default VlsAcademy;

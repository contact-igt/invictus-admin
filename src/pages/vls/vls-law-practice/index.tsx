import Stack from '@mui/material/Stack';
import VlsLawPracticeSection from 'components/sections/vls/vls-law-practice';

const VlsLawPractice = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <VlsLawPracticeSection />
        </Stack>
    );
};

export default VlsLawPractice;

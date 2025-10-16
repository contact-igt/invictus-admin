import Stack from '@mui/material/Stack';
import VlsAibeSection from 'components/sections/vls/vls-aibe';

const VlsAibe = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <VlsAibeSection />
        </Stack>
    );
};

export default VlsAibe;

import Stack from '@mui/material/Stack';
import NetralayaSection from 'components/sections/netralaya';

const Netralaya = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <NetralayaSection/>
        </Stack>
    );
};

export default Netralaya;

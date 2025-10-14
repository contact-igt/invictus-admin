import Stack from '@mui/material/Stack';
import WellinitSection from 'components/sections/wellinit';

const Wellinit = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <WellinitSection/>
        </Stack>
    );
};

export default Wellinit;

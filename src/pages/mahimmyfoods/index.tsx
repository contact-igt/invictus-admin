import Stack from '@mui/material/Stack';
import MahimmyFoodSection from 'components/sections/mahimmyfood';

const Mahimmyfood = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
            <MahimmyFoodSection/>
        </Stack>
    );
};

export default Mahimmyfood;

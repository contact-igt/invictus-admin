import Stack from '@mui/material/Stack';
import InvictusMetaSection from 'components/sections/invictus/invictus-meta';

const InvictusMeta = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
           <InvictusMetaSection />
        </Stack>
    );
};

export default InvictusMeta;

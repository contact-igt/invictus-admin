import Stack from '@mui/material/Stack';
import InvictusLeadsSection from 'components/sections/invictus/invictus-leads';

const InvictusLeads = () => {
    return (
        <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
           <InvictusLeadsSection />
        </Stack>
    );
};

export default InvictusLeads;

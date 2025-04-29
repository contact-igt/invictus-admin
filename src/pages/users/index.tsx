import Stack from '@mui/material/Stack';
import UsersSection from 'components/sections/petusers';
const Users = () => {
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      <UsersSection />
    </Stack>
  );
};

export default Users;

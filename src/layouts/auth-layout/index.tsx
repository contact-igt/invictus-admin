import { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      component="main"
      alignItems="center"
      justifyContent="center"
      px={1}
      py={7}
      width={1}
      minHeight="100vh"
      position="relative"
    >
      <Paper sx={{ px: 3, py: 2, width: 1, maxWidth: 450 }}>{children}</Paper>
    </Stack>
  );
};

export default AuthLayout;

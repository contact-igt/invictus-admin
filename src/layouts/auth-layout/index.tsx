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
      bgcolor="primary.main"
    >
      <Paper
        sx={{
          px: 3,
          py: 2,
          width: 1,
          maxWidth: 450,
          boxshadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
      >
        {children}
      </Paper>
    </Stack>
  );
};

export default AuthLayout;

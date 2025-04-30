/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Box } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

export const Popup = ({ children, open, onClose }: any) => {
  if (!open) return null;

  return (
    <Stack
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(15px)',
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: 'fit-content',
          height: 'fit-content',
          display: 'inline-block',
          padding: 2,
          boxShadow: 3,
        }}
      >
        <IconifyIcon
          icon="hugeicons:cancel-01"
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: -30,
            right: -30,
            fontSize: 30,
          }}
        />
        {children}
      </Box>
    </Stack>
  );
};

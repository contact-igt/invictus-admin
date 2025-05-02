import React from 'react';
import { Typography } from '@mui/material';

interface AppErrorMessageProps {
  error?: string;
  visible?: boolean;
}

const AppErrorMessage: React.FC<AppErrorMessageProps> = ({ error, visible = true }) => {
  if (!visible || !error) return null;

  return (
    <Typography variant="caption" color="error" sx={{ mt: 1, fontWeight: 500 }}>
      {error}
    </Typography>
  );
};

export default AppErrorMessage;

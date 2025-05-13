import React from 'react';
import { Box, Typography } from '@mui/material';

type PetBannerProps = {
  imageUrl?: string | null;
};

const PetBanner: React.FC<PetBannerProps> = ({ imageUrl }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 255,
        mb: 3,
        borderRadius: 2,
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: imageUrl ? 'transparent' : 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!imageUrl && <Typography>No image provided</Typography>}
    </Box>
  );
};

export default PetBanner;

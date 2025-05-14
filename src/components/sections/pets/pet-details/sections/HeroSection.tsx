import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, CircularProgress } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface PetBannerProps {
  imageUrl?: string | null;
  completionPercent: number; // 0–100
  likedCount: number;
  superLikedCount: number;
}

const PetBanner: React.FC<PetBannerProps> = ({
  imageUrl,
  completionPercent,
  likedCount,
  superLikedCount,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / duration) * completionPercent, completionPercent);
      setAnimatedValue(Math.round(progress));
      if (progress < completionPercent) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [completionPercent]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 255,
        mb: 3,
        borderRadius: 2,
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: imageUrl ? 'transparent' : 'grey.200',
        overflow: 'hidden',
      }}
    >
      {!imageUrl && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>No image provided</Typography>
        </Box>
      )}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          bgcolor: 'rgba(0,0,0,0.4)',
          borderRadius: 2,
          p: 1,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ opacity: 0.85 }}>
          <IconifyIcon icon="mdi:heart" sx={{ color: 'error.main' }} />
          <Typography variant="body2" color="common.white">
            {likedCount}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ opacity: 0.85 }}>
          <IconifyIcon icon="mdi:heart-flash" sx={{ color: 'warning.main' }} />
          <Typography variant="body2" color="common.white">
            {superLikedCount}
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: 88,
          height: 88,
          borderRadius: '50%',
          bgcolor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          variant="determinate"
          value={animatedValue}
          size={80}
          thickness={6}
          sx={{
            color: 'primary.main',
            transform: 'rotate(-135deg)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="body2" fontWeight={700} color="common.white">
            {animatedValue}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PetBanner;

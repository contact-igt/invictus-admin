import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface PetVideo {
  id: number;
  video_url: string;
}

interface PetVideoSectionProps {
  pet: {
    pet_gallery?: {
      video?: PetVideo[];
    };
  };
}

const VIDEOS_PER_VIEW = 3;

const PetVideoSection: React.FC<PetVideoSectionProps> = ({ pet }) => {
  const videos = pet.pet_gallery?.video || [];
  const [startIndex, setStartIndex] = useState(0);

  const canSlidePrev = startIndex > 0;
  const canSlideNext = startIndex + VIDEOS_PER_VIEW < videos.length;

  const handlePrev = () => {
    if (canSlidePrev) {
      setStartIndex(Math.max(0, startIndex - VIDEOS_PER_VIEW));
    }
  };

  const handleNext = () => {
    if (canSlideNext) {
      setStartIndex(Math.min(videos.length - VIDEOS_PER_VIEW, startIndex + VIDEOS_PER_VIEW));
    }
  };

  const visibleVideos = videos.slice(startIndex, startIndex + VIDEOS_PER_VIEW);

  if (videos.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No videos available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
       <Typography variant="h4" gutterBottom>
          Pet Videos
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handlePrev} disabled={!canSlidePrev}>
            <IconifyIcon icon="ic:round-arrow-back" />
          </IconButton>
          <IconButton onClick={handleNext} disabled={!canSlideNext}>
            <IconifyIcon icon="ic:round-arrow-forward" />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ overflow: 'hidden' }}>
        {visibleVideos.map((video) => (
          <Card key={video.id} sx={{ flex: 1, borderRadius: 3, height: 200, padding: '5px' }}>
            <Box
              component="video"
              src={video.video_url}
              controls
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                objectFit: 'cover',
              }}
            />
          </Card>
        ))}

        {visibleVideos.length < VIDEOS_PER_VIEW &&
          Array.from({ length: VIDEOS_PER_VIEW - visibleVideos.length }).map((_, i) => (
            <Box key={`spacer-${i}`} sx={{ flex: 1 }} />
          ))}
      </Stack>
    </Box>
  );
};

export default PetVideoSection;

import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface PetImage {
  id: number;
  image_url: string;
}

interface PetGallerySectionProps {
  pet: {
    pet_gallery?: {
      images?: PetImage[];
    };
  };
}

const IMAGES_PER_VIEW = 3;

const PetGallerySection: React.FC<PetGallerySectionProps> = ({ pet }) => {
  const images = pet.pet_gallery?.images || [];
  const [startIndex, setStartIndex] = useState(0);

  const canSlidePrev = startIndex > 0;
  const canSlideNext = startIndex + IMAGES_PER_VIEW < images.length;

  const handlePrev = () => {
    if (canSlidePrev) {
      setStartIndex(Math.max(0, startIndex - IMAGES_PER_VIEW));
    }
  };

  const handleNext = () => {
    if (canSlideNext) {
      setStartIndex(Math.min(images.length - IMAGES_PER_VIEW, startIndex + IMAGES_PER_VIEW));
    }
  };

  const visibleImages = images.slice(startIndex, startIndex + IMAGES_PER_VIEW);

  if (images.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No images available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
       <Typography variant="h4" gutterBottom>
          Pet Images
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
        {visibleImages.map((img) => (
          <Card key={img.id} sx={{ flex: 1, borderRadius: 3, height: 200,padding:"5px" }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${img.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 3,
              }}
            />
          </Card>
        ))}
        {visibleImages.length < IMAGES_PER_VIEW &&
          Array.from({ length: IMAGES_PER_VIEW - visibleImages.length }).map((_, i) => (
            <Box key={`spacer-${i}`} sx={{ flex: 1 }} />
          ))}
      </Stack>
    </Box>
  );
};

export default PetGallerySection;

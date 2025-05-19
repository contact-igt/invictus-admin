import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, Stack, Menu, MenuItem } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { Popup } from 'components/common/Popup';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<PetImage | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, img: PetImage) => {
    setAnchorEl(event.currentTarget);
    setSelectedImage(img);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedImage) {
      console.log('Deleting image id:', selectedImage.id);
    }
    setConfirmOpen(false);
    setSelectedImage(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedImage(null);
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
          <Box key={img.id} sx={{ flex: 1, position: 'relative' }}>
            <Card sx={{ flex: 1, borderRadius: 3, height: 200, padding: '5px' }}>
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

            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.7)' }}
              onClick={(e) => handleMenuOpen(e, img)}
            >
              <IconifyIcon icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        ))}
        {visibleImages.length < IMAGES_PER_VIEW &&
          Array.from({ length: IMAGES_PER_VIEW - visibleImages.length }).map((_, i) => (
            <Box key={`spacer-${i}`} sx={{ flex: 1 }} />
          ))}
      </Stack>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <IconifyIcon icon="eva:trash-2-outline" sx={{ mr: 1, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>

      <Popup open={confirmOpen} onClose={handleCancelDelete}>
        <ConfirmAlert
          title="Are you sure you want to delete this image?"
          isLoading={false}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Popup>
    </Box>
  );
};

export default PetGallerySection;

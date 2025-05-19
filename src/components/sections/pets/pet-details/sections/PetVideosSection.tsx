import React, { useState } from 'react';
import { Box, Typography, IconButton, Card, Stack, Menu, MenuItem } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { Popup } from 'components/common/Popup';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<PetVideo | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const canSlidePrev = startIndex > 0;
  const canSlideNext = startIndex + VIDEOS_PER_VIEW < videos.length;

  const handlePrev = () => {
    if (canSlidePrev) setStartIndex(Math.max(0, startIndex - VIDEOS_PER_VIEW));
  };

  const handleNext = () => {
    if (canSlideNext)
      setStartIndex(Math.min(videos.length - VIDEOS_PER_VIEW, startIndex + VIDEOS_PER_VIEW));
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>, vid: PetVideo) => {
    setAnchorEl(e.currentTarget);
    setSelectedVideo(vid);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedVideo) {
      console.log('Deleting video id:', selectedVideo.id);
    }
    setConfirmOpen(false);
    setSelectedVideo(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setSelectedVideo(null);
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
        {visibleVideos.map((vid) => (
          <Box key={vid.id} sx={{ flex: 1, position: 'relative' }}>
            <Card sx={{ flex: 1, borderRadius: 3, height: 200, padding: '5px' }}>
              <Box
                component="video"
                src={vid.video_url}
                controls
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 3,
                  objectFit: 'cover',
                }}
              />
            </Card>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.7)' }}
              onClick={(e) => handleMenuOpen(e, vid)}
            >
              <IconifyIcon icon="eva:more-vertical-fill" />
            </IconButton>
          </Box>
        ))}
        {visibleVideos.length < VIDEOS_PER_VIEW &&
          Array.from({ length: VIDEOS_PER_VIEW - visibleVideos.length }).map((_, i) => (
            <Box key={`spacer-${i}`} sx={{ flex: 1 }} />
          ))}
      </Stack>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={handleDeleteClick}
          sx={{ color: 'error.main' }}
        >
          <IconifyIcon
            icon="eva:trash-2-outline"
            sx={{ mr: 1, color: 'error.main' }}
          />
          Delete
        </MenuItem>
      </Menu>

      <Popup open={confirmOpen} onClose={handleCancelDelete}>
        <ConfirmAlert
          title="Are you sure you want to delete this video?"
          isLoading={false}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Popup>
    </Box>
  );
};

export default PetVideoSection;

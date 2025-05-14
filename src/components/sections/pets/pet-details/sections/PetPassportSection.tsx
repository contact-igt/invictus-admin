import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Skeleton, Divider, Grid } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { Popup } from 'components/common/Popup';
import { theme } from 'theme/theme';

interface PetPassportSectionProps {
  pet: {
    pet_name?: string;
    pet_passport?: {
      passport?: string | null;
    };
  };
}

const PetPassportSection: React.FC<PetPassportSectionProps> = ({ pet }) => {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const url = pet.pet_passport?.passport;
  const name = pet.pet_name || 'This pet';

  const handleView = () => {
    setImgLoaded(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5">{name}’s Passport</Typography>
        {url ? (
          <Button
            variant="contained"
            startIcon={<IconifyIcon icon="mdi:eye" />}
            onClick={handleView}
          >
            View Passport
          </Button>
        ) : (
          <Typography color="text.secondary">No passport available.</Typography>
        )}
      </Stack>

      <Popup open={open} onClose={handleClose}>
        <Box sx={{ position: 'relative', maxWidth: '80vw', maxHeight: '80vh' }}>
          {!imgLoaded && (
            <Skeleton variant="rectangular" width="50vw" height="60vh" sx={{ borderRadius: 2 }} />
          )}
          {url && (
            <Box
              component="img"
              src={url}
              alt={`${name} passport`}
              onLoad={() => setImgLoaded(true)}
              sx={{
                display: imgLoaded ? 'block' : 'none',
                maxWidth: '80vw',
                maxHeight: '80vh',
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      </Popup>
      <Grid item xs={12}>
        <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
      </Grid>
    </Box>
  );
};

export default PetPassportSection;

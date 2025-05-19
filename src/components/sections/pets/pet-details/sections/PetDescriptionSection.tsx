import React, { useState } from 'react';
import { Box, Typography, Stack, Grid, Divider, IconButton } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { theme } from 'theme/theme';
import { Popup } from 'components/common/Popup';
import EditDescriptionForm from 'components/sections/pets/pet-details/forms/EditDescriptionForm';

interface PetDescriptionSectionProps {
  pet: {
    description?: string;
  };
}

const PetDescriptionSection: React.FC<PetDescriptionSectionProps> = ({ pet }) => {
  const description = pet.description?.trim();
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  if (!description || description.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No description available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>
          Description
        </Typography>
        <IconButton onClick={handleEditOpen} color="primary">
          <IconifyIcon icon="eva:edit-2-outline" />
        </IconButton>
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
        {description}
      </Typography>

      <Grid item xs={12}>
        <Divider sx={{ borderColor: theme.palette.neutral?.lighter, mt: 2 }} />
      </Grid>

      <Popup open={editOpen} onClose={handleEditClose}>
        <EditDescriptionForm pet={pet} />
      </Popup>
    </Box>
  );
};

export default PetDescriptionSection;

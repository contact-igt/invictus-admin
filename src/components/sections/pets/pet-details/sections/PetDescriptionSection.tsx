import React from 'react';
import { Box, Typography, Stack, Grid, Divider } from '@mui/material';
import { theme } from 'theme/theme';

interface PetDescriptionSectionProps {
  pet: {
    description?: string;
  };
}

const PetDescriptionSection: React.FC<PetDescriptionSectionProps> = ({ pet }) => {
  const description = pet.description?.trim();
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
      </Stack>

      <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
        {description}
      </Typography>
      <Grid item xs={12}>
        <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
      </Grid>
    </Box>
  );
};

export default PetDescriptionSection;

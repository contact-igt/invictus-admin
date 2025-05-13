import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';

interface Vaccination {
  id: number;
  vaccination_name: string;
  vaccinated_date: string;
  vaccination_next_date: string;
}

interface PetVaccinationCardProps {
  vaccinations: Vaccination[];
}

const formatDate = (date: string) => {
  if (!date || date === '0000-00-00') return 'NA';
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const cardColors = ['#B2EBF2', '#C8E6C9', '#FFECB3', '#D1C4E9', '#FFCDD2', '#F8BBD0'];

const PetVaccinationCard: React.FC<PetVaccinationCardProps> = ({ vaccinations }) => {
  if (!vaccinations || vaccinations.length === 0) {
    return <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No vaccinations available.
            </Typography>
          </Box>;
  }

  return (
    <Box width="100%">
      <Typography variant="h4" gutterBottom>
        Pet Vaccinations
      </Typography>
      <Stack direction="column" spacing={4}>
        {vaccinations.map((vaccine, idx) => {
          const vaccColor = cardColors[(idx * 2) % cardColors.length];
          const nextColor = cardColors[(idx * 2 + 1) % cardColors.length];

          return (
            <Box key={vaccine.id} width="100%">
              <Typography variant="h6">{vaccine.vaccination_name || 'Unknown Vaccine'}</Typography>
              <Box display="flex" gap={2} width="100%">
                <Paper
                  elevation={3}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: vaccColor,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Vaccinated On
                  </Typography>
                  <Typography variant="body2">{formatDate(vaccine.vaccinated_date)}</Typography>
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    bgcolor: nextColor,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Next Due On
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(vaccine.vaccination_next_date)}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default PetVaccinationCard;

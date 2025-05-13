/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Stack, Paper, Typography, Divider, Grid } from '@mui/material';
import { theme } from 'theme/theme';

const getValue = (value: any): string =>
  value === null || value === undefined || value === '' ? 'NA' : String(value);

interface PetStats {
  age?: {
    years?: number;
    months?: number;
    days?: number;
  };
  weight?: {
    from?: number;
    to?: number;
  };
  height?: {
    from?: number;
    to?: number;
  };
}

interface PetStatsCardProps {
  pet: PetStats;
}

const PetStatsCard: React.FC<PetStatsCardProps> = ({ pet }) => {
  const { age, weight, height } = pet;

  const ageStr = age
    ? `${getValue(age.years)}y-${getValue(age.months)}m-${getValue(age.days)}d`
    : 'NA';

  const weightStr =
    weight && weight.from !== undefined && weight.to !== undefined
      ? `${getValue(weight.from)} - ${getValue(weight.to)} kg`
      : 'NA';

  const heightStr =
    height && height.from !== undefined && height.to !== undefined
      ? `${getValue(height.from)} - ${getValue(height.to)} cm`
      : 'NA';

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Paper
          elevation={2}
          sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: 'warning.light', textAlign: 'center' }}
        >
          <Typography variant="h6" gutterBottom>
            Age
          </Typography>
          <Typography>{ageStr}</Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: 'success.light', textAlign: 'center' }}
        >
          <Typography variant="h6" gutterBottom>
            Weight
          </Typography>
          <Typography>{weightStr}</Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{ flex: 1, p: 2, borderRadius: 2, bgcolor: '#F8BBD0', textAlign: 'center' }}
        >
          <Typography variant="h6" gutterBottom>
            Height
          </Typography>
          <Typography>{heightStr}</Typography>
        </Paper>
      </Stack>

      <Grid item xs={12}>
        <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
      </Grid>
    </>
  );
};

export default PetStatsCard;

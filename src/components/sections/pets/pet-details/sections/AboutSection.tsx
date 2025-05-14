/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Grid, Typography, Chip, Stack, Divider } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { theme } from 'theme/theme';

const getValue = (value: any): string =>
  value === null || value === undefined || value === '' || value === '0000-00-00'
    ? 'NA'
    : String(value);

const capitalize = (value: string = ''): string =>
  value
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

const formatDateOfBirth = (iso: string | undefined): string => {
  if (!iso || iso === '0000-00-00') return 'NA';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

type Pet = {
  pet_name?: string;
  pet_type?: string;
  gender?: string;
  pet_breed?: string;
  color?: string;
  nuetered?: string;
  physically_active?: string;
  microchip_number?: number;
  pet_address?: {
    city?: string;
    country?: string;
  };
  date_of_birth?: string;
};

type Props = {
  pet: Pet;
};

const PetAboutSection: React.FC<Props> = ({ pet }) => {
  const {
    pet_name,
    pet_type,
    gender,
    pet_breed,
    color,
    nuetered,
    physically_active,
    microchip_number,
    pet_address,
    date_of_birth,
  } = pet;

  const name = capitalize(getValue(pet_name));
  const type = capitalize(getValue(pet_type));
  const sex = capitalize(getValue(gender));
  const breed = capitalize(getValue(pet_breed));
  const col = capitalize(getValue(color));
  const neutered = capitalize(getValue(nuetered));
  const activity = capitalize(getValue(physically_active));
  const microchip = getValue(microchip_number);
  const location =
    pet_address?.city && pet_address?.country
      ? `${capitalize(getValue(pet_address.city))}, ${capitalize(getValue(pet_address.country))}`
      : 'NA';
  const dob = formatDateOfBirth(date_of_birth);

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h4" fontWeight={600}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Chip icon={<IconifyIcon icon="mdi:paw" />} label={type} />
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon
              icon={gender?.toLowerCase() === 'male' ? 'mdi:gender-male' : 'mdi:gender-female'}
            />
            <Typography variant="h6">{sex}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
            <Typography variant="h6">{breed}</Typography>
            <IconifyIcon icon="mdi:shape-outline" />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mdi:palette" />
            <Typography variant="subtitle1" color="textSecondary">
              Color
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {col}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mdi:check-decagram" />
            <Typography variant="subtitle1" color="textSecondary">
              Neutered
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {neutered}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mdi:run" />
            <Typography variant="subtitle1" color="textSecondary">
              Activity
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {activity}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mdi:chip" />
            <Typography variant="subtitle1" color="textSecondary">
              Microchip
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {microchip}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="eva:pin-outline" />
            <Typography variant="subtitle1" color="textSecondary">
              Location
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {location}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconifyIcon icon="mdi:calendar" />
            <Typography variant="subtitle1" color="textSecondary">
              Date of Birth
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Typography variant="body1" fontWeight={500}>
            {dob}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default PetAboutSection;

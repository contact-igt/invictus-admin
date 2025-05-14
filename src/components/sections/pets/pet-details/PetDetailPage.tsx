/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Divider, Grid, Paper } from '@mui/material';
import { usePetByIdQuery } from 'components/hooks/usePetsQuery';
import PageLoader from 'components/loader/PageLoader';
import PetBanner from './sections/HeroSection';
import PetAboutSection from './sections/AboutSection';
import PetStatsCard from './sections/StatsCards';
import PetGallerySection from './sections/PetGallerySection';
import { theme } from 'theme/theme';
import PetVideoSection from './sections/PetVideosSection';
import PetDescriptionSection from './sections/PetDescriptionSection';
import PetVaccinationCard from './sections/PetVaccinationStates';
import PetPassportSection from './sections/PetPassportSection';

interface PetDetailsProps {
  petId: string | number;
}

const PetDetails: FC<PetDetailsProps> = ({ petId }) => {
  const { data, isLoading } = usePetByIdQuery(petId);
  if (isLoading) return <PageLoader />;
  if (!data?.pet)
    return <Paper sx={{ p: 4, textAlign: 'center' }}>Failed to load pet details.</Paper>;

  const { pet } = data;
  console.log(pet);

  return (
    <Paper elevation={4} sx={{ width: '100%', mx: 'auto', my: 4, p: { xs: 2, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ pr: { md: 3 } }}>
          <PetBanner
            imageUrl={pet.pet_profile_picture}
            completionPercent={pet.pet_profile_completeion}
            likedCount={pet.liked_count}
            superLikedCount={pet.super_liked_count}
          />
          <PetAboutSection pet={pet} />
          <PetStatsCard pet={pet} />
          <PetDescriptionSection pet={pet} />
          <PetPassportSection pet={pet} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: { md: 3 },
            mt: { xs: 4, md: 0 },
            borderLeft: { xs: 'none', md: `1px solid ${theme.palette.neutral?.lighter}` },
          }}
        >
          <PetGallerySection pet={pet} />

          <Grid item xs={12}>
            <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
          </Grid>

          <PetVideoSection pet={pet} />

          <Grid item xs={12}>
            <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
          </Grid>

          <PetVaccinationCard vaccinations={pet.vaccinations} />

          <Grid item xs={12}>
            <Divider sx={{ borderColor: theme.palette.neutral?.lighter }} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PetDetails;

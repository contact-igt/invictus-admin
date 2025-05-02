import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import IconifyIcon from 'components/base/IconifyIcon';
import type { Tip } from 'services/tips/script';
import { formatDistanceToNow } from 'date-fns';
import { PetTipsDetailsProps } from 'services/tips/script';
import { TipApis } from 'services/tips';
import { useQuery } from 'react-query';
import PageLoader from 'components/loader/PageLoader';

const PetTipsDetails: FC<PetTipsDetailsProps> = ({ tipId }) => {
  const { getTipById } = new TipApis();

  const { data, isLoading } = useQuery<{ petTip: Tip }, Error>(
    ['tips', tipId],
    () => getTipById(tipId),
    { staleTime: 1000 * 60 * 3 },
  );

  if (isLoading) return <PageLoader />;

  const petTip = data?.petTip;

  if (!petTip) {
    return (
      <Box maxWidth="md" mx="auto" my={4}>
        <Typography variant="h6" color="error">
          Tip not found.
        </Typography>
      </Box>
    );
  }

  const timeAgo = petTip.created_at
    ? formatDistanceToNow(new Date(petTip.created_at), { addSuffix: true })
    : '';

  return (
    <Box mx="auto" my={4}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Typography variant="h3" component="h1">
          {petTip.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconifyIcon icon="mynaui:calendar" color="text.secondary" fontSize="h6.fontSize" />
          <Typography variant="caption" color="text.secondary">
            {timeAgo}
          </Typography>
        </Stack>
      </Stack>

      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {petTip.title}
      </Typography>

      <CardMedia
        component="img"
        image={petTip.image}
        alt={petTip.title}
        sx={{ width: '100%', borderRadius: 2, mb: 3 }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <Typography variant="h6">Overview</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconifyIcon icon="mynaui:calendar" color="text.secondary" fontSize="h6.fontSize" />
          <Typography variant="caption" color="text.secondary">
            {timeAgo}
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }} gutterBottom>
        Overview
      </Typography>

      <Typography variant="body1" mb={3}>
        {petTip.overview}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Full Description
      </Typography>
      <Typography variant="body2" whiteSpace="pre-line">
        {petTip.description}
      </Typography>
    </Box>
  );
};

export default PetTipsDetails;

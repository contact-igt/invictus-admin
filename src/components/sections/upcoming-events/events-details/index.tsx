import { FC, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Fade,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { PetEventsDetailsProps } from 'services/events/script';
import { useEventByIdQuery } from 'components/hooks/useEventsQuery';
import PageLoader from 'components/loader/PageLoader';
import { formatDateRange, formatTimeRange } from 'helper/datetime';

const PetEventDetails: FC<PetEventsDetailsProps> = ({ eventId }) => {
  const { data, isLoading } = useEventByIdQuery(eventId);
  const event = data?.upcoming_event;
  const [imgIndex, setImgIndex] = useState(0);

  if (isLoading || !event) return <PageLoader />;

  const images: string[] = event.gallery_images || [];
  const dateRange = formatDateRange(event.start_date, event.end_date);
  const timeRange = formatTimeRange(event.start_time, event.end_time);
  const combinedDateTime = `${dateRange} • ${timeRange}`;
  const petLabels = event.pet_types?.map((pt: string | { label: string }) =>
    typeof pt === 'string' ? pt : pt.label,
  );

  const prevImage = () => setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <Paper elevation={3} sx={{ mx: 'auto', my: 4, padding: '0px 50px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            <Typography component="h1" sx={{ typography: { xs: 'h4', sm: 'h2' } }}>
              {event.event_title}
            </Typography>
            {petLabels?.length > 0 && (
              <Typography variant="body2" sx={{ mt: { xs: 1, sm: 0 } }}>
                {petLabels.join(', ')}
              </Typography>
            )}
          </Stack>
        </Grid>

        {images.length > 0 && (
          <Grid item xs={12}>
            <Box position="relative" sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Fade in timeout={500} key={imgIndex}>
                <CardMedia
                  component="img"
                  image={images[imgIndex]}
                  alt={`Event Image ${imgIndex + 1}`}
                  sx={{
                    width: '100%',
                    height: { xs: 300, sm: 500 },
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                />
              </Fade>
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevImage}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 8,
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <IconifyIcon icon="eva:arrow-left-outline" fontSize="1.5rem" />
                  </IconButton>
                  <IconButton
                    onClick={nextImage}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: 8,
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <IconifyIcon icon="eva:arrow-right-outline" fontSize="1.5rem" />
                  </IconButton>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    {images.map((_, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: idx === imgIndex ? 12 : 8,
                          height: idx === imgIndex ? 12 : 8,
                          borderRadius: '50%',
                          bgcolor: idx === imgIndex ? 'primary.main' : 'grey.400',
                          cursor: 'pointer',
                        }}
                        onClick={() => setImgIndex(idx)}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Full Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {event.event_description}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Event Date & Time
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <IconifyIcon icon="mynaui:calendar" fontSize="1.2rem" />
            <Typography variant="body1">{combinedDateTime}</Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Full Address
              </Typography>
              <Typography variant="body1">{event.full_address}</Typography>
            </Box>

            {event.pin_location && (
              <Button
                variant="contained"
                color="primary"
                href={event.pin_location}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </Button>
            )}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Contact Details
          </Typography>
          <Typography variant="body1">Email: {event.contact_details.email}</Typography>
          <Typography variant="body1">Phone: {event.contact_details.contact_number}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PetEventDetails;

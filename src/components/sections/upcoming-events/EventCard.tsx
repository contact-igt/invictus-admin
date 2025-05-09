import { useState } from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import { Event } from 'services/events/script';
import { formatDateRange, formatTimeRange } from 'helper/datetime';
import ActionMenu from '../ActionMenu';

interface EventCardProps {
  data: Event;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const EventCard = ({ data, onEdit, onRemove }: EventCardProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dateRange = formatDateRange(data.start_date, data.end_date);
  const timeRange = formatTimeRange(data.start_time, data.end_time);

  const prevImage = () => {
    setImgIndex((i) => (i === 0 ? data.gallery_images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setImgIndex((i) => (i === data.gallery_images.length - 1 ? 0 : i + 1));
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardActionArea component={RouterLink} to={`petevent-details/${data.id}`}>
          <CardMedia
            component="img"
            height="140"
            image={data.gallery_images[imgIndex]}
            alt={data.event_title}
          />
        </CardActionArea>

        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <ActionMenu onEdit={() => onEdit(data.id)} onRemove={() => onRemove(data.id)} />
        </Box>

        <IconButton
          onClick={prevImage}
          size="small"
          sx={{
            position: 'absolute',
            top: '50%',
            left: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.7)',
          }}
        >
          <IconifyIcon icon="eva:arrow-left-outline" fontSize="1.2rem" />
        </IconButton>
        <IconButton
          onClick={nextImage}
          size="small"
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.7)',
          }}
        >
          <IconifyIcon icon="eva:arrow-right-outline" fontSize="1.2rem" />
        </IconButton>
      </Box>

      <CardContent
        component={RouterLink}
        to={`petevent-details/${data.id}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: 2,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Typography variant="h6" fontWeight={600} noWrap>
          {data.event_title}
        </Typography>

        <Box
          sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          <IconifyIcon icon="eva:pin-outline" sx={{ mr: 0.5, fontSize: 24 }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {data.full_address}
          </Typography>
        </Box>

        <Box
          sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          <IconifyIcon icon="mynaui:calendar" sx={{ mr: 0.5, color: 'primary.main' }} />
          <Typography variant="caption" color="primary.main" fontWeight={500} noWrap>
            {dateRange}
          </Typography>
          <Typography variant="caption" color="primary.main" sx={{ mx: 0.5 }} noWrap>
            (
          </Typography>
          <Typography variant="caption" color="primary.main" fontWeight={500} noWrap>
            {timeRange}
          </Typography>
          <Typography variant="caption" color="primary.main" noWrap>
            )
          </Typography>
        </Box>

        <Box sx={{ mt: 1, textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            {data.pet_types.join(', ')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;

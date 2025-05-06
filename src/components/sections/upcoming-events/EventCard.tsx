import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconifyIcon from 'components/base/IconifyIcon';
import { Event } from 'data/events';

interface EventCardProps {
  data: Event;
}

const EventCard = ({ data }: EventCardProps) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-4px)',
        },
        borderRadius: 2,
      }}
    >
      <RouterLink to={`petevent-details/${data.id}`}>
        <CardMedia component="img" height="110" image={data.thumb} alt="task_today_image" />
      </RouterLink>
      <CardContent>
        <Box mt={1.5}>
          <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
            {data.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {data.category}
          </Typography>
        </Box>

        <Stack mt={2} alignItems="center" justifyContent="space-between">
          <Stack alignItems="center" spacing={1}>
            <IconifyIcon icon="mynaui:clock-circle" color="text.secondary" fontSize="h4.fontSize" />
            <Typography variant="body1" fontWeight={500}>
              {data.daysLeft} Days Left
            </Typography>
          </Stack>

          <AvatarGroup max={5}>
            {data.avatars.map((avatar) => (
              <Avatar key={avatar} alt="avatar_img" src={avatar} />
            ))}
          </AvatarGroup>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default EventCard;

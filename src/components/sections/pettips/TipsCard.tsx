import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconifyIcon from 'components/base/IconifyIcon';
import type { Tip } from 'services/tips/script';
import { formatDistanceToNow } from 'date-fns';

interface TipCardProps {
  data: Tip;
}

const TipCard: FC<TipCardProps> = ({ data }) => {
  const timeAgo = formatDistanceToNow(new Date(data.created_at), {
    addSuffix: true,
  });

  return (
    <Card
      component={RouterLink}
      to={`pettips-details/${data.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        userSelect: 'none',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-4px)',
        },
        borderRadius: 2,
        color: 'inherit',
      }}
    >
      <CardMedia component="img" height="140" image={data.image} alt={data.title} />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {data.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {data.category}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          {data.overview}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconifyIcon icon="mynaui:calendar" color="text.secondary" fontSize="h5.fontSize" />
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TipCard;

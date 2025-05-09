import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconifyIcon from 'components/base/IconifyIcon';
import ActionMenu from '../ActionMenu';
import type { Tip } from 'services/tips/script';
import { formatDistanceToNow } from 'date-fns';

interface TipCardProps {
  data: Tip;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

const TipCard: FC<TipCardProps> = ({ data, onEdit, onRemove }) => {
  const timeAgo = formatDistanceToNow(new Date(data.created_at), { addSuffix: true });

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
      <Box sx={{ position: 'relative' }}>
        <RouterLink to={`pettips-details/${data.id}`}>
          <CardMedia component="img" height="140" image={data.image} alt={data.title} />
        </RouterLink>
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <ActionMenu onEdit={() => onEdit(data.id)} onRemove={() => onRemove(data.id)} />
        </Box>
      </Box>

      <CardContent
        component={RouterLink}
        to={`pettips-details/${data.id}`}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
          >
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
          <IconifyIcon icon="mynaui:calendar" fontSize="h5.fontSize" color="text.secondary" />
          <Typography variant="body2" color="text.secondary">
            {timeAgo}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TipCard;

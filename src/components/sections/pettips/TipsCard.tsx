import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconifyIcon from 'components/base/IconifyIcon';
import { Task } from 'data/tasks';

interface TaskCardProps {
  data: Task;
}

const TaskCard = ({ data }: TaskCardProps) => {
  return (
    <Card
      sx={{
        userSelect: 'none',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
        borderRadius: 2,
        cursor: 'pointer',
      }}
    >
      <CardMedia component="img" height="140" image={data.thumb} alt="task_today_image" />
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
              {data.daysLeft} Days Ago
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

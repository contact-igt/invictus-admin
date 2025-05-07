import { Stack } from '@mui/material';
import PetEventDetails from 'components/sections/upcoming-events/events-details';
import { useParams } from 'react-router-dom';

export default function index() {
  const { eventId } = useParams<{ eventId: string }>();
  return (
    <Stack direction="column" width="100%" minHeight="100vh" p={3.5} spacing={3.5}>
      {eventId && <PetEventDetails eventId={eventId} />}
    </Stack>
  );
}

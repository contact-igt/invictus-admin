import { useQuery } from 'react-query';
import { EventApis } from 'services/events';
import { useSnackbar } from 'notistack';

const eventApis = new EventApis();

export const useEventsQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useQuery(['events'], () => eventApis.getAllEvents(), {
    staleTime: 3 * 60 * 1000,
    onError: (error: Error) => {
      enqueueSnackbar(error.message || 'Failed to load events', { variant: 'error' });
    },
  });

  return { data, isLoading, isError };
};

export const useEventByIdQuery = (id: number | string) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useQuery(['event', id], () => eventApis.getEventById(id), {
    enabled: !!id,
    onError: (error: Error) => {
      enqueueSnackbar(error.message || 'Failed to fetch event details', { variant: 'error' });
    },
  });

  return { data, isLoading, isError };
};

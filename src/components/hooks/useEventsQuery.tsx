/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
    staleTime: 3 * 60 * 1000,
    onError: (error: Error) => {
      enqueueSnackbar(error.message || 'Failed to fetch event details', { variant: 'error' });
    },
  });

  return { data, isLoading, isError };
};

export const useAddEventMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    (data: any) => {
      const formData = new FormData();
      formData.append('event_title', data.event_title);
      formData.append('event_description', data.event_description);
      formData.append('full_address', data.full_address);
      formData.append('pin_location', data.pin_location);
      formData.append('email', data.email);
      formData.append('city', data.city);
      formData.append('country_code', data.country_code);
      formData.append('phone_number', data.phone_number);
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      formData.append('start_time', data.start_time);
      formData.append('end_time', data.end_time);
      formData.append('pet_types', JSON.stringify(data.pet_types));
      data.event_images.forEach((file: File, idx: number) => {
        formData.append(`event_images[${idx}]`, file, file.name || `image${idx}`);
      });

      return eventApis.addEvent(formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['events']);
        enqueueSnackbar('Event created successfully!', { variant: 'success' });
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to create event', { variant: 'error' });
      },
    },
  );
};

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ({ id, data }: { id: number | string; data: any }) => {
      const formData = new FormData();
      formData.append('event_title', data.event_title);
      formData.append('event_description', data.event_description);
      formData.append('full_address', data.full_address);
      formData.append('pin_location', data.pin_location);
      formData.append('email', data.email);
      formData.append('city', data.city);
      formData.append('country_code', data.country_code);
      formData.append('phone_number', data.phone_number);
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      formData.append('start_time', data.start_time);
      formData.append('end_time', data.end_time);
      formData.append('pet_types', JSON.stringify(data.pet_types));

      data.event_images.forEach((item: File | string, idx: number) => {
        if (item instanceof File) {
          formData.append(`event_images[${idx}]`, item, item.name || `image${idx}`);
        } else if (typeof item === 'string') {
          formData.append(`existing_images[${idx}]`, item);
        }
      });

      return eventApis.updateEvent(id, formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['events']);
        enqueueSnackbar('Event updated successfully!', { variant: 'success' });
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to update event', { variant: 'error' });
      },
    },
  );
};

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    (id: number | string) => eventApis.deleteEvent(id),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['events']);
        enqueueSnackbar('Event deleted successfully!', { variant: 'success' });
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to delete event', { variant: 'error' });
      },
    },
  );
};

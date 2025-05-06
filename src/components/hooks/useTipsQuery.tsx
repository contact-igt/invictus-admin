/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Tip, TipFormValues } from 'services/tips/script';
import { TipApis } from 'services/tips';
import { useSnackbar } from 'notistack';

const tipApis = new TipApis();

export const useTipsQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useQuery<Tip[], Error>(
    ['pet-tips'],
    () => tipApis.getAllTips(),
    {
      staleTime: 3 * 60 * 1000,
      //   onSuccess: () => {
      //     enqueueSnackbar('Pet tips loaded successfully', { variant: 'success' });
      //   },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to load pet tips', { variant: 'error' });
      },
    },
  );

  return { data, isLoading, isError };
};

export const useAddTipMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<void, Error, TipFormValues>(
    (values: TipFormValues) => {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.category.length > 0) {
        formData.append('category', values.category[0]);
      }
      formData.append('overview', values.overview);
      formData.append('description', values.description);
      formData.append('image', values.image);

      return tipApis.addTip(formData);
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Tip added successfully', { variant: 'success' });
        queryClient.invalidateQueries(['pet-tips']);
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to add tip', { variant: 'error' });
      },
    },
  );
};

export const useUpdateTipMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, Error, { id: number; values: TipFormValues }>(
    ({ id, values }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.category.length > 0) formData.append('category', values.category[0]);
      formData.append('overview', values.overview);
      formData.append('description', values.description);
      formData.append('image', values.image);
      return tipApis.updateTip(id, formData);
    },
    {
      onSuccess: () => {
        enqueueSnackbar('Tip updated successfully', { variant: 'success' });
        queryClient.invalidateQueries(['pet-tips']);
      },
      onError: (error) => {
        enqueueSnackbar(error.message || 'Failed to update tip', { variant: 'error' });
      },
    },
  );
};

export const useDeleteTipMutation = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation<void, Error, string | number>(
    (id) => tipApis.deleteTip(typeof id === 'string' ? parseInt(id, 10) : id),
    {
      onSuccess: () => {
        enqueueSnackbar('Tip deleted successfully', { variant: 'success' });
        queryClient.invalidateQueries(['pet-tips']);
      },
      onError: (error: Error) => {
        enqueueSnackbar(error.message || 'Failed to delete tip', { variant: 'error' });
      },
    },
  );
};


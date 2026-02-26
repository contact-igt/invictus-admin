import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ManagementApiData, UserPayload } from 'services/management';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

const api = new ManagementApiData();

export const useManagementQuery = () => {
    return useQuery(['managements'], () => api.getAllManagements(), {
        staleTime: 5 * 60 * 1000,
    });
};

export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((data: UserPayload) => api.createUser(data), {
        onSuccess: () => {
            enqueueSnackbar('User created successfully', { variant: 'success' });
            queryClient.invalidateQueries(['managements']);
        },
        onError: (error: any) => {
            const err = error as AxiosError<any>;
            enqueueSnackbar(err.response?.data?.message || 'Failed to create user', { variant: 'error' });
        },
    });
};

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(({ id, data }: { id: number | string; data: Partial<UserPayload> }) => api.updateManagement(id, data), {
        onSuccess: () => {
            enqueueSnackbar('User updated successfully', { variant: 'success' });
            queryClient.invalidateQueries(['managements']);
        },
        onError: (error: any) => {
            const err = error as AxiosError<any>;
            enqueueSnackbar(err.response?.data?.message || 'Failed to update user', { variant: 'error' });
        },
    });
};

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation((id: number | string) => api.deleteManagement(id), {
        onSuccess: () => {
            enqueueSnackbar('User deleted successfully', { variant: 'success' });
            queryClient.invalidateQueries(['managements']);
        },
        onError: (error: any) => {
            const err = error as AxiosError<any>;
            enqueueSnackbar(err.response?.data?.message || 'Failed to delete user', { variant: 'error' });
        },
    });
};

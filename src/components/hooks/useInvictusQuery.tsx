import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InvictusApiData } from "services/invictus";


const InvictusApis = new InvictusApiData();


export const useInvictusLeadsQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['invictus-leads'], () => InvictusApis.getAllInvictusLeads(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};

export const deleteInvictusLeadByIdQuery = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation<void, Error, { id: number }>(
        ({ id }) => InvictusApis.deleteByIdInvictusLead(id),
        {
            onSuccess: () => {
                enqueueSnackbar('Invictus Lead User deleted successfully', { variant: 'success' });
                queryClient.invalidateQueries(['invictus-leads']);
            },
            onError: (error) => {
                const err = error as AxiosError<any>;
                enqueueSnackbar(err.response?.data?.message || 'Something went wrong', {
                    variant: 'error',
                });
            },
        },
    );
}

export const useInvictusMetaQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['invictus-meta'], () => InvictusApis.getAllInvictusMeta(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });
    console.log(data);
    return { data, isLoading, isError };
};

export const deleteInvictusMetaByIdQuery = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation<void, Error, { id: number }>(
        ({ id }) => InvictusApis.deleteByIdInvictusMeta(id),
        {
            onSuccess: () => {
                enqueueSnackbar('Invictus Meta User deleted successfully', { variant: 'success' });
                queryClient.invalidateQueries(['invictus-meta']);
            },
            onError: (error) => {
                const err = error as AxiosError<any>;
                enqueueSnackbar(err.response?.data?.message || 'Something went wrong', {
                    variant: 'error',
                });
            },
        },
    );
}
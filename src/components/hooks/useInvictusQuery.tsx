import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
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


export const useInvictusMetaQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['invictus-meta'], () => InvictusApis.getAllInvictusMeta(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};

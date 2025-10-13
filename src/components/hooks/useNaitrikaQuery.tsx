import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { NaitrikaApiData } from "services/Naitrika";


const NaitrikaApis = new NaitrikaApiData()


export const useNaitrikaQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['naitrika'], () => NaitrikaApis.getAllNaitrikas(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


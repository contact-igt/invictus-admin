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


export const useDeleteNaitrika = () => {
    const { enqueueSnackbar } = useSnackbar();
    return useMutation((id: string) => NaitrikaApis.deleteNaitrika(id), {
        onSuccess: () => {
            enqueueSnackbar('Naitrika deleted successfully', { variant: 'success' });
        }
        , onError: (error: Error) => {

            enqueueSnackbar(error.message || 'Failed to delete Naitrika', { variant: 'error' });
        },
    });
}
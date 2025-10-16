import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { NetralayaApiData } from "services/Netralaya";


const NetralayaApis = new NetralayaApiData()


export const useNetralayaQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['Netralaya'], () => NetralayaApis.getAllNetralayas(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


export const useDeleteNetralaya = () => {
    const { enqueueSnackbar } = useSnackbar();
    return useMutation((id: string) => NetralayaApis.deleteNetralaya(id), {
        onSuccess: () => {
            enqueueSnackbar('Netralaya deleted successfully', { variant: 'success' });
        }
        , onError: (error: Error) => {

            enqueueSnackbar(error.message || 'Failed to delete Netralaya', { variant: 'error' });
        },
    });
}
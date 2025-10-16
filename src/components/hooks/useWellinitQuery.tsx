import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { WellinitApiData } from "services/wellinit";


const WellinitApis = new WellinitApiData()


export const useWellinitQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['wellinit'], () => WellinitApis.getAllWellinits(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


export const useDeleteWellinit = () => {
    const { enqueueSnackbar } = useSnackbar();
    return useMutation((id: string) => WellinitApis.deleteWellinit(id), {
        onSuccess: () => {
            enqueueSnackbar('Wellinit user deleted successfully', { variant: 'success' });
        }
        , onError: (error: Error) => {

            enqueueSnackbar(error.message || 'Failed to delete Wellinit user', { variant: 'error' });
        },
    });
}
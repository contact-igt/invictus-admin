import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "react-query";
import { MahimmyFoodApiData } from "services/mahimmyFood";


const MahimmyFoodApis = new MahimmyFoodApiData()


export const useMahimmyFoodQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['mahimmyFood'], () => MahimmyFoodApis.getAllMahimmyFoods(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


export const useDeleteMahimmyFood = () => {
    const { enqueueSnackbar } = useSnackbar();
    return useMutation((id: string) => MahimmyFoodApis.deleteMahimmyFood(id), {
        onSuccess: () => {
            enqueueSnackbar('MahimmyFood user deleted successfully', { variant: 'success' });
        }
        , onError: (error: Error) => {

            enqueueSnackbar(error.message || 'Failed to delete MahimmyFood user', { variant: 'error' });
        },
    });
}
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { PixelEyeApiData } from "services/pixelEye";


const PixelEyeApis = new PixelEyeApiData();


export const usePixelEyeQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['pixel'], () => PixelEyeApis.getAllPixelEye(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};



export const deletePixelEyeByIdQuery = () => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation<void, Error, { id: number }>(
        ({ id }) => PixelEyeApis.deleteByIdPixelEye(id),
        {
            onSuccess: () => {
                enqueueSnackbar('Pixel eye User deleted successfully', { variant: 'success' });
                queryClient.invalidateQueries(['pixel']);
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

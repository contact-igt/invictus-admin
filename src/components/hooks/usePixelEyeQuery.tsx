import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { PixelEyeApiData } from "services/pixelEye";


const PixelEyeApis = new PixelEyeApiData();


export const usePixelEyeQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['vls-practice'], () => PixelEyeApis.getAllPixelEye(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { VlsApiData } from "services/vls";


const VlsApis = new VlsApiData();


export const useVlsLawpracticeQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['vls-practice'], () => VlsApis.getAllVlsLawPractice(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};



export const useVlsLawAcademyQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['vls-academy'], () => VlsApis.getAllVlsLawAcademy(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};

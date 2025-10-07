import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { MirraBuildersApiData } from "services/mirraBuilders";


const MirraBuildersApis = new MirraBuildersApiData();


export const useMirraBuildersQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useQuery(['pixel'], () => MirraBuildersApis.getAllMirraBuilders(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: 'error' });
        },
    });

    return { data, isLoading, isError };
};


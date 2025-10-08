import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { krinstitutesApiData } from "services/krInstitute";


const KrInstituteApis = new krinstitutesApiData();

export const useKrInstituteQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, error } = useQuery(['KrInstitute'], () =>
        KrInstituteApis.getAllkrinstitutes(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: "error" });
        }
    });
    return { data, isLoading, error }
}
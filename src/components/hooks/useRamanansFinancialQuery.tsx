import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { RamanansFinancialApiData } from "services/ramanansFinancial";


const RamanansFinancialApis = new RamanansFinancialApiData();

export const useRamanansFinancialQuery = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, error } = useQuery(['ramanans-financial'], () =>
        RamanansFinancialApis.getAllRamansFinancial(), {
        staleTime: 2 * 60 * 1000,
        onError: (error: Error) => {
            enqueueSnackbar(error.message || 'Failed to load user', { variant: "error" });
        }
    });
    return { data, isLoading, error }
}
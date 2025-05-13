/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { PetApis } from 'services/pet';
import { useSnackbar } from 'notistack';

const petApis = new PetApis();

// Get All Pets
export const usePetsQuery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useQuery(['pets'], () => petApis.getAllPets(), {
    staleTime: 2 * 60 * 1000,
    onError: (error: Error) => {
      enqueueSnackbar(error.message || 'Failed to load pets', { variant: 'error' });
    },
  });

  return { data, isLoading, isError };
};

// Get Pet by ID
export const usePetByIdQuery = (id: number | string) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, isError } = useQuery(['pet', id], () => petApis.getPetById(id), {
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
    onError: (error: Error) => {
      enqueueSnackbar(error.message || 'Failed to fetch pet details', { variant: 'error' });
    },
  });

  return { data, isLoading, isError };
};

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { OphthallWebinarApiData } from 'services/ophthallWebinar';

export const useOphthallWebinarQuery = () => {
    const service = new OphthallWebinarApiData();

    return useQuery(['ophthall-webinars'], () => service.getAllOphthallWebinars());
};

export const deleteOphthallWebinarMutation = () => {
    const queryClient = useQueryClient();
    const service = new OphthallWebinarApiData();

    return useMutation({
        mutationFn: ({ id }: { id: number | string }) => service.deleteOphthallWebinar(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['ophthall-webinars']);
        },
    });
};

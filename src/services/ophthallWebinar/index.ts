import { _axios } from 'helper/axios';

export class OphthallWebinarApiData {
    getAllOphthallWebinars = async () => {
        return await _axios('get', '/ophthall-webinars');
    };

    getOphthallWebinarById = async (id: number | string) => {
        return await _axios('get', `/ophthall-webinar/${id}`);
    };

    deleteOphthallWebinar = async (id: number | string) => {
        return await _axios('delete', `/ophthall-webinar/${id}`);
    };
}

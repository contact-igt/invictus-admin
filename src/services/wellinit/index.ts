import { _axios } from 'helper/axios';

export class WellinitApiData {

    getAllWellinits = async () => {
        return await _axios('get', '/wellinits');
    };

    deleteWellinit = async (id: string) => {
        return await _axios('delete', `/wellinit/${id}`);
    }

}

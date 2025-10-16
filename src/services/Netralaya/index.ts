import { _axios } from 'helper/axios';

export class NetralayaApiData {

    getAllNetralayas = async () => {
        return await _axios('get', '/netralayas');
    };

    deleteNetralaya = async (id: string) => {
        return await _axios('delete', `/netralaya/${id}`);
    }

}

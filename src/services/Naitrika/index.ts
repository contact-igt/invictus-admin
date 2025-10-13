import { _axios } from 'helper/axios';

export class NaitrikaApiData {

    getAllNaitrikas = async () => {
        return await _axios('get', '/naitrikas');
    };

}

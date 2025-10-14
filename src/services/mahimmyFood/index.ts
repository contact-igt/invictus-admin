import { _axios } from 'helper/axios';

export class MahimmyFoodApiData {

    getAllMahimmyFoods = async () => {
        return await _axios('get', '/mahimmy-foods');
    };

    deleteMahimmyFood = async (id: string) => {
        return await _axios('delete', `/mahimmy-food/${id}`);
    }

}

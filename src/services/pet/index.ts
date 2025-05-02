import { _axios } from 'helper/axios';

export class PetApis {
  getPetTypes = async () => {
    return await _axios('get', '/get-pet-types');
  };
}

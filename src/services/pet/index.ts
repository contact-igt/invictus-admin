import { _axios } from 'helper/axios';

export class PetApis {
  getPetTypes = async () => {
    return await _axios('get', '/get-pet-types');
  };

  getAllPets = async () => {
    return await _axios('get', '/users-pets');
  };
  
  getPetById = async (id: number | string) => {
    return await _axios('get', `/user-pet-admin/${id}`);
  };
}

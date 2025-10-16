import { _axios } from 'helper/axios';

export class VlsApiData {
  getAllVlsLawPractice = async () => {
    return await _axios('get', '/vls-law-practices');
  };

  deleteVlsLawPracticeById = async (id: number) => {
    return await _axios('delete', `/vls-law-practice/${id}`);
  };

  getAllVlsLawAcademy = async () => {
    return await _axios('get', '/vls-law-academys');
  };
  
  deleteVlsLawAcademyById = async (id: number) => {
  return await _axios('delete', `/vls-law-academy/${id}`);
};

  // vls AIBE

  getAllVlsAibe = async () => {
    return await _axios('get', '/vls-law-aibes');
  };

  deleteVlsLawAibe = async (id: number) => {
    return await _axios('delete', `/vls-law-aibe/${id}`);
  };
}


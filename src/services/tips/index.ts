import { _axios } from 'helper/axios';

export class TipApis {
  getAllTips = async () => {
    return await _axios('get', '/pet-tips');
  };

  getTipById = async (id: number) => {
    return await _axios('get', `/pet-tips/${id}`);
  };

  addTip = async (formData: FormData) => {
    return await _axios('post', '/pet-tips', formData, 'multipart/form-data');
  };

  updateTip = async (id: number | string, formData: FormData) => {
    return await _axios('put', `/pet-tips/${id}`, formData, 'multipart/form-data');
  };

  deleteTip = async (id: number | string) => {
    return await _axios('delete', `/pet-tips/${id}`);
  };
}

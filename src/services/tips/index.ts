import { _axios } from "helper/axios";

export class TipApis {
  getAllTips = async () => {
    return await _axios('get', '/pet-tips');
  };

  getTipById = async (id: number) => {
    return await _axios('get', `/pet-tips/${id}`);
  };
}

import { _axios } from "helper/axios"

export class PixelEyeApiData {

    getAllPixelEye = async () => {
        return await _axios("get", "/pixel-eyes")
    }

    deleteByIdPixelEye = async (id: number) => {
        return await _axios("delete", `/pixel-eye/${id}`)
    }

}
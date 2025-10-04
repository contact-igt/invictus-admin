import { _axios } from "helper/axios"

export class PixelEyeApiData {

    getAllPixelEye = async () => {
        return await _axios("get", "/pixel-eyes")
    }

}
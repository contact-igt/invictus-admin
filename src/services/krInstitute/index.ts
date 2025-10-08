import { _axios } from "helper/axios"

export class krinstitutesApiData {

    getAllkrinstitutes = async () => {
        return await _axios("get", "/krinstitutes")
    }

}
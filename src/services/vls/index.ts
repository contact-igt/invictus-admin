import { _axios } from "helper/axios"

export class VlsApiData {

    getAllVlsLawPractice = async () => {
        return await _axios("get", "/vls-law-practices")
    }


       getAllVlsLawAcademy = async () => {
        return await _axios("get", "/vls-law-academys")
    }


}
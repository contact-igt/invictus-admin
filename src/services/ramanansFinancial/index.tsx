import { _axios } from "helper/axios"

export class RamanansFinancialApiData {

    getAllRamansFinancial = async () => {
        return await _axios("get", "/rv-financial-visions")
    }

}
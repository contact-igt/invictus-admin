import { _axios } from "helper/axios"

export class InvictusApiData {

    getAllInvictusLeads = async () => {
        return await _axios("get", "/invictuses")
    }


    getAllInvictusMeta = async () => {
        return await _axios("get", "/invictus-metas")
    }
}
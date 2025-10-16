import { _axios } from "helper/axios"

export class InvictusApiData {

    getAllInvictusLeads = async () => {
        return await _axios("get", "/invictuses")
    }
    deleteByIdInvictusLead = async (id: number) => {
        return await _axios("delete", `/invictus/${id}`)
    }

    getAllInvictusMeta = async () => {
        return await _axios("get", "/invictus-metas")
    }
    deleteByIdInvictusMeta = async (id: number)=>{
         return await _axios("delete", `/invictus-meta/${id}`)
    }
    
}
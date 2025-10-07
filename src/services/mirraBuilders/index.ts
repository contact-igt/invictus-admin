import { _axios } from "helper/axios"

export class MirraBuildersApiData {

    getAllMirraBuilders = async () => {
        return await _axios("get", "/mirra-builders")
    }

}
import { _axios } from "helper/axios";

export class UserApis {
    getAllUsers = async () => {
        return await _axios('post', '/users')
    }
}
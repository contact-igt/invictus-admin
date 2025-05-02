import { _axios } from "helper/axios";

export class UserApis {
    getAllUsers = async () => {
        return await _axios('post', '/users')
    }

    getUserById = async (id: number) => {
        return await _axios('post', `/user-profile/${id}`)
    }
}
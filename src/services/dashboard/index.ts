import { _axios } from "helper/axios";

export class DashboardApis {
    getAllUsers = async () => {
        return await _axios('post', '/users')
    }
}
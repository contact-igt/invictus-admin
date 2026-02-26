import { _axios } from 'helper/axios';

export interface UserPayload {
    title?: string;
    username: string;
    email: string;
    country_code?: string;
    mobile?: string;
    password?: string;
    role: 'super-admin' | 'admin' | 'client';
    client_key?: string;
}

export class ManagementApiData {
    createUser = async (data: UserPayload) => {
        return await _axios('post', '/management', data);
    };

    getAllManagements = async () => {
        return await _axios('get', '/managements');
    };

    getManagementById = async (id: number | string) => {
        return await _axios('get', `/management/${id}`);
    };

    updateManagement = async (id: number | string, data: Partial<UserPayload>) => {
        return await _axios('put', `/management/${id}`, data);
    };

    deleteManagement = async (id: number | string) => {
        return await _axios('delete', `/management/${id}`);
    };
}

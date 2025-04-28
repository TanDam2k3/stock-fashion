import axios from "axios";
import { API_END_POINT } from "../config";
import Cookies from 'js-cookie';
import { ICreateUser, ISearchUser } from "../interfaces";
import { IStockImport } from "../interfaces/stock";


class ImportProductService {
    public async create(payload: IStockImport) {
        try {
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.post(
                `${API_END_POINT}/api/stocks/import`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to create import transaction:", error);
            throw error;
        }
    }

    public async getList(filters: ISearchUser) {
        try {
            const payload = {
                ...(filters?.name && { name: filters.name }),
                ...(filters?.status && { status: filters.status })
            }
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.get(
                `${API_END_POINT}/api/admin/list`,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                    params: payload
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to create product:", error);
            throw error;
        }
    }

    public async update(payload: ICreateUser) {
        try {
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.post(
                `${API_END_POINT}/api/admin/update`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Admin update user fail:", error);
            throw error;
        }
    }

    public async delete(id: string) {
        try {
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.delete(`${API_END_POINT}/api/admin/deleted`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                data: { _id: id },
            });
            return response.data;
        } catch (error) {
            console.error('Delete user from admin error:', error);
            return { success: false };
        }
    };
}

export const importProductService = new ImportProductService();
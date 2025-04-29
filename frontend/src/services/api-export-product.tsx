import axios from "axios";
import { API_END_POINT } from "../config";
import Cookies from 'js-cookie';
import { ISearchTransaction } from "../interfaces";
import { IStockExport } from "../interfaces/stock";


class ExportProductService {
    public async create(payload: IStockExport) {
        try {
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.post(
                `${API_END_POINT}/api/stocks/export`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Failed to create export transaction:", error);
            throw error;
        }
    }

    public async getList(filters: ISearchTransaction) {
        try {
            const payload = {
                ...(filters?.userId && { userId: filters.userId }),
                ...(filters?.type && { type: filters.type }),
                ...(filters?.status && { status: filters.status }),
                ...(filters?.fromDate && { fromDate: filters.fromDate }),
                ...(filters?.toDate && { toDate: filters.toDate })
            }
            const TOKEN = Cookies.get('token') || null;

            const response = await axios.get(
                `${API_END_POINT}/api/stocks/list`,
                {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`
                    },
                    params: payload
                }
            );
            return response.data;
        } catch (error) {
            console.error("Get list export fail:", error);
            throw error;
        }
    }

}

export const exportProductService = new ExportProductService();
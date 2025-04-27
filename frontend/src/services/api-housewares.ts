// src/api/stock.ts
import axios from 'axios';
import { API_END_POINT } from '../config';
import Cookies from 'js-cookie';
import { Houseware } from '../interfaces';

interface StockPayload {
  name?: string;
  city?: string;
  address?: string;
  status?: string;
}

const TOKEN = Cookies.get('token') || null;

class HousewareService {
  public async create(payload: StockPayload) {
    try {
      const response = await axios.post(
        `${API_END_POINT}/api/houseware/create`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create stock:', error);
      throw error;
    }
  };

  public async getListHouseware(payload: StockPayload) {
    try {
      const response = await axios.get(
        `${API_END_POINT}/api/houseware/list`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: payload
        }
      );

      const data: Houseware[] = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      return data;
    } catch (error) {
      console.error('Get list houseware error:', error);
      throw error;
    }
  };


  public async update(payload: Houseware) {
    try {
      const response = await axios.put(`${API_END_POINT}/api/houseware/update`,
        { payload },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Update stock error:', error);
      return { success: false };
    }
  };

  public async delete(id: string) {
    try {
      const response = await axios.delete(`${API_END_POINT}/api/houseware/delete`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        data: { _id: id },
      });
      return response.data;
    } catch (error) {
      console.log('error', error)
      return { success: false };
    }
  };
}

export const housewareService = new HousewareService();


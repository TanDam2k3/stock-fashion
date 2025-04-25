// src/api/stock.ts
import axios from 'axios';
import { API_END_POINT, TOKEN } from '../config';

interface Stock {
    _id: string; 
    name: string;
    city: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    status: string; 
  }
  export interface StockPayload {
    name: string;
    city: string;
    address: string;
  }
  
  export const createStock = async (payload: StockPayload) => {
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
  
  export const fetchStockList = async () => {
    const response = await axios.get(`${API_END_POINT}/api/houseware/list`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  
    const data: Stock[] = Array.isArray(response.data)
      ? response.data
      : response.data.data;

    return data.filter((item: Stock) => item.status === 'active'); 
  };
  
  export const updateStock = async (payload: any) => {
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
  export const deleteStock = async (id: string) => {
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
      return { success: false };
    }
  };
  
  
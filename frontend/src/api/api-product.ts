import axios from "axios";
import { API_END_POINT } from '../config';
import Cookies from 'js-cookie';


const TOKEN = Cookies.get('token') || null;

export interface ProductPayload {
  housewareId: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  fileId?: string;
  status?: string;
}

export const createProduct = async (payload: ProductPayload) => {
  try {
    const response = await axios.post(
      `${API_END_POINT}/api/products/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw error;
  }
};

// src/api/api-files.ts
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file); // field name phải đúng là 'file'

  try {
    const response = await axios.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // trả ra { message, file }
  } catch (error: any) {
    console.error('Upload file error:', error);
    throw error; // để component bắt lỗi nếu cần
  }
};
export const getListProducts = async (filters?: any) => {
  try {
    const response = await axios.get(`${API_END_POINT}/api/products/list`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: filters || {}, // nếu có filters thì truyền
    });
    return response.data.products;
  } catch (error) {
    console.error('Failed to fetch products', error);
    throw error;
  }
};



export const updateProduct = async (payload: any) => {
  try {
    const response = await axios.put(`${API_END_POINT}/api/products/update`,
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
// Hàm xóa sản phẩm

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_END_POINT}/api/products/delete`, {
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
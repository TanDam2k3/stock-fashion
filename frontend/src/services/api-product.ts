import axios from "axios";
import { API_END_POINT } from '../config';
import Cookies from 'js-cookie';
import { ProductPayload, ProductSearchPayload } from "../interfaces";


class ProductService {
  public async create(payload: ProductPayload) {
    try {
      const TOKEN = Cookies.get('token') || null;

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

  public async uploadImage(file: File) {
    try {
      const TOKEN = Cookies.get('token') || null;

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${API_END_POINT}/api/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${TOKEN}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Upload file error:', error);
      throw error;
    }
  };


  public async getList(filters?: ProductSearchPayload) {
    const TOKEN = Cookies.get('token') || null;

    const payload = {
      ...(filters?.name && { name: filters.name }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.createdAt && { createdAt: filters.createdAt }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.userId && { userId: filters.userId })
    }
    try {
      const response = await axios.get(`${API_END_POINT}/api/products/list`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: payload
      });
      return response.data.products;
    } catch (error) {
      console.error('Failed to fetch products', error);
      throw error;
    }
  };



  public async update(payload: ProductPayload) {
    try {
      const TOKEN = Cookies.get('token') || null;

      const response = await axios.put(`${API_END_POINT}/api/products/update`,
        payload,
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

  public async delete(id: string) {
    try {
      const TOKEN = Cookies.get('token') || null;

      const response = await axios.delete(`${API_END_POINT}/api/products/delete`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        data: { _id: id },
      });
      return response.data;
    } catch (error) {
      console.error('Delete stock error:', error);
      return { success: false };
    }
  };
}

export const productService = new ProductService();
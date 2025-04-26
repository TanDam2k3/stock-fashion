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

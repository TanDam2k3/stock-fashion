import axios from 'axios';

const API_BASE_URL = '/api/products';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Product {
  _id?: string;
  name: string;
  type: string;
  quantity: number;
  price?: number;
  housewareId?: string;
  fileId?: string;
  status?: string;
}

export const createProduct = async (data: Product) => {
  const res = await axiosInstance.post('/create', data);
  return res.data;
};

export const getProductList = async (query?: Record<string, any>) => {
  const res = await axiosInstance.get('/list', { params: query });
  return res.data;
};

export const updateProduct = async (data: Product) => {
  const res = await axiosInstance.put('/update', data);
  return res.data;
};

export const deleteProduct = async (data: { _id: string }) => {
  const res = await axiosInstance.delete('/delete', { data });
  return res.data;
};

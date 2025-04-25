import Cookies from 'js-cookie';

export const API_END_POINT = import.meta.env.VITE_API_URL;
export const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY;
export const TOKEN =  Cookies.get('token') || null
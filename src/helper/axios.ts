/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { store } from '../redux/store';
import type { RootState } from '../redux/store';
import { clearAuthData } from 'redux/slices/auth/authSlice';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const _axios = async (
  method?: string,
  url?: string,
  body?: any,
  contentType: string = 'application/json',
  params?: any,
) => {
  const APIURL =
    import.meta.env.VITE_SERVER_PORT === 'production'
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_SERVER_PORT === 'development'
        ? import.meta.env.VITE_DEVELOPMENT_API_URL
        : import.meta.env.VITE_LOCALHOST_API_URL;

  const endpoint = `${APIURL}${url}`;
  const state: RootState = store.getState();
  const token = state.auth.token;

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        console.warn('Token is expired');
        store.dispatch(clearAuthData());
        throw new Error('Token expired');
      }
    } catch (e) {
      console.error('Invalid token:', e);
      store.dispatch(clearAuthData());
      throw e;
    }
  }

  const isFormData = body instanceof FormData;

  try {
    const res = await axios({
      headers: {
        ...(isFormData ? {} : { 'Content-Type': contentType }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'ngrok-skip-browser-warning': 'true',
        'User-Agent': 'Custom',
      },
      method: method,
      url: endpoint,
      data: body,
      params: params,
    });
    return res.data;
  } catch (err) {
    console.error('Axios error:', err);
    throw err;
  }
};

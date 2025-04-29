/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { store } from "../redux/store";          // adjust path to your store
import type { RootState } from "../redux/store";

export const _axios = async (
  method?: string,
  url?: string,
  body?: any,
  params?: any
) => {
  const endpoint = `https://petpass.onrender.com/api/v1${url}`;
  const state: RootState = store.getState();
  const token = state.auth.token;


  try {
    const res = await axios({
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
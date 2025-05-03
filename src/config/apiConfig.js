/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  define: {
    'process.env': process.env,
  },
});

export const ApiEnvironmentConfig = {
    baseUrl: import.meta.env.PETPASS_DOMAIN_URL
}

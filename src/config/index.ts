import dotenv from 'dotenv';
dotenv.config();

type ConfigType = {
  API_PORT: number;
  DB_URL: string;
  DB_SYNC: boolean;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  ADMIN_EMAIL: string;
  ADMIN_PHONE: string;
  TOKEN: {
    ACCESS_KEY: string;
    ACCESS_TIME: string;
    REFRESH_KEY: string;
    REFRESH_TIME: string;
  };
  FILE_PATH: string;
  BASE_URL: string;
};

export const config: ConfigType = {
  API_PORT: Number(process.env.API_PORT),
  DB_URL:
    String(process.env.NODE_ENV) === 'dev'
      ? String(process.env.DEV_DB_URL)
      : String(process.env.PROD_DB_URL),
  DB_SYNC: String(process.env.NODE_ENV) === 'dev' ? true : false,
  ADMIN_USERNAME: String(process.env.ADMIN_USERNAME),
  ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
  ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
  ADMIN_PHONE: String(process.env.ADMIN_PHONE),
  TOKEN: {
    ACCESS_KEY: String(process.env.ACCESS_TOKEN_KEY),
    ACCESS_TIME: String(process.env.ACCESS_TOKEN_TIME),
    REFRESH_KEY: String(process.env.REFRESH_TOKEN_KEY),
    REFRESH_TIME: String(process.env.REFRESH_TOKEN_TIME),
  },
  FILE_PATH: String(process.env.FILE_PATH),
  BASE_URL: String(process.env.BASE_URL),
};

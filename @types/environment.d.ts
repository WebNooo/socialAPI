import { boolean } from "@hapi/joi";

declare global{
  namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT: number,
        JWT_SECRET:string,
        DB_CONNECT:string,

        SMTP_USER:string,
        SMTP_PASSWORD:string,
        SMTP_HOST:string,
        SMTP_PORT:number,
        SMTP_AUTHOR:string,
      }
    }
  }

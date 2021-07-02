export const environment: string = process.env.ENVIRONMENT || 'dev';

export const REDIS_CONFIG = {
    host: process.env.REDIS_HOST || "192.168.99.100",
    port: parseInt(process.env.REDIS_PORT!) || 31113,
    db: parseInt(process.env.REDIS_DB!) || 0,
    redisReconnect: parseInt(process.env.REDIS_RECONNECT!) || 5000
}
export const AUTH_PERMISSION = process.env.AUTH_PERMISSION! ||'';

export const REDIS_KEY_SUFFIX:string = "LAMBDA_REDIS_SUFFIX";
export const REDIS_DEFAULT_TTL:number = 3600;
export const REDIS_TTL_SECONDS: string = "EX";

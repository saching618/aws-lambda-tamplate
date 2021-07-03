import redis from "redis";
import { REDIS_CONFIG, REDIS_TTL_SECONDS } from "../constant";
const { promisify } = require("util");
export let isRedisConnected: boolean = false;

export class RedisClient  {
  private static redisClient: any;
  private static redisHost: any = REDIS_CONFIG.host;
  private static redisDb: number = REDIS_CONFIG.db;
  private static redisPort: number = REDIS_CONFIG.port;

  public static async init(requestId: string) {
    try {
      if (!isRedisConnected) {
        RedisClient.redisClient = await redis.createClient({
          host: this.redisHost,
          port: this.redisPort,
          db: this.redisDb
        });

        RedisClient.redisClient.on("connect", async () => {
          console.log(requestId, "Redis connected");
          isRedisConnected = true;
          return true;
        });

        RedisClient.redisClient.on("error", (error: any) => {
            return false;
            console.log(requestId, `Redis client error : ${error}`);
            RedisClient.disconnect(requestId);
  
            console.log(requestId, "Retrying redis connection");
            setTimeout(() => {
              RedisClient.init(requestId);
            }, REDIS_CONFIG.redisReconnect);
          });
      }
    } catch (error) {
      console.log(
        requestId,
        `failed to init redis client with host : ${this.redisHost}`,
        error
      );
    return false
    }
  }

  public static async disconnect(requestId:string) {
    if (isRedisConnected) {
      RedisClient.redisClient.end(true);
      isRedisConnected = false;
      return true;
    }
    console.log(requestId, "Redis Disconnect");
    return false;
  }

  async getValue(requestId: string, key:string) {
    const getAsync = promisify(RedisClient.redisClient.get).bind(
      RedisClient.redisClient
    );
    const value = await getAsync(key)
      .then((response: string) => {
        console.log(
          requestId,
          `redis key : ${key} returned value : ${response} `
        );
        return response;
      })
      .catch((err: any) => {
        console.log(
          requestId,
          `failed to get value for key: ${key}`,
          err
        );
        return false;
      });
    return value;
  }

  async setValueWithTimeout(
    requestId:string,
    key: string,
    value: string,
    ttl: number
  ) {
    const setAsync = promisify(RedisClient.redisClient.set).bind(
      RedisClient.redisClient
    );
    const setResponse = await setAsync(key, value, REDIS_TTL_SECONDS, ttl)
      .then((response: string) => {
        console.log(
            requestId,
          `redis key : ${key} set to value : ${value} `,
          response
        );
        return true;
      })
      .catch((err: any) => {
        console.log(
          requestId,
          `failed to set value for key: ${key}`,
          err
        );
        return false;
      });
    return setResponse;
  }

  async deleteKey(requestId: string, key:string) {
    const delAsync = promisify(RedisClient.redisClient.del).bind(
      RedisClient.redisClient
    );
    const setResponse = await delAsync(key)
      .then((response: string) => {
        console.log(
          requestId,
          `redis key : ${key} delete succesfully : ${response} `
        );
        return response;
      })
      .catch((err: any) => {
        console.log(
          requestId,
          `failed to delete  key: ${key}`,
          err
        );
        return false;
      });
    return setResponse;
  }

}

export const initRedis = async (requestId: string) => {
    try {
        return (await RedisClient.init(requestId));
    } catch (error) {
        console.log(error);
        return false;
    }
  
};

export const closeRedis = async (requestId: any) => {
    try {
        return (await RedisClient.disconnect(requestId));
    } catch (error) {
        console.log(error);
        return false;
    }
  
};

import * as redis from 'redis';

const client = redis.createClient();

client.connect();

export const redisBookbyTitle = (key) => {
    const cachevalue = client.get(key);
    return cachevalue;
};

export const setData = (key,redisData) => {
    client.set(key,redisData);
};

export const clearCache = (key) => {
    client.del(key);
};

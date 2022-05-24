import Redis from 'ioredis';

class Cache {

    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT || 6379,
            keyPreFix: "cache:"
        })
    }

    async get(key) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }

    set(key, value, timeExpiration) {
        return this.redis.set(key, JSON.stringify(value), timeExpiration);
    }

    del(key) {
        return this.redis.del(key);
    }


    async delPreFix(prefix) { // aqui ele deleta pelos prefixos
        const keys =  (await this.redis.keys(`cache:${prefix}:*`)).map(key => 
            key.replace("cache: ", ""));
      
        return this.redis.del(keys); // cache:id:* 

    }

}

export default new Cache();
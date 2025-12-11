import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());
console.log("REDIS_URL:", process.env.REDIS_URL);

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,     
    eventBus: "redis",    
    cacheService: "redis",
    jwtSecret: process.env.JWT_SECRET || "supersecret",
    cookieSecret: process.env.COOKIE_SECRET || "supersecretcookie",

    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
      host: "0.0.0.0",
    },

    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
    },

    
  },

  plugins: [],
});

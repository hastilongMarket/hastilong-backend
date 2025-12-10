import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const plugins = [
  // CRITICAL FIX: Explicitly configure the Admin plugin
  {
    resolve: `@medusajs/admin`,
    options: {
      autoRebuild: false, // Prevents admin from trying to rebuild at start time (already built in Build Command)
      serve: true,
      // This path tells the running server where to find the index.html created by the build command.
      // In a V2 monorepo structure, the compiled Admin files usually land in a folder named 'admin'
      // or similar in the root.
      path: process.env.ADMIN_BUILD_PATH || "admin", 
    },
  },
]

// CHANGE THIS LINE: module.exports = defineConfig({
export default defineConfig({ // TO THIS LINE
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins,
})
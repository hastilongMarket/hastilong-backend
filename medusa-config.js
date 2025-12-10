import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const plugins = [
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
    },
  },
]

// Define a safe fallback string that satisfies the TypeScript requirement.
// We use a safe local URL as a default, but rely entirely on the Render environment variable.
const SAFE_CORS_FALLBACK = "http://localhost:8000"; 

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      // FIX: Use the fallback to ensure the value is a string, preventing the TypeScript error.
      storeCors: process.env.STORE_CORS || SAFE_CORS_FALLBACK, 
      
      // We must also apply this fix to adminCors and authCors if the interface demands a string
      // and those variables are also potentially undefined.
      adminCors: process.env.ADMIN_CORS || SAFE_CORS_FALLBACK,
      authCors: process.env.AUTH_CORS || SAFE_CORS_FALLBACK,
      
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  plugins,
})
import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// --- INSERT PLUGIN CONFIGURATION HERE ---
const plugins = [
  {
    // Use the officially supported name
    resolve: `medusa-payment-stripe`,
    options: {
      // Medusa will look for STRIPE_API_KEY in your .env file
      api_key: process.env.STRIPE_API_KEY,
    },
  },
  // You can add other plugins here if needed
]
// --------------------------------------------------

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  // --- ADD the plugins ARRAY to defineConfig ---
  plugins,
  // ---------------------------------------------
})
import 'dotenv/config'

const validateEnv = (envVars) => {
  for (const [key, value] of Object.entries(envVars)) {
    if (!process.env[value]) {
      throw new Error(`О-па, переменная проебалась: ${key}`)
    }
  }
}

validateEnv({
  DB_URL: 'DB_URL',
  JWT_SECRET: 'JWT_SECRET',
})

export const config = {
  port: process.env.PORT || 4444,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '90d',
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
}

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
  JWT_ACCESS_SECRET: 'JWT_ACCESS_SECRET',
  JWT_REFRESH_SECRET: 'JWT_REFRESH_SECRET',
})

export const config = {
  port: process.env.PORT || 4445,
  db: {
    url: process.env.DB_URL,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
  },
}

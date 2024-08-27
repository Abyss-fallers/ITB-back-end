import mongoose from 'mongoose'
import { config } from '../config/index.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to DB')
  } catch (err) {
    console.error('DB connection error:', err)
    process.exit(1)
  }
}

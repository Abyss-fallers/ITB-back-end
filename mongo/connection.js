import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

export default mongoose

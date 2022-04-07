import mongoose from 'mongoose'
import dotenv from "dotenv"
import colors from 'colors'

dotenv.config()
const url = "mongodb+srv://mahesh123:abc123456789@naturebasket.wlni9.mongodb.net/naturebasket?retryWrites=true&w=majority"
const connectDB = async () => {
 try {
   const conn = await mongoose.connect(url, {
       useUnifiedTopology: true,
       useNewUrlParser: true,
       // useCreateIndex: true,
   })

   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
 } catch (error) {
   console.error(`Error: ${error.message}`.red.underline.bold)
   process.exit(1)
 }
}

export default connectDB
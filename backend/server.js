import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import fsr from 'file-stream-rotator'
import FileStreamRotator from 'file-stream-rotator'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()

connectDB()

const app = express()


morgan.token("wbdaccess", "User trying to access the :url");
  let logsinfo = fsr.getStream({filename:"test.log", verbose: true});
  app.use(morgan('combined', {stream: logsinfo}))
const swaggerDocument = YAML.load('./backend/swagger.yaml')
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use("/api-docs",  swaggerUi.serve,swaggerUi.setup(swaggerDocument))
// app.use('/api/upload', uploadRoutes)

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/ecommerce/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'ecommerce', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
import express from 'express'
import dotenv from 'dotenv'
import studentRoute from './routes/student.route.js'
import authRoute from './routes/auth.route.js'
import connection from './models/connection.js'
import loggingMiddleware from './middlewares/loggingMiddleware.js'
import errorHandler from './middlewares/errorHandler.js'
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(loggingMiddleware)
app.get('/', (req, res) => res.json({msg: "Hello Sanber"}))
app.use('/student', studentRoute)
app.use('/auth', authRoute)
app.use(errorHandler)


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server running on port http://localhost:${PORT}`)
})

// connection.getConnection((err) => {
//     if(err){
//         console.log('Error connecting to mysql :', err)
//         server.close()
//     } else {
//         console.log('Connected to mysql successfully')
//     }
// })
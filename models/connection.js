import mysql from 'mysql'
import dbConfig from '../configs/db.config.js'

const connection = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: dbConfig.PORT,
    connectTimeout: 20000,
    waitForConnections: true,
    queueLimit: 0
})

export default connection
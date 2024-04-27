import mongoose from 'mongoose'
import { ENVIRONMENT } from './environment.js'

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(ENVIRONMENT.DB.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDB Connected: ' + conn.connection.host)
    } catch (error) {
        console.log('Error: ' + error)
        process.exit(1)
    }
}

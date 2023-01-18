const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

dotenv.config({ path: './config/config.env' })
// uncaugth exeption
process.on('uncaughtException', err => {
    console.log(`Error:== ${err.message}`);
})

// database connection
connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`);
})


// unhandle server err
process.on("unhandledRejection", err => {
    console.log(`Error :==${err.message}`);
    console.log('Shuting doen the server due to unhandle promis rejection');

    server.close(() => {
        process.exit()
    })
})
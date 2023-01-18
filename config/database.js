const mongoose = require('mongoose')
const connectDB = () => {
    mongoose.connect(process.env.DB_url, { useNewUrlParser: true }).then((data) => {
        console.log(`mongodb connected with server : ${data.connection.host}`);
    })
    // .catch((err) => {
    //     console.log(`Error:${err}`);
    // })
}


module.exports = connectDB
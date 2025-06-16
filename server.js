const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at PORT ${process.env.PORT}!`);
    })
})
.catch((err) => {
    console.log('DB connection error:', err);
})
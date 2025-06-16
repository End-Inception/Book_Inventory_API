const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, 'Name is required'],
    },
    price: {
        type: Number,
        required: [ true, 'Price is required'],
    },
})

const Product = mongoose.model('Product', UserSchema);

module.exports = Product;
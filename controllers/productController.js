const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        
        res.status(200).json(products);
    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error! '});
    }
}

const postProducts = async (req, res) => {
    try{
        const { name, price } = req.body;
        if(!name || !price) {
            return res.status(401).json({ message: 'All fields are required! '});
        }

        const newProduct = new Product({
            name,
            price,
        });

        await newProduct.save();

        res.status(201).json({ message: 'New item added successfully! '});

    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error! '});
    }
}

const updateProduct =  async (req, res) => {
    try{
        const itemId = req.params.id;

        const { name, price } = req.body;

        if(!itemId) {
            return res.status(409).json({ message: `Item with the id ${itemId} not found`});
        }

        const UpdatedProd = await Product.findByIdAndUpdate(
            itemId,
            { name, price },
            { new: true, runValidators: true } 
        );
        
        if(!UpdatedProd) {
            return res.status(404).json({ message: `Product with the id ${itemId} is not found! `});
        }
        res.status(200).json(UpdatedProd);

    }catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error '});
    }

}

const delProduct = async (req, res) => {
    try{
        const itemId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete( itemId );

        if(!deletedProduct){
            return res.status(404).json({ message: `Product with the id ${itemId} was not found!`});
        }

        res.status(200).json({ message: 'Product successfully deleted!', product: deletedProduct });
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
}

module.exports = {
    getProducts,
    postProducts,
    updateProduct,
    delProduct,
}
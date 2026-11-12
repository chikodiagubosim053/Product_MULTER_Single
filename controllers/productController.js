const { Product } = require('../models');
const fs = require('fs')

 exports.addProduct = async (req, res) => {
    try {
        const { productName, price, stock } = req.body;


        // console.log('Body ', req.body);
        // console.log('File ', req.file);
        const file = req.file.path;

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        })
        res.status(201).json({
            message: 'Product Added Successfully',
            data: product
        })
        
} catch (error) {
res.status(500).json({
    message: error.message
     })
}

};

exports.getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.findAll()
        res.status(200).json({
            message: `All Product retrieved successfully and the lenght is ${allProduct.lenght}`,
            data: allProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await Product.findByPk(id)

        if (!oneProduct) {
            return res.status(404).json({
                message: 'One Product not Found'
            })
        };

        res.status(200).json({
            message: 'One product retrieved successfully',
            data: oneProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
       const { id } = req.params;
       const { productName, stock, price } = req.body;
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: 'One Product not Found'
            })
        };

        const data = {
            price,
            productName,
            stock
        }

        // When The Request sees a file that is only when it should try to change the file.
        if (req.file) {
            const oldFilePath = product.productImage
            fs.unlinkSync(oldFilePath)
            data.productImage = req.file.path
        }

        await product.update(data)
        res.status(200).json({
            message: "Product Updated Successfully",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const deletedProduct = await Product.destroy({ where: { id }})
        res.status(200).json({
            message: 'User deleted successfully',
            data: deletedProduct
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

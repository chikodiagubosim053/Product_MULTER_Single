require('dotenv').config();
const express = require('express');
const productRouter = require('./router/productRouter');
// const multer = require('./middlewares/multer');

const PORT = process.env.PORT;
const sequelize = require('./database/database');

const app = express();
app.use(express.json());
app.use(productRouter);
// app.use(multer.single('productImage'));

const DBConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Failed to connect to Database:', error.message)
    }
}

DBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
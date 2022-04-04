const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const adminRouter = require('./src/routes/adminRoutes')
const clientRouter = require('./src/routes/clientRouter')
const path = require('path')

require('dotenv').config()

console.log(process.env)

// intializations
const app = express();
require('./src/connection');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('image'));

// Global variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
});

// routes
app.use(adminRouter);
app.use(clientRouter);

// start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});

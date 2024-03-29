const express = require('express');
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const adminRouter = require('./src/routes/adminRoutes')
const clientRouter = require('./src/routes/clientRouter')
const authRoter = require('./src/routes/auth')
const path = require('path')
const cors = require('cors')

require('dotenv').config({
    path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.off'
})

// intializations
const app = express();
require('./src/connection');

app.use(cors({
    origin: '*'
}))
app.use(json( { extended: true } ))
app.use(urlencoded( { extended: true } ))

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, process.env.NODE_ENV === 'development' ? 'images' : '/../client/public/img/uploads'),
    filename: async (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('file'));

// Global variables
app.use((req, res, next) => {
    next();
});

// routes
app.use(adminRouter);
app.use(clientRouter);
app.use(authRoter);

// start
app.listen(8180, () => {
    console.log(`Server on port ${app.get('port')}`);
});

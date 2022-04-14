const express = require('express');
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const adminRouter = require('./src/routes/adminRoutes')
const clientRouter = require('./src/routes/clientRouter')
const path = require('path')
const cors = require('cors')

require('dotenv').config()


// intializations
const app = express();
require('./src/connection');

app.use(json( { extended: true } ))
app.use(urlencoded( { extended: true } ))

app.use(cors())

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '/../client/public/img/uploads'),
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

// start
app.listen(8180, () => {
    console.log(`Server on port ${app.get('port')}`);
});

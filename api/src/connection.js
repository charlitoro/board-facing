const mongoose = require('mongoose');

const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PWD } = process.env

const MONGO_URL = process.env.NODE_ENV === 'development' ? `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin` : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`

mongoose.connect( MONGO_URL, {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));

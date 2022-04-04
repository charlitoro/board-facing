const mongoose = require('mongoose');

const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PWD } = process.env

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));
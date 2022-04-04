const { Schema, model } = require('mongoose')

const resourceSchema = new Schema({
    name: { type: String },
    filename: {type: String},
    description: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    expirationDate: { text: Date },
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true }
}, { timestamps: true });


const boardSchema = new Schema({
    name: {type: String},
    description: {type: String},
}, { timestamps: true });


const Resource = model('Resource', resourceSchema);
const Board = model('Board', boardSchema)

module.exports = { Resource, Board }
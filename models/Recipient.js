const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose
// the line above is needed because mongoose kills the mongo ability of infinite number of difrent atributes for difrent instance


const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
}); 

module.exports = recipientSchema; 
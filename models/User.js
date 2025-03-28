const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose
// the line above is needed because mongoose kills the mongo ability of infinite number of difrent atributes for difrent instance

const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
}); 

mongoose.model('users', userSchema); 


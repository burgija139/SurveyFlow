const mongoose = require('mongoose');
const Schema = mongoose.Schema; // const { Schema } = mongoose
// the line above is needed because mongoose kills the mongo ability of infinite number of difrent atributes for difrent instance
const recipientSchema = require('./Recipient');


const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // this is a reference to a user
    dateSent: Date,
    lastResponded: Date
}); 


mongoose.model('surveys', surveySchema);
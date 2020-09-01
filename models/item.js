const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    shop: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
});

module.exports = mongoose.model("Item", itemSchema);
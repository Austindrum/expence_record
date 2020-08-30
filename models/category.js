const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
    // name_en: {
    //     type: String,
    //     required: true
    // },
    // icon: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model("Category", categorySchema);
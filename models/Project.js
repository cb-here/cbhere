const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    typeOfProject: {
        type: String,
        required: true
    },
    projectImage: {
        type: String
    }
})

module.exports = mongoose.model("Project", projectSchema);
const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    pulEntregada: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Register', registerSchema)
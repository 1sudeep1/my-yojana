const mongoose = require('mongoose')
const { Schema } = mongoose

//define the shape of the user documents in the collection
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    fullName: String, //String is shorthand of type:String
    password: String,
    organization: String,
    role: { 
        type: String, 
        enum:['Project Manager', 'Developer', 'Designer', 'Staff', 'Software Engineer'],
        default:'Staff'
    }
})

const User= mongoose.model('User', userSchema)

module.exports= User
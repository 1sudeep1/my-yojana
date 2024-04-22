const mongoose = require('mongoose')
const { Schema } = mongoose

//define the shape of the user documents in the collection
const projectSchema = new Schema({
    projectName: {
        type: String,
        unique: true,
        required: true
    },
    projectDescription: String, //String is shorthand of type:String
    projectLead:String,
    members: Array,
    projectType:String,
    organization:String,
    projectKey:String
})

const Project= mongoose.model('Project', projectSchema)

module.exports= Project
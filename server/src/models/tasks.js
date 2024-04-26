const mongoose = require('mongoose')
const { Schema } = mongoose

//define the shape of the user documents in the collection
const tasksSchema = new Schema({
    projectName:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }],
    issueType: { 
        type: String, 
        enum:['Feature', 'Bug'],
        default:'Feature',
    },
    summary:String,
    description:String,
    assignee:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    sprint:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sprint"
    }],
    reporter:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
})

const Task= mongoose.model('Task', tasksSchema)

module.exports= Task
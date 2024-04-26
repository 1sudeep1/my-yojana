const mongoose = require('mongoose')
const { Schema } = mongoose

//define the shape of the user documents in the collection
const sprintSchema = new Schema({
    sprintName: {
        type: String,
        unique: true,
        required: true
    },
    isStarted: {type:Boolean, default:false}, //String is shorthand of type:String
    startDate:Date,
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }],
    endDate:Date,
}, {
    timestamps:true
})

const Sprint= mongoose.model('Sprint', sprintSchema)

module.exports= Sprint
const mongoose= require('mongoose')

const connect= async()=>{
    try{
        const res= await mongoose.connect('mongodb://127.0.0.1:27017/yojana-DB');
        if(res){
            console.log("connected to mongodb database")
        }else{
            console.log('connection failed')
        }
    }catch(err){
        console.log(err)
    }
}

module.exports= connect
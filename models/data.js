const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const dataSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },
    departuredate:{
        type:String,
        required:true
    },
    returndate:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        enum:['National Museum','Victorial Museum','Indian Museum','Government Museum','Calio Museum','Sikkim Museum','Dr Bhau Jii','Salar Museum'],
        required:true
    },
    package:{
        type:String,
        enum:['bronze','silver','gold','platinum'],
        required:true
    },
    resid: {
        type: String,
        required: true
    }   
});
const Data=mongoose.model('registereduser',dataSchema);
module.exports=Data
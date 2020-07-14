const mongoose=require('mongoose')
const validator=require('validator')

mongoose.connect("mongodb://127.0.0.1:27017/tm2",{useNewUrlParser:true,useCreateIndex:true})

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Age must be positive.")
            }
        }
    }
})


const me=new User({
    name:"rohit",
    email:"aman@gmail.com",
    age:13,
    default:0
})



me.save().then(function(result){
    console.log(result)
}).catch(function(error){
    console.log(error)
})
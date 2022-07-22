const {Schema,model}=require('mongoose');

const passportLocalMongoose= require('passport-local-mongoose')

const UserSchema=Schema({
    username:{
        type:String,
       
    },
    password:{
        type:String,
        
    },
})

UserSchema.plugin(passportLocalMongoose)

module.exports=model('User',UserSchema)
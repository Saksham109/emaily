

const mongoose=require('mongoose');

const { Schema }=mongoose;  // same as const Schema= mongoose.Schema


const userSchema=new Schema({
    googleID: String
});

mongoose.model('users',userSchema); //here 2 arguments in model tells that we want to create users in mongoDb
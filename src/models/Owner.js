const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true , "Enter name"]
   },
   todos:[],
   createdAt:{
    type:Date,
    default:new Date(Date.now())
   }
})

module.exports = mongoose.model('Owner', ownerSchema)


const mongoose = require('mongoose') ;
const appSchema = mongoose.Schema ;

const membersSchema = new appSchema({
    fullname: String ,
    email : String ,
    city : String
})

module.exports = mongoose.model('members',membersSchema)
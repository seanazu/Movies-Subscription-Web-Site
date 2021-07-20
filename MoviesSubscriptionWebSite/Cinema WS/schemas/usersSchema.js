


const mongoose = require('mongoose') ;
const appSchema = mongoose.Schema ;

const usersSchema = new appSchema({
    username : String ,
    password: String
})


module.exports = mongoose.model('users', usersSchema)
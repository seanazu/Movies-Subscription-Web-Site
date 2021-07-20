


const mongoose = require('mongoose') ;
const appSchema = mongoose.Schema ;

const moviesSchema = new appSchema({
    name: String ,
    genre : String ,
    image : String,
    premiered: String 
})

module.exports = mongoose.model('movies',moviesSchema)

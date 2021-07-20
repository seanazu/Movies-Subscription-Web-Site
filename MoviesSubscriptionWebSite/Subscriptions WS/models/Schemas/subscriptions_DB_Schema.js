

const mongoose = require('mongoose') ;
const appSchema = mongoose.Schema ;


const subscriptionsSchema = new appSchema({
    _id: String ,
    movies :[
        {
            _id : false,
            movieId: String ,
            date: String
        }
    ] 
    
})


module.exports = mongoose.model('subscriptions',subscriptionsSchema)

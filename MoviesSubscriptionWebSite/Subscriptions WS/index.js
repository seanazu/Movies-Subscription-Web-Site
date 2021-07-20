

const express = require('express') ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const app = express()
const MembersController = require('./controllers/membersController');
const MoviesController = require('./controllers/moviesController') ;
const SubscriptionController = require('./controllers/subscriptionsController') ;



require('./configs/database')

app.use(cors()) ;
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json()) ;
app.use('/members',MembersController) ;
app.use('/movies',MoviesController) ;
app.use('/subscribers',SubscriptionController) ;




app.listen(3000,()=>{
    console.log("The Server Is Up")
})


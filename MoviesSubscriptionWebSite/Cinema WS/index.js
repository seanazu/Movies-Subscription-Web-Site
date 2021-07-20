const express = require('express') ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const app = express()


const userDataBaseController = require('./controllers/usersDataBaseController')
const membersController = require('./controllers/membersController')
const moviesController = require('./controllers/moviesController')
const subscriptionsController = require('./controllers/subscriptionsController')
const permissionController = require('./controllers/permissionController')
const userJsonController = require('./controllers/userJsonController')

require('./configs/database')

app.use(cors()) ;
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json()) ;
app.use('/user-DB',userDataBaseController) ;
app.use('/members',membersController)
app.use('/movies',moviesController)
app.use('/subscribers',subscriptionsController)
app.use('/permissions',permissionController)
app.use('/user-json',userJsonController)




app.listen(3001,()=>{
    console.log("The Server Is Up")
})

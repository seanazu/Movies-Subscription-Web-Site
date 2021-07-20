
const express = require('express')
const Router = express.Router() ;
const userBL = require('../models/usersDataBaseBL') ;

Router.route('/').get(async (req,resp) =>{
    let users = await userBL.getAllUsers() ;
    return resp.json(users)
})

Router.route('/:id').get(async (req,resp) =>{
    let id = req.params.id ;
    let user = await userBL.getUserById(id) ;
    return resp.json(user) 
})

Router.route('/').post(async (req,resp) =>{
    let obj = req.body 
    let response = await userBL.createNewUser(obj) 
    return resp.json(response)
})

Router.route('/:id').put(async (req,resp) =>{
    let id = req.params.id 
    let obj = req.body 
    let response = await userBL.updateUser(id,obj) ;
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    let id = req.params.id 
    let response = await userBL.deleteUser(id) 
    return resp.json(response)
})

module.exports = Router 




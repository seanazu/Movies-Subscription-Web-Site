const express = require('express')
const Router = express.Router() ;
const permissionsBL = require('../models/permissionsBL')



Router.route('/').get(async (req,resp) =>{
    let permissions = await permissionsBL.getAllPermissions() ;
    return resp.json(permissions)
}) 

Router.route('/:id').get(async(req,resp) =>{
    let id = req.params.id
    let permission = await permissionsBL.getPermissionsById(id)
    return resp.json(permission)
})

Router.route('/').post(async (req,resp) =>{
    let obj = req.body
    let response = await permissionsBL.createPermission(obj) ;
    return resp.json(response)
})

Router.route('/:id').put(async(req,resp) =>{
    let id = req.params.id
    let obj = req.body
    let response = await permissionsBL.updatePermission(id,obj)
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    let id = req.params.id 
    let response = await permissionsBL.deletePermission(id) 
    return resp.json(response)
})

module.exports = Router

const express = require('express')
const Router = express.Router() ;
const permissionsBL = require('../models/permissionsBL')



Router.route('/').get(async (req,resp) =>{
    const permissions = await permissionsBL.getAllPermissions() ;
    return resp.json(permissions)
}) 

Router.route('/:id').get(async(req,resp) =>{
    const id = req.params.id
    const permission = await permissionsBL.getPermissionsById(id)
    return resp.json(permission)
})

Router.route('/').post(async (req,resp) =>{
    const obj = req.body
    const response = await permissionsBL.createPermission(obj) ;
    return resp.json(response)
})

Router.route('/:id').put(async(req,resp) =>{
    const id = req.params.id
    const obj = req.body
    const response = await permissionsBL.updatePermission(id,obj)
    return resp.json(response)
})

Router.route('/:id').delete(async (req,resp) =>{
    const id = req.params.id 
    const response = await permissionsBL.deletePermission(id) 
    return resp.json(response)
})

module.exports = Router


const express = require('express') ;
const Router = express.Router() ;
const membersBL = require('../models/membersBL') ;

Router.route('/').get(async (req,resp) =>{
    let members = await membersBL.getAllMembers() 
    return resp.json(members)
})
Router.route('/:id').get(async (req,resp) =>{
    let id = req.params.id 
    let member = await membersBL.getMemberById(id) ;
    return resp.json(member)
})

Router.route('/').post(async (req,resp) =>{
    let obj = req.body 
    let newMember = await membersBL.createNewMember(obj);
    return resp.json(newMember) 
})

Router.route('/:id').put(async (req,resp) =>{
    let id = req.params.id 
    let newData = req.body 
    let response = await membersBL.updateMember(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async (req,resp) =>{
    let id = req.params.id 
    let response = await membersBL.deleteMember(id) 
    return resp.json(response)

})

module.exports = Router
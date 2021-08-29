
const express = require('express') ;
const Router = express.Router() ;
const membersBL = require('../models/membersBL') ;

Router.route('/').get(async (req,resp) =>{
    const members = await membersBL.getAllMembers() 
    return resp.json(members)
})
Router.route('/:id').get(async (req,resp) =>{
    const id = req.params.id 
    const member = await membersBL.getMemberById(id) ;
    return resp.json(member)
})

Router.route('/').post(async (req,resp) =>{
    const obj = req.body 
    const newMember = await membersBL.createNewMember(obj);
    return resp.json(newMember) 
})

Router.route('/:id').put(async (req,resp) =>{
    const id = req.params.id 
    const newData = req.body 
    const response = await membersBL.updateMember(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async (req,resp) =>{
    const id = req.params.id 
    const response = await membersBL.deleteMember(id) 
    return resp.json(response)

})

module.exports = Router

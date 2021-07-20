
const express = require('express')
const Router = express.Router() ;
const axios = require('axios')



Router.route('/').get(async (req,resp) =>{
    let members = await axios.get('http://localhost:3000/members') ;
    return resp.json(members.data)
})

Router.route('/:id').get(async (req,resp) =>{
  let id = req.params.id
  let member = await axios.get(`http://localhost:3000/members/${id}`) ;
  return resp.json(member.data)
})

Router.route('/').post(async (req,resp) =>{
  let obj = req.body 
  let response = await axios.post('http://localhost:3000/members',obj) 
  return resp.json(response.data)
})

Router.route('/:id').put(async (req,resp) =>{
  let id = req.params.id
  let obj = req.body 
  let response = await axios.put(`http://localhost:3000/members/${id}`,obj) ;
  return resp.json(response.data)
 })

 Router.route('/:id').delete(async (req,resp) =>{
   let id = req.params.id 
   let response = await axios.delete(`http://localhost:3000/members/${id}`)
   return resp.json(response.data)
 })

module.exports = Router
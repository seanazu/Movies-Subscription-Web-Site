
const express = require('express')
const Router = express.Router() ;
const axios = require('axios')



Router.route('/').get(async (req,resp) =>{
    const members = await axios.get('http://localhost:3000/members') ;
    return resp.json(members.data)
})

Router.route('/:id').get(async (req,resp) =>{
  const id = req.params.id
  const member = await axios.get(`http://localhost:3000/members/${id}`) ;
  return resp.json(member.data)
})

Router.route('/').post(async (req,resp) =>{
  const obj = req.body 
  const response = await axios.post('http://localhost:3000/members',obj) 
  return resp.json(response.data)
})

Router.route('/:id').put(async (req,resp) =>{
  const id = req.params.id
  const obj = req.body 
  const response = await axios.put(`http://localhost:3000/members/${id}`,obj) ;
  return resp.json(response.data)
 })

 Router.route('/:id').delete(async (req,resp) =>{
   const id = req.params.id 
   const response = await axios.delete(`http://localhost:3000/members/${id}`)
   return resp.json(response.data)
 })

module.exports = Router

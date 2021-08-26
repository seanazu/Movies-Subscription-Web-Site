const express = require('express')
const Router = express.Router() ;
const axios = require('axios')



Router.route('/').get(async (req,resp) =>{
    const subscribers = await axios.get('http://localhost:3000/subscribers') ;
    return resp.json(subscribers.data)
})

Router.route('/:id').get(async (req,resp) =>{
  const id = req.params.id
  const subscriber = await axios.get(`http://localhost:3000/subscribers/${id}`) ;
  return resp.json(subscriber.data)
})

Router.route('/').post(async (req,resp) =>{
  const obj = req.body 
  const response = await axios.post('http://localhost:3000/subscribers',obj) 
  return resp.json(response.data)
})

Router.route('/:id').put(async (req,resp) =>{
  const id = req.params.id
  const obj = req.body 
  const response = await axios.put(`http://localhost:3000/subscribers/${id}`,obj) ;
  return resp.json(response.data)
 })

 Router.route('/:id').delete(async (req,resp) =>{
   const id = req.params.id 
   const response = await axios.delete(`http://localhost:3000/subscribers/${id}`)
   return resp.json(response.data)
 })

module.exports = Router

const express = require('express')
const Router = express.Router() ;
const axios = require('axios')



Router.route('/').get(async (req,resp) =>{
    let subscribers = await axios.get('http://localhost:3000/subscribers') ;
    return resp.json(subscribers.data)
})

Router.route('/:id').get(async (req,resp) =>{
  let id = req.params.id
  let subscriber = await axios.get(`http://localhost:3000/subscribers/${id}`) ;
  return resp.json(subscriber.data)
})

Router.route('/').post(async (req,resp) =>{
  let obj = req.body 
  let response = await axios.post('http://localhost:3000/subscribers',obj) 
  return resp.json(response.data)
})

Router.route('/:id').put(async (req,resp) =>{
  let id = req.params.id
  let obj = req.body 
  let response = await axios.put(`http://localhost:3000/subscribers/${id}`,obj) ;
  return resp.json(response.data)
 })

 Router.route('/:id').delete(async (req,resp) =>{
   let id = req.params.id 
   let response = await axios.delete(`http://localhost:3000/subscribers/${id}`)
   return resp.json(response.data)
 })

module.exports = Router
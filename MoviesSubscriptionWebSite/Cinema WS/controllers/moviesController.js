
const express = require('express')
const Router = express.Router() ;
const axios = require('axios')



Router.route('/').get(async (req,resp) =>{
    const movies = await axios.get('http://localhost:3000/movies') ;
    return resp.json(movies.data)
})

Router.route('/:id').get(async (req,resp) =>{
  const id = req.params.id
  const movie = await axios.get(`http://localhost:3000/movies/${id}`) ;
  return resp.json(movie.data)
})

Router.route('/').post(async (req,resp) =>{
  const obj = req.body 
  const response = await axios.post('http://localhost:3000/movies',obj) 
  return resp.json(response.data)
})

Router.route('/:id').put(async (req,resp) =>{
  const id = req.params.id
  const obj = req.body 
  const response = await axios.put(`http://localhost:3000/movies/${id}`,obj) ;
  return resp.json(response.data)
 })

 Router.route('/:id').delete(async (req,resp) =>{
   const id = req.params.id 
   const response = await axios.delete(`http://localhost:3000/movies/${id}`)
   return resp.json(response.data)
 })

module.exports = Router

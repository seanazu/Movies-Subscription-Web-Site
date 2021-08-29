const express = require('express') ;
const Router = express.Router() ;
const moviesBL = require('../models/moviesBL') ;

Router.route('/').get(async(req,resp) =>{
    const  movies = await moviesBL.getAllMovies() 
    return resp.json(movies)
})

Router.route('/:id').get(async(req,resp) =>{
    const  id = req.params.id 
    const  movie = await moviesBL.getMovieById(id) ;
    return resp.json(movie)
})

Router.route('/').post(async(req,resp) =>{
    const  obj = req.body 
    const newMovie = await moviesBL.createNewMovie(obj);
    return resp.json(newMovie) 
})

Router.route('/:id').put(async(req,resp) =>{
    const id = req.params.id 
    const newData = req.body 
    const response = await moviesBL.updateMovie(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async(req,resp) =>{
    const id = req.params.id 
    const response = await moviesBL.deleteMovie(id) 
    return resp.json(response)

})

module.exports = Router

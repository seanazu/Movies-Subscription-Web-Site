const express = require('express') ;
const Router = express.Router() ;
const moviesBL = require('../models/moviesBL') ;

Router.route('/').get(async(req,resp) =>{
    let movies = await moviesBL.getAllMovies() 
    return resp.json(movies)
})

Router.route('/:id').get(async(req,resp) =>{
    let id = req.params.id 
    let movie = await moviesBL.getMovieById(id) ;
    return resp.json(movie)
})

Router.route('/').post(async(req,resp) =>{
    let obj = req.body 
    let newMovie = await moviesBL.createNewMovie(obj);
    return resp.json(newMovie) 
})

Router.route('/:id').put(async(req,resp) =>{
    let id = req.params.id 
    let newData = req.body 
    let response = await moviesBL.updateMovie(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async(req,resp) =>{
    let id = req.params.id 
    let response = await moviesBL.deleteMovie(id) 
    return resp.json(response)

})

module.exports = Router
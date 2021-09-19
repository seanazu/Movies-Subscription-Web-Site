const Movie = require('./Schemas/moviesSchema')
const fetch = require ('node-fetch') ;


const loadMoviesData = async () =>{
    const resp = await fetch('https://api.tvmaze.com/shows') ;
    if(resp.ok){
        const movies = resp.json() 
        return new Promise ((resolve,reject) =>{
            movies.forEach(element => {
         let movie = new Movie ({
            name: element.name ,
            genre : element.genres.toString() ,
            image : element.image.medium,
            premiered: element.premiered

 
         })
         movie.save((err)=>{
             if(err){
                 reject(err)
             }else{
                 resolve("Movie Created")
             }
         })
 
        });  
 
        })
        
    }
 }
 const checkIfDataWasUploaded = async () =>{
    return new Promise((resolve,reject) =>{
        Movie.find({},(err,data) =>{
            if(err){
                reject(err)
            }else{
                if(data==false){
                    loadMoviesData()
                }
            }
        })
    })
}
checkIfDataWasUploaded()
 

const getAllMovies = () =>{
    return new Promise ((resolve,reject) =>{
        Movie.find({},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getMovieById = (id) =>{
    return new Promise((resolve,reject) =>{
        Movie.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const createNewMovie = (newMovie) =>{
    return new Promise((resolve,reject) =>{
        const movie = new Movie (newMovie)
        movie.save((err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Movie Created")
            }
        })
    })
}

const updateMovie = (id,updatedData) =>{
    return new Promise ((resolve,reject) =>{
        Movie.findByIdAndUpdate(id,updatedData,(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("Movie Updated")
            }
        })
    })
}

const deleteMovie = (id) =>{
    return new Promise ((resolve,reject) =>{
        Movie.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Movie deleted")
            }
        })
    })
}




module.exports = {getAllMovies,getMovieById,createNewMovie,updateMovie,deleteMovie}

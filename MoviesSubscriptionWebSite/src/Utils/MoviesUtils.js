import axios from 'axios'

const getAllMovies = async () =>{
  let resp = await axios.get("http://localhost:3001/movies")
  return resp.data
}
const getMovieById = async (id) =>{
  let resp = await axios.get(`http://localhost:3001/movies/${id}`)
  return resp.data
}
const postMovie = async (obj) =>{
  let resp = await axios.post(`http://localhost:3001/movies`,obj)
  return resp.data
}
const putMovie = async (id,obj) =>{
    let resp = await axios.put(`http://localhost:3001/movies/${id}`,obj)
    return resp.data
}
const deleteMovie = async (id) =>{
    let resp = await axios.delete(`http://localhost:3001/movies/${id}`)
    return resp.data
}

export default {getAllMovies,getMovieById,postMovie,putMovie,deleteMovie}
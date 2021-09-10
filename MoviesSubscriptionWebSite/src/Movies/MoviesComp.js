import React, { useEffect, useState } from 'react';
import MoviesUtils from '../Utils/MoviesUtils'
import ReactPaginate from 'react-paginate'
import './MoviesComp.css'
import Button from '@material-ui/core/Button'
import SubscriptionsWatched from './SubscriptionsWatched';
import history from '../history';


const MoviesComp = () => {
        const[movies , setMovies] = useState([])
        const[pageNumber , setPageNumber] = useState(0)
        const[editMovieDisplay,setEditMovieDisplay] = useState("")
        const[deleteDisplay, setDeleteDisplay] = useState("")
        const[moviesDisplay, setMoviesDisplay] = useState('none')

        useEffect(async()=>{
            let movies = await MoviesUtils.getAllMovies()
            setMovies(movies) 
            if(movies){
                setMoviesDisplay('unset')
            }
            
            setEditMovieDisplay(localStorage.getItem('updateMovie'))
            setDeleteDisplay(localStorage.getItem('deleteMovies'))

        
          },[])
          

          useEffect(async()=>{
            let movies = await MoviesUtils.getAllMovies()
            let newMovieArray = []
            let subscriberMovie = sessionStorage.getItem('movie')
            movies.map(movie=>{
                if(movie.name.toLowerCase().includes(sessionStorage.getItem('findMovie').toLowerCase())  && movie.name.toLowerCase().includes(subscriberMovie) ){
                    newMovieArray.push(movie)
                }
            })
            setMovies(newMovieArray) 

          },[pageNumber])

        const moviesPerPage = 10
        const pagesVisited = pageNumber * moviesPerPage

        const displayMovies = movies.slice(pagesVisited, pagesVisited + moviesPerPage)
        .map((item,index) =>{
                let year = item.premiered.substring(0,4)
                return(
                  <div key ={index}>
                    <a className="link" href="https://codepen.io/simoberny/pen/qxxOqj" target="_blank" ></a>
                     <div className="movie_card" id="bright" >
                       <div className="info_section">
                         <div className="movie_header">
                           <img className="locandina" src={item.image}/>
                           <h1>{item.name}</h1>
                           <h4>{year}</h4>
                           <p className="type">{item.genre}</p>
                           <br/>
                           <br/>
                         </div>
                         <div className="movie_desc">
                           <p className="text">
                             <SubscriptionsWatched id={item._id}/>
                           </p>
                         </div>
                         <div className="movie_social">
                           <ul>
                             <li><i className="material-icons"><Button variant="contained" style={{display:editMovieDisplay}} color="primary" onClick={()=>history.push(`/mainpage/editMovie/${item._id}`)}>Edit</Button></i></li>
                             <li><i className="material-icons"><Button variant="contained" style={{display:deleteDisplay}} color="primary" onClick={async()=>{
                               await MoviesUtils.deleteMovie(item._id)
                             }}>Delete</Button></i></li>
                           </ul>
                         </div>
                       </div>
                       <div className="blur_back bright_back"  ><img src={item.image} /></div>
                     </div>
                  </div>
                )
               
        })
        
        const pageCount = Math.ceil(movies.length / moviesPerPage)

        const changePage = async ({selected}) =>{
            setPageNumber(selected)
            
        }

    
        return (
            <div >
           <div className="App" style={{display:moviesDisplay}}>
           {displayMovies}  
           <ReactPaginate
             previousLabel={"Previous"}
             nextLabel={"Next"}
             pageCount={pageCount}
             onPageChange={changePage}
             containerClassName={"paginationBttns"}
             previousLinkClassName = {"previousBttn"}
             nextLinkClassName = {"nextBttn"}
             disabledClassName={"paginationDisabled"}
             activeClassName={"paginationActive"}
           />
         </div>  
         
               
        </div>
        );
      
    };

export default MoviesComp ;

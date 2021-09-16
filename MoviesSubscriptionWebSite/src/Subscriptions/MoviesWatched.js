import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MoviesUtils from '../Utils/MoviesUtils';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import AddNewMovieComp from './AddNewMovieComp';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth:350,
    width:'450px', 
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  media: {
    height: 250,
  },
  subscribeButton:{
    fontSize:'x-small'
  },
  moviesWatchedTable : {
    display:'flex',
    justifyContent:'flex-end'
  }
});



const MoviesWatched = (props) => {
    const classes = useStyles();
    const[subscriberMovies , setData] = useState([])
    const[obj, setObj] = useState("")


    
    const addMovie = async() =>{ 
        
        setObj(<AddNewMovieComp id={props.id} render={async()=>{
            let subscriptions = await SubscriptionsUtils.getAllSubscriptions()
        
            let subscription = await subscriptions.filter((item) => item._id == props.id);
            if (subscription[0]) {
              let subscriberMoviesData = [];
              await subscription[0].movies.map(item => {
                subscriberMoviesData.push({ movieId: item.movieId, date: item.date });
              });
    
              let allMovies = await MoviesUtils.getAllMovies();
              let subscriberMoviesNameNdate = [];
              subscriberMoviesData.map((item) => {
                let movie = allMovies.filter((movie) => movie._id == item.movieId);
                subscriberMoviesNameNdate.push({
                  name: movie[0].name,
                  date: item.date,
                });
              });
              setData(subscriberMoviesNameNdate);
            }
        }}/>)

    }

    useEffect(async () => {
        
        let subscriptions = await SubscriptionsUtils.getAllSubscriptions()
        
        let subscription = subscriptions.filter((item) => item._id == props.id);
        if (subscription[0]) {
          let subscriberMoviesData = [];
          await subscription[0].movies.map(item => {
            subscriberMoviesData.push({ movieId: item.movieId, date: item.date });
          });

          let allMovies = await MoviesUtils.getAllMovies();
          let subscriberMoviesNameNdate = [];
          subscriberMoviesData.map((item) => {
            let movie = allMovies.filter((movie) => movie._id == item.movieId);
            subscriberMoviesNameNdate.push({
              name: movie[0].name,
              date: item.date,
            });
          });
          setData(subscriberMoviesNameNdate);
        }
      },[subscriberMovies]);

      let moviesObj = subscriberMovies.map((item, index) => {
          return(
              <li key={index}>
                  <Link to='/mainpage/movies' onClick={()=>sessionStorage.setItem('movie',item.name.toLowerCase())}>{item.name}</Link>,{item.date}
              </li>
          )
      })
    

  


    return (
        <div>
            <table className={classes.moviesWatchedTable}>
                <tbody>
                    <tr>
                        <td>
                        <br/>
                        <br/>
                        
                        <Card className={classes.root} >
                               <CardContent>
                                 <Typography gutterBottom variant="h5" component="h2">
                                 Movies Watched
                                 </Typography>
                                 <Typography variant="body2" color="textSecondary" component="p">
                                 <Button variant="contained" className={classes.subscribeButton} color="primary" onClick={addMovie}>Subscribe to new movie</Button>{' '}
                                 </Typography>
                                 <Typography>
                                  {obj}
                                 </Typography>
                                 <Typography>
                                 {moviesObj}
                                 </Typography>
                               </CardContent>
                             <CardActions style={{margin:'auto', display:props.display}}>
                             </CardActions>
                           </Card>

                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MoviesWatched;

import React, { useEffect, useState } from 'react';
import {Route,Switch, Link } from 'react-router-dom';
import history from '../history';
import AddMovieComp from './AddMovieComp';
import MoviesComp from './MoviesComp';
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const MainComp = () => {
    const[findInput, setInput] = useState("")
    const[createMovieDisplay,setDisplay]=useState('')

    useEffect(()=>{
        history.push('/mainpage/movies/allMovies')
        let addMovieDisplay = localStorage.getItem('createMovies')
        console.log(addMovieDisplay)
        setDisplay(addMovieDisplay)
    },[])

    const findMovie = () =>{
        sessionStorage.setItem('findMovie',findInput)
    }

    useEffect(() => {
        sessionStorage.setItem('findMovie','')
    }, [findInput])


    const useStyles = makeStyles({
        root: {
          background: (props) =>
            props.color === 'red'
              ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: (props) =>
            props.color === 'red'
              ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
              : '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          height: 35,
          padding: '0 30px',
          margin: 8,
        },
      });
      
      function MyButton(props) {
        const { color, ...other } = props;
        const classes = useStyles(props);
        return <Button className={classes.root} {...other} />;
      }
      
      MyButton.propTypes = {
        color: PropTypes.oneOf(['blue', 'red']).isRequired,
      };

    return (
        <div style={{fontFamily:'Trebuchet MS,sans-serif'}}>
            <br/><br/>
            <Link to='/mainpage/movies/allMovies' onClick={()=> sessionStorage.setItem('movie','')}>
            <React.Fragment>
               <MyButton color="red" >All Movies</MyButton>
             </React.Fragment>
                </Link>{' '}
            <Link to='/mainpage/movies/addMovies' style={{display:createMovieDisplay}}>
            <React.Fragment>
               <MyButton color="red" >Add Movie</MyButton>
             </React.Fragment>
                </Link>{' '}
             <span style={{fontSize:'large'}}>Find Movie :</span> <TextField id="standard-basic" label='search' style={{margin:'auto'}} onChange={(e)=>setInput(e.target.value)} />{' '}
             <React.Fragment>
               <MyButton color="red" onClick={findMovie} >Find</MyButton>
             </React.Fragment>

            <Switch>
                <Route path="/mainpage/movies/allMovies" component={MoviesComp} />
                <Route path="/mainpage/movies/addMovies" component={AddMovieComp}  />
            </Switch>
            
        </div>
    );
};

export default MainComp;
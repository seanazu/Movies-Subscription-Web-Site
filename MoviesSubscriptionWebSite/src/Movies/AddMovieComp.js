import React, { useState } from 'react';
import MoviesUtils from '../Utils/MoviesUtils';
import history from '../history'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  





const AddMovieComp = () => {
    const classes = useStyles();
    const[movie,setMovie]=useState({
        name:"",
        genre:"",
        image:"",
        premiered:""
    })

    const saveMovie = async() =>{
      let movieObj = movie 
      let resp = await MoviesUtils.postMovie(movieObj)
      alert(resp)
      sessionStorage.setItem('displayAllMovies', 'table')
      sessionStorage.setItem('displayAddMovie','none')
      history.push("/mainpage/movies/allMovies")
    } 

    const cancelFunc = () => {
        history.push("/mainpage/movies/allMovies")
    }

    return (
        <div>
            <br/>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <AddCircleOutlineIcon color='secondary' style={{fontSize:'xx-large'}}/>
              <Typography component="h1" variant="h5">
              Add Movie
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Name"
                      onChange={(e)=>setMovie({...movie, name:e.target.value})} 
                      
                     
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Genres" 
                      onChange={(e)=>setMovie({...movie, genre:e.target.value})}
                    
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Image URL"
                      type="Image URL"
                      onChange={(e)=>setMovie({...movie, image:e.target.value})}
                     
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Premiered"
                      onChange={(e)=>setMovie({...movie, premiered:e.target.value})}
                     
                    />
                  </Grid>
                </Grid>
                <br/>
                <Grid >
                  <Grid item>
                  <Button variant="contained" color="primary" onClick={saveMovie}> Save</Button>{' '}
                  <Button variant="contained" color="primary"  onClick={cancelFunc} > Cancel</Button>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>


      

        </div>
    );
};

export default AddMovieComp;

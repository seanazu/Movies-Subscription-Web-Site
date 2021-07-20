import React, { useEffect, useState } from 'react';
import history from '../history';
import MoviesUtils from '../Utils/MoviesUtils';
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
  




const EditMovieComp = (props) => {
    const classes = useStyles();
    const[movie,setMovie]=useState({
        name:"",
        genre:"",
        image:"",
        premiered:""
    })

    useEffect(async() =>{
        let movie = await MoviesUtils.getMovieById(props.match.params.id)
        setMovie({
            name:movie.name,
            genre:movie.genre,
            image:movie.image,
            premiered:movie.premiered 
        })

    },[])

    const updateData = async() =>{
        let id = props.match.params.id
        let updatedData = movie
        let resp = await MoviesUtils.putMovie(id,updatedData)
        console.log(resp)
        alert(resp)
        history.push("/mainpage/movies")
    }

    const cancelUpdate = () =>{
        history.push("/mainpage/movies")
    }
    let obj = ()=>{
        if(movie.name){
            return (
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                <AddCircleOutlineIcon color='secondary' style={{fontSize:'xx-large'}}/>
                  <Typography component="h1" variant="h5">
                  Edit Movie
                  </Typography>
                  <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          name="Name"
                          autoComplete="Name"
                          defaultValue={movie.name}
                          onChange={(e)=>setMovie({...movie, name:e.target.value})}
                          
                         
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="Genres"
                          label="Genres" 
                          name="Genres"
                          autoComplete="Genres"
                          defaultValue={movie.genre}
                          onChange={(e)=>setMovie({...movie, genre:e.target.value})}
                        
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="Image URL"
                          label="Image URL"
                          type="Image URL"
                          id="Image URL"
                          defaultValue={movie.image}
                          onChange={(e)=>setMovie({...movie, image:e.target.value})}
                         
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="Premiered"
                          label="Premiered"
                          type="Premiered"
                          id="Premiered"
                          defaultValue={movie.premiered}
                          onChange={(e)=>setMovie({...movie, premiered:e.target.value})}
                         
                        />
                      </Grid>
                    </Grid>
                    <br/>
                    <Grid >
                      <Grid item>
                      <Button variant="contained" color="primary" onClick={updateData}> Update</Button>{' '}
                      <Button variant="contained" color="primary"  onClick={cancelUpdate} > Cancel</Button>
                      </Grid>
                    </Grid>
                  </form>
                </div>
                <Box mt={5}>
                </Box>
              </Container>
            )
        }
    }
    let obj1 = obj()

    

    return (
        <div>
         
            {obj1}
         
        </div>
    );
};

export default EditMovieComp;
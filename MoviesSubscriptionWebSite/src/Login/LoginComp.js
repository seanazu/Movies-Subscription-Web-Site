import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import history from '../history'
import UsersUtils from '../Utils/UsersUtils';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://wallpaperplay.com/walls/full/5/3/b/140053.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignInSide() {
    const classes = useStyles();
    const[userName, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[users , setUsers] = useState([])
   

    
    useEffect (async()=>{
      localStorage.removeItem("username")
      const users = await axios.get("http://localhost:3001/user-DB")
      setUsers(users.data)
    },[])
    
  
    return (
      
      <Grid container component="main" className={classes.root}>  
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
              <br/><br/><br/><br/><br/><br/>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="username"
                onChange={(e)=>setUserName(e.target.value)}
                autoFocus
              />
              <br/>
              
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <br/>
              <br/>
              <br/>
              
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={async ()=>{
                    let checkBool = false
                    let id = ""
                    users.map(user =>{ 
                        if(user.username == userName && user.password == password && user.password){
                           localStorage.setItem("userId",user._id )
                           checkBool =true
                            id = user._id
                        }
                        
                    })
                    if(checkBool == true){
                        localStorage.setItem('viewUsers',"none")
                        if(users[0]._id == localStorage.getItem('userId')){
                            localStorage.setItem('viewUsers',"unset")
                        }
                        localStorage.setItem('username',userName)
                        
                        localStorage.setItem('viewSubscriptions','unset')
                        localStorage.setItem('createSubscriptions','unset')
                        localStorage.setItem('deleteSubscriptions','unset')
                        localStorage.setItem('updateSubscriptions','unset')
                        localStorage.setItem('viewMovies','unset')
                        localStorage.setItem('createMovies','unset')
                        localStorage.setItem('deleteMovies','unset')
                        localStorage.setItem('updateMovie','unset')
    
                        
                        let id = localStorage.getItem('userId')
                        let userPermission = await UsersUtils.getPermissionsById(id)
                        userPermission.map(permission =>{
                           
                            if(permission.viewSubscriptions == false){
                                localStorage.setItem('viewSubscriptions','none')
                            }
    
                            if(permission.createSubscriptions == false){
                                localStorage.setItem('createSubscriptions','none')
                            }
    
                            if(permission.deleteSubscriptions == false){
                                localStorage.setItem('deleteSubscriptions','none')
                            }
    
                            if(permission.updateSubscriptions == false){
                                localStorage.setItem('updateSubscriptions','none')
                            }
    
                            if(permission.viewMovies == false){
                                localStorage.setItem('viewMovies','none')
                            }
    
                            if(permission.createMovies == false){
                                localStorage.setItem('createMovies','none')
                            }
    
                            if(permission.deleteMovies == false){
                                localStorage.setItem('deleteMovies','none')
                            }
    
                            if(permission.updateMovie == false){
                                localStorage.setItem('updateMovie','none')
                            }
    
                        })
                        history.push("/mainpage")
                        alert(`Welcome ${userName}`)
    
    
    
                    }else {
                       
                        alert("Data Not Correct")
                    }
                }} 
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                <Grid item>
                <Link to='/createaccount' variant="body2">
                  {"Create Account"}
                </Link>
              </Grid>
                 
                </Grid>
              </Grid>
              <Box mt={5}>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }


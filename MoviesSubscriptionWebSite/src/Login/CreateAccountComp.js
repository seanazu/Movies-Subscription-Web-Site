import React, { useEffect, useState } from 'react';
import axios from 'axios'
import history from '../history'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  


  export default function SignIn() {
    const classes = useStyles();
    const[username,setUser] = useState("")
    const[password,setPassword] = useState("")
    const[users, setUsers] = useState([])

    useEffect(async()=>{
      const usersResp = await axios.get("http://localhost:3001/user-DB")
      setUsers(usersResp.data)
     
    },[])

    const checkUserInput = async () =>{
        const passwordInput = password
        const usernameInput = username 
        let bool = false
        let id = ""
        users.map(user =>{
            if(user.username == username && user.password == false && passwordInput){
                bool = true
                id = user._id
              }else if(user.username == username && user.password){
                  alert("User Already In The System")
              }
        })  
        if(username == false || password == false){
            alert("MissingData")
        } 

        if(bool == true){
        const obj = {
            username : usernameInput,
            password : passwordInput
        } 
        await axios.put(`http://localhost:3001/user-DB/${id}`,obj) 

            if(resp.data){
            alert("Welcome")
            localStorage.setItem('username',username)
            history.push("/mainpage")
            }

        }
           
    }

    const cancelCreate = () =>{
        history.push('/')
    }



    
    return (
        <div>
            
       <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
           <Avatar className={classes.avatar}>
             <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5">
             Create Account
           </Typography>
           <form className={classes.form} noValidate>
             <TextField
               variant="outlined"
               margin="normal"
               required
               fullWidth
               label="username"
               onChange={(e)=>setUser(e.target.value)}
               autoFocus
             />
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
             <Button
               type="button"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={checkUserInput}
             >
               Create
             </Button>
             <Button
               type="button"
               fullWidth
               variant="contained"
               color="primary"
               className={classes.submit}
               onClick={cancelCreate}
             >
               Cancel
             </Button>
             <Grid container>
               <Grid item xs>
           
               </Grid>
             </Grid>
           </form>
         </div>
         <Box mt={8}>
         </Box>
       </Container>
               
        </div>
    );
};






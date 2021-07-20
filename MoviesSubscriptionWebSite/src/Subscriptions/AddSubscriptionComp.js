import React, { useState } from 'react';
import history from '../history';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
  




const AddSubscriptionComp = () => {
    const classes = useStyles();
    const[member, setMember] = useState({fullname:"",email:"",city:""})

    const cancelAdd = () =>{
        history.push("/mainpage/subscriptions/allSubscriptions")
    }

    const addMember = async () =>{
        let memberObj = member
        let resp = await SubscriptionsUtils.postMember(memberObj)
        alert(resp)
        history.push('/mainpage/subscriptions/allSubscriptions')

    }


    return (
        <div>
        
           <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <AddCircleOutlineIcon color='secondary' style={{fontSize:'xx-large'}}/>
              <Typography component="h1" variant="h5">
              Add New Member
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Full Name"
                      label="Full Name"
                      name="Full Name"
                      autoComplete="Full Name"
                      onChange={(e)=>setMember({...member, fullname:e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e)=>setMember({...member, email:e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e)=>setMember({...member, city:e.target.value})}
                    />
                  </Grid>
                </Grid>
                <br/>
                <Grid >
                  <Grid item>
                  <Button variant="contained" color="primary" onClick={addMember} > Save</Button>{' '}
                  <Button variant="contained" color="primary" onClick={cancelAdd} > Cancel</Button>
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

export default AddSubscriptionComp
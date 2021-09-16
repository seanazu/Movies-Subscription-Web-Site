import React, { useEffect, useState } from 'react';
import history from '../history';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize:'xx-large'
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
  



const EditSubscriptionComp = (props) => {
    const classes = useStyles();
    const[member,setMember]=useState({
        fullname:"",
        email:"",
        city:""
    })

    useEffect(async () => {
        let memberData = await SubscriptionsUtils.getMemberById(props.match.params.id)
        console.log(memberData)
        setMember({
            name:memberData.fullname,
            email: memberData.email,
            city :memberData.city
        })
    }, [])

    const updateMember = async ()=>{
        const memberObj = member
        const resp = await SubscriptionsUtils.putMember(props.match.params.id, memberObj) 
        alert(resp)
        history.push('/mainpage/subscriptions')
    }

    const canacelUpdate = () =>{
        history.push('/mainpage/subscriptions')
    }

    let obj = () =>{
       if(member.name){
           return(
                  
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <AccountCircleIcon color='secondary' />
              <Typography component="h1" variant="h5">
              Edit Member
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Full Name"
                      defaultValue={member.name} 
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
                      label="Email"
                      defaultValue={member.email} 
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
                      name="City"
                      type="City"
                      label="City"
                      id="City"
                      defaultValue={member.city}
                      onChange={(e)=>setMember({...member, city:e.target.value})}
                    />
                  </Grid>
                </Grid>
                <br/>
                <Grid >
                  <Grid item>
                  <Button variant="contained" color="primary"  onClick={updateMember} > Update</Button>{' '}
                  <Button variant="contained" color="primary" onClick={canacelUpdate} > Cancel</Button>
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

export default EditSubscriptionComp;

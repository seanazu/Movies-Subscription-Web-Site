import React, { useState } from 'react';
import UserUtils from '../Utils/UsersUtils'
import history from '../history'
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
import Checkbox from '@material-ui/core/Checkbox';

 
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
 permissions:{
  fontSize:'medium'
 }
}));



const AddUser = () => {
    const classes = useStyles();
    const [checkedArray, setCheckedArr] = useState({
        viewSubscriptions: false,
        createSubscriptions: false,
        deleteSubscriptions: false,
        updateSubscriptions: false,
        viewMovies: false,
        createMovies: false,
        deleteMovies: false,
        updateMovie: false,
      });
      const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        sessionTimeOut: 0,
        createdDate: "",
        permissions: [],
      });

    const current = new Date()
    let date =`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}` 

    const addUser = async () => {
        await UserUtils.postUserDB({ username: user.username, password: "" });
        const resp = await UserUtils.getAllUsersDB();
        const userDB = resp.filter(
          (item) => item.username == user.username
        );
    
        const id = userDB[0]._id;
        const permissionsJson = {...checkedArray,id:id};
        await UserUtils.postPermissions(permissionsJson);
        const userJson = {
          id: id,
          firstname: user.firstname,
          lastname: user.lastname,
          sessionTimeOut: user.sessionTimeOut,
          createdDate: date,
        };
    
        await UserUtils.postUserJson(userJson);
    
        await alert("The user was successfully added ");
        history.push("/mainpage/userManagment/allUsers");
      };

      const sendToAllUsers = () =>{
          history.push('/mainpage/userManagment/allUsers')
      }

    return (
        <div>
            <br/><br/>
    
            <Container component="main" maxWidth="xs">
             <CssBaseline />
             <div className={classes.paper}>
               <AddCircleOutlineIcon color='secondary' />
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
                       id="First Name"
                       label="First Name"
                       name="First Name"
                       autoComplete="First Name"
                       onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                      
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       id="Last Name"
                       label="Last Name"
                       name="Last Name"
                       autoComplete="Last Name"
                       onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                 
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       name="User Name"
                       label="User Name"
                       type="User Name"
                       id="User Name"
                       autoComplete="current-User Name"
                       onChange={(e) => setUser({ ...user, username: e.target.value })}
                       
                       
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       name="Session Time Out(Minutes)"
                       label="Session Time Out(Minutes)"
                       type="Session Time Out(Minutes)"
                       id="Session Time Out(Minutes)"
                       autoComplete="current-User Name"
                       onChange={(e) => setUser({ ...user, sessionTimeOut: e.target.value})}
                       
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       variant="outlined"
                       required
                       fullWidth
                       name="Created Date"
                       type="Created Date"
                       id="Created Date"
                       value={date} 
                       onChange={(e) => setUser({ ...user, createdDate: { date } })}
                     />
                   </Grid>
                  
           
                 </Grid> 
                 <Grid>
                 <table>
                   <tr className={classes.permissions}>
                     <th>
                       View Subscriptions<Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,viewSubscriptions: e.target.checked})}} /><br/>
                   
                   Create Subscriptions<Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,createSubscriptions: e.target.checked})}} /><br/>
                   
                   Delete Subscriptions<Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,deleteSubscriptions: e.target.checked})}} /><br/>
                  
                   Update Subscription<Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,updateSubscriptions: e.target.checked})}} /><br/>
                     </th>
                      <th > 
                      View Movies <Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,viewMovies: e.target.checked})}} /><br/>
                   
                      Create Movies <Checkbox onChange={(e) => {setCheckedArr({...checkedArray,createMovies: e.target.checked})}} /><br/>
                   
                      Delete Movies <Checkbox onChange={(e) => {setCheckedArr({...checkedArray,deleteMovies: e.target.checked})}} /><br/>
                  
                      Update Movie<Checkbox  onChange={(e) => {setCheckedArr({...checkedArray,updateMovie: e.target.checked})}} /><br/>
                 
                     </th>
                   </tr>
                   
                </table>
                </Grid>
                 <br/>
                 <Grid >
                   <Grid item>
                   <Button variant="contained" color="primary" onClick={addUser} > Save</Button>{' '}
                   <Button variant="contained" color="primary" onClick={sendToAllUsers} > Cancel</Button>
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

export default AddUser;

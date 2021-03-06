import React, { useEffect,useState } from 'react';
import UsersUtils from '../Utils/UsersUtils';
import history from '../history'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
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
  permissions:{
    fontSize:'medium'
  }
}));



const EditUser = (props) => {
    const classes = useStyles();
    const [checkedArray, setCheckedArr] = useState({});
      
    const [user, setUser] = useState({});

    useEffect(async()=>{
      const usersDB = await UsersUtils.getAllUsersDB()
      const userDB = usersDB.filter(user=> user.username == props.match.params.username)
      const id = userDB[0]._id
      const resp = await UsersUtils.getPermissionsById(id)
      setCheckedArr(resp[0])
      const usersJson = await UsersUtils.getAllUsersJson()
      const userJson = usersJson.filter(user=>user.id == id)
      const userObj = userJson[0]
      setUser(userObj)

    },[])

    const editUser = async () => {
        const usersDB = await UsersUtils.getAllUsersDB()
        const userDB = usersDB.filter(user=> user.username == props.match.params.username)
        const id = userDB[0]._id
        const username = user.username
        await UsersUtils.putUserDB(id,{ username: username, password: userDB[0].password });
        const permissionsJson = {...checkedArray, id:id};
        await UsersUtils.putPermissions(id,permissionsJson)
        const firstname= user.firstname
        const lastname= user.lastname
        const sessionTimeOut = user.sessionTimeOut
        const date = user.createdDate
        const userJson = {
          id: id,
          firstname: firstname,
          lastname: lastname,
          sessionTimeOut: sessionTimeOut,
          createdDate: date,
        };
    
        await UsersUtils.putUserJson(id,userJson);
        alert("The user is updated ");
        history.push("/mainpage/userManagment/allUsers");
      };

      const sendToAllUsers = () =>{
        history.push('/mainpage/userManagment/allUsers')
    }

    const obj = () =>{
      if(user.firstname){
        return(
          
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
          <AccountCircleIcon color='secondary' />
            <Typography component="h1" variant="h5">
            Edit User
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
                    defaultValue={user.firstname} 
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
                    defaultValue={user.lastname} 
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
                    defaultValue={user.username} 
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
                    defaultValue={user.sessionTimeOut} 
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
                    defaultValue={user.createdDate} 
                    onChange={(e) => setUser({ ...user, createdDate: e.target.value })}
                  />
                </Grid>
               
        
              </Grid> 
              <Grid>
              <table>
                <tr className={classes.permissions}>
                  <th>
                    View Subscriptions<Checkbox defaultChecked={checkedArray.viewSubscriptions}  onClick={(e) => {setCheckedArr({...checkedArray,viewSubscriptions: e.target.checked})}} /><br/>
                
                Create Subscriptions<Checkbox defaultChecked={checkedArray.createSubscriptions}  onClick={(e) => {setCheckedArr({...checkedArray,createSubscriptions: e.target.checked})}} /><br/>
                
                Delete Subscriptions<Checkbox defaultChecked={checkedArray.deleteSubscriptions} onClick={(e) => {setCheckedArr({...checkedArray,deleteSubscriptions: e.target.checked})}} /><br/>
               
                Update Subscription<Checkbox  defaultChecked={checkedArray.updateSubscriptions} onClick={(e) => {setCheckedArr({...checkedArray,updateSubscriptions: e.target.checked})}} /><br/>
                  </th>
                   <th > 
                   View Movies <Checkbox defaultChecked={checkedArray.viewMovies} onClick={(e) => {setCheckedArr({...checkedArray,viewMovies: e.target.checked})}} /><br/>
                
                   Create Movies <Checkbox defaultChecked={checkedArray.createMovies}  onClick={(e) => {setCheckedArr({...checkedArray,createMovies: e.target.checked})}} /><br/>
                
                   Delete Movies <Checkbox defaultChecked={checkedArray.deleteMovies}  onClick={(e) => {setCheckedArr({...checkedArray,deleteMovies: e.target.checked})}} /><br/>
               
                   Update Movie<Checkbox defaultChecked={checkedArray.updateMovie}   onClick={(e) => {setCheckedArr({...checkedArray,updateMovie: e.target.checked})}} /><br/>
              
                  </th>
                </tr>
                
             </table>
             </Grid>
              <br/>
              <Grid >
                <Grid item>
                <Button variant="contained" color="primary" onClick={editUser}  > Update</Button>{' '}
                <Button variant="contained" color="primary" onClick={sendToAllUsers} > Cancel</Button>
                </Grid>
              </Grid>
            </form>
          </div>

        </Container>

        )
      }
    
    }

    const obj1 = obj()



    return (
        <div>
        
           {obj1}
            
            
        </div>
    );
};

export default EditUser;

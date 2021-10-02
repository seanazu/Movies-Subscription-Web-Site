import React, { useEffect,useState } from 'react';
import UserUtils from '../Utils/UsersUtils'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
    margin:'auto', 
    width:'450px', 
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  media: {
    height: 140,
  },
});


const UserComp = (props) => {
    const classes = useStyles();
    const[permission , setPermission] = useState([])
    const[userObj , setUser] = useState([])
    const[id, setId] = useState("")

    useEffect(async () => {
      const users = await UserUtils.getAllUsersDB()
      const permissions = await UserUtils.getAllPermissions()
      const usersJson = await UserUtils.getAllUsersJson()
      let id = ""

      const user = users.filter(user=>user.username == props.username)
      id = user[0]._id
      setId(id)


      const permission = permissions.filter(permission => permission.id == id)
      let permissionStringArray = []
      permission.map(permission =>{
        if(permission.viewSubscriptions){
          permissionStringArray.push("View Subscriptions")
        }
        if(permission.createSubscriptions){
          permissionStringArray.push("Create Subscriptions")
        }
        if(permission.deleteSubscriptions){
          permissionStringArray.push("Delete Subscriptions")
        }
        if(permission.updateSubscriptions){
          permissionStringArray.push("Update Subscriptions")
        }
        if(permission.viewMovies){
          permissionStringArray.push("View Movies")
        }
        if(permission.createMovies){
          permissionStringArray.push("Create Movies")
        }
        if(permission.deleteMovies){
          permissionStringArray.push("Delete Movies")
        }
        if(permission.updateMovie){
          permissionStringArray.push("Update Movie")
        }
      })
      setPermission(permissionStringArray)
      let userJson = usersJson.filter(user=>user.id == id)
      
      
      let userObj = {
        firstname: userJson[0].firstname,
        lastname : userJson[0].lastname ,
        username : user[0].username ,
        sessionTimeOut : userJson[0].sessionTimeOut ,
        createdDate : userJson[0].createdDate ,
        permissions : permissionStringArray
    }
    setUser(userObj)
    
    },[])

    const deleteUser = async () => {
      await UserUtils.deleteUserDB(id);
      await UserUtils.deleteUserJson(id);
      await UserUtils.deletePermission(id);
      props.removeUser();
    };

   

    return (
        <div > 
    

             <Card className={classes.root} >
                   <CardContent>
                     <Typography gutterBottom variant="h5" component="h2">
                     {userObj.firstname}{' '}{userObj.lastname}
                     </Typography>
                     <Typography variant="body2" color="textSecondary" component="p">
                    User Name : {userObj.username}
                     </Typography>
                     <Typography variant="body2" color="textSecondary" component="p">
                     Seesion Time Out (Minutes) : {userObj.sessionTimeOut}
                     </Typography>
                     <Typography variant="body2" color="textSecondary" component="p">
                     Created Date  :{userObj.createdDate}
                     </Typography>
                     <Typography variant="body2" color="textSecondary" component="p">
                     Permissions : {permission.toString()}
                     </Typography>
                    
                   </CardContent>
                 <CardActions style={{marginLeft:'33%'}}>
                 <Link to={`/mainpage/editUser/${userObj.username}`} >
                 <Button variant="contained" color="primary"> Edit</Button></Link>{' '}
                 <Button variant="contained" color="primary" onClick={deleteUser} > Delete</Button><br/>
                 </CardActions>
               </Card>
              
            <br/>
        </div>
    );
};


export default UserComp;

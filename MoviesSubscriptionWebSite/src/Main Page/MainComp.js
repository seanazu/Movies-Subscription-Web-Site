import React,{useEffect} from 'react';
import {Route,Switch} from 'react-router-dom'
import MainPageComp from './MainPageComp'
import LoginComp from '../Login/LoginComp'
import CreateAccountComp from '../Login/CreateAccountComp'
import Utils from '../Utils/UsersUtils'
import UsersUtils from '../Utils/UsersUtils';
import history from '../history'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    appBar: {
        backgroundColor:'black' , 
        height:'130px',
        backgroundColor:'whitesmoke'
    }
});



function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

const useStyles = makeStyles((theme) => ({
    appBar:{
    backgroundColor:'black', 
    height:'130px',
    backgroundColor:'whitesmoke'
    }
  }));


const MainComp = (props) => {
    const classes = useStyles()

    useEffect(async() => {
        let users = await Utils.getAllUsersDB()
        let adminObj = {
            username : "Admin" ,
            password : "12345"
        }
        if(users == false){
        const resp = await Utils.postUserDB(adminObj)
        let users = await Utils.getAllUsersDB()
        let user = users.filter(user=> user.username == "Admin")
        let id = user[0]._id
        let permissionObj = {
            id: id,
            viewSubscriptions: true,
            createSubscriptions: true,
            deleteSubscriptions: true,
            updateSubscriptions: true,
            viewMovies: true,
            createMovies: true,
            deleteMovies: true,
            updateMovie: true
        }
        const permissionsResp = await Utils.postPermissions(permissionObj) 
        const userJsonObj = {
            id: id,
            firstname: "Admin",
            lastname: "Admin",
            createdDate: "15-06-2021",
            sessionTimeOut: 150
        }
        await Utils.postUserJson(userJsonObj)

        
        }
        const id = localStorage.getItem('userId')
        const resp = await UsersUtils.getUserJsonById(id)
        if(resp[0]){
        let time = resp[0].sessionTimeOut * 60000
        setTimeout(function(){ history.push('/') }, time);
        }
        
        sessionStorage.setItem('subscriber','')
    }, [])



    return (
        <div>
            <React.Fragment>
              <CssBaseline />
              <HideOnScroll >
                <AppBar calssName={classes.appBar}>
                  <Toolbar>
                      <div style={{margin:'44%'}}>
                  <img src="https://api.freelogodesign.org/files/d5c8050329474faaa4365bf3623377bf/thumb/logo_200x200.png?v=0" alt="Subscription Web Site" style={{height:'200px', width:'200px',margin:'auto'}}/>
                  </div>
                  </Toolbar>
                </AppBar>
              </HideOnScroll>
              <Toolbar />
            </React.Fragment>
   
            <Switch>
                <Route path='/' exact component={LoginComp}/>
                <Route path='/createaccount' component={CreateAccountComp}/>
                <Route path='/mainpage' component={MainPageComp} />
                

            </Switch>
           
         

        
        </div>
    );
};

export default MainComp;

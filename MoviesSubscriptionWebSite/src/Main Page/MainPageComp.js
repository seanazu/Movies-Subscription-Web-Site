import React, { useEffect, useState } from 'react';
import history from '../history'
import {Route,Link,Switch} from 'react-router-dom'
import UserManagmentComp from '../User Managment/MainComp'
import EditUserComp from '../User Managment/EditUser'
import EditMovieComp from '../Movies/EditMovieComp';
import SubscriptionsComp from '../Subscriptions/MainComp'
import EditSubscriptionComp from '../Subscriptions/EditSubscriptionComp';
import MainComp from '../Movies/MainComp';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root :{
        textAlign:'center'
    }
})


const MainPageComp = () => {
    const[displaySubscriptions, setSubscriptionsDisplay] = useState("unset")
    const[displayMovies, setMoviesDisplay] = useState("unset")
    const[displayUsers, setUsersDisplay] = useState("unset")

    useEffect(async ()=>{
        let username = localStorage.getItem('username')
        history.replace("/mainpage")
        if(username == null){
            history.push("/")
            
        }
    
    let displaySubscriptions = localStorage.getItem('viewSubscriptions')
    setSubscriptionsDisplay(displaySubscriptions)

    let displayMovies = localStorage.getItem('viewMovies')
    setMoviesDisplay(displayMovies)

    setUsersDisplay(localStorage.getItem('viewUsers'))
    console.log("Hello");

    },[])


    return (
        <div style={{textAlign:'center'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          
            
            <Link to="/mainpage/movies" style={{display:displayMovies}} ><Button variant="contained" color="secondary">Movies</Button></Link>{' '}
            <Link to="/mainpage/subscriptions" style={{display:displaySubscriptions}} ><Button variant="contained" color="secondary">Subscriptions</Button></Link>{' '}
            <Link to="/mainpage/userManagment" style={{display:displayUsers}}><Button variant="contained" color="secondary">Users Managment</Button></Link>{' '}
            <Link to="/"><Button variant="contained" color="secondary">Log Out</Button></Link>

            

           

            <Switch>
                <Route path="/mainpage/userManagment" component={UserManagmentComp} />
                <Route path="/mainpage/editUser/:username" component={EditUserComp}/>
                <Route path="/mainpage/movies" component={MainComp} />
                <Route path="/mainpage/editmovie/:id" component={EditMovieComp} />
                <Route path="/mainpage/subscriptions" component={SubscriptionsComp}/>
                <Route path="/mainpage/editSubscription/:id" component={EditSubscriptionComp}/>
            </Switch>

            
        </div>
    );
};

export default MainPageComp;

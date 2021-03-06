import React, { useEffect, useState } from 'react';
import {Route,Link,Switch} from 'react-router-dom'
import UsersComp from './UsersComp'
import AddUserComp from './AddUser'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import history from '../history';



const MainComp = () => {

    useEffect(()=>{
        history.push('/mainpage/userManagment/allUsers')
    },[])

    const useStyles = makeStyles({
        root: {
          background: (props) =>
            props.color === 'red'
              ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: (props) =>
            props.color === 'red'
              ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
              : '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          height: 35,
          padding: '0 30px',
          margin: 8,
        },
      });
      
      function MyButton(props) {
        const { color, ...other } = props;
        const classes = useStyles(props);
        return <Button className={classes.root} {...other} />;
      }
      
      MyButton.propTypes = {
        color: PropTypes.oneOf(['blue', 'red']).isRequired,
      };



    return (
        <div>
            <br/>
            <Link to="/mainpage/userManagment/allUsers">
            <React.Fragment>
               <MyButton color="red"  >All Users</MyButton>
             </React.Fragment>
                </Link>{' '}
            <Link to="/mainpage/userManagment/addUser">
            <React.Fragment>
               <MyButton color="red"  >Add Users</MyButton>
             </React.Fragment>
            </Link>

            <Switch>
                <Route path="/mainpage/userManagment/allUsers" component={UsersComp}/>
                <Route path="/mainpage/userManagment/addUser" component={AddUserComp}/>
            </Switch>
            
        </div>
    );
};

export default MainComp;
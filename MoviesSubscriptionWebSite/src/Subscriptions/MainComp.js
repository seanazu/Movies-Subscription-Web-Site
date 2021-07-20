import React, { useEffect, useState } from 'react';
import SubscriptionsComp from './SubscriptionsComp'
import AddSubscriptionComp from './AddSubscriptionComp'
import { Link, Route, Switch } from 'react-router-dom';
import history from '../history';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';





const MainComp = () => {
    const[displayAddSubscriber, setAddSubscriberDisplay]=useState("")
    
    useEffect(() =>{
        history.push("/mainpage/subscriptions/allSubscriptions")
        setAddSubscriberDisplay(localStorage.getItem('createSubscriptions'))
    }, [])

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
        <div style={{fontFamily:'Trebuchet MS,sans-serif'}}>
            <br/>
            <br/>
           
            <Link to="/mainpage/subscriptions/allSubscriptions" onClick={()=>sessionStorage.setItem('subscriber','')}>
            <React.Fragment>
               <MyButton color="red" >All Subscriptions</MyButton>
             </React.Fragment>
                </Link>{' '}
            <Link to="/mainpage/subscriptions/addSubscriptions" style={{display:displayAddSubscriber}} >
            <React.Fragment>
               <MyButton color="red" >Add Subscription</MyButton>
             </React.Fragment>
            </Link>

            <Switch>
                <Route path="/mainpage/subscriptions/allSubscriptions" component={SubscriptionsComp}/>
                <Route path="/mainpage/subscriptions/addSubscriptions" component={AddSubscriptionComp}/>
            </Switch>
            
        </div>
    );
};

export default MainComp;
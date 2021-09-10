import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      marginRight:'-40%',
      marginTop:'-20%' ,
      border:'1px solid #eee'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const SubscriptionsWatched = (props) => {
    const classes = useStyles();
    const[subscribers,setSubscribers] = useState([])
    const[id, setId] = useState("")

    useEffect(()=>{
        setId(props.id)
    })

    useEffect(async()=>{
        console.log();
        let subscribers = await SubscriptionsUtils.getAllSubscriptions()
        let idArray = []
        let id = props.id
        subscribers.map(item =>{
            item.movies.map(element=>{
                if(element.movieId == id){
                    idArray.push(item._id)
                }
            })
            
        })
       

        let members = await SubscriptionsUtils.getAllMembers()
        let nameArray = []
        members.map(member =>{
            idArray.map(id=>{
                if(id == member._id){
                    nameArray.push(member.fullname)
                }

            })
        })
        let Array = [...new Set(nameArray)]
        setSubscribers(Array)
       
       
        
        
    },[id])

    let names = subscribers.map((name,index)=>{

        return(
            <div key={index}>
                Subscriber : 
            <Link to="/mainpage/subscriptions" onClick={()=>sessionStorage.setItem('subscriber',name)}>
            <Button variant="outlined" color="primary" style={{fontFamily:'sans serif',fontSize:'x-small',backgroundColor:'whitesmoke'}}  >{name}</Button>{' '}
            </Link>
            </div>
        )
    })



    return (
        <div>
            
          <Card className={classes.root} >
           <span style={{fontSize:'x-large'}}>Subscribers :</span><CardContent>
              <Typography className={classes.title} color="textSecondary" >
              {names}
              </Typography>
            </CardContent>
          </Card>
        <br/><br/><br/>
            
        </div>
        
    );
};

export default SubscriptionsWatched;

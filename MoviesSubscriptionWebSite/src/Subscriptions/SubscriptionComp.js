import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import MoviesWatched from './MoviesWatched';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
  media: {
    height: 140,
  },
});

const SubscriptionComp = (props) => {
    const classes = useStyles();
    const[member, setMember]= useState({})
    const[displayDelete,setDeleteDisplay] = useState((""))
    const[displayEdit,setEditDisplay] = useState((""))

    useEffect(async() =>{
        let member = await SubscriptionsUtils.getMemberById(props.id)
        setMember(member)
        setDeleteDisplay(localStorage.getItem('deleteSubscriptions'))
        setEditDisplay(localStorage.getItem('updateSubscriptions'))
        
    },[])
 

    const deleteMember = async ()=>{
        let resp = await SubscriptionsUtils.deleteMember(props.id)
        alert(resp)
        history.push('/mainpage/subscriptions/allSubscriptions')
    }
  

    return (
        <div>
            <table style={{margin:'auto', display:props.display}}>
                <tbody>
                    <tr>
                        <td>
                            <Card className={classes.root} style={{width:'450px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                               <CardContent>
                                 <Typography gutterBottom variant="h5" component="h2">
                                   {member.fullname}
                                 </Typography>
                                 <Typography variant="body2" color="textSecondary" component="p">
                                 City:{member.city}
                                 </Typography>
                                 <MoviesWatched id={props.id} member={props.member.fullname}  />
                               </CardContent>
                             <CardActions style={{margin:'auto', display:props.display}}>
                             <Link to={`/mainpage/editSubscription/${member._id}`}  style={{display:displayEdit}}><Button variant="contained" color="primary"> Edit</Button></Link>{' '}
                             <Button variant="contained" color="primary" style={{display:displayDelete}} onClick={deleteMember}> Delete</Button><br/>
                             </CardActions>
                           </Card>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <br/>
        </div>
    );
};

export default SubscriptionComp;
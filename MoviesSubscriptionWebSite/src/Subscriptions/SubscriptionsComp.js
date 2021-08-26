import React, { useEffect, useState } from 'react';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import SubscriptionComp from './SubscriptionComp';


const SubscriptionsComp = () => {
    const[members , setMembers] = useState([])
    const[subscriptions, setSubscriptions] = useState([])
    const[findSubscriber,setfindSubscriber] = useState("")


    useEffect(async()=>{
      let members = await SubscriptionsUtils.getAllMembers()
      setMembers(members) 
      let subscriptions = await SubscriptionsUtils.getAllSubscriptions()
      setSubscriptions(subscriptions)
      let subscriber = sessionStorage.getItem('subscriber')
      setfindSubscriber(subscriber)
      

    },[])

    let obj = members.map((item,index)=>{
        let display = "none"
        let name = item.fullname
            if(name.includes(findSubscriber)){
                display ="table"
            }
       return (
        <SubscriptionComp key={index} display={display} id={item._id} member={item} removeMember={() => setMembers(members.filter((u) => u._id !== item._id))}
         renderSubscription={() => setSubscriptions(subscriptions.filter((u) => u._id !== item._id))} />
       ) 
    })
    return (
        <div>
            <br/>
            {obj}
        </div>
    );
};

export default SubscriptionsComp;
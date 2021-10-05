import React, { useEffect, useState } from 'react';
import SubscriptionsUtils from '../Utils/SubscriptionsUtils';
import SubscriptionComp from './SubscriptionComp';


const SubscriptionsComp = () => {
    const[members, setMembers] = useState([])
    const[subscriptions, setSubscriptions] = useState([])
    const[findSubscriber,setfindSubscriber] = useState("")


    useEffect(async()=>{
      const members = await SubscriptionsUtils.getAllMembers()
      setMembers(members) 
      const subscriptions = await SubscriptionsUtils.getAllSubscriptions()
      setSubscriptions(subscriptions)
      const subscriber = sessionStorage.getItem('subscriber')
      setfindSubscriber(subscriber)
    },[])

    const obj = members.map((item,index)=>{
        let display = "none"
        const name = item.fullname
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

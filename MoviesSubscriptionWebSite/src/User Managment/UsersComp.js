import React, { useEffect, useState } from 'react';
import UserUtils from '../Utils/UsersUtils'
import UserComp from './UserComp'


const MainComp = () => {
    const[userDB , setUserDB] = useState([])


    useEffect(async()=>{
      let users = await UserUtils.getAllUsersDB()
      setUserDB(users) 

    },[])

    
    let obj = userDB.map((item,index)=>{
       return (
        <UserComp key={index} username={item.username} removeUser={() => setUserDB(userDB.filter((u) => u._id !== item._id))} displayUser/>
       ) 
    })

    return (
        <div >
             <br/><br/>
            {obj} 
        </div>
    );
};

export default MainComp;
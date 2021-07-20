import axios from "axios";

const getAllMembers = async () =>{
    let resp = await axios.get("http://localhost:3001/members")
    return resp.data
  }
  const getMemberById = async (id) =>{
    let resp = await axios.get(`http://localhost:3001/members/${id}`)
    return resp.data
  }
  const postMember = async (obj) =>{
    let resp = await axios.post(`http://localhost:3001/members`,obj)
    return resp.data
  }
  const putMember = async (id,obj) =>{
      let resp = await axios.put(`http://localhost:3001/members/${id}`,obj)
      return resp.data
  }
  const deleteMember = async (id) =>{
      let resp = await axios.delete(`http://localhost:3001/members/${id}`)
      return resp.data
  }

  
const getAllSubscriptions = async () =>{
    let resp = await axios.get("http://localhost:3001/subscribers")
    return resp.data
  }
  const getSubscriptionById = async (id) =>{
    let resp = await axios.get(`http://localhost:3001/subscribers/${id}`)
    return resp.data
  }
  const postSubscription = async (obj) =>{
    let resp = await axios.post(`http://localhost:3001/subscribers`,obj)
    return resp.data
  }
  const putSubscription = async (id,obj) =>{
      let resp = await axios.put(`http://localhost:3001/subscribers/${id}`,obj)
      return resp.data
  }
  const deleteSubscription = async (id) =>{
      let resp = await axios.delete(`http://localhost:3001/subscribers/${id}`)
      return resp.data
  }

  

export default {getAllMembers,getMemberById,postMember,putMember,deleteMember,getAllSubscriptions,getSubscriptionById,postSubscription,putSubscription,deleteSubscription}
  
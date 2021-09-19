import axios from "axios";

const getAllMembers = async () =>{
    const resp = await axios.get("http://localhost:3001/members")
    return resp.data
  }
  const getMemberById = async (id) =>{
    const resp = await axios.get(`http://localhost:3001/members/${id}`)
    return resp.data
  }
  const postMember = async (obj) =>{
    const resp = await axios.post(`http://localhost:3001/members`,obj)
    return resp.data
  }
  const putMember = async (id,obj) =>{
      const resp = await axios.put(`http://localhost:3001/members/${id}`,obj)
      return resp.data
  }
  const deleteMember = async (id) =>{
      const resp = await axios.delete(`http://localhost:3001/members/${id}`)
      return resp.data
  }

  
const getAllSubscriptions = async () =>{
    const resp = await axios.get("http://localhost:3001/subscribers")
    return resp.data
  }
  const getSubscriptionById = async (id) =>{
    const resp = await axios.get(`http://localhost:3001/subscribers/${id}`)
    return resp.data
  }
  const postSubscription = async (obj) =>{
    const resp = await axios.post(`http://localhost:3001/subscribers`,obj)
    return resp.data
  }
  const putSubscription = async (id,obj) =>{
      const resp = await axios.put(`http://localhost:3001/subscribers/${id}`,obj)
      return resp.data
  }
  const deleteSubscription = async (id) =>{
      const resp = await axios.delete(`http://localhost:3001/subscribers/${id}`)
      return resp.data
  }

  

export default {getAllMembers,getMemberById,postMember,putMember,deleteMember,getAllSubscriptions,getSubscriptionById,postSubscription,putSubscription,deleteSubscription}
  

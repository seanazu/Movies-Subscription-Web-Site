import axios from 'axios'

const getAllUsersDB = async () =>{
  const resp = await axios.get("http://localhost:3001/user-DB")
  return resp.data
}
const getUserDbById = async (id) =>{
  const resp = await axios.get(`http://localhost:3001/user-DB/${id}`)
  return resp.data
}
conconstst postUserDB = async (obj) =>{
  const resp = await axios.post(`http://localhost:3001/user-DB`,obj)
  return resp.data
}
const putUserDB = async (id,obj) =>{
    const resp = await axios.put(`http://localhost:3001/user-DB/${id}`,obj)
    return resp.data
}
const deleteUserDB = async (id) =>{
    const resp = await axios.delete(`http://localhost:3001/user-DB/${id}`)
    return resp.data
}


const getAllUsersJson = async () =>{
    const resp = await axios.get("http://localhost:3001/user-json")
    return resp.data
  }
  const getUserJsonById = async (id) =>{
    const resp = await axios.get(`http://localhost:3001/user-json/${id}`)
    return resp.data
  }
  const postUserJson = async (obj) =>{
    const resp = await axios.post(`http://localhost:3001/user-json`,obj)
    return resp.data
  }
  const putUserJson = async (id,obj) =>{
      const resp = await axios.put(`http://localhost:3001/user-json/${id}`,obj)
      return resp.data
  }
  const deleteUserJson = async (id) =>{
      const resp = await axios.delete(`http://localhost:3001/user-json/${id}`)
      return resp.data
  }


  const getAllPermissions = async () =>{
    const resp = await axios.get("http://localhost:3001/permissions")
    return resp.data
  }
  const getPermissionsById = async (id) =>{
    const resp = await axios.get(`http://localhost:3001/permissions/${id}`)
    return resp.data
  }
  const postPermissions = async (obj) =>{
    const resp = await axios.post(`http://localhost:3001/permissions`,obj)
    return resp.data
  }
  const putPermissions = async (id,obj) =>{
      const resp = await axios.put(`http://localhost:3001/permissions/${id}`,obj)
      return resp.data
  }
  const deletePermission = async (id) =>{
      const resp = await axios.delete(`http://localhost:3001/permissions/${id}`)
      return resp.data
  }
  

  export default { getAllUsersDB,getUserDbById,postUserDB,putUserDB,deleteUserDB,getAllUsersJson,getUserJsonById,postUserJson,putUserJson,deleteUserJson,getAllPermissions,getPermissionsById,postPermissions,putPermissions,deletePermission}

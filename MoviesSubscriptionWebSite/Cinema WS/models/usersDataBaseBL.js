const Users = require('../schemas/usersSchema')


const getAllUsers = () =>{
    return new Promise ((resolve,reject) =>{
        Users.find({},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const getUserById = (id) =>{
    return new Promise((resolve,reject) =>{
        Users.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const createNewUser = (newUser) =>{
    return new Promise((resolve,reject) =>{
        let user = new Users ({
            username : newUser.username ,
            password: newUser.password
        })

        user.save((err)=>{
            if(err){
                reject(err)
            }else{
                resolve("User Created")
            }
        })
    })
}


const updateUser = (id,updatedData) =>{
    return new Promise ((resolve,reject) =>{
        Users.findByIdAndUpdate(id,{
            username : updatedData.username ,
            password: updatedData.password
        },(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("User Updated")
            }
        })
    })
}

const deleteUser = (id) =>{
    return new Promise ((resolve,reject) =>{
        Users.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("User deleted")
            }
        })
    })
}




module.exports = {getAllUsers,getUserById,createNewUser,updateUser,deleteUser}
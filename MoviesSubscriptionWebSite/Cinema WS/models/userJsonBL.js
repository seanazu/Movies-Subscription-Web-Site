const jfile = require('jsonfile')
var fs = require("fs");
const { resolve } = require('path');
var file_content = fs.readFileSync('./Users.json');
var json = JSON.parse(file_content);


const getAllUsers = () =>{
    return new Promise((resolve, reject) =>{
        jfile.readFile('./Users.json',(err,data) =>{
            if(err) {
                reject(err)
            }else{
                resolve(data.users)
            }
        })
    })
}

const getUserById = (id) => {
        return new Promise((resolve,reject)=>{
            jfile.readFile('./Users.json',(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sortedByID = data.users.filter(item=> item.id == id)
                    resolve(sortedByID)
                }
            })
        })
}

const createUser = (obj) => {
    let jsonFile = json
    let users = jsonFile.users
    let response = "User Already In The System"
    let user = users.filter(item=>item.id == obj.id)
    if(user == true){
        console.log(response)
    }else if (user == false){
        jsonFile.users.push(obj)
        response="User Created"
    }
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Users.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve(response)
            }
        })
       
     })

    
    
}

const updateUser = (id,obj) =>{
    let newUsersArray = []
    let jsonFile = json
    json.users.map(item =>{ 
        if(item.id == id){
            item = obj
        }
        newUsersArray.push(item)
        return newUsersArray
    }) 
    jsonFile.users = newUsersArray ;
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Users.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("User Updated")
            }
        })
    } ) 

} 

const deleteUser = (id) =>{
    let jsonFile = json
    let users = jsonFile.users
    let newUsers = users.filter(item=>item.id != id)
    jsonFile.users = newUsers
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Users.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("Permission Deleted")
            }
        })
    } ) 

}






module.exports = {getAllUsers,getUserById,createUser,updateUser,deleteUser}
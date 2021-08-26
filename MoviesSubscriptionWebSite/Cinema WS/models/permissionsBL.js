const jfile = require('jsonfile')
var fs = require("fs");
const { resolve } = require('path');
var file_content = fs.readFileSync('./Permissions.json');
var json = JSON.parse(file_content);


const getAllPermissions = () =>{
    return new Promise((resolve, reject) =>{
        jfile.readFile('./Permissions.json',(err,data) =>{
            if(err) {
                reject(err)
            }else{
                resolve(data.permissions)
            }
        })
    })
}

const getPermissionsById = (id) => {
        return new Promise((resolve,reject)=>{
            jfile.readFile('./Permissions.json',(err,data)=>{
                if(err){
                    reject(err);
                }
                else{
                    let sortedByID = data.permissions.filter(item=> item.id == id)
                    resolve(sortedByID)
                }
            })
        })
}

const createPermission = (obj) => {
    const jsonFile = json
    const permissions = jsonFile.permissions
    const response = "Permission Already In The System"
    const newPermissions = permissions.filter(item=>item.id == obj.id)
    if(newPermissions == true){
        console.log(response)
    }else if (newPermissions == false){
        jsonFile.permissions.push(obj)
        response="Permission Created"
    }
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Permissions.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve(response)
            }
        })
       
     })

    
    
}

const updatePermission = (id,obj) =>{
    const newPermissionArray = []
    const jsonFile = json
    json.permissions.map(item =>{ 
        if(item.id == id){
            item = obj
        }
        newPermissionArray.push(item)
        return newPermissionArray
    }) 
    jsonFile.permissions = newPermissionArray ;
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Permissions.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("Permission Updated")
            }
        })
    } ) 

} 

const deletePermission = (id) =>{
    const jsonFile = json
    const permissions = jsonFile.permissions
    const newPermissions = permissions.filter(item=>item.id != id)
    jsonFile.permissions = newPermissions
    return new Promise((resolve, reject)=>{
        fs.writeFile('./Permissions.json',JSON.stringify(jsonFile),(err)=>{
            if(err){
                reject(err)
            }else {
                resolve("Permission Deleted")
            }
        })
    } ) 

}








module.exports = {getPermissionsById,getAllPermissions,createPermission,updatePermission,deletePermission}

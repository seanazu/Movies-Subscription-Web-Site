

const Member = require('./Schemas/membersSchema') ;
const fetch = require ('node-fetch') ;


const loadMembersData = async () =>{
   let resp = await fetch('https://jsonplaceholder.typicode.com/users') ;
   if(resp.ok){
       let users = await resp.json() 
       return new Promise ((resolve,reject) =>{
        users.forEach(element => {
        let member = new Member ({
            fullname:element.name,
            email:element.email ,
            city : element.address.city 

        })
        member.save((err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Member Created")
            }
        })

       });  

       })
       
   }
}

const checkIfDataWasUploaded = async () =>{
    return new Promise((resolve,reject) =>{
        Member.find({},(err,data) =>{
            if(err){
                reject(err)
            }else{
                if(data==false){
                    loadMembersData() 
                }
            }
        })
    })
}
checkIfDataWasUploaded()

const getAllMembers = () =>{
    return new Promise ((resolve,reject) =>{
        Member.find({},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const getMemberById = (id) =>{
    return new Promise((resolve,reject) =>{
        Member.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

const createNewMember = (newMember) =>{
    return new Promise((resolve,reject) =>{
        let member = new Member ({
            fullname:newMember.fullname,
            email:newMember.email ,
            city : newMember.city 

        })

        member.save((err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Member Created")
            }
        })
    })
}

const updateMember = (id,updatedData) =>{
    return new Promise ((resolve,reject) =>{
        Member.findByIdAndUpdate(id,{
           fullname:updatedData.fullname,
           email: updatedData.email ,
           city : updatedData.city
        },(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("Member Updated")
            }
        })
    })
}

const deleteMember = (id) =>{
    return new Promise ((resolve,reject) =>{
        Member.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Member deleted")
            }
        })
    })
}




module.exports = {getAllMembers,getMemberById,createNewMember,updateMember,deleteMember}
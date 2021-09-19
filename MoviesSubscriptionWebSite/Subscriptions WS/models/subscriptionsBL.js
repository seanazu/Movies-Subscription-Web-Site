const Subscription = require('./Schemas/subscriptions_DB_Schema')


const getAllSubscribers = () =>{
    return new Promise ((resolve,reject) =>{
        Subscription.find({},(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const getSubscriberById = (id) =>{
    return new Promise((resolve,reject) =>{
        Subscription.findById(id,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}


const createNewSubscriber = (newSubscription) =>{
    return new Promise((resolve,reject) =>{
        const subscriber = new Subscription (newSubscription)
        subscriber.save((err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Subscription Accomplished")
            }
        })
    })
}


const updateSubscriber= (id,updatedData) =>{
    return new Promise ((resolve,reject) =>{
        Subscription.findByIdAndUpdate(id,updatedData,(err) =>{
            if(err){
                reject(err)
            }else{
                resolve("Subscriber Updated")
            }
        })
    })
}

const deleteSubscriber = (id) =>{
    return new Promise ((resolve,reject) =>{
        Subscription.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve("Subscriber deleted")
            }
        })
    })
}




module.exports = {getAllSubscribers,getSubscriberById,createNewSubscriber,updateSubscriber,deleteSubscriber}

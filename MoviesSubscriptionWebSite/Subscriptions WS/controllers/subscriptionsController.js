const express = require('express') ;
const Router = express.Router() ;
const subscriptionBL = require('../models/subscriptionsBL') ;

Router.route('/').get(async(req,resp) =>{
    let subscribers = await subscriptionBL.getAllSubscribers() 
    return resp.json(subscribers)
})

Router.route('/:id').get(async(req,resp) =>{
    let id = req.params.id 
    let subscriber = await subscriptionBL.getSubscriberById(id) ;
    return resp.json(subscriber)
})

Router.route('/').post(async(req,resp) =>{
    let obj = req.body 
    let newSubscriber = await subscriptionBL.createNewSubscriber(obj);
    return resp.json(newSubscriber) 
})

Router.route('/:id').put(async(req,resp) =>{
    let id = req.params.id 
    let newData = req.body 
    let response = await subscriptionBL.updateSubscriber(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async(req,resp) =>{
    let id = req.params.id 
    let response = await subscriptionBL.deleteSubscriber(id) 
    return resp.json(response)

})

module.exports = Router
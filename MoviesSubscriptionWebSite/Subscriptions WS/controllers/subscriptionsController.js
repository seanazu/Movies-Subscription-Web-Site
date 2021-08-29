const express = require('express') ;
const Router = express.Router() ;
const subscriptionBL = require('../models/subscriptionsBL') ;

Router.route('/').get(async(req,resp) =>{
    const subscribers = await subscriptionBL.getAllSubscribers() 
    return resp.json(subscribers)
})

Router.route('/:id').get(async(req,resp) =>{
    const id = req.params.id 
    const subscriber = await subscriptionBL.getSubscriberById(id) ;
    return resp.json(subscriber)
})

Router.route('/').post(async(req,resp) =>{
    const obj = req.body 
    const newSubscriber = await subscriptionBL.createNewSubscriber(obj);
    return resp.json(newSubscriber) 
})

Router.route('/:id').put(async(req,resp) =>{
    const id = req.params.id 
    const newData = req.body 
    const response = await subscriptionBL.updateSubscriber(id,newData) 
    return resp.json(response) 
})

Router.route('/:id').delete(async(req,resp) =>{
    const id = req.params.id 
    const response = await subscriptionBL.deleteSubscriber(id) 
    return resp.json(response)

})

module.exports = Router

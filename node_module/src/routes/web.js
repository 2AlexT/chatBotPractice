const { clearCache } = require('ejs');
const express = require('express');
const chatBotController = require('../controllers/chatBotController');
const homepageController = require('../controllers/homepageController')

const router= express.Router({mergeParams:true});

const initWebRoutes = (app)=>{
    router.get('/', homepageController.getHomepage);
    router.get('/webhook', chatBotController.getWebHook);
    router.post('/webhook', chatBotController.postWebHook);
    return app.use("/", router);
};
module.exports= initWebRoutes;
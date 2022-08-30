const express = require('express');
const homepageController = require('../controllers/homepageController')

const router= express.Router({mergeParams:true});

const initWebRoutes = (app)=>{
    router.get('/', homepageController.getHomepage);
    return app.use("/", router);
};
module.exports= initWebRoutes;
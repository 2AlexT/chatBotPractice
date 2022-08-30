const bodyParser = require('body-parser');
const express= require('express');
const viewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/web')



const app = express();
// config viewEngine
    viewEngine(app);

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//init all web routes
    initWebRoutes(app)

let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`app runnning from the port ${port}`);
})



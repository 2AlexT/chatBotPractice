
let postWebHook = (req,res) =>{
    let body = req.body;

    //Check this is an event from a page subscription
    if (body.object === 'page'){
        //iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry){

            //Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index
            let webhoook_event = entry.messaging[0];
            console.log(webhoook_event); 
        });
        //return a 200 ok

        res.status(200).json({
            status:'success',
            message:'evento recibido'
        })


    } else{
        //return a 404
        res.stats(404).json({
            status:'success',
            message:'evento no recibido 404'
        });
    }
}
let getWebHook =(req,res)=>{
    //verify token
    let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;
    //parse the query name
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    //check if token and mode is in string
    if(mode && token){
        //checks the mode and token set is correct
        if(mode === 'subscribe' && token === VERIFY_TOKEN){
            //responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
    }
}
module.exports={
    postWebHook:postWebHook,
    getWebHook : getWebHook
}   
const request = require('request');
let postWebHook = (req,res) =>{
    let body = req.body;

    //Check this is an event from a page subscription
    if (body.object === 'page'){
        //iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry){
            //get the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            //get the sender psid
            let sender_psid = webhook_event.sender.id;
            console.log('sender PSID:' + sender_psid);

            //check if the event is a message or postback
            //pass the event to apropiate handler
            if(webhook_event.message){
                handleMessage(sender_psid, webhook_event.message);
            }else if(webhook_event.postback){
                handlePostback(sender_psid, webhook_event.postback)
            }

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

//handles messages events
function handleMessage(sender_psid, received_message){
    let response;
    //check if the message contains text
    if(received_message.text){
        //create the payload for a basic message
        response = {
            "text": `Enviaste un mensaje: "${received_message.text}"Ahora enviame a post`
        }
    }
    //sends the response message
    callSendAPI(sender_psid,response);
}
//hanldes messaging postabcks events
function handlePostback(sender_psid, received_postback){

}

//sends responses messages via the send api
function callSendAPI(sender_psid, response){
    //construct the message body
    let request_body={
        "recipient":{
            "id":sender_psid
        },
        "message":response
    };
    //send the HTTP request to the messenger platform
    request({
        "url":"https://graph.facebook.com/v6.0/me/messages",
        "qs":{"access_token":process.env.FB_PAGE_TOKEN},
        "method":"POST",
        "json": request_body
    },(err,res,body)=>{
        if(!err){
            console.log("message enviado");
            console.log(`My mensaje ${response}`)
        }else{
            console.error("no se pudo conectar" + err);
        }
    })
}

module.exports={
    postWebHook:postWebHook,
    getWebHook : getWebHook
}   
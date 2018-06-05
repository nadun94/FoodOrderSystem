module.exports = function (app) {
    var config = require('../config.js');
var twilio = require('twilio');
    var client = twilio(config.Twilio_sid, config.Twilio_token);


    //get pin 

    app.route('/get-pin')
        .post(function (req, res) {
          let oriPin =  Math.floor((Math.random() * 10000) + 1)
            console.log(req.body.phone)
                client.messages.create({
                    body:'Hi, welocome to food order portal, your pin is '+oriPin,
                    to:req.body.phone,
                    from:'+13182259810 '
                   
            
                },(err,data)=>{
                    if(err){
                        console.log("Error sending pin ",err);
                        res.send({"message":err})
                    }
                    else{
                        console.log(data)
                        res.send(JSON.stringify({"message":"We have sent a sms with a pin to your mobile.","OriPin":oriPin}))
                    }
                })
        })






}
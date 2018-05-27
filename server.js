const express = require('express');
const BodyParser = require('body-parser');
const config = require('./Server/config.js');
const  app = express();

// app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());

require('./Server/OrderService/Controller/order.Router')(app);
   

app.listen(config.PORT,(err)=>{
    if(err){
        console.log('Error connecting to the server.');
    }
    else{
        console.log('Successfully connected to the port '+ config.PORT);
    }
   

});
const express = require('express');
const BodyParser = require('body-parser');
const config = require('./Server/config.js');
const  app = express();
const mongoose = require('mongoose');

// app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());
// 
app.use('/',express.static('./food-client/build/'));

require('./Server/OrderService/Controller/order.Router')(app);
   
require('./Server/PayViaphone/dialog.js')(app);
require('./Server/AuthService/Auth')(app);
app.listen(config.PORT,(err)=>{
    if(err){
        console.log('Error connecting to the server.');
    }
    else{
        console.log('Successfully connected to the port '+ config.PORT);
    }
   

});

mongoose.connect('mongodb://localhost:27017/Food_order_db', (err) => {
    if (err) {
        console.log('Error connecting to mongodb')
    }
    console.log('Database connection successfull')
})
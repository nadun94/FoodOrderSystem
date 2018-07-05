const express = require('express')
const mongoose = require('mongoose')
const app = express();


require('./bnkRoute.js')(app)
mongoose.connect('mongodb://localhost:27017/SampathBank', (err) => {
    if (err) {
        console.log('Error connecting to BankDB')
    }
    console.log('Database connection successfull')
})

app.listen(4000);


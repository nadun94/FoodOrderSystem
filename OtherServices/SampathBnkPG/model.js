
const mongoose = require('mongoose');
    Schema = mongoose.Schema;

const CreditCardSchema  = new Schema({
    card_hoder_name: { type:String, required:true },
    Card_number: { type:Number, required:true },
    cvc: { type:Number, required:true },
    amount: { type:Number, required:true },

})

module.exports = mongoose.model('CreditCard', CreditCardSchema);
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const FoodSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const OrderSchema = new schema({
    list: [{
        foodName: {
            type: String,
        },
        qty: {
            type: Number,
            // default:Date.now.toString()
        },
        subTotal: {
            type: Number,
        }
    }],
    totalPrice: {
        type: Number,
        require: true
    },
    payment_method: { type: String,
        enum:["credit_card","pay_by_phone"]
     },
    credit_card: {
        cardNo: { type: Number },
        cvc: {
            type: Number
        }
        ,
        CardHolderName: {
            type: String
        }

    },

    pay_by_phone: {
        phone: {
            type: Number
        },
        pin: {
            type: Number,

        }
    }





});

mongoose.model('Food', FoodSchema)
mongoose.model('Orders', OrderSchema)

mongoose.connect('mongodb://localhost:27017/Food_order_db', (err) => {
    if (err) {
        console.log('Error connecting to mongodb')
    }
    console.log('Database connection successfull')
})

module.exports = mongoose;
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } , phone: {
        type: String,
        required: true
    },  email: {
        type: String,
        required: true
    }
});


mongoose.model('FoodUser', UserSchema)


module.exports = mongoose;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Name field is required'],
        
    },
    business_license_number:{
        type:String,
        required: false
    },
    create_data:{
        type: Date,
        default: Date.now
    }
    
})

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = {Customer}
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const BeauticianSchema = new Schema({
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

const Beautician = mongoose.model('Beautician', BeauticianSchema);
module.exports = {Beautician}
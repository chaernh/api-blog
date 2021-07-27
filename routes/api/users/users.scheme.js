const { Schema, model } = require('../../../db.config')
const scheme = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['admin', 'premium_member', 'member'],
        default: 'member'
    }
    // role: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Roles', select:true
    // },
}, 
{
    timestamps: true
});

module.exports = model('Users', scheme, 'users')
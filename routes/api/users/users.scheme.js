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
    displayName:{
        type: String,
        required: false,
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
        type: Schema.Types.ObjectId,
        ref: 'Roles', select:true
    },
}, 
{
    timestamps: true
});

module.exports = model('Users', scheme, 'users')
const { Schema, model } = require('../../../db.config')
const scheme = new Schema({
    // category:{
    //     type: String,
    //     required: true
    // },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'Users', select:true
    },
}, 
{
    timestamps: true
});

module.exports = model('Posts', scheme, 'posts')
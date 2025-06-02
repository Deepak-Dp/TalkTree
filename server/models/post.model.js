const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({

    text: {
        type: String,

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image:{
        type: String,
        default: ''
    },

    like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    comments:[
        {
            text:{
                type: String,

            },
            UserId:{
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User'
            },
            username: {
               type: String,
               default: ''
            },
            name:{
                type: String,
               default: ''
            },
            image:{
             type: String,
               default: ''
            }
        }
    ]


},{timestamps: true})


const Post = mongoose.model('Post', postSchema)

module.exports = Post
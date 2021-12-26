/*
{
    id: Primary key,
    created_at: Date,
    text: String,
    title: String,
    user: {
    firstName: String,
        id: Key,
        image: String,
        middleName: String,
        surName: String,
        username: String
}
}*/
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema(
    {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        user: {
            firstName: {type: String},
            image: {type: String},
            middleName: {type: String},
            surName: {type: String},
            userName: {type: String},
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
)
// newsSchema.set('timestamps', true)

const News = mongoose.model('news', newsSchema)

module.exports = News

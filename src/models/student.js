const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    courses: [
        {
            type: String,
            ref: 'Course'
        }
    ]
},
{
    timestamps:true,
    toJSON: {
        virtuals: true
    }
})

schema.virtual('full name').get(function(){
    return `${this.firstName} ${this.lastName}`
})
//这里callback function必须用regular function，因为要调用this

const StudentModel = model('Student', schema)

module.exports = StudentModel
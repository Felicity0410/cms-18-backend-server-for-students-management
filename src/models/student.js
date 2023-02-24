const { Schema, model } = require('mongoose')
const Joi = require('joi')

const schema = new Schema({
    firstName: {
        type: String,
        minLength: 2,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
            validator: (email) => {
                // const validation = Joi.string().email().validate(email)
                // const { error } = validation
                // if(error) {
                //     return false
                // }
                // return true

                return !Joi.string().email().validate(email).error
            },
            msg:'Invalid email format'
        }
    ]
    },
    courses: [
        {
            type: String,
            ref: 'Course'
        }
    ],
    likeCourses: [
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
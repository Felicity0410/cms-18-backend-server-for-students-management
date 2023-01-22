const { Schema, model } = require('mongoose')

//_id: string, name, description, students
//course code: ENGG1001
module.exports = model('Course', new Schema({
    _id: {
        type: String,
        uppercase: true,
        alias:'code', //create virtual property -> code
    },
    name: {
        type: String,
        required: true,
        // select:false //不会返回
    },
    description: {
        type: String,
        default: 'this is a description'
    }, 
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
},
   {
    toJSON:{
        versionKey: false
    }
  }
 )
)
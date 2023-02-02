const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//不能写arrow function，因为要用this定位到具体的document的对象是什么
//hash是异步函数，所以加await，进行12轮的hash，进行的轮数越多，意味着花更多的
//时间尽心计算，该数字是根据当前的算力来的
schema.methods.hashPassword = async function () {
    //check if password has been hashed
    //因为这里只是在添加用户的使用，所以不用做检测，如果单独使用
    //那么要检验，原始密码是否被hash过，否则会重复hash
    this.password = await bcrypt.hash(this.password, 12)
}

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
//用户输入的password放在前面，document里存的password放在后面，顺序不可变
//盐是自动被bcrypt加进来的

module.exports = model(
    'User',
    schema 
    )


//通过UserModel生成的函数都会调用
//也可以在utils里创建hassPassword 

const mongoose = require('mongoose')

const connectToDB = () => {
    //DB_HOST, DB_PORT, DB_PASSWORD
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
        console.error('connect string is undefined');
        //进程的退出
        //正常退出：程序运算完毕退出
        //非正常退出：程序出现问题退出
        //人为正常退出 process.exit(0)，除了零以外的所有数字都是非正常退出
        //人为非正常退出
        process.exit(1)
    }

    const db = mongoose.connection

    db.on('connected', () => {
        //logger.info
        //mongodb://user:password@XXXX.com
        console.log(`DB connected, ${connectionString}`);
    })
    db.on('error', (error) => {
        console.log(error);
        process.exit(2)
    })
    db.on('disconnected', () => {
        console.log('db disconnected');
    })
    return mongoose.connect(connectionString)
}

// connectToDB().then().catch()

module.exports = connectToDB
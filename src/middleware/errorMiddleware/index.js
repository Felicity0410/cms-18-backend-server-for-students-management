

const documentNotFoundError = require('./documentNotFoundError');
const jwtValidationError = require('./jwtValidationError');
const validationError = require('./validationError');

module.exports = (app) => {
    app.use(validationError)
    app.use(documentNotFoundError)
    app.use(jwtValidationError)
    app.use((error, req, res, next) => {
    console.error({req, error});
    res
    .status(500)
    .json({error: 'something bad happened, please try again'})
})
}


// module.exports = (error, req, res, next) => {
    
    //通过断点模式，查看是什么错误，通过不同错误类型，然后进行不同的错误返回
    //但是Joi提供的基本错误信息是general的， 所以要通过prototype原型链往上找
    // if(error.name === 'ValidationError') {
    //     res.status(400).json(process.env.NODE_ENV === 'dev' ?
    //         error : {error: error.message} )
    //     return
    // }

//     console.error({ req, error });

//     res
//     .status(500)
//     .json({ error: 'Something bad happened, please try again later' }) 
// }

//debug mode


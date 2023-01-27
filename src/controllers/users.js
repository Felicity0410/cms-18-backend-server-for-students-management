const UserModel = require('../models/user')
const Joi = require('joi')



const register = async (req, res) => {

    const schema = Joi.object({
        username: Joi.string().min(2).message('Invalid username format').required(),
        password: Joi.string().regex(/^[a-zA-Z]+[0-9]+$/).message('Invalid password format').required()
    })

    const { username, password } = await schema.validateAsync(req.body, {
        allowUnknown:true,
        stripUnknown:true
    })

    const existingUser = await UserModel.findOne(username).exec()
    if(existingUser) {
        res.status(409).json({error: 'duplicate username'})
        return
    }
    
    const user = new UserModel({ username, password })
    await user.save()

    res.status(201).json({ username })
    //并不用返回password

}



const login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne(username).exec()
    if(!user) {
        res.status(404).json({error: 'username not found'})
        return
    }
    if(user.password !== password) {
        res.status(401).json({error: 'Invalid username or password'})
        return
    }

    res.json({ username })

}

module.exports = {
    register,
    login
}
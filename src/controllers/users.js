const UserModel = require('../models/user')
const Joi = require('joi')
const { generateToken } = require('../utils/jwt')



const register = async (req, res) => {

    const schema = Joi.object({
        username: Joi.string().min(2).message('Invalid username format').required(),
        password: Joi.string().regex(/^[a-zA-Z]+[0-9]+$/).message('Invalid password format').min(9).required()
    })

    const { username, password } = await schema.validateAsync(req.body, {
        allowUnknown:true,
        stripUnknown:true
    })

    // const { username, password } = req.body

    const existingUser = await UserModel.findOne({ username }).exec()
    if(existingUser) {
        res.status(409).json({error: 'duplicate username'})
        return
    }
    
    const user = new UserModel({ username, password })
    await user.hashPassword()
    await user.save()

    const token = generateToken({ id: user.id, username })
    res.status(201).json({ username, token })
    //并不用返回password

}



const login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username }).exec()
    if(!user) {
        res.status(401).json({error: 'Invalid username or password'})
        return
    }
    if(!user.validatePassword(password)) {
        res.status(401).json({error: 'Invalid username or password'})
        return
    }

    // const token = generateToken({ id: user.id, username })
    const token = generateToken({ id: user.id, username, role:'teacher' })//roles: []
    //一个人可以有多个角色，通过审查其中某个角色来决定权限 role-based
    //operation-based 单独的操作设置成快捷键，比如增删改查，可以规定学生只能看和查，不能删除和更新
    res.json({ username, token })

}
//token固定格式Authorization: Bearer {token}

module.exports = {
    register,
    login
}
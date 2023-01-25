const Joi = require('joi')
const CourseModel = require('../models/course')

const getAllCourses = async (req, res) => {
    const courses = await CourseModel.find().exec()
    res.json(courses)
}

const getCourseById = async (req, res) => {
    const { id } = req.params
    const course = await CourseModel.findById(id).exec()
    if(!course) {
        res.status(404).json({error: 'course not found'})
        return
    }
    res.json(course)
}

const addCourse = async (req, res) => {
    
    //data validation，检查code有没有重复
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).message('Invalid name format').required(),
        code: Joi.string.regex(/^[a-zA-Z]+[0-9]+$/).message('Invalid code format').required(),
        description: Joi.string()
    })
    const {code, name, description} = await schema.validateAsync(req.body, {allowUnknown: true, stripUnknown: true})

    const existingCourse = await CourseModel.findById(code).exec()
    if(existingCourse) {
        res.status(409).json({error: 'duplicate course code'})
        return
    } 
    const course = new CourseModel({code, name, description})
    await course.save()
    res.status(201).json(course)
}

const updateCourseById = async (req, res) => {
    const { id } = req.params
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
        description: Joi.string
    })

    const {name, description} = await schema.validateAsync(req.body, {allowUnknown: true, stripUnknown: true})

    const course = await CourseModel.findByIdAndUpdate(id, {name, description}, {new:true}).exec()
    // CourseModel.findOne({_id: id})
    //用findOne，一定要确保该属性是独一无二的，可以在schema里，该field下设置unique: true，这样可以变为index
    if(!course) {
            res.status(404).json({error: 'course not found'})
            return
        }
    res.json(course)
}

const deleteCourseById = async (req, res) => {
    const { id } = req.params
    const course = await CourseModel.findOneAndDelete(id).exec()
    if(!course) {
        res.status(404).json({error: 'course not found'})
        return
    }
    res.sendStatus(204)
}

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    updateCourseById,
    deleteCourseById
}

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
    const {code, name, description} = req.body
    //data validation，检查code有没有重复
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
    const { name, description} = req.body
    const course = await CourseModel.findByIdAndUpdate(id, {name, description}, {new:true}).exec()
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
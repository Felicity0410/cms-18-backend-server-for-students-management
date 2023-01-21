const StudentModel = require('../models/student')

const getAllStudents = async (req, res) => {
    //db.students.find() exec()告诉mongoose，query已经build结束了, async await不一定永远成对出现，但如果出现await，那么一定要加async
    const students = await StudentModel.find().exec()
    res.json(students)
}

const getStudentById = (req, res) => {

}

const addStudent = async (req, res) => {
    const {firstName, lastName, email} = req.body
    //data validation
    const student = new StudentModel({firstName, lastName, email})
    await student.save()
    res.status(201).json(student)
}

const updateStudentById = () => {

}

const deleteStudentById = () => {

}

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById
}
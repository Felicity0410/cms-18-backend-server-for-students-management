const { Router } = require('express')
const { getAllStudents, getStudentById, addStudent, updateStudentById, deleteStudentById, addStudentToCourse, removeStudentFromCourse } = require('../controllers/students')

const studentRouter = Router()

studentRouter.get('', getAllStudents)
studentRouter.get('/:id', getStudentById)
studentRouter.post('', addStudent)
studentRouter.put('/:id', updateStudentById)
studentRouter.delete('/:id', deleteStudentById)
studentRouter.post('/:id/courses/:code', addStudentToCourse)
studentRouter.delete('/:id/courses/:code', removeStudentFromCourse)

module.exports = studentRouter
const StudentModel = require('../models/student')
const CourseModel = require('../models/course')

const getAllStudents = async (req, res) => {
    //db.students.find() exec()告诉mongoose，query已经build结束了, async await不一定永远成对出现，但如果出现await，那么一定要加async
    const students = await StudentModel.find().exec()
    res.json(students)
}

const getStudentById = async (req, res) => {
    const { id } = req.params
    const student = await StudentModel.findById(id).populate('courses', 'name').exec()
    if(!student) {
        res.status(404).json({error: 'student not found'})
        return
    }
    console.log(student["full name"]);
    res.json(student)
}

const addStudent = async (req, res) => {
    const {firstName, lastName, email} = req.body
    //data validation
    const student = new StudentModel({firstName, lastName, email})
    await student.save()
    res.status(201).json(student)
}

const updateStudentById = async (req, res) => {
    const { id } = req.params
    const {firstName, lastName, email} = req.body
   //data validation
    const student = await StudentModel.findByIdAndUpdate(
        id, 
        {firstName, lastName, email}, 
        {new:true}) //runValidators: true
        .exec()

    //const student = await StudentModel.findById(id).exec()
    if(!student) {
        res.status(404).json({error: 'student not found'})
        return
    }

    //student.firstName = firstName
    //await student.save()  //save()可以触发schema里的验证机制
    res.json(student)
}

const deleteStudentById = async (req, res) => {
    const { id } = req.params
    const student = await StudentModel.findOneAndDelete(id).exec()
    if(!student) {
        res.status(404).json({error: 'student not found'})
        return
    }
    //当想删除某一个document的时候，跟它相关的所有关联都被清空了
    await CourseModel.updateMany({students: id}, {$pull: {students: id}})
    //这里updateMany，所有course里面有该id相关连的，都被pull
    res.sendStatus(204)
}
//这个路径是怎样设定的
//POST /v1/students/:id/courses/:code 
//如何让逻辑更清晰，多些注释。滤清逻辑顺序，验证差不多再开始写
const addStudentToCourse = async (req, res) => {
    //get student and course id from route
    const { id, code } = req.params

    //find student document and course document with id
    let student = await StudentModel.findById(id).exec()
    const course = await CourseModel.findById(code).exec()

    //check if student and course exists
    //if(!(student && course)) 只要有一个不存在就报错
    if(!student || !course) {
        res.status(404).json({error: 'student or course not found'})
        return
    }
 
    //add student to course.students
    course.students.addToSet(id) 
    //addToSet是mongoose对于array处理的method，其中Set就保证了id的unique属性
    await course.save()
  
    //add course to student.courses
    // student.courses.addToSet(code)
    // await student.save()

    student = await StudentModel.findByIdAndUpdate(
        id, 
        { $addToSet: {courses: code }}, 
        { new:true }).exec()

    //return response
    res.json(student)
}

const removeStudentFromCourse = async (req, res) => {
    //get student and course id
    const { id, code } = req.params
    //get student and course document

    let student = await StudentModel.findById(id).exec()
    const course = await CourseModel.findById(code).exec()
    //check if student and course exists

    if(!student || !course) {
        res.status(404).json({error: 'student or course not found'})
        return
    }
    //remove student from course.students
    //这个地方可以做进一步改进,检测course.code是否存在于student里，反之亦然，这样可以提前抛出错误
    await CourseModel.findByIdAndUpdate(code, {$pull: {students: id}}).exec()
    //remove course from student.courses
    student = await StudentModel.findByIdAndUpdate(id, {$pull: {courses: code}}, {new: true}).exec()
    //为了保证两个collection都删除或者都添加，启动transaction
    res.json(student)
}

//把课程添加给学生，还是把学生添加给课程，要看看哪一个collection的逻辑需求大，如果两边差不多
//那么添加在一边就可以，给学生加课，给课加学生，调用一个endpoint就可以了

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudentById,
    deleteStudentById,
    addStudentToCourse,
    removeStudentFromCourse
}
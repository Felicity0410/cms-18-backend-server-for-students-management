require('dotenv').config()
const supertest = require('supertest')
const app = require('../../src/app')
const StudentModel = require('../../src/models/student')
const mongoose = require('mongoose')
const { generateToken } = require('../../src/utils/jwt')

const request = supertest(app)

const token = generateToken({id: 'fake_id' })

const createStudentRequest = async (body) => {
    return request
           .post('/v1/students')
           .set('Authorization', `Bearer ${token}`)
           .send(body)
}

beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__)
})

afterAll(async () => {
    await mongoose.connection.close()
})
describe('/v1/students', () => {

    describe('Create', () => {
        const validStudent = {
            firstName: 'john',
            lastName: 'doe',
            email: 'john@gmail.com'
           };

        beforeEach(async () => {
            await StudentModel.deleteMany({}).exec()
        })
        it('should save the student if request is valid', async () => {
           const res = await createStudentRequest(validStudent)

           expect(res.statusCode).toBe(201)
           const student = await StudentModel.findOne(validStudent).exec()
           expect(student).toBeTruthy()
        })

        it.each`
          field          | value
          ${'firstName'} | ${'a'}
          ${'email'}     | ${'com'}
        `('should return 400 when $field is $value', async ({field, value}) => {
            const invalidStudent = {
               ...validStudent,
               [field]: value
               //结构obj，变量属性名[]用方括号引入，因为是属性名，又是一个变量，就既可以是firstName，也可以是email
            }

           const res = await createStudentRequest(invalidStudent)

           expect(res.statusCode).toBe(400)
            
        })
    })
})
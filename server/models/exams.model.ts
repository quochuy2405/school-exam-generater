import { Schema, model } from 'mongoose'

const ExamSchema = new Schema({
    code: String,
    excercies: Object,
    type: String,
    subject: String,
})

export const Exam = model('Exam', ExamSchema)

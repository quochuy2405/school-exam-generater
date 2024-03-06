import { Schema, model } from 'mongoose'

const ExamSchema = new Schema({
    code: String,
    excercies: Object,
})

export const Exam = model('Exam', ExamSchema)

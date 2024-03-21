import { Schema, model } from 'mongoose'

const ExamSchema = new Schema({
    code: String,
    excercies: Object,
    type: String,
    subject: String,
    khoi: String,
    score: Number,
})

export const Exam = model('Exam', ExamSchema)

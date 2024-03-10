import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    students: Array<object>,
    class: String,
})

export const Student = model('Student', StudentSchema)

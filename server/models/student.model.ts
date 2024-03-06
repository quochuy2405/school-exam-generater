import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    name: String,
    email: String,
})

export const Student = model('Student', StudentSchema)

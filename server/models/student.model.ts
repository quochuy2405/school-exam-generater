import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    // students: Array<object>,
    // class: String,
    SBD: String,
    NAME: String,
    EMAIL: String,
    SCHOOL: String,
    NQH: Number,
})

export const Student = model('Student', StudentSchema)

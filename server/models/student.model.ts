import { Schema, model } from 'mongoose'

const StudentSchema = new Schema({
    // students: Array<object>,
    // class: String,
    SBD: String,
    NAME: String,
    EMAIL: String,
    SCHOOL: String,
    NQH: Number,
    CLASS: String,
    AREA: String,
    COSO: String,
    KHOI: String,
})

export const Student = model('Student', StudentSchema)

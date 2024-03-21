import { Schema, model } from 'mongoose'

const BinSchema = new Schema({
    student: Object,
})

export const Bin = model('Bin', BinSchema)

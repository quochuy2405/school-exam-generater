import { Schema, model } from 'mongoose'

const HistorySchema = new Schema({
    SBD: String,
    MADE: String,
    NAME: String,
    MON: String,
    DOT: String,
    SCORE: Number,
    NGAY: Date,
})

export const History = model('History', HistorySchema)

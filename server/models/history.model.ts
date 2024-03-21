import { Schema, model } from 'mongoose'

const HistorySchema = new Schema({
    SBD: String,
    MADE: String,
    NAME: String,
    MON: String,
    DOT: String,
    KHUVUC: String,
    SCORE: Number,
    NGAY: Date,
})

export const History = model('History', HistorySchema)

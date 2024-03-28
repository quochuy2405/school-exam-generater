import { Schema, model } from 'mongoose'

const HistorySchema = new Schema({
    SBD: String,
    MADE: String,
    NAME: String,
    MON: String,
    LOP: String,
    MATHUCCHIEN: String,
    KHUVUC: String,
    COSO: String,
    KHOI: String,
    SCORE: Number,
    NGAY: Date,
})

export const History = model('History', HistorySchema)

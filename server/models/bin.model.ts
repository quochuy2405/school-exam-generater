import { Schema, model } from 'mongoose'

const BinSchema = new Schema({
    SOBAODANH: String,
    HOVATEN: String,
    DAPAN: Object,
    COSO: String,
    AREA: String,
    KHOI: String,
    MON: String,
    CLASS: String,
    MATHUCCHIEN: String,
})

export const Bin = model('Bin', BinSchema)

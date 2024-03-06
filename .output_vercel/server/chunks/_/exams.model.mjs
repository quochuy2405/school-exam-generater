import { Schema, model } from 'mongoose';

const ExamSchema = new Schema({
  code: String,
  excercies: Object
});
const Exam = model("Exam", ExamSchema);

export { Exam as E };
//# sourceMappingURL=exams.model.mjs.map

import { Schema, model } from 'mongoose';

const StudentSchema = new Schema({
  name: String,
  email: String
});
const Student = model("Student", StudentSchema);

export { Student as S };
//# sourceMappingURL=student.model.mjs.map

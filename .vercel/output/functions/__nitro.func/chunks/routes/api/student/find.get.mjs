import { d as defineEventHandler } from '../../../runtime.mjs';
import { S as Student } from '../../../_/student.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';

const find_get = defineEventHandler(async (event) => {
  const student = await Student.find();
  return student;
});

export { find_get as default };
//# sourceMappingURL=find.get.mjs.map

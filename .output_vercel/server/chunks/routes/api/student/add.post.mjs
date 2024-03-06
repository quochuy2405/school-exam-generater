import { d as defineEventHandler, r as readBody, s as setResponseStatus } from '../../../runtime.mjs';
import { S as Student } from '../../../_/student.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const add_post = defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const newStudent = {
    ...payload
  };
  try {
    await Student.create(newStudent);
    return newStudent;
  } catch (error) {
    console.log("error", error);
    return setResponseStatus(event, 404, "Not created");
  }
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map

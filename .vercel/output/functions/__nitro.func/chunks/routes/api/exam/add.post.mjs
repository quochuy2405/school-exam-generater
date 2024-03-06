import { d as defineEventHandler, r as readBody, s as setResponseStatus } from '../../../runtime.mjs';
import { E as Exam } from '../../../_/exams.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';

const add_post = defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const newExam = {
    code: payload.code,
    excercies: payload.excercies
  };
  try {
    await Exam.create(newExam);
    return newExam;
  } catch (error) {
    console.log("error", error);
    return setResponseStatus(event, 404, "Not created");
  }
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map

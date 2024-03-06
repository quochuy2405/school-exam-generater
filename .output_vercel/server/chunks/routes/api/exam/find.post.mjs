import { d as defineEventHandler, r as readBody, s as setResponseStatus } from '../../../runtime.mjs';
import { E as Exam } from '../../../_/exams.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const find_post = defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const code = payload.code;
  const exam = await Exam.find({ code });
  if (exam.length == 0) {
    return setResponseStatus(event, 404, "Not Found");
  }
  return exam;
});

export { find_post as default };
//# sourceMappingURL=find.post.mjs.map

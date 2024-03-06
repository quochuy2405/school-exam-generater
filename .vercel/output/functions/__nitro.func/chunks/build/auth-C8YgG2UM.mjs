import { v as defineNuxtRouteMiddleware, w as navigateTo } from './server.mjs';
import 'vue';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../runtime.mjs';
import 'fs';
import 'path';
import 'mongoose';
import 'unhead';
import 'vue-router';
import 'vue/server-renderer';

const auth = defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/") {
    return navigateTo("/");
  }
});

export { auth as default };
//# sourceMappingURL=auth-C8YgG2UM.mjs.map

import { A as useRoute, l as __nuxt_component_0$2, a as __nuxt_component_0$4 } from './server.mjs';
import { useSSRContext, defineComponent, withCtx, createTextVNode, unref, mergeProps, openBlock, createBlock, createVNode, createCommentVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './Card-9RklQWHR.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ItemNav",
  __ssrInlineRender: true,
  props: {
    href: {},
    name: {}
  },
  setup(__props) {
    const { href, name } = __props;
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        href,
        class: ["flex font-medium text-sm items-center gap-2 cursor-pointer p-4 py-2 rounded-lg", { "bg-[#dadada77]": unref(route).matched[0]["path"] == href }]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (href == "/") {
              _push2(`<svg version="1.1" id="Layer_1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96.17 122.88" style="${ssrRenderStyle({ "enable-background": "new 0 0 96.17 122.88" })}" xml:space="preserve"${_scopeId}><g${_scopeId}><path d="M62.74,110.31l21.48-22.58H62.74V110.31L62.74,110.31z M18.93,61.94h58.3v5.53h-58.3V61.94L18.93,61.94z M18.93,75.53 h27.29v5.53H18.93V75.53L18.93,75.53z M18.93,89.12h19.23v5.53H18.93V89.12L18.93,89.12z M38.86,43.48h-8.04l-1.4,5.69H18.93 l9.67-29.83h12.65l9.72,29.83H40.22L38.86,43.48L38.86,43.48z M37.33,36.93l-2.39-9.94H34.8l-1.17,5.06l-1.22,4.88H37.33 L37.33,36.93z M75.22,37.7h-7.64v8.99h-7.91V37.7h-7.68v-6.91h7.68v-8.99h7.91v8.99h7.64V37.7L75.22,37.7z M96.17,84.85 c0,1.63-1.1,3.04-2.6,3.45l-31.64,33.27c-0.66,0.82-1.66,1.32-2.76,1.32H6.43c-1.79,0-3.39-0.72-4.55-1.88 C0.72,119.84,0,118.24,0,116.45V6.43c0-1.79,0.72-3.39,1.88-4.55C3.04,0.72,4.67,0,6.43,0h83.31c1.76,0,3.39,0.72,4.55,1.88 c1.16,1.16,1.88,2.76,1.88,4.55V84.85L96.17,84.85z M88.99,80.55V7.18H7.18v108.55h48.38V84.16c0-1.98,1.6-3.61,3.61-3.61H88.99 L88.99,80.55z"${_scopeId}></path></g></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (href == "/nhaplieu") {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" width="20" height="20" viewBox="0 0 512 379.665"${_scopeId}><path fill-rule="nonzero" d="M153.764 119.045c-7.838.332-13.409 2.935-16.619 7.822-8.724 13.076 3.18 25.996 11.443 35.099 23.441 25.724 80.888 87.554 92.454 101.161 8.768 9.694 21.25 9.694 30.017 0 11.948-13.959 72.287-78.603 94.569-103.627 7.731-8.705 17.292-20.579 9.239-32.633-3.287-4.887-8.798-7.49-16.636-7.822H310.65V22.868C310.65 10.31 300.346 0 287.779 0h-63.544c-12.572 0-22.871 10.294-22.871 22.868v96.177h-47.6zM.764 249.22c-2.622-10.841 1.793-19.331 8.852-24.343a24.765 24.765 0 018.47-3.837c3.039-.738 6.211-.913 9.258-.477 8.585 1.232 16.409 6.775 19.028 17.617a668.79 668.79 0 014.56 20.164 1259.306 1259.306 0 013.611 17.721c4.696 23.707 8.168 38.568 16.924 45.976 9.269 7.843 26.798 10.549 60.388 10.549h254.297c31.012 0 47.192-2.965 55.706-10.661 8.206-7.418 11.414-21.904 15.564-44.131a1212.673 1212.673 0 013.628-18.808c1.371-6.788 2.877-13.766 4.586-20.81 2.619-10.839 10.438-16.377 19.023-17.617 3.02-.433 6.173-.256 9.212.474 3.071.739 5.998 2.042 8.519 3.838 7.05 5.006 11.457 13.474 8.855 24.293l-.011.047a517.342 517.342 0 00-4.181 18.987c-1.063 5.281-2.289 11.852-3.464 18.145l-.008.046c-6.124 32.802-11.141 55.308-27.956 71.112-16.565 15.573-42.513 22.16-89.473 22.16H131.857c-49.096 0-76.074-5.911-93.429-21.279-17.783-15.75-23.173-38.615-30.047-73.314-1.39-7.029-2.728-13.739-3.638-18.091-1.281-6.11-2.6-12.082-3.979-17.761z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (href == "/hocvien") {
              _push2(`<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" width="20" height="20" viewBox="0 0 512 283.4"${_scopeId}><path d="M417.22 240.9c15.67-1.72 29.89-9.47 35.23-23.8 41.62 26.61 59.55 9.73 59.55 66.3h-90.99c0-18.11-1.26-31.84-3.79-42.5zm-305.11 42.5c5.89-76.2 19.74-48.02 85.11-88.92 20.19 42.13 102.24 45.19 119.07 0 56.41 36.07 83.6 12.25 83.6 88.92H112.11zm100.52-92.24c-.87-1.13 2.28-8.89 3.02-10.14-8.54-7.6-15.28-15.27-16.72-31.05l-.92.02c-2.11-.02-4.15-.51-6.06-1.6-3.06-1.74-5.21-4.73-6.66-8.09-3.08-7.07-13.21-30.52 2.22-28.67-8.62-16.11 10.91-43.64-22.78-53.82 27.64-35.01 85.95-88.98 128.68-34.84 46.77 4.53 61.36 60.12 29.87 90.56 1.84.07 3.58.5 5.12 1.32 5.86 3.14 6.05 9.94 4.51 15.65-1.52 4.77-3.46 8-5.28 12.65-2.22 6.28-5.46 7.45-11.72 6.77-.32 15.53-7.49 23.15-17.15 32.26l2.64 8.95c-12.94 27.46-66.72 28.57-88.77.03zM0 283.4c4.34-56.23 12.43-36.12 60.67-66.3 6.28 13.11 20.68 21.09 36.16 23.44-2.53 9.96-4.3 22.89-5.66 40.13-.11.89-.17 1.8-.17 2.73H0zm72.04-68.75c-.65-.83 1.68-6.56 2.23-7.48-6.3-5.61-11.28-11.27-12.34-22.91l-.68.01c-1.56-.02-3.07-.38-4.48-1.18-2.25-1.28-3.84-3.49-4.91-5.97-2.27-5.21-9.74-22.52 1.64-21.15-6.36-11.89 8.05-32.21-16.81-39.72 20.4-25.83 63.42-65.65 94.95-25.71 34.52 3.35 45.28 44.37 22.04 66.83 1.36.05 2.65.36 3.78.97 4.32 2.32 4.47 7.34 3.33 11.55-1.12 3.52-2.55 5.9-3.89 9.34-1.64 4.63-4.03 5.49-8.66 4.99-.1 5.32-1.3 9.38-3.27 12.87l-2.96 1.17c-21.79 8.53-34.18 13.39-41.66 31.45-10.92-1.42-21.61-6.38-28.31-15.06zm297.1-18.3c-1.67-3.25-2.84-7.13-3.29-12.09l-.68.01c-1.56-.02-3.07-.38-4.47-1.18-2.26-1.28-3.85-3.49-4.92-5.97-2.27-5.21-9.74-22.52 1.65-21.15-6.37-11.89 8.04-32.21-16.82-39.72 20.4-25.83 63.42-65.65 94.96-25.71 34.51 3.35 45.28 44.37 22.04 66.83 1.36.05 2.64.36 3.78.97 4.32 2.32 4.46 7.34 3.32 11.55-1.12 3.52-2.55 5.9-3.89 9.34-1.64 4.63-4.03 5.49-8.65 4.99-.24 11.46-5.53 17.08-12.66 23.81l1.95 6.6c-4.46 9.47-15.51 14.69-27.67 15.42-8.04-19.6-22.85-25.57-44.65-33.7z"${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (href == "/kiemtrade") {
              _push2(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId}><g id="SVGRepo_bgCarrier" stroke-width="0"${_scopeId}></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></g><g id="SVGRepo_iconCarrier"${_scopeId}><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#323232" stroke-width="2"${_scopeId}></path><path d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path></g></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(name)}`);
          } else {
            return [
              href == "/" ? (openBlock(), createBlock("svg", {
                key: 0,
                version: "1.1",
                id: "Layer_1",
                width: "20",
                height: "20",
                xmlns: "http://www.w3.org/2000/svg",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                x: "0px",
                y: "0px",
                viewBox: "0 0 96.17 122.88",
                style: { "enable-background": "new 0 0 96.17 122.88" },
                "xml:space": "preserve"
              }, [
                createVNode("g", null, [
                  createVNode("path", { d: "M62.74,110.31l21.48-22.58H62.74V110.31L62.74,110.31z M18.93,61.94h58.3v5.53h-58.3V61.94L18.93,61.94z M18.93,75.53 h27.29v5.53H18.93V75.53L18.93,75.53z M18.93,89.12h19.23v5.53H18.93V89.12L18.93,89.12z M38.86,43.48h-8.04l-1.4,5.69H18.93 l9.67-29.83h12.65l9.72,29.83H40.22L38.86,43.48L38.86,43.48z M37.33,36.93l-2.39-9.94H34.8l-1.17,5.06l-1.22,4.88H37.33 L37.33,36.93z M75.22,37.7h-7.64v8.99h-7.91V37.7h-7.68v-6.91h7.68v-8.99h7.91v8.99h7.64V37.7L75.22,37.7z M96.17,84.85 c0,1.63-1.1,3.04-2.6,3.45l-31.64,33.27c-0.66,0.82-1.66,1.32-2.76,1.32H6.43c-1.79,0-3.39-0.72-4.55-1.88 C0.72,119.84,0,118.24,0,116.45V6.43c0-1.79,0.72-3.39,1.88-4.55C3.04,0.72,4.67,0,6.43,0h83.31c1.76,0,3.39,0.72,4.55,1.88 c1.16,1.16,1.88,2.76,1.88,4.55V84.85L96.17,84.85z M88.99,80.55V7.18H7.18v108.55h48.38V84.16c0-1.98,1.6-3.61,3.61-3.61H88.99 L88.99,80.55z" })
                ])
              ])) : createCommentVNode("", true),
              href == "/nhaplieu" ? (openBlock(), createBlock("svg", {
                key: 1,
                xmlns: "http://www.w3.org/2000/svg",
                "shape-rendering": "geometricPrecision",
                "text-rendering": "geometricPrecision",
                "image-rendering": "optimizeQuality",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                width: "20",
                height: "20",
                viewBox: "0 0 512 379.665"
              }, [
                createVNode("path", {
                  "fill-rule": "nonzero",
                  d: "M153.764 119.045c-7.838.332-13.409 2.935-16.619 7.822-8.724 13.076 3.18 25.996 11.443 35.099 23.441 25.724 80.888 87.554 92.454 101.161 8.768 9.694 21.25 9.694 30.017 0 11.948-13.959 72.287-78.603 94.569-103.627 7.731-8.705 17.292-20.579 9.239-32.633-3.287-4.887-8.798-7.49-16.636-7.822H310.65V22.868C310.65 10.31 300.346 0 287.779 0h-63.544c-12.572 0-22.871 10.294-22.871 22.868v96.177h-47.6zM.764 249.22c-2.622-10.841 1.793-19.331 8.852-24.343a24.765 24.765 0 018.47-3.837c3.039-.738 6.211-.913 9.258-.477 8.585 1.232 16.409 6.775 19.028 17.617a668.79 668.79 0 014.56 20.164 1259.306 1259.306 0 013.611 17.721c4.696 23.707 8.168 38.568 16.924 45.976 9.269 7.843 26.798 10.549 60.388 10.549h254.297c31.012 0 47.192-2.965 55.706-10.661 8.206-7.418 11.414-21.904 15.564-44.131a1212.673 1212.673 0 013.628-18.808c1.371-6.788 2.877-13.766 4.586-20.81 2.619-10.839 10.438-16.377 19.023-17.617 3.02-.433 6.173-.256 9.212.474 3.071.739 5.998 2.042 8.519 3.838 7.05 5.006 11.457 13.474 8.855 24.293l-.011.047a517.342 517.342 0 00-4.181 18.987c-1.063 5.281-2.289 11.852-3.464 18.145l-.008.046c-6.124 32.802-11.141 55.308-27.956 71.112-16.565 15.573-42.513 22.16-89.473 22.16H131.857c-49.096 0-76.074-5.911-93.429-21.279-17.783-15.75-23.173-38.615-30.047-73.314-1.39-7.029-2.728-13.739-3.638-18.091-1.281-6.11-2.6-12.082-3.979-17.761z"
                })
              ])) : createCommentVNode("", true),
              href == "/hocvien" ? (openBlock(), createBlock("svg", {
                key: 2,
                xmlns: "http://www.w3.org/2000/svg",
                "shape-rendering": "geometricPrecision",
                "text-rendering": "geometricPrecision",
                "image-rendering": "optimizeQuality",
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                width: "20",
                height: "20",
                viewBox: "0 0 512 283.4"
              }, [
                createVNode("path", { d: "M417.22 240.9c15.67-1.72 29.89-9.47 35.23-23.8 41.62 26.61 59.55 9.73 59.55 66.3h-90.99c0-18.11-1.26-31.84-3.79-42.5zm-305.11 42.5c5.89-76.2 19.74-48.02 85.11-88.92 20.19 42.13 102.24 45.19 119.07 0 56.41 36.07 83.6 12.25 83.6 88.92H112.11zm100.52-92.24c-.87-1.13 2.28-8.89 3.02-10.14-8.54-7.6-15.28-15.27-16.72-31.05l-.92.02c-2.11-.02-4.15-.51-6.06-1.6-3.06-1.74-5.21-4.73-6.66-8.09-3.08-7.07-13.21-30.52 2.22-28.67-8.62-16.11 10.91-43.64-22.78-53.82 27.64-35.01 85.95-88.98 128.68-34.84 46.77 4.53 61.36 60.12 29.87 90.56 1.84.07 3.58.5 5.12 1.32 5.86 3.14 6.05 9.94 4.51 15.65-1.52 4.77-3.46 8-5.28 12.65-2.22 6.28-5.46 7.45-11.72 6.77-.32 15.53-7.49 23.15-17.15 32.26l2.64 8.95c-12.94 27.46-66.72 28.57-88.77.03zM0 283.4c4.34-56.23 12.43-36.12 60.67-66.3 6.28 13.11 20.68 21.09 36.16 23.44-2.53 9.96-4.3 22.89-5.66 40.13-.11.89-.17 1.8-.17 2.73H0zm72.04-68.75c-.65-.83 1.68-6.56 2.23-7.48-6.3-5.61-11.28-11.27-12.34-22.91l-.68.01c-1.56-.02-3.07-.38-4.48-1.18-2.25-1.28-3.84-3.49-4.91-5.97-2.27-5.21-9.74-22.52 1.64-21.15-6.36-11.89 8.05-32.21-16.81-39.72 20.4-25.83 63.42-65.65 94.95-25.71 34.52 3.35 45.28 44.37 22.04 66.83 1.36.05 2.65.36 3.78.97 4.32 2.32 4.47 7.34 3.33 11.55-1.12 3.52-2.55 5.9-3.89 9.34-1.64 4.63-4.03 5.49-8.66 4.99-.1 5.32-1.3 9.38-3.27 12.87l-2.96 1.17c-21.79 8.53-34.18 13.39-41.66 31.45-10.92-1.42-21.61-6.38-28.31-15.06zm297.1-18.3c-1.67-3.25-2.84-7.13-3.29-12.09l-.68.01c-1.56-.02-3.07-.38-4.47-1.18-2.26-1.28-3.85-3.49-4.92-5.97-2.27-5.21-9.74-22.52 1.65-21.15-6.37-11.89 8.04-32.21-16.82-39.72 20.4-25.83 63.42-65.65 94.96-25.71 34.51 3.35 45.28 44.37 22.04 66.83 1.36.05 2.64.36 3.78.97 4.32 2.32 4.46 7.34 3.32 11.55-1.12 3.52-2.55 5.9-3.89 9.34-1.64 4.63-4.03 5.49-8.65 4.99-.24 11.46-5.53 17.08-12.66 23.81l1.95 6.6c-4.46 9.47-15.51 14.69-27.67 15.42-8.04-19.6-22.85-25.57-44.65-33.7z" })
              ])) : createCommentVNode("", true),
              href == "/kiemtrade" ? (openBlock(), createBlock("svg", {
                key: 3,
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("g", {
                  id: "SVGRepo_bgCarrier",
                  "stroke-width": "0"
                }),
                createVNode("g", {
                  id: "SVGRepo_tracerCarrier",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }),
                createVNode("g", { id: "SVGRepo_iconCarrier" }, [
                  createVNode("path", {
                    d: "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
                    stroke: "#323232",
                    "stroke-width": "2"
                  }),
                  createVNode("path", {
                    d: "M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10",
                    stroke: "#323232",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ])
              ])) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(name))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/atoms/ItemNav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      _push(ssrRenderComponent(_component_UCard, mergeProps({
        class: "h-full !max-h-[100dvh] max-w-[30%] w-64",
        padding: "0"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-5 flex flex-col gap-3"${_scopeId}><h3 class="font-normal text-gray-600 text-xs"${_scopeId}>MAIN MENU</h3><div class="flex flex-col gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              href: "/",
              name: "Ch\u1EA5m ch\u1EEFa b\xE0i"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              href: "/nhaplieu",
              name: "Nh\u1EADp li\u1EC7u"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              href: "/kiemtrade",
              name: "Ki\u1EC3m tra \u0111\u1EC1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              href: "/hocvien",
              name: "Danh s\xE1ch h\u1ECDc vi\xEAn"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mt-5 flex flex-col gap-3" }, [
                createVNode("h3", { class: "font-normal text-gray-600 text-xs" }, "MAIN MENU"),
                createVNode("div", { class: "flex flex-col gap-2" }, [
                  createVNode(unref(_sfc_main$2), {
                    href: "/",
                    name: "Ch\u1EA5m ch\u1EEFa b\xE0i"
                  }),
                  createVNode(unref(_sfc_main$2), {
                    href: "/nhaplieu",
                    name: "Nh\u1EADp li\u1EC7u"
                  }),
                  createVNode(unref(_sfc_main$2), {
                    href: "/kiemtrade",
                    name: "Ki\u1EC3m tra \u0111\u1EC1"
                  }),
                  createVNode(unref(_sfc_main$2), {
                    href: "/hocvien",
                    name: "Danh s\xE1ch h\u1ECDc vi\xEAn"
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/organisms/NavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "slot",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = __nuxt_component_0$2;
      _push(`<!--[--><div class="md:hidden w-full h-screen flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UButton, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u1EE8ng d\u1EE5ng hi\u1EC7n ch\u1EC9 kh\u1EA3 d\u1EE5ng tr\xEAn ipad ho\u1EB7c laptop`);
          } else {
            return [
              createTextVNode(" \u1EE8ng d\u1EE5ng hi\u1EC7n ch\u1EC9 kh\u1EA3 d\u1EE5ng tr\xEAn ipad ho\u1EB7c laptop")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden md:flex gap-2 w-screen h-screen p-3 overflow-hidden">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
      _push(`<div class="h-full px-3 w-full flex-1 overflow-y-hidden">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/slot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=slot-DSZ8ZDyv.mjs.map

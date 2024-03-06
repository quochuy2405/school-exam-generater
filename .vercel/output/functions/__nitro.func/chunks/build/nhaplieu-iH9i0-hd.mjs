import { _ as __nuxt_component_0 } from './Card-9RklQWHR.mjs';
import { a as __nuxt_component_1, _ as __nuxt_component_2 } from './Form-D0_i0rpr.mjs';
import { _ as __nuxt_component_3, d as __nuxt_component_6, e as __nuxt_component_7 } from './Pagination-C8PXYeA9.mjs';
import { n as useToast, l as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef, useSSRContext } from 'vue';
import { c as csvToJson } from './csvToJson-BtOUA9Xs.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { z } from 'zod';
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

const pageCount = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "nhaplieu",
  __ssrInlineRender: true,
  setup(__props) {
    const columns = [
      {
        key: "STT",
        label: "STT",
        class: "w-[60px]"
      },
      {
        key: "C\xE2u H\u1ECFi",
        label: "C\xE2u H\u1ECFi",
        sortable: true,
        class: "w-[200px]"
      },
      {
        key: "D\u1EA1ng",
        label: "D\u1EA1ng",
        sortable: true,
        class: "w-[150px]"
      },
      {
        key: "\u0110\xE1p \xC1n",
        label: "\u0110\xE1p \xC1n",
        sortable: true,
        class: "w-[200px]"
      },
      {
        key: "Gi\u1EA3i ph\xE1p",
        label: "Gi\u1EA3i ph\xE1p",
        class: "w-[300px]"
      },
      {
        key: "\u0110\u01B0\u1EDDng d\u1EABn",
        label: "\u0110\u01B0\u1EDDng d\u1EABn"
      }
    ];
    const toast = useToast();
    const state = reactive({
      code: void 0,
      class: void 0,
      types: void 0,
      file: void 0,
      excercies: []
    });
    const page = ref(1);
    const handleChangeFile = (event) => {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = (e) => {
        const csvText = e.target.result;
        const json = csvToJson(csvText);
        state.excercies = [...json];
      };
      reader.readAsText(file);
      state.file = file;
    };
    const rows = computed(() => {
      var _a;
      const data = (_a = state.excercies) == null ? void 0 : _a.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount
      );
      return data;
    });
    const schema = z.object({
      code: z.string().min(3, "Ph\u1EA3i nhi\u1EC1u h\u01A1n 3 k\xFD t\u1EF1")
    });
    const validate = (state2) => {
      const errors = [];
      if (!state2.code) {
        errors.push({ path: "code", message: "Vui l\xF2ng nh\u1EADp m\xE3 \u0111\u1EC1" });
      }
      return errors;
    };
    async function onSubmit(event) {
      if (!state.file) {
        toast.add({ title: "B\u1EA1n ch\u01B0a t\u1EA3i file csv", timeout: 3e3 });
        return;
      }
      const dataCreate = {
        code: event.data.code,
        excercies: { ...event.data.excercies }
      };
      $fetch("/api/exam/add", {
        method: "POST",
        body: dataCreate
      }).then(() => {
        toast.add({ title: "\u0110\xE3 t\u1EA1o d\u1EEF li\u1EC7u th\xE0nh c\xF4ng", timeout: 3e3 });
      }).catch((e) => {
        toast.add({ title: "L\u1ED7i", timeout: 3e3 });
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UCard = __nuxt_component_0;
      const _component_UForm = __nuxt_component_1;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_3;
      const _component_UButton = __nuxt_component_0$2;
      const _component_UTable = __nuxt_component_6;
      const _component_UPagination = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1 overflow-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              schema: unref(schema),
              state: unref(state),
              validate,
              onSubmit,
              class: "flex flex-col gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid grid-cols-2 lg:w-3/5 gap-3"${_scopeId2}><div class="flex flex-col gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "M\xE3 \u0111\u1EC1",
                    name: "code",
                    "eager-validation": "",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp m\xE3 \u0111\u1EC1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp m\xE3 \u0111\u1EC1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-col gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "T\u1EA3i l\xEAn file csv",
                    name: "file",
                    "eager-validation": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<input${ssrRenderAttr("model-value", unref(state).file)} type="file" accept="*" size="sm" class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"${_scopeId3}>`);
                      } else {
                        return [
                          createVNode("input", {
                            "model-value": unref(state).file,
                            onChange: handleChangeFile,
                            type: "file",
                            accept: "*",
                            size: "sm",
                            class: "block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                          }, null, 40, ["model-value"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    class: "h-fit w-fit px-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Th\xEAm b\u1ED9 c\xE2u h\u1ECFi`);
                      } else {
                        return [
                          createTextVNode("Th\xEAm b\u1ED9 c\xE2u h\u1ECFi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid grid-cols-2 lg:w-3/5 gap-3" }, [
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode(_component_UFormGroup, {
                          label: "M\xE3 \u0111\u1EC1",
                          name: "code",
                          "eager-validation": "",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(state).code,
                              "onUpdate:modelValue": ($event) => unref(state).code = $event,
                              placeholder: "Nh\u1EADp m\xE3 \u0111\u1EC1"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex flex-col gap-2" }, [
                        createVNode(_component_UFormGroup, {
                          label: "T\u1EA3i l\xEAn file csv",
                          name: "file",
                          "eager-validation": ""
                        }, {
                          default: withCtx(() => [
                            createVNode("input", {
                              "model-value": unref(state).file,
                              onChange: handleChangeFile,
                              type: "file",
                              accept: "*",
                              size: "sm",
                              class: "block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                            }, null, 40, ["model-value"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_UButton, {
                        type: "submit",
                        class: "h-fit w-fit px-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Th\xEAm b\u1ED9 c\xE2u h\u1ECFi")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                schema: unref(schema),
                state: unref(state),
                validate,
                onSubmit,
                class: "flex flex-col gap-2"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid grid-cols-2 lg:w-3/5 gap-3" }, [
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(_component_UFormGroup, {
                        label: "M\xE3 \u0111\u1EC1",
                        name: "code",
                        "eager-validation": "",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp m\xE3 \u0111\u1EC1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(_component_UFormGroup, {
                        label: "T\u1EA3i l\xEAn file csv",
                        name: "file",
                        "eager-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode("input", {
                            "model-value": unref(state).file,
                            onChange: handleChangeFile,
                            type: "file",
                            accept: "*",
                            size: "sm",
                            class: "block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                          }, null, 40, ["model-value"])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode(_component_UButton, {
                      type: "submit",
                      class: "h-fit w-fit px-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Th\xEAm b\u1ED9 c\xE2u h\u1ECFi")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["schema", "state"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden">`);
      _push(ssrRenderComponent(_component_UTable, {
        "sort-asc-icon": "i-heroicons-arrow-up-20-solid",
        "sort-desc-icon": "i-heroicons-arrow-down-20-solid",
        class: "relative",
        "sort-button": {
          icon: "i-heroicons-sparkles-20-solid",
          color: "primary",
          variant: "outline",
          size: "2xs",
          square: false
        },
        columns,
        rows: unref(rows)
      }, null, _parent));
      _push(`<div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">`);
      _push(ssrRenderComponent(_component_UPagination, {
        modelValue: unref(page),
        "onUpdate:modelValue": ($event) => isRef(page) ? page.value = $event : null,
        "page-count": pageCount,
        total: (_a = unref(state).excercies) == null ? void 0 : _a.length
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/nhaplieu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=nhaplieu-iH9i0-hd.mjs.map

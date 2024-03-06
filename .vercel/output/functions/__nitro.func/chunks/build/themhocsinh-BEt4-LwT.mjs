import { _ as __nuxt_component_0 } from './Card-9RklQWHR.mjs';
import { a as __nuxt_component_1, _ as __nuxt_component_2 } from './Form-D0_i0rpr.mjs';
import { u as useFormGroup, _ as __nuxt_component_3, d as __nuxt_component_6, e as __nuxt_component_7 } from './Pagination-C8PXYeA9.mjs';
import { m as mergeConfig, s as select, b as appConfig, d as __nuxt_component_0$5, f as useUI, h as useInjectButtonGroup, t as twMerge, i as twJoin, l as __nuxt_component_0$2, k as get, _ as _export_sfc } from './server.mjs';
import { defineComponent, toRef, computed, useSSRContext, reactive, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { c as csvToJson } from './csvToJson-BtOUA9Xs.mjs';
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

const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.select, select);
const _sfc_main$1 = defineComponent({
  components: {
    UIcon: __nuxt_component_0$5
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: () => config.default.trailingIcon
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: "value"
    },
    selectClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({ ui, props });
    const { emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
    const size = computed(() => sizeButtonGroup.value || sizeFormGroup.value);
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    const onChange = (event) => {
      emitFormChange();
      emit("change", event);
    };
    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, get(option, props.optionAttribute));
    };
    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, get(option, props.valueAttribute));
    };
    const normalizeOption = (option) => {
      if (["string", "number", "boolean"].includes(typeof option)) {
        return {
          [props.valueAttribute]: option,
          [props.optionAttribute]: option
        };
      }
      return {
        ...option,
        [props.valueAttribute]: guessOptionValue(option),
        [props.optionAttribute]: guessOptionText(option)
      };
    };
    const normalizedOptions = computed(() => {
      return props.options.map((option) => normalizeOption(option));
    });
    const normalizedOptionsWithPlaceholder = computed(() => {
      if (!props.placeholder) {
        return normalizedOptions.value;
      }
      return [
        {
          [props.valueAttribute]: "",
          [props.optionAttribute]: props.placeholder,
          disabled: true
        },
        ...normalizedOptions.value
      ];
    });
    const normalizedValue = computed(() => {
      const normalizeModelValue = normalizeOption(props.modelValue);
      const foundOption = normalizedOptionsWithPlaceholder.value.find((option) => option[props.valueAttribute] === normalizeModelValue[props.valueAttribute]);
      if (!foundOption) {
        return "";
      }
      return foundOption[props.valueAttribute];
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.form,
        rounded.value,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        (isLeading.value || slots.leading) && ui.value.leading.padding[size.value],
        (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]
      ), props.placeholder && !props.modelValue && ui.value.placeholder, props.selectClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.leading.wrapper,
        ui.value.icon.leading.pointer,
        ui.value.icon.leading.padding[size.value]
      );
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && ui.value.icon.loading
      );
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.trailing.wrapper,
        ui.value.icon.trailing.pointer,
        ui.value.icon.trailing.padding[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        color.value && appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && ui.value.icon.loading
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      normalizedOptionsWithPlaceholder,
      normalizedValue,
      isLeading,
      isTrailing,
      // eslint-disable-next-line vue/no-dupe-keys
      selectClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      onInput,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_0$5;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))} data-v-57aec611><select${ssrRenderAttrs(mergeProps({
    id: _ctx.inputId,
    name: _ctx.name,
    value: _ctx.modelValue,
    required: _ctx.required,
    disabled: _ctx.disabled,
    class: _ctx.selectClass
  }, _ctx.attrs))} data-v-57aec611><!--[-->`);
  ssrRenderList(_ctx.normalizedOptionsWithPlaceholder, (option, index) => {
    _push(`<!--[-->`);
    if (option.children) {
      _push(`<optgroup${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrRenderAttr("label", option[_ctx.optionAttribute])} data-v-57aec611><!--[-->`);
      ssrRenderList(option.children, (childOption, index2) => {
        _push(`<option${ssrRenderAttr("value", childOption[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(childOption[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(childOption.disabled) ? " disabled" : ""} data-v-57aec611>${ssrInterpolate(childOption[_ctx.optionAttribute])}</option>`);
      });
      _push(`<!--]--></optgroup>`);
    } else {
      _push(`<option${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(option[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(option.disabled) ? " disabled" : ""} data-v-57aec611>${ssrInterpolate(option[_ctx.optionAttribute])}</option>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></select>`);
  if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
    _push(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}" data-v-57aec611>`);
    ssrRenderSlot(_ctx.$slots, "leading", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
    _push(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}" data-v-57aec611>`);
    ssrRenderSlot(_ctx.$slots, "trailing", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+ui@2.14.1_nuxt@3.10.3_vite@5.1.4_vue@3.4.21/node_modules/@nuxt/ui/dist/runtime/components/forms/Select.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-57aec611"]]);
const pageCount = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "themhocsinh",
  __ssrInlineRender: true,
  setup(__props) {
    const classes = ["L\u1EDBp 1", "L\u1EDBp 2", "L\u1EDBp 3"];
    const columns = [
      {
        key: "M\xE3 h\u1ECDc sinh",
        label: "M\xE3 h\u1ECDc sinh",
        class: "w-[120px]"
      },
      {
        key: "T\xEAn h\u1ECDc sinh",
        label: "T\xEAn h\u1ECDc sinh",
        sortable: true,
        class: "min-w-[100px]"
      },
      {
        key: "Email",
        label: "Email",
        sortable: true,
        class: "min-w-[60px]"
      },
      {
        key: "L\u1EDBp",
        label: "L\u1EDBp",
        sortable: true,
        class: "w-[120px]"
      }
    ];
    const schema = z.object({
      code: z.string().min(10, "Must be at least 10 characters")
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UCard = __nuxt_component_0;
      const _component_UForm = __nuxt_component_1;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_3;
      const _component_USelect = __nuxt_component_4;
      const _component_UButton = __nuxt_component_0$2;
      const _component_UTable = __nuxt_component_6;
      const _component_UPagination = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              schema: unref(schema),
              state: unref(state),
              class: "grid grid-cols-2 lg:w-3/5 gap-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "M\xE3 h\u1ECDc sinh",
                    name: "class",
                    "eager-validation": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp m\xE3 h\u1ECDc sinh"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp m\xE3 h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "T\xEAn h\u1ECDc sinh",
                    name: "code",
                    "eager-validation": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp t\xEAn h\u1ECDc sinh"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp t\xEAn h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex flex-col gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "Email h\u1ECDc sinh",
                    name: "file",
                    "eager-validation": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp email h\u1ECDc sinh"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp email h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormGroup, {
                    label: "L\u1EDBp",
                    name: "class",
                    "eager-validation": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_USelect, {
                          modelValue: unref(state).class,
                          "onUpdate:modelValue": ($event) => unref(state).class = $event,
                          placeholder: "L\u1EF1a ch\u1ECDn l\u1EDBp",
                          options: classes
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_USelect, {
                            modelValue: unref(state).class,
                            "onUpdate:modelValue": ($event) => unref(state).class = $event,
                            placeholder: "L\u1EF1a ch\u1ECDn l\u1EDBp",
                            options: classes
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(_component_UFormGroup, {
                        label: "M\xE3 h\u1ECDc sinh",
                        name: "class",
                        "eager-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp m\xE3 h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "T\xEAn h\u1ECDc sinh",
                        name: "code",
                        "eager-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp t\xEAn h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "flex flex-col gap-2" }, [
                      createVNode(_component_UFormGroup, {
                        label: "Email h\u1ECDc sinh",
                        name: "file",
                        "eager-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(state).code,
                            "onUpdate:modelValue": ($event) => unref(state).code = $event,
                            placeholder: "Nh\u1EADp email h\u1ECDc sinh"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormGroup, {
                        label: "L\u1EDBp",
                        name: "class",
                        "eager-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_USelect, {
                            modelValue: unref(state).class,
                            "onUpdate:modelValue": ($event) => unref(state).class = $event,
                            placeholder: "L\u1EF1a ch\u1ECDn l\u1EDBp",
                            options: classes
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                class: "grid grid-cols-2 lg:w-3/5 gap-3"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_component_UFormGroup, {
                      label: "M\xE3 h\u1ECDc sinh",
                      name: "class",
                      "eager-validation": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp m\xE3 h\u1ECDc sinh"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "T\xEAn h\u1ECDc sinh",
                      name: "code",
                      "eager-validation": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp t\xEAn h\u1ECDc sinh"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode(_component_UFormGroup, {
                      label: "Email h\u1ECDc sinh",
                      name: "file",
                      "eager-validation": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(state).code,
                          "onUpdate:modelValue": ($event) => unref(state).code = $event,
                          placeholder: "Nh\u1EADp email h\u1ECDc sinh"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormGroup, {
                      label: "L\u1EDBp",
                      name: "class",
                      "eager-validation": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_USelect, {
                          modelValue: unref(state).class,
                          "onUpdate:modelValue": ($event) => unref(state).class = $event,
                          placeholder: "L\u1EF1a ch\u1ECDn l\u1EDBp",
                          options: classes
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
      _push(`<h1 class="font-medium">Ho\u1EB7c</h1><div class="flex justify-between items-end">`);
      _push(ssrRenderComponent(_component_UFormGroup, {
        label: "T\u1EA3i l\xEAn file csv",
        name: "file",
        class: "w-fit",
        "eager-validation": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("model-value", unref(state).file)} type="file" accept="*" size="sm" class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"${_scopeId}>`);
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
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, { class: "h-fit" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Th\xEAm t\u1EA5t c\u1EA3 h\u1ECDc sinh`);
          } else {
            return [
              createTextVNode("Th\xEAm t\u1EA5t c\u1EA3 h\u1ECDc sinh")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/themhocsinh.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=themhocsinh-BEt4-LwT.mjs.map

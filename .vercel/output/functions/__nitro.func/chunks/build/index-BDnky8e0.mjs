import { f as useResizeObserver, b as useId, g as __nuxt_component_4, _ as __nuxt_component_3$1, d as __nuxt_component_6, e as __nuxt_component_7 } from './Pagination-C8PXYeA9.mjs';
import { defineComponent, ref, computed, onMounted, onUnmounted, h, Fragment, watchEffect, watch, provide, unref, inject, getCurrentInstance, Teleport, reactive, normalizeClass, toRef, useSSRContext, mergeProps, isRef, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, renderList, nextTick, shallowRef, resolveComponent, renderSlot } from 'vue';
import { b as i$2, f, s as s$1$1, A as A$3, S as S$1, o as o$2, k as t$1, I as I$1, l as l$2, i as i$1, u as u$1$1, w as w$2, N as N$4, O, T as T$1, a as s$2, m as s2, p as S, t as t$2, q as c$1, d as l$1$1, r as w$1$1, P, v as N$1$1, j as t$1$1, x as T$1$1, g as o, e as o$1, y as t$3 } from './disposables-BhuSt1ZA.mjs';
import { m as mergeConfig, b as appConfig, f as useUI, n as useToast, l as __nuxt_component_0$2, _ as _export_sfc, o as useNuxtApp } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './Card-9RklQWHR.mjs';
import { _ as __nuxt_component_2, a as __nuxt_component_1 } from './Form-D0_i0rpr.mjs';
import { r as readLinesFromCSV, g as generateContent } from './csvToJson-BtOUA9Xs.mjs';
import { z as z$1 } from 'zod';
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

const tabs = {
  wrapper: "relative space-y-2",
  container: "relative w-full",
  base: "focus:outline-none",
  list: {
    base: "relative",
    background: "bg-gray-100 dark:bg-gray-800",
    rounded: "rounded-lg",
    shadow: "",
    padding: "p-1",
    height: "h-10",
    width: "w-full",
    marker: {
      wrapper: "absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none",
      base: "w-full h-full",
      background: "bg-white dark:bg-gray-900",
      rounded: "rounded-md",
      shadow: "shadow-sm"
    },
    tab: {
      base: "relative inline-flex items-center justify-center flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out",
      background: "",
      active: "text-gray-900 dark:text-white",
      inactive: "text-gray-500 dark:text-gray-400",
      height: "h-8",
      padding: "px-3",
      size: "text-sm",
      font: "font-medium",
      rounded: "rounded-md",
      shadow: ""
    }
  }
};
const slideover = {
  wrapper: "fixed inset-0 flex z-50",
  overlay: {
    base: "fixed inset-0 transition-opacity",
    background: "bg-gray-200/75 dark:bg-gray-800/75",
    // Syntax for `<TransitionRoot>` component https://headlessui.com/vue/transition#basic-example
    transition: {
      enter: "ease-in-out duration-500",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "ease-in-out duration-500",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0"
    }
  },
  base: "relative flex-1 flex flex-col w-full focus:outline-none",
  background: "bg-white dark:bg-gray-900",
  ring: "",
  rounded: "",
  padding: "",
  shadow: "shadow-xl",
  width: "w-screen max-w-md",
  translate: {
    base: "translate-x-0",
    left: "-translate-x-full rtl:translate-x-full",
    right: "translate-x-full rtl:-translate-x-full"
  },
  // Syntax for `<TransitionRoot>` component https://headlessui.com/vue/transition#basic-example
  transition: {
    enter: "transform transition ease-in-out duration-300",
    leave: "transform transition ease-in-out duration-200"
  }
};
function E$1(n2, e2, o2, r) {
  c$1.isServer || watchEffect((t2) => {
    n2 = n2 != null ? n2 : void 0, n2.addEventListener(e2, o2, r), t2(() => n2.removeEventListener(e2, o2, r));
  });
}
var d$3 = ((r) => (r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(d$3 || {});
function n() {
  let o2 = ref(0);
  return w$1$1("keydown", (e2) => {
    e2.key === "Tab" && (o2.value = e2.shiftKey ? 1 : 0);
  }), o2;
}
function B(t2) {
  if (!t2)
    return /* @__PURE__ */ new Set();
  if (typeof t2 == "function")
    return new Set(t2());
  let n2 = /* @__PURE__ */ new Set();
  for (let r of t2.value) {
    let l2 = o$2(r);
    l2 instanceof HTMLElement && n2.add(l2);
  }
  return n2;
}
var A$2 = ((e2) => (e2[e2.None = 1] = "None", e2[e2.InitialFocus = 2] = "InitialFocus", e2[e2.TabLock = 4] = "TabLock", e2[e2.FocusLock = 8] = "FocusLock", e2[e2.RestoreFocus = 16] = "RestoreFocus", e2[e2.All = 30] = "All", e2))(A$2 || {});
let ue = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(t2, { attrs: n$1, slots: r, expose: l2 }) {
  let o$12 = ref(null);
  l2({ el: o$12, $el: o$12 });
  let i2 = computed(() => i$2(o$12)), e2 = ref(false);
  onMounted(() => e2.value = true), onUnmounted(() => e2.value = false), $({ ownerDocument: i2 }, computed(() => e2.value && Boolean(t2.features & 16)));
  let m2 = z({ ownerDocument: i2, container: o$12, initialFocus: computed(() => t2.initialFocus) }, computed(() => e2.value && Boolean(t2.features & 2)));
  J({ ownerDocument: i2, container: o$12, containers: t2.containers, previousActiveElement: m2 }, computed(() => e2.value && Boolean(t2.features & 8)));
  let f$1 = n();
  function a2(u2) {
    let T2 = o$2(o$12);
    if (!T2)
      return;
    ((w2) => w2())(() => {
      u$1$1(f$1.value, { [d$3.Forwards]: () => {
        P(T2, N$1$1.First, { skipElements: [u2.relatedTarget] });
      }, [d$3.Backwards]: () => {
        P(T2, N$1$1.Last, { skipElements: [u2.relatedTarget] });
      } });
    });
  }
  let s2 = ref(false);
  function F2(u2) {
    u2.key === "Tab" && (s2.value = true, requestAnimationFrame(() => {
      s2.value = false;
    }));
  }
  function H2(u2) {
    if (!e2.value)
      return;
    let T2 = B(t2.containers);
    o$2(o$12) instanceof HTMLElement && T2.add(o$2(o$12));
    let d2 = u2.relatedTarget;
    d2 instanceof HTMLElement && d2.dataset.headlessuiFocusGuard !== "true" && (N$3(T2, d2) || (s2.value ? P(o$2(o$12), u$1$1(f$1.value, { [d$3.Forwards]: () => N$1$1.Next, [d$3.Backwards]: () => N$1$1.Previous }) | N$1$1.WrapAround, { relativeTo: u2.target }) : u2.target instanceof HTMLElement && S$1(u2.target)));
  }
  return () => {
    let u2 = {}, T2 = { ref: o$12, onKeydown: F2, onFocusout: H2 }, { features: d2, initialFocus: w2, containers: Q2, ...O2 } = t2;
    return h(Fragment, [Boolean(d2 & 4) && h(f, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: a2, features: s$1$1.Focusable }), A$3({ ourProps: T2, theirProps: { ...n$1, ...O2 }, slot: u2, attrs: n$1, slots: r, name: "FocusTrap" }), Boolean(d2 & 4) && h(f, { as: "button", type: "button", "data-headlessui-focus-guard": true, onFocus: a2, features: s$1$1.Focusable })]);
  };
} }), { features: A$2 });
function W$1(t2) {
  let n2 = ref(t$1$1.slice());
  return watch([t2], ([r], [l2]) => {
    l2 === true && r === false ? t$1(() => {
      n2.value.splice(0);
    }) : l2 === false && r === true && (n2.value = t$1$1.slice());
  }, { flush: "post" }), () => {
    var r;
    return (r = n2.value.find((l2) => l2 != null && l2.isConnected)) != null ? r : null;
  };
}
function $({ ownerDocument: t2 }, n2) {
  let r = W$1(n2);
  onMounted(() => {
    watchEffect(() => {
      var l2, o2;
      n2.value || ((l2 = t2.value) == null ? void 0 : l2.activeElement) === ((o2 = t2.value) == null ? void 0 : o2.body) && S$1(r());
    }, { flush: "post" });
  }), onUnmounted(() => {
    n2.value && S$1(r());
  });
}
function z({ ownerDocument: t2, container: n2, initialFocus: r }, l2) {
  let o$12 = ref(null), i2 = ref(false);
  return onMounted(() => i2.value = true), onUnmounted(() => i2.value = false), onMounted(() => {
    watch([n2, r, l2], (e2, m2) => {
      if (e2.every((a2, s2) => (m2 == null ? void 0 : m2[s2]) === a2) || !l2.value)
        return;
      let f2 = o$2(n2);
      f2 && t$1(() => {
        var F2, H2;
        if (!i2.value)
          return;
        let a2 = o$2(r), s2 = (F2 = t2.value) == null ? void 0 : F2.activeElement;
        if (a2) {
          if (a2 === s2) {
            o$12.value = s2;
            return;
          }
        } else if (f2.contains(s2)) {
          o$12.value = s2;
          return;
        }
        a2 ? S$1(a2) : P(f2, N$1$1.First | N$1$1.NoScroll) === T$1$1.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), o$12.value = (H2 = t2.value) == null ? void 0 : H2.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), o$12;
}
function J({ ownerDocument: t2, container: n2, containers: r, previousActiveElement: l2 }, o$12) {
  var i2;
  E$1((i2 = t2.value) == null ? void 0 : i2.defaultView, "focus", (e2) => {
    if (!o$12.value)
      return;
    let m2 = B(r);
    o$2(n2) instanceof HTMLElement && m2.add(o$2(n2));
    let f2 = l2.value;
    if (!f2)
      return;
    let a2 = e2.target;
    a2 && a2 instanceof HTMLElement ? N$3(m2, a2) ? (l2.value = a2, S$1(a2)) : (e2.preventDefault(), e2.stopPropagation(), S$1(f2)) : S$1(l2.value);
  }, true);
}
function N$3(t2, n2) {
  for (let r of t2)
    if (r.contains(n2))
      return true;
  return false;
}
function m$3(t2) {
  let e2 = shallowRef(t2.getSnapshot());
  return onUnmounted(t2.subscribe(() => {
    e2.value = t2.getSnapshot();
  })), e2;
}
function a$1(o2, r) {
  let t2 = o2(), n2 = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return t2;
  }, subscribe(e2) {
    return n2.add(e2), () => n2.delete(e2);
  }, dispatch(e2, ...s2) {
    let i2 = r[e2].call(t2, ...s2);
    i2 && (t2 = i2, n2.forEach((c2) => c2()));
  } };
}
function c() {
  let o2;
  return { before({ doc: e2 }) {
    var l2;
    let n2 = e2.documentElement;
    o2 = ((l2 = e2.defaultView) != null ? l2 : void 0).innerWidth - n2.clientWidth;
  }, after({ doc: e2, d: n2 }) {
    let t2 = e2.documentElement, l2 = t2.clientWidth - t2.offsetWidth, r = o2 - l2;
    n2.style(t2, "paddingRight", `${r}px`);
  } };
}
function w$1() {
  return t$3() ? { before({ doc: r, d: n2, meta: c2 }) {
    function o2(a2) {
      return c2.containers.flatMap((l2) => l2()).some((l2) => l2.contains(a2));
    }
    n2.microTask(() => {
      var s2;
      if ((void 0).getComputedStyle(r.documentElement).scrollBehavior !== "auto") {
        let t2 = o();
        t2.style(r.documentElement, "scrollBehavior", "auto"), n2.add(() => n2.microTask(() => t2.dispose()));
      }
      let a2 = (s2 = (void 0).scrollY) != null ? s2 : (void 0).pageYOffset, l2 = null;
      n2.addEventListener(r, "click", (t2) => {
        if (t2.target instanceof HTMLElement)
          try {
            let e2 = t2.target.closest("a");
            if (!e2)
              return;
            let { hash: f2 } = new URL(e2.href), i2 = r.querySelector(f2);
            i2 && !o2(i2) && (l2 = i2);
          } catch {
          }
      }, true), n2.addEventListener(r, "touchstart", (t2) => {
        if (t2.target instanceof HTMLElement)
          if (o2(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && o2(e2.parentElement); )
              e2 = e2.parentElement;
            n2.style(e2, "overscrollBehavior", "contain");
          } else
            n2.style(t2.target, "touchAction", "none");
      }), n2.addEventListener(r, "touchmove", (t2) => {
        if (t2.target instanceof HTMLElement)
          if (o2(t2.target)) {
            let e2 = t2.target;
            for (; e2.parentElement && e2.dataset.headlessuiPortal !== "" && !(e2.scrollHeight > e2.clientHeight || e2.scrollWidth > e2.clientWidth); )
              e2 = e2.parentElement;
            e2.dataset.headlessuiPortal === "" && t2.preventDefault();
          } else
            t2.preventDefault();
      }, { passive: false }), n2.add(() => {
        var e2;
        let t2 = (e2 = (void 0).scrollY) != null ? e2 : (void 0).pageYOffset;
        a2 !== t2 && (void 0).scrollTo(0, a2), l2 && l2.isConnected && (l2.scrollIntoView({ block: "nearest" }), l2 = null);
      });
    });
  } } : {};
}
function l$1() {
  return { before({ doc: e2, d: o2 }) {
    o2.style(e2.documentElement, "overflow", "hidden");
  } };
}
function m$2(e2) {
  let n2 = {};
  for (let t2 of e2)
    Object.assign(n2, t2(n2));
  return n2;
}
let a = a$1(() => /* @__PURE__ */ new Map(), { PUSH(e2, n2) {
  var o2;
  let t2 = (o2 = this.get(e2)) != null ? o2 : { doc: e2, count: 0, d: o(), meta: /* @__PURE__ */ new Set() };
  return t2.count++, t2.meta.add(n2), this.set(e2, t2), this;
}, POP(e2, n2) {
  let t2 = this.get(e2);
  return t2 && (t2.count--, t2.meta.delete(n2)), this;
}, SCROLL_PREVENT({ doc: e2, d: n2, meta: t2 }) {
  let o2 = { doc: e2, d: n2, meta: m$2(t2) }, c$12 = [w$1(), c(), l$1()];
  c$12.forEach(({ before: r }) => r == null ? void 0 : r(o2)), c$12.forEach(({ after: r }) => r == null ? void 0 : r(o2));
}, SCROLL_ALLOW({ d: e2 }) {
  e2.dispose();
}, TEARDOWN({ doc: e2 }) {
  this.delete(e2);
} });
a.subscribe(() => {
  let e2 = a.getSnapshot(), n2 = /* @__PURE__ */ new Map();
  for (let [t2] of e2)
    n2.set(t2, t2.documentElement.style.overflow);
  for (let t2 of e2.values()) {
    let o2 = n2.get(t2.doc) === "hidden", c2 = t2.count !== 0;
    (c2 && !o2 || !c2 && o2) && a.dispatch(t2.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t2), t2.count === 0 && a.dispatch("TEARDOWN", t2);
  }
});
function d$2(t2, a$12, n2) {
  let i2 = m$3(a), l2 = computed(() => {
    let e2 = t2.value ? i2.value.get(t2.value) : void 0;
    return e2 ? e2.count > 0 : false;
  });
  return watch([t2, a$12], ([e2, m2], [r], o2) => {
    if (!e2 || !m2)
      return;
    a.dispatch("PUSH", e2, n2);
    let f2 = false;
    o2(() => {
      f2 || (a.dispatch("POP", r != null ? r : e2, n2), f2 = true);
    });
  }, { immediate: true }), l2;
}
let i = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
function E(d2, f2 = ref(true)) {
  watchEffect((o$12) => {
    var a2;
    if (!f2.value)
      return;
    let e2 = o$2(d2);
    if (!e2)
      return;
    o$12(function() {
      var u2;
      if (!e2)
        return;
      let r = (u2 = t.get(e2)) != null ? u2 : 1;
      if (r === 1 ? t.delete(e2) : t.set(e2, r - 1), r !== 1)
        return;
      let n2 = i.get(e2);
      n2 && (n2["aria-hidden"] === null ? e2.removeAttribute("aria-hidden") : e2.setAttribute("aria-hidden", n2["aria-hidden"]), e2.inert = n2.inert, i.delete(e2));
    });
    let l2 = (a2 = t.get(e2)) != null ? a2 : 0;
    t.set(e2, l2 + 1), l2 === 0 && (i.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), e2.setAttribute("aria-hidden", "true"), e2.inert = true);
  });
}
function N$2({ defaultContainers: o$12 = [], portals: i2, mainTreeNodeRef: H2 } = {}) {
  let t2 = ref(null), r = i$2(t2);
  function u2() {
    var l2, f2, a2;
    let n2 = [];
    for (let e2 of o$12)
      e2 !== null && (e2 instanceof HTMLElement ? n2.push(e2) : "value" in e2 && e2.value instanceof HTMLElement && n2.push(e2.value));
    if (i2 != null && i2.value)
      for (let e2 of i2.value)
        n2.push(e2);
    for (let e2 of (l2 = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? l2 : [])
      e2 !== (void 0).body && e2 !== (void 0).head && e2 instanceof HTMLElement && e2.id !== "headlessui-portal-root" && (e2.contains(o$2(t2)) || e2.contains((a2 = (f2 = o$2(t2)) == null ? void 0 : f2.getRootNode()) == null ? void 0 : a2.host) || n2.some((M) => e2.contains(M)) || n2.push(e2));
    return n2;
  }
  return { resolveContainers: u2, contains(n2) {
    return u2().some((l2) => l2.contains(n2));
  }, mainTreeNodeRef: t2, MainTreeNode() {
    return H2 != null ? null : h(f, { features: s$1$1.Hidden, ref: t2 });
  } };
}
let e = Symbol("ForcePortalRootContext");
function s$1() {
  return inject(e, false);
}
let u$2 = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o2, { slots: t2, attrs: r }) {
  return provide(e, o2.force), () => {
    let { force: f2, ...n2 } = o2;
    return A$3({ theirProps: n2, ourProps: {}, slot: {}, slots: t2, attrs: r, name: "ForcePortalRoot" });
  };
} });
let u$1 = Symbol("StackContext");
var s = ((e2) => (e2[e2.Add = 0] = "Add", e2[e2.Remove = 1] = "Remove", e2))(s || {});
function y() {
  return inject(u$1, () => {
  });
}
function R$1({ type: o2, enabled: r, element: e2, onUpdate: i2 }) {
  let a2 = y();
  function t2(...n2) {
    i2 == null || i2(...n2), a2(...n2);
  }
  onMounted(() => {
    watch(r, (n2, d2) => {
      n2 ? t2(0, o2, e2) : d2 === true && t2(1, o2, e2);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r.value && t2(1, o2, e2);
  }), provide(u$1, t2);
}
let u = Symbol("DescriptionContext");
function w() {
  let t2 = inject(u, null);
  if (t2 === null)
    throw new Error("Missing parent");
  return t2;
}
function k({ slot: t2 = ref({}), name: o2 = "Description", props: s2 = {} } = {}) {
  let e2 = ref([]);
  function r(n2) {
    return e2.value.push(n2), () => {
      let i2 = e2.value.indexOf(n2);
      i2 !== -1 && e2.value.splice(i2, 1);
    };
  }
  return provide(u, { register: r, slot: t2, name: o2, props: s2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(t2, { attrs: o2, slots: s2 }) {
  var n2;
  let e2 = (n2 = t2.id) != null ? n2 : `headlessui-description-${I$1()}`, r = w();
  return onMounted(() => onUnmounted(r.register(e2))), () => {
    let { name: i2 = "Description", slot: l2 = ref({}), props: d2 = {} } = r, { ...c2 } = t2, f2 = { ...Object.entries(d2).reduce((a2, [g2, m2]) => Object.assign(a2, { [g2]: unref(m2) }), {}), id: e2 };
    return A$3({ ourProps: f2, theirProps: c2, slot: l2.value, attrs: o2, slots: s2, name: i2 });
  };
} });
function x(r) {
  let e2 = i$2(r);
  if (!e2) {
    if (r === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${r}`);
  }
  let u2 = e2.getElementById("headlessui-portal-root");
  if (u2)
    return u2;
  let t2 = e2.createElement("div");
  return t2.setAttribute("id", "headlessui-portal-root"), e2.body.appendChild(t2);
}
let _ = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(r, { slots: e2, attrs: u2 }) {
  let t2 = ref(null), i2 = computed(() => i$2(t2)), l2 = s$1(), n2 = inject(C$1, null), o$12 = ref(l2 === true || n2 == null ? x(t2.value) : n2.resolveTarget()), d2 = ref(false);
  onMounted(() => {
    d2.value = true;
  }), watchEffect(() => {
    l2 || n2 != null && (o$12.value = n2.resolveTarget());
  });
  let c2 = inject(m$1, null), v = false, H2 = getCurrentInstance();
  return watch(t2, () => {
    if (v || !c2)
      return;
    let a2 = o$2(t2);
    a2 && (onUnmounted(c2.register(a2), H2), v = true);
  }), onUnmounted(() => {
    var g2, P2;
    let a2 = (g2 = i2.value) == null ? void 0 : g2.getElementById("headlessui-portal-root");
    a2 && o$12.value === a2 && o$12.value.children.length <= 0 && ((P2 = o$12.value.parentElement) == null || P2.removeChild(o$12.value));
  }), () => {
    if (!d2.value || o$12.value === null)
      return null;
    let a2 = { ref: t2, "data-headlessui-portal": "" };
    return h(Teleport, { to: o$12.value }, A$3({ ourProps: a2, theirProps: r, slot: {}, attrs: u2, slots: e2, name: "Portal" }));
  };
} }), m$1 = Symbol("PortalParentContext");
function A$1() {
  let r = inject(m$1, null), e2 = ref([]);
  function u2(l2) {
    return e2.value.push(l2), r && r.register(l2), () => t2(l2);
  }
  function t2(l2) {
    let n2 = e2.value.indexOf(l2);
    n2 !== -1 && e2.value.splice(n2, 1), r && r.unregister(l2);
  }
  let i2 = { register: u2, unregister: t2, portals: e2 };
  return [e2, defineComponent({ name: "PortalWrapper", setup(l2, { slots: n2 }) {
    return provide(m$1, i2), () => {
      var o2;
      return (o2 = n2.default) == null ? void 0 : o2.call(n2);
    };
  } })];
}
let C$1 = Symbol("PortalGroupContext"), N$1 = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(r, { attrs: e2, slots: u2 }) {
  let t2 = reactive({ resolveTarget() {
    return r.target;
  } });
  return provide(C$1, t2), () => {
    let { target: i2, ...l2 } = r;
    return A$3({ theirProps: l2, ourProps: {}, slot: {}, attrs: e2, slots: u2, name: "PortalGroup" });
  };
} });
var Te$1 = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(Te$1 || {});
let H = Symbol("DialogContext");
function T(e2) {
  let i2 = inject(H, null);
  if (i2 === null) {
    let l2 = new Error(`<${e2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, T), l2;
  }
  return i2;
}
let A = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", We = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: A }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e2) => true }, setup(e2, { emit: i2, attrs: l2, slots: d2, expose: s$12 }) {
  var _$1, q;
  let n2 = (_$1 = e2.id) != null ? _$1 : `headlessui-dialog-${I$1()}`, u2 = ref(false);
  onMounted(() => {
    u2.value = true;
  });
  let r = false, g2 = computed(() => e2.role === "dialog" || e2.role === "alertdialog" ? e2.role : (r || (r = true, console.warn(`Invalid role [${g2}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), D = ref(0), S2 = l$2(), R2 = computed(() => e2.open === A && S2 !== null ? (S2.value & i$1.Open) === i$1.Open : e2.open), m2 = ref(null), E$2 = computed(() => i$2(m2));
  if (s$12({ el: m2, $el: m2 }), !(e2.open !== A || S2 !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof R2.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${R2.value === A ? void 0 : e2.open}`);
  let c2 = computed(() => u2.value && R2.value ? 0 : 1), k$1 = computed(() => c2.value === 0), w2 = computed(() => D.value > 1), N2 = inject(H, null) !== null, [Q2, X] = A$1(), { resolveContainers: B2, mainTreeNodeRef: K, MainTreeNode: Z } = N$2({ portals: Q2, defaultContainers: [computed(() => {
    var t2;
    return (t2 = h$1.panelRef.value) != null ? t2 : m2.value;
  })] }), ee = computed(() => w2.value ? "parent" : "leaf"), U2 = computed(() => S2 !== null ? (S2.value & i$1.Closing) === i$1.Closing : false), te2 = computed(() => N2 || U2.value ? false : k$1.value), le2 = computed(() => {
    var t2, a2, p;
    return (p = Array.from((a2 = (t2 = E$2.value) == null ? void 0 : t2.querySelectorAll("body > *")) != null ? a2 : []).find((f2) => f2.id === "headlessui-portal-root" ? false : f2.contains(o$2(K)) && f2 instanceof HTMLElement)) != null ? p : null;
  });
  E(le2, te2);
  let ae = computed(() => w2.value ? true : k$1.value), oe = computed(() => {
    var t2, a2, p;
    return (p = Array.from((a2 = (t2 = E$2.value) == null ? void 0 : t2.querySelectorAll("[data-headlessui-portal]")) != null ? a2 : []).find((f2) => f2.contains(o$2(K)) && f2 instanceof HTMLElement)) != null ? p : null;
  });
  E(oe, ae), R$1({ type: "Dialog", enabled: computed(() => c2.value === 0), element: m2, onUpdate: (t2, a2) => {
    if (a2 === "Dialog")
      return u$1$1(t2, { [s.Add]: () => D.value += 1, [s.Remove]: () => D.value -= 1 });
  } });
  let re = k({ name: "DialogDescription", slot: computed(() => ({ open: R2.value })) }), M = ref(null), h$1 = { titleId: M, panelRef: ref(null), dialogState: c2, setTitleId(t2) {
    M.value !== t2 && (M.value = t2);
  }, close() {
    i2("close", false);
  } };
  provide(H, h$1);
  let ne = computed(() => !(!k$1.value || w2.value));
  w$2(B2, (t2, a2) => {
    h$1.close(), nextTick(() => a2 == null ? void 0 : a2.focus());
  }, ne);
  let ie = computed(() => !(w2.value || c2.value !== 0));
  E$1((q = E$2.value) == null ? void 0 : q.defaultView, "keydown", (t2) => {
    ie.value && (t2.defaultPrevented || t2.key === o$1.Escape && (t2.preventDefault(), t2.stopPropagation(), h$1.close()));
  });
  let ue$1 = computed(() => !(U2.value || c2.value !== 0 || N2));
  return d$2(E$2, ue$1, (t2) => {
    var a2;
    return { containers: [...(a2 = t2.containers) != null ? a2 : [], B2] };
  }), watchEffect((t2) => {
    if (c2.value !== 0)
      return;
    let a2 = o$2(m2);
    if (!a2)
      return;
    let p = new ResizeObserver((f2) => {
      for (let L2 of f2) {
        let x2 = L2.target.getBoundingClientRect();
        x2.x === 0 && x2.y === 0 && x2.width === 0 && x2.height === 0 && h$1.close();
      }
    });
    p.observe(a2), t2(() => p.disconnect());
  }), () => {
    let { open: t2, initialFocus: a2, ...p } = e2, f2 = { ...l2, ref: m2, id: n2, role: g2.value, "aria-modal": c2.value === 0 ? true : void 0, "aria-labelledby": M.value, "aria-describedby": re.value }, L2 = { open: c2.value === 0 };
    return h(u$2, { force: true }, () => [h(_, () => h(N$1, { target: m2.value }, () => h(u$2, { force: false }, () => h(ue, { initialFocus: a2, containers: B2, features: k$1.value ? u$1$1(ee.value, { parent: ue.features.RestoreFocus, leaf: ue.features.All & ~ue.features.FocusLock }) : ue.features.None }, () => h(X, {}, () => A$3({ ourProps: f2, theirProps: { ...p, ...l2 }, slot: L2, attrs: l2, slots: d2, visible: c2.value === 0, features: N$4.RenderStrategy | N$4.Static, name: "Dialog" })))))), h(Z)]);
  };
} });
defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e2, { attrs: i2, slots: l2 }) {
  var u2;
  let d2 = (u2 = e2.id) != null ? u2 : `headlessui-dialog-overlay-${I$1()}`, s2 = T("DialogOverlay");
  function n2(r) {
    r.target === r.currentTarget && (r.preventDefault(), r.stopPropagation(), s2.close());
  }
  return () => {
    let { ...r } = e2;
    return A$3({ ourProps: { id: d2, "aria-hidden": true, onClick: n2 }, theirProps: r, slot: { open: s2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogOverlay" });
  };
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: false, setup(e2, { attrs: i2, slots: l2, expose: d2 }) {
  var r;
  let s2 = (r = e2.id) != null ? r : `headlessui-dialog-backdrop-${I$1()}`, n2 = T("DialogBackdrop"), u2 = ref(null);
  return d2({ el: u2, $el: u2 }), onMounted(() => {
    if (n2.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...g2 } = e2, D = { id: s2, ref: u2, "aria-hidden": true };
    return h(u$2, { force: true }, () => h(_, () => A$3({ ourProps: D, theirProps: { ...i2, ...g2 }, slot: { open: n2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogBackdrop" })));
  };
} });
let Ge = defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e2, { attrs: i2, slots: l2, expose: d2 }) {
  var r;
  let s2 = (r = e2.id) != null ? r : `headlessui-dialog-panel-${I$1()}`, n2 = T("DialogPanel");
  d2({ el: n2.panelRef, $el: n2.panelRef });
  function u2(g2) {
    g2.stopPropagation();
  }
  return () => {
    let { ...g2 } = e2, D = { id: s2, ref: n2.panelRef, onClick: u2 };
    return A$3({ ourProps: D, theirProps: g2, slot: { open: n2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogPanel" });
  };
} });
defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(e2, { attrs: i2, slots: l2 }) {
  var n2;
  let d2 = (n2 = e2.id) != null ? n2 : `headlessui-dialog-title-${I$1()}`, s2 = T("DialogTitle");
  return onMounted(() => {
    s2.setTitleId(d2), onUnmounted(() => s2.setTitleId(null));
  }), () => {
    let { ...u2 } = e2;
    return A$3({ ourProps: { id: d2 }, theirProps: u2, slot: { open: s2.dialogState.value === 0 }, attrs: i2, slots: l2, name: "DialogTitle" });
  };
} });
let d$1 = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n2 = ref(true);
  return () => n2.value ? h(f, { as: "button", type: "button", features: s$1$1.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e2, a2 = 50;
    function r() {
      var u2;
      if (a2-- <= 0) {
        e2 && cancelAnimationFrame(e2);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n2.value = false, cancelAnimationFrame(e2);
        return;
      }
      e2 = requestAnimationFrame(r);
    }
    e2 = requestAnimationFrame(r);
  } }) : null;
} });
var te = ((s2) => (s2[s2.Forwards = 0] = "Forwards", s2[s2.Backwards = 1] = "Backwards", s2))(te || {}), le = ((o2) => (o2[o2.Less = -1] = "Less", o2[o2.Equal = 0] = "Equal", o2[o2.Greater = 1] = "Greater", o2))(le || {});
let U = Symbol("TabsContext");
function C(a2) {
  let b = inject(U, null);
  if (b === null) {
    let s2 = new Error(`<${a2} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s2, C), s2;
  }
  return b;
}
let G = Symbol("TabsSSRContext"), pe$1 = defineComponent({ name: "TabGroup", emits: { change: (a2) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a2, { slots: b, attrs: s2, emit: o$12 }) {
  var w2;
  let i2 = ref((w2 = a2.selectedIndex) != null ? w2 : a2.defaultIndex), l2 = ref([]), r = ref([]), x2 = computed(() => a2.selectedIndex !== null), P2 = computed(() => x2.value ? a2.selectedIndex : i2.value);
  function y2(t2) {
    var c2;
    let n2 = O(u2.tabs.value, o$2), d2 = O(u2.panels.value, o$2), e2 = n2.filter((I2) => {
      var p;
      return !((p = o$2(I2)) != null && p.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > n2.length - 1) {
      let I2 = u$1$1(i2.value === null ? 0 : Math.sign(t2 - i2.value), { [-1]: () => 1, [0]: () => u$1$1(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 }), p = u$1$1(I2, { [0]: () => n2.indexOf(e2[0]), [1]: () => n2.indexOf(e2[e2.length - 1]) });
      p !== -1 && (i2.value = p), u2.tabs.value = n2, u2.panels.value = d2;
    } else {
      let I2 = n2.slice(0, t2), D = [...n2.slice(t2), ...I2].find((W2) => e2.includes(W2));
      if (!D)
        return;
      let O2 = (c2 = n2.indexOf(D)) != null ? c2 : u2.selectedIndex.value;
      O2 === -1 && (O2 = u2.selectedIndex.value), i2.value = O2, u2.tabs.value = n2, u2.panels.value = d2;
    }
  }
  let u2 = { selectedIndex: computed(() => {
    var t2, n2;
    return (n2 = (t2 = i2.value) != null ? t2 : a2.defaultIndex) != null ? n2 : null;
  }), orientation: computed(() => a2.vertical ? "vertical" : "horizontal"), activation: computed(() => a2.manual ? "manual" : "auto"), tabs: l2, panels: r, setSelectedIndex(t2) {
    P2.value !== t2 && o$12("change", t2), x2.value || y2(t2);
  }, registerTab(t2) {
    var e2;
    if (l2.value.includes(t2))
      return;
    let n2 = l2.value[i2.value];
    l2.value.push(t2), l2.value = O(l2.value, o$2);
    let d2 = (e2 = l2.value.indexOf(n2)) != null ? e2 : i2.value;
    d2 !== -1 && (i2.value = d2);
  }, unregisterTab(t2) {
    let n2 = l2.value.indexOf(t2);
    n2 !== -1 && l2.value.splice(n2, 1);
  }, registerPanel(t2) {
    r.value.includes(t2) || (r.value.push(t2), r.value = O(r.value, o$2));
  }, unregisterPanel(t2) {
    let n2 = r.value.indexOf(t2);
    n2 !== -1 && r.value.splice(n2, 1);
  } };
  provide(U, u2);
  let T2 = ref({ tabs: [], panels: [] }), m2 = ref(false);
  onMounted(() => {
    m2.value = true;
  }), provide(G, computed(() => m2.value ? null : T2.value));
  let R2 = computed(() => a2.selectedIndex);
  return onMounted(() => {
    watch([R2], () => {
      var t2;
      return y2((t2 = a2.selectedIndex) != null ? t2 : a2.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!x2.value || P2.value == null || u2.tabs.value.length <= 0)
      return;
    let t2 = O(u2.tabs.value, o$2);
    t2.some((d2, e2) => o$2(u2.tabs.value[e2]) !== o$2(d2)) && u2.setSelectedIndex(t2.findIndex((d2) => o$2(d2) === o$2(u2.tabs.value[P2.value])));
  }), () => {
    let t2 = { selectedIndex: i2.value };
    return h(Fragment, [l2.value.length <= 0 && h(d$1, { onFocus: () => {
      for (let n2 of l2.value) {
        let d2 = o$2(n2);
        if ((d2 == null ? void 0 : d2.tabIndex) === 0)
          return d2.focus(), true;
      }
      return false;
    } }), A$3({ theirProps: { ...s2, ...T$1(a2, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: b, attrs: s2, name: "TabGroup" })]);
  };
} }), me$1 = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { attrs: b, slots: s2 }) {
  let o2 = C("TabList");
  return () => {
    let i2 = { selectedIndex: o2.selectedIndex.value }, l2 = { role: "tablist", "aria-orientation": o2.orientation.value };
    return A$3({ ourProps: l2, theirProps: a2, slot: i2, attrs: b, slots: s2, name: "TabList" });
  };
} }), xe = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(a2, { attrs: b, slots: s2, expose: o$12 }) {
  var d2;
  let i2 = (d2 = a2.id) != null ? d2 : `headlessui-tabs-tab-${I$1()}`, l2 = C("Tab"), r = ref(null);
  o$12({ el: r, $el: r }), onMounted(() => l2.registerTab(r)), onUnmounted(() => l2.unregisterTab(r));
  let x2 = inject(G), P$1 = computed(() => {
    if (x2.value) {
      let e2 = x2.value.tabs.indexOf(i2);
      return e2 === -1 ? x2.value.tabs.push(i2) - 1 : e2;
    }
    return -1;
  }), y2 = computed(() => {
    let e2 = l2.tabs.value.indexOf(r);
    return e2 === -1 ? P$1.value : e2;
  }), u2 = computed(() => y2.value === l2.selectedIndex.value);
  function T2(e2) {
    var I2;
    let c2 = e2();
    if (c2 === T$1$1.Success && l2.activation.value === "auto") {
      let p = (I2 = i$2(r)) == null ? void 0 : I2.activeElement, D = l2.tabs.value.findIndex((O2) => o$2(O2) === p);
      D !== -1 && l2.setSelectedIndex(D);
    }
    return c2;
  }
  function m2(e2) {
    let c2 = l2.tabs.value.map((p) => o$2(p)).filter(Boolean);
    if (e2.key === o$1.Space || e2.key === o$1.Enter) {
      e2.preventDefault(), e2.stopPropagation(), l2.setSelectedIndex(y2.value);
      return;
    }
    switch (e2.key) {
      case o$1.Home:
      case o$1.PageUp:
        return e2.preventDefault(), e2.stopPropagation(), T2(() => P(c2, N$1$1.First));
      case o$1.End:
      case o$1.PageDown:
        return e2.preventDefault(), e2.stopPropagation(), T2(() => P(c2, N$1$1.Last));
    }
    if (T2(() => u$1$1(l2.orientation.value, { vertical() {
      return e2.key === o$1.ArrowUp ? P(c2, N$1$1.Previous | N$1$1.WrapAround) : e2.key === o$1.ArrowDown ? P(c2, N$1$1.Next | N$1$1.WrapAround) : T$1$1.Error;
    }, horizontal() {
      return e2.key === o$1.ArrowLeft ? P(c2, N$1$1.Previous | N$1$1.WrapAround) : e2.key === o$1.ArrowRight ? P(c2, N$1$1.Next | N$1$1.WrapAround) : T$1$1.Error;
    } })) === T$1$1.Success)
      return e2.preventDefault();
  }
  let R2 = ref(false);
  function w2() {
    var e2;
    R2.value || (R2.value = true, !a2.disabled && ((e2 = o$2(r)) == null || e2.focus({ preventScroll: true }), l2.setSelectedIndex(y2.value), t$1(() => {
      R2.value = false;
    })));
  }
  function t2(e2) {
    e2.preventDefault();
  }
  let n2 = s$2(computed(() => ({ as: a2.as, type: b.type })), r);
  return () => {
    var p;
    let e2 = { selected: u2.value }, { ...c2 } = a2, I2 = { ref: r, onKeydown: m2, onMousedown: t2, onClick: w2, id: i2, role: "tab", type: n2.value, "aria-controls": (p = o$2(l2.panels.value[y2.value])) == null ? void 0 : p.id, "aria-selected": u2.value, tabIndex: u2.value ? 0 : -1, disabled: a2.disabled ? true : void 0 };
    return A$3({ ourProps: I2, theirProps: c2, slot: e2, attrs: b, slots: s2, name: "Tab" });
  };
} }), Ie = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { slots: b, attrs: s2 }) {
  let o2 = C("TabPanels");
  return () => {
    let i2 = { selectedIndex: o2.selectedIndex.value };
    return A$3({ theirProps: a2, ourProps: {}, slot: i2, attrs: s2, slots: b, name: "TabPanels" });
  };
} }), ye = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null }, tabIndex: { type: Number, default: 0 } }, setup(a2, { attrs: b, slots: s2, expose: o$12 }) {
  var T2;
  let i2 = (T2 = a2.id) != null ? T2 : `headlessui-tabs-panel-${I$1()}`, l2 = C("TabPanel"), r = ref(null);
  o$12({ el: r, $el: r }), onMounted(() => l2.registerPanel(r)), onUnmounted(() => l2.unregisterPanel(r));
  let x2 = inject(G), P2 = computed(() => {
    if (x2.value) {
      let m2 = x2.value.panels.indexOf(i2);
      return m2 === -1 ? x2.value.panels.push(i2) - 1 : m2;
    }
    return -1;
  }), y2 = computed(() => {
    let m2 = l2.panels.value.indexOf(r);
    return m2 === -1 ? P2.value : m2;
  }), u2 = computed(() => y2.value === l2.selectedIndex.value);
  return () => {
    var n2;
    let m2 = { selected: u2.value }, { tabIndex: R2, ...w2 } = a2, t2 = { ref: r, id: i2, role: "tabpanel", "aria-labelledby": (n2 = o$2(l2.tabs.value[y2.value])) == null ? void 0 : n2.id, tabIndex: u2.value ? R2 : -1 };
    return !u2.value && a2.unmount && !a2.static ? h(f, { as: "span", "aria-hidden": true, ...t2 }) : A$3({ ourProps: t2, theirProps: w2, slot: m2, attrs: b, slots: s2, features: N$4.Static | N$4.RenderStrategy, visible: u2.value, name: "TabPanel" });
  };
} });
function l(r) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g$1 = ((i2) => (i2.Finished = "finished", i2.Cancelled = "cancelled", i2))(g$1 || {});
function F(e2, t2) {
  let i2 = o();
  if (!e2)
    return i2.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s2] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r) => r.includes("ms") ? parseFloat(r) : parseFloat(r) * 1e3).sort((r, c2) => c2 - r);
    return u2;
  });
  return l2 !== 0 ? i2.setTimeout(() => t2("finished"), l2 + s2) : t2("finished"), i2.add(() => t2("cancelled")), i2.dispose;
}
function L$1(e2, t2, i2, n2, a2, l$12) {
  let s2 = o(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d(e2, ...a2), m(e2, ...t2, ...i2), s2.nextFrame(() => {
    d(e2, ...i2), m(e2, ...n2), s2.add(F(e2, (u2) => (d(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s2.add(() => d(e2, ...t2, ...i2, ...n2, ...a2)), s2.add(() => o2("cancelled")), s2.dispose;
}
function g(e2 = "") {
  return e2.split(/\s+/).filter((t2) => t2.length > 1);
}
let R = Symbol("TransitionContext");
var pe = ((a2) => (a2.Visible = "visible", a2.Hidden = "hidden", a2))(pe || {});
function me() {
  return inject(R, null) !== null;
}
function Te() {
  let e2 = inject(R, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function ge() {
  let e2 = inject(N, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let N = Symbol("NestingContext");
function L(e2) {
  return "children" in e2 ? L(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function Q(e2) {
  let t2 = ref([]), a2 = ref(false);
  onMounted(() => a2.value = true), onUnmounted(() => a2.value = false);
  function s2(n2, r = S.Hidden) {
    let l2 = t2.value.findIndex(({ id: f2 }) => f2 === n2);
    l2 !== -1 && (u$1$1(r, { [S.Unmount]() {
      t2.value.splice(l2, 1);
    }, [S.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !L(t2) && a2.value && (e2 == null || e2()));
  }
  function h2(n2) {
    let r = t2.value.find(({ id: l2 }) => l2 === n2);
    return r ? r.state !== "visible" && (r.state = "visible") : t2.value.push({ id: n2, state: "visible" }), () => s2(n2, S.Unmount);
  }
  return { children: t2, register: h2, unregister: s2 };
}
let W = N$4.RenderStrategy, he = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s2$1, expose: h$1 }) {
  let n2 = ref(0);
  function r() {
    n2.value |= i$1.Opening, t2("beforeEnter");
  }
  function l2() {
    n2.value &= ~i$1.Opening, t2("afterEnter");
  }
  function f2() {
    n2.value |= i$1.Closing, t2("beforeLeave");
  }
  function S2() {
    n2.value &= ~i$1.Closing, t2("afterLeave");
  }
  if (!me() && s2())
    return () => h(Se, { ...e2, onBeforeEnter: r, onAfterEnter: l2, onBeforeLeave: f2, onAfterLeave: S2 }, s2$1);
  let d2 = ref(null), y2 = computed(() => e2.unmount ? S.Unmount : S.Hidden);
  h$1({ el: d2, $el: d2 });
  let { show: v, appear: A2 } = Te(), { register: D, unregister: H2 } = ge(), i2 = ref(v.value ? "visible" : "hidden"), I$1$1 = { value: true }, c2 = I$1(), b = { value: false }, P2 = Q(() => {
    !b.value && i2.value !== "hidden" && (i2.value = "hidden", H2(c2), S2());
  });
  onMounted(() => {
    let o2 = D(c2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (y2.value === S.Hidden && c2) {
      if (v.value && i2.value !== "visible") {
        i2.value = "visible";
        return;
      }
      u$1$1(i2.value, { ["hidden"]: () => H2(c2), ["visible"]: () => D(c2) });
    }
  });
  let j = g(e2.enter), M = g(e2.enterFrom), X = g(e2.enterTo), _2 = g(e2.entered), Y = g(e2.leave), Z = g(e2.leaveFrom), ee = g(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (i2.value === "visible") {
        let o$12 = o$2(d2);
        if (o$12 instanceof Comment && o$12.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function te2(o$12) {
    let E2 = I$1$1.value && !A2.value, p = o$2(d2);
    !p || !(p instanceof HTMLElement) || E2 || (b.value = true, v.value && r(), v.value || f2(), o$12(v.value ? L$1(p, j, M, X, _2, (V) => {
      b.value = false, V === g$1.Finished && l2();
    }) : L$1(p, Y, Z, ee, _2, (V) => {
      b.value = false, V === g$1.Finished && (L(P2) || (i2.value = "hidden", H2(c2), S2()));
    })));
  }
  return onMounted(() => {
    watch([v], (o2, E2, p) => {
      te2(p), I$1$1.value = false;
    }, { immediate: true });
  }), provide(N, P2), t$2(computed(() => u$1$1(i2.value, { ["visible"]: i$1.Open, ["hidden"]: i$1.Closed }) | n2.value)), () => {
    let { appear: o2, show: E2, enter: p, enterFrom: V, enterTo: Ce, entered: ye2, leave: be, leaveFrom: Ee, leaveTo: Ve, ...U2 } = e2, ne = { ref: d2 }, re = { ...U2, ...A2.value && v.value && c$1.isServer ? { class: normalizeClass([a2.class, U2.class, ...j, ...M]) } : {} };
    return A$3({ theirProps: re, ourProps: ne, slot: {}, slots: s2$1, attrs: a2, features: W, visible: i2.value === "visible", name: "TransitionChild" });
  };
} }), ce = he, Se = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s2 }) {
  let h$1 = l$2(), n2 = computed(() => e2.show === null && h$1 !== null ? (h$1.value & i$1.Open) === i$1.Open : e2.show);
  watchEffect(() => {
    if (![true, false].includes(n2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let r = ref(n2.value ? "visible" : "hidden"), l2 = Q(() => {
    r.value = "hidden";
  }), f2 = ref(true), S2 = { show: n2, appear: computed(() => e2.appear || !f2.value) };
  return onMounted(() => {
    watchEffect(() => {
      f2.value = false, n2.value ? r.value = "visible" : L(l2) || (r.value = "hidden");
    });
  }), provide(N, l2), provide(R, S2), () => {
    let d2 = T$1(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), y2 = { unmount: e2.unmount };
    return A$3({ ourProps: { ...y2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s2, default: () => [h(ce, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a2, ...y2, ...d2 }, s2.default)] }, attrs: {}, features: W, visible: r.value === "visible", name: "Transition" });
  };
} });
const config$1 = mergeConfig(appConfig.ui.strategy, appConfig.ui.slideover, slideover);
const _sfc_main$2 = defineComponent({
  components: {
    HDialog: We,
    HDialogPanel: Ge,
    TransitionRoot: Se,
    TransitionChild: he
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    appear: {
      type: Boolean,
      default: false
    },
    side: {
      type: String,
      default: "right",
      validator: (value) => ["left", "right"].includes(value)
    },
    overlay: {
      type: Boolean,
      default: true
    },
    transition: {
      type: Boolean,
      default: true
    },
    preventClose: {
      type: Boolean,
      default: false
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
  emits: ["update:modelValue", "close", "close-prevented"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("slideover", toRef(props, "ui"), config$1, toRef(props, "class"));
    const isOpen = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
      }
    });
    const transitionClass = computed(() => {
      if (!props.transition) {
        return {};
      }
      return {
        ...ui.value.transition,
        enterFrom: props.side === "left" ? ui.value.translate.left : ui.value.translate.right,
        enterTo: ui.value.translate.base,
        leaveFrom: ui.value.translate.base,
        leaveTo: props.side === "left" ? ui.value.translate.left : ui.value.translate.right
      };
    });
    function close(value) {
      if (props.preventClose) {
        emit("close-prevented");
        return;
      }
      isOpen.value = value;
      emit("close");
    }
    l$1$1(() => useId("$Svc0XIdo23"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      isOpen,
      transitionClass,
      close
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TransitionRoot = resolveComponent("TransitionRoot");
  const _component_HDialog = resolveComponent("HDialog");
  const _component_TransitionChild = resolveComponent("TransitionChild");
  const _component_HDialogPanel = resolveComponent("HDialogPanel");
  _push(ssrRenderComponent(_component_TransitionRoot, mergeProps({
    as: "template",
    appear: _ctx.appear,
    show: _ctx.isOpen
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HDialog, mergeProps({
          class: [_ctx.ui.wrapper, { "justify-end": _ctx.side === "right" }]
        }, _ctx.attrs, { onClose: _ctx.close }), {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if (_ctx.overlay) {
                _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition), {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId3}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(ssrRenderComponent(_component_TransitionChild, mergeProps({
                as: "template",
                appear: _ctx.appear
              }, _ctx.transitionClass), {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_HDialogPanel, {
                      class: [_ctx.ui.base, _ctx.ui.width, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.padding]
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push5, _parent5, _scopeId4);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_HDialogPanel, {
                        class: [_ctx.ui.base, _ctx.ui.width, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.padding]
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 8, ["class"])
                    ];
                  }
                }),
                _: 3
              }, _parent3, _scopeId2));
            } else {
              return [
                _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                  key: 0,
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.ui.overlay.transition), {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                    }, null, 2)
                  ]),
                  _: 1
                }, 16, ["appear"])) : createCommentVNode("", true),
                createVNode(_component_TransitionChild, mergeProps({
                  as: "template",
                  appear: _ctx.appear
                }, _ctx.transitionClass), {
                  default: withCtx(() => [
                    createVNode(_component_HDialogPanel, {
                      class: [_ctx.ui.base, _ctx.ui.width, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.padding]
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 8, ["class"])
                  ]),
                  _: 3
                }, 16, ["appear"])
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HDialog, mergeProps({
            class: [_ctx.ui.wrapper, { "justify-end": _ctx.side === "right" }]
          }, _ctx.attrs, { onClose: _ctx.close }), {
            default: withCtx(() => [
              _ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
                key: 0,
                as: "template",
                appear: _ctx.appear
              }, _ctx.ui.overlay.transition), {
                default: withCtx(() => [
                  createVNode("div", {
                    class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
                  }, null, 2)
                ]),
                _: 1
              }, 16, ["appear"])) : createCommentVNode("", true),
              createVNode(_component_TransitionChild, mergeProps({
                as: "template",
                appear: _ctx.appear
              }, _ctx.transitionClass), {
                default: withCtx(() => [
                  createVNode(_component_HDialogPanel, {
                    class: [_ctx.ui.base, _ctx.ui.width, _ctx.ui.background, _ctx.ui.ring, _ctx.ui.padding]
                  }, {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["class"])
                ]),
                _: 3
              }, 16, ["appear"])
            ]),
            _: 3
          }, 16, ["class", "onClose"])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+ui@2.14.1_nuxt@3.10.3_vite@5.1.4_vue@3.4.21/node_modules/@nuxt/ui/dist/runtime/components/overlays/Slideover.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.tabs, tabs);
const _sfc_main$1 = defineComponent({
  components: {
    HTabGroup: pe$1,
    HTabList: me$1,
    HTab: xe,
    HTabPanels: Ie,
    HTabPanel: ye
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: void 0
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    },
    unmount: {
      type: Boolean,
      default: false
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
  setup(props, { emit }) {
    const { ui, attrs } = useUI("tabs", toRef(props, "ui"), config, toRef(props, "class"));
    const listRef = ref();
    const itemRefs = ref([]);
    const markerRef = ref();
    const selectedIndex = ref(props.modelValue || props.defaultIndex);
    function calcMarkerSize(index) {
      var _a;
      const tab = (_a = itemRefs.value[index]) == null ? void 0 : _a.$el;
      if (!tab) {
        return;
      }
      if (!markerRef.value) {
        return;
      }
      markerRef.value.style.top = `${tab.offsetTop}px`;
      markerRef.value.style.left = `${tab.offsetLeft}px`;
      markerRef.value.style.width = `${tab.offsetWidth}px`;
      markerRef.value.style.height = `${tab.offsetHeight}px`;
    }
    function onChange(index) {
      selectedIndex.value = index;
      emit("change", index);
      if (props.modelValue !== void 0) {
        emit("update:modelValue", selectedIndex.value);
      }
      calcMarkerSize(selectedIndex.value);
    }
    useResizeObserver(listRef, () => {
      calcMarkerSize(selectedIndex.value);
    });
    watch(() => props.modelValue, (value) => {
      selectedIndex.value = value;
      calcMarkerSize(selectedIndex.value);
    });
    l$1$1(() => useId("$uhaqBgGPVZ"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      listRef,
      itemRefs,
      markerRef,
      selectedIndex,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HTabGroup = resolveComponent("HTabGroup");
  const _component_HTabList = resolveComponent("HTabList");
  const _component_HTab = resolveComponent("HTab");
  const _component_HTabPanels = resolveComponent("HTabPanels");
  const _component_HTabPanel = resolveComponent("HTabPanel");
  _push(ssrRenderComponent(_component_HTabGroup, mergeProps({
    vertical: _ctx.orientation === "vertical",
    "selected-index": _ctx.selectedIndex,
    as: "div",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onChange: _ctx.onChange }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HTabList, {
          ref: "listRef",
          class: [_ctx.ui.list.base, _ctx.ui.list.background, _ctx.ui.list.rounded, _ctx.ui.list.shadow, _ctx.ui.list.padding, _ctx.ui.list.width, _ctx.orientation === "horizontal" && _ctx.ui.list.height, _ctx.orientation === "horizontal" && "inline-grid items-center"],
          style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="${ssrRenderClass(_ctx.ui.list.marker.wrapper)}"${_scopeId2}><div class="${ssrRenderClass([_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow])}"${_scopeId2}></div></div><!--[-->`);
              ssrRenderList(_ctx.items, (item, index) => {
                _push3(ssrRenderComponent(_component_HTab, {
                  key: index,
                  ref_for: true,
                  ref: "itemRefs",
                  disabled: item.disabled,
                  as: "template"
                }, {
                  default: withCtx(({ selected, disabled }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<button class="${ssrRenderClass([_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive])}"${_scopeId3}>`);
                      ssrRenderSlot(_ctx.$slots, "default", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => {
                        _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(item.label)}</span>`);
                      }, _push4, _parent4, _scopeId3);
                      _push4(`</button>`);
                    } else {
                      return [
                        createVNode("button", {
                          class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                        }, [
                          renderSlot(_ctx.$slots, "default", {
                            item,
                            index,
                            selected,
                            disabled
                          }, () => [
                            createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                          ])
                        ], 2)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                createVNode("div", {
                  ref: "markerRef",
                  class: _ctx.ui.list.marker.wrapper
                }, [
                  createVNode("div", {
                    class: [_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow]
                  }, null, 2)
                ], 2),
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                  return openBlock(), createBlock(_component_HTab, {
                    key: index,
                    ref_for: true,
                    ref: "itemRefs",
                    disabled: item.disabled,
                    as: "template"
                  }, {
                    default: withCtx(({ selected, disabled }) => [
                      createVNode("button", {
                        class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                      }, [
                        renderSlot(_ctx.$slots, "default", {
                          item,
                          index,
                          selected,
                          disabled
                        }, () => [
                          createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                        ])
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["disabled"]);
                }), 128))
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_HTabPanels, {
          class: _ctx.ui.container
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(_ctx.items, (item, index) => {
                _push3(ssrRenderComponent(_component_HTabPanel, {
                  key: index,
                  class: _ctx.ui.base,
                  unmount: _ctx.unmount
                }, {
                  default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                        item,
                        index,
                        selected
                      }, () => {
                        _push4(`${ssrInterpolate(item.content)}`);
                      }, _push4, _parent4, _scopeId3);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot || "item", {
                          item,
                          index,
                          selected
                        }, () => [
                          createTextVNode(toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                  return openBlock(), createBlock(_component_HTabPanel, {
                    key: index,
                    class: _ctx.ui.base,
                    unmount: _ctx.unmount
                  }, {
                    default: withCtx(({ selected }) => [
                      renderSlot(_ctx.$slots, item.slot || "item", {
                        item,
                        index,
                        selected
                      }, () => [
                        createTextVNode(toDisplayString(item.content), 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["class", "unmount"]);
                }), 128))
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HTabList, {
            ref: "listRef",
            class: [_ctx.ui.list.base, _ctx.ui.list.background, _ctx.ui.list.rounded, _ctx.ui.list.shadow, _ctx.ui.list.padding, _ctx.ui.list.width, _ctx.orientation === "horizontal" && _ctx.ui.list.height, _ctx.orientation === "horizontal" && "inline-grid items-center"],
            style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
          }, {
            default: withCtx(() => [
              createVNode("div", {
                ref: "markerRef",
                class: _ctx.ui.list.marker.wrapper
              }, [
                createVNode("div", {
                  class: [_ctx.ui.list.marker.base, _ctx.ui.list.marker.background, _ctx.ui.list.marker.rounded, _ctx.ui.list.marker.shadow]
                }, null, 2)
              ], 2),
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                return openBlock(), createBlock(_component_HTab, {
                  key: index,
                  ref_for: true,
                  ref: "itemRefs",
                  disabled: item.disabled,
                  as: "template"
                }, {
                  default: withCtx(({ selected, disabled }) => [
                    createVNode("button", {
                      class: [_ctx.ui.list.tab.base, _ctx.ui.list.tab.background, _ctx.ui.list.tab.height, _ctx.ui.list.tab.padding, _ctx.ui.list.tab.size, _ctx.ui.list.tab.font, _ctx.ui.list.tab.rounded, _ctx.ui.list.tab.shadow, selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive]
                    }, [
                      renderSlot(_ctx.$slots, "default", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => [
                        createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)
                      ])
                    ], 2)
                  ]),
                  _: 2
                }, 1032, ["disabled"]);
              }), 128))
            ]),
            _: 3
          }, 8, ["class", "style"]),
          createVNode(_component_HTabPanels, {
            class: _ctx.ui.container
          }, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                return openBlock(), createBlock(_component_HTabPanel, {
                  key: index,
                  class: _ctx.ui.base,
                  unmount: _ctx.unmount
                }, {
                  default: withCtx(({ selected }) => [
                    renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      selected
                    }, () => [
                      createTextVNode(toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["class", "unmount"]);
              }), 128))
            ]),
            _: 3
          }, 8, ["class"])
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+ui@2.14.1_nuxt@3.10.3_vite@5.1.4_vue@3.4.21/node_modules/@nuxt/ui/dist/runtime/components/navigation/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const checkAndGenerateAnswer = (excercies, response) => {
  const incorrect = response.filter((item) => {
    const index = item["STT"];
    const res = excercies[index];
    return item["\u0110\xE1p \xC1n"] !== res;
  });
  return incorrect;
};
const studentColumns = [
  {
    key: "H\u1ECD v\xE0 T\xEAn",
    label: "H\u1ECD v\xE0 T\xEAn",
    class: "w-[120px]"
  },
  {
    key: "S\u1ED1 B\xE1o Danh",
    label: "S\u1ED1 B\xE1o Danh",
    class: "w-[100px]"
  },
  {
    key: "M\xE3 \u0111\u1EC1",
    label: "M\xE3 \u0111\u1EC1",
    class: "w-[60px]"
  },
  {
    key: "\u0110i\u1EC3m",
    label: "\u0110i\u1EC3m",
    class: "w-[120px]"
  }
];
const pageCount = 10;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $pdfMake } = useNuxtApp();
    const toast = useToast();
    const successMessage = ref(null);
    const isOpen = ref(false);
    const state = reactive({
      code: void 0,
      class: void 0,
      types: void 0,
      file: void 0,
      emailtest: "",
      columns: [],
      excercies: [],
      students: [],
      studentActive: void 0,
      answer: [],
      pdf: [],
      loading: false
    });
    const page = ref(1);
    const handleChangeFile = (event) => {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = (e2) => {
        const csvText = e2.target.result;
        const startLineIndex = 0;
        const { jsonData, header } = readLinesFromCSV(csvText, startLineIndex);
        const colsAdding = header.filter((item) => !!Number(item)).map((item) => ({
          key: item,
          label: `C\xE2u ${item}`,
          class: "w-[60px]"
        }));
        state.columns = [...studentColumns, ...colsAdding];
        state.excercies = [...jsonData];
        state.studentActive = state.excercies[0];
        state.students = state.excercies.map((item) => {
          return {
            label: `${item["H\u1ECD v\xE0 T\xEAn"]} (${item["S\u1ED1 B\xE1o Danh"]}) - ${item["M\xE3 \u0111\u1EC1"]}`,
            content: `${item["H\u1ECD v\xE0 T\xEAn"]} (${item["S\u1ED1 B\xE1o Danh"]}) - ${item["M\xE3 \u0111\u1EC1"]}`,
            value: item,
            slot: "pdf"
          };
        });
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
    const loadPdf = async () => {
      const pdfMaker = $pdfMake;
      pdfMaker.tableLayouts = {
        custom: {
          fillColor: function(rowIndex) {
            return rowIndex % 2 !== 0 ? "#00000" : null;
          },
          hLineColor: "#00000",
          vLineColor: "#00000",
          paddingLeft: function() {
            return 10;
          },
          paddingRight: function() {
            return 10;
          }
        }
      };
      const answer = state.studentActive.incorrerAnswer.map((item) => ({
        question: `${item["C\xE2u H\u1ECFi"]} - ${item["Gi\u1EA3i ph\xE1p"]}`,
        link: "https://www.google.co.uk/"
      }));
      `${state.studentActive["H\u1ECD v\xE0 T\xEAn"]}(${state.studentActive["S\u1ED1 B\xE1o Danh"]})-${state.studentActive["M\xE3 \u0111\u1EC1"]}.pdf`;
      const mark = caculatorMark();
      const content = generateContent(state.studentActive, answer, mark);
      pdfMaker.createPdf(content).getDataUrl((base64Data) => {
        base64ToPDF(
          base64Data.replace("data:application/pdf;base64,", "")
        );
      });
    };
    const dowloadPdf = async () => {
      const pdfMaker = $pdfMake;
      pdfMaker.tableLayouts = {
        custom: {
          fillColor: function(rowIndex) {
            return rowIndex % 2 !== 0 ? "#00000" : null;
          },
          hLineColor: "#00000",
          vLineColor: "#00000",
          paddingLeft: function() {
            return 10;
          },
          paddingRight: function() {
            return 10;
          }
        }
      };
      const answer = state.studentActive.incorrerAnswer.map((item) => ({
        question: `${item["C\xE2u H\u1ECFi"]} - ${item["Gi\u1EA3i ph\xE1p"]}`,
        link: "https://www.google.co.uk/"
      }));
      const filename = `${state.studentActive["H\u1ECD v\xE0 T\xEAn"]}(${state.studentActive["S\u1ED1 B\xE1o Danh"]})-${state.studentActive["M\xE3 \u0111\u1EC1"]}.pdf`;
      const mark = caculatorMark();
      const content = generateContent(state.studentActive, answer, mark);
      pdfMaker.createPdf(content).getDataUrl((base64Data) => {
        const blob = base64ToPDF(
          base64Data.replace("data:application/pdf;base64,", "")
        );
        const url = URL.createObjectURL(blob);
        const link = (void 0).createElement("a");
        link.href = url;
        link.download = filename || "loigiai.pdf";
        link.click();
        URL.revokeObjectURL(url);
      });
    };
    const base64ToPDF = (base64Data, fileName) => {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i2 = 0; i2 < byteCharacters.length; i2++) {
        byteNumbers[i2] = byteCharacters.charCodeAt(i2);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      state.pdf = blob;
      return blob;
    };
    const generateHTMLToPDF = async () => {
      dowloadPdf();
    };
    const onMarkStudent = (index) => {
      const student = state.students[index].value;
      const incorrerAnswer = checkAndGenerateAnswer(student, state.answer);
      state.studentActive = { ...student, incorrerAnswer };
    };
    const onLoadAnswer = () => {
      isOpen.value = false;
    };
    const schema = z$1.object({
      code: z$1.string().min(3, "Ph\u1EA3i nhi\u1EC1u h\u01A1n 3 k\xFD t\u1EF1")
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
      state.loading = true;
      const body = {
        code: event.data.code
      };
      $fetch("/api/exam/find", { method: "POST", body }).then((response) => {
        if (response.length)
          state.answer = Object.values(response[0].excercies);
        onMarkStudent(0);
        loadPdf();
        isOpen.value = true;
      }).catch(() => {
        toast.add({ title: "Kh\xF4ng t\xECm th\u1EA5y", timeout: 3e3 });
        isOpen.value = false;
      }).finally(() => {
        state.loading = false;
      });
    }
    async function sendEmail() {
      await loadPdf();
      state.loading = true;
      const data = {
        name: state.studentActive,
        email: state.emailtest,
        subject: "Trung t\xE2m NQH Q10 - S\u1EEDa k\u1EBFt qu\u1EA3 l\xE0m b\xE0i",
        body: `Ch\xE0o c\xE1c h\u1ECDc vi\xEAn c\u1EE7a NQH Q10. Trung t\xE2m xin g\u1EEDi n\u1ED9i dung cho c\xE1c b\u1EA1n \u0111\u1EC3 r\xE8n luy\u1EC7n th\xEAm. File \u0111\xE1p \xE1n v\xE0 l\u1EDDi gi\u1EA3i chi ti\u1EBFt \u0111\u01B0\u1EE3c \u0111\xEDnh k\xE8m tr\u1EF1c ti\u1EBFp b\xEAn d\u01B0\u1EDBi. 
 S\u1ED1 \u0111i\u1EC3m: ${caculatorMark()}`
      };
      successMessage.value = null;
      const filename = `${state.studentActive["S\u1ED1 B\xE1o Danh"]}-${state.studentActive["M\xE3 \u0111\u1EC1"]}.pdf`;
      const headers = new Headers({
        fileName: filename
      });
      const form = new FormData();
      form.append("name", state.studentActive["H\u1ECD v\xE0 T\xEAn"]);
      form.append("email", data.email);
      form.append("subject", data.subject);
      form.append("body", data.body);
      form.append("pdf", state.pdf);
      const requestData = {
        formData: form,
        fileHeaders: headers
      };
      const requestInit = {
        method: "POST",
        body: requestData.formData,
        headers: requestData.fileHeaders
      };
      try {
        $fetch("/api/user/email-sender", requestInit).then((data2) => {
          successMessage.value = "Email has been sent.";
        }).catch((error) => {
          console.log("error", error);
        }).finally(() => {
          state.loading = false;
        });
      } catch (error) {
        console.log(error);
      }
    }
    const caculatorMark = () => {
      return ((50 - state.studentActive.incorrerAnswer.length) / 50 * 10).toFixed(1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_USlideover = __nuxt_component_0;
      const _component_UCard = __nuxt_component_0$1;
      const _component_UButton = __nuxt_component_0$2;
      const _component_UTabs = __nuxt_component_3;
      const _component_UProgress = __nuxt_component_4;
      const _component_UFormGroup = __nuxt_component_2;
      const _component_UInput = __nuxt_component_3$1;
      const _component_UForm = __nuxt_component_1;
      const _component_UTable = __nuxt_component_6;
      const _component_UPagination = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-full flex-col gap-3 w-full overflow-y-hidden px-2 py-1" }, _attrs))}><div class="w-full bg-white rounded-md flex gap-2"></div><div>`);
      _push(ssrRenderComponent(_component_USlideover, {
        modelValue: unref(isOpen),
        "onUpdate:modelValue": ($event) => isRef(isOpen) ? isOpen.value = $event : null
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, {
              class: "flex flex-col flex-1 h-full",
              ui: {
                body: { base: "flex-1" },
                ring: "",
                divide: "divide-y divide-gray-100 dark:divide-gray-800"
              }
            }, {
              header: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white uppercase"${_scopeId2}> Ki\u1EC3m tra v\xE0 ch\u1EA5m ch\u1EEFa </h3>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "gray",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark-20-solid",
                    class: "-my-1",
                    onClick: onLoadAnswer
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900 dark:text-white uppercase" }, " Ki\u1EC3m tra v\xE0 ch\u1EA5m ch\u1EEFa "),
                      createVNode(_component_UButton, {
                        color: "gray",
                        variant: "ghost",
                        icon: "i-heroicons-x-mark-20-solid",
                        class: "-my-1",
                        onClick: onLoadAnswer
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex"${_scopeId2}><div class="p-4 h-fit"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UTabs, {
                    items: unref(state).students,
                    onChange: onMarkStudent,
                    orientation: "vertical",
                    ui: {
                      container: "relative w-full",
                      wrapper: "flex items-center gap-4",
                      list: {
                        width: "w-[240px]",
                        tab: { height: "h-8" }
                      }
                    }
                  }, {
                    pdf: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col gap-2 overflow-hidden h-[600px] p-1"${_scopeId3}>`);
                        if (unref(state).loading) {
                          _push4(ssrRenderComponent(_component_UProgress, { animation: "carousel" }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="flex justify-end gap-4"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          class: "w-fit",
                          onClick: generateHTMLToPDF
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`T\u1EA3i b\u1EA3n PDF l\u1EDDi gi\u1EA3i`);
                            } else {
                              return [
                                createTextVNode("T\u1EA3i b\u1EA3n PDF l\u1EDDi gi\u1EA3i")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormGroup, {
                          name: "code",
                          "eager-validation": "",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(state).emailtest,
                                "onUpdate:modelValue": ($event) => unref(state).emailtest = $event,
                                placeholder: "Nh\u1EADp email \u0111\xEDch \u0111\u1EC3 test"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(state).emailtest,
                                  "onUpdate:modelValue": ($event) => unref(state).emailtest = $event,
                                  placeholder: "Nh\u1EADp email \u0111\xEDch \u0111\u1EC3 test"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          class: "w-fit",
                          onClick: sendEmail
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`G\u1EEDi k\u1EBFt l\u1EDDi gi\u1EA3i qua Email`);
                            } else {
                              return [
                                createTextVNode("G\u1EEDi k\u1EBFt l\u1EDDi gi\u1EA3i qua Email")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="shadow-[0_0_1px_#7a7a7a] rounded-sm p-4 flex-1 overflow-y-scroll"${_scopeId3}><h2 class="font-semibold text-[#3973ca] text-4xl text-center"${_scopeId3}> PHI\u1EBEU D\u1EB6N D\xD2 Y\xCAU TH\u01AF\u01A0NG </h2><div class="grid grid-cols-3 px-2 gap-3 mt-3 font-semibold text-[#3973ca]"${_scopeId3}><p${_scopeId3}> H\u1ECD v\xE0 t\xEAn: `);
                        if (unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"]) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"])}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</p><p${_scopeId3}> S\u1ED1 b\xE1o danh: `);
                        if (unref(state).studentActive["S\u1ED1 B\xE1o Danh"]) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(unref(state).studentActive["S\u1ED1 B\xE1o Danh"])}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</p><p${_scopeId3}>C\u01A1 s\u1EDF: NQH Q10</p><p${_scopeId3}> \u0110i\u1EC3m b\xE0i thi: `);
                        if (unref(state).studentActive.incorrerAnswer.length) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(caculatorMark())}</span>`);
                        } else {
                          _push4(`<span${_scopeId3}> 10</span>`);
                        }
                        _push4(`</p><p${_scopeId3}> H\u1ECDc sinh \u0111ang h\u1ECDc t\u1EA1i NQH: C\xF3 </p><p${_scopeId3}> M\xE3 \u0111\u1EC1: `);
                        if (unref(state).studentActive["M\xE3 \u0111\u1EC1"]) {
                          _push4(`<span${_scopeId3}>${ssrInterpolate(unref(state).studentActive["M\xE3 \u0111\u1EC1"])}</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</p></div><p class="font-semibold text-[#313131] text-2xl text-center mt-3"${_scopeId3}> Nh\u1EEFng n\u1ED9i dung con c\u1EA7n \xF4n t\u1EADp th\xEAm - \u0110\u1EC1 s\u1ED1: 2 </p><ol class="list-decimal p-5"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(state).studentActive.incorrerAnswer, (item) => {
                          _push4(`<li${_scopeId3}><a href="https://www.google.co.uk/" class="underline text-[#3973ca]"${_scopeId3}>${ssrInterpolate(item["C\xE2u H\u1ECFi"])} - ${ssrInterpolate(item["Gi\u1EA3i ph\xE1p"])}</a></li>`);
                        });
                        _push4(`<!--]--></ol></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col gap-2 overflow-hidden h-[600px] p-1" }, [
                            unref(state).loading ? (openBlock(), createBlock(_component_UProgress, {
                              key: 0,
                              animation: "carousel"
                            })) : createCommentVNode("", true),
                            createVNode("div", { class: "flex justify-end gap-4" }, [
                              createVNode(_component_UButton, {
                                class: "w-fit",
                                onClick: generateHTMLToPDF
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("T\u1EA3i b\u1EA3n PDF l\u1EDDi gi\u1EA3i")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, {
                                name: "code",
                                "eager-validation": "",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(state).emailtest,
                                    "onUpdate:modelValue": ($event) => unref(state).emailtest = $event,
                                    placeholder: "Nh\u1EADp email \u0111\xEDch \u0111\u1EC3 test"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UButton, {
                                class: "w-fit",
                                onClick: sendEmail
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("G\u1EEDi k\u1EBFt l\u1EDDi gi\u1EA3i qua Email")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "shadow-[0_0_1px_#7a7a7a] rounded-sm p-4 flex-1 overflow-y-scroll" }, [
                              createVNode("h2", { class: "font-semibold text-[#3973ca] text-4xl text-center" }, " PHI\u1EBEU D\u1EB6N D\xD2 Y\xCAU TH\u01AF\u01A0NG "),
                              createVNode("div", { class: "grid grid-cols-3 px-2 gap-3 mt-3 font-semibold text-[#3973ca]" }, [
                                createVNode("p", null, [
                                  createTextVNode(" H\u1ECD v\xE0 t\xEAn: "),
                                  unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("p", null, [
                                  createTextVNode(" S\u1ED1 b\xE1o danh: "),
                                  unref(state).studentActive["S\u1ED1 B\xE1o Danh"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["S\u1ED1 B\xE1o Danh"]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("p", null, "C\u01A1 s\u1EDF: NQH Q10"),
                                createVNode("p", null, [
                                  createTextVNode(" \u0110i\u1EC3m b\xE0i thi: "),
                                  unref(state).studentActive.incorrerAnswer.length ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(caculatorMark()), 1)) : (openBlock(), createBlock("span", { key: 1 }, " 10"))
                                ]),
                                createVNode("p", null, " H\u1ECDc sinh \u0111ang h\u1ECDc t\u1EA1i NQH: C\xF3 "),
                                createVNode("p", null, [
                                  createTextVNode(" M\xE3 \u0111\u1EC1: "),
                                  unref(state).studentActive["M\xE3 \u0111\u1EC1"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["M\xE3 \u0111\u1EC1"]), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("p", { class: "font-semibold text-[#313131] text-2xl text-center mt-3" }, " Nh\u1EEFng n\u1ED9i dung con c\u1EA7n \xF4n t\u1EADp th\xEAm - \u0110\u1EC1 s\u1ED1: 2 "),
                              createVNode("ol", { class: "list-decimal p-5" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(state).studentActive.incorrerAnswer, (item) => {
                                  return openBlock(), createBlock("li", null, [
                                    createVNode("a", {
                                      href: "https://www.google.co.uk/",
                                      class: "underline text-[#3973ca]"
                                    }, toDisplayString(item["C\xE2u H\u1ECFi"]) + " - " + toDisplayString(item["Gi\u1EA3i ph\xE1p"]), 1)
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "p-4 h-fit" }, [
                        createVNode(_component_UTabs, {
                          items: unref(state).students,
                          onChange: onMarkStudent,
                          orientation: "vertical",
                          ui: {
                            container: "relative w-full",
                            wrapper: "flex items-center gap-4",
                            list: {
                              width: "w-[240px]",
                              tab: { height: "h-8" }
                            }
                          }
                        }, {
                          pdf: withCtx(() => [
                            createVNode("div", { class: "flex flex-col gap-2 overflow-hidden h-[600px] p-1" }, [
                              unref(state).loading ? (openBlock(), createBlock(_component_UProgress, {
                                key: 0,
                                animation: "carousel"
                              })) : createCommentVNode("", true),
                              createVNode("div", { class: "flex justify-end gap-4" }, [
                                createVNode(_component_UButton, {
                                  class: "w-fit",
                                  onClick: generateHTMLToPDF
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("T\u1EA3i b\u1EA3n PDF l\u1EDDi gi\u1EA3i")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UFormGroup, {
                                  name: "code",
                                  "eager-validation": "",
                                  required: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(state).emailtest,
                                      "onUpdate:modelValue": ($event) => unref(state).emailtest = $event,
                                      placeholder: "Nh\u1EADp email \u0111\xEDch \u0111\u1EC3 test"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UButton, {
                                  class: "w-fit",
                                  onClick: sendEmail
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("G\u1EEDi k\u1EBFt l\u1EDDi gi\u1EA3i qua Email")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "shadow-[0_0_1px_#7a7a7a] rounded-sm p-4 flex-1 overflow-y-scroll" }, [
                                createVNode("h2", { class: "font-semibold text-[#3973ca] text-4xl text-center" }, " PHI\u1EBEU D\u1EB6N D\xD2 Y\xCAU TH\u01AF\u01A0NG "),
                                createVNode("div", { class: "grid grid-cols-3 px-2 gap-3 mt-3 font-semibold text-[#3973ca]" }, [
                                  createVNode("p", null, [
                                    createTextVNode(" H\u1ECD v\xE0 t\xEAn: "),
                                    unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("p", null, [
                                    createTextVNode(" S\u1ED1 b\xE1o danh: "),
                                    unref(state).studentActive["S\u1ED1 B\xE1o Danh"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["S\u1ED1 B\xE1o Danh"]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("p", null, "C\u01A1 s\u1EDF: NQH Q10"),
                                  createVNode("p", null, [
                                    createTextVNode(" \u0110i\u1EC3m b\xE0i thi: "),
                                    unref(state).studentActive.incorrerAnswer.length ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(caculatorMark()), 1)) : (openBlock(), createBlock("span", { key: 1 }, " 10"))
                                  ]),
                                  createVNode("p", null, " H\u1ECDc sinh \u0111ang h\u1ECDc t\u1EA1i NQH: C\xF3 "),
                                  createVNode("p", null, [
                                    createTextVNode(" M\xE3 \u0111\u1EC1: "),
                                    unref(state).studentActive["M\xE3 \u0111\u1EC1"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["M\xE3 \u0111\u1EC1"]), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("p", { class: "font-semibold text-[#313131] text-2xl text-center mt-3" }, " Nh\u1EEFng n\u1ED9i dung con c\u1EA7n \xF4n t\u1EADp th\xEAm - \u0110\u1EC1 s\u1ED1: 2 "),
                                createVNode("ol", { class: "list-decimal p-5" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(state).studentActive.incorrerAnswer, (item) => {
                                    return openBlock(), createBlock("li", null, [
                                      createVNode("a", {
                                        href: "https://www.google.co.uk/",
                                        class: "underline text-[#3973ca]"
                                      }, toDisplayString(item["C\xE2u H\u1ECFi"]) + " - " + toDisplayString(item["Gi\u1EA3i ph\xE1p"]), 1)
                                    ]);
                                  }), 256))
                                ])
                              ])
                            ])
                          ]),
                          _: 1
                        }, 8, ["items"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, {
                class: "flex flex-col flex-1 h-full",
                ui: {
                  body: { base: "flex-1" },
                  ring: "",
                  divide: "divide-y divide-gray-100 dark:divide-gray-800"
                }
              }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900 dark:text-white uppercase" }, " Ki\u1EC3m tra v\xE0 ch\u1EA5m ch\u1EEFa "),
                    createVNode(_component_UButton, {
                      color: "gray",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark-20-solid",
                      class: "-my-1",
                      onClick: onLoadAnswer
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", { class: "p-4 h-fit" }, [
                      createVNode(_component_UTabs, {
                        items: unref(state).students,
                        onChange: onMarkStudent,
                        orientation: "vertical",
                        ui: {
                          container: "relative w-full",
                          wrapper: "flex items-center gap-4",
                          list: {
                            width: "w-[240px]",
                            tab: { height: "h-8" }
                          }
                        }
                      }, {
                        pdf: withCtx(() => [
                          createVNode("div", { class: "flex flex-col gap-2 overflow-hidden h-[600px] p-1" }, [
                            unref(state).loading ? (openBlock(), createBlock(_component_UProgress, {
                              key: 0,
                              animation: "carousel"
                            })) : createCommentVNode("", true),
                            createVNode("div", { class: "flex justify-end gap-4" }, [
                              createVNode(_component_UButton, {
                                class: "w-fit",
                                onClick: generateHTMLToPDF
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("T\u1EA3i b\u1EA3n PDF l\u1EDDi gi\u1EA3i")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormGroup, {
                                name: "code",
                                "eager-validation": "",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(state).emailtest,
                                    "onUpdate:modelValue": ($event) => unref(state).emailtest = $event,
                                    placeholder: "Nh\u1EADp email \u0111\xEDch \u0111\u1EC3 test"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UButton, {
                                class: "w-fit",
                                onClick: sendEmail
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("G\u1EEDi k\u1EBFt l\u1EDDi gi\u1EA3i qua Email")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "shadow-[0_0_1px_#7a7a7a] rounded-sm p-4 flex-1 overflow-y-scroll" }, [
                              createVNode("h2", { class: "font-semibold text-[#3973ca] text-4xl text-center" }, " PHI\u1EBEU D\u1EB6N D\xD2 Y\xCAU TH\u01AF\u01A0NG "),
                              createVNode("div", { class: "grid grid-cols-3 px-2 gap-3 mt-3 font-semibold text-[#3973ca]" }, [
                                createVNode("p", null, [
                                  createTextVNode(" H\u1ECD v\xE0 t\xEAn: "),
                                  unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["H\u1ECD v\xE0 T\xEAn"]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("p", null, [
                                  createTextVNode(" S\u1ED1 b\xE1o danh: "),
                                  unref(state).studentActive["S\u1ED1 B\xE1o Danh"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["S\u1ED1 B\xE1o Danh"]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("p", null, "C\u01A1 s\u1EDF: NQH Q10"),
                                createVNode("p", null, [
                                  createTextVNode(" \u0110i\u1EC3m b\xE0i thi: "),
                                  unref(state).studentActive.incorrerAnswer.length ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(caculatorMark()), 1)) : (openBlock(), createBlock("span", { key: 1 }, " 10"))
                                ]),
                                createVNode("p", null, " H\u1ECDc sinh \u0111ang h\u1ECDc t\u1EA1i NQH: C\xF3 "),
                                createVNode("p", null, [
                                  createTextVNode(" M\xE3 \u0111\u1EC1: "),
                                  unref(state).studentActive["M\xE3 \u0111\u1EC1"] ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(state).studentActive["M\xE3 \u0111\u1EC1"]), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("p", { class: "font-semibold text-[#313131] text-2xl text-center mt-3" }, " Nh\u1EEFng n\u1ED9i dung con c\u1EA7n \xF4n t\u1EADp th\xEAm - \u0110\u1EC1 s\u1ED1: 2 "),
                              createVNode("ol", { class: "list-decimal p-5" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(state).studentActive.incorrerAnswer, (item) => {
                                  return openBlock(), createBlock("li", null, [
                                    createVNode("a", {
                                      href: "https://www.google.co.uk/",
                                      class: "underline text-[#3973ca]"
                                    }, toDisplayString(item["C\xE2u H\u1ECFi"]) + " - " + toDisplayString(item["Gi\u1EA3i ph\xE1p"]), 1)
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ]),
                        _: 1
                      }, 8, ["items"])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex justify-between items-end">`);
      _push(ssrRenderComponent(_component_UForm, {
        schema: unref(schema),
        state: unref(state),
        validate,
        onSubmit,
        class: "flex gap-3 flex-wrap items-start"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "T\u1EA3i l\xEAn file csv",
              name: "file",
              class: "w-fit flex flex-col",
              "eager-validation": ""
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<input type="file" accept="*" size="sm" class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("input", {
                      onChange: handleChangeFile,
                      type: "file",
                      accept: "*",
                      size: "sm",
                      class: "block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                    }, null, 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormGroup, {
              label: "M\xE3 \u0111\u1EC1",
              name: "code",
              "eager-validation": "",
              required: ""
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(state).code,
                    "onUpdate:modelValue": ($event) => unref(state).code = $event,
                    placeholder: "Nh\u1EADp m\xE3 \u0111\u1EC1"
                  }, null, _parent3, _scopeId2));
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
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-1 items-end justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              class: "h-fit mt-6",
              loading: unref(state).loading
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Ki\u1EC3m tra v\xE0 s\u1EEDa b\xE0i`);
                } else {
                  return [
                    createTextVNode("Ki\u1EC3m tra v\xE0 s\u1EEDa b\xE0i")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_UFormGroup, {
                label: "T\u1EA3i l\xEAn file csv",
                name: "file",
                class: "w-fit flex flex-col",
                "eager-validation": ""
              }, {
                default: withCtx(() => [
                  createVNode("input", {
                    onChange: handleChangeFile,
                    type: "file",
                    accept: "*",
                    size: "sm",
                    class: "block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                  }, null, 32)
                ]),
                _: 1
              }),
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
              }),
              createVNode("div", { class: "flex flex-1 items-end justify-end" }, [
                createVNode(_component_UButton, {
                  type: "submit",
                  class: "h-fit mt-6",
                  loading: unref(state).loading
                }, {
                  default: withCtx(() => [
                    createTextVNode("Ki\u1EC3m tra v\xE0 s\u1EEDa b\xE0i")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="w-full flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden">`);
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
        columns: unref(state).columns,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BDnky8e0.mjs.map

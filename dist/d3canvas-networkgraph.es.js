class Yt extends Map {
  constructor(n, e = On) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), n != null)
      for (const [r, i] of n)
        this.set(r, i);
  }
  get(n) {
    return super.get(Lt(this, n));
  }
  has(n) {
    return super.has(Lt(this, n));
  }
  set(n, e) {
    return super.set(Hn(this, n), e);
  }
  delete(n) {
    return super.delete(Xn(this, n));
  }
}
function Lt({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : e;
}
function Hn({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : (t.set(r, e), e);
}
function Xn({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) && (e = t.get(r), t.delete(r)), e;
}
function On(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var Bn = { value: () => {
} };
function Rt() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new ct(e);
}
function ct(t) {
  this._ = t;
}
function Yn(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
ct.prototype = Rt.prototype = {
  constructor: ct,
  on: function(t, n) {
    var e = this._, r = Yn(t + "", e), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Ln(e[i], t.name)))
          return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if (i = (t = r[o]).type)
        e[i] = qt(e[i], t.name, n);
      else if (n == null)
        for (i in e)
          e[i] = qt(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n)
      t[e] = n[e].slice();
    return new ct(t);
  },
  call: function(t, n) {
    if ((i = arguments.length - 2) > 0)
      for (var e = new Array(i), r = 0, i, o; r < i; ++r)
        e[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(n, e);
  },
  apply: function(t, n, e) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(n, e);
  }
};
function Ln(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function qt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Bn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var kt = "http://www.w3.org/1999/xhtml";
const Vt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: kt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function wt(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), Vt.hasOwnProperty(n) ? { space: Vt[n], local: t } : t;
}
function qn(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === kt && n.documentElement.namespaceURI === kt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function Vn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function hn(t) {
  var n = wt(t);
  return (n.local ? Vn : qn)(n);
}
function Un() {
}
function It(t) {
  return t == null ? Un : function() {
    return this.querySelector(t);
  };
}
function Wn(t) {
  typeof t != "function" && (t = It(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = new Array(s), f, u, l = 0; l < s; ++l)
      (f = o[l]) && (u = t.call(f, f.__data__, l, o)) && ("__data__" in f && (u.__data__ = f.__data__), a[l] = u);
  return new P(r, this._parents);
}
function Kn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Gn() {
  return [];
}
function gn(t) {
  return t == null ? Gn : function() {
    return this.querySelectorAll(t);
  };
}
function Qn(t) {
  return function() {
    return Kn(t.apply(this, arguments));
  };
}
function Jn(t) {
  typeof t == "function" ? t = Qn(t) : t = gn(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && (r.push(t.call(f, f.__data__, u, s)), i.push(f));
  return new P(r, i);
}
function pn(t) {
  return function() {
    return this.matches(t);
  };
}
function yn(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Zn = Array.prototype.find;
function jn(t) {
  return function() {
    return Zn.call(this.children, t);
  };
}
function te() {
  return this.firstElementChild;
}
function ne(t) {
  return this.select(t == null ? te : jn(typeof t == "function" ? t : yn(t)));
}
var ee = Array.prototype.filter;
function re() {
  return Array.from(this.children);
}
function ie(t) {
  return function() {
    return ee.call(this.children, t);
  };
}
function oe(t) {
  return this.selectAll(t == null ? re : ie(typeof t == "function" ? t : yn(t)));
}
function se(t) {
  typeof t != "function" && (t = pn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new P(r, this._parents);
}
function dn(t) {
  return new Array(t.length);
}
function ae() {
  return new P(this._enter || this._groups.map(dn), this._parents);
}
function pt(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
pt.prototype = {
  constructor: pt,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, n) {
    return this._parent.insertBefore(t, n);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ue(t) {
  return function() {
    return t;
  };
}
function fe(t, n, e, r, i, o) {
  for (var s = 0, a, f = n.length, u = o.length; s < u; ++s)
    (a = n[s]) ? (a.__data__ = o[s], r[s] = a) : e[s] = new pt(t, o[s]);
  for (; s < f; ++s)
    (a = n[s]) && (i[s] = a);
}
function le(t, n, e, r, i, o, s) {
  var a, f, u = /* @__PURE__ */ new Map(), l = n.length, g = o.length, c = new Array(l), h;
  for (a = 0; a < l; ++a)
    (f = n[a]) && (c[a] = h = s.call(f, f.__data__, a, n) + "", u.has(h) ? i[a] = f : u.set(h, f));
  for (a = 0; a < g; ++a)
    h = s.call(t, o[a], a, o) + "", (f = u.get(h)) ? (r[a] = f, f.__data__ = o[a], u.delete(h)) : e[a] = new pt(t, o[a]);
  for (a = 0; a < l; ++a)
    (f = n[a]) && u.get(c[a]) === f && (i[a] = f);
}
function ce(t) {
  return t.__data__;
}
function he(t, n) {
  if (!arguments.length)
    return Array.from(this, ce);
  var e = n ? le : fe, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ue(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), f = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], g = i[u], c = g.length, h = ge(t.call(l, l && l.__data__, u, r)), y = h.length, d = a[u] = new Array(y), p = s[u] = new Array(y), x = f[u] = new Array(c);
    e(l, g, d, p, x, h, n);
    for (var _ = 0, N = 0, v, E; _ < y; ++_)
      if (v = d[_]) {
        for (_ >= N && (N = _ + 1); !(E = p[N]) && ++N < y; )
          ;
        v._next = E || null;
      }
  }
  return s = new P(s, r), s._enter = a, s._exit = f, s;
}
function ge(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function pe() {
  return new P(this._exit || this._groups.map(dn), this._parents);
}
function ye(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function de(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, s = Math.min(i, o), a = new Array(i), f = 0; f < s; ++f)
    for (var u = e[f], l = r[f], g = u.length, c = a[f] = new Array(g), h, y = 0; y < g; ++y)
      (h = u[y] || l[y]) && (c[y] = h);
  for (; f < i; ++f)
    a[f] = e[f];
  return new P(a, this._parents);
}
function xe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function _e(t) {
  t || (t = ve);
  function n(g, c) {
    return g && c ? t(g.__data__, c.__data__) : !g - !c;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = e[o], a = s.length, f = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (f[l] = u);
    f.sort(n);
  }
  return new P(i, this._parents).order();
}
function ve(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function we() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function me() {
  return Array.from(this);
}
function be() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function Ne() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function Ae() {
  return !this.node();
}
function ke(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Se(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Me(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function $e(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Ee(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Te(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Ce(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function Re(t, n) {
  var e = wt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? Me : Se : typeof n == "function" ? e.local ? Ce : Te : e.local ? Ee : $e)(e, n));
}
function xn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ie(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ze(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function Pe(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function De(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? Ie : typeof n == "function" ? Pe : ze)(t, n, e ?? "")) : Q(this.node(), t);
}
function Q(t, n) {
  return t.style.getPropertyValue(n) || xn(t).getComputedStyle(t, null).getPropertyValue(n);
}
function Fe(t) {
  return function() {
    delete this[t];
  };
}
function He(t, n) {
  return function() {
    this[t] = n;
  };
}
function Xe(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function Oe(t, n) {
  return arguments.length > 1 ? this.each((n == null ? Fe : typeof n == "function" ? Xe : He)(t, n)) : this.node()[t];
}
function _n(t) {
  return t.trim().split(/^|\s+/);
}
function zt(t) {
  return t.classList || new vn(t);
}
function vn(t) {
  this._node = t, this._names = _n(t.getAttribute("class") || "");
}
vn.prototype = {
  add: function(t) {
    var n = this._names.indexOf(t);
    n < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var n = this._names.indexOf(t);
    n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function wn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; )
    e.add(n[r]);
}
function mn(t, n) {
  for (var e = zt(t), r = -1, i = n.length; ++r < i; )
    e.remove(n[r]);
}
function Be(t) {
  return function() {
    wn(this, t);
  };
}
function Ye(t) {
  return function() {
    mn(this, t);
  };
}
function Le(t, n) {
  return function() {
    (n.apply(this, arguments) ? wn : mn)(this, t);
  };
}
function qe(t, n) {
  var e = _n(t + "");
  if (arguments.length < 2) {
    for (var r = zt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Le : n ? Be : Ye)(e, n));
}
function Ve() {
  this.textContent = "";
}
function Ue(t) {
  return function() {
    this.textContent = t;
  };
}
function We(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ke(t) {
  return arguments.length ? this.each(t == null ? Ve : (typeof t == "function" ? We : Ue)(t)) : this.node().textContent;
}
function Ge() {
  this.innerHTML = "";
}
function Qe(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Je(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Ze(t) {
  return arguments.length ? this.each(t == null ? Ge : (typeof t == "function" ? Je : Qe)(t)) : this.node().innerHTML;
}
function je() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function tr() {
  return this.each(je);
}
function nr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function er() {
  return this.each(nr);
}
function rr(t) {
  var n = typeof t == "function" ? t : hn(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function ir() {
  return null;
}
function or(t, n) {
  var e = typeof t == "function" ? t : hn(t), r = n == null ? ir : typeof n == "function" ? n : It(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function sr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ar() {
  return this.each(sr);
}
function ur() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function fr() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function lr(t) {
  return this.select(t ? fr : ur);
}
function cr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function hr(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function gr(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function pr(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function yr(t, n, e) {
  return function() {
    var r = this.__on, i, o = hr(n);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = e), i.value = n;
          return;
        }
    }
    this.addEventListener(t.type, o, e), i = { type: t.type, name: t.name, value: n, listener: o, options: e }, r ? r.push(i) : this.__on = [i];
  };
}
function dr(t, n, e) {
  var r = gr(t + ""), i, o = r.length, s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var f = 0, u = a.length, l; f < u; ++f)
        for (i = 0, l = a[f]; i < o; ++i)
          if ((s = r[i]).type === l.type && s.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = n ? yr : pr, i = 0; i < o; ++i)
    this.each(a(r[i], n, e));
  return this;
}
function bn(t, n, e) {
  var r = xn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function xr(t, n) {
  return function() {
    return bn(this, t, n);
  };
}
function _r(t, n) {
  return function() {
    return bn(this, t, n.apply(this, arguments));
  };
}
function vr(t, n) {
  return this.each((typeof n == "function" ? _r : xr)(t, n));
}
function* wr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var Nn = [null];
function P(t, n) {
  this._groups = t, this._parents = n;
}
function st() {
  return new P([[document.documentElement]], Nn);
}
function mr() {
  return this;
}
P.prototype = st.prototype = {
  constructor: P,
  select: Wn,
  selectAll: Jn,
  selectChild: ne,
  selectChildren: oe,
  filter: se,
  data: he,
  enter: ae,
  exit: pe,
  join: ye,
  merge: de,
  selection: mr,
  order: xe,
  sort: _e,
  call: we,
  nodes: me,
  node: be,
  size: Ne,
  empty: Ae,
  each: ke,
  attr: Re,
  style: De,
  property: Oe,
  classed: qe,
  text: Ke,
  html: Ze,
  raise: tr,
  lower: er,
  append: rr,
  insert: or,
  remove: ar,
  clone: lr,
  datum: cr,
  on: dr,
  dispatch: vr,
  [Symbol.iterator]: wr
};
function Ut(t) {
  return typeof t == "string" ? new P([[document.querySelector(t)]], [document.documentElement]) : new P([[t]], Nn);
}
function Pt(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function An(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n)
    e[r] = n[r];
  return e;
}
function at() {
}
var et = 0.7, yt = 1 / et, G = "\\s*([+-]?\\d+)\\s*", rt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", O = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", br = /^#([0-9a-f]{3,8})$/, Nr = new RegExp(`^rgb\\(${G},${G},${G}\\)$`), Ar = new RegExp(`^rgb\\(${O},${O},${O}\\)$`), kr = new RegExp(`^rgba\\(${G},${G},${G},${rt}\\)$`), Sr = new RegExp(`^rgba\\(${O},${O},${O},${rt}\\)$`), Mr = new RegExp(`^hsl\\(${rt},${O},${O}\\)$`), $r = new RegExp(`^hsla\\(${rt},${O},${O},${rt}\\)$`), Wt = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Pt(at, it, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Kt,
  // Deprecated! Use color.formatHex.
  formatHex: Kt,
  formatHex8: Er,
  formatHsl: Tr,
  formatRgb: Gt,
  toString: Gt
});
function Kt() {
  return this.rgb().formatHex();
}
function Er() {
  return this.rgb().formatHex8();
}
function Tr() {
  return kn(this).formatHsl();
}
function Gt() {
  return this.rgb().formatRgb();
}
function it(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = br.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Qt(n) : e === 3 ? new z(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? ut(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? ut(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = Nr.exec(t)) ? new z(n[1], n[2], n[3], 1) : (n = Ar.exec(t)) ? new z(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = kr.exec(t)) ? ut(n[1], n[2], n[3], n[4]) : (n = Sr.exec(t)) ? ut(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = Mr.exec(t)) ? jt(n[1], n[2] / 100, n[3] / 100, 1) : (n = $r.exec(t)) ? jt(n[1], n[2] / 100, n[3] / 100, n[4]) : Wt.hasOwnProperty(t) ? Qt(Wt[t]) : t === "transparent" ? new z(NaN, NaN, NaN, 0) : null;
}
function Qt(t) {
  return new z(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ut(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new z(t, n, e, r);
}
function Cr(t) {
  return t instanceof at || (t = it(t)), t ? (t = t.rgb(), new z(t.r, t.g, t.b, t.opacity)) : new z();
}
function St(t, n, e, r) {
  return arguments.length === 1 ? Cr(t) : new z(t, n, e, r ?? 1);
}
function z(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
Pt(z, St, An(at, {
  brighter(t) {
    return t = t == null ? yt : Math.pow(yt, t), new z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? et : Math.pow(et, t), new z(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new z(W(this.r), W(this.g), W(this.b), dt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Jt,
  // Deprecated! Use color.formatHex.
  formatHex: Jt,
  formatHex8: Rr,
  formatRgb: Zt,
  toString: Zt
}));
function Jt() {
  return `#${U(this.r)}${U(this.g)}${U(this.b)}`;
}
function Rr() {
  return `#${U(this.r)}${U(this.g)}${U(this.b)}${U((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Zt() {
  const t = dt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${W(this.r)}, ${W(this.g)}, ${W(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function dt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function W(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function U(t) {
  return t = W(t), (t < 16 ? "0" : "") + t.toString(16);
}
function jt(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new H(t, n, e, r);
}
function kn(t) {
  if (t instanceof H)
    return new H(t.h, t.s, t.l, t.opacity);
  if (t instanceof at || (t = it(t)), !t)
    return new H();
  if (t instanceof H)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), s = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? s = (e - r) / a + (e < r) * 6 : e === o ? s = (r - n) / a + 2 : s = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, s *= 60) : a = f > 0 && f < 1 ? 0 : s, new H(s, a, f, t.opacity);
}
function Ir(t, n, e, r) {
  return arguments.length === 1 ? kn(t) : new H(t, n, e, r ?? 1);
}
function H(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
Pt(H, Ir, An(at, {
  brighter(t) {
    return t = t == null ? yt : Math.pow(yt, t), new H(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? et : Math.pow(et, t), new H(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new z(
      Nt(t >= 240 ? t - 240 : t + 120, i, r),
      Nt(t, i, r),
      Nt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new H(tn(this.h), ft(this.s), ft(this.l), dt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = dt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${tn(this.h)}, ${ft(this.s) * 100}%, ${ft(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function tn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ft(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Nt(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Sn = (t) => () => t;
function zr(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function Pr(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function Dr(t) {
  return (t = +t) == 1 ? Mn : function(n, e) {
    return e - n ? Pr(n, e, t) : Sn(isNaN(n) ? e : n);
  };
}
function Mn(t, n) {
  var e = n - t;
  return e ? zr(t, e) : Sn(isNaN(t) ? n : t);
}
const nn = function t(n) {
  var e = Dr(n);
  function r(i, o) {
    var s = e((i = St(i)).r, (o = St(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), u = Mn(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = f(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function q(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var Mt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, At = new RegExp(Mt.source, "g");
function Fr(t) {
  return function() {
    return t;
  };
}
function Hr(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Xr(t, n) {
  var e = Mt.lastIndex = At.lastIndex = 0, r, i, o, s = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = Mt.exec(t)) && (i = At.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, f.push({ i: s, x: q(r, i) })), e = At.lastIndex;
  return e < n.length && (o = n.slice(e), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? f[0] ? Hr(f[0].x) : Fr(n) : (n = f.length, function(u) {
    for (var l = 0, g; l < n; ++l)
      a[(g = f[l]).i] = g.x(u);
    return a.join("");
  });
}
var en = 180 / Math.PI, $t = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function $n(t, n, e, r, i, o) {
  var s, a, f;
  return (s = Math.sqrt(t * t + n * n)) && (t /= s, n /= s), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * en,
    skewX: Math.atan(f) * en,
    scaleX: s,
    scaleY: a
  };
}
var lt;
function Or(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? $t : $n(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Br(t) {
  return t == null || (lt || (lt = document.createElementNS("http://www.w3.org/2000/svg", "g")), lt.setAttribute("transform", t), !(t = lt.transform.baseVal.consolidate())) ? $t : (t = t.matrix, $n(t.a, t.b, t.c, t.d, t.e, t.f));
}
function En(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, g, c, h, y) {
    if (u !== g || l !== c) {
      var d = h.push("translate(", null, n, null, e);
      y.push({ i: d - 4, x: q(u, g) }, { i: d - 2, x: q(l, c) });
    } else
      (g || c) && h.push("translate(" + g + n + c + e);
  }
  function s(u, l, g, c) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), c.push({ i: g.push(i(g) + "rotate(", null, r) - 2, x: q(u, l) })) : l && g.push(i(g) + "rotate(" + l + r);
  }
  function a(u, l, g, c) {
    u !== l ? c.push({ i: g.push(i(g) + "skewX(", null, r) - 2, x: q(u, l) }) : l && g.push(i(g) + "skewX(" + l + r);
  }
  function f(u, l, g, c, h, y) {
    if (u !== g || l !== c) {
      var d = h.push(i(h) + "scale(", null, ",", null, ")");
      y.push({ i: d - 4, x: q(u, g) }, { i: d - 2, x: q(l, c) });
    } else
      (g !== 1 || c !== 1) && h.push(i(h) + "scale(" + g + "," + c + ")");
  }
  return function(u, l) {
    var g = [], c = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, g, c), s(u.rotate, l.rotate, g, c), a(u.skewX, l.skewX, g, c), f(u.scaleX, u.scaleY, l.scaleX, l.scaleY, g, c), u = l = null, function(h) {
      for (var y = -1, d = c.length, p; ++y < d; )
        g[(p = c[y]).i] = p.x(h);
      return g.join("");
    };
  };
}
var Yr = En(Or, "px, ", "px)", "deg)"), Lr = En(Br, ", ", ")", ")"), J = 0, j = 0, Z = 0, Tn = 1e3, xt, tt, _t = 0, K = 0, mt = 0, ot = typeof performance == "object" && performance.now ? performance : Date, Cn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Dt() {
  return K || (Cn(qr), K = ot.now() + mt);
}
function qr() {
  K = 0;
}
function vt() {
  this._call = this._time = this._next = null;
}
vt.prototype = Ft.prototype = {
  constructor: vt,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Dt() : +e) + (n == null ? 0 : +n), !this._next && tt !== this && (tt ? tt._next = this : xt = this, tt = this), this._call = t, this._time = e, Et();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Et());
  }
};
function Ft(t, n, e) {
  var r = new vt();
  return r.restart(t, n, e), r;
}
function Vr() {
  Dt(), ++J;
  for (var t = xt, n; t; )
    (n = K - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --J;
}
function rn() {
  K = (_t = ot.now()) + mt, J = j = 0;
  try {
    Vr();
  } finally {
    J = 0, Wr(), K = 0;
  }
}
function Ur() {
  var t = ot.now(), n = t - _t;
  n > Tn && (mt -= n, _t = t);
}
function Wr() {
  for (var t, n = xt, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : xt = e);
  tt = t, Et(r);
}
function Et(t) {
  if (!J) {
    j && (j = clearTimeout(j));
    var n = t - K;
    n > 24 ? (t < 1 / 0 && (j = setTimeout(rn, t - ot.now() - mt)), Z && (Z = clearInterval(Z))) : (Z || (_t = ot.now(), Z = setInterval(Ur, Tn)), J = 1, Cn(rn));
  }
}
function on(t, n, e) {
  var r = new vt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Kr = Rt("start", "end", "cancel", "interrupt"), Gr = [], Rn = 0, sn = 1, Tt = 2, ht = 3, an = 4, Ct = 5, gt = 6;
function bt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (e in s)
    return;
  Qr(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Kr,
    tween: Gr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Rn
  });
}
function Ht(t, n) {
  var e = X(t, n);
  if (e.state > Rn)
    throw new Error("too late; already scheduled");
  return e;
}
function B(t, n) {
  var e = X(t, n);
  if (e.state > ht)
    throw new Error("too late; already running");
  return e;
}
function X(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function Qr(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = Ft(o, 0, e.time);
  function o(u) {
    e.state = sn, e.timer.restart(s, e.delay, e.time), e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, g, c, h;
    if (e.state !== sn)
      return f();
    for (l in r)
      if (h = r[l], h.name === e.name) {
        if (h.state === ht)
          return on(s);
        h.state === an ? (h.state = gt, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete r[l]) : +l < n && (h.state = gt, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete r[l]);
      }
    if (on(function() {
      e.state === ht && (e.state = an, e.timer.restart(a, e.delay, e.time), a(u));
    }), e.state = Tt, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Tt) {
      for (e.state = ht, i = new Array(c = e.tween.length), l = 0, g = -1; l < c; ++l)
        (h = e.tween[l].value.call(t, t.__data__, e.index, e.group)) && (i[++g] = h);
      i.length = g + 1;
    }
  }
  function a(u) {
    for (var l = u < e.duration ? e.ease.call(null, u / e.duration) : (e.timer.restart(f), e.state = Ct, 1), g = -1, c = i.length; ++g < c; )
      i[g].call(t, l);
    e.state === Ct && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = gt, e.timer.stop(), delete r[n];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function Jr(t, n) {
  var e = t.__transition, r, i, o = !0, s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > Tt && r.state < Ct, r.state = gt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[s];
    }
    o && delete t.__transition;
  }
}
function Zr(t) {
  return this.each(function() {
    Jr(this, t);
  });
}
function jr(t, n) {
  var e, r;
  return function() {
    var i = B(this, t), o = i.tween;
    if (o !== e) {
      r = e = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === n) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function ti(t, n, e) {
  var r, i;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var o = B(this, t), s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: n, value: e }, f = 0, u = i.length; f < u; ++f)
        if (i[f].name === n) {
          i[f] = a;
          break;
        }
      f === u && i.push(a);
    }
    o.tween = i;
  };
}
function ni(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = X(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((n == null ? jr : ti)(e, t, n));
}
function Xt(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = B(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return X(i, r).value[n];
  };
}
function In(t, n) {
  var e;
  return (typeof n == "number" ? q : n instanceof it ? nn : (e = it(n)) ? (n = e, nn) : Xr)(t, n);
}
function ei(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ri(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ii(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function oi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function si(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function ai(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function ui(t, n) {
  var e = wt(t), r = e === "transform" ? Lr : In;
  return this.attrTween(t, typeof n == "function" ? (e.local ? ai : si)(e, r, Xt(this, "attr." + t, n)) : n == null ? (e.local ? ri : ei)(e) : (e.local ? oi : ii)(e, r, n));
}
function fi(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function li(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function ci(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && li(t, o)), e;
  }
  return i._value = n, i;
}
function hi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && fi(t, o)), e;
  }
  return i._value = n, i;
}
function gi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var r = wt(t);
  return this.tween(e, (r.local ? ci : hi)(r, n));
}
function pi(t, n) {
  return function() {
    Ht(this, t).delay = +n.apply(this, arguments);
  };
}
function yi(t, n) {
  return n = +n, function() {
    Ht(this, t).delay = n;
  };
}
function di(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? pi : yi)(n, t)) : X(this.node(), n).delay;
}
function xi(t, n) {
  return function() {
    B(this, t).duration = +n.apply(this, arguments);
  };
}
function _i(t, n) {
  return n = +n, function() {
    B(this, t).duration = n;
  };
}
function vi(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? xi : _i)(n, t)) : X(this.node(), n).duration;
}
function wi(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    B(this, t).ease = n;
  };
}
function mi(t) {
  var n = this._id;
  return arguments.length ? this.each(wi(n, t)) : X(this.node(), n).ease;
}
function bi(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    B(this, t).ease = e;
  };
}
function Ni(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(bi(this._id, t));
}
function Ai(t) {
  typeof t != "function" && (t = pn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new L(r, this._parents, this._name, this._id);
}
function ki(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], u = e[a], l = f.length, g = s[a] = new Array(l), c, h = 0; h < l; ++h)
      (c = f[h] || u[h]) && (g[h] = c);
  for (; a < r; ++a)
    s[a] = n[a];
  return new L(s, this._parents, this._name, this._id);
}
function Si(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function Mi(t, n, e) {
  var r, i, o = Si(n) ? Ht : B;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(n, e), s.on = i;
  };
}
function $i(t, n) {
  var e = this._id;
  return arguments.length < 2 ? X(this.node(), e).on.on(t) : this.each(Mi(e, t, n));
}
function Ei(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function Ti() {
  return this.on("end.remove", Ei(this._id));
}
function Ci(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = It(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], f = a.length, u = o[s] = new Array(f), l, g, c = 0; c < f; ++c)
      (l = a[c]) && (g = t.call(l, l.__data__, c, a)) && ("__data__" in l && (g.__data__ = l.__data__), u[c] = g, bt(u[c], n, e, c, u, X(l, e)));
  return new L(o, this._parents, n, e);
}
function Ri(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = gn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var f = r[a], u = f.length, l, g = 0; g < u; ++g)
      if (l = f[g]) {
        for (var c = t.call(l, l.__data__, g, f), h, y = X(l, e), d = 0, p = c.length; d < p; ++d)
          (h = c[d]) && bt(h, n, e, d, c, y);
        o.push(c), s.push(l);
      }
  return new L(o, s, n, e);
}
var Ii = st.prototype.constructor;
function zi() {
  return new Ii(this._groups, this._parents);
}
function Pi(t, n) {
  var e, r, i;
  return function() {
    var o = Q(this, t), s = (this.style.removeProperty(t), Q(this, t));
    return o === s ? null : o === e && s === r ? i : i = n(e = o, r = s);
  };
}
function zn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Di(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = Q(this, t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Fi(t, n, e) {
  var r, i, o;
  return function() {
    var s = Q(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), Q(this, t))), s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a));
  };
}
function Hi(t, n) {
  var e, r, i, o = "style." + n, s = "end." + o, a;
  return function() {
    var f = B(this, t), u = f.on, l = f.value[o] == null ? a || (a = zn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, i = l), f.on = r;
  };
}
function Xi(t, n, e) {
  var r = (t += "") == "transform" ? Yr : In;
  return n == null ? this.styleTween(t, Pi(t, r)).on("end.style." + t, zn(t)) : typeof n == "function" ? this.styleTween(t, Fi(t, r, Xt(this, "style." + t, n))).each(Hi(this._id, t)) : this.styleTween(t, Di(t, r, n), e).on("end.style." + t, null);
}
function Oi(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Bi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Oi(t, s, e)), r;
  }
  return o._value = n, o;
}
function Yi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (n == null)
    return this.tween(r, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(r, Bi(t, n, e ?? ""));
}
function Li(t) {
  return function() {
    this.textContent = t;
  };
}
function qi(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Vi(t) {
  return this.tween("text", typeof t == "function" ? qi(Xt(this, "text", t)) : Li(t == null ? "" : t + ""));
}
function Ui(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Wi(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Ui(i)), n;
  }
  return r._value = t, r;
}
function Ki(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, Wi(t));
}
function Gi() {
  for (var t = this._name, n = this._id, e = Pn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      if (f = s[u]) {
        var l = X(f, n);
        bt(f, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new L(r, this._parents, t, e);
}
function Qi() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, s) {
    var a = { value: s }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var u = B(this, r), l = u.on;
      l !== t && (n = (t = l).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), u.on = n;
    }), i === 0 && o();
  });
}
var Ji = 0;
function L(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Pn() {
  return ++Ji;
}
var Y = st.prototype;
L.prototype = {
  constructor: L,
  select: Ci,
  selectAll: Ri,
  selectChild: Y.selectChild,
  selectChildren: Y.selectChildren,
  filter: Ai,
  merge: ki,
  selection: zi,
  transition: Gi,
  call: Y.call,
  nodes: Y.nodes,
  node: Y.node,
  size: Y.size,
  empty: Y.empty,
  each: Y.each,
  on: $i,
  attr: ui,
  attrTween: gi,
  style: Xi,
  styleTween: Yi,
  text: Vi,
  textTween: Ki,
  remove: Ti,
  tween: ni,
  delay: di,
  duration: vi,
  ease: mi,
  easeVarying: Ni,
  end: Qi,
  [Symbol.iterator]: Y[Symbol.iterator]
};
function Zi(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var ji = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Zi
};
function to(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function no(t) {
  var n, e;
  t instanceof L ? (n = t._id, t = t._name) : (n = Pn(), (e = ji).time = Dt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && bt(f, t, n, u, s, e || to(f, n));
  return new L(r, this._parents, t, n);
}
st.prototype.interrupt = Zr;
st.prototype.transition = no;
function eo(t, n) {
  var e, r = 1;
  t == null && (t = 0), n == null && (n = 0);
  function i() {
    var o, s = e.length, a, f = 0, u = 0;
    for (o = 0; o < s; ++o)
      a = e[o], f += a.x, u += a.y;
    for (f = (f / s - t) * r, u = (u / s - n) * r, o = 0; o < s; ++o)
      a = e[o], a.x -= f, a.y -= u;
  }
  return i.initialize = function(o) {
    e = o;
  }, i.x = function(o) {
    return arguments.length ? (t = +o, i) : t;
  }, i.y = function(o) {
    return arguments.length ? (n = +o, i) : n;
  }, i.strength = function(o) {
    return arguments.length ? (r = +o, i) : r;
  }, i;
}
function ro(t) {
  const n = +this._x.call(null, t), e = +this._y.call(null, t);
  return Dn(this.cover(n, e), n, e, t);
}
function Dn(t, n, e, r) {
  if (isNaN(n) || isNaN(e))
    return t;
  var i, o = t._root, s = { data: r }, a = t._x0, f = t._y0, u = t._x1, l = t._y1, g, c, h, y, d, p, x, _;
  if (!o)
    return t._root = s, t;
  for (; o.length; )
    if ((d = n >= (g = (a + u) / 2)) ? a = g : u = g, (p = e >= (c = (f + l) / 2)) ? f = c : l = c, i = o, !(o = o[x = p << 1 | d]))
      return i[x] = s, t;
  if (h = +t._x.call(null, o.data), y = +t._y.call(null, o.data), n === h && e === y)
    return s.next = o, i ? i[x] = s : t._root = s, t;
  do
    i = i ? i[x] = new Array(4) : t._root = new Array(4), (d = n >= (g = (a + u) / 2)) ? a = g : u = g, (p = e >= (c = (f + l) / 2)) ? f = c : l = c;
  while ((x = p << 1 | d) === (_ = (y >= c) << 1 | h >= g));
  return i[_] = o, i[x] = s, t;
}
function io(t) {
  var n, e, r = t.length, i, o, s = new Array(r), a = new Array(r), f = 1 / 0, u = 1 / 0, l = -1 / 0, g = -1 / 0;
  for (e = 0; e < r; ++e)
    isNaN(i = +this._x.call(null, n = t[e])) || isNaN(o = +this._y.call(null, n)) || (s[e] = i, a[e] = o, i < f && (f = i), i > l && (l = i), o < u && (u = o), o > g && (g = o));
  if (f > l || u > g)
    return this;
  for (this.cover(f, u).cover(l, g), e = 0; e < r; ++e)
    Dn(this, s[e], a[e], t[e]);
  return this;
}
function oo(t, n) {
  if (isNaN(t = +t) || isNaN(n = +n))
    return this;
  var e = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(e))
    i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
  else {
    for (var s = i - e || 1, a = this._root, f, u; e > t || t >= i || r > n || n >= o; )
      switch (u = (n < r) << 1 | t < e, f = new Array(4), f[u] = a, a = f, s *= 2, u) {
        case 0:
          i = e + s, o = r + s;
          break;
        case 1:
          e = i - s, o = r + s;
          break;
        case 2:
          i = e + s, r = o - s;
          break;
        case 3:
          e = i - s, r = o - s;
          break;
      }
    this._root && this._root.length && (this._root = a);
  }
  return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this;
}
function so() {
  var t = [];
  return this.visit(function(n) {
    if (!n.length)
      do
        t.push(n.data);
      while (n = n.next);
  }), t;
}
function ao(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function C(t, n, e, r, i) {
  this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i;
}
function uo(t, n, e) {
  var r, i = this._x0, o = this._y0, s, a, f, u, l = this._x1, g = this._y1, c = [], h = this._root, y, d;
  for (h && c.push(new C(h, i, o, l, g)), e == null ? e = 1 / 0 : (i = t - e, o = n - e, l = t + e, g = n + e, e *= e); y = c.pop(); )
    if (!(!(h = y.node) || (s = y.x0) > l || (a = y.y0) > g || (f = y.x1) < i || (u = y.y1) < o))
      if (h.length) {
        var p = (s + f) / 2, x = (a + u) / 2;
        c.push(
          new C(h[3], p, x, f, u),
          new C(h[2], s, x, p, u),
          new C(h[1], p, a, f, x),
          new C(h[0], s, a, p, x)
        ), (d = (n >= x) << 1 | t >= p) && (y = c[c.length - 1], c[c.length - 1] = c[c.length - 1 - d], c[c.length - 1 - d] = y);
      } else {
        var _ = t - +this._x.call(null, h.data), N = n - +this._y.call(null, h.data), v = _ * _ + N * N;
        if (v < e) {
          var E = Math.sqrt(e = v);
          i = t - E, o = n - E, l = t + E, g = n + E, r = h.data;
        }
      }
  return r;
}
function fo(t) {
  if (isNaN(l = +this._x.call(null, t)) || isNaN(g = +this._y.call(null, t)))
    return this;
  var n, e = this._root, r, i, o, s = this._x0, a = this._y0, f = this._x1, u = this._y1, l, g, c, h, y, d, p, x;
  if (!e)
    return this;
  if (e.length)
    for (; ; ) {
      if ((y = l >= (c = (s + f) / 2)) ? s = c : f = c, (d = g >= (h = (a + u) / 2)) ? a = h : u = h, n = e, !(e = e[p = d << 1 | y]))
        return this;
      if (!e.length)
        break;
      (n[p + 1 & 3] || n[p + 2 & 3] || n[p + 3 & 3]) && (r = n, x = p);
    }
  for (; e.data !== t; )
    if (i = e, !(e = e.next))
      return this;
  return (o = e.next) && delete e.next, i ? (o ? i.next = o : delete i.next, this) : n ? (o ? n[p] = o : delete n[p], (e = n[0] || n[1] || n[2] || n[3]) && e === (n[3] || n[2] || n[1] || n[0]) && !e.length && (r ? r[x] = e : this._root = e), this) : (this._root = o, this);
}
function lo(t) {
  for (var n = 0, e = t.length; n < e; ++n)
    this.remove(t[n]);
  return this;
}
function co() {
  return this._root;
}
function ho() {
  var t = 0;
  return this.visit(function(n) {
    if (!n.length)
      do
        ++t;
      while (n = n.next);
  }), t;
}
function go(t) {
  var n = [], e, r = this._root, i, o, s, a, f;
  for (r && n.push(new C(r, this._x0, this._y0, this._x1, this._y1)); e = n.pop(); )
    if (!t(r = e.node, o = e.x0, s = e.y0, a = e.x1, f = e.y1) && r.length) {
      var u = (o + a) / 2, l = (s + f) / 2;
      (i = r[3]) && n.push(new C(i, u, l, a, f)), (i = r[2]) && n.push(new C(i, o, l, u, f)), (i = r[1]) && n.push(new C(i, u, s, a, l)), (i = r[0]) && n.push(new C(i, o, s, u, l));
    }
  return this;
}
function po(t) {
  var n = [], e = [], r;
  for (this._root && n.push(new C(this._root, this._x0, this._y0, this._x1, this._y1)); r = n.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, a = r.y0, f = r.x1, u = r.y1, l = (s + f) / 2, g = (a + u) / 2;
      (o = i[0]) && n.push(new C(o, s, a, l, g)), (o = i[1]) && n.push(new C(o, l, a, f, g)), (o = i[2]) && n.push(new C(o, s, g, l, u)), (o = i[3]) && n.push(new C(o, l, g, f, u));
    }
    e.push(r);
  }
  for (; r = e.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function yo(t) {
  return t[0];
}
function xo(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function _o(t) {
  return t[1];
}
function vo(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ot(t, n, e) {
  var r = new Bt(n ?? yo, e ?? _o, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Bt(t, n, e, r, i, o) {
  this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function un(t) {
  for (var n = { data: t.data }, e = n; t = t.next; )
    e = e.next = { data: t.data };
  return n;
}
var I = Ot.prototype = Bt.prototype;
I.copy = function() {
  var t = new Bt(this._x, this._y, this._x0, this._y0, this._x1, this._y1), n = this._root, e, r;
  if (!n)
    return t;
  if (!n.length)
    return t._root = un(n), t;
  for (e = [{ source: n, target: t._root = new Array(4) }]; n = e.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = n.source[i]) && (r.length ? e.push({ source: r, target: n.target[i] = new Array(4) }) : n.target[i] = un(r));
  return t;
};
I.add = ro;
I.addAll = io;
I.cover = oo;
I.data = so;
I.extent = ao;
I.find = uo;
I.remove = fo;
I.removeAll = lo;
I.root = co;
I.size = ho;
I.visit = go;
I.visitAfter = po;
I.x = xo;
I.y = vo;
function R(t) {
  return function() {
    return t;
  };
}
function V(t) {
  return (t() - 0.5) * 1e-6;
}
function wo(t) {
  return t.x + t.vx;
}
function mo(t) {
  return t.y + t.vy;
}
function bo(t) {
  var n, e, r, i = 1, o = 1;
  typeof t != "function" && (t = R(t == null ? 1 : +t));
  function s() {
    for (var u, l = n.length, g, c, h, y, d, p, x = 0; x < o; ++x)
      for (g = Ot(n, wo, mo).visitAfter(a), u = 0; u < l; ++u)
        c = n[u], d = e[c.index], p = d * d, h = c.x + c.vx, y = c.y + c.vy, g.visit(_);
    function _(N, v, E, w, m) {
      var k = N.data, M = N.r, A = d + M;
      if (k) {
        if (k.index > c.index) {
          var S = h - k.x - k.vx, b = y - k.y - k.vy, $ = S * S + b * b;
          $ < A * A && (S === 0 && (S = V(r), $ += S * S), b === 0 && (b = V(r), $ += b * b), $ = (A - ($ = Math.sqrt($))) / $ * i, c.vx += (S *= $) * (A = (M *= M) / (p + M)), c.vy += (b *= $) * A, k.vx -= S * (A = 1 - A), k.vy -= b * A);
        }
        return;
      }
      return v > h + A || w < h - A || E > y + A || m < y - A;
    }
  }
  function a(u) {
    if (u.data)
      return u.r = e[u.data.index];
    for (var l = u.r = 0; l < 4; ++l)
      u[l] && u[l].r > u.r && (u.r = u[l].r);
  }
  function f() {
    if (n) {
      var u, l = n.length, g;
      for (e = new Array(l), u = 0; u < l; ++u)
        g = n[u], e[g.index] = +t(g, u, n);
    }
  }
  return s.initialize = function(u, l) {
    n = u, r = l, f();
  }, s.iterations = function(u) {
    return arguments.length ? (o = +u, s) : o;
  }, s.strength = function(u) {
    return arguments.length ? (i = +u, s) : i;
  }, s.radius = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : R(+u), f(), s) : t;
  }, s;
}
function No(t) {
  return t.index;
}
function fn(t, n) {
  var e = t.get(n);
  if (!e)
    throw new Error("node not found: " + n);
  return e;
}
function Ao(t) {
  var n = No, e = g, r, i = R(30), o, s, a, f, u, l = 1;
  t == null && (t = []);
  function g(p) {
    return 1 / Math.min(a[p.source.index], a[p.target.index]);
  }
  function c(p) {
    for (var x = 0, _ = t.length; x < l; ++x)
      for (var N = 0, v, E, w, m, k, M, A; N < _; ++N)
        v = t[N], E = v.source, w = v.target, m = w.x + w.vx - E.x - E.vx || V(u), k = w.y + w.vy - E.y - E.vy || V(u), M = Math.sqrt(m * m + k * k), M = (M - o[N]) / M * p * r[N], m *= M, k *= M, w.vx -= m * (A = f[N]), w.vy -= k * A, E.vx += m * (A = 1 - A), E.vy += k * A;
  }
  function h() {
    if (s) {
      var p, x = s.length, _ = t.length, N = new Map(s.map((E, w) => [n(E, w, s), E])), v;
      for (p = 0, a = new Array(x); p < _; ++p)
        v = t[p], v.index = p, typeof v.source != "object" && (v.source = fn(N, v.source)), typeof v.target != "object" && (v.target = fn(N, v.target)), a[v.source.index] = (a[v.source.index] || 0) + 1, a[v.target.index] = (a[v.target.index] || 0) + 1;
      for (p = 0, f = new Array(_); p < _; ++p)
        v = t[p], f[p] = a[v.source.index] / (a[v.source.index] + a[v.target.index]);
      r = new Array(_), y(), o = new Array(_), d();
    }
  }
  function y() {
    if (s)
      for (var p = 0, x = t.length; p < x; ++p)
        r[p] = +e(t[p], p, t);
  }
  function d() {
    if (s)
      for (var p = 0, x = t.length; p < x; ++p)
        o[p] = +i(t[p], p, t);
  }
  return c.initialize = function(p, x) {
    s = p, u = x, h();
  }, c.links = function(p) {
    return arguments.length ? (t = p, h(), c) : t;
  }, c.id = function(p) {
    return arguments.length ? (n = p, c) : n;
  }, c.iterations = function(p) {
    return arguments.length ? (l = +p, c) : l;
  }, c.strength = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : R(+p), y(), c) : e;
  }, c.distance = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : R(+p), d(), c) : i;
  }, c;
}
const ko = 1664525, So = 1013904223, ln = 4294967296;
function Mo() {
  let t = 1;
  return () => (t = (ko * t + So) % ln) / ln;
}
function $o(t) {
  return t.x;
}
function Eo(t) {
  return t.y;
}
var To = 10, Co = Math.PI * (3 - Math.sqrt(5));
function Ro(t) {
  var n, e = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, a = /* @__PURE__ */ new Map(), f = Ft(g), u = Rt("tick", "end"), l = Mo();
  t == null && (t = []);
  function g() {
    c(), u.call("tick", n), e < r && (f.stop(), u.call("end", n));
  }
  function c(d) {
    var p, x = t.length, _;
    d === void 0 && (d = 1);
    for (var N = 0; N < d; ++N)
      for (e += (o - e) * i, a.forEach(function(v) {
        v(e);
      }), p = 0; p < x; ++p)
        _ = t[p], _.fx == null ? _.x += _.vx *= s : (_.x = _.fx, _.vx = 0), _.fy == null ? _.y += _.vy *= s : (_.y = _.fy, _.vy = 0);
    return n;
  }
  function h() {
    for (var d = 0, p = t.length, x; d < p; ++d) {
      if (x = t[d], x.index = d, x.fx != null && (x.x = x.fx), x.fy != null && (x.y = x.fy), isNaN(x.x) || isNaN(x.y)) {
        var _ = To * Math.sqrt(0.5 + d), N = d * Co;
        x.x = _ * Math.cos(N), x.y = _ * Math.sin(N);
      }
      (isNaN(x.vx) || isNaN(x.vy)) && (x.vx = x.vy = 0);
    }
  }
  function y(d) {
    return d.initialize && d.initialize(t, l), d;
  }
  return h(), n = {
    tick: c,
    restart: function() {
      return f.restart(g), n;
    },
    stop: function() {
      return f.stop(), n;
    },
    nodes: function(d) {
      return arguments.length ? (t = d, h(), a.forEach(y), n) : t;
    },
    alpha: function(d) {
      return arguments.length ? (e = +d, n) : e;
    },
    alphaMin: function(d) {
      return arguments.length ? (r = +d, n) : r;
    },
    alphaDecay: function(d) {
      return arguments.length ? (i = +d, n) : +i;
    },
    alphaTarget: function(d) {
      return arguments.length ? (o = +d, n) : o;
    },
    velocityDecay: function(d) {
      return arguments.length ? (s = 1 - d, n) : 1 - s;
    },
    randomSource: function(d) {
      return arguments.length ? (l = d, a.forEach(y), n) : l;
    },
    force: function(d, p) {
      return arguments.length > 1 ? (p == null ? a.delete(d) : a.set(d, y(p)), n) : a.get(d);
    },
    find: function(d, p, x) {
      var _ = 0, N = t.length, v, E, w, m, k;
      for (x == null ? x = 1 / 0 : x *= x, _ = 0; _ < N; ++_)
        m = t[_], v = d - m.x, E = p - m.y, w = v * v + E * E, w < x && (k = m, x = w);
      return k;
    },
    on: function(d, p) {
      return arguments.length > 1 ? (u.on(d, p), n) : u.on(d);
    }
  };
}
function Io() {
  var t, n, e, r, i = R(-30), o, s = 1, a = 1 / 0, f = 0.81;
  function u(h) {
    var y, d = t.length, p = Ot(t, $o, Eo).visitAfter(g);
    for (r = h, y = 0; y < d; ++y)
      n = t[y], p.visit(c);
  }
  function l() {
    if (t) {
      var h, y = t.length, d;
      for (o = new Array(y), h = 0; h < y; ++h)
        d = t[h], o[d.index] = +i(d, h, t);
    }
  }
  function g(h) {
    var y = 0, d, p, x = 0, _, N, v;
    if (h.length) {
      for (_ = N = v = 0; v < 4; ++v)
        (d = h[v]) && (p = Math.abs(d.value)) && (y += d.value, x += p, _ += p * d.x, N += p * d.y);
      h.x = _ / x, h.y = N / x;
    } else {
      d = h, d.x = d.data.x, d.y = d.data.y;
      do
        y += o[d.data.index];
      while (d = d.next);
    }
    h.value = y;
  }
  function c(h, y, d, p) {
    if (!h.value)
      return !0;
    var x = h.x - n.x, _ = h.y - n.y, N = p - y, v = x * x + _ * _;
    if (N * N / f < v)
      return v < a && (x === 0 && (x = V(e), v += x * x), _ === 0 && (_ = V(e), v += _ * _), v < s && (v = Math.sqrt(s * v)), n.vx += x * h.value * r / v, n.vy += _ * h.value * r / v), !0;
    if (h.length || v >= a)
      return;
    (h.data !== n || h.next) && (x === 0 && (x = V(e), v += x * x), _ === 0 && (_ = V(e), v += _ * _), v < s && (v = Math.sqrt(s * v)));
    do
      h.data !== n && (N = o[h.data.index] * r / v, n.vx += x * N, n.vy += _ * N);
    while (h = h.next);
  }
  return u.initialize = function(h, y) {
    t = h, e = y, l();
  }, u.strength = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : R(+h), l(), u) : i;
  }, u.distanceMin = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.distanceMax = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u.theta = function(h) {
    return arguments.length ? (f = h * h, u) : Math.sqrt(f);
  }, u;
}
function zo(t) {
  var n = R(0.1), e, r, i;
  typeof t != "function" && (t = R(t == null ? 0 : +t));
  function o(a) {
    for (var f = 0, u = e.length, l; f < u; ++f)
      l = e[f], l.vx += (i[f] - l.x) * r[f] * a;
  }
  function s() {
    if (e) {
      var a, f = e.length;
      for (r = new Array(f), i = new Array(f), a = 0; a < f; ++a)
        r[a] = isNaN(i[a] = +t(e[a], a, e)) ? 0 : +n(e[a], a, e);
    }
  }
  return o.initialize = function(a) {
    e = a, s();
  }, o.strength = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : R(+a), s(), o) : n;
  }, o.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : R(+a), s(), o) : t;
  }, o;
}
function Po(t) {
  var n = R(0.1), e, r, i;
  typeof t != "function" && (t = R(t == null ? 0 : +t));
  function o(a) {
    for (var f = 0, u = e.length, l; f < u; ++f)
      l = e[f], l.vy += (i[f] - l.y) * r[f] * a;
  }
  function s() {
    if (e) {
      var a, f = e.length;
      for (r = new Array(f), i = new Array(f), a = 0; a < f; ++a)
        r[a] = isNaN(i[a] = +t(e[a], a, e)) ? 0 : +n(e[a], a, e);
    }
  }
  return o.initialize = function(a) {
    e = a, s();
  }, o.strength = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : R(+a), s(), o) : n;
  }, o.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : R(+a), s(), o) : t;
  }, o;
}
function Do(t, n) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(n).domain(t);
      break;
  }
  return this;
}
const cn = Symbol("implicit");
function Fn() {
  var t = new Yt(), n = [], e = [], r = cn;
  function i(o) {
    let s = t.get(o);
    if (s === void 0) {
      if (r !== cn)
        return r;
      t.set(o, s = n.push(o) - 1);
    }
    return e[s % e.length];
  }
  return i.domain = function(o) {
    if (!arguments.length)
      return n.slice();
    n = [], t = new Yt();
    for (const s of o)
      t.has(s) || t.set(s, n.push(s) - 1);
    return i;
  }, i.range = function(o) {
    return arguments.length ? (e = Array.from(o), i) : e.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return Fn(n, e).unknown(r);
  }, Do.apply(i, arguments), i;
}
function Fo(t) {
  for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n; )
    e[r] = "#" + t.slice(r * 6, ++r * 6);
  return e;
}
const Ho = Fo("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function nt(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
nt.prototype = {
  constructor: nt,
  scale: function(t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new nt(this.k, this.x + this.k * t, this.y + this.k * n);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
nt.prototype;
function Xo(t, n, e = {
  sticky: !1,
  drag: !0,
  simulation: null,
  node: {
    stroke: !0,
    radius: 10,
    strokeWidth: 1,
    label: null,
    tooltip: null,
    tooltipFontSize: null,
    onClick: null,
    onHover: null
  },
  link: {
    color: null
  }
}) {
  var E;
  const r = t.getBoundingClientRect(), i = r.width, o = r.height;
  t.setAttribute("width", i), t.setAttribute("height", o);
  let s = e == null ? void 0 : e.simulation;
  const a = Fn(Ho);
  let { links: f, nodes: u } = n, l = ((E = e.node) == null ? void 0 : E.radius) ?? 5;
  const g = () => Ro(u).force("link", Ao(f).id((w) => w.id)).force("charge", Io()).force("center", eo(i / 2, o / 2)).force("collide", bo().radius(l)).force("x", zo(i / 2)).force("y", Po(o / 2));
  s || (s = g());
  const c = t.getContext("2d"), h = (w, m = null) => {
    f = w.links, u = w.nodes, m && typeof m == "object" && Object.keys(m).forEach((k) => {
      e[k] = m[k];
    }), c.clearRect(0, 0, i, o), s.stop(), s = null, s = e.simulation ?? g(), s.on("tick", () => {
      N();
    });
  };
  let y = {
    rect: null,
    text: null,
    arrow: null
  };
  const d = (w) => {
    var D;
    let m = w.tooltip ?? e.node.tooltip;
    if (typeof m == "function" && (m = m(w)), typeof m != "string")
      throw new TypeError("tooltip should be string");
    let k = ((D = e.node) == null ? void 0 : D.tooltipFontSize) ?? 20;
    c.font = `${k}px serif`;
    let M = c.measureText(m), A = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    }, S = A.left + M.width + A.right, b = A.top + M.actualBoundingBoxAscent + M.actualBoundingBoxDescent + A.bottom, $ = w.x - S / 2, T = w.y - 10 - b - l;
    $ + S > r.width && ($ = r.width - S), $ < 0 && ($ = 0), T < 0 && (T = w.y + 10 + l), y.rect = {
      x: $,
      y: T,
      width: S,
      height: b
    }, y.arrow = {
      x: [w.x - 5, T + b - 2],
      y: [w.x + 5, T + b - 2],
      z: [w.x, w.y - l]
    }, y.text = {
      x: $ + S / 2 - M.width / 2,
      y: T + A.top + b / 2 - M.actualBoundingBoxDescent,
      content: m
    }, N();
  }, p = (w, m) => {
    let k = u.map((M) => (M.d = Math.sqrt(Math.pow(w - M.x, 2) + Math.pow(m - M.y, 2)), M)).filter((M, A) => {
      let S = typeof l == "function" ? l(M, A) : l;
      return M.d < S;
    });
    return k.length === 0 ? null : (k.sort((M, A) => M.d >= A.d ? 1 : -1), k[0]);
  }, x = (w) => (w.touches && (w = w.touches[0]), [(w.clientX - r.left) / (r.right - r.left) * i, (w.clientY - r.top) / (r.bottom - r.top) * o]), _ = () => {
    let w = !1, m = null, k = Ut(t);
    k.on("mousedown touchstart", (A) => {
      var T, D;
      A.preventDefault(), w = !0;
      let [S, b] = x(A), $ = p(S, b);
      $ && (m = $, m.fx = S, m.fy = b, (T = e.node) != null && T.onClick && ((D = e.node) == null || D.onClick(m))), A.touches && d(m);
    }), k.on("mouseup touchend", (A) => {
      A.preventDefault(), w = !1, A.active || s.alphaTarget(0), m && (m.x = m.fx, m.y = m.fy), !e.sticky && m && (m.fx = null, m.fy = null, m = null);
    });
    let M = null;
    k.on("touchmove mousemove", (A) => {
      var $, T, D;
      console.log("move"), A.preventDefault();
      let [S, b] = x(A);
      if (!w || !m) {
        let F = p(S, b);
        k.style("cursor", F ? "grab" : "auto"), F && (($ = e.node) != null && $.tooltip || F.tooltip) ? (d(F), (T = e.node) != null && T.onHover && ((D = e.node) == null || D.onHover(F))) : (y.arrow = null, y.rect = null, y.text = null, N());
        return;
      }
      M && clearTimeout(M), M = setTimeout(() => {
        s.alphaTarget(0), w = !1, k.style("cursor", "auto");
      }, 3e3), k.style("cursor", "grabbing"), y.arrow = null, y.rect = null, y.text = null, m.fx = S, m.fy = b, s.alphaTarget(0.3).restart();
    });
  };
  function N() {
    var w, m, k, M, A;
    c.save(), c.clearRect(0, 0, i, o);
    for (let S = 0; S <= f.length - 1; S++) {
      let b = f[S], $ = b.color || ((w = e.link) == null ? void 0 : w.color);
      c.strokeStyle = $ ? typeof $ == "function" ? $(b) : $ : "black", c.beginPath(), c.moveTo(b.source.x, b.source.y), c.lineTo(b.target.x, b.target.y), c.stroke();
    }
    c.lineWidth = e.node.strokeWidth ?? 1;
    for (let S = 0; S <= u.length - 1; S++) {
      c.strokeStyle = null;
      let b = u[S], $ = b.color || ((m = e.node) == null ? void 0 : m.color), T = b.radius ?? l;
      typeof T == "function" && (T = T(b, S)), c.fillStyle = $ ? typeof $ == "function" ? $(b, S) : $ : a(b.id), c.beginPath(), b.x = Math.max(T, Math.min(i - T, b.x)), b.y = Math.max(T, Math.min(o - T, b.y)), c.arc(b.x, b.y, T, 0, Math.PI * 2), c.fill();
      let D = b.stroke || ((k = e.node) == null ? void 0 : k.stroke);
      D && (c.strokeStyle = typeof D == "string" ? D : "#ffffff", c.stroke()), c.closePath();
      let F = b.label || ((M = e.node) == null ? void 0 : M.label);
      F && (c.font = "14px serif", c.fillStyle = "black", c.fillText(typeof F == "function" ? F(b, S) : typeof F == "boolean" ? b.id : F, b.x - l / 2, b.y + l / 2));
    }
    if (y.rect && (c.fillStyle = "white", c.strokeStyle = "black", c.beginPath(), c.rect(y.rect.x, y.rect.y, y.rect.width, y.rect.height), c.fill(), c.stroke(), c.closePath()), y.arrow && (c.fillStyle = "white", c.beginPath(), c.moveTo(y.arrow.x[0], y.arrow.x[1]), c.lineTo(y.arrow.y[0], y.arrow.y[1]), c.lineTo(y.arrow.z[0], y.arrow.z[1]), c.fill(), c.closePath(), c.beginPath(), c.moveTo(y.arrow.z[0], y.arrow.z[1]), c.lineTo(y.arrow.x[0], y.arrow.x[1]), c.moveTo(y.arrow.z[0], y.arrow.z[1]), c.lineTo(y.arrow.y[0], y.arrow.y[1]), c.stroke(), c.closePath()), y.text) {
      c.fillStyle = "black";
      let S = ((A = e.node) == null ? void 0 : A.tooltipFontSize) ?? 20;
      c.font = `${S}px serif`, c.fillText(y.text.content, y.text.x, y.text.y);
    }
    c.restore();
  }
  return s.on("tick", () => {
    N();
  }), (e.drag ?? !0) && _(), {
    update: h,
    destroy: () => {
      if (s = null, c.clearRect(0, 0, i, o), e.drag) {
        let w = Ut(t);
        w.on("mousedown touchstart", null), w.on("mouseup touchend", null), w.on("touchmove mousemove", null);
      }
    }
  };
}
export {
  Xo as default
};

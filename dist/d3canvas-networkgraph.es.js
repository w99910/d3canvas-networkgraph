class Lt extends Map {
  constructor(n, e = Bn) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), n != null)
      for (const [r, i] of n)
        this.set(r, i);
  }
  get(n) {
    return super.get(qt(this, n));
  }
  has(n) {
    return super.has(qt(this, n));
  }
  set(n, e) {
    return super.set(Xn(this, n), e);
  }
  delete(n) {
    return super.delete(On(this, n));
  }
}
function qt({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : e;
}
function Xn({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : (t.set(r, e), e);
}
function On({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) && (e = t.get(r), t.delete(r)), e;
}
function Bn(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var Yn = { value: () => {
} };
function It() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new ht(e);
}
function ht(t) {
  this._ = t;
}
function Ln(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
ht.prototype = It.prototype = {
  constructor: ht,
  on: function(t, n) {
    var e = this._, r = Ln(t + "", e), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = qn(e[i], t.name)))
          return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if (i = (t = r[o]).type)
        e[i] = Vt(e[i], t.name, n);
      else if (n == null)
        for (i in e)
          e[i] = Vt(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n)
      t[e] = n[e].slice();
    return new ht(t);
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
function qn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function Vt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Yn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var St = "http://www.w3.org/1999/xhtml";
const Ut = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: St,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function mt(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), Ut.hasOwnProperty(n) ? { space: Ut[n], local: t } : t;
}
function Vn(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === St && n.documentElement.namespaceURI === St ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function Un(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function gn(t) {
  var n = mt(t);
  return (n.local ? Un : Vn)(n);
}
function Wn() {
}
function zt(t) {
  return t == null ? Wn : function() {
    return this.querySelector(t);
  };
}
function Kn(t) {
  typeof t != "function" && (t = zt(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = new Array(s), f, u, l = 0; l < s; ++l)
      (f = o[l]) && (u = t.call(f, f.__data__, l, o)) && ("__data__" in f && (u.__data__ = f.__data__), a[l] = u);
  return new D(r, this._parents);
}
function Gn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Qn() {
  return [];
}
function pn(t) {
  return t == null ? Qn : function() {
    return this.querySelectorAll(t);
  };
}
function Jn(t) {
  return function() {
    return Gn(t.apply(this, arguments));
  };
}
function Zn(t) {
  typeof t == "function" ? t = Jn(t) : t = pn(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && (r.push(t.call(f, f.__data__, u, s)), i.push(f));
  return new D(r, i);
}
function yn(t) {
  return function() {
    return this.matches(t);
  };
}
function dn(t) {
  return function(n) {
    return n.matches(t);
  };
}
var jn = Array.prototype.find;
function te(t) {
  return function() {
    return jn.call(this.children, t);
  };
}
function ne() {
  return this.firstElementChild;
}
function ee(t) {
  return this.select(t == null ? ne : te(typeof t == "function" ? t : dn(t)));
}
var re = Array.prototype.filter;
function ie() {
  return Array.from(this.children);
}
function oe(t) {
  return function() {
    return re.call(this.children, t);
  };
}
function se(t) {
  return this.selectAll(t == null ? ie : oe(typeof t == "function" ? t : dn(t)));
}
function ae(t) {
  typeof t != "function" && (t = yn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new D(r, this._parents);
}
function xn(t) {
  return new Array(t.length);
}
function ue() {
  return new D(this._enter || this._groups.map(xn), this._parents);
}
function yt(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
yt.prototype = {
  constructor: yt,
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
function fe(t) {
  return function() {
    return t;
  };
}
function le(t, n, e, r, i, o) {
  for (var s = 0, a, f = n.length, u = o.length; s < u; ++s)
    (a = n[s]) ? (a.__data__ = o[s], r[s] = a) : e[s] = new yt(t, o[s]);
  for (; s < f; ++s)
    (a = n[s]) && (i[s] = a);
}
function ce(t, n, e, r, i, o, s) {
  var a, f, u = /* @__PURE__ */ new Map(), l = n.length, g = o.length, c = new Array(l), h;
  for (a = 0; a < l; ++a)
    (f = n[a]) && (c[a] = h = s.call(f, f.__data__, a, n) + "", u.has(h) ? i[a] = f : u.set(h, f));
  for (a = 0; a < g; ++a)
    h = s.call(t, o[a], a, o) + "", (f = u.get(h)) ? (r[a] = f, f.__data__ = o[a], u.delete(h)) : e[a] = new yt(t, o[a]);
  for (a = 0; a < l; ++a)
    (f = n[a]) && u.get(c[a]) === f && (i[a] = f);
}
function he(t) {
  return t.__data__;
}
function ge(t, n) {
  if (!arguments.length)
    return Array.from(this, he);
  var e = n ? ce : le, r = this._parents, i = this._groups;
  typeof t != "function" && (t = fe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), f = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], g = i[u], c = g.length, h = pe(t.call(l, l && l.__data__, u, r)), y = h.length, d = a[u] = new Array(y), p = s[u] = new Array(y), x = f[u] = new Array(c);
    e(l, g, d, p, x, h, n);
    for (var _ = 0, N = 0, v, $; _ < y; ++_)
      if (v = d[_]) {
        for (_ >= N && (N = _ + 1); !($ = p[N]) && ++N < y; )
          ;
        v._next = $ || null;
      }
  }
  return s = new D(s, r), s._enter = a, s._exit = f, s;
}
function pe(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ye() {
  return new D(this._exit || this._groups.map(xn), this._parents);
}
function de(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function xe(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, s = Math.min(i, o), a = new Array(i), f = 0; f < s; ++f)
    for (var u = e[f], l = r[f], g = u.length, c = a[f] = new Array(g), h, y = 0; y < g; ++y)
      (h = u[y] || l[y]) && (c[y] = h);
  for (; f < i; ++f)
    a[f] = e[f];
  return new D(a, this._parents);
}
function _e() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function ve(t) {
  t || (t = we);
  function n(g, c) {
    return g && c ? t(g.__data__, c.__data__) : !g - !c;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = e[o], a = s.length, f = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (f[l] = u);
    f.sort(n);
  }
  return new D(i, this._parents).order();
}
function we(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function me() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function be() {
  return Array.from(this);
}
function Ne() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function Ae() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function ke() {
  return !this.node();
}
function Se(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Me(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $e(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ee(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Te(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function Ce(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Re(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ie(t, n) {
  var e = mt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? $e : Me : typeof n == "function" ? e.local ? Re : Ce : e.local ? Te : Ee)(e, n));
}
function _n(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ze(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Pe(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function De(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Fe(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? ze : typeof n == "function" ? De : Pe)(t, n, e ?? "")) : J(this.node(), t);
}
function J(t, n) {
  return t.style.getPropertyValue(n) || _n(t).getComputedStyle(t, null).getPropertyValue(n);
}
function He(t) {
  return function() {
    delete this[t];
  };
}
function Xe(t, n) {
  return function() {
    this[t] = n;
  };
}
function Oe(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? delete this[t] : this[t] = e;
  };
}
function Be(t, n) {
  return arguments.length > 1 ? this.each((n == null ? He : typeof n == "function" ? Oe : Xe)(t, n)) : this.node()[t];
}
function vn(t) {
  return t.trim().split(/^|\s+/);
}
function Pt(t) {
  return t.classList || new wn(t);
}
function wn(t) {
  this._node = t, this._names = vn(t.getAttribute("class") || "");
}
wn.prototype = {
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
function mn(t, n) {
  for (var e = Pt(t), r = -1, i = n.length; ++r < i; )
    e.add(n[r]);
}
function bn(t, n) {
  for (var e = Pt(t), r = -1, i = n.length; ++r < i; )
    e.remove(n[r]);
}
function Ye(t) {
  return function() {
    mn(this, t);
  };
}
function Le(t) {
  return function() {
    bn(this, t);
  };
}
function qe(t, n) {
  return function() {
    (n.apply(this, arguments) ? mn : bn)(this, t);
  };
}
function Ve(t, n) {
  var e = vn(t + "");
  if (arguments.length < 2) {
    for (var r = Pt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? qe : n ? Ye : Le)(e, n));
}
function Ue() {
  this.textContent = "";
}
function We(t) {
  return function() {
    this.textContent = t;
  };
}
function Ke(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ge(t) {
  return arguments.length ? this.each(t == null ? Ue : (typeof t == "function" ? Ke : We)(t)) : this.node().textContent;
}
function Qe() {
  this.innerHTML = "";
}
function Je(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ze(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function je(t) {
  return arguments.length ? this.each(t == null ? Qe : (typeof t == "function" ? Ze : Je)(t)) : this.node().innerHTML;
}
function tr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function nr() {
  return this.each(tr);
}
function er() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rr() {
  return this.each(er);
}
function ir(t) {
  var n = typeof t == "function" ? t : gn(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function or() {
  return null;
}
function sr(t, n) {
  var e = typeof t == "function" ? t : gn(t), r = n == null ? or : typeof n == "function" ? n : zt(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function ar() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ur() {
  return this.each(ar);
}
function fr() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function lr() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function cr(t) {
  return this.select(t ? lr : fr);
}
function hr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function gr(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function pr(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function yr(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function dr(t, n, e) {
  return function() {
    var r = this.__on, i, o = gr(n);
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
function xr(t, n, e) {
  var r = pr(t + ""), i, o = r.length, s;
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
  for (a = n ? dr : yr, i = 0; i < o; ++i)
    this.each(a(r[i], n, e));
  return this;
}
function Nn(t, n, e) {
  var r = _n(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function _r(t, n) {
  return function() {
    return Nn(this, t, n);
  };
}
function vr(t, n) {
  return function() {
    return Nn(this, t, n.apply(this, arguments));
  };
}
function wr(t, n) {
  return this.each((typeof n == "function" ? vr : _r)(t, n));
}
function* mr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var An = [null];
function D(t, n) {
  this._groups = t, this._parents = n;
}
function at() {
  return new D([[document.documentElement]], An);
}
function br() {
  return this;
}
D.prototype = at.prototype = {
  constructor: D,
  select: Kn,
  selectAll: Zn,
  selectChild: ee,
  selectChildren: se,
  filter: ae,
  data: ge,
  enter: ue,
  exit: ye,
  join: de,
  merge: xe,
  selection: br,
  order: _e,
  sort: ve,
  call: me,
  nodes: be,
  node: Ne,
  size: Ae,
  empty: ke,
  each: Se,
  attr: Ie,
  style: Fe,
  property: Be,
  classed: Ve,
  text: Ge,
  html: je,
  raise: nr,
  lower: rr,
  append: ir,
  insert: sr,
  remove: ur,
  clone: cr,
  datum: hr,
  on: xr,
  dispatch: wr,
  [Symbol.iterator]: mr
};
function Wt(t) {
  return typeof t == "string" ? new D([[document.querySelector(t)]], [document.documentElement]) : new D([[t]], An);
}
function Dt(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function kn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n)
    e[r] = n[r];
  return e;
}
function ut() {
}
var rt = 0.7, dt = 1 / rt, Q = "\\s*([+-]?\\d+)\\s*", it = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", B = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Nr = /^#([0-9a-f]{3,8})$/, Ar = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), kr = new RegExp(`^rgb\\(${B},${B},${B}\\)$`), Sr = new RegExp(`^rgba\\(${Q},${Q},${Q},${it}\\)$`), Mr = new RegExp(`^rgba\\(${B},${B},${B},${it}\\)$`), $r = new RegExp(`^hsl\\(${it},${B},${B}\\)$`), Er = new RegExp(`^hsla\\(${it},${B},${B},${it}\\)$`), Kt = {
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
Dt(ut, ot, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Gt,
  // Deprecated! Use color.formatHex.
  formatHex: Gt,
  formatHex8: Tr,
  formatHsl: Cr,
  formatRgb: Qt,
  toString: Qt
});
function Gt() {
  return this.rgb().formatHex();
}
function Tr() {
  return this.rgb().formatHex8();
}
function Cr() {
  return Sn(this).formatHsl();
}
function Qt() {
  return this.rgb().formatRgb();
}
function ot(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = Nr.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Jt(n) : e === 3 ? new P(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? ft(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? ft(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = Ar.exec(t)) ? new P(n[1], n[2], n[3], 1) : (n = kr.exec(t)) ? new P(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = Sr.exec(t)) ? ft(n[1], n[2], n[3], n[4]) : (n = Mr.exec(t)) ? ft(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = $r.exec(t)) ? tn(n[1], n[2] / 100, n[3] / 100, 1) : (n = Er.exec(t)) ? tn(n[1], n[2] / 100, n[3] / 100, n[4]) : Kt.hasOwnProperty(t) ? Jt(Kt[t]) : t === "transparent" ? new P(NaN, NaN, NaN, 0) : null;
}
function Jt(t) {
  return new P(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ft(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new P(t, n, e, r);
}
function Rr(t) {
  return t instanceof ut || (t = ot(t)), t ? (t = t.rgb(), new P(t.r, t.g, t.b, t.opacity)) : new P();
}
function Mt(t, n, e, r) {
  return arguments.length === 1 ? Rr(t) : new P(t, n, e, r ?? 1);
}
function P(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
Dt(P, Mt, kn(ut, {
  brighter(t) {
    return t = t == null ? dt : Math.pow(dt, t), new P(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? rt : Math.pow(rt, t), new P(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new P(K(this.r), K(this.g), K(this.b), xt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Zt,
  // Deprecated! Use color.formatHex.
  formatHex: Zt,
  formatHex8: Ir,
  formatRgb: jt,
  toString: jt
}));
function Zt() {
  return `#${W(this.r)}${W(this.g)}${W(this.b)}`;
}
function Ir() {
  return `#${W(this.r)}${W(this.g)}${W(this.b)}${W((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function jt() {
  const t = xt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${K(this.r)}, ${K(this.g)}, ${K(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function xt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function K(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function W(t) {
  return t = K(t), (t < 16 ? "0" : "") + t.toString(16);
}
function tn(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new X(t, n, e, r);
}
function Sn(t) {
  if (t instanceof X)
    return new X(t.h, t.s, t.l, t.opacity);
  if (t instanceof ut || (t = ot(t)), !t)
    return new X();
  if (t instanceof X)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), s = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? s = (e - r) / a + (e < r) * 6 : e === o ? s = (r - n) / a + 2 : s = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, s *= 60) : a = f > 0 && f < 1 ? 0 : s, new X(s, a, f, t.opacity);
}
function zr(t, n, e, r) {
  return arguments.length === 1 ? Sn(t) : new X(t, n, e, r ?? 1);
}
function X(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
Dt(X, zr, kn(ut, {
  brighter(t) {
    return t = t == null ? dt : Math.pow(dt, t), new X(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? rt : Math.pow(rt, t), new X(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new P(
      At(t >= 240 ? t - 240 : t + 120, i, r),
      At(t, i, r),
      At(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new X(nn(this.h), lt(this.s), lt(this.l), xt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = xt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${nn(this.h)}, ${lt(this.s) * 100}%, ${lt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function nn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function lt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function At(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Mn = (t) => () => t;
function Pr(t, n) {
  return function(e) {
    return t + e * n;
  };
}
function Dr(t, n, e) {
  return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e, function(r) {
    return Math.pow(t + r * n, e);
  };
}
function Fr(t) {
  return (t = +t) == 1 ? $n : function(n, e) {
    return e - n ? Dr(n, e, t) : Mn(isNaN(n) ? e : n);
  };
}
function $n(t, n) {
  var e = n - t;
  return e ? Pr(t, e) : Mn(isNaN(t) ? n : t);
}
const en = function t(n) {
  var e = Fr(n);
  function r(i, o) {
    var s = e((i = Mt(i)).r, (o = Mt(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), u = $n(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = f(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function V(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var $t = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, kt = new RegExp($t.source, "g");
function Hr(t) {
  return function() {
    return t;
  };
}
function Xr(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Or(t, n) {
  var e = $t.lastIndex = kt.lastIndex = 0, r, i, o, s = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = $t.exec(t)) && (i = kt.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, f.push({ i: s, x: V(r, i) })), e = kt.lastIndex;
  return e < n.length && (o = n.slice(e), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? f[0] ? Xr(f[0].x) : Hr(n) : (n = f.length, function(u) {
    for (var l = 0, g; l < n; ++l)
      a[(g = f[l]).i] = g.x(u);
    return a.join("");
  });
}
var rn = 180 / Math.PI, Et = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function En(t, n, e, r, i, o) {
  var s, a, f;
  return (s = Math.sqrt(t * t + n * n)) && (t /= s, n /= s), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * rn,
    skewX: Math.atan(f) * rn,
    scaleX: s,
    scaleY: a
  };
}
var ct;
function Br(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? Et : En(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Yr(t) {
  return t == null || (ct || (ct = document.createElementNS("http://www.w3.org/2000/svg", "g")), ct.setAttribute("transform", t), !(t = ct.transform.baseVal.consolidate())) ? Et : (t = t.matrix, En(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Tn(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, g, c, h, y) {
    if (u !== g || l !== c) {
      var d = h.push("translate(", null, n, null, e);
      y.push({ i: d - 4, x: V(u, g) }, { i: d - 2, x: V(l, c) });
    } else
      (g || c) && h.push("translate(" + g + n + c + e);
  }
  function s(u, l, g, c) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), c.push({ i: g.push(i(g) + "rotate(", null, r) - 2, x: V(u, l) })) : l && g.push(i(g) + "rotate(" + l + r);
  }
  function a(u, l, g, c) {
    u !== l ? c.push({ i: g.push(i(g) + "skewX(", null, r) - 2, x: V(u, l) }) : l && g.push(i(g) + "skewX(" + l + r);
  }
  function f(u, l, g, c, h, y) {
    if (u !== g || l !== c) {
      var d = h.push(i(h) + "scale(", null, ",", null, ")");
      y.push({ i: d - 4, x: V(u, g) }, { i: d - 2, x: V(l, c) });
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
var Lr = Tn(Br, "px, ", "px)", "deg)"), qr = Tn(Yr, ", ", ")", ")"), Z = 0, tt = 0, j = 0, Cn = 1e3, _t, nt, vt = 0, G = 0, bt = 0, st = typeof performance == "object" && performance.now ? performance : Date, Rn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Ft() {
  return G || (Rn(Vr), G = st.now() + bt);
}
function Vr() {
  G = 0;
}
function wt() {
  this._call = this._time = this._next = null;
}
wt.prototype = Ht.prototype = {
  constructor: wt,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Ft() : +e) + (n == null ? 0 : +n), !this._next && nt !== this && (nt ? nt._next = this : _t = this, nt = this), this._call = t, this._time = e, Tt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Tt());
  }
};
function Ht(t, n, e) {
  var r = new wt();
  return r.restart(t, n, e), r;
}
function Ur() {
  Ft(), ++Z;
  for (var t = _t, n; t; )
    (n = G - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --Z;
}
function on() {
  G = (vt = st.now()) + bt, Z = tt = 0;
  try {
    Ur();
  } finally {
    Z = 0, Kr(), G = 0;
  }
}
function Wr() {
  var t = st.now(), n = t - vt;
  n > Cn && (bt -= n, vt = t);
}
function Kr() {
  for (var t, n = _t, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : _t = e);
  nt = t, Tt(r);
}
function Tt(t) {
  if (!Z) {
    tt && (tt = clearTimeout(tt));
    var n = t - G;
    n > 24 ? (t < 1 / 0 && (tt = setTimeout(on, t - st.now() - bt)), j && (j = clearInterval(j))) : (j || (vt = st.now(), j = setInterval(Wr, Cn)), Z = 1, Rn(on));
  }
}
function sn(t, n, e) {
  var r = new wt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Gr = It("start", "end", "cancel", "interrupt"), Qr = [], In = 0, an = 1, Ct = 2, gt = 3, un = 4, Rt = 5, pt = 6;
function Nt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (e in s)
    return;
  Jr(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Gr,
    tween: Qr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: In
  });
}
function Xt(t, n) {
  var e = O(t, n);
  if (e.state > In)
    throw new Error("too late; already scheduled");
  return e;
}
function Y(t, n) {
  var e = O(t, n);
  if (e.state > gt)
    throw new Error("too late; already running");
  return e;
}
function O(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function Jr(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = Ht(o, 0, e.time);
  function o(u) {
    e.state = an, e.timer.restart(s, e.delay, e.time), e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, g, c, h;
    if (e.state !== an)
      return f();
    for (l in r)
      if (h = r[l], h.name === e.name) {
        if (h.state === gt)
          return sn(s);
        h.state === un ? (h.state = pt, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete r[l]) : +l < n && (h.state = pt, h.timer.stop(), h.on.call("cancel", t, t.__data__, h.index, h.group), delete r[l]);
      }
    if (sn(function() {
      e.state === gt && (e.state = un, e.timer.restart(a, e.delay, e.time), a(u));
    }), e.state = Ct, e.on.call("start", t, t.__data__, e.index, e.group), e.state === Ct) {
      for (e.state = gt, i = new Array(c = e.tween.length), l = 0, g = -1; l < c; ++l)
        (h = e.tween[l].value.call(t, t.__data__, e.index, e.group)) && (i[++g] = h);
      i.length = g + 1;
    }
  }
  function a(u) {
    for (var l = u < e.duration ? e.ease.call(null, u / e.duration) : (e.timer.restart(f), e.state = Rt, 1), g = -1, c = i.length; ++g < c; )
      i[g].call(t, l);
    e.state === Rt && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = pt, e.timer.stop(), delete r[n];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function Zr(t, n) {
  var e = t.__transition, r, i, o = !0, s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > Ct && r.state < Rt, r.state = pt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[s];
    }
    o && delete t.__transition;
  }
}
function jr(t) {
  return this.each(function() {
    Zr(this, t);
  });
}
function ti(t, n) {
  var e, r;
  return function() {
    var i = Y(this, t), o = i.tween;
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
function ni(t, n, e) {
  var r, i;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var o = Y(this, t), s = o.tween;
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
function ei(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = O(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((n == null ? ti : ni)(e, t, n));
}
function Ot(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = Y(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return O(i, r).value[n];
  };
}
function zn(t, n) {
  var e;
  return (typeof n == "number" ? V : n instanceof ot ? en : (e = ot(n)) ? (n = e, en) : Or)(t, n);
}
function ri(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ii(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function oi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function si(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function ai(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function ui(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function fi(t, n) {
  var e = mt(t), r = e === "transform" ? qr : zn;
  return this.attrTween(t, typeof n == "function" ? (e.local ? ui : ai)(e, r, Ot(this, "attr." + t, n)) : n == null ? (e.local ? ii : ri)(e) : (e.local ? si : oi)(e, r, n));
}
function li(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function ci(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function hi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && ci(t, o)), e;
  }
  return i._value = n, i;
}
function gi(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && li(t, o)), e;
  }
  return i._value = n, i;
}
function pi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var r = mt(t);
  return this.tween(e, (r.local ? hi : gi)(r, n));
}
function yi(t, n) {
  return function() {
    Xt(this, t).delay = +n.apply(this, arguments);
  };
}
function di(t, n) {
  return n = +n, function() {
    Xt(this, t).delay = n;
  };
}
function xi(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? yi : di)(n, t)) : O(this.node(), n).delay;
}
function _i(t, n) {
  return function() {
    Y(this, t).duration = +n.apply(this, arguments);
  };
}
function vi(t, n) {
  return n = +n, function() {
    Y(this, t).duration = n;
  };
}
function wi(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? _i : vi)(n, t)) : O(this.node(), n).duration;
}
function mi(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    Y(this, t).ease = n;
  };
}
function bi(t) {
  var n = this._id;
  return arguments.length ? this.each(mi(n, t)) : O(this.node(), n).ease;
}
function Ni(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    Y(this, t).ease = e;
  };
}
function Ai(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Ni(this._id, t));
}
function ki(t) {
  typeof t != "function" && (t = yn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new q(r, this._parents, this._name, this._id);
}
function Si(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], u = e[a], l = f.length, g = s[a] = new Array(l), c, h = 0; h < l; ++h)
      (c = f[h] || u[h]) && (g[h] = c);
  for (; a < r; ++a)
    s[a] = n[a];
  return new q(s, this._parents, this._name, this._id);
}
function Mi(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function $i(t, n, e) {
  var r, i, o = Mi(n) ? Xt : Y;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(n, e), s.on = i;
  };
}
function Ei(t, n) {
  var e = this._id;
  return arguments.length < 2 ? O(this.node(), e).on.on(t) : this.each($i(e, t, n));
}
function Ti(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function Ci() {
  return this.on("end.remove", Ti(this._id));
}
function Ri(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = zt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], f = a.length, u = o[s] = new Array(f), l, g, c = 0; c < f; ++c)
      (l = a[c]) && (g = t.call(l, l.__data__, c, a)) && ("__data__" in l && (g.__data__ = l.__data__), u[c] = g, Nt(u[c], n, e, c, u, O(l, e)));
  return new q(o, this._parents, n, e);
}
function Ii(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = pn(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var f = r[a], u = f.length, l, g = 0; g < u; ++g)
      if (l = f[g]) {
        for (var c = t.call(l, l.__data__, g, f), h, y = O(l, e), d = 0, p = c.length; d < p; ++d)
          (h = c[d]) && Nt(h, n, e, d, c, y);
        o.push(c), s.push(l);
      }
  return new q(o, s, n, e);
}
var zi = at.prototype.constructor;
function Pi() {
  return new zi(this._groups, this._parents);
}
function Di(t, n) {
  var e, r, i;
  return function() {
    var o = J(this, t), s = (this.style.removeProperty(t), J(this, t));
    return o === s ? null : o === e && s === r ? i : i = n(e = o, r = s);
  };
}
function Pn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Fi(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = J(this, t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Hi(t, n, e) {
  var r, i, o;
  return function() {
    var s = J(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), J(this, t))), s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a));
  };
}
function Xi(t, n) {
  var e, r, i, o = "style." + n, s = "end." + o, a;
  return function() {
    var f = Y(this, t), u = f.on, l = f.value[o] == null ? a || (a = Pn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, i = l), f.on = r;
  };
}
function Oi(t, n, e) {
  var r = (t += "") == "transform" ? Lr : zn;
  return n == null ? this.styleTween(t, Di(t, r)).on("end.style." + t, Pn(t)) : typeof n == "function" ? this.styleTween(t, Hi(t, r, Ot(this, "style." + t, n))).each(Xi(this._id, t)) : this.styleTween(t, Fi(t, r, n), e).on("end.style." + t, null);
}
function Bi(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Yi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Bi(t, s, e)), r;
  }
  return o._value = n, o;
}
function Li(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (n == null)
    return this.tween(r, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(r, Yi(t, n, e ?? ""));
}
function qi(t) {
  return function() {
    this.textContent = t;
  };
}
function Vi(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function Ui(t) {
  return this.tween("text", typeof t == "function" ? Vi(Ot(this, "text", t)) : qi(t == null ? "" : t + ""));
}
function Wi(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ki(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Wi(i)), n;
  }
  return r._value = t, r;
}
function Gi(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, Ki(t));
}
function Qi() {
  for (var t = this._name, n = this._id, e = Dn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      if (f = s[u]) {
        var l = O(f, n);
        Nt(f, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new q(r, this._parents, t, e);
}
function Ji() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, s) {
    var a = { value: s }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var u = Y(this, r), l = u.on;
      l !== t && (n = (t = l).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), u.on = n;
    }), i === 0 && o();
  });
}
var Zi = 0;
function q(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Dn() {
  return ++Zi;
}
var L = at.prototype;
q.prototype = {
  constructor: q,
  select: Ri,
  selectAll: Ii,
  selectChild: L.selectChild,
  selectChildren: L.selectChildren,
  filter: ki,
  merge: Si,
  selection: Pi,
  transition: Qi,
  call: L.call,
  nodes: L.nodes,
  node: L.node,
  size: L.size,
  empty: L.empty,
  each: L.each,
  on: Ei,
  attr: fi,
  attrTween: pi,
  style: Oi,
  styleTween: Li,
  text: Ui,
  textTween: Gi,
  remove: Ci,
  tween: ei,
  delay: xi,
  duration: wi,
  ease: bi,
  easeVarying: Ai,
  end: Ji,
  [Symbol.iterator]: L[Symbol.iterator]
};
function ji(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var to = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ji
};
function no(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function eo(t) {
  var n, e;
  t instanceof q ? (n = t._id, t = t._name) : (n = Dn(), (e = to).time = Ft(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && Nt(f, t, n, u, s, e || no(f, n));
  return new q(r, this._parents, t, n);
}
at.prototype.interrupt = jr;
at.prototype.transition = eo;
function ro(t, n) {
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
function io(t) {
  const n = +this._x.call(null, t), e = +this._y.call(null, t);
  return Fn(this.cover(n, e), n, e, t);
}
function Fn(t, n, e, r) {
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
function oo(t) {
  var n, e, r = t.length, i, o, s = new Array(r), a = new Array(r), f = 1 / 0, u = 1 / 0, l = -1 / 0, g = -1 / 0;
  for (e = 0; e < r; ++e)
    isNaN(i = +this._x.call(null, n = t[e])) || isNaN(o = +this._y.call(null, n)) || (s[e] = i, a[e] = o, i < f && (f = i), i > l && (l = i), o < u && (u = o), o > g && (g = o));
  if (f > l || u > g)
    return this;
  for (this.cover(f, u).cover(l, g), e = 0; e < r; ++e)
    Fn(this, s[e], a[e], t[e]);
  return this;
}
function so(t, n) {
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
function ao() {
  var t = [];
  return this.visit(function(n) {
    if (!n.length)
      do
        t.push(n.data);
      while (n = n.next);
  }), t;
}
function uo(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function R(t, n, e, r, i) {
  this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i;
}
function fo(t, n, e) {
  var r, i = this._x0, o = this._y0, s, a, f, u, l = this._x1, g = this._y1, c = [], h = this._root, y, d;
  for (h && c.push(new R(h, i, o, l, g)), e == null ? e = 1 / 0 : (i = t - e, o = n - e, l = t + e, g = n + e, e *= e); y = c.pop(); )
    if (!(!(h = y.node) || (s = y.x0) > l || (a = y.y0) > g || (f = y.x1) < i || (u = y.y1) < o))
      if (h.length) {
        var p = (s + f) / 2, x = (a + u) / 2;
        c.push(
          new R(h[3], p, x, f, u),
          new R(h[2], s, x, p, u),
          new R(h[1], p, a, f, x),
          new R(h[0], s, a, p, x)
        ), (d = (n >= x) << 1 | t >= p) && (y = c[c.length - 1], c[c.length - 1] = c[c.length - 1 - d], c[c.length - 1 - d] = y);
      } else {
        var _ = t - +this._x.call(null, h.data), N = n - +this._y.call(null, h.data), v = _ * _ + N * N;
        if (v < e) {
          var $ = Math.sqrt(e = v);
          i = t - $, o = n - $, l = t + $, g = n + $, r = h.data;
        }
      }
  return r;
}
function lo(t) {
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
function co(t) {
  for (var n = 0, e = t.length; n < e; ++n)
    this.remove(t[n]);
  return this;
}
function ho() {
  return this._root;
}
function go() {
  var t = 0;
  return this.visit(function(n) {
    if (!n.length)
      do
        ++t;
      while (n = n.next);
  }), t;
}
function po(t) {
  var n = [], e, r = this._root, i, o, s, a, f;
  for (r && n.push(new R(r, this._x0, this._y0, this._x1, this._y1)); e = n.pop(); )
    if (!t(r = e.node, o = e.x0, s = e.y0, a = e.x1, f = e.y1) && r.length) {
      var u = (o + a) / 2, l = (s + f) / 2;
      (i = r[3]) && n.push(new R(i, u, l, a, f)), (i = r[2]) && n.push(new R(i, o, l, u, f)), (i = r[1]) && n.push(new R(i, u, s, a, l)), (i = r[0]) && n.push(new R(i, o, s, u, l));
    }
  return this;
}
function yo(t) {
  var n = [], e = [], r;
  for (this._root && n.push(new R(this._root, this._x0, this._y0, this._x1, this._y1)); r = n.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, a = r.y0, f = r.x1, u = r.y1, l = (s + f) / 2, g = (a + u) / 2;
      (o = i[0]) && n.push(new R(o, s, a, l, g)), (o = i[1]) && n.push(new R(o, l, a, f, g)), (o = i[2]) && n.push(new R(o, s, g, l, u)), (o = i[3]) && n.push(new R(o, l, g, f, u));
    }
    e.push(r);
  }
  for (; r = e.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function xo(t) {
  return t[0];
}
function _o(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function vo(t) {
  return t[1];
}
function wo(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Bt(t, n, e) {
  var r = new Yt(n ?? xo, e ?? vo, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Yt(t, n, e, r, i, o) {
  this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function fn(t) {
  for (var n = { data: t.data }, e = n; t = t.next; )
    e = e.next = { data: t.data };
  return n;
}
var z = Bt.prototype = Yt.prototype;
z.copy = function() {
  var t = new Yt(this._x, this._y, this._x0, this._y0, this._x1, this._y1), n = this._root, e, r;
  if (!n)
    return t;
  if (!n.length)
    return t._root = fn(n), t;
  for (e = [{ source: n, target: t._root = new Array(4) }]; n = e.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = n.source[i]) && (r.length ? e.push({ source: r, target: n.target[i] = new Array(4) }) : n.target[i] = fn(r));
  return t;
};
z.add = io;
z.addAll = oo;
z.cover = so;
z.data = ao;
z.extent = uo;
z.find = fo;
z.remove = lo;
z.removeAll = co;
z.root = ho;
z.size = go;
z.visit = po;
z.visitAfter = yo;
z.x = _o;
z.y = wo;
function I(t) {
  return function() {
    return t;
  };
}
function U(t) {
  return (t() - 0.5) * 1e-6;
}
function mo(t) {
  return t.x + t.vx;
}
function bo(t) {
  return t.y + t.vy;
}
function No(t) {
  var n, e, r, i = 1, o = 1;
  typeof t != "function" && (t = I(t == null ? 1 : +t));
  function s() {
    for (var u, l = n.length, g, c, h, y, d, p, x = 0; x < o; ++x)
      for (g = Bt(n, mo, bo).visitAfter(a), u = 0; u < l; ++u)
        c = n[u], d = e[c.index], p = d * d, h = c.x + c.vx, y = c.y + c.vy, g.visit(_);
    function _(N, v, $, C, m) {
      var w = N.data, M = N.r, A = d + M;
      if (w) {
        if (w.index > c.index) {
          var S = h - w.x - w.vx, k = y - w.y - w.vy, b = S * S + k * k;
          b < A * A && (S === 0 && (S = U(r), b += S * S), k === 0 && (k = U(r), b += k * k), b = (A - (b = Math.sqrt(b))) / b * i, c.vx += (S *= b) * (A = (M *= M) / (p + M)), c.vy += (k *= b) * A, w.vx -= S * (A = 1 - A), w.vy -= k * A);
        }
        return;
      }
      return v > h + A || C < h - A || $ > y + A || m < y - A;
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
    return arguments.length ? (t = typeof u == "function" ? u : I(+u), f(), s) : t;
  }, s;
}
function Ao(t) {
  return t.index;
}
function ln(t, n) {
  var e = t.get(n);
  if (!e)
    throw new Error("node not found: " + n);
  return e;
}
function ko(t) {
  var n = Ao, e = g, r, i = I(30), o, s, a, f, u, l = 1;
  t == null && (t = []);
  function g(p) {
    return 1 / Math.min(a[p.source.index], a[p.target.index]);
  }
  function c(p) {
    for (var x = 0, _ = t.length; x < l; ++x)
      for (var N = 0, v, $, C, m, w, M, A; N < _; ++N)
        v = t[N], $ = v.source, C = v.target, m = C.x + C.vx - $.x - $.vx || U(u), w = C.y + C.vy - $.y - $.vy || U(u), M = Math.sqrt(m * m + w * w), M = (M - o[N]) / M * p * r[N], m *= M, w *= M, C.vx -= m * (A = f[N]), C.vy -= w * A, $.vx += m * (A = 1 - A), $.vy += w * A;
  }
  function h() {
    if (s) {
      var p, x = s.length, _ = t.length, N = new Map(s.map(($, C) => [n($, C, s), $])), v;
      for (p = 0, a = new Array(x); p < _; ++p)
        v = t[p], v.index = p, typeof v.source != "object" && (v.source = ln(N, v.source)), typeof v.target != "object" && (v.target = ln(N, v.target)), a[v.source.index] = (a[v.source.index] || 0) + 1, a[v.target.index] = (a[v.target.index] || 0) + 1;
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
    return arguments.length ? (e = typeof p == "function" ? p : I(+p), y(), c) : e;
  }, c.distance = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : I(+p), d(), c) : i;
  }, c;
}
const So = 1664525, Mo = 1013904223, cn = 4294967296;
function $o() {
  let t = 1;
  return () => (t = (So * t + Mo) % cn) / cn;
}
function Eo(t) {
  return t.x;
}
function To(t) {
  return t.y;
}
var Co = 10, Ro = Math.PI * (3 - Math.sqrt(5));
function Io(t) {
  var n, e = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, a = /* @__PURE__ */ new Map(), f = Ht(g), u = It("tick", "end"), l = $o();
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
        var _ = Co * Math.sqrt(0.5 + d), N = d * Ro;
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
      var _ = 0, N = t.length, v, $, C, m, w;
      for (x == null ? x = 1 / 0 : x *= x, _ = 0; _ < N; ++_)
        m = t[_], v = d - m.x, $ = p - m.y, C = v * v + $ * $, C < x && (w = m, x = C);
      return w;
    },
    on: function(d, p) {
      return arguments.length > 1 ? (u.on(d, p), n) : u.on(d);
    }
  };
}
function zo() {
  var t, n, e, r, i = I(-30), o, s = 1, a = 1 / 0, f = 0.81;
  function u(h) {
    var y, d = t.length, p = Bt(t, Eo, To).visitAfter(g);
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
      return v < a && (x === 0 && (x = U(e), v += x * x), _ === 0 && (_ = U(e), v += _ * _), v < s && (v = Math.sqrt(s * v)), n.vx += x * h.value * r / v, n.vy += _ * h.value * r / v), !0;
    if (h.length || v >= a)
      return;
    (h.data !== n || h.next) && (x === 0 && (x = U(e), v += x * x), _ === 0 && (_ = U(e), v += _ * _), v < s && (v = Math.sqrt(s * v)));
    do
      h.data !== n && (N = o[h.data.index] * r / v, n.vx += x * N, n.vy += _ * N);
    while (h = h.next);
  }
  return u.initialize = function(h, y) {
    t = h, e = y, l();
  }, u.strength = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : I(+h), l(), u) : i;
  }, u.distanceMin = function(h) {
    return arguments.length ? (s = h * h, u) : Math.sqrt(s);
  }, u.distanceMax = function(h) {
    return arguments.length ? (a = h * h, u) : Math.sqrt(a);
  }, u.theta = function(h) {
    return arguments.length ? (f = h * h, u) : Math.sqrt(f);
  }, u;
}
function Po(t) {
  var n = I(0.1), e, r, i;
  typeof t != "function" && (t = I(t == null ? 0 : +t));
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
    return arguments.length ? (n = typeof a == "function" ? a : I(+a), s(), o) : n;
  }, o.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : I(+a), s(), o) : t;
  }, o;
}
function Do(t) {
  var n = I(0.1), e, r, i;
  typeof t != "function" && (t = I(t == null ? 0 : +t));
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
    return arguments.length ? (n = typeof a == "function" ? a : I(+a), s(), o) : n;
  }, o.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : I(+a), s(), o) : t;
  }, o;
}
function Fo(t, n) {
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
const hn = Symbol("implicit");
function Hn() {
  var t = new Lt(), n = [], e = [], r = hn;
  function i(o) {
    let s = t.get(o);
    if (s === void 0) {
      if (r !== hn)
        return r;
      t.set(o, s = n.push(o) - 1);
    }
    return e[s % e.length];
  }
  return i.domain = function(o) {
    if (!arguments.length)
      return n.slice();
    n = [], t = new Lt();
    for (const s of o)
      t.has(s) || t.set(s, n.push(s) - 1);
    return i;
  }, i.range = function(o) {
    return arguments.length ? (e = Array.from(o), i) : e.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return Hn(n, e).unknown(r);
  }, Fo.apply(i, arguments), i;
}
function Ho(t) {
  for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n; )
    e[r] = "#" + t.slice(r * 6, ++r * 6);
  return e;
}
const Xo = Ho("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function et(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
et.prototype = {
  constructor: et,
  scale: function(t) {
    return t === 1 ? this : new et(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new et(this.k, this.x + this.k * t, this.y + this.k * n);
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
et.prototype;
function Oo(t, n, e = {
  sticky: !1,
  drag: !0,
  simulation: null,
  node: {
    stroke: !0,
    radius: 10,
    strokeWidth: 1,
    label: null,
    tooltip: null,
    tooltipFontSize: 20,
    onClick: null,
    onHover: null
  },
  link: {
    color: null
  }
}) {
  var C;
  const r = t.getBoundingClientRect(), i = r.width, o = r.height;
  t.setAttribute("width", i), t.setAttribute("height", o);
  let s = e == null ? void 0 : e.simulation;
  const a = Hn(Xo);
  let { links: f, nodes: u } = n, l = ((C = e.node) == null ? void 0 : C.radius) ?? 5;
  const g = () => Io(u).force("link", ko(f).id((m) => m.id)).force("charge", zo()).force("center", ro(i / 2, o / 2)).force("collide", No().radius(l)).force("x", Po(i / 2)).force("y", Do(o / 2));
  s || (s = g());
  const c = t.getContext("2d"), h = (m, w = null) => {
    f = m.links, u = m.nodes, N(), w && typeof w == "object" && Object.keys(w).forEach((M) => {
      e[M] = w[M];
    }), c.clearRect(0, 0, i, o), s.stop(), s = null, s = e.simulation ?? g(), s.on("tick", () => {
      v();
    }), e.drag && _();
  };
  let y = {
    rect: null,
    text: null,
    arrow: null
  };
  const d = (m) => {
    var F;
    let w = m.tooltip ?? e.node.tooltip;
    if (typeof w == "function" && (w = w(m)), typeof w != "string")
      throw new TypeError("tooltip should be string");
    let M = ((F = e.node) == null ? void 0 : F.tooltipFontSize) ?? 20;
    c.font = `${M}px serif`;
    let A = c.measureText(w), S = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    }, k = S.left + A.width + S.right, b = S.top + A.actualBoundingBoxAscent + A.actualBoundingBoxDescent + S.bottom, E = m.x - k / 2, T = m.y - 10 - b - l;
    E + k > r.width && (E = r.width - k), E < 0 && (E = 0), T < 0 && (T = m.y + 10 + l), y.rect = {
      x: E,
      y: T,
      width: k,
      height: b
    }, y.arrow = {
      x: [m.x - 5, T + b - 2],
      y: [m.x + 5, T + b - 2],
      z: [m.x, m.y - l]
    }, y.text = {
      x: E + k / 2 - A.width / 2,
      y: T + S.top + b / 2 - A.actualBoundingBoxDescent,
      content: w
    }, v();
  }, p = (m, w) => {
    let M = u.map((A) => (A.d = Math.sqrt(Math.pow(m - A.x, 2) + Math.pow(w - A.y, 2)), A)).filter((A, S) => {
      let k = typeof l == "function" ? l(A, S) : l;
      return A.d < k;
    });
    return M.length === 0 ? null : (M.sort((A, S) => A.d >= S.d ? 1 : -1), M[0]);
  }, x = (m) => (m.touches && (m = m.touches[0]), [(m.clientX - r.left) / (r.right - r.left) * i, (m.clientY - r.top) / (r.bottom - r.top) * o]), _ = () => {
    let m = !1, w = null, M = Wt(t);
    M.on("mousedown touchstart", (S) => {
      var T, F;
      S.preventDefault(), m = !0;
      let [k, b] = x(S), E = p(k, b);
      E && (w = E, w.fx = k, w.fy = b, (T = e.node) != null && T.onClick && ((F = e.node) == null || F.onClick(w))), S.touches && d(w);
    }), M.on("mouseup touchend", (S) => {
      S.preventDefault(), m = !1, S.active || s.alphaTarget(0), w && (w.x = w.fx, w.y = w.fy), !e.sticky && w && (w.fx = null, w.fy = null, w = null);
    });
    let A = null;
    M.on("touchmove mousemove", (S) => {
      var E, T, F;
      S.preventDefault();
      let [k, b] = x(S);
      if (!m || !w) {
        let H = p(k, b);
        M.style("cursor", H ? "grab" : "auto"), H && ((E = e.node) != null && E.tooltip || H.tooltip) ? (d(H), (T = e.node) != null && T.onHover && ((F = e.node) == null || F.onHover(H))) : (y.arrow = null, y.rect = null, y.text = null, v());
        return;
      }
      A && clearTimeout(A), A = setTimeout(() => {
        s.alphaTarget(0), m = !1, M.style("cursor", "auto");
      }, 3e3), M.style("cursor", "grabbing"), y.arrow = null, y.rect = null, y.text = null, w.fx = k, w.fy = b, s.alphaTarget(0.3).restart();
    });
  };
  function N() {
    let m = Wt(t);
    m.on("mousedown touchstart", null), m.on("mouseup touchend", null), m.on("touchmove mousemove", null);
  }
  function v() {
    var m, w, M, A, S;
    c.save(), c.clearRect(0, 0, i, o);
    for (let k = 0; k <= f.length - 1; k++) {
      let b = f[k], E = b.color || ((m = e.link) == null ? void 0 : m.color);
      c.strokeStyle = E ? typeof E == "function" ? E(b) : E : "black", c.beginPath(), c.moveTo(b.source.x, b.source.y), c.lineTo(b.target.x, b.target.y), c.stroke();
    }
    c.lineWidth = e.node.strokeWidth ?? 1;
    for (let k = 0; k <= u.length - 1; k++) {
      c.strokeStyle = null;
      let b = u[k], E = b.color || ((w = e.node) == null ? void 0 : w.color), T = b.radius ?? l;
      typeof T == "function" && (T = T(b, k)), c.fillStyle = E ? typeof E == "function" ? E(b, k) : E : a(b.id), c.beginPath(), b.x = Math.max(T, Math.min(i - T, b.x)), b.y = Math.max(T, Math.min(o - T, b.y)), c.arc(b.x, b.y, T, 0, Math.PI * 2), c.fill();
      let F = b.stroke || ((M = e.node) == null ? void 0 : M.stroke);
      F && (c.strokeStyle = typeof F == "string" ? F : "#ffffff", c.stroke()), c.closePath();
      let H = b.label || ((A = e.node) == null ? void 0 : A.label);
      H && (c.font = "14px serif", c.fillStyle = "black", c.fillText(typeof H == "function" ? H(b, k) : typeof H == "boolean" ? b.id : H, b.x - l / 2, b.y + l / 2));
    }
    if (y.rect && (c.fillStyle = "white", c.strokeStyle = "black", c.beginPath(), c.rect(y.rect.x, y.rect.y, y.rect.width, y.rect.height), c.fill(), c.stroke(), c.closePath()), y.arrow && (c.fillStyle = "white", c.beginPath(), c.moveTo(y.arrow.x[0], y.arrow.x[1]), c.lineTo(y.arrow.y[0], y.arrow.y[1]), c.lineTo(y.arrow.z[0], y.arrow.z[1]), c.fill(), c.closePath(), c.beginPath(), c.moveTo(y.arrow.z[0], y.arrow.z[1]), c.lineTo(y.arrow.x[0], y.arrow.x[1]), c.moveTo(y.arrow.z[0], y.arrow.z[1]), c.lineTo(y.arrow.y[0], y.arrow.y[1]), c.stroke(), c.closePath()), y.text) {
      c.fillStyle = "black";
      let k = ((S = e.node) == null ? void 0 : S.tooltipFontSize) ?? 20;
      c.font = `${k}px serif`, c.fillText(y.text.content, y.text.x, y.text.y);
    }
    c.restore();
  }
  return s.on("tick", () => {
    v();
  }), (e.drag ?? !0) && _(), {
    update: h,
    destroy: () => {
      s = null, c.clearRect(0, 0, i, o), e.drag && N();
    }
  };
}
export {
  Oo as default
};

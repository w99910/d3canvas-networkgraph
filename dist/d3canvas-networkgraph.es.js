class Bt extends Map {
  constructor(n, e = zn) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: e } }), n != null)
      for (const [r, i] of n)
        this.set(r, i);
  }
  get(n) {
    return super.get(Ot(this, n));
  }
  has(n) {
    return super.has(Ot(this, n));
  }
  set(n, e) {
    return super.set(Dn(this, n), e);
  }
  delete(n) {
    return super.delete(Xn(this, n));
  }
}
function Ot({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : e;
}
function Dn({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) ? t.get(r) : (t.set(r, e), e);
}
function Xn({ _intern: t, _key: n }, e) {
  const r = n(e);
  return t.has(r) && (e = t.get(r), t.delete(r)), e;
}
function zn(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var Fn = { value: () => {
} };
function Et() {
  for (var t = 0, n = arguments.length, e = {}, r; t < n; ++t) {
    if (!(r = arguments[t] + "") || r in e || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    e[r] = [];
  }
  return new ut(e);
}
function ut(t) {
  this._ = t;
}
function Hn(t, n) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var r = "", i = e.indexOf(".");
    if (i >= 0 && (r = e.slice(i + 1), e = e.slice(0, i)), e && !n.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    return { type: e, name: r };
  });
}
ut.prototype = Et.prototype = {
  constructor: ut,
  on: function(t, n) {
    var e = this._, r = Hn(t + "", e), i, o = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Bn(e[i], t.name)))
          return i;
      return;
    }
    if (n != null && typeof n != "function")
      throw new Error("invalid callback: " + n);
    for (; ++o < s; )
      if (i = (t = r[o]).type)
        e[i] = Yt(e[i], t.name, n);
      else if (n == null)
        for (i in e)
          e[i] = Yt(e[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, n = this._;
    for (var e in n)
      t[e] = n[e].slice();
    return new ut(t);
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
function Bn(t, n) {
  for (var e = 0, r = t.length, i; e < r; ++e)
    if ((i = t[e]).name === n)
      return i.value;
}
function Yt(t, n, e) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === n) {
      t[r] = Fn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return e != null && t.push({ name: n, value: e }), t;
}
var bt = "http://www.w3.org/1999/xhtml";
const Lt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: bt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function xt(t) {
  var n = t += "", e = n.indexOf(":");
  return e >= 0 && (n = t.slice(0, e)) !== "xmlns" && (t = t.slice(e + 1)), Lt.hasOwnProperty(n) ? { space: Lt[n], local: t } : t;
}
function On(t) {
  return function() {
    var n = this.ownerDocument, e = this.namespaceURI;
    return e === bt && n.documentElement.namespaceURI === bt ? n.createElement(t) : n.createElementNS(e, t);
  };
}
function Yn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Tt(t) {
  var n = xt(t);
  return (n.local ? Yn : On)(n);
}
function Ln() {
}
function Ct(t) {
  return t == null ? Ln : function() {
    return this.querySelector(t);
  };
}
function qn(t) {
  typeof t != "function" && (t = Ct(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = new Array(s), f, u, l = 0; l < s; ++l)
      (f = o[l]) && (u = t.call(f, f.__data__, l, o)) && ("__data__" in f && (u.__data__ = f.__data__), a[l] = u);
  return new I(r, this._parents);
}
function Vn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Un() {
  return [];
}
function ln(t) {
  return t == null ? Un : function() {
    return this.querySelectorAll(t);
  };
}
function Wn(t) {
  return function() {
    return Vn(t.apply(this, arguments));
  };
}
function Kn(t) {
  typeof t == "function" ? t = Wn(t) : t = ln(t);
  for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
    for (var s = n[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && (r.push(t.call(f, f.__data__, u, s)), i.push(f));
  return new I(r, i);
}
function cn(t) {
  return function() {
    return this.matches(t);
  };
}
function hn(t) {
  return function(n) {
    return n.matches(t);
  };
}
var Gn = Array.prototype.find;
function Qn(t) {
  return function() {
    return Gn.call(this.children, t);
  };
}
function Jn() {
  return this.firstElementChild;
}
function Zn(t) {
  return this.select(t == null ? Jn : Qn(typeof t == "function" ? t : hn(t)));
}
var jn = Array.prototype.filter;
function te() {
  return Array.from(this.children);
}
function ne(t) {
  return function() {
    return jn.call(this.children, t);
  };
}
function ee(t) {
  return this.selectAll(t == null ? te : ne(typeof t == "function" ? t : hn(t)));
}
function re(t) {
  typeof t != "function" && (t = cn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new I(r, this._parents);
}
function gn(t) {
  return new Array(t.length);
}
function ie() {
  return new I(this._enter || this._groups.map(gn), this._parents);
}
function ct(t, n) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n;
}
ct.prototype = {
  constructor: ct,
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
function oe(t) {
  return function() {
    return t;
  };
}
function se(t, n, e, r, i, o) {
  for (var s = 0, a, f = n.length, u = o.length; s < u; ++s)
    (a = n[s]) ? (a.__data__ = o[s], r[s] = a) : e[s] = new ct(t, o[s]);
  for (; s < f; ++s)
    (a = n[s]) && (i[s] = a);
}
function ae(t, n, e, r, i, o, s) {
  var a, f, u = /* @__PURE__ */ new Map(), l = n.length, g = o.length, h = new Array(l), c;
  for (a = 0; a < l; ++a)
    (f = n[a]) && (h[a] = c = s.call(f, f.__data__, a, n) + "", u.has(c) ? i[a] = f : u.set(c, f));
  for (a = 0; a < g; ++a)
    c = s.call(t, o[a], a, o) + "", (f = u.get(c)) ? (r[a] = f, f.__data__ = o[a], u.delete(c)) : e[a] = new ct(t, o[a]);
  for (a = 0; a < l; ++a)
    (f = n[a]) && u.get(h[a]) === f && (i[a] = f);
}
function ue(t) {
  return t.__data__;
}
function fe(t, n) {
  if (!arguments.length)
    return Array.from(this, ue);
  var e = n ? ae : se, r = this._parents, i = this._groups;
  typeof t != "function" && (t = oe(t));
  for (var o = i.length, s = new Array(o), a = new Array(o), f = new Array(o), u = 0; u < o; ++u) {
    var l = r[u], g = i[u], h = g.length, c = le(t.call(l, l && l.__data__, u, r)), d = c.length, y = a[u] = new Array(d), p = s[u] = new Array(d), _ = f[u] = new Array(h);
    e(l, g, y, p, _, c, n);
    for (var v = 0, N = 0, x, w; v < d; ++v)
      if (x = y[v]) {
        for (v >= N && (N = v + 1); !(w = p[N]) && ++N < d; )
          ;
        x._next = w || null;
      }
  }
  return s = new I(s, r), s._enter = a, s._exit = f, s;
}
function le(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function ce() {
  return new I(this._exit || this._groups.map(gn), this._parents);
}
function he(t, n, e) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), n != null && (i = n(i), i && (i = i.selection())), e == null ? o.remove() : e(o), r && i ? r.merge(i).order() : i;
}
function ge(t) {
  for (var n = t.selection ? t.selection() : t, e = this._groups, r = n._groups, i = e.length, o = r.length, s = Math.min(i, o), a = new Array(i), f = 0; f < s; ++f)
    for (var u = e[f], l = r[f], g = u.length, h = a[f] = new Array(g), c, d = 0; d < g; ++d)
      (c = u[d] || l[d]) && (h[d] = c);
  for (; f < i; ++f)
    a[f] = e[f];
  return new I(a, this._parents);
}
function pe() {
  for (var t = this._groups, n = -1, e = t.length; ++n < e; )
    for (var r = t[n], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function ye(t) {
  t || (t = de);
  function n(g, h) {
    return g && h ? t(g.__data__, h.__data__) : !g - !h;
  }
  for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var s = e[o], a = s.length, f = i[o] = new Array(a), u, l = 0; l < a; ++l)
      (u = s[l]) && (f[l] = u);
    f.sort(n);
  }
  return new I(i, this._parents).order();
}
function de(t, n) {
  return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
}
function xe() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function _e() {
  return Array.from(this);
}
function ve() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s)
        return s;
    }
  return null;
}
function we() {
  let t = 0;
  for (const n of this)
    ++t;
  return t;
}
function me() {
  return !this.node();
}
function be(t) {
  for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
    for (var i = n[e], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Ne(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ae(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ke(t, n) {
  return function() {
    this.setAttribute(t, n);
  };
}
function Me(t, n) {
  return function() {
    this.setAttributeNS(t.space, t.local, n);
  };
}
function $e(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttribute(t) : this.setAttribute(t, e);
  };
}
function Se(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    e == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e);
  };
}
function Ee(t, n) {
  var e = xt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e);
  }
  return this.each((n == null ? e.local ? Ae : Ne : typeof n == "function" ? e.local ? Se : $e : e.local ? Me : ke)(e, n));
}
function pn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Te(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Ce(t, n, e) {
  return function() {
    this.style.setProperty(t, n, e);
  };
}
function Re(t, n, e) {
  return function() {
    var r = n.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, e);
  };
}
function Ie(t, n, e) {
  return arguments.length > 1 ? this.each((n == null ? Te : typeof n == "function" ? Re : Ce)(t, n, e ?? "")) : W(this.node(), t);
}
function W(t, n) {
  return t.style.getPropertyValue(n) || pn(t).getComputedStyle(t, null).getPropertyValue(n);
}
function Pe(t) {
  return function() {
    delete this[t];
  };
}
function De(t, n) {
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
function ze(t, n) {
  return arguments.length > 1 ? this.each((n == null ? Pe : typeof n == "function" ? Xe : De)(t, n)) : this.node()[t];
}
function yn(t) {
  return t.trim().split(/^|\s+/);
}
function Rt(t) {
  return t.classList || new dn(t);
}
function dn(t) {
  this._node = t, this._names = yn(t.getAttribute("class") || "");
}
dn.prototype = {
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
function xn(t, n) {
  for (var e = Rt(t), r = -1, i = n.length; ++r < i; )
    e.add(n[r]);
}
function _n(t, n) {
  for (var e = Rt(t), r = -1, i = n.length; ++r < i; )
    e.remove(n[r]);
}
function Fe(t) {
  return function() {
    xn(this, t);
  };
}
function He(t) {
  return function() {
    _n(this, t);
  };
}
function Be(t, n) {
  return function() {
    (n.apply(this, arguments) ? xn : _n)(this, t);
  };
}
function Oe(t, n) {
  var e = yn(t + "");
  if (arguments.length < 2) {
    for (var r = Rt(this.node()), i = -1, o = e.length; ++i < o; )
      if (!r.contains(e[i]))
        return !1;
    return !0;
  }
  return this.each((typeof n == "function" ? Be : n ? Fe : He)(e, n));
}
function Ye() {
  this.textContent = "";
}
function Le(t) {
  return function() {
    this.textContent = t;
  };
}
function qe(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.textContent = n ?? "";
  };
}
function Ve(t) {
  return arguments.length ? this.each(t == null ? Ye : (typeof t == "function" ? qe : Le)(t)) : this.node().textContent;
}
function Ue() {
  this.innerHTML = "";
}
function We(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Ke(t) {
  return function() {
    var n = t.apply(this, arguments);
    this.innerHTML = n ?? "";
  };
}
function Ge(t) {
  return arguments.length ? this.each(t == null ? Ue : (typeof t == "function" ? Ke : We)(t)) : this.node().innerHTML;
}
function Qe() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Je() {
  return this.each(Qe);
}
function Ze() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function je() {
  return this.each(Ze);
}
function tr(t) {
  var n = typeof t == "function" ? t : Tt(t);
  return this.select(function() {
    return this.appendChild(n.apply(this, arguments));
  });
}
function nr() {
  return null;
}
function er(t, n) {
  var e = typeof t == "function" ? t : Tt(t), r = n == null ? nr : typeof n == "function" ? n : Ct(n);
  return this.select(function() {
    return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function rr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ir() {
  return this.each(rr);
}
function or() {
  var t = this.cloneNode(!1), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function sr() {
  var t = this.cloneNode(!0), n = this.parentNode;
  return n ? n.insertBefore(t, this.nextSibling) : t;
}
function ar(t) {
  return this.select(t ? sr : or);
}
function ur(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function fr(t) {
  return function(n) {
    t.call(this, n, this.__data__);
  };
}
function lr(t) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var e = "", r = n.indexOf(".");
    return r >= 0 && (e = n.slice(r + 1), n = n.slice(0, r)), { type: n, name: e };
  });
}
function cr(t) {
  return function() {
    var n = this.__on;
    if (n) {
      for (var e = 0, r = -1, i = n.length, o; e < i; ++e)
        o = n[e], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : n[++r] = o;
      ++r ? n.length = r : delete this.__on;
    }
  };
}
function hr(t, n, e) {
  return function() {
    var r = this.__on, i, o = fr(n);
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
function gr(t, n, e) {
  var r = lr(t + ""), i, o = r.length, s;
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
  for (a = n ? hr : cr, i = 0; i < o; ++i)
    this.each(a(r[i], n, e));
  return this;
}
function vn(t, n, e) {
  var r = pn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i);
}
function pr(t, n) {
  return function() {
    return vn(this, t, n);
  };
}
function yr(t, n) {
  return function() {
    return vn(this, t, n.apply(this, arguments));
  };
}
function dr(t, n) {
  return this.each((typeof n == "function" ? yr : pr)(t, n));
}
function* xr() {
  for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
    for (var r = t[n], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var wn = [null];
function I(t, n) {
  this._groups = t, this._parents = n;
}
function rt() {
  return new I([[document.documentElement]], wn);
}
function _r() {
  return this;
}
I.prototype = rt.prototype = {
  constructor: I,
  select: qn,
  selectAll: Kn,
  selectChild: Zn,
  selectChildren: ee,
  filter: re,
  data: fe,
  enter: ie,
  exit: ce,
  join: he,
  merge: ge,
  selection: _r,
  order: pe,
  sort: ye,
  call: xe,
  nodes: _e,
  node: ve,
  size: we,
  empty: me,
  each: be,
  attr: Ee,
  style: Ie,
  property: ze,
  classed: Oe,
  text: Ve,
  html: Ge,
  raise: Je,
  lower: je,
  append: tr,
  insert: er,
  remove: ir,
  clone: ar,
  datum: ur,
  on: gr,
  dispatch: dr,
  [Symbol.iterator]: xr
};
function vr(t) {
  return typeof t == "string" ? new I([[document.querySelector(t)]], [document.documentElement]) : new I([[t]], wn);
}
function wr(t) {
  return vr(Tt(t).call(document.documentElement));
}
function It(t, n, e) {
  t.prototype = n.prototype = e, e.constructor = t;
}
function mn(t, n) {
  var e = Object.create(t.prototype);
  for (var r in n)
    e[r] = n[r];
  return e;
}
function it() {
}
var j = 0.7, ht = 1 / j, U = "\\s*([+-]?\\d+)\\s*", tt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", X = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", mr = /^#([0-9a-f]{3,8})$/, br = new RegExp(`^rgb\\(${U},${U},${U}\\)$`), Nr = new RegExp(`^rgb\\(${X},${X},${X}\\)$`), Ar = new RegExp(`^rgba\\(${U},${U},${U},${tt}\\)$`), kr = new RegExp(`^rgba\\(${X},${X},${X},${tt}\\)$`), Mr = new RegExp(`^hsl\\(${tt},${X},${X}\\)$`), $r = new RegExp(`^hsla\\(${tt},${X},${X},${tt}\\)$`), qt = {
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
It(it, nt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Vt,
  // Deprecated! Use color.formatHex.
  formatHex: Vt,
  formatHex8: Sr,
  formatHsl: Er,
  formatRgb: Ut,
  toString: Ut
});
function Vt() {
  return this.rgb().formatHex();
}
function Sr() {
  return this.rgb().formatHex8();
}
function Er() {
  return bn(this).formatHsl();
}
function Ut() {
  return this.rgb().formatRgb();
}
function nt(t) {
  var n, e;
  return t = (t + "").trim().toLowerCase(), (n = mr.exec(t)) ? (e = n[1].length, n = parseInt(n[1], 16), e === 6 ? Wt(n) : e === 3 ? new R(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, (n & 15) << 4 | n & 15, 1) : e === 8 ? ot(n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, (n & 255) / 255) : e === 4 ? ot(n >> 12 & 15 | n >> 8 & 240, n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | n & 240, ((n & 15) << 4 | n & 15) / 255) : null) : (n = br.exec(t)) ? new R(n[1], n[2], n[3], 1) : (n = Nr.exec(t)) ? new R(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, 1) : (n = Ar.exec(t)) ? ot(n[1], n[2], n[3], n[4]) : (n = kr.exec(t)) ? ot(n[1] * 255 / 100, n[2] * 255 / 100, n[3] * 255 / 100, n[4]) : (n = Mr.exec(t)) ? Qt(n[1], n[2] / 100, n[3] / 100, 1) : (n = $r.exec(t)) ? Qt(n[1], n[2] / 100, n[3] / 100, n[4]) : qt.hasOwnProperty(t) ? Wt(qt[t]) : t === "transparent" ? new R(NaN, NaN, NaN, 0) : null;
}
function Wt(t) {
  return new R(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function ot(t, n, e, r) {
  return r <= 0 && (t = n = e = NaN), new R(t, n, e, r);
}
function Tr(t) {
  return t instanceof it || (t = nt(t)), t ? (t = t.rgb(), new R(t.r, t.g, t.b, t.opacity)) : new R();
}
function Nt(t, n, e, r) {
  return arguments.length === 1 ? Tr(t) : new R(t, n, e, r ?? 1);
}
function R(t, n, e, r) {
  this.r = +t, this.g = +n, this.b = +e, this.opacity = +r;
}
It(R, Nt, mn(it, {
  brighter(t) {
    return t = t == null ? ht : Math.pow(ht, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? j : Math.pow(j, t), new R(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new R(q(this.r), q(this.g), q(this.b), gt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Kt,
  // Deprecated! Use color.formatHex.
  formatHex: Kt,
  formatHex8: Cr,
  formatRgb: Gt,
  toString: Gt
}));
function Kt() {
  return `#${L(this.r)}${L(this.g)}${L(this.b)}`;
}
function Cr() {
  return `#${L(this.r)}${L(this.g)}${L(this.b)}${L((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Gt() {
  const t = gt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${q(this.r)}, ${q(this.g)}, ${q(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function gt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function q(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function L(t) {
  return t = q(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Qt(t, n, e, r) {
  return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new P(t, n, e, r);
}
function bn(t) {
  if (t instanceof P)
    return new P(t.h, t.s, t.l, t.opacity);
  if (t instanceof it || (t = nt(t)), !t)
    return new P();
  if (t instanceof P)
    return t;
  t = t.rgb();
  var n = t.r / 255, e = t.g / 255, r = t.b / 255, i = Math.min(n, e, r), o = Math.max(n, e, r), s = NaN, a = o - i, f = (o + i) / 2;
  return a ? (n === o ? s = (e - r) / a + (e < r) * 6 : e === o ? s = (r - n) / a + 2 : s = (n - e) / a + 4, a /= f < 0.5 ? o + i : 2 - o - i, s *= 60) : a = f > 0 && f < 1 ? 0 : s, new P(s, a, f, t.opacity);
}
function Rr(t, n, e, r) {
  return arguments.length === 1 ? bn(t) : new P(t, n, e, r ?? 1);
}
function P(t, n, e, r) {
  this.h = +t, this.s = +n, this.l = +e, this.opacity = +r;
}
It(P, Rr, mn(it, {
  brighter(t) {
    return t = t == null ? ht : Math.pow(ht, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? j : Math.pow(j, t), new P(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, n = isNaN(t) || isNaN(this.s) ? 0 : this.s, e = this.l, r = e + (e < 0.5 ? e : 1 - e) * n, i = 2 * e - r;
    return new R(
      wt(t >= 240 ? t - 240 : t + 120, i, r),
      wt(t, i, r),
      wt(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new P(Jt(this.h), st(this.s), st(this.l), gt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = gt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${Jt(this.h)}, ${st(this.s) * 100}%, ${st(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function Jt(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function st(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function wt(t, n, e) {
  return (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n) * 255;
}
const Nn = (t) => () => t;
function Ir(t, n) {
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
  return (t = +t) == 1 ? An : function(n, e) {
    return e - n ? Pr(n, e, t) : Nn(isNaN(n) ? e : n);
  };
}
function An(t, n) {
  var e = n - t;
  return e ? Ir(t, e) : Nn(isNaN(t) ? n : t);
}
const Zt = function t(n) {
  var e = Dr(n);
  function r(i, o) {
    var s = e((i = Nt(i)).r, (o = Nt(o)).r), a = e(i.g, o.g), f = e(i.b, o.b), u = An(i.opacity, o.opacity);
    return function(l) {
      return i.r = s(l), i.g = a(l), i.b = f(l), i.opacity = u(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function O(t, n) {
  return t = +t, n = +n, function(e) {
    return t * (1 - e) + n * e;
  };
}
var At = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, mt = new RegExp(At.source, "g");
function Xr(t) {
  return function() {
    return t;
  };
}
function zr(t) {
  return function(n) {
    return t(n) + "";
  };
}
function Fr(t, n) {
  var e = At.lastIndex = mt.lastIndex = 0, r, i, o, s = -1, a = [], f = [];
  for (t = t + "", n = n + ""; (r = At.exec(t)) && (i = mt.exec(n)); )
    (o = i.index) > e && (o = n.slice(e, o), a[s] ? a[s] += o : a[++s] = o), (r = r[0]) === (i = i[0]) ? a[s] ? a[s] += i : a[++s] = i : (a[++s] = null, f.push({ i: s, x: O(r, i) })), e = mt.lastIndex;
  return e < n.length && (o = n.slice(e), a[s] ? a[s] += o : a[++s] = o), a.length < 2 ? f[0] ? zr(f[0].x) : Xr(n) : (n = f.length, function(u) {
    for (var l = 0, g; l < n; ++l)
      a[(g = f[l]).i] = g.x(u);
    return a.join("");
  });
}
var jt = 180 / Math.PI, kt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function kn(t, n, e, r, i, o) {
  var s, a, f;
  return (s = Math.sqrt(t * t + n * n)) && (t /= s, n /= s), (f = t * e + n * r) && (e -= t * f, r -= n * f), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, f /= a), t * r < n * e && (t = -t, n = -n, f = -f, s = -s), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(n, t) * jt,
    skewX: Math.atan(f) * jt,
    scaleX: s,
    scaleY: a
  };
}
var at;
function Hr(t) {
  const n = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return n.isIdentity ? kt : kn(n.a, n.b, n.c, n.d, n.e, n.f);
}
function Br(t) {
  return t == null || (at || (at = document.createElementNS("http://www.w3.org/2000/svg", "g")), at.setAttribute("transform", t), !(t = at.transform.baseVal.consolidate())) ? kt : (t = t.matrix, kn(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Mn(t, n, e, r) {
  function i(u) {
    return u.length ? u.pop() + " " : "";
  }
  function o(u, l, g, h, c, d) {
    if (u !== g || l !== h) {
      var y = c.push("translate(", null, n, null, e);
      d.push({ i: y - 4, x: O(u, g) }, { i: y - 2, x: O(l, h) });
    } else
      (g || h) && c.push("translate(" + g + n + h + e);
  }
  function s(u, l, g, h) {
    u !== l ? (u - l > 180 ? l += 360 : l - u > 180 && (u += 360), h.push({ i: g.push(i(g) + "rotate(", null, r) - 2, x: O(u, l) })) : l && g.push(i(g) + "rotate(" + l + r);
  }
  function a(u, l, g, h) {
    u !== l ? h.push({ i: g.push(i(g) + "skewX(", null, r) - 2, x: O(u, l) }) : l && g.push(i(g) + "skewX(" + l + r);
  }
  function f(u, l, g, h, c, d) {
    if (u !== g || l !== h) {
      var y = c.push(i(c) + "scale(", null, ",", null, ")");
      d.push({ i: y - 4, x: O(u, g) }, { i: y - 2, x: O(l, h) });
    } else
      (g !== 1 || h !== 1) && c.push(i(c) + "scale(" + g + "," + h + ")");
  }
  return function(u, l) {
    var g = [], h = [];
    return u = t(u), l = t(l), o(u.translateX, u.translateY, l.translateX, l.translateY, g, h), s(u.rotate, l.rotate, g, h), a(u.skewX, l.skewX, g, h), f(u.scaleX, u.scaleY, l.scaleX, l.scaleY, g, h), u = l = null, function(c) {
      for (var d = -1, y = h.length, p; ++d < y; )
        g[(p = h[d]).i] = p.x(c);
      return g.join("");
    };
  };
}
var Or = Mn(Hr, "px, ", "px)", "deg)"), Yr = Mn(Br, ", ", ")", ")"), K = 0, Q = 0, G = 0, $n = 1e3, pt, J, yt = 0, V = 0, _t = 0, et = typeof performance == "object" && performance.now ? performance : Date, Sn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function Pt() {
  return V || (Sn(Lr), V = et.now() + _t);
}
function Lr() {
  V = 0;
}
function dt() {
  this._call = this._time = this._next = null;
}
dt.prototype = Dt.prototype = {
  constructor: dt,
  restart: function(t, n, e) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    e = (e == null ? Pt() : +e) + (n == null ? 0 : +n), !this._next && J !== this && (J ? J._next = this : pt = this, J = this), this._call = t, this._time = e, Mt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Mt());
  }
};
function Dt(t, n, e) {
  var r = new dt();
  return r.restart(t, n, e), r;
}
function qr() {
  Pt(), ++K;
  for (var t = pt, n; t; )
    (n = V - t._time) >= 0 && t._call.call(void 0, n), t = t._next;
  --K;
}
function tn() {
  V = (yt = et.now()) + _t, K = Q = 0;
  try {
    qr();
  } finally {
    K = 0, Ur(), V = 0;
  }
}
function Vr() {
  var t = et.now(), n = t - yt;
  n > $n && (_t -= n, yt = t);
}
function Ur() {
  for (var t, n = pt, e, r = 1 / 0; n; )
    n._call ? (r > n._time && (r = n._time), t = n, n = n._next) : (e = n._next, n._next = null, n = t ? t._next = e : pt = e);
  J = t, Mt(r);
}
function Mt(t) {
  if (!K) {
    Q && (Q = clearTimeout(Q));
    var n = t - V;
    n > 24 ? (t < 1 / 0 && (Q = setTimeout(tn, t - et.now() - _t)), G && (G = clearInterval(G))) : (G || (yt = et.now(), G = setInterval(Vr, $n)), K = 1, Sn(tn));
  }
}
function nn(t, n, e) {
  var r = new dt();
  return n = n == null ? 0 : +n, r.restart((i) => {
    r.stop(), t(i + n);
  }, n, e), r;
}
var Wr = Et("start", "end", "cancel", "interrupt"), Kr = [], En = 0, en = 1, $t = 2, ft = 3, rn = 4, St = 5, lt = 6;
function vt(t, n, e, r, i, o) {
  var s = t.__transition;
  if (!s)
    t.__transition = {};
  else if (e in s)
    return;
  Gr(t, e, {
    name: n,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Wr,
    tween: Kr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: En
  });
}
function Xt(t, n) {
  var e = D(t, n);
  if (e.state > En)
    throw new Error("too late; already scheduled");
  return e;
}
function z(t, n) {
  var e = D(t, n);
  if (e.state > ft)
    throw new Error("too late; already running");
  return e;
}
function D(t, n) {
  var e = t.__transition;
  if (!e || !(e = e[n]))
    throw new Error("transition not found");
  return e;
}
function Gr(t, n, e) {
  var r = t.__transition, i;
  r[n] = e, e.timer = Dt(o, 0, e.time);
  function o(u) {
    e.state = en, e.timer.restart(s, e.delay, e.time), e.delay <= u && s(u - e.delay);
  }
  function s(u) {
    var l, g, h, c;
    if (e.state !== en)
      return f();
    for (l in r)
      if (c = r[l], c.name === e.name) {
        if (c.state === ft)
          return nn(s);
        c.state === rn ? (c.state = lt, c.timer.stop(), c.on.call("interrupt", t, t.__data__, c.index, c.group), delete r[l]) : +l < n && (c.state = lt, c.timer.stop(), c.on.call("cancel", t, t.__data__, c.index, c.group), delete r[l]);
      }
    if (nn(function() {
      e.state === ft && (e.state = rn, e.timer.restart(a, e.delay, e.time), a(u));
    }), e.state = $t, e.on.call("start", t, t.__data__, e.index, e.group), e.state === $t) {
      for (e.state = ft, i = new Array(h = e.tween.length), l = 0, g = -1; l < h; ++l)
        (c = e.tween[l].value.call(t, t.__data__, e.index, e.group)) && (i[++g] = c);
      i.length = g + 1;
    }
  }
  function a(u) {
    for (var l = u < e.duration ? e.ease.call(null, u / e.duration) : (e.timer.restart(f), e.state = St, 1), g = -1, h = i.length; ++g < h; )
      i[g].call(t, l);
    e.state === St && (e.on.call("end", t, t.__data__, e.index, e.group), f());
  }
  function f() {
    e.state = lt, e.timer.stop(), delete r[n];
    for (var u in r)
      return;
    delete t.__transition;
  }
}
function Qr(t, n) {
  var e = t.__transition, r, i, o = !0, s;
  if (e) {
    n = n == null ? null : n + "";
    for (s in e) {
      if ((r = e[s]).name !== n) {
        o = !1;
        continue;
      }
      i = r.state > $t && r.state < St, r.state = lt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete e[s];
    }
    o && delete t.__transition;
  }
}
function Jr(t) {
  return this.each(function() {
    Qr(this, t);
  });
}
function Zr(t, n) {
  var e, r;
  return function() {
    var i = z(this, t), o = i.tween;
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
function jr(t, n, e) {
  var r, i;
  if (typeof e != "function")
    throw new Error();
  return function() {
    var o = z(this, t), s = o.tween;
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
function ti(t, n) {
  var e = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = D(this.node(), e).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t)
        return s.value;
    return null;
  }
  return this.each((n == null ? Zr : jr)(e, t, n));
}
function zt(t, n, e) {
  var r = t._id;
  return t.each(function() {
    var i = z(this, r);
    (i.value || (i.value = {}))[n] = e.apply(this, arguments);
  }), function(i) {
    return D(i, r).value[n];
  };
}
function Tn(t, n) {
  var e;
  return (typeof n == "number" ? O : n instanceof nt ? Zt : (e = nt(n)) ? (n = e, Zt) : Fr)(t, n);
}
function ni(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function ei(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ri(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function ii(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function oi(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttribute(t) : (s = this.getAttribute(t), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function si(t, n, e) {
  var r, i, o;
  return function() {
    var s, a = e(this), f;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (s = this.getAttributeNS(t.space, t.local), f = a + "", s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a)));
  };
}
function ai(t, n) {
  var e = xt(t), r = e === "transform" ? Yr : Tn;
  return this.attrTween(t, typeof n == "function" ? (e.local ? si : oi)(e, r, zt(this, "attr." + t, n)) : n == null ? (e.local ? ei : ni)(e) : (e.local ? ii : ri)(e, r, n));
}
function ui(t, n) {
  return function(e) {
    this.setAttribute(t, n.call(this, e));
  };
}
function fi(t, n) {
  return function(e) {
    this.setAttributeNS(t.space, t.local, n.call(this, e));
  };
}
function li(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && fi(t, o)), e;
  }
  return i._value = n, i;
}
function ci(t, n) {
  var e, r;
  function i() {
    var o = n.apply(this, arguments);
    return o !== r && (e = (r = o) && ui(t, o)), e;
  }
  return i._value = n, i;
}
function hi(t, n) {
  var e = "attr." + t;
  if (arguments.length < 2)
    return (e = this.tween(e)) && e._value;
  if (n == null)
    return this.tween(e, null);
  if (typeof n != "function")
    throw new Error();
  var r = xt(t);
  return this.tween(e, (r.local ? li : ci)(r, n));
}
function gi(t, n) {
  return function() {
    Xt(this, t).delay = +n.apply(this, arguments);
  };
}
function pi(t, n) {
  return n = +n, function() {
    Xt(this, t).delay = n;
  };
}
function yi(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? gi : pi)(n, t)) : D(this.node(), n).delay;
}
function di(t, n) {
  return function() {
    z(this, t).duration = +n.apply(this, arguments);
  };
}
function xi(t, n) {
  return n = +n, function() {
    z(this, t).duration = n;
  };
}
function _i(t) {
  var n = this._id;
  return arguments.length ? this.each((typeof t == "function" ? di : xi)(n, t)) : D(this.node(), n).duration;
}
function vi(t, n) {
  if (typeof n != "function")
    throw new Error();
  return function() {
    z(this, t).ease = n;
  };
}
function wi(t) {
  var n = this._id;
  return arguments.length ? this.each(vi(n, t)) : D(this.node(), n).ease;
}
function mi(t, n) {
  return function() {
    var e = n.apply(this, arguments);
    if (typeof e != "function")
      throw new Error();
    z(this, t).ease = e;
  };
}
function bi(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(mi(this._id, t));
}
function Ni(t) {
  typeof t != "function" && (t = cn(t));
  for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
    for (var o = n[i], s = o.length, a = r[i] = [], f, u = 0; u < s; ++u)
      (f = o[u]) && t.call(f, f.__data__, u, o) && a.push(f);
  return new B(r, this._parents, this._name, this._id);
}
function Ai(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), s = new Array(r), a = 0; a < o; ++a)
    for (var f = n[a], u = e[a], l = f.length, g = s[a] = new Array(l), h, c = 0; c < l; ++c)
      (h = f[c] || u[c]) && (g[c] = h);
  for (; a < r; ++a)
    s[a] = n[a];
  return new B(s, this._parents, this._name, this._id);
}
function ki(t) {
  return (t + "").trim().split(/^|\s+/).every(function(n) {
    var e = n.indexOf(".");
    return e >= 0 && (n = n.slice(0, e)), !n || n === "start";
  });
}
function Mi(t, n, e) {
  var r, i, o = ki(n) ? Xt : z;
  return function() {
    var s = o(this, t), a = s.on;
    a !== r && (i = (r = a).copy()).on(n, e), s.on = i;
  };
}
function $i(t, n) {
  var e = this._id;
  return arguments.length < 2 ? D(this.node(), e).on.on(t) : this.each(Mi(e, t, n));
}
function Si(t) {
  return function() {
    var n = this.parentNode;
    for (var e in this.__transition)
      if (+e !== t)
        return;
    n && n.removeChild(this);
  };
}
function Ei() {
  return this.on("end.remove", Si(this._id));
}
function Ti(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = Ct(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (var a = r[s], f = a.length, u = o[s] = new Array(f), l, g, h = 0; h < f; ++h)
      (l = a[h]) && (g = t.call(l, l.__data__, h, a)) && ("__data__" in l && (g.__data__ = l.__data__), u[h] = g, vt(u[h], n, e, h, u, D(l, e)));
  return new B(o, this._parents, n, e);
}
function Ci(t) {
  var n = this._name, e = this._id;
  typeof t != "function" && (t = ln(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var f = r[a], u = f.length, l, g = 0; g < u; ++g)
      if (l = f[g]) {
        for (var h = t.call(l, l.__data__, g, f), c, d = D(l, e), y = 0, p = h.length; y < p; ++y)
          (c = h[y]) && vt(c, n, e, y, h, d);
        o.push(h), s.push(l);
      }
  return new B(o, s, n, e);
}
var Ri = rt.prototype.constructor;
function Ii() {
  return new Ri(this._groups, this._parents);
}
function Pi(t, n) {
  var e, r, i;
  return function() {
    var o = W(this, t), s = (this.style.removeProperty(t), W(this, t));
    return o === s ? null : o === e && s === r ? i : i = n(e = o, r = s);
  };
}
function Cn(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Di(t, n, e) {
  var r, i = e + "", o;
  return function() {
    var s = W(this, t);
    return s === i ? null : s === r ? o : o = n(r = s, e);
  };
}
function Xi(t, n, e) {
  var r, i, o;
  return function() {
    var s = W(this, t), a = e(this), f = a + "";
    return a == null && (f = a = (this.style.removeProperty(t), W(this, t))), s === f ? null : s === r && f === i ? o : (i = f, o = n(r = s, a));
  };
}
function zi(t, n) {
  var e, r, i, o = "style." + n, s = "end." + o, a;
  return function() {
    var f = z(this, t), u = f.on, l = f.value[o] == null ? a || (a = Cn(n)) : void 0;
    (u !== e || i !== l) && (r = (e = u).copy()).on(s, i = l), f.on = r;
  };
}
function Fi(t, n, e) {
  var r = (t += "") == "transform" ? Or : Tn;
  return n == null ? this.styleTween(t, Pi(t, r)).on("end.style." + t, Cn(t)) : typeof n == "function" ? this.styleTween(t, Xi(t, r, zt(this, "style." + t, n))).each(zi(this._id, t)) : this.styleTween(t, Di(t, r, n), e).on("end.style." + t, null);
}
function Hi(t, n, e) {
  return function(r) {
    this.style.setProperty(t, n.call(this, r), e);
  };
}
function Bi(t, n, e) {
  var r, i;
  function o() {
    var s = n.apply(this, arguments);
    return s !== i && (r = (i = s) && Hi(t, s, e)), r;
  }
  return o._value = n, o;
}
function Oi(t, n, e) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (n == null)
    return this.tween(r, null);
  if (typeof n != "function")
    throw new Error();
  return this.tween(r, Bi(t, n, e ?? ""));
}
function Yi(t) {
  return function() {
    this.textContent = t;
  };
}
function Li(t) {
  return function() {
    var n = t(this);
    this.textContent = n ?? "";
  };
}
function qi(t) {
  return this.tween("text", typeof t == "function" ? Li(zt(this, "text", t)) : Yi(t == null ? "" : t + ""));
}
function Vi(t) {
  return function(n) {
    this.textContent = t.call(this, n);
  };
}
function Ui(t) {
  var n, e;
  function r() {
    var i = t.apply(this, arguments);
    return i !== e && (n = (e = i) && Vi(i)), n;
  }
  return r._value = t, r;
}
function Wi(t) {
  var n = "text";
  if (arguments.length < 1)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(n, Ui(t));
}
function Ki() {
  for (var t = this._name, n = this._id, e = Rn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      if (f = s[u]) {
        var l = D(f, n);
        vt(f, t, e, u, s, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new B(r, this._parents, t, e);
}
function Gi() {
  var t, n, e = this, r = e._id, i = e.size();
  return new Promise(function(o, s) {
    var a = { value: s }, f = { value: function() {
      --i === 0 && o();
    } };
    e.each(function() {
      var u = z(this, r), l = u.on;
      l !== t && (n = (t = l).copy(), n._.cancel.push(a), n._.interrupt.push(a), n._.end.push(f)), u.on = n;
    }), i === 0 && o();
  });
}
var Qi = 0;
function B(t, n, e, r) {
  this._groups = t, this._parents = n, this._name = e, this._id = r;
}
function Rn() {
  return ++Qi;
}
var H = rt.prototype;
B.prototype = {
  constructor: B,
  select: Ti,
  selectAll: Ci,
  selectChild: H.selectChild,
  selectChildren: H.selectChildren,
  filter: Ni,
  merge: Ai,
  selection: Ii,
  transition: Ki,
  call: H.call,
  nodes: H.nodes,
  node: H.node,
  size: H.size,
  empty: H.empty,
  each: H.each,
  on: $i,
  attr: ai,
  attrTween: hi,
  style: Fi,
  styleTween: Oi,
  text: qi,
  textTween: Wi,
  remove: Ei,
  tween: ti,
  delay: yi,
  duration: _i,
  ease: wi,
  easeVarying: bi,
  end: Gi,
  [Symbol.iterator]: H[Symbol.iterator]
};
function Ji(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Zi = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ji
};
function ji(t, n) {
  for (var e; !(e = t.__transition) || !(e = e[n]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${n} not found`);
  return e;
}
function to(t) {
  var n, e;
  t instanceof B ? (n = t._id, t = t._name) : (n = Rn(), (e = Zi).time = Pt(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, f, u = 0; u < a; ++u)
      (f = s[u]) && vt(f, t, n, u, s, e || ji(f, n));
  return new B(r, this._parents, t, n);
}
rt.prototype.interrupt = Jr;
rt.prototype.transition = to;
function no(t) {
  const n = +this._x.call(null, t), e = +this._y.call(null, t);
  return In(this.cover(n, e), n, e, t);
}
function In(t, n, e, r) {
  if (isNaN(n) || isNaN(e))
    return t;
  var i, o = t._root, s = { data: r }, a = t._x0, f = t._y0, u = t._x1, l = t._y1, g, h, c, d, y, p, _, v;
  if (!o)
    return t._root = s, t;
  for (; o.length; )
    if ((y = n >= (g = (a + u) / 2)) ? a = g : u = g, (p = e >= (h = (f + l) / 2)) ? f = h : l = h, i = o, !(o = o[_ = p << 1 | y]))
      return i[_] = s, t;
  if (c = +t._x.call(null, o.data), d = +t._y.call(null, o.data), n === c && e === d)
    return s.next = o, i ? i[_] = s : t._root = s, t;
  do
    i = i ? i[_] = new Array(4) : t._root = new Array(4), (y = n >= (g = (a + u) / 2)) ? a = g : u = g, (p = e >= (h = (f + l) / 2)) ? f = h : l = h;
  while ((_ = p << 1 | y) === (v = (d >= h) << 1 | c >= g));
  return i[v] = o, i[_] = s, t;
}
function eo(t) {
  var n, e, r = t.length, i, o, s = new Array(r), a = new Array(r), f = 1 / 0, u = 1 / 0, l = -1 / 0, g = -1 / 0;
  for (e = 0; e < r; ++e)
    isNaN(i = +this._x.call(null, n = t[e])) || isNaN(o = +this._y.call(null, n)) || (s[e] = i, a[e] = o, i < f && (f = i), i > l && (l = i), o < u && (u = o), o > g && (g = o));
  if (f > l || u > g)
    return this;
  for (this.cover(f, u).cover(l, g), e = 0; e < r; ++e)
    In(this, s[e], a[e], t[e]);
  return this;
}
function ro(t, n) {
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
function io() {
  var t = [];
  return this.visit(function(n) {
    if (!n.length)
      do
        t.push(n.data);
      while (n = n.next);
  }), t;
}
function oo(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function E(t, n, e, r, i) {
  this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i;
}
function so(t, n, e) {
  var r, i = this._x0, o = this._y0, s, a, f, u, l = this._x1, g = this._y1, h = [], c = this._root, d, y;
  for (c && h.push(new E(c, i, o, l, g)), e == null ? e = 1 / 0 : (i = t - e, o = n - e, l = t + e, g = n + e, e *= e); d = h.pop(); )
    if (!(!(c = d.node) || (s = d.x0) > l || (a = d.y0) > g || (f = d.x1) < i || (u = d.y1) < o))
      if (c.length) {
        var p = (s + f) / 2, _ = (a + u) / 2;
        h.push(
          new E(c[3], p, _, f, u),
          new E(c[2], s, _, p, u),
          new E(c[1], p, a, f, _),
          new E(c[0], s, a, p, _)
        ), (y = (n >= _) << 1 | t >= p) && (d = h[h.length - 1], h[h.length - 1] = h[h.length - 1 - y], h[h.length - 1 - y] = d);
      } else {
        var v = t - +this._x.call(null, c.data), N = n - +this._y.call(null, c.data), x = v * v + N * N;
        if (x < e) {
          var w = Math.sqrt(e = x);
          i = t - w, o = n - w, l = t + w, g = n + w, r = c.data;
        }
      }
  return r;
}
function ao(t) {
  if (isNaN(l = +this._x.call(null, t)) || isNaN(g = +this._y.call(null, t)))
    return this;
  var n, e = this._root, r, i, o, s = this._x0, a = this._y0, f = this._x1, u = this._y1, l, g, h, c, d, y, p, _;
  if (!e)
    return this;
  if (e.length)
    for (; ; ) {
      if ((d = l >= (h = (s + f) / 2)) ? s = h : f = h, (y = g >= (c = (a + u) / 2)) ? a = c : u = c, n = e, !(e = e[p = y << 1 | d]))
        return this;
      if (!e.length)
        break;
      (n[p + 1 & 3] || n[p + 2 & 3] || n[p + 3 & 3]) && (r = n, _ = p);
    }
  for (; e.data !== t; )
    if (i = e, !(e = e.next))
      return this;
  return (o = e.next) && delete e.next, i ? (o ? i.next = o : delete i.next, this) : n ? (o ? n[p] = o : delete n[p], (e = n[0] || n[1] || n[2] || n[3]) && e === (n[3] || n[2] || n[1] || n[0]) && !e.length && (r ? r[_] = e : this._root = e), this) : (this._root = o, this);
}
function uo(t) {
  for (var n = 0, e = t.length; n < e; ++n)
    this.remove(t[n]);
  return this;
}
function fo() {
  return this._root;
}
function lo() {
  var t = 0;
  return this.visit(function(n) {
    if (!n.length)
      do
        ++t;
      while (n = n.next);
  }), t;
}
function co(t) {
  var n = [], e, r = this._root, i, o, s, a, f;
  for (r && n.push(new E(r, this._x0, this._y0, this._x1, this._y1)); e = n.pop(); )
    if (!t(r = e.node, o = e.x0, s = e.y0, a = e.x1, f = e.y1) && r.length) {
      var u = (o + a) / 2, l = (s + f) / 2;
      (i = r[3]) && n.push(new E(i, u, l, a, f)), (i = r[2]) && n.push(new E(i, o, l, u, f)), (i = r[1]) && n.push(new E(i, u, s, a, l)), (i = r[0]) && n.push(new E(i, o, s, u, l));
    }
  return this;
}
function ho(t) {
  var n = [], e = [], r;
  for (this._root && n.push(new E(this._root, this._x0, this._y0, this._x1, this._y1)); r = n.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, s = r.x0, a = r.y0, f = r.x1, u = r.y1, l = (s + f) / 2, g = (a + u) / 2;
      (o = i[0]) && n.push(new E(o, s, a, l, g)), (o = i[1]) && n.push(new E(o, l, a, f, g)), (o = i[2]) && n.push(new E(o, s, g, l, u)), (o = i[3]) && n.push(new E(o, l, g, f, u));
    }
    e.push(r);
  }
  for (; r = e.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function go(t) {
  return t[0];
}
function po(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function yo(t) {
  return t[1];
}
function xo(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function Ft(t, n, e) {
  var r = new Ht(n ?? go, e ?? yo, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function Ht(t, n, e, r, i, o) {
  this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function on(t) {
  for (var n = { data: t.data }, e = n; t = t.next; )
    e = e.next = { data: t.data };
  return n;
}
var C = Ft.prototype = Ht.prototype;
C.copy = function() {
  var t = new Ht(this._x, this._y, this._x0, this._y0, this._x1, this._y1), n = this._root, e, r;
  if (!n)
    return t;
  if (!n.length)
    return t._root = on(n), t;
  for (e = [{ source: n, target: t._root = new Array(4) }]; n = e.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = n.source[i]) && (r.length ? e.push({ source: r, target: n.target[i] = new Array(4) }) : n.target[i] = on(r));
  return t;
};
C.add = no;
C.addAll = eo;
C.cover = ro;
C.data = io;
C.extent = oo;
C.find = so;
C.remove = ao;
C.removeAll = uo;
C.root = fo;
C.size = lo;
C.visit = co;
C.visitAfter = ho;
C.x = po;
C.y = xo;
function T(t) {
  return function() {
    return t;
  };
}
function Y(t) {
  return (t() - 0.5) * 1e-6;
}
function _o(t) {
  return t.x + t.vx;
}
function vo(t) {
  return t.y + t.vy;
}
function wo(t) {
  var n, e, r, i = 1, o = 1;
  typeof t != "function" && (t = T(t == null ? 1 : +t));
  function s() {
    for (var u, l = n.length, g, h, c, d, y, p, _ = 0; _ < o; ++_)
      for (g = Ft(n, _o, vo).visitAfter(a), u = 0; u < l; ++u)
        h = n[u], y = e[h.index], p = y * y, c = h.x + h.vx, d = h.y + h.vy, g.visit(v);
    function v(N, x, w, A, m) {
      var b = N.data, M = N.r, k = y + M;
      if (b) {
        if (b.index > h.index) {
          var $ = c - b.x - b.vx, S = d - b.y - b.vy, F = $ * $ + S * S;
          F < k * k && ($ === 0 && ($ = Y(r), F += $ * $), S === 0 && (S = Y(r), F += S * S), F = (k - (F = Math.sqrt(F))) / F * i, h.vx += ($ *= F) * (k = (M *= M) / (p + M)), h.vy += (S *= F) * k, b.vx -= $ * (k = 1 - k), b.vy -= S * k);
        }
        return;
      }
      return x > c + k || A < c - k || w > d + k || m < d - k;
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
    return arguments.length ? (t = typeof u == "function" ? u : T(+u), f(), s) : t;
  }, s;
}
function mo(t) {
  return t.index;
}
function sn(t, n) {
  var e = t.get(n);
  if (!e)
    throw new Error("node not found: " + n);
  return e;
}
function an(t) {
  var n = mo, e = g, r, i = T(30), o, s, a, f, u, l = 1;
  t == null && (t = []);
  function g(p) {
    return 1 / Math.min(a[p.source.index], a[p.target.index]);
  }
  function h(p) {
    for (var _ = 0, v = t.length; _ < l; ++_)
      for (var N = 0, x, w, A, m, b, M, k; N < v; ++N)
        x = t[N], w = x.source, A = x.target, m = A.x + A.vx - w.x - w.vx || Y(u), b = A.y + A.vy - w.y - w.vy || Y(u), M = Math.sqrt(m * m + b * b), M = (M - o[N]) / M * p * r[N], m *= M, b *= M, A.vx -= m * (k = f[N]), A.vy -= b * k, w.vx += m * (k = 1 - k), w.vy += b * k;
  }
  function c() {
    if (s) {
      var p, _ = s.length, v = t.length, N = new Map(s.map((w, A) => [n(w, A, s), w])), x;
      for (p = 0, a = new Array(_); p < v; ++p)
        x = t[p], x.index = p, typeof x.source != "object" && (x.source = sn(N, x.source)), typeof x.target != "object" && (x.target = sn(N, x.target)), a[x.source.index] = (a[x.source.index] || 0) + 1, a[x.target.index] = (a[x.target.index] || 0) + 1;
      for (p = 0, f = new Array(v); p < v; ++p)
        x = t[p], f[p] = a[x.source.index] / (a[x.source.index] + a[x.target.index]);
      r = new Array(v), d(), o = new Array(v), y();
    }
  }
  function d() {
    if (s)
      for (var p = 0, _ = t.length; p < _; ++p)
        r[p] = +e(t[p], p, t);
  }
  function y() {
    if (s)
      for (var p = 0, _ = t.length; p < _; ++p)
        o[p] = +i(t[p], p, t);
  }
  return h.initialize = function(p, _) {
    s = p, u = _, c();
  }, h.links = function(p) {
    return arguments.length ? (t = p, c(), h) : t;
  }, h.id = function(p) {
    return arguments.length ? (n = p, h) : n;
  }, h.iterations = function(p) {
    return arguments.length ? (l = +p, h) : l;
  }, h.strength = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : T(+p), d(), h) : e;
  }, h.distance = function(p) {
    return arguments.length ? (i = typeof p == "function" ? p : T(+p), y(), h) : i;
  }, h;
}
const bo = 1664525, No = 1013904223, un = 4294967296;
function Ao() {
  let t = 1;
  return () => (t = (bo * t + No) % un) / un;
}
function ko(t) {
  return t.x;
}
function Mo(t) {
  return t.y;
}
var $o = 10, So = Math.PI * (3 - Math.sqrt(5));
function Eo(t) {
  var n, e = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, s = 0.6, a = /* @__PURE__ */ new Map(), f = Dt(g), u = Et("tick", "end"), l = Ao();
  t == null && (t = []);
  function g() {
    h(), u.call("tick", n), e < r && (f.stop(), u.call("end", n));
  }
  function h(y) {
    var p, _ = t.length, v;
    y === void 0 && (y = 1);
    for (var N = 0; N < y; ++N)
      for (e += (o - e) * i, a.forEach(function(x) {
        x(e);
      }), p = 0; p < _; ++p)
        v = t[p], v.fx == null ? v.x += v.vx *= s : (v.x = v.fx, v.vx = 0), v.fy == null ? v.y += v.vy *= s : (v.y = v.fy, v.vy = 0);
    return n;
  }
  function c() {
    for (var y = 0, p = t.length, _; y < p; ++y) {
      if (_ = t[y], _.index = y, _.fx != null && (_.x = _.fx), _.fy != null && (_.y = _.fy), isNaN(_.x) || isNaN(_.y)) {
        var v = $o * Math.sqrt(0.5 + y), N = y * So;
        _.x = v * Math.cos(N), _.y = v * Math.sin(N);
      }
      (isNaN(_.vx) || isNaN(_.vy)) && (_.vx = _.vy = 0);
    }
  }
  function d(y) {
    return y.initialize && y.initialize(t, l), y;
  }
  return c(), n = {
    tick: h,
    restart: function() {
      return f.restart(g), n;
    },
    stop: function() {
      return f.stop(), n;
    },
    nodes: function(y) {
      return arguments.length ? (t = y, c(), a.forEach(d), n) : t;
    },
    alpha: function(y) {
      return arguments.length ? (e = +y, n) : e;
    },
    alphaMin: function(y) {
      return arguments.length ? (r = +y, n) : r;
    },
    alphaDecay: function(y) {
      return arguments.length ? (i = +y, n) : +i;
    },
    alphaTarget: function(y) {
      return arguments.length ? (o = +y, n) : o;
    },
    velocityDecay: function(y) {
      return arguments.length ? (s = 1 - y, n) : 1 - s;
    },
    randomSource: function(y) {
      return arguments.length ? (l = y, a.forEach(d), n) : l;
    },
    force: function(y, p) {
      return arguments.length > 1 ? (p == null ? a.delete(y) : a.set(y, d(p)), n) : a.get(y);
    },
    find: function(y, p, _) {
      var v = 0, N = t.length, x, w, A, m, b;
      for (_ == null ? _ = 1 / 0 : _ *= _, v = 0; v < N; ++v)
        m = t[v], x = y - m.x, w = p - m.y, A = x * x + w * w, A < _ && (b = m, _ = A);
      return b;
    },
    on: function(y, p) {
      return arguments.length > 1 ? (u.on(y, p), n) : u.on(y);
    }
  };
}
function To() {
  var t, n, e, r, i = T(-30), o, s = 1, a = 1 / 0, f = 0.81;
  function u(c) {
    var d, y = t.length, p = Ft(t, ko, Mo).visitAfter(g);
    for (r = c, d = 0; d < y; ++d)
      n = t[d], p.visit(h);
  }
  function l() {
    if (t) {
      var c, d = t.length, y;
      for (o = new Array(d), c = 0; c < d; ++c)
        y = t[c], o[y.index] = +i(y, c, t);
    }
  }
  function g(c) {
    var d = 0, y, p, _ = 0, v, N, x;
    if (c.length) {
      for (v = N = x = 0; x < 4; ++x)
        (y = c[x]) && (p = Math.abs(y.value)) && (d += y.value, _ += p, v += p * y.x, N += p * y.y);
      c.x = v / _, c.y = N / _;
    } else {
      y = c, y.x = y.data.x, y.y = y.data.y;
      do
        d += o[y.data.index];
      while (y = y.next);
    }
    c.value = d;
  }
  function h(c, d, y, p) {
    if (!c.value)
      return !0;
    var _ = c.x - n.x, v = c.y - n.y, N = p - d, x = _ * _ + v * v;
    if (N * N / f < x)
      return x < a && (_ === 0 && (_ = Y(e), x += _ * _), v === 0 && (v = Y(e), x += v * v), x < s && (x = Math.sqrt(s * x)), n.vx += _ * c.value * r / x, n.vy += v * c.value * r / x), !0;
    if (c.length || x >= a)
      return;
    (c.data !== n || c.next) && (_ === 0 && (_ = Y(e), x += _ * _), v === 0 && (v = Y(e), x += v * v), x < s && (x = Math.sqrt(s * x)));
    do
      c.data !== n && (N = o[c.data.index] * r / x, n.vx += _ * N, n.vy += v * N);
    while (c = c.next);
  }
  return u.initialize = function(c, d) {
    t = c, e = d, l();
  }, u.strength = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : T(+c), l(), u) : i;
  }, u.distanceMin = function(c) {
    return arguments.length ? (s = c * c, u) : Math.sqrt(s);
  }, u.distanceMax = function(c) {
    return arguments.length ? (a = c * c, u) : Math.sqrt(a);
  }, u.theta = function(c) {
    return arguments.length ? (f = c * c, u) : Math.sqrt(f);
  }, u;
}
function Co(t) {
  var n = T(0.1), e, r, i;
  typeof t != "function" && (t = T(t == null ? 0 : +t));
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
    return arguments.length ? (n = typeof a == "function" ? a : T(+a), s(), o) : n;
  }, o.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : T(+a), s(), o) : t;
  }, o;
}
function Ro(t) {
  var n = T(0.1), e, r, i;
  typeof t != "function" && (t = T(t == null ? 0 : +t));
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
    return arguments.length ? (n = typeof a == "function" ? a : T(+a), s(), o) : n;
  }, o.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : T(+a), s(), o) : t;
  }, o;
}
function Io(t, n) {
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
const fn = Symbol("implicit");
function Pn() {
  var t = new Bt(), n = [], e = [], r = fn;
  function i(o) {
    let s = t.get(o);
    if (s === void 0) {
      if (r !== fn)
        return r;
      t.set(o, s = n.push(o) - 1);
    }
    return e[s % e.length];
  }
  return i.domain = function(o) {
    if (!arguments.length)
      return n.slice();
    n = [], t = new Bt();
    for (const s of o)
      t.has(s) || t.set(s, n.push(s) - 1);
    return i;
  }, i.range = function(o) {
    return arguments.length ? (e = Array.from(o), i) : e.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return Pn(n, e).unknown(r);
  }, Io.apply(i, arguments), i;
}
function Po(t) {
  for (var n = t.length / 6 | 0, e = new Array(n), r = 0; r < n; )
    e[r] = "#" + t.slice(r * 6, ++r * 6);
  return e;
}
const Do = Po("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
function Z(t, n, e) {
  this.k = t, this.x = n, this.y = e;
}
Z.prototype = {
  constructor: Z,
  scale: function(t) {
    return t === 1 ? this : new Z(this.k * t, this.x, this.y);
  },
  translate: function(t, n) {
    return t === 0 & n === 0 ? this : new Z(this.k, this.x + this.k * t, this.y + this.k * n);
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
Z.prototype;
function Xo(t, n = {
  sticky: !1,
  drag: !0,
  iterations: 5,
  node: {
    stroke: !0,
    radius: 10,
    strokeWidth: 1,
    label: null,
    tooltip: null
  },
  link: {
    length: null
  }
}) {
  var N;
  const e = document.getElementById("app"), r = e.getBoundingClientRect(), i = r.width, o = r.height, s = Pn(Do), a = t.links.map((x) => ({ ...x })), f = t.nodes.map((x) => ({ ...x }));
  let u = n.node.radius ?? 5, l = an(a).id((x) => x.id);
  (N = n.link) != null && N.length && an.distance(n.link.length);
  const g = Eo(f).force("link", l).force("charge", To()).force("collide", wo().radius(u * 1.5).iterations(n.iterations ?? 5)).force("x", Co(i / 2)).force("y", Ro(o / 2)), h = wr("canvas").attr("width", i).attr("height", o).attr("style", "max-width: 100%; height: auto;"), c = h.node().getContext("2d");
  let d = {
    rect: null,
    text: null,
    arrow: null
  };
  const y = (x) => {
    let w = h.node().getBoundingClientRect(), A = x.tooltip ?? n.node.tooltip;
    if (typeof A == "function" && (A = A(x)), typeof A != "string")
      throw new TypeError("tooltip should be string");
    c.font = "20px serif";
    let m = c.measureText(A), b = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    }, M = b.left + m.width + b.right, k = b.top + m.actualBoundingBoxAscent + m.actualBoundingBoxDescent + b.bottom, $ = x.x - M / 2, S = x.y - 10 - k - u;
    $ + M > w.width && ($ = w.width - M), $ < 0 && ($ = 0), d.rect = {
      x: $,
      y: S,
      width: M,
      height: k
    }, d.arrow = {
      x: [x.x - 5, S + k - 2],
      y: [x.x + 5, S + k - 2],
      z: [x.x, x.y - u]
    }, d.text = {
      x: $ + M / 2 - m.width / 2,
      y: S + b.top + k / 2 - m.actualBoundingBoxDescent,
      content: A
    }, v();
  }, p = (x, w) => {
    let A = f.map((m) => (m.d = Math.sqrt(Math.pow(x - m.x, 2) + Math.pow(w - m.y, 2)), m)).filter((m) => m.d < u);
    return A.length === 0 ? null : (A.sort((m, b) => m.d >= b.d ? 1 : -1), A[0]);
  }, _ = () => {
    let x = !1, w = null;
    h.on("mousedown", (m) => {
      let b = h.node().getBoundingClientRect();
      x = !0;
      let M = (m.clientX - b.left) / (b.right - b.left) * i, k = (m.clientY - b.top) / (b.bottom - b.top) * o, $ = p(M, k);
      $ && (w = $);
    }), h.on("mouseup", (m) => {
      x = !1, m.active || g.alphaTarget(0), w && (w.x = w.fx, w.y = w.fy), !n.sticky && w && (w.fx = null, w.fy = null, w = null);
    });
    let A = null;
    h.on("mousemove", (m) => {
      var $;
      let b = h.node().getBoundingClientRect(), M = (m.clientX - b.left) / (b.right - b.left) * i, k = (m.clientY - b.top) / (b.bottom - b.top) * o;
      if (!x || !w) {
        let S = p(M, k);
        h.style("cursor", S ? "grab" : "auto"), S && (($ = n.node) != null && $.tooltip || S.tooltip) ? y(S) : (d.arrow = null, d.rect = null, d.text = null, v());
        return;
      }
      A && clearTimeout(A), A = setTimeout(() => {
        g.alphaTarget(0), x = !1, !n.sticky && w && (w.fx = null, w.fy = null, w = null), h.style("cursor", "auto");
      }, 3e3), h.style("cursor", "grabbing"), d.arrow = null, d.rect = null, d.text = null, w.fx = M, w.fy = k, g.alphaTarget(0.3).restart();
    });
  };
  function v() {
    var x, w;
    c.save(), c.clearRect(0, 0, i, o), c.strokeStyle = "white";
    for (let A = 0; A <= a.length - 1; A++)
      c.beginPath(), c.moveTo(a[A].source.x, a[A].source.y), c.lineTo(a[A].target.x, a[A].target.y), c.stroke();
    c.lineWidth = n.node.strokeWidth ?? 1;
    for (let A = 0; A <= f.length - 1; A++) {
      c.strokeStyle = null;
      let m = f[A];
      c.fillStyle = s(m.id), c.beginPath(), c.arc(m.x, m.y, u, 0, Math.PI * 2), c.fill();
      let b = m.stroke || ((x = n.node) == null ? void 0 : x.stroke);
      b && (c.strokeStyle = typeof b == "string" ? b : "#ffffff", c.stroke()), c.closePath();
      let M = m.label || ((w = n.node) == null ? void 0 : w.label);
      M && (c.font = "20px serif", c.fillStyle = "black", c.fillText(typeof M == "function" ? M(m) : typeof M == "boolean" ? m.id : M, m.x - u / 2, m.y + u / 2));
    }
    d.rect && (c.fillStyle = "white", c.beginPath(), c.fillRect(d.rect.x, d.rect.y, d.rect.width, d.rect.height), c.fill(), c.stroke(), c.closePath()), d.arrow && (c.fillStyle = "white", c.strokeStyle = "white", c.beginPath(), c.moveTo(d.arrow.x[0], d.arrow.x[1]), c.lineTo(d.arrow.y[0], d.arrow.y[1]), c.lineTo(d.arrow.z[0], d.arrow.z[1]), c.fill(), c.closePath()), d.text && (c.fillStyle = "black", c.fillText(d.text.content, d.text.x, d.text.y)), c.restore();
  }
  g.on("tick", () => {
    v();
  }), (n.drag ?? !0) && _(), e.appendChild(h.node());
}
export {
  Xo as default
};

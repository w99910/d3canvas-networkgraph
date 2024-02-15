class le extends Map {
  constructor(e, n = gn) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null)
      for (const [r, i] of e)
        this.set(r, i);
  }
  get(e) {
    return super.get(fe(this, e));
  }
  has(e) {
    return super.has(fe(this, e));
  }
  set(e, n) {
    return super.set(cn(this, e), n);
  }
  delete(e) {
    return super.delete(hn(this, e));
  }
}
function fe({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function cn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function hn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function gn(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var dn = { value: () => {
} };
function Xt() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new zt(n);
}
function zt(t) {
  this._ = t;
}
function pn(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
zt.prototype = Xt.prototype = {
  constructor: zt,
  on: function(t, e) {
    var n = this._, r = pn(t + "", n), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; )
        if ((i = (t = r[o]).type) && (i = yn(n[i], t.name)))
          return i;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++o < u; )
      if (i = (t = r[o]).type)
        n[i] = ce(n[i], t.name, e);
      else if (e == null)
        for (i in n)
          n[i] = ce(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e)
      t[n] = e[n].slice();
    return new zt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r)
      o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  }
};
function yn(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ce(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = dn, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Lt = "http://www.w3.org/1999/xhtml";
const he = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ft(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), he.hasOwnProperty(e) ? { space: he[e], local: t } : t;
}
function mn(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Lt && e.documentElement.namespaceURI === Lt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function xn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Xe(t) {
  var e = Ft(t);
  return (e.local ? xn : mn)(e);
}
function vn() {
}
function te(t) {
  return t == null ? vn : function() {
    return this.querySelector(t);
  };
}
function _n(t) {
  typeof t != "function" && (t = te(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = new Array(u), s, l, f = 0; f < u; ++f)
      (s = o[f]) && (l = t.call(s, s.__data__, f, o)) && ("__data__" in s && (l.__data__ = s.__data__), a[f] = l);
  return new U(r, this._parents);
}
function wn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function bn() {
  return [];
}
function Fe(t) {
  return t == null ? bn : function() {
    return this.querySelectorAll(t);
  };
}
function Nn(t) {
  return function() {
    return wn(t.apply(this, arguments));
  };
}
function kn(t) {
  typeof t == "function" ? t = Nn(t) : t = Fe(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var u = e[o], a = u.length, s, l = 0; l < a; ++l)
      (s = u[l]) && (r.push(t.call(s, s.__data__, l, u)), i.push(s));
  return new U(r, i);
}
function He(t) {
  return function() {
    return this.matches(t);
  };
}
function Ye(t) {
  return function(e) {
    return e.matches(t);
  };
}
var An = Array.prototype.find;
function Mn(t) {
  return function() {
    return An.call(this.children, t);
  };
}
function zn() {
  return this.firstElementChild;
}
function Tn(t) {
  return this.select(t == null ? zn : Mn(typeof t == "function" ? t : Ye(t)));
}
var Sn = Array.prototype.filter;
function En() {
  return Array.from(this.children);
}
function $n(t) {
  return function() {
    return Sn.call(this.children, t);
  };
}
function Cn(t) {
  return this.selectAll(t == null ? En : $n(typeof t == "function" ? t : Ye(t)));
}
function Rn(t) {
  typeof t != "function" && (t = He(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = [], s, l = 0; l < u; ++l)
      (s = o[l]) && t.call(s, s.__data__, l, o) && a.push(s);
  return new U(r, this._parents);
}
function Be(t) {
  return new Array(t.length);
}
function Dn() {
  return new U(this._enter || this._groups.map(Be), this._parents);
}
function $t(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
$t.prototype = {
  constructor: $t,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function In(t) {
  return function() {
    return t;
  };
}
function Pn(t, e, n, r, i, o) {
  for (var u = 0, a, s = e.length, l = o.length; u < l; ++u)
    (a = e[u]) ? (a.__data__ = o[u], r[u] = a) : n[u] = new $t(t, o[u]);
  for (; u < s; ++u)
    (a = e[u]) && (i[u] = a);
}
function Xn(t, e, n, r, i, o, u) {
  var a, s, l = /* @__PURE__ */ new Map(), f = e.length, m = o.length, d = new Array(f), g;
  for (a = 0; a < f; ++a)
    (s = e[a]) && (d[a] = g = u.call(s, s.__data__, a, e) + "", l.has(g) ? i[a] = s : l.set(g, s));
  for (a = 0; a < m; ++a)
    g = u.call(t, o[a], a, o) + "", (s = l.get(g)) ? (r[a] = s, s.__data__ = o[a], l.delete(g)) : n[a] = new $t(t, o[a]);
  for (a = 0; a < f; ++a)
    (s = e[a]) && l.get(d[a]) === s && (i[a] = s);
}
function Fn(t) {
  return t.__data__;
}
function Hn(t, e) {
  if (!arguments.length)
    return Array.from(this, Fn);
  var n = e ? Xn : Pn, r = this._parents, i = this._groups;
  typeof t != "function" && (t = In(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), s = new Array(o), l = 0; l < o; ++l) {
    var f = r[l], m = i[l], d = m.length, g = Yn(t.call(f, f && f.__data__, l, r)), p = g.length, v = a[l] = new Array(p), h = u[l] = new Array(p), y = s[l] = new Array(d);
    n(f, m, v, h, y, g, e);
    for (var w = 0, T = 0, N, C; w < p; ++w)
      if (N = v[w]) {
        for (w >= T && (T = w + 1); !(C = h[T]) && ++T < p; )
          ;
        N._next = C || null;
      }
  }
  return u = new U(u, r), u._enter = a, u._exit = s, u;
}
function Yn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Bn() {
  return new U(this._exit || this._groups.map(Be), this._parents);
}
function On(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Vn(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, u = Math.min(i, o), a = new Array(i), s = 0; s < u; ++s)
    for (var l = n[s], f = r[s], m = l.length, d = a[s] = new Array(m), g, p = 0; p < m; ++p)
      (g = l[p] || f[p]) && (d[p] = g);
  for (; s < i; ++s)
    a[s] = n[s];
  return new U(a, this._parents);
}
function qn() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Ln(t) {
  t || (t = Un);
  function e(m, d) {
    return m && d ? t(m.__data__, d.__data__) : !m - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var u = n[o], a = u.length, s = i[o] = new Array(a), l, f = 0; f < a; ++f)
      (l = u[f]) && (s[f] = l);
    s.sort(e);
  }
  return new U(i, this._parents).order();
}
function Un(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Wn() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function Gn() {
  return Array.from(this);
}
function Kn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u)
        return u;
    }
  return null;
}
function Zn() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Qn() {
  return !this.node();
}
function Jn(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function jn(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function tr(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function er(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function nr(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function rr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function ir(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function or(t, e) {
  var n = Ft(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? tr : jn : typeof e == "function" ? n.local ? ir : rr : n.local ? nr : er)(n, e));
}
function Oe(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function ur(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function ar(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function sr(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function lr(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? ur : typeof e == "function" ? sr : ar)(t, e, n ?? "")) : ct(this.node(), t);
}
function ct(t, e) {
  return t.style.getPropertyValue(e) || Oe(t).getComputedStyle(t, null).getPropertyValue(e);
}
function fr(t) {
  return function() {
    delete this[t];
  };
}
function cr(t, e) {
  return function() {
    this[t] = e;
  };
}
function hr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function gr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? fr : typeof e == "function" ? hr : cr)(t, e)) : this.node()[t];
}
function Ve(t) {
  return t.trim().split(/^|\s+/);
}
function ee(t) {
  return t.classList || new qe(t);
}
function qe(t) {
  this._node = t, this._names = Ve(t.getAttribute("class") || "");
}
qe.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Le(t, e) {
  for (var n = ee(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Ue(t, e) {
  for (var n = ee(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function dr(t) {
  return function() {
    Le(this, t);
  };
}
function pr(t) {
  return function() {
    Ue(this, t);
  };
}
function yr(t, e) {
  return function() {
    (e.apply(this, arguments) ? Le : Ue)(this, t);
  };
}
function mr(t, e) {
  var n = Ve(t + "");
  if (arguments.length < 2) {
    for (var r = ee(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? yr : e ? dr : pr)(n, e));
}
function xr() {
  this.textContent = "";
}
function vr(t) {
  return function() {
    this.textContent = t;
  };
}
function _r(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function wr(t) {
  return arguments.length ? this.each(t == null ? xr : (typeof t == "function" ? _r : vr)(t)) : this.node().textContent;
}
function br() {
  this.innerHTML = "";
}
function Nr(t) {
  return function() {
    this.innerHTML = t;
  };
}
function kr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Ar(t) {
  return arguments.length ? this.each(t == null ? br : (typeof t == "function" ? kr : Nr)(t)) : this.node().innerHTML;
}
function Mr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function zr() {
  return this.each(Mr);
}
function Tr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Sr() {
  return this.each(Tr);
}
function Er(t) {
  var e = typeof t == "function" ? t : Xe(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function $r() {
  return null;
}
function Cr(t, e) {
  var n = typeof t == "function" ? t : Xe(t), r = e == null ? $r : typeof e == "function" ? e : te(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Rr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Dr() {
  return this.each(Rr);
}
function Ir() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Pr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Xr(t) {
  return this.select(t ? Pr : Ir);
}
function Fr(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Hr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Yr(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Br(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Or(t, e, n) {
  return function() {
    var r = this.__on, i, o = Hr(e);
    if (r) {
      for (var u = 0, a = r.length; u < a; ++u)
        if ((i = r[u]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Vr(t, e, n) {
  var r = Yr(t + ""), i, o = r.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var s = 0, l = a.length, f; s < l; ++s)
        for (i = 0, f = a[s]; i < o; ++i)
          if ((u = r[i]).type === f.type && u.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = e ? Or : Br, i = 0; i < o; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function We(t, e, n) {
  var r = Oe(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function qr(t, e) {
  return function() {
    return We(this, t, e);
  };
}
function Lr(t, e) {
  return function() {
    return We(this, t, e.apply(this, arguments));
  };
}
function Ur(t, e) {
  return this.each((typeof e == "function" ? Lr : qr)(t, e));
}
function* Wr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var Ge = [null];
function U(t, e) {
  this._groups = t, this._parents = e;
}
function wt() {
  return new U([[document.documentElement]], Ge);
}
function Gr() {
  return this;
}
U.prototype = wt.prototype = {
  constructor: U,
  select: _n,
  selectAll: kn,
  selectChild: Tn,
  selectChildren: Cn,
  filter: Rn,
  data: Hn,
  enter: Dn,
  exit: Bn,
  join: On,
  merge: Vn,
  selection: Gr,
  order: qn,
  sort: Ln,
  call: Wn,
  nodes: Gn,
  node: Kn,
  size: Zn,
  empty: Qn,
  each: Jn,
  attr: or,
  style: lr,
  property: gr,
  classed: mr,
  text: wr,
  html: Ar,
  raise: zr,
  lower: Sr,
  append: Er,
  insert: Cr,
  remove: Dr,
  clone: Xr,
  datum: Fr,
  on: Vr,
  dispatch: Ur,
  [Symbol.iterator]: Wr
};
function et(t) {
  return typeof t == "string" ? new U([[document.querySelector(t)]], [document.documentElement]) : new U([[t]], Ge);
}
function Kr(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function ut(t, e) {
  if (t = Kr(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
const Ut = { capture: !0, passive: !1 };
function Wt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function Zr(t) {
  var e = t.document.documentElement, n = et(t).on("dragstart.drag", Wt, Ut);
  "onselectstart" in e ? n.on("selectstart.drag", Wt, Ut) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Qr(t, e) {
  var n = t.document.documentElement, r = et(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Wt, Ut), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ne(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Ke(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function bt() {
}
var mt = 0.7, Ct = 1 / mt, ft = "\\s*([+-]?\\d+)\\s*", xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Jr = /^#([0-9a-f]{3,8})$/, jr = new RegExp(`^rgb\\(${ft},${ft},${ft}\\)$`), ti = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), ei = new RegExp(`^rgba\\(${ft},${ft},${ft},${xt}\\)$`), ni = new RegExp(`^rgba\\(${Q},${Q},${Q},${xt}\\)$`), ri = new RegExp(`^hsl\\(${xt},${Q},${Q}\\)$`), ii = new RegExp(`^hsla\\(${xt},${Q},${Q},${xt}\\)$`), ge = {
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
ne(bt, vt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: de,
  // Deprecated! Use color.formatHex.
  formatHex: de,
  formatHex8: oi,
  formatHsl: ui,
  formatRgb: pe,
  toString: pe
});
function de() {
  return this.rgb().formatHex();
}
function oi() {
  return this.rgb().formatHex8();
}
function ui() {
  return Ze(this).formatHsl();
}
function pe() {
  return this.rgb().formatRgb();
}
function vt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Jr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? ye(e) : n === 3 ? new L(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Nt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Nt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = jr.exec(t)) ? new L(e[1], e[2], e[3], 1) : (e = ti.exec(t)) ? new L(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ei.exec(t)) ? Nt(e[1], e[2], e[3], e[4]) : (e = ni.exec(t)) ? Nt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = ri.exec(t)) ? ve(e[1], e[2] / 100, e[3] / 100, 1) : (e = ii.exec(t)) ? ve(e[1], e[2] / 100, e[3] / 100, e[4]) : ge.hasOwnProperty(t) ? ye(ge[t]) : t === "transparent" ? new L(NaN, NaN, NaN, 0) : null;
}
function ye(t) {
  return new L(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Nt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new L(t, e, n, r);
}
function ai(t) {
  return t instanceof bt || (t = vt(t)), t ? (t = t.rgb(), new L(t.r, t.g, t.b, t.opacity)) : new L();
}
function Gt(t, e, n, r) {
  return arguments.length === 1 ? ai(t) : new L(t, e, n, r ?? 1);
}
function L(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
ne(L, Gt, Ke(bt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new L(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mt : Math.pow(mt, t), new L(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new L(st(this.r), st(this.g), st(this.b), Rt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: me,
  // Deprecated! Use color.formatHex.
  formatHex: me,
  formatHex8: si,
  formatRgb: xe,
  toString: xe
}));
function me() {
  return `#${at(this.r)}${at(this.g)}${at(this.b)}`;
}
function si() {
  return `#${at(this.r)}${at(this.g)}${at(this.b)}${at((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function xe() {
  const t = Rt(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${st(this.r)}, ${st(this.g)}, ${st(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function Rt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function st(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function at(t) {
  return t = st(t), (t < 16 ? "0" : "") + t.toString(16);
}
function ve(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new K(t, e, n, r);
}
function Ze(t) {
  if (t instanceof K)
    return new K(t.h, t.s, t.l, t.opacity);
  if (t instanceof bt || (t = vt(t)), !t)
    return new K();
  if (t instanceof K)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), u = NaN, a = o - i, s = (o + i) / 2;
  return a ? (e === o ? u = (n - r) / a + (n < r) * 6 : n === o ? u = (r - e) / a + 2 : u = (e - n) / a + 4, a /= s < 0.5 ? o + i : 2 - o - i, u *= 60) : a = s > 0 && s < 1 ? 0 : u, new K(u, a, s, t.opacity);
}
function li(t, e, n, r) {
  return arguments.length === 1 ? Ze(t) : new K(t, e, n, r ?? 1);
}
function K(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
ne(K, li, Ke(bt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new K(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mt : Math.pow(mt, t), new K(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new L(
      Ot(t >= 240 ? t - 240 : t + 120, i, r),
      Ot(t, i, r),
      Ot(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new K(_e(this.h), kt(this.s), kt(this.l), Rt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Rt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${_e(this.h)}, ${kt(this.s) * 100}%, ${kt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function _e(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function kt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ot(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const Qe = (t) => () => t;
function fi(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ci(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function hi(t) {
  return (t = +t) == 1 ? Je : function(e, n) {
    return n - e ? ci(e, n, t) : Qe(isNaN(e) ? n : e);
  };
}
function Je(t, e) {
  var n = e - t;
  return n ? fi(t, n) : Qe(isNaN(t) ? e : t);
}
const we = function t(e) {
  var n = hi(e);
  function r(i, o) {
    var u = n((i = Gt(i)).r, (o = Gt(o)).r), a = n(i.g, o.g), s = n(i.b, o.b), l = Je(i.opacity, o.opacity);
    return function(f) {
      return i.r = u(f), i.g = a(f), i.b = s(f), i.opacity = l(f), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function it(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
var Kt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Vt = new RegExp(Kt.source, "g");
function gi(t) {
  return function() {
    return t;
  };
}
function di(t) {
  return function(e) {
    return t(e) + "";
  };
}
function pi(t, e) {
  var n = Kt.lastIndex = Vt.lastIndex = 0, r, i, o, u = -1, a = [], s = [];
  for (t = t + "", e = e + ""; (r = Kt.exec(t)) && (i = Vt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, s.push({ i: u, x: it(r, i) })), n = Vt.lastIndex;
  return n < e.length && (o = e.slice(n), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? s[0] ? di(s[0].x) : gi(e) : (e = s.length, function(l) {
    for (var f = 0, m; f < e; ++f)
      a[(m = s[f]).i] = m.x(l);
    return a.join("");
  });
}
var be = 180 / Math.PI, Zt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function je(t, e, n, r, i, o) {
  var u, a, s;
  return (u = Math.sqrt(t * t + e * e)) && (t /= u, e /= u), (s = t * n + e * r) && (n -= t * s, r -= e * s), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, s /= a), t * r < e * n && (t = -t, e = -e, s = -s, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * be,
    skewX: Math.atan(s) * be,
    scaleX: u,
    scaleY: a
  };
}
var At;
function yi(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Zt : je(e.a, e.b, e.c, e.d, e.e, e.f);
}
function mi(t) {
  return t == null || (At || (At = document.createElementNS("http://www.w3.org/2000/svg", "g")), At.setAttribute("transform", t), !(t = At.transform.baseVal.consolidate())) ? Zt : (t = t.matrix, je(t.a, t.b, t.c, t.d, t.e, t.f));
}
function tn(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function o(l, f, m, d, g, p) {
    if (l !== m || f !== d) {
      var v = g.push("translate(", null, e, null, n);
      p.push({ i: v - 4, x: it(l, m) }, { i: v - 2, x: it(f, d) });
    } else
      (m || d) && g.push("translate(" + m + e + d + n);
  }
  function u(l, f, m, d) {
    l !== f ? (l - f > 180 ? f += 360 : f - l > 180 && (l += 360), d.push({ i: m.push(i(m) + "rotate(", null, r) - 2, x: it(l, f) })) : f && m.push(i(m) + "rotate(" + f + r);
  }
  function a(l, f, m, d) {
    l !== f ? d.push({ i: m.push(i(m) + "skewX(", null, r) - 2, x: it(l, f) }) : f && m.push(i(m) + "skewX(" + f + r);
  }
  function s(l, f, m, d, g, p) {
    if (l !== m || f !== d) {
      var v = g.push(i(g) + "scale(", null, ",", null, ")");
      p.push({ i: v - 4, x: it(l, m) }, { i: v - 2, x: it(f, d) });
    } else
      (m !== 1 || d !== 1) && g.push(i(g) + "scale(" + m + "," + d + ")");
  }
  return function(l, f) {
    var m = [], d = [];
    return l = t(l), f = t(f), o(l.translateX, l.translateY, f.translateX, f.translateY, m, d), u(l.rotate, f.rotate, m, d), a(l.skewX, f.skewX, m, d), s(l.scaleX, l.scaleY, f.scaleX, f.scaleY, m, d), l = f = null, function(g) {
      for (var p = -1, v = d.length, h; ++p < v; )
        m[(h = d[p]).i] = h.x(g);
      return m.join("");
    };
  };
}
var xi = tn(yi, "px, ", "px)", "deg)"), vi = tn(mi, ", ", ")", ")"), _i = 1e-12;
function Ne(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function wi(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function bi(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const Ni = function t(e, n, r) {
  function i(o, u) {
    var a = o[0], s = o[1], l = o[2], f = u[0], m = u[1], d = u[2], g = f - a, p = m - s, v = g * g + p * p, h, y;
    if (v < _i)
      y = Math.log(d / l) / e, h = function(F) {
        return [
          a + F * g,
          s + F * p,
          l * Math.exp(e * F * y)
        ];
      };
    else {
      var w = Math.sqrt(v), T = (d * d - l * l + r * v) / (2 * l * n * w), N = (d * d - l * l - r * v) / (2 * d * n * w), C = Math.log(Math.sqrt(T * T + 1) - T), I = Math.log(Math.sqrt(N * N + 1) - N);
      y = (I - C) / e, h = function(F) {
        var X = F * y, S = Ne(C), k = l / (n * w) * (S * bi(e * X + C) - wi(C));
        return [
          a + k * g,
          s + k * p,
          l * S / Ne(e * X + C)
        ];
      };
    }
    return h.duration = y * 1e3 * e / Math.SQRT2, h;
  }
  return i.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, s = a * a;
    return t(u, a, s);
  }, i;
}(Math.SQRT2, 2, 4);
var ht = 0, pt = 0, gt = 0, en = 1e3, Dt, yt, It = 0, lt = 0, Ht = 0, _t = typeof performance == "object" && performance.now ? performance : Date, nn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function re() {
  return lt || (nn(ki), lt = _t.now() + Ht);
}
function ki() {
  lt = 0;
}
function Pt() {
  this._call = this._time = this._next = null;
}
Pt.prototype = ie.prototype = {
  constructor: Pt,
  restart: function(t, e, n) {
    if (typeof t != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? re() : +n) + (e == null ? 0 : +e), !this._next && yt !== this && (yt ? yt._next = this : Dt = this, yt = this), this._call = t, this._time = n, Qt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Qt());
  }
};
function ie(t, e, n) {
  var r = new Pt();
  return r.restart(t, e, n), r;
}
function Ai() {
  re(), ++ht;
  for (var t = Dt, e; t; )
    (e = lt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --ht;
}
function ke() {
  lt = (It = _t.now()) + Ht, ht = pt = 0;
  try {
    Ai();
  } finally {
    ht = 0, zi(), lt = 0;
  }
}
function Mi() {
  var t = _t.now(), e = t - It;
  e > en && (Ht -= e, It = t);
}
function zi() {
  for (var t, e = Dt, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Dt = n);
  yt = t, Qt(r);
}
function Qt(t) {
  if (!ht) {
    pt && (pt = clearTimeout(pt));
    var e = t - lt;
    e > 24 ? (t < 1 / 0 && (pt = setTimeout(ke, t - _t.now() - Ht)), gt && (gt = clearInterval(gt))) : (gt || (It = _t.now(), gt = setInterval(Mi, en)), ht = 1, nn(ke));
  }
}
function Ae(t, e, n) {
  var r = new Pt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Ti = Xt("start", "end", "cancel", "interrupt"), Si = [], rn = 0, Me = 1, Jt = 2, Tt = 3, ze = 4, jt = 5, St = 6;
function Yt(t, e, n, r, i, o) {
  var u = t.__transition;
  if (!u)
    t.__transition = {};
  else if (n in u)
    return;
  Ei(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Ti,
    tween: Si,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: rn
  });
}
function oe(t, e) {
  var n = Z(t, e);
  if (n.state > rn)
    throw new Error("too late; already scheduled");
  return n;
}
function J(t, e) {
  var n = Z(t, e);
  if (n.state > Tt)
    throw new Error("too late; already running");
  return n;
}
function Z(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Ei(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = ie(o, 0, n.time);
  function o(l) {
    n.state = Me, n.timer.restart(u, n.delay, n.time), n.delay <= l && u(l - n.delay);
  }
  function u(l) {
    var f, m, d, g;
    if (n.state !== Me)
      return s();
    for (f in r)
      if (g = r[f], g.name === n.name) {
        if (g.state === Tt)
          return Ae(u);
        g.state === ze ? (g.state = St, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[f]) : +f < e && (g.state = St, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[f]);
      }
    if (Ae(function() {
      n.state === Tt && (n.state = ze, n.timer.restart(a, n.delay, n.time), a(l));
    }), n.state = Jt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Jt) {
      for (n.state = Tt, i = new Array(d = n.tween.length), f = 0, m = -1; f < d; ++f)
        (g = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++m] = g);
      i.length = m + 1;
    }
  }
  function a(l) {
    for (var f = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(s), n.state = jt, 1), m = -1, d = i.length; ++m < d; )
      i[m].call(t, f);
    n.state === jt && (n.on.call("end", t, t.__data__, n.index, n.group), s());
  }
  function s() {
    n.state = St, n.timer.stop(), delete r[e];
    for (var l in r)
      return;
    delete t.__transition;
  }
}
function Et(t, e) {
  var n = t.__transition, r, i, o = !0, u;
  if (n) {
    e = e == null ? null : e + "";
    for (u in n) {
      if ((r = n[u]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Jt && r.state < jt, r.state = St, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[u];
    }
    o && delete t.__transition;
  }
}
function $i(t) {
  return this.each(function() {
    Et(this, t);
  });
}
function Ci(t, e) {
  var n, r;
  return function() {
    var i = J(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var u = 0, a = r.length; u < a; ++u)
        if (r[u].name === e) {
          r = r.slice(), r.splice(u, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ri(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = J(this, t), u = o.tween;
    if (u !== r) {
      i = (r = u).slice();
      for (var a = { name: e, value: n }, s = 0, l = i.length; s < l; ++s)
        if (i[s].name === e) {
          i[s] = a;
          break;
        }
      s === l && i.push(a);
    }
    o.tween = i;
  };
}
function Di(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = Z(this.node(), n).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((e == null ? Ci : Ri)(n, t, e));
}
function ue(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = J(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return Z(i, r).value[e];
  };
}
function on(t, e) {
  var n;
  return (typeof e == "number" ? it : e instanceof vt ? we : (n = vt(e)) ? (e = n, we) : pi)(t, e);
}
function Ii(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Pi(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Xi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function Fi(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function Hi(t, e, n) {
  var r, i, o;
  return function() {
    var u, a = n(this), s;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), s = a + "", u === s ? null : u === r && s === i ? o : (i = s, o = e(r = u, a)));
  };
}
function Yi(t, e, n) {
  var r, i, o;
  return function() {
    var u, a = n(this), s;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), s = a + "", u === s ? null : u === r && s === i ? o : (i = s, o = e(r = u, a)));
  };
}
function Bi(t, e) {
  var n = Ft(t), r = n === "transform" ? vi : on;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Yi : Hi)(n, r, ue(this, "attr." + t, e)) : e == null ? (n.local ? Pi : Ii)(n) : (n.local ? Fi : Xi)(n, r, e));
}
function Oi(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Vi(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function qi(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Vi(t, o)), n;
  }
  return i._value = e, i;
}
function Li(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Oi(t, o)), n;
  }
  return i._value = e, i;
}
function Ui(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Ft(t);
  return this.tween(n, (r.local ? qi : Li)(r, e));
}
function Wi(t, e) {
  return function() {
    oe(this, t).delay = +e.apply(this, arguments);
  };
}
function Gi(t, e) {
  return e = +e, function() {
    oe(this, t).delay = e;
  };
}
function Ki(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Wi : Gi)(e, t)) : Z(this.node(), e).delay;
}
function Zi(t, e) {
  return function() {
    J(this, t).duration = +e.apply(this, arguments);
  };
}
function Qi(t, e) {
  return e = +e, function() {
    J(this, t).duration = e;
  };
}
function Ji(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Zi : Qi)(e, t)) : Z(this.node(), e).duration;
}
function ji(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    J(this, t).ease = e;
  };
}
function to(t) {
  var e = this._id;
  return arguments.length ? this.each(ji(e, t)) : Z(this.node(), e).ease;
}
function eo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    J(this, t).ease = n;
  };
}
function no(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(eo(this._id, t));
}
function ro(t) {
  typeof t != "function" && (t = He(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = [], s, l = 0; l < u; ++l)
      (s = o[l]) && t.call(s, s.__data__, l, o) && a.push(s);
  return new rt(r, this._parents, this._name, this._id);
}
function io(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var s = e[a], l = n[a], f = s.length, m = u[a] = new Array(f), d, g = 0; g < f; ++g)
      (d = s[g] || l[g]) && (m[g] = d);
  for (; a < r; ++a)
    u[a] = e[a];
  return new rt(u, this._parents, this._name, this._id);
}
function oo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function uo(t, e, n) {
  var r, i, o = oo(e) ? oe : J;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(e, n), u.on = i;
  };
}
function ao(t, e) {
  var n = this._id;
  return arguments.length < 2 ? Z(this.node(), n).on.on(t) : this.each(uo(n, t, e));
}
function so(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function lo() {
  return this.on("end.remove", so(this._id));
}
function fo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = te(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], s = a.length, l = o[u] = new Array(s), f, m, d = 0; d < s; ++d)
      (f = a[d]) && (m = t.call(f, f.__data__, d, a)) && ("__data__" in f && (m.__data__ = f.__data__), l[d] = m, Yt(l[d], e, n, d, l, Z(f, n)));
  return new rt(o, this._parents, e, n);
}
function co(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Fe(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var s = r[a], l = s.length, f, m = 0; m < l; ++m)
      if (f = s[m]) {
        for (var d = t.call(f, f.__data__, m, s), g, p = Z(f, n), v = 0, h = d.length; v < h; ++v)
          (g = d[v]) && Yt(g, e, n, v, d, p);
        o.push(d), u.push(f);
      }
  return new rt(o, u, e, n);
}
var ho = wt.prototype.constructor;
function go() {
  return new ho(this._groups, this._parents);
}
function po(t, e) {
  var n, r, i;
  return function() {
    var o = ct(this, t), u = (this.style.removeProperty(t), ct(this, t));
    return o === u ? null : o === n && u === r ? i : i = e(n = o, r = u);
  };
}
function un(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function yo(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = ct(this, t);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function mo(t, e, n) {
  var r, i, o;
  return function() {
    var u = ct(this, t), a = n(this), s = a + "";
    return a == null && (s = a = (this.style.removeProperty(t), ct(this, t))), u === s ? null : u === r && s === i ? o : (i = s, o = e(r = u, a));
  };
}
function xo(t, e) {
  var n, r, i, o = "style." + e, u = "end." + o, a;
  return function() {
    var s = J(this, t), l = s.on, f = s.value[o] == null ? a || (a = un(e)) : void 0;
    (l !== n || i !== f) && (r = (n = l).copy()).on(u, i = f), s.on = r;
  };
}
function vo(t, e, n) {
  var r = (t += "") == "transform" ? xi : on;
  return e == null ? this.styleTween(t, po(t, r)).on("end.style." + t, un(t)) : typeof e == "function" ? this.styleTween(t, mo(t, r, ue(this, "style." + t, e))).each(xo(this._id, t)) : this.styleTween(t, yo(t, r, e), n).on("end.style." + t, null);
}
function _o(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function wo(t, e, n) {
  var r, i;
  function o() {
    var u = e.apply(this, arguments);
    return u !== i && (r = (i = u) && _o(t, u, n)), r;
  }
  return o._value = e, o;
}
function bo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, wo(t, e, n ?? ""));
}
function No(t) {
  return function() {
    this.textContent = t;
  };
}
function ko(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Ao(t) {
  return this.tween("text", typeof t == "function" ? ko(ue(this, "text", t)) : No(t == null ? "" : t + ""));
}
function Mo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function zo(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Mo(i)), e;
  }
  return r._value = t, r;
}
function To(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, zo(t));
}
function So() {
  for (var t = this._name, e = this._id, n = an(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, s, l = 0; l < a; ++l)
      if (s = u[l]) {
        var f = Z(s, e);
        Yt(s, t, n, l, u, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new rt(r, this._parents, t, n);
}
function Eo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, u) {
    var a = { value: u }, s = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var l = J(this, r), f = l.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(s)), l.on = e;
    }), i === 0 && o();
  });
}
var $o = 0;
function rt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function an() {
  return ++$o;
}
var tt = wt.prototype;
rt.prototype = {
  constructor: rt,
  select: fo,
  selectAll: co,
  selectChild: tt.selectChild,
  selectChildren: tt.selectChildren,
  filter: ro,
  merge: io,
  selection: go,
  transition: So,
  call: tt.call,
  nodes: tt.nodes,
  node: tt.node,
  size: tt.size,
  empty: tt.empty,
  each: tt.each,
  on: ao,
  attr: Bi,
  attrTween: Ui,
  style: vo,
  styleTween: bo,
  text: Ao,
  textTween: To,
  remove: lo,
  tween: Di,
  delay: Ki,
  duration: Ji,
  ease: to,
  easeVarying: no,
  end: Eo,
  [Symbol.iterator]: tt[Symbol.iterator]
};
function Co(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Ro = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Co
};
function Do(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Io(t) {
  var e, n;
  t instanceof rt ? (e = t._id, t = t._name) : (e = an(), (n = Ro).time = re(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, s, l = 0; l < a; ++l)
      (s = u[l]) && Yt(s, t, e, l, u, n || Do(s, e));
  return new rt(r, this._parents, t, e);
}
wt.prototype.interrupt = $i;
wt.prototype.transition = Io;
function Te(t, e) {
  var n, r = 1;
  t == null && (t = 0), e == null && (e = 0);
  function i() {
    var o, u = n.length, a, s = 0, l = 0;
    for (o = 0; o < u; ++o)
      a = n[o], s += a.x, l += a.y;
    for (s = (s / u - t) * r, l = (l / u - e) * r, o = 0; o < u; ++o)
      a = n[o], a.x -= s, a.y -= l;
  }
  return i.initialize = function(o) {
    n = o;
  }, i.x = function(o) {
    return arguments.length ? (t = +o, i) : t;
  }, i.y = function(o) {
    return arguments.length ? (e = +o, i) : e;
  }, i.strength = function(o) {
    return arguments.length ? (r = +o, i) : r;
  }, i;
}
function Po(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return sn(this.cover(e, n), e, n, t);
}
function sn(t, e, n, r) {
  if (isNaN(e) || isNaN(n))
    return t;
  var i, o = t._root, u = { data: r }, a = t._x0, s = t._y0, l = t._x1, f = t._y1, m, d, g, p, v, h, y, w;
  if (!o)
    return t._root = u, t;
  for (; o.length; )
    if ((v = e >= (m = (a + l) / 2)) ? a = m : l = m, (h = n >= (d = (s + f) / 2)) ? s = d : f = d, i = o, !(o = o[y = h << 1 | v]))
      return i[y] = u, t;
  if (g = +t._x.call(null, o.data), p = +t._y.call(null, o.data), e === g && n === p)
    return u.next = o, i ? i[y] = u : t._root = u, t;
  do
    i = i ? i[y] = new Array(4) : t._root = new Array(4), (v = e >= (m = (a + l) / 2)) ? a = m : l = m, (h = n >= (d = (s + f) / 2)) ? s = d : f = d;
  while ((y = h << 1 | v) === (w = (p >= d) << 1 | g >= m));
  return i[w] = o, i[y] = u, t;
}
function Xo(t) {
  var e, n, r = t.length, i, o, u = new Array(r), a = new Array(r), s = 1 / 0, l = 1 / 0, f = -1 / 0, m = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(o = +this._y.call(null, e)) || (u[n] = i, a[n] = o, i < s && (s = i), i > f && (f = i), o < l && (l = o), o > m && (m = o));
  if (s > f || l > m)
    return this;
  for (this.cover(s, l).cover(f, m), n = 0; n < r; ++n)
    sn(this, u[n], a[n], t[n]);
  return this;
}
function Fo(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e))
    return this;
  var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, o = (r = Math.floor(e)) + 1;
  else {
    for (var u = i - n || 1, a = this._root, s, l; n > t || t >= i || r > e || e >= o; )
      switch (l = (e < r) << 1 | t < n, s = new Array(4), s[l] = a, a = s, u *= 2, l) {
        case 0:
          i = n + u, o = r + u;
          break;
        case 1:
          n = i - u, o = r + u;
          break;
        case 2:
          i = n + u, r = o - u;
          break;
        case 3:
          n = i - u, r = o - u;
          break;
      }
    this._root && this._root.length && (this._root = a);
  }
  return this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this;
}
function Ho() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length)
      do
        t.push(e.data);
      while (e = e.next);
  }), t;
}
function Yo(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function O(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Bo(t, e, n) {
  var r, i = this._x0, o = this._y0, u, a, s, l, f = this._x1, m = this._y1, d = [], g = this._root, p, v;
  for (g && d.push(new O(g, i, o, f, m)), n == null ? n = 1 / 0 : (i = t - n, o = e - n, f = t + n, m = e + n, n *= n); p = d.pop(); )
    if (!(!(g = p.node) || (u = p.x0) > f || (a = p.y0) > m || (s = p.x1) < i || (l = p.y1) < o))
      if (g.length) {
        var h = (u + s) / 2, y = (a + l) / 2;
        d.push(
          new O(g[3], h, y, s, l),
          new O(g[2], u, y, h, l),
          new O(g[1], h, a, s, y),
          new O(g[0], u, a, h, y)
        ), (v = (e >= y) << 1 | t >= h) && (p = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - v], d[d.length - 1 - v] = p);
      } else {
        var w = t - +this._x.call(null, g.data), T = e - +this._y.call(null, g.data), N = w * w + T * T;
        if (N < n) {
          var C = Math.sqrt(n = N);
          i = t - C, o = e - C, f = t + C, m = e + C, r = g.data;
        }
      }
  return r;
}
function Oo(t) {
  if (isNaN(f = +this._x.call(null, t)) || isNaN(m = +this._y.call(null, t)))
    return this;
  var e, n = this._root, r, i, o, u = this._x0, a = this._y0, s = this._x1, l = this._y1, f, m, d, g, p, v, h, y;
  if (!n)
    return this;
  if (n.length)
    for (; ; ) {
      if ((p = f >= (d = (u + s) / 2)) ? u = d : s = d, (v = m >= (g = (a + l) / 2)) ? a = g : l = g, e = n, !(n = n[h = v << 1 | p]))
        return this;
      if (!n.length)
        break;
      (e[h + 1 & 3] || e[h + 2 & 3] || e[h + 3 & 3]) && (r = e, y = h);
    }
  for (; n.data !== t; )
    if (i = n, !(n = n.next))
      return this;
  return (o = n.next) && delete n.next, i ? (o ? i.next = o : delete i.next, this) : e ? (o ? e[h] = o : delete e[h], (n = e[0] || e[1] || e[2] || e[3]) && n === (e[3] || e[2] || e[1] || e[0]) && !n.length && (r ? r[y] = n : this._root = n), this) : (this._root = o, this);
}
function Vo(t) {
  for (var e = 0, n = t.length; e < n; ++e)
    this.remove(t[e]);
  return this;
}
function qo() {
  return this._root;
}
function Lo() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length)
      do
        ++t;
      while (e = e.next);
  }), t;
}
function Uo(t) {
  var e = [], n, r = this._root, i, o, u, a, s;
  for (r && e.push(new O(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, o = n.x0, u = n.y0, a = n.x1, s = n.y1) && r.length) {
      var l = (o + a) / 2, f = (u + s) / 2;
      (i = r[3]) && e.push(new O(i, l, f, a, s)), (i = r[2]) && e.push(new O(i, o, f, l, s)), (i = r[1]) && e.push(new O(i, l, u, a, f)), (i = r[0]) && e.push(new O(i, o, u, l, f));
    }
  return this;
}
function Wo(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new O(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, u = r.x0, a = r.y0, s = r.x1, l = r.y1, f = (u + s) / 2, m = (a + l) / 2;
      (o = i[0]) && e.push(new O(o, u, a, f, m)), (o = i[1]) && e.push(new O(o, f, a, s, m)), (o = i[2]) && e.push(new O(o, u, m, f, l)), (o = i[3]) && e.push(new O(o, f, m, s, l));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Go(t) {
  return t[0];
}
function Ko(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function Zo(t) {
  return t[1];
}
function Qo(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function ae(t, e, n) {
  var r = new se(e ?? Go, n ?? Zo, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function se(t, e, n, r, i, o) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function Se(t) {
  for (var e = { data: t.data }, n = e; t = t.next; )
    n = n.next = { data: t.data };
  return e;
}
var q = ae.prototype = se.prototype;
q.copy = function() {
  var t = new se(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e)
    return t;
  if (!e.length)
    return t._root = Se(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Se(r));
  return t;
};
q.add = Po;
q.addAll = Xo;
q.cover = Fo;
q.data = Ho;
q.extent = Yo;
q.find = Bo;
q.remove = Oo;
q.removeAll = Vo;
q.root = qo;
q.size = Lo;
q.visit = Uo;
q.visitAfter = Wo;
q.x = Ko;
q.y = Qo;
function V(t) {
  return function() {
    return t;
  };
}
function ot(t) {
  return (t() - 0.5) * 1e-6;
}
function Jo(t) {
  return t.x + t.vx;
}
function jo(t) {
  return t.y + t.vy;
}
function tu(t) {
  var e, n, r, i = 1, o = 1;
  typeof t != "function" && (t = V(t == null ? 1 : +t));
  function u() {
    for (var l, f = e.length, m, d, g, p, v, h, y = 0; y < o; ++y)
      for (m = ae(e, Jo, jo).visitAfter(a), l = 0; l < f; ++l)
        d = e[l], v = n[d.index], h = v * v, g = d.x + d.vx, p = d.y + d.vy, m.visit(w);
    function w(T, N, C, I, F) {
      var X = T.data, S = T.r, k = v + S;
      if (X) {
        if (X.index > d.index) {
          var R = g - X.x - X.vx, D = p - X.y - X.vy, $ = R * R + D * D;
          $ < k * k && (R === 0 && (R = ot(r), $ += R * R), D === 0 && (D = ot(r), $ += D * D), $ = (k - ($ = Math.sqrt($))) / $ * i, d.vx += (R *= $) * (k = (S *= S) / (h + S)), d.vy += (D *= $) * k, X.vx -= R * (k = 1 - k), X.vy -= D * k);
        }
        return;
      }
      return N > g + k || I < g - k || C > p + k || F < p - k;
    }
  }
  function a(l) {
    if (l.data)
      return l.r = n[l.data.index];
    for (var f = l.r = 0; f < 4; ++f)
      l[f] && l[f].r > l.r && (l.r = l[f].r);
  }
  function s() {
    if (e) {
      var l, f = e.length, m;
      for (n = new Array(f), l = 0; l < f; ++l)
        m = e[l], n[m.index] = +t(m, l, e);
    }
  }
  return u.initialize = function(l, f) {
    e = l, r = f, s();
  }, u.iterations = function(l) {
    return arguments.length ? (o = +l, u) : o;
  }, u.strength = function(l) {
    return arguments.length ? (i = +l, u) : i;
  }, u.radius = function(l) {
    return arguments.length ? (t = typeof l == "function" ? l : V(+l), s(), u) : t;
  }, u;
}
function eu(t) {
  return t.index;
}
function Ee(t, e) {
  var n = t.get(e);
  if (!n)
    throw new Error("node not found: " + e);
  return n;
}
function nu(t) {
  var e = eu, n = m, r, i = V(30), o, u, a, s, l, f = 1;
  t == null && (t = []);
  function m(h) {
    return 1 / Math.min(a[h.source.index], a[h.target.index]);
  }
  function d(h) {
    for (var y = 0, w = t.length; y < f; ++y)
      for (var T = 0, N, C, I, F, X, S, k; T < w; ++T)
        N = t[T], C = N.source, I = N.target, F = I.x + I.vx - C.x - C.vx || ot(l), X = I.y + I.vy - C.y - C.vy || ot(l), S = Math.sqrt(F * F + X * X), S = (S - o[T]) / S * h * r[T], F *= S, X *= S, I.vx -= F * (k = s[T]), I.vy -= X * k, C.vx += F * (k = 1 - k), C.vy += X * k;
  }
  function g() {
    if (u) {
      var h, y = u.length, w = t.length, T = new Map(u.map((C, I) => [e(C, I, u), C])), N;
      for (h = 0, a = new Array(y); h < w; ++h)
        N = t[h], N.index = h, typeof N.source != "object" && (N.source = Ee(T, N.source)), typeof N.target != "object" && (N.target = Ee(T, N.target)), a[N.source.index] = (a[N.source.index] || 0) + 1, a[N.target.index] = (a[N.target.index] || 0) + 1;
      for (h = 0, s = new Array(w); h < w; ++h)
        N = t[h], s[h] = a[N.source.index] / (a[N.source.index] + a[N.target.index]);
      r = new Array(w), p(), o = new Array(w), v();
    }
  }
  function p() {
    if (u)
      for (var h = 0, y = t.length; h < y; ++h)
        r[h] = +n(t[h], h, t);
  }
  function v() {
    if (u)
      for (var h = 0, y = t.length; h < y; ++h)
        o[h] = +i(t[h], h, t);
  }
  return d.initialize = function(h, y) {
    u = h, l = y, g();
  }, d.links = function(h) {
    return arguments.length ? (t = h, g(), d) : t;
  }, d.id = function(h) {
    return arguments.length ? (e = h, d) : e;
  }, d.iterations = function(h) {
    return arguments.length ? (f = +h, d) : f;
  }, d.strength = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : V(+h), p(), d) : n;
  }, d.distance = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : V(+h), v(), d) : i;
  }, d;
}
const ru = 1664525, iu = 1013904223, $e = 4294967296;
function ou() {
  let t = 1;
  return () => (t = (ru * t + iu) % $e) / $e;
}
function uu(t) {
  return t.x;
}
function au(t) {
  return t.y;
}
var su = 10, lu = Math.PI * (3 - Math.sqrt(5));
function fu(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, u = 0.6, a = /* @__PURE__ */ new Map(), s = ie(m), l = Xt("tick", "end"), f = ou();
  t == null && (t = []);
  function m() {
    d(), l.call("tick", e), n < r && (s.stop(), l.call("end", e));
  }
  function d(v) {
    var h, y = t.length, w;
    v === void 0 && (v = 1);
    for (var T = 0; T < v; ++T)
      for (n += (o - n) * i, a.forEach(function(N) {
        N(n);
      }), h = 0; h < y; ++h)
        w = t[h], w.fx == null ? w.x += w.vx *= u : (w.x = w.fx, w.vx = 0), w.fy == null ? w.y += w.vy *= u : (w.y = w.fy, w.vy = 0);
    return e;
  }
  function g() {
    for (var v = 0, h = t.length, y; v < h; ++v) {
      if (y = t[v], y.index = v, y.fx != null && (y.x = y.fx), y.fy != null && (y.y = y.fy), isNaN(y.x) || isNaN(y.y)) {
        var w = su * Math.sqrt(0.5 + v), T = v * lu;
        y.x = w * Math.cos(T), y.y = w * Math.sin(T);
      }
      (isNaN(y.vx) || isNaN(y.vy)) && (y.vx = y.vy = 0);
    }
  }
  function p(v) {
    return v.initialize && v.initialize(t, f), v;
  }
  return g(), e = {
    tick: d,
    restart: function() {
      return s.restart(m), e;
    },
    stop: function() {
      return s.stop(), e;
    },
    nodes: function(v) {
      return arguments.length ? (t = v, g(), a.forEach(p), e) : t;
    },
    alpha: function(v) {
      return arguments.length ? (n = +v, e) : n;
    },
    alphaMin: function(v) {
      return arguments.length ? (r = +v, e) : r;
    },
    alphaDecay: function(v) {
      return arguments.length ? (i = +v, e) : +i;
    },
    alphaTarget: function(v) {
      return arguments.length ? (o = +v, e) : o;
    },
    velocityDecay: function(v) {
      return arguments.length ? (u = 1 - v, e) : 1 - u;
    },
    randomSource: function(v) {
      return arguments.length ? (f = v, a.forEach(p), e) : f;
    },
    force: function(v, h) {
      return arguments.length > 1 ? (h == null ? a.delete(v) : a.set(v, p(h)), e) : a.get(v);
    },
    find: function(v, h, y) {
      var w = 0, T = t.length, N, C, I, F, X;
      for (y == null ? y = 1 / 0 : y *= y, w = 0; w < T; ++w)
        F = t[w], N = v - F.x, C = h - F.y, I = N * N + C * C, I < y && (X = F, y = I);
      return X;
    },
    on: function(v, h) {
      return arguments.length > 1 ? (l.on(v, h), e) : l.on(v);
    }
  };
}
function cu() {
  var t, e, n, r, i = V(-30), o, u = 1, a = 1 / 0, s = 0.81;
  function l(g) {
    var p, v = t.length, h = ae(t, uu, au).visitAfter(m);
    for (r = g, p = 0; p < v; ++p)
      e = t[p], h.visit(d);
  }
  function f() {
    if (t) {
      var g, p = t.length, v;
      for (o = new Array(p), g = 0; g < p; ++g)
        v = t[g], o[v.index] = +i(v, g, t);
    }
  }
  function m(g) {
    var p = 0, v, h, y = 0, w, T, N;
    if (g.length) {
      for (w = T = N = 0; N < 4; ++N)
        (v = g[N]) && (h = Math.abs(v.value)) && (p += v.value, y += h, w += h * v.x, T += h * v.y);
      g.x = w / y, g.y = T / y;
    } else {
      v = g, v.x = v.data.x, v.y = v.data.y;
      do
        p += o[v.data.index];
      while (v = v.next);
    }
    g.value = p;
  }
  function d(g, p, v, h) {
    if (!g.value)
      return !0;
    var y = g.x - e.x, w = g.y - e.y, T = h - p, N = y * y + w * w;
    if (T * T / s < N)
      return N < a && (y === 0 && (y = ot(n), N += y * y), w === 0 && (w = ot(n), N += w * w), N < u && (N = Math.sqrt(u * N)), e.vx += y * g.value * r / N, e.vy += w * g.value * r / N), !0;
    if (g.length || N >= a)
      return;
    (g.data !== e || g.next) && (y === 0 && (y = ot(n), N += y * y), w === 0 && (w = ot(n), N += w * w), N < u && (N = Math.sqrt(u * N)));
    do
      g.data !== e && (T = o[g.data.index] * r / N, e.vx += y * T, e.vy += w * T);
    while (g = g.next);
  }
  return l.initialize = function(g, p) {
    t = g, n = p, f();
  }, l.strength = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : V(+g), f(), l) : i;
  }, l.distanceMin = function(g) {
    return arguments.length ? (u = g * g, l) : Math.sqrt(u);
  }, l.distanceMax = function(g) {
    return arguments.length ? (a = g * g, l) : Math.sqrt(a);
  }, l.theta = function(g) {
    return arguments.length ? (s = g * g, l) : Math.sqrt(s);
  }, l;
}
function Ce(t) {
  var e = V(0.1), n, r, i;
  typeof t != "function" && (t = V(t == null ? 0 : +t));
  function o(a) {
    for (var s = 0, l = n.length, f; s < l; ++s)
      f = n[s], f.vx += (i[s] - f.x) * r[s] * a;
  }
  function u() {
    if (n) {
      var a, s = n.length;
      for (r = new Array(s), i = new Array(s), a = 0; a < s; ++a)
        r[a] = isNaN(i[a] = +t(n[a], a, n)) ? 0 : +e(n[a], a, n);
    }
  }
  return o.initialize = function(a) {
    n = a, u();
  }, o.strength = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : V(+a), u(), o) : e;
  }, o.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : V(+a), u(), o) : t;
  }, o;
}
function Re(t) {
  var e = V(0.1), n, r, i;
  typeof t != "function" && (t = V(t == null ? 0 : +t));
  function o(a) {
    for (var s = 0, l = n.length, f; s < l; ++s)
      f = n[s], f.vy += (i[s] - f.y) * r[s] * a;
  }
  function u() {
    if (n) {
      var a, s = n.length;
      for (r = new Array(s), i = new Array(s), a = 0; a < s; ++a)
        r[a] = isNaN(i[a] = +t(n[a], a, n)) ? 0 : +e(n[a], a, n);
    }
  }
  return o.initialize = function(a) {
    n = a, u();
  }, o.strength = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : V(+a), u(), o) : e;
  }, o.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : V(+a), u(), o) : t;
  }, o;
}
function hu(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const De = Symbol("implicit");
function ln() {
  var t = new le(), e = [], n = [], r = De;
  function i(o) {
    let u = t.get(o);
    if (u === void 0) {
      if (r !== De)
        return r;
      t.set(o, u = e.push(o) - 1);
    }
    return n[u % n.length];
  }
  return i.domain = function(o) {
    if (!arguments.length)
      return e.slice();
    e = [], t = new le();
    for (const u of o)
      t.has(u) || t.set(u, e.push(u) - 1);
    return i;
  }, i.range = function(o) {
    return arguments.length ? (n = Array.from(o), i) : n.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return ln(e, n).unknown(r);
  }, hu.apply(i, arguments), i;
}
function gu(t) {
  for (var e = t.length / 6 | 0, n = new Array(e), r = 0; r < e; )
    n[r] = "#" + t.slice(r * 6, ++r * 6);
  return n;
}
const du = gu("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), Mt = (t) => () => t;
function pu(t, {
  sourceEvent: e,
  target: n,
  transform: r,
  dispatch: i
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: r, enumerable: !0, configurable: !0 },
    _: { value: i }
  });
}
function nt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
nt.prototype = {
  constructor: nt,
  scale: function(t) {
    return t === 1 ? this : new nt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new nt(this.k, this.x + this.k * t, this.y + this.k * e);
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
var fn = new nt(1, 0, 0);
nt.prototype;
function qt(t) {
  t.stopImmediatePropagation();
}
function dt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function yu(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function mu() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ie() {
  return this.__zoom || fn;
}
function xu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function vu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _u(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], u = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function Pe() {
  var t = yu, e = mu, n = _u, r = xu, i = vu, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, s = Ni, l = Xt("start", "zoom", "end"), f, m, d, g = 500, p = 150, v = 0, h = 10;
  function y(c) {
    c.property("__zoom", Ie).on("wheel.zoom", X, { passive: !1 }).on("mousedown.zoom", S).on("dblclick.zoom", k).filter(i).on("touchstart.zoom", R).on("touchmove.zoom", D).on("touchend.zoom touchcancel.zoom", $).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(c, _, x, b) {
    var A = c.selection ? c.selection() : c;
    A.property("__zoom", Ie), c !== A ? C(c, _, x, b) : A.interrupt().each(function() {
      I(this, arguments).event(b).start().zoom(null, typeof _ == "function" ? _.apply(this, arguments) : _).end();
    });
  }, y.scaleBy = function(c, _, x, b) {
    y.scaleTo(c, function() {
      var A = this.__zoom.k, E = typeof _ == "function" ? _.apply(this, arguments) : _;
      return A * E;
    }, x, b);
  }, y.scaleTo = function(c, _, x, b) {
    y.transform(c, function() {
      var A = e.apply(this, arguments), E = this.__zoom, z = x == null ? N(A) : typeof x == "function" ? x.apply(this, arguments) : x, M = E.invert(z), P = typeof _ == "function" ? _.apply(this, arguments) : _;
      return n(T(w(E, P), z, M), A, u);
    }, x, b);
  }, y.translateBy = function(c, _, x, b) {
    y.transform(c, function() {
      return n(this.__zoom.translate(
        typeof _ == "function" ? _.apply(this, arguments) : _,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), e.apply(this, arguments), u);
    }, null, b);
  }, y.translateTo = function(c, _, x, b, A) {
    y.transform(c, function() {
      var E = e.apply(this, arguments), z = this.__zoom, M = b == null ? N(E) : typeof b == "function" ? b.apply(this, arguments) : b;
      return n(fn.translate(M[0], M[1]).scale(z.k).translate(
        typeof _ == "function" ? -_.apply(this, arguments) : -_,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), E, u);
    }, b, A);
  };
  function w(c, _) {
    return _ = Math.max(o[0], Math.min(o[1], _)), _ === c.k ? c : new nt(_, c.x, c.y);
  }
  function T(c, _, x) {
    var b = _[0] - x[0] * c.k, A = _[1] - x[1] * c.k;
    return b === c.x && A === c.y ? c : new nt(c.k, b, A);
  }
  function N(c) {
    return [(+c[0][0] + +c[1][0]) / 2, (+c[0][1] + +c[1][1]) / 2];
  }
  function C(c, _, x, b) {
    c.on("start.zoom", function() {
      I(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      I(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var A = this, E = arguments, z = I(A, E).event(b), M = e.apply(A, E), P = x == null ? N(M) : typeof x == "function" ? x.apply(A, E) : x, Y = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), H = A.__zoom, B = typeof _ == "function" ? _.apply(A, E) : _, W = s(H.invert(P).concat(Y / H.k), B.invert(P).concat(Y / B.k));
      return function(G) {
        if (G === 1)
          G = B;
        else {
          var j = W(G), Bt = Y / j[2];
          G = new nt(Bt, P[0] - j[0] * Bt, P[1] - j[1] * Bt);
        }
        z.zoom(null, G);
      };
    });
  }
  function I(c, _, x) {
    return !x && c.__zooming || new F(c, _);
  }
  function F(c, _) {
    this.that = c, this.args = _, this.active = 0, this.sourceEvent = null, this.extent = e.apply(c, _), this.taps = 0;
  }
  F.prototype = {
    event: function(c) {
      return c && (this.sourceEvent = c), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(c, _) {
      return this.mouse && c !== "mouse" && (this.mouse[1] = _.invert(this.mouse[0])), this.touch0 && c !== "touch" && (this.touch0[1] = _.invert(this.touch0[0])), this.touch1 && c !== "touch" && (this.touch1[1] = _.invert(this.touch1[0])), this.that.__zoom = _, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(c) {
      var _ = et(this.that).datum();
      l.call(
        c,
        this.that,
        new pu(c, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: c,
          transform: this.that.__zoom,
          dispatch: l
        }),
        _
      );
    }
  };
  function X(c, ..._) {
    if (!t.apply(this, arguments))
      return;
    var x = I(this, _).event(c), b = this.__zoom, A = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, r.apply(this, arguments)))), E = ut(c);
    if (x.wheel)
      (x.mouse[0][0] !== E[0] || x.mouse[0][1] !== E[1]) && (x.mouse[1] = b.invert(x.mouse[0] = E)), clearTimeout(x.wheel);
    else {
      if (b.k === A)
        return;
      x.mouse = [E, b.invert(E)], Et(this), x.start();
    }
    dt(c), x.wheel = setTimeout(z, p), x.zoom("mouse", n(T(w(b, A), x.mouse[0], x.mouse[1]), x.extent, u));
    function z() {
      x.wheel = null, x.end();
    }
  }
  function S(c, ..._) {
    if (d || !t.apply(this, arguments))
      return;
    var x = c.currentTarget, b = I(this, _, !0).event(c), A = et(c.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", Y, !0), E = ut(c, x), z = c.clientX, M = c.clientY;
    Zr(c.view), qt(c), b.mouse = [E, this.__zoom.invert(E)], Et(this), b.start();
    function P(H) {
      if (dt(H), !b.moved) {
        var B = H.clientX - z, W = H.clientY - M;
        b.moved = B * B + W * W > v;
      }
      b.event(H).zoom("mouse", n(T(b.that.__zoom, b.mouse[0] = ut(H, x), b.mouse[1]), b.extent, u));
    }
    function Y(H) {
      A.on("mousemove.zoom mouseup.zoom", null), Qr(H.view, b.moved), dt(H), b.event(H).end();
    }
  }
  function k(c, ..._) {
    if (t.apply(this, arguments)) {
      var x = this.__zoom, b = ut(c.changedTouches ? c.changedTouches[0] : c, this), A = x.invert(b), E = x.k * (c.shiftKey ? 0.5 : 2), z = n(T(w(x, E), b, A), e.apply(this, _), u);
      dt(c), a > 0 ? et(this).transition().duration(a).call(C, z, b, c) : et(this).call(y.transform, z, b, c);
    }
  }
  function R(c, ..._) {
    if (t.apply(this, arguments)) {
      var x = c.touches, b = x.length, A = I(this, _, c.changedTouches.length === b).event(c), E, z, M, P;
      for (qt(c), z = 0; z < b; ++z)
        M = x[z], P = ut(M, this), P = [P, this.__zoom.invert(P), M.identifier], A.touch0 ? !A.touch1 && A.touch0[2] !== P[2] && (A.touch1 = P, A.taps = 0) : (A.touch0 = P, E = !0, A.taps = 1 + !!f);
      f && (f = clearTimeout(f)), E && (A.taps < 2 && (m = P[0], f = setTimeout(function() {
        f = null;
      }, g)), Et(this), A.start());
    }
  }
  function D(c, ..._) {
    if (this.__zooming) {
      var x = I(this, _).event(c), b = c.changedTouches, A = b.length, E, z, M, P;
      for (dt(c), E = 0; E < A; ++E)
        z = b[E], M = ut(z, this), x.touch0 && x.touch0[2] === z.identifier ? x.touch0[0] = M : x.touch1 && x.touch1[2] === z.identifier && (x.touch1[0] = M);
      if (z = x.that.__zoom, x.touch1) {
        var Y = x.touch0[0], H = x.touch0[1], B = x.touch1[0], W = x.touch1[1], G = (G = B[0] - Y[0]) * G + (G = B[1] - Y[1]) * G, j = (j = W[0] - H[0]) * j + (j = W[1] - H[1]) * j;
        z = w(z, Math.sqrt(G / j)), M = [(Y[0] + B[0]) / 2, (Y[1] + B[1]) / 2], P = [(H[0] + W[0]) / 2, (H[1] + W[1]) / 2];
      } else if (x.touch0)
        M = x.touch0[0], P = x.touch0[1];
      else
        return;
      x.zoom("touch", n(T(z, M, P), x.extent, u));
    }
  }
  function $(c, ..._) {
    if (this.__zooming) {
      var x = I(this, _).event(c), b = c.changedTouches, A = b.length, E, z;
      for (qt(c), d && clearTimeout(d), d = setTimeout(function() {
        d = null;
      }, g), E = 0; E < A; ++E)
        z = b[E], x.touch0 && x.touch0[2] === z.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === z.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0)
        x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (z = ut(z, this), Math.hypot(m[0] - z[0], m[1] - z[1]) < h)) {
        var M = et(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return y.wheelDelta = function(c) {
    return arguments.length ? (r = typeof c == "function" ? c : Mt(+c), y) : r;
  }, y.filter = function(c) {
    return arguments.length ? (t = typeof c == "function" ? c : Mt(!!c), y) : t;
  }, y.touchable = function(c) {
    return arguments.length ? (i = typeof c == "function" ? c : Mt(!!c), y) : i;
  }, y.extent = function(c) {
    return arguments.length ? (e = typeof c == "function" ? c : Mt([[+c[0][0], +c[0][1]], [+c[1][0], +c[1][1]]]), y) : e;
  }, y.scaleExtent = function(c) {
    return arguments.length ? (o[0] = +c[0], o[1] = +c[1], y) : [o[0], o[1]];
  }, y.translateExtent = function(c) {
    return arguments.length ? (u[0][0] = +c[0][0], u[1][0] = +c[1][0], u[0][1] = +c[0][1], u[1][1] = +c[1][1], y) : [[u[0][0], u[0][1]], [u[1][0], u[1][1]]];
  }, y.constrain = function(c) {
    return arguments.length ? (n = c, y) : n;
  }, y.duration = function(c) {
    return arguments.length ? (a = +c, y) : a;
  }, y.interpolate = function(c) {
    return arguments.length ? (s = c, y) : s;
  }, y.on = function() {
    var c = l.on.apply(l, arguments);
    return c === l ? y : c;
  }, y.clickDistance = function(c) {
    return arguments.length ? (v = (c = +c) * c, y) : Math.sqrt(v);
  }, y.tapDistance = function(c) {
    return arguments.length ? (h = +c, y) : h;
  }, y;
}
function wu(t, e, n = {
  sticky: !1,
  drag: !0,
  simulation: null,
  zoom: !1,
  events: {
    onZoom: null,
    onResize: null
  },
  node: {
    border: !0,
    radius: 10,
    borderWidth: 1,
    label: null,
    labelFontSize: 14,
    labelColor: null,
    tooltip: null,
    tooltipFontSize: 20,
    onClick: null,
    onHover: null,
    onDrag: null
  },
  link: {
    color: null,
    width: 1
  }
}) {
  var X;
  const r = t.getBoundingClientRect();
  let i = r.width, o = r.height, u = {
    k: 1,
    x: 0,
    y: 0
  }, a = Pe().scaleExtent([1, 8]).translateExtent([[0, 0], [i, o]]);
  t.setAttribute("width", i), t.setAttribute("height", o);
  let s = n == null ? void 0 : n.simulation;
  const l = ln(du);
  let { links: f, nodes: m } = e, d = ((X = n.node) == null ? void 0 : X.radius) ?? 5;
  const g = () => fu(m).force("link", nu(f).id((S) => S.id)).force("charge", cu()).force("center", Te(i / 2, o / 2)).force("collide", tu().radius(d)).force("x", Ce(i / 2)).force("y", Re(o / 2));
  s || (s = g());
  const p = t.getContext("2d");
  et(t).call(a);
  const v = (S, k = null) => {
    var R;
    f = S.links, m = S.nodes, k && typeof k == "object" && Object.keys(k).forEach((D) => {
      n[D] = k[D];
    }), p.clearRect(0, 0, i, o), s.stop(), s = null, d = ((R = n.node) == null ? void 0 : R.radius) ?? 10, s = n.simulation ?? g(), s.on("tick", () => {
      C();
    }), n.drag && N();
  };
  let h = {
    rect: null,
    text: null,
    arrow: null
  };
  const y = (S) => {
    var M;
    let k = t.getBoundingClientRect(), R = S.tooltip ?? n.node.tooltip;
    if (typeof R == "function" && (R = R(S)), typeof R != "string")
      throw new TypeError("tooltip should be string");
    let D = ((M = n.node) == null ? void 0 : M.tooltipFontSize) ?? 20;
    p.font = `${D / u.k}px serif`;
    let $ = p.measureText(R), c = 10 / u.k, _ = {
      top: 10 / u.k,
      left: 10 / u.k,
      right: 10 / u.k,
      bottom: 10 / u.k
    }, x = _.left + $.width + _.right, b = _.top + $.actualBoundingBoxAscent + $.actualBoundingBoxDescent + _.bottom, A = S.x - x / 2, E = S.y - c - b - d, z = 1;
    A + x > k.width && (A = k.width - x), A < 0 && (A = 0), E < 0 && (E = S.y + c + d, z = 0), h.rect = {
      x: A,
      y: E,
      width: x,
      height: b
    }, h.arrow = {
      x: [S.x - 5 / u.k, E + z * (b - 1 / u.k)],
      y: [S.x + 5 / u.k, E + z * (b - 1 / u.k)],
      z: [S.x, S.y - z * d]
    }, h.text = {
      x: A + x / 2 - $.width / 2,
      y: E + _.top + b / 2 - $.actualBoundingBoxDescent,
      content: R
    }, C();
  }, w = (S, k) => {
    let R = m.map((D) => (D.d = Math.sqrt(Math.pow(S - D.x, 2) + Math.pow(k - D.y, 2)), D)).filter((D, $) => {
      let c = typeof d == "function" ? d(D, $) : d;
      return D.d < c;
    });
    return R.length === 0 ? null : (R.sort((D, $) => D.d >= $.d ? 1 : -1), R[0]);
  }, T = (S) => {
    let k = t.getBoundingClientRect();
    S.touches && (S = S.touches[0]);
    let R = (S.clientX - k.left) / (k.right - k.left) * i, D = (S.clientY - k.top) / (k.bottom - k.top) * o;
    return u && (R = (R - u.x) / u.k, D = (D - u.y) / u.k), [R, D];
  }, N = () => {
    let S = !1, k = null, R = et(t), D = null;
    a.on("start", ($) => {
      var b, A;
      $ = $.sourceEvent, $.preventDefault(), S = !0;
      let [c, _] = T($), x = w(c, _);
      x && (k = x, k.fx = c, k.fy = _, (b = n.node) != null && b.onClick && ((A = n.node) == null || A.onClick(k, $))), $.touches && y(k);
    }).on("end", ($) => {
      $ = $.sourceEvent, S = !1, $.active || s.alphaTarget(0), !n.sticky && k && (k.fx = null, k.fy = null, k = null);
    }).on("zoom", ($) => {
      var x, b;
      if (!k || !n.drag || $.sourceEvent.type === "wheel") {
        n.zoom && (u = $.transform, (x = n == null ? void 0 : n.events) != null && x.onZoom && n.events.onZoom($), C());
        return;
      }
      let [c, _] = T($.sourceEvent);
      D && clearTimeout(D), D = setTimeout(() => {
        s.alphaTarget(0), S = !1, R.style("cursor", "auto");
      }, 3e3), R.style("cursor", "grabbing"), h.arrow = null, h.rect = null, h.text = null, k.fx = c, k.fy = _, s.alphaTarget(0.3).restart(), (b = n == null ? void 0 : n.node) != null && b.onDrag && n.node.onDrag(k, $, { mouseX: c, mouseY: _ });
    }), R.on("mousemove touchmove", ($) => {
      var b, A, E;
      if ($.preventDefault(), S && k)
        return;
      let [c, _] = T($), x = w(c, _);
      R.style("cursor", x ? "grab" : "auto"), x ? ((b = n.node) != null && b.onHover && ((A = n.node) == null || A.onHover(x, $)), ((E = n.node) != null && E.tooltip || x.tooltip) && y(x)) : (h.arrow = null, h.rect = null, h.text = null, C());
    });
  };
  function C() {
    var S, k, R, D, $, c, _, x, b, A, E;
    p.save(), p.clearRect(0, 0, i, o), u && (p.translate(u.x, u.y), p.scale(u.k, u.k));
    for (let z = 0; z <= f.length - 1; z++) {
      (S = n.link) != null && S.width && (p.lineWidth = ((k = n.link) == null ? void 0 : k.width) / u.k);
      let M = f[z], P = M.color ?? ((R = n.link) == null ? void 0 : R.color);
      p.strokeStyle = P ? typeof P == "function" ? P(M) : P : "black", p.beginPath(), p.moveTo(M.source.x, M.source.y), p.lineTo(M.target.x, M.target.y), p.stroke();
    }
    p.lineWidth = ((D = n.node) == null ? void 0 : D.borderWidth) ?? 1;
    for (let z = 0; z <= m.length - 1; z++) {
      p.strokeStyle = null;
      let M = m[z], P = M.color ?? (($ = n.node) == null ? void 0 : $.color), Y = M.radius ?? ((c = n.node) == null ? void 0 : c.radius) ?? 10;
      typeof Y == "function" && (Y = Y(M, z)), p.fillStyle = P ? typeof P == "function" ? P(M, z) : P : l(M.id), p.beginPath(), M.x = Math.max(Y, Math.min(i - Y, M.x)), M.y = Math.max(Y, Math.min(o - Y, M.y)), p.arc(M.x, M.y, Y, 0, Math.PI * 2), p.fill();
      let H = M.stroke ?? ((_ = n.node) == null ? void 0 : _.border);
      H && (p.strokeStyle = typeof H == "string" ? H : "#ffffff", p.stroke()), p.closePath();
      let B = M.label ?? ((x = n.node) == null ? void 0 : x.label);
      if (B) {
        let W = ((b = n == null ? void 0 : n.node) == null ? void 0 : b.labelFontSize) ?? 14;
        p.font = `${W}px serif`, p.fillStyle = ((A = n == null ? void 0 : n.node) == null ? void 0 : A.labelColor) ?? "black", p.fillText(typeof B == "function" ? B(M, z) : typeof B == "boolean" ? M.id : B, M.x - d / 2, M.y + d / 2);
      }
    }
    if (h.rect && (p.fillStyle = "white", p.strokeStyle = "black", p.lineWidth = 1 / u.k, p.beginPath(), p.rect(h.rect.x, h.rect.y, h.rect.width, h.rect.height), p.fill(), p.stroke(), p.closePath()), h.arrow && (p.lineWidth = 1 / u.k, p.fillStyle = "white", p.beginPath(), p.moveTo(h.arrow.x[0], h.arrow.x[1]), p.lineTo(h.arrow.y[0], h.arrow.y[1]), p.lineTo(h.arrow.z[0], h.arrow.z[1]), p.fill(), p.closePath(), p.beginPath(), p.moveTo(h.arrow.z[0], h.arrow.z[1]), p.lineTo(h.arrow.x[0], h.arrow.x[1]), p.moveTo(h.arrow.z[0], h.arrow.z[1]), p.lineTo(h.arrow.y[0], h.arrow.y[1]), p.stroke(), p.closePath()), h.text) {
      p.fillStyle = "black";
      let z = ((E = n.node) == null ? void 0 : E.tooltipFontSize) ?? 20;
      p.font = `${z / u.k}px serif`, p.fillText(h.text.content, h.text.x, h.text.y);
    }
    p.restore();
  }
  s.on("tick", () => {
    C();
  }), N();
  let I = null;
  return window.addEventListener("resize", (S) => {
    const k = t.getBoundingClientRect();
    i = k.width, o = k.height, t.setAttribute("width", i), t.setAttribute("height", o), I && clearTimeout(I), I = setTimeout(() => {
      var R;
      a = Pe().scaleExtent([1, 8]).translateExtent([[0, 0], [i, o]]), n.simulation || s.force("x", Ce(i / 2)).force("y", Re(o / 2)).force("center", Te(i / 2, o / 2)).alpha(0.3).restart(), (R = n == null ? void 0 : n.events) != null && R.onResize && n.events.onResize(S);
    }, 200);
  }), {
    update: v,
    destroy: () => {
      s = null, p.clearRect(0, 0, i, o), a = null;
    }
  };
}
export {
  wu as default
};

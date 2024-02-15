class le extends Map {
  constructor(e, n = ln) {
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
    return super.set(an(this, e), n);
  }
  delete(e) {
    return super.delete(sn(this, e));
  }
}
function fe({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function an({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function sn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function ln(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
var fn = { value: () => {
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
function cn(t, e) {
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
    var n = this._, r = cn(t + "", n), i, o = -1, u = r.length;
    if (arguments.length < 2) {
      for (; ++o < u; )
        if ((i = (t = r[o]).type) && (i = hn(n[i], t.name)))
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
function hn(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function ce(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = fn, t = t.slice(0, r).concat(t.slice(r + 1));
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
function gn(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Lt && e.documentElement.namespaceURI === Lt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function pn(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Re(t) {
  var e = Ft(t);
  return (e.local ? pn : gn)(e);
}
function dn() {
}
function te(t) {
  return t == null ? dn : function() {
    return this.querySelector(t);
  };
}
function yn(t) {
  typeof t != "function" && (t = te(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = new Array(u), l, s, f = 0; f < u; ++f)
      (l = o[f]) && (s = t.call(l, l.__data__, f, o)) && ("__data__" in l && (s.__data__ = l.__data__), a[f] = s);
  return new q(r, this._parents);
}
function mn(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function xn() {
  return [];
}
function Ie(t) {
  return t == null ? xn : function() {
    return this.querySelectorAll(t);
  };
}
function _n(t) {
  return function() {
    return mn(t.apply(this, arguments));
  };
}
function vn(t) {
  typeof t == "function" ? t = _n(t) : t = Ie(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var u = e[o], a = u.length, l, s = 0; s < a; ++s)
      (l = u[s]) && (r.push(t.call(l, l.__data__, s, u)), i.push(l));
  return new q(r, i);
}
function De(t) {
  return function() {
    return this.matches(t);
  };
}
function Pe(t) {
  return function(e) {
    return e.matches(t);
  };
}
var wn = Array.prototype.find;
function bn(t) {
  return function() {
    return wn.call(this.children, t);
  };
}
function Nn() {
  return this.firstElementChild;
}
function kn(t) {
  return this.select(t == null ? Nn : bn(typeof t == "function" ? t : Pe(t)));
}
var An = Array.prototype.filter;
function Mn() {
  return Array.from(this.children);
}
function zn(t) {
  return function() {
    return An.call(this.children, t);
  };
}
function Tn(t) {
  return this.selectAll(t == null ? Mn : zn(typeof t == "function" ? t : Pe(t)));
}
function Sn(t) {
  typeof t != "function" && (t = De(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = [], l, s = 0; s < u; ++s)
      (l = o[s]) && t.call(l, l.__data__, s, o) && a.push(l);
  return new q(r, this._parents);
}
function Xe(t) {
  return new Array(t.length);
}
function En() {
  return new q(this._enter || this._groups.map(Xe), this._parents);
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
function $n(t) {
  return function() {
    return t;
  };
}
function Cn(t, e, n, r, i, o) {
  for (var u = 0, a, l = e.length, s = o.length; u < s; ++u)
    (a = e[u]) ? (a.__data__ = o[u], r[u] = a) : n[u] = new $t(t, o[u]);
  for (; u < l; ++u)
    (a = e[u]) && (i[u] = a);
}
function Rn(t, e, n, r, i, o, u) {
  var a, l, s = /* @__PURE__ */ new Map(), f = e.length, m = o.length, p = new Array(f), g;
  for (a = 0; a < f; ++a)
    (l = e[a]) && (p[a] = g = u.call(l, l.__data__, a, e) + "", s.has(g) ? i[a] = l : s.set(g, l));
  for (a = 0; a < m; ++a)
    g = u.call(t, o[a], a, o) + "", (l = s.get(g)) ? (r[a] = l, l.__data__ = o[a], s.delete(g)) : n[a] = new $t(t, o[a]);
  for (a = 0; a < f; ++a)
    (l = e[a]) && s.get(p[a]) === l && (i[a] = l);
}
function In(t) {
  return t.__data__;
}
function Dn(t, e) {
  if (!arguments.length)
    return Array.from(this, In);
  var n = e ? Rn : Cn, r = this._parents, i = this._groups;
  typeof t != "function" && (t = $n(t));
  for (var o = i.length, u = new Array(o), a = new Array(o), l = new Array(o), s = 0; s < o; ++s) {
    var f = r[s], m = i[s], p = m.length, g = Pn(t.call(f, f && f.__data__, s, r)), d = g.length, x = a[s] = new Array(d), h = u[s] = new Array(d), y = l[s] = new Array(p);
    n(f, m, x, h, y, g, e);
    for (var N = 0, M = 0, k, C; N < d; ++N)
      if (k = x[N]) {
        for (N >= M && (M = N + 1); !(C = h[M]) && ++M < d; )
          ;
        k._next = C || null;
      }
  }
  return u = new q(u, r), u._enter = a, u._exit = l, u;
}
function Pn(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Xn() {
  return new q(this._exit || this._groups.map(Xe), this._parents);
}
function Fn(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function Hn(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, u = Math.min(i, o), a = new Array(i), l = 0; l < u; ++l)
    for (var s = n[l], f = r[l], m = s.length, p = a[l] = new Array(m), g, d = 0; d < m; ++d)
      (g = s[d] || f[d]) && (p[d] = g);
  for (; l < i; ++l)
    a[l] = n[l];
  return new q(a, this._parents);
}
function Yn() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], u; --i >= 0; )
      (u = r[i]) && (o && u.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(u, o), o = u);
  return this;
}
function Bn(t) {
  t || (t = On);
  function e(m, p) {
    return m && p ? t(m.__data__, p.__data__) : !m - !p;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var u = n[o], a = u.length, l = i[o] = new Array(a), s, f = 0; f < a; ++f)
      (s = u[f]) && (l[f] = s);
    l.sort(e);
  }
  return new q(i, this._parents).order();
}
function On(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Vn() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function qn() {
  return Array.from(this);
}
function Ln() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var u = r[i];
      if (u)
        return u;
    }
  return null;
}
function Un() {
  let t = 0;
  for (const e of this)
    ++t;
  return t;
}
function Wn() {
  return !this.node();
}
function Gn(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, u = i.length, a; o < u; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function Kn(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Qn(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Zn(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Jn(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function jn(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function tr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function er(t, e) {
  var n = Ft(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Qn : Kn : typeof e == "function" ? n.local ? tr : jn : n.local ? Jn : Zn)(n, e));
}
function Fe(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function nr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function rr(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function ir(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function or(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? nr : typeof e == "function" ? ir : rr)(t, e, n ?? "")) : ct(this.node(), t);
}
function ct(t, e) {
  return t.style.getPropertyValue(e) || Fe(t).getComputedStyle(t, null).getPropertyValue(e);
}
function ur(t) {
  return function() {
    delete this[t];
  };
}
function ar(t, e) {
  return function() {
    this[t] = e;
  };
}
function sr(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function lr(t, e) {
  return arguments.length > 1 ? this.each((e == null ? ur : typeof e == "function" ? sr : ar)(t, e)) : this.node()[t];
}
function He(t) {
  return t.trim().split(/^|\s+/);
}
function ee(t) {
  return t.classList || new Ye(t);
}
function Ye(t) {
  this._node = t, this._names = He(t.getAttribute("class") || "");
}
Ye.prototype = {
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
function Be(t, e) {
  for (var n = ee(t), r = -1, i = e.length; ++r < i; )
    n.add(e[r]);
}
function Oe(t, e) {
  for (var n = ee(t), r = -1, i = e.length; ++r < i; )
    n.remove(e[r]);
}
function fr(t) {
  return function() {
    Be(this, t);
  };
}
function cr(t) {
  return function() {
    Oe(this, t);
  };
}
function hr(t, e) {
  return function() {
    (e.apply(this, arguments) ? Be : Oe)(this, t);
  };
}
function gr(t, e) {
  var n = He(t + "");
  if (arguments.length < 2) {
    for (var r = ee(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? hr : e ? fr : cr)(n, e));
}
function pr() {
  this.textContent = "";
}
function dr(t) {
  return function() {
    this.textContent = t;
  };
}
function yr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function mr(t) {
  return arguments.length ? this.each(t == null ? pr : (typeof t == "function" ? yr : dr)(t)) : this.node().textContent;
}
function xr() {
  this.innerHTML = "";
}
function _r(t) {
  return function() {
    this.innerHTML = t;
  };
}
function vr(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function wr(t) {
  return arguments.length ? this.each(t == null ? xr : (typeof t == "function" ? vr : _r)(t)) : this.node().innerHTML;
}
function br() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Nr() {
  return this.each(br);
}
function kr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ar() {
  return this.each(kr);
}
function Mr(t) {
  var e = typeof t == "function" ? t : Re(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function zr() {
  return null;
}
function Tr(t, e) {
  var n = typeof t == "function" ? t : Re(t), r = e == null ? zr : typeof e == "function" ? e : te(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Sr() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Er() {
  return this.each(Sr);
}
function $r() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Cr() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Rr(t) {
  return this.select(t ? Cr : $r);
}
function Ir(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function Dr(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Pr(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Xr(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Fr(t, e, n) {
  return function() {
    var r = this.__on, i, o = Dr(e);
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
function Hr(t, e, n) {
  var r = Pr(t + ""), i, o = r.length, u;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, s = a.length, f; l < s; ++l)
        for (i = 0, f = a[l]; i < o; ++i)
          if ((u = r[i]).type === f.type && u.name === f.name)
            return f.value;
    }
    return;
  }
  for (a = e ? Fr : Xr, i = 0; i < o; ++i)
    this.each(a(r[i], e, n));
  return this;
}
function Ve(t, e, n) {
  var r = Fe(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Yr(t, e) {
  return function() {
    return Ve(this, t, e);
  };
}
function Br(t, e) {
  return function() {
    return Ve(this, t, e.apply(this, arguments));
  };
}
function Or(t, e) {
  return this.each((typeof e == "function" ? Br : Yr)(t, e));
}
function* Vr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, u; i < o; ++i)
      (u = r[i]) && (yield u);
}
var qe = [null];
function q(t, e) {
  this._groups = t, this._parents = e;
}
function wt() {
  return new q([[document.documentElement]], qe);
}
function qr() {
  return this;
}
q.prototype = wt.prototype = {
  constructor: q,
  select: yn,
  selectAll: vn,
  selectChild: kn,
  selectChildren: Tn,
  filter: Sn,
  data: Dn,
  enter: En,
  exit: Xn,
  join: Fn,
  merge: Hn,
  selection: qr,
  order: Yn,
  sort: Bn,
  call: Vn,
  nodes: qn,
  node: Ln,
  size: Un,
  empty: Wn,
  each: Gn,
  attr: er,
  style: or,
  property: lr,
  classed: gr,
  text: mr,
  html: wr,
  raise: Nr,
  lower: Ar,
  append: Mr,
  insert: Tr,
  remove: Er,
  clone: Rr,
  datum: Ir,
  on: Hr,
  dispatch: Or,
  [Symbol.iterator]: Vr
};
function et(t) {
  return typeof t == "string" ? new q([[document.querySelector(t)]], [document.documentElement]) : new q([[t]], qe);
}
function Lr(t) {
  let e;
  for (; e = t.sourceEvent; )
    t = e;
  return t;
}
function ut(t, e) {
  if (t = Lr(t), e === void 0 && (e = t.currentTarget), e) {
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
function Ur(t) {
  var e = t.document.documentElement, n = et(t).on("dragstart.drag", Wt, Ut);
  "onselectstart" in e ? n.on("selectstart.drag", Wt, Ut) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function Wr(t, e) {
  var n = t.document.documentElement, r = et(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Wt, Ut), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ne(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Le(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e)
    n[r] = e[r];
  return n;
}
function bt() {
}
var mt = 0.7, Ct = 1 / mt, ft = "\\s*([+-]?\\d+)\\s*", xt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Q = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Gr = /^#([0-9a-f]{3,8})$/, Kr = new RegExp(`^rgb\\(${ft},${ft},${ft}\\)$`), Qr = new RegExp(`^rgb\\(${Q},${Q},${Q}\\)$`), Zr = new RegExp(`^rgba\\(${ft},${ft},${ft},${xt}\\)$`), Jr = new RegExp(`^rgba\\(${Q},${Q},${Q},${xt}\\)$`), jr = new RegExp(`^hsl\\(${xt},${Q},${Q}\\)$`), ti = new RegExp(`^hsla\\(${xt},${Q},${Q},${xt}\\)$`), ge = {
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
ne(bt, _t, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: pe,
  // Deprecated! Use color.formatHex.
  formatHex: pe,
  formatHex8: ei,
  formatHsl: ni,
  formatRgb: de,
  toString: de
});
function pe() {
  return this.rgb().formatHex();
}
function ei() {
  return this.rgb().formatHex8();
}
function ni() {
  return Ue(this).formatHsl();
}
function de() {
  return this.rgb().formatRgb();
}
function _t(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = Gr.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? ye(e) : n === 3 ? new V(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Nt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Nt(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Kr.exec(t)) ? new V(e[1], e[2], e[3], 1) : (e = Qr.exec(t)) ? new V(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Zr.exec(t)) ? Nt(e[1], e[2], e[3], e[4]) : (e = Jr.exec(t)) ? Nt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = jr.exec(t)) ? _e(e[1], e[2] / 100, e[3] / 100, 1) : (e = ti.exec(t)) ? _e(e[1], e[2] / 100, e[3] / 100, e[4]) : ge.hasOwnProperty(t) ? ye(ge[t]) : t === "transparent" ? new V(NaN, NaN, NaN, 0) : null;
}
function ye(t) {
  return new V(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Nt(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new V(t, e, n, r);
}
function ri(t) {
  return t instanceof bt || (t = _t(t)), t ? (t = t.rgb(), new V(t.r, t.g, t.b, t.opacity)) : new V();
}
function Gt(t, e, n, r) {
  return arguments.length === 1 ? ri(t) : new V(t, e, n, r ?? 1);
}
function V(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
ne(V, Gt, Le(bt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new V(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mt : Math.pow(mt, t), new V(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new V(st(this.r), st(this.g), st(this.b), Rt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: me,
  // Deprecated! Use color.formatHex.
  formatHex: me,
  formatHex8: ii,
  formatRgb: xe,
  toString: xe
}));
function me() {
  return `#${at(this.r)}${at(this.g)}${at(this.b)}`;
}
function ii() {
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
function _e(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new W(t, e, n, r);
}
function Ue(t) {
  if (t instanceof W)
    return new W(t.h, t.s, t.l, t.opacity);
  if (t instanceof bt || (t = _t(t)), !t)
    return new W();
  if (t instanceof W)
    return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), u = NaN, a = o - i, l = (o + i) / 2;
  return a ? (e === o ? u = (n - r) / a + (n < r) * 6 : n === o ? u = (r - e) / a + 2 : u = (e - n) / a + 4, a /= l < 0.5 ? o + i : 2 - o - i, u *= 60) : a = l > 0 && l < 1 ? 0 : u, new W(u, a, l, t.opacity);
}
function oi(t, e, n, r) {
  return arguments.length === 1 ? Ue(t) : new W(t, e, n, r ?? 1);
}
function W(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
ne(W, oi, Le(bt, {
  brighter(t) {
    return t = t == null ? Ct : Math.pow(Ct, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? mt : Math.pow(mt, t), new W(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new V(
      Ot(t >= 240 ? t - 240 : t + 120, i, r),
      Ot(t, i, r),
      Ot(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new W(ve(this.h), kt(this.s), kt(this.l), Rt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = Rt(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${ve(this.h)}, ${kt(this.s) * 100}%, ${kt(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function ve(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function kt(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ot(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const We = (t) => () => t;
function ui(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function ai(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function si(t) {
  return (t = +t) == 1 ? Ge : function(e, n) {
    return n - e ? ai(e, n, t) : We(isNaN(e) ? n : e);
  };
}
function Ge(t, e) {
  var n = e - t;
  return n ? ui(t, n) : We(isNaN(t) ? e : t);
}
const we = function t(e) {
  var n = si(e);
  function r(i, o) {
    var u = n((i = Gt(i)).r, (o = Gt(o)).r), a = n(i.g, o.g), l = n(i.b, o.b), s = Ge(i.opacity, o.opacity);
    return function(f) {
      return i.r = u(f), i.g = a(f), i.b = l(f), i.opacity = s(f), i + "";
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
function li(t) {
  return function() {
    return t;
  };
}
function fi(t) {
  return function(e) {
    return t(e) + "";
  };
}
function ci(t, e) {
  var n = Kt.lastIndex = Vt.lastIndex = 0, r, i, o, u = -1, a = [], l = [];
  for (t = t + "", e = e + ""; (r = Kt.exec(t)) && (i = Vt.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), a[u] ? a[u] += o : a[++u] = o), (r = r[0]) === (i = i[0]) ? a[u] ? a[u] += i : a[++u] = i : (a[++u] = null, l.push({ i: u, x: it(r, i) })), n = Vt.lastIndex;
  return n < e.length && (o = e.slice(n), a[u] ? a[u] += o : a[++u] = o), a.length < 2 ? l[0] ? fi(l[0].x) : li(e) : (e = l.length, function(s) {
    for (var f = 0, m; f < e; ++f)
      a[(m = l[f]).i] = m.x(s);
    return a.join("");
  });
}
var be = 180 / Math.PI, Qt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ke(t, e, n, r, i, o) {
  var u, a, l;
  return (u = Math.sqrt(t * t + e * e)) && (t /= u, e /= u), (l = t * n + e * r) && (n -= t * l, r -= e * l), (a = Math.sqrt(n * n + r * r)) && (n /= a, r /= a, l /= a), t * r < e * n && (t = -t, e = -e, l = -l, u = -u), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * be,
    skewX: Math.atan(l) * be,
    scaleX: u,
    scaleY: a
  };
}
var At;
function hi(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Qt : Ke(e.a, e.b, e.c, e.d, e.e, e.f);
}
function gi(t) {
  return t == null || (At || (At = document.createElementNS("http://www.w3.org/2000/svg", "g")), At.setAttribute("transform", t), !(t = At.transform.baseVal.consolidate())) ? Qt : (t = t.matrix, Ke(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Qe(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, f, m, p, g, d) {
    if (s !== m || f !== p) {
      var x = g.push("translate(", null, e, null, n);
      d.push({ i: x - 4, x: it(s, m) }, { i: x - 2, x: it(f, p) });
    } else
      (m || p) && g.push("translate(" + m + e + p + n);
  }
  function u(s, f, m, p) {
    s !== f ? (s - f > 180 ? f += 360 : f - s > 180 && (s += 360), p.push({ i: m.push(i(m) + "rotate(", null, r) - 2, x: it(s, f) })) : f && m.push(i(m) + "rotate(" + f + r);
  }
  function a(s, f, m, p) {
    s !== f ? p.push({ i: m.push(i(m) + "skewX(", null, r) - 2, x: it(s, f) }) : f && m.push(i(m) + "skewX(" + f + r);
  }
  function l(s, f, m, p, g, d) {
    if (s !== m || f !== p) {
      var x = g.push(i(g) + "scale(", null, ",", null, ")");
      d.push({ i: x - 4, x: it(s, m) }, { i: x - 2, x: it(f, p) });
    } else
      (m !== 1 || p !== 1) && g.push(i(g) + "scale(" + m + "," + p + ")");
  }
  return function(s, f) {
    var m = [], p = [];
    return s = t(s), f = t(f), o(s.translateX, s.translateY, f.translateX, f.translateY, m, p), u(s.rotate, f.rotate, m, p), a(s.skewX, f.skewX, m, p), l(s.scaleX, s.scaleY, f.scaleX, f.scaleY, m, p), s = f = null, function(g) {
      for (var d = -1, x = p.length, h; ++d < x; )
        m[(h = p[d]).i] = h.x(g);
      return m.join("");
    };
  };
}
var pi = Qe(hi, "px, ", "px)", "deg)"), di = Qe(gi, ", ", ")", ")"), yi = 1e-12;
function Ne(t) {
  return ((t = Math.exp(t)) + 1 / t) / 2;
}
function mi(t) {
  return ((t = Math.exp(t)) - 1 / t) / 2;
}
function xi(t) {
  return ((t = Math.exp(2 * t)) - 1) / (t + 1);
}
const _i = function t(e, n, r) {
  function i(o, u) {
    var a = o[0], l = o[1], s = o[2], f = u[0], m = u[1], p = u[2], g = f - a, d = m - l, x = g * g + d * d, h, y;
    if (x < yi)
      y = Math.log(p / s) / e, h = function(F) {
        return [
          a + F * g,
          l + F * d,
          s * Math.exp(e * F * y)
        ];
      };
    else {
      var N = Math.sqrt(x), M = (p * p - s * s + r * x) / (2 * s * n * N), k = (p * p - s * s - r * x) / (2 * p * n * N), C = Math.log(Math.sqrt(M * M + 1) - M), D = Math.log(Math.sqrt(k * k + 1) - k);
      y = (D - C) / e, h = function(F) {
        var A = F * y, T = Ne(C), S = s / (n * N) * (T * xi(e * A + C) - mi(C));
        return [
          a + S * g,
          l + S * d,
          s * T / Ne(e * A + C)
        ];
      };
    }
    return h.duration = y * 1e3 * e / Math.SQRT2, h;
  }
  return i.rho = function(o) {
    var u = Math.max(1e-3, +o), a = u * u, l = a * a;
    return t(u, a, l);
  }, i;
}(Math.SQRT2, 2, 4);
var ht = 0, dt = 0, gt = 0, Ze = 1e3, It, yt, Dt = 0, lt = 0, Ht = 0, vt = typeof performance == "object" && performance.now ? performance : Date, Je = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function re() {
  return lt || (Je(vi), lt = vt.now() + Ht);
}
function vi() {
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
    n = (n == null ? re() : +n) + (e == null ? 0 : +e), !this._next && yt !== this && (yt ? yt._next = this : It = this, yt = this), this._call = t, this._time = n, Zt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Zt());
  }
};
function ie(t, e, n) {
  var r = new Pt();
  return r.restart(t, e, n), r;
}
function wi() {
  re(), ++ht;
  for (var t = It, e; t; )
    (e = lt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --ht;
}
function ke() {
  lt = (Dt = vt.now()) + Ht, ht = dt = 0;
  try {
    wi();
  } finally {
    ht = 0, Ni(), lt = 0;
  }
}
function bi() {
  var t = vt.now(), e = t - Dt;
  e > Ze && (Ht -= e, Dt = t);
}
function Ni() {
  for (var t, e = It, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : It = n);
  yt = t, Zt(r);
}
function Zt(t) {
  if (!ht) {
    dt && (dt = clearTimeout(dt));
    var e = t - lt;
    e > 24 ? (t < 1 / 0 && (dt = setTimeout(ke, t - vt.now() - Ht)), gt && (gt = clearInterval(gt))) : (gt || (Dt = vt.now(), gt = setInterval(bi, Ze)), ht = 1, Je(ke));
  }
}
function Ae(t, e, n) {
  var r = new Pt();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var ki = Xt("start", "end", "cancel", "interrupt"), Ai = [], je = 0, Me = 1, Jt = 2, Tt = 3, ze = 4, jt = 5, St = 6;
function Yt(t, e, n, r, i, o) {
  var u = t.__transition;
  if (!u)
    t.__transition = {};
  else if (n in u)
    return;
  Mi(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: ki,
    tween: Ai,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: je
  });
}
function oe(t, e) {
  var n = G(t, e);
  if (n.state > je)
    throw new Error("too late; already scheduled");
  return n;
}
function Z(t, e) {
  var n = G(t, e);
  if (n.state > Tt)
    throw new Error("too late; already running");
  return n;
}
function G(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e]))
    throw new Error("transition not found");
  return n;
}
function Mi(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = ie(o, 0, n.time);
  function o(s) {
    n.state = Me, n.timer.restart(u, n.delay, n.time), n.delay <= s && u(s - n.delay);
  }
  function u(s) {
    var f, m, p, g;
    if (n.state !== Me)
      return l();
    for (f in r)
      if (g = r[f], g.name === n.name) {
        if (g.state === Tt)
          return Ae(u);
        g.state === ze ? (g.state = St, g.timer.stop(), g.on.call("interrupt", t, t.__data__, g.index, g.group), delete r[f]) : +f < e && (g.state = St, g.timer.stop(), g.on.call("cancel", t, t.__data__, g.index, g.group), delete r[f]);
      }
    if (Ae(function() {
      n.state === Tt && (n.state = ze, n.timer.restart(a, n.delay, n.time), a(s));
    }), n.state = Jt, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Jt) {
      for (n.state = Tt, i = new Array(p = n.tween.length), f = 0, m = -1; f < p; ++f)
        (g = n.tween[f].value.call(t, t.__data__, n.index, n.group)) && (i[++m] = g);
      i.length = m + 1;
    }
  }
  function a(s) {
    for (var f = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(l), n.state = jt, 1), m = -1, p = i.length; ++m < p; )
      i[m].call(t, f);
    n.state === jt && (n.on.call("end", t, t.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = St, n.timer.stop(), delete r[e];
    for (var s in r)
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
function zi(t) {
  return this.each(function() {
    Et(this, t);
  });
}
function Ti(t, e) {
  var n, r;
  return function() {
    var i = Z(this, t), o = i.tween;
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
function Si(t, e, n) {
  var r, i;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var o = Z(this, t), u = o.tween;
    if (u !== r) {
      i = (r = u).slice();
      for (var a = { name: e, value: n }, l = 0, s = i.length; l < s; ++l)
        if (i[l].name === e) {
          i[l] = a;
          break;
        }
      l === s && i.push(a);
    }
    o.tween = i;
  };
}
function Ei(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = G(this.node(), n).tween, i = 0, o = r.length, u; i < o; ++i)
      if ((u = r[i]).name === t)
        return u.value;
    return null;
  }
  return this.each((e == null ? Ti : Si)(n, t, e));
}
function ue(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = Z(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return G(i, r).value[e];
  };
}
function tn(t, e) {
  var n;
  return (typeof e == "number" ? it : e instanceof _t ? we : (n = _t(e)) ? (e = n, we) : ci)(t, e);
}
function $i(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ci(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ri(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = this.getAttribute(t);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function Ii(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = this.getAttributeNS(t.space, t.local);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function Di(t, e, n) {
  var r, i, o;
  return function() {
    var u, a = n(this), l;
    return a == null ? void this.removeAttribute(t) : (u = this.getAttribute(t), l = a + "", u === l ? null : u === r && l === i ? o : (i = l, o = e(r = u, a)));
  };
}
function Pi(t, e, n) {
  var r, i, o;
  return function() {
    var u, a = n(this), l;
    return a == null ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), l = a + "", u === l ? null : u === r && l === i ? o : (i = l, o = e(r = u, a)));
  };
}
function Xi(t, e) {
  var n = Ft(t), r = n === "transform" ? di : tn;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Pi : Di)(n, r, ue(this, "attr." + t, e)) : e == null ? (n.local ? Ci : $i)(n) : (n.local ? Ii : Ri)(n, r, e));
}
function Fi(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Hi(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Yi(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Hi(t, o)), n;
  }
  return i._value = e, i;
}
function Bi(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Fi(t, o)), n;
  }
  return i._value = e, i;
}
function Oi(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (e == null)
    return this.tween(n, null);
  if (typeof e != "function")
    throw new Error();
  var r = Ft(t);
  return this.tween(n, (r.local ? Yi : Bi)(r, e));
}
function Vi(t, e) {
  return function() {
    oe(this, t).delay = +e.apply(this, arguments);
  };
}
function qi(t, e) {
  return e = +e, function() {
    oe(this, t).delay = e;
  };
}
function Li(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Vi : qi)(e, t)) : G(this.node(), e).delay;
}
function Ui(t, e) {
  return function() {
    Z(this, t).duration = +e.apply(this, arguments);
  };
}
function Wi(t, e) {
  return e = +e, function() {
    Z(this, t).duration = e;
  };
}
function Gi(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ui : Wi)(e, t)) : G(this.node(), e).duration;
}
function Ki(t, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    Z(this, t).ease = e;
  };
}
function Qi(t) {
  var e = this._id;
  return arguments.length ? this.each(Ki(e, t)) : G(this.node(), e).ease;
}
function Zi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Z(this, t).ease = n;
  };
}
function Ji(t) {
  if (typeof t != "function")
    throw new Error();
  return this.each(Zi(this._id, t));
}
function ji(t) {
  typeof t != "function" && (t = De(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], u = o.length, a = r[i] = [], l, s = 0; s < u; ++s)
      (l = o[s]) && t.call(l, l.__data__, s, o) && a.push(l);
  return new rt(r, this._parents, this._name, this._id);
}
function to(t) {
  if (t._id !== this._id)
    throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
    for (var l = e[a], s = n[a], f = l.length, m = u[a] = new Array(f), p, g = 0; g < f; ++g)
      (p = l[g] || s[g]) && (m[g] = p);
  for (; a < r; ++a)
    u[a] = e[a];
  return new rt(u, this._parents, this._name, this._id);
}
function eo(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function no(t, e, n) {
  var r, i, o = eo(e) ? oe : Z;
  return function() {
    var u = o(this, t), a = u.on;
    a !== r && (i = (r = a).copy()).on(e, n), u.on = i;
  };
}
function ro(t, e) {
  var n = this._id;
  return arguments.length < 2 ? G(this.node(), n).on.on(t) : this.each(no(n, t, e));
}
function io(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition)
      if (+n !== t)
        return;
    e && e.removeChild(this);
  };
}
function oo() {
  return this.on("end.remove", io(this._id));
}
function uo(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = te(t));
  for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
    for (var a = r[u], l = a.length, s = o[u] = new Array(l), f, m, p = 0; p < l; ++p)
      (f = a[p]) && (m = t.call(f, f.__data__, p, a)) && ("__data__" in f && (m.__data__ = f.__data__), s[p] = m, Yt(s[p], e, n, p, s, G(f, n)));
  return new rt(o, this._parents, e, n);
}
function ao(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Ie(t));
  for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
    for (var l = r[a], s = l.length, f, m = 0; m < s; ++m)
      if (f = l[m]) {
        for (var p = t.call(f, f.__data__, m, l), g, d = G(f, n), x = 0, h = p.length; x < h; ++x)
          (g = p[x]) && Yt(g, e, n, x, p, d);
        o.push(p), u.push(f);
      }
  return new rt(o, u, e, n);
}
var so = wt.prototype.constructor;
function lo() {
  return new so(this._groups, this._parents);
}
function fo(t, e) {
  var n, r, i;
  return function() {
    var o = ct(this, t), u = (this.style.removeProperty(t), ct(this, t));
    return o === u ? null : o === n && u === r ? i : i = e(n = o, r = u);
  };
}
function en(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function co(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var u = ct(this, t);
    return u === i ? null : u === r ? o : o = e(r = u, n);
  };
}
function ho(t, e, n) {
  var r, i, o;
  return function() {
    var u = ct(this, t), a = n(this), l = a + "";
    return a == null && (l = a = (this.style.removeProperty(t), ct(this, t))), u === l ? null : u === r && l === i ? o : (i = l, o = e(r = u, a));
  };
}
function go(t, e) {
  var n, r, i, o = "style." + e, u = "end." + o, a;
  return function() {
    var l = Z(this, t), s = l.on, f = l.value[o] == null ? a || (a = en(e)) : void 0;
    (s !== n || i !== f) && (r = (n = s).copy()).on(u, i = f), l.on = r;
  };
}
function po(t, e, n) {
  var r = (t += "") == "transform" ? pi : tn;
  return e == null ? this.styleTween(t, fo(t, r)).on("end.style." + t, en(t)) : typeof e == "function" ? this.styleTween(t, ho(t, r, ue(this, "style." + t, e))).each(go(this._id, t)) : this.styleTween(t, co(t, r, e), n).on("end.style." + t, null);
}
function yo(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function mo(t, e, n) {
  var r, i;
  function o() {
    var u = e.apply(this, arguments);
    return u !== i && (r = (i = u) && yo(t, u, n)), r;
  }
  return o._value = e, o;
}
function xo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, mo(t, e, n ?? ""));
}
function _o(t) {
  return function() {
    this.textContent = t;
  };
}
function vo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function wo(t) {
  return this.tween("text", typeof t == "function" ? vo(ue(this, "text", t)) : _o(t == null ? "" : t + ""));
}
function bo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function No(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && bo(i)), e;
  }
  return r._value = t, r;
}
function ko(t) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (t == null)
    return this.tween(e, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(e, No(t));
}
function Ao() {
  for (var t = this._name, e = this._id, n = nn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, l, s = 0; s < a; ++s)
      if (l = u[s]) {
        var f = G(l, e);
        Yt(l, t, n, s, u, {
          time: f.time + f.delay + f.duration,
          delay: 0,
          duration: f.duration,
          ease: f.ease
        });
      }
  return new rt(r, this._parents, t, n);
}
function Mo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, u) {
    var a = { value: u }, l = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = Z(this, r), f = s.on;
      f !== t && (e = (t = f).copy(), e._.cancel.push(a), e._.interrupt.push(a), e._.end.push(l)), s.on = e;
    }), i === 0 && o();
  });
}
var zo = 0;
function rt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function nn() {
  return ++zo;
}
var tt = wt.prototype;
rt.prototype = {
  constructor: rt,
  select: uo,
  selectAll: ao,
  selectChild: tt.selectChild,
  selectChildren: tt.selectChildren,
  filter: ji,
  merge: to,
  selection: lo,
  transition: Ao,
  call: tt.call,
  nodes: tt.nodes,
  node: tt.node,
  size: tt.size,
  empty: tt.empty,
  each: tt.each,
  on: ro,
  attr: Xi,
  attrTween: Oi,
  style: po,
  styleTween: xo,
  text: wo,
  textTween: ko,
  remove: oo,
  tween: Ei,
  delay: Li,
  duration: Gi,
  ease: Qi,
  easeVarying: Ji,
  end: Mo,
  [Symbol.iterator]: tt[Symbol.iterator]
};
function To(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var So = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: To
};
function Eo(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function $o(t) {
  var e, n;
  t instanceof rt ? (e = t._id, t = t._name) : (e = nn(), (n = So).time = re(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var u = r[o], a = u.length, l, s = 0; s < a; ++s)
      (l = u[s]) && Yt(l, t, e, s, u, n || Eo(l, e));
  return new rt(r, this._parents, t, e);
}
wt.prototype.interrupt = zi;
wt.prototype.transition = $o;
function Co(t, e) {
  var n, r = 1;
  t == null && (t = 0), e == null && (e = 0);
  function i() {
    var o, u = n.length, a, l = 0, s = 0;
    for (o = 0; o < u; ++o)
      a = n[o], l += a.x, s += a.y;
    for (l = (l / u - t) * r, s = (s / u - e) * r, o = 0; o < u; ++o)
      a = n[o], a.x -= l, a.y -= s;
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
function Ro(t) {
  const e = +this._x.call(null, t), n = +this._y.call(null, t);
  return rn(this.cover(e, n), e, n, t);
}
function rn(t, e, n, r) {
  if (isNaN(e) || isNaN(n))
    return t;
  var i, o = t._root, u = { data: r }, a = t._x0, l = t._y0, s = t._x1, f = t._y1, m, p, g, d, x, h, y, N;
  if (!o)
    return t._root = u, t;
  for (; o.length; )
    if ((x = e >= (m = (a + s) / 2)) ? a = m : s = m, (h = n >= (p = (l + f) / 2)) ? l = p : f = p, i = o, !(o = o[y = h << 1 | x]))
      return i[y] = u, t;
  if (g = +t._x.call(null, o.data), d = +t._y.call(null, o.data), e === g && n === d)
    return u.next = o, i ? i[y] = u : t._root = u, t;
  do
    i = i ? i[y] = new Array(4) : t._root = new Array(4), (x = e >= (m = (a + s) / 2)) ? a = m : s = m, (h = n >= (p = (l + f) / 2)) ? l = p : f = p;
  while ((y = h << 1 | x) === (N = (d >= p) << 1 | g >= m));
  return i[N] = o, i[y] = u, t;
}
function Io(t) {
  var e, n, r = t.length, i, o, u = new Array(r), a = new Array(r), l = 1 / 0, s = 1 / 0, f = -1 / 0, m = -1 / 0;
  for (n = 0; n < r; ++n)
    isNaN(i = +this._x.call(null, e = t[n])) || isNaN(o = +this._y.call(null, e)) || (u[n] = i, a[n] = o, i < l && (l = i), i > f && (f = i), o < s && (s = o), o > m && (m = o));
  if (l > f || s > m)
    return this;
  for (this.cover(l, s).cover(f, m), n = 0; n < r; ++n)
    rn(this, u[n], a[n], t[n]);
  return this;
}
function Do(t, e) {
  if (isNaN(t = +t) || isNaN(e = +e))
    return this;
  var n = this._x0, r = this._y0, i = this._x1, o = this._y1;
  if (isNaN(n))
    i = (n = Math.floor(t)) + 1, o = (r = Math.floor(e)) + 1;
  else {
    for (var u = i - n || 1, a = this._root, l, s; n > t || t >= i || r > e || e >= o; )
      switch (s = (e < r) << 1 | t < n, l = new Array(4), l[s] = a, a = l, u *= 2, s) {
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
function Po() {
  var t = [];
  return this.visit(function(e) {
    if (!e.length)
      do
        t.push(e.data);
      while (e = e.next);
  }), t;
}
function Xo(t) {
  return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
}
function Y(t, e, n, r, i) {
  this.node = t, this.x0 = e, this.y0 = n, this.x1 = r, this.y1 = i;
}
function Fo(t, e, n) {
  var r, i = this._x0, o = this._y0, u, a, l, s, f = this._x1, m = this._y1, p = [], g = this._root, d, x;
  for (g && p.push(new Y(g, i, o, f, m)), n == null ? n = 1 / 0 : (i = t - n, o = e - n, f = t + n, m = e + n, n *= n); d = p.pop(); )
    if (!(!(g = d.node) || (u = d.x0) > f || (a = d.y0) > m || (l = d.x1) < i || (s = d.y1) < o))
      if (g.length) {
        var h = (u + l) / 2, y = (a + s) / 2;
        p.push(
          new Y(g[3], h, y, l, s),
          new Y(g[2], u, y, h, s),
          new Y(g[1], h, a, l, y),
          new Y(g[0], u, a, h, y)
        ), (x = (e >= y) << 1 | t >= h) && (d = p[p.length - 1], p[p.length - 1] = p[p.length - 1 - x], p[p.length - 1 - x] = d);
      } else {
        var N = t - +this._x.call(null, g.data), M = e - +this._y.call(null, g.data), k = N * N + M * M;
        if (k < n) {
          var C = Math.sqrt(n = k);
          i = t - C, o = e - C, f = t + C, m = e + C, r = g.data;
        }
      }
  return r;
}
function Ho(t) {
  if (isNaN(f = +this._x.call(null, t)) || isNaN(m = +this._y.call(null, t)))
    return this;
  var e, n = this._root, r, i, o, u = this._x0, a = this._y0, l = this._x1, s = this._y1, f, m, p, g, d, x, h, y;
  if (!n)
    return this;
  if (n.length)
    for (; ; ) {
      if ((d = f >= (p = (u + l) / 2)) ? u = p : l = p, (x = m >= (g = (a + s) / 2)) ? a = g : s = g, e = n, !(n = n[h = x << 1 | d]))
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
function Yo(t) {
  for (var e = 0, n = t.length; e < n; ++e)
    this.remove(t[e]);
  return this;
}
function Bo() {
  return this._root;
}
function Oo() {
  var t = 0;
  return this.visit(function(e) {
    if (!e.length)
      do
        ++t;
      while (e = e.next);
  }), t;
}
function Vo(t) {
  var e = [], n, r = this._root, i, o, u, a, l;
  for (r && e.push(new Y(r, this._x0, this._y0, this._x1, this._y1)); n = e.pop(); )
    if (!t(r = n.node, o = n.x0, u = n.y0, a = n.x1, l = n.y1) && r.length) {
      var s = (o + a) / 2, f = (u + l) / 2;
      (i = r[3]) && e.push(new Y(i, s, f, a, l)), (i = r[2]) && e.push(new Y(i, o, f, s, l)), (i = r[1]) && e.push(new Y(i, s, u, a, f)), (i = r[0]) && e.push(new Y(i, o, u, s, f));
    }
  return this;
}
function qo(t) {
  var e = [], n = [], r;
  for (this._root && e.push(new Y(this._root, this._x0, this._y0, this._x1, this._y1)); r = e.pop(); ) {
    var i = r.node;
    if (i.length) {
      var o, u = r.x0, a = r.y0, l = r.x1, s = r.y1, f = (u + l) / 2, m = (a + s) / 2;
      (o = i[0]) && e.push(new Y(o, u, a, f, m)), (o = i[1]) && e.push(new Y(o, f, a, l, m)), (o = i[2]) && e.push(new Y(o, u, m, f, s)), (o = i[3]) && e.push(new Y(o, f, m, l, s));
    }
    n.push(r);
  }
  for (; r = n.pop(); )
    t(r.node, r.x0, r.y0, r.x1, r.y1);
  return this;
}
function Lo(t) {
  return t[0];
}
function Uo(t) {
  return arguments.length ? (this._x = t, this) : this._x;
}
function Wo(t) {
  return t[1];
}
function Go(t) {
  return arguments.length ? (this._y = t, this) : this._y;
}
function ae(t, e, n) {
  var r = new se(e ?? Lo, n ?? Wo, NaN, NaN, NaN, NaN);
  return t == null ? r : r.addAll(t);
}
function se(t, e, n, r, i, o) {
  this._x = t, this._y = e, this._x0 = n, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0;
}
function Te(t) {
  for (var e = { data: t.data }, n = e; t = t.next; )
    n = n.next = { data: t.data };
  return e;
}
var O = ae.prototype = se.prototype;
O.copy = function() {
  var t = new se(this._x, this._y, this._x0, this._y0, this._x1, this._y1), e = this._root, n, r;
  if (!e)
    return t;
  if (!e.length)
    return t._root = Te(e), t;
  for (n = [{ source: e, target: t._root = new Array(4) }]; e = n.pop(); )
    for (var i = 0; i < 4; ++i)
      (r = e.source[i]) && (r.length ? n.push({ source: r, target: e.target[i] = new Array(4) }) : e.target[i] = Te(r));
  return t;
};
O.add = Ro;
O.addAll = Io;
O.cover = Do;
O.data = Po;
O.extent = Xo;
O.find = Fo;
O.remove = Ho;
O.removeAll = Yo;
O.root = Bo;
O.size = Oo;
O.visit = Vo;
O.visitAfter = qo;
O.x = Uo;
O.y = Go;
function B(t) {
  return function() {
    return t;
  };
}
function ot(t) {
  return (t() - 0.5) * 1e-6;
}
function Ko(t) {
  return t.x + t.vx;
}
function Qo(t) {
  return t.y + t.vy;
}
function Zo(t) {
  var e, n, r, i = 1, o = 1;
  typeof t != "function" && (t = B(t == null ? 1 : +t));
  function u() {
    for (var s, f = e.length, m, p, g, d, x, h, y = 0; y < o; ++y)
      for (m = ae(e, Ko, Qo).visitAfter(a), s = 0; s < f; ++s)
        p = e[s], x = n[p.index], h = x * x, g = p.x + p.vx, d = p.y + p.vy, m.visit(N);
    function N(M, k, C, D, F) {
      var A = M.data, T = M.r, S = x + T;
      if (A) {
        if (A.index > p.index) {
          var R = g - A.x - A.vx, $ = d - A.y - A.vy, X = R * R + $ * $;
          X < S * S && (R === 0 && (R = ot(r), X += R * R), $ === 0 && ($ = ot(r), X += $ * $), X = (S - (X = Math.sqrt(X))) / X * i, p.vx += (R *= X) * (S = (T *= T) / (h + T)), p.vy += ($ *= X) * S, A.vx -= R * (S = 1 - S), A.vy -= $ * S);
        }
        return;
      }
      return k > g + S || D < g - S || C > d + S || F < d - S;
    }
  }
  function a(s) {
    if (s.data)
      return s.r = n[s.data.index];
    for (var f = s.r = 0; f < 4; ++f)
      s[f] && s[f].r > s.r && (s.r = s[f].r);
  }
  function l() {
    if (e) {
      var s, f = e.length, m;
      for (n = new Array(f), s = 0; s < f; ++s)
        m = e[s], n[m.index] = +t(m, s, e);
    }
  }
  return u.initialize = function(s, f) {
    e = s, r = f, l();
  }, u.iterations = function(s) {
    return arguments.length ? (o = +s, u) : o;
  }, u.strength = function(s) {
    return arguments.length ? (i = +s, u) : i;
  }, u.radius = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : B(+s), l(), u) : t;
  }, u;
}
function Jo(t) {
  return t.index;
}
function Se(t, e) {
  var n = t.get(e);
  if (!n)
    throw new Error("node not found: " + e);
  return n;
}
function jo(t) {
  var e = Jo, n = m, r, i = B(30), o, u, a, l, s, f = 1;
  t == null && (t = []);
  function m(h) {
    return 1 / Math.min(a[h.source.index], a[h.target.index]);
  }
  function p(h) {
    for (var y = 0, N = t.length; y < f; ++y)
      for (var M = 0, k, C, D, F, A, T, S; M < N; ++M)
        k = t[M], C = k.source, D = k.target, F = D.x + D.vx - C.x - C.vx || ot(s), A = D.y + D.vy - C.y - C.vy || ot(s), T = Math.sqrt(F * F + A * A), T = (T - o[M]) / T * h * r[M], F *= T, A *= T, D.vx -= F * (S = l[M]), D.vy -= A * S, C.vx += F * (S = 1 - S), C.vy += A * S;
  }
  function g() {
    if (u) {
      var h, y = u.length, N = t.length, M = new Map(u.map((C, D) => [e(C, D, u), C])), k;
      for (h = 0, a = new Array(y); h < N; ++h)
        k = t[h], k.index = h, typeof k.source != "object" && (k.source = Se(M, k.source)), typeof k.target != "object" && (k.target = Se(M, k.target)), a[k.source.index] = (a[k.source.index] || 0) + 1, a[k.target.index] = (a[k.target.index] || 0) + 1;
      for (h = 0, l = new Array(N); h < N; ++h)
        k = t[h], l[h] = a[k.source.index] / (a[k.source.index] + a[k.target.index]);
      r = new Array(N), d(), o = new Array(N), x();
    }
  }
  function d() {
    if (u)
      for (var h = 0, y = t.length; h < y; ++h)
        r[h] = +n(t[h], h, t);
  }
  function x() {
    if (u)
      for (var h = 0, y = t.length; h < y; ++h)
        o[h] = +i(t[h], h, t);
  }
  return p.initialize = function(h, y) {
    u = h, s = y, g();
  }, p.links = function(h) {
    return arguments.length ? (t = h, g(), p) : t;
  }, p.id = function(h) {
    return arguments.length ? (e = h, p) : e;
  }, p.iterations = function(h) {
    return arguments.length ? (f = +h, p) : f;
  }, p.strength = function(h) {
    return arguments.length ? (n = typeof h == "function" ? h : B(+h), d(), p) : n;
  }, p.distance = function(h) {
    return arguments.length ? (i = typeof h == "function" ? h : B(+h), x(), p) : i;
  }, p;
}
const tu = 1664525, eu = 1013904223, Ee = 4294967296;
function nu() {
  let t = 1;
  return () => (t = (tu * t + eu) % Ee) / Ee;
}
function ru(t) {
  return t.x;
}
function iu(t) {
  return t.y;
}
var ou = 10, uu = Math.PI * (3 - Math.sqrt(5));
function au(t) {
  var e, n = 1, r = 1e-3, i = 1 - Math.pow(r, 1 / 300), o = 0, u = 0.6, a = /* @__PURE__ */ new Map(), l = ie(m), s = Xt("tick", "end"), f = nu();
  t == null && (t = []);
  function m() {
    p(), s.call("tick", e), n < r && (l.stop(), s.call("end", e));
  }
  function p(x) {
    var h, y = t.length, N;
    x === void 0 && (x = 1);
    for (var M = 0; M < x; ++M)
      for (n += (o - n) * i, a.forEach(function(k) {
        k(n);
      }), h = 0; h < y; ++h)
        N = t[h], N.fx == null ? N.x += N.vx *= u : (N.x = N.fx, N.vx = 0), N.fy == null ? N.y += N.vy *= u : (N.y = N.fy, N.vy = 0);
    return e;
  }
  function g() {
    for (var x = 0, h = t.length, y; x < h; ++x) {
      if (y = t[x], y.index = x, y.fx != null && (y.x = y.fx), y.fy != null && (y.y = y.fy), isNaN(y.x) || isNaN(y.y)) {
        var N = ou * Math.sqrt(0.5 + x), M = x * uu;
        y.x = N * Math.cos(M), y.y = N * Math.sin(M);
      }
      (isNaN(y.vx) || isNaN(y.vy)) && (y.vx = y.vy = 0);
    }
  }
  function d(x) {
    return x.initialize && x.initialize(t, f), x;
  }
  return g(), e = {
    tick: p,
    restart: function() {
      return l.restart(m), e;
    },
    stop: function() {
      return l.stop(), e;
    },
    nodes: function(x) {
      return arguments.length ? (t = x, g(), a.forEach(d), e) : t;
    },
    alpha: function(x) {
      return arguments.length ? (n = +x, e) : n;
    },
    alphaMin: function(x) {
      return arguments.length ? (r = +x, e) : r;
    },
    alphaDecay: function(x) {
      return arguments.length ? (i = +x, e) : +i;
    },
    alphaTarget: function(x) {
      return arguments.length ? (o = +x, e) : o;
    },
    velocityDecay: function(x) {
      return arguments.length ? (u = 1 - x, e) : 1 - u;
    },
    randomSource: function(x) {
      return arguments.length ? (f = x, a.forEach(d), e) : f;
    },
    force: function(x, h) {
      return arguments.length > 1 ? (h == null ? a.delete(x) : a.set(x, d(h)), e) : a.get(x);
    },
    find: function(x, h, y) {
      var N = 0, M = t.length, k, C, D, F, A;
      for (y == null ? y = 1 / 0 : y *= y, N = 0; N < M; ++N)
        F = t[N], k = x - F.x, C = h - F.y, D = k * k + C * C, D < y && (A = F, y = D);
      return A;
    },
    on: function(x, h) {
      return arguments.length > 1 ? (s.on(x, h), e) : s.on(x);
    }
  };
}
function su() {
  var t, e, n, r, i = B(-30), o, u = 1, a = 1 / 0, l = 0.81;
  function s(g) {
    var d, x = t.length, h = ae(t, ru, iu).visitAfter(m);
    for (r = g, d = 0; d < x; ++d)
      e = t[d], h.visit(p);
  }
  function f() {
    if (t) {
      var g, d = t.length, x;
      for (o = new Array(d), g = 0; g < d; ++g)
        x = t[g], o[x.index] = +i(x, g, t);
    }
  }
  function m(g) {
    var d = 0, x, h, y = 0, N, M, k;
    if (g.length) {
      for (N = M = k = 0; k < 4; ++k)
        (x = g[k]) && (h = Math.abs(x.value)) && (d += x.value, y += h, N += h * x.x, M += h * x.y);
      g.x = N / y, g.y = M / y;
    } else {
      x = g, x.x = x.data.x, x.y = x.data.y;
      do
        d += o[x.data.index];
      while (x = x.next);
    }
    g.value = d;
  }
  function p(g, d, x, h) {
    if (!g.value)
      return !0;
    var y = g.x - e.x, N = g.y - e.y, M = h - d, k = y * y + N * N;
    if (M * M / l < k)
      return k < a && (y === 0 && (y = ot(n), k += y * y), N === 0 && (N = ot(n), k += N * N), k < u && (k = Math.sqrt(u * k)), e.vx += y * g.value * r / k, e.vy += N * g.value * r / k), !0;
    if (g.length || k >= a)
      return;
    (g.data !== e || g.next) && (y === 0 && (y = ot(n), k += y * y), N === 0 && (N = ot(n), k += N * N), k < u && (k = Math.sqrt(u * k)));
    do
      g.data !== e && (M = o[g.data.index] * r / k, e.vx += y * M, e.vy += N * M);
    while (g = g.next);
  }
  return s.initialize = function(g, d) {
    t = g, n = d, f();
  }, s.strength = function(g) {
    return arguments.length ? (i = typeof g == "function" ? g : B(+g), f(), s) : i;
  }, s.distanceMin = function(g) {
    return arguments.length ? (u = g * g, s) : Math.sqrt(u);
  }, s.distanceMax = function(g) {
    return arguments.length ? (a = g * g, s) : Math.sqrt(a);
  }, s.theta = function(g) {
    return arguments.length ? (l = g * g, s) : Math.sqrt(l);
  }, s;
}
function lu(t) {
  var e = B(0.1), n, r, i;
  typeof t != "function" && (t = B(t == null ? 0 : +t));
  function o(a) {
    for (var l = 0, s = n.length, f; l < s; ++l)
      f = n[l], f.vx += (i[l] - f.x) * r[l] * a;
  }
  function u() {
    if (n) {
      var a, l = n.length;
      for (r = new Array(l), i = new Array(l), a = 0; a < l; ++a)
        r[a] = isNaN(i[a] = +t(n[a], a, n)) ? 0 : +e(n[a], a, n);
    }
  }
  return o.initialize = function(a) {
    n = a, u();
  }, o.strength = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : B(+a), u(), o) : e;
  }, o.x = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : B(+a), u(), o) : t;
  }, o;
}
function fu(t) {
  var e = B(0.1), n, r, i;
  typeof t != "function" && (t = B(t == null ? 0 : +t));
  function o(a) {
    for (var l = 0, s = n.length, f; l < s; ++l)
      f = n[l], f.vy += (i[l] - f.y) * r[l] * a;
  }
  function u() {
    if (n) {
      var a, l = n.length;
      for (r = new Array(l), i = new Array(l), a = 0; a < l; ++a)
        r[a] = isNaN(i[a] = +t(n[a], a, n)) ? 0 : +e(n[a], a, n);
    }
  }
  return o.initialize = function(a) {
    n = a, u();
  }, o.strength = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : B(+a), u(), o) : e;
  }, o.y = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : B(+a), u(), o) : t;
  }, o;
}
function cu(t, e) {
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
const $e = Symbol("implicit");
function on() {
  var t = new le(), e = [], n = [], r = $e;
  function i(o) {
    let u = t.get(o);
    if (u === void 0) {
      if (r !== $e)
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
    return on(e, n).unknown(r);
  }, cu.apply(i, arguments), i;
}
function hu(t) {
  for (var e = t.length / 6 | 0, n = new Array(e), r = 0; r < e; )
    n[r] = "#" + t.slice(r * 6, ++r * 6);
  return n;
}
const gu = hu("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), Mt = (t) => () => t;
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
var un = new nt(1, 0, 0);
nt.prototype;
function qt(t) {
  t.stopImmediatePropagation();
}
function pt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function du(t) {
  return (!t.ctrlKey || t.type === "wheel") && !t.button;
}
function yu() {
  var t = this;
  return t instanceof SVGElement ? (t = t.ownerSVGElement || t, t.hasAttribute("viewBox") ? (t = t.viewBox.baseVal, [[t.x, t.y], [t.x + t.width, t.y + t.height]]) : [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]) : [[0, 0], [t.clientWidth, t.clientHeight]];
}
function Ce() {
  return this.__zoom || un;
}
function mu(t) {
  return -t.deltaY * (t.deltaMode === 1 ? 0.05 : t.deltaMode ? 1 : 2e-3) * (t.ctrlKey ? 10 : 1);
}
function xu() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _u(t, e, n) {
  var r = t.invertX(e[0][0]) - n[0][0], i = t.invertX(e[1][0]) - n[1][0], o = t.invertY(e[0][1]) - n[0][1], u = t.invertY(e[1][1]) - n[1][1];
  return t.translate(
    i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i),
    u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u)
  );
}
function vu() {
  var t = du, e = yu, n = _u, r = mu, i = xu, o = [0, 1 / 0], u = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, l = _i, s = Xt("start", "zoom", "end"), f, m, p, g = 500, d = 150, x = 0, h = 10;
  function y(c) {
    c.property("__zoom", Ce).on("wheel.zoom", A, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", S).filter(i).on("touchstart.zoom", R).on("touchmove.zoom", $).on("touchend.zoom touchcancel.zoom", X).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  y.transform = function(c, b, _, v) {
    var w = c.selection ? c.selection() : c;
    w.property("__zoom", Ce), c !== w ? C(c, b, _, v) : w.interrupt().each(function() {
      D(this, arguments).event(v).start().zoom(null, typeof b == "function" ? b.apply(this, arguments) : b).end();
    });
  }, y.scaleBy = function(c, b, _, v) {
    y.scaleTo(c, function() {
      var w = this.__zoom.k, z = typeof b == "function" ? b.apply(this, arguments) : b;
      return w * z;
    }, _, v);
  }, y.scaleTo = function(c, b, _, v) {
    y.transform(c, function() {
      var w = e.apply(this, arguments), z = this.__zoom, E = _ == null ? k(w) : typeof _ == "function" ? _.apply(this, arguments) : _, I = z.invert(E), P = typeof b == "function" ? b.apply(this, arguments) : b;
      return n(M(N(z, P), E, I), w, u);
    }, _, v);
  }, y.translateBy = function(c, b, _, v) {
    y.transform(c, function() {
      return n(this.__zoom.translate(
        typeof b == "function" ? b.apply(this, arguments) : b,
        typeof _ == "function" ? _.apply(this, arguments) : _
      ), e.apply(this, arguments), u);
    }, null, v);
  }, y.translateTo = function(c, b, _, v, w) {
    y.transform(c, function() {
      var z = e.apply(this, arguments), E = this.__zoom, I = v == null ? k(z) : typeof v == "function" ? v.apply(this, arguments) : v;
      return n(un.translate(I[0], I[1]).scale(E.k).translate(
        typeof b == "function" ? -b.apply(this, arguments) : -b,
        typeof _ == "function" ? -_.apply(this, arguments) : -_
      ), z, u);
    }, v, w);
  };
  function N(c, b) {
    return b = Math.max(o[0], Math.min(o[1], b)), b === c.k ? c : new nt(b, c.x, c.y);
  }
  function M(c, b, _) {
    var v = b[0] - _[0] * c.k, w = b[1] - _[1] * c.k;
    return v === c.x && w === c.y ? c : new nt(c.k, v, w);
  }
  function k(c) {
    return [(+c[0][0] + +c[1][0]) / 2, (+c[0][1] + +c[1][1]) / 2];
  }
  function C(c, b, _, v) {
    c.on("start.zoom", function() {
      D(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      D(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var w = this, z = arguments, E = D(w, z).event(v), I = e.apply(w, z), P = _ == null ? k(I) : typeof _ == "function" ? _.apply(w, z) : _, K = Math.max(I[1][0] - I[0][0], I[1][1] - I[0][1]), H = w.__zoom, L = typeof b == "function" ? b.apply(w, z) : b, J = l(H.invert(P).concat(K / H.k), L.invert(P).concat(K / L.k));
      return function(U) {
        if (U === 1)
          U = L;
        else {
          var j = J(U), Bt = K / j[2];
          U = new nt(Bt, P[0] - j[0] * Bt, P[1] - j[1] * Bt);
        }
        E.zoom(null, U);
      };
    });
  }
  function D(c, b, _) {
    return !_ && c.__zooming || new F(c, b);
  }
  function F(c, b) {
    this.that = c, this.args = b, this.active = 0, this.sourceEvent = null, this.extent = e.apply(c, b), this.taps = 0;
  }
  F.prototype = {
    event: function(c) {
      return c && (this.sourceEvent = c), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(c, b) {
      return this.mouse && c !== "mouse" && (this.mouse[1] = b.invert(this.mouse[0])), this.touch0 && c !== "touch" && (this.touch0[1] = b.invert(this.touch0[0])), this.touch1 && c !== "touch" && (this.touch1[1] = b.invert(this.touch1[0])), this.that.__zoom = b, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(c) {
      var b = et(this.that).datum();
      s.call(
        c,
        this.that,
        new pu(c, {
          sourceEvent: this.sourceEvent,
          target: y,
          type: c,
          transform: this.that.__zoom,
          dispatch: s
        }),
        b
      );
    }
  };
  function A(c, ...b) {
    if (!t.apply(this, arguments))
      return;
    var _ = D(this, b).event(c), v = this.__zoom, w = Math.max(o[0], Math.min(o[1], v.k * Math.pow(2, r.apply(this, arguments)))), z = ut(c);
    if (_.wheel)
      (_.mouse[0][0] !== z[0] || _.mouse[0][1] !== z[1]) && (_.mouse[1] = v.invert(_.mouse[0] = z)), clearTimeout(_.wheel);
    else {
      if (v.k === w)
        return;
      _.mouse = [z, v.invert(z)], Et(this), _.start();
    }
    pt(c), _.wheel = setTimeout(E, d), _.zoom("mouse", n(M(N(v, w), _.mouse[0], _.mouse[1]), _.extent, u));
    function E() {
      _.wheel = null, _.end();
    }
  }
  function T(c, ...b) {
    if (p || !t.apply(this, arguments))
      return;
    var _ = c.currentTarget, v = D(this, b, !0).event(c), w = et(c.view).on("mousemove.zoom", P, !0).on("mouseup.zoom", K, !0), z = ut(c, _), E = c.clientX, I = c.clientY;
    Ur(c.view), qt(c), v.mouse = [z, this.__zoom.invert(z)], Et(this), v.start();
    function P(H) {
      if (pt(H), !v.moved) {
        var L = H.clientX - E, J = H.clientY - I;
        v.moved = L * L + J * J > x;
      }
      v.event(H).zoom("mouse", n(M(v.that.__zoom, v.mouse[0] = ut(H, _), v.mouse[1]), v.extent, u));
    }
    function K(H) {
      w.on("mousemove.zoom mouseup.zoom", null), Wr(H.view, v.moved), pt(H), v.event(H).end();
    }
  }
  function S(c, ...b) {
    if (t.apply(this, arguments)) {
      var _ = this.__zoom, v = ut(c.changedTouches ? c.changedTouches[0] : c, this), w = _.invert(v), z = _.k * (c.shiftKey ? 0.5 : 2), E = n(M(N(_, z), v, w), e.apply(this, b), u);
      pt(c), a > 0 ? et(this).transition().duration(a).call(C, E, v, c) : et(this).call(y.transform, E, v, c);
    }
  }
  function R(c, ...b) {
    if (t.apply(this, arguments)) {
      var _ = c.touches, v = _.length, w = D(this, b, c.changedTouches.length === v).event(c), z, E, I, P;
      for (qt(c), E = 0; E < v; ++E)
        I = _[E], P = ut(I, this), P = [P, this.__zoom.invert(P), I.identifier], w.touch0 ? !w.touch1 && w.touch0[2] !== P[2] && (w.touch1 = P, w.taps = 0) : (w.touch0 = P, z = !0, w.taps = 1 + !!f);
      f && (f = clearTimeout(f)), z && (w.taps < 2 && (m = P[0], f = setTimeout(function() {
        f = null;
      }, g)), Et(this), w.start());
    }
  }
  function $(c, ...b) {
    if (this.__zooming) {
      var _ = D(this, b).event(c), v = c.changedTouches, w = v.length, z, E, I, P;
      for (pt(c), z = 0; z < w; ++z)
        E = v[z], I = ut(E, this), _.touch0 && _.touch0[2] === E.identifier ? _.touch0[0] = I : _.touch1 && _.touch1[2] === E.identifier && (_.touch1[0] = I);
      if (E = _.that.__zoom, _.touch1) {
        var K = _.touch0[0], H = _.touch0[1], L = _.touch1[0], J = _.touch1[1], U = (U = L[0] - K[0]) * U + (U = L[1] - K[1]) * U, j = (j = J[0] - H[0]) * j + (j = J[1] - H[1]) * j;
        E = N(E, Math.sqrt(U / j)), I = [(K[0] + L[0]) / 2, (K[1] + L[1]) / 2], P = [(H[0] + J[0]) / 2, (H[1] + J[1]) / 2];
      } else if (_.touch0)
        I = _.touch0[0], P = _.touch0[1];
      else
        return;
      _.zoom("touch", n(M(E, I, P), _.extent, u));
    }
  }
  function X(c, ...b) {
    if (this.__zooming) {
      var _ = D(this, b).event(c), v = c.changedTouches, w = v.length, z, E;
      for (qt(c), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, g), z = 0; z < w; ++z)
        E = v[z], _.touch0 && _.touch0[2] === E.identifier ? delete _.touch0 : _.touch1 && _.touch1[2] === E.identifier && delete _.touch1;
      if (_.touch1 && !_.touch0 && (_.touch0 = _.touch1, delete _.touch1), _.touch0)
        _.touch0[1] = this.__zoom.invert(_.touch0[0]);
      else if (_.end(), _.taps === 2 && (E = ut(E, this), Math.hypot(m[0] - E[0], m[1] - E[1]) < h)) {
        var I = et(this).on("dblclick.zoom");
        I && I.apply(this, arguments);
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
    return arguments.length ? (l = c, y) : l;
  }, y.on = function() {
    var c = s.on.apply(s, arguments);
    return c === s ? y : c;
  }, y.clickDistance = function(c) {
    return arguments.length ? (x = (c = +c) * c, y) : Math.sqrt(x);
  }, y.tapDistance = function(c) {
    return arguments.length ? (h = +c, y) : h;
  }, y;
}
function wu(t, e, n = {
  sticky: !1,
  drag: !0,
  simulation: null,
  zoom: !1,
  node: {
    border: !0,
    radius: 10,
    borderWidth: 1,
    label: null,
    tooltip: null,
    tooltipFontSize: 20,
    onClick: null,
    onHover: null
  },
  link: {
    color: null,
    width: 1
  }
}) {
  var F;
  const r = t.getBoundingClientRect(), i = r.width, o = r.height;
  let u = {
    k: 1,
    x: 0,
    y: 0
  }, a = vu().scaleExtent([1, 8]).translateExtent([[0, 0], [i, o]]);
  t.setAttribute("width", i), t.setAttribute("height", o);
  let l = n == null ? void 0 : n.simulation;
  const s = on(gu);
  let { links: f, nodes: m } = e, p = ((F = n.node) == null ? void 0 : F.radius) ?? 5;
  const g = () => au(m).force("link", jo(f).id((A) => A.id)).force("charge", su()).force("center", Co(i / 2, o / 2)).force("collide", Zo().radius(p)).force("x", lu(i / 2)).force("y", fu(o / 2));
  l || (l = g());
  const d = t.getContext("2d");
  et(t).call(a);
  const x = (A, T = null) => {
    var S;
    f = A.links, m = A.nodes, T && typeof T == "object" && Object.keys(T).forEach((R) => {
      n[R] = T[R];
    }), d.clearRect(0, 0, i, o), l.stop(), l = null, p = ((S = n.node) == null ? void 0 : S.radius) ?? 10, l = n.simulation ?? g(), l.on("tick", () => {
      C();
    }), n.drag && k();
  };
  let h = {
    rect: null,
    text: null,
    arrow: null
  };
  const y = (A) => {
    var E;
    let T = t.getBoundingClientRect(), S = A.tooltip ?? n.node.tooltip;
    if (typeof S == "function" && (S = S(A)), typeof S != "string")
      throw new TypeError("tooltip should be string");
    let R = ((E = n.node) == null ? void 0 : E.tooltipFontSize) ?? 20;
    d.font = `${R / u.k}px serif`;
    let $ = d.measureText(S), X = 10 / u.k, c = {
      top: 10 / u.k,
      left: 10 / u.k,
      right: 10 / u.k,
      bottom: 10 / u.k
    }, b = c.left + $.width + c.right, _ = c.top + $.actualBoundingBoxAscent + $.actualBoundingBoxDescent + c.bottom, v = A.x - b / 2, w = A.y - X - _ - p, z = 1;
    v + b > T.width && (v = T.width - b), v < 0 && (v = 0), w < 0 && (w = A.y + X + p, z = 0), h.rect = {
      x: v,
      y: w,
      width: b,
      height: _
    }, h.arrow = {
      x: [A.x - 5 / u.k, w + z * (_ - 1 / u.k)],
      y: [A.x + 5 / u.k, w + z * (_ - 1 / u.k)],
      z: [A.x, A.y - z * p]
    }, h.text = {
      x: v + b / 2 - $.width / 2,
      y: w + c.top + _ / 2 - $.actualBoundingBoxDescent,
      content: S
    }, C();
  }, N = (A, T) => {
    let S = m.map((R) => (R.d = Math.sqrt(Math.pow(A - R.x, 2) + Math.pow(T - R.y, 2)), R)).filter((R, $) => {
      let X = typeof p == "function" ? p(R, $) : p;
      return R.d < X;
    });
    return S.length === 0 ? null : (S.sort((R, $) => R.d >= $.d ? 1 : -1), S[0]);
  }, M = (A) => {
    let T = t.getBoundingClientRect();
    A.touches && (A = A.touches[0]);
    let S = (A.clientX - T.left) / (T.right - T.left) * i, R = (A.clientY - T.top) / (T.bottom - T.top) * o;
    return u && (S = (S - u.x) / u.k, R = (R - u.y) / u.k), [S, R];
  }, k = () => {
    let A = !1, T = null, S = et(t), R = null;
    a.on("start", ($) => {
      var _, v;
      $ = $.sourceEvent, $.preventDefault(), A = !0;
      let [X, c] = M($), b = N(X, c);
      b && (T = b, T.fx = X, T.fy = c, (_ = n.node) != null && _.onClick && ((v = n.node) == null || v.onClick(T, $))), $.touches && y(T);
    }).on("end", ($) => {
      $ = $.sourceEvent, A = !1, $.active || l.alphaTarget(0), !n.sticky && T && (T.fx = null, T.fy = null, T = null);
    }).on("zoom", ($) => {
      if (!T || !n.drag || $.sourceEvent.type === "wheel") {
        n.zoom && (u = $.transform, C());
        return;
      }
      let [X, c] = M($.sourceEvent);
      R && clearTimeout(R), R = setTimeout(() => {
        l.alphaTarget(0), A = !1, S.style("cursor", "auto");
      }, 3e3), S.style("cursor", "grabbing"), h.arrow = null, h.rect = null, h.text = null, T.fx = X, T.fy = c, l.alphaTarget(0.3).restart();
    }), S.on("mousemove touchmove", ($) => {
      var _, v, w;
      if ($.preventDefault(), A && T)
        return;
      let [X, c] = M($), b = N(X, c);
      S.style("cursor", b ? "grab" : "auto"), b ? ((_ = n.node) != null && _.onHover && ((v = n.node) == null || v.onHover(b, $)), ((w = n.node) != null && w.tooltip || b.tooltip) && y(b)) : (h.arrow = null, h.rect = null, h.text = null, C());
    });
  };
  function C() {
    var A, T, S, R, $, X, c, b, _;
    d.save(), d.clearRect(0, 0, i, o), u && (d.translate(u.x, u.y), d.scale(u.k, u.k));
    for (let v = 0; v <= f.length - 1; v++) {
      (A = n.link) != null && A.width && (d.lineWidth = ((T = n.link) == null ? void 0 : T.width) / u.k);
      let w = f[v], z = w.color ?? ((S = n.link) == null ? void 0 : S.color);
      d.strokeStyle = z ? typeof z == "function" ? z(w) : z : "black", d.beginPath(), d.moveTo(w.source.x, w.source.y), d.lineTo(w.target.x, w.target.y), d.stroke();
    }
    d.lineWidth = ((R = n.node) == null ? void 0 : R.borderWidth) ?? 1;
    for (let v = 0; v <= m.length - 1; v++) {
      d.strokeStyle = null;
      let w = m[v], z = w.color ?? (($ = n.node) == null ? void 0 : $.color), E = w.radius ?? ((X = n.node) == null ? void 0 : X.radius) ?? 10;
      typeof E == "function" && (E = E(w, v)), d.fillStyle = z ? typeof z == "function" ? z(w, v) : z : s(w.id), d.beginPath(), w.x = Math.max(E, Math.min(i - E, w.x)), w.y = Math.max(E, Math.min(o - E, w.y)), d.arc(w.x, w.y, E, 0, Math.PI * 2), d.fill();
      let I = w.stroke ?? ((c = n.node) == null ? void 0 : c.border);
      I && (d.strokeStyle = typeof I == "string" ? I : "#ffffff", d.stroke()), d.closePath();
      let P = w.label ?? ((b = n.node) == null ? void 0 : b.label);
      P && (d.font = "14px serif", d.fillStyle = "black", d.fillText(typeof P == "function" ? P(w, v) : typeof P == "boolean" ? w.id : P, w.x - p / 2, w.y + p / 2));
    }
    if (h.rect && (d.fillStyle = "white", d.strokeStyle = "black", d.lineWidth = 1 / u.k, d.beginPath(), d.rect(h.rect.x, h.rect.y, h.rect.width, h.rect.height), d.fill(), d.stroke(), d.closePath()), h.arrow && (d.lineWidth = 1 / u.k, d.fillStyle = "white", d.beginPath(), d.moveTo(h.arrow.x[0], h.arrow.x[1]), d.lineTo(h.arrow.y[0], h.arrow.y[1]), d.lineTo(h.arrow.z[0], h.arrow.z[1]), d.fill(), d.closePath(), d.beginPath(), d.moveTo(h.arrow.z[0], h.arrow.z[1]), d.lineTo(h.arrow.x[0], h.arrow.x[1]), d.moveTo(h.arrow.z[0], h.arrow.z[1]), d.lineTo(h.arrow.y[0], h.arrow.y[1]), d.stroke(), d.closePath()), h.text) {
      d.fillStyle = "black";
      let v = ((_ = n.node) == null ? void 0 : _.tooltipFontSize) ?? 20;
      d.font = `${v / u.k}px serif`, d.fillText(h.text.content, h.text.x, h.text.y);
    }
    d.restore();
  }
  return l.on("tick", () => {
    C();
  }), k(), {
    update: x,
    destroy: () => {
      l = null, d.clearRect(0, 0, i, o), a = null;
    }
  };
}
export {
  wu as default
};

#!/usr/bin/env node
'use strict';
const stream = require('stream');
const events = require('events');             
const t = stream.Readable, w = stream.Writable;
const C = events.EventEmitter;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function D(a, c, d, e, f) {
  for (var b = 0; b < f; ++b, ++c, ++e) {
    if (a[c] !== d[e]) {
      return !1;
    }
  }
  return !0;
}
function J(a, c) {
  var d = c.length, e = a.h, f = e.length, b = -a.a, h = e[f - 1], g = a.g, k = a.f;
  if (0 > b) {
    for (; 0 > b && b <= d - f;) {
      var n = b + f - 1;
      n = 0 > n ? a.f[a.a + n] : c[n];
      if (n === h && K(a, c, b, f - 1)) {
        return a.a = 0, ++a.c, b > -a.a ? a.emit("info", !0, k, 0, a.a + b) : a.emit("info", !0), a.b = b + f;
      }
      b += g[n];
    }
    if (0 > b) {
      for (; 0 > b && !K(a, c, b, d - b);) {
        b++;
      }
    }
    if (0 <= b) {
      a.emit("info", !1, k, 0, a.a), a.a = 0;
    } else {
      return e = a.a + b, 0 < e && a.emit("info", !1, k, 0, e), k.copy(k, 0, e, a.a - e), a.a -= e, c.copy(k, a.a), a.a += d, a.b = d;
    }
  }
  for (0 <= b && (b += a.b); b <= d - f;) {
    n = c[b + f - 1];
    if (n === h && c[b] === e[0] && D(e, 0, c, b, f - 1)) {
      return ++a.c, 0 < b ? a.emit("info", !0, c, a.b, b) : a.emit("info", !0), a.b = b + f;
    }
    b += g[n];
  }
  if (b < d) {
    for (; b < d && (c[b] !== e[0] || !D(c, b, e, 0, d - b));) {
      ++b;
    }
    b < d && (c.copy(k, 0, b, b + (d - b)), a.a = d - b);
  }
  0 < b && a.emit("info", !1, c, a.b, b < d ? b : d);
  return a.b = d;
}
function K(a, c, d, e) {
  for (var f = 0; f < e;) {
    var b = d + f;
    if ((0 > b ? a.f[a.a + b] : c[b]) === a.h[f]) {
      ++f;
    } else {
      return !1;
    }
  }
  return !0;
}
class L extends C {
  constructor(a) {
    super();
    "string" === typeof a && (a = new Buffer(a));
    var c, d = a.length;
    this.i = Infinity;
    this.c = 0;
    this.g = Array(256);
    this.a = 0;
    this.h = a;
    this.b = 0;
    this.f = new Buffer(d);
    for (c = 0; 256 > c; ++c) {
      this.g[c] = d;
    }
    if (1 <= d) {
      for (c = 0; c < d - 1; ++c) {
        this.g[a[c]] = d - 1 - c;
      }
    }
  }
  push(a, c = 0) {
    Buffer.isBuffer(a) || (a = new Buffer(a, "binary"));
    var d = a.length;
    for (this.b = c; e !== d && this.c < this.i;) {
      var e = J(this, a);
    }
    return e;
  }
}
;class M extends t {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const aa = Buffer.from("\r\n\r\n"), ba = /\r\n/g, ca = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
function da(a) {
  a.g = !1;
  a.b = "";
  a.a = {};
  a = a.f;
  a.a = 0;
  a.c = 0;
  a.b = 0;
}
class ea extends C {
  constructor(a = {}) {
    super();
    ({maxHeaderPairs:a = 2000} = a);
    this.c = 0;
    this.h = !1;
    this.i = 0;
    this.maxHeaderPairs = a;
    this.b = "";
    this.a = {};
    this.g = !1;
    this.f = new L(aa);
    this.f.on("info", (c, d, e, f) => {
      d && !this.h && (81920 < this.c + (f - e) ? (f = 81920 - this.c, this.c = 81920) : this.c += f - e, 81920 === this.c && (this.h = !0), this.b += d.toString("binary", e, f));
      if (c) {
        if (this.b && this.i !== this.maxHeaderPairs) {
          c = this.b.split(ba);
          d = c.length;
          f = !1;
          for (let h = 0; h < d; ++h) {
            if (0 !== c[h].length) {
              if ("\t" == c[h][0] || " " == c[h][0]) {
                this.a[b][this.a[b].length - 1] += c[h];
              } else {
                if (e = ca.exec(c[h])) {
                  var b = e[1].toLowerCase();
                  e[2] ? void 0 === this.a[b] ? this.a[b] = [e[2]] : this.a[b].push(e[2]) : this.a[b] = [""];
                  if (++this.i === this.maxHeaderPairs) {
                    break;
                  }
                } else {
                  this.b = c[h];
                  f = !0;
                  break;
                }
              }
            }
          }
          f || (this.b = "");
        }
        this.f.c = this.f.i;
        b = this.a;
        this.a = {};
        this.b = "";
        this.g = !0;
        this.c = this.i = 0;
        this.h = !1;
        this.emit("header", b);
      }
    });
  }
  push(a) {
    a = this.f.push(a);
    if (this.g) {
      return a;
    }
  }
}
;/*
 MIT dicer by Brian White
 https://github.com/mscdex/dicer
*/
const fa = Buffer.from("-"), ha = Buffer.from("\r\n"), ia = () => {
};
function ja(a) {
  a.a = void 0;
  a.h = void 0;
  a.g = void 0;
}
function N(a, c, d, e, f) {
  var b, h = 0, g = !0;
  if (!a.a && a.o && d) {
    for (; 2 > a.f && e + h < f;) {
      if (45 === d[e + h]) {
        ++h, ++a.f;
      } else {
        a.f && (b = fa);
        a.f = 0;
        break;
      }
    }
    2 === a.f && (e + h < f && a._events.trailer && a.emit("trailer", d.slice(e + h, f)), ja(a), a.s = !0, 0 === a.u && (a.b = !0, a.emit("finish"), a.b = !1));
    if (a.f) {
      return;
    }
  }
  a.o && (a.o = !1);
  a.a || (a.a = new M(a.C), a.a._read = () => {
    O(a);
  }, h = a.c ? "preamble" : "part", a._events[h] ? a.emit(h, a.a) : a._ignore(), a.c || (a.i = !0));
  d && e < f && !a.j && (a.c || !a.i ? (b && (g = a.a.push(b)), g = a.a.push(d.slice(e, f)), g || (a.m = !0)) : !a.c && a.i && (b && a.g.push(b), b = a.g.push(d.slice(e, f)), !a.i && void 0 !== b && b < f && N(a, !1, d, e + b, f)));
  c && (da(a.g), a.c ? a.c = !1 : (++a.u, a.a.on("end", () => {
    0 === --a.u && (a.s ? (a.b = !0, a.emit("finish"), a.b = !1) : O(a));
  })), a.a.push(null), a.a = void 0, a.j = !1, a.o = !0, a.f = 0);
}
function O(a) {
  if (a.m && (a.m = !1, a.l)) {
    const c = a.l;
    a.l = void 0;
    c();
  }
}
class ka extends w {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.h = void 0;
    this.D = a.headerFirst;
    this.u = this.f = 0;
    this.b = this.s = !1;
    this.c = !0;
    this.o = !1;
    this.i = this.B = !0;
    this.l = this.a = void 0;
    this.j = !1;
    this.C = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.m = !1;
    this.g = new ea(a);
    this.g.on("header", c => {
      this.i = !1;
      this.a.emit("header", c);
    });
  }
  emit(a) {
    "finish" != a || this.b ? w.prototype.emit.apply(this, arguments) : this.s || process.nextTick(() => {
      this.emit("error", Error("Unexpected end of multipart data"));
      this.a && !this.j ? (this.a.emit("error", Error((this.c ? "Preamble" : "Part") + " terminated early due to unexpected end of multipart data")), this.a.push(null), process.nextTick(() => {
        this.b = !0;
        this.emit("finish");
        this.b = !1;
      })) : (this.b = !0, this.emit("finish"), this.b = !1);
    });
    return !1;
  }
  _write(a, c, d) {
    if (!this.g && !this.h) {
      return d();
    }
    if (this.D && this.c) {
      if (this.a || (this.a = new M(this.C), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), c = this.g.push(a), !this.i && void 0 !== c && c < a.length) {
        a = a.slice(c);
      } else {
        return d();
      }
    }
    this.B && (this.h.push(ha), this.B = !1);
    this.h.push(a);
    this.m ? this.l = d : d();
  }
  setBoundary(a) {
    this.h = new L("\r\n--" + a);
    this.h.on("info", (c, d, e, f) => {
      N(this, c, d, e, f);
    });
  }
  _ignore() {
    this.a && !this.j && (this.j = !0, this.a.on("error", ia), this.a.resume());
  }
}
;const {TextDecoder:P} = require("text-decoding"), Q = /%([a-fA-F0-9]{2})/g;
function R(a, c) {
  return String.fromCharCode(parseInt(c, 16));
}
function S(a) {
  let c = [], d = "key", e = "", f = !1, b = !1, h = 0, g = "";
  for (var k = 0, n = a.length; k < n; ++k) {
    if ("\\" === a[k] && f) {
      if (b) {
        b = !1;
      } else {
        b = !0;
        continue;
      }
    } else {
      if ('"' == a[k]) {
        if (b) {
          b = !1;
        } else {
          f ? (f = !1, d = "key") : f = !0;
          continue;
        }
      } else {
        if (b && f && (g += "\\"), b = !1, ("charset" === d || "lang" === d) && "'" === a[k]) {
          "charset" === d ? (d = "lang", e = g.substring(1)) : d = "value";
          g = "";
          continue;
        } else {
          if ("key" == d && ("*" == a[k] || "=" == a[k]) && c.length) {
            d = "*" == a[k] ? "charset" : "value";
            c[h] = [g, void 0];
            g = "";
            continue;
          } else {
            if (!f && ";" == a[k]) {
              d = "key";
              e ? (g.length && (g = T(g.replace(Q, R), e)), e = "") : g.length && (g = T(g, "utf8"));
              void 0 === c[h] ? c[h] = g : c[h][1] = g;
              g = "";
              ++h;
              continue;
            } else {
              if (!f && (" " === a[k] || "\t" === a[k])) {
                continue;
              }
            }
          }
        }
      }
    }
    g += a[k];
  }
  e && g.length ? g = T(g.replace(Q, R), e) : g && (g = T(g, "utf8"));
  void 0 === c[h] ? g && (c[h] = g) : c[h][1] = g;
  return c;
}
function T(a, c) {
  let d;
  if (a) {
    try {
      d = (new P(c)).decode(Buffer.from(a, "binary"));
    } catch (e) {
    }
  }
  return "string" == typeof d ? d : a;
}
const la = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ma = /\+/g;
class na {
  constructor() {
    this.a = void 0;
  }
  write(a) {
    a = a.replace(ma, " ");
    for (var c = "", d = 0, e = 0, f = a.length; d < f; ++d) {
      void 0 !== this.a ? la[a.charCodeAt(d)] ? (this.a += a[d], ++e, 2 === this.a.length && (c += String.fromCharCode(parseInt(this.a, 16)), this.a = void 0)) : (c += "%" + this.a, this.a = void 0, --d) : "%" == a[d] && (d > e && (c += a.substring(e, d), e = d), this.a = "", ++e);
    }
    e < f && void 0 === this.a && (c += a.substring(e));
    return c;
  }
}
function oa(a) {
  if ("string" != typeof a) {
    return "";
  }
  for (let c = a.length - 1; 0 <= c; --c) {
    switch(a.charCodeAt(c)) {
      case 47:
      case 92:
        return a = a.slice(c + 1), ".." == a || "." == a ? "" : a;
    }
  }
  return ".." == a || "." == a ? "" : a;
}
const U = a => {
  const {fieldSize:c = 1048576, fieldNameSize:d = 100, fileSize:e = Infinity, files:f = Infinity, fields:b = Infinity, parts:h = Infinity} = a;
  return {v:c, F:e, G:f, w:b, H:h, A:d};
};
class pa extends w {
  constructor(a = {}) {
    super({...a.highWaterMark ? {highWaterMark:a.highWaterMark} : {}});
    this.a = !1;
    this.b = void 0;
    this.j = this.i = this.f = this.h = !1;
    this.c = a;
    if (a.headers && "string" == typeof a.headers["content-type"]) {
      a: {
        a = a.headers;
        this.b = void 0;
        if (a["content-type"]) {
          const c = S(a["content-type"]);
          let d, e;
          for (let f = 0; f < this.g.length && (e = this.g[f], "function" == typeof e.detect ? d = e.detect(c) : d = e.detect.test(c[0]), !d); ++f) {
          }
          if (d) {
            this.b = new e(this, {limits:this.c.limits, headers:a, parsedConType:c, highWaterMark:this.c.highWaterMark, fileHwm:this.c.fileHwm, defCharset:this.c.defCharset, preservePath:this.c.preservePath});
            break a;
          }
        }
        throw Error("Unsupported content type: " + a["content-type"]);
      }
    } else {
      throw Error("Missing Content-Type");
    }
  }
  emit(a, ...c) {
    if ("finish" == a) {
      if (!this.a) {
        return this.b && this.b.end(), !1;
      }
      if (this.h) {
        return !1;
      }
      this.h = !0;
    }
    return super.emit(a, ...c);
  }
  get g() {
    return [];
  }
  _write(a, c, d) {
    if (!this.b) {
      return d(Error("Not ready to parse. Missing Content-Type?"));
    }
    this.b.write(a, d);
  }
}
;const qa = /^boundary$/i, ra = /^form-data$/i, sa = /^charset$/i, ta = /^filename$/i, ua = /^name$/i;
class va {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:c = {}, preservePath:d, fileHwm:e, parsedConType:f = [], highWaterMark:b}) {
    function h() {
      0 === x && E && !a.a && (E = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let g, k;
    [, f] = f.find(l => Array.isArray(l) && qa.test(l[0])) || [];
    if ("string" != typeof f) {
      throw Error("Multipart: Boundary not found");
    }
    const {H:n, G:wa, F:V, w:xa, v:F} = U(c);
    let y, W = 0, X = 0, x = 0, z, E = !1;
    this.c = this.f = !1;
    this.a = void 0;
    this.h = 0;
    this.g = a;
    this.b = new ka({boundary:f, maxHeaderPairs:c.headerPairs, highWaterMark:b, fileHwm:e});
    this.b.on("drain", () => {
      this.f = !1;
      if (this.a && !this.c) {
        const l = this.a;
        this.a = void 0;
        l();
      }
    }).on("error", l => {
      a.emit("error", l);
    }).on("finish", () => {
      E = !0;
      h();
    });
    const Y = l => {
      if (++this.h > n) {
        return this.b.removeListener("part", Y), this.b.on("part", Z), a.j = !0, a.emit("partsLimit"), Z(l);
      }
      if (z) {
        const m = z;
        m.emit("end");
        m.removeAllListeners("end");
      }
      l.on("header", m => {
        let A = "text/plain", G = "7bit", H;
        let B = 0;
        if (m["content-type"]) {
          var q = S(m["content-type"][0]);
          if (q[0]) {
            for (A = q[0].toLowerCase(), g = 0, k = q.length; g < k && !sa.test(q[g][0]); ++g) {
            }
          }
        }
        if (m["content-disposition"]) {
          q = S(m["content-disposition"][0]);
          if (!ra.test(q[0])) {
            return Z(l);
          }
          g = 0;
          for (k = q.length; g < k; ++g) {
            if (ua.test(q[g][0])) {
              H = q[g][1];
            } else {
              if (ta.test(q[g][0])) {
                var v = q[g][1];
                d || (v = oa(v));
              }
            }
          }
        } else {
          return Z(l);
        }
        m["content-transfer-encoding"] && (G = m["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == A || void 0 !== v) {
          if (W == wa) {
            return a.i || (a.i = !0, a.emit("filesLimit")), Z(l);
          }
          ++W;
          if (!a._events.file) {
            this.b._ignore();
            return;
          }
          ++x;
          const p = new ya({highWaterMark:e});
          y = p;
          p.on("end", () => {
            --x;
            this.c = !1;
            h();
            if (this.a && !this.f) {
              const r = this.a;
              this.a = void 0;
              r();
            }
          });
          p._read = () => {
            if (this.c && (this.c = !1, this.a && !this.f)) {
              const r = this.a;
              this.a = void 0;
              r();
            }
          };
          a.emit("file", H, p, v, G, A, l);
          m = r => {
            if ((B += r.length) > V) {
              const u = V - (B - r.length);
              0 < u && p.push(r.slice(0, u));
              p.emit("limit");
              p.truncated = !0;
              l.removeAllListeners("data");
            } else {
              p.push(r) || (this.c = !0);
            }
          };
          v = () => {
            y = void 0;
            p.push(null);
          };
        } else {
          if (X == xa) {
            return a.f || (a.f = !0, a.emit("fieldsLimit")), Z(l);
          }
          ++X;
          ++x;
          const p = [];
          let r = !1;
          z = l;
          m = u => {
            let I = u;
            B += u.length;
            B > F && (I = Buffer.from(u, 0, F).slice(0, F), r = !0, l.removeAllListeners("data"));
            p.push(I);
          };
          v = () => {
            z = void 0;
            var u = Buffer.concat(p);
            try {
              u = (new P(void 0)).decode(u);
            } catch (I) {
            }
            a.emit("field", H, u, !1, r, G, A);
            --x;
            h();
          };
        }
        l._readableState.sync = !1;
        l.on("data", m);
        l.on("end", v);
      }).on("error", m => {
        y && y.emit("error", m);
      });
    };
    this.b.on("part", Y);
  }
  end() {
    0 !== this.h || this.g.a ? this.b.writable && this.b.end() : process.nextTick(() => {
      this.g.a = !0;
      this.g.emit("finish");
    });
  }
  write(a, c) {
    (a = this.b.write(a)) && !this.c ? c() : (this.f = !a, this.a = c);
  }
}
function Z(a) {
  a.resume();
}
class ya extends t {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const za = /^charset$/i;
class Aa {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:c = {}, parsedConType:d, defCharset:e = "utf8"}) {
    this.f = a;
    this.h = void 0;
    const {v:f, A:b, w:h} = U(c);
    this.v = f;
    this.A = b;
    this.w = h;
    a = e;
    for (let g = 0, k = d.length; g < k; ++g) {
      if (Array.isArray(d[g]) && za.test(d[g][0])) {
        a = d[g][1].toLowerCase();
        break;
      }
    }
    this.g = new na;
    this.j = a;
    this.m = 0;
    this.o = "key";
    this.b = !0;
    this.s = this.l = 0;
    this.c = this.a = "";
    this.u = this.i = !1;
  }
  write(a, c) {
    if (this.m === this.w) {
      return this.f.f || (this.f.f = !0, this.f.emit("fieldsLimit")), c();
    }
    for (var d, e, f, b = 0, h = a.length; b < h;) {
      if ("key" == this.o) {
        d = e = void 0;
        for (f = b; f < h; ++f) {
          this.b || ++b;
          if (61 === a[f]) {
            d = f;
            break;
          } else {
            if (38 === a[f]) {
              e = f;
              break;
            }
          }
          if (this.b && this.l === this.A) {
            this.h = !0;
            break;
          } else {
            this.b && ++this.l;
          }
        }
        if (void 0 !== d) {
          d > b && (this.a += this.g.write(a.toString("binary", b, d))), this.o = "val", this.h = !1, this.b = !0, this.c = "", this.s = 0, this.u = !1, this.g.a = void 0, b = d + 1;
        } else {
          if (void 0 !== e) {
            if (++this.m, d = this.i, b = e > b ? this.a += this.g.write(a.toString("binary", b, e)) : this.a, this.h = !1, this.b = !0, this.a = "", this.l = 0, this.i = !1, this.g.a = void 0, b.length && this.f.emit("field", T(b, this.j), "", d, !1), b = e + 1, this.m === this.w) {
              return c();
            }
          } else {
            this.h ? (f > b && (this.a += this.g.write(a.toString("binary", b, f))), b = f, (this.l = this.a.length) === this.A && (this.b = !1, this.i = !0)) : (b < h && (this.a += this.g.write(a.toString("binary", b))), b = h);
          }
        }
      } else {
        e = void 0;
        for (f = b; f < h; ++f) {
          this.b || ++b;
          if (38 === a[f]) {
            e = f;
            break;
          }
          if (this.b && this.s === this.v) {
            this.h = !0;
            break;
          } else {
            this.b && ++this.s;
          }
        }
        if (void 0 !== e) {
          if (++this.m, e > b && (this.c += this.g.write(a.toString("binary", b, e))), this.f.emit("field", T(this.a, this.j), T(this.c, this.j), this.i, this.u), this.o = "key", this.h = !1, this.b = !0, this.a = "", this.l = 0, this.i = !1, this.g.a = void 0, b = e + 1, this.m === this.w) {
            return c();
          }
        } else {
          if (this.h) {
            if (f > b && (this.c += this.g.write(a.toString("binary", b, f))), b = f, "" === this.c && 0 === this.v || (this.s = this.c.length) === this.v) {
              this.b = !1, this.u = !0;
            }
          } else {
            b < h && (this.c += this.g.write(a.toString("binary", b))), b = h;
          }
        }
      }
    }
    c();
  }
  end() {
    this.f.a || ("key" == this.o && 0 < this.a.length ? this.f.emit("field", T(this.a, this.j), "", this.i, !1) : "val" == this.o && this.f.emit("field", T(this.a, this.j), T(this.c, this.j), this.i, this.u), this.f.a = !0, this.f.emit("finish"));
  }
}
;class Ba extends pa {
  constructor(a) {
    super(a);
  }
  get g() {
    return [va, Aa];
  }
}
;module.exports = Ba;


//# sourceMappingURL=busboy.js.map
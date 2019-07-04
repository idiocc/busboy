'use strict';
let DEPACK_EXPORT;
const stream = require('stream');
const events = require('events');'use strict';
const {Readable:r, Writable:v} = stream;
const {EventEmitter:C} = events;
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
function aa(a, c) {
  var d = c.length, e = a.h, f = e.length, b = -a.a, g = e[f - 1], h = a.g, k = a.f;
  if (0 > b) {
    for (; 0 > b && b <= d - f;) {
      var m = b + f - 1;
      m = 0 > m ? a.f[a.a + m] : c[m];
      if (m === g && H(a, c, b, f - 1)) {
        return a.a = 0, ++a.c, b > -a.a ? a.emit("info", !0, k, 0, a.a + b) : a.emit("info", !0), a.b = b + f;
      }
      b += h[m];
    }
    if (0 > b) {
      for (; 0 > b && !H(a, c, b, d - b);) {
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
    m = c[b + f - 1];
    if (m === g && c[b] === e[0] && D(e, 0, c, b, f - 1)) {
      return ++a.c, 0 < b ? a.emit("info", !0, c, a.b, b) : a.emit("info", !0), a.b = b + f;
    }
    b += h[m];
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
function H(a, c, d, e) {
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
class I extends C {
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
      var e = aa(this, a);
    }
    return e;
  }
}
;class J extends r {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const ba = Buffer.from("\r\n\r\n"), ca = /\r\n/g, da = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
function ea(a) {
  a.g = !1;
  a.b = "";
  a.a = {};
  a = a.f;
  a.a = 0;
  a.c = 0;
  a.b = 0;
}
class fa extends C {
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
    this.f = new I(ba);
    this.f.on("info", (c, d, e, f) => {
      d && !this.h && (81920 < this.c + (f - e) ? (f = 81920 - this.c, this.c = 81920) : this.c += f - e, 81920 === this.c && (this.h = !0), this.b += d.toString("binary", e, f));
      if (c) {
        if (this.b && this.i !== this.maxHeaderPairs) {
          c = this.b.split(ca);
          d = c.length;
          f = !1;
          for (let g = 0; g < d; ++g) {
            if (0 !== c[g].length) {
              if ("\t" == c[g][0] || " " == c[g][0]) {
                this.a[b][this.a[b].length - 1] += c[g];
              } else {
                if (e = da.exec(c[g])) {
                  var b = e[1].toLowerCase();
                  e[2] ? void 0 === this.a[b] ? this.a[b] = [e[2]] : this.a[b].push(e[2]) : this.a[b] = [""];
                  if (++this.i === this.maxHeaderPairs) {
                    break;
                  }
                } else {
                  this.b = c[g];
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
const ha = Buffer.from("-"), ia = Buffer.from("\r\n"), ja = () => {
};
function ka(a) {
  a.a = void 0;
  a.h = void 0;
  a.g = void 0;
}
function K(a, c, d, e, f) {
  var b, g = 0, h = !0;
  if (!a.a && a.o && d) {
    for (; 2 > a.f && e + g < f;) {
      if (45 === d[e + g]) {
        ++g, ++a.f;
      } else {
        a.f && (b = ha);
        a.f = 0;
        break;
      }
    }
    2 === a.f && (e + g < f && a._events.trailer && a.emit("trailer", d.slice(e + g, f)), ka(a), a.s = !0, 0 === a.u && (a.b = !0, a.emit("finish"), a.b = !1));
    if (a.f) {
      return;
    }
  }
  a.o && (a.o = !1);
  a.a || (a.a = new J(a.C), a.a._read = () => {
    L(a);
  }, g = a.c ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.c || (a.i = !0));
  d && e < f && !a.j && (a.c || !a.i ? (b && (h = a.a.push(b)), h = a.a.push(d.slice(e, f)), h || (a.m = !0)) : !a.c && a.i && (b && a.g.push(b), b = a.g.push(d.slice(e, f)), !a.i && void 0 !== b && b < f && K(a, !1, d, e + b, f)));
  c && (ea(a.g), a.c ? a.c = !1 : (++a.u, a.a.on("end", () => {
    0 === --a.u && (a.s ? (a.b = !0, a.emit("finish"), a.b = !1) : L(a));
  })), a.a.push(null), a.a = void 0, a.j = !1, a.o = !0, a.f = 0);
}
function L(a) {
  if (a.m && (a.m = !1, a.l)) {
    const c = a.l;
    a.l = void 0;
    c();
  }
}
class la extends v {
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
    this.g = new fa(a);
    this.g.on("header", c => {
      this.i = !1;
      this.a.emit("header", c);
    });
  }
  emit(a) {
    "finish" != a || this.b ? v.prototype.emit.apply(this, arguments) : this.s || process.nextTick(() => {
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
      if (this.a || (this.a = new J(this.C), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), c = this.g.push(a), !this.i && void 0 !== c && c < a.length) {
        a = a.slice(c);
      } else {
        return d();
      }
    }
    this.B && (this.h.push(ia), this.B = !1);
    this.h.push(a);
    this.m ? this.l = d : d();
  }
  setBoundary(a) {
    this.h = new I("\r\n--" + a);
    this.h.on("info", (c, d, e, f) => {
      K(this, c, d, e, f);
    });
  }
  _ignore() {
    this.a && !this.j && (this.j = !0, this.a.on("error", ja), this.a.resume());
  }
}
;const {TextDecoder:ma} = require("text-decoding"), M = /%([a-fA-F0-9]{2})/g;
function N(a, c) {
  return String.fromCharCode(parseInt(c, 16));
}
function O(a) {
  let c = [], d = "key", e = "", f = !1, b = !1, g = 0, h = "";
  for (var k = 0, m = a.length; k < m; ++k) {
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
        if (b && f && (h += "\\"), b = !1, ("charset" === d || "lang" === d) && "'" === a[k]) {
          "charset" === d ? (d = "lang", e = h.substring(1)) : d = "value";
          h = "";
          continue;
        } else {
          if ("key" == d && ("*" == a[k] || "=" == a[k]) && c.length) {
            d = "*" == a[k] ? "charset" : "value";
            c[g] = [h, void 0];
            h = "";
            continue;
          } else {
            if (!f && ";" == a[k]) {
              d = "key";
              e && (h.length && (h = P(h.replace(M, N), e)), e = "");
              void 0 === c[g] ? c[g] = h : c[g][1] = h;
              h = "";
              ++g;
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
    h += a[k];
  }
  e && h.length && (h = P(h.replace(M, N), e));
  void 0 === c[g] ? h && (c[g] = h) : c[g][1] = h;
  return c;
}
function P(a, c) {
  let d;
  if (a) {
    try {
      d = (new ma(c)).decode(Buffer.from(a, "binary"));
    } catch (e) {
    }
  }
  return "string" == typeof d ? d : a;
}
const na = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], oa = /\+/g;
class pa {
  constructor() {
    this.a = void 0;
  }
  write(a) {
    a = a.replace(oa, " ");
    for (var c = "", d = 0, e = 0, f = a.length; d < f; ++d) {
      void 0 !== this.a ? na[a.charCodeAt(d)] ? (this.a += a[d], ++e, 2 === this.a.length && (c += String.fromCharCode(parseInt(this.a, 16)), this.a = void 0)) : (c += "%" + this.a, this.a = void 0, --d) : "%" == a[d] && (d > e && (c += a.substring(e, d), e = d), this.a = "", ++e);
    }
    e < f && void 0 === this.a && (c += a.substring(e));
    return c;
  }
}
function qa(a) {
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
const Q = a => {
  const {fieldSize:c = 1048576, fieldNameSize:d = 100, fileSize:e = Infinity, files:f = Infinity, fields:b = Infinity, parts:g = Infinity} = a;
  return {v:c, F:e, G:f, w:b, H:g, A:d};
};
class ra extends v {
  constructor(a) {
    a = void 0 === a ? {} : a;
    super(Object.assign({}, a.highWaterMark ? {highWaterMark:a.highWaterMark} : {}));
    this.a = !1;
    this.b = void 0;
    this.j = this.i = this.f = this.h = !1;
    this.c = a;
    if (a.headers && "string" == typeof a.headers["content-type"]) {
      a: {
        a = a.headers;
        this.b = void 0;
        if (a["content-type"]) {
          const c = O(a["content-type"]);
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
;const sa = /^boundary$/i, ta = /^form-data$/i, ua = /^charset$/i, va = /^filename$/i, wa = /^name$/i;
class xa {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:c = {}, defCharset:d = "utf8", preservePath:e, fileHwm:f, parsedConType:b = [], highWaterMark:g}) {
    function h() {
      0 === x && E && !a.a && (E = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let k, m;
    [, b] = b.find(l => Array.isArray(l) && sa.test(l[0])) || [];
    if ("string" != typeof b) {
      throw Error("Multipart: Boundary not found");
    }
    const {H:ya, G:za, F:S, w:Aa, v:T} = Q(c);
    let y, U = 0, V = 0, x = 0, z, E = !1;
    this.c = this.f = !1;
    this.a = void 0;
    this.h = 0;
    this.g = a;
    this.b = new la({boundary:b, maxHeaderPairs:c.headerPairs, highWaterMark:g, fileHwm:f});
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
    const W = l => {
      if (++this.h > ya) {
        return this.b.removeListener("part", W), this.b.on("part", R), a.j = !0, a.emit("partsLimit"), R(l);
      }
      if (z) {
        const n = z;
        n.emit("end");
        n.removeAllListeners("end");
      }
      l.on("header", n => {
        let A = "text/plain", X = d, F = "7bit", G;
        let B = 0;
        if (n["content-type"]) {
          var q = O(n["content-type"][0]);
          if (q[0]) {
            for (A = q[0].toLowerCase(), k = 0, m = q.length; k < m; ++k) {
              if (ua.test(q[k][0])) {
                X = q[k][1].toLowerCase();
                break;
              }
            }
          }
        }
        if (n["content-disposition"]) {
          q = O(n["content-disposition"][0]);
          if (!ta.test(q[0])) {
            return R(l);
          }
          k = 0;
          for (m = q.length; k < m; ++k) {
            if (wa.test(q[k][0])) {
              G = P(q[k][1], "utf8");
            } else {
              if (va.test(q[k][0])) {
                var u = P(q[k][1], "utf8");
                e || (u = qa(u));
              }
            }
          }
        } else {
          return R(l);
        }
        n["content-transfer-encoding"] && (F = n["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == A || void 0 !== u) {
          if (U === za) {
            return a.i || (a.i = !0, a.emit("filesLimit")), R(l);
          }
          ++U;
          if (!a._events.file) {
            this.b._ignore();
            return;
          }
          ++x;
          const p = new Ba({highWaterMark:f});
          y = p;
          p.on("end", () => {
            --x;
            this.c = !1;
            h();
            if (this.a && !this.f) {
              const t = this.a;
              this.a = void 0;
              t();
            }
          });
          p._read = () => {
            if (this.c && (this.c = !1, this.a && !this.f)) {
              const t = this.a;
              this.a = void 0;
              t();
            }
          };
          a.emit("file", G, p, u, F, A);
          n = t => {
            if ((B += t.length) > S) {
              var Y = S - (B - t.length);
              0 < Y && p.push(t.slice(0, Y));
              p.emit("limit");
              p.truncated = !0;
              l.removeAllListeners("data");
            } else {
              p.push(t) || (this.c = !0);
            }
          };
          u = () => {
            y = void 0;
            p.push(null);
          };
        } else {
          if (V === Aa) {
            return a.f || (a.f = !0, a.emit("fieldsLimit")), R(l);
          }
          ++V;
          ++x;
          var w = "", Z = !1;
          z = l;
          n = p => {
            (B += p.length) > T ? (w += p.toString("binary", 0, T - (B - p.length)), Z = !0, l.removeAllListeners("data")) : w += p.toString("binary");
          };
          u = () => {
            z = void 0;
            w.length && (w = P(w, X));
            a.emit("field", G, w, !1, Z, F, A);
            --x;
            h();
          };
        }
        l._readableState.sync = !1;
        l.on("data", n);
        l.on("end", u);
      }).on("error", n => {
        y && y.emit("error", n);
      });
    };
    this.b.on("part", W);
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
function R(a) {
  a.resume();
}
class Ba extends r {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const Ca = /^charset$/i;
class Da {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:c = {}, parsedConType:d, defCharset:e = "utf8"}) {
    this.f = a;
    this.h = void 0;
    const {v:f, A:b, w:g} = Q(c);
    this.v = f;
    this.A = b;
    this.w = g;
    a = e;
    for (let h = 0, k = d.length; h < k; ++h) {
      if (Array.isArray(d[h]) && Ca.test(d[h][0])) {
        a = d[h][1].toLowerCase();
        break;
      }
    }
    this.g = new pa;
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
    for (var d, e, f, b = 0, g = a.length; b < g;) {
      if ("key" == this.o) {
        d = e = void 0;
        for (f = b; f < g; ++f) {
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
            if (++this.m, d = this.i, b = e > b ? this.a += this.g.write(a.toString("binary", b, e)) : this.a, this.h = !1, this.b = !0, this.a = "", this.l = 0, this.i = !1, this.g.a = void 0, b.length && this.f.emit("field", P(b, this.j), "", d, !1), b = e + 1, this.m === this.w) {
              return c();
            }
          } else {
            this.h ? (f > b && (this.a += this.g.write(a.toString("binary", b, f))), b = f, (this.l = this.a.length) === this.A && (this.b = !1, this.i = !0)) : (b < g && (this.a += this.g.write(a.toString("binary", b))), b = g);
          }
        }
      } else {
        e = void 0;
        for (f = b; f < g; ++f) {
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
          if (++this.m, e > b && (this.c += this.g.write(a.toString("binary", b, e))), this.f.emit("field", P(this.a, this.j), P(this.c, this.j), this.i, this.u), this.o = "key", this.h = !1, this.b = !0, this.a = "", this.l = 0, this.i = !1, this.g.a = void 0, b = e + 1, this.m === this.w) {
            return c();
          }
        } else {
          if (this.h) {
            if (f > b && (this.c += this.g.write(a.toString("binary", b, f))), b = f, "" === this.c && 0 === this.v || (this.s = this.c.length) === this.v) {
              this.b = !1, this.u = !0;
            }
          } else {
            b < g && (this.c += this.g.write(a.toString("binary", b))), b = g;
          }
        }
      }
    }
    c();
  }
  end() {
    this.f.a || ("key" == this.o && 0 < this.a.length ? this.f.emit("field", P(this.a, this.j), "", this.i, !1) : "val" == this.o && this.f.emit("field", P(this.a, this.j), P(this.c, this.j), this.i, this.u), this.f.a = !0, this.f.emit("finish"));
  }
}
;class Ea extends ra {
  constructor(a) {
    super(a);
  }
  get g() {
    return [xa, Da];
  }
}
;DEPACK_EXPORT = Ea;


module.exports = DEPACK_EXPORT
var yt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Bt(et) {
  return et && et.__esModule && Object.prototype.hasOwnProperty.call(et, "default") ? et.default : et;
}
function wt(et) {
  throw new Error('Could not dynamically require "' + et + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ct = { exports: {} };
/*!

JSZip v3.10.2 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/
(function(et, lt) {
  (function(p) {
    et.exports = p();
  })(function() {
    return function p(N, w, l) {
      function o(g, v) {
        if (!w[g]) {
          if (!N[g]) {
            var m = typeof wt == "function" && wt;
            if (!v && m) return m(g, !0);
            if (r) return r(g, !0);
            var b = new Error("Cannot find module '" + g + "'");
            throw b.code = "MODULE_NOT_FOUND", b;
          }
          var i = w[g] = { exports: {} };
          N[g][0].call(i.exports, function(d) {
            var n = N[g][1][d];
            return o(n || d);
          }, i, i.exports, p, N, w, l);
        }
        return w[g].exports;
      }
      for (var r = typeof wt == "function" && wt, u = 0; u < l.length; u++) o(l[u]);
      return o;
    }({ 1: [function(p, N, w) {
      var l = p("./utils"), o = p("./support"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      w.encode = function(u) {
        for (var g, v, m, b, i, d, n, h = [], a = 0, c = u.length, y = c, S = l.getTypeOf(u) !== "string"; a < u.length; ) y = c - a, m = S ? (g = u[a++], v = a < c ? u[a++] : 0, a < c ? u[a++] : 0) : (g = u.charCodeAt(a++), v = a < c ? u.charCodeAt(a++) : 0, a < c ? u.charCodeAt(a++) : 0), b = g >> 2, i = (3 & g) << 4 | v >> 4, d = 1 < y ? (15 & v) << 2 | m >> 6 : 64, n = 2 < y ? 63 & m : 64, h.push(r.charAt(b) + r.charAt(i) + r.charAt(d) + r.charAt(n));
        return h.join("");
      }, w.decode = function(u) {
        var g, v, m, b, i, d, n = 0, h = 0, a = "data:";
        if (u.substr(0, a.length) === a) throw new Error("Invalid base64 input, it looks like a data url.");
        var c, y = 3 * (u = u.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
        if (u.charAt(u.length - 1) === r.charAt(64) && y--, u.charAt(u.length - 2) === r.charAt(64) && y--, y % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
        for (c = o.uint8array ? new Uint8Array(0 | y) : new Array(0 | y); n < u.length; ) g = r.indexOf(u.charAt(n++)) << 2 | (b = r.indexOf(u.charAt(n++))) >> 4, v = (15 & b) << 4 | (i = r.indexOf(u.charAt(n++))) >> 2, m = (3 & i) << 6 | (d = r.indexOf(u.charAt(n++))), c[h++] = g, i !== 64 && (c[h++] = v), d !== 64 && (c[h++] = m);
        return c;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(p, N, w) {
      var l = p("./external"), o = p("./stream/DataWorker"), r = p("./stream/Crc32Probe"), u = p("./stream/DataLengthProbe");
      function g(v, m, b, i, d) {
        this.compressedSize = v, this.uncompressedSize = m, this.crc32 = b, this.compression = i, this.compressedContent = d;
      }
      g.prototype = { getContentWorker: function() {
        var v = new o(l.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")), m = this;
        return v.on("end", function() {
          if (this.streamInfo.data_length !== m.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
        }), v;
      }, getCompressedWorker: function() {
        return new o(l.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, g.createWorkerFrom = function(v, m, b) {
        return v.pipe(new r()).pipe(new u("uncompressedSize")).pipe(m.compressWorker(b)).pipe(new u("compressedSize")).withStreamInfo("compression", m);
      }, N.exports = g;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(p, N, w) {
      var l = p("./stream/GenericWorker");
      w.STORE = { magic: "\0\0", compressWorker: function() {
        return new l("STORE compression");
      }, uncompressWorker: function() {
        return new l("STORE decompression");
      } }, w.DEFLATE = p("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(p, N, w) {
      var l = p("./utils"), o = function() {
        for (var r, u = [], g = 0; g < 256; g++) {
          r = g;
          for (var v = 0; v < 8; v++) r = 1 & r ? 3988292384 ^ r >>> 1 : r >>> 1;
          u[g] = r;
        }
        return u;
      }();
      N.exports = function(r, u) {
        return r !== void 0 && r.length ? l.getTypeOf(r) !== "string" ? function(g, v, m, b) {
          var i = o, d = b + m;
          g ^= -1;
          for (var n = b; n < d; n++) g = g >>> 8 ^ i[255 & (g ^ v[n])];
          return -1 ^ g;
        }(0 | u, r, r.length, 0) : function(g, v, m, b) {
          var i = o, d = b + m;
          g ^= -1;
          for (var n = b; n < d; n++) g = g >>> 8 ^ i[255 & (g ^ v.charCodeAt(n))];
          return -1 ^ g;
        }(0 | u, r, r.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(p, N, w) {
      w.base64 = !1, w.binary = !1, w.dir = !1, w.createFolders = !0, w.date = null, w.compression = null, w.compressionOptions = null, w.comment = null, w.unixPermissions = null, w.dosPermissions = null;
    }, {}], 6: [function(p, N, w) {
      var l = null;
      l = typeof Promise < "u" ? Promise : p("lie"), N.exports = { Promise: l };
    }, { lie: 37 }], 7: [function(p, N, w) {
      var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", o = p("pako"), r = p("./utils"), u = p("./stream/GenericWorker"), g = l ? "uint8array" : "array";
      function v(m, b) {
        u.call(this, "FlateWorker/" + m), this._pako = null, this._pakoAction = m, this._pakoOptions = b, this.meta = {};
      }
      w.magic = "\b\0", r.inherits(v, u), v.prototype.processChunk = function(m) {
        this.meta = m.meta, this._pako === null && this._createPako(), this._pako.push(r.transformTo(g, m.data), !1);
      }, v.prototype.flush = function() {
        u.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], !0);
      }, v.prototype.cleanUp = function() {
        u.prototype.cleanUp.call(this), this._pako = null;
      }, v.prototype._createPako = function() {
        this._pako = new o[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
        var m = this;
        this._pako.onData = function(b) {
          m.push({ data: b, meta: m.meta });
        };
      }, w.compressWorker = function(m) {
        return new v("Deflate", m);
      }, w.uncompressWorker = function() {
        return new v("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(p, N, w) {
      function l(i, d) {
        var n, h = "";
        for (n = 0; n < d; n++) h += String.fromCharCode(255 & i), i >>>= 8;
        return h;
      }
      function o(i, d, n, h, a, c) {
        var y, S, x = i.file, R = i.compression, O = c !== g.utf8encode, L = r.transformTo("string", c(x.name)), I = r.transformTo("string", g.utf8encode(x.name)), W = x.comment, X = r.transformTo("string", c(W)), _ = r.transformTo("string", g.utf8encode(W)), B = I.length !== x.name.length, e = _.length !== W.length, T = "", J = "", P = "", $ = x.dir, j = x.date, V = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        d && !n || (V.crc32 = i.crc32, V.compressedSize = i.compressedSize, V.uncompressedSize = i.uncompressedSize);
        var E = 0;
        d && (E |= 8), O || !B && !e || (E |= 2048);
        var C = 0, q = 0;
        $ && (C |= 16), a === "UNIX" ? (q = 798, C |= function(H, it) {
          var ut = H;
          return H || (ut = it ? 16893 : 33204), (65535 & ut) << 16;
        }(x.unixPermissions, $)) : (q = 20, C |= function(H) {
          return 63 & (H || 0);
        }(x.dosPermissions)), y = j.getUTCHours(), y <<= 6, y |= j.getUTCMinutes(), y <<= 5, y |= j.getUTCSeconds() / 2, S = j.getUTCFullYear() - 1980, S <<= 4, S |= j.getUTCMonth() + 1, S <<= 5, S |= j.getUTCDate(), B && (J = l(1, 1) + l(v(L), 4) + I, T += "up" + l(J.length, 2) + J), e && (P = l(1, 1) + l(v(X), 4) + _, T += "uc" + l(P.length, 2) + P);
        var G = "";
        return G += `
\0`, G += l(E, 2), G += R.magic, G += l(y, 2), G += l(S, 2), G += l(V.crc32, 4), G += l(V.compressedSize, 4), G += l(V.uncompressedSize, 4), G += l(L.length, 2), G += l(T.length, 2), { fileRecord: m.LOCAL_FILE_HEADER + G + L + T, dirRecord: m.CENTRAL_FILE_HEADER + l(q, 2) + G + l(X.length, 2) + "\0\0\0\0" + l(C, 4) + l(h, 4) + L + T + X };
      }
      var r = p("../utils"), u = p("../stream/GenericWorker"), g = p("../utf8"), v = p("../crc32"), m = p("../signature");
      function b(i, d, n, h) {
        u.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = d, this.zipPlatform = n, this.encodeFileName = h, this.streamFiles = i, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      r.inherits(b, u), b.prototype.push = function(i) {
        var d = i.meta.percent || 0, n = this.entriesCount, h = this._sources.length;
        this.accumulate ? this.contentBuffer.push(i) : (this.bytesWritten += i.data.length, u.prototype.push.call(this, { data: i.data, meta: { currentFile: this.currentFile, percent: n ? (d + 100 * (n - h - 1)) / n : 100 } }));
      }, b.prototype.openedSource = function(i) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = i.file.name;
        var d = this.streamFiles && !i.file.dir;
        if (d) {
          var n = o(i, d, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: n.fileRecord, meta: { percent: 0 } });
        } else this.accumulate = !0;
      }, b.prototype.closedSource = function(i) {
        this.accumulate = !1;
        var d = this.streamFiles && !i.file.dir, n = o(i, d, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(n.dirRecord), d) this.push({ data: function(h) {
          return m.DATA_DESCRIPTOR + l(h.crc32, 4) + l(h.compressedSize, 4) + l(h.uncompressedSize, 4);
        }(i), meta: { percent: 100 } });
        else for (this.push({ data: n.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, b.prototype.flush = function() {
        for (var i = this.bytesWritten, d = 0; d < this.dirRecords.length; d++) this.push({ data: this.dirRecords[d], meta: { percent: 100 } });
        var n = this.bytesWritten - i, h = function(a, c, y, S, x) {
          var R = r.transformTo("string", x(S));
          return m.CENTRAL_DIRECTORY_END + "\0\0\0\0" + l(a, 2) + l(a, 2) + l(c, 4) + l(y, 4) + l(R.length, 2) + R;
        }(this.dirRecords.length, n, i, this.zipComment, this.encodeFileName);
        this.push({ data: h, meta: { percent: 100 } });
      }, b.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, b.prototype.registerPrevious = function(i) {
        this._sources.push(i);
        var d = this;
        return i.on("data", function(n) {
          d.processChunk(n);
        }), i.on("end", function() {
          d.closedSource(d.previous.streamInfo), d._sources.length ? d.prepareNextSource() : d.end();
        }), i.on("error", function(n) {
          d.error(n);
        }), this;
      }, b.prototype.resume = function() {
        return !!u.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
      }, b.prototype.error = function(i) {
        var d = this._sources;
        if (!u.prototype.error.call(this, i)) return !1;
        for (var n = 0; n < d.length; n++) try {
          d[n].error(i);
        } catch {
        }
        return !0;
      }, b.prototype.lock = function() {
        u.prototype.lock.call(this);
        for (var i = this._sources, d = 0; d < i.length; d++) i[d].lock();
      }, N.exports = b;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(p, N, w) {
      var l = p("../compressions"), o = p("./ZipFileWorker");
      w.generateWorker = function(r, u, g) {
        var v = new o(u.streamFiles, g, u.platform, u.encodeFileName), m = 0;
        try {
          r.forEach(function(b, i) {
            m++;
            var d = function(c, y) {
              var S = c || y, x = l[S];
              if (!x) throw new Error(S + " is not a valid compression method !");
              return x;
            }(i.options.compression, u.compression), n = i.options.compressionOptions || u.compressionOptions || {}, h = i.dir, a = i.date;
            i._compressWorker(d, n).withStreamInfo("file", { name: b, dir: h, date: a, comment: i.comment || "", unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions }).pipe(v);
          }), v.entriesCount = m;
        } catch (b) {
          v.error(b);
        }
        return v;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(p, N, w) {
      function l() {
        if (!(this instanceof l)) return new l();
        if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var o = new l();
          for (var r in this) typeof this[r] != "function" && (o[r] = this[r]);
          return o;
        };
      }
      (l.prototype = p("./object")).loadAsync = p("./load"), l.support = p("./support"), l.defaults = p("./defaults"), l.version = "3.10.2", l.loadAsync = function(o, r) {
        return new l().loadAsync(o, r);
      }, l.external = p("./external"), N.exports = l;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(p, N, w) {
      var l = p("./utils"), o = p("./external"), r = p("./utf8"), u = p("./zipEntries"), g = p("./stream/Crc32Probe"), v = p("./nodejsUtils");
      function m(b) {
        return new o.Promise(function(i, d) {
          var n = b.decompressed.getContentWorker().pipe(new g());
          n.on("error", function(h) {
            d(h);
          }).on("end", function() {
            n.streamInfo.crc32 !== b.decompressed.crc32 ? d(new Error("Corrupted zip : CRC32 mismatch")) : i();
          }).resume();
        });
      }
      N.exports = function(b, i) {
        var d = this;
        return i = l.extend(i || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: r.utf8decode }), v.isNode && v.isStream(b) ? o.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : l.prepareContent("the loaded zip file", b, !0, i.optimizedBinaryString, i.base64).then(function(n) {
          var h = new u(i);
          return h.load(n), h;
        }).then(function(n) {
          var h = [o.Promise.resolve(n)], a = n.files;
          if (i.checkCRC32) for (var c = 0; c < a.length; c++) h.push(m(a[c]));
          return o.Promise.all(h);
        }).then(function(n) {
          for (var h = n.shift(), a = h.files, c = 0; c < a.length; c++) {
            var y = a[c], S = y.fileNameStr, x = l.resolve(y.fileNameStr);
            d.file(x, y.decompressed, { binary: !0, optimizedBinaryString: !0, date: y.date, dir: y.dir, comment: y.fileCommentStr.length ? y.fileCommentStr : null, unixPermissions: y.unixPermissions, dosPermissions: y.dosPermissions, createFolders: i.createFolders }), y.dir || (d.file(x).unsafeOriginalName = S);
          }
          return h.zipComment.length && (d.comment = h.zipComment), d;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(p, N, w) {
      var l = p("../utils"), o = p("../stream/GenericWorker");
      function r(u, g) {
        o.call(this, "Nodejs stream input adapter for " + u), this._upstreamEnded = !1, this._bindStream(g);
      }
      l.inherits(r, o), r.prototype._bindStream = function(u) {
        var g = this;
        (this._stream = u).pause(), u.on("data", function(v) {
          g.push({ data: v, meta: { percent: 0 } });
        }).on("error", function(v) {
          g.isPaused ? this.generatedError = v : g.error(v);
        }).on("end", function() {
          g.isPaused ? g._upstreamEnded = !0 : g.end();
        });
      }, r.prototype.pause = function() {
        return !!o.prototype.pause.call(this) && (this._stream.pause(), !0);
      }, r.prototype.resume = function() {
        return !!o.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
      }, N.exports = r;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(p, N, w) {
      var l = p("readable-stream").Readable;
      function o(r, u, g) {
        l.call(this, u), this._helper = r;
        var v = this;
        r.on("data", function(m, b) {
          v.push(m) || v._helper.pause(), g && g(b);
        }).on("error", function(m) {
          v.emit("error", m);
        }).on("end", function() {
          v.push(null);
        });
      }
      p("../utils").inherits(o, l), o.prototype._read = function() {
        this._helper.resume();
      }, N.exports = o;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(p, N, w) {
      N.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(l, o) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(l, o);
        if (typeof l == "number") throw new Error('The "data" argument must not be a number');
        return new Buffer(l, o);
      }, allocBuffer: function(l) {
        if (Buffer.alloc) return Buffer.alloc(l);
        var o = new Buffer(l);
        return o.fill(0), o;
      }, isBuffer: function(l) {
        return Buffer.isBuffer(l);
      }, isStream: function(l) {
        return l && typeof l.on == "function" && typeof l.pause == "function" && typeof l.resume == "function";
      } };
    }, {}], 15: [function(p, N, w) {
      function l(x, R, O) {
        var L, I = r.getTypeOf(R), W = r.extend(O || {}, v);
        W.date = W.date || /* @__PURE__ */ new Date(), W.compression !== null && (W.compression = W.compression.toUpperCase()), typeof W.unixPermissions == "string" && (W.unixPermissions = parseInt(W.unixPermissions, 8)), W.unixPermissions && 16384 & W.unixPermissions && (W.dir = !0), W.dosPermissions && 16 & W.dosPermissions && (W.dir = !0), W.dir && (x = a(x)), W.createFolders && (L = h(x)) && c.call(this, L, !0);
        var X = I === "string" && W.binary === !1 && W.base64 === !1;
        O && O.binary !== void 0 || (W.binary = !X), (R instanceof m && R.uncompressedSize === 0 || W.dir || !R || R.length === 0) && (W.base64 = !1, W.binary = !0, R = "", W.compression = "STORE", I = "string");
        var _ = null;
        _ = R instanceof m || R instanceof u ? R : d.isNode && d.isStream(R) ? new n(x, R) : r.prepareContent(x, R, W.binary, W.optimizedBinaryString, W.base64);
        var B = new b(x, _, W);
        this.files[x] = B;
      }
      var o = p("./utf8"), r = p("./utils"), u = p("./stream/GenericWorker"), g = p("./stream/StreamHelper"), v = p("./defaults"), m = p("./compressedObject"), b = p("./zipObject"), i = p("./generate"), d = p("./nodejsUtils"), n = p("./nodejs/NodejsStreamInputAdapter"), h = function(x) {
        x.slice(-1) === "/" && (x = x.substring(0, x.length - 1));
        var R = x.lastIndexOf("/");
        return 0 < R ? x.substring(0, R) : "";
      }, a = function(x) {
        return x.slice(-1) !== "/" && (x += "/"), x;
      }, c = function(x, R) {
        return R = R !== void 0 ? R : v.createFolders, x = a(x), this.files[x] || l.call(this, x, null, { dir: !0, createFolders: R }), this.files[x];
      };
      function y(x) {
        return Object.prototype.toString.call(x) === "[object RegExp]";
      }
      var S = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(x) {
        var R, O, L;
        for (R in this.files) L = this.files[R], (O = R.slice(this.root.length, R.length)) && R.slice(0, this.root.length) === this.root && x(O, L);
      }, filter: function(x) {
        var R = [];
        return this.forEach(function(O, L) {
          x(O, L) && R.push(L);
        }), R;
      }, file: function(x, R, O) {
        if (arguments.length !== 1) return x = this.root + x, l.call(this, x, R, O), this;
        if (y(x)) {
          var L = x;
          return this.filter(function(W, X) {
            return !X.dir && L.test(W);
          });
        }
        var I = this.files[this.root + x];
        return I && !I.dir ? I : null;
      }, folder: function(x) {
        if (!x) return this;
        if (y(x)) return this.filter(function(I, W) {
          return W.dir && x.test(I);
        });
        var R = this.root + x, O = c.call(this, R), L = this.clone();
        return L.root = O.name, L;
      }, remove: function(x) {
        x = this.root + x;
        var R = this.files[x];
        if (R || (x.slice(-1) !== "/" && (x += "/"), R = this.files[x]), R && !R.dir) delete this.files[x];
        else for (var O = this.filter(function(I, W) {
          return W.name.slice(0, x.length) === x;
        }), L = 0; L < O.length; L++) delete this.files[O[L].name];
        return this;
      }, generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(x) {
        var R, O = {};
        try {
          if ((O = r.extend(x || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: o.utf8encode })).type = O.type.toLowerCase(), O.compression = O.compression.toUpperCase(), O.type === "binarystring" && (O.type = "string"), !O.type) throw new Error("No output type specified.");
          r.checkSupport(O.type), O.platform !== "darwin" && O.platform !== "freebsd" && O.platform !== "linux" && O.platform !== "sunos" || (O.platform = "UNIX"), O.platform === "win32" && (O.platform = "DOS");
          var L = O.comment || this.comment || "";
          R = i.generateWorker(this, O, L);
        } catch (I) {
          (R = new u("error")).error(I);
        }
        return new g(R, O.type || "string", O.mimeType);
      }, generateAsync: function(x, R) {
        return this.generateInternalStream(x).accumulate(R);
      }, generateNodeStream: function(x, R) {
        return (x = x || {}).type || (x.type = "nodebuffer"), this.generateInternalStream(x).toNodejsStream(R);
      } };
      N.exports = S;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(p, N, w) {
      N.exports = p("stream");
    }, { stream: void 0 }], 17: [function(p, N, w) {
      var l = p("./DataReader");
      function o(r) {
        l.call(this, r);
        for (var u = 0; u < this.data.length; u++) r[u] = 255 & r[u];
      }
      p("../utils").inherits(o, l), o.prototype.byteAt = function(r) {
        return this.data[this.zero + r];
      }, o.prototype.lastIndexOfSignature = function(r) {
        for (var u = r.charCodeAt(0), g = r.charCodeAt(1), v = r.charCodeAt(2), m = r.charCodeAt(3), b = this.length - 4; 0 <= b; --b) if (this.data[b] === u && this.data[b + 1] === g && this.data[b + 2] === v && this.data[b + 3] === m) return b - this.zero;
        return -1;
      }, o.prototype.readAndCheckSignature = function(r) {
        var u = r.charCodeAt(0), g = r.charCodeAt(1), v = r.charCodeAt(2), m = r.charCodeAt(3), b = this.readData(4);
        return u === b[0] && g === b[1] && v === b[2] && m === b[3];
      }, o.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return [];
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, u;
      }, N.exports = o;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(p, N, w) {
      var l = p("../utils");
      function o(r) {
        this.data = r, this.length = r.length, this.index = 0, this.zero = 0;
      }
      o.prototype = { checkOffset: function(r) {
        this.checkIndex(this.index + r);
      }, checkIndex: function(r) {
        if (this.length < this.zero + r || r < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + r + "). Corrupted zip ?");
      }, setIndex: function(r) {
        this.checkIndex(r), this.index = r;
      }, skip: function(r) {
        this.setIndex(this.index + r);
      }, byteAt: function() {
      }, readInt: function(r) {
        var u, g = 0;
        for (this.checkOffset(r), u = this.index + r - 1; u >= this.index; u--) g = (g << 8) + this.byteAt(u);
        return this.index += r, g;
      }, readString: function(r) {
        return l.transformTo("string", this.readData(r));
      }, readData: function() {
      }, lastIndexOfSignature: function() {
      }, readAndCheckSignature: function() {
      }, readDate: function() {
        var r = this.readInt(4);
        return new Date(Date.UTC(1980 + (r >> 25 & 127), (r >> 21 & 15) - 1, r >> 16 & 31, r >> 11 & 31, r >> 5 & 63, (31 & r) << 1));
      } }, N.exports = o;
    }, { "../utils": 32 }], 19: [function(p, N, w) {
      var l = p("./Uint8ArrayReader");
      function o(r) {
        l.call(this, r);
      }
      p("../utils").inherits(o, l), o.prototype.readData = function(r) {
        this.checkOffset(r);
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, u;
      }, N.exports = o;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(p, N, w) {
      var l = p("./DataReader");
      function o(r) {
        l.call(this, r);
      }
      p("../utils").inherits(o, l), o.prototype.byteAt = function(r) {
        return this.data.charCodeAt(this.zero + r);
      }, o.prototype.lastIndexOfSignature = function(r) {
        return this.data.lastIndexOf(r) - this.zero;
      }, o.prototype.readAndCheckSignature = function(r) {
        return r === this.readData(4);
      }, o.prototype.readData = function(r) {
        this.checkOffset(r);
        var u = this.data.slice(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, u;
      }, N.exports = o;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(p, N, w) {
      var l = p("./ArrayReader");
      function o(r) {
        l.call(this, r);
      }
      p("../utils").inherits(o, l), o.prototype.readData = function(r) {
        if (this.checkOffset(r), r === 0) return new Uint8Array(0);
        var u = this.data.subarray(this.zero + this.index, this.zero + this.index + r);
        return this.index += r, u;
      }, N.exports = o;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(p, N, w) {
      var l = p("../utils"), o = p("../support"), r = p("./ArrayReader"), u = p("./StringReader"), g = p("./NodeBufferReader"), v = p("./Uint8ArrayReader");
      N.exports = function(m) {
        var b = l.getTypeOf(m);
        return l.checkSupport(b), b !== "string" || o.uint8array ? b === "nodebuffer" ? new g(m) : o.uint8array ? new v(l.transformTo("uint8array", m)) : new r(l.transformTo("array", m)) : new u(m);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(p, N, w) {
      w.LOCAL_FILE_HEADER = "PK", w.CENTRAL_FILE_HEADER = "PK", w.CENTRAL_DIRECTORY_END = "PK", w.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", w.ZIP64_CENTRAL_DIRECTORY_END = "PK", w.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(p, N, w) {
      var l = p("./GenericWorker"), o = p("../utils");
      function r(u) {
        l.call(this, "ConvertWorker to " + u), this.destType = u;
      }
      o.inherits(r, l), r.prototype.processChunk = function(u) {
        this.push({ data: o.transformTo(this.destType, u.data), meta: u.meta });
      }, N.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(p, N, w) {
      var l = p("./GenericWorker"), o = p("../crc32");
      function r() {
        l.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      p("../utils").inherits(r, l), r.prototype.processChunk = function(u) {
        this.streamInfo.crc32 = o(u.data, this.streamInfo.crc32 || 0), this.push(u);
      }, N.exports = r;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(p, N, w) {
      var l = p("../utils"), o = p("./GenericWorker");
      function r(u) {
        o.call(this, "DataLengthProbe for " + u), this.propName = u, this.withStreamInfo(u, 0);
      }
      l.inherits(r, o), r.prototype.processChunk = function(u) {
        if (u) {
          var g = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = g + u.data.length;
        }
        o.prototype.processChunk.call(this, u);
      }, N.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(p, N, w) {
      var l = p("../utils"), o = p("./GenericWorker");
      function r(u) {
        o.call(this, "DataWorker");
        var g = this;
        this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, u.then(function(v) {
          g.dataIsReady = !0, g.data = v, g.max = v && v.length || 0, g.type = l.getTypeOf(v), g.isPaused || g._tickAndRepeat();
        }, function(v) {
          g.error(v);
        });
      }
      l.inherits(r, o), r.prototype.cleanUp = function() {
        o.prototype.cleanUp.call(this), this.data = null;
      }, r.prototype.resume = function() {
        return !!o.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, l.delay(this._tickAndRepeat, [], this)), !0);
      }, r.prototype._tickAndRepeat = function() {
        this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (l.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0));
      }, r.prototype._tick = function() {
        if (this.isPaused || this.isFinished) return !1;
        var u = null, g = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max) return this.end();
        switch (this.type) {
          case "string":
            u = this.data.substring(this.index, g);
            break;
          case "uint8array":
            u = this.data.subarray(this.index, g);
            break;
          case "array":
          case "nodebuffer":
            u = this.data.slice(this.index, g);
        }
        return this.index = g, this.push({ data: u, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, N.exports = r;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(p, N, w) {
      function l(o) {
        this.name = o || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      l.prototype = { push: function(o) {
        this.emit("data", o);
      }, end: function() {
        if (this.isFinished) return !1;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = !0;
        } catch (o) {
          this.emit("error", o);
        }
        return !0;
      }, error: function(o) {
        return !this.isFinished && (this.isPaused ? this.generatedError = o : (this.isFinished = !0, this.emit("error", o), this.previous && this.previous.error(o), this.cleanUp()), !0);
      }, on: function(o, r) {
        return this._listeners[o].push(r), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(o, r) {
        if (this._listeners[o]) for (var u = 0; u < this._listeners[o].length; u++) this._listeners[o][u].call(this, r);
      }, pipe: function(o) {
        return o.registerPrevious(this);
      }, registerPrevious: function(o) {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = o.streamInfo, this.mergeStreamInfo(), this.previous = o;
        var r = this;
        return o.on("data", function(u) {
          r.processChunk(u);
        }), o.on("end", function() {
          r.end();
        }), o.on("error", function(u) {
          r.error(u);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0);
      }, resume: function() {
        if (!this.isPaused || this.isFinished) return !1;
        var o = this.isPaused = !1;
        return this.generatedError && (this.error(this.generatedError), o = !0), this.previous && this.previous.resume(), !o;
      }, flush: function() {
      }, processChunk: function(o) {
        this.push(o);
      }, withStreamInfo: function(o, r) {
        return this.extraStreamInfo[o] = r, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var o in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, o) && (this.streamInfo[o] = this.extraStreamInfo[o]);
      }, lock: function() {
        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = !0, this.previous && this.previous.lock();
      }, toString: function() {
        var o = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + o : o;
      } }, N.exports = l;
    }, {}], 29: [function(p, N, w) {
      var l = p("../utils"), o = p("./ConvertWorker"), r = p("./GenericWorker"), u = p("../base64"), g = p("../support"), v = p("../external"), m = null;
      if (g.nodestream) try {
        m = p("../nodejs/NodejsStreamOutputAdapter");
      } catch {
      }
      function b(d, n) {
        return new v.Promise(function(h, a) {
          var c = [], y = d._internalType, S = d._outputType, x = d._mimeType;
          d.on("data", function(R, O) {
            c.push(R), n && n(O);
          }).on("error", function(R) {
            c = [], a(R);
          }).on("end", function() {
            try {
              var R = function(O, L, I) {
                switch (O) {
                  case "blob":
                    return l.newBlob(l.transformTo("arraybuffer", L), I);
                  case "base64":
                    return u.encode(L);
                  default:
                    return l.transformTo(O, L);
                }
              }(S, function(O, L) {
                var I, W = 0, X = null, _ = 0;
                for (I = 0; I < L.length; I++) _ += L[I].length;
                switch (O) {
                  case "string":
                    return L.join("");
                  case "array":
                    return Array.prototype.concat.apply([], L);
                  case "uint8array":
                    for (X = new Uint8Array(_), I = 0; I < L.length; I++) X.set(L[I], W), W += L[I].length;
                    return X;
                  case "nodebuffer":
                    return Buffer.concat(L);
                  default:
                    throw new Error("concat : unsupported type '" + O + "'");
                }
              }(y, c), x);
              h(R);
            } catch (O) {
              a(O);
            }
            c = [];
          }).resume();
        });
      }
      function i(d, n, h) {
        var a = n;
        switch (n) {
          case "blob":
          case "arraybuffer":
            a = "uint8array";
            break;
          case "base64":
            a = "string";
        }
        try {
          this._internalType = a, this._outputType = n, this._mimeType = h, l.checkSupport(a), this._worker = d.pipe(new o(a)), d.lock();
        } catch (c) {
          this._worker = new r("error"), this._worker.error(c);
        }
      }
      i.prototype = { accumulate: function(d) {
        return b(this, d);
      }, on: function(d, n) {
        var h = this;
        return d === "data" ? this._worker.on(d, function(a) {
          n.call(h, a.data, a.meta);
        }) : this._worker.on(d, function() {
          l.delay(n, arguments, h);
        }), this;
      }, resume: function() {
        return l.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(d) {
        if (l.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
        return new m(this, { objectMode: this._outputType !== "nodebuffer" }, d);
      } }, N.exports = i;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(p, N, w) {
      if (w.base64 = !0, w.array = !0, w.string = !0, w.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", w.nodebuffer = typeof Buffer < "u", w.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") w.blob = !1;
      else {
        var l = new ArrayBuffer(0);
        try {
          w.blob = new Blob([l], { type: "application/zip" }).size === 0;
        } catch {
          try {
            var o = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            o.append(l), w.blob = o.getBlob("application/zip").size === 0;
          } catch {
            w.blob = !1;
          }
        }
      }
      try {
        w.nodestream = !!p("readable-stream").Readable;
      } catch {
        w.nodestream = !1;
      }
    }, { "readable-stream": 16 }], 31: [function(p, N, w) {
      for (var l = p("./utils"), o = p("./support"), r = p("./nodejsUtils"), u = p("./stream/GenericWorker"), g = new Array(256), v = 0; v < 256; v++) g[v] = 252 <= v ? 6 : 248 <= v ? 5 : 240 <= v ? 4 : 224 <= v ? 3 : 192 <= v ? 2 : 1;
      g[254] = g[254] = 1;
      function m() {
        u.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function b() {
        u.call(this, "utf-8 encode");
      }
      w.utf8encode = function(i) {
        return o.nodebuffer ? r.newBufferFrom(i, "utf-8") : function(d) {
          var n, h, a, c, y, S = d.length, x = 0;
          for (c = 0; c < S; c++) (64512 & (h = d.charCodeAt(c))) == 55296 && c + 1 < S && (64512 & (a = d.charCodeAt(c + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (a - 56320), c++), x += h < 128 ? 1 : h < 2048 ? 2 : h < 65536 ? 3 : 4;
          for (n = o.uint8array ? new Uint8Array(x) : new Array(x), c = y = 0; y < x; c++) (64512 & (h = d.charCodeAt(c))) == 55296 && c + 1 < S && (64512 & (a = d.charCodeAt(c + 1))) == 56320 && (h = 65536 + (h - 55296 << 10) + (a - 56320), c++), h < 128 ? n[y++] = h : (h < 2048 ? n[y++] = 192 | h >>> 6 : (h < 65536 ? n[y++] = 224 | h >>> 12 : (n[y++] = 240 | h >>> 18, n[y++] = 128 | h >>> 12 & 63), n[y++] = 128 | h >>> 6 & 63), n[y++] = 128 | 63 & h);
          return n;
        }(i);
      }, w.utf8decode = function(i) {
        return o.nodebuffer ? l.transformTo("nodebuffer", i).toString("utf-8") : function(d) {
          var n, h, a, c, y = d.length, S = new Array(2 * y);
          for (n = h = 0; n < y; ) if ((a = d[n++]) < 128) S[h++] = a;
          else if (4 < (c = g[a])) S[h++] = 65533, n += c - 1;
          else {
            for (a &= c === 2 ? 31 : c === 3 ? 15 : 7; 1 < c && n < y; ) a = a << 6 | 63 & d[n++], c--;
            1 < c ? S[h++] = 65533 : a < 65536 ? S[h++] = a : (a -= 65536, S[h++] = 55296 | a >> 10 & 1023, S[h++] = 56320 | 1023 & a);
          }
          return S.length !== h && (S.subarray ? S = S.subarray(0, h) : S.length = h), l.applyFromCharCode(S);
        }(i = l.transformTo(o.uint8array ? "uint8array" : "array", i));
      }, l.inherits(m, u), m.prototype.processChunk = function(i) {
        var d = l.transformTo(o.uint8array ? "uint8array" : "array", i.data);
        if (this.leftOver && this.leftOver.length) {
          if (o.uint8array) {
            var n = d;
            (d = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), d.set(n, this.leftOver.length);
          } else d = this.leftOver.concat(d);
          this.leftOver = null;
        }
        var h = function(c, y) {
          var S;
          for ((y = y || c.length) > c.length && (y = c.length), S = y - 1; 0 <= S && (192 & c[S]) == 128; ) S--;
          return S < 0 || S === 0 ? y : S + g[c[S]] > y ? S : y;
        }(d), a = d;
        h !== d.length && (o.uint8array ? (a = d.subarray(0, h), this.leftOver = d.subarray(h, d.length)) : (a = d.slice(0, h), this.leftOver = d.slice(h, d.length))), this.push({ data: w.utf8decode(a), meta: i.meta });
      }, m.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: w.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, w.Utf8DecodeWorker = m, l.inherits(b, u), b.prototype.processChunk = function(i) {
        this.push({ data: w.utf8encode(i.data), meta: i.meta });
      }, w.Utf8EncodeWorker = b;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(p, N, w) {
      var l = p("./support"), o = p("./base64"), r = p("./nodejsUtils"), u = p("./external");
      function g(n) {
        return n;
      }
      function v(n, h) {
        for (var a = 0; a < n.length; ++a) h[a] = 255 & n.charCodeAt(a);
        return h;
      }
      p("setimmediate"), w.newBlob = function(n, h) {
        w.checkSupport("blob");
        try {
          return new Blob([n], { type: h });
        } catch {
          try {
            var a = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return a.append(n), a.getBlob(h);
          } catch {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var m = { stringifyByChunk: function(n, h, a) {
        var c = [], y = 0, S = n.length;
        if (S <= a) return String.fromCharCode.apply(null, n);
        for (; y < S; ) h === "array" || h === "nodebuffer" ? c.push(String.fromCharCode.apply(null, n.slice(y, Math.min(y + a, S)))) : c.push(String.fromCharCode.apply(null, n.subarray(y, Math.min(y + a, S)))), y += a;
        return c.join("");
      }, stringifyByChar: function(n) {
        for (var h = "", a = 0; a < n.length; a++) h += String.fromCharCode(n[a]);
        return h;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return l.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch {
          return !1;
        }
      }(), nodebuffer: function() {
        try {
          return l.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
        } catch {
          return !1;
        }
      }() } };
      function b(n) {
        var h = 65536, a = w.getTypeOf(n), c = !0;
        if (a === "uint8array" ? c = m.applyCanBeUsed.uint8array : a === "nodebuffer" && (c = m.applyCanBeUsed.nodebuffer), c) for (; 1 < h; ) try {
          return m.stringifyByChunk(n, a, h);
        } catch {
          h = Math.floor(h / 2);
        }
        return m.stringifyByChar(n);
      }
      function i(n, h) {
        for (var a = 0; a < n.length; a++) h[a] = n[a];
        return h;
      }
      w.applyFromCharCode = b;
      var d = {};
      d.string = { string: g, array: function(n) {
        return v(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.string.uint8array(n).buffer;
      }, uint8array: function(n) {
        return v(n, new Uint8Array(n.length));
      }, nodebuffer: function(n) {
        return v(n, r.allocBuffer(n.length));
      } }, d.array = { string: b, array: g, arraybuffer: function(n) {
        return new Uint8Array(n).buffer;
      }, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.arraybuffer = { string: function(n) {
        return b(new Uint8Array(n));
      }, array: function(n) {
        return i(new Uint8Array(n), new Array(n.byteLength));
      }, arraybuffer: g, uint8array: function(n) {
        return new Uint8Array(n);
      }, nodebuffer: function(n) {
        return r.newBufferFrom(new Uint8Array(n));
      } }, d.uint8array = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return n.buffer;
      }, uint8array: g, nodebuffer: function(n) {
        return r.newBufferFrom(n);
      } }, d.nodebuffer = { string: b, array: function(n) {
        return i(n, new Array(n.length));
      }, arraybuffer: function(n) {
        return d.nodebuffer.uint8array(n).buffer;
      }, uint8array: function(n) {
        return i(n, new Uint8Array(n.length));
      }, nodebuffer: g }, w.transformTo = function(n, h) {
        if (h = h || "", !n) return h;
        w.checkSupport(n);
        var a = w.getTypeOf(h);
        return d[a][n](h);
      }, w.resolve = function(n) {
        for (var h = n.split("/"), a = [], c = 0; c < h.length; c++) {
          var y = h[c];
          y === "." || y === "" && c !== 0 && c !== h.length - 1 || (y === ".." ? a.pop() : a.push(y));
        }
        return a.join("/");
      }, w.getTypeOf = function(n) {
        if (typeof n == "string") return "string";
        var h = Object.prototype.toString.call(n);
        return h === "[object Array]" ? "array" : l.nodebuffer && r.isBuffer(n) ? "nodebuffer" : l.uint8array && h === "[object Uint8Array]" ? "uint8array" : l.arraybuffer && h === "[object ArrayBuffer]" ? "arraybuffer" : void 0;
      }, w.checkSupport = function(n) {
        if (!l[n.toLowerCase()]) throw new Error(n + " is not supported by this platform");
      }, w.MAX_VALUE_16BITS = 65535, w.MAX_VALUE_32BITS = -1, w.pretty = function(n) {
        var h, a, c = "";
        for (a = 0; a < (n || "").length; a++) c += "\\x" + ((h = n.charCodeAt(a)) < 16 ? "0" : "") + h.toString(16).toUpperCase();
        return c;
      }, w.delay = function(n, h, a) {
        setImmediate(function() {
          n.apply(a || null, h || []);
        });
      }, w.inherits = function(n, h) {
        function a() {
        }
        a.prototype = h.prototype, n.prototype = new a();
      }, w.extend = function() {
        var n, h, a = {};
        for (n = 0; n < arguments.length; n++) for (h in arguments[n]) Object.prototype.hasOwnProperty.call(arguments[n], h) && a[h] === void 0 && (a[h] = arguments[n][h]);
        return a;
      }, w.prepareContent = function(n, h, a, c, y) {
        return u.Promise.resolve(h).then(function(S) {
          return l.blob && (S instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(S)) !== -1) ? Blob.prototype.arrayBuffer !== void 0 ? S.arrayBuffer() : typeof FileReader < "u" ? new u.Promise(function(x, R) {
            var O = new FileReader();
            O.onload = function(L) {
              x(L.target.result);
            }, O.onerror = function(L) {
              R(L.target.error);
            }, O.readAsArrayBuffer(S);
          }) : u.Promise.reject(new Error(n + " is a Blob, but we have no way of reading it.")) : S;
        }).then(function(S) {
          var x = w.getTypeOf(S);
          return x ? (x === "arraybuffer" ? S = w.transformTo("uint8array", S) : x === "string" && (y ? S = o.decode(S) : a && c !== !0 && (S = function(R) {
            return v(R, l.uint8array ? new Uint8Array(R.length) : new Array(R.length));
          }(S))), S) : u.Promise.reject(new Error("Can't read the data of '" + n + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(p, N, w) {
      var l = p("./reader/readerFor"), o = p("./utils"), r = p("./signature"), u = p("./zipEntry"), g = p("./support");
      function v(m) {
        this.files = [], this.loadOptions = m;
      }
      v.prototype = { checkSignature: function(m) {
        if (!this.reader.readAndCheckSignature(m)) {
          this.reader.index -= 4;
          var b = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + o.pretty(b) + ", expected " + o.pretty(m) + ")");
        }
      }, isSignature: function(m, b) {
        var i = this.reader.index;
        this.reader.setIndex(m);
        var d = this.reader.readString(4) === b;
        return this.reader.setIndex(i), d;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var m = this.reader.readData(this.zipCommentLength), b = g.uint8array ? "uint8array" : "array", i = o.transformTo(b, m);
        this.zipComment = this.loadOptions.decodeFileName(i);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var m, b, i, d = this.zip64EndOfCentralSize - 44; 0 < d; ) m = this.reader.readInt(2), b = this.reader.readInt(4), i = this.reader.readData(b), this.zip64ExtensibleData[m] = { id: m, length: b, value: i };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var m, b;
        for (m = 0; m < this.files.length; m++) b = this.files[m], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(r.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
      }, readCentralDir: function() {
        var m;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER); ) (m = new u({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(m);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var m = this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);
        if (m < 0) throw this.isSignature(0, r.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        this.reader.setIndex(m);
        var b = m;
        if (this.checkSignature(r.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === o.MAX_VALUE_16BITS || this.diskWithCentralDirStart === o.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === o.MAX_VALUE_16BITS || this.centralDirRecords === o.MAX_VALUE_16BITS || this.centralDirSize === o.MAX_VALUE_32BITS || this.centralDirOffset === o.MAX_VALUE_32BITS) {
          if (this.zip64 = !0, (m = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(m), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, r.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var i = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (i += 20, i += 12 + this.zip64EndOfCentralSize);
        var d = b - i;
        if (0 < d) this.isSignature(b, r.CENTRAL_FILE_HEADER) || (this.reader.zero = d);
        else if (d < 0) throw new Error("Corrupted zip: missing " + Math.abs(d) + " bytes.");
      }, prepareReader: function(m) {
        this.reader = l(m);
      }, load: function(m) {
        this.prepareReader(m), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, N.exports = v;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(p, N, w) {
      var l = p("./reader/readerFor"), o = p("./utils"), r = p("./compressedObject"), u = p("./crc32"), g = p("./utf8"), v = p("./compressions"), m = p("./support");
      function b(i, d) {
        this.options = i, this.loadOptions = d;
      }
      b.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(i) {
        var d, n;
        if (i.skip(22), this.fileNameLength = i.readInt(2), n = i.readInt(2), this.fileName = i.readData(this.fileNameLength), i.skip(n), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((d = function(h) {
          for (var a in v) if (Object.prototype.hasOwnProperty.call(v, a) && v[a].magic === h) return v[a];
          return null;
        }(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + o.pretty(this.compressionMethod) + " unknown (inner file : " + o.transformTo("string", this.fileName) + ")");
        this.decompressed = new r(this.compressedSize, this.uncompressedSize, this.crc32, d, i.readData(this.compressedSize));
      }, readCentralPart: function(i) {
        this.versionMadeBy = i.readInt(2), i.skip(2), this.bitFlag = i.readInt(2), this.compressionMethod = i.readString(2), this.date = i.readDate(), this.crc32 = i.readInt(4), this.compressedSize = i.readInt(4), this.uncompressedSize = i.readInt(4);
        var d = i.readInt(2);
        if (this.extraFieldsLength = i.readInt(2), this.fileCommentLength = i.readInt(2), this.diskNumberStart = i.readInt(2), this.internalFileAttributes = i.readInt(2), this.externalFileAttributes = i.readInt(4), this.localHeaderOffset = i.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
        i.skip(d), this.readExtraFields(i), this.parseZIP64ExtraField(i), this.fileComment = i.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var i = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), i == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), i == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = !0);
      }, parseZIP64ExtraField: function() {
        if (this.extraFields[1]) {
          var i = l(this.extraFields[1].value);
          this.uncompressedSize === o.MAX_VALUE_32BITS && (this.uncompressedSize = i.readInt(8)), this.compressedSize === o.MAX_VALUE_32BITS && (this.compressedSize = i.readInt(8)), this.localHeaderOffset === o.MAX_VALUE_32BITS && (this.localHeaderOffset = i.readInt(8)), this.diskNumberStart === o.MAX_VALUE_32BITS && (this.diskNumberStart = i.readInt(4));
        }
      }, readExtraFields: function(i) {
        var d, n, h, a = i.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); i.index + 4 < a; ) d = i.readInt(2), n = i.readInt(2), h = i.readData(n), this.extraFields[d] = { id: d, length: n, value: h };
        i.setIndex(a);
      }, handleUTF8: function() {
        var i = m.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) this.fileNameStr = g.utf8decode(this.fileName), this.fileCommentStr = g.utf8decode(this.fileComment);
        else {
          var d = this.findExtraFieldUnicodePath();
          if (d !== null) this.fileNameStr = d;
          else {
            var n = o.transformTo(i, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(n);
          }
          var h = this.findExtraFieldUnicodeComment();
          if (h !== null) this.fileCommentStr = h;
          else {
            var a = o.transformTo(i, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(a);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var i = this.extraFields[28789];
        if (i) {
          var d = l(i.value);
          return d.readInt(1) !== 1 || u(this.fileName) !== d.readInt(4) ? null : g.utf8decode(d.readData(i.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var i = this.extraFields[25461];
        if (i) {
          var d = l(i.value);
          return d.readInt(1) !== 1 || u(this.fileComment) !== d.readInt(4) ? null : g.utf8decode(d.readData(i.length - 5));
        }
        return null;
      } }, N.exports = b;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(p, N, w) {
      function l(d, n, h) {
        this.name = d, this.dir = h.dir, this.date = h.date, this.comment = h.comment, this.unixPermissions = h.unixPermissions, this.dosPermissions = h.dosPermissions, this._data = n, this._dataBinary = h.binary, this.options = { compression: h.compression, compressionOptions: h.compressionOptions };
      }
      var o = p("./stream/StreamHelper"), r = p("./stream/DataWorker"), u = p("./utf8"), g = p("./compressedObject"), v = p("./stream/GenericWorker");
      l.prototype = { internalStream: function(d) {
        var n = null, h = "string";
        try {
          if (!d) throw new Error("No output type specified.");
          var a = (h = d.toLowerCase()) === "string" || h === "text";
          h !== "binarystring" && h !== "text" || (h = "string"), n = this._decompressWorker();
          var c = !this._dataBinary;
          c && !a && (n = n.pipe(new u.Utf8EncodeWorker())), !c && a && (n = n.pipe(new u.Utf8DecodeWorker()));
        } catch (y) {
          (n = new v("error")).error(y);
        }
        return new o(n, h, "");
      }, async: function(d, n) {
        return this.internalStream(d).accumulate(n);
      }, nodeStream: function(d, n) {
        return this.internalStream(d || "nodebuffer").toNodejsStream(n);
      }, _compressWorker: function(d, n) {
        if (this._data instanceof g && this._data.compression.magic === d.magic) return this._data.getCompressedWorker();
        var h = this._decompressWorker();
        return this._dataBinary || (h = h.pipe(new u.Utf8EncodeWorker())), g.createWorkerFrom(h, d, n);
      }, _decompressWorker: function() {
        return this._data instanceof g ? this._data.getContentWorker() : this._data instanceof v ? this._data : new r(this._data);
      } };
      for (var m = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], b = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, i = 0; i < m.length; i++) l.prototype[m[i]] = b;
      N.exports = l;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(p, N, w) {
      (function(l) {
        var o, r, u = l.MutationObserver || l.WebKitMutationObserver;
        if (u) {
          var g = 0, v = new u(d), m = l.document.createTextNode("");
          v.observe(m, { characterData: !0 }), o = function() {
            m.data = g = ++g % 2;
          };
        } else if (l.setImmediate || l.MessageChannel === void 0) o = "document" in l && "onreadystatechange" in l.document.createElement("script") ? function() {
          var n = l.document.createElement("script");
          n.onreadystatechange = function() {
            d(), n.onreadystatechange = null, n.parentNode.removeChild(n), n = null;
          }, l.document.documentElement.appendChild(n);
        } : function() {
          setTimeout(d, 0);
        };
        else {
          var b = new l.MessageChannel();
          b.port1.onmessage = d, o = function() {
            b.port2.postMessage(0);
          };
        }
        var i = [];
        function d() {
          var n, h;
          r = !0;
          for (var a = i.length; a; ) {
            for (h = i, i = [], n = -1; ++n < a; ) h[n]();
            a = i.length;
          }
          r = !1;
        }
        N.exports = function(n) {
          i.push(n) !== 1 || r || o();
        };
      }).call(this, typeof yt < "u" ? yt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}], 37: [function(p, N, w) {
      var l = p("immediate");
      function o() {
      }
      var r = {}, u = ["REJECTED"], g = ["FULFILLED"], v = ["PENDING"];
      function m(a) {
        if (typeof a != "function") throw new TypeError("resolver must be a function");
        this.state = v, this.queue = [], this.outcome = void 0, a !== o && n(this, a);
      }
      function b(a, c, y) {
        this.promise = a, typeof c == "function" && (this.onFulfilled = c, this.callFulfilled = this.otherCallFulfilled), typeof y == "function" && (this.onRejected = y, this.callRejected = this.otherCallRejected);
      }
      function i(a, c, y) {
        l(function() {
          var S;
          try {
            S = c(y);
          } catch (x) {
            return r.reject(a, x);
          }
          S === a ? r.reject(a, new TypeError("Cannot resolve promise with itself")) : r.resolve(a, S);
        });
      }
      function d(a) {
        var c = a && a.then;
        if (a && (typeof a == "object" || typeof a == "function") && typeof c == "function") return function() {
          c.apply(a, arguments);
        };
      }
      function n(a, c) {
        var y = !1;
        function S(O) {
          y || (y = !0, r.reject(a, O));
        }
        function x(O) {
          y || (y = !0, r.resolve(a, O));
        }
        var R = h(function() {
          c(x, S);
        });
        R.status === "error" && S(R.value);
      }
      function h(a, c) {
        var y = {};
        try {
          y.value = a(c), y.status = "success";
        } catch (S) {
          y.status = "error", y.value = S;
        }
        return y;
      }
      (N.exports = m).prototype.finally = function(a) {
        if (typeof a != "function") return this;
        var c = this.constructor;
        return this.then(function(y) {
          return c.resolve(a()).then(function() {
            return y;
          });
        }, function(y) {
          return c.resolve(a()).then(function() {
            throw y;
          });
        });
      }, m.prototype.catch = function(a) {
        return this.then(null, a);
      }, m.prototype.then = function(a, c) {
        if (typeof a != "function" && this.state === g || typeof c != "function" && this.state === u) return this;
        var y = new this.constructor(o);
        return this.state !== v ? i(y, this.state === g ? a : c, this.outcome) : this.queue.push(new b(y, a, c)), y;
      }, b.prototype.callFulfilled = function(a) {
        r.resolve(this.promise, a);
      }, b.prototype.otherCallFulfilled = function(a) {
        i(this.promise, this.onFulfilled, a);
      }, b.prototype.callRejected = function(a) {
        r.reject(this.promise, a);
      }, b.prototype.otherCallRejected = function(a) {
        i(this.promise, this.onRejected, a);
      }, r.resolve = function(a, c) {
        var y = h(d, c);
        if (y.status === "error") return r.reject(a, y.value);
        var S = y.value;
        if (S) n(a, S);
        else {
          a.state = g, a.outcome = c;
          for (var x = -1, R = a.queue.length; ++x < R; ) a.queue[x].callFulfilled(c);
        }
        return a;
      }, r.reject = function(a, c) {
        a.state = u, a.outcome = c;
        for (var y = -1, S = a.queue.length; ++y < S; ) a.queue[y].callRejected(c);
        return a;
      }, m.resolve = function(a) {
        return a instanceof this ? a : r.resolve(new this(o), a);
      }, m.reject = function(a) {
        var c = new this(o);
        return r.reject(c, a);
      }, m.all = function(a) {
        var c = this;
        if (Object.prototype.toString.call(a) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var y = a.length, S = !1;
        if (!y) return this.resolve([]);
        for (var x = new Array(y), R = 0, O = -1, L = new this(o); ++O < y; ) I(a[O], O);
        return L;
        function I(W, X) {
          c.resolve(W).then(function(_) {
            x[X] = _, ++R !== y || S || (S = !0, r.resolve(L, x));
          }, function(_) {
            S || (S = !0, r.reject(L, _));
          });
        }
      }, m.race = function(a) {
        var c = this;
        if (Object.prototype.toString.call(a) !== "[object Array]") return this.reject(new TypeError("must be an array"));
        var y = a.length, S = !1;
        if (!y) return this.resolve([]);
        for (var x = -1, R = new this(o); ++x < y; ) O = a[x], c.resolve(O).then(function(L) {
          S || (S = !0, r.resolve(R, L));
        }, function(L) {
          S || (S = !0, r.reject(R, L));
        });
        var O;
        return R;
      };
    }, { immediate: 36 }], 38: [function(p, N, w) {
      var l = {};
      (0, p("./lib/utils/common").assign)(l, p("./lib/deflate"), p("./lib/inflate"), p("./lib/zlib/constants")), N.exports = l;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(p, N, w) {
      var l = p("./zlib/deflate"), o = p("./utils/common"), r = p("./utils/strings"), u = p("./zlib/messages"), g = p("./zlib/zstream"), v = Object.prototype.toString, m = 0, b = -1, i = 0, d = 8;
      function n(a) {
        if (!(this instanceof n)) return new n(a);
        this.options = o.assign({ level: b, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: i, to: "" }, a || {});
        var c = this.options;
        c.raw && 0 < c.windowBits ? c.windowBits = -c.windowBits : c.gzip && 0 < c.windowBits && c.windowBits < 16 && (c.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new g(), this.strm.avail_out = 0;
        var y = l.deflateInit2(this.strm, c.level, c.method, c.windowBits, c.memLevel, c.strategy);
        if (y !== m) throw new Error(u[y]);
        if (c.header && l.deflateSetHeader(this.strm, c.header), c.dictionary) {
          var S;
          if (S = typeof c.dictionary == "string" ? r.string2buf(c.dictionary) : v.call(c.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(c.dictionary) : c.dictionary, (y = l.deflateSetDictionary(this.strm, S)) !== m) throw new Error(u[y]);
          this._dict_set = !0;
        }
      }
      function h(a, c) {
        var y = new n(c);
        if (y.push(a, !0), y.err) throw y.msg || u[y.err];
        return y.result;
      }
      n.prototype.push = function(a, c) {
        var y, S, x = this.strm, R = this.options.chunkSize;
        if (this.ended) return !1;
        S = c === ~~c ? c : c === !0 ? 4 : 0, typeof a == "string" ? x.input = r.string2buf(a) : v.call(a) === "[object ArrayBuffer]" ? x.input = new Uint8Array(a) : x.input = a, x.next_in = 0, x.avail_in = x.input.length;
        do {
          if (x.avail_out === 0 && (x.output = new o.Buf8(R), x.next_out = 0, x.avail_out = R), (y = l.deflate(x, S)) !== 1 && y !== m) return this.onEnd(y), !(this.ended = !0);
          x.avail_out !== 0 && (x.avail_in !== 0 || S !== 4 && S !== 2) || (this.options.to === "string" ? this.onData(r.buf2binstring(o.shrinkBuf(x.output, x.next_out))) : this.onData(o.shrinkBuf(x.output, x.next_out)));
        } while ((0 < x.avail_in || x.avail_out === 0) && y !== 1);
        return S === 4 ? (y = l.deflateEnd(this.strm), this.onEnd(y), this.ended = !0, y === m) : S !== 2 || (this.onEnd(m), !(x.avail_out = 0));
      }, n.prototype.onData = function(a) {
        this.chunks.push(a);
      }, n.prototype.onEnd = function(a) {
        a === m && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg;
      }, w.Deflate = n, w.deflate = h, w.deflateRaw = function(a, c) {
        return (c = c || {}).raw = !0, h(a, c);
      }, w.gzip = function(a, c) {
        return (c = c || {}).gzip = !0, h(a, c);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(p, N, w) {
      var l = p("./zlib/inflate"), o = p("./utils/common"), r = p("./utils/strings"), u = p("./zlib/constants"), g = p("./zlib/messages"), v = p("./zlib/zstream"), m = p("./zlib/gzheader"), b = Object.prototype.toString;
      function i(n) {
        if (!(this instanceof i)) return new i(n);
        this.options = o.assign({ chunkSize: 16384, windowBits: 0, to: "" }, n || {});
        var h = this.options;
        h.raw && 0 <= h.windowBits && h.windowBits < 16 && (h.windowBits = -h.windowBits, h.windowBits === 0 && (h.windowBits = -15)), !(0 <= h.windowBits && h.windowBits < 16) || n && n.windowBits || (h.windowBits += 32), 15 < h.windowBits && h.windowBits < 48 && !(15 & h.windowBits) && (h.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new v(), this.strm.avail_out = 0;
        var a = l.inflateInit2(this.strm, h.windowBits);
        if (a !== u.Z_OK) throw new Error(g[a]);
        this.header = new m(), l.inflateGetHeader(this.strm, this.header);
      }
      function d(n, h) {
        var a = new i(h);
        if (a.push(n, !0), a.err) throw a.msg || g[a.err];
        return a.result;
      }
      i.prototype.push = function(n, h) {
        var a, c, y, S, x, R, O = this.strm, L = this.options.chunkSize, I = this.options.dictionary, W = !1;
        if (this.ended) return !1;
        c = h === ~~h ? h : h === !0 ? u.Z_FINISH : u.Z_NO_FLUSH, typeof n == "string" ? O.input = r.binstring2buf(n) : b.call(n) === "[object ArrayBuffer]" ? O.input = new Uint8Array(n) : O.input = n, O.next_in = 0, O.avail_in = O.input.length;
        do {
          if (O.avail_out === 0 && (O.output = new o.Buf8(L), O.next_out = 0, O.avail_out = L), (a = l.inflate(O, u.Z_NO_FLUSH)) === u.Z_NEED_DICT && I && (R = typeof I == "string" ? r.string2buf(I) : b.call(I) === "[object ArrayBuffer]" ? new Uint8Array(I) : I, a = l.inflateSetDictionary(this.strm, R)), a === u.Z_BUF_ERROR && W === !0 && (a = u.Z_OK, W = !1), a !== u.Z_STREAM_END && a !== u.Z_OK) return this.onEnd(a), !(this.ended = !0);
          O.next_out && (O.avail_out !== 0 && a !== u.Z_STREAM_END && (O.avail_in !== 0 || c !== u.Z_FINISH && c !== u.Z_SYNC_FLUSH) || (this.options.to === "string" ? (y = r.utf8border(O.output, O.next_out), S = O.next_out - y, x = r.buf2string(O.output, y), O.next_out = S, O.avail_out = L - S, S && o.arraySet(O.output, O.output, y, S, 0), this.onData(x)) : this.onData(o.shrinkBuf(O.output, O.next_out)))), O.avail_in === 0 && O.avail_out === 0 && (W = !0);
        } while ((0 < O.avail_in || O.avail_out === 0) && a !== u.Z_STREAM_END);
        return a === u.Z_STREAM_END && (c = u.Z_FINISH), c === u.Z_FINISH ? (a = l.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === u.Z_OK) : c !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK), !(O.avail_out = 0));
      }, i.prototype.onData = function(n) {
        this.chunks.push(n);
      }, i.prototype.onEnd = function(n) {
        n === u.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
      }, w.Inflate = i, w.inflate = d, w.inflateRaw = function(n, h) {
        return (h = h || {}).raw = !0, d(n, h);
      }, w.ungzip = d;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(p, N, w) {
      var l = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      w.assign = function(u) {
        for (var g = Array.prototype.slice.call(arguments, 1); g.length; ) {
          var v = g.shift();
          if (v) {
            if (typeof v != "object") throw new TypeError(v + "must be non-object");
            for (var m in v) v.hasOwnProperty(m) && (u[m] = v[m]);
          }
        }
        return u;
      }, w.shrinkBuf = function(u, g) {
        return u.length === g ? u : u.subarray ? u.subarray(0, g) : (u.length = g, u);
      };
      var o = { arraySet: function(u, g, v, m, b) {
        if (g.subarray && u.subarray) u.set(g.subarray(v, v + m), b);
        else for (var i = 0; i < m; i++) u[b + i] = g[v + i];
      }, flattenChunks: function(u) {
        var g, v, m, b, i, d;
        for (g = m = 0, v = u.length; g < v; g++) m += u[g].length;
        for (d = new Uint8Array(m), g = b = 0, v = u.length; g < v; g++) i = u[g], d.set(i, b), b += i.length;
        return d;
      } }, r = { arraySet: function(u, g, v, m, b) {
        for (var i = 0; i < m; i++) u[b + i] = g[v + i];
      }, flattenChunks: function(u) {
        return [].concat.apply([], u);
      } };
      w.setTyped = function(u) {
        u ? (w.Buf8 = Uint8Array, w.Buf16 = Uint16Array, w.Buf32 = Int32Array, w.assign(w, o)) : (w.Buf8 = Array, w.Buf16 = Array, w.Buf32 = Array, w.assign(w, r));
      }, w.setTyped(l);
    }, {}], 42: [function(p, N, w) {
      var l = p("./common"), o = !0, r = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        o = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        r = !1;
      }
      for (var u = new l.Buf8(256), g = 0; g < 256; g++) u[g] = 252 <= g ? 6 : 248 <= g ? 5 : 240 <= g ? 4 : 224 <= g ? 3 : 192 <= g ? 2 : 1;
      function v(m, b) {
        if (b < 65537 && (m.subarray && r || !m.subarray && o)) return String.fromCharCode.apply(null, l.shrinkBuf(m, b));
        for (var i = "", d = 0; d < b; d++) i += String.fromCharCode(m[d]);
        return i;
      }
      u[254] = u[254] = 1, w.string2buf = function(m) {
        var b, i, d, n, h, a = m.length, c = 0;
        for (n = 0; n < a; n++) (64512 & (i = m.charCodeAt(n))) == 55296 && n + 1 < a && (64512 & (d = m.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), c += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
        for (b = new l.Buf8(c), n = h = 0; h < c; n++) (64512 & (i = m.charCodeAt(n))) == 55296 && n + 1 < a && (64512 & (d = m.charCodeAt(n + 1))) == 56320 && (i = 65536 + (i - 55296 << 10) + (d - 56320), n++), i < 128 ? b[h++] = i : (i < 2048 ? b[h++] = 192 | i >>> 6 : (i < 65536 ? b[h++] = 224 | i >>> 12 : (b[h++] = 240 | i >>> 18, b[h++] = 128 | i >>> 12 & 63), b[h++] = 128 | i >>> 6 & 63), b[h++] = 128 | 63 & i);
        return b;
      }, w.buf2binstring = function(m) {
        return v(m, m.length);
      }, w.binstring2buf = function(m) {
        for (var b = new l.Buf8(m.length), i = 0, d = b.length; i < d; i++) b[i] = m.charCodeAt(i);
        return b;
      }, w.buf2string = function(m, b) {
        var i, d, n, h, a = b || m.length, c = new Array(2 * a);
        for (i = d = 0; i < a; ) if ((n = m[i++]) < 128) c[d++] = n;
        else if (4 < (h = u[n])) c[d++] = 65533, i += h - 1;
        else {
          for (n &= h === 2 ? 31 : h === 3 ? 15 : 7; 1 < h && i < a; ) n = n << 6 | 63 & m[i++], h--;
          1 < h ? c[d++] = 65533 : n < 65536 ? c[d++] = n : (n -= 65536, c[d++] = 55296 | n >> 10 & 1023, c[d++] = 56320 | 1023 & n);
        }
        return v(c, d);
      }, w.utf8border = function(m, b) {
        var i;
        for ((b = b || m.length) > m.length && (b = m.length), i = b - 1; 0 <= i && (192 & m[i]) == 128; ) i--;
        return i < 0 || i === 0 ? b : i + u[m[i]] > b ? i : b;
      };
    }, { "./common": 41 }], 43: [function(p, N, w) {
      N.exports = function(l, o, r, u) {
        for (var g = 65535 & l | 0, v = l >>> 16 & 65535 | 0, m = 0; r !== 0; ) {
          for (r -= m = 2e3 < r ? 2e3 : r; v = v + (g = g + o[u++] | 0) | 0, --m; ) ;
          g %= 65521, v %= 65521;
        }
        return g | v << 16 | 0;
      };
    }, {}], 44: [function(p, N, w) {
      N.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(p, N, w) {
      var l = function() {
        for (var o, r = [], u = 0; u < 256; u++) {
          o = u;
          for (var g = 0; g < 8; g++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
          r[u] = o;
        }
        return r;
      }();
      N.exports = function(o, r, u, g) {
        var v = l, m = g + u;
        o ^= -1;
        for (var b = g; b < m; b++) o = o >>> 8 ^ v[255 & (o ^ r[b])];
        return -1 ^ o;
      };
    }, {}], 46: [function(p, N, w) {
      var l, o = p("../utils/common"), r = p("./trees"), u = p("./adler32"), g = p("./crc32"), v = p("./messages"), m = 0, b = 4, i = 0, d = -2, n = -1, h = 4, a = 2, c = 8, y = 9, S = 286, x = 30, R = 19, O = 2 * S + 1, L = 15, I = 3, W = 258, X = W + I + 1, _ = 42, B = 113, e = 1, T = 2, J = 3, P = 4;
      function $(t, D) {
        return t.msg = v[D], D;
      }
      function j(t) {
        return (t << 1) - (4 < t ? 9 : 0);
      }
      function V(t) {
        for (var D = t.length; 0 <= --D; ) t[D] = 0;
      }
      function E(t) {
        var D = t.state, A = D.pending;
        A > t.avail_out && (A = t.avail_out), A !== 0 && (o.arraySet(t.output, D.pending_buf, D.pending_out, A, t.next_out), t.next_out += A, D.pending_out += A, t.total_out += A, t.avail_out -= A, D.pending -= A, D.pending === 0 && (D.pending_out = 0));
      }
      function C(t, D) {
        r._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, D), t.block_start = t.strstart, E(t.strm);
      }
      function q(t, D) {
        t.pending_buf[t.pending++] = D;
      }
      function G(t, D) {
        t.pending_buf[t.pending++] = D >>> 8 & 255, t.pending_buf[t.pending++] = 255 & D;
      }
      function H(t, D) {
        var A, f, s = t.max_chain_length, k = t.strstart, F = t.prev_length, U = t.nice_match, z = t.strstart > t.w_size - X ? t.strstart - (t.w_size - X) : 0, Z = t.window, K = t.w_mask, M = t.prev, Y = t.strstart + W, nt = Z[k + F - 1], tt = Z[k + F];
        t.prev_length >= t.good_match && (s >>= 2), U > t.lookahead && (U = t.lookahead);
        do
          if (Z[(A = D) + F] === tt && Z[A + F - 1] === nt && Z[A] === Z[k] && Z[++A] === Z[k + 1]) {
            k += 2, A++;
            do
              ;
            while (Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && Z[++k] === Z[++A] && k < Y);
            if (f = W - (Y - k), k = Y - W, F < f) {
              if (t.match_start = D, U <= (F = f)) break;
              nt = Z[k + F - 1], tt = Z[k + F];
            }
          }
        while ((D = M[D & K]) > z && --s != 0);
        return F <= t.lookahead ? F : t.lookahead;
      }
      function it(t) {
        var D, A, f, s, k, F, U, z, Z, K, M = t.w_size;
        do {
          if (s = t.window_size - t.lookahead - t.strstart, t.strstart >= M + (M - X)) {
            for (o.arraySet(t.window, t.window, M, M, 0), t.match_start -= M, t.strstart -= M, t.block_start -= M, D = A = t.hash_size; f = t.head[--D], t.head[D] = M <= f ? f - M : 0, --A; ) ;
            for (D = A = M; f = t.prev[--D], t.prev[D] = M <= f ? f - M : 0, --A; ) ;
            s += M;
          }
          if (t.strm.avail_in === 0) break;
          if (F = t.strm, U = t.window, z = t.strstart + t.lookahead, Z = s, K = void 0, K = F.avail_in, Z < K && (K = Z), A = K === 0 ? 0 : (F.avail_in -= K, o.arraySet(U, F.input, F.next_in, K, z), F.state.wrap === 1 ? F.adler = u(F.adler, U, K, z) : F.state.wrap === 2 && (F.adler = g(F.adler, U, K, z)), F.next_in += K, F.total_in += K, K), t.lookahead += A, t.lookahead + t.insert >= I) for (k = t.strstart - t.insert, t.ins_h = t.window[k], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[k + I - 1]) & t.hash_mask, t.prev[k & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = k, k++, t.insert--, !(t.lookahead + t.insert < I)); ) ;
        } while (t.lookahead < X && t.strm.avail_in !== 0);
      }
      function ut(t, D) {
        for (var A, f; ; ) {
          if (t.lookahead < X) {
            if (it(t), t.lookahead < X && D === m) return e;
            if (t.lookahead === 0) break;
          }
          if (A = 0, t.lookahead >= I && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + I - 1]) & t.hash_mask, A = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), A !== 0 && t.strstart - A <= t.w_size - X && (t.match_length = H(t, A)), t.match_length >= I) if (f = r._tr_tally(t, t.strstart - t.match_start, t.match_length - I), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= I) {
            for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + I - 1]) & t.hash_mask, A = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, --t.match_length != 0; ) ;
            t.strstart++;
          } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
          else f = r._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
          if (f && (C(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = t.strstart < I - 1 ? t.strstart : I - 1, D === b ? (C(t, !0), t.strm.avail_out === 0 ? J : P) : t.last_lit && (C(t, !1), t.strm.avail_out === 0) ? e : T;
      }
      function Q(t, D) {
        for (var A, f, s; ; ) {
          if (t.lookahead < X) {
            if (it(t), t.lookahead < X && D === m) return e;
            if (t.lookahead === 0) break;
          }
          if (A = 0, t.lookahead >= I && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + I - 1]) & t.hash_mask, A = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = I - 1, A !== 0 && t.prev_length < t.max_lazy_match && t.strstart - A <= t.w_size - X && (t.match_length = H(t, A), t.match_length <= 5 && (t.strategy === 1 || t.match_length === I && 4096 < t.strstart - t.match_start) && (t.match_length = I - 1)), t.prev_length >= I && t.match_length <= t.prev_length) {
            for (s = t.strstart + t.lookahead - I, f = r._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - I), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= s && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + I - 1]) & t.hash_mask, A = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), --t.prev_length != 0; ) ;
            if (t.match_available = 0, t.match_length = I - 1, t.strstart++, f && (C(t, !1), t.strm.avail_out === 0)) return e;
          } else if (t.match_available) {
            if ((f = r._tr_tally(t, 0, t.window[t.strstart - 1])) && C(t, !1), t.strstart++, t.lookahead--, t.strm.avail_out === 0) return e;
          } else t.match_available = 1, t.strstart++, t.lookahead--;
        }
        return t.match_available && (f = r._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < I - 1 ? t.strstart : I - 1, D === b ? (C(t, !0), t.strm.avail_out === 0 ? J : P) : t.last_lit && (C(t, !1), t.strm.avail_out === 0) ? e : T;
      }
      function rt(t, D, A, f, s) {
        this.good_length = t, this.max_lazy = D, this.nice_length = A, this.max_chain = f, this.func = s;
      }
      function ot() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = c, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new o.Buf16(2 * O), this.dyn_dtree = new o.Buf16(2 * (2 * x + 1)), this.bl_tree = new o.Buf16(2 * (2 * R + 1)), V(this.dyn_ltree), V(this.dyn_dtree), V(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new o.Buf16(L + 1), this.heap = new o.Buf16(2 * S + 1), V(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new o.Buf16(2 * S + 1), V(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function at(t) {
        var D;
        return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = a, (D = t.state).pending = 0, D.pending_out = 0, D.wrap < 0 && (D.wrap = -D.wrap), D.status = D.wrap ? _ : B, t.adler = D.wrap === 2 ? 0 : 1, D.last_flush = m, r._tr_init(D), i) : $(t, d);
      }
      function dt(t) {
        var D = at(t);
        return D === i && function(A) {
          A.window_size = 2 * A.w_size, V(A.head), A.max_lazy_match = l[A.level].max_lazy, A.good_match = l[A.level].good_length, A.nice_match = l[A.level].nice_length, A.max_chain_length = l[A.level].max_chain, A.strstart = 0, A.block_start = 0, A.lookahead = 0, A.insert = 0, A.match_length = A.prev_length = I - 1, A.match_available = 0, A.ins_h = 0;
        }(t.state), D;
      }
      function ft(t, D, A, f, s, k) {
        if (!t) return d;
        var F = 1;
        if (D === n && (D = 6), f < 0 ? (F = 0, f = -f) : 15 < f && (F = 2, f -= 16), s < 1 || y < s || A !== c || f < 8 || 15 < f || D < 0 || 9 < D || k < 0 || h < k) return $(t, d);
        f === 8 && (f = 9);
        var U = new ot();
        return (t.state = U).strm = t, U.wrap = F, U.gzhead = null, U.w_bits = f, U.w_size = 1 << U.w_bits, U.w_mask = U.w_size - 1, U.hash_bits = s + 7, U.hash_size = 1 << U.hash_bits, U.hash_mask = U.hash_size - 1, U.hash_shift = ~~((U.hash_bits + I - 1) / I), U.window = new o.Buf8(2 * U.w_size), U.head = new o.Buf16(U.hash_size), U.prev = new o.Buf16(U.w_size), U.lit_bufsize = 1 << s + 6, U.pending_buf_size = 4 * U.lit_bufsize, U.pending_buf = new o.Buf8(U.pending_buf_size), U.d_buf = 1 * U.lit_bufsize, U.l_buf = 3 * U.lit_bufsize, U.level = D, U.strategy = k, U.method = A, dt(t);
      }
      l = [new rt(0, 0, 0, 0, function(t, D) {
        var A = 65535;
        for (A > t.pending_buf_size - 5 && (A = t.pending_buf_size - 5); ; ) {
          if (t.lookahead <= 1) {
            if (it(t), t.lookahead === 0 && D === m) return e;
            if (t.lookahead === 0) break;
          }
          t.strstart += t.lookahead, t.lookahead = 0;
          var f = t.block_start + A;
          if ((t.strstart === 0 || t.strstart >= f) && (t.lookahead = t.strstart - f, t.strstart = f, C(t, !1), t.strm.avail_out === 0) || t.strstart - t.block_start >= t.w_size - X && (C(t, !1), t.strm.avail_out === 0)) return e;
        }
        return t.insert = 0, D === b ? (C(t, !0), t.strm.avail_out === 0 ? J : P) : (t.strstart > t.block_start && (C(t, !1), t.strm.avail_out), e);
      }), new rt(4, 4, 8, 4, ut), new rt(4, 5, 16, 8, ut), new rt(4, 6, 32, 32, ut), new rt(4, 4, 16, 16, Q), new rt(8, 16, 32, 32, Q), new rt(8, 16, 128, 128, Q), new rt(8, 32, 128, 256, Q), new rt(32, 128, 258, 1024, Q), new rt(32, 258, 258, 4096, Q)], w.deflateInit = function(t, D) {
        return ft(t, D, c, 15, 8, 0);
      }, w.deflateInit2 = ft, w.deflateReset = dt, w.deflateResetKeep = at, w.deflateSetHeader = function(t, D) {
        return t && t.state ? t.state.wrap !== 2 ? d : (t.state.gzhead = D, i) : d;
      }, w.deflate = function(t, D) {
        var A, f, s, k;
        if (!t || !t.state || 5 < D || D < 0) return t ? $(t, d) : d;
        if (f = t.state, !t.output || !t.input && t.avail_in !== 0 || f.status === 666 && D !== b) return $(t, t.avail_out === 0 ? -5 : d);
        if (f.strm = t, A = f.last_flush, f.last_flush = D, f.status === _) if (f.wrap === 2) t.adler = 0, q(f, 31), q(f, 139), q(f, 8), f.gzhead ? (q(f, (f.gzhead.text ? 1 : 0) + (f.gzhead.hcrc ? 2 : 0) + (f.gzhead.extra ? 4 : 0) + (f.gzhead.name ? 8 : 0) + (f.gzhead.comment ? 16 : 0)), q(f, 255 & f.gzhead.time), q(f, f.gzhead.time >> 8 & 255), q(f, f.gzhead.time >> 16 & 255), q(f, f.gzhead.time >> 24 & 255), q(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), q(f, 255 & f.gzhead.os), f.gzhead.extra && f.gzhead.extra.length && (q(f, 255 & f.gzhead.extra.length), q(f, f.gzhead.extra.length >> 8 & 255)), f.gzhead.hcrc && (t.adler = g(t.adler, f.pending_buf, f.pending, 0)), f.gzindex = 0, f.status = 69) : (q(f, 0), q(f, 0), q(f, 0), q(f, 0), q(f, 0), q(f, f.level === 9 ? 2 : 2 <= f.strategy || f.level < 2 ? 4 : 0), q(f, 3), f.status = B);
        else {
          var F = c + (f.w_bits - 8 << 4) << 8;
          F |= (2 <= f.strategy || f.level < 2 ? 0 : f.level < 6 ? 1 : f.level === 6 ? 2 : 3) << 6, f.strstart !== 0 && (F |= 32), F += 31 - F % 31, f.status = B, G(f, F), f.strstart !== 0 && (G(f, t.adler >>> 16), G(f, 65535 & t.adler)), t.adler = 1;
        }
        if (f.status === 69) if (f.gzhead.extra) {
          for (s = f.pending; f.gzindex < (65535 & f.gzhead.extra.length) && (f.pending !== f.pending_buf_size || (f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), E(t), s = f.pending, f.pending !== f.pending_buf_size)); ) q(f, 255 & f.gzhead.extra[f.gzindex]), f.gzindex++;
          f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), f.gzindex === f.gzhead.extra.length && (f.gzindex = 0, f.status = 73);
        } else f.status = 73;
        if (f.status === 73) if (f.gzhead.name) {
          s = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), E(t), s = f.pending, f.pending === f.pending_buf_size)) {
              k = 1;
              break;
            }
            k = f.gzindex < f.gzhead.name.length ? 255 & f.gzhead.name.charCodeAt(f.gzindex++) : 0, q(f, k);
          } while (k !== 0);
          f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), k === 0 && (f.gzindex = 0, f.status = 91);
        } else f.status = 91;
        if (f.status === 91) if (f.gzhead.comment) {
          s = f.pending;
          do {
            if (f.pending === f.pending_buf_size && (f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), E(t), s = f.pending, f.pending === f.pending_buf_size)) {
              k = 1;
              break;
            }
            k = f.gzindex < f.gzhead.comment.length ? 255 & f.gzhead.comment.charCodeAt(f.gzindex++) : 0, q(f, k);
          } while (k !== 0);
          f.gzhead.hcrc && f.pending > s && (t.adler = g(t.adler, f.pending_buf, f.pending - s, s)), k === 0 && (f.status = 103);
        } else f.status = 103;
        if (f.status === 103 && (f.gzhead.hcrc ? (f.pending + 2 > f.pending_buf_size && E(t), f.pending + 2 <= f.pending_buf_size && (q(f, 255 & t.adler), q(f, t.adler >> 8 & 255), t.adler = 0, f.status = B)) : f.status = B), f.pending !== 0) {
          if (E(t), t.avail_out === 0) return f.last_flush = -1, i;
        } else if (t.avail_in === 0 && j(D) <= j(A) && D !== b) return $(t, -5);
        if (f.status === 666 && t.avail_in !== 0) return $(t, -5);
        if (t.avail_in !== 0 || f.lookahead !== 0 || D !== m && f.status !== 666) {
          var U = f.strategy === 2 ? function(z, Z) {
            for (var K; ; ) {
              if (z.lookahead === 0 && (it(z), z.lookahead === 0)) {
                if (Z === m) return e;
                break;
              }
              if (z.match_length = 0, K = r._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, K && (C(z, !1), z.strm.avail_out === 0)) return e;
            }
            return z.insert = 0, Z === b ? (C(z, !0), z.strm.avail_out === 0 ? J : P) : z.last_lit && (C(z, !1), z.strm.avail_out === 0) ? e : T;
          }(f, D) : f.strategy === 3 ? function(z, Z) {
            for (var K, M, Y, nt, tt = z.window; ; ) {
              if (z.lookahead <= W) {
                if (it(z), z.lookahead <= W && Z === m) return e;
                if (z.lookahead === 0) break;
              }
              if (z.match_length = 0, z.lookahead >= I && 0 < z.strstart && (M = tt[Y = z.strstart - 1]) === tt[++Y] && M === tt[++Y] && M === tt[++Y]) {
                nt = z.strstart + W;
                do
                  ;
                while (M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && M === tt[++Y] && Y < nt);
                z.match_length = W - (nt - Y), z.match_length > z.lookahead && (z.match_length = z.lookahead);
              }
              if (z.match_length >= I ? (K = r._tr_tally(z, 1, z.match_length - I), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (K = r._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), K && (C(z, !1), z.strm.avail_out === 0)) return e;
            }
            return z.insert = 0, Z === b ? (C(z, !0), z.strm.avail_out === 0 ? J : P) : z.last_lit && (C(z, !1), z.strm.avail_out === 0) ? e : T;
          }(f, D) : l[f.level].func(f, D);
          if (U !== J && U !== P || (f.status = 666), U === e || U === J) return t.avail_out === 0 && (f.last_flush = -1), i;
          if (U === T && (D === 1 ? r._tr_align(f) : D !== 5 && (r._tr_stored_block(f, 0, 0, !1), D === 3 && (V(f.head), f.lookahead === 0 && (f.strstart = 0, f.block_start = 0, f.insert = 0))), E(t), t.avail_out === 0)) return f.last_flush = -1, i;
        }
        return D !== b ? i : f.wrap <= 0 ? 1 : (f.wrap === 2 ? (q(f, 255 & t.adler), q(f, t.adler >> 8 & 255), q(f, t.adler >> 16 & 255), q(f, t.adler >> 24 & 255), q(f, 255 & t.total_in), q(f, t.total_in >> 8 & 255), q(f, t.total_in >> 16 & 255), q(f, t.total_in >> 24 & 255)) : (G(f, t.adler >>> 16), G(f, 65535 & t.adler)), E(t), 0 < f.wrap && (f.wrap = -f.wrap), f.pending !== 0 ? i : 1);
      }, w.deflateEnd = function(t) {
        var D;
        return t && t.state ? (D = t.state.status) !== _ && D !== 69 && D !== 73 && D !== 91 && D !== 103 && D !== B && D !== 666 ? $(t, d) : (t.state = null, D === B ? $(t, -3) : i) : d;
      }, w.deflateSetDictionary = function(t, D) {
        var A, f, s, k, F, U, z, Z, K = D.length;
        if (!t || !t.state || (k = (A = t.state).wrap) === 2 || k === 1 && A.status !== _ || A.lookahead) return d;
        for (k === 1 && (t.adler = u(t.adler, D, K, 0)), A.wrap = 0, K >= A.w_size && (k === 0 && (V(A.head), A.strstart = 0, A.block_start = 0, A.insert = 0), Z = new o.Buf8(A.w_size), o.arraySet(Z, D, K - A.w_size, A.w_size, 0), D = Z, K = A.w_size), F = t.avail_in, U = t.next_in, z = t.input, t.avail_in = K, t.next_in = 0, t.input = D, it(A); A.lookahead >= I; ) {
          for (f = A.strstart, s = A.lookahead - (I - 1); A.ins_h = (A.ins_h << A.hash_shift ^ A.window[f + I - 1]) & A.hash_mask, A.prev[f & A.w_mask] = A.head[A.ins_h], A.head[A.ins_h] = f, f++, --s; ) ;
          A.strstart = f, A.lookahead = I - 1, it(A);
        }
        return A.strstart += A.lookahead, A.block_start = A.strstart, A.insert = A.lookahead, A.lookahead = 0, A.match_length = A.prev_length = I - 1, A.match_available = 0, t.next_in = U, t.input = z, t.avail_in = F, A.wrap = k, i;
      }, w.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(p, N, w) {
      N.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      };
    }, {}], 48: [function(p, N, w) {
      N.exports = function(l, o) {
        var r, u, g, v, m, b, i, d, n, h, a, c, y, S, x, R, O, L, I, W, X, _, B, e, T;
        r = l.state, u = l.next_in, e = l.input, g = u + (l.avail_in - 5), v = l.next_out, T = l.output, m = v - (o - l.avail_out), b = v + (l.avail_out - 257), i = r.dmax, d = r.wsize, n = r.whave, h = r.wnext, a = r.window, c = r.hold, y = r.bits, S = r.lencode, x = r.distcode, R = (1 << r.lenbits) - 1, O = (1 << r.distbits) - 1;
        t: do {
          y < 15 && (c += e[u++] << y, y += 8, c += e[u++] << y, y += 8), L = S[c & R];
          e: for (; ; ) {
            if (c >>>= I = L >>> 24, y -= I, (I = L >>> 16 & 255) === 0) T[v++] = 65535 & L;
            else {
              if (!(16 & I)) {
                if (!(64 & I)) {
                  L = S[(65535 & L) + (c & (1 << I) - 1)];
                  continue e;
                }
                if (32 & I) {
                  r.mode = 12;
                  break t;
                }
                l.msg = "invalid literal/length code", r.mode = 30;
                break t;
              }
              W = 65535 & L, (I &= 15) && (y < I && (c += e[u++] << y, y += 8), W += c & (1 << I) - 1, c >>>= I, y -= I), y < 15 && (c += e[u++] << y, y += 8, c += e[u++] << y, y += 8), L = x[c & O];
              r: for (; ; ) {
                if (c >>>= I = L >>> 24, y -= I, !(16 & (I = L >>> 16 & 255))) {
                  if (!(64 & I)) {
                    L = x[(65535 & L) + (c & (1 << I) - 1)];
                    continue r;
                  }
                  l.msg = "invalid distance code", r.mode = 30;
                  break t;
                }
                if (X = 65535 & L, y < (I &= 15) && (c += e[u++] << y, (y += 8) < I && (c += e[u++] << y, y += 8)), i < (X += c & (1 << I) - 1)) {
                  l.msg = "invalid distance too far back", r.mode = 30;
                  break t;
                }
                if (c >>>= I, y -= I, (I = v - m) < X) {
                  if (n < (I = X - I) && r.sane) {
                    l.msg = "invalid distance too far back", r.mode = 30;
                    break t;
                  }
                  if (B = a, (_ = 0) === h) {
                    if (_ += d - I, I < W) {
                      for (W -= I; T[v++] = a[_++], --I; ) ;
                      _ = v - X, B = T;
                    }
                  } else if (h < I) {
                    if (_ += d + h - I, (I -= h) < W) {
                      for (W -= I; T[v++] = a[_++], --I; ) ;
                      if (_ = 0, h < W) {
                        for (W -= I = h; T[v++] = a[_++], --I; ) ;
                        _ = v - X, B = T;
                      }
                    }
                  } else if (_ += h - I, I < W) {
                    for (W -= I; T[v++] = a[_++], --I; ) ;
                    _ = v - X, B = T;
                  }
                  for (; 2 < W; ) T[v++] = B[_++], T[v++] = B[_++], T[v++] = B[_++], W -= 3;
                  W && (T[v++] = B[_++], 1 < W && (T[v++] = B[_++]));
                } else {
                  for (_ = v - X; T[v++] = T[_++], T[v++] = T[_++], T[v++] = T[_++], 2 < (W -= 3); ) ;
                  W && (T[v++] = T[_++], 1 < W && (T[v++] = T[_++]));
                }
                break;
              }
            }
            break;
          }
        } while (u < g && v < b);
        u -= W = y >> 3, c &= (1 << (y -= W << 3)) - 1, l.next_in = u, l.next_out = v, l.avail_in = u < g ? g - u + 5 : 5 - (u - g), l.avail_out = v < b ? b - v + 257 : 257 - (v - b), r.hold = c, r.bits = y;
      };
    }, {}], 49: [function(p, N, w) {
      var l = p("../utils/common"), o = p("./adler32"), r = p("./crc32"), u = p("./inffast"), g = p("./inftrees"), v = 1, m = 2, b = 0, i = -2, d = 1, n = 852, h = 592;
      function a(_) {
        return (_ >>> 24 & 255) + (_ >>> 8 & 65280) + ((65280 & _) << 8) + ((255 & _) << 24);
      }
      function c() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new l.Buf16(320), this.work = new l.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function y(_) {
        var B;
        return _ && _.state ? (B = _.state, _.total_in = _.total_out = B.total = 0, _.msg = "", B.wrap && (_.adler = 1 & B.wrap), B.mode = d, B.last = 0, B.havedict = 0, B.dmax = 32768, B.head = null, B.hold = 0, B.bits = 0, B.lencode = B.lendyn = new l.Buf32(n), B.distcode = B.distdyn = new l.Buf32(h), B.sane = 1, B.back = -1, b) : i;
      }
      function S(_) {
        var B;
        return _ && _.state ? ((B = _.state).wsize = 0, B.whave = 0, B.wnext = 0, y(_)) : i;
      }
      function x(_, B) {
        var e, T;
        return _ && _.state ? (T = _.state, B < 0 ? (e = 0, B = -B) : (e = 1 + (B >> 4), B < 48 && (B &= 15)), B && (B < 8 || 15 < B) ? i : (T.window !== null && T.wbits !== B && (T.window = null), T.wrap = e, T.wbits = B, S(_))) : i;
      }
      function R(_, B) {
        var e, T;
        return _ ? (T = new c(), (_.state = T).window = null, (e = x(_, B)) !== b && (_.state = null), e) : i;
      }
      var O, L, I = !0;
      function W(_) {
        if (I) {
          var B;
          for (O = new l.Buf32(512), L = new l.Buf32(32), B = 0; B < 144; ) _.lens[B++] = 8;
          for (; B < 256; ) _.lens[B++] = 9;
          for (; B < 280; ) _.lens[B++] = 7;
          for (; B < 288; ) _.lens[B++] = 8;
          for (g(v, _.lens, 0, 288, O, 0, _.work, { bits: 9 }), B = 0; B < 32; ) _.lens[B++] = 5;
          g(m, _.lens, 0, 32, L, 0, _.work, { bits: 5 }), I = !1;
        }
        _.lencode = O, _.lenbits = 9, _.distcode = L, _.distbits = 5;
      }
      function X(_, B, e, T) {
        var J, P = _.state;
        return P.window === null && (P.wsize = 1 << P.wbits, P.wnext = 0, P.whave = 0, P.window = new l.Buf8(P.wsize)), T >= P.wsize ? (l.arraySet(P.window, B, e - P.wsize, P.wsize, 0), P.wnext = 0, P.whave = P.wsize) : (T < (J = P.wsize - P.wnext) && (J = T), l.arraySet(P.window, B, e - T, J, P.wnext), (T -= J) ? (l.arraySet(P.window, B, e - T, T, 0), P.wnext = T, P.whave = P.wsize) : (P.wnext += J, P.wnext === P.wsize && (P.wnext = 0), P.whave < P.wsize && (P.whave += J))), 0;
      }
      w.inflateReset = S, w.inflateReset2 = x, w.inflateResetKeep = y, w.inflateInit = function(_) {
        return R(_, 15);
      }, w.inflateInit2 = R, w.inflate = function(_, B) {
        var e, T, J, P, $, j, V, E, C, q, G, H, it, ut, Q, rt, ot, at, dt, ft, t, D, A, f, s = 0, k = new l.Buf8(4), F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!_ || !_.state || !_.output || !_.input && _.avail_in !== 0) return i;
        (e = _.state).mode === 12 && (e.mode = 13), $ = _.next_out, J = _.output, V = _.avail_out, P = _.next_in, T = _.input, j = _.avail_in, E = e.hold, C = e.bits, q = j, G = V, D = b;
        t: for (; ; ) switch (e.mode) {
          case d:
            if (e.wrap === 0) {
              e.mode = 13;
              break;
            }
            for (; C < 16; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if (2 & e.wrap && E === 35615) {
              k[e.check = 0] = 255 & E, k[1] = E >>> 8 & 255, e.check = r(e.check, k, 2, 0), C = E = 0, e.mode = 2;
              break;
            }
            if (e.flags = 0, e.head && (e.head.done = !1), !(1 & e.wrap) || (((255 & E) << 8) + (E >> 8)) % 31) {
              _.msg = "incorrect header check", e.mode = 30;
              break;
            }
            if ((15 & E) != 8) {
              _.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (C -= 4, t = 8 + (15 & (E >>>= 4)), e.wbits === 0) e.wbits = t;
            else if (t > e.wbits) {
              _.msg = "invalid window size", e.mode = 30;
              break;
            }
            e.dmax = 1 << t, _.adler = e.check = 1, e.mode = 512 & E ? 10 : 12, C = E = 0;
            break;
          case 2:
            for (; C < 16; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if (e.flags = E, (255 & e.flags) != 8) {
              _.msg = "unknown compression method", e.mode = 30;
              break;
            }
            if (57344 & e.flags) {
              _.msg = "unknown header flags set", e.mode = 30;
              break;
            }
            e.head && (e.head.text = E >> 8 & 1), 512 & e.flags && (k[0] = 255 & E, k[1] = E >>> 8 & 255, e.check = r(e.check, k, 2, 0)), C = E = 0, e.mode = 3;
          case 3:
            for (; C < 32; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            e.head && (e.head.time = E), 512 & e.flags && (k[0] = 255 & E, k[1] = E >>> 8 & 255, k[2] = E >>> 16 & 255, k[3] = E >>> 24 & 255, e.check = r(e.check, k, 4, 0)), C = E = 0, e.mode = 4;
          case 4:
            for (; C < 16; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            e.head && (e.head.xflags = 255 & E, e.head.os = E >> 8), 512 & e.flags && (k[0] = 255 & E, k[1] = E >>> 8 & 255, e.check = r(e.check, k, 2, 0)), C = E = 0, e.mode = 5;
          case 5:
            if (1024 & e.flags) {
              for (; C < 16; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              e.length = E, e.head && (e.head.extra_len = E), 512 & e.flags && (k[0] = 255 & E, k[1] = E >>> 8 & 255, e.check = r(e.check, k, 2, 0)), C = E = 0;
            } else e.head && (e.head.extra = null);
            e.mode = 6;
          case 6:
            if (1024 & e.flags && (j < (H = e.length) && (H = j), H && (e.head && (t = e.head.extra_len - e.length, e.head.extra || (e.head.extra = new Array(e.head.extra_len)), l.arraySet(e.head.extra, T, P, H, t)), 512 & e.flags && (e.check = r(e.check, T, H, P)), j -= H, P += H, e.length -= H), e.length)) break t;
            e.length = 0, e.mode = 7;
          case 7:
            if (2048 & e.flags) {
              if (j === 0) break t;
              for (H = 0; t = T[P + H++], e.head && t && e.length < 65536 && (e.head.name += String.fromCharCode(t)), t && H < j; ) ;
              if (512 & e.flags && (e.check = r(e.check, T, H, P)), j -= H, P += H, t) break t;
            } else e.head && (e.head.name = null);
            e.length = 0, e.mode = 8;
          case 8:
            if (4096 & e.flags) {
              if (j === 0) break t;
              for (H = 0; t = T[P + H++], e.head && t && e.length < 65536 && (e.head.comment += String.fromCharCode(t)), t && H < j; ) ;
              if (512 & e.flags && (e.check = r(e.check, T, H, P)), j -= H, P += H, t) break t;
            } else e.head && (e.head.comment = null);
            e.mode = 9;
          case 9:
            if (512 & e.flags) {
              for (; C < 16; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              if (E !== (65535 & e.check)) {
                _.msg = "header crc mismatch", e.mode = 30;
                break;
              }
              C = E = 0;
            }
            e.head && (e.head.hcrc = e.flags >> 9 & 1, e.head.done = !0), _.adler = e.check = 0, e.mode = 12;
            break;
          case 10:
            for (; C < 32; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            _.adler = e.check = a(E), C = E = 0, e.mode = 11;
          case 11:
            if (e.havedict === 0) return _.next_out = $, _.avail_out = V, _.next_in = P, _.avail_in = j, e.hold = E, e.bits = C, 2;
            _.adler = e.check = 1, e.mode = 12;
          case 12:
            if (B === 5 || B === 6) break t;
          case 13:
            if (e.last) {
              E >>>= 7 & C, C -= 7 & C, e.mode = 27;
              break;
            }
            for (; C < 3; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            switch (e.last = 1 & E, C -= 1, 3 & (E >>>= 1)) {
              case 0:
                e.mode = 14;
                break;
              case 1:
                if (W(e), e.mode = 20, B !== 6) break;
                E >>>= 2, C -= 2;
                break t;
              case 2:
                e.mode = 17;
                break;
              case 3:
                _.msg = "invalid block type", e.mode = 30;
            }
            E >>>= 2, C -= 2;
            break;
          case 14:
            for (E >>>= 7 & C, C -= 7 & C; C < 32; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if ((65535 & E) != (E >>> 16 ^ 65535)) {
              _.msg = "invalid stored block lengths", e.mode = 30;
              break;
            }
            if (e.length = 65535 & E, C = E = 0, e.mode = 15, B === 6) break t;
          case 15:
            e.mode = 16;
          case 16:
            if (H = e.length) {
              if (j < H && (H = j), V < H && (H = V), H === 0) break t;
              l.arraySet(J, T, P, H, $), j -= H, P += H, V -= H, $ += H, e.length -= H;
              break;
            }
            e.mode = 12;
            break;
          case 17:
            for (; C < 14; ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if (e.nlen = 257 + (31 & E), E >>>= 5, C -= 5, e.ndist = 1 + (31 & E), E >>>= 5, C -= 5, e.ncode = 4 + (15 & E), E >>>= 4, C -= 4, 286 < e.nlen || 30 < e.ndist) {
              _.msg = "too many length or distance symbols", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 18;
          case 18:
            for (; e.have < e.ncode; ) {
              for (; C < 3; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              e.lens[F[e.have++]] = 7 & E, E >>>= 3, C -= 3;
            }
            for (; e.have < 19; ) e.lens[F[e.have++]] = 0;
            if (e.lencode = e.lendyn, e.lenbits = 7, A = { bits: e.lenbits }, D = g(0, e.lens, 0, 19, e.lencode, 0, e.work, A), e.lenbits = A.bits, D) {
              _.msg = "invalid code lengths set", e.mode = 30;
              break;
            }
            e.have = 0, e.mode = 19;
          case 19:
            for (; e.have < e.nlen + e.ndist; ) {
              for (; rt = (s = e.lencode[E & (1 << e.lenbits) - 1]) >>> 16 & 255, ot = 65535 & s, !((Q = s >>> 24) <= C); ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              if (ot < 16) E >>>= Q, C -= Q, e.lens[e.have++] = ot;
              else {
                if (ot === 16) {
                  for (f = Q + 2; C < f; ) {
                    if (j === 0) break t;
                    j--, E += T[P++] << C, C += 8;
                  }
                  if (E >>>= Q, C -= Q, e.have === 0) {
                    _.msg = "invalid bit length repeat", e.mode = 30;
                    break;
                  }
                  t = e.lens[e.have - 1], H = 3 + (3 & E), E >>>= 2, C -= 2;
                } else if (ot === 17) {
                  for (f = Q + 3; C < f; ) {
                    if (j === 0) break t;
                    j--, E += T[P++] << C, C += 8;
                  }
                  C -= Q, t = 0, H = 3 + (7 & (E >>>= Q)), E >>>= 3, C -= 3;
                } else {
                  for (f = Q + 7; C < f; ) {
                    if (j === 0) break t;
                    j--, E += T[P++] << C, C += 8;
                  }
                  C -= Q, t = 0, H = 11 + (127 & (E >>>= Q)), E >>>= 7, C -= 7;
                }
                if (e.have + H > e.nlen + e.ndist) {
                  _.msg = "invalid bit length repeat", e.mode = 30;
                  break;
                }
                for (; H--; ) e.lens[e.have++] = t;
              }
            }
            if (e.mode === 30) break;
            if (e.lens[256] === 0) {
              _.msg = "invalid code -- missing end-of-block", e.mode = 30;
              break;
            }
            if (e.lenbits = 9, A = { bits: e.lenbits }, D = g(v, e.lens, 0, e.nlen, e.lencode, 0, e.work, A), e.lenbits = A.bits, D) {
              _.msg = "invalid literal/lengths set", e.mode = 30;
              break;
            }
            if (e.distbits = 6, e.distcode = e.distdyn, A = { bits: e.distbits }, D = g(m, e.lens, e.nlen, e.ndist, e.distcode, 0, e.work, A), e.distbits = A.bits, D) {
              _.msg = "invalid distances set", e.mode = 30;
              break;
            }
            if (e.mode = 20, B === 6) break t;
          case 20:
            e.mode = 21;
          case 21:
            if (6 <= j && 258 <= V) {
              _.next_out = $, _.avail_out = V, _.next_in = P, _.avail_in = j, e.hold = E, e.bits = C, u(_, G), $ = _.next_out, J = _.output, V = _.avail_out, P = _.next_in, T = _.input, j = _.avail_in, E = e.hold, C = e.bits, e.mode === 12 && (e.back = -1);
              break;
            }
            for (e.back = 0; rt = (s = e.lencode[E & (1 << e.lenbits) - 1]) >>> 16 & 255, ot = 65535 & s, !((Q = s >>> 24) <= C); ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if (rt && !(240 & rt)) {
              for (at = Q, dt = rt, ft = ot; rt = (s = e.lencode[ft + ((E & (1 << at + dt) - 1) >> at)]) >>> 16 & 255, ot = 65535 & s, !(at + (Q = s >>> 24) <= C); ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              E >>>= at, C -= at, e.back += at;
            }
            if (E >>>= Q, C -= Q, e.back += Q, e.length = ot, rt === 0) {
              e.mode = 26;
              break;
            }
            if (32 & rt) {
              e.back = -1, e.mode = 12;
              break;
            }
            if (64 & rt) {
              _.msg = "invalid literal/length code", e.mode = 30;
              break;
            }
            e.extra = 15 & rt, e.mode = 22;
          case 22:
            if (e.extra) {
              for (f = e.extra; C < f; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              e.length += E & (1 << e.extra) - 1, E >>>= e.extra, C -= e.extra, e.back += e.extra;
            }
            e.was = e.length, e.mode = 23;
          case 23:
            for (; rt = (s = e.distcode[E & (1 << e.distbits) - 1]) >>> 16 & 255, ot = 65535 & s, !((Q = s >>> 24) <= C); ) {
              if (j === 0) break t;
              j--, E += T[P++] << C, C += 8;
            }
            if (!(240 & rt)) {
              for (at = Q, dt = rt, ft = ot; rt = (s = e.distcode[ft + ((E & (1 << at + dt) - 1) >> at)]) >>> 16 & 255, ot = 65535 & s, !(at + (Q = s >>> 24) <= C); ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              E >>>= at, C -= at, e.back += at;
            }
            if (E >>>= Q, C -= Q, e.back += Q, 64 & rt) {
              _.msg = "invalid distance code", e.mode = 30;
              break;
            }
            e.offset = ot, e.extra = 15 & rt, e.mode = 24;
          case 24:
            if (e.extra) {
              for (f = e.extra; C < f; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              e.offset += E & (1 << e.extra) - 1, E >>>= e.extra, C -= e.extra, e.back += e.extra;
            }
            if (e.offset > e.dmax) {
              _.msg = "invalid distance too far back", e.mode = 30;
              break;
            }
            e.mode = 25;
          case 25:
            if (V === 0) break t;
            if (H = G - V, e.offset > H) {
              if ((H = e.offset - H) > e.whave && e.sane) {
                _.msg = "invalid distance too far back", e.mode = 30;
                break;
              }
              it = H > e.wnext ? (H -= e.wnext, e.wsize - H) : e.wnext - H, H > e.length && (H = e.length), ut = e.window;
            } else ut = J, it = $ - e.offset, H = e.length;
            for (V < H && (H = V), V -= H, e.length -= H; J[$++] = ut[it++], --H; ) ;
            e.length === 0 && (e.mode = 21);
            break;
          case 26:
            if (V === 0) break t;
            J[$++] = e.length, V--, e.mode = 21;
            break;
          case 27:
            if (e.wrap) {
              for (; C < 32; ) {
                if (j === 0) break t;
                j--, E |= T[P++] << C, C += 8;
              }
              if (G -= V, _.total_out += G, e.total += G, G && (_.adler = e.check = e.flags ? r(e.check, J, G, $ - G) : o(e.check, J, G, $ - G)), G = V, (e.flags ? E : a(E)) !== e.check) {
                _.msg = "incorrect data check", e.mode = 30;
                break;
              }
              C = E = 0;
            }
            e.mode = 28;
          case 28:
            if (e.wrap && e.flags) {
              for (; C < 32; ) {
                if (j === 0) break t;
                j--, E += T[P++] << C, C += 8;
              }
              if (E !== (4294967295 & e.total)) {
                _.msg = "incorrect length check", e.mode = 30;
                break;
              }
              C = E = 0;
            }
            e.mode = 29;
          case 29:
            D = 1;
            break t;
          case 30:
            D = -3;
            break t;
          case 31:
            return -4;
          case 32:
          default:
            return i;
        }
        return _.next_out = $, _.avail_out = V, _.next_in = P, _.avail_in = j, e.hold = E, e.bits = C, (e.wsize || G !== _.avail_out && e.mode < 30 && (e.mode < 27 || B !== 4)) && X(_, _.output, _.next_out, G - _.avail_out) ? (e.mode = 31, -4) : (q -= _.avail_in, G -= _.avail_out, _.total_in += q, _.total_out += G, e.total += G, e.wrap && G && (_.adler = e.check = e.flags ? r(e.check, J, G, _.next_out - G) : o(e.check, J, G, _.next_out - G)), _.data_type = e.bits + (e.last ? 64 : 0) + (e.mode === 12 ? 128 : 0) + (e.mode === 20 || e.mode === 15 ? 256 : 0), (q == 0 && G === 0 || B === 4) && D === b && (D = -5), D);
      }, w.inflateEnd = function(_) {
        if (!_ || !_.state) return i;
        var B = _.state;
        return B.window && (B.window = null), _.state = null, b;
      }, w.inflateGetHeader = function(_, B) {
        var e;
        return _ && _.state && 2 & (e = _.state).wrap ? ((e.head = B).done = !1, b) : i;
      }, w.inflateSetDictionary = function(_, B) {
        var e, T = B.length;
        return _ && _.state ? (e = _.state).wrap !== 0 && e.mode !== 11 ? i : e.mode === 11 && o(1, B, T, 0) !== e.check ? -3 : X(_, B, T, T) ? (e.mode = 31, -4) : (e.havedict = 1, b) : i;
      }, w.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(p, N, w) {
      var l = p("../utils/common"), o = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], r = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], g = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      N.exports = function(v, m, b, i, d, n, h, a) {
        var c, y, S, x, R, O, L, I, W, X = a.bits, _ = 0, B = 0, e = 0, T = 0, J = 0, P = 0, $ = 0, j = 0, V = 0, E = 0, C = null, q = 0, G = new l.Buf16(16), H = new l.Buf16(16), it = null, ut = 0;
        for (_ = 0; _ <= 15; _++) G[_] = 0;
        for (B = 0; B < i; B++) G[m[b + B]]++;
        for (J = X, T = 15; 1 <= T && G[T] === 0; T--) ;
        if (T < J && (J = T), T === 0) return d[n++] = 20971520, d[n++] = 20971520, a.bits = 1, 0;
        for (e = 1; e < T && G[e] === 0; e++) ;
        for (J < e && (J = e), _ = j = 1; _ <= 15; _++) if (j <<= 1, (j -= G[_]) < 0) return -1;
        if (0 < j && (v === 0 || T !== 1)) return -1;
        for (H[1] = 0, _ = 1; _ < 15; _++) H[_ + 1] = H[_] + G[_];
        for (B = 0; B < i; B++) m[b + B] !== 0 && (h[H[m[b + B]]++] = B);
        if (O = v === 0 ? (C = it = h, 19) : v === 1 ? (C = o, q -= 257, it = r, ut -= 257, 256) : (C = u, it = g, -1), _ = e, R = n, $ = B = E = 0, S = -1, x = (V = 1 << (P = J)) - 1, v === 1 && 852 < V || v === 2 && 592 < V) return 1;
        for (; ; ) {
          for (L = _ - $, W = h[B] < O ? (I = 0, h[B]) : h[B] > O ? (I = it[ut + h[B]], C[q + h[B]]) : (I = 96, 0), c = 1 << _ - $, e = y = 1 << P; d[R + (E >> $) + (y -= c)] = L << 24 | I << 16 | W | 0, y !== 0; ) ;
          for (c = 1 << _ - 1; E & c; ) c >>= 1;
          if (c !== 0 ? (E &= c - 1, E += c) : E = 0, B++, --G[_] == 0) {
            if (_ === T) break;
            _ = m[b + h[B]];
          }
          if (J < _ && (E & x) !== S) {
            for ($ === 0 && ($ = J), R += e, j = 1 << (P = _ - $); P + $ < T && !((j -= G[P + $]) <= 0); ) P++, j <<= 1;
            if (V += 1 << P, v === 1 && 852 < V || v === 2 && 592 < V) return 1;
            d[S = E & x] = J << 24 | P << 16 | R - n | 0;
          }
        }
        return E !== 0 && (d[R + E] = _ - $ << 24 | 64 << 16 | 0), a.bits = J, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(p, N, w) {
      N.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(p, N, w) {
      var l = p("../utils/common"), o = 0, r = 1;
      function u(s) {
        for (var k = s.length; 0 <= --k; ) s[k] = 0;
      }
      var g = 0, v = 29, m = 256, b = m + 1 + v, i = 30, d = 19, n = 2 * b + 1, h = 15, a = 16, c = 7, y = 256, S = 16, x = 17, R = 18, O = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], L = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], I = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], W = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = new Array(2 * (b + 2));
      u(X);
      var _ = new Array(2 * i);
      u(_);
      var B = new Array(512);
      u(B);
      var e = new Array(256);
      u(e);
      var T = new Array(v);
      u(T);
      var J, P, $, j = new Array(i);
      function V(s, k, F, U, z) {
        this.static_tree = s, this.extra_bits = k, this.extra_base = F, this.elems = U, this.max_length = z, this.has_stree = s && s.length;
      }
      function E(s, k) {
        this.dyn_tree = s, this.max_code = 0, this.stat_desc = k;
      }
      function C(s) {
        return s < 256 ? B[s] : B[256 + (s >>> 7)];
      }
      function q(s, k) {
        s.pending_buf[s.pending++] = 255 & k, s.pending_buf[s.pending++] = k >>> 8 & 255;
      }
      function G(s, k, F) {
        s.bi_valid > a - F ? (s.bi_buf |= k << s.bi_valid & 65535, q(s, s.bi_buf), s.bi_buf = k >> a - s.bi_valid, s.bi_valid += F - a) : (s.bi_buf |= k << s.bi_valid & 65535, s.bi_valid += F);
      }
      function H(s, k, F) {
        G(s, F[2 * k], F[2 * k + 1]);
      }
      function it(s, k) {
        for (var F = 0; F |= 1 & s, s >>>= 1, F <<= 1, 0 < --k; ) ;
        return F >>> 1;
      }
      function ut(s, k, F) {
        var U, z, Z = new Array(h + 1), K = 0;
        for (U = 1; U <= h; U++) Z[U] = K = K + F[U - 1] << 1;
        for (z = 0; z <= k; z++) {
          var M = s[2 * z + 1];
          M !== 0 && (s[2 * z] = it(Z[M]++, M));
        }
      }
      function Q(s) {
        var k;
        for (k = 0; k < b; k++) s.dyn_ltree[2 * k] = 0;
        for (k = 0; k < i; k++) s.dyn_dtree[2 * k] = 0;
        for (k = 0; k < d; k++) s.bl_tree[2 * k] = 0;
        s.dyn_ltree[2 * y] = 1, s.opt_len = s.static_len = 0, s.last_lit = s.matches = 0;
      }
      function rt(s) {
        8 < s.bi_valid ? q(s, s.bi_buf) : 0 < s.bi_valid && (s.pending_buf[s.pending++] = s.bi_buf), s.bi_buf = 0, s.bi_valid = 0;
      }
      function ot(s, k, F, U) {
        var z = 2 * k, Z = 2 * F;
        return s[z] < s[Z] || s[z] === s[Z] && U[k] <= U[F];
      }
      function at(s, k, F) {
        for (var U = s.heap[F], z = F << 1; z <= s.heap_len && (z < s.heap_len && ot(k, s.heap[z + 1], s.heap[z], s.depth) && z++, !ot(k, U, s.heap[z], s.depth)); ) s.heap[F] = s.heap[z], F = z, z <<= 1;
        s.heap[F] = U;
      }
      function dt(s, k, F) {
        var U, z, Z, K, M = 0;
        if (s.last_lit !== 0) for (; U = s.pending_buf[s.d_buf + 2 * M] << 8 | s.pending_buf[s.d_buf + 2 * M + 1], z = s.pending_buf[s.l_buf + M], M++, U === 0 ? H(s, z, k) : (H(s, (Z = e[z]) + m + 1, k), (K = O[Z]) !== 0 && G(s, z -= T[Z], K), H(s, Z = C(--U), F), (K = L[Z]) !== 0 && G(s, U -= j[Z], K)), M < s.last_lit; ) ;
        H(s, y, k);
      }
      function ft(s, k) {
        var F, U, z, Z = k.dyn_tree, K = k.stat_desc.static_tree, M = k.stat_desc.has_stree, Y = k.stat_desc.elems, nt = -1;
        for (s.heap_len = 0, s.heap_max = n, F = 0; F < Y; F++) Z[2 * F] !== 0 ? (s.heap[++s.heap_len] = nt = F, s.depth[F] = 0) : Z[2 * F + 1] = 0;
        for (; s.heap_len < 2; ) Z[2 * (z = s.heap[++s.heap_len] = nt < 2 ? ++nt : 0)] = 1, s.depth[z] = 0, s.opt_len--, M && (s.static_len -= K[2 * z + 1]);
        for (k.max_code = nt, F = s.heap_len >> 1; 1 <= F; F--) at(s, Z, F);
        for (z = Y; F = s.heap[1], s.heap[1] = s.heap[s.heap_len--], at(s, Z, 1), U = s.heap[1], s.heap[--s.heap_max] = F, s.heap[--s.heap_max] = U, Z[2 * z] = Z[2 * F] + Z[2 * U], s.depth[z] = (s.depth[F] >= s.depth[U] ? s.depth[F] : s.depth[U]) + 1, Z[2 * F + 1] = Z[2 * U + 1] = z, s.heap[1] = z++, at(s, Z, 1), 2 <= s.heap_len; ) ;
        s.heap[--s.heap_max] = s.heap[1], function(tt, ht) {
          var mt, ct, _t, st, bt, kt, pt = ht.dyn_tree, St = ht.max_code, At = ht.stat_desc.static_tree, It = ht.stat_desc.has_stree, Ot = ht.stat_desc.extra_bits, zt = ht.stat_desc.extra_base, gt = ht.stat_desc.max_length, vt = 0;
          for (st = 0; st <= h; st++) tt.bl_count[st] = 0;
          for (pt[2 * tt.heap[tt.heap_max] + 1] = 0, mt = tt.heap_max + 1; mt < n; mt++) gt < (st = pt[2 * pt[2 * (ct = tt.heap[mt]) + 1] + 1] + 1) && (st = gt, vt++), pt[2 * ct + 1] = st, St < ct || (tt.bl_count[st]++, bt = 0, zt <= ct && (bt = Ot[ct - zt]), kt = pt[2 * ct], tt.opt_len += kt * (st + bt), It && (tt.static_len += kt * (At[2 * ct + 1] + bt)));
          if (vt !== 0) {
            do {
              for (st = gt - 1; tt.bl_count[st] === 0; ) st--;
              tt.bl_count[st]--, tt.bl_count[st + 1] += 2, tt.bl_count[gt]--, vt -= 2;
            } while (0 < vt);
            for (st = gt; st !== 0; st--) for (ct = tt.bl_count[st]; ct !== 0; ) St < (_t = tt.heap[--mt]) || (pt[2 * _t + 1] !== st && (tt.opt_len += (st - pt[2 * _t + 1]) * pt[2 * _t], pt[2 * _t + 1] = st), ct--);
          }
        }(s, k), ut(Z, nt, s.bl_count);
      }
      function t(s, k, F) {
        var U, z, Z = -1, K = k[1], M = 0, Y = 7, nt = 4;
        for (K === 0 && (Y = 138, nt = 3), k[2 * (F + 1) + 1] = 65535, U = 0; U <= F; U++) z = K, K = k[2 * (U + 1) + 1], ++M < Y && z === K || (M < nt ? s.bl_tree[2 * z] += M : z !== 0 ? (z !== Z && s.bl_tree[2 * z]++, s.bl_tree[2 * S]++) : M <= 10 ? s.bl_tree[2 * x]++ : s.bl_tree[2 * R]++, Z = z, nt = (M = 0) === K ? (Y = 138, 3) : z === K ? (Y = 6, 3) : (Y = 7, 4));
      }
      function D(s, k, F) {
        var U, z, Z = -1, K = k[1], M = 0, Y = 7, nt = 4;
        for (K === 0 && (Y = 138, nt = 3), U = 0; U <= F; U++) if (z = K, K = k[2 * (U + 1) + 1], !(++M < Y && z === K)) {
          if (M < nt) for (; H(s, z, s.bl_tree), --M != 0; ) ;
          else z !== 0 ? (z !== Z && (H(s, z, s.bl_tree), M--), H(s, S, s.bl_tree), G(s, M - 3, 2)) : M <= 10 ? (H(s, x, s.bl_tree), G(s, M - 3, 3)) : (H(s, R, s.bl_tree), G(s, M - 11, 7));
          Z = z, nt = (M = 0) === K ? (Y = 138, 3) : z === K ? (Y = 6, 3) : (Y = 7, 4);
        }
      }
      u(j);
      var A = !1;
      function f(s, k, F, U) {
        G(s, (g << 1) + (U ? 1 : 0), 3), function(z, Z, K, M) {
          rt(z), q(z, K), q(z, ~K), l.arraySet(z.pending_buf, z.window, Z, K, z.pending), z.pending += K;
        }(s, k, F);
      }
      w._tr_init = function(s) {
        A || (function() {
          var k, F, U, z, Z, K = new Array(h + 1);
          for (z = U = 0; z < v - 1; z++) for (T[z] = U, k = 0; k < 1 << O[z]; k++) e[U++] = z;
          for (e[U - 1] = z, z = Z = 0; z < 16; z++) for (j[z] = Z, k = 0; k < 1 << L[z]; k++) B[Z++] = z;
          for (Z >>= 7; z < i; z++) for (j[z] = Z << 7, k = 0; k < 1 << L[z] - 7; k++) B[256 + Z++] = z;
          for (F = 0; F <= h; F++) K[F] = 0;
          for (k = 0; k <= 143; ) X[2 * k + 1] = 8, k++, K[8]++;
          for (; k <= 255; ) X[2 * k + 1] = 9, k++, K[9]++;
          for (; k <= 279; ) X[2 * k + 1] = 7, k++, K[7]++;
          for (; k <= 287; ) X[2 * k + 1] = 8, k++, K[8]++;
          for (ut(X, b + 1, K), k = 0; k < i; k++) _[2 * k + 1] = 5, _[2 * k] = it(k, 5);
          J = new V(X, O, m + 1, b, h), P = new V(_, L, 0, i, h), $ = new V(new Array(0), I, 0, d, c);
        }(), A = !0), s.l_desc = new E(s.dyn_ltree, J), s.d_desc = new E(s.dyn_dtree, P), s.bl_desc = new E(s.bl_tree, $), s.bi_buf = 0, s.bi_valid = 0, Q(s);
      }, w._tr_stored_block = f, w._tr_flush_block = function(s, k, F, U) {
        var z, Z, K = 0;
        0 < s.level ? (s.strm.data_type === 2 && (s.strm.data_type = function(M) {
          var Y, nt = 4093624447;
          for (Y = 0; Y <= 31; Y++, nt >>>= 1) if (1 & nt && M.dyn_ltree[2 * Y] !== 0) return o;
          if (M.dyn_ltree[18] !== 0 || M.dyn_ltree[20] !== 0 || M.dyn_ltree[26] !== 0) return r;
          for (Y = 32; Y < m; Y++) if (M.dyn_ltree[2 * Y] !== 0) return r;
          return o;
        }(s)), ft(s, s.l_desc), ft(s, s.d_desc), K = function(M) {
          var Y;
          for (t(M, M.dyn_ltree, M.l_desc.max_code), t(M, M.dyn_dtree, M.d_desc.max_code), ft(M, M.bl_desc), Y = d - 1; 3 <= Y && M.bl_tree[2 * W[Y] + 1] === 0; Y--) ;
          return M.opt_len += 3 * (Y + 1) + 5 + 5 + 4, Y;
        }(s), z = s.opt_len + 3 + 7 >>> 3, (Z = s.static_len + 3 + 7 >>> 3) <= z && (z = Z)) : z = Z = F + 5, F + 4 <= z && k !== -1 ? f(s, k, F, U) : s.strategy === 4 || Z === z ? (G(s, 2 + (U ? 1 : 0), 3), dt(s, X, _)) : (G(s, 4 + (U ? 1 : 0), 3), function(M, Y, nt, tt) {
          var ht;
          for (G(M, Y - 257, 5), G(M, nt - 1, 5), G(M, tt - 4, 4), ht = 0; ht < tt; ht++) G(M, M.bl_tree[2 * W[ht] + 1], 3);
          D(M, M.dyn_ltree, Y - 1), D(M, M.dyn_dtree, nt - 1);
        }(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, K + 1), dt(s, s.dyn_ltree, s.dyn_dtree)), Q(s), U && rt(s);
      }, w._tr_tally = function(s, k, F) {
        return s.pending_buf[s.d_buf + 2 * s.last_lit] = k >>> 8 & 255, s.pending_buf[s.d_buf + 2 * s.last_lit + 1] = 255 & k, s.pending_buf[s.l_buf + s.last_lit] = 255 & F, s.last_lit++, k === 0 ? s.dyn_ltree[2 * F]++ : (s.matches++, k--, s.dyn_ltree[2 * (e[F] + m + 1)]++, s.dyn_dtree[2 * C(k)]++), s.last_lit === s.lit_bufsize - 1;
      }, w._tr_align = function(s) {
        G(s, 2, 3), H(s, y, X), function(k) {
          k.bi_valid === 16 ? (q(k, k.bi_buf), k.bi_buf = 0, k.bi_valid = 0) : 8 <= k.bi_valid && (k.pending_buf[k.pending++] = 255 & k.bi_buf, k.bi_buf >>= 8, k.bi_valid -= 8);
        }(s);
      };
    }, { "../utils/common": 41 }], 53: [function(p, N, w) {
      N.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(p, N, w) {
      (function(l) {
        (function(o, r) {
          if (!o.setImmediate) {
            var u, g, v, m, b = 1, i = {}, d = !1, n = o.document, h = Object.getPrototypeOf && Object.getPrototypeOf(o);
            h = h && h.setTimeout ? h : o, u = {}.toString.call(o.process) === "[object process]" ? function(S) {
              process.nextTick(function() {
                c(S);
              });
            } : function() {
              if (o.postMessage && !o.importScripts) {
                var S = !0, x = o.onmessage;
                return o.onmessage = function() {
                  S = !1;
                }, o.postMessage("", "*"), o.onmessage = x, S;
              }
            }() ? (m = "setImmediate$" + Math.random() + "$", o.addEventListener ? o.addEventListener("message", y, !1) : o.attachEvent("onmessage", y), function(S) {
              o.postMessage(m + S, "*");
            }) : o.MessageChannel ? ((v = new MessageChannel()).port1.onmessage = function(S) {
              c(S.data);
            }, function(S) {
              v.port2.postMessage(S);
            }) : n && "onreadystatechange" in n.createElement("script") ? (g = n.documentElement, function(S) {
              var x = n.createElement("script");
              x.onreadystatechange = function() {
                c(S), x.onreadystatechange = null, g.removeChild(x), x = null;
              }, g.appendChild(x);
            }) : function(S) {
              setTimeout(c, 0, S);
            }, h.setImmediate = function(S) {
              typeof S != "function" && (S = new Function("" + S));
              for (var x = new Array(arguments.length - 1), R = 0; R < x.length; R++) x[R] = arguments[R + 1];
              var O = { callback: S, args: x };
              return i[b] = O, u(b), b++;
            }, h.clearImmediate = a;
          }
          function a(S) {
            delete i[S];
          }
          function c(S) {
            if (d) setTimeout(c, 0, S);
            else {
              var x = i[S];
              if (x) {
                d = !0;
                try {
                  (function(R) {
                    var O = R.callback, L = R.args;
                    switch (L.length) {
                      case 0:
                        O();
                        break;
                      case 1:
                        O(L[0]);
                        break;
                      case 2:
                        O(L[0], L[1]);
                        break;
                      case 3:
                        O(L[0], L[1], L[2]);
                        break;
                      default:
                        O.apply(r, L);
                    }
                  })(x);
                } finally {
                  a(S), d = !1;
                }
              }
            }
          }
          function y(S) {
            S.source === o && typeof S.data == "string" && S.data.indexOf(m) === 0 && c(+S.data.slice(m.length));
          }
        })(typeof self > "u" ? l === void 0 ? this : l : self);
      }).call(this, typeof yt < "u" ? yt : typeof self < "u" ? self : typeof window < "u" ? window : {});
    }, {}] }, {}, [10])(10);
  });
})(Ct);
var Dt = Ct.exports;
const Tt = /* @__PURE__ */ Bt(Dt);
chrome.runtime.onInstalled.addListener(() => {
  console.log("[Diamond Clarity Master Downloader] Extension installed successfully.");
});
chrome.runtime.onMessage.addListener((et, lt, p) => (et.type === "DOWNLOAD_SINGLE" ? (xt(et.images[0]), p({ success: !0 })) : et.type === "DOWNLOAD_BATCH" && (et.asZip ? Ft(et.images, et.zipFilename || "diamond_master_images.zip") : Et(et.images), p({ success: !0 })), !0));
function xt(et) {
  let lt = et.filename ? et.filename.split("?")[0].split("#")[0] : "jewelry_media.jpg";
  lt = lt.replace(/[<>:"/\\|?*]/g, "_").trim(), (!lt || lt === "_") && (lt = "jewelry_media.jpg"), chrome.downloads.download(
    {
      url: et.url,
      filename: `DiamondMaster/${lt}`,
      conflictAction: "uniquify",
      saveAs: !1
    },
    (p) => {
      chrome.runtime.lastError && (console.warn("[Diamond Clarity] Direct download failed, fetching blob fallback:", chrome.runtime.lastError), Rt(et.url, lt));
    }
  );
}
async function Rt(et, lt) {
  try {
    const p = await fetch(et, {
      method: "GET",
      credentials: "omit",
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      }
    });
    if (!p.ok) return;
    const N = await p.blob(), w = new FileReader();
    w.onloadend = () => {
      const l = w.result;
      l && chrome.downloads.download({
        url: l,
        filename: `DiamondMaster/${lt}`,
        conflictAction: "uniquify",
        saveAs: !1
      });
    }, w.readAsDataURL(N);
  } catch (p) {
    console.error("[Diamond Clarity] Blob fallback failed:", p);
  }
}
function Et(et) {
  let lt = 0;
  for (const p of et)
    setTimeout(() => {
      xt(p);
    }, lt), lt += 250;
}
async function Ft(et, lt) {
  const p = new Tt(), N = p.folder("Master_Jewelry_Images") || p;
  let w = 0;
  for (let l = 0; l < et.length; l++) {
    const o = et[l];
    try {
      let r = "";
      try {
        const v = new URL(o.url);
        r = `${v.protocol}//${v.host}/`;
      } catch {
      }
      const u = await fetch(o.url, {
        method: "GET",
        credentials: "omit",
        headers: {
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          ...r ? { Referer: r } : {}
        }
      });
      if (!u.ok)
        throw new Error(`HTTP error ${u.status}`);
      const g = await u.blob();
      N.file(o.filename, g), w++;
    } catch (r) {
      console.warn(`[Diamond Clarity] Failed to fetch into zip: ${o.url}`, r), xt(o);
    }
  }
  if (w > 0)
    try {
      const o = `data:application/zip;base64,${await p.generateAsync({
        type: "base64",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      })}`;
      chrome.downloads.download({
        url: o,
        filename: `DiamondMaster/${lt}`,
        conflictAction: "uniquify",
        saveAs: !1
      });
    } catch (l) {
      console.error("[Diamond Clarity] Failed to generate zip:", l), Et(et);
    }
}

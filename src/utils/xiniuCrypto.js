// npm install crypto-js
const crypto_js = require("crypto-js");

const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const _p = "W5D80NFZHAYB8EUI2T649RT2MNRMVE2O";

function _u_e(e) {
  if (null == e) return null;
  e = e.replace(/\r\n/g, "\n");
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
    } else if (r > 127 && r < 2048) {
      t += String.fromCharCode((r >> 6) | 192);
      t += String.fromCharCode((63 & r) | 128);
    } else {
      t += String.fromCharCode((r >> 12) | 224);
      t += String.fromCharCode(((r >> 6) & 63) | 128);
      t += String.fromCharCode((63 & r) | 128);
    }
  }
  return t;
}

function e1(e) {
  if (null == e) return null;
  let t, n, r, o, i, a, u, c = "";
  let l = 0;
  for (; l < e.length;) {
    t = e.charCodeAt(l++) >> 2;
    i = ((3 & e.charCodeAt(l - 1)) << 4) | (n = e.charCodeAt(l++)) >> 4;
    a = ((15 & n) << 2) | (r = e.charCodeAt(l++)) >> 6;
    u = 63 & r;
    if (isNaN(n)) {
      a = u = 64;
    } else if (isNaN(r)) {
      u = 64;
    }
    c = c + _keyStr.charAt(t) + _keyStr.charAt(i) + _keyStr.charAt(a) + _keyStr.charAt(u);
  }
  return c;
}

function e2(e) {
  if (null == (e = _u_e(e))) return null;
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = _p.charCodeAt(n % _p.length);
    t += String.fromCharCode(e.charCodeAt(n) ^ r);
  }
  return t;
}

function d1(e) {
  let t, n, r, o, i, a, u = "";
  let c = 0;
  for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); c < e.length;) {
    t = (_keyStr.indexOf(e.charAt(c++)) << 2) | (o = _keyStr.indexOf(e.charAt(c++))) >> 4;
    n = ((15 & o) << 4) | (i = _keyStr.indexOf(e.charAt(c++))) >> 2;
    r = ((3 & i) << 6) | (a = _keyStr.indexOf(e.charAt(c++)));
    u += String.fromCharCode(t);
    if (64 != i) u += String.fromCharCode(n);
    if (64 != a) u += String.fromCharCode(r);
  }
  return u;
}

function _u_d(e) {
  let t = "";
  let n = 0;
  let r, o, i;
  for (; n < e.length;) {
    r = e.charCodeAt(n);
    if (r < 128) {
      t += String.fromCharCode(r);
      n++;
    } else if (r > 191 && r < 224) {
      o = e.charCodeAt(n + 1);
      t += String.fromCharCode(((31 & r) << 6) | (63 & o));
      n += 2;
    } else {
      o = e.charCodeAt(n + 1);
      i = e.charCodeAt(n + 2);
      t += String.fromCharCode(((15 & r) << 12) | ((63 & o) << 6) | (63 & i));
      n += 3;
    }
  }
  return t;
}

function d2(e) {
  let t = "";
  for (let n = 0; n < e.length; n++) {
    const r = _p.charCodeAt(n % _p.length);
    t += String.fromCharCode(e.charCodeAt(n) ^ r);
  }
  return _u_d(t);
}

function get_sig(e) {
  return crypto_js.MD5(e + _p).toString().toUpperCase();
}

function get_params(p) {
  const payload = e1(e2(JSON.stringify(p)));
  const sig = get_sig(payload);
  return { payload, sig };
}

function decrypt_data(s) {
  return d2(d1(s));
}

module.exports = {
  get_params,
  decrypt_data
};
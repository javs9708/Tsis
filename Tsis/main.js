(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var $toString = __webpack_require__(/*! ./_function-to-string */ "./node_modules/core-js/modules/_function-to-string.js");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find-index.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $find = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")(KEY);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/core-js/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ "./node_modules/core-js/modules/_string-repeat.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.starts-with.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var context = __webpack_require__(/*! ./_string-context */ "./node_modules/core-js/modules/_string-context.js");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ "./node_modules/core-js/modules/_fails-is-regexp.js")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: APP_ROUTING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_ROUTING", function() { return APP_ROUTING; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/profile/profile.component */ "./src/app/components/profile/profile.component.ts");
/* harmony import */ var _components_candidates_candidates_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/candidates/candidates.component */ "./src/app/components/candidates/candidates.component.ts");
/* harmony import */ var _components_landing_landing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/landing/landing.component */ "./src/app/components/landing/landing.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/signup/signup.component */ "./src/app/components/signup/signup.component.ts");
/* harmony import */ var _components_email_email_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/email/email.component */ "./src/app/components/email/email.component.ts");
/* harmony import */ var _components_users_users_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/users/users.component */ "./src/app/components/users/users.component.ts");
/* harmony import */ var _components_candidates_candidate01_candidate01_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/candidates/candidate01/candidate01.component */ "./src/app/components/candidates/candidate01/candidate01.component.ts");
/* harmony import */ var _components_candidates_candidate02_candidate02_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/candidates/candidate02/candidate02.component */ "./src/app/components/candidates/candidate02/candidate02.component.ts");
/* harmony import */ var _components_candidates_candidate03_candidate03_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/candidates/candidate03/candidate03.component */ "./src/app/components/candidates/candidate03/candidate03.component.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth-guard.service */ "./src/app/services/auth-guard.service.ts");













var APP_ROUTES = [
    { path: '', component: _components_landing_landing_component__WEBPACK_IMPORTED_MODULE_4__["LandingComponent"] },
    { path: 'home', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'profile', component: _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_2__["ProfileComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'candidates', component: _components_candidates_candidates_component__WEBPACK_IMPORTED_MODULE_3__["CandidatesComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'candidates/candidate01', component: _components_candidates_candidate01_candidate01_component__WEBPACK_IMPORTED_MODULE_9__["Candidate01Component"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'candidates/candidate02', component: _components_candidates_candidate02_candidate02_component__WEBPACK_IMPORTED_MODULE_10__["Candidate02Component"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'candidates/candidate03', component: _components_candidates_candidate03_candidate03_component__WEBPACK_IMPORTED_MODULE_11__["Candidate03Component"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'users/:uid/:name', component: _components_users_users_component__WEBPACK_IMPORTED_MODULE_8__["UsersComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AuthGuardService"]] },
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"] },
    { path: 'signup', component: _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_6__["SignupComponent"] },
    { path: 'email', component: _components_email_email_component__WEBPACK_IMPORTED_MODULE_7__["EmailComponent"] },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
var APP_ROUTING = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(APP_ROUTES);


/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container{\r\n  margin-top: 40px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lcntcclxuICBtYXJnaW4tdG9wOiA0MHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n\r\n<div>\r\n\r\n  <router-outlet></router-outlet>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'App works';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: firebaseConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firebaseConfig", function() { return firebaseConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var angularfire2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularfire2 */ "./node_modules/angularfire2/index.js");
/* harmony import */ var angularfire2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angularfire2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var angularfire2_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularfire2/auth */ "./node_modules/angularfire2/auth/index.js");
/* harmony import */ var angularfire2_auth__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(angularfire2_auth__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_avatar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-avatar */ "./node_modules/ngx-avatar/fesm5/ngx-avatar.js");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/esm5/badge.es5.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/auth-guard.service */ "./src/app/services/auth-guard.service.ts");
/* harmony import */ var _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var ngx_scroll_event__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-scroll-event */ "./node_modules/ngx-scroll-event/index.js");
/* harmony import */ var ngx_scroll_event__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(ngx_scroll_event__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_candidates_candidates_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/candidates/candidates.component */ "./src/app/components/candidates/candidates.component.ts");
/* harmony import */ var _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/profile/profile.component */ "./src/app/components/profile/profile.component.ts");
/* harmony import */ var _components_landing_landing_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/landing/landing.component */ "./src/app/components/landing/landing.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/footer/footer.component */ "./src/app/components/footer/footer.component.ts");
/* harmony import */ var _components_candidates_candidate01_candidate01_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/candidates/candidate01/candidate01.component */ "./src/app/components/candidates/candidate01/candidate01.component.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_email_email_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/email/email.component */ "./src/app/components/email/email.component.ts");
/* harmony import */ var _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/signup/signup.component */ "./src/app/components/signup/signup.component.ts");
/* harmony import */ var _components_candidates_candidate02_candidate02_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/candidates/candidate02/candidate02.component */ "./src/app/components/candidates/candidate02/candidate02.component.ts");
/* harmony import */ var _components_candidates_candidate03_candidate03_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/candidates/candidate03/candidate03.component */ "./src/app/components/candidates/candidate03/candidate03.component.ts");
/* harmony import */ var _components_users_users_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/users/users.component */ "./src/app/components/users/users.component.ts");

































var firebaseConfig = {
    apiKey: "AIzaSyDw2KYtuMQDyvlCJ6jrF7fG3P5-jK5crRI",
    authDomain: "tsis-72641.firebaseapp.com",
    databaseURL: "https://tsis-72641.firebaseio.com",
    projectId: "tsis-72641",
    storageBucket: "tsis-72641.appspot.com",
    messagingSenderId: "873867793143"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_19__["AppComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_20__["NavbarComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_21__["HomeComponent"],
                _components_candidates_candidates_component__WEBPACK_IMPORTED_MODULE_22__["CandidatesComponent"],
                _components_profile_profile_component__WEBPACK_IMPORTED_MODULE_23__["ProfileComponent"],
                _components_landing_landing_component__WEBPACK_IMPORTED_MODULE_24__["LandingComponent"],
                _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_25__["FooterComponent"],
                _components_candidates_candidate01_candidate01_component__WEBPACK_IMPORTED_MODULE_26__["Candidate01Component"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_27__["LoginComponent"],
                _components_email_email_component__WEBPACK_IMPORTED_MODULE_28__["EmailComponent"],
                _components_signup_signup_component__WEBPACK_IMPORTED_MODULE_29__["SignupComponent"],
                _components_candidates_candidate02_candidate02_component__WEBPACK_IMPORTED_MODULE_30__["Candidate02Component"],
                _components_candidates_candidate03_candidate03_component__WEBPACK_IMPORTED_MODULE_31__["Candidate03Component"],
                _components_users_users_component__WEBPACK_IMPORTED_MODULE_32__["UsersComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_3__["MatTabsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                angularfire2__WEBPACK_IMPORTED_MODULE_5__["AngularFireModule"].initializeApp(firebaseConfig),
                angularfire2_auth__WEBPACK_IMPORTED_MODULE_6__["AngularFireAuthModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                ngx_avatar__WEBPACK_IMPORTED_MODULE_8__["AvatarModule"],
                ngx_scroll_event__WEBPACK_IMPORTED_MODULE_16__["ScrollEventModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_17__["ScrollDispatchModule"],
                _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__["MatBadgeModule"],
                _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIconModule"],
                ng2_charts__WEBPACK_IMPORTED_MODULE_18__["ChartsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_11__["APP_ROUTING"]
            ],
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_12__["AuthService"],
                _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_13__["AuthGuardService"],
                _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_14__["FirestoreService"],
                angularfire2_firestore__WEBPACK_IMPORTED_MODULE_15__["AngularFirestore"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_19__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/candidates/candidate01/candidate01.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate01/candidate01.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.color {\r\n  border-bottom: 1.5px #0c56ac !important;\r\n  box-shadow: 0 1.2px 0 0 #0c56ac !important;\r\n}\r\n\r\n.meGusta{\r\n  color: green;\r\n}\r\n\r\n.noMeGusta{\r\n  color: red;\r\n}\r\n\r\n.mleft2{\r\n  margin-left: 80px;\r\n}\r\n\r\n.mtop{\r\n  margin-top: 120px;\r\n}\r\n\r\n.mtopc{\r\n  margin-top: 15px;\r\n}\r\n\r\n.mtopicon{\r\n  display: flex;\r\n  margin-top: 5px;\r\n  justify-content: flex-start;\r\n  margin-left: 21px;\r\n}\r\n\r\n.mtopdate{\r\n  display: flex;\r\n  margin-top: 17px;\r\n  justify-content: flex-end;\r\n  /* margin-right: 21px; */\r\n  margin-left: 0;\r\n}\r\n\r\n.img-m{\r\n  display: flex;\r\n  margin-left: 25px;\r\n  align-content: left;\r\n  border-radius:40px;\r\n}\r\n\r\n.mtopcomment{\r\n  margin-top: 10px;\r\n  margin-left: 0px;\r\n}\r\n\r\n.mtopc2{\r\n  margin-top: 30px;\r\n}\r\n\r\n.mright{\r\n  margin-right: 8px;\r\n}\r\n\r\n.mright2{\r\n  margin-right: 35px;\r\n}\r\n\r\n.mleft{\r\n  margin-left: 0;\r\n}\r\n\r\n.button{\r\n  border-radius: 30px;\r\n}\r\n\r\n.center{\r\n  text-align: center;\r\n}\r\n\r\n.pcenter{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.textc{\r\n  color: #0d47a1;\r\n}\r\n\r\n.mb{\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.backgroundcomment{\r\n  display: flex;\r\n  background: #e4f2ff;\r\n  height: 100%;\r\n  width: 80%;\r\n  max-width: 400px;\r\n  border-radius: 30px;\r\n  align-content: flex-start;\r\n  margin-top: 15px;\r\n  text-align: left;\r\n}\r\n\r\n.mbackground{\r\n  margin-top: 15px;\r\n  margin-right: 15px;\r\n  margin-bottom: 15px;\r\n  margin-left: 15px;\r\n}\r\n\r\n.fontdate{\r\n  font-size: 10px;\r\n}\r\n\r\n.commentj{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.din{\r\n  display: flex;\r\n}\r\n\r\n.imgr{\r\n  max-width: 40px;\r\n  min-width: 40px;\r\n  max-height: 40px;\r\n  min-height: 39px;\r\n}\r\n\r\n.centrado{\r\n  margin:10px auto;\r\n  display:block;\r\n}\r\n\r\n.example-viewport {\r\n  height: 800px;\r\n  width: 130%;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  width: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n  background-color: #9dd4ee;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background-color: #0c53a6;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jYW5kaWRhdGVzL2NhbmRpZGF0ZTAxL2NhbmRpZGF0ZTAxLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1Q0FBdUM7RUFDdkMsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZiwyQkFBMkI7RUFDM0IsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLGNBQWM7QUFDaEI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUNBO0VBQ0UsY0FBYztBQUNoQjs7QUFDQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFDQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekI7O0FBQ0E7RUFDRSxjQUFjO0FBQ2hCOztBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFDQTtFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztBQUNiOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUNBO0VBQ0UseUJBQXlCO0FBQzNCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9jYW5kaWRhdGVzL2NhbmRpZGF0ZTAxL2NhbmRpZGF0ZTAxLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dC5jb2xvciB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMS41cHggIzBjNTZhYyAhaW1wb3J0YW50O1xyXG4gIGJveC1zaGFkb3c6IDAgMS4ycHggMCAwICMwYzU2YWMgIWltcG9ydGFudDtcclxufVxyXG5cclxuLm1lR3VzdGF7XHJcbiAgY29sb3I6IGdyZWVuO1xyXG59XHJcbi5ub01lR3VzdGF7XHJcbiAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuLm1sZWZ0MntcclxuICBtYXJnaW4tbGVmdDogODBweDtcclxufVxyXG4ubXRvcHtcclxuICBtYXJnaW4tdG9wOiAxMjBweDtcclxufVxyXG4ubXRvcGN7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG4ubXRvcGljb257XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiA1cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIG1hcmdpbi1sZWZ0OiAyMXB4O1xyXG59XHJcbi5tdG9wZGF0ZXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi10b3A6IDE3cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAvKiBtYXJnaW4tcmlnaHQ6IDIxcHg7ICovXHJcbiAgbWFyZ2luLWxlZnQ6IDA7XHJcbn1cclxuLmltZy1te1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLWxlZnQ6IDI1cHg7XHJcbiAgYWxpZ24tY29udGVudDogbGVmdDtcclxuICBib3JkZXItcmFkaXVzOjQwcHg7XHJcbn1cclxuLm10b3Bjb21tZW50e1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDBweDtcclxufVxyXG4ubXRvcGMye1xyXG4gIG1hcmdpbi10b3A6IDMwcHg7XHJcbn1cclxuLm1yaWdodHtcclxuICBtYXJnaW4tcmlnaHQ6IDhweDtcclxufVxyXG4ubXJpZ2h0MntcclxuICBtYXJnaW4tcmlnaHQ6IDM1cHg7XHJcbn1cclxuLm1sZWZ0e1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5idXR0b257XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxufVxyXG4uY2VudGVye1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnBjZW50ZXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4udGV4dGN7XHJcbiAgY29sb3I6ICMwZDQ3YTE7XHJcbn1cclxuLm1ie1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbi5iYWNrZ3JvdW5kY29tbWVudHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGJhY2tncm91bmQ6ICNlNGYyZmY7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiA4MCU7XHJcbiAgbWF4LXdpZHRoOiA0MDBweDtcclxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcblxyXG4ubWJhY2tncm91bmR7XHJcbiAgbWFyZ2luLXRvcDogMTVweDtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICBtYXJnaW4tbGVmdDogMTVweDtcclxufVxyXG5cclxuLmZvbnRkYXRle1xyXG4gIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLmNvbW1lbnRqe1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbn1cclxuLmRpbntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5pbWdye1xyXG4gIG1heC13aWR0aDogNDBweDtcclxuICBtaW4td2lkdGg6IDQwcHg7XHJcbiAgbWF4LWhlaWdodDogNDBweDtcclxuICBtaW4taGVpZ2h0OiAzOXB4O1xyXG59XHJcblxyXG4uY2VudHJhZG97XHJcbiAgbWFyZ2luOjEwcHggYXV0bztcclxuICBkaXNwbGF5OmJsb2NrO1xyXG59XHJcblxyXG4uZXhhbXBsZS12aWV3cG9ydCB7XHJcbiAgaGVpZ2h0OiA4MDBweDtcclxuICB3aWR0aDogMTMwJTtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDdweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlkZDRlZTtcclxufVxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGM1M2E2O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/candidates/candidate01/candidate01.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/components/candidates/candidate01/candidate01.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container section\">\r\n    <br><br><br><br>\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m12 l12 xl8 \">\r\n        <h4 class=\"mb center hide-on-small-only\" style=\"font-size:3.5vw;\">Alvaro Uribe Velez</h4>\r\n        <h4 class=\" center mb hide-on-med-and-up\">Alvaro Uribe Velez</h4>\r\n        <img class=\"centrado responsive-img z-depth-5 img-m\" src=\"../../../assets/files/uribe.jpg\">\r\n        <div class=\"row\">\r\n          <div class=\"col mtopc2\">\r\n            <div *ngFor=\"let item of items|async\">\r\n              <div *ngIf=\"item.nombre=='Alvaro Uribe'\">\r\n                <br>\r\n                <div class=\"row\">\r\n                  <div class=\"col mb push-s1\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light green mright\" [ngClass]=\"{disabled: state==true && stateLD==true }\"><i (click)=\"likesCount()\" class=\"material-icons\">thumb_up</i></a>\r\n                    A <b>{{item.likes}}</b> personas <span class=\"meGusta\"><b>les gusta</b></span> este candidato\r\n                  </div>\r\n                  <div class=\"col push-s1\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light red mright\" [ngClass]=\"{disabled: state==true && stateLD==false}\"><i (click)=\"dislikesCount()\" class=\"material-icons\">thumb_down</i></a>\r\n                    A <b>{{item.dislikes}}</b> personas <span class=\"noMeGusta\"><b>no les gusta</b></span> este candidato\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"row center\">\r\n              <div class=\"col-auto\">\r\n                <h5 *ngIf=\"state==true && stateLD==false\"> <span class=\"noMeGusta\"><b>No te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_dissatisfied</i></h5>\r\n                <h5 *ngIf=\"state==true && stateLD==true\"> <span class=\"meGusta\"><b>Te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_satisfied</i></h5>\r\n                <h5 *ngIf=\"state==false\"> <b>Califica a este candidato</b></h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m12 l12 xl4\">\r\n        <div class=\"row pcenter\">\r\n          <div class=\"col\">\r\n            <br><br>\r\n            <input type=\"text\" [(ngModel)]=\"comment\" placeholder=\"Escribe un comentario\" class=\"color\" (keypress)=\"eventHandler($event)\">\r\n            <button *ngIf=\"data.displayName!=''\" class=\"btn button light-blue darken-2 button\" (click)=\"saveComment()\" (click)=\"cleanInput()\">Comentar</button>\r\n            <button *ngIf=\"data.displayName==''\" class=\"btn button light-blue darken-2 button\" [routerLink]=\"['/profile']\">Comentar</button>\r\n            <br><br>\r\n            <div *ngIf=\"stateComments==false\">\r\n              <h5>No hay comentarios por aquí</h5>\r\n            </div>\r\n            <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n            <div *cdkVirtualFor=\"let item of sortData\">\r\n              <div class=\"row\" *ngIf=\"item.candidate=='Alvaro Uribe'\" class=\"backgroundcomment\">\r\n                <div *ngIf=\"item.uid==data.uid\" class=\"mbackground\">\r\n                  <div class=\"row din\">\r\n                    <div class=\"col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                      <a [routerLink]=\"['/home']\"><ngx-avatar name='{{data.displayName}}' class=\"imgr\"></ngx-avatar></a>\r\n                    </div>\r\n                    <div class=\"col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                      <a [routerLink]=\"['/home']\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                    </div>\r\n                    <div class=\"col s9 mtopcomment pull-s1\">\r\n                      <a [routerLink]=\"['/home']\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"item.uid!=data.uid\" class=\"mbackground \">\r\n                  <div class=\"row din\">\r\n                    <div class=\"col col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                      <a [routerLink]=\"['/users',item.uid,item.nombre]\"><ngx-avatar name=\"{{item.nombre}}\" class=\"imgr\"></ngx-avatar></a>\r\n                    </div>\r\n                    <div class=\"col col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                      <a [routerLink]=\"['/users',item.uid,item.nombre]\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                    </div>\r\n                    <div class=\"col s9 mtopcomment pull-s1\">\r\n                      <a [routerLink]=\"['/users',item.uid,item.nombre]\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"item.candidate=='Alvaro Uribe'\">\r\n                <div class=\"row \">\r\n                  <div class=\"col\">\r\n                    <a class=\"btn-flat\"><i (click)=\"deleteComment(item.id)\" *ngIf=\"item.uid==data.uid\" class=\"material-icons mtopicon\" style=\"color:#da5656\">delete</i></a>\r\n                  </div>\r\n                  <div class=\"col mtopdate\">\r\n                    <span class=\"fontdate \"> {{item.date | date:'short'}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            </cdk-virtual-scroll-viewport>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/candidates/candidate01/candidate01.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate01/candidate01.component.ts ***!
  \****************************************************************************/
/*! exports provided: Candidate01Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Candidate01Component", function() { return Candidate01Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__);





var Candidate01Component = /** @class */ (function () {
    function Candidate01Component(firestoreService, authService, db) {
        var _this = this;
        this.firestoreService = firestoreService;
        this.authService = authService;
        this.db = db;
        this.users = [];
        this.candidatos = [];
        this.showNameA = [];
        this.uid = {
            name: '',
            puntuationStateC1: false,
            puntuationStateC1LD: false,
            puntuationStateC2: false,
            puntuationStateC2LD: false,
            puntuationStateC3: false,
            puntuationStateC3LD: false,
            uid: ''
        };
        this.commentObject = {
            candidate: 'Alvaro Uribe',
            comment: '',
            uid: '',
            nombre: '',
            photo: '',
            date: null
        };
        this.state = null;
        this.stateLD = null;
        this.stateComments = null;
        this.document = '';
        this.stats = {
            nombre: 'Alvaro Uribe',
            likes: 0,
            dislikes: 0
        };
        this.data = JSON.parse((localStorage.getItem('user')));
        this.showName = this.db.collection('/usuarios').valueChanges();
        this.showName.subscribe(function (data) {
            if (data) {
                _this.showNameA = data;
            }
            for (var _i = 0, _a = _this.showNameA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.data.uid) {
                    _this.data.displayName = e.name;
                    localStorage.setItem('user', JSON.stringify(_this.data));
                    break;
                }
            }
        });
    }
    Candidate01Component.prototype.ngOnInit = function () {
        var _this = this;
        this.data = JSON.parse((localStorage.getItem('user')));
        console.log(this.data);
        this.items = this.db.collection('/candidatos').valueChanges();
        this.commentObject.uid = this.data.uid;
        this.commentObject.nombre = this.data.displayName;
        this.firestoreService.getItems().subscribe(function (items) {
            _this.commentsA = items;
            for (var _i = 0, _a = _this.commentsA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.candidate == 'Alvaro Uribe') {
                    _this.stateComments = true;
                    break;
                }
                else {
                    _this.stateComments = false;
                }
            }
        });
        this.items.subscribe(function (data) {
            if (data) {
                _this.candidatos = data;
            }
        });
        this.firestoreService.getUsers().subscribe(function (data) {
            if (data) {
                data.map(function (test) {
                    _this.users.push({
                        id: test.payload.doc.id,
                        data: test.payload.doc.data()
                    });
                });
                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (_this.data.uid == e.data.uid) {
                        if (e.data.puntuationStateC1 == true) {
                            _this.state = true;
                            if (e.data.puntuationStateC1LD == true) {
                                _this.stateLD = true;
                            }
                            else {
                                _this.stateLD = false;
                            }
                        }
                        if (e.data.puntuationStateC1 == false) {
                            _this.state = false;
                        }
                        _this.document = e.id;
                        _this.data.uid = e.data.uid;
                        _this.uid.name = _this.data.displayName;
                        _this.uid.puntuationStateC2 = e.data.puntuationStateC2;
                        _this.uid.puntuationStateC2LD = e.data.puntuationStateC2LD;
                        _this.uid.puntuationStateC3 = e.data.puntuationStateC3;
                        _this.uid.puntuationStateC3LD = e.data.puntuationStateC3LD;
                    }
                }
            }
        });
    };
    Candidate01Component.prototype.likesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = true;
            this.candidatos[1].likes = this.candidatos[1].likes + 1;
            this.stats.likes = this.candidatos[1].likes;
            this.stats.dislikes = this.candidatos[1].dislikes;
            this.uid.puntuationStateC1 = true;
            this.uid.puntuationStateC1LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT', this.stats);
        }
        if (this.state == true && this.stateLD == false) {
            this.stateLD = true;
            this.candidatos[1].likes = this.candidatos[1].likes + 1;
            this.candidatos[1].dislikes = this.candidatos[1].dislikes - 1;
            this.stats.likes = this.candidatos[1].likes;
            this.stats.dislikes = this.candidatos[1].dislikes;
            this.uid.puntuationStateC1 = true;
            this.uid.puntuationStateC1LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT', this.stats);
        }
    };
    Candidate01Component.prototype.dislikesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = false;
            this.candidatos[1].dislikes = this.candidatos[1].dislikes + 1;
            this.stats.dislikes = this.candidatos[1].dislikes;
            this.stats.likes = this.candidatos[1].likes;
            this.uid.puntuationStateC1 = true;
            this.uid.puntuationStateC1LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT', this.stats);
        }
        if (this.state == true && this.stateLD == true) {
            this.stateLD = false;
            this.candidatos[1].dislikes = this.candidatos[1].dislikes + 1;
            this.candidatos[1].likes = this.candidatos[1].likes - 1;
            this.stats.dislikes = this.candidatos[1].dislikes;
            this.stats.likes = this.candidatos[1].likes;
            this.uid.puntuationStateC1 = true;
            this.uid.puntuationStateC1LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('lOpUAQ0s2pHclE2poBcT', this.stats);
        }
    };
    Object.defineProperty(Candidate01Component.prototype, "sortData", {
        get: function () {
            if (this.commentsA != undefined) {
                return this.commentsA.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Candidate01Component.prototype.saveComment = function () {
        if (this.comment == undefined || this.comment == "") {
            alert("Debe escribir un comentario");
        }
        else {
            this.commentObject.photo = this.data.photoURL;
            this.commentObject.comment = this.comment;
            var date = Date.now();
            this.commentObject.date = date;
            this.commentObject.nombre = this.data.displayName;
            this.firestoreService.createComment(this.commentObject);
        }
    };
    Candidate01Component.prototype.cleanInput = function () {
        this.comment = "";
    };
    Candidate01Component.prototype.deleteComment = function (id) {
        this.firestoreService.deleteComment(id);
    };
    Candidate01Component.prototype.nameUser = function () {
        this.data.displayName = this.name;
        localStorage.setItem('user', JSON.stringify(this.data));
    };
    Candidate01Component.prototype.eventHandler = function (event) {
        if (event.keyCode == 13) {
            this.saveComment();
            this.cleanInput();
        }
    };
    Candidate01Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-candidate01',
            template: __webpack_require__(/*! ./candidate01.component.html */ "./src/app/components/candidates/candidate01/candidate01.component.html"),
            styles: [__webpack_require__(/*! ./candidate01.component.css */ "./src/app/components/candidates/candidate01/candidate01.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], Candidate01Component);
    return Candidate01Component;
}());



/***/ }),

/***/ "./src/app/components/candidates/candidate02/candidate02.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate02/candidate02.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.color {\r\n  border-bottom: 1.5px #0c56ac !important;\r\n  box-shadow: 0 1.2px 0 0 #0c56ac !important;\r\n}\r\n\r\n.meGusta{\r\n  color: green;\r\n}\r\n\r\n.noMeGusta{\r\n  color: red;\r\n}\r\n\r\n.mleft2{\r\n  margin-right: 180px;\r\n}\r\n\r\n.mtop{\r\n  margin-top: 120px;\r\n}\r\n\r\n.mtopc{\r\n  margin-top: 15px;\r\n}\r\n\r\n.mtopicon{\r\n  display: flex;\r\n  margin-top: 5px;\r\n  justify-content: flex-start;\r\n  margin-left: 21px;\r\n}\r\n\r\n.mtopdate{\r\n  display: flex;\r\n  margin-top: 17px;\r\n  justify-content: flex-end;\r\n  /* margin-right: 21px; */\r\n  margin-left: 0;\r\n}\r\n\r\n.img-m{\r\n  display: flex;\r\n  margin-left: 25px;\r\n  align-content: left;\r\n  width:680px;\r\n  height:365px;\r\n  border-radius:40px;\r\n}\r\n\r\n.mtopcomment{\r\n  margin-top: 10px;\r\n  margin-left: 0px;\r\n}\r\n\r\n.mtopc2{\r\n  margin-top: 30px;\r\n}\r\n\r\n.mright{\r\n  margin-right: 8px;\r\n}\r\n\r\n.mright2{\r\n  margin-right: 35px;\r\n}\r\n\r\n.mleft{\r\n  margin-left: 0;\r\n}\r\n\r\n.button{\r\n  border-radius: 30px;\r\n}\r\n\r\n.pcenter{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.textc{\r\n  color: #0d47a1;\r\n}\r\n\r\n.mb{\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.backgroundcomment{\r\n  display: flex;\r\n  background: #e4f2ff;\r\n  height: 100%;\r\n  width: 80%;\r\n  max-width: 500px;\r\n  border-radius: 30px;\r\n  align-content: flex-start;\r\n  margin-top: 15px;\r\n  text-align: left;\r\n}\r\n\r\n.mbackground{\r\n  margin-top: 15px;\r\n  margin-right: 15px;\r\n  margin-bottom: 15px;\r\n  margin-left: 15px;\r\n}\r\n\r\n.fontdate{\r\n  font-size: 10px;\r\n}\r\n\r\n.commentj{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.din{\r\n  display: flex;\r\n}\r\n\r\n.imgr{\r\n  max-width: 40px;\r\n  min-width: 40px;\r\n  max-height: 40px;\r\n  min-height: 39px;\r\n}\r\n\r\n.centrado{\r\n  margin:10px auto;\r\n  display:block;\r\n}\r\n\r\n.example-viewport {\r\n  height: 800px;\r\n  width: 130%;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  width: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n  background-color: #9dd4ee;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background-color: #0c53a6;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jYW5kaWRhdGVzL2NhbmRpZGF0ZTAyL2NhbmRpZGF0ZTAyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1Q0FBdUM7RUFDdkMsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZiwyQkFBMkI7RUFDM0IsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLGNBQWM7QUFDaEI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFDQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NhbmRpZGF0ZXMvY2FuZGlkYXRlMDIvY2FuZGlkYXRlMDIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImlucHV0LmNvbG9yIHtcclxuICBib3JkZXItYm90dG9tOiAxLjVweCAjMGM1NmFjICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogMCAxLjJweCAwIDAgIzBjNTZhYyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubWVHdXN0YXtcclxuICBjb2xvcjogZ3JlZW47XHJcbn1cclxuLm5vTWVHdXN0YXtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4ubWxlZnQye1xyXG4gIG1hcmdpbi1yaWdodDogMTgwcHg7XHJcbn1cclxuLm10b3B7XHJcbiAgbWFyZ2luLXRvcDogMTIwcHg7XHJcbn1cclxuLm10b3Bje1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbn1cclxuLm10b3BpY29ue1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBtYXJnaW4tbGVmdDogMjFweDtcclxufVxyXG4ubXRvcGRhdGV7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgLyogbWFyZ2luLXJpZ2h0OiAyMXB4OyAqL1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5pbWctbXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi1sZWZ0OiAyNXB4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGxlZnQ7XHJcbiAgd2lkdGg6NjgwcHg7XHJcbiAgaGVpZ2h0OjM2NXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6NDBweDtcclxufVxyXG4ubXRvcGNvbW1lbnR7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXJnaW4tbGVmdDogMHB4O1xyXG59XHJcbi5tdG9wYzJ7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4ubXJpZ2h0e1xyXG4gIG1hcmdpbi1yaWdodDogOHB4O1xyXG59XHJcbi5tcmlnaHQye1xyXG4gIG1hcmdpbi1yaWdodDogMzVweDtcclxufVxyXG5cclxuLm1sZWZ0e1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5idXR0b257XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxufVxyXG5cclxuLnBjZW50ZXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4udGV4dGN7XHJcbiAgY29sb3I6ICMwZDQ3YTE7XHJcbn1cclxuXHJcbi5tYntcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uYmFja2dyb3VuZGNvbW1lbnR7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBiYWNrZ3JvdW5kOiAjZTRmMmZmO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogODAlO1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuLm1iYWNrZ3JvdW5ke1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5mb250ZGF0ZXtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5jb21tZW50antcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5kaW57XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4uaW1ncntcclxuICBtYXgtd2lkdGg6IDQwcHg7XHJcbiAgbWluLXdpZHRoOiA0MHB4O1xyXG4gIG1heC1oZWlnaHQ6IDQwcHg7XHJcbiAgbWluLWhlaWdodDogMzlweDtcclxufVxyXG4uY2VudHJhZG97XHJcbiAgbWFyZ2luOjEwcHggYXV0bztcclxuICBkaXNwbGF5OmJsb2NrO1xyXG59XHJcblxyXG4uZXhhbXBsZS12aWV3cG9ydCB7XHJcbiAgaGVpZ2h0OiA4MDBweDtcclxuICB3aWR0aDogMTMwJTtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhciB7XHJcbiAgd2lkdGg6IDdweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzlkZDRlZTtcclxufVxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGM1M2E2O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/candidates/candidate02/candidate02.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/components/candidates/candidate02/candidate02.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container section\">\r\n    <br><br><br><br>\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m12 l12 xl8 \">\r\n        <h4 class=\"mb center hide-on-small-only\" style=\"font-size:3.5vw;\">Gustavo Petro</h4>\r\n        <h4 class=\" center mb hide-on-med-and-up\">Gustavo Petro</h4>\r\n        <img class=\"centrado responsive-img z-depth-5 img-m\" src=\"../../../assets/files/petro.jpg\">\r\n        <div class=\"row\">\r\n          <div class=\"col mtopc2\">\r\n            <div *ngFor=\"let item of items|async\">\r\n              <div *ngIf=\"item.nombre=='Gustavo Petro'\">\r\n                <br>\r\n                <div class=\"row\">\r\n                  <div class=\"col mb\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light green mright\" [ngClass]=\"{disabled: state==true && stateLD==true }\"><i (click)=\"likesCount()\" class=\"material-icons\">thumb_up</i></a>\r\n                    A <b>{{item.likes}}</b> personas <span class=\"meGusta\"><b>les gusta</b></span> este candidato\r\n                  </div>\r\n                  <div class=\"col\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light red mright\" [ngClass]=\"{disabled: state==true && stateLD==false}\"><i (click)=\"dislikesCount()\" class=\"material-icons\">thumb_down</i></a>\r\n                    A <b>{{item.dislikes}}</b> personas <span class=\"noMeGusta\"><b>no les gusta</b></span> este candidato\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"row center\">\r\n              <div class=\"col-auto\">\r\n                <h5 *ngIf=\"state==true && stateLD==false\"> <span class=\"noMeGusta\"><b>No te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_dissatisfied</i></h5>\r\n                <h5 *ngIf=\"state==true && stateLD==true\"> <span class=\"meGusta\"><b>Te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_satisfied</i></h5>\r\n                <h5 *ngIf=\"state==false\"> <b>Califica a este candidato</b></h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m12 l12 xl4\">\r\n        <div class=\"row pcenter\">\r\n          <div class=\"col\">\r\n            <br><br>\r\n            <input type=\"text\" [(ngModel)]=\"comment\" placeholder=\"Escribe un comentario\" class=\"color\" (keypress)=\"eventHandler($event)\">\r\n            <button *ngIf=\"data.displayName!=''\" class=\"btn button light-blue darken-2 button\" (click)=\"saveComment()\" (click)=\"cleanInput()\">Comentar</button>\r\n            <button *ngIf=\"data.displayName==''\" class=\"btn button light-blue darken-2 button\" [routerLink]=\"['/profile']\">Comentar</button>\r\n            <br><br>\r\n            <div *ngIf=\"stateComments==false\">\r\n              <h5>No hay comentarios por aquí</h5>\r\n            </div>\r\n            <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n              <div *cdkVirtualFor=\"let item of sortData\">\r\n                <div class=\"row\" *ngIf=\"item.candidate=='Gustavo Petro'\" class=\"backgroundcomment\">\r\n                  <div *ngIf=\"item.uid==data.uid\" class=\"mbackground\">\r\n                    <div class=\"row din\">\r\n                      <div class=\"col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                        <a [routerLink]=\"['/home']\">\r\n                          <ngx-avatar name='{{data.displayName}}' class=\"imgr\"></ngx-avatar>\r\n                        </a>\r\n                      </div>\r\n                      <div class=\"col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                        <a [routerLink]=\"['/home']\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                      </div>\r\n                      <div class=\"col s9 mtopcomment pull-s1\">\r\n                        <a [routerLink]=\"['/home']\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div *ngIf=\"item.uid!=data.uid\" class=\"mbackground \">\r\n                    <div class=\"row din\">\r\n                      <div class=\"col col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\">\r\n                          <ngx-avatar name=\"{{item.nombre}}\" class=\"imgr\"></ngx-avatar>\r\n                        </a>\r\n                      </div>\r\n                      <div class=\"col col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                      </div>\r\n                      <div class=\"col s9 mtopcomment pull-s1\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"item.candidate=='Gustavo Petro'\">\r\n                  <div class=\"row \">\r\n                    <div class=\"col\">\r\n                      <a class=\"btn-flat\"><i (click)=\"deleteComment(item.id)\" *ngIf=\"item.uid==data.uid\" class=\"material-icons mtopicon\" style=\"color:#da5656\">delete</i></a>\r\n                    </div>\r\n                    <div class=\"col mtopdate\">\r\n                      <span class=\"fontdate \"> {{item.date | date:'short'}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </cdk-virtual-scroll-viewport>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/candidates/candidate02/candidate02.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate02/candidate02.component.ts ***!
  \****************************************************************************/
/*! exports provided: Candidate02Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Candidate02Component", function() { return Candidate02Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__);





var Candidate02Component = /** @class */ (function () {
    function Candidate02Component(firestoreService, authService, db) {
        var _this = this;
        this.firestoreService = firestoreService;
        this.authService = authService;
        this.db = db;
        // public candidatos:Candidatos = {
        //   id:'',
        //   data:{},
        //
        // }
        this.users = [];
        this.candidatos = [];
        this.showNameA = [];
        this.uid = {
            name: '',
            puntuationStateC1: false,
            puntuationStateC1LD: false,
            puntuationStateC2: false,
            puntuationStateC2LD: false,
            puntuationStateC3: false,
            puntuationStateC3LD: false,
            uid: ''
        };
        this.commentObject = {
            candidate: 'Gustavo Petro',
            comment: '',
            uid: '',
            nombre: '',
            photo: '',
            date: null
        };
        this.state = null;
        this.stateLD = null;
        this.stateComments = null;
        this.document = '';
        this.stats = {
            nombre: 'Gustavo Petro',
            likes: 0,
            dislikes: 0
        };
        this.data = JSON.parse((localStorage.getItem('user')));
        this.showName = this.db.collection('/usuarios').valueChanges();
        this.showName.subscribe(function (data) {
            if (data) {
                _this.showNameA = data;
            }
            for (var _i = 0, _a = _this.showNameA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.data.uid) {
                    _this.data.displayName = e.name;
                    localStorage.setItem('user', JSON.stringify(_this.data));
                    break;
                }
            }
        });
    }
    Candidate02Component.prototype.ngOnInit = function () {
        var _this = this;
        this.data = JSON.parse((localStorage.getItem('user')));
        console.log(this.data);
        this.items = this.db.collection('/candidatos').valueChanges();
        this.commentObject.uid = this.data.uid;
        this.commentObject.nombre = this.data.displayName;
        this.firestoreService.getItems().subscribe(function (items) {
            _this.commentsA = items;
            for (var _i = 0, _a = _this.commentsA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.candidate == 'Gustavo Petro') {
                    _this.stateComments = true;
                    break;
                }
                else {
                    _this.stateComments = false;
                }
            }
        });
        this.items.subscribe(function (data) {
            if (data) {
                _this.candidatos = data;
            }
        });
        this.firestoreService.getUsers().subscribe(function (data) {
            if (data) {
                data.map(function (test) {
                    _this.users.push({
                        id: test.payload.doc.id,
                        data: test.payload.doc.data()
                    });
                });
                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (_this.data.uid == e.data.uid) {
                        if (e.data.puntuationStateC2 == true) {
                            _this.state = true;
                            if (e.data.puntuationStateC2LD == true) {
                                _this.stateLD = true;
                            }
                            else {
                                _this.stateLD = false;
                            }
                        }
                        if (e.data.puntuationStateC2 == false) {
                            _this.state = false;
                        }
                        _this.document = e.id;
                        _this.data.uid = e.data.uid;
                        _this.uid.name = _this.data.displayName;
                        _this.uid.puntuationStateC1 = e.data.puntuationStateC1;
                        _this.uid.puntuationStateC1LD = e.data.puntuationStateC1LD;
                        _this.uid.puntuationStateC3 = e.data.puntuationStateC3;
                        _this.uid.puntuationStateC3LD = e.data.puntuationStateC3LD;
                    }
                }
            }
        });
    };
    Candidate02Component.prototype.likesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = true;
            this.candidatos[2].likes = this.candidatos[2].likes + 1;
            this.stats.likes = this.candidatos[2].likes;
            this.stats.dislikes = this.candidatos[2].dislikes;
            this.uid.puntuationStateC2 = true;
            this.uid.puntuationStateC2LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
        }
        if (this.state == true && this.stateLD == false) {
            this.stateLD = true;
            this.candidatos[2].likes = this.candidatos[2].likes + 1;
            this.candidatos[2].dislikes = this.candidatos[2].dislikes - 1;
            this.stats.likes = this.candidatos[2].likes;
            this.stats.dislikes = this.candidatos[2].dislikes;
            this.uid.puntuationStateC2 = true;
            this.uid.puntuationStateC2LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
        }
    };
    Candidate02Component.prototype.dislikesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = false;
            this.candidatos[2].dislikes = this.candidatos[2].dislikes + 1;
            this.stats.dislikes = this.candidatos[2].dislikes;
            this.stats.likes = this.candidatos[2].likes;
            this.uid.puntuationStateC2 = true;
            this.uid.puntuationStateC2LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
        }
        if (this.state == true && this.stateLD == true) {
            this.stateLD = false;
            this.candidatos[2].dislikes = this.candidatos[2].dislikes + 1;
            this.candidatos[2].likes = this.candidatos[2].likes - 1;
            this.stats.dislikes = this.candidatos[2].dislikes;
            this.stats.likes = this.candidatos[2].likes;
            this.uid.puntuationStateC2 = true;
            this.uid.puntuationStateC2LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('wGpPnGo5R9Es7edAQYSB', this.stats);
        }
    };
    Object.defineProperty(Candidate02Component.prototype, "sortData", {
        get: function () {
            if (this.commentsA != undefined) {
                return this.commentsA.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Candidate02Component.prototype.saveComment = function () {
        if (this.comment == undefined || this.comment == "") {
            alert("Debe escribir un comentario");
        }
        else {
            this.commentObject.photo = this.data.photoURL;
            this.commentObject.comment = this.comment;
            var date = Date.now();
            this.commentObject.date = date;
            this.commentObject.nombre = this.data.displayName;
            this.firestoreService.createComment(this.commentObject);
        }
    };
    Candidate02Component.prototype.cleanInput = function () {
        this.comment = "";
    };
    Candidate02Component.prototype.deleteComment = function (id) {
        this.firestoreService.deleteComment(id);
    };
    Candidate02Component.prototype.nameUser = function () {
        this.data.displayName = this.name;
        localStorage.setItem('user', JSON.stringify(this.data));
    };
    Candidate02Component.prototype.eventHandler = function (event) {
        if (event.keyCode == 13) {
            this.saveComment();
            this.cleanInput();
        }
    };
    Candidate02Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-candidate02',
            template: __webpack_require__(/*! ./candidate02.component.html */ "./src/app/components/candidates/candidate02/candidate02.component.html"),
            styles: [__webpack_require__(/*! ./candidate02.component.css */ "./src/app/components/candidates/candidate02/candidate02.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], Candidate02Component);
    return Candidate02Component;
}());



/***/ }),

/***/ "./src/app/components/candidates/candidate03/candidate03.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate03/candidate03.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.color {\r\n  border-bottom: 1.5px #0c56ac !important;\r\n  box-shadow: 0 1.2px 0 0 #0c56ac !important;\r\n}\r\n\r\n.meGusta{\r\n  color: green;\r\n}\r\n\r\n.noMeGusta{\r\n  color: red;\r\n}\r\n\r\n.mleft2{\r\n  margin-right: 180px;\r\n}\r\n\r\n.mtop{\r\n  margin-top: 120px;\r\n}\r\n\r\n.mtopc{\r\n  margin-top: 15px;\r\n}\r\n\r\n.mtopicon{\r\n  display: flex;\r\n  margin-top: 5px;\r\n  justify-content: flex-start;\r\n  margin-left: 21px;\r\n}\r\n\r\n.mtopdate{\r\n  display: flex;\r\n  margin-top: 17px;\r\n  justify-content: flex-end;\r\n  /* margin-right: 21px; */\r\n  margin-left: 0;\r\n}\r\n\r\n.img-m{\r\n  display: flex;\r\n  margin-left: 25px;\r\n  align-content: left;\r\n  width:680px;\r\n  height:365px;\r\n  border-radius:40px;\r\n}\r\n\r\n.mtopcomment{\r\n  margin-top: 10px;\r\n  margin-left: 0px;\r\n}\r\n\r\n.mtopc2{\r\n  margin-top: 30px;\r\n}\r\n\r\n.mright{\r\n  margin-right: 8px;\r\n}\r\n\r\n.mright2{\r\n  margin-right: 35px;\r\n}\r\n\r\n.mleft{\r\n  margin-left: 0;\r\n}\r\n\r\n.button{\r\n  border-radius: 30px;\r\n}\r\n\r\n.pcenter{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.textc{\r\n  color: #0d47a1;\r\n}\r\n\r\n.mb{\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.backgroundcomment{\r\n  display: flex;\r\n  background: #e4f2ff;\r\n  height: 100%;\r\n  width: 80%;\r\n  max-width: 400px;\r\n  border-radius: 30px;\r\n  align-content: flex-start;\r\n  margin-top: 15px;\r\n  text-align: left;\r\n}\r\n\r\n.mbackground{\r\n  margin-top: 15px;\r\n  margin-right: 15px;\r\n  margin-bottom: 15px;\r\n  margin-left: 15px;\r\n}\r\n\r\n.fontdate{\r\n  font-size: 10px;\r\n}\r\n\r\n.commentj{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.din{\r\n  display: flex;\r\n}\r\n\r\n.imgr{\r\n  max-width: 40px;\r\n  min-width: 40px;\r\n  max-height: 40px;\r\n  min-height: 39px;\r\n}\r\n\r\n.centrado{\r\n  margin:10px auto;\r\n  display:block;\r\n}\r\n\r\n.example-viewport {\r\n  height: 800px;\r\n  width: 130%;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n  width: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n  background-color: #9dd4ee;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n  background-color: #0c53a6;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jYW5kaWRhdGVzL2NhbmRpZGF0ZTAzL2NhbmRpZGF0ZTAzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1Q0FBdUM7RUFDdkMsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZiwyQkFBMkI7RUFDM0IsaUJBQWlCO0FBQ25COztBQUNBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLGNBQWM7QUFDaEI7O0FBQ0E7RUFDRSxhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7O0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtBQUN6Qjs7QUFDQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUNBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0FBQ2xCOztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0FBQ2I7O0FBQ0E7RUFDRSxVQUFVO0FBQ1o7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBQ0E7RUFDRSx5QkFBeUI7QUFDM0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NhbmRpZGF0ZXMvY2FuZGlkYXRlMDMvY2FuZGlkYXRlMDMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImlucHV0LmNvbG9yIHtcclxuICBib3JkZXItYm90dG9tOiAxLjVweCAjMGM1NmFjICFpbXBvcnRhbnQ7XHJcbiAgYm94LXNoYWRvdzogMCAxLjJweCAwIDAgIzBjNTZhYyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubWVHdXN0YXtcclxuICBjb2xvcjogZ3JlZW47XHJcbn1cclxuLm5vTWVHdXN0YXtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4ubWxlZnQye1xyXG4gIG1hcmdpbi1yaWdodDogMTgwcHg7XHJcbn1cclxuLm10b3B7XHJcbiAgbWFyZ2luLXRvcDogMTIwcHg7XHJcbn1cclxuLm10b3Bje1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbn1cclxuLm10b3BpY29ue1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogNXB4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBtYXJnaW4tbGVmdDogMjFweDtcclxufVxyXG4ubXRvcGRhdGV7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBtYXJnaW4tdG9wOiAxN3B4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgLyogbWFyZ2luLXJpZ2h0OiAyMXB4OyAqL1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5pbWctbXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIG1hcmdpbi1sZWZ0OiAyNXB4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGxlZnQ7XHJcbiAgd2lkdGg6NjgwcHg7XHJcbiAgaGVpZ2h0OjM2NXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6NDBweDtcclxufVxyXG4ubXRvcGNvbW1lbnR7XHJcbiAgbWFyZ2luLXRvcDogMTBweDtcclxuICBtYXJnaW4tbGVmdDogMHB4O1xyXG59XHJcbi5tdG9wYzJ7XHJcbiAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG4ubXJpZ2h0e1xyXG4gIG1hcmdpbi1yaWdodDogOHB4O1xyXG59XHJcbi5tcmlnaHQye1xyXG4gIG1hcmdpbi1yaWdodDogMzVweDtcclxufVxyXG5cclxuLm1sZWZ0e1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG59XHJcbi5idXR0b257XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxufVxyXG5cclxuLnBjZW50ZXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4udGV4dGN7XHJcbiAgY29sb3I6ICMwZDQ3YTE7XHJcbn1cclxuXHJcbi5tYntcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4uYmFja2dyb3VuZGNvbW1lbnR7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBiYWNrZ3JvdW5kOiAjZTRmMmZmO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogODAlO1xyXG4gIG1heC13aWR0aDogNDAwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuLm1iYWNrZ3JvdW5ke1xyXG4gIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxNXB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5mb250ZGF0ZXtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbn1cclxuXHJcbi5jb21tZW50antcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbi5kaW57XHJcbiAgZGlzcGxheTogZmxleDtcclxufVxyXG4uaW1ncntcclxuICBtYXgtd2lkdGg6IDQwcHg7XHJcbiAgbWluLXdpZHRoOiA0MHB4O1xyXG4gIG1heC1oZWlnaHQ6IDQwcHg7XHJcbiAgbWluLWhlaWdodDogMzlweDtcclxufVxyXG4uY2VudHJhZG97XHJcbiAgbWFyZ2luOjEwcHggYXV0bztcclxuICBkaXNwbGF5OmJsb2NrO1xyXG59XHJcblxyXG4uZXhhbXBsZS12aWV3cG9ydCB7XHJcbiAgaGVpZ2h0OiA4MDBweDtcclxuICB3aWR0aDogMTMwJTtcclxufVxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICB3aWR0aDogN3B4O1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWRkNGVlO1xyXG59XHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzUzYTY7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/candidates/candidate03/candidate03.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/components/candidates/candidate03/candidate03.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container section\">\r\n    <br><br><br><br>\r\n    <div class=\"row\">\r\n      <div class=\"col s12 m12 l12 xl8 \">\r\n        <h4 class=\"mb center hide-on-small-only hide-on-med-only\" style=\"font-size:3.5vw;\">Sergio Fajardo</h4>\r\n        <h4 class=\" center mb hide-on-large-only\">Sergio Fajardo</h4>\r\n        <img class=\"centrado responsive-img z-depth-5 img-m\" src=\"../../../assets/files/fajardo.jpg\">\r\n        <div class=\"row\">\r\n          <div class=\"col mtopc2\">\r\n            <div *ngFor=\"let item of items|async\">\r\n              <div *ngIf=\"item.nombre=='Sergio Fajardo'\">\r\n                <br>\r\n                <div class=\"row\">\r\n                  <div class=\"col mb push-s1\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light green mright\" [ngClass]=\"{disabled: state==true && stateLD==true }\"><i (click)=\"likesCount()\" class=\"material-icons\">thumb_up</i></a>\r\n                    A <b>{{item.likes}}</b> personas <span class=\"meGusta\"><b>les gusta</b></span> este candidato\r\n                  </div>\r\n                  <div class=\"col push-s1\">\r\n                    <a class=\"btn-floating btn-large waves-effect waves-light red mright mleft\" [ngClass]=\"{disabled: state==true && stateLD==false}\"><i (click)=\"dislikesCount()\" class=\"material-icons\">thumb_down</i></a>\r\n                    A <b>{{item.dislikes}}</b> personas <span class=\"noMeGusta\"><b>no les gusta</b></span> este candidato\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <br>\r\n            <div class=\"row center\">\r\n              <div class=\"col-auto\">\r\n                <h5 *ngIf=\"state==true && stateLD==false\"> <span class=\"noMeGusta\"><b>No te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_dissatisfied</i></h5>\r\n                <h5 *ngIf=\"state==true && stateLD==true\"> <span class=\"meGusta\"><b>Te gusta</b></span> este candidato <i class=\"material-icons\">sentiment_very_satisfied</i></h5>\r\n                <h5 *ngIf=\"state==false\"> <b>Califica a este candidato</b></h5>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col s12 m12 l12 xl4\">\r\n        <div class=\"row pcenter\">\r\n          <div class=\"col\">\r\n            <br><br>\r\n            <input type=\"text\" [(ngModel)]=\"comment\" placeholder=\"Escribe un comentario\" class=\"color\" (keypress)=\"eventHandler($event)\">\r\n            <button *ngIf=\"data.displayName!=''\" class=\"btn button light-blue darken-2 button\" (click)=\"saveComment()\" (click)=\"cleanInput()\">Comentar</button>\r\n            <button *ngIf=\"data.displayName==''\" class=\"btn button light-blue darken-2 button\" [routerLink]=\"['/profile']\">Comentar</button>\r\n            <br><br>\r\n            <div *ngIf=\"stateComments==false\">\r\n              <h5>No hay comentarios por aquí</h5>\r\n            </div>\r\n            <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n              <div *cdkVirtualFor=\"let item of sortData\">\r\n                <div class=\"row\" *ngIf=\"item.candidate=='Sergio Fajardo'\" class=\"backgroundcomment\">\r\n                  <div *ngIf=\"item.uid==data.uid\" class=\"mbackground\">\r\n                    <div class=\"row din\">\r\n                      <div class=\"col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                        <a [routerLink]=\"['/home']\">\r\n                          <ngx-avatar name='{{data.displayName}}' class=\"imgr\"></ngx-avatar>\r\n                        </a>\r\n                      </div>\r\n                      <div class=\"col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                        <a [routerLink]=\"['/home']\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                      </div>\r\n                      <div class=\"col s9 mtopcomment pull-s1\">\r\n                        <a [routerLink]=\"['/home']\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div *ngIf=\"item.uid!=data.uid\" class=\"mbackground \">\r\n                    <div class=\"row din\">\r\n                      <div class=\"col col s2 mright2\" *ngIf=\"item.photo==null\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\">\r\n                          <ngx-avatar name=\"{{item.nombre}}\" class=\"imgr\"></ngx-avatar>\r\n                        </a>\r\n                      </div>\r\n                      <div class=\"col col s2 mright2\" *ngIf=\"item.photo!=null\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\"><img src=\"{{item.photo}}\" alt=\"Avatar\" class=\"circle responsive-img valign profile-image imgr\"></a>\r\n                      </div>\r\n                      <div class=\"col s9 mtopcomment pull-s1\">\r\n                        <a [routerLink]=\"['/users',item.uid,item.nombre]\"><b class=\"textc\">{{item.nombre}}</b></a> {{item.comment}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"item.candidate=='Sergio Fajardo'\">\r\n                  <div class=\"row \">\r\n                    <div class=\"col\">\r\n                      <a class=\"btn-flat\"><i (click)=\"deleteComment(item.id)\" *ngIf=\"item.uid==data.uid\" class=\"material-icons mtopicon\" style=\"color:#da5656\">delete</i></a>\r\n                    </div>\r\n                    <div class=\"col mtopdate\">\r\n                      <span class=\"fontdate \"> {{item.date | date:'short'}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </cdk-virtual-scroll-viewport>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/candidates/candidate03/candidate03.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/components/candidates/candidate03/candidate03.component.ts ***!
  \****************************************************************************/
/*! exports provided: Candidate03Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Candidate03Component", function() { return Candidate03Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__);





var Candidate03Component = /** @class */ (function () {
    function Candidate03Component(firestoreService, authService, db) {
        var _this = this;
        this.firestoreService = firestoreService;
        this.authService = authService;
        this.db = db;
        this.users = [];
        this.candidatos = [];
        this.showNameA = [];
        this.uid = {
            name: '',
            puntuationStateC1: false,
            puntuationStateC1LD: false,
            puntuationStateC2: false,
            puntuationStateC2LD: false,
            puntuationStateC3: false,
            puntuationStateC3LD: false,
            uid: ''
        };
        this.commentObject = {
            candidate: 'Sergio Fajardo',
            comment: '',
            uid: '',
            nombre: '',
            photo: '',
            date: null
        };
        this.state = null;
        this.stateLD = null;
        this.stateComments = null;
        this.document = '';
        this.stats = {
            nombre: 'Sergio Fajardo',
            likes: 0,
            dislikes: 0
        };
        this.data = JSON.parse((localStorage.getItem('user')));
        this.showName = this.db.collection('/usuarios').valueChanges();
        this.showName.subscribe(function (data) {
            if (data) {
                _this.showNameA = data;
            }
            for (var _i = 0, _a = _this.showNameA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.data.uid) {
                    _this.data.displayName = e.name;
                    localStorage.setItem('user', JSON.stringify(_this.data));
                    break;
                }
            }
        });
    }
    Candidate03Component.prototype.ngOnInit = function () {
        var _this = this;
        this.data = JSON.parse((localStorage.getItem('user')));
        console.log(this.data);
        this.items = this.db.collection('/candidatos').valueChanges();
        this.commentObject.uid = this.data.uid;
        this.commentObject.nombre = this.data.displayName;
        this.firestoreService.getItems().subscribe(function (items) {
            _this.commentsA = items;
            for (var _i = 0, _a = _this.commentsA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.candidate == 'Sergio Fajardo') {
                    _this.stateComments = true;
                    break;
                }
                else {
                    _this.stateComments = false;
                }
            }
        });
        this.items.subscribe(function (data) {
            if (data) {
                _this.candidatos = data;
            }
        });
        this.firestoreService.getUsers().subscribe(function (data) {
            if (data) {
                data.map(function (test) {
                    _this.users.push({
                        id: test.payload.doc.id,
                        data: test.payload.doc.data()
                    });
                });
                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (_this.data.uid == e.data.uid) {
                        if (e.data.puntuationStateC3 == true) {
                            _this.state = true;
                            if (e.data.puntuationStateC3LD == true) {
                                _this.stateLD = true;
                            }
                            else {
                                _this.stateLD = false;
                            }
                        }
                        if (e.data.puntuationStateC3 == false) {
                            _this.state = false;
                        }
                        _this.document = e.id;
                        _this.data.uid = e.data.uid;
                        _this.uid.name = _this.data.displayName;
                        _this.uid.puntuationStateC1 = e.data.puntuationStateC1;
                        _this.uid.puntuationStateC1LD = e.data.puntuationStateC1LD;
                        _this.uid.puntuationStateC2 = e.data.puntuationStateC2;
                        _this.uid.puntuationStateC2LD = e.data.puntuationStateC2LD;
                    }
                }
            }
        });
    };
    Candidate03Component.prototype.likesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = true;
            this.candidatos[0].likes = this.candidatos[0].likes + 1;
            this.stats.likes = this.candidatos[0].likes;
            this.stats.dislikes = this.candidatos[0].dislikes;
            this.uid.puntuationStateC3 = true;
            this.uid.puntuationStateC3LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
        }
        if (this.state == true && this.stateLD == false) {
            this.stateLD = true;
            this.candidatos[0].likes = this.candidatos[0].likes + 1;
            this.candidatos[0].dislikes = this.candidatos[0].dislikes - 1;
            this.stats.likes = this.candidatos[0].likes;
            this.stats.dislikes = this.candidatos[0].dislikes;
            this.uid.puntuationStateC3 = true;
            this.uid.puntuationStateC3LD = true;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
        }
    };
    Candidate03Component.prototype.dislikesCount = function () {
        if (this.state == false) {
            this.state = true;
            this.stateLD = false;
            this.candidatos[0].dislikes = this.candidatos[0].dislikes + 1;
            this.stats.dislikes = this.candidatos[0].dislikes;
            this.stats.likes = this.candidatos[0].likes;
            this.uid.puntuationStateC3 = true;
            this.uid.puntuationStateC3LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
        }
        if (this.state == true && this.stateLD == true) {
            this.stateLD = false;
            this.candidatos[0].dislikes = this.candidatos[0].dislikes + 1;
            this.candidatos[0].likes = this.candidatos[0].likes - 1;
            this.stats.dislikes = this.candidatos[0].dislikes;
            this.stats.likes = this.candidatos[0].likes;
            this.uid.puntuationStateC3 = true;
            this.uid.puntuationStateC3LD = false;
            this.uid.uid = this.data.uid;
            this.firestoreService.updateUser(this.document, this.uid);
            this.firestoreService.updateCandidate('2XAO5ejyPngOmzKpeCxN', this.stats);
        }
    };
    Object.defineProperty(Candidate03Component.prototype, "sortData", {
        get: function () {
            if (this.commentsA != undefined) {
                return this.commentsA.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Candidate03Component.prototype.saveComment = function () {
        if (this.comment == undefined || this.comment == "") {
            alert("Debe escribir un comentario");
        }
        else {
            this.commentObject.photo = this.data.photoURL;
            this.commentObject.comment = this.comment;
            var date = Date.now();
            this.commentObject.date = date;
            this.commentObject.nombre = this.data.displayName;
            this.firestoreService.createComment(this.commentObject);
        }
    };
    Candidate03Component.prototype.cleanInput = function () {
        this.comment = "";
    };
    Candidate03Component.prototype.deleteComment = function (id) {
        this.firestoreService.deleteComment(id);
    };
    Candidate03Component.prototype.nameUser = function () {
        this.data.displayName = this.name;
        localStorage.setItem('user', JSON.stringify(this.data));
    };
    Candidate03Component.prototype.eventHandler = function (event) {
        if (event.keyCode == 13) {
            this.saveComment();
            this.cleanInput();
        }
    };
    Candidate03Component = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-candidate03',
            template: __webpack_require__(/*! ./candidate03.component.html */ "./src/app/components/candidates/candidate03/candidate03.component.html"),
            styles: [__webpack_require__(/*! ./candidate03.component.css */ "./src/app/components/candidates/candidate03/candidate03.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_2__["FirestoreService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], Candidate03Component);
    return Candidate03Component;
}());



/***/ }),

/***/ "./src/app/components/candidates/candidates.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/candidates/candidates.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center {\r\n    text-align: center;\r\n}\r\n\r\n.button{\r\n  border-radius: 30px;\r\n}\r\n\r\n.mt{\r\n  margin-top: 50px;\r\n}\r\n\r\n.titleb{\r\n  font-size: 20px;\r\n  margin-bottom: 15px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9jYW5kaWRhdGVzL2NhbmRpZGF0ZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NhbmRpZGF0ZXMvY2FuZGlkYXRlcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNlbnRlciB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5idXR0b257XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcclxufVxyXG5cclxuLm10e1xyXG4gIG1hcmdpbi10b3A6IDUwcHg7XHJcbn1cclxuXHJcbi50aXRsZWJ7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/candidates/candidates.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/candidates/candidates.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n\r\n    <div class=\"container section\">\r\n      <br>\r\n      <mat-tab-group mat-align-tabs=\"center\">\r\n        <mat-tab label=\"Alvaro Uribe\">\r\n            <br><br>\r\n            <div class=\"row\">\r\n                <div class=\"col s12 m12 l12 xl4 center \">\r\n                  <img class=\" responsive-img z-depth-5\" src=\"../../../assets/files/uribe.jpg\" width=\"300\" height=\"190\">\r\n                  <div class=\"row\">\r\n                      <div class=\"col-auto\">\r\n                        <h5 class=\"center\">Alvaro Uribe</h5>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-auto center\">\r\n                        <a  [routerLink]=\"['candidate01']\" class=\"btn-small waves-effect waves-light  light-blue darken-2 button\"> <b>Calificame</b></a>\r\n                      </div>\r\n                      <div class=\"col-auto mt\">\r\n                        <div style=\"display: block\">\r\n                        <canvas baseChart\r\n                                [data]=\"pieChartDataUribe\"\r\n                                [labels]=\"pieChartLabels\"\r\n                                [chartType]=\"pieChartType\"\r\n                                [colors]=\"pieChartColors\">\r\n                        </canvas>\r\n                      </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col s12 m12 l12 xl8\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-auto center titleb\">\r\n                      <b>\r\n                        Biografía\r\n                      </b>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                      <p ALIGN=\"justify\">Álvaro Uribe Vélez (Medellín, 4 de julio de 1952) es un abogado y político colombiano, presidente de Colombia en los períodos 2002-2006 y 2006-2010. Uribe es abogado de la Universidad de Antioquia y cursó estudios en administración, gerencia y negociación de conflictos en la Escuela de Extensión de la Universidad de Harvard;​ y es miembro sénior asociado del St Antony's College de la Universidad de Oxford. <br><br>\r\n                      Desempeñó diferentes cargos en las Empresas Públicas de Medellín, el Ministerio de Trabajo y la Aeronáutica Civil. Fue Alcalde de Medellín (1982), Senador de la República (1986-1994) y Gobernador de Antioquia (1995-1997), siendo elegido presidente de la República de Colombia en 2002 y reelegido en 2006. <br><br>\r\n                      De tendencia liberal, pero disidente de este partido, Uribe se presentó a las elecciones presidenciales de 2002, apoyado por el movimiento Primero Colombia, logrando imponerse a sus contendores con el 54 % de los votos a su favor. Su mandato se caracterizó por la lucha contra el terrorismo y el narcotráfico bajo la política de seguridad democrática, un programa de gobierno que fue financiado en parte por el Plan Colombia y que recibió críticas por sectores de la oposición y disidentes.​ Promovió su reelección y fue reelecto en 2006 tras haber logrado la aprobación de la reforma constitucional de 2005, la cual dio vía libre a la reelección. <br><br>\r\n                      </p>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                      <div class=\"col-auto center titleb\">\r\n                        <b>\r\n                          Propuestas\r\n                        </b>\r\n                      </div>\r\n                      <div class=\"col\">\r\n                        <p ALIGN=\"justify\"><b>Propuesta número uno:</b><br><br>\r\n                          <b>Propuesta número dos:</b> <br><br>\r\n                          <b>Propuesta número tres:</b> <br><br>\r\n                        </p>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n        </mat-tab>\r\n        <mat-tab label=\"Gustavo Petro\">\r\n            <br><br>\r\n            <div class=\"row\">\r\n                <div class=\"col s12 m12 xl4 center \">\r\n                  <img class=\"responsive-img z-depth-5\" src=\"../../../assets/files/petro.jpg\" width=\"300\" height=\"190\">\r\n                  <div class=\"row\">\r\n                      <div class=\"col-auto\">\r\n                        <h5 class=\"center\">Gustavo Petro</h5>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-auto center\">\r\n                        <a  [routerLink]=\"['candidate02']\" class=\"btn-small waves-effect waves-light  light-blue darken-2 button\"> <b>Calificame</b></a>\r\n                      </div>\r\n                      <div class=\"col-auto mt\">\r\n                        <div style=\"display: block\">\r\n                          <canvas baseChart\r\n                                  [data]=\"pieChartDataPetro\"\r\n                                  [labels]=\"pieChartLabels\"\r\n                                  [chartType]=\"pieChartType\"\r\n                                  [colors]=\"pieChartColors\">\r\n                          </canvas>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col s12 m12 xl8\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-auto center titleb\">\r\n                      <b>\r\n                        Biografía\r\n                      </b>\r\n                    </div>\r\n                    <div class=\"col\">\r\n                      <p ALIGN=\"justify\">El exalcalde de Bogotá y excandidato presidencial nació en Ciénaga del Oro, Córdoba en 1960, creció en Zipaquirá y se unió al M-19 a los 17 años. Poco a poco fue ganándose un lugar importante en el ala política de esa guerrilla hasta ser el más joven de los cinco miembros de la Dirección de la Región Central. Antes de eso, fue Personero de Zipaquirá en 1980 y llegó a ser concejal independiente de ese municipio entre 1984 y 1986. <br><br>\r\n                        Ya como líder guerrillero, promovió el desarme del M-19 entre 1989 y 1990, de la mano de Carlos Pizarro. <br><br>\r\n                        Es economista de la Universidad el Externado de Colombia con especialización en administración de la Escuela Superior de Administración Pública (ESAP) y diplomado en estudios especializados en Desarrollo, Población y Medio Ambiente de la Universidad Católica de Lovaina; también inició un programa de doctorado en Nuevas Tendencias en Administración de Empresas en la Universidad de Salamanca, que está inconcluso. <br><br>\r\n                        Ya en la vida civil, entre 1990 y 1991 fue asesor de la Gobernación de Cundinamarca. Y en 1991, tras la Asamblea Constituyente, fue elegido Representante a la Cámara por Cundinamarca, como miembro de la Alianza Democrática M-19. En 1994 fracasó en su intento de reelección y fue nombrado agregado diplomático en Bruselas por el gobierno de Ernesto Samper, ante las amenazas de muerte que había recibido. <br><br>\r\n                      </p>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"row\">\r\n                      <div class=\"col-auto center titleb\">\r\n                        <b>\r\n                          Propuestas\r\n                        </b>\r\n                      </div>\r\n                      <div class=\"col\">\r\n                        <p aling=\"justify\"><b>Propuesta número uno:</b><br><br>\r\n                          <b>Propuesta número dos:</b> <br><br>\r\n                          <b>Propuesta número tres:</b> <br><br>\r\n                        </p>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n        </mat-tab>\r\n        <mat-tab label=\"Sergio Fajardo\">\r\n            <br><br>\r\n          <div class=\"row\">\r\n            <div class=\"col s12 m12 xl4 center \">\r\n              <img class=\"responsive-img z-depth-5\" src=\"../../../assets/files/fajardo.jpg\" width=\"300\" height=\"190\">\r\n              <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\">Sergio Fajardo</h5>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto center\">\r\n                    <a  [routerLink]=\"['candidate03']\" class=\"btn-small waves-effect waves-light  light-blue darken-2 button\"> <b>Calificame</b></a>\r\n                  </div>\r\n                  <div class=\"col-auto mt\">\r\n                    <div style=\"display: block\">\r\n                      <canvas baseChart\r\n                              [data]=\"pieChartDataFajardo\"\r\n                              [labels]=\"pieChartLabels\"\r\n                              [chartType]=\"pieChartType\"\r\n                              [colors]=\"pieChartColors\">\r\n                      </canvas>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col s12 m12 xl8\">\r\n              <div class=\"row\">\r\n                <div class=\"col-auto center titleb\">\r\n                  <b>\r\n                    Biografía\r\n                  </b>\r\n                </div>\r\n                <div class=\"col\">\r\n                  <p ALIGN=\"justify\"> Sergio Fajardo Valderrama nació en Medellín, Colombia en 1956. Es Matemático de la Universidad de los Andes, Doctor en Matemáticas de la Universidad de Wisconsin-Madison y Doctor Honoris Causa de la Universidad Internacional Menéndez Pelayo, España (2009) y de la Universidad Nacional de Córdoba, Argentina (2015). <br><br>\r\n                    Fajardo ocupó varios cargos en instituciones científicas, como el Consejo Nacional de Ciencias Básicas y la Comisión Nacional de Maestrías y Doctorados. Fue profesor en la Universidad de Andes, director de investigación y director del Departamento de Matemáticas, así como en la Universidad Nacional. Ha sido profesor visitante de instituciones como la Universidad de Berkeley, la Universidad de Wisconsin, la Universidad de Colorado, la Universidad Católica de Chile, la Universidad de Oslo y la Universidad Central de Venezuela. <br><br>\r\n                    Trabajó también en varios medios de comunicación como Caracol Radio, Telemedellín y Teleantioquia, fue subdirector del periódico El Colombiano, y columnista de los periódicos El Mundo y El Espectador, y de la revista Dinero. <br><br>\r\n                    En 1999 lideró la conformación del movimiento Compromiso Ciudadano, que buscaba llegar a la Alcaldía de Medellín y en 2003, con la fuerza del primer movimiento cívico independiente, por fuera de los partidos tradicionales, ganó la alcaldía con la votación más alta en la historia de la ciudad hasta esa fecha. <br><br>\r\n                  </p>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                  <div class=\"col-auto center titleb\">\r\n                    <b>\r\n                      Propuestas\r\n                    </b>\r\n                  </div>\r\n                  <div class=\"col\">\r\n                    <p ALING=\"justify\"><b>Propuesta número uno:</b><br><br>\r\n                      <b>Propuesta número dos:</b> <br><br>\r\n                      <b>Propuesta número tres:</b> <br><br>\r\n                    </p>\r\n                  </div>\r\n                </div>\r\n            </div>\r\n          </div>\r\n        </mat-tab>\r\n      </mat-tab-group>\r\n    </div>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/candidates/candidates.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/candidates/candidates.component.ts ***!
  \***************************************************************/
/*! exports provided: CandidatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CandidatesComponent", function() { return CandidatesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__);



var CandidatesComponent = /** @class */ (function () {
    function CandidatesComponent(db) {
        this.db = db;
        this.candidatos = [];
        this.pieChartLabels = ['Me gusta', 'No me gusta'];
        this.pieChartDataUribe = [];
        this.pieChartDataPetro = [];
        this.pieChartDataFajardo = [];
        this.pieChartType = 'pie';
        this.pieChartColors = [
            {
                backgroundColor: ['rgba(101, 195, 116, 1)', 'rgba(195, 60, 60, 1)'],
            },
        ];
    }
    CandidatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = this.db.collection('/candidatos').valueChanges();
        this.items.subscribe(function (data) {
            if (data) {
                _this.candidatos = data;
            }
            _this.pieChartDataUribe = [_this.candidatos[1].likes, _this.candidatos[1].dislikes];
            _this.pieChartDataPetro = [_this.candidatos[2].likes, _this.candidatos[2].dislikes];
            _this.pieChartDataFajardo = [_this.candidatos[0].likes, _this.candidatos[0].dislikes];
        });
    };
    CandidatesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-candidates',
            template: __webpack_require__(/*! ./candidates.component.html */ "./src/app/components/candidates/candidates.component.html"),
            styles: [__webpack_require__(/*! ./candidates.component.css */ "./src/app/components/candidates/candidates.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], CandidatesComponent);
    return CandidatesComponent;
}());



/***/ }),

/***/ "./src/app/components/email/email.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/email/email.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* label focus color */\r\n.input-field input:focus + label {\r\ncolor:#0c56ac !important;\r\n}\r\n/* label underline focus color */\r\n.row .input-field input:focus {\r\nborder-bottom: 1.5px #0c56ac !important;\r\nbox-shadow: 0 1.5px 0 0 #0c56ac !important\r\n}\r\n#login-page {\r\n    width: 100%;\r\n    height: 1700px;\r\n    max-width: 800px;\r\n }\r\n.button{\r\n    border-radius: 30px;    \r\n}\r\n.mtop{\r\n    margin-top: 150px;\r\n}\r\n.btn-center{\r\n    text-align: center;\r\n}\r\n.mbottom{\r\n    margin-bottom: 15px;\r\n    \r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9lbWFpbC9lbWFpbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUN0QjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLGdDQUFnQztBQUNoQztBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBRUE7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLGdCQUFnQjtDQUNuQjtBQUVBO0lBQ0csbUJBQW1CO0FBQ3ZCO0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7QUFFQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUVBO0lBQ0ksbUJBQW1COztBQUV2QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZW1haWwvZW1haWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGxhYmVsIGZvY3VzIGNvbG9yICovXHJcbi5pbnB1dC1maWVsZCBpbnB1dDpmb2N1cyArIGxhYmVsIHtcclxuY29sb3I6IzBjNTZhYyAhaW1wb3J0YW50O1xyXG59XHJcbi8qIGxhYmVsIHVuZGVybGluZSBmb2N1cyBjb2xvciAqL1xyXG4ucm93IC5pbnB1dC1maWVsZCBpbnB1dDpmb2N1cyB7XHJcbmJvcmRlci1ib3R0b206IDEuNXB4ICMwYzU2YWMgIWltcG9ydGFudDtcclxuYm94LXNoYWRvdzogMCAxLjVweCAwIDAgIzBjNTZhYyAhaW1wb3J0YW50XHJcbn1cclxuXHJcbiNsb2dpbi1wYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxNzAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gfVxyXG5cclxuIC5idXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4OyAgICBcclxufVxyXG5cclxuLm10b3B7XHJcbiAgICBtYXJnaW4tdG9wOiAxNTBweDtcclxufVxyXG5cclxuLmJ0bi1jZW50ZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5tYm90dG9te1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgIFxyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/email/email.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/email/email.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n<body ng-app=\"mainModule\" ng-controller=\"mainController\">\r\n    <div id=\"login-page\" class=\"row\">\r\n      <div class=\"col s12 z-depth-5 card-panel mtop\">\r\n        <form class=\"login-form\">\r\n          <h4 class=\"btn-center  blue-text\">Recuperar Contraseña</h4>\r\n          <div class=\"row\"></div>\r\n          <div class=\"row\">\r\n            <div class=\"input-field col s8 push-s2\">\r\n              <i class=\"material-icons prefix\" style=\"color:#0c56ac\">mail_outline</i>\r\n              <input class=\"validate\" id=\"email\" type=\"email\" #userEmail required autofocus>\r\n              <label for=\"email\" data-error=\"wrong\" data-success=\"right\">Email</label>\r\n              <!-- <input type=\"text\" id=\"email\" class=\"form-control mb-2\" placeholder=\"Email\" #userEmail required autofocus> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"row btn-center\">\r\n            <button  class=\"btn button light-blue darken-2\"  (click)=\"authService.sendPasswordResetEmail(userEmail.value)\" [routerLink]=\"['/login']\">Enviar contraseña</button>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col push-s1 center\">\r\n                <a [routerLink]=\"['/login']\">Regresar</a>\r\n              </div>\r\n              \r\n          </div>\r\n        </form>\r\n        </div>\r\n        </div>\r\n</body>\r\n</html>"

/***/ }),

/***/ "./src/app/components/email/email.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/email/email.component.ts ***!
  \*****************************************************/
/*! exports provided: EmailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailComponent", function() { return EmailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");



var EmailComponent = /** @class */ (function () {
    function EmailComponent(authService) {
        this.authService = authService;
        this.email = '';
        this.msg = '';
        this.display = false;
    }
    EmailComponent.prototype.ngOnInit = function () {
    };
    EmailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-email',
            template: __webpack_require__(/*! ./email.component.html */ "./src/app/components/email/email.component.html"),
            styles: [__webpack_require__(/*! ./email.component.css */ "./src/app/components/email/email.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], EmailComponent);
    return EmailComponent;
}());



/***/ }),

/***/ "./src/app/components/footer/footer.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/footer/footer.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dinline{\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlubGluZXtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/footer/footer.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/footer/footer.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n    <footer class=\"page-footer light-blue darken-3\">\r\n      <div class=\"container\">\r\n        <div class=\"row\">\r\n          <div class=\"col l6 s12\">\r\n            <h5 class=\"center\">Candidatec</h5>\r\n            <p class=\"grey-text text-lighten-4\">Siguenos en nuestras redes sociales para que no te pierdas ni un solo detalle de las novedades que tendrá Candidatec</p>\r\n          </div>\r\n          <div class=\"col l4 s12 center\">\r\n            <h5 class=\"\">Redes Sociales</h5>\r\n            <ul>\r\n              <div class=\"row dinline\">\r\n                <div class=\"col\">\r\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\"><img src=\"/../../../assets/files/facebook.png\"></a></li>\r\n                </div>\r\n                <div class=\"col\">\r\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\"><img src=\"/../../../assets/files/twitter.png\"></a></li>\r\n                </div>\r\n                <div class=\"col\">\r\n                  <li><a class=\"grey-text text-lighten-3\" href=\"#!\"><img src=\"/../../../assets/files/instagram.png\"></a></li>\r\n                </div>\r\n              </div>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"footer-copyright\">\r\n        <div class=\"container\">\r\n        © 2019 Candidatec\r\n        <a (click)=\"ClickStart()\" class=\"grey-text text-lighten-4 right\" href=\"#!\">Volver arriba</a>\r\n        </div>\r\n      </div>\r\n    </footer>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/footer/footer.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.clickMessage = true;
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.ClickStart = function () {
        window.scroll({ behavior: 'smooth', top: 0 });
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/components/footer/footer.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sizecard{\r\n    width: 100%;\r\n    height: 950px;\r\n}\r\n\r\nimg.size1{\r\n    height: 200px;\r\n}\r\n\r\n.textblue{\r\n    color: #1565c0;\r\n}\r\n\r\n.mt{\r\n    margin-top: 70px;\r\n}\r\n\r\n.mb{\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.mr{\r\n    margin-right: 4px;\r\n}\r\n\r\n.mt0{\r\n    margin-top: 0;\r\n}\r\n\r\n.backgroundcomment{\r\n    display: flex;\r\n    background: #e4f2ff;\r\n    height: 100%;\r\n    width: 85%;\r\n    max-width: 500px;\r\n    border-radius: 30px;\r\n    align-content: flex-start;\r\n    margin-top: 15px;\r\n    text-align: left;\r\n}\r\n\r\n.mbackground{\r\n    margin-top: 15px;\r\n    margin-right: 15px;\r\n    margin-bottom: 15px;\r\n    margin-left: 15px;\r\n}\r\n\r\n.fontdate{\r\n    font-size: 10px;\r\n}\r\n\r\n.textr{\r\n    text-align: right;\r\n}\r\n\r\n.centrado{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.font{\r\n    font-style: italic;\r\n}\r\n\r\n.button{\r\n    border-radius: 30px;\r\n}\r\n\r\n.textred{\r\n    color: red;\r\n}\r\n\r\n.textgreen{\r\n    color: green;\r\n}\r\n\r\n.example-viewport {\r\n    height: 400px;\r\n    width: 100%;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n    width: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n    background-color: #9dd4ee;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n    background-color: #0c53a6;\r\n}\r\n\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLGdCQUFnQjtJQUNoQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFDQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsV0FBVztBQUNmOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUNBO0lBQ0kseUJBQXlCO0FBQzdCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaXplY2FyZHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA5NTBweDtcclxufVxyXG5cclxuaW1nLnNpemUxe1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxufVxyXG5cclxuLnRleHRibHVle1xyXG4gICAgY29sb3I6ICMxNTY1YzA7XHJcbn1cclxuXHJcbi5tdHtcclxuICAgIG1hcmdpbi10b3A6IDcwcHg7XHJcbn1cclxuXHJcbi5tYntcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLm1ye1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XHJcbn1cclxuXHJcbi5tdDB7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcblxyXG4uYmFja2dyb3VuZGNvbW1lbnR7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYmFja2dyb3VuZDogI2U0ZjJmZjtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIHdpZHRoOiA4NSU7XHJcbiAgICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuLm1iYWNrZ3JvdW5ke1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTVweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTVweDtcclxufVxyXG5cclxuLmZvbnRkYXRle1xyXG4gICAgZm9udC1zaXplOiAxMHB4O1xyXG59XHJcblxyXG4udGV4dHJ7XHJcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcclxufVxyXG5cclxuLmNlbnRyYWRve1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uZm9udHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxufVxyXG5cclxuLmJ1dHRvbntcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbn1cclxuXHJcbi50ZXh0cmVke1xyXG4gICAgY29sb3I6IHJlZDtcclxufVxyXG4udGV4dGdyZWVue1xyXG4gICAgY29sb3I6IGdyZWVuO1xyXG59XHJcblxyXG4uZXhhbXBsZS12aWV3cG9ydCB7XHJcbiAgICBoZWlnaHQ6IDQwMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gICAgd2lkdGg6IDdweDtcclxufVxyXG5cclxuOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWRkNGVlO1xyXG59XHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzBjNTNhNjtcclxufVxyXG5cclxuXHJcblxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container\">\r\n    <h5 class=\"center mt mb\">Tu actividad hasta el momento <span class=\"textblue\">{{name}}</span></h5>\r\n    <div class=\"row\">\r\n      <div class=\"col xl4 m6\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/uribe.jpg\">\r\n                <span class=\"card-title\">Alvaro Uribe Velez</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC1==true && item.puntuationStateC1LD==true\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textgreen\">te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC1==true && item.puntuationStateC1LD==false\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textred\">no te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC1==false\">\r\n                          <h5 class=\"center font\">Aun no has calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsU==false\">\r\n                      <h5 class=\"center font\"> No has comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"stateCommentsU==true\">\r\n                  <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n                    <div *cdkVirtualFor=\"let item of sortDataU\">\r\n                        <div class=\"row centrado\">\r\n                          <div class=\"col-auto backgroundcomment\">\r\n                            <div class=\"col-auto mbackground\">\r\n                              <b>{{item.comment}}</b>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"col-auto \">\r\n                            <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                          </div>\r\n                        </div>\r\n                    </div>\r\n                  </cdk-virtual-scroll-viewport>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto center\">\r\n                    <div class=\"card-action\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto\">\r\n                          <h6> <b class=\"mr\">Han comentado más usuarios</b> </h6>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-auto\">\r\n                        <mat-icon matBadge=\"{{commentUrefresh}}\" matBadgeColor=\"primary\">insert_comment</mat-icon>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col xl4 m6\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card  sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/petro.jpg\">\r\n                <span class=\"card-title\">Gustavo Petro</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC2==true && item.puntuationStateC2LD==true\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textgreen\">te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC2==true && item.puntuationStateC2LD==false\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textred\">no te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC2==false\">\r\n                          <h5 class=\"center font\">Aun no has calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsP==false\">\r\n                      <h5 class=\"center font\"> No has comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"stateCommentsP==true\">\r\n                  <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n                    <div *cdkVirtualFor=\"let item of sortDataP\">\r\n                        <div class=\"row centrado\">\r\n                          <div class=\"col-auto backgroundcomment\">\r\n                            <div class=\"col-auto mbackground\">\r\n                              <b>{{item.comment}}</b>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"col-auto \">\r\n                            <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                          </div>\r\n                        </div>\r\n                    </div>\r\n                  </cdk-virtual-scroll-viewport>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto center\">\r\n                    <div class=\"card-action\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto\">\r\n                          <h6> <b class=\"mr\">Han comentado más usuarios</b> </h6>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-auto\">\r\n                        <mat-icon matBadge=\"{{commentPrefresh}}\" matBadgeColor=\"primary\">insert_comment</mat-icon>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col xl4 m8 push-m2\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/fajardo.jpg\">\r\n                <span class=\"card-title\">Sergio Fajardo</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC3==true && item.puntuationStateC3LD==true\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textgreen\">te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC3==true && item.puntuationStateC3LD==false\">\r\n                          <h5 class=\"center\">Este candidato <span class=\"textred\">no te gusta</span></h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC3==false\">\r\n                          <h5 class=\"center font\">Aun no has calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsF==false\">\r\n                      <h5 class=\"center font\"> No has comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"stateCommentsF==true\">\r\n                  <cdk-virtual-scroll-viewport itemSize=\"50\" minBufferPx=\"200\" maxBufferPx=\"400\" class=\"example-viewport\">\r\n                    <div *cdkVirtualFor=\"let item of sortDataF\">\r\n                        <div class=\"row centrado\">\r\n                          <div class=\"col-auto backgroundcomment\">\r\n                            <div class=\"col-auto mbackground\">\r\n                              <b>{{item.comment}}</b>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"row\">\r\n                          <div class=\"col-auto \">\r\n                            <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                          </div>\r\n                        </div>\r\n                    </div>\r\n                  </cdk-virtual-scroll-viewport>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto center\">\r\n                    <div class=\"card-action\">\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto\">\r\n                          <h6> <b class=\"mr\">Han comentado más usuarios</b> </h6>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-auto\">\r\n                        <mat-icon matBadge=\"{{commentSrefresh}}\" matBadgeColor=\"primary\">insert_comment</mat-icon>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-auto center\">\r\n        <a [routerLink]=\"['/candidates']\" class=\"btn waves-effect waves-light  light-blue darken-2 button mb\"> <b>Candidatos</b></a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__);




var HomeComponent = /** @class */ (function () {
    function HomeComponent(_route, db) {
        this._route = _route;
        this.db = db;
        this.commentsA = [];
        this.usersA = [];
        this.commentsASort = [];
        this.commentsPSort = [];
        this.commentsFSort = [];
        this.commentU = 0;
        this.commentUrefresh = 0;
        this.commentP = 0;
        this.commentPrefresh = 0;
        this.commentS = 0;
        this.commentSrefresh = 0;
        this.data = JSON.parse((localStorage.getItem('user')));
        this.name = this.data.displayName;
        this.uid = this.data.uid;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commentsO = this.db.collection('/comentarios').valueChanges();
        this.users = this.db.collection('/usuarios').valueChanges();
        var s = false;
        this.commentsO.subscribe(function (data) {
            if (data) {
                _this.commentsA = data;
                _this.commentU = 0;
                _this.commentP = 0;
                _this.commentS = 0;
                _this.commentsASort = [];
                _this.commentsPSort = [];
                _this.commentsFSort = [];
                for (var _i = 0, _a = _this.commentsA; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (e.uid == _this.uid && e.candidate == 'Alvaro Uribe') {
                        _this.commentsASort.push(e);
                    }
                    if (e.uid == _this.uid && e.candidate == 'Gustavo Petro') {
                        _this.commentsPSort.push(e);
                    }
                    if (e.uid == _this.uid && e.candidate == 'Sergio Fajardo') {
                        _this.commentsFSort.push(e);
                    }
                }
                for (var _b = 0, _c = _this.commentsA; _b < _c.length; _b++) {
                    var e = _c[_b];
                    if (e.candidate == 'Alvaro Uribe' && e.nombre != _this.name) {
                        _this.commentU++;
                    }
                    if (e.candidate == 'Gustavo Petro' && e.nombre != _this.name) {
                        _this.commentP++;
                    }
                    if (e.candidate == 'Sergio Fajardo' && e.nombre != _this.name) {
                        _this.commentS++;
                    }
                }
                for (var _d = 0, _e = _this.commentsA; _d < _e.length; _d++) {
                    var e = _e[_d];
                    if (e.candidate == 'Alvaro Uribe' && e.nombre == _this.name) {
                        _this.stateCommentsU = true;
                        break;
                    }
                    else {
                        _this.stateCommentsU = false;
                    }
                }
                for (var _f = 0, _g = _this.commentsA; _f < _g.length; _f++) {
                    var i = _g[_f];
                    if (i.candidate == 'Gustavo Petro' && i.nombre == _this.name) {
                        _this.stateCommentsP = true;
                        break;
                    }
                    else {
                        _this.stateCommentsP = false;
                    }
                }
                for (var _h = 0, _j = _this.commentsA; _h < _j.length; _h++) {
                    var o = _j[_h];
                    if (o.candidate == 'Sergio Fajardo' && o.nombre == _this.name) {
                        _this.stateCommentsF = true;
                        break;
                    }
                    else {
                        _this.stateCommentsF = false;
                    }
                }
                if (s == false) {
                    localStorage.setItem("commentU", _this.commentU.toString());
                    localStorage.setItem("commentP", _this.commentP.toString());
                    localStorage.setItem("commentS", _this.commentS.toString());
                    s = true;
                }
                var comU = localStorage.getItem('commentU');
                var comP = localStorage.getItem('commentP');
                var comS = localStorage.getItem('commentS');
                var numU = Number(comU);
                var numP = Number(comP);
                var numS = Number(comS);
                if (numU <= _this.commentU) {
                    _this.commentUrefresh = _this.commentU - numU;
                }
                if (numP <= _this.commentP) {
                    _this.commentPrefresh = _this.commentP - numP;
                }
                if (numS <= _this.commentS) {
                    _this.commentSrefresh = _this.commentS - numS;
                }
            }
        });
        this.users.subscribe(function (data) {
            if (data) {
                _this.usersA = data;
            }
        });
    };
    Object.defineProperty(HomeComponent.prototype, "sortDataU", {
        get: function () {
            return this.commentsASort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "sortDataP", {
        get: function () {
            return this.commentsPSort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "sortDataF", {
        get: function () {
            return this.commentsFSort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/landing/landing.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/landing/landing.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".hdr {\r\n  padding:20px;\r\n  background-color: aqua;\r\n}\r\n\r\n.hdrScroll {\r\n  padding:20px;\r\n  background-color: greenyellow;\r\n}\r\n\r\n.cwhite{\r\n    color: white;\r\n}\r\n\r\n.icon-block {\r\n    padding: 0 15px;\r\n  }\r\n\r\n.icon-block .material-icons {\r\n    font-size: inherit;\r\n}\r\n\r\n.button{\r\n    border-radius: 30px;\r\n}\r\n\r\n.item-center{\r\n    text-align: center;\r\n}\r\n\r\n.sblue{\r\n    height: 400px;\r\n    left: 0;\r\n    right: 0;\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.swhite{\r\n    height: 490px;\r\n}\r\n\r\n.textdark{\r\n    color: black;\r\n}\r\n\r\n.mtop1{\r\n    margin-top: 30px;\r\n}\r\n\r\n.titulo1{\r\n    font-size: 100px;\r\n    font-family: Arial;\r\n    text-align: center;\r\n    margin: 0;\r\n    -webkit-animation-name: title1;\r\n            animation-name: title1;\r\n    -webkit-animation-duration: 2.5s;\r\n            animation-duration: 2.5s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n}\r\n\r\n@-webkit-keyframes title1{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes title1{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n.titulo11{\r\n    font-family: Arial;\r\n    text-align: center;\r\n    margin: 0;\r\n    -webkit-animation-name: title11;\r\n            animation-name: title11;\r\n    -webkit-animation-duration: 2.5s;\r\n            animation-duration: 2.5s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n}\r\n\r\n@-webkit-keyframes title11{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes title11{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n.titulo2{\r\n    -webkit-animation-name: title2;\r\n            animation-name: title2;\r\n    -webkit-animation-duration: 2.5s;\r\n            animation-duration: 2.5s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n}\r\n\r\n@-webkit-keyframes title2{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: translate3d(-50px,50px,0);\r\n                transform: translate3d(-50px,50px,0);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: translate3d(0,0,0);\r\n                transform: translate3d(0,0,0);\r\n    }\r\n}\r\n\r\n@keyframes title2{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: translate3d(-50px,50px,0);\r\n                transform: translate3d(-50px,50px,0);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: translate3d(0,0,0);\r\n                transform: translate3d(0,0,0);\r\n    }\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sYW5kaW5nL2xhbmRpbmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osNkJBQTZCO0FBQy9COztBQUNBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGVBQWU7RUFDakI7O0FBQ0Y7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsT0FBTztJQUNQLFFBQVE7SUFDUixhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUNBO0lBQ0ksYUFBYTtBQUNqQjs7QUFDQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBR0E7SUFDSSxnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsOEJBQXNCO1lBQXRCLHNCQUFzQjtJQUN0QixnQ0FBd0I7WUFBeEIsd0JBQXdCO0lBQ3hCLFVBQVU7SUFDVixxQ0FBNkI7WUFBN0IsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsNkJBQXFCO2dCQUFyQixxQkFBcUI7O0lBRXpCO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsMkJBQW1CO2dCQUFuQixtQkFBbUI7SUFDdkI7QUFDSjs7QUFWQTtJQUNJO1FBQ0ksVUFBVTtRQUNWLDZCQUFxQjtnQkFBckIscUJBQXFCOztJQUV6QjtJQUNBO1FBQ0ksVUFBVTtRQUNWLDJCQUFtQjtnQkFBbkIsbUJBQW1CO0lBQ3ZCO0FBQ0o7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCwrQkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLGdDQUF3QjtZQUF4Qix3QkFBd0I7SUFDeEIsVUFBVTtJQUNWLHFDQUE2QjtZQUE3Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtRQUNJLFVBQVU7UUFDViw2QkFBcUI7Z0JBQXJCLHFCQUFxQjs7SUFFekI7SUFDQTtRQUNJLFVBQVU7UUFDViwyQkFBbUI7Z0JBQW5CLG1CQUFtQjtJQUN2QjtBQUNKOztBQVZBO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsNkJBQXFCO2dCQUFyQixxQkFBcUI7O0lBRXpCO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsMkJBQW1CO2dCQUFuQixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJLDhCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIsZ0NBQXdCO1lBQXhCLHdCQUF3QjtJQUN4QixVQUFVO0lBQ1YscUNBQTZCO1lBQTdCLDZCQUE2QjtBQUNqQzs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtRQUNWLDRDQUFvQztnQkFBcEMsb0NBQW9DOztJQUV4QztJQUNBO1FBQ0ksVUFBVTtRQUNWLHFDQUE2QjtnQkFBN0IsNkJBQTZCO0lBQ2pDO0FBQ0o7O0FBVkE7SUFDSTtRQUNJLFVBQVU7UUFDViw0Q0FBb0M7Z0JBQXBDLG9DQUFvQzs7SUFFeEM7SUFDQTtRQUNJLFVBQVU7UUFDVixxQ0FBNkI7Z0JBQTdCLDZCQUE2QjtJQUNqQztBQUNKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9sYW5kaW5nL2xhbmRpbmcuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZHIge1xyXG4gIHBhZGRpbmc6MjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xyXG59XHJcblxyXG4uaGRyU2Nyb2xsIHtcclxuICBwYWRkaW5nOjIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW55ZWxsb3c7XHJcbn1cclxuLmN3aGl0ZXtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmljb24tYmxvY2sge1xyXG4gICAgcGFkZGluZzogMCAxNXB4O1xyXG4gIH1cclxuLmljb24tYmxvY2sgLm1hdGVyaWFsLWljb25zIHtcclxuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcclxufVxyXG5cclxuLmJ1dHRvbntcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbn1cclxuXHJcbi5pdGVtLWNlbnRlcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLnNibHVle1xyXG4gICAgaGVpZ2h0OiA0MDBweDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5zd2hpdGV7XHJcbiAgICBoZWlnaHQ6IDQ5MHB4O1xyXG59XHJcbi50ZXh0ZGFya3tcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLm10b3Axe1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxufVxyXG5cclxuXHJcbi50aXR1bG8xe1xyXG4gICAgZm9udC1zaXplOiAxMDBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiB0aXRsZTE7XHJcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDIuNXM7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdGl0bGUxe1xyXG4gICAgMCV7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XHJcblxyXG4gICAgfVxyXG4gICAgMTAwJXtcclxuICAgICAgICBvcGFjaXR5OiAxO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi50aXR1bG8xMXtcclxuICAgIGZvbnQtZmFtaWx5OiBBcmlhbDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGFuaW1hdGlvbi1uYW1lOiB0aXRsZTExO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjVzO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHRpdGxlMTF7XHJcbiAgICAwJXtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcclxuXHJcbiAgICB9XHJcbiAgICAxMDAle1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIH1cclxufVxyXG5cclxuLnRpdHVsbzJ7XHJcbiAgICBhbmltYXRpb24tbmFtZTogdGl0bGUyO1xyXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyLjVzO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHRpdGxlMntcclxuICAgIDAle1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtNTBweCw1MHB4LDApO1xyXG5cclxuICAgIH1cclxuICAgIDEwMCV7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsMCwwKTtcclxuICAgIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/landing/landing.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/landing/landing.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Landing</title>\r\n</head>\r\n<body>\r\n  <div class=\"container swhite\">\r\n    <br><br><br><br><br>\r\n    <h1  [ngClass]=\"{'titulo1': scrollingC}\" class=\"header center blue-text titulo1 hide-on-small-only\" style=\"font-size:7vw;\">Candidatec</h1>\r\n    <h3  [ngClass]=\"{'titulo11': scrollingC}\" class=\"header center blue-text titulo11 hide-on-med-and-up\">Candidatec</h3>\r\n    <div class=\"row center\">\r\n      <h5 class=\"header col s12 light\">Te gustaría saber <a (click)=\"ClickAbout()\"  href=\"#!\">¿qué somos?</a> </h5>\r\n    </div>\r\n    <div class=\"row center\">\r\n      <a class=\"btn-large waves-effect waves-light  light-blue darken-2 button\" *ngIf=\"!authService.isLoggedIn\" [routerLink]=\"['login']\" >Inicia Sesión</a>\r\n      <a class=\"btn-large waves-effect waves-light  light-blue darken-2 button\" *ngIf=\"authService.isLoggedIn\" [routerLink]=\"['profile']\" >Inicia Sesión</a>\r\n    </div>\r\n    <br><br>\r\n  </div>\r\n\r\n  <!--About-->\r\n\r\n  <div class=\"section light-blue darken-3 sblue\">\r\n  <div class=\"container\">\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-auto s12 item-center mtop1\">\r\n          <br>\r\n          <h4>Candidatec es un prototipo de red social que se enfoca en el contexto político </h4>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-auto item-center\">\r\n            <a (click)=\"ClickService()\" href=\"#!\" class=\"btn-large waves-effect waves-light white button textdark mtop1\"> ¿Qué ofrecemos?</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n<!-- Services -->\r\n<div class=\"section\">\r\n  <div class=\"container\">\r\n      <div [ngClass]=\"{'titulo1': !scrolling, 'titulo2': scrolling}\" class=\"section\">\r\n        <!--   Icon Section   -->\r\n        <div class=\"row\">\r\n          <div class=\"col s12 m12 l4 titulo2\">\r\n            <div class=\"icon-block\">\r\n              <h2 class=\"center light-blue-text\" ><i class=\"material-icons\">book</i></h2>\r\n              <h5 class=\"center\">Información</h5>\r\n\r\n              <p class=\"light center\">Nos tomamos muy enserio este aspecto, ya que en todo momento ofreceremos información pertinente, imparcial y veraz.</p>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col s12 m12 l4 titulo2\">\r\n            <div class=\"icon-block\">\r\n                <h2 class=\"center light-blue-text\" ><i class=\"material-icons\">group</i></h2>\r\n              <h5 class=\"center\">Interactividad</h5>\r\n\r\n              <p class=\"light center\">Con otros usuarios en tiempo real, creando un espacio de debate y diálogo..</p>\r\n            </div>\r\n          </div>\r\n          <div class=\"col s12 m12 l4 titulo2\">\r\n            <div class=\"icon-block\">\r\n              <h2 class=\"center light-blue-text\"><i class=\"material-icons\">settings</i></h2>\r\n              <h5 class=\"center\">Facilidad de uso</h5>\r\n\r\n              <p class=\"light center\">Una experiencia amigable e intuitiva en todo momento para la satisfacción del usuario.</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n      <br><br>\r\n  </div>\r\n  </div>\r\n\r\n  <script src=\"js/scroll.js\"></script>\r\n</body>\r\n</html>\r\n\r\n<app-footer></app-footer>\r\n"

/***/ }),

/***/ "./src/app/components/landing/landing.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/landing/landing.component.ts ***!
  \*********************************************************/
/*! exports provided: LandingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingComponent", function() { return LandingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");




var LandingComponent = /** @class */ (function () {
    function LandingComponent(authService) {
        this.authService = authService;
        this.scrolling = false;
        this.scrollingC = true;
    }
    LandingComponent.prototype.ngOnInit = function () {
    };
    LandingComponent.prototype.ClickAbout = function () {
        window.scroll({ behavior: 'smooth', top: 555 });
    };
    LandingComponent.prototype.ClickService = function () {
        window.scroll({ behavior: 'smooth', top: 1000 });
    };
    LandingComponent.prototype.checkScroll = function () {
        var scrollPosition = window.pageYOffset;
        console.log(scrollPosition);
        if (scrollPosition <= 270) {
            this.scrollingC = true;
        }
        if (scrollPosition > 300) {
            this.scrollingC = false;
        }
        if (scrollPosition >= 100) {
            this.scrolling = true;
        }
        if (scrollPosition < 100) {
            this.scrolling = false;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:scroll', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], LandingComponent.prototype, "checkScroll", null);
    LandingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-landing',
            template: __webpack_require__(/*! ./landing.component.html */ "./src/app/components/landing/landing.component.html"),
            styles: [__webpack_require__(/*! ./landing.component.css */ "./src/app/components/landing/landing.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], LandingComponent);
    return LandingComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* html,\r\nbody {\r\n    height: 100%;\r\n}\r\nhtml {\r\n    display: table;\r\n    margin: auto;\r\n}\r\nbody {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n    background: #4ECDC4;\r\n} */\r\n\r\n/* label focus color */\r\n\r\n.input-field input:focus + label {\r\ncolor:#0c56ac !important;\r\n}\r\n\r\n/* label underline focus color */\r\n\r\n.row .input-field input:focus {\r\nborder-bottom: 1.5px #0c56ac !important;\r\nbox-shadow: 0 1.5px 0 0 #0c56ac !important\r\n}\r\n\r\n#login-page {\r\n   width: 100%;\r\n   height: 1700px;\r\n   max-width: 800px;\r\n}\r\n\r\n.mtop{\r\n    margin-top: 150px;\r\n}\r\n\r\n.mtop2{\r\n    margin-top: 100px;\r\n}\r\n\r\n.btn-center{\r\n    text-align: center;\r\n}\r\n\r\n.button{\r\n    border-radius: 30px;\r\n}\r\n\r\n.mbottom{\r\n    margin-bottom: 30px;\r\n\r\n}\r\n\r\n.botonimagenGoogle{\r\n    background-image:url('google.png');\r\n    background-repeat:no-repeat;\r\n    height:70px;\r\n    width:70px;\r\n    background-position:center;\r\n    color: black;\r\n    border-radius: 40px;\r\n\r\n  }\r\n\r\n.botonimagenFacebook{\r\n    background-image:url('facebook.png');\r\n    background-repeat:no-repeat;\r\n    height:70px;\r\n    width:70px;\r\n    background-position:center;\r\n    color: black;\r\n    border-radius: 40px;\r\n    margin-left: 30px;\r\n\r\n  }\r\n\r\n/* .card {\r\n     position: absolute;\r\n     left: 50%;\r\n     top: 50%;\r\n     -moz-transform: translate(-50%, -50%);\r\n     -webkit-transform: translate(-50%, -50%);\r\n     -ms-transform: translate(-50%, -50%);\r\n     -o-transform: translate(-50%, -50%);\r\n     transform: translate(-50%, -50%);\r\n} */\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCxzQkFBc0I7O0FBQ3RCO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUNBLGdDQUFnQzs7QUFDaEM7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFJQTtHQUNHLFdBQVc7R0FDWCxjQUFjO0dBQ2QsZ0JBQWdCO0FBQ25COztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksbUJBQW1COztBQUV2Qjs7QUFFQTtJQUNJLGtDQUF3RDtJQUN4RCwyQkFBMkI7SUFDM0IsV0FBVztJQUNYLFVBQVU7SUFDViwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLG1CQUFtQjs7RUFFckI7O0FBRUY7SUFDSSxvQ0FBMEQ7SUFDMUQsMkJBQTJCO0lBQzNCLFdBQVc7SUFDWCxVQUFVO0lBQ1YsMEJBQTBCO0lBQzFCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsaUJBQWlCOztFQUVuQjs7QUFFRjs7Ozs7Ozs7O0dBU0ciLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBodG1sLFxyXG5ib2R5IHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5odG1sIHtcclxuICAgIGRpc3BsYXk6IHRhYmxlO1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG59XHJcbmJvZHkge1xyXG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNEVDREM0O1xyXG59ICovXHJcblxyXG4vKiBsYWJlbCBmb2N1cyBjb2xvciAqL1xyXG4uaW5wdXQtZmllbGQgaW5wdXQ6Zm9jdXMgKyBsYWJlbCB7XHJcbmNvbG9yOiMwYzU2YWMgIWltcG9ydGFudDtcclxufVxyXG4vKiBsYWJlbCB1bmRlcmxpbmUgZm9jdXMgY29sb3IgKi9cclxuLnJvdyAuaW5wdXQtZmllbGQgaW5wdXQ6Zm9jdXMge1xyXG5ib3JkZXItYm90dG9tOiAxLjVweCAjMGM1NmFjICFpbXBvcnRhbnQ7XHJcbmJveC1zaGFkb3c6IDAgMS41cHggMCAwICMwYzU2YWMgIWltcG9ydGFudFxyXG59XHJcblxyXG5cclxuXHJcbiNsb2dpbi1wYWdlIHtcclxuICAgd2lkdGg6IDEwMCU7XHJcbiAgIGhlaWdodDogMTcwMHB4O1xyXG4gICBtYXgtd2lkdGg6IDgwMHB4O1xyXG59XHJcblxyXG4ubXRvcHtcclxuICAgIG1hcmdpbi10b3A6IDE1MHB4O1xyXG59XHJcblxyXG4ubXRvcDJ7XHJcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcclxufVxyXG4uYnRuLWNlbnRlcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmJ1dHRvbntcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbn1cclxuXHJcbi5tYm90dG9te1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuXHJcbn1cclxuXHJcbi5ib3RvbmltYWdlbkdvb2dsZXtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6dXJsKFwiLi4vLi4vLi4vYXNzZXRzL2ZpbGVzL2dvb2dsZS5wbmdcIik7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XHJcbiAgICBoZWlnaHQ6NzBweDtcclxuICAgIHdpZHRoOjcwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIGJvcmRlci1yYWRpdXM6IDQwcHg7XHJcblxyXG4gIH1cclxuXHJcbi5ib3RvbmltYWdlbkZhY2Vib29re1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTp1cmwoXCIuLi8uLi8uLi9hc3NldHMvZmlsZXMvZmFjZWJvb2sucG5nXCIpO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG4gICAgaGVpZ2h0OjcwcHg7XHJcbiAgICB3aWR0aDo3MHB4O1xyXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0MHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcblxyXG4gIH1cclxuXHJcbi8qIC5jYXJkIHtcclxuICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgbGVmdDogNTAlO1xyXG4gICAgIHRvcDogNTAlO1xyXG4gICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcclxuICAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbiAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XHJcbn0gKi9cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />\r\n    <title>Document</title>\r\n  </head>\r\n  <body>\r\n    <div id=\"login-page\" class=\"row\">\r\n      <div class=\"col s12 z-depth-5 card-content mtop\">\r\n        <form class=\"login-form\">\r\n            <h4 class=\"btn-center  blue-text mtop2\">Inicio de Sesión</h4>\r\n          <div class=\"row\"></div>\r\n          <div class=\"row \">\r\n            <div class=\"input-field col s8 push-s2\">\r\n              <i class=\"material-icons prefix\" style=\"color:#0c56ac\">mail_outline</i>\r\n              <input class=\"validate\" id=\"email\" type=\"email\" #userEmail required autofocus>\r\n              <label for=\"email\" data-error=\"wrong\" data-success=\"right\">Email</label>\r\n              <!-- <input type=\"text\" id=\"email\" class=\"form-control mb-2\" placeholder=\"Email\" #userEmail required autofocus> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"input-field col s8 push-s2\">\r\n              <i class=\"material-icons prefix\" style=\"color:#0c56ac\" >lock_outline</i>\r\n              <input id=\"password\" type=\"password\" #userPassword required>\r\n              <label for=\"password\">Contraseña</label>\r\n              <!-- <input type=\"password\" class=\"form-control mb-2\" placeholder=\"Contraseña\" #userPassword required> -->\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!-- REMEMBER ME -->\r\n          <!-- <div class=\"row\">\r\n            <div class=\"input-field col s12 m12 l12  login-text\">\r\n              <input type=\"checkbox\" id=\"remember-me\" />\r\n              <label for=\"remember-me\">Remember me</label>\r\n            </div>\r\n          </div> -->\r\n          <div class=\"row btn-center\">\r\n            <div class=\"input-field col s12\">\r\n              <a class=\"btn waves-effect waves-light col-auto button light-blue darken-2\" (click)=\"authService.login(userEmail.value, userPassword.value)\">Iniciar</a>\r\n            </div>\r\n            <div class=\"input-field col s12\">\r\n              <a class=\"btn waves-effect waves-light col-auto button1 white botonimagenGoogle\" (click)=\"authService.loginWithGoogle()\"></a>\r\n              <a class=\"btn waves-effect waves-light col-auto button1 white botonimagenFacebook\" (click)=\"authService.loginWithFacebook()\"></a>\r\n            </div>\r\n\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col push-s1\">\r\n              <a [routerLink]=\"['/signup']\">Regístrate</a>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col push-s1 center\">\r\n              <a [routerLink]=\"['/email']\">¿ Olvidaste tu contraseña ?</a>\r\n            </div>\r\n          </div>\r\n          </form>\r\n      </div>\r\n    </div>\r\n  </body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");



var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService) {
        this.authService = authService;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/navbar/navbar.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html,\r\nbody {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n.navbar{\r\n\r\n}\r\n.brand-logo{\r\n  margin-left: 20px;\r\n}\r\n.material-icons{\r\n  color: white;\r\n}\r\n.btn-second{\r\n\r\n  border-radius: 20px;\r\n}\r\n.logout{\r\n  margin-right: 30px;\r\n  color: red;\r\n}\r\n.login{\r\n  margin-right: 30px;\r\n  color: royalblue;\r\n}\r\n.text{\r\n  margin-top: 6px;\r\n  font-size: 15px;\r\n  color: whitesmoke;\r\n}\r\n.sidenav-header {\r\n  background-size: cover;\r\n  margin-bottom: 0px;\r\n  padding: 20px 0 10px 20px;\r\n\r\n  }\r\n.item1{\r\n  text-align: left;\r\n  margin-left: 15px;\r\n  font-size: 16px;\r\n}\r\n.item{\r\n  text-align: left;\r\n  font-size: 16px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsWUFBWTtFQUNaLFdBQVc7QUFDYjtBQUNBOztBQUVBO0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUVBOztFQUVFLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtBQUNsQjtBQUdBO0VBQ0UsZUFBZTtFQUNmLGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIseUJBQXlCOztFQUV6QjtBQUVGO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixlQUFlO0FBQ2pCO0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaHRtbCxcclxuYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcbi5uYXZiYXJ7XHJcblxyXG59XHJcblxyXG4uYnJhbmQtbG9nb3tcclxuICBtYXJnaW4tbGVmdDogMjBweDtcclxufVxyXG5cclxuLm1hdGVyaWFsLWljb25ze1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmJ0bi1zZWNvbmR7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbn1cclxuXHJcbi5sb2dvdXR7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5sb2dpbntcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgY29sb3I6IHJveWFsYmx1ZTtcclxufVxyXG5cclxuXHJcbi50ZXh0e1xyXG4gIG1hcmdpbi10b3A6IDZweDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgY29sb3I6IHdoaXRlc21va2U7XHJcbn1cclxuXHJcbi5zaWRlbmF2LWhlYWRlciB7XHJcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbiAgcGFkZGluZzogMjBweCAwIDEwcHggMjBweDtcclxuXHJcbiAgfVxyXG5cclxuLml0ZW0xe1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uaXRlbXtcclxuICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n\r\n  <nav class=\"navbar\">\r\n    <div class=\"nav-wrapper  light-blue darken-4\">\r\n      <div *ngIf=\"authService.isLoggedIn\">\r\n        <a [routerLink]=\"['home']\" class=\"brand-logo center\">Candidatec</a>\r\n      </div>\r\n      <a href=\"#\" data-target=\"menu-side\" class=\"sidenav-trigger show-on-midium\" *ngIf=\"!authService.isLoggedIn\"><i class=\"material-icons\">menu</i></a>\r\n      <a href=\"#\" data-target=\"menu-side\" class=\"sidenav-trigger show-on-large\" *ngIf=\"authService.isLoggedIn\"><i class=\"material-icons\">menu</i></a>\r\n      <ul id=\"nav-mobile \" class=\"hide-on-med-and-down\" *ngIf=\"!authService.isLoggedIn\">\r\n        <li><a href=\"#\"> <b class=\"item1\">Inicio</b> </a></li>\r\n        <li><a (click)=\"ClickAbout()\" href=\"#!\"> <b class=\"item\">Qué somos</b> </a></li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n\r\n\r\n  <ul class=\"sidenav\" id=\"menu-side\">\r\n    <li class=\"sidenav-header blue\" *ngIf=\"authService.isLoggedIn\">\r\n      <div class=\"row\">\r\n        <div class=\"col s4\" >\r\n          <ngx-avatar src=\"../../../assets/files/invitado.jpeg\" *ngIf=\"data.displayName=='' && data.photoURL==null\"></ngx-avatar>\r\n          <ngx-avatar name=\"{{data.displayName}}\" *ngIf=\"data.displayName!='' && data.photoURL==null\"></ngx-avatar>\r\n          <img src=\"{{data.photoURL}}\" width=\"60px\" height=\"60px\" alt=\"\" class=\"circle responsive-img valign profile-image\" *ngIf=\"data.displayName!='' && data.photoURL!=null\">\r\n        </div>\r\n        <div class=\"col s8 text\">\r\n          <b *ngIf=\"data.displayName==''\">{{data.email}}</b>\r\n          <b>{{data.displayName}}</b>\r\n        </div>\r\n      </div>\r\n    </li>\r\n    <li><a class=\"sidenav-close\" *ngIf=\"!authService.isLoggedIn\" [routerLink]=\"['']\">Inicio</a></li>\r\n    <li><a class=\"sidenav-close\" *ngIf=\"authService.isLoggedIn\" [routerLink]=\"['home']\">Inicio</a></li>\r\n    <li><a class=\"sidenav-close\" [routerLink]=\"['candidates']\" *ngIf=\"authService.isLoggedIn\">Candidatos</a></li>\r\n    <li><a class=\"sidenav-close\" *ngIf=\"authService.isLoggedIn\" [routerLink]=\"['profile']\">Perfil</a></li>\r\n    <li><a href=\"#\" class=\"sidenav-close logout\" *ngIf=\"authService.isLoggedIn\" (click)=\"authService.logout()\"><i class=\"material-icons\">exit_to_app</i><b>Cerrar sesión</b> </a></li>\r\n    <li><a class=\"sidenav-close login\" *ngIf=\"!authService.isLoggedIn\" [routerLink]=\"['login']\"><i class=\"material-icons\">account_circle</i><b>Inicio de sesión </b></a></li>\r\n  </ul>\r\n\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__);




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, db) {
        this.authService = authService;
        this.db = db;
        this.showNameA = [];
        // this.showName = this.db.collection('/usuarios').valueChanges();
        // this.showName.subscribe(data => {
        //   if (data) {
        //     this.showNameA = data;
        //
        //   }
        //   for(let e of this.showNameA){
        //     if(e.uid==this.data.uid){
        //       this.data.displayName=e.name;
        //       localStorage.setItem('user', JSON.stringify(this.data));
        //       break;
        //     }
        //   }
        //
        // });
    }
    NavbarComponent.prototype.ngDoCheck = function () {
        this.data = JSON.parse((localStorage.getItem('user')));
    };
    NavbarComponent.prototype.ClickAbout = function () {
        window.scroll({ behavior: 'smooth', top: 555 });
    };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/components/navbar/navbar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/profile/profile.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/profile/profile.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.color {\r\n  border-bottom: 1.5px #0c56ac !important;\r\n  box-shadow: 0 1.2px 0 0 #0c56ac !important;\r\n  max-width: 600px;\r\n}\r\n\r\n.button{\r\n    border-radius: 30px;\r\n}\r\n\r\n.img-m{\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.mtop{\r\n    margin-top: 200px;\r\n}\r\n\r\n.mbo{\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.center{\r\n    text-align: center;\r\n}\r\n\r\n.textcolor{\r\n    color: #0d47a1;\r\n}\r\n\r\n.text1{\r\n    font-family: Arial;\r\n    margin: 0;\r\n    -webkit-animation-name: textone;\r\n            animation-name: textone;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n}\r\n\r\n@-webkit-keyframes textone{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes textone{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n.text2{\r\n    font-family: Arial;\r\n    margin: 0;\r\n    -webkit-animation-name: textwo;\r\n            animation-name: textwo;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n    -webkit-animation-delay: 1s;\r\n            animation-delay: 1s;\r\n}\r\n\r\n@-webkit-keyframes textwo{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes textwo{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n.text3{\r\n    font-family: Arial;\r\n    margin: 0;\r\n    -webkit-animation-name: texthree;\r\n            animation-name: texthree;\r\n    -webkit-animation-duration: 2s;\r\n            animation-duration: 2s;\r\n    opacity: 0;\r\n    -webkit-animation-fill-mode: forwards;\r\n            animation-fill-mode: forwards;\r\n    -webkit-animation-delay: 2s;\r\n            animation-delay: 2s;\r\n}\r\n\r\n@-webkit-keyframes texthree{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes texthree{\r\n    0%{\r\n        opacity: 0;\r\n        -webkit-transform: scale(0.5);\r\n                transform: scale(0.5);\r\n\r\n    }\r\n    100%{\r\n        opacity: 1;\r\n        -webkit-transform: scale(1);\r\n                transform: scale(1);\r\n    }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVDQUF1QztFQUN2QywwQ0FBMEM7RUFDMUMsZ0JBQWdCO0FBQ2xCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUNBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxrQkFBa0I7QUFDdEI7O0FBQ0E7SUFDSSxjQUFjO0FBQ2xCOztBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCwrQkFBdUI7WUFBdkIsdUJBQXVCO0lBQ3ZCLDhCQUFzQjtZQUF0QixzQkFBc0I7SUFDdEIsVUFBVTtJQUNWLHFDQUE2QjtZQUE3Qiw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSTtRQUNJLFVBQVU7UUFDViw2QkFBcUI7Z0JBQXJCLHFCQUFxQjs7SUFFekI7SUFDQTtRQUNJLFVBQVU7UUFDViwyQkFBbUI7Z0JBQW5CLG1CQUFtQjtJQUN2QjtBQUNKOztBQVZBO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsNkJBQXFCO2dCQUFyQixxQkFBcUI7O0lBRXpCO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsMkJBQW1CO2dCQUFuQixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsOEJBQXNCO1lBQXRCLHNCQUFzQjtJQUN0Qiw4QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLFVBQVU7SUFDVixxQ0FBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLDJCQUFtQjtZQUFuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSTtRQUNJLFVBQVU7UUFDViw2QkFBcUI7Z0JBQXJCLHFCQUFxQjs7SUFFekI7SUFDQTtRQUNJLFVBQVU7UUFDViwyQkFBbUI7Z0JBQW5CLG1CQUFtQjtJQUN2QjtBQUNKOztBQVZBO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsNkJBQXFCO2dCQUFyQixxQkFBcUI7O0lBRXpCO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsMkJBQW1CO2dCQUFuQixtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsZ0NBQXdCO1lBQXhCLHdCQUF3QjtJQUN4Qiw4QkFBc0I7WUFBdEIsc0JBQXNCO0lBQ3RCLFVBQVU7SUFDVixxQ0FBNkI7WUFBN0IsNkJBQTZCO0lBQzdCLDJCQUFtQjtZQUFuQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSTtRQUNJLFVBQVU7UUFDViw2QkFBcUI7Z0JBQXJCLHFCQUFxQjs7SUFFekI7SUFDQTtRQUNJLFVBQVU7UUFDViwyQkFBbUI7Z0JBQW5CLG1CQUFtQjtJQUN2QjtBQUNKOztBQVZBO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsNkJBQXFCO2dCQUFyQixxQkFBcUI7O0lBRXpCO0lBQ0E7UUFDSSxVQUFVO1FBQ1YsMkJBQW1CO2dCQUFuQixtQkFBbUI7SUFDdkI7QUFDSiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpbnB1dC5jb2xvciB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMS41cHggIzBjNTZhYyAhaW1wb3J0YW50O1xyXG4gIGJveC1zaGFkb3c6IDAgMS4ycHggMCAwICMwYzU2YWMgIWltcG9ydGFudDtcclxuICBtYXgtd2lkdGg6IDYwMHB4O1xyXG59XHJcblxyXG4uYnV0dG9ue1xyXG4gICAgYm9yZGVyLXJhZGl1czogMzBweDtcclxufVxyXG4uaW1nLW17XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5tdG9we1xyXG4gICAgbWFyZ2luLXRvcDogMjAwcHg7XHJcbn1cclxuLm1ib3tcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuLmNlbnRlcntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG4udGV4dGNvbG9ye1xyXG4gICAgY29sb3I6ICMwZDQ3YTE7XHJcbn1cclxuLnRleHQxe1xyXG4gICAgZm9udC1mYW1pbHk6IEFyaWFsO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IHRleHRvbmU7XHJcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHRleHRvbmV7XHJcbiAgICAwJXtcclxuICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC41KTtcclxuXHJcbiAgICB9XHJcbiAgICAxMDAle1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIH1cclxufVxyXG5cclxuLnRleHQye1xyXG4gICAgZm9udC1mYW1pbHk6IEFyaWFsO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgYW5pbWF0aW9uLW5hbWU6IHRleHR3bztcclxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMnM7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgICBhbmltYXRpb24tZGVsYXk6IDFzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHRleHR3b3tcclxuICAgIDAle1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xyXG5cclxuICAgIH1cclxuICAgIDEwMCV7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgfVxyXG59XHJcblxyXG4udGV4dDN7XHJcbiAgICBmb250LWZhbWlseTogQXJpYWw7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBhbmltYXRpb24tbmFtZTogdGV4dGhyZWU7XHJcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDJzO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAycztcclxufVxyXG5cclxuQGtleWZyYW1lcyB0ZXh0aHJlZXtcclxuICAgIDAle1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xyXG5cclxuICAgIH1cclxuICAgIDEwMCV7XHJcbiAgICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/profile/profile.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/profile/profile.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <div class=\"row\">\r\n    <div class=\"col-auto img-m mtop\">\r\n      <div *ngIf=\"data.photoURL!=null\">\r\n        <ngx-avatar src=\"{{data.photoURL}}\"  *ngIf=\"provider.providerId=='facebook.com'\" alt=\"Avatar\" size=\"70\"></ngx-avatar>\r\n        <ngx-avatar src=\"{{data.photoURL}}\"  *ngIf=\"provider.providerId=='google.com'\" alt=\"Avatar\" size=\"150\"></ngx-avatar>\r\n      </div>\r\n      <ngx-avatar size=\"150\" name='{{data.displayName}}'*ngIf=\"data.displayName!=null && data.photoURL==null\"></ngx-avatar>\r\n      <ngx-avatar src=\"../../../assets/files/invitado.jpeg\" class=\"circle mbo\" size=\"150\" *ngIf=\"data.displayName==''\"></ngx-avatar>\r\n    </div>\r\n    <div class=\"col s12 center\">\r\n      <h5 *ngIf=\"data.displayName==null || data.displayName==''\" class=\"text1\">Hola <span class=\"textcolor\">{{data.email}}</span></h5>\r\n      <h4>{{data.displayName}}</h4>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"data.displayName==null || data.displayName==''\">\r\n    <div class=\"row\">\r\n      <div class=\"col-auto center\">\r\n        <h2 class=\"text2 mbo\">Ingresa un nombre para identificarte</h2>\r\n        <br>\r\n        <input type=\"text\" [(ngModel)]=\"name\" placeholder=\"Escribe un nombre\" class=\"color text3\">\r\n        <br>\r\n        <a class=\"btn button light-blue darken-2 button text3\" (click)=\"nameUser()\">Aceptar</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/profile/profile.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/profile/profile.component.ts ***!
  \*********************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__);





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(firestoreService, authService, afs) {
        var _this = this;
        this.firestoreService = firestoreService;
        this.authService = authService;
        this.afs = afs;
        this.provider = {};
        this.dataUser = {
            puntuationStateC1: null,
            puntuationStateC1LD: null,
            puntuationStateC2: null,
            puntuationStateC2LD: null,
            puntuationStateC3: null,
            puntuationStateC3LD: null,
            name: '',
            uid: ''
        };
        this.showNameA = [];
        this.data = JSON.parse((localStorage.getItem('user')));
        this.provider = this.data.providerData[0];
        this.showName = this.afs.collection('/usuarios').valueChanges();
        this.showName.subscribe(function (data) {
            if (data) {
                _this.showNameA = data;
            }
            for (var _i = 0, _a = _this.showNameA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.data.uid) {
                    _this.data.displayName = e.name;
                    localStorage.setItem('user', JSON.stringify(_this.data));
                    break;
                }
            }
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.firestoreService.getNames().subscribe(function (items) {
            _this.usersName = items;
            for (var _i = 0, _a = _this.usersName; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.data.uid) {
                    _this.id = e.id;
                    _this.dataUser.puntuationStateC1 = e.puntuationStateC1;
                    _this.dataUser.puntuationStateC1LD = e.puntuationStateC1LD;
                    _this.dataUser.puntuationStateC2 = e.puntuationStateC2;
                    _this.dataUser.puntuationStateC2LD = e.puntuationStateC2LD;
                    _this.dataUser.puntuationStateC3 = e.puntuationStateC3;
                    _this.dataUser.puntuationStateC3LD = e.puntuationStateC3LD;
                    _this.dataUser.uid = e.uid;
                    break;
                }
            }
        });
    };
    ProfileComponent.prototype.nameUser = function () {
        this.dataUser.name = this.name;
        console.log(this.dataUser);
        this.firestoreService.updateUser(this.id, this.dataUser);
    };
    ProfileComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.component.html */ "./src/app/components/profile/profile.component.html"),
            styles: [__webpack_require__(/*! ./profile.component.css */ "./src/app/components/profile/profile.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_firestore_firestore_service__WEBPACK_IMPORTED_MODULE_3__["FirestoreService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/components/signup/signup.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/signup/signup.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* label focus color */\r\n.input-field input:focus + label {\r\n    color:#0c56ac !important;\r\n    }\r\n/* label underline focus color */\r\n.row .input-field input:focus {\r\nborder-bottom: 1.5px #0c56ac !important;\r\nbox-shadow: 0 1.5px 0 0 #0c56ac !important\r\n}\r\n#login-page {\r\n    width: 100%;\r\n    height: 1700px;\r\n    max-width: 800px;\r\n    }\r\n.button{\r\n    border-radius: 30px;    \r\n}\r\n.mtop{\r\n    margin-top: 150px;\r\n}\r\n.btn-center{\r\n    text-align: center;\r\n}\r\n.mbottom{\r\n    margin-bottom: 15px;\r\n    \r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0JBQXNCO0FBQ3RCO0lBQ0ksd0JBQXdCO0lBQ3hCO0FBQ0osZ0NBQWdDO0FBQ2hDO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFFQTtJQUNJLFdBQVc7SUFDWCxjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCO0FBRUE7SUFDQSxtQkFBbUI7QUFDdkI7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxtQkFBbUI7O0FBRXZCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBsYWJlbCBmb2N1cyBjb2xvciAqL1xyXG4uaW5wdXQtZmllbGQgaW5wdXQ6Zm9jdXMgKyBsYWJlbCB7XHJcbiAgICBjb2xvcjojMGM1NmFjICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbi8qIGxhYmVsIHVuZGVybGluZSBmb2N1cyBjb2xvciAqL1xyXG4ucm93IC5pbnB1dC1maWVsZCBpbnB1dDpmb2N1cyB7XHJcbmJvcmRlci1ib3R0b206IDEuNXB4ICMwYzU2YWMgIWltcG9ydGFudDtcclxuYm94LXNoYWRvdzogMCAxLjVweCAwIDAgIzBjNTZhYyAhaW1wb3J0YW50XHJcbn0gICBcclxuXHJcbiNsb2dpbi1wYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxNzAwcHg7XHJcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5idXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4OyAgICBcclxufVxyXG5cclxuLm10b3B7XHJcbiAgICBtYXJnaW4tdG9wOiAxNTBweDtcclxufVxyXG5cclxuLmJ0bi1jZW50ZXJ7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5tYm90dG9te1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcclxuICAgIFxyXG59Il19 */"

/***/ }),

/***/ "./src/app/components/signup/signup.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/signup/signup.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n<body ng-app=\"mainModule\" ng-controller=\"mainController\">\r\n    <div id=\"login-page\" class=\"row\">\r\n      <div class=\"col s12 z-depth-5 card-panel mtop\">\r\n        <form class=\"login-form\">\r\n          <h4 class=\"btn-center  blue-text\">Registro</h4>\r\n          <div class=\"row\"></div>\r\n          <div class=\"row\">\r\n            <div class=\"input-field col s8 push-s2\">\r\n              <i class=\"material-icons prefix\" style=\"color:#0c56ac\">mail_outline</i>\r\n              <input class=\"validate\" id=\"email\" type=\"email\" #userEmail required autofocus>\r\n              <label for=\"email\" data-error=\"wrong\" data-success=\"right\">Email</label>\r\n              <!-- <input type=\"text\" id=\"email\" class=\"form-control mb-2\" placeholder=\"Email\" #userEmail required autofocus> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"input-field col s8 push-s2\">\r\n              <i class=\"material-icons prefix\" style=\"color:#0c56ac\">lock_outline</i>\r\n              <input id=\"password\" type=\"password\" #userPassword required>\r\n              <label for=\"password\">Contraseña</label>\r\n              <!-- <input type=\"password\" class=\"form-control mb-2\" placeholder=\"Contraseña\" #userPassword required> -->\r\n            </div>\r\n          </div>\r\n          <div class=\"row btn-center\">\r\n            <button  class=\"btn button light-blue darken-2\"  (click)=\"authService.register(userEmail.value, userPassword.value)\">Registrarse</button>\r\n          </div>\r\n          <div class=\"row\">\r\n              <div class=\"col push-s1 center\">\r\n                <a [routerLink]=\"['/login']\">Regresar</a>\r\n              </div>\r\n              \r\n          </div>\r\n        </form>\r\n        </div>\r\n        </div>\r\n</body>\r\n</html>"

/***/ }),

/***/ "./src/app/components/signup/signup.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/signup/signup.component.ts ***!
  \*******************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");



var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/components/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/components/signup/signup.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/components/users/users.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/users/users.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sizecard{\r\n    width: 100%;\r\n    height: 950px;\r\n}\r\n\r\nimg.size1{\r\n    height: 200px;\r\n}\r\n\r\n.textblue{\r\n    color: #1565c0;\r\n}\r\n\r\n.mt{\r\n    margin-top: 70px;\r\n}\r\n\r\n.mb{\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.mr{\r\n    margin-right: 4px;\r\n}\r\n\r\n.mt0{\r\n    margin-top: 0;\r\n}\r\n\r\n.backgroundcomment{\r\n    display: flex;\r\n    background: #e4f2ff;\r\n    height: 100%;\r\n    width: 85%;\r\n    max-width: 500px;\r\n    border-radius: 30px;\r\n    align-content: flex-start;\r\n    margin-top: 15px;\r\n    text-align: left;\r\n}\r\n\r\n.mbackground{\r\n    margin-top: 15px;\r\n    margin-right: 15px;\r\n    margin-bottom: 15px;\r\n    margin-left: 15px;\r\n}\r\n\r\n.fontdate{\r\n    font-size: 10px;\r\n}\r\n\r\n.textr{\r\n    text-align: right;\r\n}\r\n\r\n.centrado{\r\n    display: flex;\r\n    justify-content: center;\r\n}\r\n\r\n.font{\r\n    font-style: italic;\r\n}\r\n\r\n.button{\r\n    border-radius: 30px;\r\n}\r\n\r\n.textred{\r\n    color: red;\r\n}\r\n\r\n.textgreen{\r\n    color: green;\r\n}\r\n\r\n.example-viewport {\r\n    height: 400px;\r\n    width: 100%;\r\n}\r\n\r\n::-webkit-scrollbar {\r\n    width: 7px;\r\n}\r\n\r\n::-webkit-scrollbar-track {\r\n    background-color: #9dd4ee;\r\n}\r\n\r\n::-webkit-scrollbar-thumb {\r\n    background-color: #0c53a6;\r\n}\r\n\r\n\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy91c2Vycy91c2Vycy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFDQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixVQUFVO0lBQ1YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUNBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0IiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3VzZXJzL3VzZXJzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2l6ZWNhcmR7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogOTUwcHg7XHJcbn1cclxuXHJcbmltZy5zaXplMXtcclxuICAgIGhlaWdodDogMjAwcHg7XHJcbn1cclxuXHJcbi50ZXh0Ymx1ZXtcclxuICAgIGNvbG9yOiAjMTU2NWMwO1xyXG59XHJcblxyXG4ubXR7XHJcbiAgICBtYXJnaW4tdG9wOiA3MHB4O1xyXG59XHJcblxyXG4ubWJ7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcbi5tcntcclxuICAgIG1hcmdpbi1yaWdodDogNHB4O1xyXG59XHJcblxyXG4ubXQwe1xyXG4gICAgbWFyZ2luLXRvcDogMDtcclxufVxyXG5cclxuLmJhY2tncm91bmRjb21tZW50e1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGJhY2tncm91bmQ6ICNlNGYyZmY7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogODUlO1xyXG4gICAgbWF4LXdpZHRoOiA1MDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxuICAgIHRleHQtYWxpZ246IGxlZnQ7XHJcbn1cclxuXHJcbi5tYmFja2dyb3VuZHtcclxuICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE1cHg7XHJcbn1cclxuXHJcbi5mb250ZGF0ZXtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxufVxyXG5cclxuLnRleHRye1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuXHJcbi5jZW50cmFkb3tcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmZvbnR7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbn1cclxuXHJcbi5idXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xyXG59XHJcblxyXG4udGV4dHJlZHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn1cclxuLnRleHRncmVlbntcclxuICAgIGNvbG9yOiBncmVlbjtcclxufVxyXG5cclxuLmV4YW1wbGUtdmlld3BvcnQge1xyXG4gICAgaGVpZ2h0OiA0MDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgIHdpZHRoOiA3cHg7XHJcbn1cclxuXHJcbjo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzlkZDRlZTtcclxufVxyXG46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwYzUzYTY7XHJcbn1cclxuXHJcblxyXG5cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/users/users.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/users/users.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n  <title>Document</title>\r\n</head>\r\n\r\n<body>\r\n  <div class=\"container\">\r\n    <h5 class=\"center mt mb\">La actividad hasta el momento de <span class=\"textblue\">{{name}}</span></h5>\r\n    <div class=\"row\">\r\n      <div class=\"col xl4 m6\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/uribe.jpg\">\r\n                <span class=\"card-title\">Alvaro Uribe Velez</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC1==true && item.puntuationStateC1LD==true\">\r\n                          <h5 class=\"center\"><span class=\"textgreen\">Le gusta </span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC1==true && item.puntuationStateC1LD==false\">\r\n                          <h5 class=\"center\"><span class=\"textred\">No le gusta</span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC1==false\">\r\n                          <h5 class=\"center font\">Aun no ha calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsU==false\">\r\n                      <h5 class=\"center font\"> No ha comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div>\r\n                  <div *ngFor=\"let item of sortDataU\">\r\n                      <div class=\"row centrado\">\r\n                        <div class=\"col-auto backgroundcomment\">\r\n                          <div class=\"col-auto mbackground\">\r\n                            <b>{{item.comment}}</b>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto \">\r\n                          <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                        </div>\r\n                      </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col xl4 m6\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card  sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/petro.jpg\">\r\n                <span class=\"card-title\">Gustavo Petro</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC2==true && item.puntuationStateC2LD==true\">\r\n                          <h5 class=\"center\"><span class=\"textgreen\">Le gusta </span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC2==true && item.puntuationStateC2LD==false\">\r\n                          <h5 class=\"center\"><span class=\"textred\">No le gusta</span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC2==false\">\r\n                          <h5 class=\"center font\">Aun no ha calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsP==false\">\r\n                      <h5 class=\"center font\"> No ha comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div>\r\n                  <div *ngFor=\"let item of sortDataP\">\r\n                      <div class=\"row centrado\">\r\n                        <div class=\"col-auto backgroundcomment\">\r\n                          <div class=\"col-auto mbackground\">\r\n                            <b>{{item.comment}}</b>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto \">\r\n                          <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                        </div>\r\n                      </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col xl4 m8 push-m2\">\r\n        <div class=\"row\">\r\n          <div class=\"col s12\">\r\n            <div class=\"card sizecard\">\r\n              <div class=\"card-image\">\r\n                <img class=\"size1\" src=\"../../../assets/files/fajardo.jpg\">\r\n                <span class=\"card-title\">Sergio Fajardo</span>\r\n              </div>\r\n              <div class=\"card-content\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <div *ngFor=\"let item of usersA\">\r\n                      <div *ngIf=\"item.uid==uid\">\r\n                        <div *ngIf=\"item.puntuationStateC3==true && item.puntuationStateC3LD==true\">\r\n                          <h5 class=\"center\"><span class=\"textgreen\">Le gusta </span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC3==true && item.puntuationStateC3LD==false\">\r\n                          <h5 class=\"center\"><span class=\"textred\">No le gusta</span> este candidato</h5>\r\n                        </div>\r\n                        <div *ngIf=\"item.puntuationStateC3==false\">\r\n                          <h5 class=\"center font\">Aun no ha calificado este candidato</h5>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                  <div class=\"col-auto\">\r\n                    <h5 class=\"center\"> <span class=\"textblue\">Comentarios</span></h5>\r\n                    <div *ngIf=\"stateCommentsF==false\">\r\n                      <h5 class=\"center font\"> No ha comentado aún este canidato!</h5>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div>\r\n                  <div *ngFor=\"let item of sortDataF\">\r\n                      <div class=\"row centrado\">\r\n                        <div class=\"col-auto backgroundcomment\">\r\n                          <div class=\"col-auto mbackground\">\r\n                            <b>{{item.comment}}</b>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-auto \">\r\n                          <p class=\"fontdate center\"> {{item.date | date:'short'}}</p>\r\n                        </div>\r\n                      </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-auto center\">\r\n        <a [routerLink]=\"['/candidates']\" class=\"btn waves-effect waves-light  light-blue darken-2 button mb\"> <b>Candidatos</b></a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</body>\r\n\r\n</html>\r\n"

/***/ }),

/***/ "./src/app/components/users/users.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/users/users.component.ts ***!
  \*****************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__);




var UsersComponent = /** @class */ (function () {
    function UsersComponent(_route, db) {
        this._route = _route;
        this.db = db;
        this.commentsA = [];
        this.usersA = [];
        this.commentsASort = [];
        this.commentsPSort = [];
        this.commentsFSort = [];
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uid = this._route.snapshot.paramMap.get('uid');
        this.name = this._route.snapshot.paramMap.get('name');
        this.commentsO = this.db.collection('/comentarios').valueChanges();
        this.users = this.db.collection('/usuarios').valueChanges();
        this.commentsO.subscribe(function (data) {
            if (data) {
                _this.commentsA = data;
            }
            for (var _i = 0, _a = _this.commentsA; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e.uid == _this.uid && e.candidate == 'Alvaro Uribe') {
                    _this.commentsASort.push(e);
                }
                if (e.uid == _this.uid && e.candidate == 'Gustavo Petro') {
                    _this.commentsPSort.push(e);
                }
                if (e.uid == _this.uid && e.candidate == 'Sergio Fajardo') {
                    _this.commentsFSort.push(e);
                }
            }
            for (var _b = 0, _c = _this.commentsA; _b < _c.length; _b++) {
                var e = _c[_b];
                if (e.candidate == 'Alvaro Uribe' && e.nombre == _this.name) {
                    _this.stateCommentsU = true;
                    break;
                }
                else {
                    _this.stateCommentsU = false;
                }
            }
            for (var _d = 0, _e = _this.commentsA; _d < _e.length; _d++) {
                var i = _e[_d];
                if (i.candidate == 'Gustavo Petro' && i.nombre == _this.name) {
                    _this.stateCommentsP = true;
                    break;
                }
                else {
                    _this.stateCommentsP = false;
                }
            }
            for (var _f = 0, _g = _this.commentsA; _f < _g.length; _f++) {
                var o = _g[_f];
                if (o.candidate == 'Sergio Fajardo' && o.nombre == _this.name) {
                    _this.stateCommentsF = true;
                    break;
                }
                else {
                    _this.stateCommentsF = false;
                }
            }
        });
        this.users.subscribe(function (data) {
            if (data) {
                _this.usersA = data;
            }
        });
    };
    Object.defineProperty(UsersComponent.prototype, "sortDataU", {
        get: function () {
            return this.commentsASort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersComponent.prototype, "sortDataP", {
        get: function () {
            return this.commentsPSort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersComponent.prototype, "sortDataF", {
        get: function () {
            return this.commentsFSort.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        enumerable: true,
        configurable: true
    });
    UsersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/components/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.css */ "./src/app/components/users/users.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], angularfire2_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/services/auth-guard.service.ts":
/*!************************************************!*\
  !*** ./src/app/services/auth-guard.service.ts ***!
  \************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");




var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (next, state) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        else {
            return this.router.parseUrl("/");
        }
    };
    AuthGuardService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.cjs.js");
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/auth/index.js");
/* harmony import */ var _firestore_firestore_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./firestore/firestore.service */ "./src/app/services/firestore/firestore.service.ts");






var AuthService = /** @class */ (function () {
    function AuthService(afAuth, router, firestoreService) {
        var _this = this;
        this.afAuth = afAuth;
        this.router = router;
        this.firestoreService = firestoreService;
        this.users = [];
        this.uid = {
            uid: '',
            name: '',
            puntuationStateC1: false,
            puntuationStateC1LD: false,
            puntuationStateC2: false,
            puntuationStateC2LD: false,
            puntuationStateC3: false,
            puntuationStateC3LD: false
        };
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.user = user;
                localStorage.setItem('user', JSON.stringify(_this.user));
            }
            else {
                localStorage.setItem('user', null);
            }
        });
    }
    AuthService.prototype.login = function (email, password) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var e_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.signInWithEmailAndPassword(email, password)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['profile']);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        alert("Error!" + e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.register = function (email, password) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var result, e_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(email, password)];
                    case 1:
                        result = _a.sent();
                        this.uid.uid = this.user.uid;
                        this.firestoreService.createUser(this.uid);
                        this.sendEmailVerification();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        alert("Error" + e_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendEmailVerification = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.auth.currentUser.sendEmailVerification()];
                    case 1:
                        _a.sent();
                        this.router.navigate(['profile']);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.sendPasswordResetEmail = function (passwordResetEmail) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var e_3;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        alert("Error" + e_3.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginWithGoogle = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.auth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"].GoogleAuthProvider())];
                    case 1:
                        _a.sent();
                        this.uid.uid = this.user.uid;
                        this.uid.name = this.user.displayName;
                        this.firestoreService.getUsers().subscribe(function (data) {
                            if (data) {
                                data.map(function (test) {
                                    _this.users.push({
                                        data: test.payload.doc.data()
                                    });
                                });
                                var exist = false;
                                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                                    var e = _a[_i];
                                    if (_this.uid.uid == e.data.uid) {
                                        exist = true;
                                        break;
                                    }
                                }
                                if (exist == false) {
                                    console.log(_this.uid);
                                    _this.firestoreService.createUser(_this.uid);
                                }
                            }
                        });
                        this.router.navigate(['profile']);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginWithFacebook = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.auth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_3__["auth"].FacebookAuthProvider())];
                    case 1:
                        _a.sent();
                        this.uid.uid = this.user.uid;
                        this.uid.name = this.user.displayName;
                        this.firestoreService.getUsers().subscribe(function (data) {
                            if (data) {
                                data.map(function (test) {
                                    _this.users.push({
                                        data: test.payload.doc.data()
                                    });
                                });
                                var exist = false;
                                for (var _i = 0, _a = _this.users; _i < _a.length; _i++) {
                                    var e = _a[_i];
                                    if (_this.uid.uid == e.data.uid) {
                                        exist = true;
                                        break;
                                    }
                                }
                                if (exist == false) {
                                    console.log(_this.uid);
                                    _this.firestoreService.createUser(_this.uid);
                                }
                            }
                        });
                        this.router.navigate(['profile']);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.auth.signOut()];
                    case 1:
                        _a.sent();
                        localStorage.removeItem('user');
                        this.router.navigate(['']);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(AuthService.prototype, "isLoggedIn", {
        get: function () {
            var user = JSON.parse(localStorage.getItem('user'));
            return user !== null;
        },
        enumerable: true,
        configurable: true
    });
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"], _firestore_firestore_service__WEBPACK_IMPORTED_MODULE_5__["FirestoreService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/firestore/firestore.service.ts":
/*!*********************************************************!*\
  !*** ./src/app/services/firestore/firestore.service.ts ***!
  \*********************************************************/
/*! exports provided: FirestoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirestoreService", function() { return FirestoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularfire2/firestore */ "./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs_add_operator_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/operator/map */ "./node_modules/rxjs-compat/_esm5/add/operator/map.js");




var FirestoreService = /** @class */ (function () {
    function FirestoreService(firestore) {
        this.firestore = firestore;
    }
    FirestoreService.prototype.getItems = function () {
        return this.items = this.firestore.collection('comentarios').snapshotChanges().map(function (changes) {
            return changes.map(function (a) {
                var data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            });
        });
    };
    FirestoreService.prototype.getNames = function () {
        return this.names = this.firestore.collection('usuarios').snapshotChanges().map(function (changes) {
            return changes.map(function (a) {
                var data = a.payload.doc.data();
                data.id = a.payload.doc.id;
                return data;
            });
        });
    };
    FirestoreService.prototype.createUser = function (data) {
        return this.firestore.collection('usuarios').add(data);
    };
    FirestoreService.prototype.createComment = function (data) {
        return this.firestore.collection('comentarios').add(data);
    };
    FirestoreService.prototype.getCandidate = function (documentId) {
        return this.firestore.collection('candidatos').doc(documentId).snapshotChanges();
    };
    FirestoreService.prototype.getCandidates = function () {
        return this.firestore.collection('candidatos').snapshotChanges();
    };
    FirestoreService.prototype.getUsers = function () {
        return this.firestore.collection('usuarios').snapshotChanges();
    };
    FirestoreService.prototype.getComments = function () {
        return this.firestore.collection('comentarios').snapshotChanges();
    };
    FirestoreService.prototype.updateCandidate = function (documentId, data) {
        return this.firestore.collection('candidatos').doc(documentId).update(data);
    };
    FirestoreService.prototype.updateUser = function (documentId, data) {
        return this.firestore.collection('usuarios').doc(documentId).update(data);
    };
    FirestoreService.prototype.deleteComment = function (documentId) {
        return this.firestore.collection('comentarios').doc(documentId).delete();
    };
    FirestoreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [angularfire2_firestore__WEBPACK_IMPORTED_MODULE_2__["AngularFirestore"]])
    ], FirestoreService);
    return FirestoreService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\javs9\Downloads\Random\Angular\Tsis\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
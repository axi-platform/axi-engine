/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssmbly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@feathersjs/commons/lib/arguments.js":
/*!***********************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/arguments.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const paramCounts = {\n  find: 1,\n  get: 2,\n  create: 2,\n  update: 3,\n  patch: 3,\n  remove: 2\n};\n\nfunction isObjectOrArray (value) {\n  return typeof value === 'object' && value !== null;\n}\n\nexports.validateArguments = function validateArguments (method, args) {\n  // Check if the last argument is a callback which are no longer supported\n  if (typeof args[args.length - 1] === 'function') {\n    throw new Error('Callbacks are no longer supported. Use Promises or async/await instead.');\n  }\n\n  const methodParamCount = paramCounts[method];\n\n  // Check the number of arguments and throw an error if too many are provided\n  if (methodParamCount && args.length > methodParamCount) {\n    throw new Error(`Too many arguments for '${method}' method`);\n  }\n\n  // `params` is always the last argument\n  const params = args[methodParamCount - 1];\n\n  // Check if `params` is an object (can be undefined though)\n  if (params !== undefined && !isObjectOrArray(params)) {\n    throw new Error(`Params for '${method}' method must be an object`);\n  }\n\n  // Validate other arguments for each method\n  switch (method) {\n    case 'create':\n      if (!isObjectOrArray(args[0])) {\n        throw new Error(`A data object must be provided to the 'create' method`);\n      }\n      break;\n    case 'get':\n    case 'remove':\n    case 'update':\n    case 'patch':\n      if (args[0] === undefined) {\n        throw new Error(`An id must be provided to the '${method}' method`);\n      }\n\n      if ((method === 'update' || method === 'patch') && !isObjectOrArray(args[1])) {\n        throw new Error(`A data object must be provided to the '${method}' method`);\n      }\n  }\n\n  return true;\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/commons/lib/arguments.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/commons.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/commons.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const utils = __webpack_require__(/*! ./utils */ \"./node_modules/@feathersjs/commons/lib/utils.js\");\nconst hooks = __webpack_require__(/*! ./hooks */ \"./node_modules/@feathersjs/commons/lib/hooks.js\");\nconst args = __webpack_require__(/*! ./arguments */ \"./node_modules/@feathersjs/commons/lib/arguments.js\");\nconst filterQuery = __webpack_require__(/*! ./filter-query */ \"./node_modules/@feathersjs/commons/lib/filter-query.js\");\n\nmodule.exports = Object.assign({}, utils, args, { hooks, filterQuery });\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/commons/lib/commons.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/filter-query.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/filter-query.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { _ } = __webpack_require__(/*! ./utils */ \"./node_modules/@feathersjs/commons/lib/utils.js\");\n\n// Officially supported query parameters ($populate is kind of special)\nconst PROPERTIES = ['$sort', '$limit', '$skip', '$select', '$populate'];\n\nfunction parse (number) {\n  if (typeof number !== 'undefined') {\n    return Math.abs(parseInt(number, 10));\n  }\n}\n\n// Returns the pagination limit and will take into account the\n// default and max pagination settings\nfunction getLimit (limit, paginate) {\n  if (paginate && paginate.default) {\n    const lower = typeof limit === 'number' ? limit : paginate.default;\n    const upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;\n\n    return Math.min(lower, upper);\n  }\n\n  return limit;\n}\n\n// Makes sure that $sort order is always converted to an actual number\nfunction convertSort (sort) {\n  if (typeof sort !== 'object' || Array.isArray(sort)) {\n    return sort;\n  }\n\n  const result = {};\n\n  Object.keys(sort).forEach(key => {\n    result[key] = typeof sort[key] === 'object'\n      ? sort[key] : parseInt(sort[key], 10);\n  });\n\n  return result;\n}\n\n// Converts Feathers special query parameters and pagination settings\n// and returns them separately a `filters` and the rest of the query\n// as `query`\nmodule.exports = function (query, paginate) {\n  let filters = {\n    $sort: convertSort(query.$sort),\n    $limit: getLimit(parse(query.$limit), paginate),\n    $skip: parse(query.$skip),\n    $select: query.$select,\n    $populate: query.$populate\n  };\n\n  return { filters, query: _.omit(query, ...PROPERTIES) };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/commons/lib/filter-query.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/hooks.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/hooks.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { each, pick } = __webpack_require__(/*! ./utils */ \"./node_modules/@feathersjs/commons/lib/utils.js\")._;\n\nfunction convertGetOrRemove (args) {\n  const [ id, params = {} ] = args;\n\n  return { id, params };\n}\n\nfunction convertUpdateOrPatch (args) {\n  const [ id, data, params = {} ] = args;\n\n  return { id, data, params };\n}\n\n// To skip further hooks\nconst SKIP = exports.SKIP = typeof Symbol !== 'undefined' ? Symbol('__feathersSkipHooks') : '__feathersSkipHooks';\n\n// Converters from service method arguments to hook object properties\nexports.converters = {\n  find (args) {\n    const [ params = {} ] = args;\n\n    return { params };\n  },\n  create (args) {\n    const [ data, params = {} ] = args;\n\n    return { data, params };\n  },\n  get: convertGetOrRemove,\n  remove: convertGetOrRemove,\n  update: convertUpdateOrPatch,\n  patch: convertUpdateOrPatch\n};\n\n// Create a hook object for a method with arguments `args`\n// `data` is additional data that will be added\nexports.createHookObject = function createHookObject (method, args, data = {}) {\n  const hook = exports.converters[method](args);\n\n  Object.defineProperty(hook, 'toJSON', {\n    value () {\n      return pick(this, 'type', 'method', 'path',\n        'params', 'id', 'data', 'result', 'error');\n    }\n  });\n\n  return Object.assign(hook, data, {\n    method,\n    // A dynamic getter that returns the path of the service\n    get path () {\n      const { app, service } = data;\n\n      if (!service || !app || !app.services) {\n        return null;\n      }\n\n      return Object.keys(app.services)\n        .find(path => app.services[path] === service);\n    }\n  });\n};\n\n// Fallback used by `makeArguments` which usually won't be used\nexports.defaultMakeArguments = function defaultMakeArguments (hook) {\n  const result = [];\n\n  if (typeof hook.id !== 'undefined') {\n    result.push(hook.id);\n  }\n\n  if (hook.data) {\n    result.push(hook.data);\n  }\n\n  result.push(hook.params || {});\n\n  return result;\n};\n\n// Turns a hook object back into a list of arguments\n// to call a service method with\nexports.makeArguments = function makeArguments (hook) {\n  switch (hook.method) {\n    case 'find':\n      return [ hook.params ];\n    case 'get':\n    case 'remove':\n      return [ hook.id, hook.params ];\n    case 'update':\n    case 'patch':\n      return [ hook.id, hook.data, hook.params ];\n    case 'create':\n      return [ hook.data, hook.params ];\n  }\n\n  return exports.defaultMakeArguments(hook);\n};\n\n// Converts different hook registration formats into the\n// same internal format\nexports.convertHookData = function convertHookData (obj) {\n  var hook = {};\n\n  if (Array.isArray(obj)) {\n    hook = { all: obj };\n  } else if (typeof obj !== 'object') {\n    hook = { all: [ obj ] };\n  } else {\n    each(obj, function (value, key) {\n      hook[key] = !Array.isArray(value) ? [ value ] : value;\n    });\n  }\n\n  return hook;\n};\n\n// Duck-checks a given object to be a hook object\n// A valid hook object has `type` and `method`\nexports.isHookObject = function isHookObject (hookObject) {\n  return typeof hookObject === 'object' &&\n    typeof hookObject.method === 'string' &&\n    typeof hookObject.type === 'string';\n};\n\n// Returns all service and application hooks combined\n// for a given method and type `appLast` sets if the hooks\n// from `app` should be added last (or first by default)\nexports.getHooks = function getHooks (app, service, type, method, appLast = false) {\n  const appHooks = app.__hooks[type][method] || [];\n  const serviceHooks = service.__hooks[type][method] || [];\n\n  if (appLast) {\n    // Run hooks in the order of service -> app -> finally\n    return serviceHooks.concat(appHooks);\n  }\n\n  return appHooks.concat(serviceHooks);\n};\n\nexports.processHooks = function processHooks (hooks, initialHookObject) {\n  let hookObject = initialHookObject;\n  let updateCurrentHook = current => {\n    // Either use the returned hook object or the current\n    // hook object from the chain if the hook returned undefined\n    if (current) {\n      if (current === SKIP) {\n        return SKIP;\n      }\n\n      if (!exports.isHookObject(current)) {\n        throw new Error(`${hookObject.type} hook for '${hookObject.method}' method returned invalid hook object`);\n      }\n\n      hookObject = current;\n    }\n\n    return hookObject;\n  };\n  // First step of the hook chain with the initial hook object\n  let promise = Promise.resolve(hookObject);\n\n  // Go through all hooks and chain them into our promise\n  hooks.forEach(fn => {\n    const hook = fn.bind(this);\n\n    if (hook.length === 2) { // function(hook, next)\n      promise = promise.then(hookObject => hookObject === SKIP ? SKIP : new Promise((resolve, reject) => {\n        hook(hookObject, (error, result) =>\n          error ? reject(error) : resolve(result)\n        );\n      }));\n    } else { // function(hook)\n      promise = promise.then(hookObject => hookObject === SKIP ? SKIP : hook(hookObject));\n    }\n\n    // Use the returned hook object or the old one\n    promise = promise.then(updateCurrentHook);\n  });\n\n  return promise\n    .then(() => hookObject)\n    .catch(error => {\n      // Add the hook information to any errors\n      error.hook = hookObject;\n      throw error;\n    });\n};\n\n// Add `.hooks` functionality to an object\nexports.enableHooks = function enableHooks (obj, methods, types) {\n  if (typeof obj.hooks === 'function') {\n    return obj;\n  }\n\n  let __hooks = {};\n\n  types.forEach(type => {\n    // Initialize properties where hook functions are stored\n    __hooks[type] = {};\n  });\n\n  // Add non-enumerable `__hooks` property to the object\n  Object.defineProperty(obj, '__hooks', {\n    value: __hooks\n  });\n\n  return Object.assign(obj, {\n    hooks (allHooks) {\n      each(allHooks, (obj, type) => {\n        if (!this.__hooks[type]) {\n          throw new Error(`'${type}' is not a valid hook type`);\n        }\n\n        const hooks = exports.convertHookData(obj);\n\n        each(hooks, (value, method) => {\n          if (method !== 'all' && methods.indexOf(method) === -1) {\n            throw new Error(`'${method}' is not a valid hook method`);\n          }\n        });\n\n        methods.forEach(method => {\n          const myHooks = this.__hooks[type][method] ||\n            (this.__hooks[type][method] = []);\n\n          if (hooks.all) {\n            myHooks.push.apply(myHooks, hooks.all);\n          }\n\n          if (hooks[method]) {\n            myHooks.push.apply(myHooks, hooks[method]);\n          }\n        });\n      });\n\n      return this;\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/commons/lib/hooks.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Removes all leading and trailing slashes from a path\nexports.stripSlashes = function stripSlashes (name) {\n  return name.replace(/^(\\/*)|(\\/*)$/g, '');\n};\n\n// A set of lodash-y utility functions that use ES6\nconst _ = exports._ = {\n  each (obj, callback) {\n    if (obj && typeof obj.forEach === 'function') {\n      obj.forEach(callback);\n    } else if (_.isObject(obj)) {\n      Object.keys(obj).forEach(key => callback(obj[key], key));\n    }\n  },\n\n  some (value, callback) {\n    return Object.keys(value)\n      .map(key => [ value[key], key ])\n      .some(([val, key]) => callback(val, key));\n  },\n\n  every (value, callback) {\n    return Object.keys(value)\n      .map(key => [ value[key], key ])\n      .every(([val, key]) => callback(val, key));\n  },\n\n  keys (obj) {\n    return Object.keys(obj);\n  },\n\n  values (obj) {\n    return _.keys(obj).map(key => obj[key]);\n  },\n\n  isMatch (obj, item) {\n    return _.keys(item).every(key => obj[key] === item[key]);\n  },\n\n  isEmpty (obj) {\n    return _.keys(obj).length === 0;\n  },\n\n  isObject (item) {\n    return (typeof item === 'object' && !Array.isArray(item) && item !== null);\n  },\n\n  extend (...args) {\n    return Object.assign(...args);\n  },\n\n  omit (obj, ...keys) {\n    const result = _.extend({}, obj);\n    keys.forEach(key => delete result[key]);\n    return result;\n  },\n\n  pick (source, ...keys) {\n    const result = {};\n    keys.forEach(key => {\n      if (source[key] !== undefined) {\n        result[key] = source[key];\n      }\n    });\n    return result;\n  },\n\n  // Recursively merge the source object into the target object\n  merge (target, source) {\n    if (_.isObject(target) && _.isObject(source)) {\n      Object.keys(source).forEach(key => {\n        if (_.isObject(source[key])) {\n          if (!target[key]) {\n            Object.assign(target, { [key]: {} });\n          }\n\n          _.merge(target[key], source[key]);\n        } else {\n          Object.assign(target, { [key]: source[key] });\n        }\n      });\n    }\n    return target;\n  }\n};\n\n// Return a function that filters a result object or array\n// and picks only the fields passed as `params.query.$select`\n// and additional `otherFields`\nexports.select = function select (params, ...otherFields) {\n  const fields = params && params.query && params.query.$select;\n\n  if (Array.isArray(fields) && otherFields.length) {\n    fields.push(...otherFields);\n  }\n\n  const convert = result => {\n    if (!Array.isArray(fields)) {\n      return result;\n    }\n\n    return _.pick(result, ...fields);\n  };\n\n  return result => {\n    if (Array.isArray(result)) {\n      return result.map(convert);\n    }\n\n    return convert(result);\n  };\n};\n\n// An in-memory sorting function according to the\n// $sort special query parameter\nexports.sorter = function sorter ($sort) {\n  return function (first, second) {\n    let comparator = 0;\n    _.each($sort, (modifier, key) => {\n      modifier = parseInt(modifier, 10);\n\n      if (first[key] < second[key]) {\n        comparator -= 1 * modifier;\n      }\n\n      if (first[key] > second[key]) {\n        comparator += 1 * modifier;\n      }\n    });\n    return comparator;\n  };\n};\n\n// Duck-checks if an object looks like a promise\nexports.isPromise = function isPromise (result) {\n  return _.isObject(result) &&\n    typeof result.then === 'function';\n};\n\nexports.makeUrl = function makeUrl (path, app = {}) {\n  const get = typeof app.get === 'function' ? app.get.bind(app) : () => {};\n  const env = get('env') || \"development\";\n  const host = get('host') || process.env.HOST_NAME || 'localhost';\n  const protocol = (env === 'development' || env === 'test' || (env === undefined)) ? 'http' : 'https';\n  const PORT = get('port') || process.env.PORT || 3030;\n  const port = (env === 'development' || env === 'test' || (env === undefined)) ? `:${PORT}` : '';\n\n  path = path || '';\n\n  return `${protocol}://${host}${port}/${exports.stripSlashes(path)}`;\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/commons/lib/utils.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/configuration/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@feathersjs/configuration/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makeDebug = __webpack_require__(/*! debug */ \"debug\");\nconst path = __webpack_require__(/*! path */ \"path\");\n\nconst debug = makeDebug('@feathersjs/configuration');\nconst config = __webpack_require__(/*! config */ \"config\");\nconst separator = path.sep;\n\nfunction init () {\n  return function () {\n    let app = this;\n\n    const convert = current => {\n      const result = Array.isArray(current) ? [] : {};\n\n      Object.keys(current).forEach(name => {\n        let value = current[name];\n\n        if (typeof value === 'object' && value !== null) {\n          value = convert(value);\n        }\n\n        if (typeof value === 'string') {\n          if (value.indexOf('\\\\') === 0) {\n            value = value.replace('\\\\', '');\n          } else {\n            if (process.env[value]) {\n              value = process.env[value];\n            } else if (value.indexOf('.') === 0 || value.indexOf('..') === 0) {\n              // Make relative paths absolute\n              value = path.resolve(\n                path.join(config.util.getEnv('NODE_CONFIG_DIR')),\n                value.replace(/\\//g, separator)\n              );\n            }\n          }\n        }\n\n        result[name] = value;\n      });\n\n      return result;\n    };\n\n    const env = config.util.getEnv('NODE_ENV');\n    const conf = convert(config);\n\n    debug(`Initializing configuration for ${env} environment`);\n\n    if (!app || app === global) {\n      return conf;\n    }\n\n    Object.keys(conf).forEach(name => {\n      let value = conf[name];\n      debug(`Setting ${name} configuration value to`, value);\n      app.set(name, value);\n    });\n  };\n}\n\nmodule.exports = init;\nmodule.exports.default = init;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/configuration/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/errors/handler.js":
/*!****************************************************!*\
  !*** ./node_modules/@feathersjs/errors/handler.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/error-handler */ \"./node_modules/@feathersjs/errors/lib/error-handler.js\");\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/errors/handler.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/error-handler.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/error-handler.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ \"path\");\nconst errors = __webpack_require__(/*! ./index */ \"./node_modules/@feathersjs/errors/lib/index.js\");\n\nconst defaults = {\n  public: path.resolve(__dirname, 'public'),\n  logger: console\n};\nconst defaultHtmlError = path.resolve(defaults.public, 'default.html');\n\nmodule.exports = function (options = {}) {\n  options = Object.assign({}, defaults, options);\n\n  if (typeof options.html === 'undefined') {\n    options.html = {\n      401: path.resolve(options.public, '401.html'),\n      404: path.resolve(options.public, '404.html'),\n      default: defaultHtmlError\n    };\n  }\n\n  if (typeof options.json === 'undefined') {\n    options.json = {};\n  }\n\n  return function (error, req, res, next) {\n    // Log the error if it didn't come from a service method call\n    if (options.logger && typeof options.logger.error === 'function' && !res.hook) {\n      options.logger.error(error);\n    }\n\n    if (error.type !== 'FeathersError') {\n      let oldError = error;\n      error = new errors.GeneralError(oldError.message, {\n        errors: oldError.errors\n      });\n\n      if (oldError.stack) {\n        error.stack = oldError.stack;\n      }\n    }\n\n    error.code = !isNaN(parseInt(error.code, 10)) ? parseInt(error.code, 10) : 500;\n    const formatter = {};\n\n    // If the developer passed a custom function for ALL html errors\n    if (typeof options.html === 'function') {\n      formatter['text/html'] = options.html;\n    } else {\n      let file = options.html[error.code];\n      if (!file) {\n        file = options.html.default || defaultHtmlError;\n      }\n      // If the developer passed a custom function for individual html errors\n      if (typeof file === 'function') {\n        formatter['text/html'] = file;\n      } else {\n        formatter['text/html'] = function () {\n          res.set('Content-Type', 'text/html');\n          res.sendFile(file);\n        };\n      }\n    }\n\n    // If the developer passed a custom function for ALL json errors\n    if (typeof options.json === 'function') {\n      formatter['application/json'] = options.json;\n    } else {\n      let handler = options.json[error.code] || options.json.default;\n      // If the developer passed a custom function for individual json errors\n      if (typeof handler === 'function') {\n        formatter['application/json'] = handler;\n      } else {\n        // Don't show stack trace if it is a 404 error\n        if (error.code === 404) {\n          error.stack = null;\n        }\n\n        formatter['application/json'] = function () {\n          let output = Object.assign({}, error.toJSON());\n\n          if (false) {}\n\n          res.set('Content-Type', 'application/json');\n          res.json(output);\n        };\n      }\n    }\n\n    res.status(error.code);\n\n    const contentType = req.headers['content-type'] || '';\n    const accepts = req.headers.accept || '';\n\n    // by default just send back json\n    if (contentType.indexOf('json') !== -1 || accepts.indexOf('json') !== -1) {\n      formatter['application/json'](error, req, res, next);\n    } else if (options.html && (contentType.indexOf('html') !== -1 || accepts.indexOf('html') !== -1)) {\n      formatter['text/html'](error, req, res, next);\n    } else {\n      // TODO (EK): Maybe just return plain text\n      formatter['application/json'](error, req, res, next);\n    }\n  };\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/errors/lib/error-handler.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/errors');\n\nfunction FeathersError (msg, name, code, className, data) {\n  msg = msg || 'Error';\n\n  let errors;\n  let message;\n  let newData;\n\n  if (msg instanceof Error) {\n    message = msg.message || 'Error';\n\n    // NOTE (EK): This is typically to handle validation errors\n    if (msg.errors) {\n      errors = msg.errors;\n    }\n  } else if (typeof msg === 'object') { // Support plain old objects\n    message = msg.message || 'Error';\n    data = msg;\n  } else { // message is just a string\n    message = msg;\n  }\n\n  if (data) {\n    // NOTE(EK): To make sure that we are not messing\n    // with immutable data, just make a copy.\n    // https://github.com/feathersjs/errors/issues/19\n    newData = JSON.parse(JSON.stringify(data));\n\n    if (newData.errors) {\n      errors = newData.errors;\n      delete newData.errors;\n    } else if (data.errors) {\n      // The errors property from data could be\n      // stripped away while cloning resulting newData not to have it\n      // For example: when cloning arrays this property\n      errors = JSON.parse(JSON.stringify(data.errors));\n    }\n  }\n\n  // NOTE (EK): Babel doesn't support this so\n  // we have to pass in the class name manually.\n  // this.name = this.constructor.name;\n  this.type = 'FeathersError';\n  this.name = name;\n  this.message = message;\n  this.code = code;\n  this.className = className;\n  this.data = newData;\n  this.errors = errors || {};\n\n  debug(`${this.name}(${this.code}): ${this.message}`);\n  debug(this.errors);\n\n  if (Error.captureStackTrace) {\n    Error.captureStackTrace(this, FeathersError);\n  } else {\n    this.stack = (new Error()).stack;\n  }\n}\n\nfunction inheritsFrom (Child, Parent) {\n  Child.prototype = Object.create(Parent.prototype);\n  Child.prototype.constructor = Child;\n}\n\ninheritsFrom(FeathersError, Error);\n\n// NOTE (EK): A little hack to get around `message` not\n// being included in the default toJSON call.\nObject.defineProperty(FeathersError.prototype, 'toJSON', {\n  value: function () {\n    return {\n      name: this.name,\n      message: this.message,\n      code: this.code,\n      className: this.className,\n      data: this.data,\n      errors: this.errors\n    };\n  }\n});\n\n// 400 - Bad Request\nfunction BadRequest (message, data) {\n  FeathersError.call(this, message, 'BadRequest', 400, 'bad-request', data);\n}\n\ninheritsFrom(BadRequest, FeathersError);\n\n// 401 - Not Authenticated\nfunction NotAuthenticated (message, data) {\n  FeathersError.call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data);\n}\n\ninheritsFrom(NotAuthenticated, FeathersError);\n\n// 402 - Payment Error\nfunction PaymentError (message, data) {\n  FeathersError.call(this, message, 'PaymentError', 402, 'payment-error', data);\n}\n\ninheritsFrom(PaymentError, FeathersError);\n\n// 403 - Forbidden\nfunction Forbidden (message, data) {\n  FeathersError.call(this, message, 'Forbidden', 403, 'forbidden', data);\n}\n\ninheritsFrom(Forbidden, FeathersError);\n\n// 404 - Not Found\nfunction NotFound (message, data) {\n  FeathersError.call(this, message, 'NotFound', 404, 'not-found', data);\n}\n\ninheritsFrom(NotFound, FeathersError);\n\n// 405 - Method Not Allowed\nfunction MethodNotAllowed (message, data) {\n  FeathersError.call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data);\n}\n\ninheritsFrom(MethodNotAllowed, FeathersError);\n\n// 406 - Not Acceptable\nfunction NotAcceptable (message, data) {\n  FeathersError.call(this, message, 'NotAcceptable', 406, 'not-acceptable', data);\n}\n\ninheritsFrom(NotAcceptable, FeathersError);\n\n// 408 - Timeout\nfunction Timeout (message, data) {\n  FeathersError.call(this, message, 'Timeout', 408, 'timeout', data);\n}\n\ninheritsFrom(Timeout, FeathersError);\n\n// 409 - Conflict\nfunction Conflict (message, data) {\n  FeathersError.call(this, message, 'Conflict', 409, 'conflict', data);\n}\n\ninheritsFrom(Conflict, FeathersError);\n\n// 411 - Length Required\nfunction LengthRequired (message, data) {\n  FeathersError.call(this, message, 'LengthRequired', 411, 'length-required', data);\n}\n\ninheritsFrom(LengthRequired, FeathersError);\n\n// 422 Unprocessable\nfunction Unprocessable (message, data) {\n  FeathersError.call(this, message, 'Unprocessable', 422, 'unprocessable', data);\n}\n\ninheritsFrom(Unprocessable, FeathersError);\n\n// 429 Too Many Requests\nfunction TooManyRequests (message, data) {\n  FeathersError.call(this, message, 'TooManyRequests', 429, 'too-many-requests', data);\n}\n\ninheritsFrom(TooManyRequests, FeathersError);\n\n// 500 - General Error\nfunction GeneralError (message, data) {\n  FeathersError.call(this, message, 'GeneralError', 500, 'general-error', data);\n}\n\ninheritsFrom(GeneralError, FeathersError);\n\n// 501 - Not Implemented\nfunction NotImplemented (message, data) {\n  FeathersError.call(this, message, 'NotImplemented', 501, 'not-implemented', data);\n}\n\ninheritsFrom(NotImplemented, FeathersError);\n\n// 502 - Bad Gateway\nfunction BadGateway (message, data) {\n  FeathersError.call(this, message, 'BadGateway', 502, 'bad-gateway', data);\n}\n\ninheritsFrom(BadGateway, FeathersError);\n\n// 503 - Unavailable\nfunction Unavailable (message, data) {\n  FeathersError.call(this, message, 'Unavailable', 503, 'unavailable', data);\n}\n\ninheritsFrom(Unavailable, FeathersError);\n\nconst errors = {\n  FeathersError,\n  BadRequest,\n  NotAuthenticated,\n  PaymentError,\n  Forbidden,\n  NotFound,\n  MethodNotAllowed,\n  NotAcceptable,\n  Timeout,\n  Conflict,\n  LengthRequired,\n  Unprocessable,\n  TooManyRequests,\n  GeneralError,\n  NotImplemented,\n  BadGateway,\n  Unavailable,\n  400: BadRequest,\n  401: NotAuthenticated,\n  402: PaymentError,\n  403: Forbidden,\n  404: NotFound,\n  405: MethodNotAllowed,\n  406: NotAcceptable,\n  408: Timeout,\n  409: Conflict,\n  411: LengthRequired,\n  422: Unprocessable,\n  429: TooManyRequests,\n  500: GeneralError,\n  501: NotImplemented,\n  502: BadGateway,\n  503: Unavailable\n};\n\nfunction convert (error) {\n  if (!error) {\n    return error;\n  }\n\n  const FeathersError = errors[error.name];\n  const result = FeathersError\n    ? new FeathersError(error.message, error.data)\n    : new Error(error.message || error);\n\n  if (typeof error === 'object') {\n    Object.assign(result, error);\n  }\n\n  return result;\n}\n\nmodule.exports = Object.assign({ convert }, errors);\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/errors/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/not-found-handler.js":
/*!******************************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/not-found-handler.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const errors = __webpack_require__(/*! ./index */ \"./node_modules/@feathersjs/errors/lib/index.js\");\n\nmodule.exports = function ({ verbose = false } = {}) {\n  return function (req, res, next) {\n    const { url } = req;\n    const message = `Page not found${verbose ? ': ' + url : ''}`;\n    next(new errors.NotFound(message, { url }));\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/errors/lib/not-found-handler.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/errors/not-found.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/not-found.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/not-found-handler */ \"./node_modules/@feathersjs/errors/lib/not-found-handler.js\");\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/errors/not-found.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst Proto = __webpack_require__(/*! uberproto */ \"uberproto\");\nconst errorHandler = __webpack_require__(/*! @feathersjs/errors/handler */ \"./node_modules/@feathersjs/errors/handler.js\");\nconst notFound = __webpack_require__(/*! @feathersjs/errors/not-found */ \"./node_modules/@feathersjs/errors/not-found.js\");\nconst debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/express');\n\nconst rest = __webpack_require__(/*! ./rest */ \"./node_modules/@feathersjs/express/lib/rest/index.js\");\n\nfunction feathersExpress (feathersApp) {\n  if (!feathersApp) {\n    return express();\n  }\n\n  if (typeof feathersApp.setup !== 'function') {\n    throw new Error('@feathersjs/express requires a valid Feathers application instance');\n  }\n\n  if (!feathersApp.version || feathersApp.version < '3.0.0') {\n    throw new Error(`@feathersjs/express requires an instance of a Feathers application version 3.x or later (got ${feathersApp.version || 'unknown'})`);\n  }\n\n  const expressApp = express();\n  // An Uberproto mixin that provides the extended functionality\n  const mixin = {\n    use (location) {\n      let service;\n      let middleware = Array.from(arguments)\n        .slice(1)\n        .reduce(function (middleware, arg) {\n          if (typeof arg === 'function') {\n            middleware[service ? 'after' : 'before'].push(arg);\n          } else if (!service) {\n            service = arg;\n          } else {\n            throw new Error('Invalid options passed to app.use');\n          }\n          return middleware;\n        }, {\n          before: [],\n          after: []\n        });\n\n      const hasMethod = methods => methods.some(name =>\n        (service && typeof service[name] === 'function')\n      );\n\n      // Check for service (any object with at least one service method)\n      if (hasMethod(['handle', 'set']) || !hasMethod(this.methods.concat('setup'))) {\n        debug('Passing app.use call to Express app');\n        return this._super.apply(this, arguments);\n      }\n\n      debug('Registering service with middleware', middleware);\n      // Since this is a serivce, call Feathers `.use`\n      feathersApp.use.call(this, location, service, { middleware });\n\n      return this;\n    },\n\n    listen () {\n      const server = this._super.apply(this, arguments);\n\n      this.setup(server);\n      debug('Feathers application listening');\n\n      return server;\n    }\n  };\n\n  // Copy all non-existing properties (including non-enumerables)\n  // that don't already exist on the Express app\n  Object.getOwnPropertyNames(feathersApp).forEach(prop => {\n    const feathersProp = Object.getOwnPropertyDescriptor(feathersApp, prop);\n    const expressProp = Object.getOwnPropertyDescriptor(expressApp, prop);\n\n    if (expressProp === undefined && feathersProp !== undefined) {\n      Object.defineProperty(expressApp, prop, feathersProp);\n    }\n  });\n\n  return Proto.mixin(mixin, expressApp);\n}\n\nmodule.exports = feathersExpress;\n\nObject.assign(module.exports, express, {\n  default: feathersExpress,\n  original: express,\n  rest,\n  notFound,\n  errorHandler\n});\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/express/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/rest/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/rest/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const makeDebug = __webpack_require__(/*! debug */ \"debug\");\nconst wrappers = __webpack_require__(/*! ./wrappers */ \"./node_modules/@feathersjs/express/lib/rest/wrappers.js\");\n\nconst debug = makeDebug('@feathersjs/express/rest');\n\nfunction formatter (req, res, next) {\n  if (res.data === undefined) {\n    return next();\n  }\n\n  res.format({\n    'application/json': function () {\n      res.json(res.data);\n    }\n  });\n}\n\nfunction rest (handler = formatter) {\n  return function () {\n    const app = this;\n\n    if (typeof app.route !== 'function') {\n      throw new Error('feathers-rest needs an Express compatible app. Feathers apps have to wrapped with feathers-express first.');\n    }\n\n    if (!app.version || app.version < '3.0.0') {\n      throw new Error(`feathers-rest requires an instance of a Feathers application version 3.x or later (got ${app.version})`);\n    }\n\n    app.rest = wrappers;\n\n    app.use(function (req, res, next) {\n      req.feathers = { provider: 'rest' };\n      next();\n    });\n\n    // Register the REST provider\n    app.providers.push(function (service, path, options) {\n      const uri = `/${path}`;\n      const baseRoute = app.route(uri);\n      const idRoute = app.route(`${uri}/:__feathersId`);\n\n      let { middleware } = options;\n      let { before, after } = middleware;\n\n      if (typeof handler === 'function') {\n        after = after.concat(handler);\n      }\n\n      debug(`Adding REST provider for service \\`${path}\\` at base route \\`${uri}\\``);\n\n      // GET / -> service.find(params)\n      baseRoute.get(...before, app.rest.find(service), ...after);\n      // POST / -> service.create(data, params)\n      baseRoute.post(...before, app.rest.create(service), ...after);\n      // PATCH / -> service.patch(null, data, params)\n      baseRoute.patch(...before, app.rest.patch(service), ...after);\n      // PUT / -> service.update(null, data, params)\n      baseRoute.put(...before, app.rest.update(service), ...after);\n      // DELETE / -> service.remove(null, params)\n      baseRoute.delete(...before, app.rest.remove(service), ...after);\n\n      // GET /:id -> service.get(id, params)\n      idRoute.get(...before, app.rest.get(service), ...after);\n      // PUT /:id -> service.update(id, data, params)\n      idRoute.put(...before, app.rest.update(service), ...after);\n      // PATCH /:id -> service.patch(id, data, params)\n      idRoute.patch(...before, app.rest.patch(service), ...after);\n      // DELETE /:id -> service.remove(id, params)\n      idRoute.delete(...before, app.rest.remove(service), ...after);\n    });\n  };\n}\n\nrest.formatter = formatter;\n\nmodule.exports = rest;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/express/lib/rest/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/rest/wrappers.js":
/*!***************************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/rest/wrappers.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const errors = __webpack_require__(/*! @feathersjs/errors */ \"./node_modules/@feathersjs/errors/lib/index.js\");\nconst { omit } = __webpack_require__(/*! @feathersjs/commons */ \"./node_modules/@feathersjs/commons/lib/commons.js\")._;\n\nconst debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/express/rest');\n\nconst statusCodes = {\n  created: 201,\n  noContent: 204,\n  methodNotAllowed: 405\n};\nconst methodMap = {\n  find: 'GET',\n  get: 'GET',\n  create: 'POST',\n  update: 'PUT',\n  patch: 'PATCH',\n  remove: 'DELETE'\n};\nconst allowedMethods = function (service) {\n  return Object.keys(methodMap)\n    .filter(method => typeof service[method] === 'function')\n    .map(method => methodMap[method])\n    // Filter out duplicates\n    .filter((value, index, list) => list.indexOf(value) === index);\n};\n\n// A function that returns the middleware for a given method and service\n// `getArgs` is a function that should return additional leading service arguments\nfunction getHandler (method, getArgs) {\n  return service => {\n    return function (req, res, next) {\n      const { query } = req;\n      const route = omit(req.params, '__feathersId');\n\n      res.setHeader('Allow', allowedMethods(service).join(','));\n\n      // Check if the method exists on the service at all. Send 405 (Method not allowed) if not\n      if (typeof service[method] !== 'function') {\n        debug(`Method '${method}' not allowed on '${req.url}'`);\n        res.status(statusCodes.methodNotAllowed);\n\n        return next(new errors.MethodNotAllowed(`Method \\`${method}\\` is not supported by this endpoint.`));\n      }\n\n      // Grab the service parameters. Use req.feathers\n      // and set the query to req.query merged with req.params\n      const params = Object.assign({\n        query, route\n      }, req.feathers);\n\n      Object.defineProperty(params, '__returnHook', {\n        value: true\n      });\n\n      // Run the getArgs callback, if available, for additional parameters\n      const args = getArgs(req, params);\n\n      debug(`REST handler calling \\`${method}\\` from \\`${req.url}\\``);\n\n      service[method](...args, true)\n        .then(hook => {\n          const data = hook.dispatch !== undefined ? hook.dispatch : hook.result;\n\n          res.data = data;\n          res.hook = hook;\n\n          if (!data) {\n            debug(`No content returned for '${req.url}'`);\n            res.status(statusCodes.noContent);\n          } else if (method === 'create') {\n            res.status(statusCodes.created);\n          }\n\n          return next();\n        })\n        .catch(hook => {\n          const { error } = hook;\n\n          debug(`Error in handler: \\`${error.message}\\``);\n          res.hook = hook;\n\n          return next(hook.error);\n        });\n    };\n  };\n}\n\n// Returns no leading parameters\nfunction reqNone (req, params) {\n  return [ params ];\n}\n\n// Returns the leading parameters for a `get` or `remove` request (the id)\nfunction reqId (req, params) {\n  return [ req.params.__feathersId || null, params ];\n}\n\n// Returns the leading parameters for an `update` or `patch` request (id, data)\nfunction reqUpdate (req, params) {\n  return [ req.params.__feathersId || null, req.body, params ];\n}\n\n// Returns the leading parameters for a `create` request (data)\nfunction reqCreate (req, params) {\n  return [ req.body, params ];\n}\n\nmodule.exports = {\n  find: getHandler('find', reqNone),\n  get: getHandler('get', reqId),\n  create: getHandler('create', reqCreate),\n  update: getHandler('update', reqUpdate),\n  patch: getHandler('patch', reqUpdate),\n  remove: getHandler('remove', reqId)\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/express/lib/rest/wrappers.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/application.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/application.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const debug = __webpack_require__(/*! debug */ \"debug\")('feathers:application');\nconst { stripSlashes } = __webpack_require__(/*! @feathersjs/commons */ \"./node_modules/@feathersjs/commons/lib/commons.js\");\n\nconst Uberproto = __webpack_require__(/*! uberproto */ \"uberproto\");\nconst events = __webpack_require__(/*! ./events */ \"./node_modules/@feathersjs/feathers/lib/events.js\");\nconst hooks = __webpack_require__(/*! ./hooks */ \"./node_modules/@feathersjs/feathers/lib/hooks.js\");\nconst version = __webpack_require__(/*! ./version */ \"./node_modules/@feathersjs/feathers/lib/version.js\");\n\nconst Proto = Uberproto.extend({\n  create: null\n});\n\nconst application = {\n  init () {\n    Object.assign(this, {\n      version,\n      methods: [\n        'find', 'get', 'create', 'update', 'patch', 'remove'\n      ],\n      mixins: [],\n      services: {},\n      providers: [],\n      _setup: false,\n      settings: {}\n    });\n\n    this.configure(hooks());\n    this.configure(events());\n  },\n\n  get (name) {\n    return this.settings[name];\n  },\n\n  set (name, value) {\n    this.settings[name] = value;\n    return this;\n  },\n\n  disable (name) {\n    this.settings[name] = false;\n    return this;\n  },\n\n  disabled (name) {\n    return !this.settings[name];\n  },\n\n  enable (name) {\n    this.settings[name] = true;\n    return this;\n  },\n\n  enabled (name) {\n    return !!this.settings[name];\n  },\n\n  configure (fn) {\n    fn.call(this, this);\n\n    return this;\n  },\n\n  service (path, service) {\n    if (typeof service !== 'undefined') {\n      throw new Error('Registering a new service with `app.service(path, service)` is no longer supported. Use `app.use(path, service)` instead.');\n    }\n\n    const location = stripSlashes(path);\n    const current = this.services[location];\n\n    if (typeof current === 'undefined' && typeof this.defaultService === 'function') {\n      return this.use(`/${location}`, this.defaultService(location))\n        .service(location);\n    }\n\n    return current;\n  },\n\n  use (path, service, options = {}) {\n    if (typeof path !== 'string' || stripSlashes(path) === '') {\n      throw new Error(`'${path}' is not a valid service path.`);\n    }\n\n    const location = stripSlashes(path);\n    const isSubApp = typeof service.service === 'function' && service.services;\n    const isService = this.methods.concat('setup').some(name =>\n      (service && typeof service[name] === 'function')\n    );\n\n    if (isSubApp) {\n      const subApp = service;\n\n      Object.keys(subApp.services).forEach(subPath =>\n        this.use(`${location}/${subPath}`, subApp.service(subPath))\n      );\n\n      return this;\n    }\n\n    if (!isService) {\n      throw new Error(`Invalid service object passed for path \\`${location}\\``);\n    }\n\n    // If the service is already Uberproto'd use it directly\n    const protoService = Proto.isPrototypeOf(service) ? service : Proto.extend(service);\n\n    debug(`Registering new service at \\`${location}\\``);\n\n    // Add all the mixins\n    this.mixins.forEach(fn => fn.call(this, protoService, location, options));\n\n    if (typeof protoService._setup === 'function') {\n      protoService._setup(this, location);\n    }\n\n    // Run the provider functions to register the service\n    this.providers.forEach(provider =>\n      provider.call(this, protoService, location, options)\n    );\n\n    // If we ran setup already, set this service up explicitly\n    if (this._isSetup && typeof protoService.setup === 'function') {\n      debug(`Setting up service for \\`${location}\\``);\n      protoService.setup(this, location);\n    }\n\n    this.services[location] = protoService;\n\n    return this;\n  },\n\n  setup () {\n    // Setup each service (pass the app so that they can look up other services etc.)\n    Object.keys(this.services).forEach(path => {\n      const service = this.services[path];\n\n      debug(`Setting up service for \\`${path}\\``);\n\n      if (typeof service.setup === 'function') {\n        service.setup(this, path);\n      }\n    });\n\n    this._isSetup = true;\n\n    return this;\n  }\n};\n\nmodule.exports = application;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/feathers/lib/application.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/events.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/events.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { EventEmitter } = __webpack_require__(/*! events */ \"events\");\nconst Proto = __webpack_require__(/*! uberproto */ \"uberproto\");\n\n// Returns a hook that emits service events. Should always be\n// used as the very last hook in the chain\nconst eventHook = exports.eventHook = function eventHook () {\n  return function (hook) {\n    const { app, service } = hook;\n    const eventName = app.eventMappings[hook.method];\n    const isHookEvent = service._hookEvents && service._hookEvents.indexOf(eventName) !== -1;\n\n    // If this event is not being sent yet and we are not in an error hook\n    if (eventName && isHookEvent && hook.type !== 'error') {\n      const results = Array.isArray(hook.result) ? hook.result : [ hook.result ];\n\n      results.forEach(element => service.emit(eventName, element, hook));\n    }\n  };\n};\n\n// Mixin that turns a service into a Node event emitter\nconst eventMixin = exports.eventMixin = function eventMixin (service) {\n  if (service._serviceEvents) {\n    return;\n  }\n\n  const app = this;\n  // Indicates if the service is already an event emitter\n  const isEmitter = typeof service.on === 'function' &&\n    typeof service.emit === 'function';\n\n  // If not, mix it in (the service is always an Uberproto object that has a .mixin)\n  if (typeof service.mixin === 'function' && !isEmitter) {\n    service.mixin(EventEmitter.prototype);\n  }\n\n  // Define non-enumerable properties of\n  Object.defineProperties(service, {\n    // A list of all events that this service sends\n    _serviceEvents: {\n      value: Array.isArray(service.events) ? service.events.slice() : []\n    },\n\n    // A list of events that should be handled through the event hooks\n    _hookEvents: {\n      value: []\n    }\n  });\n\n  // `app.eventMappings` has the mapping from method name to event name\n  Object.keys(app.eventMappings).forEach(method => {\n    const event = app.eventMappings[method];\n    const alreadyEmits = service._serviceEvents.indexOf(event) !== -1;\n\n    // Add events for known methods to _serviceEvents and _hookEvents\n    // if the service indicated it does not send it itself yet\n    if (typeof service[method] === 'function' && !alreadyEmits) {\n      service._serviceEvents.push(event);\n      service._hookEvents.push(event);\n    }\n  });\n};\n\nmodule.exports = function () {\n  return function (app) {\n    // Mappings from service method to event name\n    Object.assign(app, {\n      eventMappings: {\n        create: 'created',\n        update: 'updated',\n        remove: 'removed',\n        patch: 'patched'\n      }\n    });\n\n    // Register the event hook\n    // `finally` hooks always run last after `error` and `after` hooks\n    app.hooks({ finally: eventHook() });\n\n    // Make the app an event emitter\n    Proto.mixin(EventEmitter.prototype, app);\n\n    app.mixins.push(eventMixin);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/feathers/lib/events.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/hooks.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/hooks.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { hooks, validateArguments, isPromise } = __webpack_require__(/*! @feathersjs/commons */ \"./node_modules/@feathersjs/commons/lib/commons.js\");\n\nconst {\n  createHookObject,\n  getHooks,\n  processHooks,\n  enableHooks,\n  makeArguments\n} = hooks;\n\n// A service mixin that adds `service.hooks()` method and functionality\nconst hookMixin = exports.hookMixin = function hookMixin (service) {\n  if (typeof service.hooks === 'function') {\n    return;\n  }\n\n  const app = this;\n  const methods = app.methods;\n  const mixin = {};\n\n  // Add .hooks method and properties to the service\n  enableHooks(service, methods, app.hookTypes);\n\n  // Assemble the mixin object that contains all \"hooked\" service methods\n  methods.forEach(method => {\n    if (typeof service[method] !== 'function') {\n      return;\n    }\n\n    mixin[method] = function () {\n      const service = this;\n      const args = Array.from(arguments);\n      // If the last argument is `true` we want to return\n      // the actual hook object instead of the result\n      const returnHook = args[args.length - 1] === true\n        ? args.pop() : false;\n\n      // A reference to the original method\n      const _super = service._super.bind(service);\n      // Create the hook object that gets passed through\n      const hookObject = createHookObject(method, args, {\n        type: 'before', // initial hook object type\n        service,\n        app\n      });\n      // A hook that validates the arguments and will always be the very first\n      const validateHook = context => {\n        validateArguments(method, args);\n\n        return context;\n      };\n      // The `before` hook chain (including the validation hook)\n      const beforeHooks = [ validateHook, ...getHooks(app, service, 'before', method) ];\n\n      // Process all before hooks\n      return processHooks.call(service, beforeHooks, hookObject)\n        // Use the hook object to call the original method\n        .then(hookObject => {\n          // If `hookObject.result` is set, skip the original method\n          if (typeof hookObject.result !== 'undefined') {\n            return hookObject;\n          }\n\n          // Otherwise, call it with arguments created from the hook object\n          const promise = _super(...makeArguments(hookObject));\n\n          if (!isPromise(promise)) {\n            throw new Error(`Service method '${hookObject.method}' for '${hookObject.path}' service must return a promise`);\n          }\n\n          return promise.then(result => {\n            hookObject.result = result;\n\n            return hookObject;\n          });\n        })\n        // Make a (shallow) copy of hookObject from `before` hooks and update type\n        .then(hookObject => Object.assign({}, hookObject, { type: 'after' }))\n        // Run through all `after` hooks\n        .then(hookObject => {\n          // Combine all app and service `after` and `finally` hooks and process\n          const afterHooks = getHooks(app, service, 'after', method, true);\n          const finallyHooks = getHooks(app, service, 'finally', method, true);\n          const hookChain = afterHooks.concat(finallyHooks);\n\n          return processHooks.call(service, hookChain, hookObject);\n        })\n        .then(hookObject =>\n          // Finally, return the result\n          // Or the hook object if the `returnHook` flag is set\n          returnHook ? hookObject : hookObject.result\n        )\n        // Handle errors\n        .catch(error => {\n          // Combine all app and service `error` and `finally` hooks and process\n          const errorHooks = getHooks(app, service, 'error', method, true);\n          const finallyHooks = getHooks(app, service, 'finally', method, true);\n          const hookChain = errorHooks.concat(finallyHooks);\n\n          // A shallow copy of the hook object\n          const errorHookObject = Object.assign({}, error.hook || hookObject, {\n            type: 'error',\n            result: null,\n            original: error.hook,\n            error\n          });\n\n          return processHooks.call(service, hookChain, errorHookObject)\n            .catch(error => {\n              errorHookObject.error = error;\n\n              return errorHookObject;\n            })\n            .then(hook => {\n              if (returnHook) {\n                // Either resolve or reject with the hook object\n                return hook.result ? hook : Promise.reject(hook);\n              }\n\n              // Otherwise return either the result if set (to swallow errors)\n              // Or reject with the hook error\n              return hook.result ? hook.result : Promise.reject(hook.error);\n            });\n        });\n    };\n  });\n\n  service.mixin(mixin);\n};\n\nmodule.exports = function () {\n  return function (app) {\n    // We store a reference of all supported hook types on the app\n    // in case someone needs it\n    Object.assign(app, {\n      hookTypes: [ 'before', 'after', 'error', 'finally' ]\n    });\n\n    // Add functionality for hooks to be registered as app.hooks\n    enableHooks(app, app.methods, app.hookTypes);\n\n    app.mixins.push(hookMixin);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/feathers/lib/hooks.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { hooks } = __webpack_require__(/*! @feathersjs/commons */ \"./node_modules/@feathersjs/commons/lib/commons.js\");\nconst Proto = __webpack_require__(/*! uberproto */ \"uberproto\");\nconst Application = __webpack_require__(/*! ./application */ \"./node_modules/@feathersjs/feathers/lib/application.js\");\nconst version = __webpack_require__(/*! ./version */ \"./node_modules/@feathersjs/feathers/lib/version.js\");\n\nfunction createApplication () {\n  const app = {};\n\n  // Mix in the base application\n  Proto.mixin(Application, app);\n\n  app.init();\n\n  return app;\n}\n\ncreateApplication.version = version;\ncreateApplication.SKIP = hooks.SKIP;\n\nmodule.exports = createApplication;\n\n// For better ES module (TypeScript) compatibility\nmodule.exports.default = createApplication;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/feathers/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/version.js":
/*!**********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/version.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = '3.1.3';\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/feathers/lib/version.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/socketio/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/socketio/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const socketio = __webpack_require__(/*! socket.io */ \"socket.io\");\nconst Proto = __webpack_require__(/*! uberproto */ \"uberproto\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst { socket: commons } = __webpack_require__(/*! @feathersjs/transport-commons */ \"./node_modules/@feathersjs/transport-commons/lib/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/socketio');\n\nconst socketKey = Symbol('@feathersjs/socketio/socket');\n\nfunction configureSocketio (port, options, config) {\n  if (typeof port !== 'number') {\n    config = options;\n    options = port;\n    port = null;\n  }\n\n  if (typeof options !== 'object') {\n    config = options;\n    options = {};\n  }\n\n  return function () {\n    const app = this;\n    const getParams = socket => socket.feathers;\n\n    if (!app.version || app.version < '3.0.0') {\n      throw new Error('@feathersjs/socketio is not compatible with this version of Feathers. Use the latest at @feathersjs/feathers.');\n    }\n\n    // Promise that resolves with the Socket.io `io` instance\n    // when `setup` has been called (with a server)\n    const done = new Promise(resolve => {\n      Proto.mixin({\n        listen (...args) {\n          if (typeof this._super === 'function') {\n            // If `listen` already exists\n            // usually the case when the app has been expressified\n            return this._super(...args);\n          }\n\n          const server = http.createServer();\n\n          this.setup(server);\n\n          return server.listen(...args);\n        },\n\n        setup (server) {\n          if (!this.io) {\n            const io = this.io = socketio\n              .listen(port || server, options);\n\n            io.use((socket, next) => {\n              const connection = {\n                provider: 'socketio'\n              };\n\n              Object.defineProperty(connection, socketKey, {\n                value: socket\n              });\n\n              socket.feathers = connection;\n\n              next();\n            });\n\n            io.use((socket, next) => {\n              socket.once('disconnect', () => {\n                const { channels } = app;\n\n                if (channels.length) {\n                  app.channel(app.channels).leave(getParams(socket));\n                }\n              });\n              next();\n            });\n\n            // In Feathers it is easy to hit the standard Node warning limit\n            // of event listeners (e.g. by registering 10 services).\n            // So we set it to a higher number. 64 should be enough for everyone.\n            io.sockets.setMaxListeners(64);\n          }\n\n          if (typeof config === 'function') {\n            debug('Calling SocketIO configuration function');\n            config.call(this, this.io);\n          }\n\n          resolve(this.io);\n\n          return this._super.apply(this, arguments);\n        }\n      }, app);\n    });\n\n    app.configure(commons({\n      done,\n      socketKey,\n      getParams,\n      emit: 'emit'\n    }));\n  };\n}\n\nmodule.exports = configureSocketio;\nmodule.exports.default = configureSocketio;\nmodule.exports.SOCKET_KEY = socketKey;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/socketio/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Channel {\n  constructor (connections = [], data = null) {\n    this.connections = connections;\n    this.data = data;\n  }\n\n  get length () {\n    return this.connections.length;\n  }\n\n  leave (...connections) {\n    connections.forEach(current => {\n      if (typeof current === 'function') {\n        return this.leave(...this.connections.filter(current));\n      }\n\n      const index = this.connections.indexOf(current);\n\n      if (index !== -1) {\n        this.connections.splice(index, 1);\n      }\n    });\n\n    return this;\n  }\n\n  join (...connections) {\n    connections.forEach(connection => {\n      if (this.connections.indexOf(connection) === -1) {\n        this.connections.push(connection);\n      }\n    });\n\n    return this;\n  }\n\n  filter (fn) {\n    return new Channel(this.connections.filter(fn), this.data);\n  }\n\n  send (data) {\n    return new Channel(this.connections, data);\n  }\n}\n\nmodule.exports = Channel;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Channel = __webpack_require__(/*! ./base */ \"./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js\");\n\nfunction collectConnections (children) {\n  const mappings = new WeakMap();\n  const connections = [];\n\n  children.forEach(channel => {\n    channel.connections.forEach(connection => {\n      if (!mappings.has(connection)) {\n        connections.push(connection);\n        mappings.set(connection, channel.data);\n      }\n    });\n  });\n\n  return { connections, mappings };\n}\n\nclass CombinedChannel extends Channel {\n  constructor (children, data = null) {\n    const { mappings, connections } = collectConnections(children);\n\n    super(connections, data);\n\n    this.children = children;\n    this.mappings = mappings;\n  }\n\n  refresh () {\n    const collected = collectConnections(this.children);\n\n    return Object.assign(this, collected);\n  }\n\n  _callChildren (method, connections) {\n    this.children.forEach(child => child[method](...connections));\n    this.refresh();\n\n    return this;\n  }\n\n  leave (...connections) {\n    return this._callChildren('leave', connections);\n  }\n\n  join (...connections) {\n    return this._callChildren('join', connections);\n  }\n\n  dataFor (connection) {\n    return this.mappings.get(connection);\n  }\n}\n\nmodule.exports = CombinedChannel;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/transport-commons/channels');\nconst { get, compact, flattenDeep, noop } = __webpack_require__(/*! lodash */ \"lodash\");\nconst CombinedChannel = __webpack_require__(/*! ./channel/combined */ \"./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js\");\nconst { channelMixin, publishMixin, keys } = __webpack_require__(/*! ./mixins */ \"./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js\");\n\nconst { CHANNELS, PUBLISHERS, ALL_EVENTS } = keys;\n\nfunction channels () {\n  return app => {\n    if (typeof app.channel === 'function' && typeof app.publish === 'function') {\n      return;\n    }\n\n    Object.assign(app, channelMixin(), publishMixin());\n    Object.defineProperty(app, 'channels', {\n      get () {\n        return Object.keys(this[CHANNELS]);\n      }\n    });\n\n    app.mixins.push(function (service, path) {\n      if (typeof service.publish === 'function' || !service._serviceEvents) {\n        return;\n      }\n\n      Object.assign(service, publishMixin());\n\n      service._serviceEvents.forEach(event => {\n        service.on(event, function (data, hook) {\n          if (!hook) {\n            // Fake hook for custom events\n            hook = { path, service, app, result: data };\n          }\n\n          debug('Publishing event', event, hook.path);\n\n          const servicePublishers = service[PUBLISHERS];\n          const appPublishers = app[PUBLISHERS];\n          // This will return the first publisher list that is not empty\n          // In the following precedence\n          const callback = [\n            // 1. Service publisher for a specific event\n            get(servicePublishers, event),\n            // 2. Service publisher for all events\n            get(servicePublishers, ALL_EVENTS),\n            // 3. App publishers for a specific event\n            get(appPublishers, event),\n            // 4. App publishers for all events\n            get(appPublishers, ALL_EVENTS)\n          ].find(current => typeof current === 'function') || noop;\n\n          Promise.resolve(callback(data, hook)).then(result => {\n            if (!result) {\n              return;\n            }\n\n            const results = Array.isArray(result) ? compact(flattenDeep(result)) : [ result ];\n            const channel = new CombinedChannel(results);\n\n            if (channel && channel.length > 0) {\n              app.emit('publish', event, channel, hook, data);\n            } else {\n              debug('No connections to publish to');\n            }\n          });\n        });\n      });\n    });\n  };\n}\n\nchannels.keys = keys;\n\nmodule.exports = channels;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/channels/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/transport-commons:channels/mixins');\nconst Channel = __webpack_require__(/*! ./channel/base */ \"./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js\");\nconst CombinedChannel = __webpack_require__(/*! ./channel/combined */ \"./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js\");\n\nconst PUBLISHERS = Symbol('@feathersjs/transport-commons/publishers');\nconst CHANNELS = Symbol('@feathersjs/transport-commons/channels');\nconst ALL_EVENTS = Symbol('@feathersjs/transport-commons/all-events');\n\nexports.keys = {\n  PUBLISHERS,\n  CHANNELS,\n  ALL_EVENTS\n};\n\nexports.channelMixin = function channelMixin () {\n  return {\n    [CHANNELS]: {},\n\n    channel (...names) {\n      debug('Returning channels', names);\n\n      if (names.length === 0) {\n        throw new Error('app.channel needs at least one channel name');\n      }\n\n      if (names.length === 1) {\n        const name = names[0];\n\n        if (Array.isArray(name)) {\n          return this.channel(...name);\n        }\n\n        return this[CHANNELS][name] ||\n          (this[CHANNELS][name] = new Channel());\n      }\n\n      const channels = names.map(name => this.channel(name));\n\n      return new CombinedChannel(channels);\n    }\n  };\n};\n\nexports.publishMixin = function publishMixin () {\n  return {\n    [PUBLISHERS]: {},\n\n    publish (event, callback) {\n      debug('Registering publisher', event);\n\n      if (!callback && typeof event === 'function') {\n        callback = event;\n        event = ALL_EVENTS;\n      }\n\n      if (this._serviceEvents && event !== ALL_EVENTS && this._serviceEvents.indexOf(event) === -1) {\n        throw new Error(`'${event}' is not a valid service event`);\n      }\n\n      const publishers = this[PUBLISHERS];\n\n      publishers[event] = callback;\n\n      return this;\n    }\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const socket = __webpack_require__(/*! ./socket */ \"./node_modules/@feathersjs/transport-commons/lib/socket/index.js\");\nconst routing = __webpack_require__(/*! ./routing */ \"./node_modules/@feathersjs/transport-commons/lib/routing.js\");\nconst channels = __webpack_require__(/*! ./channels */ \"./node_modules/@feathersjs/transport-commons/lib/channels/index.js\");\n\nmodule.exports = { socket, routing, channels };\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/routing.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/routing.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Router = __webpack_require__(/*! radix-router */ \"radix-router\");\nconst { stripSlashes } = __webpack_require__(/*! @feathersjs/commons */ \"./node_modules/@feathersjs/commons/lib/commons.js\");\nconst ROUTER = Symbol('@feathersjs/transport-commons/router');\n\nmodule.exports = function () {\n  return app => {\n    if (typeof app.lookup === 'function') {\n      return;\n    }\n\n    const router = new Router();\n\n    Object.assign(app, {\n      [ROUTER]: router,\n      lookup (path) {\n        return this[ROUTER].lookup(stripSlashes(path));\n      }\n    });\n\n    // Add a mixin that registers a service on the router\n    app.mixins.push((service, path) => {\n      app[ROUTER].insert({ path, service });\n      app[ROUTER].insert({\n        path: `${path}/:__id`,\n        service\n      });\n    });\n  };\n};\n\nmodule.exports.ROUTER = ROUTER;\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/routing.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/socket/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/socket/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/transport-commons');\n\nconst channels = __webpack_require__(/*! ../channels */ \"./node_modules/@feathersjs/transport-commons/lib/channels/index.js\");\nconst routing = __webpack_require__(/*! ../routing */ \"./node_modules/@feathersjs/transport-commons/lib/routing.js\");\n\nconst { getDispatcher, runMethod } = __webpack_require__(/*! ./utils */ \"./node_modules/@feathersjs/transport-commons/lib/socket/utils.js\");\n\nmodule.exports = function ({ done, emit, socketKey, getParams }) {\n  return app => {\n    app.configure(channels());\n    app.configure(routing());\n\n    app.on('publish', getDispatcher(emit, socketKey));\n\n    // `connection` event\n    done.then(provider => provider.on('connection', socket =>\n      app.emit('connection', getParams(socket)))\n    );\n\n    // `socket.emit('methodName', 'serviceName', ...args)` handlers\n    done.then(provider => provider.on('connection', socket => {\n      for (let method of app.methods) {\n        socket.on(method, (...args) => {\n          const path = args.shift();\n\n          debug(`Got '${method}' call for service '${path}'`);\n          runMethod(app, getParams(socket), path, method, args);\n        });\n      }\n    }));\n\n    // Legacy `socket.emit('serviceName::methodName', ...args)` handlers\n    app.mixins.push((service, path) => done.then(provider => {\n      provider.on('connection', socket => {\n        const methods = app.methods.filter(current =>\n          typeof service[current] === 'function'\n        );\n\n        for (let method of methods) {\n          const eventName = `${path}::${method}`;\n\n          socket.on(eventName, (...args) => {\n            debug(`Got legacy method call '${eventName}'`);\n            runMethod(app, getParams(socket), path, method, args);\n          });\n        }\n      });\n    }));\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/socket/index.js?");

/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/socket/utils.js":
/*!************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/socket/utils.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const errors = __webpack_require__(/*! @feathersjs/errors */ \"./node_modules/@feathersjs/errors/lib/index.js\");\nconst debug = __webpack_require__(/*! debug */ \"debug\")('@feathersjs/transport-commons');\n\nconst paramsPositions = exports.paramsPositions = {\n  find: 0,\n  get: 1,\n  remove: 1,\n  create: 1,\n  update: 2,\n  patch: 2\n};\n\nconst normalizeError = exports.normalizeError = function (e) {\n  const hasToJSON = typeof e.toJSON === 'function';\n  const result = hasToJSON ? e.toJSON() : {};\n\n  if (!hasToJSON) {\n    Object.getOwnPropertyNames(e).forEach(key => {\n      result[key] = e[key];\n    });\n  }\n\n  if (false) {}\n\n  delete result.hook;\n\n  return result;\n};\n\nexports.getDispatcher = function (emit, socketKey) {\n  return function (event, channel, hook, data) {\n    debug(`Dispatching '${event}' to ${channel.length} connections`);\n\n    channel.connections.forEach(connection => {\n      // The reference between connection and socket\n      // is set in `app.setup`\n      const socket = connection[socketKey];\n\n      if (socket) {\n        const eventName = `${hook.path || ''} ${event}`.trim();\n\n        let result = channel.dataFor(connection) || hook.dispatch || hook.result;\n\n        // If we are getting events from an array, try to get the individual\n        // item to dispatch from the correct index.\n        if (Array.isArray(hook.result) && Array.isArray(result)) {\n          result = result[hook.result.indexOf(data)];\n        }\n\n        debug(`Dispatching '${eventName}' to Socket ${socket.id} with`, result);\n\n        socket[emit](eventName, result);\n      }\n    });\n  };\n};\n\nexports.runMethod = function (app, connection, path, method, args) {\n  const trace = `method '${method}' on service '${path}'`;\n  const methodArgs = args.slice(0);\n  const callback = typeof methodArgs[methodArgs.length - 1] === 'function'\n    ? methodArgs.pop() : function () {};\n\n  debug(`Running ${trace}`, connection, args);\n\n  // A wrapper function that runs the method and returns a promise\n  const _run = () => {\n    const lookup = app.lookup(path);\n\n    // No valid service was found, return a 404\n    // just like a REST route would\n    if (lookup === null) {\n      return Promise.reject(new errors.NotFound(`Service '${path}' not found`));\n    }\n\n    const { service, params: route = {} } = lookup;\n\n    // Only service methods are allowed\n    if (paramsPositions[method] === undefined || typeof service[method] !== 'function') {\n      return Promise.reject(new errors.MethodNotAllowed(`Method '${method}' not allowed on service '${path}'`));\n    }\n\n    const position = paramsPositions[method];\n    const query = methodArgs[position] || {};\n    // `params` have to be re-mapped to the query\n    // and added with the route\n    const params = Object.assign({ query, route, connection }, connection);\n\n    methodArgs[position] = params;\n\n    return service[method](...methodArgs, true);\n  };\n\n  // Run and map to the callback that is being called for Socket calls\n  _run().then(hook => {\n    const result = hook.dispatch || hook.result;\n\n    debug(`Returned successfully ${trace}`, result);\n    callback(null, result);\n  }).catch(hook => {\n    const error = hook.type === 'error' ? hook.error : hook;\n\n    debug(`Error in ${trace}`, error);\n    callback(normalizeError(error));\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/@feathersjs/transport-commons/lib/socket/utils.js?");

/***/ }),

/***/ "./src/channels.js":
/*!*************************!*\
  !*** ./src/channels.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return channels; });\nfunction channels(app) {\n  if (typeof app.channel !== 'function') {\n    // If no real-time functionality has been configured just return\n    return\n  }\n\n  app.on('connection', connection => {\n    app.channel('anonymous').join(connection)\n  })\n\n  app.on('login', (authResult, {connection}) => {\n    if (connection) {\n      // Obtain the logged in user from the connection\n      const user = connection.user\n\n      // The connection is no longer anonymous, remove it\n      app.channel('anonymous').leave(connection)\n\n      // Add it to the authenticated user channel\n      app.channel('authenticated').join(connection)\n\n      // Channels can be named anything and joined on any condition\n\n      // E.g. to send real-time events only to admins use\n      // if(user.isAdmin) { app.channel('admins').join(connection); }\n\n      // If the user has joined e.g. chat rooms\n      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));\n\n      // Easily organize users by email and userid for things like messaging\n      // app.channel(`emails/${user.email}`).join(channel);\n      // app.channel(`userIds/$(user.id}`).join(channel);\n    }\n  })\n\n  // eslint-disable-next-line no-unused-vars\n  app.publish((data, hook) => {\n    // Here you can add event publishers to channels set up in `channels.js`\n    // To publish only for a specific event use `app.publish(eventname, () => {})`\n\n    console.log(\n      'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.',\n    ) // eslint-disable-line\n\n    // e.g. to publish all service events to all authenticated users use\n    return app.channel('authenticated')\n  })\n\n  // Here you can also add service specific event publishers\n  // e..g the publish the `users` service `created` event to the `admins` channel\n  // app.service('users').publish('created', () => app.channel('admins'));\n\n  // With the userid and email organization from above you can easily select involved users\n  // app.service('messages').publish(() => {\n  //   return [\n  //     app.channel(`userIds/${data.createdBy}`),\n  //     app.channel(`emails/${data.recipientEmail}`)\n  //   ];\n  // });\n}\n\n\n//# sourceURL=webpack:///./src/channels.js?");

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ \"./src/hooks/logger.js\");\n\n\nconst before = {\n  all: [Object(_logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()],\n}\n\nconst after = {\n  all: [Object(_logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()],\n}\n\nconst error = {\n  all: [Object(_logger__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()],\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({before, after, error});\n\n\n//# sourceURL=webpack:///./src/hooks/index.js?");

/***/ }),

/***/ "./src/hooks/logger.js":
/*!*****************************!*\
  !*** ./src/hooks/logger.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst logger = winston__WEBPACK_IMPORTED_MODULE_0___default.a.createLogger({\n  level: config__WEBPACK_IMPORTED_MODULE_1__[\"loglevel\"],\n  format: winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.json(),\n  transports: [\n    new winston__WEBPACK_IMPORTED_MODULE_0___default.a.transports.Console({\n      format: winston__WEBPACK_IMPORTED_MODULE_0___default.a.format.simple(),\n    }),\n  ],\n})\n\nconst Logger = () => async ctx => {\n  logger.debug(`${ctx.type} ${ctx.path}/${ctx.method}`)\n\n  if (typeof ctx.toJSON === 'function') {\n    logger.debug('Hook Context', JSON.stringify(ctx, null, '  '))\n  }\n\n  if (ctx.error) {\n    logger.error(ctx.error)\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Logger);\n\n\n//# sourceURL=webpack:///./src/hooks/logger.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var serve_favicon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\n/* harmony import */ var serve_favicon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serve_favicon__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! helmet */ \"helmet\");\n/* harmony import */ var helmet__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(helmet__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! winston */ \"winston\");\n/* harmony import */ var winston__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(winston__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _feathersjs_feathers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @feathersjs/feathers */ \"./node_modules/@feathersjs/feathers/lib/index.js\");\n/* harmony import */ var _feathersjs_feathers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_feathersjs_feathers__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _feathersjs_configuration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @feathersjs/configuration */ \"./node_modules/@feathersjs/configuration/lib/index.js\");\n/* harmony import */ var _feathersjs_configuration__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_feathersjs_configuration__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _feathersjs_express__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @feathersjs/express */ \"./node_modules/@feathersjs/express/lib/index.js\");\n/* harmony import */ var _feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _feathersjs_socketio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @feathersjs/socketio */ \"./node_modules/@feathersjs/socketio/lib/index.js\");\n/* harmony import */ var _feathersjs_socketio__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_feathersjs_socketio__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./middleware */ \"./src/middleware/index.js\");\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_middleware__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services */ \"./src/services/index.js\");\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hooks */ \"./src/hooks/index.js\");\n/* harmony import */ var _channels__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./channels */ \"./src/channels.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst app = _feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default()(_feathersjs_feathers__WEBPACK_IMPORTED_MODULE_6___default()())\n\napp.configure(_feathersjs_configuration__WEBPACK_IMPORTED_MODULE_7___default()())\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_3___default()())\napp.use(helmet__WEBPACK_IMPORTED_MODULE_4___default()())\napp.use(compression__WEBPACK_IMPORTED_MODULE_2___default()())\napp.use(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.json())\napp.use(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.urlencoded({extended: true}))\napp.use(serve_favicon__WEBPACK_IMPORTED_MODULE_1___default()(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(app.get('public'), 'favicon.ico')))\n\napp.use('/', _feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.static(app.get('public')))\n\napp.configure(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.rest())\napp.configure(_feathersjs_socketio__WEBPACK_IMPORTED_MODULE_9___default()())\n\napp.configure(_middleware__WEBPACK_IMPORTED_MODULE_10___default.a)\napp.configure(_services__WEBPACK_IMPORTED_MODULE_11__[\"default\"])\napp.configure(_channels__WEBPACK_IMPORTED_MODULE_13__[\"default\"])\n\napp.use(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.notFound())\napp.use(_feathersjs_express__WEBPACK_IMPORTED_MODULE_8___default.a.errorHandler({logger: (winston__WEBPACK_IMPORTED_MODULE_5___default())}))\n\napp.hooks(_hooks__WEBPACK_IMPORTED_MODULE_12__[\"default\"])\n\nconst PORT = app.get('port')\n\napp.listen(PORT).on('listening', () => {\n  console.log('💖', `The Axi Engine is now listening on Port ${PORT}!`)\n})\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/middleware/index.js":
/*!*********************************!*\
  !*** ./src/middleware/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// eslint-disable-next-line no-unused-vars\nmodule.exports = function(app) {\n  // Add your custom middleware here. Remember, that\n  // in Express the order matters\n}\n\n\n//# sourceURL=webpack:///./src/middleware/index.js?");

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass HelloService {\n  async find(params) {\n    return {status: 200, data: 'Hello, World!'}\n  }\n}\n\nclass QueuingService {\n  async find(params) {\n    return {status: 200, message: 'Queuing Service'}\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (async function(app) {\n  app.use('/hello', new HelloService())\n  app.use('/queue', new QueuingService())\n});\n\n\n//# sourceURL=webpack:///./src/services/index.js?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"events\");\n\n//# sourceURL=webpack:///external_%22events%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "radix-router":
/*!*******************************!*\
  !*** external "radix-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"radix-router\");\n\n//# sourceURL=webpack:///external_%22radix-router%22?");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serve-favicon\");\n\n//# sourceURL=webpack:///external_%22serve-favicon%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ }),

/***/ "uberproto":
/*!****************************!*\
  !*** external "uberproto" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uberproto\");\n\n//# sourceURL=webpack:///external_%22uberproto%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });
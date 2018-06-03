module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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

const paramCounts = {
  find: 1,
  get: 2,
  create: 2,
  update: 3,
  patch: 3,
  remove: 2
};

function isObjectOrArray (value) {
  return typeof value === 'object' && value !== null;
}

exports.validateArguments = function validateArguments (method, args) {
  // Check if the last argument is a callback which are no longer supported
  if (typeof args[args.length - 1] === 'function') {
    throw new Error('Callbacks are no longer supported. Use Promises or async/await instead.');
  }

  const methodParamCount = paramCounts[method];

  // Check the number of arguments and throw an error if too many are provided
  if (methodParamCount && args.length > methodParamCount) {
    throw new Error(`Too many arguments for '${method}' method`);
  }

  // `params` is always the last argument
  const params = args[methodParamCount - 1];

  // Check if `params` is an object (can be undefined though)
  if (params !== undefined && !isObjectOrArray(params)) {
    throw new Error(`Params for '${method}' method must be an object`);
  }

  // Validate other arguments for each method
  switch (method) {
    case 'create':
      if (!isObjectOrArray(args[0])) {
        throw new Error(`A data object must be provided to the 'create' method`);
      }
      break;
    case 'get':
    case 'remove':
    case 'update':
    case 'patch':
      if (args[0] === undefined) {
        throw new Error(`An id must be provided to the '${method}' method`);
      }

      if ((method === 'update' || method === 'patch') && !isObjectOrArray(args[1])) {
        throw new Error(`A data object must be provided to the '${method}' method`);
      }
  }

  return true;
};


/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/commons.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/commons.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js");
const hooks = __webpack_require__(/*! ./hooks */ "./node_modules/@feathersjs/commons/lib/hooks.js");
const args = __webpack_require__(/*! ./arguments */ "./node_modules/@feathersjs/commons/lib/arguments.js");
const filterQuery = __webpack_require__(/*! ./filter-query */ "./node_modules/@feathersjs/commons/lib/filter-query.js");

module.exports = Object.assign({}, utils, args, { hooks, filterQuery });


/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/filter-query.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/filter-query.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _ } = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js");

// Officially supported query parameters ($populate is kind of special)
const PROPERTIES = ['$sort', '$limit', '$skip', '$select', '$populate'];

function parse (number) {
  if (typeof number !== 'undefined') {
    return Math.abs(parseInt(number, 10));
  }
}

// Returns the pagination limit and will take into account the
// default and max pagination settings
function getLimit (limit, paginate) {
  if (paginate && paginate.default) {
    const lower = typeof limit === 'number' ? limit : paginate.default;
    const upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;

    return Math.min(lower, upper);
  }

  return limit;
}

// Makes sure that $sort order is always converted to an actual number
function convertSort (sort) {
  if (typeof sort !== 'object' || Array.isArray(sort)) {
    return sort;
  }

  const result = {};

  Object.keys(sort).forEach(key => {
    result[key] = typeof sort[key] === 'object'
      ? sort[key] : parseInt(sort[key], 10);
  });

  return result;
}

// Converts Feathers special query parameters and pagination settings
// and returns them separately a `filters` and the rest of the query
// as `query`
module.exports = function (query, paginate) {
  let filters = {
    $sort: convertSort(query.$sort),
    $limit: getLimit(parse(query.$limit), paginate),
    $skip: parse(query.$skip),
    $select: query.$select,
    $populate: query.$populate
  };

  return { filters, query: _.omit(query, ...PROPERTIES) };
};


/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/hooks.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/hooks.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { each, pick } = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/commons/lib/utils.js")._;

// To skip further hooks
const SKIP = exports.SKIP = typeof Symbol !== 'undefined'
  ? Symbol('__feathersSkipHooks')
  : '__feathersSkipHooks';

const convertGetOrRemove = ([ id, params = {} ]) => ({ id, params });
const convertUpdateOrPatch = ([ id, data, params = {} ]) => ({ id, data, params });

// Converters from service method arguments to hook object properties
exports.converters = {
  find (args) {
    const [ params = {} ] = args;

    return { params };
  },
  create (args) {
    const [ data, params = {} ] = args;

    return { data, params };
  },
  get: convertGetOrRemove,
  remove: convertGetOrRemove,
  update: convertUpdateOrPatch,
  patch: convertUpdateOrPatch
};

// Create a hook object for a method with arguments `args`
// `data` is additional data that will be added
exports.createHookObject = function createHookObject (method, args, data = {}) {
  const hook = exports.converters[method](args);

  Object.defineProperty(hook, 'toJSON', {
    value () {
      return pick(this, 'type', 'method', 'path',
        'params', 'id', 'data', 'result', 'error');
    }
  });

  return Object.assign(hook, data, {
    method,
    // A dynamic getter that returns the path of the service
    get path () {
      const { app, service } = data;

      if (!service || !app || !app.services) {
        return null;
      }

      return Object.keys(app.services)
        .find(path => app.services[path] === service);
    }
  });
};

// Fallback used by `makeArguments` which usually won't be used
exports.defaultMakeArguments = function defaultMakeArguments (hook) {
  const result = [];

  if (typeof hook.id !== 'undefined') {
    result.push(hook.id);
  }

  if (hook.data) {
    result.push(hook.data);
  }

  result.push(hook.params || {});

  return result;
};

// Turns a hook object back into a list of arguments
// to call a service method with
exports.makeArguments = function makeArguments (hook) {
  switch (hook.method) {
    case 'find':
      return [ hook.params ];
    case 'get':
    case 'remove':
      return [ hook.id, hook.params ];
    case 'update':
    case 'patch':
      return [ hook.id, hook.data, hook.params ];
    case 'create':
      return [ hook.data, hook.params ];
  }

  return exports.defaultMakeArguments(hook);
};

// Converts different hook registration formats into the
// same internal format
exports.convertHookData = function convertHookData (obj) {
  var hook = {};

  if (Array.isArray(obj)) {
    hook = { all: obj };
  } else if (typeof obj !== 'object') {
    hook = { all: [ obj ] };
  } else {
    each(obj, function (value, key) {
      hook[key] = !Array.isArray(value) ? [ value ] : value;
    });
  }

  return hook;
};

// Duck-checks a given object to be a hook object
// A valid hook object has `type` and `method`
exports.isHookObject = function isHookObject (hookObject) {
  return typeof hookObject === 'object' &&
    typeof hookObject.method === 'string' &&
    typeof hookObject.type === 'string';
};

// Returns all service and application hooks combined
// for a given method and type `appLast` sets if the hooks
// from `app` should be added last (or first by default)
exports.getHooks = function getHooks (app, service, type, method, appLast = false) {
  const appHooks = app.__hooks[type][method] || [];
  const serviceHooks = service.__hooks[type][method] || [];

  if (appLast) {
    // Run hooks in the order of service -> app -> finally
    return serviceHooks.concat(appHooks);
  }

  return appHooks.concat(serviceHooks);
};

exports.processHooks = function processHooks (hooks, initialHookObject) {
  let hookObject = initialHookObject;
  let updateCurrentHook = current => {
    // Either use the returned hook object or the current
    // hook object from the chain if the hook returned undefined
    if (current) {
      if (current === SKIP) {
        return SKIP;
      }

      if (!exports.isHookObject(current)) {
        throw new Error(`${hookObject.type} hook for '${hookObject.method}' method returned invalid hook object`);
      }

      hookObject = current;
    }

    return hookObject;
  };
  // First step of the hook chain with the initial hook object
  let promise = Promise.resolve(hookObject);

  // Go through all hooks and chain them into our promise
  hooks.forEach(fn => {
    const hook = fn.bind(this);

    if (hook.length === 2) { // function(hook, next)
      promise = promise.then(hookObject => hookObject === SKIP ? SKIP : new Promise((resolve, reject) => {
        hook(hookObject, (error, result) =>
          error ? reject(error) : resolve(result)
        );
      }));
    } else { // function(hook)
      promise = promise.then(hookObject => hookObject === SKIP ? SKIP : hook(hookObject));
    }

    // Use the returned hook object or the old one
    promise = promise.then(updateCurrentHook);
  });

  return promise
    .then(() => hookObject)
    .catch(error => {
      // Add the hook information to any errors
      error.hook = hookObject;
      throw error;
    });
};

// Add `.hooks` functionality to an object
exports.enableHooks = function enableHooks (obj, methods, types) {
  if (typeof obj.hooks === 'function') {
    return obj;
  }

  let __hooks = {};

  types.forEach(type => {
    // Initialize properties where hook functions are stored
    __hooks[type] = {};
  });

  // Add non-enumerable `__hooks` property to the object
  Object.defineProperty(obj, '__hooks', {
    value: __hooks
  });

  return Object.assign(obj, {
    hooks (allHooks) {
      each(allHooks, (obj, type) => {
        if (!this.__hooks[type]) {
          throw new Error(`'${type}' is not a valid hook type`);
        }

        const hooks = exports.convertHookData(obj);

        each(hooks, (value, method) => {
          if (method !== 'all' && methods.indexOf(method) === -1) {
            throw new Error(`'${method}' is not a valid hook method`);
          }
        });

        methods.forEach(method => {
          const myHooks = this.__hooks[type][method] ||
            (this.__hooks[type][method] = []);

          if (hooks.all) {
            myHooks.push.apply(myHooks, hooks.all);
          }

          if (hooks[method]) {
            myHooks.push.apply(myHooks, hooks[method]);
          }
        });
      });

      return this;
    }
  });
};


/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Removes all leading and trailing slashes from a path
exports.stripSlashes = function stripSlashes (name) {
  return name.replace(/^(\/*)|(\/*)$/g, '');
};

// A set of lodash-y utility functions that use ES6
const _ = exports._ = {
  each (obj, callback) {
    if (obj && typeof obj.forEach === 'function') {
      obj.forEach(callback);
    } else if (_.isObject(obj)) {
      Object.keys(obj).forEach(key => callback(obj[key], key));
    }
  },

  some (value, callback) {
    return Object.keys(value)
      .map(key => [ value[key], key ])
      .some(([val, key]) => callback(val, key));
  },

  every (value, callback) {
    return Object.keys(value)
      .map(key => [ value[key], key ])
      .every(([val, key]) => callback(val, key));
  },

  keys (obj) {
    return Object.keys(obj);
  },

  values (obj) {
    return _.keys(obj).map(key => obj[key]);
  },

  isMatch (obj, item) {
    return _.keys(item).every(key => obj[key] === item[key]);
  },

  isEmpty (obj) {
    return _.keys(obj).length === 0;
  },

  isObject (item) {
    return (typeof item === 'object' && !Array.isArray(item) && item !== null);
  },

  extend (...args) {
    return Object.assign(...args);
  },

  omit (obj, ...keys) {
    const result = _.extend({}, obj);
    keys.forEach(key => delete result[key]);
    return result;
  },

  pick (source, ...keys) {
    const result = {};
    keys.forEach(key => {
      if (source[key] !== undefined) {
        result[key] = source[key];
      }
    });
    return result;
  },

  // Recursively merge the source object into the target object
  merge (target, source) {
    if (_.isObject(target) && _.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (_.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }

          _.merge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      });
    }
    return target;
  }
};

// Return a function that filters a result object or array
// and picks only the fields passed as `params.query.$select`
// and additional `otherFields`
exports.select = function select (params, ...otherFields) {
  const fields = params && params.query && params.query.$select;

  if (Array.isArray(fields) && otherFields.length) {
    fields.push(...otherFields);
  }

  const convert = result => {
    if (!Array.isArray(fields)) {
      return result;
    }

    return _.pick(result, ...fields);
  };

  return result => {
    if (Array.isArray(result)) {
      return result.map(convert);
    }

    return convert(result);
  };
};

// An in-memory sorting function according to the
// $sort special query parameter
exports.sorter = function sorter ($sort) {
  return function (first, second) {
    let comparator = 0;
    _.each($sort, (modifier, key) => {
      modifier = parseInt(modifier, 10);

      if (first[key] < second[key]) {
        comparator -= 1 * modifier;
      }

      if (first[key] > second[key]) {
        comparator += 1 * modifier;
      }
    });
    return comparator;
  };
};

// Duck-checks if an object looks like a promise
exports.isPromise = function isPromise (result) {
  return _.isObject(result) &&
    typeof result.then === 'function';
};

exports.makeUrl = function makeUrl (path, app = {}) {
  const get = typeof app.get === 'function' ? app.get.bind(app) : () => {};
  const env = get('env') || "development";
  const host = get('host') || process.env.HOST_NAME || 'localhost';
  const protocol = (env === 'development' || env === 'test' || (env === undefined)) ? 'http' : 'https';
  const PORT = get('port') || process.env.PORT || 3030;
  const port = (env === 'development' || env === 'test' || (env === undefined)) ? `:${PORT}` : '';

  path = path || '';

  return `${protocol}://${host}${port}/${exports.stripSlashes(path)}`;
};


/***/ }),

/***/ "./node_modules/@feathersjs/configuration/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@feathersjs/configuration/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const makeDebug = __webpack_require__(/*! debug */ "debug");
const path = __webpack_require__(/*! path */ "path");

const debug = makeDebug('@feathersjs/configuration');
const config = __webpack_require__(/*! config */ "config");
const separator = path.sep;

function init () {
  return function () {
    let app = this;

    const convert = current => {
      const result = Array.isArray(current) ? [] : {};

      Object.keys(current).forEach(name => {
        let value = current[name];

        if (typeof value === 'object' && value !== null) {
          value = convert(value);
        }

        if (typeof value === 'string') {
          if (value.indexOf('\\') === 0) {
            value = value.replace('\\', '');
          } else {
            if (process.env[value]) {
              value = process.env[value];
            } else if (value.indexOf('.') === 0 || value.indexOf('..') === 0) {
              // Make relative paths absolute
              value = path.resolve(
                path.join(config.util.getEnv('NODE_CONFIG_DIR')),
                value.replace(/\//g, separator)
              );
            }
          }
        }

        result[name] = value;
      });

      return result;
    };

    const env = config.util.getEnv('NODE_ENV');
    const conf = convert(config);

    debug(`Initializing configuration for ${env} environment`);

    if (!app || app === global) {
      return conf;
    }

    Object.keys(conf).forEach(name => {
      let value = conf[name];
      debug(`Setting ${name} configuration value to`, value);
      app.set(name, value);
    });
  };
}

module.exports = init;
module.exports.default = init;


/***/ }),

/***/ "./node_modules/@feathersjs/errors/handler.js":
/*!****************************************************!*\
  !*** ./node_modules/@feathersjs/errors/handler.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/error-handler */ "./node_modules/@feathersjs/errors/lib/error-handler.js");


/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/error-handler.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/error-handler.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(/*! path */ "path");
const errors = __webpack_require__(/*! ./index */ "./node_modules/@feathersjs/errors/lib/index.js");

const defaults = {
  public: path.resolve(__dirname, 'public'),
  logger: console
};
const defaultHtmlError = path.resolve(defaults.public, 'default.html');

module.exports = function (options = {}) {
  options = Object.assign({}, defaults, options);

  if (typeof options.html === 'undefined') {
    options.html = {
      401: path.resolve(options.public, '401.html'),
      404: path.resolve(options.public, '404.html'),
      default: defaultHtmlError
    };
  }

  if (typeof options.json === 'undefined') {
    options.json = {};
  }

  return function (error, req, res, next) {
    // Log the error if it didn't come from a service method call
    if (options.logger && typeof options.logger.error === 'function' && !res.hook) {
      options.logger.error(error);
    }

    if (error.type !== 'FeathersError') {
      let oldError = error;
      error = new errors.GeneralError(oldError.message, {
        errors: oldError.errors
      });

      if (oldError.stack) {
        error.stack = oldError.stack;
      }
    }

    error.code = !isNaN(parseInt(error.code, 10)) ? parseInt(error.code, 10) : 500;
    const formatter = {};

    // If the developer passed a custom function for ALL html errors
    if (typeof options.html === 'function') {
      formatter['text/html'] = options.html;
    } else {
      let file = options.html[error.code];
      if (!file) {
        file = options.html.default || defaultHtmlError;
      }
      // If the developer passed a custom function for individual html errors
      if (typeof file === 'function') {
        formatter['text/html'] = file;
      } else {
        formatter['text/html'] = function () {
          res.set('Content-Type', 'text/html');
          res.sendFile(file);
        };
      }
    }

    // If the developer passed a custom function for ALL json errors
    if (typeof options.json === 'function') {
      formatter['application/json'] = options.json;
    } else {
      let handler = options.json[error.code] || options.json.default;
      // If the developer passed a custom function for individual json errors
      if (typeof handler === 'function') {
        formatter['application/json'] = handler;
      } else {
        // Don't show stack trace if it is a 404 error
        if (error.code === 404) {
          error.stack = null;
        }

        formatter['application/json'] = function () {
          let output = Object.assign({}, error.toJSON());

          if (false) {}

          res.set('Content-Type', 'application/json');
          res.json(output);
        };
      }
    }

    res.status(error.code);

    const contentType = req.headers['content-type'] || '';
    const accepts = req.headers.accept || '';

    // by default just send back json
    if (contentType.indexOf('json') !== -1 || accepts.indexOf('json') !== -1) {
      formatter['application/json'](error, req, res, next);
    } else if (options.html && (contentType.indexOf('html') !== -1 || accepts.indexOf('html') !== -1)) {
      formatter['text/html'](error, req, res, next);
    } else {
      // TODO (EK): Maybe just return plain text
      formatter['application/json'](error, req, res, next);
    }
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/errors');

function FeathersError (msg, name, code, className, data) {
  msg = msg || 'Error';

  let errors;
  let message;
  let newData;

  if (msg instanceof Error) {
    message = msg.message || 'Error';

    // NOTE (EK): This is typically to handle validation errors
    if (msg.errors) {
      errors = msg.errors;
    }
  } else if (typeof msg === 'object') { // Support plain old objects
    message = msg.message || 'Error';
    data = msg;
  } else { // message is just a string
    message = msg;
  }

  if (data) {
    // NOTE(EK): To make sure that we are not messing
    // with immutable data, just make a copy.
    // https://github.com/feathersjs/errors/issues/19
    newData = JSON.parse(JSON.stringify(data));

    if (newData.errors) {
      errors = newData.errors;
      delete newData.errors;
    } else if (data.errors) {
      // The errors property from data could be
      // stripped away while cloning resulting newData not to have it
      // For example: when cloning arrays this property
      errors = JSON.parse(JSON.stringify(data.errors));
    }
  }

  // NOTE (EK): Babel doesn't support this so
  // we have to pass in the class name manually.
  // this.name = this.constructor.name;
  this.type = 'FeathersError';
  this.name = name;
  this.message = message;
  this.code = code;
  this.className = className;
  this.data = newData;
  this.errors = errors || {};

  debug(`${this.name}(${this.code}): ${this.message}`);
  debug(this.errors);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, FeathersError);
  } else {
    this.stack = (new Error()).stack;
  }
}

function inheritsFrom (Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

inheritsFrom(FeathersError, Error);

// NOTE (EK): A little hack to get around `message` not
// being included in the default toJSON call.
Object.defineProperty(FeathersError.prototype, 'toJSON', {
  value: function () {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      className: this.className,
      data: this.data,
      errors: this.errors
    };
  }
});

// 400 - Bad Request
function BadRequest (message, data) {
  FeathersError.call(this, message, 'BadRequest', 400, 'bad-request', data);
}

inheritsFrom(BadRequest, FeathersError);

// 401 - Not Authenticated
function NotAuthenticated (message, data) {
  FeathersError.call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data);
}

inheritsFrom(NotAuthenticated, FeathersError);

// 402 - Payment Error
function PaymentError (message, data) {
  FeathersError.call(this, message, 'PaymentError', 402, 'payment-error', data);
}

inheritsFrom(PaymentError, FeathersError);

// 403 - Forbidden
function Forbidden (message, data) {
  FeathersError.call(this, message, 'Forbidden', 403, 'forbidden', data);
}

inheritsFrom(Forbidden, FeathersError);

// 404 - Not Found
function NotFound (message, data) {
  FeathersError.call(this, message, 'NotFound', 404, 'not-found', data);
}

inheritsFrom(NotFound, FeathersError);

// 405 - Method Not Allowed
function MethodNotAllowed (message, data) {
  FeathersError.call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
}

inheritsFrom(MethodNotAllowed, FeathersError);

// 406 - Not Acceptable
function NotAcceptable (message, data) {
  FeathersError.call(this, message, 'NotAcceptable', 406, 'not-acceptable', data);
}

inheritsFrom(NotAcceptable, FeathersError);

// 408 - Timeout
function Timeout (message, data) {
  FeathersError.call(this, message, 'Timeout', 408, 'timeout', data);
}

inheritsFrom(Timeout, FeathersError);

// 409 - Conflict
function Conflict (message, data) {
  FeathersError.call(this, message, 'Conflict', 409, 'conflict', data);
}

inheritsFrom(Conflict, FeathersError);

// 411 - Length Required
function LengthRequired (message, data) {
  FeathersError.call(this, message, 'LengthRequired', 411, 'length-required', data);
}

inheritsFrom(LengthRequired, FeathersError);

// 422 Unprocessable
function Unprocessable (message, data) {
  FeathersError.call(this, message, 'Unprocessable', 422, 'unprocessable', data);
}

inheritsFrom(Unprocessable, FeathersError);

// 429 Too Many Requests
function TooManyRequests (message, data) {
  FeathersError.call(this, message, 'TooManyRequests', 429, 'too-many-requests', data);
}

inheritsFrom(TooManyRequests, FeathersError);

// 500 - General Error
function GeneralError (message, data) {
  FeathersError.call(this, message, 'GeneralError', 500, 'general-error', data);
}

inheritsFrom(GeneralError, FeathersError);

// 501 - Not Implemented
function NotImplemented (message, data) {
  FeathersError.call(this, message, 'NotImplemented', 501, 'not-implemented', data);
}

inheritsFrom(NotImplemented, FeathersError);

// 502 - Bad Gateway
function BadGateway (message, data) {
  FeathersError.call(this, message, 'BadGateway', 502, 'bad-gateway', data);
}

inheritsFrom(BadGateway, FeathersError);

// 503 - Unavailable
function Unavailable (message, data) {
  FeathersError.call(this, message, 'Unavailable', 503, 'unavailable', data);
}

inheritsFrom(Unavailable, FeathersError);

const errors = {
  FeathersError,
  BadRequest,
  NotAuthenticated,
  PaymentError,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  Timeout,
  Conflict,
  LengthRequired,
  Unprocessable,
  TooManyRequests,
  GeneralError,
  NotImplemented,
  BadGateway,
  Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable
};

function convert (error) {
  if (!error) {
    return error;
  }

  const FeathersError = errors[error.name];
  const result = FeathersError
    ? new FeathersError(error.message, error.data)
    : new Error(error.message || error);

  if (typeof error === 'object') {
    Object.assign(result, error);
  }

  return result;
}

module.exports = Object.assign({ convert }, errors);


/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/not-found-handler.js":
/*!******************************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/not-found-handler.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const errors = __webpack_require__(/*! ./index */ "./node_modules/@feathersjs/errors/lib/index.js");

module.exports = function ({ verbose = false } = {}) {
  return function (req, res, next) {
    const { url } = req;
    const message = `Page not found${verbose ? ': ' + url : ''}`;
    next(new errors.NotFound(message, { url }));
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/errors/not-found.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/not-found.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/not-found-handler */ "./node_modules/@feathersjs/errors/lib/not-found-handler.js");


/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const express = __webpack_require__(/*! express */ "express");
const Proto = __webpack_require__(/*! uberproto */ "uberproto");
const errorHandler = __webpack_require__(/*! @feathersjs/errors/handler */ "./node_modules/@feathersjs/errors/handler.js");
const notFound = __webpack_require__(/*! @feathersjs/errors/not-found */ "./node_modules/@feathersjs/errors/not-found.js");
const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/express');

const rest = __webpack_require__(/*! ./rest */ "./node_modules/@feathersjs/express/lib/rest/index.js");

function feathersExpress (feathersApp) {
  if (!feathersApp) {
    return express();
  }

  if (typeof feathersApp.setup !== 'function') {
    throw new Error('@feathersjs/express requires a valid Feathers application instance');
  }

  if (!feathersApp.version || feathersApp.version < '3.0.0') {
    throw new Error(`@feathersjs/express requires an instance of a Feathers application version 3.x or later (got ${feathersApp.version || 'unknown'})`);
  }

  const expressApp = express();
  // An Uberproto mixin that provides the extended functionality
  const mixin = {
    use (location) {
      let service;
      let middleware = Array.from(arguments)
        .slice(1)
        .reduce(function (middleware, arg) {
          if (typeof arg === 'function') {
            middleware[service ? 'after' : 'before'].push(arg);
          } else if (!service) {
            service = arg;
          } else {
            throw new Error('Invalid options passed to app.use');
          }
          return middleware;
        }, {
          before: [],
          after: []
        });

      const hasMethod = methods => methods.some(name =>
        (service && !Array.isArray(service) && typeof service[name] === 'function')
      );

      // Check for service (any object with at least one service method)
      if (hasMethod(['handle', 'set']) || !hasMethod(this.methods.concat('setup'))) {
        debug('Passing app.use call to Express app');
        return this._super.apply(this, arguments);
      }

      debug('Registering service with middleware', middleware);
      // Since this is a serivce, call Feathers `.use`
      feathersApp.use.call(this, location, service, { middleware });

      return this;
    },

    listen () {
      const server = this._super.apply(this, arguments);

      this.setup(server);
      debug('Feathers application listening');

      return server;
    }
  };

  // Copy all non-existing properties (including non-enumerables)
  // that don't already exist on the Express app
  Object.getOwnPropertyNames(feathersApp).forEach(prop => {
    const feathersProp = Object.getOwnPropertyDescriptor(feathersApp, prop);
    const expressProp = Object.getOwnPropertyDescriptor(expressApp, prop);

    if (expressProp === undefined && feathersProp !== undefined) {
      Object.defineProperty(expressApp, prop, feathersProp);
    }
  });

  return Proto.mixin(mixin, expressApp);
}

module.exports = feathersExpress;

Object.assign(module.exports, express, {
  default: feathersExpress,
  original: express,
  rest,
  notFound,
  errorHandler
});


/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/rest/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/rest/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const makeDebug = __webpack_require__(/*! debug */ "debug");
const wrappers = __webpack_require__(/*! ./wrappers */ "./node_modules/@feathersjs/express/lib/rest/wrappers.js");

const debug = makeDebug('@feathersjs/express/rest');

function formatter (req, res, next) {
  if (res.data === undefined) {
    return next();
  }

  res.format({
    'application/json': function () {
      res.json(res.data);
    }
  });
}

function rest (handler = formatter) {
  return function () {
    const app = this;

    if (typeof app.route !== 'function') {
      throw new Error('@feathersjs/express/rest needs an Express compatible app. Feathers apps have to wrapped with feathers-express first.');
    }

    if (!app.version || app.version < '3.0.0') {
      throw new Error(`@feathersjs/express/rest requires an instance of a Feathers application version 3.x or later (got ${app.version})`);
    }

    app.rest = wrappers;

    app.use(function (req, res, next) {
      req.feathers = { provider: 'rest' };
      next();
    });

    // Register the REST provider
    app.providers.push(function (service, path, options) {
      const uri = `/${path}`;
      const baseRoute = app.route(uri);
      const idRoute = app.route(`${uri}/:__feathersId`);

      let { middleware } = options;
      let { before, after } = middleware;

      if (typeof handler === 'function') {
        after = after.concat(handler);
      }

      debug(`Adding REST provider for service \`${path}\` at base route \`${uri}\``);

      // GET / -> service.find(params)
      baseRoute.get(...before, app.rest.find(service), ...after);
      // POST / -> service.create(data, params)
      baseRoute.post(...before, app.rest.create(service), ...after);
      // PATCH / -> service.patch(null, data, params)
      baseRoute.patch(...before, app.rest.patch(service), ...after);
      // PUT / -> service.update(null, data, params)
      baseRoute.put(...before, app.rest.update(service), ...after);
      // DELETE / -> service.remove(null, params)
      baseRoute.delete(...before, app.rest.remove(service), ...after);

      // GET /:id -> service.get(id, params)
      idRoute.get(...before, app.rest.get(service), ...after);
      // PUT /:id -> service.update(id, data, params)
      idRoute.put(...before, app.rest.update(service), ...after);
      // PATCH /:id -> service.patch(id, data, params)
      idRoute.patch(...before, app.rest.patch(service), ...after);
      // DELETE /:id -> service.remove(id, params)
      idRoute.delete(...before, app.rest.remove(service), ...after);
    });
  };
}

rest.formatter = formatter;

module.exports = rest;


/***/ }),

/***/ "./node_modules/@feathersjs/express/lib/rest/wrappers.js":
/*!***************************************************************!*\
  !*** ./node_modules/@feathersjs/express/lib/rest/wrappers.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const errors = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");
const { omit } = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js")._;

const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/express/rest');

const statusCodes = {
  created: 201,
  noContent: 204,
  methodNotAllowed: 405
};
const methodMap = {
  find: 'GET',
  get: 'GET',
  create: 'POST',
  update: 'PUT',
  patch: 'PATCH',
  remove: 'DELETE'
};
const allowedMethods = function (service) {
  return Object.keys(methodMap)
    .filter(method => typeof service[method] === 'function')
    .map(method => methodMap[method])
    // Filter out duplicates
    .filter((value, index, list) => list.indexOf(value) === index);
};

// A function that returns the middleware for a given method and service
// `getArgs` is a function that should return additional leading service arguments
function getHandler (method, getArgs) {
  return service => {
    return function (req, res, next) {
      const { query } = req;
      const route = omit(req.params, '__feathersId');

      res.setHeader('Allow', allowedMethods(service).join(','));

      // Check if the method exists on the service at all. Send 405 (Method not allowed) if not
      if (typeof service[method] !== 'function') {
        debug(`Method '${method}' not allowed on '${req.url}'`);
        res.status(statusCodes.methodNotAllowed);

        return next(new errors.MethodNotAllowed(`Method \`${method}\` is not supported by this endpoint.`));
      }

      // Grab the service parameters. Use req.feathers
      // and set the query to req.query merged with req.params
      const params = Object.assign({
        query, route
      }, req.feathers);

      Object.defineProperty(params, '__returnHook', {
        value: true
      });

      // Run the getArgs callback, if available, for additional parameters
      const args = getArgs(req, params);

      debug(`REST handler calling \`${method}\` from \`${req.url}\``);

      service[method](...args, true)
        .then(hook => {
          const data = hook.dispatch !== undefined ? hook.dispatch : hook.result;

          res.data = data;
          res.hook = hook;

          if (hook.statusCode) {
            res.status(hook.statusCode);
          } else if (!data) {
            debug(`No content returned for '${req.url}'`);
            res.status(statusCodes.noContent);
          } else if (method === 'create') {
            res.status(statusCodes.created);
          }

          return next();
        })
        .catch(hook => {
          const { error } = hook;

          debug(`Error in handler: \`${error.message}\``);
          res.hook = hook;

          return next(hook.error);
        });
    };
  };
}

// Returns no leading parameters
function reqNone (req, params) {
  return [ params ];
}

// Returns the leading parameters for a `get` or `remove` request (the id)
function reqId (req, params) {
  return [ req.params.__feathersId || null, params ];
}

// Returns the leading parameters for an `update` or `patch` request (id, data)
function reqUpdate (req, params) {
  return [ req.params.__feathersId || null, req.body, params ];
}

// Returns the leading parameters for a `create` request (data)
function reqCreate (req, params) {
  return [ req.body, params ];
}

module.exports = {
  find: getHandler('find', reqNone),
  get: getHandler('get', reqId),
  create: getHandler('create', reqCreate),
  update: getHandler('update', reqUpdate),
  patch: getHandler('patch', reqUpdate),
  remove: getHandler('remove', reqId)
};


/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/application.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/application.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(/*! debug */ "debug")('feathers:application');
const { stripSlashes } = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js");

const Uberproto = __webpack_require__(/*! uberproto */ "uberproto");
const events = __webpack_require__(/*! ./events */ "./node_modules/@feathersjs/feathers/lib/events.js");
const hooks = __webpack_require__(/*! ./hooks */ "./node_modules/@feathersjs/feathers/lib/hooks.js");
const version = __webpack_require__(/*! ./version */ "./node_modules/@feathersjs/feathers/lib/version.js");

const Proto = Uberproto.extend({
  create: null
});

const application = {
  init () {
    Object.assign(this, {
      version,
      methods: [
        'find', 'get', 'create', 'update', 'patch', 'remove'
      ],
      mixins: [],
      services: {},
      providers: [],
      _setup: false,
      settings: {}
    });

    this.configure(hooks());
    this.configure(events());
  },

  get (name) {
    return this.settings[name];
  },

  set (name, value) {
    this.settings[name] = value;
    return this;
  },

  disable (name) {
    this.settings[name] = false;
    return this;
  },

  disabled (name) {
    return !this.settings[name];
  },

  enable (name) {
    this.settings[name] = true;
    return this;
  },

  enabled (name) {
    return !!this.settings[name];
  },

  configure (fn) {
    fn.call(this, this);

    return this;
  },

  service (path, service) {
    if (typeof service !== 'undefined') {
      throw new Error('Registering a new service with `app.service(path, service)` is no longer supported. Use `app.use(path, service)` instead.');
    }

    const location = stripSlashes(path);
    const current = this.services[location];

    if (typeof current === 'undefined' && typeof this.defaultService === 'function') {
      return this.use(`/${location}`, this.defaultService(location))
        .service(location);
    }

    return current;
  },

  use (path, service, options = {}) {
    if (typeof path !== 'string' || stripSlashes(path) === '') {
      throw new Error(`'${path}' is not a valid service path.`);
    }

    const location = stripSlashes(path);
    const isSubApp = typeof service.service === 'function' && service.services;
    const isService = this.methods.concat('setup').some(name =>
      (service && typeof service[name] === 'function')
    );

    if (isSubApp) {
      const subApp = service;

      Object.keys(subApp.services).forEach(subPath =>
        this.use(`${location}/${subPath}`, subApp.service(subPath))
      );

      return this;
    }

    if (!isService) {
      throw new Error(`Invalid service object passed for path \`${location}\``);
    }

    // If the service is already Uberproto'd use it directly
    const protoService = Proto.isPrototypeOf(service) ? service : Proto.extend(service);

    debug(`Registering new service at \`${location}\``);

    // Add all the mixins
    this.mixins.forEach(fn => fn.call(this, protoService, location, options));

    if (typeof protoService._setup === 'function') {
      protoService._setup(this, location);
    }

    // Run the provider functions to register the service
    this.providers.forEach(provider =>
      provider.call(this, protoService, location, options)
    );

    // If we ran setup already, set this service up explicitly
    if (this._isSetup && typeof protoService.setup === 'function') {
      debug(`Setting up service for \`${location}\``);
      protoService.setup(this, location);
    }

    this.services[location] = protoService;

    return this;
  },

  setup () {
    // Setup each service (pass the app so that they can look up other services etc.)
    Object.keys(this.services).forEach(path => {
      const service = this.services[path];

      debug(`Setting up service for \`${path}\``);

      if (typeof service.setup === 'function') {
        service.setup(this, path);
      }
    });

    this._isSetup = true;

    return this;
  }
};

module.exports = application;


/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/events.js":
/*!*********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/events.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { EventEmitter } = __webpack_require__(/*! events */ "events");
const Proto = __webpack_require__(/*! uberproto */ "uberproto");

// Returns a hook that emits service events. Should always be
// used as the very last hook in the chain
const eventHook = exports.eventHook = function eventHook () {
  return function (hook) {
    const { app, service } = hook;
    const eventName = app.eventMappings[hook.method];
    const isHookEvent = service._hookEvents && service._hookEvents.indexOf(eventName) !== -1;

    // If this event is not being sent yet and we are not in an error hook
    if (eventName && isHookEvent && hook.type !== 'error') {
      const results = Array.isArray(hook.result) ? hook.result : [ hook.result ];

      results.forEach(element => service.emit(eventName, element, hook));
    }
  };
};

// Mixin that turns a service into a Node event emitter
const eventMixin = exports.eventMixin = function eventMixin (service) {
  if (service._serviceEvents) {
    return;
  }

  const app = this;
  // Indicates if the service is already an event emitter
  const isEmitter = typeof service.on === 'function' &&
    typeof service.emit === 'function';

  // If not, mix it in (the service is always an Uberproto object that has a .mixin)
  if (typeof service.mixin === 'function' && !isEmitter) {
    service.mixin(EventEmitter.prototype);
  }

  // Define non-enumerable properties of
  Object.defineProperties(service, {
    // A list of all events that this service sends
    _serviceEvents: {
      value: Array.isArray(service.events) ? service.events.slice() : []
    },

    // A list of events that should be handled through the event hooks
    _hookEvents: {
      value: []
    }
  });

  // `app.eventMappings` has the mapping from method name to event name
  Object.keys(app.eventMappings).forEach(method => {
    const event = app.eventMappings[method];
    const alreadyEmits = service._serviceEvents.indexOf(event) !== -1;

    // Add events for known methods to _serviceEvents and _hookEvents
    // if the service indicated it does not send it itself yet
    if (typeof service[method] === 'function' && !alreadyEmits) {
      service._serviceEvents.push(event);
      service._hookEvents.push(event);
    }
  });
};

module.exports = function () {
  return function (app) {
    // Mappings from service method to event name
    Object.assign(app, {
      eventMappings: {
        create: 'created',
        update: 'updated',
        remove: 'removed',
        patch: 'patched'
      }
    });

    // Register the event hook
    // `finally` hooks always run last after `error` and `after` hooks
    app.hooks({ finally: eventHook() });

    // Make the app an event emitter
    Proto.mixin(EventEmitter.prototype, app);

    app.mixins.push(eventMixin);
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/hooks.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/hooks.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { hooks, validateArguments, isPromise, _ } = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js");

const {
  createHookObject,
  getHooks,
  processHooks,
  enableHooks,
  makeArguments
} = hooks;

// A service mixin that adds `service.hooks()` method and functionality
const hookMixin = exports.hookMixin = function hookMixin (service) {
  if (typeof service.hooks === 'function') {
    return;
  }

  const app = this;
  const methods = app.methods;
  const mixin = {};

  // Add .hooks method and properties to the service
  enableHooks(service, methods, app.hookTypes);

  // Assemble the mixin object that contains all "hooked" service methods
  methods.forEach(method => {
    if (typeof service[method] !== 'function') {
      return;
    }

    mixin[method] = function () {
      const service = this;
      const args = Array.from(arguments);
      // If the last argument is `true` we want to return
      // the actual hook object instead of the result
      const returnHook = args[args.length - 1] === true
        ? args.pop() : false;

      // A reference to the original method
      const _super = service._super.bind(service);
      // Create the hook object that gets passed through
      const hookObject = createHookObject(method, args, {
        type: 'before', // initial hook object type
        service,
        app
      });
      // A hook that validates the arguments and will always be the very first
      const validateHook = context => {
        validateArguments(method, args);

        return context;
      };
      // The `before` hook chain (including the validation hook)
      const beforeHooks = [ validateHook, ...getHooks(app, service, 'before', method) ];

      // Process all before hooks
      return processHooks.call(service, beforeHooks, hookObject)
        // Use the hook object to call the original method
        .then(hookObject => {
          // If `hookObject.result` is set, skip the original method
          if (typeof hookObject.result !== 'undefined') {
            return hookObject;
          }

          // Otherwise, call it with arguments created from the hook object
          const promise = _super(...makeArguments(hookObject));

          if (!isPromise(promise)) {
            throw new Error(`Service method '${hookObject.method}' for '${hookObject.path}' service must return a promise`);
          }

          return promise.then(result => {
            hookObject.result = result;

            return hookObject;
          });
        })
        // Make a (shallow) copy of hookObject from `before` hooks and update type
        .then(hookObject => Object.assign({}, hookObject, { type: 'after' }))
        // Run through all `after` hooks
        .then(hookObject => {
          // Combine all app and service `after` and `finally` hooks and process
          const afterHooks = getHooks(app, service, 'after', method, true);
          const finallyHooks = getHooks(app, service, 'finally', method, true);
          const hookChain = afterHooks.concat(finallyHooks);

          return processHooks.call(service, hookChain, hookObject);
        })
        .then(hookObject =>
          // Finally, return the result
          // Or the hook object if the `returnHook` flag is set
          returnHook ? hookObject : hookObject.result
        )
        // Handle errors
        .catch(error => {
          // Combine all app and service `error` and `finally` hooks and process
          const errorHooks = getHooks(app, service, 'error', method, true);
          const finallyHooks = getHooks(app, service, 'finally', method, true);
          const hookChain = errorHooks.concat(finallyHooks);

          // A shallow copy of the hook object
          const errorHookObject = _.omit(Object.assign({}, error.hook, hookObject, {
            type: 'error',
            original: error.hook,
            error
          }), 'result');

          return processHooks.call(service, hookChain, errorHookObject)
            .catch(error => {
              errorHookObject.error = error;

              return errorHookObject;
            })
            .then(hook => {
              if (returnHook) {
                // Either resolve or reject with the hook object
                return typeof hook.result !== 'undefined' ? hook : Promise.reject(hook);
              }

              // Otherwise return either the result if set (to swallow errors)
              // Or reject with the hook error
              return typeof hook.result !== 'undefined' ? hook.result : Promise.reject(hook.error);
            });
        });
    };
  });

  service.mixin(mixin);
};

module.exports = function () {
  return function (app) {
    // We store a reference of all supported hook types on the app
    // in case someone needs it
    Object.assign(app, {
      hookTypes: [ 'before', 'after', 'error', 'finally' ]
    });

    // Add functionality for hooks to be registered as app.hooks
    enableHooks(app, app.methods, app.hookTypes);

    app.mixins.push(hookMixin);
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { hooks } = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js");
const Proto = __webpack_require__(/*! uberproto */ "uberproto");
const Application = __webpack_require__(/*! ./application */ "./node_modules/@feathersjs/feathers/lib/application.js");
const version = __webpack_require__(/*! ./version */ "./node_modules/@feathersjs/feathers/lib/version.js");

function createApplication () {
  const app = {};

  // Mix in the base application
  Proto.mixin(Application, app);

  app.init();

  return app;
}

createApplication.version = version;
createApplication.SKIP = hooks.SKIP;

module.exports = createApplication;

// For better ES module (TypeScript) compatibility
module.exports.default = createApplication;


/***/ }),

/***/ "./node_modules/@feathersjs/feathers/lib/version.js":
/*!**********************************************************!*\
  !*** ./node_modules/@feathersjs/feathers/lib/version.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '3.1.6';


/***/ }),

/***/ "./node_modules/@feathersjs/socketio/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@feathersjs/socketio/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const socketio = __webpack_require__(/*! socket.io */ "socket.io");
const Proto = __webpack_require__(/*! uberproto */ "uberproto");
const http = __webpack_require__(/*! http */ "http");
const { socket: commons } = __webpack_require__(/*! @feathersjs/transport-commons */ "./node_modules/@feathersjs/transport-commons/lib/index.js");
const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/socketio');

const socketKey = Symbol('@feathersjs/socketio/socket');

function configureSocketio (port, options, config) {
  if (typeof port !== 'number') {
    config = options;
    options = port;
    port = null;
  }

  if (typeof options !== 'object') {
    config = options;
    options = {};
  }

  return function () {
    const app = this;
    const getParams = socket => socket.feathers;

    if (!app.version || app.version < '3.0.0') {
      throw new Error('@feathersjs/socketio is not compatible with this version of Feathers. Use the latest at @feathersjs/feathers.');
    }

    // Promise that resolves with the Socket.io `io` instance
    // when `setup` has been called (with a server)
    const done = new Promise(resolve => {
      Proto.mixin({
        listen (...args) {
          if (typeof this._super === 'function') {
            // If `listen` already exists
            // usually the case when the app has been expressified
            return this._super(...args);
          }

          const server = http.createServer();

          this.setup(server);

          return server.listen(...args);
        },

        setup (server) {
          if (!this.io) {
            const io = this.io = socketio
              .listen(port || server, options);

            io.use((socket, next) => {
              const connection = {
                provider: 'socketio'
              };

              Object.defineProperty(connection, socketKey, {
                value: socket
              });

              socket.feathers = connection;

              next();
            });

            io.use((socket, next) => {
              socket.once('disconnect', () => {
                const { channels } = app;

                if (channels.length) {
                  app.channel(app.channels).leave(getParams(socket));
                }
              });
              next();
            });

            // In Feathers it is easy to hit the standard Node warning limit
            // of event listeners (e.g. by registering 10 services).
            // So we set it to a higher number. 64 should be enough for everyone.
            io.sockets.setMaxListeners(64);
          }

          if (typeof config === 'function') {
            debug('Calling SocketIO configuration function');
            config.call(this, this.io);
          }

          resolve(this.io);

          return this._super.apply(this, arguments);
        }
      }, app);
    });

    app.configure(commons({
      done,
      socketKey,
      getParams,
      emit: 'emit'
    }));
  };
}

module.exports = configureSocketio;
module.exports.default = configureSocketio;
module.exports.SOCKET_KEY = socketKey;


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Channel {
  constructor (connections = [], data = null) {
    this.connections = connections;
    this.data = data;
  }

  get length () {
    return this.connections.length;
  }

  leave (...connections) {
    connections.forEach(current => {
      if (typeof current === 'function') {
        return this.leave(...this.connections.filter(current));
      }

      const index = this.connections.indexOf(current);

      if (index !== -1) {
        this.connections.splice(index, 1);
      }
    });

    return this;
  }

  join (...connections) {
    connections.forEach(connection => {
      if (this.connections.indexOf(connection) === -1) {
        this.connections.push(connection);
      }
    });

    return this;
  }

  filter (fn) {
    return new Channel(this.connections.filter(fn), this.data);
  }

  send (data) {
    return new Channel(this.connections, data);
  }
}

module.exports = Channel;


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Channel = __webpack_require__(/*! ./base */ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js");

function collectConnections (children) {
  const mappings = new WeakMap();
  const connections = [];

  children.forEach(channel => {
    channel.connections.forEach(connection => {
      if (!mappings.has(connection)) {
        connections.push(connection);
        mappings.set(connection, channel.data);
      }
    });
  });

  return { connections, mappings };
}

class CombinedChannel extends Channel {
  constructor (children, data = null) {
    const { mappings, connections } = collectConnections(children);

    super(connections, data);

    this.children = children;
    this.mappings = mappings;
  }

  refresh () {
    const collected = collectConnections(this.children);

    return Object.assign(this, collected);
  }

  _callChildren (method, connections) {
    this.children.forEach(child => child[method](...connections));
    this.refresh();

    return this;
  }

  leave (...connections) {
    return this._callChildren('leave', connections);
  }

  join (...connections) {
    return this._callChildren('join', connections);
  }

  dataFor (connection) {
    return this.mappings.get(connection);
  }
}

module.exports = CombinedChannel;


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/transport-commons/channels');
const { get, compact, flattenDeep, noop } = __webpack_require__(/*! lodash */ "lodash");
const CombinedChannel = __webpack_require__(/*! ./channel/combined */ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js");
const { channelMixin, publishMixin, keys } = __webpack_require__(/*! ./mixins */ "./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js");

const { CHANNELS, PUBLISHERS, ALL_EVENTS } = keys;

function channels () {
  return app => {
    if (typeof app.channel === 'function' && typeof app.publish === 'function') {
      return;
    }

    Object.assign(app, channelMixin(), publishMixin());
    Object.defineProperty(app, 'channels', {
      get () {
        return Object.keys(this[CHANNELS]);
      }
    });

    app.mixins.push(function (service, path) {
      if (typeof service.publish === 'function' || !service._serviceEvents) {
        return;
      }

      Object.assign(service, publishMixin());

      service._serviceEvents.forEach(event => {
        service.on(event, function (data, hook) {
          if (!hook) {
            // Fake hook for custom events
            hook = { path, service, app, result: data };
          }

          debug('Publishing event', event, hook.path);

          const servicePublishers = service[PUBLISHERS];
          const appPublishers = app[PUBLISHERS];
          // This will return the first publisher list that is not empty
          // In the following precedence
          const callback = [
            // 1. Service publisher for a specific event
            get(servicePublishers, event),
            // 2. Service publisher for all events
            get(servicePublishers, ALL_EVENTS),
            // 3. App publishers for a specific event
            get(appPublishers, event),
            // 4. App publishers for all events
            get(appPublishers, ALL_EVENTS)
          ].find(current => typeof current === 'function') || noop;

          Promise.resolve(callback(data, hook)).then(result => {
            if (!result) {
              return;
            }

            const results = Array.isArray(result) ? compact(flattenDeep(result)) : [ result ];
            const channel = new CombinedChannel(results);

            if (channel && channel.length > 0) {
              app.emit('publish', event, channel, hook, data);
            } else {
              debug('No connections to publish to');
            }
          });
        });
      });
    });
  };
}

channels.keys = keys;

module.exports = channels;


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/channels/mixins.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/transport-commons:channels/mixins');
const Channel = __webpack_require__(/*! ./channel/base */ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/base.js");
const CombinedChannel = __webpack_require__(/*! ./channel/combined */ "./node_modules/@feathersjs/transport-commons/lib/channels/channel/combined.js");

const PUBLISHERS = Symbol('@feathersjs/transport-commons/publishers');
const CHANNELS = Symbol('@feathersjs/transport-commons/channels');
const ALL_EVENTS = Symbol('@feathersjs/transport-commons/all-events');

exports.keys = {
  PUBLISHERS,
  CHANNELS,
  ALL_EVENTS
};

exports.channelMixin = function channelMixin () {
  return {
    [CHANNELS]: {},

    channel (...names) {
      debug('Returning channels', names);

      if (names.length === 0) {
        throw new Error('app.channel needs at least one channel name');
      }

      if (names.length === 1) {
        const name = names[0];

        if (Array.isArray(name)) {
          return this.channel(...name);
        }

        return this[CHANNELS][name] ||
          (this[CHANNELS][name] = new Channel());
      }

      const channels = names.map(name => this.channel(name));

      return new CombinedChannel(channels);
    }
  };
};

exports.publishMixin = function publishMixin () {
  return {
    [PUBLISHERS]: {},

    publish (event, callback) {
      debug('Registering publisher', event);

      if (!callback && typeof event === 'function') {
        callback = event;
        event = ALL_EVENTS;
      }

      if (this._serviceEvents && event !== ALL_EVENTS && this._serviceEvents.indexOf(event) === -1) {
        throw new Error(`'${event}' is not a valid service event`);
      }

      const publishers = this[PUBLISHERS];

      publishers[event] = callback;

      return this;
    }
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const socket = __webpack_require__(/*! ./socket */ "./node_modules/@feathersjs/transport-commons/lib/socket/index.js");
const routing = __webpack_require__(/*! ./routing */ "./node_modules/@feathersjs/transport-commons/lib/routing.js");
const channels = __webpack_require__(/*! ./channels */ "./node_modules/@feathersjs/transport-commons/lib/channels/index.js");

module.exports = { socket, routing, channels };


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/routing.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/routing.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Router = __webpack_require__(/*! radix-router */ "radix-router");
const { stripSlashes } = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/commons.js");
const ROUTER = Symbol('@feathersjs/transport-commons/router');

module.exports = function () {
  return app => {
    if (typeof app.lookup === 'function') {
      return;
    }

    const router = new Router();

    Object.assign(app, {
      [ROUTER]: router,
      lookup (path) {
        return this[ROUTER].lookup(stripSlashes(path));
      }
    });

    // Add a mixin that registers a service on the router
    app.mixins.push((service, path) => {
      app[ROUTER].insert({ path, service });
      app[ROUTER].insert({
        path: `${path}/:__id`,
        service
      });
    });
  };
};

module.exports.ROUTER = ROUTER;


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/socket/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/socket/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/transport-commons');

const channels = __webpack_require__(/*! ../channels */ "./node_modules/@feathersjs/transport-commons/lib/channels/index.js");
const routing = __webpack_require__(/*! ../routing */ "./node_modules/@feathersjs/transport-commons/lib/routing.js");

const { getDispatcher, runMethod } = __webpack_require__(/*! ./utils */ "./node_modules/@feathersjs/transport-commons/lib/socket/utils.js");

module.exports = function ({ done, emit, socketKey, getParams }) {
  return app => {
    app.configure(channels());
    app.configure(routing());

    app.on('publish', getDispatcher(emit, socketKey));

    // `connection` event
    done.then(provider => provider.on('connection', socket =>
      app.emit('connection', getParams(socket)))
    );

    // `socket.emit('methodName', 'serviceName', ...args)` handlers
    done.then(provider => provider.on('connection', socket => {
      for (let method of app.methods) {
        socket.on(method, (...args) => {
          const path = args.shift();

          debug(`Got '${method}' call for service '${path}'`);
          runMethod(app, getParams(socket), path, method, args);
        });
      }
    }));

    // Legacy `socket.emit('serviceName::methodName', ...args)` handlers
    app.mixins.push((service, path) => done.then(provider => {
      provider.on('connection', socket => {
        const methods = app.methods.filter(current =>
          typeof service[current] === 'function'
        );

        for (let method of methods) {
          const eventName = `${path}::${method}`;

          socket.on(eventName, (...args) => {
            debug(`Got legacy method call '${eventName}'`);
            runMethod(app, getParams(socket), path, method, args);
          });
        }
      });
    }));
  };
};


/***/ }),

/***/ "./node_modules/@feathersjs/transport-commons/lib/socket/utils.js":
/*!************************************************************************!*\
  !*** ./node_modules/@feathersjs/transport-commons/lib/socket/utils.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const errors = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");
const debug = __webpack_require__(/*! debug */ "debug")('@feathersjs/transport-commons');

const paramsPositions = exports.paramsPositions = {
  find: 0,
  get: 1,
  remove: 1,
  create: 1,
  update: 2,
  patch: 2
};

const normalizeError = exports.normalizeError = function (e) {
  const hasToJSON = typeof e.toJSON === 'function';
  const result = hasToJSON ? e.toJSON() : {};

  if (!hasToJSON) {
    Object.getOwnPropertyNames(e).forEach(key => {
      result[key] = e[key];
    });
  }

  if (false) {}

  delete result.hook;

  return result;
};

exports.getDispatcher = function (emit, socketKey) {
  return function (event, channel, hook, data) {
    debug(`Dispatching '${event}' to ${channel.length} connections`);

    channel.connections.forEach(connection => {
      // The reference between connection and socket
      // is set in `app.setup`
      const socket = connection[socketKey];

      if (socket) {
        const eventName = `${hook.path || ''} ${event}`.trim();

        let result = channel.dataFor(connection) || hook.dispatch || hook.result;

        // If we are getting events from an array, try to get the individual
        // item to dispatch from the correct index.
        if (Array.isArray(hook.result) && Array.isArray(result)) {
          result = result[hook.result.indexOf(data)];
        }

        debug(`Dispatching '${eventName}' to Socket ${socket.id} with`, result);

        socket[emit](eventName, result);
      }
    });
  };
};

exports.runMethod = function (app, connection, path, method, args) {
  const trace = `method '${method}' on service '${path}'`;
  const methodArgs = args.slice(0);
  const callback = typeof methodArgs[methodArgs.length - 1] === 'function'
    ? methodArgs.pop() : function () {};

  debug(`Running ${trace}`, connection, args);

  // A wrapper function that runs the method and returns a promise
  const _run = () => {
    const lookup = app.lookup(path);

    // No valid service was found, return a 404
    // just like a REST route would
    if (lookup === null) {
      return Promise.reject(new errors.NotFound(`Service '${path}' not found`));
    }

    const { service, params: route = {} } = lookup;

    // Only service methods are allowed
    if (paramsPositions[method] === undefined || typeof service[method] !== 'function') {
      return Promise.reject(new errors.MethodNotAllowed(`Method '${method}' not allowed on service '${path}'`));
    }

    const position = paramsPositions[method];
    const query = methodArgs[position] || {};
    // `params` have to be re-mapped to the query
    // and added with the route
    const params = Object.assign({ query, route, connection }, connection);

    methodArgs[position] = params;

    return service[method](...methodArgs, true);
  };

  // Run and map to the callback that is being called for Socket calls
  _run().then(hook => {
    const result = hook.dispatch || hook.result;

    debug(`Returned successfully ${trace}`, result);
    callback(null, result);
  }).catch(hook => {
    const error = hook.type === 'error' ? hook.error : hook;

    debug(`Error in ${trace}`, error);
    callback(normalizeError(error));
  });
};


/***/ }),

/***/ "./src/channels.js":
/*!*************************!*\
  !*** ./src/channels.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = channels;

function channels(app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    app.channel('anonymous').join(connection);
  });
  app.on('login', (authResult, {
    connection
  }) => {
    if (connection) {
      // Obtain the logged in user from the connection
      const user = connection.user; // The connection is no longer anonymous, remove it

      app.channel('anonymous').leave(connection); // Add it to the authenticated user channel

      app.channel('authenticated').join(connection); // Channels can be named anything and joined on any condition
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }
      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));
      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  }); // eslint-disable-next-line no-unused-vars

  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`
    // TODO: Restrict events to only authenticated users?
    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  }); // Here you can also add service specific event publishers
  // e..g the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
}

/***/ }),

/***/ "./src/core/kafka.js":
/*!***************************!*\
  !*** ./src/core/kafka.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = send;
exports.loadTopics = loadTopics;
exports.queryTopics = queryTopics;
exports.Processor = exports.asTopic = exports.producer = exports.client = void 0;

var _kafkaNode = __webpack_require__(/*! kafka-node */ "kafka-node");

var _msgpack = _interopRequireDefault(__webpack_require__(/*! msgpack */ "msgpack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const client = new _kafkaNode.Client();
exports.client = client;
const producer = new _kafkaNode.HighLevelProducer(client);
exports.producer = producer;
producer.on('ready', () => {
  console.log('[+] Producer is now ready.');
});
producer.on('error', console.error);

function send(topic, payload) {
  return new Promise((resolve, reject) => {
    const payloads = [{
      topic,
      messages: _msgpack.default.pack(payload)
    }];
    producer.send(payloads, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
} // Load all topics


function loadTopics() {
  return new Promise((resolve, reject) => {
    client.once('connect', () => {
      client.loadMetadataForTopics([], (err, results) => {
        if (err) return reject(err);
        resolve(Object.keys(results[1].metadata));
      });
    });
  });
}

const asTopic = topic => ({
  topic,
  offset: 0
}); // Retrieves a list of topics that matches the pattern


exports.asTopic = asTopic;

function queryTopics(_x) {
  return _queryTopics.apply(this, arguments);
}

function _queryTopics() {
  _queryTopics = _asyncToGenerator(function* (pattern) {
    const topics = yield loadTopics();

    if (!(pattern instanceof RegExp)) {
      pattern = new RegExp(pattern);
    }

    return topics.filter(x => pattern.test(x)).map(asTopic);
  });
  return _queryTopics.apply(this, arguments);
}

class Processor {
  constructor(_topic, onProcess, onError) {
    var _this = this;

    this.setup =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (topic) {
        const topics = yield queryTopics(topic);
        _this.consumer = new _kafkaNode.Consumer(client, topics, {
          autoCommit: true,
          encoding: 'buffer'
        });

        _this.consumer.on('message', _this.onMessage);

        _this.consumer.on('error', _this.onError);

        _this.consumer.on('offsetOutOfRange', _this.onError);
      });

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }();

    this.onMessage = (_ref2) => {
      let {
        topic,
        value
      } = _ref2,
          meta = _objectWithoutProperties(_ref2, ["topic", "value"]);

      this.onProcess(topic, _msgpack.default.unpack(value), meta);
    };

    if (onProcess) this.onProcess = onProcess;
    if (onError) this.onError = onProcess;
    this.setup(_topic);
  }

  onProcess() {
    console.log('[!] Please override onProcess()');
  }

  onError(error) {
    console.error('[!] Kafka Error:', error);
  }

}

exports.Processor = Processor;

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(__webpack_require__(/*! ./logger */ "./src/hooks/logger.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const before = {
  all: [(0, _logger.default)()]
};
const after = {
  all: [(0, _logger.default)()]
};
const error = {
  all: [(0, _logger.default)()]
};
var _default = {
  before,
  after,
  error
};
exports.default = _default;

/***/ }),

/***/ "./src/hooks/logger.js":
/*!*****************************!*\
  !*** ./src/hooks/logger.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(__webpack_require__(/*! winston */ "winston"));

var _config = __webpack_require__(/*! config */ "config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const logger = _winston.default.createLogger({
  level: _config.loglevel,
  format: _winston.default.format.json(),
  transports: [new _winston.default.transports.Console({
    format: _winston.default.format.simple()
  })]
});

const Logger = () =>
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (ctx) {
    logger.debug(`${ctx.type} ${ctx.path}/${ctx.method}`);

    if (typeof ctx.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(ctx, null, '  '));
    }

    if (ctx.error) {
      logger.error(ctx.error);
    }
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = Logger;
exports.default = _default;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _serveFavicon = _interopRequireDefault(__webpack_require__(/*! serve-favicon */ "serve-favicon"));

var _compression = _interopRequireDefault(__webpack_require__(/*! compression */ "compression"));

var _cors = _interopRequireDefault(__webpack_require__(/*! cors */ "cors"));

var _helmet = _interopRequireDefault(__webpack_require__(/*! helmet */ "helmet"));

var _winston = _interopRequireDefault(__webpack_require__(/*! winston */ "winston"));

var _feathers = _interopRequireDefault(__webpack_require__(/*! @feathersjs/feathers */ "./node_modules/@feathersjs/feathers/lib/index.js"));

var _configuration = _interopRequireDefault(__webpack_require__(/*! @feathersjs/configuration */ "./node_modules/@feathersjs/configuration/lib/index.js"));

var _express = _interopRequireDefault(__webpack_require__(/*! @feathersjs/express */ "./node_modules/@feathersjs/express/lib/index.js"));

var _socketio = _interopRequireDefault(__webpack_require__(/*! @feathersjs/socketio */ "./node_modules/@feathersjs/socketio/lib/index.js"));

var _middleware = _interopRequireDefault(__webpack_require__(/*! ./middleware */ "./src/middleware/index.js"));

var _services = _interopRequireDefault(__webpack_require__(/*! ./services */ "./src/services/index.js"));

var _hooks = _interopRequireDefault(__webpack_require__(/*! ./hooks */ "./src/hooks/index.js"));

var _channels = _interopRequireDefault(__webpack_require__(/*! ./channels */ "./src/channels.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)((0, _feathers.default)());
app.configure((0, _configuration.default)());
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _compression.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _serveFavicon.default)(_path.default.join(app.get('public'), 'favicon.ico')));
app.use('/', _express.default.static(app.get('public')));
app.configure(_express.default.rest());
app.configure((0, _socketio.default)());
app.configure(_middleware.default);
app.configure(_services.default);
app.configure(_channels.default);
app.use(_express.default.notFound());
app.use(_express.default.errorHandler({
  logger: _winston.default
}));
app.hooks(_hooks.default);
const PORT = app.get('port');
app.listen(PORT).on('listening', () => {
  console.log('💖', `The Axi Engine is now listening on Port ${PORT}!`);
});

function shutdown(code) {
  console.log('[!] Shutting Down:', code);
  process.exit();
}

const shutdownEvents = ['SIGINT', 'SIGQUIT', 'SIGTERM', 'SIGHUP', 'SIGSTP'];
shutdownEvents.forEach(event => process.on(event, shutdown));
var _default = app;
exports.default = _default;

/***/ }),

/***/ "./src/middleware/index.js":
/*!*********************************!*\
  !*** ./src/middleware/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-unused-vars
module.exports = function (app) {// Add your custom middleware here. Remember, that
  // in Express the order matters
};

/***/ }),

/***/ "./src/models/index.js":
/*!*****************************!*\
  !*** ./src/models/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(__webpack_require__(/*! sequelize */ "sequelize"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sequelize = new _sequelize.default('sequelize', '', '', {
  dialect: 'sqlite',
  storage: _path.default.join(__dirname, 'db.sqlite'),
  logging: false,
  operatorsAliases: _sequelize.default.Op,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var _default = sequelize;
exports.default = _default;

/***/ }),

/***/ "./src/models/ticket.js":
/*!******************************!*\
  !*** ./src/models/ticket.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(__webpack_require__(/*! sequelize */ "sequelize"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "./src/models/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Ticket = _index.default.define('ticket', {
  buyer: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  seat: {
    type: _sequelize.default.STRING,
    allowNull: false,
    validate: {
      isSeat(seat) {
        console.log('[+] Seat Validation:', seat);
        return true;
      }

    }
  }
});

var _default = Ticket;
exports.default = _default;

/***/ }),

/***/ "./src/services/index.js":
/*!*******************************!*\
  !*** ./src/services/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _seating = _interopRequireDefault(__webpack_require__(/*! ./seating */ "./src/services/seating.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

class HelloService {
  find(params) {
    return _asyncToGenerator(function* () {
      return {
        status: 200,
        data: 'Hello, World!'
      };
    })();
  }

}

function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (app) {
    app.use('/hello', new HelloService());
    app.use('/seating', new _seating.default());
  });
  return _ref.apply(this, arguments);
}

/***/ }),

/***/ "./src/services/seating.js":
/*!*********************************!*\
  !*** ./src/services/seating.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errors = _interopRequireDefault(__webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js"));

var _ticket = _interopRequireDefault(__webpack_require__(/*! ../models/ticket */ "./src/models/ticket.js"));

var _kafka = __webpack_require__(/*! ../core/kafka */ "./src/core/kafka.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

const TICKET_ADD = 'queuing.ticket.add';

class SeatingService {
  constructor() {
    var _this = this;

    this.process =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (topic, payload) {
        console.log('[?] Incoming Event:', topic, '=>', payload);

        if (topic === TICKET_ADD) {
          _this.addTicket(payload);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }

  setup(app) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _ticket.default.sync();
      _this2.app = app;
      _this2.processor = new _kafka.Processor('queuing.ticket.*', _this2.process);
    })();
  }

  find(params) {
    return _asyncToGenerator(function* () {
      const seats = yield _ticket.default.findAll();
      return {
        seats
      };
    })();
  }

  get(seat, params) {
    return _asyncToGenerator(function* () {
      const ticket = yield _ticket.default.findOne({
        where: {
          seat
        }
      });

      if (!ticket) {
        throw new _errors.default.NotFound(`Seat ${seat} is currently empty.`);
      }

      return {
        status: 'BOOKED',
        data: ticket
      };
    })();
  }

  create({
    seat,
    buyer
  }) {
    return _asyncToGenerator(function* () {
      const ticket = yield _ticket.default.findOne({
        where: {
          seat
        }
      });

      if (!seat || !buyer) {
        throw new _errors.default.BadRequest('The seat and buyer fields are required.');
      }

      if (ticket) {
        throw new _errors.default.Unprocessable('This seat had been taken.');
      }

      yield (0, _kafka.send)(TICKET_ADD, {
        buyer,
        seat
      });
      return {
        status: 'PROCESSING',
        seat,
        buyer
      };
    })();
  }

  addTicket({
    seat,
    buyer
  }) {
    return _asyncToGenerator(function* () {
      const ticket = yield _ticket.default.findOne({
        where: {
          seat
        }
      });

      if (ticket) {
        console.error('[!!] Seat', seat, 'had been taken by', ticket.buyer);
        return;
      }

      yield _ticket.default.create({
        seat,
        buyer
      });
      console.log('[+] Seat', seat, 'has been bought by', buyer);
    })();
  }

}

exports.default = SeatingService;

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "kafka-node":
/*!*****************************!*\
  !*** external "kafka-node" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("kafka-node");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "msgpack":
/*!**************************!*\
  !*** external "msgpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("msgpack");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "radix-router":
/*!*******************************!*\
  !*** external "radix-router" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("radix-router");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serve-favicon");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),

/***/ "uberproto":
/*!****************************!*\
  !*** external "uberproto" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uberproto");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
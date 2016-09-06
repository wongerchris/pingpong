/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "197d53b8db0f225f6a11"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\n__webpack_require__(1);\n\nvar _game = __webpack_require__(10);\n\nvar _game2 = _interopRequireDefault(_game);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// game instance\nvar game = new _game2.default();\nvar fps = 30;\nfunction gameLoop() {\n    game.drawLine();\n    game.render();\n    setTimeout(gameLoop, fps);\n}\ngameLoop();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOzs7Ozs7QUFHQTtBQUNBLElBQUksT0FBTyxvQkFBWDtBQUNBLElBQU0sTUFBTSxFQUFaO0FBQ0EsU0FBUyxRQUFULEdBQW9CO0FBQ2hCLFNBQUssUUFBTDtBQUNBLFNBQUssTUFBTDtBQUNGLGVBQVcsUUFBWCxFQUFxQixHQUFyQjtBQUNEO0FBQ0QiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9nYW1lLmNzcyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5cbi8vIGdhbWUgaW5zdGFuY2VcbnZhciBnYW1lID0gbmV3IEdhbWUoKTtcbmNvbnN0IGZwcyA9IDMwO1xuZnVuY3Rpb24gZ2FtZUxvb3AoKSB7XG4gICAgZ2FtZS5kcmF3TGluZSgpO1xuICAgIGdhbWUucmVuZGVyKCk7IFxuICBzZXRUaW1lb3V0KGdhbWVMb29wLCBmcHMpOyAgXG59XG5nYW1lTG9vcCgpO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(2);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(9)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(2, function() {\n\t\t\tvar newContent = __webpack_require__(2);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/YmM3YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUFnRjtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9nYW1lLmNzc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(3)();\n// imports\n\n\n// module\nexports.push([module.id, \"/* http://meyerweb.com/eric/tools/css/reset/\\n   v2.0 | 20110126\\n   License: none (public domain)\\n*/\\n\\nhtml, body, div, span, applet, object, iframe,\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\na, abbr, acronym, address, big, cite, code,\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\nsmall, strike, strong, sub, sup, tt, var,\\nb, u, i, center,\\ndl, dt, dd, ol, ul, li,\\nfieldset, form, label, legend,\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\narticle, aside, canvas, details, embed,\\nfigure, figcaption, footer, header, hgroup,\\nmenu, nav, output, ruby, section, summary,\\ntime, mark, audio, video {\\n   margin: 0;\\n   padding: 0;\\n   border: 0;\\n   font-size: 100%;\\n   font: inherit;\\n   vertical-align: baseline;\\n}\\n/* HTML5 display-role reset for older browsers */\\narticle, aside, details, figcaption, figure,\\nfooter, header, hgroup, menu, nav, section {\\n   display: block;\\n}\\nbody {\\n   line-height: 1;\\n}\\nol, ul {\\n   list-style: none;\\n}\\nblockquote, q {\\n   quotes: none;\\n}\\nblockquote:before, blockquote:after,\\nq:before, q:after {\\n   content: '';\\n   content: none;\\n}\\ntable {\\n   border-collapse: collapse;\\n   border-spacing: 0;\\n}\\n\\n/* Game Styles */\\n\\n@font-face {\\n    font-family: 'PressStart2P Web';\\n    src: url(\" + __webpack_require__(4) + \");\\n    src: url(\" + __webpack_require__(4) + \"?#iefix) format('embedded-opentype'),\\n         url(\" + __webpack_require__(5) + \") format('woff2'),\\n         url(\" + __webpack_require__(6) + \") format('woff'),\\n         url(\" + __webpack_require__(7) + \") format('truetype'),\\n         url(\" + __webpack_require__(8) + \"#press_start_2pregular) format('svg');\\n    font-weight: normal;\\n    font-style: normal;\\n}\\nbody {\\n   font-family: 'PressStart2P Web', monospace;\\n   margin: 0 auto;\\n   text-align: center;\\n   background-color: #234059;\\n}\\nh1 {\\n   margin-top: 20px;\\n   color: #fff;\\n   font-size: 50px;\\n}\\n#game {\\n   display: block;\\n   height: 500px;\\n   margin: 20px auto;\\n   width: 800px;\\n   background-color:#006600;\\n   border: 10px solid rgba(0,0,0,.5);\\n   border-radius: 30px;\\n}\\n.players {\\n   display: inline-flex;\\n   justify-content: space-between;\\n   text-align: center;\\n   width: 800px;\\n   color: #fff;\\n   font-size: 30px;\\n}\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5jc3M/NDMxMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOzs7QUFHQTtBQUNBLDRuQkFBNG5CLGVBQWUsZ0JBQWdCLGVBQWUscUJBQXFCLG1CQUFtQiw4QkFBOEIsR0FBRywrSUFBK0ksb0JBQW9CLEdBQUcsUUFBUSxvQkFBb0IsR0FBRyxVQUFVLHNCQUFzQixHQUFHLGlCQUFpQixrQkFBa0IsR0FBRywyREFBMkQsaUJBQWlCLG1CQUFtQixHQUFHLFNBQVMsK0JBQStCLHVCQUF1QixHQUFHLHFDQUFxQyxzQ0FBc0MsK0NBQXFFLG9XQUFxZCwwQkFBMEIseUJBQXlCLEdBQUcsUUFBUSxnREFBZ0Qsb0JBQW9CLHdCQUF3QiwrQkFBK0IsR0FBRyxNQUFNLHNCQUFzQixpQkFBaUIscUJBQXFCLEdBQUcsU0FBUyxvQkFBb0IsbUJBQW1CLHVCQUF1QixrQkFBa0IsOEJBQThCLHVDQUF1Qyx5QkFBeUIsR0FBRyxZQUFZLDBCQUEwQixvQ0FBb0Msd0JBQXdCLGtCQUFrQixpQkFBaUIscUJBQXFCLEdBQUc7O0FBRWwyRSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0L1xcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCxcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG4gICBtYXJnaW46IDA7XFxuICAgcGFkZGluZzogMDtcXG4gICBib3JkZXI6IDA7XFxuICAgZm9udC1zaXplOiAxMDAlO1xcbiAgIGZvbnQ6IGluaGVyaXQ7XFxuICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSxcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcbiAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG4gICBsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG4gICBsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG4gICBxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG4gICBjb250ZW50OiAnJztcXG4gICBjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuLyogR2FtZSBTdHlsZXMgKi9cXG5cXG5AZm9udC1mYWNlIHtcXG4gICAgZm9udC1mYW1pbHk6ICdQcmVzc1N0YXJ0MlAgV2ViJztcXG4gICAgc3JjOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQuZW90XCIpICsgXCIpO1xcbiAgICBzcmM6IHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcIikgKyBcIj8jaWVmaXgpIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4gICAgICAgICB1cmwoXCIgKyByZXF1aXJlKFwiLi4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcIikgKyBcIikgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXCIpICsgXCIpIGZvcm1hdCgnd29mZicpLFxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcIikgKyBcIikgZm9ybWF0KCd0cnVldHlwZScpLFxcbiAgICAgICAgIHVybChcIiArIHJlcXVpcmUoXCIuLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcIikgKyBcIiNwcmVzc19zdGFydF8ycHJlZ3VsYXIpIGZvcm1hdCgnc3ZnJyk7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuYm9keSB7XFxuICAgZm9udC1mYW1pbHk6ICdQcmVzc1N0YXJ0MlAgV2ViJywgbW9ub3NwYWNlO1xcbiAgIG1hcmdpbjogMCBhdXRvO1xcbiAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjM0MDU5O1xcbn1cXG5oMSB7XFxuICAgbWFyZ2luLXRvcDogMjBweDtcXG4gICBjb2xvcjogI2ZmZjtcXG4gICBmb250LXNpemU6IDUwcHg7XFxufVxcbiNnYW1lIHtcXG4gICBkaXNwbGF5OiBibG9jaztcXG4gICBoZWlnaHQ6IDUwMHB4O1xcbiAgIG1hcmdpbjogMjBweCBhdXRvO1xcbiAgIHdpZHRoOiA4MDBweDtcXG4gICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDY2MDA7XFxuICAgYm9yZGVyOiAxMHB4IHNvbGlkIHJnYmEoMCwwLDAsLjUpO1xcbiAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxufVxcbi5wbGF5ZXJzIHtcXG4gICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgIHdpZHRoOiA4MDBweDtcXG4gICBjb2xvcjogI2ZmZjtcXG4gICBmb250LXNpemU6IDMwcHg7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9zcmMvZ2FtZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.eot\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3Q/MWUwYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LmVvdFwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5lb3RcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff2\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmMj9kOTUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIvZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZm9udHMvcHJlc3NzdGFydDJwLXdlYmZvbnQud29mZjJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.woff\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmPzEyMGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC53b2ZmXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LndvZmZcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.ttf\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGY/NTYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnR0ZlwiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC50dGZcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"/fonts/pressstart2p-webfont.svg\";//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmc/ZjRjYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiL2ZvbnRzL3ByZXNzc3RhcnQycC13ZWJmb250LnN2Z1wiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9mb250cy9wcmVzc3N0YXJ0MnAtd2ViZm9udC5zdmdcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _board = __webpack_require__(11);\n\nvar _board2 = _interopRequireDefault(_board);\n\nvar _paddle = __webpack_require__(12);\n\nvar _paddle2 = _interopRequireDefault(_paddle);\n\nvar _ball = __webpack_require__(13);\n\nvar _ball2 = _interopRequireDefault(_ball);\n\nvar _scoreboard = __webpack_require__(14);\n\nvar _scoreboard2 = _interopRequireDefault(_scoreboard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar gap = 10;\n\nvar p1Keys = {\n   up: 38,\n   down: 40\n};\nvar p2Keys = {\n   up: 65,\n   down: 90\n};\n\nvar Game = function () {\n   function Game() {\n      _classCallCheck(this, Game);\n\n      var canvas = document.getElementById('game');\n      this.context = canvas.getContext('2d');\n      this.width = canvas.width;\n      this.height = canvas.height;\n      this.scorePosition1 = this.width / 4;\n      this.scorePosition2 = this.width - this.width / 4;\n      this.context.fillStyle = 'white';\n      this.middleLine = new _board2.default(this.width, this.height);\n      this.player1 = new _paddle2.default(this.height, gap, p2Keys);\n      this.player2 = new _paddle2.default(this.height, this.width - 4 - gap, p1Keys);\n      this.ball1 = new _ball2.default(this.width, this.height);\n      this.scoreBoard1 = new _scoreboard2.default(this.scorePosition1, 18, 0);\n      this.scoreBoard2 = new _scoreboard2.default(this.scorePosition2, 18, 0);\n   }\n\n   _createClass(Game, [{\n      key: 'drawLine',\n      value: function drawLine() {}\n   }, {\n      key: 'ballRest',\n      value: function ballRest() {\n         this.ball1.x = this.width / 2;\n         this.ball1.y = this.height / 2;\n      }\n   }, {\n      key: 'goal',\n      value: function goal() {\n         var hitRight = this.ball1.x >= this.width;\n         var hitLeft = this.ball1.x <= 0;\n         var score1 = this.scoreBoard1;\n         var score2 = this.scoreBoard2;\n\n         if (hitLeft) {\n            score2.score++;\n            this.ballRest();\n         } else if (hitRight) {\n            score1.score++;\n            this.ballRest();\n         }\n      }\n   }, {\n      key: 'render',\n      value: function render() {\n         this.goal();\n         this.middleLine.render(this.context);\n         this.context.fillStyle = \"#234059\";\n         this.player1.render(this.context);\n         this.player2.render(this.context);\n         this.context.fillStyle = \"#cc0052\";\n         this.scoreBoard1.render(this.context);\n         this.scoreBoard2.render(this.context);\n         this.context.fillStyle = \"#99CC00\";\n         this.ball1.render(this.context, this.player1, this.player2);\n      }\n   }]);\n\n   return Game;\n}();\n\nexports.default = Game;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS5qcz9jN2VmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBR0EsSUFBTSxNQUFNLEVBQVo7O0FBRUEsSUFBTSxTQUFRO0FBQ1gsT0FBSSxFQURPO0FBRVgsU0FBTTtBQUZLLENBQWQ7QUFJQSxJQUFNLFNBQVE7QUFDWCxPQUFJLEVBRE87QUFFWCxTQUFNO0FBRkssQ0FBZDs7SUFPcUIsSTtBQUNsQixtQkFBYztBQUFBOztBQUNYLFVBQU0sU0FBUyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBZjtBQUNBLFdBQUssT0FBTCxHQUFlLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFmO0FBQ0EsV0FBSyxLQUFMLEdBQWEsT0FBTyxLQUFwQjtBQUNBLFdBQUssTUFBTCxHQUFjLE9BQU8sTUFBckI7QUFDQSxXQUFLLGNBQUwsR0FBc0IsS0FBSyxLQUFMLEdBQVcsQ0FBakM7QUFDQSxXQUFLLGNBQUwsR0FBc0IsS0FBSyxLQUFMLEdBQWMsS0FBSyxLQUFMLEdBQVcsQ0FBL0M7QUFDQSxXQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLE9BQXpCO0FBQ0EsV0FBSyxVQUFMLEdBQWtCLG9CQUFVLEtBQUssS0FBZixFQUFzQixLQUFLLE1BQTNCLENBQWxCO0FBQ0EsV0FBSyxPQUFMLEdBQWUscUJBQVcsS0FBSyxNQUFoQixFQUF3QixHQUF4QixFQUE2QixNQUE3QixDQUFmO0FBQ0EsV0FBSyxPQUFMLEdBQWUscUJBQVcsS0FBSyxNQUFoQixFQUF3QixLQUFLLEtBQUwsR0FBYSxDQUFiLEdBQWlCLEdBQXpDLEVBQThDLE1BQTlDLENBQWY7QUFDQSxXQUFLLEtBQUwsR0FBYSxtQkFBUyxLQUFLLEtBQWQsRUFBcUIsS0FBSyxNQUExQixDQUFiO0FBQ0EsV0FBSyxXQUFMLEdBQW1CLHlCQUFlLEtBQUssY0FBcEIsRUFBbUMsRUFBbkMsRUFBc0MsQ0FBdEMsQ0FBbkI7QUFDQSxXQUFLLFdBQUwsR0FBbUIseUJBQWUsS0FBSyxjQUFwQixFQUFtQyxFQUFuQyxFQUFzQyxDQUF0QyxDQUFuQjtBQUVEOzs7O2lDQUNXLENBQ1g7OztpQ0FFVTtBQUNULGNBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxLQUFLLEtBQUwsR0FBVyxDQUExQjtBQUNBLGNBQUssS0FBTCxDQUFXLENBQVgsR0FBZSxLQUFLLE1BQUwsR0FBWSxDQUEzQjtBQUNEOzs7NkJBRUs7QUFDSixhQUFNLFdBQVcsS0FBSyxLQUFMLENBQVcsQ0FBWCxJQUFnQixLQUFLLEtBQXRDO0FBQ0EsYUFBTSxVQUFVLEtBQUssS0FBTCxDQUFXLENBQVgsSUFBZ0IsQ0FBaEM7QUFDQSxhQUFNLFNBQVMsS0FBSyxXQUFwQjtBQUNBLGFBQU0sU0FBUyxLQUFLLFdBQXBCOztBQUVBLGFBQUcsT0FBSCxFQUFXO0FBQ1QsbUJBQU8sS0FBUDtBQUNBLGlCQUFLLFFBQUw7QUFFRCxVQUpELE1BSU0sSUFBRyxRQUFILEVBQVk7QUFDaEIsbUJBQU8sS0FBUDtBQUNBLGlCQUFLLFFBQUw7QUFDRDtBQUNGOzs7K0JBRVM7QUFDUixjQUFLLElBQUw7QUFDQSxjQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBSyxPQUE1QjtBQUNBLGNBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsU0FBekI7QUFDQSxjQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBekI7QUFDQSxjQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBekI7QUFDQSxjQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLFNBQXpCO0FBQ0EsY0FBSyxXQUFMLENBQWlCLE1BQWpCLENBQXdCLEtBQUssT0FBN0I7QUFDQSxjQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FBd0IsS0FBSyxPQUE3QjtBQUNBLGNBQUssT0FBTCxDQUFhLFNBQWIsR0FBeUIsU0FBekI7QUFDQSxjQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQUssT0FBdkIsRUFBZ0MsS0FBSyxPQUFyQyxFQUE4QyxLQUFLLE9BQW5EO0FBRUY7Ozs7OztrQkFyRGlCLEkiLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmQgZnJvbSAnLi9ib2FyZCc7XG5pbXBvcnQgUGFkZGxlIGZyb20gJy4vcGFkZGxlJztcbmltcG9ydCBCYWxsIGZyb20gJy4vYmFsbCc7XG5pbXBvcnQgU2NvcmVCb2FyZCBmcm9tICcuL3Njb3JlYm9hcmQnO1xuXG5cbmNvbnN0IGdhcCA9IDEwO1xuXG5jb25zdCBwMUtleXMgPXtcbiAgIHVwOiAzOCxcbiAgIGRvd246IDQwLFxufTtcbmNvbnN0IHAyS2V5cyA9e1xuICAgdXA6IDY1LFxuICAgZG93bjogOTAsXG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgICB0aGlzLnNjb3JlUG9zaXRpb24xID0gdGhpcy53aWR0aC80O1xuICAgICAgdGhpcy5zY29yZVBvc2l0aW9uMiA9IHRoaXMud2lkdGggLSAodGhpcy53aWR0aC80KTtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgdGhpcy5taWRkbGVMaW5lID0gbmV3IEJvYXJkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTsgXG4gICAgICB0aGlzLnBsYXllcjEgPSBuZXcgUGFkZGxlKHRoaXMuaGVpZ2h0LCBnYXAsIHAyS2V5cyk7XG4gICAgICB0aGlzLnBsYXllcjIgPSBuZXcgUGFkZGxlKHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoIC0gNCAtIGdhcCwgcDFLZXlzKTtcbiAgICAgIHRoaXMuYmFsbDEgPSBuZXcgQmFsbCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICB0aGlzLnNjb3JlQm9hcmQxID0gbmV3IFNjb3JlQm9hcmQodGhpcy5zY29yZVBvc2l0aW9uMSwxOCwwKTtcbiAgICAgIHRoaXMuc2NvcmVCb2FyZDIgPSBuZXcgU2NvcmVCb2FyZCh0aGlzLnNjb3JlUG9zaXRpb24yLDE4LDApO1xuICAgICAgXG4gICAgfVxuICAgICBkcmF3TGluZSgpIHsgXG4gICAgfVxuXG4gICAgYmFsbFJlc3QoKSB7XG4gICAgICB0aGlzLmJhbGwxLnggPSB0aGlzLndpZHRoLzI7XG4gICAgICB0aGlzLmJhbGwxLnkgPSB0aGlzLmhlaWdodC8yO1xuICAgIH1cblxuICAgIGdvYWwoKXtcbiAgICAgIGNvbnN0IGhpdFJpZ2h0ID0gdGhpcy5iYWxsMS54ID49IHRoaXMud2lkdGg7XG4gICAgICBjb25zdCBoaXRMZWZ0ID0gdGhpcy5iYWxsMS54IDw9IDA7XG4gICAgICBjb25zdCBzY29yZTEgPSB0aGlzLnNjb3JlQm9hcmQxO1xuICAgICAgY29uc3Qgc2NvcmUyID0gdGhpcy5zY29yZUJvYXJkMjtcbiAgICAgXG4gICAgICBpZihoaXRMZWZ0KXtcbiAgICAgICAgc2NvcmUyLnNjb3JlICsrO1xuICAgICAgICB0aGlzLmJhbGxSZXN0KCk7XG4gICAgICBcbiAgICAgIH1lbHNlIGlmKGhpdFJpZ2h0KXtcbiAgICAgICAgc2NvcmUxLnNjb3JlICsrO1xuICAgICAgICB0aGlzLmJhbGxSZXN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgIHJlbmRlcigpIHtcbiAgICAgIHRoaXMuZ29hbCgpO1xuICAgICAgdGhpcy5taWRkbGVMaW5lLnJlbmRlcih0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzIzNDA1OVwiO1xuICAgICAgdGhpcy5wbGF5ZXIxLnJlbmRlcih0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5wbGF5ZXIyLnJlbmRlcih0aGlzLmNvbnRleHQpO1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI2NjMDA1MlwiO1xuICAgICAgdGhpcy5zY29yZUJvYXJkMS5yZW5kZXIodGhpcy5jb250ZXh0KTtcbiAgICAgIHRoaXMuc2NvcmVCb2FyZDIucmVuZGVyKHRoaXMuY29udGV4dCk7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjOTlDQzAwXCI7XG4gICAgICB0aGlzLmJhbGwxLnJlbmRlcih0aGlzLmNvbnRleHQsIHRoaXMucGxheWVyMSwgdGhpcy5wbGF5ZXIyKTtcblxuICAgfVxufVxuXG5cblxuXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2dhbWUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Board = function () {\n    function Board(width, height) {\n        _classCallCheck(this, Board);\n\n        this.width = width;\n        this.height = height;\n    }\n\n    _createClass(Board, [{\n        key: \"drawLine\",\n        value: function drawLine(ctx) {\n            ctx.setLineDash([50, 0]);\n            ctx.beginPath();\n            ctx.moveTo(this.width / 2, 0);\n            ctx.lineTo(this.width / 2, this.height);\n            ctx.strokeStyle = \"black\";\n            ctx.stroke();\n        }\n    }, {\n        key: \"render\",\n        value: function render(ctx) {\n            ctx.clearRect(0, 0, this.width, this.height);\n            this.drawLine(ctx);\n        }\n    }]);\n\n    return Board;\n}();\n\nexports.default = Board;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYm9hcmQuanM/OGIyZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCLEs7QUFDakIsbUJBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjtBQUFBOztBQUN2QixhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsTUFBZDtBQUNIOzs7O2lDQUNRLEcsRUFBSztBQUNWLGdCQUFJLFdBQUosQ0FBZ0IsQ0FBQyxFQUFELEVBQUssQ0FBTCxDQUFoQjtBQUNBLGdCQUFJLFNBQUo7QUFDQSxnQkFBSSxNQUFKLENBQVcsS0FBSyxLQUFMLEdBQWEsQ0FBeEIsRUFBMkIsQ0FBM0I7QUFDQSxnQkFBSSxNQUFKLENBQVcsS0FBSyxLQUFMLEdBQWEsQ0FBeEIsRUFBMkIsS0FBSyxNQUFoQztBQUNBLGdCQUFJLFdBQUosR0FBa0IsT0FBbEI7QUFDQSxnQkFBSSxNQUFKO0FBQ0g7OzsrQkFFTSxHLEVBQUs7QUFDWixnQkFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixLQUFLLEtBQXpCLEVBQWdDLEtBQUssTUFBckM7QUFDQSxpQkFBSyxRQUFMLENBQWMsR0FBZDtBQUNDOzs7Ozs7a0JBakJnQixLIiwiZmlsZSI6IjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG4gICAgZHJhd0xpbmUoY3R4KSB7XG4gICAgICAgIGN0eC5zZXRMaW5lRGFzaChbNTAsIDBdKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHRoaXMud2lkdGggLyAyLCAwKTtcbiAgICAgICAgY3R4LmxpbmVUbyh0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5kcmF3TGluZShjdHgpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JvYXJkLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Paddle = function () {\n   function Paddle(height, x, control) {\n      var _this = this;\n\n      _classCallCheck(this, Paddle);\n\n      this.width = 3;\n      this.height = 50;\n      this.x = x;\n      this.y = height / 2 - this.height / 2;\n      this.speed = 25;\n      this.maxHeight = height;\n\n      document.addEventListener('keydown', function (event) {\n\n         switch (event.keyCode) {\n            case control.up:\n               _this.y = Math.max(0, _this.y - _this.speed);\n\n               break;\n            case control.down:\n               _this.y = Math.min(_this.maxHeight - _this.height, _this.y + _this.speed);\n\n               break;\n         }\n      });\n   }\n\n   _createClass(Paddle, [{\n      key: 'render',\n      value: function render(ctx) {\n         ctx.fillRect(this.x, this.y, this.width, this.height);\n      }\n   }]);\n\n   return Paddle;\n}();\n\nexports.default = Paddle;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFkZGxlLmpzPzkwNTMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUNxQixNO0FBQ3BCLG1CQUFZLE1BQVosRUFBb0IsQ0FBcEIsRUFBdUIsT0FBdkIsRUFBZ0M7QUFBQTs7QUFBQTs7QUFDM0IsV0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUssTUFBTCxHQUFjLEVBQWQ7QUFDQSxXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsV0FBSyxDQUFMLEdBQVUsU0FBUyxDQUFWLEdBQWdCLEtBQUssTUFBTCxHQUFjLENBQXZDO0FBQ0EsV0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUssU0FBTCxHQUFpQixNQUFqQjs7QUFFQSxlQUFTLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLGlCQUFTOztBQUU5QyxpQkFBUSxNQUFNLE9BQWQ7QUFDRyxpQkFBSyxRQUFRLEVBQWI7QUFDRyxxQkFBSyxDQUFMLEdBQVMsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFXLE1BQUssQ0FBTCxHQUFRLE1BQUssS0FBeEIsQ0FBVDs7QUFFQTtBQUNILGlCQUFLLFFBQVEsSUFBYjtBQUNHLHFCQUFLLENBQUwsR0FBUyxLQUFLLEdBQUwsQ0FBUyxNQUFLLFNBQUwsR0FBaUIsTUFBSyxNQUEvQixFQUF1QyxNQUFLLENBQUwsR0FBUyxNQUFLLEtBQXJELENBQVQ7O0FBRUE7QUFSTjtBQVVELE9BWkM7QUFhRjs7Ozs2QkFFTSxHLEVBQUs7QUFDVCxhQUFJLFFBQUosQ0FDRyxLQUFLLENBRFIsRUFDVyxLQUFLLENBRGhCLEVBRUcsS0FBSyxLQUZSLEVBRWUsS0FBSyxNQUZwQjtBQUlGOzs7Ozs7a0JBN0JpQixNIiwiZmlsZSI6IjEyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWRkbGV7XG5cdGNvbnN0cnVjdG9yKGhlaWdodCwgeCwgY29udHJvbCkge1xuICAgICAgdGhpcy53aWR0aCA9IDM7XG4gICAgICB0aGlzLmhlaWdodCA9IDUwO1xuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IChoZWlnaHQgLyAyKSAtICh0aGlzLmhlaWdodCAvIDIpO1xuICAgICAgdGhpcy5zcGVlZCA9IDI1O1xuICAgICAgdGhpcy5tYXhIZWlnaHQgPSBoZWlnaHQ7XG4gICBcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudCA9PiB7XG4gICAgICAgICBcbiAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgY2FzZSBjb250cm9sLnVwOlxuICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5tYXgoMCx0aGlzLnkgLXRoaXMuc3BlZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGNhc2UgY29udHJvbC5kb3duOlxuICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5taW4odGhpcy5tYXhIZWlnaHQgLSB0aGlzLmhlaWdodCwgdGhpcy55ICsgdGhpcy5zcGVlZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICB9XG5cbiAgIHJlbmRlcihjdHgpIHsgXG4gICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICB0aGlzLngsIHRoaXMueSxcbiAgICAgICAgIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0XG4gICAgICApO1xuICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZGRsZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar size = 3;\n\nvar Ball = function () {\n    function Ball(width, height) {\n        _classCallCheck(this, Ball);\n\n        this.x = width / 2; // random x\n        this.y = height / 2; // random y\n        this.vy = Math.floor(Math.random() * 12 - 6);\n        this.vx = 7 - Math.abs(this.vy) - 7;\n        this.size = size;\n        this.speed = 2;\n        this.boardHeight = height;\n        this.boardWidth = width;\n    }\n\n    _createClass(Ball, [{\n        key: \"draw\",\n        value: function draw(ctx) {\n            ctx.beginPath();\n            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);\n            ctx.fill();\n            ctx.closePath();\n        }\n    }, {\n        key: \"bounce\",\n        value: function bounce() {\n            var hitLeft = this.x >= this.boardWidth;\n            var hitRight = this.x <= 0;\n            var hitTop = this.y <= 0;\n            var hitBottom = this.y >= this.boardHeight;\n\n            if (hitLeft || hitRight) {\n                this.vx = -this.vx;\n            } else if (hitTop || hitBottom) {\n                this.vy = -this.vy;\n            }\n        }\n    }, {\n        key: \"sounds\",\n        value: function sounds() {\n            var hitLeft = this.x >= this.boardWidth + this.size;\n            var hitRight = this.x + this.size <= 0;\n            var hitTop = this.y <= 0;\n            var hitBottom = this.y >= this.boardHeight;\n            var sound1 = document.getElementById(\"pongSound1\");\n            var sound3 = document.getElementById(\"pongSound3\");\n            if (hitTop || hitBottom) {\n                sound1.play();\n            } else if (hitLeft || hitRight) {\n                sound3.play();\n            }\n        }\n\n        // paddle collision method: \n\n    }, {\n        key: \"paddleCollision\",\n        value: function paddleCollision(player1, player2) {\n            if (this.vx > 0) {\n                var inRightEnd = player2.x <= this.x + this.size && player2.x > this.x - this.vx + this.size;\n                if (inRightEnd) {\n                    var collisionDiff = this.x + this.size - player2.x;\n                    var k = collisionDiff / this.vx;\n                    var y = this.vy * k + (this.y - this.vy);\n                    var hitRightPaddle = y >= player2.y && y + this.size <= player2.y + player2.height;\n                    var sound2 = document.getElementById(\"pongSound2\");\n                    if (hitRightPaddle) {\n                        this.x = player2.x - this.size;\n                        this.y = Math.floor(this.y - this.vy + this.vy * k);\n                        this.vx = -this.vx;\n                        sound2.play();\n                    }\n                }\n            } else {\n                var inLeftEnd = player1.x + player1.width >= this.x - this.size;\n                if (inLeftEnd) {\n                    var _collisionDiff = player1.x + player1.width - this.x;\n                    var _k = _collisionDiff / -this.vx;\n                    var _y = this.vy * _k + (this.y - this.vy);\n                    var hitLeftPaddle = _y >= player1.y && _y + this.size <= player1.y + player1.height;\n                    var _sound = document.getElementById(\"pongSound2\");\n                    if (hitLeftPaddle) {\n                        this.x = player1.x + player1.width;\n                        this.y = Math.floor(this.y - this.vy + this.vy * _k);\n                        this.vx = -this.vx;\n                        _sound.play();\n                    }\n                }\n            }\n        }\n    }, {\n        key: \"render\",\n        value: function render(ctx, player1, player2) {\n            this.bounce();\n            this.sounds();\n            this.paddleCollision(player1, player2);\n            this.x += this.vx;\n            this.y += this.vy;\n            this.draw(ctx);\n        }\n    }]);\n\n    return Ball;\n}();\n\nexports.default = Ball;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYmFsbC5qcz9hMzZlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE9BQU8sQ0FBYjs7SUFFcUIsSTtBQUNsQixrQkFBWSxLQUFaLEVBQWtCLE1BQWxCLEVBQTBCO0FBQUE7O0FBQ3ZCLGFBQUssQ0FBTCxHQUFTLFFBQU0sQ0FBZixDQUR1QixDQUNMO0FBQ2xCLGFBQUssQ0FBTCxHQUFTLFNBQU8sQ0FBaEIsQ0FGdUIsQ0FFSjtBQUNuQixhQUFLLEVBQUwsR0FBVSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBaEMsQ0FBVjtBQUNBLGFBQUssRUFBTCxHQUFXLElBQUksS0FBSyxHQUFMLENBQVMsS0FBSyxFQUFkLENBQUosR0FBc0IsQ0FBakM7QUFDQSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNGLGFBQUssV0FBTCxHQUFtQixNQUFuQjtBQUNBLGFBQUssVUFBTCxHQUFrQixLQUFsQjtBQUNBOzs7OzZCQUNJLEcsRUFBSztBQUNULGdCQUFJLFNBQUo7QUFDQSxnQkFBSSxHQUFKLENBQVEsS0FBSyxDQUFiLEVBQWdCLEtBQUssQ0FBckIsRUFBd0IsS0FBSyxJQUE3QixFQUFtQyxDQUFuQyxFQUFzQyxJQUFJLEtBQUssRUFBL0M7QUFDQSxnQkFBSSxJQUFKO0FBQ0EsZ0JBQUksU0FBSjtBQUNEOzs7aUNBRVE7QUFDTCxnQkFBTSxVQUFVLEtBQUssQ0FBTCxJQUFVLEtBQUssVUFBL0I7QUFDQSxnQkFBTSxXQUFXLEtBQUssQ0FBTCxJQUFVLENBQTNCO0FBQ0EsZ0JBQU0sU0FBUyxLQUFLLENBQUwsSUFBVyxDQUExQjtBQUNBLGdCQUFNLFlBQVksS0FBSyxDQUFMLElBQVUsS0FBSyxXQUFqQzs7QUFFQSxnQkFBRyxXQUFXLFFBQWQsRUFBdUI7QUFDckIscUJBQUssRUFBTCxHQUFVLENBQUMsS0FBSyxFQUFoQjtBQUNELGFBRkQsTUFFTSxJQUFJLFVBQVUsU0FBZCxFQUF3QjtBQUM3QixxQkFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBQ0E7QUFDRjs7O2lDQUVPO0FBQ1IsZ0JBQU0sVUFBVSxLQUFLLENBQUwsSUFBVSxLQUFLLFVBQUwsR0FBa0IsS0FBSyxJQUFqRDtBQUNBLGdCQUFNLFdBQVcsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUFkLElBQXNCLENBQXZDO0FBQ0EsZ0JBQU0sU0FBUyxLQUFLLENBQUwsSUFBVSxDQUF6QjtBQUNBLGdCQUFNLFlBQVksS0FBSyxDQUFMLElBQVUsS0FBSyxXQUFqQztBQUNBLGdCQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWY7QUFDQSxnQkFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFmO0FBQ0EsZ0JBQUcsVUFBVSxTQUFiLEVBQXVCO0FBQ3JCLHVCQUFPLElBQVA7QUFDRCxhQUZELE1BRU0sSUFBSSxXQUFXLFFBQWYsRUFBd0I7QUFDNUIsdUJBQU8sSUFBUDtBQUNEO0FBRUQ7O0FBRUY7Ozs7d0NBQ2lCLE8sRUFBUyxPLEVBQVM7QUFDOUIsZ0JBQUksS0FBSyxFQUFMLEdBQVUsQ0FBZCxFQUFpQjtBQUNiLG9CQUFNLGFBQWEsUUFBUSxDQUFSLElBQWEsS0FBSyxDQUFMLEdBQVMsS0FBSyxJQUEzQixJQUNmLFFBQVEsQ0FBUixHQUFZLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLElBRHhDO0FBRUEsb0JBQUksVUFBSixFQUFnQjtBQUNaLHdCQUFNLGdCQUFnQixLQUFLLENBQUwsR0FBUyxLQUFLLElBQWQsR0FBc0IsUUFBUSxDQUFwRDtBQUNBLHdCQUFNLElBQUksZ0JBQWdCLEtBQUssRUFBL0I7QUFDQSx3QkFBTSxJQUFJLEtBQUssRUFBTCxHQUFVLENBQVYsSUFBZSxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQTdCLENBQVY7QUFDQSx3QkFBTSxpQkFBaUIsS0FBSyxRQUFRLENBQWIsSUFBa0IsSUFBSSxLQUFLLElBQVQsSUFBaUIsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUE5RTtBQUNBLHdCQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWY7QUFDQSx3QkFBSSxjQUFKLEVBQW9CO0FBQ2hCLDZCQUFLLENBQUwsR0FBUyxRQUFRLENBQVIsR0FBWSxLQUFLLElBQTFCO0FBQ0EsNkJBQUssQ0FBTCxHQUFTLEtBQUssS0FBTCxDQUFXLEtBQUssQ0FBTCxHQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLEVBQUwsR0FBVSxDQUF4QyxDQUFUO0FBQ0EsNkJBQUssRUFBTCxHQUFVLENBQUMsS0FBSyxFQUFoQjtBQUNBLCtCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0osYUFoQkQsTUFnQk87QUFDSCxvQkFBTSxZQUFZLFFBQVEsQ0FBUixHQUFZLFFBQVEsS0FBcEIsSUFBNkIsS0FBSyxDQUFMLEdBQVEsS0FBSyxJQUE1RDtBQUNBLG9CQUFJLFNBQUosRUFBZTtBQUNYLHdCQUFNLGlCQUFnQixRQUFRLENBQVIsR0FBWSxRQUFRLEtBQXBCLEdBQTRCLEtBQUssQ0FBdkQ7QUFDQSx3QkFBTSxLQUFJLGlCQUFnQixDQUFDLEtBQUssRUFBaEM7QUFDQSx3QkFBTSxLQUFJLEtBQUssRUFBTCxHQUFVLEVBQVYsSUFBZSxLQUFLLENBQUwsR0FBUyxLQUFLLEVBQTdCLENBQVY7QUFDQSx3QkFBTSxnQkFBZ0IsTUFBSyxRQUFRLENBQWIsSUFBa0IsS0FBSSxLQUFLLElBQVQsSUFBaUIsUUFBUSxDQUFSLEdBQVksUUFBUSxNQUE3RTtBQUNBLHdCQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWY7QUFDRCx3QkFBSSxhQUFKLEVBQW1CO0FBQ2YsNkJBQUssQ0FBTCxHQUFTLFFBQVEsQ0FBUixHQUFZLFFBQVEsS0FBN0I7QUFDQSw2QkFBSyxDQUFMLEdBQVMsS0FBSyxLQUFMLENBQVcsS0FBSyxDQUFMLEdBQVMsS0FBSyxFQUFkLEdBQW1CLEtBQUssRUFBTCxHQUFVLEVBQXhDLENBQVQ7QUFDQSw2QkFBSyxFQUFMLEdBQVUsQ0FBQyxLQUFLLEVBQWhCO0FBQ0EsK0JBQU8sSUFBUDtBQUNGO0FBQ0o7QUFDSjtBQUNKOzs7K0JBRU0sRyxFQUFJLE8sRUFBUSxPLEVBQVM7QUFDM0IsaUJBQUssTUFBTDtBQUNBLGlCQUFLLE1BQUw7QUFDQSxpQkFBSyxlQUFMLENBQXFCLE9BQXJCLEVBQTZCLE9BQTdCO0FBQ0QsaUJBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLEVBQWY7QUFDQSxpQkFBSyxJQUFMLENBQVUsR0FBVjtBQUNDOzs7Ozs7a0JBekZpQixJIiwiZmlsZSI6IjEzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc2l6ZSA9IDM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xuICAgY29uc3RydWN0b3Iod2lkdGgsaGVpZ2h0KSB7XG4gICAgICB0aGlzLnggPSB3aWR0aC8yOyAvLyByYW5kb20geFxuICAgICAgdGhpcy55ID0gaGVpZ2h0LzI7IC8vIHJhbmRvbSB5XG4gICAgICB0aGlzLnZ5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIgLSA2KTtcbiAgICAgIHRoaXMudnggPSAoNyAtIE1hdGguYWJzKHRoaXMudnkpLTcpO1xuICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICBcdFx0dGhpcy5ib2FyZEhlaWdodCA9IGhlaWdodDtcbiAgXHRcdHRoaXMuYm9hcmRXaWR0aCA9IHdpZHRoO1xuICAgfVxuICAgZHJhdyhjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5zaXplLCAwLCAyICogTWF0aC5QSSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cbiAgXG4gIGJvdW5jZSgpIHtcbiAgICAgIGNvbnN0IGhpdExlZnQgPSB0aGlzLnggPj0gdGhpcy5ib2FyZFdpZHRoO1xuICAgICAgY29uc3QgaGl0UmlnaHQgPSB0aGlzLnggPD0gMDtcbiAgICAgIGNvbnN0IGhpdFRvcCA9IHRoaXMueSAgPD0gMDtcbiAgICAgIGNvbnN0IGhpdEJvdHRvbSA9IHRoaXMueSA+PSB0aGlzLmJvYXJkSGVpZ2h0O1xuXG4gICAgICBpZihoaXRMZWZ0IHx8IGhpdFJpZ2h0KXtcbiAgICAgICAgdGhpcy52eCA9IC10aGlzLnZ4O1xuICAgICAgfWVsc2UgaWYgKGhpdFRvcCB8fCBoaXRCb3R0b20pe1xuICAgICAgXHR0aGlzLnZ5ID0gLXRoaXMudnk7XG4gICAgICB9XG4gICAgfVxuXG4gICBzb3VuZHMoKSB7XG4gICAgY29uc3QgaGl0TGVmdCA9IHRoaXMueCA+PSB0aGlzLmJvYXJkV2lkdGggKyB0aGlzLnNpemU7XG4gICAgY29uc3QgaGl0UmlnaHQgPSB0aGlzLnggKyB0aGlzLnNpemUgPD0gMDtcbiAgICBjb25zdCBoaXRUb3AgPSB0aGlzLnkgPD0gMDtcbiAgICBjb25zdCBoaXRCb3R0b20gPSB0aGlzLnkgPj0gdGhpcy5ib2FyZEhlaWdodDtcbiAgICBjb25zdCBzb3VuZDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvbmdTb3VuZDFcIik7XG4gICAgY29uc3Qgc291bmQzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb25nU291bmQzXCIpO1xuICAgIGlmKGhpdFRvcCB8fCBoaXRCb3R0b20pe1xuICAgICAgc291bmQxLnBsYXkoKTtcbiAgICB9ZWxzZSBpZiAoaGl0TGVmdCB8fCBoaXRSaWdodCl7XG4gICAgICBzb3VuZDMucGxheSgpO1xuICAgIH1cblxuICAgfSBcblxuICAvLyBwYWRkbGUgY29sbGlzaW9uIG1ldGhvZDogXG4gICBwYWRkbGVDb2xsaXNpb24ocGxheWVyMSwgcGxheWVyMikge1xuICAgICAgIGlmICh0aGlzLnZ4ID4gMCkge1xuICAgICAgICAgICBjb25zdCBpblJpZ2h0RW5kID0gcGxheWVyMi54IDw9IHRoaXMueCArIHRoaXMuc2l6ZSAmJlxuICAgICAgICAgICAgICAgcGxheWVyMi54ID4gdGhpcy54IC0gdGhpcy52eCArIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgaWYgKGluUmlnaHRFbmQpIHtcbiAgICAgICAgICAgICAgIGNvbnN0IGNvbGxpc2lvbkRpZmYgPSB0aGlzLnggKyB0aGlzLnNpemUgIC0gcGxheWVyMi54O1xuICAgICAgICAgICAgICAgY29uc3QgayA9IGNvbGxpc2lvbkRpZmYgLyB0aGlzLnZ4O1xuICAgICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMudnkgKiBrICsgKHRoaXMueSAtIHRoaXMudnkpO1xuICAgICAgICAgICAgICAgY29uc3QgaGl0UmlnaHRQYWRkbGUgPSB5ID49IHBsYXllcjIueSAmJiB5ICsgdGhpcy5zaXplIDw9IHBsYXllcjIueSArIHBsYXllcjIuaGVpZ2h0O1xuICAgICAgICAgICAgICAgY29uc3Qgc291bmQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb25nU291bmQyXCIpO1xuICAgICAgICAgICAgICAgaWYgKGhpdFJpZ2h0UGFkZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyMi54IC0gdGhpcy5zaXplO1xuICAgICAgICAgICAgICAgICAgIHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55IC0gdGhpcy52eSArIHRoaXMudnkgKiBrKTtcbiAgICAgICAgICAgICAgICAgICB0aGlzLnZ4ID0gLXRoaXMudng7XG4gICAgICAgICAgICAgICAgICAgc291bmQyLnBsYXkoKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIGNvbnN0IGluTGVmdEVuZCA9IHBsYXllcjEueCArIHBsYXllcjEud2lkdGggPj0gdGhpcy54IC10aGlzLnNpemU7XG4gICAgICAgICAgIGlmIChpbkxlZnRFbmQpIHtcbiAgICAgICAgICAgICAgIGNvbnN0IGNvbGxpc2lvbkRpZmYgPSBwbGF5ZXIxLnggKyBwbGF5ZXIxLndpZHRoIC0gdGhpcy54O1xuICAgICAgICAgICAgICAgY29uc3QgayA9IGNvbGxpc2lvbkRpZmYgLyAtdGhpcy52eDtcbiAgICAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnZ5ICogayArICh0aGlzLnkgLSB0aGlzLnZ5KTtcbiAgICAgICAgICAgICAgIGNvbnN0IGhpdExlZnRQYWRkbGUgPSB5ID49IHBsYXllcjEueSAmJiB5ICsgdGhpcy5zaXplIDw9IHBsYXllcjEueSArIHBsYXllcjEuaGVpZ2h0O1xuICAgICAgICAgICAgICAgY29uc3Qgc291bmQyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb25nU291bmQyXCIpO1xuICAgICAgICAgICAgICBpZiAoaGl0TGVmdFBhZGRsZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy54ID0gcGxheWVyMS54ICsgcGxheWVyMS53aWR0aDtcbiAgICAgICAgICAgICAgICAgIHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55IC0gdGhpcy52eSArIHRoaXMudnkgKiBrKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudnggPSAtdGhpcy52eDtcbiAgICAgICAgICAgICAgICAgIHNvdW5kMi5wbGF5KCk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICB9XG4gICB9XG5cbiAgIHJlbmRlcihjdHgscGxheWVyMSxwbGF5ZXIyKSB7XG4gICBcdHRoaXMuYm91bmNlKCk7XG4gICAgdGhpcy5zb3VuZHMoKTtcbiAgIFx0dGhpcy5wYWRkbGVDb2xsaXNpb24ocGxheWVyMSxwbGF5ZXIyKTtcblx0ICB0aGlzLnggKz0gdGhpcy52eDtcblx0ICB0aGlzLnkgKz0gdGhpcy52eTtcblx0ICB0aGlzLmRyYXcoY3R4KTsgXHRcbiAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iYWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ScoreBoard = function () {\n   function ScoreBoard(x, y, score) {\n      _classCallCheck(this, ScoreBoard);\n\n      this.x = x;\n      this.y = y;\n      this.score = score;\n   }\n\n   _createClass(ScoreBoard, [{\n      key: \"render\",\n      value: function render(ctx) {\n         ctx.font = \"20px Helvetica\";\n         ctx.fillText(this.score, this.x, this.y);\n      }\n   }]);\n\n   return ScoreBoard;\n}();\n\nexports.default = ScoreBoard;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NvcmVib2FyZC5qcz9lNzY0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUIsVTtBQUNsQix1QkFBWSxDQUFaLEVBQWUsQ0FBZixFQUFrQixLQUFsQixFQUF5QjtBQUFBOztBQUN0QixXQUFLLENBQUwsR0FBUyxDQUFUO0FBQ0EsV0FBSyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFdBQUssS0FBTCxHQUFhLEtBQWI7QUFDRjs7Ozs2QkFDTSxHLEVBQUs7QUFDVCxhQUFJLElBQUosR0FBVyxnQkFBWDtBQUNBLGFBQUksUUFBSixDQUFhLEtBQUssS0FBbEIsRUFBeUIsS0FBSyxDQUE5QixFQUFpQyxLQUFLLENBQXRDO0FBQ0Y7Ozs7OztrQkFUaUIsVSIsImZpbGUiOiIxNC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlQm9hcmQge1xuICAgY29uc3RydWN0b3IoeCwgeSwgc2NvcmUpIHtcbiAgICAgIHRoaXMueCA9IHg7XG4gICAgICB0aGlzLnkgPSB5O1xuICAgICAgdGhpcy5zY29yZSA9IHNjb3JlO1xuICAgfVxuICAgcmVuZGVyKGN0eCkge1xuICAgICAgY3R4LmZvbnQgPSBcIjIwcHggSGVsdmV0aWNhXCI7XG4gICAgICBjdHguZmlsbFRleHQodGhpcy5zY29yZSwgdGhpcy54LCB0aGlzLnkpO1xuICAgfSBcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY29yZWJvYXJkLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);
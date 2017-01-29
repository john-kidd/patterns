/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _result = __webpack_require__(1);
	
	var _workflow = __webpack_require__(2);
	
	var result = new _result.Result("an error has ocurred!");
	
	document.write("Success = " + result.success().toString());
	
	console.log(result.getError());

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Result = exports.Result = function () {
	    function Result() {
	        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	
	        _classCallCheck(this, Result);
	
	        this.error = error;
	    }
	
	    _createClass(Result, [{
	        key: "success",
	        value: function success() {
	            return this.error === "";
	        }
	    }, {
	        key: "getError",
	        value: function getError() {
	            return this.error;
	        }
	    }]);

	    return Result;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.runAll = runAll;
	
	var _result = __webpack_require__(1);
	
	function runAll(data, funcs) {
	    var errors = [];
	    for (var i = 0; i < funcs.length; i++) {
	        var result = funcs[i](data);
	        if (!result.success()) errors.push(result.getError());
	    }
	    return new _result.Result(errors.join("<br/>"));
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDJiMWNkNDQwMTQ5ZDM4MzA2NzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVzdWx0LmpzIiwid2VicGFjazovLy8uL3NyYy93b3JrZmxvdy5qcyJdLCJuYW1lcyI6WyJyZXN1bHQiLCJkb2N1bWVudCIsIndyaXRlIiwic3VjY2VzcyIsInRvU3RyaW5nIiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiUmVzdWx0IiwiZXJyb3IiLCJydW5BbGwiLCJkYXRhIiwiZnVuY3MiLCJlcnJvcnMiLCJpIiwibGVuZ3RoIiwicHVzaCIsImpvaW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBRUEsS0FBTUEsU0FBUyxtQkFBVyx1QkFBWCxDQUFmOztBQUVBQyxVQUFTQyxLQUFULGdCQUE0QkYsT0FBT0csT0FBUCxHQUFpQkMsUUFBakIsRUFBNUI7O0FBRUFDLFNBQVFDLEdBQVIsQ0FBWU4sT0FBT08sUUFBUCxFQUFaLEU7Ozs7Ozs7Ozs7Ozs7Ozs7S0NQYUMsTSxXQUFBQSxNO0FBQ1QsdUJBQXdCO0FBQUEsYUFBWkMsS0FBWSx1RUFBSixFQUFJOztBQUFBOztBQUNwQixjQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSDs7OzttQ0FFUztBQUNOLG9CQUFPLEtBQUtBLEtBQUwsS0FBZSxFQUF0QjtBQUNIOzs7b0NBRVU7QUFDUCxvQkFBTyxLQUFLQSxLQUFaO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztTQ1RXQyxNLEdBQUFBLE07O0FBRmhCOztBQUVPLFVBQVNBLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCQyxLQUF0QixFQUE2QjtBQUNoQyxTQUFNQyxTQUFTLEVBQWY7QUFDQSxVQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsTUFBTUcsTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO0FBQ25DLGFBQU1kLFNBQVNZLE1BQU1FLENBQU4sRUFBU0gsSUFBVCxDQUFmO0FBQ0EsYUFBSSxDQUFDWCxPQUFPRyxPQUFQLEVBQUwsRUFDSVUsT0FBT0csSUFBUCxDQUFZaEIsT0FBT08sUUFBUCxFQUFaO0FBQ1A7QUFDRCxZQUFPLG1CQUFXTSxPQUFPSSxJQUFQLENBQVksT0FBWixDQUFYLENBQVA7QUFDSCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQyYjFjZDQ0MDE0OWQzODMwNjc0IiwiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSBcIi4vcmVzdWx0XCI7XG5pbXBvcnQgeyBydW5BbGwgfSBmcm9tIFwiLi93b3JrZmxvd1wiO1xuXG5jb25zdCByZXN1bHQgPSBuZXcgUmVzdWx0KFwiYW4gZXJyb3IgaGFzIG9jdXJyZWQhXCIpO1xuXG5kb2N1bWVudC53cml0ZShgU3VjY2VzcyA9ICR7cmVzdWx0LnN1Y2Nlc3MoKS50b1N0cmluZygpfWApO1xuXG5jb25zb2xlLmxvZyhyZXN1bHQuZ2V0RXJyb3IoKSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC5qcyIsImV4cG9ydCBjbGFzcyBSZXN1bHQge1xuICAgIGNvbnN0cnVjdG9yKGVycm9yID0gXCJcIikge1xuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgfVxuXG4gICAgc3VjY2VzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IgPT09IFwiXCI7XG4gICAgfVxuXG4gICAgZ2V0RXJyb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVzdWx0LmpzIiwiaW1wb3J0IHsgUmVzdWx0IH0gZnJvbSBcIi4vcmVzdWx0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5BbGwoZGF0YSwgZnVuY3MpIHtcbiAgICBjb25zdCBlcnJvcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZ1bmNzW2ldKGRhdGEpO1xuICAgICAgICBpZiAoIXJlc3VsdC5zdWNjZXNzKCkpXG4gICAgICAgICAgICBlcnJvcnMucHVzaChyZXN1bHQuZ2V0RXJyb3IoKSk7ICAgICAgICBcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZXN1bHQoZXJyb3JzLmpvaW4oXCI8YnIvPlwiKSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dvcmtmbG93LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
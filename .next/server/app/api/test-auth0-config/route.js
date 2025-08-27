/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/test-auth0-config/route";
exports.ids = ["app/api/test-auth0-config/route"];
exports.modules = {

/***/ "(rsc)/./app/api/test-auth0-config/route.js":
/*!********************************************!*\
  !*** ./app/api/test-auth0-config/route.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function GET() {\n    const config = {\n        AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,\n        AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,\n        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ? 'SET' : 'NOT_SET',\n        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? 'SET' : 'NOT_SET',\n        AUTH0_SECRET: process.env.AUTH0_SECRET ? 'SET' : 'NOT_SET',\n        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,\n        AUTH0_SCOPE: process.env.AUTH0_SCOPE\n    };\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(config);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Rlc3QtYXV0aDAtY29uZmlnL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTBDO0FBRW5DLGVBQWVDO0lBQ3BCLE1BQU1DLFNBQVM7UUFDYkMsZ0JBQWdCQyxRQUFRQyxHQUFHLENBQUNGLGNBQWM7UUFDMUNHLHVCQUF1QkYsUUFBUUMsR0FBRyxDQUFDQyxxQkFBcUI7UUFDeERDLGlCQUFpQkgsUUFBUUMsR0FBRyxDQUFDRSxlQUFlLEdBQUcsUUFBUTtRQUN2REMscUJBQXFCSixRQUFRQyxHQUFHLENBQUNHLG1CQUFtQixHQUFHLFFBQVE7UUFDL0RDLGNBQWNMLFFBQVFDLEdBQUcsQ0FBQ0ksWUFBWSxHQUFHLFFBQVE7UUFDakRDLGNBQWNOLFFBQVFDLEdBQUcsQ0FBQ0ssWUFBWTtRQUN0Q0MsYUFBYVAsUUFBUUMsR0FBRyxDQUFDTSxXQUFXO0lBQ3RDO0lBRUEsT0FBT1gscURBQVlBLENBQUNZLElBQUksQ0FBQ1Y7QUFDM0IiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYXJyZWRzdGlnZXIvcHJvamVjdHMvc21zLXYyL2FwcC9hcGkvdGVzdC1hdXRoMC1jb25maWcvcm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBBVVRIMF9CQVNFX1VSTDogcHJvY2Vzcy5lbnYuQVVUSDBfQkFTRV9VUkwsXG4gICAgQVVUSDBfSVNTVUVSX0JBU0VfVVJMOiBwcm9jZXNzLmVudi5BVVRIMF9JU1NVRVJfQkFTRV9VUkwsXG4gICAgQVVUSDBfQ0xJRU5UX0lEOiBwcm9jZXNzLmVudi5BVVRIMF9DTElFTlRfSUQgPyAnU0VUJyA6ICdOT1RfU0VUJyxcbiAgICBBVVRIMF9DTElFTlRfU0VDUkVUOiBwcm9jZXNzLmVudi5BVVRIMF9DTElFTlRfU0VDUkVUID8gJ1NFVCcgOiAnTk9UX1NFVCcsXG4gICAgQVVUSDBfU0VDUkVUOiBwcm9jZXNzLmVudi5BVVRIMF9TRUNSRVQgPyAnU0VUJyA6ICdOT1RfU0VUJyxcbiAgICBBVVRIMF9ET01BSU46IHByb2Nlc3MuZW52LkFVVEgwX0RPTUFJTixcbiAgICBBVVRIMF9TQ09QRTogcHJvY2Vzcy5lbnYuQVVUSDBfU0NPUEUsXG4gIH1cbiAgXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihjb25maWcpXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJHRVQiLCJjb25maWciLCJBVVRIMF9CQVNFX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJBVVRIMF9JU1NVRVJfQkFTRV9VUkwiLCJBVVRIMF9DTElFTlRfSUQiLCJBVVRIMF9DTElFTlRfU0VDUkVUIiwiQVVUSDBfU0VDUkVUIiwiQVVUSDBfRE9NQUlOIiwiQVVUSDBfU0NPUEUiLCJqc29uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/test-auth0-config/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftest-auth0-config%2Froute&page=%2Fapi%2Ftest-auth0-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftest-auth0-config%2Froute.js&appDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftest-auth0-config%2Froute&page=%2Fapi%2Ftest-auth0-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftest-auth0-config%2Froute.js&appDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_jarredstiger_projects_sms_v2_app_api_test_auth0_config_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/test-auth0-config/route.js */ \"(rsc)/./app/api/test-auth0-config/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/test-auth0-config/route\",\n        pathname: \"/api/test-auth0-config\",\n        filename: \"route\",\n        bundlePath: \"app/api/test-auth0-config/route\"\n    },\n    resolvedPagePath: \"/Users/jarredstiger/projects/sms-v2/app/api/test-auth0-config/route.js\",\n    nextConfigOutput,\n    userland: _Users_jarredstiger_projects_sms_v2_app_api_test_auth0_config_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0ZXN0LWF1dGgwLWNvbmZpZyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdGVzdC1hdXRoMC1jb25maWclMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0ZXN0LWF1dGgwLWNvbmZpZyUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmphcnJlZHN0aWdlciUyRnByb2plY3RzJTJGc21zLXYyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmphcnJlZHN0aWdlciUyRnByb2plY3RzJTJGc21zLXYyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNzQjtBQUNuRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2phcnJlZHN0aWdlci9wcm9qZWN0cy9zbXMtdjIvYXBwL2FwaS90ZXN0LWF1dGgwLWNvbmZpZy9yb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGVzdC1hdXRoMC1jb25maWcvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90ZXN0LWF1dGgwLWNvbmZpZ1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdGVzdC1hdXRoMC1jb25maWcvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvamFycmVkc3RpZ2VyL3Byb2plY3RzL3Ntcy12Mi9hcHAvYXBpL3Rlc3QtYXV0aDAtY29uZmlnL3JvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftest-auth0-config%2Froute&page=%2Fapi%2Ftest-auth0-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftest-auth0-config%2Froute.js&appDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftest-auth0-config%2Froute&page=%2Fapi%2Ftest-auth0-config%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftest-auth0-config%2Froute.js&appDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fjarredstiger%2Fprojects%2Fsms-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
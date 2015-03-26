/**
 * @file Debug mode, for mock data
 */
var __DEBUG = false;
if (location.search.indexOf('debug=1') > -1) {
    __DEBUG = true;
} else if (location.search.indexOf('debug=0') > -1) {
    __DEBUG = false;
}
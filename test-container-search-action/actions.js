'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initHeader = exports.loadScript = exports.getParent = exports.goBack = exports.searchSubmit = exports.searchQueryChanged = exports.clearSuggestions = exports.closeSearch = exports.openSearch = exports.toggleHeader = exports.receiveHeaderData = exports.setIsHistoryPage = exports.popHistoryItem = exports.pushHistoryItem = undefined;

var _actionCreation = require('progressive-web-sdk/dist/utils/action-creation');

var _commands = require('progressive-web-sdk/dist/integration-manager/app/commands');

var _dataObjects = require('progressive-web-sdk/dist/analytics/data-objects/');

var _routing = require('progressive-web-sdk/dist/routing');

var _parent = require('progressive-web-sdk/dist/iframe/parent');

var _parent2 = _interopRequireDefault(_parent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pushHistoryItem = exports.pushHistoryItem = (0, _actionCreation.createAction)('Added item to history stack'); /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var popHistoryItem = exports.popHistoryItem = (0, _actionCreation.createAction)('Removed item from history stack');

var setIsHistoryPage = exports.setIsHistoryPage = (0, _actionCreation.createAction)('Navigated to page from history', ['isHistoryPage']);

var searchAnalytics = (0, _actionCreation.createActionWithAnalytics)('Send search analytics', [], _dataObjects.EVENT_ACTION.search, function (query) {
    return { query: query };
});

var receiveHeaderData = exports.receiveHeaderData = (0, _actionCreation.createAction)('Receive header data');
var toggleHeader = exports.toggleHeader = (0, _actionCreation.createAction)('Toggled the header', ['isCollapsed']);

var openSearch = exports.openSearch = (0, _actionCreation.createAction)('Open header search');
var closeSearch = exports.closeSearch = (0, _actionCreation.createAction)('Close header search');
var clearSuggestions = exports.clearSuggestions = (0, _actionCreation.createAction)('Clear search suggestion');

var searchQueryChanged = exports.searchQueryChanged = function searchQueryChanged(query) {
    return function (dispatch) {
        return dispatch((0, _commands.getSearchSuggestions)(query));
    };
};

var searchSubmit = exports.searchSubmit = function searchSubmit(query) {
    return function (dispatch) {
        dispatch(searchAnalytics(query));
        dispatch((0, _commands.searchProducts)(query));
    };
};

var goBack = exports.goBack = function goBack() {
    return function (dispatch) {
        dispatch(popHistoryItem());
        dispatch(setIsHistoryPage(true));
        return _routing.browserHistory.goBack();
    };
};

var getParent = exports.getParent = function getParent() {
    return new _parent2.default({
        debug: true // eslint-disable-line no-undef
    });
};

var loadScript = exports.loadScript = function loadScript(scritURL) {
    var $ = window.jQuery;
    return $.getScript(scritURL);
};

var initHeader = exports.initHeader = function initHeader() {
    return function (dispatch) {
        return new Promise(function (resolve) {

            // Get the src of getSlicRacConfigScriptUrl script
            getParent().callMethod('getSlicRacConfigScriptUrl').then(function (_ref) {
                var data = _ref.data;

                loadScript(data).then(function () {
                    dispatch(receiveHeaderData({ sliConfigLoaded: true }));
                }).catch(function () {});
            });

            getParent().callMethod('parseHeaderData').then(function (_ref2) {
                var data = _ref2.data;

                dispatch(receiveHeaderData(data));
                return resolve();
            });
        });
    };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialState = undefined;

var _handleActions;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxActions = require('redux-actions');

var _actions = require('./actions');

var headerActions = _interopRequireWildcard(_actions);

var _reducerUtils = require('progressive-web-sdk/dist/utils/reducer-utils');

var _results = require('progressive-web-sdk/dist/integration-manager/results');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var initialState = exports.initialState = _immutable2.default.fromJS({
    isCollapsed: false,
    searchIsOpen: false,
    searchSuggestions: null
});

var header = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, headerActions.receiveHeaderData, _reducerUtils.mergePayload), _defineProperty(_handleActions, headerActions.toggleHeader, _reducerUtils.mergePayload), _defineProperty(_handleActions, headerActions.openSearch, function (state) {
    return state.set('searchIsOpen', true);
}), _defineProperty(_handleActions, headerActions.closeSearch, function (state) {
    return state.set('searchIsOpen', false).set('searchSuggestions', null);
}), _defineProperty(_handleActions, headerActions.clearSuggestions, function (state) {
    return state.set('searchSuggestions', null);
}), _defineProperty(_handleActions, headerActions.pushHistoryItem, function (state, _ref) {
    var payload = _ref.payload;

    var historyUrl = payload.replace(/[?,&]homescreen=1/, '');
    var appHistory = state.get('appHistory');

    if (appHistory && appHistory.last() === historyUrl) {
        return state;
    }

    if (appHistory && appHistory.size) {
        return state.setIn(['appHistory'], _immutable2.default.fromJS(state.get('appHistory').concat(historyUrl)));
    }

    return state.setIn(['appHistory'], _immutable2.default.fromJS([historyUrl]));
}), _defineProperty(_handleActions, headerActions.popHistoryItem, function (state) {
    if (state.get('appHistory').size > 1) {
        return state.setIn(['appHistory'], state.get('appHistory').pop()); // pop is safe since this is an Immutable List
    }
    return state;
}), _defineProperty(_handleActions, _results.receiveSearchSuggestions, function (state, _ref2) {
    var payload = _ref2.payload;
    return state.set('searchSuggestions', payload.searchSuggestion);
}), _defineProperty(_handleActions, headerActions.setIsHistoryPage, _reducerUtils.mergePayload), _handleActions), initialState);

exports.default = header;
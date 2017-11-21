'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSliCofigLoaded = exports.getMyAccountList = exports.getSearch = exports.getLogoLink = exports.showBackButton = exports.getSearchSuggestions = exports.getSearchIsOpen = exports.getIsCollapsed = exports.getBrowsingHistory = exports.getHeader = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _reselectImmutableHelpers = require('reselect-immutable-helpers');

var _selectors = require('gr-test-packages/store/selectors');

var _selectors2 = require('progressive-web-sdk/dist/store/app/selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO:: check which selector used and needed
var getHeader = exports.getHeader = (0, _reselect.createSelector)(_selectors.getUi, function (_ref) {
    var header = _ref.header;
    return header;
});

//import {getUi} from '../../store/selectors'

/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var getBrowsingHistory = exports.getBrowsingHistory = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'appHistory', _immutable2.default.List());
var getIsCollapsed = exports.getIsCollapsed = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'isCollapsed');
var getSearchIsOpen = exports.getSearchIsOpen = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'searchIsOpen');
var getSearchSuggestions = exports.getSearchSuggestions = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'searchSuggestions');
var showBackButton = exports.showBackButton = (0, _reselect.createSelector)(getBrowsingHistory, _selectors2.isStandaloneApp, function (browsingHistory, isStandaloneApp) {
    return isStandaloneApp && browsingHistory.size > 1;
});

var getLogoLink = exports.getLogoLink = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'logoLink', _immutable2.default.Map());
var getSearch = exports.getSearch = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'search', _immutable2.default.Map());
var getMyAccountList = exports.getMyAccountList = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'myAccountListData', _immutable2.default.List());
var getSliCofigLoaded = exports.getSliCofigLoaded = (0, _reselectImmutableHelpers.createGetSelector)(getHeader, 'sliConfigLoaded', false);
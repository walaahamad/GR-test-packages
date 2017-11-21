'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reselectImmutableHelpers = require('reselect-immutable-helpers');

var _actions = require('./actions');

var headerActions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

var _assetUtils = require('progressive-web-sdk/dist/asset-utils');

var _searchAction = require('gr-test-packages/search-action');

var _searchAction2 = _interopRequireDefault(_searchAction);

var _reactIntl = require('react-intl');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var TestContainerSearchAction = function (_React$Component) {
    _inherits(TestContainerSearchAction, _React$Component);

    function TestContainerSearchAction(props) {
        _classCallCheck(this, TestContainerSearchAction);

        var _this = _possibleConstructorReturn(this, (TestContainerSearchAction.__proto__ || Object.getPrototypeOf(TestContainerSearchAction)).call(this, props));

        _this.onChangeSearchQuery = _this.onChangeSearchQuery.bind(_this);
        _this.closeSearch = _this.closeSearch.bind(_this);
        return _this;
    }

    _createClass(TestContainerSearchAction, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var initHeader = this.props.initHeader;

            initHeader();
        }
    }, {
        key: 'onChangeSearchQuery',
        value: function onChangeSearchQuery(e) {
            var value = e.target.value;

            this.props.searchQueryChanged(value);
        }
    }, {
        key: 'onSearchSubmit',
        value: function onSearchSubmit(e) {
            e.preventDefault();

            var value = e.target.query.value;
            this.props.searchSubmit(value);
        }
    }, {
        key: 'closeSearch',
        value: function closeSearch() {}
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                sliConfigLoaded = _props.sliConfigLoaded,
                searchSuggestions = _props.searchSuggestions,
                search = _props.search;


            var emptyResultsImage = (0, _assetUtils.getAssetUrl)('static/legacy/img/empty-search@2x.png');

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_searchAction2.default, { priceFunction: window.priceAPI_RAC,
                    sliAutoComplete: window.sliAutocomplete,
                    emptyResultsImage: emptyResultsImage,
                    sliPath: window.sli_path,
                    closeSearch: this.closeSearch,
                    sliConfigLoaded: sliConfigLoaded,
                    placeholder: search && search.placeholderText ? search.placeholderText : '',
                    searchSuggestions: searchSuggestions })
            );
        }
    }]);

    return TestContainerSearchAction;
}(_react2.default.Component);

TestContainerSearchAction.propTypes = {
    initHeader: _react.PropTypes.func,
    search: _react.PropTypes.object,
    searchQueryChanged: _react.PropTypes.func,
    searchSubmit: _react.PropTypes.func,
    searchSuggestions: _react.PropTypes.object,
    sliConfigLoaded: _react.PropTypes.bool
};

var mapStateToProps = (0, _reselectImmutableHelpers.createPropsSelector)({
    search: selectors.getSearch,
    searchIsOpen: selectors.getSearchIsOpen,
    searchSuggestions: selectors.getSearchSuggestions,
    showBackButton: selectors.showBackButton,
    sliConfigLoaded: selectors.getSliCofigLoaded
});

var mapDispatchToProps = {
    initHeader: headerActions.initHeader,
    searchSubmit: headerActions.searchSubmit,
    searchQueryChanged: headerActions.searchQueryChanged,
    clearSuggestions: headerActions.clearSuggestions
};

exports.default = (0, _reactIntl.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TestContainerSearchAction));
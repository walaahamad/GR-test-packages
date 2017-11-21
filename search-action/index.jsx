'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _constants = require('./constants');

var _utils = require('utils/utils');

var _search = require('progressive-web-sdk/dist/components/search');

var _search2 = _interopRequireDefault(_search);

var _icon = require('progressive-web-sdk/dist/components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _image = require('progressive-web-sdk/dist/components/image');

var _image2 = _interopRequireDefault(_image);

var _dangerousHtml = require('progressive-web-sdk/dist/components/dangerous-html');

var _dangerousHtml2 = _interopRequireDefault(_dangerousHtml);

var _button = require('progressive-web-sdk/dist/components/button');

var _button2 = _interopRequireDefault(_button);

var _link = require('progressive-web-sdk/dist/components/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEARCH_PROPS = {
    submitButtonProps: {
        className: 'pw--icon-only c--secondary u-display-none',
        text: 'submit'
    },
    closeButtonProps: {
        className: 'pw--icon-only c--secondary',
        text: 'close'

    },
    isOverlay: false
};

var INITIAL_STATE = {
    input: '',
    searchText: '',
    termSuggestions: null,
    productSuggestions: null

    /**
     * Suggestion terms component
     */
};var SearchSuggestionTerms = function SearchSuggestionTerms(_ref) {
    var suggestionTerms = _ref.suggestionTerms,
        pattern = _ref.pattern,
        urls = _ref.urls;

    var urlIndex = 0;
    return _react2.default.createElement(
        'ul',
        { className: 'c-search-suggestions-terms u-padding-top-md u-padding-start-md u-padding-end-md' },
        suggestionTerms && suggestionTerms.map(function (item, index) {
            var matches = item.match(pattern);
            var url = urls && urls[urlIndex] ? urls[urlIndex] : '/';
            urlIndex++;
            return _react2.default.createElement(
                'li',
                { key: index, className: (0, _classnames2.default)('c-search-suggestions-terms__term u-bg-color-neutral-11 u-text-weight-regular' + 'u-padding-start u-margin-bottom-6 u-padding-top-xsm u-padding-bottom-xsm u-padding-end-md u-display-inline-flex u-margin-end-sm u-border-radius') },
                _react2.default.createElement(
                    'div',
                    { className: 'u-flexbox u-align-center u-justify-center u-display-inline-flex' },
                    _react2.default.createElement(
                        _link2.default,
                        { href: url, className: 'u-flexbox u-align-center u-justify-center u-display-inline-flex' },
                        _react2.default.createElement(_icon2.default, { name: 'search', size: 'small', className: 'u-margin-end-6' }),
                        _react2.default.createElement(
                            _dangerousHtml2.default,
                            { html: matches ? item.replace(matches[0], '<b>' + matches[0] + '</b>') : item },
                            function (htmlObj) {
                                return _react2.default.createElement('div', { dangerouslySetInnerHTML: htmlObj });
                            }
                        )
                    )
                )
            );
        })
    );
};

SearchSuggestionTerms.propTypes = {
    pattern: _react.PropTypes.instanceOf(RegExp),
    suggestionTerms: _react.PropTypes.array,
    urls: _react.PropTypes.array
};

var SearchProductsList = function (_React$Component) {
    _inherits(SearchProductsList, _React$Component);

    function SearchProductsList() {
        _classCallCheck(this, SearchProductsList);

        return _possibleConstructorReturn(this, (SearchProductsList.__proto__ || Object.getPrototypeOf(SearchProductsList)).apply(this, arguments));
    }

    _createClass(SearchProductsList, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // The priceFunction definition in the search suggestion ajax response
            var priceFunction = this.props.priceFunction;

            if (priceFunction) {
                priceFunction();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                productsList = _props.productsList,
                pattern = _props.pattern,
                emptyResultsImage = _props.emptyResultsImage,
                urls = _props.urls;
            // use urlIndex to keep tracking the index of loop in the urls array

            var urlIndex = this.props.urlIndex;

            return productsList && productsList.length > 0 ? _react2.default.createElement(
                'ul',
                { className: 'c-search-suggestions-products u-padding-start-md u-padding-end-md u-padding-top-6' },
                productsList.map(function (item, index) {
                    var matches = item.title.match(pattern);
                    var url = urls && urls[urlIndex] ? urls[urlIndex] : '/';
                    urlIndex++;
                    return _react2.default.createElement(
                        'li',
                        { key: index, className: 'c-search-suggestions-products__product u-text-weight-regular js-suggestion  u-margin-bottom-md' },
                        _react2.default.createElement(
                            'div',
                            { className: 'c-arrange u-flexbox u-align-center c--align-middle' },
                            _react2.default.createElement(
                                _link2.default,
                                { href: url, className: 'c-arrange u-flexbox u-align-center c--align-middle' },
                                item.image && _react2.default.createElement(
                                    'div',
                                    { className: 'c-arrange__item c--shrink' },
                                    _react2.default.createElement(_image2.default, { className: 'u-flexbox sli_ac_image u-margin-right-md u-width-64 u-height-64', alt: '', src: item.image.src })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'c-arrange__item u-margin-start-md' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'c-search-suggestions__title' },
                                        _react2.default.createElement(
                                            _dangerousHtml2.default,
                                            { html: matches ? item.title.replace(matches[0], '<b>' + matches[0] + '</b>') : item.title },
                                            function (htmlObj) {
                                                return _react2.default.createElement('div', { dangerouslySetInnerHTML: htmlObj });
                                            }
                                        )
                                    ),
                                    _react2.default.createElement('div', { className: 'rac_priceLine', id: item.priceId })
                                )
                            )
                        )
                    );
                })
            ) : _react2.default.createElement(_image2.default, { src: emptyResultsImage, className: 'c-search-action__no-results', alt: 'No results found' });
        }
    }]);

    return SearchProductsList;
}(_react2.default.Component);

SearchProductsList.propTypes = {
    emptyResultsImage: _react.PropTypes.string,
    pattern: _react.PropTypes.instanceOf(RegExp),
    priceFunction: _react.PropTypes.func,
    productsList: _react.PropTypes.array,
    urlIndex: _react.PropTypes.number,
    urls: _react.PropTypes.array

    /**
     * Search action component
     */

};
var SearchAction = function (_React$Component2) {
    _inherits(SearchAction, _React$Component2);

    function SearchAction(props) {
        _classCallCheck(this, SearchAction);

        var _this2 = _possibleConstructorReturn(this, (SearchAction.__proto__ || Object.getPrototypeOf(SearchAction)).call(this, props));

        _this2.state = INITIAL_STATE;
        _this2.handleOnChange = _this2.handleOnChange.bind(_this2);
        _this2.handleOnSubmit = _this2.handleOnSubmit.bind(_this2);
        _this2.closeSearchSheet = _this2.closeSearchSheet.bind(_this2);
        return _this2;
    }

    _createClass(SearchAction, [{
        key: 'handleOnSubmit',
        value: function handleOnSubmit() {
            var searchText = this.state.input.trim();
            var sliPath = this.props.sliPath;


            if (searchText) {
                var path = '' + sliPath + _constants.SEARCH_PAGE_URL + searchText;
                this.closeSearchSheet();
                (0, _utils.changeRoute)(path);
            }
        }
    }, {
        key: 'handleOnChange',
        value: function handleOnChange(event) {
            var input = event.target.value;
            var _props2 = this.props,
                getSearchSuggestions = _props2.getSearchSuggestions,
                sliAutoComplete = _props2.sliAutoComplete;

            this.setState({ input: input });
            if (sliAutoComplete && sliAutoComplete.select && sliAutoComplete.select.addData) {
                getSearchSuggestions(input, sliAutoComplete);
            }
        }
    }, {
        key: 'closeSearchSheet',
        value: function closeSearchSheet() {
            var closeSearch = this.props.closeSearch;

            this.setState(INITIAL_STATE);
            if (closeSearch) {
                closeSearch();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = 'c-search-action u-width-full';
            var _props3 = this.props,
                placeholder = _props3.placeholder,
                priceFunction = _props3.priceFunction,
                searchSuggestions = _props3.searchSuggestions,
                sliConfigLoaded = _props3.sliConfigLoaded,
                sliAutoComplete = _props3.sliAutoComplete,
                emptyResultsImage = _props3.emptyResultsImage;

            var productsList = searchSuggestions && searchSuggestions.productSuggestions && searchSuggestions.productSuggestions.suggestionProduct || [];
            var suggestionTerms = searchSuggestions && searchSuggestions.termSuggestions && searchSuggestions.termSuggestions.termSuggestionsList || [];
            // The Urls array contain all the urls for terms and products respectivlly
            var urls = searchSuggestions && searchSuggestions.urls ? searchSuggestions.urls : [];
            var pattern = new RegExp('(' + this.state.input + ')', 'ig');

            return _react2.default.createElement(
                'div',
                { className: classes },
                sliAutoComplete && sliConfigLoaded ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'u-flexbox u-justify-between' },
                        _react2.default.createElement(_search2.default, _extends({
                            searchIcon: 'search'
                        }, SEARCH_PROPS, {
                            className: (0, _classnames2.default)('u-flex-1'),
                            onClose: this.closeSearchSheet,
                            onChange: this.handleOnChange,
                            onSubmit: this.handleOnSubmit,
                            inputProps: {
                                placeholder: placeholder,
                                className: 'pw-search__input'
                            },
                            onClickSuggestion: this.closeSearchSheet
                        })),
                        _react2.default.createElement(_button2.default, { icon: 'close', className: 'pw-search__close', onClick: this.closeSearchSheet })
                    ),
                    _react2.default.createElement(SearchSuggestionTerms, { suggestionTerms: suggestionTerms,
                        pattern: pattern, urls: urls
                    }),
                    productsList && productsList.length > 0 ? _react2.default.createElement(SearchProductsList, { productsList: productsList,
                        pattern: pattern,
                        priceFunction: priceFunction,
                        emptyResultsImage: emptyResultsImage,
                        urls: urls,
                        urlIndex: suggestionTerms.length
                    }) : _react2.default.createElement(_image2.default, { src: emptyResultsImage, className: 'c-search-action__no-results', alt: '' })
                ) : _react2.default.createElement('div', null)
            );
        }
    }]);

    return SearchAction;
}(_react2.default.Component);

SearchAction.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element.
     */
    className: _react.PropTypes.string,
    /**
     * Handler when close search
     */
    closeSearch: _react.PropTypes.func,

    /**
     * Empty results image src
     */
    emptyResultsImage: _react.PropTypes.string,

    /**
     * Search suggestion handler
     */
    getSearchSuggestions: _react.PropTypes.func,

    /**
     * Input place holder text
     */
    placeholder: _react.PropTypes.string,

    /**
     * Call the price function after update the product suggestion list
     */
    priceFunction: _react.PropTypes.func,
    /**
     * Search suggestion list
     */

    searchSuggestions: _react.PropTypes.object,

    /**
     * Sli object for auto complete
     */
    sliAutoComplete: _react.PropTypes.object,
    /**
     * Boolean to check if script is ready for search
     */
    sliConfigLoaded: _react.PropTypes.bool,

    /**
     * Sli path for search result
     */
    sliPath: _react.PropTypes.string,

    /**
     * This array contain all the urls for terms and products respectvilly
     */
    urls: _react.PropTypes.string
};

var mapDispatchToProps = {
    getSearchSuggestions: actions.getSearchSuggestions
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(SearchAction);
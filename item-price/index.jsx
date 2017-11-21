'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _field = require('progressive-web-sdk/dist/components/field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays the price for an item
 * Accepts both the linePrice and itemPrice
 */

var ItemPrice = function ItemPrice(_ref) {
    var linePrice = _ref.linePrice,
        itemPrice = _ref.itemPrice,
        className = _ref.className,
        quantity = _ref.quantity,
        originalPrice = _ref.originalPrice;

    var wrapperClass = (0, _classnames2.default)(className, 'c-item-price');

    return _react2.default.createElement(
        _field2.default,
        { className: wrapperClass },
        _react2.default.createElement(
            'div',
            { className: 'u-text-align-end u-flex' },
            originalPrice ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'span',
                    { className: 'u-h5 u-color-accent u-text-weight-bold' },
                    linePrice
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'u-text-quiet u-text-strikethrough u-padding-start' },
                    originalPrice
                )
            ) : _react2.default.createElement(
                'div',
                { className: 'u-h5 u-color-accent u-text-weight-bold' },
                linePrice
            ),
            itemPrice && _react2.default.createElement(
                'div',
                { className: 'u-text-quiet' },
                _react2.default.createElement(
                    'em',
                    null,
                    itemPrice,
                    ' each'
                )
            )
        )
    );
}; /* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

ItemPrice.propTypes = {
    className: _react.PropTypes.string,
    /**
     * The Unit price for the line item
     */
    itemPrice: _react.PropTypes.string,
    /**
     * The full price for the line item (unit price * quantity)
    */
    linePrice: _react.PropTypes.string,
    /**
     * The original unit price for the item
    */
    originalPrice: _react.PropTypes.string,
    /**
     * The quantity of this item
    */
    quantity: _react.PropTypes.number
};

exports.default = ItemPrice;
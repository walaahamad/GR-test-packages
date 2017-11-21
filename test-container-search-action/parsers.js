'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSlicRacConfigScriptUrl = undefined;

var _parserUtils = require('gr-test-utils/parser-utils');

var getSlicRacConfigScriptUrl = exports.getSlicRacConfigScriptUrl = function getSlicRacConfigScriptUrl() {
    var $ = window.jQuery;
    return $('body').find('script[src*="sli-rac.config"]').attr('src');
};

var parseSearch = function parseSearch($response) {
    return {
        placeholderText: $response.find('#searchBox input').attr('placeholder') || ''
    };
};

var myAccountItemsIds = ['#login', '#myAccount', '#recommendations', '#giftregistry', '#wishlist', '#orderStatus'];

var parseHeaderContent = function parseHeaderContent() {
    var $ = window.jQuery;
    var $html = $('body');

    return {
        logoLink: (0, _parserUtils.parseTextLink)($html.find('#logo1 > a')),
        search: parseSearch($html),
        myAccountListData: myAccountItemsIds.reduce(function (result, item) {
            var link = (0, _parserUtils.parseTextLink)($html.find(item).find('a'));
            if (link.href) {
                result.push(link);
            }
            return result;
        }, [])
    };
};

exports.default = parseHeaderContent;
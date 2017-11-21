'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseSearchSuggestions = exports.parseSuggestionProducts = exports.parseSuggestionProductImage = exports.parseSuggestionTerms = undefined;

var _parserUtils = require('utils/parser-utils');

var parseSuggestionTerms = exports.parseSuggestionTerms = function parseSuggestionTerms($, $termsSuggestion) {

    var title = (0, _parserUtils.getTextFrom)($termsSuggestion, 'h2');

    var termSuggestionsList = [].map.call($termsSuggestion.find('.sli_ac_suggestion'), function (item) {
        return $(item).text().trim();
    });
    return {
        title: title,
        termSuggestionsList: termSuggestionsList
    };
};

var parseSuggestionProductImage = exports.parseSuggestionProductImage = function parseSuggestionProductImage($, $suggestionProductImage) {
    return {
        title: $suggestionProductImage.attr('title'),
        alt: $suggestionProductImage.attr('alt'),
        src: $suggestionProductImage.attr('data-mobile-src') ? $suggestionProductImage.attr('data-mobile-src').replace('sizeType=SLI_MiniThumb', 'sizeType=SLI_LargeGrid') : $suggestionProductImage.attr('src').replace('sizeType=SLI_MiniThumb', 'sizeType=SLI_LargeGrid')
    };
};
var parseSuggestionProducts = exports.parseSuggestionProducts = function parseSuggestionProducts($, $productsSuggestion) {
    var title = (0, _parserUtils.getTextFrom)($productsSuggestion, 'h2');
    var suggestionProduct = [].map.call($productsSuggestion.find('li'), function (item) {
        var $item = $(item);
        return {
            title: (0, _parserUtils.getTextFrom)($item, 'h3'),
            image: parseSuggestionProductImage($, $item.find('.sli_ac_image')),
            priceId: $item.find('[id*=racitem]').attr('id')
        };
    });
    return {
        title: title,
        suggestionProduct: suggestionProduct
    };
};

var parseSearchSuggestions = exports.parseSearchSuggestions = function parseSearchSuggestions($suggestionResponse, urls) {
    var $ = window.Progressive.$;
    return {
        productSuggestions: parseSuggestionProducts($, $suggestionResponse.find('.sli_ac_products')),
        termSuggestions: parseSuggestionTerms($, $suggestionResponse.find('.sli_ac_suggestions')),
        urls: urls
    };
};
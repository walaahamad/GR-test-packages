'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSearchSuggestions = exports.overrideSliAutocompleteFunction = undefined;

var _parser = require('./parser');

var _results = require('progressive-web-sdk/dist/integration-manager/results');

// Function to override the sli sugesstion response handler
var overrideSliAutocompleteFunction = exports.overrideSliAutocompleteFunction = function overrideSliAutocompleteFunction(dispatch, sliAutoComplete) {
    // Override the default add data function in sli
    window.overrideSliAutocomplete = true;
    sliAutoComplete.select.addData = function (url, html) {
        var $ = window.jQuery;
        // Parse the suggestion response data from
        var searchSuggestion = (0, _parser.parseSearchSuggestions)($($.parseHTML('<div>' + html + '</div>')), url);
        // Save the paresd suggestion product, terms and urls in store
        dispatch((0, _results.receiveSearchSuggestions)({ searchSuggestion: searchSuggestion }));
    };
};

var getSearchSuggestions = exports.getSearchSuggestions = function getSearchSuggestions(inputValue, sliAutoComplete) {
    return function (dispatch) {

        // Get the suggestion url from variable daynamiclly
        var getSuggestionURL = '' + sliAutoComplete.opts.base + sliAutoComplete.opts.params + inputValue;
        var $ = window.jQuery;

        // Check if the default sli function not override call the override function
        if (!window.overrideSliAutocomplete) {
            overrideSliAutocompleteFunction(dispatch, sliAutoComplete);
        }

        // Get suggestion products and terms by ajax
        $.ajax({
            url: getSuggestionURL,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp'
        });
    };
};
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'


import * as headerActions from './actions'

import * as selectors from './selectors'


import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import SearchAction from 'gr-test-packages/search-action'

import {injectIntl} from 'react-intl'



class TestContainerSearchAction extends React.Component {
    constructor(props) {
        super(props)

        this.onChangeSearchQuery = this.onChangeSearchQuery.bind(this)
        this.closeSearch = this.closeSearch.bind(this)
    }

    componentWillMount() {
        const {initHeader} = this.props
        initHeader()
    }

    onChangeSearchQuery(e) {
        const {value} = e.target
        this.props.searchQueryChanged(value)
    }

    onSearchSubmit(e) {
        e.preventDefault()

        const value = e.target.query.value
        this.props.searchSubmit(value)
    }



    closeSearch() {

    }

    render() {
        const {
            sliConfigLoaded,
            searchSuggestions,
            search,
        } = this.props

        const emptyResultsImage = getAssetUrl('static/legacy/img/empty-search@2x.png')


        return (
            <div> 
                <SearchAction priceFunction={window.priceAPI_RAC}
                    sliAutoComplete={window.sliAutocomplete}
                    emptyResultsImage={emptyResultsImage}
                    sliPath={window.sli_path}
                    closeSearch={this.closeSearch}
                    sliConfigLoaded={sliConfigLoaded}
                    placeholder={search && search.placeholderText ? search.placeholderText : ''}
                    searchSuggestions={searchSuggestions} />
            </div>
        )
    }
}

TestContainerSearchAction.propTypes = {
    initHeader: PropTypes.func,
    search: PropTypes.object,
    searchQueryChanged: PropTypes.func,
    searchSubmit: PropTypes.func,
    searchSuggestions: PropTypes.object,
    sliConfigLoaded: PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    search: selectors.getSearch,
    searchIsOpen: selectors.getSearchIsOpen,
    searchSuggestions: selectors.getSearchSuggestions,
    showBackButton: selectors.showBackButton,
    sliConfigLoaded: selectors.getSliCofigLoaded,
})

const mapDispatchToProps = {
    initHeader: headerActions.initHeader,
    searchSubmit: headerActions.searchSubmit,
    searchQueryChanged: headerActions.searchQueryChanged,
    clearSuggestions: headerActions.clearSuggestions,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TestContainerSearchAction))


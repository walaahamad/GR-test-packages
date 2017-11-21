import {parseTextLink} from 'gr-test-utils/parser-utils'


export const getSlicRacConfigScriptUrl = () => {
    const $ = window.jQuery
    return $('body').find('script[src*="sli-rac.config"]')
    .attr('src')
}

const parseSearch = ($response) => (
    {
        placeholderText: $response.find('#searchBox input')
            .attr('placeholder') || ''
    }
)

const myAccountItemsIds = ['#login', '#myAccount', '#recommendations', '#giftregistry', '#wishlist', '#orderStatus']

const parseHeaderContent = () => {
    const $ = window.jQuery
    const $html = $('body')

    return {
        logoLink: parseTextLink($html.find('#logo1 > a')),
        search: parseSearch($html),
        myAccountListData: myAccountItemsIds
        .reduce((result, item) => {
            const link = parseTextLink($html.find(item).find('a'))
            if (link.href) {
                result.push(link)
            }
            return result
        }, [])
    }
}

export default parseHeaderContent

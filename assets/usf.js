/* USF file - DO NOT MODIFY THIS FILE. THIS FILE IS REGULARLY CHANGED BY USF APP AND **ANY DIRECT CHANGES WILL BE LOST**. Use our in-app customization if you need to update CSS and JS code. Auto modified at: 9/5/2025 8:58:20 AM*/
/* Begin custom theme code */
// define templates for the Turbo theme - 5.0
window.USF_FILTER_AVOID_STICKY_HEADER_HORZ_DESKTOP = window.USF_FILTER_AVOID_STICKY_HEADER_VERT_DESKTOP  = ['.main_nav_wrapper.sticky_nav'];
window.USF_FILTER_AVOID_STICKY_HEADER_VERT_MOBILE = ['header'];

var _usf_products_per_row_pc,
    _usf_products_per_row_phone,
    _usf_quick_shop_style,
    _usf_image_loading_style,
    _usf_object_fit,
    _usf_collection_height,
    _usf_collection_secondary_image,
    _usf_collection_swatches,
    _usf_quick_shop_enabled,
    _usf_show_payment_button,
    _usf_product_form_style,
    _usf_money_format,
    _usf_currency,
    _usf_cart_action,
    usfNoImageUrl,
    dataMoneyFormat,
    dataShopCurrency,
    usfAssetUrl;



function get_usfAddonProductClassPC() {
    if (_usf_products_per_row_pc == 2) return " eight columns ";
    else if (_usf_products_per_row_pc == 3) return " one-third column ";
    else if (_usf_products_per_row_pc == 4) return " four columns ";
    else if (_usf_products_per_row_pc == 5) return " one-fifth column ";
    else if (_usf_products_per_row_pc == 6) return " one-sixth column ";
    else return " one-seventh column "
}

function get_usfAddonSkeletonClassPC() {
    if (_usf_products_per_row_pc == 2) return " usf-grid-el-1-2 ";
    else if (_usf_products_per_row_pc == 3) return " usf-grid-el-1-3";
    else if (_usf_products_per_row_pc == 4) return " usf-grid-el-1-4 ";
    else if (_usf_products_per_row_pc == 5) return " usf-grid-el-1-5 ";
    else if (_usf_products_per_row_pc == 6) return " usf-grid-el-1-6 ";
    else return " one-seventh column "
}


function get_usfAddonProductClassMobile() {
    if (_usf_products_per_row_phone == "1") return " medium-down--one-half small-down--one-whole ";
    return " medium-down--one-half small-down--one-half ";
}

var _usfImageWidths;

// hoverImageUrl || selectedImageUrl
function _usf_getProductIMGStyle(img, imageResized) {
    var background_color = "",
        crop_to_aspect_ratio = "",
        imageWidth = "";

    //Low quality image loads first
    if (_usf_image_loading_style == 'color') {
        if (_usf_object_fit == true) {
            crop_to_aspect_ratio = `max-height: ${_usf_collection_height}px; width: calc(${img.width} /  ${img.height} * ${_usf_collection_height}px);`
        }
        //console.log(_usfGetScaledImageUrl(imageResized, '1'))
        background_color = `background: url('${_usfGetScaledImageUrl(imageResized, '1')}');`;
    }
    var style = `${background_color} ${crop_to_aspect_ratio} max-width:${img.width}px`;
    // //console.log(style);
    return style;
    // {{ background_color }}{{ crop_to_aspect_ratio }} {% unless stretch_width == true or object_fit %}max-width: {{ image.width }}px;{% endunless %}
}



function _getDataImages(product) {
    var data = '';
    if (product.images.length)
        product.images.filter((img, index) => {
            data += data != '' ? '~' : '';
            data += `${img.url}^${product.title}^${product.id}${index}^600^image`
        });
    else
        data = `${usfNoImageUrl}^${product.title}^${product.id}0^600^image`
    return data
}

function _getDataThumbailImages(product) {
    var data = '';
    product.images.filter((img, index) => {
        data += data != '' ? '~' : '';
        data += `${img.url}^image^${product.id}${index}^600`
    })
    return data
}
function _getDataCollectionHandles(product) {
    var data = '';
    product.collections.filter(col => {
        data += data != '' ? ',' : '';
        data += _usfCollectionById[col]
    })
    return data
}


function _strimHtml(source) {
    return source.replace(/<[^>]*>?/gm, '')
}

var _usfProductPrice = `
<span v-if="_col_handle.coming_soon" class="modal_price">Coming soon</span>
<span v-else class="price" :class="{'sale': hasDiscount}" v-if="!usf.plugins.lastRenderResult">
    <div v-if="isSoldOut && usf.settings.search.showSoldOut && !_usfSettingGlobal.display_price" class="sold-out" v-html="loc.soldOut"></div>
    <template v-else>
        <span class="current_price" :data-min="minPrice">
            <small v-if="priceVaries && !product.selectedVariantId && minDiscountedPrice > 0"><em v-html="loc.from"></em></small>
            <span v-if="minDiscountedPrice > 0" class="money" v-html="priceVaries && !product.selectedVariantId ? displayMinDiscountedPrice : displayDiscountedPrice"></span>
            <span v-else v-html="_usfSettingGlobal.free_price_text"></span>
        </span>
        <span class="was_price">
            <span v-if="hasDiscount" class="money" v-html="displayPrice"></span>
        </span>
    </template>
</span>
`;

var _usfNotifyForm = `
<div v-if="_usfNotifySettings.notify_me_form" :class="'notify_form notify-form-' + product.id" :id="'notify-form-' + product.id" :style="!isSoldOut ? 'display:none' : false">
  <p class="message"></p>
  <form method="post" action="/contact#notify_me" id="notify_me" accept-charset="UTF-8" class="contact-form" onsubmit="window.Shopify.recaptchaV3.addToken(this, 'contact'); return false;">
      <input type="hidden" name="form_type" value="contact">
      <input type="hidden" name="utf8" value="✓">
      <p>
          <label aria-hidden="true" class="visuallyhidden" for="contact[email]" v-html="_usfNotifySettings.description + ':'"></label>
          <span v-if="_usfNotifySettings.notify_me_richtext" v-html="_usfNotifySettings.notify_me_richtext"></span>
        <div class="notify_form__inputs" :class="{'customer--true': window._usfCustomer}" :data-url="_usfNotifySettings.canonical_url" :data-x="product.variants.length == 1 && isSoldOut">
            <template v-if="product.variants.length == 1 && isSoldOut">
                <input v-if="window._usfCustomer" type="hidden" name="contact[email]" class="notify_email" id="contact[email]" :value="window._usfCustomerEmail" />
                <input v-else required type="email" class="notify_email" name="contact[email]" id="contact[email]" :placeholder="_usfNotifySettings.email_placeholder" :value="_usfNotifySettings.contact_fields_email" />
                <input type="hidden" name="challenge" value="false" />
                <input type="hidden" name="contact[body]" class="notify_form_message" :data-body="_usfNotifySettings.message_content.replace('{{ product }}',product.title).replace('{{ url }}',_usfNotifySettings.canonical_url)" :value="_usfNotifySettings.message_content.replace('{{ product }}',product.title).replace('{{ url }}',_usfNotifySettings.canonical_url)" />
                <input class="action_button" type="submit" :value="_usfNotifySettings.notify_form_send" style="margin-bottom:0px" />
            </template>
        </div>
      </p>
  </form>
</div>
`;
var usfQuickShopButtonTpl = `
 <!-- added data-vendor to support turbo 6.0.7 tested on >=5.0-->
<span class="quick_shop ss-icon js-quick-shop-link" :data-id="product.id" :data-handle="product.urlName" :data-title="product.title" :data-single-variant="product.variants.length == 1 ? 'true' : 'false'"
 :data-url="productUrl"
 :data-vendor="product.vendor"
 :data-details-text="loc.seeFullDetails"
 :data-full-description="product.description" 
 :data-regular-description="_usfTruncateWords(product.description,_usfSettingGlobal.description_words)" 
 :data-feat-img="_usfGetScaledImageUrl(scaledSelectedImageUrl,'large')"
 :data-images="_getDataImages(product)" 
 :data-thumbnail-images="_getDataThumbailImages(product)" 
 :data-collection-handles="_getDataCollectionHandles(product)"
 v-html="loc.quickView" ></span>
<div :class="'quickshop-forms__container js-quickshop-forms__container js-quickshop-forms--' + product.id">
        `+ _usfNotifyForm + `  <usf-form :product="product"></usf-form>
</div>`;
var _usfProductInfoTpl = `
<div class="product-details">
            <!-- product title -->
            <span class="title" itemprop="name" :attrs="usf.plugins.invoke('getProductTitleAttrs', pluginData)"
                v-html="product.title"></span>
            <!-- Vendor -->
            <span class="brand" v-if="usf.settings.search.showVendor && _usfSettingGlobal.display_vendor" v-html="product.vendor"></span>
            <!-- Product review -->
            <div class="shopify-reviews reviewsVisibility--true">
                <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
            </div>
            <!-- price -->
            <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
            `+ _usfProductPrice + `
        </div>`

var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.showSwatchLabel ? ' usf-show-swatch-label usf-show-swatch-label--' + facet.swatchLabelDisplay : '') + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option @onToggleFilter="onToggleFilter" v-for="o in visibleOptions" :facet="facet" :option="o"  :key="(o.id ? +o.id + '_': '') + (o.label ? o.label + '_': '') + (o.llabel ? o.llabel + '_': '') + (o.min ? o.min + '_': '') + (o.max ? o.max : '')"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = /*inc_begin_search-views*/
`<div class="usf-views">
    <button class="usf-view usf-btn usf-icon usf-icon-grid" aria-label="Grid view" :class="{'usf-active': view === 'grid'}" @click.prevent.stop="onGridViewClick"></button>
    <button class="usf-view usf-btn usf-icon usf-icon-list" aria-label="List view" :class="{'usf-active': view === 'list'}" @click.prevent.stop="onListViewClick"></button>
</div>`
/*inc_end_search-views*/;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: /*inc_begin_app*/
`<div id="usf_container" class="usf-zone" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <usf-filters></usf-filters>
    </template>
    <usf-sr></usf-sr>
</div>`
/*inc_end_app*/,
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <template v-if="usf.isMobile">
        <div class="usf-sr-config" >
            <template v-if="usf.settings.filters.filtersMobileStyle !== 'horz-scrolling-pills'">
                <div class="usf-sr-config__mobile-filters-wrapper">
                    <div class="usf-filters" :class="{'usf-has-filters': !!facetFilterIds.length}" @click="onMobileToggle">
                        <button class="usf-btn" v-html="loc.filters"></button>
                    </div>
                    ` + _usfSearchResultsSortByTpl + `
                </div>
            </template>
            <template v-else >
                
			    <usf-pill-filters/>
            </template>
            ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
            
        </div>
        <div v-if="usf.settings.filters.filtersMobileStyle === 'horz-scrolling-pills'">
            <usf-pill-filter-breadcrumb/>
        </div>
    </template>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>

    <div :class="(view === \'grid\' ? \'product-list collection-matrix clearfix equal-columns--clear equal-columns--outside-trim\' : \'list-view-items\') + \' usf-results usf-\' + view" class="product-list">
        <template v-if="loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-if="view === 'grid'">
                    <template v-for="p in result.items"><usf-sr-griditem :product="p" :result="result" :key="p.id+'_'+(p.selectedVariantId ? p.selectedVariantId : '')"></usf-sr-griditem></template>
                </template>
                <template v-else>
                    <template v-for="p in result.items"><usf-sr-listitem :product="p" :result="result" :key="p.id+'_'+(p.selectedVariantId ? p.selectedVariantId : '')"></usf-sr-listitem></template>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, usf.utils.encodeHtml(term)) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilterIds.length" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    searchResultsGridViewItem: `
<div :data-col-handle="(_col_handle = _usfCollectionHandles(product)).new" class="usf-sr-product thumbnail " :class="['product-' + product.id,get_usfAddonProductClassPC(),get_usfAddonProductClassMobile(),'quick-shop-style--' + _usf_quick_shop_style]" :product-selector="product.id" :data-usf-pid="product.id">
<div class="product-wrap">
    <div class="relative product_image" :class="{'swap-true':(usf.settings.search.showAltImage),'swap-false':!usf.settings.search.showAltImage}">
        <a :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" style="display:block;position: relative;">
            <div class="image__container">
                <div class="image-element__wrap" :style="_usf_getProductIMGStyle(selectedImage,scaledSelectedImageUrl)">
                    <img :alt="selectedImage.alt || product.title"
                        :src="_usfGetScaledImageUrl(scaledSelectedImageUrl,'50')"
                        data-sizes="auto"
                        :data-aspectratio="_usfGetImageRatio(selectedImage)"
                        :data-src="_usfGetScaledImageUrl(scaledSelectedImageUrl,'1600')"
                        :data-srcset="_usfGetImageUrls(scaledSelectedImageUrl)"
                        :height="selectedImage.height"
                        :width="selectedImage.width"
                        :class="'main---img lazyload transition--'+_usf_image_loading_style "
                    >
                </div>
            </div>
            <div class="image__container" v-if="_usf_collection_secondary_image && usf.settings.search.showAltImage  ">
                <img :alt="selectedImage.alt || product.title"
                    :src="hoverImageUrl || selectedImageUrl"
                    class="secondary lazyload"
                >
            </div>



                


                <!-- Wishlist -->
                <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>

                <!-- Labels -->
                <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
        </a>
        <div v-if="_usfSettingGlobal.thumbnail_hover_enabled || (_usf_quick_shop_enabled && _usf_quick_shop_style == 'popup')" class="thumbnail-overlay">
            <a :href="productUrl" itemprop="url" class="hidden-product-link" v-html="product.title"></a>
            <div class="info">
                <template v-if="window._usfSettingGlobal.thumbnail_hover_enabled">
                    `+ _usfProductInfoTpl + `
                </template>
                <template v-if="_usf_quick_shop_enabled && _usf_quick_shop_style == 'popup'">
                    `+ usfQuickShopButtonTpl + `
                </template>
            </div>
        </div>
        <div class="banner_holder">
            <div v-if="!isSoldOut && hasDiscount && _usfSettingGlobal.sale_banner_enabled && usf.settings.search.showSale" class="sale_banner thumbnail_banner" v-html="loc.sale"></div>
            <div v-if="_col_handle.new" class="new_banner thumbnail_banner" v-html="_usfNew"></div>
            <div v-if="_col_handle.pre_order" class="preorder_banner thumbnail_banner" v-html="_usfPreOrder"></div>
        </div>
        
           <!-- Conditional rendering for specific tags -->
    <div v-if="product.tags.includes('best-selling-badge')" class="collection-specific-tags">
        <div class="product-tag best-selling">
            <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/heart.png?v=1721673293" width="20" alt="Best Seller">
            <span>Best Seller</span>
        </div>
    </div>

      <div v-if="product.tags.includes('holiday-staple-badge')" class="collection-specific-tags holiday-staple-badge">
        <div class="product-tag holiday-staple">
            <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/Lola_Gift_Icon_a435f3d8-30c8-43fa-8801-1dccab5f67d4.png?v=1757087441" width="20" alt="Just In">
            <span>Holiday Staple</span>
        </div>
    </div>

    <div v-if="product.tags.includes('just-in-badge')" class="collection-specific-tags">
        <div class="product-tag just-in">
            <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/Star.png?v=1721673294" width="20" alt="Just In">
            <span>Just In</span>
        </div>
    </div>

      <div v-if="product.tags.includes('personalize-badge')" class="collection-specific-tags">
        <div class="product-tag personalize-badge">
            <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/Icon_Smile.png?v=1742919149" width="20" alt="personalize-badge">
            <span>Personalize it</span>
        </div>
    </div>

    <div v-if="product.tags.includes('Selling-fast-badge')" class="collection-specific-tags">
        <div class="product-tag selling-fast">
            <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/lightning.png?v=1721673293" width="20" alt="Selling Fast">
            <span>Selling Fast</span>
        </div>
    </div>

    <div v-if="product.tags.includes('irina-fav-badge')" class="irina-fav-tag">
        <div class="product-tag irina-fav">
             <img src="https://cdn.shopify.com/s/files/1/0002/0647/1226/files/star-tag-img.png?v=1737144658" width="20" height="auto">
             <span>Irina's Favorites</span>
        </div>
    </div>
    </div>
    <a v-if="!_usfSettingGlobal.thumbnail_hover_enabled" class="product-info__caption " :href="productUrl">
        `+ _usfProductInfoTpl + `
    </a>
</div>
<template v-if="!(_usf_quick_shop_enabled && _usf_quick_shop_style == 'inline')">
    <usf-color-swatch :product="product"  :productUrl="productUrl" v-if="_usf_collection_swatches"></usf-color-swatch>
</template>

<!--<template v-if="_usf_quick_shop_style == 'popup' && _usf_quick_shop_enabled">
    <usf-color-swatch :product="product" :selectedImageUrl="selectedImageUrl" :productUrl="productUrl" v-if="_usf_collection_swatches"></usf-color-swatch>
</template>-->
<!-- Swatchs-->
<usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
<template v-if="(_usf_quick_shop_style == 'inline' && _usf_quick_shop_enabled)">
            <usf-form :product="product"></usf-form>
</template>
</div>
`,

    // Search result pages
    searchResultsPages: `
<div class="paginate text-center">
    <template v-for="e in elements">
        <span v-if="e.type === 'prev'" class="prev">
            <a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev"><span class="icon-left-arrow"></span></a>
        </span>
        <span v-else-if="e.type === 'dots'" class="deco">…</span>
        <span v-else-if="e.type === 'page' && e.current" class="page current">{{e.page}}</span>
        <span v-else-if="e.type === 'page' && !e.current" class="page"><a href="javascript:void(0)" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)">{{e.page}}</a></span>
        <span v-else-if="e.type === 'next'" class="next">
            <a href="javascript:void(0)" :title="loc.nextPage" @click="onNext"><span class="icon-right-arrow"></span></a>
        </span>
    </template>
</div>
`,

    searchResultsListViewItem: /*inc_begin_search-list-item*/
`<a class="usf-sr-product" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :href="productUrl" :data-usf-pid="product.id">
    <!-- Image column -->
    <div class="usf-img-column">
        <!-- product image -->
        <div class="usf-img-wrapper usf-sr-product__image-container" :class="{'usf-has-second-img': hoverImage}">
            <div class="usf-main-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledSelectedImageUrl)" :style="{'background-image': 'url(' + getSelectedImageUrl('600') + ')'}"></div>
            <span class="usf-img-loader"></span>
            <template v-if="hoverImage">
                <div class="usf-second-img lazyload" :data-bgset="_usfGetScaledImageUrl(scaledHoverImageUrl)" :style="{'background-image': 'url(' + getHoverImageUrl('600') + ')'}"></div>
                <span class="usf-img-loader"></span>
            </template>
            <!-- product image extra -->
            <usf-plugin name="searchResultsProductPreview" :data="pluginData"></usf-plugin>
            <usf-plugin name="searchResultsProductCart" :data="pluginData"></usf-plugin>
            
            <div v-if="isSoldOut && usf.settings.search.showSoldOut" class="usf-badge"><span v-html="loc.soldOut"></span></div>
            <div v-else-if="hasDiscount && usf.settings.search.showSale" class="usf-badge usf-sale-badge"><span v-html="loc.sale"></span></div>
        </div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title" v-html="product.title"></div>
        <div class="usf-vendor" v-if="usf.settings.search.showVendor" v-html="product.vendor"></div>

        <!-- price -->
        <usf-plugin name="searchResultsProductPrice" :data="pluginData"></usf-plugin>
        <div class="usf-price-wrapper" :class="{'usf-price--sold-out': isSoldOut}" v-if="!usf.plugins.lastRenderResult" :data-variant-id="product.selectedVariantId">
            <span class="usf-price" :class="{'usf-has-discount': hasDiscount}" v-html="displayPrice"></span>
            <span class="usf-discount" v-if="hasDiscount" v-html="displayDiscountedPrice"></span>
            <span v-if="hasDiscount" class="usf-price-savings" v-html="loc.save + ' ' + salePercent + '%'"></span>
        </div>
        <div class="usf-description"></div>
    </div>
</a>`
/*inc_end_search-list-item*/,
    // AddToCart Plugin	

    addToCartPlugin: ``,
    // Preview Plugin
    previewPlugin: ``,
    previewPluginModal:``,
    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/`<div v-if="usf.settings.filterNavigation.showFilterArea && facetFilters && facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div v-if="!usf.settings.filters.horz" class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <div v-if="usf.settings.filters.horz" class="usf-title usf-clear usf-refineby__item">
            <!-- Clear all -->
            <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
        </div>
        <template v-for="facetId in facetFilterIds" v-if="(facet = facetsMap[facetId]) && (f = facetFilters[facetId])">
            <div v-for="queryValStr in f[1]" :key="(facetId + '_'+ queryValStr)" class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="removeFacetFilter(facetId, queryValStr)">
                <button class="usf-btn">
                    <span class="usf-filter-label" v-html="facet.title + ': '"></span>
                    <b v-html="formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b>
                </button>
                <span class="usf-remove"></span>
            </div>
        </template>
    </div>
 </div>`/*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone usf-sr-filters" :class="{'usf-facets--mobile':usf.isMobileFilter, 'usf-facets--empty': !hasFacets }">
    <!-- Mobile view -->
    <template v-if="usf.isMobile">
        <div class="usf-close" @click="onMobileBack(1)"></div>
        <div class="usf-facets-wrapper">
            <!-- Header. shows 'Filters', facet name, etc. -->
            <div class="usf-header">
                <!-- Single facet mode -->
                <template v-if="isSingleFacetMode">
                    <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                    <div v-if="facetFilterIds.length" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
                </template>

                <!-- When a filter is selected -->
                <template v-else-if="mobileSelectedFacet">
                    <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                    <div v-if="facetFilterIds.length && facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                    <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
                </template>

                <!-- When no filter is selected -->
                <template v-else>
                    <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                    <div v-if="facetFilterIds.length" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
                </template>
            </div>

            <div class="usf-body">
                <!-- Desktop-like filter in mobile -->
                <template v-if="usf.settings.filters.desktopLikeMobile">
                    <!--<usf-filter-breadcrumb></usf-filter-breadcrumb>-->
                    
                    <!-- Facets body -->
                    <div class="usf-facets__body">
                        <usf-filter v-for="f in facets" :is-collapsed="collapsed && collapsed[f.id]" @onToggleAllFilters="onToggleAllFilters" @onToggleFilter="onToggleFilter" :facet="f" :key="f.id"></usf-filter>
                    </div>
                </template>
                
                <!-- Mobile filter -->
                <template v-else>
                    <!-- List all filter options, in single facet mode -->
                    <usf-filter :is-collapsed="collapsed && collapsed[facets[0].id]" @onToggleAllFilters="onToggleAllFilters" @onToggleFilter="onToggleFilter" v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                    <!-- List all filter options, when a filter is selected -->
                    <usf-filter :is-collapsed="collapsed && collapsed[mobileSelectedFacet.id]" @onToggleAllFilters="onToggleAllFilters" @onToggleFilter="onToggleFilter" v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                    <!-- List all when there are more than one facet -->

                    <template v-else >
                            <div v-for="f in facets" v-if="canShowFilter(f)" class="usf-facet-value" @click="onMobileSelectFacet(f)" :key="f.id">
                                <span class="usf-title" v-html="f.title"></span>
                                <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                    <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                                </div>
                            </div>
                    </template>
                </template>
            </div>

            <!-- View items -->
            <div class="usf-footer">
                <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
            </div>
        </div>
    </template>

    <!-- Desktop view -->
    <div v-else class="usf-facets__wrapper">
        <div class="usf-facets__inner">
            <usf-filter-breadcrumb></usf-filter-breadcrumb>
            <!-- Filters Loader -->
            <div v-if="!facets" class="usf-facets__first-loader">
                <template v-for="i in 3">
                    <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                        <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
                    </div>
                </template>
            </div>
            <!-- Facets body -->
            <div v-else class="usf-facets__body">
                <usf-filter  :is-collapsed="collapsed && collapsed[f.id]" @onToggleAllFilters="onToggleAllFilters" @onToggleFilter="onToggleFilter" :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
            </div>
        </div>
    </div>
</div>`/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}" :id="'usf-facet-'+id">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container"  :style="[filterOptionsContainerStyle]">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter || showSwatchLabel ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="(swatchImage && usf.isMobileFilter) || showSwatchLabel" class="usf-mobile-swatch" :style="swatchStyle"></div>

   <!-- option label -->
    <span class="usf-label usf-btn" >
        <span v-html="label"></span>
        <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) || showSwatchLabel && option.value !== undefined" class="usf-value">{{option.value}}</span>
    </span>
    
</button>`
/*inc_end_filter-option*/,



    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '') + ' usf-is-layout--'+settings.layout  + ' usf-is-sr--'+settings['productDisplayType'] + ' usf-is-sr--products-on-'+settings['productColumnPosition'] "  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search" @submit="onSearhBoxSubmit">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <div class="usf-is-content-container">
                <!-- Body content -->
                <div class="usf-is-content"  :style="{'max-height': maxHeight+'px'}" :class="{'usf-is-content--without-sidebar': isEmptyExtraData, 'usf-is-content--without-results': !(queryOrTerm || (!queryOrTerm && settings.showPopularProducts))}">
                    <!-- Products -->
                    <div class="usf-is-matches usf-is-products" v-if="(queryOrTerm || (!queryOrTerm && settings.showPopularProducts))">
                        <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                        
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="result.items.length && termDiffers"></span>

                        <div class="usf-is-list" :style="'--product-list-items-per-row:'+ settings.productsPerRow " v-if="result.items.length">
                            <!-- Product -->
                            <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                        </div>
                        <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                    </div>

                    <div class="usf-is-side" :style="{'height': maxHeight+'px'}" v-if="!isEmptyExtraData">
                        <!-- on searching -->
                        <template v-if="queryOrTerm">
                            <!-- Suggestions -->
                            <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                                <div class="usf-title" v-html="loc.searchSuggestions"></div>
                                <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                            </div>

                            <!-- Most popular suggestions -->
                            <div class="usf-is-matches usf-is-suggestions" v-if="result.popularSearch && result.popularSearch.length">
                                <div class="usf-title" v-html="loc.popularSearches"></div>
                                <button v-for="s in result.popularSearch" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                            </div>

                            <!-- Collections -->
                            <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                                <div class="usf-title" v-html="loc.collections"></div>
                                <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                            </div>

                            <!-- Pages -->
                            <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                                <div class="usf-title" v-html="loc.pages"></div>
                                <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                            </div>
                        </template>

                        <!-- default screen -->
                        <template v-else>
                            <!-- Recently Search -->
                            <div class="usf-is-matches usf-is-suggestions usf-is-recently-search" v-if="recentlySearches && recentlySearches.length && showRecentSearches">
                                <div class="usf-title">
                                    <span v-html="loc.latestSearches"></span>
                                    <button class="usf-btn" v-html="loc.clear" @click.prevent.stop="clearAllRecentSearches"></button>
                                </div>
                                <div v-for="(s, index)  in recentlySearches" :key="s['title']" class="usf-is-match"   v-if="s && s['title']" @click="search(s['title'])">
                                    <div>
                                        <i class="usf-icon usf-icon-rollback"></i>
                                        <span v-html="s['title']"></span>
                                    </div>
                                    <button class="usf-icon usf-icon-x usf-btn" @click.prevent.stop="()=>{removeRecentSearchAtIndex(index)}"></button>
                                </div>
                            </div>

                            <!-- Manual Suggestions -->
                            <div class="usf-is-matches usf-is-suggestions usf-is-suggestions--manual" v-if="manualSuggestions && manualSuggestions.length && showManualSuggestion">
                                <div class="usf-title" v-html="loc.popularSearches"></div>
                                <div class="usf-is-match-list">
                                    <button v-for="(s, index) in manualSuggestions" :key="s" class="usf-btn usf-is-match"  @click="search(s)">
                                        <i class="usf-icon usf-icon-trending-up"></i>
                                        <span v-html="s"></span>
                                    </button>
                                </div>
                            </div>
                        </template>

                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall"  v-if="(queryOrTerm || (!queryOrTerm && settings.showPopularProducts))">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`/*inc_end_instantsearch*/
    ,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/`<div class="usf-is-product usf-clear" @click="onItemClick" v-if="usf.isMobile || usf.settings.instantSearch.layout!=='full'">
   <!-- Image -->
   <div class="usf-img-wrapper usf-is-img-wrapper" style="--aspect-ratio: 1;">
      <img class="usf-img" :src="selectedImageUrl">
   </div>
   <div class="usf-is-content-wrapper">
      <!-- Title -->
      <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>
      <!-- Vendor -->
      <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>
      <!-- Prices -->
      <div class="usf-price-wrapper">
         <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
         <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
      </div>
   </div>
</div>
    <div class="usf-is-product-card" v-else-if="usf.settings.instantSearch.layout =='full' && usf.settings.instantSearch['productDisplayType']=='grid'">
        <div class="usf-is-product-card__figure">
             <a :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" class="usf-is-product-card__media">
                <img v-if="product.images.length" :src="selectedImageUrl" :alt="product.title" :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :width="selectedImage.width" :height="selectedImage.height" loading="lazy" sizes="(max-width: 699px) calc(100vw / 1 - 40px), (max-width: 999px) calc(100vw / 0 - 64px), calc((100vw - 96px) / 3 - (24px / 3 * 2))" class="usf-is-product-card__image usf-is-product-card__image--primary">
                <img v-else :src="selectedImageUrl" :alt="product.title" :width="selectedImage.width" :height="selectedImage.height" loading="lazy" sizes="(max-width: 699px) calc(100vw / 1 - 40px), (max-width: 999px) calc(100vw / 0 - 64px), calc((100vw - 96px) / 3 - (24px / 3 * 2))" class="usf-is-product-card__image usf-is-product-card__image--primary">
                <img v-if="hoverImage" :src="hoverImageUrl" :alt="product.title" :srcset="_usfGetSrcset(hoverImage,scaledHoverImageUrl)" :width="hoverImage.width" :height="hoverImage.height" loading="lazy" sizes="(max-width: 699px) calc(100vw / 1 - 40px), (max-width: 999px) calc(100vw / 0 - 64px), calc((100vw - 96px) / 3 - (24px / 3 * 2))" class="usf-is-product-card__image usf-is-product-card__image--secondary image-background">
            
                <!-- Wishlist -->
                <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                <!-- Labels -->
                <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
            </a>
        </div>
        <div class="usf-is-product-card__info">
            <div class="usf-is--full__v-stack justify-items-center usf-gap" style="--usf-gap: 2">
                <div class="usf-is--full__v-stack justify-items-center usf-gap" style="--usf-gap: 1">
                    <a :href="productUrl" class="product-title h6 galine-clamp" style="--line-clamp-count:2" v-html="product.title"></a>
                    <div class="price-list ">
                        <template v-if="product.selectedVariantId">
                            <span class="h6" :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                <span class="usf-is--full__sr-only">Sale price</span>
                                <span v-html="displayDiscountedPrice"></span>
                            </span>

                            <span :hidden="!hasDiscount" class="text-subdued line-through h6">
                                <span class="usf-is--full__sr-only">Regular price</span>
                                <span v-html="displayPrice"></span>
                            </span>
                        </template>
                        <template v-else>
                            <template v-if="priceVaries">
                                <!-- Change to true if use from strategy -->
                                <span v-if="false" class="h6"  :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                    <span class="usf-is--full__sr-only">Sale price</span>
                                    <span v-html="loc.from + ' ' + displayMinDiscountedPrice"></span>
                                </span>
                                <span v-else class="text-on-sale h6" >
                                    <span class="usf-is--full__sr-only">Sale price</span>
                                    <span v-html="displayMinDiscountedPrice"></span>
                                </span>
                            </template>
                            <span v-else class="h6"  :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                <span class="usf-is--full__sr-only">Sale price</span>
                                <span v-html="displayDiscountedPrice"></span>
                            </span>

                            <span v-if="hasDiscount" class="text-subdued line-through h6" >
                                <span class="usf-is--full__sr-only">Regular price</span>
                                <span v-html="displayPrice"></span>
                            </span>
                        </template>
                    </div>
                </div>
            </div>
            <!--<fieldset class="h-stack wrap justify-center usf-gap" style="--usf-gap: 1" data-option-position="1">
                <input class="usf-is--full__sr-only" type="radio" name="swatch--usf-predictive-search-855853400108-1" id="option-value--usf-predictive-search--swatch--usf-predictive-search-855853400108-1-blush" value="Blush" checked="checked" />
                <label
                    class="color-swatch"
                    for="option-value--usf-predictive-search--swatch--usf-predictive-search-855853400108-1-blush"
                    data-option-value=""
                    style="--swatch-background: url(//cdn.shopify.com/s/files/1/0011/9242/7564/files/blush.png?v=1613668218&amp;width=72);"
                >
                    <span class="usf-is--full__sr-only">Blush</span>
                </label>
            </fieldset>
            <a href="/products/scarlett-fine-dress-blush?_pos=1&amp;_psq=dress&amp;_ss=e&amp;_v=1.0#shopify-product-reviews" class="rating-badge" title="1 review">
                <div class="rating-badge__stars" role="img" aria-label="5.0 out of 5.0 stars">
                    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
                        <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#1c1c1c"></path>
                    </svg>
                    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
                        <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#1c1c1c"></path>
                    </svg>
                    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
                        <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#1c1c1c"></path>
                    </svg>
                    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
                        <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#1c1c1c"></path>
                    </svg>
                    <svg aria-hidden="true" focusable="false" width="12" class="icon icon-star-rating" viewBox="0 0 12 11">
                        <path d="M6 0v8.635L2.292 11 3.48 6.87 0 4.202l4.443-.187L6 0Zm0 0v8.635L9.708 11 8.52 6.87 12 4.202l-4.443-.187L6 0Z" fill="#1c1c1c"></path>
                    </svg>
                </div>
                <span class="smallcaps text-xxs text-subdued">(5.0)</span>
            </a>-->
        </div>

        <!-- Product review -->
        <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
        <!-- Swatch-->
        <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
    </div>
    <div class="usf-is-horizontal-product-card" v-else-if="usf.settings.instantSearch.layout =='full' && usf.settings.instantSearch['productDisplayType']=='list'">
        <a :href="productUrl" class="usf-is-horizontal-product-card__figure">
            <img v-if="product.images.length" :src="selectedImageUrl" :alt="product.title" :srcset="_usfGetSrcset(selectedImage,scaledSelectedImageUrl)" :width="selectedImage.width" :height="selectedImage.height" loading="lazy" sizes="(max-width: 699px) calc(100vw / 1 - 40px), (max-width: 999px) calc(100vw / 0 - 64px), calc((100vw - 96px) / 3 - (24px / 3 * 2))" class="usf-is-horizontal-product-card__image">
            <img v-else :src="selectedImageUrl" :alt="product.title" :width="selectedImage.width" :height="selectedImage.height" loading="lazy" sizes="(max-width: 699px) calc(100vw / 1 - 40px), (max-width: 999px) calc(100vw / 0 - 64px), calc((100vw - 96px) / 3 - (24px / 3 * 2))" class="usf-is-horizontal-product-card__image">
        </a>
        <div class="usf-is-horizontal-product-card__info">
            <div class="usf-is--full__v-stack -items-star usf-gap" style="--usf-gap: 2">
                <a :href="productUrl" class="product-title h6" v-html="product.title"></a>
            
                    <div class="price-list ">
                        <template v-if="product.selectedVariantId">
                            <span class="h6" :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                <span class="usf-is--full__sr-only">Sale price</span>
                                <span v-html="displayDiscountedPrice"></span>
                            </span>

                            <span :hidden="!hasDiscount" class="text-subdued line-through h6">
                                <span class="usf-is--full__sr-only">Regular price</span>
                                <span v-html="displayPrice"></span>
                            </span>
                        </template>
                        <template v-else>
                            <template v-if="priceVaries">
                                <!-- Change to true if use from strategy -->
                                <span v-if="false" class="h6"  :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                    <span class="usf-is--full__sr-only">Sale price</span>
                                    <span v-html="loc.from + ' ' + displayMinDiscountedPrice"></span>
                                </span>
                                <span v-else class="text-on-sale h6" >
                                    <span class="usf-is--full__sr-only">Sale price</span>
                                    <span v-html="displayMinDiscountedPrice"></span>
                                </span>
                            </template>
                            <span v-else class="h6"  :class="{'text-on-sale': hasDiscount,'text-subdued': !hasDiscount}">
                                <span class="usf-is--full__sr-only">Sale price</span>
                                <span v-html="displayDiscountedPrice"></span>
                            </span>

                            <span v-if="hasDiscount" class="text-subdued line-through h6" >
                                <span class="usf-is--full__sr-only">Regular price</span>
                                <span v-html="displayPrice"></span>
                            </span>
                        </template>
                    </div>
            </div>
        </div>
    </div>`
    /*inc_end_instantsearch-item*/,

// Instant search full popup
instantSearchFull: /*inc_begin_instantsearchfull*/
`<div :class="'usf-popup usf-zone usf-is usf-is--full usf-is--' + position + (shouldShow ? '' : ' usf-hide')  + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '') +' usf-is-layout--'+settings.layout  + ' usf-is-sr--'+usf.settings.instantSearch['productDisplayType'] + ' usf-is-sr--products-on-'+usf.settings.instantSearch['productColumnPosition']"  style="left: 0; top:0; width: 100vw; height: 100vh;">
   <div class="usf-is--full__content">
        <div class="usf-is--full__container">
            <form  method="GET" class="usf-is--full__form" :action="searchUrl" role="search"  @submit="onSearhBoxSubmit">
                <div class="usf-is--full__form-control">
                    <svg aria-hidden="true" fill="none" focusable="false" width="20" class="usf-is--full__icon" viewBox="0 0 24 24">
                        <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
                        <path d="M15.857 15.858 21 21.001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"></path>
                    </svg>
                    <input type="search" spellcheck="false" class="usf-is--full__input" aria-label="Search" placeholder="Search for..." name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
                    <button type="button" @click="usf.utils.hideInstantSearch">
                        <span class="usf-is--full__sr-only">Close</span>
                        <svg aria-hidden="true" focusable="false" fill="none" width="16" class="usf-is--full__icon" viewBox="0 0 16 16">
                            <path d="m1 1 14 14M1 15 15 1" stroke="currentColor" stroke-width="1.5"></path>
                        </svg>
                    </button>
                </div>
            </form>

            <!-- First loader -->
            <div class="usf-is-first-loader" v-if="firstLoader">
                <div class="usf-clear">
                    <div class="usf-img"></div>
                    <div class="usf-title"></div>
                    <div class="usf-subtitle"></div>
                </div>
                <div class="usf-clear">
                    <div class="usf-img"></div>
                    <div class="usf-title"></div>
                    <div class="usf-subtitle"></div>
                </div>
                <div class="usf-clear">
                    <div class="usf-img"></div>
                    <div class="usf-title"></div>
                    <div class="usf-subtitle"></div>
                </div>
            </div>

            <!-- All JS files loaded -->
            <div class="usf-predictive-search" v-else>
                <div class="usf-predictive-search__content">
                    <!-- Did you mean -->
                    <p v-if="isEmpty" class="usf-predictive-search__no-results text-lg" v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></p>
                    <template  v-else>
                        <p v-if="termDiffers" class="usf-predictive-search__no-results text-lg" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)"></p>
                        
                        <div class="usf-predictive-search__results"  :class="{'usf-predictive-search__results--with-suggestions': !isEmptyExtraData, 'usf-predictive-search__results--with-sr': (queryOrTerm || (!queryOrTerm && settings.showPopularProducts))}">
                            <div class="usf-predictive-search__resource-item"  v-if="!isEmptyExtraData">
                                <!-- on searching -->
                                <template v-if="queryOrTerm">
                                    <!-- Default suggestions -->
                                    <div class="usf-is--full__v-stack usf-gap" style="--usf-gap: 6; --usf-gap-sm: 6" v-if="result.suggestions && result.suggestions.length">
                                        <p class="usf-predictive-search__category h6 text-subdued" v-html="loc.searchSuggestions"></p>
                                        <div class="usf-predictive-search__suggestions scroll-area bleed md:unbleed">
                                            <div :key="s" v-for="s in result.suggestions" @click="search(s)">
                                                <a href="" class="link-reverse" v-html="usf.utils.highlight(s, result.query)">
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Most popular suggestions -->
                                    <div class="usf-is--full__v-stack usf-gap" style="--usf-gap: 6; --usf-gap-sm: 6" v-if="result.popularSearch && result.popularSearch.length">
                                        <p class="usf-predictive-search__category h6 text-subdued" v-html="loc.popularSearches"></p>
                                        <div class="usf-predictive-search__suggestions scroll-area bleed md:unbleed">
                                            <div :key="s" v-for="s in result.popularSearch" @click="search(s)">
                                                <a href="" class="link-reverse" v-html="usf.utils.highlight(s, result.query)">
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </template>

                                <!-- default screen -->
                                <template v-else>
                                    <div class="usf-is--full__v-stack usf-gap" style="--usf-gap: 6; --usf-gap-sm: 6" v-if="recentlySearches && recentlySearches.length && showRecentSearches">
                                        <p class="usf-predictive-search__category h6 text-subdued" v-html="loc.latestSearches"></p>
                                        <div class="usf-predictive-search__suggestions usf-predictive-search__recently-searches scroll-area bleed md:unbleed">
                                            <div class="usf-predictive-search__recently-searches-item" v-for="(s, index)  in recentlySearches" :key="s['title']" v-if="s && s['title']" @click="search(s['title'])">
                                                <div>
                                                    <i class="usf-icon usf-icon-rollback"></i>
                                                    <span v-html="s['title']"></span>
                                                </div>
                                                <button class="usf-icon usf-icon-x usf-btn" @click.prevent.stop="()=>{removeRecentSearchAtIndex(index);}"></button>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div class="usf-is--full__v-stack usf-gap" style="--usf-gap: 6; --usf-gap-sm: 6" v-if="manualSuggestions && manualSuggestions.length && showManualSuggestion">
                                        <p class="usf-predictive-search__category h6 text-subdued" v-html="loc.popularSearches"></p>
                                        <div class="usf-predictive-search__suggestions usf-predictive-search__manual-suggestions scroll-area bleed md:unbleed">
                                            <div class="usf-predictive-search__manual-suggestions-item" v-for="(s, index) in manualSuggestions" :key="s"   @click="search(s)">
                                                <i class="usf-icon usf-icon-trending-up"></i>
                                                <span v-html="s"></span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="usf-predictive-search__tabs usf-is--full__tabs" selected-index="0" style="--item-count: 2; --selected-index: 0;" v-if="(queryOrTerm || (!queryOrTerm && settings.showPopularProducts))">
                                <div class="scrollable usf-is--full__tab-list-scrollable">
                                    <div role="tablist" class="usf-is--full__tab-list">
                                        <button type="button" class="h6" role="tab" @click="tab='products'" :aria-selected="tab==='products'" v-html="queryOrTerm ? loc.productMatches : loc.trending" v-if="result.items.length"></button>
                                        <button type="button" class="h6" role="tab" @click="tab='collections'" :aria-selected="tab==='collections'" v-html="loc.collections" v-if="result.collections && result.collections.length"></button>
                                        <button type="button" class="h6" role="tab" @click="tab='pages'" :aria-selected="tab==='pages'" v-html="loc.pages" v-if="result.pages && result.pages.length"></button>
                                    </div>
                                </div>
                                <div class="usf-is--full__tab-panels">
                                    <div class="usf-predictive-search__resource-item" role="tabpanel" :style="{
                                        display: (tab==='products' ? 'block': 'none')
                                    }">
                                        <div class="usf-is--full__v-stack usf-gap" style="--usf-gap: 8; --usf-gap-sm: 12">
                                            <div class="usf-predictive-search__products" :style="'--product-list-items-per-row: '+ usf.settings.instantSearch.productsPerRow">
                                                <template v-if="result.items.length">
                                                    <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                                                </template>
                                            </div>
                                            <div class="usf-predictive-search__viewall">
                                                <button type="submit" @click="search(queryOrTerm)" class="button button--primary" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))" style="background-color: rgba(var(--color-button));"></button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="usf-predictive-search__resource-item" role="tabpanel" :style="{
                                        display: (tab==='collections' ? 'block': 'none')
                                    }">
                                        <div class="usf-predictive-search__collections" v-if="result.collections && result.collections.length" style="--collection-list-items-per-row: 4">
                                            <a @click="selectCollection(c)" v-for="c in result.collections" href="javascript:void(0)" class="usf-is--full__v-stack usf-gap" style="--usf-gap: 3; --usf-gap-sm: 5">
                                                <span class="h6 sm:h5"  v-html="usf.utils.highlight(c.title, result.query)" >
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="usf-predictive-search__resource-item" v-if="result.pages && result.pages.length" role="tabpanel" :style="{
                                        display: (tab==='pages' ? 'block': 'none')
                                    }">
                                        <div class="usf-predictive-search__pages usf-is--full__v-stack justify-items-start usf-gap" style="--usf-gap: 3">
                                            <a v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)" v-for="p in result.pages" href="javascript:void(0)" class="link-reverse">
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</div>`/*inc_end_instantsearchfull*/
,

/*inc_begin_mobile-pill-filters*/
pillFilter:`
<div class="usf-sr-config__mobile-horz-pill" :class="{'usf-sr-config__mobile-horz-pill--active': isInBreadcrumb}" v-if="canShow">
    <button class="usf-btn" type="button" @click="onClickFilter">
    <span v-html="facet.title"></span>
    <i type="button" class="usf-icon usf-icon-up"></i>
    </button>
</div>
`,

pillFilters:`
<div class="usf-sr-config__mobile-horz-pills-wrapper">
    <div v-if="facets && facets.length" class="usf-sr-config__mobile-horz-pill usf-sr-config__mobile-horz-toggler" :class="{'usf-sr-config__mobile-horz-pill--active': !!facetFilterIds.length}" >
        <button class="usf-btn" type="button" @click="onToggleFiltersMenu">
            <i class="usf-icon usf-icon-equalizer"></i>
        </button>
    </div>
    <usf-pill-dropdown class="usf-sr-config__mobile-horz-pill" :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-pill-dropdown>
    <template v-if="facets && facets.length"> 
            <usf-pill-filter :facet="f" :key="f.id" v-for="f in facets" />
    </template>
</div>
`, 

pillFiltersBreadcrumb:`
<div v-if="settings.filterNavigation.showFilterArea && facetFilters && facets && facetFilterIds.length" class="usf-refineby--pills">
    <ul>
        <template v-for="facetId in facetFilterIds" v-if="(facet = facetsMap[facetId]) && (f = facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <li :key="facetId + '_'+ queryValStr" @click.prevent.stop="removeFacetFilter(facetId, queryValStr)">
                    <button type="button" class="usf-btn">
                        <span v-html="formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></span>
                        <svg viewBox="0 0 24 24" aria-hidden="true" ><path d="m1 1 22 22M23 1 1 23" stroke="currentColor" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linecap="round"></path></svg>
                    </button>
                </li>
            </template>
        </template>
    </ul>

    <div class="usf-refineby--pills--clear"><button  class="usf-btn" type="button" v-html="loc.clearAll" @click.prevent.stop="removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button></div>
 </div>
`,/*inc_end_mobile-pill-filters*/
};

var _usfCollectionHandles = function (p) {
    var e = {};
    p.collections.filter(c => {
        var colHandle = _usfCollectionById[c];
        if (colHandle == 'new')
            e.new = 1;
        if (colHandle == 'coming-soon')
            e.coming_soon = 1;
        if (colHandle == 'pre-order')
            e.pre_order = 1;
    });
    return e;
}

var usfImages = {}

function usfImageExists(url, callback) {
    var v = usfImages[url];
    if (v !== undefined) {
        callback(v);
        return v;
    }

    var img = new Image();
    img.onload = function () {
        usfImages[url] = true;
        callback(true);
    };

    img.onerror = function () {
        usfImages[url] = false;
        callback(false);
    };

    img.src = url;
}


usf.event.add('init', function () {
    //Shopify.theme_settings.sold_out_text = usf.settings.translation.soldOut;
    _usfImageWidths = _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize];
    //set default settings
    _usfSetDefaultSettings();


    var _usfColorSwatch = {
        props: {
            'product': {
                type: Object,
                required: true
            },
        },
        created() {
            let vm = this;
            fetch(`/products/${this.product.urlName}?view=usf-swatches`)
                .then(response => response.text())
                .then(data => {
                    // console.log(data)
                    // this.html = data;
                    vm.html = data.replace(`data-enable-state="true"`, `data-enable-state="false"`);
                    if (_usf_product_form_style == 'swatches' || _usf_quick_shop_style == 'inline')
                        updateSearchViewDebounced();
                });
        },
        data() {
            return {
                html: ''
            }
        },
        template: `
        <div v-html="html">Loading ...</div>
        `
    }
    usf.register(_usfColorSwatch, null, 'usf-color-swatch');



    var UsfForm = {
        props: {
            'product': {
                type: Object,
                required: true
            },
        },
        created() {
            let vm = this;
            fetch(`/products/${this.product.urlName}?view=usf-form`)
                .then(response => response.text())
                .then(data => {
                    // console.log(data)
                    vm.html = data.replace(`data-enable-state="true"`, `data-enable-state="false"`);
                    if (_usf_product_form_style == 'swatches' || _usf_quick_shop_style == 'inline')
                        updateSearchViewDebounced();
                });
        },
        data() {
            return {
                html: ''
            }
        },
        template: `
        <div v-html="html">Loading ...</div>
        `
    }
    usf.register(UsfForm, null, 'usf-form');


});




function _usfSetDefaultSettings() {

    dataMoneyFormat = document.body.getAttribute('data-money-format');
    dataShopCurrency = document.body.getAttribute('data-shop-currency');

    if (Shopify.theme_settings && Shopify.theme_settings.sold_out_text)
        Shopify.theme_settings.sold_out_text = usf.settings.translation.soldOut;
    window._usfPreOrder = window._usfPreOrder || "Pre-Order";
    window._usfNew = window._usfNew || "New";



    var metas = document.querySelectorAll('meta[property="og:image"]')
    for (let i = 0; i < metas.length; i++) {
        var mt = metas[i];
        if (mt && mt.getAttribute('content').includes('no-image')) {
            usfNoImageUrl = mt.getAttribute('content');
            break
        }
    }
    if (!usfNoImageUrl)
        usfNoImageUrl = usf.platform && usf.platform.emptyImage ? usf.platform.emptyImage.url : '';

    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && n.href.indexOf('styles.scss.css') != -1) {
            usfAssetUrl = n.href.split('styles.scss.css')[0];
        }
    }

    window._usfSettingSection = window._usfSettingSection || { "display_collection_title": true, "collection_breadcrumb": false, "collection_tags": false, "collection_sort": true, "featured_collection_image": true, "image_darken": false, "products_per_row": 3, "pagination_limit": 48, "toggle": false }; // pls dont remove it
    window._usfSettingGlobal = window._usfSettingGlobal || {
        "mobile_products_per_row": 2,
        "quick_shop_style": "popup",
        "image_loading_style": "fade-in",
        "object_fit": true,
        "collection_secondary_image": false,
        "collection_swatches": false,
        "quick_shop_enabled": true,
        "show_payment_button": false,
        "product_form_style": "swatches",
        "money_format": "{{amount_no_decimals_with_comma_separator}}₫",
        "currency": "VND",
        "limit_quantity": true,
        "display_inventory_left": false,
        "cart_action": null,
        "description_words": 25,
        "thumbnail_hover_enabled": false,
        "display_product_quantity": true,
        "sale_banner_enabled": true,
        "free_price_text": "Free",
        "display_price": false,
        "display_vendor": false
    };
    window._usfNew = window._usfNew || "New";
    window._usfPreOrder = window._usfPreOrder || "Pre-Order";
    window._usfNotifySettings = window._usfNotifySettings || {
        notify_me_form: true,
        description: "translation missing: en.products.notify_form.description",
        notify_me_richtext: "\u003cp\u003eNotify me when this product is available:\u003c\/p\u003e",
        canonical_url: "https:\/\/ajis982zxqlmy7wo-33515405452.shopifypreview.com\/collections\/all?q=",
        email_placeholder: "Enter your email address...",
        contact_fields_email: null,
        message_content: "Please notify me when {{ product }} becomes available - {{ url }}",
        notify_form_send: "Send",
    };

    window._usfCollectionById = window._usfCollectionById || {};
    _usf_products_per_row_pc = _usfSettingSection.products_per_row,
        _usf_products_per_row_phone = _usfSettingGlobal.mobile_products_per_row,
        _usf_quick_shop_style = _usfSettingGlobal.quick_shop_style,
        _usf_image_loading_style = _usfSettingGlobal.image_loading_style,
        _usf_object_fit = _usfSettingGlobal.object_fit,
        _usf_collection_height = _usfSettingSection.collection_height,
        _usf_collection_secondary_image = _usfSettingGlobal.collection_secondary_image,
        _usf_collection_swatches = _usfSettingGlobal.collection_swatches,
        _usf_quick_shop_enabled = _usfSettingGlobal.quick_shop_enabled,
        _usf_show_payment_button = _usfSettingGlobal.show_payment_button,
        _usf_product_form_style = _usfSettingGlobal.product_form_style,
        _usf_money_format = _usfSettingGlobal.money_format,
        _usf_currency = _usfSettingGlobal.currency,
        _usf_cart_action = _usfSettingGlobal.cart_action;

}


function updateSearchView() {
    //console.log("trigger")
    window.Waypoint && window.Waypoint.destroyAll && window.Waypoint.destroyAll()

    if (window.Shopify && window.Shopify.theme_settings && window.Shopify.theme_settings.show_multiple_currencies) {
        window.convertCurrencies && window.convertCurrencies();
    }

    window.Shopify && window.Shopify.PaymentButton && window.Shopify.PaymentButton.init && window.Shopify.PaymentButton.init();
    window.productPage && window.productPage.init && window.productPage.init();
    if (window.Shopify && window.Shopify.theme_settings && window.Shopify.theme_settings.quick_shop_enabled) {
        window.quickShop && window.quickShop.init && window.quickShop.init();
    }
    window.productPage && window.productPage.productSwatches && window.productPage.productSwatches()
    window.hideNoScript && window.hideNoScript();

    window.$ && _usf_product_form_style == 'dropdown' && $('#usf_container .js-product_section.inline-quickshop').removeClass('js-product_section')
}

function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const updateSearchViewDebounced = debounce(() => updateSearchView());


/* End custom theme code */
/* Begin common theme code */

// unit test file is js\Source\tests\theme.common_tests.html
var _usfIsDynamicImage = usf.settings.search.imageSizeType === 'dynamic';

// return a list of image URLs for lazyload - TESTED, DONT CHANGE
// used when a theme use `data-srcset` attribute for lazyload.
function _usfGetImageUrls(imageUrl) {
    if (_usfIsDynamicImage)
        // in dynamic image size mode, {size} represents the image size
		return _usfImageWidths.map(w => imageUrl.replace('{size}', w) + ' ' + w + 'w').join(', ')
	
	return _usfImageWidths.map(w => imageUrl + ' ' + w + 'w').join(', ')
}

// used when a theme use `data-src` attribute only for lazyload - TESTED, DONT CHANGE
function _usfGetScaledImageUrl (url, size = '{width}') {
    if (_usfIsDynamicImage)
        return url.replace('{size}', size);
    
    var n = url.lastIndexOf('_');
    if (n === -1)
        return url;

    return url.substr(0, n) + url.substr(n).replace('_' + usf.settings.search.imageSize + 'x', '_' + size + 'x')
}

// get image ratio - TESTED, DONT CHANGE
function _usfGetImageRatio(img){
    return img.width/img.height
}

// get origin image with size (for swatchs...etc..) - TESTED, DONT CHANGE
function _usfGetOriginImgWithSize(url, size = '50x50') {
    var n = url.lastIndexOf(".");
    if (n != -1 && !url.includes('no-image'))
        return url.substring(0, n) + '_' + size + url.substring(n);
    else
        return url
}

// handle string to handle - TESTED, DONT CHANGE
// e.g.: product.title = "Hello Word" => handled: hello-word
function _usfHandlezie (str) {
    var x = str || "";
    return x.toLowerCase().replace("'", '').replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

//split a string according to the number of words
function _usfTruncateWords (str, size = 10, description_words = '...') {
    if (!str)
        return "";
    var arr = str.split(' ', size);	
    if (arr.length < size)
        return str;
    return arr.join(' ') + description_words
}

//split a string according to the number of character
function _usfTruncate(str, size = 100, description_words = '...') {
    if (!str)
        return "";
    if (str.length  && str.length <= size)
        return str;
    return str.slice(0, size - description_words.length) + description_words
}

//split the string at a certain word
//first = true: get string before the word location
//first = false: get string after the word location
//ex: _usfSplitByText(product.description,'[/countdown]') for first || _usfSplitByText(product.description,'[/countdown]',false) for last
function _usfSplitByText(desc, txt,first = true, description_words = '...') {
    var arr = desc.split(txt);
    return first ? arr.shift() + description_words : arr.pop() + description_words
}

// append a query to URL
// ex: _usfAddQuery(productUrl,'view=ajax')
function _usfAddQuery(url, addon) {
    return url + (url.includes('?') ? '&' : '?') + addon
}

function _usfProductHasOnlyDefaultVariant(p) {
    return p.variants.length == 1 && !p.options.length
}
function _usfGetSrcset(img,scaledImgUrl) {
    var srcset = [];
    var _usfImageWidths = window._usfImageWidths ? window._usfImageWidths : _usfIsDynamicImage ? [200, 400, 600, 700, 800, 900, 1000, 1200] : [usf.settings.search.imageSize]
    _usfImageWidths.filter(w => {
        if(img.width >= w){
            srcset.push(scaledImgUrl.replace('{size}', w) + ` ${w}w`);
        }
    });
    return srcset.length ? srcset.join(',') : _usfGetOriginImgWithSize(img.url, usf.settings.search.imageSize + 'x') + ' ' + usf.settings.search.imageSize + 'w';
}
function _usfGetCart() {
    return fetch(usf.platform.baseUrl + '/cart.js', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => res.json());
}
function _usfGetVariantTitle(options, p) {
    //options: variant.options
    //p: product
    if(!p.options.length)
        return 'Default title'
    var arrs = [];
    for (let i = 0; i < options.length; i++) {
        var o = options[i];
        arrs.push(p.options[i].values[o])
    }
    return arrs.join(' / ');
}
function _usfAddToCart(e, callback) {
    // if _usfDisableAjaxAddToCart is present, use form add to cart instead
    if (window._usfDisableAjaxAddToCart)
        return;
    // prevent bubble
    event.preventDefault();

    // get the `add to cart` btn
    var formElement = event.target.closest('form');
    var addToCartBtn = formElement.querySelector('.usf-add-to-cart-btn');
    var formData = new FormData(formElement)
    // construct form object
    var objectData = {};
    formData.forEach(function (value, key) {
        objectData[key] = value;
    });

    // make the add to cart btn disabled
    addToCartBtn.setAttribute('disabled', 'disabled');
    var clsList = addToCartBtn.classList;
    clsList.remove('usf-is-added');
    clsList.add('usf-with-loader');

    // send request
    fetch(usf.platform.baseUrl + '/cart/add.js', {
        body: JSON.stringify(objectData),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
        }
    }).then(function (response) {
        addToCartBtn.removeAttribute('disabled');
        clsList.remove('usf-with-loader');

        if (callback)
            callback(response);
            
        if (response.ok) {
            clsList.add('usf-is-added');

            response.json().then(rs => typeof _usfOnAddToCartSuccess === "function" ? _usfOnAddToCartSuccess(rs, formElement) : null)
            
            // close the preview modal if any
            var x = document.querySelector('.usf-preview__wrapper .usf-remove');
            if (x) x.click();
        } else {
            response.json().then(function (content) {
                clsList.remove('usf-is-added');

                var errorMsg = content['description'];

                // show error
                var lbl = addToCartBtn.querySelector('.usf-label');
                // if the label has `usf-disable-error` css class, the error message is not written to the label.
                var shouldUpdateLbl = !lbl.classList.contains('usf-disable-error');
                
                if (shouldUpdateLbl) {
                    if (!lbl._oldText)
                        lbl._oldText = lbl.innerHTML;
                    lbl.innerHTML = errorMsg
                }

                clsList.add('usf-has-error');
                setTimeout(function () {
                    if (lbl._oldText)
                        lbl.innerHTML = lbl._oldText

                    clsList.remove('usf-has-error');
                }, 2500);

                typeof _usfOnAddToCartError === "function" ? _usfOnAddToCartError(content, formElement) : null;
            });
        }
    });
}
/* End common theme code */
/*!
 * Ultimate Search and Filter with A.I Power.
 * (c) Jason Dang - sobooster.com
*/
/*!
 * RVue.js v1.0.10
 * (c) Jason Dang
*/
/*!
 * Vue.js v2.7.16
 * (c) 2014-2025 Evan You
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).RVue=e()}(this,(function(){"use strict";var t=Object.freeze({}),e=Array.isArray;function n(t){return null==t}function r(t){return null!=t}function o(t){return!0===t}function i(t){return"string"==typeof t||"number"==typeof t||"symbol"==typeof t||"boolean"==typeof t}function a(t){return"function"==typeof t}function s(t){return null!==t&&"object"==typeof t}var c=Object.prototype.toString;function u(t){return"[object Object]"===c.call(t)}function l(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function f(t){return r(t)&&"function"==typeof t.then&&"function"==typeof t.catch}function d(t){return null==t?"":Array.isArray(t)||u(t)&&t.toString===c?JSON.stringify(t,p,2):String(t)}function p(t,e){return e&&e.__v_isRef?e.value:e}function v(t){var e=parseFloat(t);return isNaN(e)?t:e}function h(t,e){for(var n=Object.create(null),r=t.split(","),o=0;o<r.length;o++)n[r[o]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}var m=h("slot,component",!0),g=h("key,ref,slot,slot-scope,is");function y(t,e){var n=t.length;if(n){if(e===t[n-1])return void(t.length=n-1);var r=t.indexOf(e);if(r>-1)return t.splice(r,1)}}var _=Object.prototype.hasOwnProperty;function b(t,e){return _.call(t,e)}function $(t){var e=Object.create(null);return function(n){return e[n]||(e[n]=t(n))}}var w=/-(\w)/g,x=$((function(t){return t.replace(w,(function(t,e){return e?e.toUpperCase():""}))})),C=$((function(t){return t.charAt(0).toUpperCase()+t.slice(1)})),k=/\B([A-Z])/g,O=$((function(t){return t.replace(k,"-$1").toLowerCase()}));var S=Function.prototype.bind?function(t,e){return t.bind(e)}:function(t,e){function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n};function T(t,e){e=e||0;for(var n=t.length-e,r=new Array(n);n--;)r[n]=t[n+e];return r}function A(t,e){for(var n in e)t[n]=e[n];return t}function j(t){for(var e={},n=0;n<t.length;n++)t[n]&&A(e,t[n]);return e}function P(t,e,n){}var D=function(t,e,n){return!1},N=function(t){return t};function M(t,e){if(t===e)return!0;var n=s(t),r=s(e);if(!n||!r)return!n&&!r&&String(t)===String(e);try{var o=Array.isArray(t),i=Array.isArray(e);if(o&&i)return t.length===e.length&&t.every((function(t,n){return M(t,e[n])}));if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(o||i)return!1;var a=Object.keys(t),c=Object.keys(e);return a.length===c.length&&a.every((function(n){return M(t[n],e[n])}))}catch(t){return!1}}function I(t,e){for(var n=0;n<t.length;n++)if(M(t[n],e))return n;return-1}function R(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}function E(t,e){return t===e?0===t&&1/t!=1/e:t==t||e==e}var L="data-server-rendered",F=["component","directive","filter"],H=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch","renderTracked","renderTriggered"],B={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:D,isReservedAttr:D,isUnknownElement:D,getTagNamespace:P,parsePlatformTagName:N,mustUseProp:D,async:!0,_lifecycleHooks:H},U=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function z(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function V(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var K=new RegExp("[^".concat(U.source,".$_\\d]"));var J="__proto__"in{},q="undefined"!=typeof window,W=q&&window.navigator.userAgent.toLowerCase(),Z=W&&W.indexOf("edge/")>0;W&&W.indexOf("android");var G=W&&/iphone|ipad|ipod|ios/.test(W);W&&/chrome\/\d+/.test(W);var Y=W&&W.match(/firefox\/(\d+)/),Q={}.watch,X=!1;if(q)try{var tt={};Object.defineProperty(tt,"passive",{get:function(){X=!0}}),window.addEventListener("test-passive",null,tt)}catch(t){}var et=q&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function nt(t){return"function"==typeof t&&/native code/.test(t.toString())}var rt,ot="undefined"!=typeof Symbol&&nt(Symbol)&&"undefined"!=typeof Reflect&&nt(Reflect.ownKeys);rt="undefined"!=typeof Set&&nt(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var it=null;function at(t){void 0===t&&(t=null),t||it&&it._scope.off(),it=t,t&&t._scope.on()}var st=function(){function t(t,e,n,r,o,i,a,s){this.tag=t,this.data=e,this.children=n,this.text=r,this.elm=o,this.ns=void 0,this.context=i,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1}return Object.defineProperty(t.prototype,"child",{get:function(){return this.componentInstance},enumerable:!1,configurable:!0}),t}(),ct=function(t){void 0===t&&(t="");var e=new st;return e.text=t,e.isComment=!0,e};function ut(t){return new st(void 0,void 0,void 0,String(t))}function lt(t){var e=new st(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}"function"==typeof SuppressedError&&SuppressedError;var ft=0,dt=[],pt=function(){for(var t=0;t<dt.length;t++){var e=dt[t];e.subs=e.subs.filter((function(t){return t})),e._pending=!1}dt.length=0},vt=function(){function t(){this._pending=!1,this.id=ft++,this.subs=[]}return t.prototype.addSub=function(t){this.subs.push(t)},t.prototype.removeSub=function(t){this.subs[this.subs.indexOf(t)]=null,this._pending||(this._pending=!0,dt.push(this))},t.prototype.depend=function(e){t.target&&t.target.addDep(this)},t.prototype.notify=function(t){for(var e=this.subs.filter((function(t){return t})),n=0,r=e.length;n<r;n++){e[n].update()}},t}();vt.target=null;var ht=[];function mt(t){ht.push(t),vt.target=t}function gt(){ht.pop(),vt.target=ht[ht.length-1]}for(var yt=Array.prototype,_t=Object.create(yt),bt=["push","pop","shift","unshift","splice","sort","reverse"],$t=function(t){var e=bt[t],n=yt[e];V(_t,e,(function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var o,i=n.apply(this,t),a=this.__ob__;switch(e){case"push":case"unshift":o=t;break;case"splice":o=t.slice(2)}return o&&a.observeArray(o),a.dep.notify(),i}))},wt=0;wt<bt.length;wt++)$t(wt);var xt=Object.getOwnPropertyNames(_t),Ct={},kt=!0;function Ot(t){kt=t}var St={notify:P,depend:P,addSub:P,removeSub:P},Tt=function(){function t(t,n,r){if(void 0===n&&(n=!1),void 0===r&&(r=!1),this.value=t,this.shallow=n,this.mock=r,this.dep=r?St:new vt,this.vmCount=0,V(t,"__ob__",this),e(t)){if(!r)if(J)t.__proto__=_t;else for(var o=0,i=xt.length;o<i;o++){V(t,s=xt[o],_t[s])}n||this.observeArray(t)}else{var a=Object.keys(t);for(o=0;o<a.length;o++){var s;jt(t,s=a[o],Ct,void 0,n)}}}return t.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)At(t[e],!1)},t}();function At(t,n){return t&&b(t,"__ob__")&&t.__ob__ instanceof Tt?t.__ob__:!kt||!e(t)&&!u(t)||!Object.isExtensible(t)||t.__v_skip||Ht(t)||t instanceof st?void 0:new Tt(t,n)}function jt(t,n,r,o,i){var a=new vt,s=Object.getOwnPropertyDescriptor(t,n);if(!s||!1!==s.configurable){var c=s&&s.get,u=s&&s.set;c&&!u||r!==Ct&&2!==arguments.length||(r=t[n]);var l=i?r&&r.__ob__:At(r,!1);return Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var n=c?c.call(t):r;return vt.target&&(a.depend(),l&&(l.dep.depend(),e(n)&&Nt(n))),Ht(n)&&!i?n.value:n},set:function(e){var n=c?c.call(t):r;if(E(n,e)){if(u)u.call(t,e);else{if(c)return;if(!i&&Ht(n)&&!Ht(e))return void(n.value=e);r=e}l=i?e&&e.__ob__:At(e,!1),a.notify()}}}),a}}function Pt(t,n,r){if(!Lt(t)){var o=t.__ob__;return e(t)&&l(n)?(t.length=Math.max(t.length,n),t.splice(n,1,r),o&&!o.shallow&&o.mock&&At(r,!1),r):n in t&&!(n in Object.prototype)?(t[n]=r,r):t._isVue||o&&o.vmCount?r:o?(jt(o.value,n,r,void 0,o.shallow),o.dep.notify(),r):(t[n]=r,r)}}function Dt(t,n){if(e(t)&&l(n))t.splice(n,1);else{var r=t.__ob__;t._isVue||r&&r.vmCount||Lt(t)||b(t,n)&&(delete t[n],r&&r.dep.notify())}}function Nt(t){for(var n=void 0,r=0,o=t.length;r<o;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),e(n)&&Nt(n)}function Mt(t){return It(t,!0),V(t,"__v_isShallow",!0),t}function It(t,e){Lt(t)||At(t,e)}function Rt(t){return Lt(t)?Rt(t.__v_raw):!(!t||!t.__ob__)}function Et(t){return!(!t||!t.__v_isShallow)}function Lt(t){return!(!t||!t.__v_isReadonly)}var Ft="__v_isRef";function Ht(t){return!(!t||!0!==t.__v_isRef)}function Bt(t,e){if(Ht(t))return t;var n={};return V(n,Ft,!0),V(n,"__v_isShallow",e),V(n,"dep",jt(n,"value",t,null,e)),n}function Ut(t,e,n){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var t=e[n];if(Ht(t))return t.value;var r=t&&t.__ob__;return r&&r.dep.depend(),t},set:function(t){var r=e[n];Ht(r)&&!Ht(t)?r.value=t:e[n]=t}})}function zt(t,e,n){var r=t[e];if(Ht(r))return r;var o={get value(){var r=t[e];return void 0===r?n:r},set value(n){t[e]=n}};return V(o,Ft,!0),o}var Vt="__v_rawToReadonly",Kt="__v_rawToShallowReadonly";function Jt(t){return qt(t,!1)}function qt(t,e){if(!u(t))return t;if(Lt(t))return t;var n=e?Kt:Vt,r=t[n];if(r)return r;var o=Object.create(Object.getPrototypeOf(t));V(t,n,o),V(o,"__v_isReadonly",!0),V(o,"__v_raw",t),Ht(t)&&V(o,Ft,!0),(e||Et(t))&&V(o,"__v_isShallow",!0);for(var i=Object.keys(t),a=0;a<i.length;a++)Wt(o,t,i[a],e);return o}function Wt(t,e,n,r){Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:function(){var t=e[n];return r||!u(t)?t:Jt(t)},set:function(){}})}var Zt=$((function(t){var e="&"===t.charAt(0),n="~"===(t=e?t.slice(1):t).charAt(0),r="!"===(t=n?t.slice(1):t).charAt(0);return{name:t=r?t.slice(1):t,once:n,capture:r,passive:e}}));function Gt(t,n){function r(){var t=r.fns;if(!e(t))return gn(t,null,arguments,n,"v-on handler");for(var o=t.slice(),i=0;i<o.length;i++)gn(o[i],null,arguments,n,"v-on handler")}return r.fns=t,r}function Yt(t,e,r,i,a,s){var c,u,l,f;for(c in t)u=t[c],l=e[c],f=Zt(c),n(u)||(n(l)?(n(u.fns)&&(u=t[c]=Gt(u,s)),o(f.once)&&(u=t[c]=a(f.name,u,f.capture)),r(f.name,u,f.capture,f.passive,f.params)):u!==l&&(l.fns=u,t[c]=l));for(c in e)n(t[c])&&i((f=Zt(c)).name,e[c],f.capture)}function Qt(t,e,i){var a;t instanceof st&&(t=t.data.hook||(t.data.hook={}));var s=t[e];function c(){i.apply(this,arguments),y(a.fns,c)}n(s)?a=Gt([c]):r(s.fns)&&o(s.merged)?(a=s).fns.push(c):a=Gt([s,c]),a.merged=!0,t[e]=a}function Xt(t,e,n,o,i){if(r(e)){if(b(e,n))return t[n]=e[n],i||delete e[n],!0;if(b(e,o))return t[n]=e[o],i||delete e[o],!0}return!1}function te(t){return i(t)?[ut(t)]:e(t)?ne(t):void 0}function ee(t){return r(t)&&r(t.text)&&!1===t.isComment}function ne(t,a){var s,c,u,l,f=[];for(s=0;s<t.length;s++)n(c=t[s])||"boolean"==typeof c||(l=f[u=f.length-1],e(c)?c.length>0&&(ee((c=ne(c,"".concat(a||"","_").concat(s)))[0])&&ee(l)&&(f[u]=ut(l.text+c[0].text),c.shift()),f.push.apply(f,c)):i(c)?ee(l)?f[u]=ut(l.text+c):""!==c&&f.push(ut(c)):ee(c)&&ee(l)?f[u]=ut(l.text+c.text):(o(t._isVList)&&r(c.tag)&&n(c.key)&&r(a)&&(c.key="__vlist".concat(a,"_").concat(s,"__")),f.push(c)));return f}var re=1,oe=2;function ie(t,n,c,u,l,f){return(e(c)||i(c))&&(l=u,u=c,c=void 0),o(f)&&(l=oe),function(t,n,o,i,c){if(r(o)&&r(o.__ob__))return ct();r(o)&&r(o.is)&&(n=o.is);if(!n)return ct();e(i)&&a(i[0])&&((o=o||{}).scopedSlots={default:i[0]},i.length=0);c===oe?i=te(i):c===re&&(i=function(t){for(var n=0;n<t.length;n++)if(e(t[n]))return Array.prototype.concat.apply([],t);return t}(i));var u,l;if("string"==typeof n){var f=void 0;l=t.$vnode&&t.$vnode.ns||B.getTagNamespace(n),u=B.isReservedTag(n)?new st(B.parsePlatformTagName(n),o,i,void 0,void 0,t):o&&o.pre||!r(f=Cr(t.$options,"components",n))?new st(n,o,i,void 0,void 0,t):dr(f,o,t,i,n)}else u=dr(n,o,t,i);return e(u)?u:r(u)?(r(l)&&ae(u,l),r(o)&&function(t){s(t.style)&&Jn(t.style);s(t.class)&&Jn(t.class)}(o),u):ct()}(t,n,c,u,l)}function ae(t,e,i){if(t.ns=e,"foreignObject"===t.tag&&(e=void 0,i=!0),r(t.children))for(var a=0,s=t.children.length;a<s;a++){var c=t.children[a];r(c.tag)&&(n(c.ns)||o(i)&&"svg"!==c.tag)&&ae(c,e,i)}}function se(t,n){var o,i,a,c,u=null;if(e(t)||"string"==typeof t)for(u=new Array(t.length),o=0,i=t.length;o<i;o++)u[o]=n(t[o],o);else if("number"==typeof t)for(u=new Array(t),o=0;o<t;o++)u[o]=n(o+1,o);else if(s(t))if(ot&&t[Symbol.iterator]){u=[];for(var l=t[Symbol.iterator](),f=l.next();!f.done;)u.push(n(f.value,u.length)),f=l.next()}else for(a=Object.keys(t),u=new Array(a.length),o=0,i=a.length;o<i;o++)c=a[o],u[o]=n(t[c],c,o);return r(u)||(u=[]),u._isVList=!0,u}function ce(t,e,n,r){var o,i=this.$scopedSlots[t];i?(n=n||{},r&&(n=A(A({},r),n)),o=i(n)||(a(e)?e():e)):o=this.$slots[t]||(a(e)?e():e);var s=n&&n.slot;return s?this.$createElement("template",{slot:s},o):o}function ue(t){return Cr(this.$options,"filters",t)||N}function le(t,n){return e(t)?-1===t.indexOf(n):t!==n}function fe(t,e,n,r,o){var i=B.keyCodes[e]||n;return o&&r&&!B.keyCodes[e]?le(o,r):i?le(i,t):r?O(r)!==e:void 0===t}function de(t,n,r,o,i){if(r)if(s(r)){e(r)&&(r=j(r));var a=void 0,c=function(e){if("class"===e||"style"===e||g(e))a=t;else{var s=t.attrs&&t.attrs.type;a=o||B.mustUseProp(n,s,e)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var c=x(e),u=O(e);c in a||u in a||(a[e]=r[e],i&&((t.on||(t.on={}))["update:".concat(e)]=function(t){r[e]=t}))};for(var u in r)c(u)}else;return t}function pe(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e||he(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,this._c,this),"__static__".concat(t),!1),r}function ve(t,e,n){return he(t,"__once__".concat(e).concat(n?"_".concat(n):""),!0),t}function he(t,n,r){if(e(t))for(var o=0;o<t.length;o++)t[o]&&"string"!=typeof t[o]&&me(t[o],"".concat(n,"_").concat(o),r);else me(t,n,r)}function me(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function ge(t,e){if(e)if(u(e)){var n=t.on=t.on?A({},t.on):{};for(var r in e){var o=n[r],i=e[r];n[r]=o?[].concat(o,i):i}}else;return t}function ye(t,n,r,o){n=n||{$stable:!r};for(var i=0;i<t.length;i++){var a=t[i];e(a)?ye(a,n,r):a&&(a.proxy&&(a.fn.proxy=!0),n[a.key]=a.fn)}return o&&(n.$key=o),n}function _e(t,e){for(var n=0;n<e.length;n+=2){var r=e[n];"string"==typeof r&&r&&(t[e[n]]=e[n+1])}return t}function be(t,e){return"string"==typeof t?e+t:t}function $e(t){t._o=ve,t._n=v,t._s=d,t._l=se,t._t=ce,t._q=M,t._i=I,t._m=pe,t._f=ue,t._k=fe,t._b=de,t._v=ut,t._e=ct,t._u=ye,t._g=ge,t._d=_e,t._p=be}function we(t,e){if(!t||!t.length)return{};for(var n={},r=0,o=t.length;r<o;r++){var i=t[r],a=i.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,i.context!==e&&i.fnContext!==e||!a||null==a.slot)(n.default||(n.default=[])).push(i);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===i.tag?c.push.apply(c,i.children||[]):c.push(i)}}for(var u in n)n[u].every(xe)&&delete n[u];return n}function xe(t){return t.isComment&&!t.asyncFactory||" "===t.text}function Ce(t){return t.isComment&&t.asyncFactory}function ke(e,n,r,o){var i,a=Object.keys(r).length>0,s=n?!!n.$stable:!a,c=n&&n.$key;if(n){if(n._normalized)return n._normalized;if(s&&o&&o!==t&&c===o.$key&&!a&&!o.$hasNormal)return o;for(var u in i={},n)n[u]&&"$"!==u[0]&&(i[u]=Oe(e,r,u,n[u]))}else i={};for(var l in r)l in i||(i[l]=Se(r,l));return n&&Object.isExtensible(n)&&(n._normalized=i),V(i,"$stable",s),V(i,"$key",c),V(i,"$hasNormal",a),i}function Oe(t,n,r,o){var i=function(){var n=it;at(t);var r=arguments.length?o.apply(null,arguments):o({}),i=(r=r&&"object"==typeof r&&!e(r)?[r]:te(r))&&r[0];return at(n),r&&(!i||1===r.length&&i.isComment&&!Ce(i))?void 0:r};return o.proxy&&Object.defineProperty(n,r,{get:i,enumerable:!0,configurable:!0}),i}function Se(t,e){return function(){return t[e]}}function Te(e){var n=e.$options,r=n.setup;if(r){var o=e._setupContext=function(e){return{get attrs(){if(!e._attrsProxy){var n=e._attrsProxy={};V(n,"_v_attr_proxy",!0),Ae(n,e.$attrs,t,e,"$attrs")}return e._attrsProxy},get listeners(){e._listenersProxy||Ae(e._listenersProxy={},e.$listeners,t,e,"$listeners");return e._listenersProxy},get slots(){return function(t){t._slotsProxy||Pe(t._slotsProxy={},t.$scopedSlots);return t._slotsProxy}(e)},emit:S(e.$emit,e),expose:function(t){if(t)for(var n=Object.keys(t),r=0;r<n.length;r++){var o=n[r];Ut(e,t,o)}}}}(e);at(e),mt();var i=gn(r,null,[e._props||Mt({}),o],e,"setup");if(gt(),at(),a(i))n.render=i;else if(s(i))if(e._setupState=i,i.__sfc){var c=e._setupProxy={};for(var u in i)"__sfc"!==u&&Ut(c,i,u)}else for(var u in i)z(u)||Ut(e,i,u)}}function Ae(t,e,n,r,o){var i=!1;for(var a in e)a in t?e[a]!==n[a]&&(i=!0):(i=!0,je(t,a,r,o));for(var a in t)a in e||(i=!0,delete t[a]);return i}function je(t,e,n,r){Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){return n[r][e]}})}function Pe(t,e){for(var n in e)t[n]=e[n];for(var n in t)n in e||delete t[n]}var De,Ne,Me=null;function Ie(t,e){return(t.__esModule||ot&&"Module"===t[Symbol.toStringTag])&&(t=t.default),s(t)?e.extend(t):t}function Re(t){if(e(t))for(var n=0;n<t.length;n++){var o=t[n];if(r(o)&&(r(o.componentOptions)||Ce(o)))return o}}function Ee(t,e){De.$on(t,e)}function Le(t,e){De.$off(t,e)}function Fe(t,e){var n=De;return function r(){null!==e.apply(null,arguments)&&n.$off(t,r)}}function He(t,e,n){De=t,Yt(e,n||{},Ee,Le,Fe,t),De=void 0}var Be=function(){function t(t){void 0===t&&(t=!1),this.detached=t,this.active=!0,this.effects=[],this.cleanups=[],this.parent=Ne,!t&&Ne&&(this.index=(Ne.scopes||(Ne.scopes=[])).push(this)-1)}return t.prototype.run=function(t){if(this.active){var e=Ne;try{return Ne=this,t()}finally{Ne=e}}},t.prototype.on=function(){Ne=this},t.prototype.off=function(){Ne=this.parent},t.prototype.stop=function(t){if(this.active){var e=void 0,n=void 0;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].teardown();for(e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);if(!this.detached&&this.parent&&!t){var r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0,this.active=!1}},t}();function Ue(){return Ne}var ze=null;function Ve(t){var e=ze;return ze=t,function(){ze=e}}function Ke(t){for(;t&&(t=t.$parent);)if(t._inactive)return!0;return!1}function Je(t,e){if(e){if(t._directInactive=!1,Ke(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)Je(t.$children[n]);We(t,"activated")}}function qe(t,e){if(!(e&&(t._directInactive=!0,Ke(t))||t._inactive)){t._inactive=!0;for(var n=0;n<t.$children.length;n++)qe(t.$children[n]);We(t,"deactivated")}}function We(t,e,n,r){void 0===r&&(r=!0),mt();var o=it,i=Ue();r&&at(t);var a=t.$options[e],s="".concat(e," hook");if(a)for(var c=0,u=a.length;c<u;c++)gn(a[c],t,n||null,t,s);t._hasHookEvent&&t.$emit("hook:"+e),r&&(at(o),i&&i.on()),gt()}var Ze=[],Ge=[],Ye={},Qe=!1,Xe=!1,tn=0;var en=0,nn=Date.now;if(q){var rn=window.performance;rn&&"function"==typeof rn.now&&nn()>document.createEvent("Event").timeStamp&&(nn=function(){return rn.now()})}var on=function(t,e){if(t.post){if(!e.post)return 1}else if(e.post)return-1;return t.id-e.id};function an(){var t,e;for(en=nn(),Xe=!0,Ze.sort(on),tn=0;tn<Ze.length;tn++)(t=Ze[tn]).before&&t.before(),e=t.id,Ye[e]=null,t.run();var n=Ge.slice(),r=Ze.slice();tn=Ze.length=Ge.length=0,Ye={},Qe=Xe=!1,function(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,Je(t[e],!0)}(n),function(t){var e=t.length;for(;e--;){var n=t[e],r=n.vm;r&&r._watcher===n&&r._isMounted&&!r._isDestroyed&&We(r,"updated")}}(r),pt(),et&&B.devtools&&et.emit("flush")}function sn(t){var e=t.id;if(null==Ye[e]&&(t!==vt.target||!t.noRecurse)){if(Ye[e]=!0,Xe){for(var n=Ze.length-1;n>tn&&Ze[n].id>t.id;)n--;Ze.splice(n+1,0,t)}else Ze.push(t);Qe||(Qe=!0,An(an))}}var cn="watcher",un="".concat(cn," callback"),ln="".concat(cn," getter"),fn="".concat(cn," cleanup");function dn(t,e){return vn(t,null,{flush:"post"})}var pn={};function vn(n,r,o){var i=void 0===o?t:o,s=i.immediate,c=i.deep,u=i.flush,l=void 0===u?"pre":u;i.onTrack,i.onTrigger;var f,d,p=it,v=function(t,e,n){void 0===n&&(n=null);var r=gn(t,null,n,p,e);return c&&r&&r.__ob__&&r.__ob__.dep.depend(),r},h=!1,m=!1;if(Ht(n)?(f=function(){return n.value},h=Et(n)):Rt(n)?(f=function(){return n.__ob__.dep.depend(),n},c=!0):e(n)?(m=!0,h=n.some((function(t){return Rt(t)||Et(t)})),f=function(){return n.map((function(t){return Ht(t)?t.value:Rt(t)?(t.__ob__.dep.depend(),Jn(t)):a(t)?v(t,ln):void 0}))}):f=a(n)?r?function(){return v(n,ln)}:function(){if(!p||!p._isDestroyed)return d&&d(),v(n,cn,[y])}:P,r&&c){var g=f;f=function(){return Jn(g())}}var y=function(t){d=_.onStop=function(){v(t,fn)}},_=new Zn(it,f,P,{lazy:!0});_.noRecurse=!r;var b=m?[]:pn;return _.run=function(){if(_.active)if(r){var t=_.get();(c||h||(m?t.some((function(t,e){return E(t,b[e])})):E(t,b)))&&(d&&d(),v(r,un,[t,b===pn?void 0:b,y]),b=t)}else _.get()},"sync"===l?_.update=_.run:"post"===l?(_.post=!0,_.update=function(){return sn(_)}):_.update=function(){if(p&&p===it&&!p._isMounted){var t=p._preWatchers||(p._preWatchers=[]);t.indexOf(_)<0&&t.push(_)}else sn(_)},r?s?_.run():b=_.get():"post"===l&&p?p.$once("hook:mounted",(function(){return _.get()})):_.get(),function(){_.teardown()}}function hn(t){var e=t._provided,n=t.$parent&&t.$parent._provided;return n===e?t._provided=Object.create(n):e}function mn(t,e,n){mt();try{if(e)for(var r=e;r=r.$parent;){var o=r.$options.errorCaptured;if(o)for(var i=0;i<o.length;i++)try{if(!1===o[i].call(r,t,e,n))return}catch(t){yn(t,r,"errorCaptured hook")}}yn(t,e,n)}finally{gt()}}function gn(t,e,n,r,o){var i;try{(i=n?t.apply(e,n):t.call(e))&&!i._isVue&&f(i)&&!i._handled&&(i.catch((function(t){return mn(t,r,o+" (Promise/async)")})),i._handled=!0)}catch(t){mn(t,r,o)}return i}function yn(t,e,n){if(B.errorHandler)try{return B.errorHandler.call(null,t,e,n)}catch(e){e!==t&&_n(e)}_n(t)}function _n(t,e,n){if(!q||"undefined"==typeof console)throw t;console.error(t)}var bn,$n=!1,wn=[],xn=!1;function Cn(){xn=!1;var t=wn.slice(0);wn.length=0;for(var e=0;e<t.length;e++)t[e]()}if("undefined"!=typeof Promise&&nt(Promise)){var kn=Promise.resolve();bn=function(){kn.then(Cn),G&&setTimeout(P)},$n=!0}else if("undefined"==typeof MutationObserver||!nt(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())bn="undefined"!=typeof setImmediate&&nt(setImmediate)?function(){setImmediate(Cn)}:function(){setTimeout(Cn,0)};else{var On=1,Sn=new MutationObserver(Cn),Tn=document.createTextNode(String(On));Sn.observe(Tn,{characterData:!0}),bn=function(){On=(On+1)%2,Tn.data=String(On)},$n=!0}function An(t,e){var n;if(wn.push((function(){if(t)try{t.call(e)}catch(t){mn(t,e,"nextTick")}else n&&n(e)})),xn||(xn=!0,bn()),!t&&"undefined"!=typeof Promise)return new Promise((function(t){n=t}))}function jn(t){return function(e,n){if(void 0===n&&(n=it),n)return function(t,e,n){var r=t.$options;r[e]=yr(r[e],n)}(n,t,e)}}var Pn=jn("beforeMount"),Dn=jn("mounted"),Nn=jn("beforeUpdate"),Mn=jn("updated"),In=jn("beforeDestroy"),Rn=jn("destroyed"),En=jn("activated"),Ln=jn("deactivated"),Fn=jn("serverPrefetch"),Hn=jn("renderTracked"),Bn=jn("renderTriggered"),Un=jn("errorCaptured");var zn="2.7.16";var Vn=Object.freeze({__proto__:null,version:zn,defineComponent:function(t){return t},ref:function(t){return Bt(t,!1)},shallowRef:function(t){return Bt(t,!0)},isRef:Ht,toRef:zt,toRefs:function(t){var n=e(t)?new Array(t.length):{};for(var r in t)n[r]=zt(t,r);return n},unref:function(t){return Ht(t)?t.value:t},proxyRefs:function(t){if(Rt(t))return t;for(var e={},n=Object.keys(t),r=0;r<n.length;r++)Ut(e,t,n[r]);return e},customRef:function(t){var e=new vt,n=t((function(){e.depend()}),(function(){e.notify()})),r=n.get,o=n.set,i={get value(){return r()},set value(t){o(t)}};return V(i,Ft,!0),i},triggerRef:function(t){t.dep&&t.dep.notify()},reactive:function(t){return It(t,!1),t},isReactive:Rt,isReadonly:Lt,isShallow:Et,isProxy:function(t){return Rt(t)||Lt(t)},shallowReactive:Mt,markRaw:function(t){return Object.isExtensible(t)&&V(t,"__v_skip",!0),t},toRaw:function t(e){var n=e&&e.__v_raw;return n?t(n):e},readonly:Jt,shallowReadonly:function(t){return qt(t,!0)},computed:function(t,e){var n,r,o=a(t);o?(n=t,r=P):(n=t.get,r=t.set);var i=new Zn(it,n,P,{lazy:!0}),s={effect:i,get value(){return i?(i.dirty&&i.evaluate(),vt.target&&i.depend(),i.value):n()},set value(t){r(t)}};return V(s,Ft,!0),V(s,"__v_isReadonly",o),s},watch:function(t,e,n){return vn(t,e,n)},watchEffect:function(t,e){return vn(t,null,e)},watchPostEffect:dn,watchSyncEffect:function(t,e){return vn(t,null,{flush:"sync"})},EffectScope:Be,effectScope:function(t){return new Be(t)},onScopeDispose:function(t){Ne&&Ne.cleanups.push(t)},getCurrentScope:Ue,provide:function(t,e){it&&(hn(it)[t]=e)},inject:function(t,e,n){void 0===n&&(n=!1);var r=it;if(r){var o=r.$parent&&r.$parent._provided;if(o&&t in o)return o[t];if(arguments.length>1)return n&&a(e)?e.call(r):e}},h:function(t,e,n){return ie(it,t,e,n,2,!0)},getCurrentInstance:function(){return it&&{proxy:it}},nextTick:An,set:Pt,del:Dt,useCssModule:function(e){return t},useCssVars:function(t){if(q){var e=it;e&&dn((function(){var n=e.$el,r=t(e,e._setupProxy);if(n&&1===n.nodeType){var o=n.style;for(var i in r)o.setProperty("--".concat(i),r[i])}}))}},onBeforeMount:Pn,onMounted:Dn,onBeforeUpdate:Nn,onUpdated:Mn,onBeforeUnmount:In,onUnmounted:Rn,onActivated:En,onDeactivated:Ln,onServerPrefetch:Fn,onRenderTracked:Hn,onRenderTriggered:Bn,onErrorCaptured:function(t,e){void 0===e&&(e=it),Un(t,e)}}),Kn=new rt;function Jn(t){return qn(t,Kn),Kn.clear(),t}function qn(t,n){var r,o,i=e(t);if(!(!i&&!s(t)||t.__v_skip||Object.isFrozen(t)||t instanceof st)){if(t.__ob__){var a=t.__ob__.dep.id;if(n.has(a))return;n.add(a)}if(i)for(r=t.length;r--;)qn(t[r],n);else if(Ht(t))qn(t.value,n);else for(r=(o=Object.keys(t)).length;r--;)qn(t[o[r]],n)}}var Wn=0,Zn=function(){function t(t,e,n,r,o){!function(t,e){void 0===e&&(e=Ne),e&&e.active&&e.effects.push(t)}(this,Ne&&!Ne._vm?Ne:t?t._scope:void 0),(this.vm=t)&&o&&(t._watcher=this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Wn,this.active=!0,this.post=!1,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new rt,this.newDepIds=new rt,this.expression="",a(e)?this.getter=e:(this.getter=function(t){if(!K.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}(e),this.getter||(this.getter=P)),this.value=this.lazy?void 0:this.get()}return t.prototype.get=function(){var t;mt(this);var e=this.vm;try{t=this.getter.call(e,e)}catch(t){if(!this.user)throw t;mn(t,e,'getter for watcher "'.concat(this.expression,'"'))}finally{this.deep&&Jn(t),gt(),this.cleanupDeps()}return t},t.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},t.prototype.cleanupDeps=function(){for(var t=this.deps.length;t--;){var e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},t.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():sn(this)},t.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||s(t)||this.deep){var e=this.value;if(this.value=t,this.user){var n='callback for watcher "'.concat(this.expression,'"');gn(this.cb,this.vm,[t,e],this.vm,n)}else this.cb.call(this.vm,t,e)}}},t.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},t.prototype.depend=function(){for(var t=this.deps.length;t--;)this.deps[t].depend()},t.prototype.teardown=function(){if(this.vm&&!this.vm._isBeingDestroyed&&y(this.vm._scope.effects,this),this.active){for(var t=this.deps.length;t--;)this.deps[t].removeSub(this);this.active=!1,this.onStop&&this.onStop()}},t}(),Gn={enumerable:!0,configurable:!0,get:P,set:P};function Yn(t,e,n){Gn.get=function(){return this[e][n]},Gn.set=function(t){this[e][n]=t},Object.defineProperty(t,n,Gn)}function Qn(t){var n=t.$options;if(n.props&&function(t,e){var n=t.$options.propsData||{},r=t._props=Mt({}),o=t.$options._propKeys=[],i=!t.$parent;i||Ot(!1);var a=function(i){o.push(i);var a=kr(i,e,n,t);jt(r,i,a,void 0,!0),i in t||Yn(t,"_props",i)};for(var s in e)a(s);Ot(!0)}(t,n.props),Te(t),n.methods&&function(t,e){for(var n in t.$options.props,e)t[n]="function"!=typeof e[n]?P:S(e[n],t)}(t,n.methods),n.data)!function(t){var e=t.$options.data;e=t._data=a(e)?function(t,e){mt();try{return t.call(e,e)}catch(t){return mn(t,e,"data()"),{}}finally{gt()}}(e,t):e||{},u(e)||(e={});var n=Object.keys(e),r=t.$options.props;t.$options.methods;var o=n.length;for(;o--;){var i=n[o];r&&b(r,i)||z(i)||Yn(t,"_data",i)}var s=At(e);s&&s.vmCount++}(t);else{var r=At(t._data={});r&&r.vmCount++}n.computed&&function(t,e){var n=t._computedWatchers=Object.create(null);for(var r in e){var o=e[r],i=a(o)?o:o.get;n[r]=new Zn(t,i||P,P,Xn),r in t||tr(t,r,o)}}(t,n.computed),n.watch&&n.watch!==Q&&function(t,n){for(var r in n){var o=n[r];if(e(o))for(var i=0;i<o.length;i++)nr(t,r,o[i]);else nr(t,r,o)}}(t,n.watch)}var Xn={lazy:!0};function tr(t,e,n){var r;a(n)?(Gn.get=er(e),Gn.set=P):(Gn.get=n.get?!1!==n.cache?er(e):(r=n.get,function(){return r.call(this,this)}):P,Gn.set=n.set||P),Object.defineProperty(t,e,Gn)}function er(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),vt.target&&e.depend(),e.value}}function nr(t,e,n,r){return u(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=t[n]),t.$watch(e,n,r)}function rr(t,e){if(t){for(var n=Object.create(null),r=ot?Reflect.ownKeys(t):Object.keys(t),o=0;o<r.length;o++){var i=r[o];if("__ob__"!==i){var s=t[i].from;if(s in e._provided)n[i]=e._provided[s];else if("default"in t[i]){var c=t[i].default;n[i]=a(c)?c.call(e):c}}}return n}}var or=0;function ir(t){var e=t.options;if(t.super){var n=ir(t.super);if(n!==t.superOptions){t.superOptions=n;var r=function(t){var e,n=t.options,r=t.sealedOptions;for(var o in n)n[o]!==r[o]&&(e||(e={}),e[o]=n[o]);return e}(t);r&&A(t.extendOptions,r),(e=t.options=xr(n,t.extendOptions)).name&&(e.components[e.name]=t)}}return e}function ar(n,r,i,a,s){var c,u=this,l=s.options;b(a,"_uid")?(c=Object.create(a))._original=a:(c=a,a=a._original);var f=o(l._compiled),d=!f;this.data=n,this.props=r,this.children=i,this.parent=a,this.listeners=n.on||t,this.injections=rr(l.inject,a),this.slots=function(){return u.$slots||ke(a,n.scopedSlots,u.$slots=we(i,a)),u.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return ke(a,n.scopedSlots,this.slots())}}),f&&(this.$options=l,this.$slots=this.slots(),this.$scopedSlots=ke(a,n.scopedSlots,this.$slots)),l._scopeId?this._c=function(t,n,r,o){var i=ie(c,t,n,r,o,d);return i&&!e(i)&&(i.fnScopeId=l._scopeId,i.fnContext=a),i}:this._c=function(t,e,n,r){return ie(c,t,e,n,r,d)}}function sr(t,e,n,r,o){var i=lt(t);return i.fnContext=n,i.fnOptions=r,e.slot&&((i.data||(i.data={})).slot=e.slot),i}function cr(t,e){for(var n in e)t[x(n)]=e[n]}function ur(t){return t.name||t.__name||t._componentTag}$e(ar.prototype);var lr={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var n=t;lr.prepatch(n,n)}else{(t.componentInstance=function(t,e){var n={_isComponent:!0,_parentVnode:t,parent:e},o=t.data.inlineTemplate;r(o)&&(n.render=o.render,n.staticRenderFns=o.staticRenderFns);return new t.componentOptions.Ctor(n)}(t,ze)).$mount(e?t.elm:void 0,e)}},prepatch:function(e,n){var r=n.componentOptions;!function(e,n,r,o,i){var a=o.data.scopedSlots,s=e.$scopedSlots,c=!!(a&&!a.$stable||s!==t&&!s.$stable||a&&e.$scopedSlots.$key!==a.$key||!a&&e.$scopedSlots.$key),u=!!(i||e.$options._renderChildren||c),l=e.$vnode;e.$options._parentVnode=o,e.$vnode=o,e._vnode&&(e._vnode.parent=o),e.$options._renderChildren=i;var f=o.data.attrs||t;e._attrsProxy&&Ae(e._attrsProxy,f,l.data&&l.data.attrs||t,e,"$attrs")&&(u=!0),e.$attrs=f,r=r||t;var d=e.$options._parentListeners;if(e._listenersProxy&&Ae(e._listenersProxy,r,d||t,e,"$listeners"),e.$listeners=e.$options._parentListeners=r,He(e,r,d),n&&e.$options.props){Ot(!1);for(var p=e._props,v=e.$options._propKeys||[],h=0;h<v.length;h++){var m=v[h],g=e.$options.props;p[m]=kr(m,g,n,e)}Ot(!0),e.$options.propsData=n}u&&(e.$slots=we(i,o.context),e.$forceUpdate())}(n.componentInstance=e.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(t){var e,n=t.context,r=t.componentInstance;r._isMounted||(r._isMounted=!0,We(r,"mounted")),t.data.keepAlive&&(n._isMounted?((e=r)._inactive=!1,Ge.push(e)):Je(r,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?qe(e,!0):e.$destroy())}},fr=Object.keys(lr);function dr(i,a,c,u,l){if(!n(i)){var d=c.$options._base;if(s(i)&&(i=d.extend(i)),"function"==typeof i){var p;if(n(i.cid)&&(i=function(t,e){if(o(t.error)&&r(t.errorComp))return t.errorComp;if(r(t.resolved))return t.resolved;var i=Me;if(i&&r(t.owners)&&-1===t.owners.indexOf(i)&&t.owners.push(i),o(t.loading)&&r(t.loadingComp))return t.loadingComp;if(i&&!r(t.owners)){var a=t.owners=[i],c=!0,u=null,l=null;i.$on("hook:destroyed",(function(){return y(a,i)}));var d=function(t){for(var e=0,n=a.length;e<n;e++)a[e].$forceUpdate();t&&(a.length=0,null!==u&&(clearTimeout(u),u=null),null!==l&&(clearTimeout(l),l=null))},p=R((function(n){t.resolved=Ie(n,e),c?a.length=0:d(!0)})),v=R((function(e){r(t.errorComp)&&(t.error=!0,d(!0))})),h=t(p,v);return s(h)&&(f(h)?n(t.resolved)&&h.then(p,v):f(h.component)&&(h.component.then(p,v),r(h.error)&&(t.errorComp=Ie(h.error,e)),r(h.loading)&&(t.loadingComp=Ie(h.loading,e),0===h.delay?t.loading=!0:u=setTimeout((function(){u=null,n(t.resolved)&&n(t.error)&&(t.loading=!0,d(!1))}),h.delay||200)),r(h.timeout)&&(l=setTimeout((function(){l=null,n(t.resolved)&&v(null)}),h.timeout)))),c=!1,t.loading?t.loadingComp:t.resolved}}(p=i,d),void 0===i))return function(t,e,n,r,o){var i=ct();return i.asyncFactory=t,i.asyncMeta={data:e,context:n,children:r,tag:o},i}(p,a,c,u,l);a=a||{},ir(i),r(a.model)&&function(t,n){var o=t.model&&t.model.prop||"value",i=t.model&&t.model.event||"input";(n.attrs||(n.attrs={}))[o]=n.model.value;var a=n.on||(n.on={}),s=a[i],c=n.model.callback;r(s)?(e(s)?-1===s.indexOf(c):s!==c)&&(a[i]=[c].concat(s)):a[i]=c}(i.options,a);var v=function(t,e,o){var i=e.options.props;if(!n(i)){var a={},s=t.attrs,c=t.props;if(r(s)||r(c))for(var u in i){var l=O(u);Xt(a,c,u,l,!0)||Xt(a,s,u,l,!1)}return a}}(a,i);if(o(i.options.functional))return function(n,o,i,a,s){var c=n.options,u={},l=c.props;if(r(l))for(var f in l)u[f]=kr(f,l,o||t);else r(i.attrs)&&cr(u,i.attrs),r(i.props)&&cr(u,i.props);var d=new ar(i,u,s,a,n),p=c.render.call(null,d._c,d);if(p instanceof st)return sr(p,i,d.parent,c);if(e(p)){for(var v=te(p)||[],h=new Array(v.length),m=0;m<v.length;m++)h[m]=sr(v[m],i,d.parent,c);return h}}(i,v,a,c,u);var h=a.on;if(a.on=a.nativeOn,o(i.options.abstract)){var m=a.slot;a={},m&&(a.slot=m)}!function(t){for(var e=t.hook||(t.hook={}),n=0;n<fr.length;n++){var r=fr[n],o=e[r],i=lr[r];o===i||o&&o._merged||(e[r]=o?pr(i,o):i)}}(a);var g=ur(i.options)||l;return new st("vue-component-".concat(i.cid).concat(g?"-".concat(g):""),a,void 0,void 0,void 0,c,{Ctor:i,propsData:v,listeners:h,tag:l,children:u},p)}}}function pr(t,e){var n=function(n,r){t(n,r),e(n,r)};return n._merged=!0,n}var vr=P,hr=B.optionMergeStrategies;function mr(t,e,n){if(void 0===n&&(n=!0),!e)return t;for(var r,o,i,a=ot?Reflect.ownKeys(e):Object.keys(e),s=0;s<a.length;s++)"__ob__"!==(r=a[s])&&(o=t[r],i=e[r],n&&b(t,r)?o!==i&&u(o)&&u(i)&&mr(o,i):Pt(t,r,i));return t}function gr(t,e,n){return n?function(){var r=a(e)?e.call(n,n):e,o=a(t)?t.call(n,n):t;return r?mr(r,o):o}:e?t?function(){return mr(a(e)?e.call(this,this):e,a(t)?t.call(this,this):t)}:e:t}function yr(t,n){var r=n?t?t.concat(n):e(n)?n:[n]:t;return r?function(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}(r):r}hr.data=function(t,e,n){return n?gr(t,e,n):e&&"function"!=typeof e?t:gr(t,e)};for(var _r=0;_r<H.length;_r++){hr[H[_r]]=yr}function br(t,e,n,r){var o=Object.create(t||null);return e?A(o,e):o}for(_r=0;_r<F.length;_r++){var $r=F[_r];hr[$r+"s"]=br}hr.watch=function(t,n,r,o){if(t===Q&&(t=void 0),n===Q&&(n=void 0),!n)return Object.create(t||null);if(!t)return n;var i={};for(var a in A(i,t),n){var s=i[a],c=n[a];s&&!e(s)&&(s=[s]),i[a]=s?s.concat(c):e(c)?c:[c]}return i},hr.props=hr.methods=hr.inject=hr.computed=function(t,e,n,r){if(!t)return e;var o=Object.create(null);return A(o,t),e&&A(o,e),o},hr.provide=function(t,e){return t?function(){var n=Object.create(null);return mr(n,a(t)?t.call(this):t),e&&mr(n,a(e)?e.call(this):e,!1),n}:e};var wr=function(t,e){return void 0===e?t:e};function xr(t,n,r){if(a(n)&&(n=n.options),function(t,n){var r=t.props;if(r){var o,i,a={};if(e(r))for(o=r.length;o--;)"string"==typeof(i=r[o])&&(a[x(i)]={type:null});else if(u(r))for(var s in r)i=r[s],a[x(s)]=u(i)?i:{type:i};t.props=a}}(n),function(t,n){var r=t.inject;if(r){var o=t.inject={};if(e(r))for(var i=0;i<r.length;i++)o[r[i]]={from:r[i]};else if(u(r))for(var a in r){var s=r[a];o[a]=u(s)?A({from:a},s):{from:s}}}}(n),function(t){var e=t.directives;if(e)for(var n in e){var r=e[n];a(r)&&(e[n]={bind:r,update:r})}}(n),!n._base&&(n.extends&&(t=xr(t,n.extends,r)),n.mixins))for(var o=0,i=n.mixins.length;o<i;o++)t=xr(t,n.mixins[o],r);var s,c={};for(s in t)l(s);for(s in n)b(t,s)||l(s);function l(e){var o=hr[e]||wr;c[e]=o(t[e],n[e],r,e)}return c}function Cr(t,e,n,r){if("string"==typeof n){var o=t[e];if(b(o,n))return o[n];var i=x(n);if(b(o,i))return o[i];var a=C(i);return b(o,a)?o[a]:o[n]||o[i]||o[a]}}function kr(t,e,n,r){var o=e[t],i=!b(n,t),s=n[t],c=Ar(Boolean,o.type);if(c>-1)if(i&&!b(o,"default"))s=!1;else if(""===s||s===O(t)){var u=Ar(String,o.type);(u<0||c<u)&&(s=!0)}if(void 0===s){s=function(t,e,n){if(!b(e,"default"))return;var r=e.default;if(t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n])return t._props[n];return a(r)&&"Function"!==Sr(e.type)?r.call(t):r}(r,o,t);var l=kt;Ot(!0),At(s),Ot(l)}return s}var Or=/^\s*function (\w+)/;function Sr(t){var e=t&&t.toString().match(Or);return e?e[1]:""}function Tr(t,e){return Sr(t)===Sr(e)}function Ar(t,n){if(!e(n))return Tr(n,t)?0:-1;for(var r=0,o=n.length;r<o;r++)if(Tr(n[r],t))return r;return-1}function jr(t){this._init(t)}function Pr(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,r=n.cid,o=t._Ctor||(t._Ctor={});if(o[r])return o[r];var i=ur(t)||ur(n.options),a=function(t){this._init(t)};(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=e++,a.options=xr(n.options,t),a.super=n,a.options.props&&function(t){var e=t.options.props;for(var n in e)Yn(t.prototype,"_props",n)}(a),a.options.computed&&function(t){var e=t.options.computed;for(var n in e)tr(t.prototype,n,e[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use;for(var s=0;s<F.length;s++){var c=F[s];a[c]=n[c]}return i&&(a.options.components[i]=a),a.superOptions=n.options,a.extendOptions=t,a.sealedOptions=A({},a.options),o[r]=a,a}}function Dr(t){return t&&(ur(t.Ctor.options)||t.tag)}function Nr(t,n){return e(t)?t.indexOf(n)>-1:"string"==typeof t?t.split(",").indexOf(n)>-1:(r=t,"[object RegExp]"===c.call(r)&&t.test(n));var r}function Mr(t,e){var n=t.cache,r=t.keys,o=t._vnode,i=t.$vnode;for(var a in n){var s=n[a];if(s){var c=s.name;c&&!e(c)&&Ir(n,a,r,o)}}i.componentOptions.children=void 0}function Ir(t,e,n,r){var o=t[e];!o||r&&o.tag===r.tag||o.componentInstance.$destroy(),t[e]=null,y(n,e)}!function(e){e.prototype._init=function(e){var n=this;n._uid=or++,n._isVue=!0,n.__v_skip=!0,n._scope=new Be(!0),n._scope.parent=void 0,n._scope._vm=!0,e&&e._isComponent?function(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r;var o=r.componentOptions;n.propsData=o.propsData,n._parentListeners=o.listeners,n._renderChildren=o.children,n._componentTag=o.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}(n,e):n.$options=xr(ir(n.constructor),e||{},n),n._renderProxy=n,n._self=n,function(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._provided=n?n._provided:Object.create(null),t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}(n),function(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&He(t,e)}(n),function(e){e._vnode=null,e._staticTrees=null;var n=e.$options,r=e.$vnode=n._parentVnode,o=r&&r.context;e.$slots=we(n._renderChildren,o),e.$scopedSlots=r?ke(e.$parent,r.data.scopedSlots,e.$slots):t,e._c=function(t,n,r,o){return ie(e,t,n,r,o,!1)},e.$createElement=function(t,n,r,o){return ie(e,t,n,r,o,!0)};var i=r&&r.data;jt(e,"$attrs",i&&i.attrs||t,null,!0),jt(e,"$listeners",n._parentListeners||t,null,!0)}(n),We(n,"beforeCreate",void 0,!1),function(t){var e=rr(t.$options.inject,t);if(e){Ot(!1);for(var n=Object.keys(e),r=function(r){var o=n[r];jt(t,o,e[o])},o=0;o<n.length;o++)r(o);Ot(!0)}}(n),Qn(n),function(t){var e=t.$options.provide;if(e){var n=a(e)?e.call(t):e;if(!s(n))return;for(var r=hn(t),o=ot?Reflect.ownKeys(n):Object.keys(n),i=0;i<o.length;i++){var c=o[i];Object.defineProperty(r,c,Object.getOwnPropertyDescriptor(n,c))}}}(n),We(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(jr),function(t){var e={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=Pt,t.prototype.$delete=Dt,t.prototype.$watch=function(t,e,n){var r=this;if(u(e))return nr(r,t,e,n);(n=n||{}).user=!0;var o=new Zn(r,t,e,n);if(n.immediate){var i='callback for immediate watcher "'.concat(o.expression,'"');mt(),gn(e,r,[o.value],r,i),gt()}return function(){o.teardown()}}}(jr),function(t){var n=/^hook:/;t.prototype.$on=function(t,r){var o=this;if(e(t))for(var i=0,a=t.length;i<a;i++)o.$on(t[i],r);else(o._events[t]||(o._events[t]=[])).push(r),n.test(t)&&(o._hasHookEvent=!0);return o},t.prototype.$once=function(t,e){var n=this;function r(){n.$off(t,r),e.apply(n,arguments)}return r.fn=e,n.$on(t,r),n},t.prototype.$off=function(t,n){var r=this;if(!arguments.length)return r._events=Object.create(null),r;if(e(t)){for(var o=0,i=t.length;o<i;o++)r.$off(t[o],n);return r}var a,s=r._events[t];if(!s)return r;if(!n)return r._events[t]=null,r;for(var c=s.length;c--;)if((a=s[c])===n||a.fn===n){s.splice(c,1);break}return r},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?T(n):n;for(var r=T(arguments,1),o='event handler for "'.concat(t,'"'),i=0,a=n.length;i<a;i++)gn(n[i],e,r,e,o)}return e}}(jr),function(t){t.prototype._update=function(t,e){var n=this,r=n.$el,o=n._vnode,i=Ve(n);n._vnode=t,n.$el=o?n.__patch__(o,t):n.__patch__(n.$el,t,e,!1),i(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n);for(var a=n;a&&a.$vnode&&a.$parent&&a.$vnode===a.$parent._vnode;)a.$parent.$el=a.$el,a=a.$parent},t.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},t.prototype.$destroy=function(){var t=this;if(!t._isBeingDestroyed){We(t,"beforeDestroy"),t._isBeingDestroyed=!0;var e=t.$parent;!e||e._isBeingDestroyed||t.$options.abstract||y(e.$children,t),t._scope.stop(),t._data.__ob__&&t._data.__ob__.vmCount--,t._isDestroyed=!0,t.__patch__(t._vnode,null),We(t,"destroyed"),t.$off(),t.$el&&(t.$el.__vue__=null),t.$vnode&&(t.$vnode.parent=null)}}}(jr),function(t){$e(t.prototype),t.prototype.$nextTick=function(t){return An(t,this)},t.prototype._render=function(){var t=this,n=t.$options,r=n.render,o=n._parentVnode;o&&t._isMounted&&(t.$scopedSlots=ke(t.$parent,o.data.scopedSlots,t.$slots,t.$scopedSlots),t._slotsProxy&&Pe(t._slotsProxy,t.$scopedSlots)),t.$vnode=o;var i,a=it,s=Me;try{at(t),Me=t,i=r.call(t._renderProxy,t.$createElement)}catch(e){mn(e,t,"render"),i=t._vnode}finally{Me=s,at(a)}return e(i)&&1===i.length&&(i=i[0]),i instanceof st||(i=ct()),i.parent=o,i}}(jr);var Rr=[String,RegExp,Array],Er={name:"keep-alive",abstract:!0,props:{include:Rr,exclude:Rr,max:[String,Number]},methods:{cacheVNode:function(){var t=this,e=t.cache,n=t.keys,r=t.vnodeToCache,o=t.keyToCache;if(r){var i=r.tag,a=r.componentInstance,s=r.componentOptions;e[o]={name:Dr(s),tag:i,componentInstance:a},n.push(o),this.max&&n.length>parseInt(this.max)&&Ir(e,n[0],n,this._vnode),this.vnodeToCache=null}}},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Ir(this.cache,t,this.keys)},mounted:function(){var t=this;this.cacheVNode(),this.$watch("include",(function(e){Mr(t,(function(t){return Nr(e,t)}))})),this.$watch("exclude",(function(e){Mr(t,(function(t){return!Nr(e,t)}))}))},updated:function(){this.cacheVNode()},render:function(){var t=this.$slots.default,e=Re(t),n=e&&e.componentOptions;if(n){var r=Dr(n),o=this.include,i=this.exclude;if(o&&(!r||!Nr(o,r))||i&&r&&Nr(i,r))return e;var a=this.cache,s=this.keys,c=null==e.key?n.Ctor.cid+(n.tag?"::".concat(n.tag):""):e.key;a[c]?(e.componentInstance=a[c].componentInstance,y(s,c),s.push(c)):(this.vnodeToCache=e,this.keyToCache=c),e.data.keepAlive=!0}return e||t&&t[0]}},Lr={KeepAlive:Er};!function(t){var e={get:function(){return B}};Object.defineProperty(t,"config",e),t.util={warn:vr,extend:A,mergeOptions:xr,defineReactive:jt},t.set=Pt,t.delete=Dt,t.nextTick=An,t.observable=function(t){return At(t),t},t.options=Object.create(null);for(var n=0;n<F.length;n++){var r=F[n];t.options[r+"s"]=Object.create(null)}t.options._base=t,A(t.options.components,Lr),function(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=T(arguments,1);return n.unshift(this),a(t.install)?t.install.apply(t,n):a(t)&&t.apply(null,n),e.push(t),this}}(t),function(t){t.mixin=function(t){return this.options=xr(this.options,t),this}}(t),Pr(t),function(t){for(var e=function(e){var n=F[e];t[n]=function(t,e){return e?("component"===n&&u(e)&&(e.name=e.name||t,e=this.options._base.extend(e)),"directive"===n&&a(e)&&(e={bind:e,update:e}),this.options[n+"s"][t]=e,e):this.options[n+"s"][t]}},n=0;n<F.length;n++)e(n)}(t)}(jr),Object.defineProperty(jr.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(jr,"FunctionalRenderContext",{value:ar}),jr.version=zn;var Fr=h("style,class"),Hr=h("input,textarea,option,select,progress"),Br=function(t,e,n){return"value"===n&&Hr(t)&&"button"!==e||"selected"===n&&"option"===t||"checked"===n&&"input"===t||"muted"===n&&"video"===t},Ur=h("contenteditable,draggable,spellcheck"),zr=h("events,caret,typing,plaintext-only"),Vr=function(t,e){return Zr(e)||"false"===e?"false":"contenteditable"===t&&zr(e)?e:"true"},Kr=h("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible"),Jr="http://www.w3.org/1999/xlink",qr=function(t){return":"===t.charAt(5)&&"xlink"===t.slice(0,5)},Wr=function(t){return qr(t)?t.slice(6,t.length):""},Zr=function(t){return null==t||!1===t};function Gr(t){for(var e=t.data,n=t,o=t;r(o.componentInstance);)(o=o.componentInstance._vnode)&&o.data&&(e=Yr(o.data,e));for(;r(n=n.parent);)n&&n.data&&(e=Yr(e,n.data));return function(t,e){if(r(t)||r(e))return Qr(t,Xr(e));return""}(e.staticClass,e.class)}function Yr(t,e){return{staticClass:Qr(t.staticClass,e.staticClass),class:r(t.class)?[t.class,e.class]:e.class}}function Qr(t,e){return t?e?t+" "+e:t:e||""}function Xr(t){return Array.isArray(t)?function(t){for(var e,n="",o=0,i=t.length;o<i;o++)r(e=Xr(t[o]))&&""!==e&&(n&&(n+=" "),n+=e);return n}(t):s(t)?function(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}(t):"string"==typeof t?t:""}var to={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},eo=h("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),no=h("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),ro=function(t){return eo(t)||no(t)};function oo(t){return no(t)?"svg":"math"===t?"math":void 0}var io=Object.create(null);var ao=h("text,number,password,search,email,tel,url");function so(t){if("string"==typeof t){var e=document.querySelector(t);return e||document.createElement("div")}return t}var co=Object.freeze({__proto__:null,createElement:function(t,e){var n=document.createElement(t);return"select"!==t||e.data&&e.data.attrs&&void 0!==e.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n},createElementNS:function(t,e){return document.createElementNS(to[t],e)},createTextNode:function(t){return document.createTextNode(t)},createComment:function(t){return document.createComment(t)},insertBefore:function(t,e,n){t.insertBefore(e,n)},removeChild:function(t,e){t.removeChild(e)},appendChild:function(t,e){t.appendChild(e)},parentNode:function(t){return t.parentNode},nextSibling:function(t){return t.nextSibling},tagName:function(t){return t.tagName},setTextContent:function(t,e){t.textContent=e},setStyleScope:function(t,e){t.setAttribute(e,"")}}),uo={create:function(t,e){lo(e)},update:function(t,e){t.data.ref!==e.data.ref&&(lo(t,!0),lo(e))},destroy:function(t){lo(t,!0)}};function lo(t,n){var o=t.data.ref;if(r(o)){var i=t.context,s=t.componentInstance||t.elm,c=n?null:s,u=n?void 0:s;if(a(o))gn(o,i,[c],i,"template ref function");else{var l=t.data.refInFor,f="string"==typeof o||"number"==typeof o,d=Ht(o),p=i.$refs;if(f||d)if(l){var v=f?p[o]:o.value;n?e(v)&&y(v,s):e(v)?v.includes(s)||v.push(s):f?(p[o]=[s],fo(i,o,p[o])):o.value=[s]}else if(f){if(n&&p[o]!==s)return;p[o]=u,fo(i,o,c)}else if(d){if(n&&o.value!==s)return;o.value=c}}}}function fo(t,e,n){var r=t._setupState;r&&b(r,e)&&(Ht(r[e])?r[e].value=n:r[e]=n)}var po=new st("",{},[]),vo=["create","activate","update","remove","destroy"];function ho(t,e){return!(!t||!e||t.tag!==e.tag)&&(t.key===e.key&&t.asyncFactory===e.asyncFactory&&(t.tag===e.tag&&t.isComment===e.isComment&&r(t.data)===r(e.data)&&function(t,e){if("input"!==t.tag)return!0;var n,o=r(n=t.data)&&r(n=n.attrs)&&n.type,i=r(n=e.data)&&r(n=n.attrs)&&n.type;return o===i||ao(o)&&ao(i)}(t,e)||o(t.isAsyncPlaceholder)&&n(e.asyncFactory.error)))}function mo(t,e,n){var o,i,a={};for(o=e;o<=n;++o)r(i=t[o].key)&&(a[i]=o);return a}var go={create:yo,update:yo,destroy:function(t){yo(t,po)}};function yo(t,e){(t.data.directives||e.data.directives)&&function(t,e){var n,r,o,i=t===po,a=e===po,s=bo(t.data.directives,t.context),c=bo(e.data.directives,e.context),u=[],l=[];for(n in c)r=s[n],o=c[n],r?(o.oldValue=r.value,o.oldArg=r.arg,wo(o,"update",e,t),o.def&&o.def.componentUpdated&&l.push(o)):(wo(o,"bind",e,t),o.def&&o.def.inserted&&u.push(o));if(u.length){var f=function(){for(var n=0;n<u.length;n++)wo(u[n],"inserted",e,t)};i?Qt(e,"insert",f):f()}l.length&&Qt(e,"postpatch",(function(){for(var n=0;n<l.length;n++)wo(l[n],"componentUpdated",e,t)}));if(!i)for(n in s)c[n]||wo(s[n],"unbind",t,t,a)}(t,e)}var _o=Object.create(null);function bo(t,e){var n,r,o=Object.create(null);if(!t)return o;for(n=0;n<t.length;n++){if((r=t[n]).modifiers||(r.modifiers=_o),o[$o(r)]=r,e._setupState&&e._setupState.__sfc){var i=r.def||Cr(e,"_setupState","v-"+r.name);r.def="function"==typeof i?{bind:i,update:i}:i}r.def=r.def||Cr(e.$options,"directives",r.name)}return o}function $o(t){return t.rawName||"".concat(t.name,".").concat(Object.keys(t.modifiers||{}).join("."))}function wo(t,e,n,r,o){var i=t.def&&t.def[e];if(i)try{i(n.elm,t,n,r,o)}catch(r){mn(r,n.context,"directive ".concat(t.name," ").concat(e," hook"))}}var xo=[uo,go];function Co(t,e){var i=e.componentOptions;if(!(r(i)&&!1===i.Ctor.options.inheritAttrs||n(t.data.attrs)&&n(e.data.attrs))){var a,s,c=e.elm,u=t.data.attrs||{},l=e.data.attrs||{};for(a in(r(l.__ob__)||o(l._v_attr_proxy))&&(l=e.data.attrs=A({},l)),l)s=l[a],u[a]!==s&&ko(c,a,s,e.data.pre);for(a in Z&&l.value!==u.value&&ko(c,"value",l.value),u)n(l[a])&&(qr(a)?c.removeAttributeNS(Jr,Wr(a)):Ur(a)||c.removeAttribute(a))}}function ko(t,e,n,r){r||t.tagName.indexOf("-")>-1?Oo(t,e,n):Kr(e)?Zr(n)?t.removeAttribute(e):(n="allowfullscreen"===e&&"EMBED"===t.tagName?"true":e,t.setAttribute(e,n)):Ur(e)?t.setAttribute(e,Vr(e,n)):qr(e)?Zr(n)?t.removeAttributeNS(Jr,Wr(e)):t.setAttributeNS(Jr,e,n):Oo(t,e,n)}function Oo(t,e,n){Zr(n)?t.removeAttribute(e):t.setAttribute(e,n)}var So={create:Co,update:Co};function To(t,e){var o=e.elm,i=e.data,a=t.data;if(!(n(i.staticClass)&&n(i.class)&&(n(a)||n(a.staticClass)&&n(a.class)))){var s=Gr(e),c=o._transitionClasses;r(c)&&(s=Qr(s,Xr(c))),s!==o._prevClass&&(o.setAttribute("class",s),o._prevClass=s)}}var Ao,jo,Po,Do,No,Mo,Io={create:To,update:To},Ro=/[\w).+\-_$\]]/;function Eo(t){var e,n,r,o,i,a=!1,s=!1,c=!1,u=!1,l=0,f=0,d=0,p=0;for(r=0;r<t.length;r++)if(n=e,e=t.charCodeAt(r),a)39===e&&92!==n&&(a=!1);else if(s)34===e&&92!==n&&(s=!1);else if(c)96===e&&92!==n&&(c=!1);else if(u)47===e&&92!==n&&(u=!1);else if(124!==e||124===t.charCodeAt(r+1)||124===t.charCodeAt(r-1)||l||f||d){switch(e){case 34:s=!0;break;case 39:a=!0;break;case 96:c=!0;break;case 40:d++;break;case 41:d--;break;case 91:f++;break;case 93:f--;break;case 123:l++;break;case 125:l--}if(47===e){for(var v=r-1,h=void 0;v>=0&&" "===(h=t.charAt(v));v--);h&&Ro.test(h)||(u=!0)}}else void 0===o?(p=r+1,o=t.slice(0,r).trim()):m();function m(){(i||(i=[])).push(t.slice(p,r).trim()),p=r+1}if(void 0===o?o=t.slice(0,r).trim():0!==p&&m(),i)for(r=0;r<i.length;r++)o=Lo(o,i[r]);return o}function Lo(t,e){var n=e.indexOf("(");if(n<0)return'_f("'.concat(e,'")(').concat(t,")");var r=e.slice(0,n),o=e.slice(n+1);return'_f("'.concat(r,'")(').concat(t).concat(")"!==o?","+o:o)}function Fo(t,e){console.error("[Vue compiler]: ".concat(t))}function Ho(t,e){return t?t.map((function(t){return t[e]})).filter((function(t){return t})):[]}function Bo(t,e,n,r,o){(t.props||(t.props=[])).push(Go({name:e,value:n,dynamic:o},r)),t.plain=!1}function Uo(t,e,n,r,o){(o?t.dynamicAttrs||(t.dynamicAttrs=[]):t.attrs||(t.attrs=[])).push(Go({name:e,value:n,dynamic:o},r)),t.plain=!1}function zo(t,e,n,r){t.attrsMap[e]=n,t.attrsList.push(Go({name:e,value:n},r))}function Vo(t,e,n,r,o,i,a,s){(t.directives||(t.directives=[])).push(Go({name:e,rawName:n,value:r,arg:o,isDynamicArg:i,modifiers:a},s)),t.plain=!1}function Ko(t,e,n){return n?"_p(".concat(e,',"').concat(t,'")'):t+e}function Jo(e,n,r,o,i,a,s,c){var u;(o=o||t).right?c?n="(".concat(n,")==='click'?'contextmenu':(").concat(n,")"):"click"===n&&(n="contextmenu",delete o.right):o.middle&&(c?n="(".concat(n,")==='click'?'mouseup':(").concat(n,")"):"click"===n&&(n="mouseup")),o.capture&&(delete o.capture,n=Ko("!",n,c)),o.once&&(delete o.once,n=Ko("~",n,c)),o.passive&&(delete o.passive,n=Ko("&",n,c)),o.native?(delete o.native,u=e.nativeEvents||(e.nativeEvents={})):u=e.events||(e.events={});var l=Go({value:r.trim(),dynamic:c},s);o!==t&&(l.modifiers=o);var f=u[n];Array.isArray(f)?i?f.unshift(l):f.push(l):u[n]=f?i?[l,f]:[f,l]:l,e.plain=!1}function qo(t,e,n){var r=Wo(t,":"+e)||Wo(t,"v-bind:"+e);if(null!=r)return Eo(r);if(!1!==n){var o=Wo(t,e);if(null!=o)return JSON.stringify(o)}}function Wo(t,e,n){var r;if(null!=(r=t.attrsMap[e]))for(var o=t.attrsList,i=0,a=o.length;i<a;i++)if(o[i].name===e){o.splice(i,1);break}return n&&delete t.attrsMap[e],r}function Zo(t,e){for(var n=t.attrsList,r=0,o=n.length;r<o;r++){var i=n[r];if(e.test(i.name))return n.splice(r,1),i}}function Go(t,e){return e&&(null!=e.start&&(t.start=e.start),null!=e.end&&(t.end=e.end)),t}function Yo(t,e,n){var r=n||{},o=r.number,i="$$v",a=i;r.trim&&(a="(typeof ".concat(i," === 'string'")+"? ".concat(i,".trim()")+": ".concat(i,")")),o&&(a="_n(".concat(a,")"));var s=Qo(e,a);t.model={value:"(".concat(e,")"),expression:JSON.stringify(e),callback:"function (".concat(i,") {").concat(s,"}")}}function Qo(t,e){var n=function(t){if(t=t.trim(),Ao=t.length,t.indexOf("[")<0||t.lastIndexOf("]")<Ao-1)return(Do=t.lastIndexOf("."))>-1?{exp:t.slice(0,Do),key:'"'+t.slice(Do+1)+'"'}:{exp:t,key:null};jo=t,Do=No=Mo=0;for(;!ti();)ei(Po=Xo())?ri(Po):91===Po&&ni(Po);return{exp:t.slice(0,No),key:t.slice(No+1,Mo)}}(t);return null===n.key?"".concat(t,"=").concat(e):"$set(".concat(n.exp,", ").concat(n.key,", ").concat(e,")")}function Xo(){return jo.charCodeAt(++Do)}function ti(){return Do>=Ao}function ei(t){return 34===t||39===t}function ni(t){var e=1;for(No=Do;!ti();)if(ei(t=Xo()))ri(t);else if(91===t&&e++,93===t&&e--,0===e){Mo=Do;break}}function ri(t){for(var e=t;!ti()&&(t=Xo())!==e;);}var oi,ii="__r",ai="__c";function si(t,e,n){var r=oi;return function o(){null!==e.apply(null,arguments)&&li(t,o,n,r)}}var ci=$n&&!(Y&&Number(Y[1])<=53);function ui(t,e,n,r){if(ci){var o=en,i=e;e=i._wrapper=function(t){if(t.target===t.currentTarget||t.timeStamp>=o||t.timeStamp<=0||t.target.ownerDocument!==document)return i.apply(this,arguments)}}oi.addEventListener(t,e,X?{capture:n,passive:r}:n)}function li(t,e,n,r){(r||oi).removeEventListener(t,e._wrapper||e,n)}function fi(t,e){if(!n(t.data.on)||!n(e.data.on)){var o=e.data.on||{},i=t.data.on||{};oi=e.elm||t.elm,function(t){r(t[ii])&&(t.input=[].concat(t[ii],t.input||[]),delete t[ii]),r(t[ai])&&(t.change=[].concat(t[ai],t.change||[]),delete t[ai])}(o),Yt(o,i,ui,li,si,e.context),oi=void 0}}var di,pi={create:fi,update:fi,destroy:function(t){return fi(t,po)}};function vi(t,e){if(!n(t.data.domProps)||!n(e.data.domProps)){var i,a,s=e.elm,c=t.data.domProps||{},u=e.data.domProps||{};for(i in(r(u.__ob__)||o(u._v_attr_proxy))&&(u=e.data.domProps=A({},u)),c)i in u||(s[i]="");for(i in u){if(a=u[i],"textContent"===i||"innerHTML"===i){if(e.children&&(e.children.length=0),a===c[i])continue;1===s.childNodes.length&&s.removeChild(s.childNodes[0])}if("value"===i&&"PROGRESS"!==s.tagName){s._value=a;var l=n(a)?"":String(a);hi(s,l)&&(s.value=l)}else if("innerHTML"===i&&no(s.tagName)&&n(s.innerHTML)){(di=di||document.createElement("div")).innerHTML="<svg>".concat(a,"</svg>");for(var f=di.firstChild;s.firstChild;)s.removeChild(s.firstChild);for(;f.firstChild;)s.appendChild(f.firstChild)}else if(a!==c[i])try{s[i]=a}catch(t){}}}}function hi(t,e){return!t.composing&&("OPTION"===t.tagName||function(t,e){var n=!0;try{n=document.activeElement!==t}catch(t){}return n&&t.value!==e}(t,e)||function(t,e){var n=t.value,o=t._vModifiers;if(r(o)){if(o.number)return v(n)!==v(e);if(o.trim)return n.trim()!==e.trim()}return n!==e}(t,e))}var mi={create:vi,update:vi},gi=$((function(t){for(var e={},n=/:(.+)/,r=t.split(/;(?![^(]*\))/g),o=0;o<r.length;o++){var i=r[o];if(i){var a=i.split(n);a.length>1&&(e[a[0].trim()]=a[1].trim())}}return e}));function yi(t){var e=_i(t.style);return t.staticStyle?A(t.staticStyle,e):e}function _i(t){return Array.isArray(t)?j(t):"string"==typeof t?gi(t):t}var bi,$i=/^--/,wi=/\s*!important$/,xi=function(t,e,n){if($i.test(e))t.style.setProperty(e,n);else if(wi.test(n))t.style.setProperty(O(e),n.replace(wi,""),"important");else{var r=ki(e);if(Array.isArray(n))for(var o=0,i=n.length;o<i;o++)t.style[r]=n[o];else t.style[r]=n}},Ci=["Webkit","Moz","ms"],ki=$((function(t){if(bi=bi||document.createElement("div").style,"filter"!==(t=x(t))&&t in bi)return t;for(var e=t.charAt(0).toUpperCase()+t.slice(1),n=0;n<Ci.length;n++){var r=Ci[n]+e;if(r in bi)return r}}));function Oi(t,e){var o=e.data,i=t.data;if(!(n(o.staticStyle)&&n(o.style)&&n(i.staticStyle)&&n(i.style))){var a,s,c=e.elm,u=i.staticStyle,l=i.normalizedStyle||i.style||{},f=u||l,d=_i(e.data.style)||{};e.data.normalizedStyle=r(d.__ob__)?A({},d):d;var p=function(t,e){var n,r={};if(e)for(var o=t;o.componentInstance;)(o=o.componentInstance._vnode)&&o.data&&(n=yi(o.data))&&A(r,n);(n=yi(t.data))&&A(r,n);for(var i=t;i=i.parent;)i.data&&(n=yi(i.data))&&A(r,n);return r}(e,!0);for(s in f)n(p[s])&&xi(c,s,"");for(s in p)a=p[s],xi(c,s,null==a?"":a)}}var Si={create:Oi,update:Oi},Ti=/\s+/;function Ai(t,e){if(e&&(e=e.trim()))if(t.classList)if(e.indexOf(" ")>-1)for(var n=e.split(Ti),r=0;r<n.length;r++){var o=n[r];t.classList.add(o)}else t.classList.add(e);else{var i=" ".concat(t.getAttribute("class")||""," ");i.indexOf(" "+e+" ")<0&&t.setAttribute("class",(i+e).trim())}}function ji(t,e){if(e&&(e=e.trim()))if(t.classList){if(e.indexOf(" ")>-1)for(var n=e.split(Ti),r=0;r<n.length;r++){var o=n[r];t.classList.remove(o)}else t.classList.remove(e);t.classList.length||t.removeAttribute("class")}else{for(var i=" ".concat(t.getAttribute("class")||""," "),a=" "+e+" ";i.indexOf(a)>=0;)i=i.replace(a," ");(i=i.trim())?t.setAttribute("class",i):t.removeAttribute("class")}}function Pi(t){if(t){if("object"==typeof t){var e={};return!1!==t.css&&A(e,Di(t.name||"v")),A(e,t),e}return"string"==typeof t?Di(t):void 0}}var Di=$((function(t){return{enterClass:"".concat(t,"-enter"),enterToClass:"".concat(t,"-enter-to"),enterActiveClass:"".concat(t,"-enter-active"),leaveClass:"".concat(t,"-leave"),leaveToClass:"".concat(t,"-leave-to"),leaveActiveClass:"".concat(t,"-leave-active")}})),Ni=q,Mi="transition",Ii="animation",Ri="transition",Ei="transitionend",Li="animation",Fi="animationend";Ni&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Ri="WebkitTransition",Ei="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Li="WebkitAnimation",Fi="webkitAnimationEnd"));var Hi=q?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(t){return t()};function Bi(t){Hi((function(){Hi(t)}))}function Ui(t,e){var n=t._transitionClasses||(t._transitionClasses=[]);n.indexOf(e)<0&&(n.push(e),Ai(t,e))}function zi(t,e){t._transitionClasses&&y(t._transitionClasses,e),ji(t,e)}function Vi(t,e,n){var r=Ji(t,e),o=r.type,i=r.timeout,a=r.propCount;if(!o)return n();var s=o===Mi?Ei:Fi,c=0,u=function(){t.removeEventListener(s,l),n()},l=function(e){e.target===t&&++c>=a&&u()};setTimeout((function(){c<a&&u()}),i+1),t.addEventListener(s,l)}var Ki=/\b(transform|all)(,|$)/;function Ji(t,e){var n,r=window.getComputedStyle(t),o=(r[Ri+"Delay"]||"").split(", "),i=(r[Ri+"Duration"]||"").split(", "),a=qi(o,i),s=(r[Li+"Delay"]||"").split(", "),c=(r[Li+"Duration"]||"").split(", "),u=qi(s,c),l=0,f=0;return e===Mi?a>0&&(n=Mi,l=a,f=i.length):e===Ii?u>0&&(n=Ii,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Mi:Ii:null)?n===Mi?i.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Mi&&Ki.test(r[Ri+"Property"])}}function qi(t,e){for(;t.length<e.length;)t=t.concat(t);return Math.max.apply(null,e.map((function(e,n){return Wi(e)+Wi(t[n])})))}function Wi(t){return 1e3*Number(t.slice(0,-1).replace(",","."))}function Zi(t,e){var o=t.elm;r(o._leaveCb)&&(o._leaveCb.cancelled=!0,o._leaveCb());var i=Pi(t.data.transition);if(!n(i)&&!r(o._enterCb)&&1===o.nodeType){for(var c=i.css,u=i.type,l=i.enterClass,f=i.enterToClass,d=i.enterActiveClass,p=i.appearClass,h=i.appearToClass,m=i.appearActiveClass,g=i.beforeEnter,y=i.enter,_=i.afterEnter,b=i.enterCancelled,$=i.beforeAppear,w=i.appear,x=i.afterAppear,C=i.appearCancelled,k=i.duration,O=ze,S=ze.$vnode;S&&S.parent;)O=S.context,S=S.parent;var T=!O._isMounted||!t.isRootInsert;if(!T||w||""===w){var A=T&&p?p:l,j=T&&m?m:d,P=T&&h?h:f,D=T&&$||g,N=T&&a(w)?w:y,M=T&&x||_,I=T&&C||b,E=v(s(k)?k.enter:k),L=!1!==c,F=Qi(N),H=o._enterCb=R((function(){L&&(zi(o,P),zi(o,j)),H.cancelled?(L&&zi(o,A),I&&I(o)):M&&M(o),o._enterCb=null}));t.data.show||Qt(t,"insert",(function(){var e=o.parentNode,n=e&&e._pending&&e._pending[t.key];n&&n.tag===t.tag&&n.elm._leaveCb&&n.elm._leaveCb(),N&&N(o,H)})),D&&D(o),L&&(Ui(o,A),Ui(o,j),Bi((function(){zi(o,A),H.cancelled||(Ui(o,P),F||(Yi(E)?setTimeout(H,E):Vi(o,u,H)))}))),t.data.show&&(e&&e(),N&&N(o,H)),L||F||H()}}}function Gi(t,e){var o=t.elm;r(o._enterCb)&&(o._enterCb.cancelled=!0,o._enterCb());var i=Pi(t.data.transition);if(n(i)||1!==o.nodeType)return e();if(!r(o._leaveCb)){var a=i.css,c=i.type,u=i.leaveClass,l=i.leaveToClass,f=i.leaveActiveClass,d=i.beforeLeave,p=i.leave,h=i.afterLeave,m=i.leaveCancelled,g=i.delayLeave,y=i.duration,_=!1!==a,b=Qi(p),$=v(s(y)?y.leave:y),w=o._leaveCb=R((function(){o.parentNode&&o.parentNode._pending&&(o.parentNode._pending[t.key]=null),_&&(zi(o,l),zi(o,f)),w.cancelled?(_&&zi(o,u),m&&m(o)):(e(),h&&h(o)),o._leaveCb=null}));g?g(x):x()}function x(){w.cancelled||(!t.data.show&&o.parentNode&&((o.parentNode._pending||(o.parentNode._pending={}))[t.key]=t),d&&d(o),_&&(Ui(o,u),Ui(o,f),Bi((function(){zi(o,u),w.cancelled||(Ui(o,l),b||(Yi($)?setTimeout(w,$):Vi(o,c,w)))}))),p&&p(o,w),_||b||w())}}function Yi(t){return"number"==typeof t&&!isNaN(t)}function Qi(t){if(n(t))return!1;var e=t.fns;return r(e)?Qi(Array.isArray(e)?e[0]:e):(t._length||t.length)>1}function Xi(t,e){!0!==e.data.show&&Zi(e)}var ta=function(t){var a,s,c={},u=t.modules,l=t.nodeOps;for(a=0;a<vo.length;++a)for(c[vo[a]]=[],s=0;s<u.length;++s)r(u[s][vo[a]])&&c[vo[a]].push(u[s][vo[a]]);function f(t){var e=l.parentNode(t);r(e)&&l.removeChild(e,t)}function d(t,e,n,i,a,s,u){if(r(t.elm)&&r(s)&&(t=s[u]=lt(t)),t.isRootInsert=!a,!function(t,e,n,i){var a=t.data;if(r(a)){var s=r(t.componentInstance)&&a.keepAlive;if(r(a=a.hook)&&r(a=a.init)&&a(t,!1),r(t.componentInstance))return p(t,e),v(n,t.elm,i),o(s)&&function(t,e,n,o){var i,a=t;for(;a.componentInstance;)if(r(i=(a=a.componentInstance._vnode).data)&&r(i=i.transition)){for(i=0;i<c.activate.length;++i)c.activate[i](po,a);e.push(a);break}v(n,t.elm,o)}(t,e,n,i),!0}}(t,e,n,i)){var f=t.data,d=t.children,h=t.tag;r(h)?(t.elm=t.ns?l.createElementNS(t.ns,h):l.createElement(h,t),_(t),m(t,d,e),r(f)&&y(t,e),v(n,t.elm,i)):o(t.isComment)?(t.elm=l.createComment(t.text),v(n,t.elm,i)):(t.elm=l.createTextNode(t.text),v(n,t.elm,i))}}function p(t,e){r(t.data.pendingInsert)&&(e.push.apply(e,t.data.pendingInsert),t.data.pendingInsert=null),t.elm=t.componentInstance.$el,g(t)?(y(t,e),_(t)):(lo(t),e.push(t))}function v(t,e,n){r(t)&&(r(n)?l.parentNode(n)===t&&l.insertBefore(t,e,n):l.appendChild(t,e))}function m(t,n,r){if(e(n))for(var o=0;o<n.length;++o)d(n[o],r,t.elm,null,!0,n,o);else i(t.text)&&l.appendChild(t.elm,l.createTextNode(String(t.text)))}function g(t){for(;t.componentInstance;)t=t.componentInstance._vnode;return r(t.tag)}function y(t,e){for(var n=0;n<c.create.length;++n)c.create[n](po,t);r(a=t.data.hook)&&(r(a.create)&&a.create(po,t),r(a.insert)&&e.push(t))}function _(t){var e;if(r(e=t.fnScopeId))l.setStyleScope(t.elm,e);else for(var n=t;n;)r(e=n.context)&&r(e=e.$options._scopeId)&&l.setStyleScope(t.elm,e),n=n.parent;r(e=ze)&&e!==t.context&&e!==t.fnContext&&r(e=e.$options._scopeId)&&l.setStyleScope(t.elm,e)}function b(t,e,n,r,o,i){for(;r<=o;++r)d(n[r],i,t,e,!1,n,r)}function $(t){var e,n,o=t.data;if(r(o))for(r(e=o.hook)&&r(e=e.destroy)&&e(t),e=0;e<c.destroy.length;++e)c.destroy[e](t);if(r(e=t.children))for(n=0;n<t.children.length;++n)$(t.children[n])}function w(t,e,n){for(;e<=n;++e){var o=t[e];r(o)&&(r(o.tag)?(x(o),$(o)):f(o.elm))}}function x(t,e){if(r(e)||r(t.data)){var n,o=c.remove.length+1;for(r(e)?e.listeners+=o:e=function(t,e){function n(){0==--n.listeners&&f(t)}return n.listeners=e,n}(t.elm,o),r(n=t.componentInstance)&&r(n=n._vnode)&&r(n.data)&&x(n,e),n=0;n<c.remove.length;++n)c.remove[n](t,e);r(n=t.data.hook)&&r(n=n.remove)?n(t,e):e()}else f(t.elm)}function C(t,e,n,o){for(var i=n;i<o;i++){var a=e[i];if(r(a)&&ho(t,a))return i}}function k(t,e,i,a,s,u){if(t!==e){r(e.elm)&&r(a)&&(e=a[s]=lt(e));var f=e.elm=t.elm;if(o(t.isAsyncPlaceholder))r(e.asyncFactory.resolved)?T(t.elm,e,i):e.isAsyncPlaceholder=!0;else if(o(e.isStatic)&&o(t.isStatic)&&e.key===t.key&&(o(e.isCloned)||o(e.isOnce)))e.componentInstance=t.componentInstance;else{var p,v=e.data;r(v)&&r(p=v.hook)&&r(p=p.prepatch)&&p(t,e);var h=t.children,m=e.children;if(r(v)&&g(e)){for(p=0;p<c.update.length;++p)c.update[p](t,e);r(p=v.hook)&&r(p=p.update)&&p(t,e)}n(e.text)?r(h)&&r(m)?h!==m&&function(t,e,o,i,a){for(var s,c,u,f=0,p=0,v=e.length-1,h=e[0],m=e[v],g=o.length-1,y=o[0],_=o[g],$=!a;f<=v&&p<=g;)n(h)?h=e[++f]:n(m)?m=e[--v]:ho(h,y)?(k(h,y,i,o,p),h=e[++f],y=o[++p]):ho(m,_)?(k(m,_,i,o,g),m=e[--v],_=o[--g]):ho(h,_)?(k(h,_,i,o,g),$&&l.insertBefore(t,h.elm,l.nextSibling(m.elm)),h=e[++f],_=o[--g]):ho(m,y)?(k(m,y,i,o,p),$&&l.insertBefore(t,m.elm,h.elm),m=e[--v],y=o[++p]):(n(s)&&(s=mo(e,f,v)),n(c=r(y.key)?s[y.key]:C(y,e,f,v))?d(y,i,t,h.elm,!1,o,p):ho(u=e[c],y)?(k(u,y,i,o,p),e[c]=void 0,$&&l.insertBefore(t,u.elm,h.elm)):d(y,i,t,h.elm,!1,o,p),y=o[++p]);f>v?b(t,n(o[g+1])?null:o[g+1].elm,o,p,g,i):p>g&&w(e,f,v)}(f,h,m,i,u):r(m)?(r(t.text)&&l.setTextContent(f,""),b(f,null,m,0,m.length-1,i)):r(h)?w(h,0,h.length-1):r(t.text)&&l.setTextContent(f,""):t.text!==e.text&&l.setTextContent(f,e.text),r(v)&&r(p=v.hook)&&r(p=p.postpatch)&&p(t,e)}}}function O(t,e,n){if(o(n)&&r(t.parent))t.parent.data.pendingInsert=e;else for(var i=0;i<e.length;++i)e[i].data.hook.insert(e[i])}var S=h("attrs,class,staticClass,staticStyle,key");function T(t,e,n,i){var a,s=e.tag,c=e.data,u=e.children;if(i=i||c&&c.pre,e.elm=t,o(e.isComment)&&r(e.asyncFactory))return e.isAsyncPlaceholder=!0,!0;if(r(c)&&(r(a=c.hook)&&r(a=a.init)&&a(e,!0),r(a=e.componentInstance)))return p(e,n),!0;if(r(s)){if(r(u))if(t.hasChildNodes())if(r(a=c)&&r(a=a.domProps)&&r(a=a.innerHTML)){if(a!==t.innerHTML)return!1}else{for(var l=!0,f=t.firstChild,d=0;d<u.length;d++){if(!f||!T(f,u[d],n,i)){l=!1;break}f=f.nextSibling}if(!l||f)return!1}else m(e,u,n);if(r(c)){var v=!1;for(var h in c)if(!S(h)){v=!0,y(e,n);break}!v&&c.class&&Jn(c.class)}}else t.data!==e.text&&(t.data=e.text);return!0}return function(t,e,i,a){if(!n(e)){var s,u=!1,f=[];if(n(t))u=!0,d(e,f);else{var p=r(t.nodeType);if(!p&&ho(t,e))k(t,e,f,null,null,a);else{if(p){if(1===t.nodeType&&t.hasAttribute(L)&&(t.removeAttribute(L),i=!0),o(i)&&T(t,e,f))return O(e,f,!0),t;s=t,t=new st(l.tagName(s).toLowerCase(),{},[],void 0,s)}var v=t.elm,h=l.parentNode(v);if(d(e,f,v._leaveCb?null:h,l.nextSibling(v)),r(e.parent))for(var m=e.parent,y=g(e);m;){for(var _=0;_<c.destroy.length;++_)c.destroy[_](m);if(m.elm=e.elm,y){for(var b=0;b<c.create.length;++b)c.create[b](po,m);var x=m.data.hook.insert;if(x.merged)for(var C=x.fns.slice(1),S=0;S<C.length;S++)C[S]()}else lo(m);m=m.parent}r(h)?w([t],0,0):r(t.tag)&&$(t)}}return O(e,f,u),e.elm}r(t)&&$(t)}}({nodeOps:co,modules:[So,Io,pi,mi,Si,q?{create:Xi,activate:Xi,remove:function(t,e){!0!==t.data.show?Gi(t,e):e()}}:{}].concat(xo)}),ea={inserted:function(t,e,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?Qt(n,"postpatch",(function(){ea.componentUpdated(t,e,n)})):na(t,e,n.context),t._vOptions=[].map.call(t.options,ia)):("textarea"===n.tag||ao(t.type))&&(t._vModifiers=e.modifiers,e.modifiers.lazy||(t.addEventListener("compositionstart",aa),t.addEventListener("compositionend",sa),t.addEventListener("change",sa)))},componentUpdated:function(t,e,n){if("select"===n.tag){na(t,e,n.context);var r=t._vOptions,o=t._vOptions=[].map.call(t.options,ia);if(o.some((function(t,e){return!M(t,r[e])})))(t.multiple?e.value.some((function(t){return oa(t,o)})):e.value!==e.oldValue&&oa(e.value,o))&&ca(t,"change")}}};function na(t,e,n){ra(t,e),Z&&setTimeout((function(){ra(t,e)}),0)}function ra(t,e,n){var r=e.value,o=t.multiple;if(!o||Array.isArray(r)){for(var i,a,s=0,c=t.options.length;s<c;s++)if(a=t.options[s],o)i=I(r,ia(a))>-1,a.selected!==i&&(a.selected=i);else if(M(ia(a),r))return void(t.selectedIndex!==s&&(t.selectedIndex=s));o||(t.selectedIndex=-1)}}function oa(t,e){return e.every((function(e){return!M(e,t)}))}function ia(t){return"_value"in t?t._value:t.value}function aa(t){t.target.composing=!0}function sa(t){t.target.composing&&(t.target.composing=!1,ca(t.target,"input"))}function ca(t,e){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0),t.dispatchEvent(n)}function ua(t){return!t.componentInstance||t.data&&t.data.transition?t:ua(t.componentInstance._vnode)}var la={bind:function(t,e,n){var r=e.value,o=(n=ua(n)).data&&n.data.transition,i=t.__vOriginalDisplay="none"===t.style.display?"":t.style.display;r&&o?(n.data.show=!0,Zi(n,(function(){t.style.display=i}))):t.style.display=r?i:"none"},update:function(t,e,n){var r=e.value;!r!=!e.oldValue&&((n=ua(n)).data&&n.data.transition?(n.data.show=!0,r?Zi(n,(function(){t.style.display=t.__vOriginalDisplay})):Gi(n,(function(){t.style.display="none"}))):t.style.display=r?t.__vOriginalDisplay:"none")},unbind:function(t,e,n,r,o){o||(t.style.display=t.__vOriginalDisplay)}},fa={model:ea,show:la},da={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function pa(t){var e=t&&t.componentOptions;return e&&e.Ctor.options.abstract?pa(Re(e.children)):t}function va(t){var e={},n=t.$options;for(var r in n.propsData)e[r]=t[r];var o=n._parentListeners;for(var r in o)e[x(r)]=o[r];return e}function ha(t,e){if(/\d-keep-alive$/.test(e.tag))return t("keep-alive",{props:e.componentOptions.propsData})}var ma=function(t){return t.tag||Ce(t)},ga=function(t){return"show"===t.name},ya={name:"transition",props:da,abstract:!0,render:function(t){var e=this,n=this.$slots.default;if(n&&(n=n.filter(ma)).length){var r=this.mode,o=n[0];if(function(t){for(;t=t.parent;)if(t.data.transition)return!0}(this.$vnode))return o;var a=pa(o);if(!a)return o;if(this._leaving)return ha(t,o);var s="__transition-".concat(this._uid,"-");a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=va(this),u=this._vnode,l=pa(u);if(a.data.directives&&a.data.directives.some(ga)&&(a.data.show=!0),l&&l.data&&!function(t,e){return e.key===t.key&&e.tag===t.tag}(a,l)&&!Ce(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=A({},c);if("out-in"===r)return this._leaving=!0,Qt(f,"afterLeave",(function(){e._leaving=!1,e.$forceUpdate()})),ha(t,o);if("in-out"===r){if(Ce(a))return u;var d,p=function(){d()};Qt(c,"afterEnter",p),Qt(c,"enterCancelled",p),Qt(f,"delayLeave",(function(t){d=t}))}}return o}}},_a=A({tag:String,moveClass:String},da);delete _a.mode;var ba={props:_a,beforeMount:function(){var t=this,e=this._update;this._update=function(n,r){var o=Ve(t);t.__patch__(t._vnode,t.kept,!1,!0),t._vnode=t.kept,o(),e.call(t,n,r)}},render:function(t){for(var e=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,o=this.$slots.default||[],i=this.children=[],a=va(this),s=0;s<o.length;s++){(l=o[s]).tag&&null!=l.key&&0!==String(l.key).indexOf("__vlist")&&(i.push(l),n[l.key]=l,(l.data||(l.data={})).transition=a)}if(r){var c=[],u=[];for(s=0;s<r.length;s++){var l;(l=r[s]).data.transition=a,l.data.pos=l.elm.getBoundingClientRect(),n[l.key]?c.push(l):u.push(l)}this.kept=t(e,null,c),this.removed=u}return t(e,null,i)},updated:function(){var t=this.prevChildren,e=this.moveClass||(this.name||"v")+"-move";if(t.length&&this.hasMove(t[0].elm,e)){t.forEach($a),t.forEach(wa),t.forEach(xa),this._reflow=document.body.offsetHeight;for(var n=function(n){var r=t[n];if(r.data.moved){var o=r.elm,i=o.style;Ui(o,e),i.transform=i.WebkitTransform=i.transitionDuration="",o.addEventListener(Ei,o._moveCb=function t(n){n&&n.target!==o||n&&!/transform$/.test(n.propertyName)||(o.removeEventListener(Ei,t),o._moveCb=null,zi(o,e))})}},r=0;r<t.length;r++)n(r)}},methods:{hasMove:function(t,e){if(!Ni)return!1;if(this._hasMove)return this._hasMove;var n=t.cloneNode();if(t._transitionClasses)for(var r=t._transitionClasses,o=0;o<r.length;o++){ji(n,r[o])}Ai(n,e),n.style.display="none",this.$el.appendChild(n);var i=Ji(n);return this.$el.removeChild(n),this._hasMove=i.hasTransform}}};function $a(t){t.elm._moveCb&&t.elm._moveCb(),t.elm._enterCb&&t.elm._enterCb()}function wa(t){t.data.newPos=t.elm.getBoundingClientRect()}function xa(t){var e=t.data.pos,n=t.data.newPos,r=e.left-n.left,o=e.top-n.top;if(r||o){t.data.moved=!0;var i=t.elm.style;i.transform=i.WebkitTransform="translate(".concat(r,"px,").concat(o,"px)"),i.transitionDuration="0s"}}var Ca={Transition:ya,TransitionGroup:ba};jr.config.mustUseProp=Br,jr.config.isReservedTag=ro,jr.config.isReservedAttr=Fr,jr.config.getTagNamespace=oo,jr.config.isUnknownElement=function(t){if(!q)return!0;if(ro(t))return!1;if(t=t.toLowerCase(),null!=io[t])return io[t];var e=document.createElement(t);return t.indexOf("-")>-1?io[t]=e.constructor===window.HTMLUnknownElement||e.constructor===window.HTMLElement:io[t]=/HTMLUnknownElement/.test(e.toString())},A(jr.options.directives,fa),A(jr.options.components,Ca),jr.prototype.__patch__=q?ta:P,jr.prototype.$mount=function(t,e){return function(t,e,n){var r;t.$el=e,t.$options.render||(t.$options.render=ct),We(t,"beforeMount"),r=function(){t._update(t._render(),n)},new Zn(t,r,P,{before:function(){t._isMounted&&!t._isDestroyed&&We(t,"beforeUpdate")}},!0),n=!1;var o=t._preWatchers;if(o)for(var i=0;i<o.length;i++)o[i].run();return null==t.$vnode&&(t._isMounted=!0,We(t,"mounted")),t}(this,t=t&&q?so(t):void 0,e)},q&&setTimeout((function(){B.devtools&&et&&et.emit("init",jr)}),0);var ka=/\{\{((?:.|\r?\n)+?)\}\}/g,Oa=/[-.*+?^${}()|[\]\/\\]/g,Sa=$((function(t){var e=t[0].replace(Oa,"\\$&"),n=t[1].replace(Oa,"\\$&");return new RegExp(e+"((?:.|\\n)+?)"+n,"g")}));var Ta={staticKeys:["staticClass"],transformNode:function(t,e){e.warn;var n=Wo(t,"class");n&&(t.staticClass=JSON.stringify(n.replace(/\s+/g," ").trim()));var r=qo(t,"class",!1);r&&(t.classBinding=r)},genData:function(t){var e="";return t.staticClass&&(e+="staticClass:".concat(t.staticClass,",")),t.classBinding&&(e+="class:".concat(t.classBinding,",")),e}};var Aa,ja={staticKeys:["staticStyle"],transformNode:function(t,e){e.warn;var n=Wo(t,"style");n&&(t.staticStyle=JSON.stringify(gi(n)));var r=qo(t,"style",!1);r&&(t.styleBinding=r)},genData:function(t){var e="";return t.staticStyle&&(e+="staticStyle:".concat(t.staticStyle,",")),t.styleBinding&&(e+="style:(".concat(t.styleBinding,"),")),e}},Pa=function(t){return(Aa=Aa||document.createElement("div")).innerHTML=t,Aa.textContent},Da=h("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),Na=h("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),Ma=h("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),Ia=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,Ra=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,Ea="[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(U.source,"]*"),La="((?:".concat(Ea,"\\:)?").concat(Ea,")"),Fa=new RegExp("^<".concat(La)),Ha=/^\s*(\/?)>/,Ba=new RegExp("^<\\/".concat(La,"[^>]*>")),Ua=/^<!DOCTYPE [^>]+>/i,za=/^<!\--/,Va=/^<!\[/,Ka=h("script,style,textarea",!0),Ja={},qa={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Wa=/&(?:lt|gt|quot|amp|#39);/g,Za=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Ga=h("pre,textarea",!0),Ya=function(t,e){return t&&Ga(t)&&"\n"===e[0]};function Qa(t,e){var n=e?Za:Wa;return t.replace(n,(function(t){return qa[t]}))}function Xa(t,e){for(var n,r,o=[],i=e.expectHTML,a=e.isUnaryTag||D,s=e.canBeLeftOpenTag||D,c=0,u=function(){if(n=t,r&&Ka(r)){var u=0,d=r.toLowerCase(),p=Ja[d]||(Ja[d]=new RegExp("([\\s\\S]*?)(</"+d+"[^>]*>)","i"));w=t.replace(p,(function(t,n,r){return u=r.length,Ka(d)||"noscript"===d||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Ya(d,n)&&(n=n.slice(1)),e.chars&&e.chars(n),""}));c+=t.length-w.length,t=w,f(d,c-u,c)}else{var v=t.indexOf("<");if(0===v){if(za.test(t)){var h=t.indexOf("--\x3e");if(h>=0)return e.shouldKeepComment&&e.comment&&e.comment(t.substring(4,h),c,c+h+3),l(h+3),"continue"}if(Va.test(t)){var m=t.indexOf("]>");if(m>=0)return l(m+2),"continue"}var g=t.match(Ua);if(g)return l(g[0].length),"continue";var y=t.match(Ba);if(y){var _=c;return l(y[0].length),f(y[1],_,c),"continue"}var b=function(){var e=t.match(Fa);if(e){var n={tagName:e[1],attrs:[],start:c};l(e[0].length);for(var r=void 0,o=void 0;!(r=t.match(Ha))&&(o=t.match(Ra)||t.match(Ia));)o.start=c,l(o[0].length),o.end=c,n.attrs.push(o);if(r)return n.unarySlash=r[1],l(r[0].length),n.end=c,n}}();if(b)return function(t){var n=t.tagName,c=t.unarySlash;i&&("p"===r&&Ma(n)&&f(r),s(n)&&r===n&&f(n));for(var u=a(n)||!!c,l=t.attrs.length,d=new Array(l),p=0;p<l;p++){var v=t.attrs[p],h=v[3]||v[4]||v[5]||"",m="a"===n&&"href"===v[1]?e.shouldDecodeNewlinesForHref:e.shouldDecodeNewlines;d[p]={name:v[1],value:Qa(h,m)}}u||(o.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:d,start:t.start,end:t.end}),r=n);e.start&&e.start(n,d,u,t.start,t.end)}(b),Ya(b.tagName,t)&&l(1),"continue"}var $=void 0,w=void 0,x=void 0;if(v>=0){for(w=t.slice(v);!(Ba.test(w)||Fa.test(w)||za.test(w)||Va.test(w)||(x=w.indexOf("<",1))<0);)v+=x,w=t.slice(v);$=t.substring(0,v)}v<0&&($=t),$&&l($.length),e.chars&&$&&e.chars($,c-$.length,c)}if(t===n)return e.chars&&e.chars(t),"break"};t;){if("break"===u())break}function l(e){c+=e,t=t.substring(e)}function f(t,n,i){var a,s;if(null==n&&(n=c),null==i&&(i=c),t)for(s=t.toLowerCase(),a=o.length-1;a>=0&&o[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=o.length-1;u>=a;u--)e.end&&e.end(o[u].tag,n,i);o.length=a,r=a&&o[a-1].tag}else"br"===s?e.start&&e.start(t,[],!0,n,i):"p"===s&&(e.start&&e.start(t,[],!1,n,i),e.end&&e.end(t,n,i))}f()}var ts,es,ns,rs,os,is,as,ss,cs=/^@|^v-on:/,us=/^v-|^@|^:|^#/,ls=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,fs=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,ds=/^\(|\)$/g,ps=/^\[.*\]$/,vs=/:(.*)$/,hs=/^:|^\.|^v-bind:/,ms=/\.[^.\]]+(?=[^\]]*$)/g,gs=/^v-slot(:|$)|^#/,ys=/[\r\n]/,_s=/[ \f\t\r\n]+/g,bs=$(Pa),$s="_empty_";function ws(t,e,n){return{type:1,tag:t,attrsList:e,attrsMap:As(e),rawAttrsMap:{},parent:n,children:[]}}function xs(t,e){ts=e.warn||Fo,is=e.isPreTag||D,as=e.mustUseProp||D,ss=e.getTagNamespace||D,e.isReservedTag,ns=Ho(e.modules,"transformNode"),rs=Ho(e.modules,"preTransformNode"),os=Ho(e.modules,"postTransformNode"),es=e.delimiters;var n,r,o=[],i=!1!==e.preserveWhitespace,a=e.whitespace,s=!1,c=!1;function u(t){if(l(t),s||t.processed||(t=Cs(t,e)),o.length||t===n||n.if&&(t.elseif||t.else)&&Os(n,{exp:t.elseif,block:t}),r&&!t.forbidden)if(t.elseif||t.else)a=t,u=function(t){for(var e=t.length;e--;){if(1===t[e].type)return t[e];t.pop()}}(r.children),u&&u.if&&Os(u,{exp:a.elseif,block:a});else{if(t.slotScope){var i=t.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[i]=t}r.children.push(t),t.parent=r}var a,u;t.children=t.children.filter((function(t){return!t.slotScope})),l(t),t.pre&&(s=!1),is(t.tag)&&(c=!1);for(var f=0;f<os.length;f++)os[f](t,e)}function l(t){if(!c)for(var e=void 0;(e=t.children[t.children.length-1])&&3===e.type&&" "===e.text;)t.children.pop()}return Xa(t,{warn:ts,expectHTML:e.expectHTML,isUnaryTag:e.isUnaryTag,canBeLeftOpenTag:e.canBeLeftOpenTag,shouldDecodeNewlines:e.shouldDecodeNewlines,shouldDecodeNewlinesForHref:e.shouldDecodeNewlinesForHref,shouldKeepComment:e.comments,outputSourceRange:e.outputSourceRange,start:function(t,i,a,l,f){var d,p=r&&r.ns||ss(t),v=ws(t,i,r);p&&(v.ns=p),"style"!==(d=v).tag&&("script"!==d.tag||d.attrsMap.type&&"text/javascript"!==d.attrsMap.type)||(v.forbidden=!0);for(var h=0;h<rs.length;h++)v=rs[h](v,e)||v;s||(!function(t){null!=Wo(t,"v-pre")&&(t.pre=!0)}(v),v.pre&&(s=!0)),is(v.tag)&&(c=!0),s?function(t){var e=t.attrsList,n=e.length;if(n)for(var r=t.attrs=new Array(n),o=0;o<n;o++)r[o]={name:e[o].name,value:JSON.stringify(e[o].value)},null!=e[o].start&&(r[o].start=e[o].start,r[o].end=e[o].end);else t.pre||(t.plain=!0)}(v):v.processed||(ks(v),function(t){var e=Wo(t,"v-if");if(e)t.if=e,Os(t,{exp:e,block:t});else{null!=Wo(t,"v-else")&&(t.else=!0);var n=Wo(t,"v-else-if");n&&(t.elseif=n)}}(v),function(t){var e=Wo(t,"v-once");null!=e&&(t.once=!0)}(v)),n||(n=v),a?u(v):(r=v,o.push(v))},end:function(t,e,n){var i=o[o.length-1];o.length-=1,r=o[o.length-1],u(i)},chars:function(t,e,n){if(r){var o,u=r.children;if(t=c||t.trim()?"script"===(o=r).tag||"style"===o.tag?t:bs(t):u.length?a?"condense"===a&&ys.test(t)?"":" ":i?" ":"":""){c||"condense"!==a||(t=t.replace(_s," "));var l=void 0,f=void 0;!s&&" "!==t&&(l=function(t,e){var n=e?Sa(e):ka;if(n.test(t)){for(var r,o,i,a=[],s=[],c=n.lastIndex=0;r=n.exec(t);){(o=r.index)>c&&(s.push(i=t.slice(c,o)),a.push(JSON.stringify(i)));var u=Eo(r[1].trim());a.push("_s(".concat(u,")")),s.push({"@binding":u}),c=o+r[0].length}return c<t.length&&(s.push(i=t.slice(c)),a.push(JSON.stringify(i))),{expression:a.join("+"),tokens:s}}}(t,es))?f={type:2,expression:l.expression,tokens:l.tokens,text:t}:" "===t&&u.length&&" "===u[u.length-1].text||(f={type:3,text:t}),f&&u.push(f)}}},comment:function(t,e,n){if(r){var o={type:3,text:t,isComment:!0};r.children.push(o)}}}),n}function Cs(t,e){var n,r;(r=qo(n=t,"key"))&&(n.key=r),t.plain=!t.key&&!t.scopedSlots&&!t.attrsList.length,function(t){var e=qo(t,"ref");e&&(t.ref=e,t.refInFor=function(t){var e=t;for(;e;){if(void 0!==e.for)return!0;e=e.parent}return!1}(t))}(t),function(t){var e;"template"===t.tag?(e=Wo(t,"scope"),t.slotScope=e||Wo(t,"slot-scope")):(e=Wo(t,"slot-scope"))&&(t.slotScope=e);var n=qo(t,"slot");n&&(t.slotTarget='""'===n?'"default"':n,t.slotTargetDynamic=!(!t.attrsMap[":slot"]&&!t.attrsMap["v-bind:slot"]),"template"===t.tag||t.slotScope||Uo(t,"slot",n,function(t,e){return t.rawAttrsMap[":"+e]||t.rawAttrsMap["v-bind:"+e]||t.rawAttrsMap[e]}(t,"slot")));if("template"===t.tag){if(a=Zo(t,gs)){var r=Ss(a),o=r.name,i=r.dynamic;t.slotTarget=o,t.slotTargetDynamic=i,t.slotScope=a.value||$s}}else{var a;if(a=Zo(t,gs)){var s=t.scopedSlots||(t.scopedSlots={}),c=Ss(a),u=c.name,l=(i=c.dynamic,s[u]=ws("template",[],t));l.slotTarget=u,l.slotTargetDynamic=i,l.children=t.children.filter((function(t){if(!t.slotScope)return t.parent=l,!0})),l.slotScope=a.value||$s,t.children=[],t.plain=!1}}}(t),function(t){"slot"===t.tag&&(t.slotName=qo(t,"name"))}(t),function(t){var e;(e=qo(t,"is"))&&(t.component=e);null!=Wo(t,"inline-template")&&(t.inlineTemplate=!0)}(t);for(var o=0;o<ns.length;o++)t=ns[o](t,e)||t;return function(t){var e,n,r,o,i,a,s,c,u=t.attrsList;for(e=0,n=u.length;e<n;e++)if(r=o=u[e].name,i=u[e].value,us.test(r))if(t.hasBindings=!0,(a=Ts(r.replace(us,"")))&&(r=r.replace(ms,"")),hs.test(r))r=r.replace(hs,""),i=Eo(i),(c=ps.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=x(r))&&(r="innerHTML"),a.camel&&!c&&(r=x(r)),a.sync&&(s=Qo(i,"$event"),c?Jo(t,'"update:"+('.concat(r,")"),s,null,!1,0,u[e],!0):(Jo(t,"update:".concat(x(r)),s,null,!1,0,u[e]),O(r)!==x(r)&&Jo(t,"update:".concat(O(r)),s,null,!1,0,u[e])))),a&&a.prop||!t.component&&as(t.tag,t.attrsMap.type,r)?Bo(t,r,i,u[e],c):Uo(t,r,i,u[e],c);else if(cs.test(r))r=r.replace(cs,""),(c=ps.test(r))&&(r=r.slice(1,-1)),Jo(t,r,i,a,!1,0,u[e],c);else{var l=(r=r.replace(us,"")).match(vs),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),ps.test(f)&&(f=f.slice(1,-1),c=!0)),Vo(t,r,o,i,f,c,a,u[e])}else Uo(t,r,JSON.stringify(i),u[e]),!t.component&&"muted"===r&&as(t.tag,t.attrsMap.type,r)&&Bo(t,r,"true",u[e])}(t),t}function ks(t){var e;if(e=Wo(t,"v-for")){var n=function(t){var e=t.match(ls);if(!e)return;var n={};n.for=e[2].trim();var r=e[1].trim().replace(ds,""),o=r.match(fs);o?(n.alias=r.replace(fs,"").trim(),n.iterator1=o[1].trim(),o[2]&&(n.iterator2=o[2].trim())):n.alias=r;return n}(e);n&&A(t,n)}}function Os(t,e){t.ifConditions||(t.ifConditions=[]),t.ifConditions.push(e)}function Ss(t){var e=t.name.replace(gs,"");return e||"#"!==t.name[0]&&(e="default"),ps.test(e)?{name:e.slice(1,-1),dynamic:!0}:{name:'"'.concat(e,'"'),dynamic:!1}}function Ts(t){var e=t.match(ms);if(e){for(var n={},r=0;r<e.length;r++){n[e[r].slice(1)]=!0}return n}}function As(t){for(var e={},n=0,r=t.length;n<r;n++)e[t[n].name]=t[n].value;return e}function js(t){return ws(t.tag,t.attrsList.slice(),t.parent)}var Ps=[Ta,ja,{preTransformNode:function(t,e){if("input"===t.tag){var n=t.attrsMap;if(!n["v-model"])return;var r=void 0;if((n[":type"]||n["v-bind:type"])&&(r=qo(t,"type")),n.type||r||!n["v-bind"]||(r="(".concat(n["v-bind"],").type")),r){var o=Wo(t,"v-if",!0),i=o?"&&(".concat(o,")"):"",a=null!=Wo(t,"v-else",!0),s=Wo(t,"v-else-if",!0),c=js(t);ks(c),zo(c,"type","checkbox"),Cs(c,e),c.processed=!0,c.if="(".concat(r,")==='checkbox'")+i,Os(c,{exp:c.if,block:c});var u=js(t);Wo(u,"v-for",!0),zo(u,"type","radio"),Cs(u,e),Os(c,{exp:"(".concat(r,")==='radio'")+i,block:u});var l=js(t);return Wo(l,"v-for",!0),zo(l,":type",r),Cs(l,e),Os(c,{exp:o,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var Ds,Ns,Ms={model:function(t,e,n){var r=e.value,o=e.modifiers,i=t.tag,a=t.attrsMap.type;if(t.component)return Yo(t,r,o),!1;if("select"===i)!function(t,e,n){var r=n&&n.number,o='Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;'+"return ".concat(r?"_n(val)":"val","})"),i="$event.target.multiple ? $$selectedVal : $$selectedVal[0]",a="var $$selectedVal = ".concat(o,";");a="".concat(a," ").concat(Qo(e,i)),Jo(t,"change",a,null,!0)}(t,r,o);else if("input"===i&&"checkbox"===a)!function(t,e,n){var r=n&&n.number,o=qo(t,"value")||"null",i=qo(t,"true-value")||"true",a=qo(t,"false-value")||"false";Bo(t,"checked","Array.isArray(".concat(e,")")+"?_i(".concat(e,",").concat(o,")>-1")+("true"===i?":(".concat(e,")"):":_q(".concat(e,",").concat(i,")"))),Jo(t,"change","var $$a=".concat(e,",")+"$$el=$event.target,"+"$$c=$$el.checked?(".concat(i,"):(").concat(a,");")+"if(Array.isArray($$a)){"+"var $$v=".concat(r?"_n("+o+")":o,",")+"$$i=_i($$a,$$v);"+"if($$el.checked){$$i<0&&(".concat(Qo(e,"$$a.concat([$$v])"),")}")+"else{$$i>-1&&(".concat(Qo(e,"$$a.slice(0,$$i).concat($$a.slice($$i+1))"),")}")+"}else{".concat(Qo(e,"$$c"),"}"),null,!0)}(t,r,o);else if("input"===i&&"radio"===a)!function(t,e,n){var r=n&&n.number,o=qo(t,"value")||"null";o=r?"_n(".concat(o,")"):o,Bo(t,"checked","_q(".concat(e,",").concat(o,")")),Jo(t,"change",Qo(e,o),null,!0)}(t,r,o);else if("input"===i||"textarea"===i)!function(t,e,n){var r=t.attrsMap.type,o=n||{},i=o.lazy,a=o.number,s=o.trim,c=!i&&"range"!==r,u=i?"change":"range"===r?ii:"input",l="$event.target.value";s&&(l="$event.target.value.trim()");a&&(l="_n(".concat(l,")"));var f=Qo(e,l);c&&(f="if($event.target.composing)return;".concat(f));Bo(t,"value","(".concat(e,")")),Jo(t,u,f,null,!0),(s||a)&&Jo(t,"blur","$forceUpdate()")}(t,r,o);else if(!B.isReservedTag(i))return Yo(t,r,o),!1;return!0},text:function(t,e){e.value&&Bo(t,"textContent","_s(".concat(e.value,")"),e)},html:function(t,e){e.value&&Bo(t,"innerHTML","_s(".concat(e.value,")"),e)}},Is={expectHTML:!0,modules:Ps,directives:Ms,isPreTag:function(t){return"pre"===t},isUnaryTag:Da,mustUseProp:Br,canBeLeftOpenTag:Na,isReservedTag:ro,getTagNamespace:oo,staticKeys:function(t){return t.reduce((function(t,e){return t.concat(e.staticKeys||[])}),[]).join(",")}(Ps)},Rs=$((function(t){return h("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(t?","+t:""))}));function Es(t,e){t&&(Ds=Rs(e.staticKeys||""),Ns=e.isReservedTag||D,Ls(t),Fs(t,!1))}function Ls(t){if(t.static=function(t){if(2===t.type)return!1;if(3===t.type)return!0;return!(!t.pre&&(t.hasBindings||t.if||t.for||m(t.tag)||!Ns(t.tag)||function(t){for(;t.parent;){if("template"!==(t=t.parent).tag)return!1;if(t.for)return!0}return!1}(t)||!Object.keys(t).every(Ds)))}(t),1===t.type){if(!Ns(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var e=0,n=t.children.length;e<n;e++){var r=t.children[e];Ls(r),r.static||(t.static=!1)}if(t.ifConditions)for(e=1,n=t.ifConditions.length;e<n;e++){var o=t.ifConditions[e].block;Ls(o),o.static||(t.static=!1)}}}function Fs(t,e){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=e),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var n=0,r=t.children.length;n<r;n++)Fs(t.children[n],e||!!t.for);if(t.ifConditions)for(n=1,r=t.ifConditions.length;n<r;n++)Fs(t.ifConditions[n].block,e)}}var Hs=/^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/,Bs=/\([^)]*?\);*$/,Us=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,zs={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Vs={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},Ks=function(t){return"if(".concat(t,")return null;")},Js={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Ks("$event.target !== $event.currentTarget"),ctrl:Ks("!$event.ctrlKey"),shift:Ks("!$event.shiftKey"),alt:Ks("!$event.altKey"),meta:Ks("!$event.metaKey"),left:Ks("'button' in $event && $event.button !== 0"),middle:Ks("'button' in $event && $event.button !== 1"),right:Ks("'button' in $event && $event.button !== 2")};function qs(t,e){var n=e?"nativeOn:":"on:",r="",o="";for(var i in t){var a=Ws(t[i]);t[i]&&t[i].dynamic?o+="".concat(i,",").concat(a,","):r+='"'.concat(i,'":').concat(a,",")}return r="{".concat(r.slice(0,-1),"}"),o?n+"_d(".concat(r,",[").concat(o.slice(0,-1),"])"):n+r}function Ws(t){if(!t)return"function(){}";if(Array.isArray(t))return"[".concat(t.map((function(t){return Ws(t)})).join(","),"]");var e=Us.test(t.value),n=Hs.test(t.value),r=Us.test(t.value.replace(Bs,""));if(t.modifiers){var o="",i="",a=[],s=function(e){if(Js[e])i+=Js[e],zs[e]&&a.push(e);else if("exact"===e){var n=t.modifiers;i+=Ks(["ctrl","shift","alt","meta"].filter((function(t){return!n[t]})).map((function(t){return"$event.".concat(t,"Key")})).join("||"))}else a.push(e)};for(var c in t.modifiers)s(c);a.length&&(o+=function(t){return"if(!$event.type.indexOf('key')&&"+"".concat(t.map(Zs).join("&&"),")return null;")}(a)),i&&(o+=i);var u=e?"return ".concat(t.value,".apply(null, arguments)"):n?"return (".concat(t.value,").apply(null, arguments)"):r?"return ".concat(t.value):t.value;return"function($event){".concat(o).concat(u,"}")}return e||n?t.value:"function($event){".concat(r?"return ".concat(t.value):t.value,"}")}function Zs(t){var e=parseInt(t,10);if(e)return"$event.keyCode!==".concat(e);var n=zs[t],r=Vs[t];return"_k($event.keyCode,"+"".concat(JSON.stringify(t),",")+"".concat(JSON.stringify(n),",")+"$event.key,"+"".concat(JSON.stringify(r))+")"}var Gs={on:function(t,e){t.wrapListeners=function(t){return"_g(".concat(t,",").concat(e.value,")")}},bind:function(t,e){t.wrapData=function(n){return"_b(".concat(n,",'").concat(t.tag,"',").concat(e.value,",").concat(e.modifiers&&e.modifiers.prop?"true":"false").concat(e.modifiers&&e.modifiers.sync?",true":"",")")}},cloak:P},Ys=function(t){this.options=t,this.warn=t.warn||Fo,this.transforms=Ho(t.modules,"transformCode"),this.dataGenFns=Ho(t.modules,"genData"),this.directives=A(A({},Gs),t.directives);var e=t.isReservedTag||D;this.maybeComponent=function(t){return!!t.component||!e(t.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function Qs(t,e){var n=new Ys(e),r=t?"script"===t.tag?"null":Xs(t,n):'_c("div")';return{render:"with(this){return ".concat(r,"}"),staticRenderFns:n.staticRenderFns}}function Xs(t,e){if(t.parent&&(t.pre=t.pre||t.parent.pre),t.staticRoot&&!t.staticProcessed)return tc(t,e);if(t.once&&!t.onceProcessed)return ec(t,e);if(t.for&&!t.forProcessed)return oc(t,e);if(t.if&&!t.ifProcessed)return nc(t,e);if("template"!==t.tag||t.slotTarget||e.pre){if("slot"===t.tag)return function(t,e){var n=t.slotName||'"default"',r=cc(t,e),o="_t(".concat(n).concat(r?",function(){return ".concat(r,"}"):""),i=t.attrs||t.dynamicAttrs?fc((t.attrs||[]).concat(t.dynamicAttrs||[]).map((function(t){return{name:x(t.name),value:t.value,dynamic:t.dynamic}}))):null,a=t.attrsMap["v-bind"];!i&&!a||r||(o+=",null");i&&(o+=",".concat(i));a&&(o+="".concat(i?"":",null",",").concat(a));return o+")"}(t,e);var n=void 0;if(t.component)n=function(t,e,n){var r=e.inlineTemplate?null:cc(e,n,!0);return"_c(".concat(t,",").concat(ic(e,n)).concat(r?",".concat(r):"",")")}(t.component,t,e);else{var r=void 0,o=e.maybeComponent(t);(!t.plain||t.pre&&o)&&(r=ic(t,e));var i=void 0,a=e.options.bindings;o&&a&&!1!==a.__isScriptSetup&&(i=function(t,e){var n=x(e),r=C(n),o=function(o){return t[e]===o?e:t[n]===o?n:t[r]===o?r:void 0},i=o("setup-const")||o("setup-reactive-const");if(i)return i;var a=o("setup-let")||o("setup-ref")||o("setup-maybe-ref");if(a)return a}(a,t.tag)),i||(i="'".concat(t.tag,"'"));var s=t.inlineTemplate?null:cc(t,e,!0);n="_c(".concat(i).concat(r?",".concat(r):"").concat(s?",".concat(s):"",")")}for(var c=0;c<e.transforms.length;c++)n=e.transforms[c](t,n);return n}return cc(t,e)||"void 0"}function tc(t,e){t.staticProcessed=!0;var n=e.pre;return t.pre&&(e.pre=t.pre),e.staticRenderFns.push("with(this){return ".concat(Xs(t,e),"}")),e.pre=n,"_m(".concat(e.staticRenderFns.length-1).concat(t.staticInFor?",true":"",")")}function ec(t,e){if(t.onceProcessed=!0,t.if&&!t.ifProcessed)return nc(t,e);if(t.staticInFor){for(var n="",r=t.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o(".concat(Xs(t,e),",").concat(e.onceId++,",").concat(n,")"):Xs(t,e)}return tc(t,e)}function nc(t,e,n,r){return t.ifProcessed=!0,rc(t.ifConditions.slice(),e,n,r)}function rc(t,e,n,r){if(!t.length)return r||"_e()";var o=t.shift();return o.exp?"(".concat(o.exp,")?").concat(i(o.block),":").concat(rc(t,e,n,r)):"".concat(i(o.block));function i(t){return n?n(t,e):t.once?ec(t,e):Xs(t,e)}}function oc(t,e,n,r){var o=t.for,i=t.alias,a=t.iterator1?",".concat(t.iterator1):"",s=t.iterator2?",".concat(t.iterator2):"";return t.forProcessed=!0,"".concat(r||"_l","((").concat(o,"),")+"function(".concat(i).concat(a).concat(s,"){")+"return ".concat((n||Xs)(t,e))+"})"}function ic(t,e){var n="{",r=function(t,e){var n=t.directives;if(!n)return;var r,o,i,a,s="directives:[",c=!1;for(r=0,o=n.length;r<o;r++){i=n[r],a=!0;var u=e.directives[i.name];u&&(a=!!u(t,i,e.warn)),a&&(c=!0,s+='{name:"'.concat(i.name,'",rawName:"').concat(i.rawName,'"').concat(i.value?",value:(".concat(i.value,"),expression:").concat(JSON.stringify(i.value)):"").concat(i.arg?",arg:".concat(i.isDynamicArg?i.arg:'"'.concat(i.arg,'"')):"").concat(i.modifiers?",modifiers:".concat(JSON.stringify(i.modifiers)):"","},"))}if(c)return s.slice(0,-1)+"]"}(t,e);r&&(n+=r+","),t.key&&(n+="key:".concat(t.key,",")),t.ref&&(n+="ref:".concat(t.ref,",")),t.refInFor&&(n+="refInFor:true,"),t.pre&&(n+="pre:true,"),t.component&&(n+='tag:"'.concat(t.tag,'",'));for(var o=0;o<e.dataGenFns.length;o++)n+=e.dataGenFns[o](t);if(t.attrs&&(n+="attrs:".concat(fc(t.attrs),",")),t.props&&(n+="domProps:".concat(fc(t.props),",")),t.events&&(n+="".concat(qs(t.events,!1),",")),t.nativeEvents&&(n+="".concat(qs(t.nativeEvents,!0),",")),t.slotTarget&&!t.slotScope&&(n+="slot:".concat(t.slotTarget,",")),t.scopedSlots&&(n+="".concat(function(t,e,n){var r=t.for||Object.keys(e).some((function(t){var n=e[t];return n.slotTargetDynamic||n.if||n.for||ac(n)})),o=!!t.if;if(!r)for(var i=t.parent;i;){if(i.slotScope&&i.slotScope!==$s||i.for){r=!0;break}i.if&&(o=!0),i=i.parent}var a=Object.keys(e).map((function(t){return sc(e[t],n)})).join(",");return"scopedSlots:_u([".concat(a,"]").concat(r?",null,true":"").concat(!r&&o?",null,false,".concat(function(t){var e=5381,n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e>>>0}(a)):"",")")}(t,t.scopedSlots,e),",")),t.model&&(n+="model:{value:".concat(t.model.value,",callback:").concat(t.model.callback,",expression:").concat(t.model.expression,"},")),t.inlineTemplate){var i=function(t,e){var n=t.children[0];if(n&&1===n.type){var r=Qs(n,e.options);return"inlineTemplate:{render:function(){".concat(r.render,"},staticRenderFns:[").concat(r.staticRenderFns.map((function(t){return"function(){".concat(t,"}")})).join(","),"]}")}}(t,e);i&&(n+="".concat(i,","))}return n=n.replace(/,$/,"")+"}",t.dynamicAttrs&&(n="_b(".concat(n,',"').concat(t.tag,'",').concat(fc(t.dynamicAttrs),")")),t.wrapData&&(n=t.wrapData(n)),t.wrapListeners&&(n=t.wrapListeners(n)),n}function ac(t){return 1===t.type&&("slot"===t.tag||t.children.some(ac))}function sc(t,e){var n=t.attrsMap["slot-scope"];if(t.if&&!t.ifProcessed&&!n)return nc(t,e,sc,"null");if(t.for&&!t.forProcessed)return oc(t,e,sc);var r=t.slotScope===$s?"":String(t.slotScope),o="function(".concat(r,"){")+"return ".concat("template"===t.tag?t.if&&n?"(".concat(t.if,")?").concat(cc(t,e)||"undefined",":undefined"):cc(t,e)||"undefined":Xs(t,e),"}"),i=r?"":",proxy:true";return"{key:".concat(t.slotTarget||'"default"',",fn:").concat(o).concat(i,"}")}function cc(t,e,n,r,o){var i=t.children;if(i.length){var a=i[0];if(1===i.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?e.maybeComponent(a)?",1":",0":"";return"".concat((r||Xs)(a,e)).concat(s)}var c=n?function(t,e){for(var n=0,r=0;r<t.length;r++){var o=t[r];if(1===o.type){if(uc(o)||o.ifConditions&&o.ifConditions.some((function(t){return uc(t.block)}))){n=2;break}(e(o)||o.ifConditions&&o.ifConditions.some((function(t){return e(t.block)})))&&(n=1)}}return n}(i,e.maybeComponent):0,u=o||lc;return"[".concat(i.map((function(t){return u(t,e)})).join(","),"]").concat(c?",".concat(c):"")}}function uc(t){return void 0!==t.for||"template"===t.tag||"slot"===t.tag}function lc(t,e){return 1===t.type?Xs(t,e):3===t.type&&t.isComment?function(t){return"_e(".concat(JSON.stringify(t.text),")")}(t):function(t){return"_v(".concat(2===t.type?t.expression:dc(JSON.stringify(t.text)),")")}(t)}function fc(t){for(var e="",n="",r=0;r<t.length;r++){var o=t[r],i=dc(o.value);o.dynamic?n+="".concat(o.name,",").concat(i,","):e+='"'.concat(o.name,'":').concat(i,",")}return e="{".concat(e.slice(0,-1),"}"),n?"_d(".concat(e,",[").concat(n.slice(0,-1),"])"):e}function dc(t){return t.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function pc(t,e){try{return new Function(t)}catch(n){return e.push({err:n,code:t}),P}}function vc(t){var e=Object.create(null);return function(n,r,o){(r=A({},r)).warn,delete r.warn;var i=r.delimiters?String(r.delimiters)+n:n;if(e[i])return e[i];var a=t(n,r),s={},c=[];return s.render=pc(a.render,c),s.staticRenderFns=a.staticRenderFns.map((function(t){return pc(t,c)})),e[i]=s}}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)");var hc,mc,gc=(hc=function(t,e){var n=xs(t.trim(),e);!1!==e.optimize&&Es(n,e);var r=Qs(n,e);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(t){function e(e,n){var r=Object.create(t),o=[],i=[];if(n)for(var a in n.modules&&(r.modules=(t.modules||[]).concat(n.modules)),n.directives&&(r.directives=A(Object.create(t.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(t,e,n){(n?i:o).push(t)};var s=hc(e.trim(),r);return s.errors=o,s.tips=i,s}return{compile:e,compileToFunctions:vc(e)}}),yc=gc(Is).compileToFunctions;function _c(t){return(mc=mc||document.createElement("div")).innerHTML=t?'<a href="\n"/>':'<div a="\n"/>',mc.innerHTML.indexOf("&#10;")>0}var bc=!!q&&_c(!1),$c=!!q&&_c(!0),wc=$((function(t){var e=so(t);return e&&e.innerHTML})),xc=jr.prototype.$mount;return jr.prototype.$mount=function(t,e){if((t=t&&so(t))===document.body||t===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=wc(r));else{if(!r.nodeType)return this;r=r.innerHTML}else t&&(r=function(t){if(t.outerHTML)return t.outerHTML;var e=document.createElement("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}(t));if(r){var o=yc(r,{outputSourceRange:!1,shouldDecodeNewlines:bc,shouldDecodeNewlinesForHref:$c,delimiters:n.delimiters,comments:n.comments},this),i=o.render,a=o.staticRenderFns;n.render=i,n.staticRenderFns=a}}return xc.call(this,t,e)},jr.compile=yc,A(jr,Vn),jr.effect=function(t,e){var n=new Zn(it,t,P,{sync:!0});e&&(n.update=function(){e((function(){return n.run()}))})},jr.hasInjectionContext=function(){return!!jr.getCurrentInstance()},jr.createApp=function(t,e){var n,r={},o={config:jr.config,use:jr.use.bind(jr),mixin:jr.mixin.bind(jr),component:jr.component.bind(jr),provide:function(t,e){return r[t]=e,this},directive:function(t,e){return e?(jr.directive(t,e),o):jr.directive(t)},mount:function(o,i){return n||((n=new jr(Object.assign({propsData:e},t,{provide:Object.assign(r,t.provide)}))).$mount(o,i),n)},unmount:function(){n&&(n.$destroy(),n=void 0)}};return o},jr}));
!function(){var e=function(e,t){"use strict";let s;const i=e=>s=e,r=Symbol("pinia");function n(e){return e&&"object"==typeof e&&"[object Object]"===Object.prototype.toString.call(e)&&"function"!=typeof e.toJSON}var o;e.MutationType=void 0,(o=e.MutationType||(e.MutationType={})).direct="direct",o.patchObject="patch object",o.patchFunction="patch function";const a="undefined"!=typeof window;const{assign:l}=Object;const c=()=>{};function u(e,s,i,r=c){e.push(s);const n=()=>{const t=e.indexOf(s);t>-1&&(e.splice(t,1),r())};return!i&&t.getCurrentScope()&&t.onScopeDispose(n),n}function h(e,...t){e.slice().forEach(e=>{e(...t)})}const f=e=>e();function d(e,s){e instanceof Map&&s instanceof Map&&s.forEach((t,s)=>e.set(s,t)),e instanceof Set&&s instanceof Set&&s.forEach(e.add,e);for(const i in s){if(!s.hasOwnProperty(i))continue;const r=s[i],o=e[i];n(o)&&n(r)&&e.hasOwnProperty(i)&&!t.isRef(r)&&!t.isReactive(r)?e[i]=d(o,r):e[i]=r}return e}Symbol("pinia:skipHydration");const p=new WeakMap;const{assign:m}=Object;function g(e){return!(!t.isRef(e)||!e.effect)}function v(e,s,r,n){const{state:o,actions:a,getters:l}=s,c=r.state.value[e];let u;return u=y(e,function(){c||n||t.set(r.state.value,e,o?o():{});const s=n?t.toRefs(t.ref(o?o():{}).value):t.toRefs(r.state.value[e]);return m(s,a,Object.keys(l||{}).reduce((s,n)=>(s[n]=t.markRaw(t.computed(()=>{i(r);const t=r._s.get(e);if(t._r)return l[n].call(t,t)})),s),{}))},s,r,n,!0)}function y(s,r,o={},l,c,v){let y;const b=m({actions:{}},o);if(!l._e.active)throw new Error("Pinia destroyed");const w={deep:!0};let S,x,_,F=[],P=[];const I=l.state.value[s];v||I||c||t.set(l.state.value,s,{});const C=t.ref({});let M;function R(i){let r;S=x=!1,_=[],"function"==typeof i?(i(l.state.value[s]),r={type:e.MutationType.patchFunction,storeId:s,events:_}):(d(l.state.value[s],i),r={type:e.MutationType.patchObject,payload:i,storeId:s,events:_});const n=M=Symbol();t.nextTick().then(()=>{M===n&&(S=!0)}),x=!0,h(F,r,l.state.value[s])}const T=v?function(){const{state:e}=o,t=e?e():{};this.$patch(e=>{m(e,t)})}:()=>{throw new Error(`🍍: Store "${s}" is built using the setup syntax and does not implement $reset().`)};function L(e,t){return function(){i(l);const r=Array.from(arguments),n=[],o=[];let a;h(P,{args:r,name:e,store:k,after:function(e){n.push(e)},onError:function(e){o.push(e)}});try{a=t.apply(this&&this.$id===s?this:k,r)}catch(e){throw h(o,e),e}return a instanceof Promise?a.then(e=>(h(n,e),e)).catch(e=>(h(o,e),Promise.reject(e))):(h(n,a),a)}}const O=t.markRaw({actions:{},getters:{},state:[],hotState:C}),U={_p:l,$id:s,$onAction:u.bind(null,P),$patch:R,$reset:T,$subscribe(i,r={}){const n=u(F,i,r.detached,()=>o()),o=y.run(()=>t.watch(()=>l.state.value[s],t=>{("sync"===r.flush?x:S)&&i({storeId:s,type:e.MutationType.direct,events:_},t)},m({},w,r)));return n},$dispose:function(){y.stop(),F=[],P=[],l._s.delete(s)},_r:!1},k=t.reactive(m({_hmrPayload:O,_customProperties:t.markRaw(new Set)},U));l._s.set(s,k);const D=(l._a&&l._a.runWithContext||f)(()=>l._e.run(()=>(y=t.effectScope()).run(r)));for(const e in D){const i=D[e];if(t.isRef(i)&&!g(i)||t.isReactive(i))c?t.set(C.value,e,t.toRef(D,e)):v||(I&&($=i,!p.has($))&&(t.isRef(i)?i.value=I[e]:d(i,I[e])),t.set(l.state.value[s],e,i)),O.state.push(e);else if("function"==typeof i){const s=c?i:L(e,i);t.set(D,e,s),O.actions[e]=i,b.actions[e]=i}else if(g(i)&&(O.getters[e]=v?o.getters[e]:i,a)){(D._getters||(D._getters=t.markRaw([]))).push(e)}}var $;return Object.keys(D).forEach(e=>{t.set(k,e,D[e])}),Object.defineProperty(k,"$state",{get:()=>c?C.value:l.state.value[s],set:e=>{if(c)throw new Error("cannot set hotState");R(t=>{m(t,e)})}}),k._hotUpdate=t.markRaw(e=>{k._hotUpdating=!0,e._hmrPayload.state.forEach(s=>{if(s in k.$state){const i=e.$state[s],r=k.$state[s];"object"==typeof i&&n(i)&&n(r)?function e(s,i){for(const r in i){const o=i[r];if(!(r in s))continue;const a=s[r];n(a)&&n(o)&&!t.isRef(o)&&!t.isReactive(o)?s[r]=e(a,o):t.set(s,r,o)}return s}(i,r):e.$state[s]=r}t.set(k,s,t.toRef(e.$state,s))}),Object.keys(k.$state).forEach(s=>{s in e.$state||t.del(k,s)}),S=!1,x=!1,l.state.value[s]=t.toRef(e._hmrPayload,"hotState"),x=!0,t.nextTick().then(()=>{S=!0});for(const s in e._hmrPayload.actions){const i=e[s];t.set(k,s,L(s,i))}for(const s in e._hmrPayload.getters){const r=e._hmrPayload.getters[s],n=v?t.computed(()=>(i(l),r.call(k,k))):r;t.set(k,s,n)}Object.keys(k._hmrPayload.getters).forEach(s=>{s in e._hmrPayload.getters||t.del(k,s)}),Object.keys(k._hmrPayload.actions).forEach(s=>{s in e._hmrPayload.actions||t.del(k,s)}),k._hmrPayload=e._hmrPayload,k._getters=e._getters,k._hotUpdating=!1}),k._r=!0,l._p.forEach(e=>{m(k,y.run(()=>e({store:k,app:l._a,pinia:l,options:b})))}),k.$state&&"object"==typeof k.$state&&"function"==typeof k.$state.constructor&&k.$state.constructor.toString().includes("[native code]"),I&&v&&o.hydrate&&o.hydrate(k.$state,I),S=!0,x=!0,k}function b(e,t){return Array.isArray(t)?t.reduce((t,s)=>(t[s]=function(){return e(this.$pinia)[s]},t),{}):Object.keys(t).reduce((s,i)=>(s[i]=function(){const s=e(this.$pinia),r=t[i];return"function"==typeof r?r.call(this,s):s[r]},s),{})}return e.PiniaVuePlugin=function(e){e.mixin({beforeCreate(){const e=this.$options;if(e.pinia){const t=e.pinia;if(!this._provided){const e={};Object.defineProperty(this,"_provided",{get:()=>e,set:t=>Object.assign(e,t)})}this._provided[r]=t,this.$pinia||(this.$pinia=t),t._a=this,a&&i(t)}else!this.$pinia&&e.parent&&e.parent.$pinia&&(this.$pinia=e.parent.$pinia)},destroyed(){delete this._pStores}})},e.createPinia=function(){const e=t.effectScope(!0),s=e.run(()=>t.ref({}));let r=[];const n=t.markRaw({install(e){i(n)},use(e){return r.push(e),this},_p:r,_a:null,_e:e,_s:new Map,state:s});return n},e.defineStore=function(e,n,o){let l,c;const u="function"==typeof n;if("string"==typeof e)l=e,c=u?o:n;else if(c=e,"string"!=typeof(l=e.id))throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');function h(e,o){const f=t.hasInjectionContext();if((e=e||(f?t.inject(r,null):null))&&i(e),!s)throw new Error('[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?\nSee https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.\nThis will fail in production.');(e=s)._s.has(l)||(u?y(l,n,c,e):v(l,c,e),h._pinia=e);const d=e._s.get(l);if(o){const t="__hot:"+l,s=u?y(t,n,c,e,!0):v(t,m({},c),e,!0);o._hotUpdate(s),delete e.state.value[t],e._s.delete(t)}if(a){const e=t.getCurrentInstance();if(e&&e.proxy&&!o){const t=e.proxy;("_pStores"in t?t._pStores:t._pStores={})[l]=d}}return d}return h.$id=l,h},e.mapActions=function(e,t){return Array.isArray(t)?t.reduce((t,s)=>(t[s]=function(...t){return e(this.$pinia)[s](...t)},t),{}):Object.keys(t).reduce((s,i)=>(s[i]=function(...s){return e(this.$pinia)[t[i]](...s)},s),{})},e.mapState=b,e.mapWritableState=function(e,t){return Array.isArray(t)?t.reduce((t,s)=>(t[s]={get(){return e(this.$pinia)[s]},set(t){return e(this.$pinia)[s]=t}},t),{}):Object.keys(t).reduce((s,i)=>(s[i]={get(){return e(this.$pinia)[t[i]]},set(s){return e(this.$pinia)[t[i]]=s}},s),{})},e}({},RVue);(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).RFloatingUIDOM={})})(this,function(e){"use strict";const t=Math.min,s=Math.max,i=Math.round,r=e=>({x:e,y:e});function n(e,i,r){return s(e,t(i,r))}function o(e,t){return"function"==typeof e?e(t):e}function a(e){return e.split("-")[0]}function l(e){return"x"===e?"y":"x"}function c(e){return["top","bottom"].includes(a(e))?"y":"x"}function u(e){const{x:t,y:s,width:i,height:r}=e;return{width:i,height:r,top:s,left:t,right:t+i,bottom:s+r,x:t,y:s}}function h(e,t,s){let{reference:i,floating:r}=e;const n=c(t),o=function(e){return l(c(e))}(t),u="y"===o?"height":"width";const h=a(t),f="y"===n,d=i.x+i.width/2-r.width/2,p=i.y+i.height/2-r.height/2,m=i[u]/2-r[u]/2;let g;switch(h){case"top":g={x:d,y:i.y-r.height};break;case"bottom":g={x:d,y:i.y+i.height};break;case"right":g={x:i.x+i.width,y:p};break;case"left":g={x:i.x-r.width,y:p};break;default:g={x:i.x,y:i.y}}switch(function(e){return e.split("-")[1]}(t)){case"start":g[o]-=m*(s&&f?-1:1);break;case"end":g[o]+=m*(s&&f?-1:1)}return g}function f(e){return m(e)?(e.nodeName||"").toLowerCase():"#document"}function d(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function p(e){var t;return null==(t=(m(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function m(e){return e instanceof Node||e instanceof d(e).Node}function g(e){return e instanceof Element||e instanceof d(e).Element}function v(e){return e instanceof HTMLElement||e instanceof d(e).HTMLElement}function y(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof d(e).ShadowRoot)}function b(e){const{overflow:t,overflowX:s,overflowY:i,display:r}=F(e);return/auto|scroll|overlay|hidden|clip/.test(t+i+s)&&!["inline","contents"].includes(r)}function w(e){return["table","td","th"].includes(f(e))}function S(e){const t=x(),s=F(e);return"none"!==s.transform||"none"!==s.perspective||!!s.containerType&&"normal"!==s.containerType||!t&&!!s.backdropFilter&&"none"!==s.backdropFilter||!t&&!!s.filter&&"none"!==s.filter||["transform","perspective","filter"].some(e=>(s.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(s.contain||"").includes(e))}function x(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function _(e){return["html","body","#document"].includes(f(e))}function F(e){return d(e).getComputedStyle(e)}function P(e){return g(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function I(e){if("html"===f(e))return e;const t=e.assignedSlot||e.parentNode||y(e)&&e.host||p(e);return y(t)?t.host:t}function C(e,t,s){var i;void 0===t&&(t=[]),void 0===s&&(s=!0);const r=function e(t){const s=I(t);return _(s)?t.ownerDocument?t.ownerDocument.body:t.body:v(s)&&b(s)?s:e(s)}(e),n=r===(null==(i=e.ownerDocument)?void 0:i.body),o=d(r);return n?t.concat(o,o.visualViewport||[],b(r)?r:[],o.frameElement&&s?C(o.frameElement):[]):t.concat(r,C(r,[],s))}function M(e){const t=F(e);let s=parseFloat(t.width)||0,r=parseFloat(t.height)||0;const n=v(e),o=n?e.offsetWidth:s,a=n?e.offsetHeight:r,l=i(s)!==o||i(r)!==a;return l&&(s=o,r=a),{width:s,height:r,$:l}}function R(e){return g(e)?e:e.contextElement}function T(e){const t=R(e);if(!v(t))return r(1);const s=t.getBoundingClientRect(),{width:n,height:o,$:a}=M(t);let l=(a?i(s.width):s.width)/n,c=(a?i(s.height):s.height)/o;return l&&Number.isFinite(l)||(l=1),c&&Number.isFinite(c)||(c=1),{x:l,y:c}}const L=r(0);function O(e){const t=d(e);return x()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:L}function U(e,t,s,i){void 0===t&&(t=!1),void 0===s&&(s=!1);const n=e.getBoundingClientRect(),o=R(e);let a=r(1);t&&(i?g(i)&&(a=T(i)):a=T(e));const l=function(e,t,s){return void 0===t&&(t=!1),!(!s||t&&s!==d(e))&&t}(o,s,i)?O(o):r(0);let c=(n.left+l.x)/a.x,h=(n.top+l.y)/a.y,f=n.width/a.x,p=n.height/a.y;if(o){const e=d(o),t=i&&g(i)?d(i):i;let s=e,r=s.frameElement;for(;r&&i&&t!==s;){const e=T(r),t=r.getBoundingClientRect(),i=F(r),n=t.left+(r.clientLeft+parseFloat(i.paddingLeft))*e.x,o=t.top+(r.clientTop+parseFloat(i.paddingTop))*e.y;c*=e.x,h*=e.y,f*=e.x,p*=e.y,c+=n,h+=o,r=(s=d(r)).frameElement}}return u({width:f,height:p,x:c,y:h})}const k=[":popover-open",":modal"];function D(e){return k.some(t=>{try{return e.matches(t)}catch(e){return!1}})}function $(e){return U(p(e)).left+P(e).scrollLeft}function E(e,t,i){let n;if("viewport"===t)n=function(e,t){const s=d(e),i=p(e),r=s.visualViewport;let n=i.clientWidth,o=i.clientHeight,a=0,l=0;if(r){n=r.width,o=r.height;const e=x();(!e||e&&"fixed"===t)&&(a=r.offsetLeft,l=r.offsetTop)}return{width:n,height:o,x:a,y:l}}(e,i);else if("document"===t)n=function(e){const t=p(e),i=P(e),r=e.ownerDocument.body,n=s(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),o=s(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight);let a=-i.scrollLeft+$(e);const l=-i.scrollTop;return"rtl"===F(r).direction&&(a+=s(t.clientWidth,r.clientWidth)-n),{width:n,height:o,x:a,y:l}}(p(e));else if(g(t))n=function(e,t){const s=U(e,!0,"fixed"===t),i=s.top+e.clientTop,n=s.left+e.clientLeft,o=v(e)?T(e):r(1);return{width:e.clientWidth*o.x,height:e.clientHeight*o.y,x:n*o.x,y:i*o.y}}(t,i);else{const s=O(e);n={...t,x:t.x-s.x,y:t.y-s.y}}return u(n)}function N(e,t){const s=I(e);return!(s===t||!g(s)||_(s))&&("fixed"===F(s).position||N(s,t))}function B(e,t){return v(e)&&"fixed"!==F(e).position?t?t(e):e.offsetParent:null}function A(e,t){const s=d(e);if(!v(e)||D(e))return s;let i=B(e,t);for(;i&&w(i)&&"static"===F(i).position;)i=B(i,t);return i&&("html"===f(i)||"body"===f(i)&&"static"===F(i).position&&!S(i))?s:i||function(e){let t=I(e);for(;v(t)&&!_(t);){if(S(t))return t;t=I(t)}return null}(e)||s}const H={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:s,offsetParent:i,strategy:n}=e;const o="fixed"===n,a=p(i),l=!!t&&D(t.floating);if(i===a||l&&o)return s;let c={scrollLeft:0,scrollTop:0},u=r(1);const h=r(0),d=v(i);if((d||!d&&!o)&&(("body"!==f(i)||b(a))&&(c=P(i)),v(i))){const e=U(i);u=T(i),h.x=e.x+i.clientLeft,h.y=e.y+i.clientTop}return{width:s.width*u.x,height:s.height*u.y,x:s.x*u.x-c.scrollLeft*u.x+h.x,y:s.y*u.y-c.scrollTop*u.y+h.y}},getDocumentElement:p,getClippingRect:function(e){let{element:i,boundary:r,rootBoundary:n,strategy:o}=e;const a=[..."clippingAncestors"===r?function(e,t){const s=t.get(e);if(s)return s;let i=C(e,[],!1).filter(e=>g(e)&&"body"!==f(e)),r=null;const n="fixed"===F(e).position;let o=n?I(e):e;for(;g(o)&&!_(o);){const t=F(o),s=S(o);s||"fixed"!==t.position||(r=null),(n?!s&&!r:!s&&"static"===t.position&&r&&["absolute","fixed"].includes(r.position)||b(o)&&!s&&N(e,o))?i=i.filter(e=>e!==o):r=t,o=I(o)}return t.set(e,i),i}(i,this._c):[].concat(r),n],l=a[0],c=a.reduce((e,r)=>{const n=E(i,r,o);return e.top=s(n.top,e.top),e.right=t(n.right,e.right),e.bottom=t(n.bottom,e.bottom),e.left=s(n.left,e.left),e},E(i,l,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}},getOffsetParent:A,getElementRects:async function(e){const t=this.getOffsetParent||A,s=this.getDimensions,i=await s(e.floating);return{reference:function(e,t,s){const i=v(t),n=p(t),o="fixed"===s,a=U(e,!0,o,t);let l={scrollLeft:0,scrollTop:0};const c=r(0);if(i||!i&&!o)if(("body"!==f(t)||b(n))&&(l=P(t)),i){const e=U(t,!0,o,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}else n&&(c.x=$(n));return{x:a.left+l.scrollLeft-c.x,y:a.top+l.scrollTop-c.y,width:a.width,height:a.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){const{width:t,height:s}=M(e);return{width:t,height:s}},getScale:T,isElement:g,isRTL:function(e){return"rtl"===F(e).direction}},V=function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){const{x:s,y:i,placement:r}=t,{mainAxis:h=!0,crossAxis:f=!1,limiter:d={fn:e=>{let{x:t,y:s}=e;return{x:t,y:s}}},...p}=o(e,t),m={x:s,y:i},g=await async function(e,t){var s;void 0===t&&(t={});const{x:i,y:r,platform:n,rects:a,elements:l,strategy:c}=e,{boundary:h="clippingAncestors",rootBoundary:f="viewport",elementContext:d="floating",altBoundary:p=!1,padding:m=0}=o(t,e),g=function(e){return"number"!=typeof e?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(e):{top:e,right:e,bottom:e,left:e}}(m),v=l[p?"floating"===d?"reference":"floating":d],y=u(await n.getClippingRect({element:null==(s=await(null==n.isElement?void 0:n.isElement(v)))||s?v:v.contextElement||await(null==n.getDocumentElement?void 0:n.getDocumentElement(l.floating)),boundary:h,rootBoundary:f,strategy:c})),b="floating"===d?{x:i,y:r,width:a.floating.width,height:a.floating.height}:a.reference,w=await(null==n.getOffsetParent?void 0:n.getOffsetParent(l.floating)),S=await(null==n.isElement?void 0:n.isElement(w))&&await(null==n.getScale?void 0:n.getScale(w))||{x:1,y:1},x=u(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:b,offsetParent:w,strategy:c}):b);return{top:(y.top-x.top+g.top)/S.y,bottom:(x.bottom-y.bottom+g.bottom)/S.y,left:(y.left-x.left+g.left)/S.x,right:(x.right-y.right+g.right)/S.x}}(t,p),v=c(a(r)),y=l(v);let b=m[y],w=m[v];if(h){const e="y"===y?"bottom":"right";b=n(b+g["y"===y?"top":"left"],b,b-g[e])}if(f){const e="y"===v?"bottom":"right";w=n(w+g["y"===v?"top":"left"],w,w-g[e])}const S=d.fn({...t,[y]:b,[v]:w});return{...S,data:{x:S.x-s,y:S.y-i}}}}};e.computePosition=((e,t,s)=>{const i=new Map,r={platform:H,...s};return(async(e,t,s)=>{const{placement:i="bottom",strategy:r="absolute",middleware:n=[],platform:o}=s,a=n.filter(Boolean),l=await(null==o.isRTL?void 0:o.isRTL(t));let c=await o.getElementRects({reference:e,floating:t,strategy:r}),{x:u,y:f}=h(c,i,l),d=i,p={},m=0;for(let s=0;s<a.length;s++){const{name:n,fn:g}=a[s],{x:v,y:y,data:b,reset:w}=await g({x:u,y:f,initialPlacement:i,placement:d,strategy:r,middlewareData:p,rects:c,platform:o,elements:{reference:e,floating:t}});u=null!=v?v:u,f=null!=y?y:f,p={...p,[n]:{...p[n],...b}},w&&m<=50&&(m++,"object"==typeof w&&(w.placement&&(d=w.placement),w.rects&&(c=!0===w.rects?await o.getElementRects({reference:e,floating:t,strategy:r}):w.rects),({x:u,y:f}=h(c,d,l))),s=-1)}return{x:u,y:f,placement:d,strategy:r,middlewareData:p}})(e,t,{...r,platform:{...r.platform,_c:i}})}),e.shift=V});const t="usfRS",s=e=>{let s;try{const e=localStorage.getItem(t);s=e&&JSON.parse(e)}catch(e){s=[]}if(Array.isArray(s)){const t=Number(e)||10;t>0&&(s=s.slice(0,t))}else s=[];const i=[];s.forEach(e=>{""!==e.term&&i.push(e)});try{localStorage.setItem(t,JSON.stringify(i))}catch(e){}return i},i=e=>{if("string"!=typeof e||""===e.trim())return;e=e.trim();let i=s();const r=i.findIndex(t=>t.title===e);r>=0?(i.splice(r,1),i.unshift({title:e})):(i.unshift({title:e}),i=i.slice(0,20));try{localStorage.setItem(t,JSON.stringify(i))}catch(e){}},r=()=>{try{localStorage.removeItem(t)}catch(e){}},n=e=>{try{let i=s();i.splice(e,1),localStorage.setItem(t,JSON.stringify(i))}catch(e){}};var o=usf.settings,a=usf.event,l=usf.templates,c=o["translation_"+usf.platform.locale];if(!c)for(var u in o)if(u.startsWith("translation")){c=o[u];break}o.translation=c,RVue.prototype.loc=c;var h=o.search.sortFields;if("/search"===location.pathname&&h&&!h.includes("r")&&h.unshift("r"),h){for(var f=[],d=0;d<h.length;d++){var p=h[d],m=c["sortBy_"+p]||p;f[d]={label:m,value:p}}RVue.prototype.sortByOptions=f}else RVue.prototype.sortByOptions=null;RVue.prototype.isHorzFilters=!!o.filters.horz;var g=usf.utils,v;const y=e.defineStore("facets",{state:()=>({facets:null,facetFilters:null,mobileSelectedFacetId:null,hasFacets:!0}),getters:{facetFilterIds:e=>{var t=e.facetFilters;if(!t||t&&T(t))return[];var s=[];for(var i in t)s.push(parseInt(i));return s},facetsMap:e=>{if(e.facets){var t={};for(let s=0;s<e.facets.length;s++){const i=e.facets[s];t[i.id]=i}return t}return{}},noFacets:e=>!e.hasFacets&&!e.facetFilters},actions:{setFacets(e){e?M(e,this.facets)||(this.facets=e):this.facets=null},setFacetFilters(e){if(e){if(T(e))return void(this.facetFilters=null);M(e,this.facetFilters)||(this.facetFilters=e)}else this.facetFilters=null},removeFacetFilter(e,t){if(this.facetFilters){var s=R(this.facetFilters);if(t){var i=s[e];if(!i)return;var r=i[1],n=r.indexOf(t);-1===n?r.push(m):r.splice(n,1),r.length||RVue.delete(s,e)}else RVue.delete(s,e);_.facetFilters=s}},removeAllFacetFilters(){_.removeAllFacetFilters()}}}),b=()=>o.instantSearch.showRecentSearches?s(o.instantSearch.numOfRecentSearches||5):[],w=e.defineStore("usf-app",{state:()=>({view:_.view,sortBy:_.sort,recentlySearches:b()}),actions:{addRecentlySearches(e){i(e),this.recentlySearches=b()},clearAllRecentSearches(){r(),this.recentlySearches=[]},removeRecentSearchAtIndex(e){n(e),this.recentlySearches=b()}}});window.USF_ON_CLASSNAME="usf-on",window.usf.store=window.usf.store||{},usf.store={useFacetsStore:y,useAppStore:w};var S=usf.platform,x=usf.query,_=usf.queryRewriter,F=["template","created","beforeMounted","beforeMount","beforeCreate","mounted","beforeUpdate","updated","render","beforeDestroy","destroy","destroyed","activated","deactivated","errorCaptured","ref","key","slot","directives","on","attrs","setup"];function P(e,t){for(var s=0;s<t.length;s++)e.push(t[s])}function I(e){return"[object Function]"===Object.prototype.toString.call(e)}function C(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;var s,i,r;if(Array.isArray(e)){if((s=e.length)!=t.length)return!1;for(i=s;0!=i--;)if(!M(e[i],t[i]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if((s=(r=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(i=s;0!=i--;)if(!Object.prototype.hasOwnProperty.call(t,r[i]))return!1;for(i=s;0!=i--;){var n=r[i];if(!M(e[n],t[n]))return!1}return!0}return e!=e&&t!=t}function M(e,t){try{return C(e,t)}catch(e){return!1}}function R(e){try{return structuredClone(e)}catch(t){return{...e}}}function T(e){for(var t in e)return!1;return!0}function L(e){return"string"==typeof e}function O(e,t,s){var i=t[s];if(i){var r=e[s];if(!r){if(I(i))return void(e[s]=i);e[s]=r={}}for(var n in i){var o=i[n];r[n]||(r[n]=o)}}}function U(e,t,s){var i=$r.getBaseType(e);if(i){if(s){var r=i[s][t],n=i.mixins;if(!r&&n)for(var o=0;o<n.length;o++)if((r=n[o][s])&&(r=r[t]))return r;return r}return i[t]}return null}Object.assign(window.usf,{register:function(e,t,s){var i;if(L(e)?(i=eval(e),i.__typeName=e,i.fullName=function(){return i.__typeName}):i=e,i.__class=!0,t)for(var r in i.__baseType=t,["methods","props","computed","events","model","data","watch","inject","provide"].forEach(e=>O(i,t,e)),t.mixins&&(i.mixins||(i.mixins=[]),P(i.mixins,t.mixins)),t){var n=t[r];!i[r]&&F.includes(r)&&(i[r]=n)}return s&&RVue.component(s,i),i},base:function(e,t,s,i,r){var n=U(t,s,r);if(!n)throw new Error("Base method named '"+s+"' not found.");return i?n.apply(e,i):n.apply(e)}});var k={props:{value:String,options:Array,placeholder:String},data:()=>({show:!1}),methods:{onInput(e){g.stopEvent(e),this.onClose(),this.$emit("input",e.target.getAttribute("data-value"))},onUpdateBodyDom(e){document.body.classList[e?"add":"remove"]("usf-has-popup"),document.body[e?"addEventListener":"removeEventListener"]("mousedown",this.onClose),usf.isMobile&&document.body.classList[e?"add":"remove"]("usf-no-scroll")},onToggle(e){if(g.stopEvent(e),!this.show){var t=this.$refs.p;usf.isMobile?document.body.appendChild(t):this.$el.appendChild(t)}setTimeout(()=>{var e=this.show=!this.show;this.onUpdateBodyDom(e)},0)},onClose(e){if(e){var t=e.target;if(t.closest(".usf-c-select")&&!t.classList.contains("usf-remove"))return}var s=this.show=!1;this.onUpdateBodyDom(s)},renderTriggerButton(e){var t,s=this.options;if(s)return t=usf.isMobile?this.placeholder:(t=s.find(e=>e.value==this.value))?t.label:this.placeholder,e("button",{class:"usf-c-select__input-value usf-btn",on:{click:this.onToggle},domProps:{innerHTML:t}})},renderOptionsPopover(e){var t=this.options;if(t){for(var s=[],i=0;i<t.length;i++){var r=t[i];s.push(e("button",{class:{"usf-c-select__btn usf-btn":!0,"usf-selected":this.value===r.value},domProps:{innerHTML:r.label},on:{click:this.onInput},attrs:{"data-value":r.value}}))}return e("div",{class:"usf-popover",ref:"p",attrs:{"aria-hidden":!this.show}},[e("div",{class:"usf-body"},[usf.isMobile?e("div",{class:"usf-c-select__header"},[e("div",{class:"usf-remove",on:{click:this.onClose}}),e("span",{class:"",domProps:{innerHTML:this.placeholder}})]):null,e("div",{class:"usf-c-select__content"},[e("div",{class:"usf-c-select__list"},s)])])])}}},render(e){if(this.options)return e("div",{class:"usf-c-select"+(this.show?" usf-opened":"")},[this.renderTriggerButton(e),this.renderOptionsPopover(e)])}};usf.components.DropDown=usf.register(k,null,"usf-dropdown");var D={props:{value:Boolean,label:String,name:String},methods:{onInput(e){this.$emit("input",e.target.value)}},render(e){return e("div",{class:"usf-c-checkbox"},[e("div",{class:"usf-c-inner-option"},[e("input",{attrs:{type:"checkbox",name:this.name},props:{value:this.value},on:{input:this.onInput}})]),e("span",{domProps:{innerHTML:this.label}})])}};usf.components.CheckBox=usf.register(k,null,"usf-checkbox");var $={props:{tooltip:String},render(e){return e("div",{class:"usf-c-tooltip"},[e("div",{class:"usf-c-tooltip__popup",domProps:{innerHTML:this.tooltip}})])}},E,N,B,A,H,V,j;function q(e,t){return Math.ceil(e/t)*t}function z(e,t){var s,i=t.innerSymbols;if(i){var r=Math.log10(e)/3|0;if(s=i[r],r)e/=Math.pow(10,3*r)}else s="";return vt(e,t.decimals)+s}function W(e,t,s){return[e("span",{class:"usf-slider-pip__value-wrapper"},[s.prefix?e("span",{class:"usf-slider-pip__prefix"},[s.prefix]):null,e("span",{class:"usf-slider-pip__value"},[z(s.converter(t),s)]),s.suffix?e("span",{class:"usf-slider-pip__suffix"},[s.suffix]):null])]}usf.components.HelpTip=usf.register($,null,"usf-helptip");var X={props:{value:Array,min:Number,max:Number,pips:Number,step:Number,decimals:Number,converter:Function,symbols:[Array,String],prefix:String,suffix:String,noAbbreviation:Boolean,color:String},data(){var e=this.symbols;return e&&(Array.isArray(e)||(e=(","+e).split(","))),{dragging:!1,innerSymbols:e}},methods:{onKeyDown(e){var t,s,i;switch(e.keyCode){case 37:t=-this.step;break;case 39:t=this.step;break;case 27:return(r=e.target===this.$refs.l)?(s=this.min,i=this.value[1]):(s=this.value[0],i=this.max),this.$emit("input",[s,i]),void this.$emit("change",[s,i])}if(void 0!==t){var r=e.target===this.$refs.l,n=this.value;r?(s=n[0]+t,i=n[1],s<this.min?s=this.min:s>i&&(s=i)):(s=n[0],(i=n[1]+t)<s?i=s:i>this.max&&(i=this.max)),s==n[0]&&i===n[1]||(this.$emit("input",[s,i]),clearTimeout(this._timeout),this._timeout=setTimeout(()=>this.$emit("change",[s,i]),100))}},onMouseUp(e){this.$emit("change",[H,V]),this.dragging=!1,this.clearDrag()},onMouseMove(e){var t=(e.touches?e.touches[0].clientX:e.clientX)-E,s=this.value[0],i=this.value[1],r=this.min,n=this.max;N?((s=B+q(t/_width*(n-r),this.step))<r&&(s=r),s>i&&(s=i)):((i=A+q(t/_width*(n-r),this.step))>n&&(i=n),i<s&&(i=s)),H===s&&V===i||(H=s,V=i,this.$emit("input",[s,i]))},onMinMouseDown(e){this.onHandleMouseDown(e,!0)},onMaxMouseDown(e){this.onHandleMouseDown(e,!1)},onHandleMouseDown(e,t){if(!this.dragging){var s=e.target;s.style.zIndex=2,this.$refs[s===this.$refs.l?"r":"l"].style.zIndex=1,this.dragging=!0,E=e.touches?e.touches[0].clientX:e.clientX,N=t,_width=this.$el.clientWidth,B=this.value[0],A=this.value[1];var i=this.onMouseUp,r=this.onMouseMove;j={mouseup:i,mousemove:r,touchend:i,touchmove:r},g.on(document.body,j,{passive:!0})}},clearDrag(){g.off(document.body,j)}},beforeDestroy(){this.clearDrag()},render(e){for(var t=this.min,s=this.max,i=this.color,r=[],n=s-t,o=n/this.pips,a=0;a<this.pips;a++){var l=a*o,c=t+l;if(r.push(e("div",{style:"left:"+100*l/n+"%",class:"usf-c-slider__pip"},W(e,c,this))),!a&&n<=this.step)break}r.push(e("div",{style:"right:0",class:"usf-c-slider__pip"},W(e,s,this)));var u=this.value[0],h=this.value[1];u<t&&(u=t),u>s&&(u=s),h>s&&(h=s),h<t&&(h=t);var f=100*(u-t)/n+"%",d=100*(h-t)/n+"%";return e("div",{class:"usf-c-slider"},[r,e("div",{class:"usf-c-slider__track"},[e("div",{class:"usf-active",style:{left:f,width:100*(h-u)/n+"%",backgroundColor:i}})]),e("div",{class:"usf-c-slider__handle usf-c-slider__handle-min usf-c",ref:"l",attrs:{tabindex:0},style:{left:f,borderColor:i},on:{"&mousedown":this.onMinMouseDown,"&touchstart":this.onMinMouseDown,keydown:this.onKeyDown}}),e("div",{class:"usf-c-slider__handle usf-c-slider__handle-max usf-c",ref:"r",attrs:{tabindex:0},style:{left:d,borderColor:i},on:{"&mousedown":this.onMaxMouseDown,"&touchstart":this.onMaxMouseDown,keydown:this.onKeyDown}})])}};usf.components.Slider=usf.register(X,null,"usf-slider");var Y=navigator.userAgent,J=Y.includes("iPad")||Y.includes("iPhone"),K;function G(e,t){var s=0,i=0,r=e;if(t){for(;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop)&&(s+=e.offsetLeft,i+=e.offsetTop,(e=e.offsetParent)!==t););for(r=r.parentNode;r&&!isNaN(r.scrollLeft)&&!isNaN(r.scrollTop)&&(s-=r.scrollLeft,i-=r.scrollTop,r!==t);)r=r.parentNode}else{var n=e.getBoundingClientRect();s=n.x+window.scrollX,i=n.y+window.scrollY}return{x:s,y:i}}var Q={url:o.resUrl+"no-image.svg",width:360,height:260};function Z(){for(var e=document.head.children,t=0;t<e.length;t++){var s=e[t];if("SCRIPT"==s.tagName&&-1!==s.text.indexOf("usf-license.js"))return!0}}Object.assign(usf.platform,{get addToCartUrl(){return S.baseUrl+"/cart/add"},get searchUrl(){return S.baseUrl+"/search"},emptyImage:Q,getProductUrl(e,t,s){var i;return i=!o.search.removeCollectionFromProductUrl&&e&&"all"!==e&&-1===e.indexOf("/")?S.baseUrl+"/collections/"+e+"/products/"+t.urlName:S.baseUrl+"/products/"+t.urlName,s&&(i+="?variant="+s.id),i},getImageUrl(e,t){if(!e.includes("shopify.com")||e.includes("/assets/"))return e;var s=e.lastIndexOf(".");if("list"===t)switch(o.search.imageSizeType){case"fixed":t="_"+o.search.imageSize+"x";break;default:t=""}else t="small"===t?"_small":t?"_"+t+"x":"";return e.substring(0,s)+t+e.substring(s)},getCollectionUrl(e){if("number"==typeof e){var t;for(var s in usf.collectionsByUrlName){var i=usf.collectionsByUrlName[s];if(i.id===e){e=i,t=!0;break}}t||(e={urlName:"all"})}var r=e.urlName||e;return S.baseUrl+"/collections/"+r},getPageUrl(e){var t=S.baseUrl;switch(e.type){case"Article":return t+"/blogs/"+e.urlName;case"Page":e=e.urlName}return t+"/pages/"+e}}),window.addEventListener("load",function(){g.registerScriptsLoadedCallback(window._usfActive,"usf-license",function(){},8e3,function(){window._usfActive||Z()||S.redirectToOriginalView()})});var ee=["price"],te;function se(e){var t;return void 0!==e.min?(t=(e.minInclusive?":":"")+e.min+" ",e.max<mt&&(t+=(e.maxInclusive?":":"")+e.max),t+=" "+e.label):t=e.label,t}function ie(e,t,s,i){var r=t.inStockLabel;if(void 0!==r){var n=t.outOfStockLabel;if("0"===e.label)return n;if("1"===e.label)return r;if("2"===e.label)return t.stockOnHandLabel;if("3"===e.label)return t.preOrderLabel}return e.label||"reviewRating"!==t.facetName?void 0!==e.min?re(e,t):oe(e.llabel||e.label,t):le(e,t.ratingColor)}function re(e,t){var s=e.min,i=e.max,r=ee.includes(t.facetName);return s=r?g.getDisplayPrice(s):vt(s),i!==mt&&(i=r?g.getDisplayPrice(i):vt(i)),ft(e.label,s,i)}function ne(e,t,s){if(e.numericRange){var i=s.indexOf(" ");if(-1!==i){var r,n,o=s.substr(0,i),a=s.indexOf(" ",i+1);-1===a?r=s.substr(i+1):(r=s.substr(i+1,a-i-1),n=s.substr(a+1));var l=":"===o[0],c=":"===r[0];o=wt(o),r=wt(r);var u=ee.includes(t),h=ce(u,e.valueFormula),f=h(parseFloat(o)),d=r.length?h(parseFloat(r)):-1;if("reviewRating"===t&&!n)return le({min:f,minInclusive:l,max:d,maxInclusive:c},e.ratingColor);n||(f<e.min&&(o=e.min.toString()),d>e.max&&(r=e.max.toString()),n=e.rangeFormat||"{0} - {1}");var p,m=e.range;return m&&(p=m[2]),u?(o=g.getDisplayPrice(f),r&&(r=g.getDisplayPrice(d))):(o=vt(f,p),r&&(r=vt(d,p))),ft(n,o,r)}}else if(void 0!==e.inStockLabel){if("0"===opt.label)return e.outOfStockLabel;if("1"===opt.label)return e.inStockLabel;if("2"===opt.label)return e.stockOnHandLabel;if("3"===opt.label)return e.preOrderLabel}else if("collections"===e.facetName){var v=parseInt(s);if(!Number.isNaN(v)){var y=usf.collectionsByUrlName;for(var b in y){var w=y[b];if(w.id===v){s=w.title;break}}}}return oe(s,e)}function oe(e,t){var s=t.valuesTransformation;return s?'<span class="usf-'+s.toLowerCase()+'">'+e+"</span>":e}function ae(){setTimeout(()=>{usf_container.getBoundingClientRect().top<=-50&&g.scrollTo(usf_container.scrollTop,800)},100)}function le(e,t){var s;s=e.minInclusive||!e.maxInclusive?e.min:e.max;for(var i='<span class="usf-stars" style="color:'+t+'">',r=1;r<=5;r++)i+='<i class="usf-icon usf-icon-star'+(r>s?"-empty":"")+'"></i>';return i+="</span>"}function ce(e,t){return t||e?function(s){return e&&(s=usf.currencyConverter.convertPrice(s)),t&&(eval("var value="+s),s=eval("("+t+")")),s}:e=>e}var ue={created(){this.facet=null,this.f=null,this.settings=usf.settings},computed:{...e.mapState(y,["facetFilters","facetsMap","facets","facetFilterIds"])},methods:{...e.mapActions(y,["removeFacetFilter","removeAllFacetFilters"]),formatBreadcrumbLabel:ne}},he={mixins:[ue],template:l.filtersBreadcrumb};usf.components.FacetFilterBreadcrumb=usf.register(he,null,"usf-filter-breadcrumb");const fe=24,de={props:["facet"],name:"FacetFilterMixin",data:()=>({term:""}),computed:{...e.mapWritableState(y,["facetFilters"]),id(){return this.facet.id},isRange(){const e=this.facet;return void 0!==e.min&&"List"!==e.display},isPrice(){const e=this.facet;return ee.includes(e.facetName)},hasSearchBox(){const e=this.facet;return usf.isMobile?e.searchBoxOnMobile:e.searchBoxOnPc},isInBreadcrumb(){return!(!this.facetFilters||!this.facetFilters[this.facet.id])},options(){const e=this.facet;var t=e.sort,s=e.labels;if(e.navigationCollections){var i,r=ye(e);if(r)return(i=this.term)&&(i=i.toLowerCase(),r=r.filter(e=>e.collection.label.toLowerCase().includes(i))),r}return void 0!==t&&(s=s.slice(0,s.length)).sort((e,s)=>{var i=e.label.toLowerCase(),r=s.label.toLowerCase();switch(t){case 1:return i<r?-1:i>r?1:0;case 2:return i<r?1:i>r?-1:0;case 3:return s.value-e.value;case 4:return e.value-s.value}}),(i=this.term)&&(i=i.toLowerCase(),s=s.filter(e=>e.label.toLowerCase().includes(i))),s},canShow(){const e=this.facet;return this.isRange?e.min!==e.max:e.navigationCollections?this.options.length>0||this.hasSearchBox&&""!=this.term:e.labels.length>0}}},pe={mixins:[de],props:["facet","isCollapsed"],emits:["onToggleFilter","onToggleAllFilters"],template:l.filter,created(){const e=this.facet,t=e.maxHeight&&!e.maxItems&&"List"===e.display&&e.labels.length>24;this.hasLazyLoad=t,this.maxItems=t?fe:e.maxItems,this.loadedItemsCount=this.maxItems,this.scrollElRef=null,usf.event.add(`ff_${this.facet.id}_expand`,this.onExpand),usf.event.add(`ff_${this.facet.id}_collapse`,this.onCollapse)},data(){return{loadedItemsCount:this.maxItems,popoverX:null,popoverY:null,facetsChangesListener:null}},computed:{filterOptionsContainerStyle(){if(this.isHorzFilters&&!usf.isMobile){var e={};return null!==this.popoverY&&(e.top=this.popoverY+"px"),null!==this.popoverX&&(e.left=this.popoverX+"px"),e}},rangeConverter(){return ce(this.isPrice,this.facet.valueFormula)},rangeResolver(){return ce(this.isPrice,this.facet.inverseFormula)},rangeDecimals(){var e=this.facet.range[2];return"number"!=typeof e?1:e},range(){var e=this.facet,t=e.min,s=e.max,i=t,r=s,n=this.facetFilters;if(n){var o=n[e.id];if(o){var a=(o=o[1])[0].split(" ");(i=parseFloat(wt(a[0])))<t&&(i=t),(r=parseFloat(wt(a[1])))>s&&(r=s)}}return[i,r]},hasRangeInputs(){var e=this.facet;return!e.valueFormula||e.inverseFormula},visibleOptions(){var e=this.options,t=this.maxItems;if(t&&e.length>t){var s=this.loadedItemsCount;s<e.length&&(e=e.slice(0,s))}return e},collapsed(){var e=this.isCollapsed;return void 0===e&&(e=this.facet.collapseOnPc||this.isHorzFilters),e},isMoreVisible(){var e=this.facet,t=this.options,s=e.maxItems;return!!(s&&t.length>s)&&(!(this.loadedItemsCount>=t.length)&&s)}},mounted(){if(this.hasLazyLoad){var e=this.$refs.values;usf.isMobile&&!usf.settings.filters.desktopLikeMobile&&(e=e.closest(".usf-body")),e&&(this.scrollElRef=e,g.on(e,"scroll",this.onScroll))}const t=this;if(this.isHorzFilters&&!usf.isMobile){const e=y();this.facetsChangesListener=e.$subscribe((e,s)=>{"facets"==e.storeId&&(t.collapsed||t.repositionPopover())})}},beforeDestroy(){this.scrollElRef&&g.off(this.scrollElRef,"scroll",this.onScroll),this.facetsChangesListener&&this.facetsChangesListener(),usf.event.remove(`ff_${this.facet.id}_expand`,this.onExpand),usf.event.remove(`ff_${this.facet.id}_collapse`,this.onCollapse)},methods:{...e.mapActions(y,["removeFacetFilter"]),repositionPopover(){let e=this;const t=this.$el;if(!t||t&&(!t.textContent||!t.innerHTML))return;const s=t.querySelector(".usf-container");let i=t.closest(".usf-facets")||document.closest(".usf-facets__wrapper");if(i){var r=i.getBoundingClientRect();RFloatingUIDOM.computePosition(t,s,{middleware:[RFloatingUIDOM.shift({rootBoundary:{x:r.left,y:r.top,width:i.clientWidth,height:i.clientHeight}})]}).then(({x:t,y:s})=>{e.popoverX=t,e.popoverY=s}).catch(t=>{e.popoverX=null,e.popoverY=null})}else e.popoverX=null,e.popoverY=null},onToggleFilter(e,t){this.$emit("onToggleFilter",e,t)},onShowMore(e){var t=this.facet;this.loadedItemsCount+=t.maxItems,this.$nextTick(()=>this.$refs.values.scrollTop=this.$refs.values.scrollHeight),g.stopEvent(e)},onScroll(e){var t=this.scrollElRef,s=t.scrollTop+t.offsetHeight;if(this.loadedItemsCount<this.options.length&&s+5>t.scrollHeight){this.loadedItemsCount+=this.maxItems;var i=t.parentNode.classList;i.add("usf-with-loader"),setTimeout(function(){i.remove("usf-with-loader")},300)}},onExpand(){const e=this.id,t=this;if(this.isHorzFilters&&!usf.isMobile&&(this.$emit("onToggleAllFilters",1),te||(te=(e=>{e.target.closest(".usf-facet")||(t.$emit("onToggleAllFilters",1),g.off(document,"click",te))})),setTimeout(()=>g.on(document,"click",te),400)),"horz-scrolling-pills"==usf.settings.filters.filtersMobileStyle&&usf.isMobile){let e=this.$el.querySelector(".usf-title");e&&setTimeout(function(){e.scrollIntoView({behavior:"smooth"})},250)}this.onToggleFilter(e,0),this.isHorzFilters&&!usf.isMobile&&this.repositionPopover()},onCollapse(){var e=this.id;this.onToggleFilter(e,1)},onExpandCollapse(){this.collapsed?this.onExpand():this.onCollapse()},onClear(e){this.removeFacetFilter(this.id,null),g.stopEvent(e)},onRangeSliderInput(e){var t=this.facet,s=t.id,i=this.rangeDecimals;let r=this.facetFilters;r||(this.facetFilters=r={});var n=r[s];n||(n=[t.facetName,""],this.$set(r,s,n)),this.$set(n,1,[":"+e[0].toFixed(i)+" :"+e[1].toFixed(i)])},onRangeInput(e,t,s){var i=this.facet;if(i.inverseFormula){var r=this.rangeResolver(parseFloat(e.target.value)),n=s?[this.range[0],this.range[1]=r]:[this.range[0]=r,this.range[1]];return this.onRangeSliderInput(n),void this.onRangeSliderChange(n)}var a=i.min,l=i.max,c=this.range[0],u=this.range[1],h=i.id,f=this.facetFilters,d=parseFloat(e.target.value);if(isNaN(d))e.target.value=t.toString();else{d>l?d=l:d<a&&(d=a),1===s&&d<c?d=c:!s&&d>u&&(d=u);var p=[c,u];if(p[s]=d,this.isPrice&&p[0]===a&&p[1]===l)f&&this.$delete(this.facetFilters,h);else{var m=":"+p[0]+" :"+p[1];f||(this.facetFilters=f={});var g=f[h];g||(g=[i.facetName,""],this.$set(f,h,g)),this.$set(g,1,[m]),_usfaq.track("facetFilter",{term:_.term,filterFacetLabel:m.replace(/\:/g,"").replace(" ",":"),filterFacetName:i.title})}_.facetFilters=f,o.filterNavigation.scrollUpOnChange&&ae()}},onRangeSliderChange(e){const t=this.facetFilters;if(t){var s=this.facet,i=s.id;if(this.isPrice&&e[0]===s.min&&e[1]===s.max)this.$delete(t,i);else if(t[i]){var r=g.formatNumber,n=this.rangeDecimals;_usfaq.track("facetFilter",{term:_.term,filterFacetLabel:r(e[0],n)+":"+r(e[1],n),filterFacetName:s.title})}_.facetFilters=t,o.filterNavigation.scrollUpOnChange&&ae()}}}};usf.components.Filter=RVue.component("usf-filter",pe);var me={name:"FacetFilterOption",template:usf.templates.filterOption,props:{facet:Object,option:Object},emits:["onToggleFilter"],created(){const e=this.facet,t=e.displayMode;this.isSwatch=2===t,this.isBox=1===t;const s=this.option;let i=s.children;this.children=i&&i.length?i:null;let r=e.swatchImages?e.swatchImages[e.labelPrefix?e.labelPrefix+s.label:s.label]:null;!r||r.color||r.imageUrl||(r=null),this.swatchImage=r,this.swatchStyle=r?r.imageUrl?{backgroundImage:"url("+r.imageUrl+")"}:{backgroundColor:r.color}:null,this.label=i?s.collection.llabel||s.collection.label:ie(s,this.facet,this.swatchImage,usf.isMobile),this.showSwatchLabel=e.showSwatchLabel,this.swatchLabelDisplay=e.swatchLabelDisplay},data(){var e=this.option,t=e.children;return{collapsed:!(t=t&&t.length?t:null)||e.collection&&S.collection!==e.collection.urlName}},computed:{...e.mapWritableState(y,["facetFilters","mobileSelectedFacetId"]),isSelected(){const e=this.facet,t=e.id;let s,i=this.option;i.children&&(i=i.collection);var r=this.facetFilters?this.facetFilters[t]:null;r&&(r=r[1],s=(s=i.id)?s.toString():se(i));var n=r&&r.includes(s);if(v&&!n&&e.navigationCollections){var o=usf.collectionsByUrlName[v];n=o&&i.id===o.id}return!!n}},methods:{getChildLabel(e){switch(this.facet.navigationCollectionsChildType){case"link":var t=e.label,s=t.indexOf("](");return-1!==s?t.substring(1,s):t}return e.llabel||e.label},isChildSelected(e){return this.isSelected&&"tags"===this.facet.navigationCollectionsChildType&&ge(e.label)===S.tagUrlName},onChildClick(e){var t=this.facet,s=this.option.collection;switch(t.navigationCollectionsChildType){case"tags":location=S.getCollectionUrl(s.urlName+"/"+ge(e.label));break;case"productType":location=S.getCollectionUrl(s.urlName+"/ProductType:"+e.label);break;case"vendor":location=S.getCollectionUrl(s.urlName+"/Vendor:"+e.label);break;case"collections":location=S.getCollectionUrl(e.urlName);break;case"link":var i=e.label,r=i.indexOf("](");location=-1!==r?i.substring(r+2,i.length-1):i}},onToggleChildren(e){this.collapsed=!this.collapsed,g.stopEvent(e)},onToggle(){const e=_;var t=this.option,s=this.facet;if(s.navigationCollections){var i=t.collection,r=new usf.URLSearchParams(location.search);return r.delete("page"),void(location=S.getCollectionUrl(i?i.urlName:t.id)+(s.navigationCollectionsKeepMain?"":r.toString()))}var n=t.id;n=n?n.toString():se(t);var a,l=this.facetFilters,c=s.id;l&&(a=l[c]);var u=s.multiple,h=!0;if(a){var f=a[1],d=f.indexOf(n);-1===d?(u||f.splice(0,f.length),f.push(n)):(f.splice(d,1),h=!1),f.length||this.$delete(l,c)}else a=[s.facetName,[n]],l||(l={}),this.$set(l,c,a);l&&(e.facetFilters=l),s.multiple||(usf.isMobile?this.mobileSelectedFacetId=null:this.isHorzFilters&&this.$emit("onToggleFilter",s.id,1)),h&&_usfaq.track("facetFilter",{term:e.term,filterFacetLabel:se(t),filterFacetName:s.title}),o.filterNavigation.scrollUpOnChange&&ae()}}};function ge(e){return e.toLowerCase().replace(/[\s\:]/g,"-").replace(/--/g,"-")}usf.components.FilterOption=usf.register(me,null,"usf-filter-option");const ve={template:l.filters,name:"DefaultFacetFilters",data:()=>({collapsed:{},loadedItems:{}}),beforeMount(){this.__init()},created(){this.ff=null,this.selectedFilterOptionValues=null},mounted(){usf.isMobile&&document.body.appendChild(this.$el),a.add("mobile_changed",this.__onMobileChanged)},beforeDestroy(){a.remove("sr_updated",this.__onSrUpdated),a.remove("mobile_changed",this.__onMobileChanged);try{document.body.removeChild(this.$el)}catch(e){}},computed:{...e.mapWritableState(y,["mobileSelectedFacetId"]),...e.mapState(y,["facetFilters","facets","facetFilterIds","hasFacets"]),isSingleFacetMode(){return this.facets&&1===this.facets.length},mobileSelectedFacet(){return this.facets?this.facets.find(e=>e.id===this.mobileSelectedFacetId):null}},methods:{...e.mapActions(y,["removeAllFacetFilters","removeFacetFilter"]),__init(){this.__qr=_},__onMobileChanged(e,t){if(usf.isMobile)document.body.appendChild(this.$el);else{var s,i=this.$parent;do{var r=i.$el;if(s=r.querySelector(".usf-facets-container"))break;"usf_container"===r.id&&(s=r),i=i.$parent}while(i);s.insertBefore(this.$el,s.children[0])}},canShowFilter(e){if(void 0!==e.min)return e.min!==e.max;if(e.navigationCollections){var t=e.navigationCollectionsMenu;if(t)return t.length}return e.labels.length},formatBreadcrumbLabel:ne,formatFacetLabel:oe,onMobileBack(e){e||this.singleFacetMode?this.$el.classList.remove(window.USF_ON_CLASSNAME):this.mobileSelectedFacetId=null},onMobileSelectFacet(e){this.mobileSelectedFacetId=e?e.id:null},applyFacetFilters(e){this.__qr.facetFilters=e},selectFacetFilter(e){var t,s=e.facetName,i=e.id,r=this.facetFilters;r&&(t=r[i]),t||(t=[s,[]],r||(r={}),this.$set(r,i,t));var n=t[1],o="collections"===s;e.labels.forEach(e=>{-1===n.indexOf(e)&&n.push(o?e.id:e.label)}),this.__qr.facetFilters=r},onToggleFilter(e,t=1){this.$set(this.collapsed,e,t)},onToggleAllFilters(e=1){this.facets.forEach(t=>{this.$set(this.collapsed,t.id,e)})}}};function ye(e){var t=e.navigationCollectionsMenu;if(t){for(var s=e.labels,i=[],r=0;r<t.length;r++){var n=t[r],o=s.find(e=>e.id===n.collection.id);o?i.push(Object.assign({id:o.id,value:o.value},n)):e.navigationCollectionsKeepMain&&i.push(n)}return i}}usf.components.Filters=usf.register(ve,null,"usf-filters"),usf.components.PillFiltersBreadcrumb=RVue.component("usf-pill-filter-breadcrumb",{mixins:[ue],template:l.pillFiltersBreadcrumb});const be={props:{facet:Object},mixins:[de],template:l.pillFilter,computed:{...e.mapWritableState(y,["mobileSelectedFacetId"])},methods:{onClickFilter(){usf.utils.onMobileToggleFilters(),usf.isMobileFilter?this.mobileSelectedFacetId=this.facet?this.facet.id:null:usf.event.raise(`ff_${this.facet.id}_expand`)}}};usf.components.PillFilter=RVue.component("usf-pill-filter",be),usf.components.PillFilters=RVue.component("usf-pill-filters",{props:{useDND:{type:Boolean,required:!1,default:!1}},template:l.pillFilters,computed:{...e.mapWritableState(y,["mobileSelectedFacetId"]),...e.mapState(y,["facetFilters","facets","facetFilterIds"]),...e.mapState(w,["sortBy"])},data:()=>({drag:!1,startx:0,diffx:0}),methods:{onToggleFiltersMenu(){usf.utils.onMobileToggleFilters(),usf.isMobileFilter?this.mobileSelectedFacetId=null:setTimeout(function(){var e=document.querySelector(".usf-facets.usf-sr-filters .usf-body");e&&e.scrollTo({top:0})},200)},onSortByChanged(e){_.sort=e===this.sortByOptions[0].value?"":e},mouseDown(e){if(!this.useDND)return!1;this.drag=e.offsetX<=e.target.clientWidth,usf.utils.stopEvent(e),this.startx=e.clientX+this.$refs.scrollElement.scrollLeft,this.diffx=0},mouseUp(e){if(!this.useDND)return!1;this.drag&&(this.drag=null,usf.utils.stopEvent(e),this.animateScroll())},mouseMove(e){if(!this.useDND)return!1;this.drag&&(usf.utils.stopEvent(e),this.diffx=this.startx-(e.clientX+this.$refs.scrollElement.scrollLeft),this.$refs.scrollElement.scrollLeft+=this.diffx)},touchStart(e){if(!this.useDND)return!1;const t=e.touches[0];this.drag=!0,usf.utils.stopEvent(e),this.startx=t.clientX+this.$refs.scrollElement.scrollLeft,this.diffx=0},touchMove(e){if(!this.useDND)return!1;if(this.drag){usf.utils.stopEvent(e);const t=e.touches[0];this.diffx=this.startx-(t.clientX+this.$refs.scrollElement.scrollLeft),this.$refs.scrollElement.scrollLeft+=this.diffx}},touchEnd(e){if(!this.useDND)return!1;this.drag&&(this.drag=null,usf.utils.stopEvent(e),this.animateScroll())},animateScroll(){let e=1;const t=()=>{const s=Math.sin(e);s<=0?(this.diffx=0,window.cancelAnimationFrame(t),this.drag=!1):(this.$refs.scrollElement.scrollLeft+=this.diffx*s,e-=.04,window.requestAnimationFrame(t))};t()}}}),usf.components.PillDropDown=usf.register({methods:{renderTriggerButton(e){this.options;return e("button",{on:{click:this.onToggle},staticClass:"usf-btn",attrs:{type:"button"}},[e("span",this.placeholder),e("i",{attrs:{type:"button"},staticClass:"usf-icon usf-icon-up"})])}}},usf.components.DropDown,"usf-pill-dropdown");var we={data(){var e=_.term;return{loader:!1,itemsLoaded:0,itemsOffset:0,term:e,termModel:e,page:_.page,itemsPerPage:_.itemsPerPage,take:_.take,result:null,hasFacets:!0}},computed:{...e.mapState(y,["facetFilters","facetFilterIds"]),...e.mapWritableState(w,["sortBy","view"]),hasResults(){return this.result&&this.result.items.length},noFacets(){return!this.hasFacets&&!this.facetFilters},filtersCount(){return this.facetFilterIds.length}}},Se=o.search.more,xe="infinite"===Se,_e=xe||"more"===Se;const Fe=".usf-results [data-usf-pid]";var Pe={mixins:[we],template:l.searchResults,computed:{pagesTotal(){var e=this.result;return e&&e.total?Math.floor((e.total-1)/this.itemsPerPage+1):0}},created(){usf.search=this,this.showSearchBox=v?o.search.showSearchInputOnCollectionPage:o.search.showSearchInputOnSearchPage},beforeMount(){x.changed.push(()=>{var e=x.getChanges();if(e.length&&(1!==e.length||"usf_view"!==e[0])){x.snapshot();var t=this.term;if(this.term=this.termModel=_.term,this.sortBy=_.sort,this.view=_.view,_e){var s=this.take,i=this.take=_.take;if(i>s)return void usf.fetch(this,1);if(i<s&&t==this.term&&this.result)return this.result.items.splice(i,this.result.items.length-i),void(this.itemsLoaded=i);_.take=0,this.itemsOffset=0}else this.page=_.page,this.itemsPerPage=_.itemsPerPage;_.isViewChanged(e)&&this.refresh()}}),J&&window.addEventListener("pageshow",()=>{Oe=0,x.snapshot(),a.raise("resetstate")}),x.snapshot(),this.refresh()},mounted(){setTimeout(()=>{if((xe||_e)&&ke(this),g.installSearchInput(this.$refs.searchInput),o.showGotoTop){var e=document.createElement("div");e.classList.add("usf-goto-top"),document.body.appendChild(e),g.on(e,"click",function(e){g.scrollTo(0,800)}),g.on(document,"scroll",function(e){window.scrollY>170?document.body.classList.add("usf-with-goto-top"):document.body.classList.remove("usf-with-goto-top")},{passive:!0})}},100)},methods:{onInfiniteLoad(){this.onLoadMore()},onRedirect(e){location=e},onSortByChanged(e){"/search"===location.pathname?_.sort="r"===e?"":e:_.sort=e===this.sortByOptions[0].value?"":e},clearSearch(){this.termModel="",_.term="";var e=this.$refs.searchInput;e.value="",e.focus()},onGridViewClick(){_.view="",this.$nextTick(()=>{a.raise("sr_viewChanged",this,"grid")})},onListViewClick(){_.view="list",this.$nextTick(()=>{a.raise("sr_viewChanged",this,"list")})},onLoadMore(){_.take=this.itemsLoaded+o.search.itemsPerPage},onLoadPrev(){this.itemsOffset-=o.search.itemsPerPage,usf.fetch(this,2)},refresh(){usf.fetch(this)},onMobileToggle(){g.onMobileToggleFilters()}}};usf.components.SearchResults=usf.register(Pe,null,"usf-sr");var Ie={props:{position:String,banner:Object},template:l.searchResultsBanner},Ce,Me,Re,Te,Le,Oe;function Ue(e){if((Me||(Me=document.getElementById("usf-sr-top-loader")),Me)&&Me.getBoundingClientRect().top>=0){Ce=!1;var t=document.querySelector(Fe);if(t){Le=t.getAttribute("data-usf-pid");var s=t.getBoundingClientRect();Te=s.top,e.onLoadPrev()}return}}function ke(e){function t(){if(Re=null,Me=null,Ce=!0,Te){var e=document.querySelector('.usf-results [data-usf-pid="'+Le+'"]').getBoundingClientRect();window.scrollBy(0,e.top-Te),Te=0}}function s(){setTimeout(t,100)}a.add("sr_updated",s),e.result&&s(),document.addEventListener("scroll",function(t){xe&&!e.loader&&e.itemsLoaded<e.result.total&&(Re||(Re=document.querySelector(".usf-sr-paging")),Re&&Re.getBoundingClientRect().top<=window.innerHeight&&e.onInfiniteLoad());Ce&&Ue(e)},{passive:!0})}function De(){for(var e=usf_container.querySelectorAll(Fe),t=0;t<e.length;t++){var s=e[t],i=s.getBoundingClientRect();if(i.top>0||i.bottom>0){var r=s.getAttribute("data-usf-pid");return void $e(usf.search.itemsOffset+t,r,i.y)}}}function $e(e,t,s){if(!Oe){Oe=1;var i=o.search.itemsPerPage,r={id:t,take:(Math.floor(e/i)+1)*i,y:s};try{sessionStorage.setItem("usfVP",JSON.stringify(r))}catch(e){}}}function Ee(e,t){return{type:"page",page:e,current:t}}usf.components.SearchResultsBanner=usf.register(Ie,null,"usf-sr-banner");var Ne={props:{page:Number,pagesTotal:Number,pagesToDisplay:{type:Number,default:4},sidePagesToDisplay:{type:Number,default:1}},template:l.searchResultsPages,computed:{elements(){var e=this.pagesTotal;if(e<=1)return[];var t=this.page,s=this.pagesToDisplay,i=this.sidePagesToDisplay,r=t>s/2+2&&e>s+1,n=e>s+1&&t<e-(s/2+1),o=[];t>1&&o.push({type:"prev"});var a=1;if(r){for(var l=1;l<=i;l++)o.push(Ee(l));a=i+1,o.push({type:"dots"})}else for(l=a;l<t-s/2;l++)o.push(Ee(l));for(l=0;l<s/2;l++){(c=t-s/2+l)<a||o.push(Ee(c))}o.push(Ee(t,!0));for(l=0;l<s/2;l++){var c;if((c=t+l+1)>e)break;c<a||(o.push(Ee(c)),a++)}if(n){o.push({type:"dots"});for(l=e-i+1;l<=e;l++)o.push(Ee(l))}else for(l=t+s/2+1;l<=e;l++)o.push(Ee(l));return t<e&&o.push({type:"next"}),o},prevUrl(){return this.getPageUrl(this.page-1)},nextUrl(){return this.getPageUrl(this.page+1)}},methods:{getPageUrl:e=>_.getPageUrl(e),onPrev(e){_.page=this.page-1,ae(),g.stopEvent(e)},onNext(e){_.page=this.page+1,ae(),g.stopEvent(e)},onPage(e,t){return e!==this.page&&(_.page=e,ae()),g.stopEvent(t)}}};usf.components.SearchResultsPages=usf.register(Ne,null,"usf-sr-pages");var Be=o.search.priceUnit||"",Ae,He=o.search.imageSize,Ve;if(He){var f=He.split(",");He=f[usf.isMobile&&f.length>1?1:0],o.search.imageSize=He}switch(o.search.imageSizeType){case"dynamic":Ae="{size}";break;case"fixed":Ae=He}function je(e){var t=e.product,s=t.variants,i=t.selectedVariantId;!i&&usf.queryRewriter.facetFilters&&1==e.product.variants.length&&(i=e.product.variants[0].id);var r,n,a,l=i?s.find(e=>e.id===i):null,u=l||(s.length?s[0]:null),h=u.compareAtPrice,f=u.price,d=h>f?h-f:0,p=S.collection,m=S.getProductUrl(p,t,l);if(l)r=l.available,n=1&l.flags,a=r>0||-2147483648===r;else{r=0;for(var v=0;v<s.length;v++){var y=s[v];if(-2147483648===y.available){r=-2147483648,n=!1,a=!0;break}r+=y.available,y.available>0&&(a=!0),1&y.flags&&(n=!0)}}var b=!!d;e.collection=p,e.productUrl=m,e.available=r,e.hasDiscount=b,e.continueSelling=n,e.isSoldOut=!n&&!a,e.price=f,e.compareAtPrice=h,e.originalPrice=h>f?h:f,e.displayPrice=g.getDisplayPrice(e.originalPrice)+Be,e.displayDiscountedPrice=g.getDisplayPrice(e.price)+Be,b&&(e.displayDiscount=g.getDisplayPrice(d)+Be,e.discount=d),e.selectedVariant=l,e.selectedVariantForPrice=u,e.loc=c,e.scaledSelectedImageUrl=e.getSelectedImageUrl(Ae),e.selectedImage=g.getProductImage(e.product,e.selectedVariant),e.hoverImage=o.search.showAltImage&&!i?dt(t):null}function qe(e){}function ze(e){e.c||(Ve=1)}var We={props:{product:Object,term:String,result:Object,imageSize:{type:String,default:"list"}},created(){je(this)},data:()=>({isHover:!1,c:1}),computed:{salePercent(){if(ze(this),!this.hasDiscount)return 0;var e=this.selectedVariantForPrice;return Math.ceil(100-100*e.price/e.compareAtPrice)},minPrice(){var e=this.originalPrice;return this.product.variants.forEach(t=>{var s=t.compareAtPrice,i=t.price,r=s>i?s:i;r<e&&(e=r)}),e},maxPrice(){var e=this.originalPrice;return this.product.variants.forEach(t=>{var s=t.compareAtPrice,i=t.price,r=s>i?s:i;r>e&&(e=r)}),e},minDiscountedPrice(){var e=this.price;return this.product.variants.forEach(t=>{var s=t.price;s<e&&(e=s)}),e},maxDiscountedPrice(){var e=this.price;return this.product.variants.forEach(t=>{var s=t.price;s>e&&(e=s)}),e},priceVaries(){return this.minDiscountedPrice!==this.maxDiscountedPrice},displayMinPrice(){return g.getDisplayPrice(this.minPrice)+Be},displayMaxPrice(){return g.getDisplayPrice(this.maxPrice)+Be},displayMinDiscountedPrice(){return g.getDisplayPrice(this.minDiscountedPrice)+Be},displayMaxDiscountedPrice(){return g.getDisplayPrice(this.maxDiscountedPrice)+Be},displayLongPrice(){return ze(this),g.getLongDisplayPrice(this.originalPrice)+Be},displayLongDiscount(){return ze(this),g.getLongDisplayPrice(this.discount)+Be},displayLongDiscountedPrice(){return ze(this),g.getLongDisplayPrice(this.price)+Be},image(){var e;return qe("image"),ze(this),this.isHover&&(e=this.hoverImage),e||this.selectedImage},scaledHoverImageUrl(){return this.getHoverImageUrl(Ae)},imageUrl(){return qe("imageUrl"),ze(this),this.getImageUrl(this.imageSize)},selectedImageUrl(){return qe("selectedImageUrl"),ze(this),this.getSelectedImageUrl(this.imageSize)},hoverImageUrl(){return qe("hoverImageUrl"),ze(this),this.getHoverImageUrl(this.imageSize)},originalImageUrl(){return qe("originalImageUrl"),ze(this),this.getImageUrl()},originalSelectedImageUrl(){return qe("originalSelectedImageUrl"),ze(this),this.getSelectedImageUrl()},originalHoverImageUrl(){return qe("originalHoverImageUrl"),ze(this),this.getHoverImageUrl()},scaledImageUrl(){return qe("scaledImageUrl"),ze(this),this.getImageUrl(Ae)},pluginData(){return{product:this.product,isHover:this.isHover,result:this.result,owner:this}}},methods:{reset(){this.isHover=!1},onItemClick(e){var t=e.target.closest("[data-usf-pid]"),s=this.product;_usfaq.track("productClick",{url:this.productUrl,id:s.id,title:s.title,variantId:s.selectedVariantId,imageUrl:this.imageUrl,term:this.term});for(var i=usf_container.querySelectorAll(Fe),r=usf.search.itemsOffset,n=0,o=0;o<i.length;o++){var a=i[o];if(a===t){r+=o,n=a.getBoundingClientRect().y;break}}$e(r,s.id,n)},onItemHover(){this.isHover=!0},onItemLeave(){this.isHover=!1},getImageUrl(e){var t,s=this.product;return this.isHover&&(t=this.getHoverImageUrl(e)),t||g.getProductImageUrl(s,this.selectedVariant,e)},getSelectedImageUrl(e){return g.getProductImageUrl(this.product,this.selectedVariant,e)},getHoverImageUrl(e){if(o.search.showAltImage){var t=this.product;if(!t.selectedVariantId)return pt(t,e)}},getMetafield(e,t){return g.getMetafield(this.product,e,t)},setSelectedVariantId(e){var t=this.product,s=t.variants.find(t=>t.id===e);if(s)return t.selectedVariantId=e,je(this),this.c++,this.$forceUpdate(),s}}};usf.components.SearchResultsItemBase=We;var Xe={mixins:[We],template:l.searchResultsGridViewItem};usf.components.SearchResultsGridItem=usf.register(Xe,null,"usf-sr-griditem");var Ye={mixins:[We],template:l.searchResultsListViewItem};usf.components.SearchResultsListItem=usf.register(Ye,null,"usf-sr-listitem"),a.add("is_show",at);var Je,Ke={},Ge,Qe;const Ze=o.instantSearch;var et="full"==Ze.layout,tt="one-column"===Ze.layout,st="two-columns"===Ze.layout,it=Ze.productDisplayType;const rt=400,nt=858,ot=e=>st&&"list"===it?Math.min(e,580):Math.min(e,640);function at(t){if(!Qe){Ge=o.search.online?S.baseUrl+o.search.searchResultsUrl:S.searchUrl;var s=document.createElement("div");document.body.appendChild(s);var i={pinia:lt,mixins:[we],el:s,template:l.instantSearch,data:()=>({left:0,top:0,width:0,show:!1,firstLoader:!0,loader:!0,term:t.value,result:null,showManualSuggestion:Ze.showManualSuggestion,showRecentSearches:Ze.showRecentSearches,showPopularProducts:Ze.showPopularProducts,showPopularSearch:Ze.showPopularSearch}),beforeCreate(){let e=[];if(Ze.showManualSuggestion){let t=Ze.manualSuggestions;if("string"==typeof e)try{e=JSON.parse(t)}catch(t){e=[]}else Array.isArray(t)&&(e=t)}this.manualSuggestions=e;const t=Ze.showManualSuggestion&&e&&e.length;this.hasManualSuggestion=t},computed:{...e.mapState(w,["recentlySearches"]),isEmpty(){var e=this.result;return!(e&&(e.items.length||e.pages&&e.pages.length||e.collections&&e.collections.length))},isEmptyExtraData(){return!this.result||(!(!this.queryOrTerm||this.hasSuggestions||this.hasPages||this.hasCollections||this.hasPopularSearch)||!(this.queryOrTerm||this.hasManualSuggestion||this.hasRecentlySearches))},hasRecentlySearches(){return this.showRecentSearches&&this.recentlySearches&&this.recentlySearches.length},hasPopularSearch(){if(!this.queryOrTerm)return!1;var e=this.result;return this.showPopularSearch&&this.popularSearch&&e.popularSearch.length},hasSuggestions(){if(!this.queryOrTerm)return!1;var e=this.result;return e.suggestions&&e.suggestions.length},hasPages(){if(!this.queryOrTerm)return!1;var e=this.result;return e.pages&&e.pages.length},hasCollections(){if(!this.queryOrTerm)return!1;var e=this.result;return e.collections&&e.collections.length},hasRecentlySearches(){return this.showRecentSearches&&this.recentlySearches&&this.recentlySearches.length},hasSuggestions(){if(!this.queryOrTerm)return!1;var e=this.result;return e.suggestions&&e.suggestions.length},hasProductsOnly(){var e=this.result;return e&&(!e.pages||!e.pages.length)&&(!e.collections||!e.collections.length)},queryOrTerm(){var e=this.result;return e?e.query:this.term},termDiffers(){return!this.loader&&this.result.query.trim()!==this.term.trim().toLowerCase()}},methods:{...e.mapActions(w,["addRecentlySearches"]),focus(){var e=this.$el.querySelector("input");e&&e.focus()},close(){this.show=0,this.popupFocus=!1,document.documentElement.classList.remove("usf-no-scroll")},onSearchBoxInput(e){this.updateTerm(e.target.value)},onClear(){this.updateTerm(""),this.$refs.searchInput.focus()},updateResults(e){var t=this;Je&&Je.abort(),t.loader=!e||"more";var s=usf._refineTerm(t.term);e||(t.itemsLoaded=0);var i={q:s,apiKey:o.siteId};s?t.sortBy&&"r"!==t.sortBy&&(i.sort=t.sortBy):i.sort="bestselling",e&&(i.skip=t.itemsLoaded);var r=s?Ze.numOfProductMatches:Ze.numOfPopularProducts;i.take=r||6;var n=S.customerTags;n&&n.length&&(i.customerTags=n.join(","));var l=S.country;l&&(i.country=l);var c=S.locale;c&&(i.locale=c),Ze.showCollections&&(i.showCollections=1),Ze.showPages&&(i.showPages=1),this.onSendingData(i),a.raise("is_updating",this,i);var u=JSON.stringify(i);function h(e){Ke[u]=e,Je=null,t.loader=!1,t.firstLoader=!1,e=JSON.parse(e),usf.currency=e.data.currency,a.raise("is_dataReceived",this,e.data),t.onDataReceived(i,e.data),t.$nextTick(()=>{a.raise("is_updated",this,t.result),t.__init()})}var f=Ke[u];f?h(f):Je=g.send({url:o.searchSvcUrl+"instantsearch",data:i,success:h,error:function(e){Je=null,t.loader=!1}})},onSearhBoxSubmit(e){this.term&&this.addRecentlySearches(this.term)}},beforeMount(){usf.instantSearch=this,this.searchUrl=Ge,this.settings=Ze,a.add("is_hide",this.close)},beforeDestroy(){a.remove("is_hide",this.close)}};usf.components.InstantSearchBase=i;const n={mixins:[i],template:l.instantSearch,data:{popupFocus:!1,position:"right",maxHeight:0},computed:{shouldShow(){var e=this.result;let t=o.instantSearch;if(this.show||this.popupFocus){if(this.queryOrTerm)return!0;if(usf.isMobile||et||t.showPopularProducts&&e&&e.items&&e.items.length>0||t.showRecentSearches&&this.recentlySearches&&this.recentlySearches.length>0||t.showManualSuggestion&&this.manualSuggestions&&this.manualSuggestions.length>0)return!0}return!1}},beforeMount(){a.add("resize",this.onResize),document.body.addEventListener("mousedown",this.onMouseDownBody),document.body.addEventListener("mouseup",this.onMouseUpBody)},methods:{...e.mapActions(w,["removeRecentSearchAtIndex","clearAllRecentSearches","removeRecentSearchAtIndex"]),__init(){},onMouseDownBody(e){if(this.shouldShow){for(var t=e.target;t&&t!==this.$el&&t!==this.input;){if(t===document.body){var s={cancel:!1};return a.raise("is_hiding",this,s),s.cancel?(this.popupFocus=!0,void g.stopEvent(e)):void usf.utils.hideInstantSearch()}t=t.parentNode}this.popupFocus=!0}},onMouseUpBody(e){this.shouldShow&&setTimeout(()=>{this.input.value||(this.popupFocus=!1)},100)},onResize(e){this.show&&this.reposition(this.input)},onSendingData(e){},onDataReceived(e,t){Ke[e.q]=this.result=t},onItemClick(e){},selectCollection(e){location=S.getCollectionUrl(e.urlName)},selectPage(e){location=S.getPageUrl(e)},updateTerm(e){this.term=e,(usf.isMobile||et)&&(this.input.value=e),this.updateResults()},search(e){this.show=0,this.popupFocus=!1,this.addRecentlySearches(e);var t=Ge;location.pathname===t&&o.search.online||window.usf_container&&this.input.closest(".usf-sr-inputbox")?(this.input.value=e,_.term=e):location=t+"?"+_.getTermQuery(e),window.usf_container&&usf_container.click(),g.hideInstantSearch()},reposition(e){var t=this;if(this.input=e,usf.isMobile)return document.documentElement.classList.add("usf-no-scroll"),t.show=1,t.term=e.value,setTimeout(t.focus,170),void t.updateResults();var s=e.getBoundingClientRect(),i={x:s.x+window.scrollX,y:s.y+window.scrollY,top:s.top};function r(s){var i,r=s.x,n=s.y+e.offsetHeight,o=e.offsetWidth,a=o,l=window.innerWidth;a<nt&&(a=nt),tt&&a>rt&&(a=rt),r+a>l-20?(r=r+o-a)<0?(i="middle",r=(l-a)/2):i="right":i="left",t.left=r,t.top=n,t.width=a,t.show=1,t.term=e.value,t.position=i;const c=window.innerHeight-s.top-e.offsetHeight-16-50;t.maxHeight=ot(c)}r(i),this._posTimeout&&clearInterval(this._posTimeout);var n=0;this._posTimeout=setInterval(()=>{if(this.shouldShow){var t=G(e);if(i.y!==t.y||i.x!==t.x){if(!e.offsetWidth&&!e.offsetHeight||t.y<0)return clearInterval(this._posTimeout),void usf.utils.hideInstantSearch();r(t)}++n>=25&&clearInterval(this._posTimeout)}else clearInterval(this._posTimeout)},200)}},beforeDestroy(){a.remove("resize",this.onResize),document.body.removeEventListener("mousedown",this.onMouseDownBody),document.body.removeEventListener("mouseup",this.onMouseUpBody)}};usf.components.InstantSearch=n;const c={mixins:[n],template:l.instantSearchFull,data:{tab:"products"},beforeMount(){a.add("resize",this.onResize),document.body.addEventListener("keyup",this.onPressEsc),a.add("is_updated",this.__onIsUpdated)},methods:{onPressEsc(e){"Escape"===e.key&&this.shouldShow&&this.close()},onResize(e){this.show&&this.reposition(this.input)},reposition(e){var t=this;this.input=e,document.documentElement.classList.add("usf-no-scroll"),t.show=1,t.term=e.value,setTimeout(t.focus,170),t.updateResults()},__onIsUpdated(){const e=this.result;0===e.items.length?e.collections&&e.collections.length?this.tab="collections":e.pages&&e.pages.length&&(this.tab="pages"):this.tab="products"}},beforeDestroy(){a.remove("resize",this.onResize),document.body.removeEventListener("keyup",this.onPressEsc),a.remove("is_updated",this.__onIsUpdated)}};usf.components.FullInstantSearch=c;var r={mixins:[usf.components.SearchResultsItemBase],template:l.instantSearchItem,imageSize:"small",methods:{onItemClick(){var e=this.product;Qe.onItemClick(e),_usfaq.track("productClick",{url:this.productUrl,id:e.id,title:e.title,variantId:e.selectedVariantId,imageUrl:this.imageUrl,term:this.term}),location=this.productUrl}}};usf.components.InstantSearchItem=usf.register(r,null,"usf-is-item"),a.raise("is_init",this),Qe=et&&!usf.isMobile?new RVue(usf.components.FullInstantSearch):new RVue(usf.components.InstantSearch)}Qe.reposition(t),Qe.updateResults(),setTimeout(()=>Qe.show=1,0)}RVue.use(e.PiniaVuePlugin);const lt=e.createPinia();a.add("init",function(){var e=window.usf_container;if(!e||!usf._canLoadContainer)return;v=S.collection;const t=usf.app=new RVue({pinia:lt,el:e,template:l.app,data:{collection:null,settings:o,hasFilters:!usf.isMobile||"horz-scrolling-pills"===o.filters.filtersMobileStyle},mounted(){usf.settings=o=this.settings,a.raise("mounted")},methods:{__onSrUpdated(e,t){const s=y();var i=t.facets;s.setFacets(i)},__init(){const e=y();if(a.add("sr_updated",this.__onSrUpdated),usf.search){var t=usf.search.result;t&&__onSrUpdated(null,{facets:t.facets})}e.setFacetFilters(_.facetFilters),_.addChangedEventListener(()=>{e.setFacetFilters(_.facetFilters)})}},beforeMount(){this.__init()},beforeDestroy(){a.remove("sr_updated",this.__onSrUpdated)}});a.add("sr_updated",function(){var e=S.collection;if(e){var s=usf.collectionsByUrlName[e];t.$set(usf.app,"collection",s||{title:"All products"})}}),a.add(["mobile_changed","rerender"],function(){yt(t);var e=usf.instantSearch;e&&yt(e)}),a.add("resetstate",function(){!function e(t){t.$children.forEach(t=>e(t)),t.reset&&t.reset()}(t)})});var ct={functional:!0,name:"UsfPlugin",props:{name:String,data:Object},render(e,t){var s=usf.plugins.invoke("render_"+t.props.name,[t.parent,e,t.props.data]);return usf.plugins.lastRenderResult=s,s}};function ut(e,t,s){for(var i=0,r=0,n=function(){++r===i&&t()},o=document.head.children,a=0,l=0;l<o.length;l++){var c=o[l],u=c.src;u&&u.includes(e)&&(i++,c.addEventListener("load",n),a++)}!a&&s&&s(a)}function ht(e,t){return e&&t?(t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),e.replace(new RegExp(t,"gi"),e=>'<span class="usf-highlight">'+e+"</span>")):e}usf.components.Plugin=usf.register(ct,null,"usf-plugin"),Object.assign(g,{registerScriptsLoadedCallback(e,t,s,i,r,n){var o;e?s():(i&&(o=setTimeout(r,i)),ut(t,function(){setTimeout(s,30),i&&clearTimeout(o)},n))},getMetafield(e,t,s){var i=e.metafields&&e.metafields.find(e=>e.namespace===t&&e.key===s);return i&&i.value?i.value:""},getProductImage(e,t){var s,i=0,r=e.images;r&&(t&&(s=t.imageIndex)>0&&s<r.length&&(i=s));return r&&r[i]||S.emptyImage},getProductImageUrl(e,t,s){var i,r=0,n=e.images;n&&(t&&(i=t.imageIndex)>0&&i<n.length&&(r=i));return n=n&&n[r],S.getImageUrl((n?n.url:null)||S.emptyImage.url,s)},isVariantSoldOut(e){var t=e._s;if(void 0!==t)return t;-2147483648===e.available?t=!1:t=!(1&e.flags)&&e.available<=0;return e._s=t,t},getDisplayPrice:e=>usf.currencyConverter.format(e),getLongDisplayPrice:e=>usf.currencyConverter.format(e,1),formatNumber:vt,format:function(e){for(var t=1;t<arguments.length;t++)e=e.replace("{"+(t-1)+"}",arguments[t]);return e},encodeHtml:e=>e.replace(/</g,"&lt;"),highlight:ht,ensureMobile(e){var t=document.body.clientWidth;if(t!==gt||!0===e){gt=t;var s=t<o.mobileBreakpoint;s!==usf.isMobile&&(usf.isMobile=s,usf.isMobileFilter=s&&!o.filters.desktopLikeMobile,document.body.classList[usf.isMobile?"add":"remove"]("usf-mobile"),s||(usf.app.hasFilters=!0),a.raise("mobile_changed")),a.raise("resize",null,{width:t})}},scrollTo(e,t){if(J)return window.scrollTo(0,e);const s=document.scrollingElement,i=s&&s.scrollTop||window.pageYOffset,r=e-i;let n=0;const o=function(){const e=(s=n+=20,a=i,l=r,(s/=t/2)<1?l/2*s*s*s+a:l/2*((s-=2)*s*s+2)+a);var s,a,l;window.scrollTo(0,e),n<t&&requestAnimationFrame(o)};o()}});var ft=g.format;function dt(e){var t=e.images;return t=t&&t.length>1&&t[1]}function pt(e,t){var s=e.images;return s&&s.length>1&&S.getImageUrl(s[1].url,t)}var mt=1.7976931348623157e308,gt;function vt(e,t){void 0===t&&(t=o.decimals);var s,i=usf.currency.decimalSeparator,r=usf.currency.thousandSeparator,n=o.useTrailingZeros,a=Math.pow(10,t);if(s=Math.round(e*a).toString(),t){var l=s.length;if(l>t){var c,u=l-t,h=s.substr(u);if(n)if(h.length<t)for(;h.length<t;)h+="0";else{for(var f=h.length-1;f>t&&"0"==h[f];)f--;f++,h=h.substr(0,f)}else{c=!0;for(var d=h.length-1;d>=0;){if("0"!==h[d]){c=!1;break}d--}d++,!c&&d<h.length&&(h=h.substr(0,d))}s=c?s.substr(0,u):s.substr(0,u)+i+h}else if(n){for(;s.length<t;)s="0"+s;s="0"+i+s}else if("0"!==s){for(;s.length<t;)s="0"+s;s="0"+i+s}}return r?s.replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+r):s}function yt(e){e.$children.forEach(e=>yt(e)),e.$forceUpdate()}function bt(e,t,s){var i;return function(){var r=this,n=arguments;clearTimeout(i),i=setTimeout(function(){i=null,s||e.apply(r,n)},t),s&&!i&&e.apply(r,n)}}function wt(e){return":"===e[0]?e.substring(1):e}g.ready(function(){gt=document.body.clientWidth,window.addEventListener("resize",g.ensureMobile)}),usf._ios=J,usf.currencyConverter={format(e,t){var s=usf.currency;return ft(t?s.longFormat:s.format,vt(e,s.hasDecimals?void 0:0))},convertPrice:e=>e}}();

/* Begin plugin code */
!function(){window.UsfProductPreviewCache={};var e=usf.utils,t=e.isVariantSoldOut,s={},i={props:{option:Object,index:Number},render(e){var t=this.$parent,s=t.args.result.facets,i=this.option,a=i.name,n=this.index,r=((usf.settings.plugins["preview-usf"]||{}).displayType||{})[a];if(void 0===r){var l=s.find(e=>e.facetName==="option:"+a);l||(l={display:"List"}),"List"===l.display&&(r="select")}return"select"===r?e("div",{class:"usf-preview__option usf-preview__field"},[e("label",a),e("select",{domProps:{value:t.selectedOptions[n]},on:{input:e=>t.selectOptionValue(n,parseInt(e.target.value))}},i.values.map((s,i)=>e("option",{domProps:{value:i,disabled:!t.availableOptions[n]||!t.availableOptions[n][i]}},[s])))]):e("div",{class:"usf-preview__option usf-preview__field usf-facets"},[e("label",a),e("div",{staticClass:"usf-facet-values usf-facet-values--"+l.display,class:{"usf-facet-values--circle":l.circleSwatch}},i.values.map((s,i)=>{var a=l.swatchImages?l.swatchImages[s]:null,r=!t.availableOptions[n]||!t.availableOptions[n][i];return e("button",{staticClass:"usf-btn usf-relative usf-facet-value usf-facet-value-single",class:{"usf-selected":t.selectedOptions[n]===i,"usf-disabled":r},on:r?null:{click:()=>t.selectOptionValue(n,i)},style:a?{background:a.imageUrl?"url("+a.imageUrl+")":a.color}:null,domProps:{title:s+(r?" (option not available)":""),type:"button"}},[e("span",{class:"usf-label"},[s])])}))])}};usf.components.PreviewModalOption=usf.register(i,null,"usf-preview-modal-option");var a={props:{value:Number,name:String,min:Number,max:Number,disabled:Boolean},methods:{onInput(e){var t;this.disabled||(e.target?t=e.target.value:((t=parseInt(this.value)+e)<this.min&&(t=this.min),t>this.max&&(t=this.max)),this.$emit("input",t))}},render(e){var t={name:this.name,type:"number",step:"1",min:this.min,max:this.max,pattern:"[0-9]*",inputmode:"numeric"};return this.disabled&&(t.disabled=!0),e("div",{class:"usf-c-num-input"},[e("input",{attrs:t,domProps:{value:this.value},on:{change:this.onInput}}),e("div",{class:"usf-c-num-input__m",on:{click:()=>this.onInput(-1)}}),e("div",{class:"usf-c-num-input__p",on:{click:()=>this.onInput(1)}})])}};function n(i){var a=i.product,n=a.selectedVariantId;n=n?a.variants.find(e=>e.id===n):a.variants[0];var r,l=a.images;l.length?r=e.getProductImageUrl(a,n):(l=[usf.platform.emptyImage],r=l[0].url);var o=l.findIndex(e=>e.url===r);const u=`preview-usf-${a.id}`,d=UsfProductPreviewCache[u];if(d)return d.open({selectedVariant:n,imageIndex:o,imageUrl:r});var c=document.createElement("div");document.body.appendChild(c),UsfProductPreviewCache[u]=new RVue({el:c,template:usf.templates.previewPluginModal,data:{args:i,popupId:u,description:s[a.id],imageUrl:r,imageIndex:o,imageMaxHeight:600,imageMaxWidth:340,images:l,quantity:1,selectedOptions:{},selectedVariant:n,loc:usf.settings.translation,product:a,mainImagePosition:"left",showImageIndices:!0,showThumbs:l.length>1,thumbDirection:"horizontal",slidesToShow:4,visible:!1},created(){this.settings=usf.settings.plugins["preview-usf"]||{},this.visible=!0},beforeMount(){if(e.on(document,"keydown",this.onEscapeKeyUp),n&&this.selectVariant(n),!this.description){var t=this.product.id;usf.utils.send({url:usf.settings.searchSvcUrl+"products",data:{apiKey:usf.settings.siteId,id:t,fields:"description"},success:e=>{e=JSON.parse(e),s[t]=this.description=e.data.description}})}},beforeDestroy(){e.off(document,"keydown",this.onEscapeKeyUp)},mounted(){this.onAddAnimationClass()},computed:{selectedVariantForPrice(){return this.selectedVariant},available(){if(this.isSoldOut)return 0;var e=this.selectedVariant,t=e.available;return 1&e.flags||-2147483648===t?1e6:t},showBigImageNav(){return this.images.length>1},showThumbNav(){return this.images.length>1},productUrl(){return usf.platform.getProductUrl(usf.platform.collection,a,this.hasAvailableVariant?this.selectedVariant:null)},hasDiscount(){var e=this.selectedVariant;return e.compareAtPrice>e.price},isSoldOut(){var e=this.selectedVariant;return t(e)},availableOptions(){var e={};return a.variants.forEach(s=>{t(s)||s.options.forEach((t,s)=>{e[s]||(e[s]={}),e[s][t]=1})}),e},hasAvailableVariant(){for(var e=this.selectedOptions,s=Object.keys(e).length,i=0,n=0;n<a.variants.length;n++){var r=a.variants[n];if(!t(r)){i=0;for(var l=0;l<r.options.length;l++){var o=r.options[l];e[l]===o&&i++}if(i===s)return!0}}return!1}},methods:{onEscapeKeyUp(e){27===e.which&&this.visible&&this.onClose()},onAddAnimationClass(){},open(e){this.selectedVariant=e.selectedVariant,this.imageIndex=e.imageIndex,this.imageUrl=e.imageUrl,this.visible=!0,this.selectVariant(e.selectedVariant),this.onAddAnimationClass()},onClose(){this.visible=!1},onThumbClick(e){var t=this.selectImage(e),s=a.variants.find(e=>e.imageIndex===t);s&&this.selectVariant(s)},onPrevImage(e){this.navigate(-1,e)},selectImage(e){var t;return"number"==typeof e?(t=e,e=a.images[e]):t=a.images.indexOf(e),this.imageUrl=e.url,this.imageIndex=t,t},onNextImage(e){this.navigate(1,e)},navigate(e,t){var s=this.imageIndex+e;s<0?s=this.images.length-1:s>=this.images.length&&(s=0),this.onThumbClick(this.images[s])},selectVariant(e){this.selectedVariant=e,a.options.forEach((t,s)=>{this.$set(this.selectedOptions,s,e.options[s])})},selectOptionValue(e,t){this.$set(this.selectedOptions,e,t),a.options;for(var s=a.variants,i=0;i<s.length;i++){for(var n=s[i],r=n.options,l=!0,o=0;o<r.length;o++)if(r[o]!==this.selectedOptions[o]){l=!1;break}if(l){this.selectedVariant=n,n.imageIndex>=0&&n.imageIndex<a.images.length&&this.selectImage(n.imageIndex);break}}}}})}usf.components.PreviewNumInput=usf.register(a,null,"usf-preview-num-input"),usf.event.add("preview_show",(e,t)=>n(t));var r={props:{loc:Object,args:Object},template:usf.templates.previewPlugin,created(){this.settings=usf.settings.plugins["preview-usf"]||{}},methods:{onShowModal(t){return n(this.args),e.stopEvent(t)}}};usf.plugins.push({render_searchResultsProductPreview:(e,t,s,i)=>[i(),t(r,{props:{loc:usf.settings.translation,args:s}})]})}();

/* End plugin code */
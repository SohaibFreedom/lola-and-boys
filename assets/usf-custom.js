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
             <span>Irina's Favourite</span>
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

/* Begin theme ready code */
if (usf.settings.instantSearch.online && usf.isMobile) {
    // click on search icon -> show our instant search
    var searchIcon = document.querySelector('#header .icon-search.dropdown_link');
    if (searchIcon)
        searchIcon.addEventListener('click',function(){
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
        });

}
/* End theme ready code */
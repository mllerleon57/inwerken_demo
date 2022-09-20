/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/UriParameters","sap/ui/thirdparty/hasher","sap/ui/fl/Layer"],function(e,r,t){"use strict";var n=[t.BASE,t.VENDOR,t.PARTNER,t.CUSTOMER_BASE,t.CUSTOMER,t.PUBLIC,t.USER];var a={};n.forEach(function(e,r){a[e]=r});function i(r){return e.fromQuery(window.location.search).get(r)}var u={_mLayersIndex:a,_sTopLayer:n[n.length-1],FL_MAX_LAYER_PARAM:"sap-ui-fl-max-layer",isValidLayer:function(e){return Object.keys(t).some(function(r){return r===e})},isVendorLayer:function(){return this.getCurrentLayer()===t.VENDOR},isCustomerDependentLayer:function(e){return[t.PUBLIC,t.CUSTOMER,t.CUSTOMER_BASE].indexOf(e)>-1},isDeveloperLayer:function(e){return u.compareAgainstCurrentLayer(e,t.CUSTOMER)===-1},doesCurrentLayerRequirePackage:function(){var e=this.getCurrentLayer();return e===t.VENDOR||e===t.PARTNER||e===t.CUSTOMER_BASE},getMaxLayer:function(e){var t=u.getMaxLayerTechnicalParameter(r.getHash(),e);return t||i(this.FL_MAX_LAYER_PARAM)||u._sTopLayer},getLayerIndex:function(e){return this._mLayersIndex[e]},isOverMaxLayer:function(e,r){return this.isOverLayer(e,this.getMaxLayer(r))},isOverLayer:function(e,r){return this.getLayerIndex(e)>this.getLayerIndex(r)},compareAgainstCurrentLayer:function(e,r){var t=r||u.getCurrentLayer();if(this.getLayerIndex(t)>this.getLayerIndex(e)||!e){return-1}else if(this.getLayerIndex(t)===this.getLayerIndex(e)){return 0}return 1},isLayerFilteringRequired:function(e){return this._sTopLayer!==this.getMaxLayer(e)},isSapUiLayerParameterProvided:function(){return!!i("sap-ui-layer")},getCurrentLayer:function(){var e=i("sap-ui-layer")||"";return e.toUpperCase()||t.CUSTOMER},filterChangeDefinitionsByMaxLayer:function(e,r){return e.filter(function(e){return!e.layer||!u.isOverMaxLayer(e.layer,r)})},filterChangeOrChangeDefinitionsByCurrentLayer:function(e,r){if(!r){return e}return e.filter(function(e){var t=e.getLayer&&e.getLayer()||e.layer;return r===t})},getMaxLayerTechnicalParameter:function(e,r){if(r){var t=r.parseShellHash(e)||{};if(t.params&&t.params.hasOwnProperty(this.FL_MAX_LAYER_PARAM)){return t.params[this.FL_MAX_LAYER_PARAM][0]}}return undefined}};return u});
//# sourceMappingURL=LayerUtils.js.map
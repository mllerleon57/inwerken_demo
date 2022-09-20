/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(e){"use strict";var t=function(t,r){var n=e.getAppComponentForControl(t);var o=t.getId();var a=n.getModel(e.VARIANT_MODEL_NAME);var i=n.getLocalId(o)||o;if(!a){return}if(r){a.waitForVMControlInit(i).then(function(){a.setModelPropertiesForControl(i,r,t);a.checkUpdate(true)})}else{a.setModelPropertiesForControl(i,r,t);a.checkUpdate(true)}};return{annotations:{},properties:{showSetAsDefault:{ignore:false},manualVariantKey:{ignore:true},inErrorState:{ignore:false},editable:{ignore:false},modelName:{ignore:false},updateVariantInURL:{ignore:true},resetOnContextChange:{ignore:true},executeOnSelectionForStandardDefault:{ignore:false},displayTextForExecuteOnSelectionForStandardVariant:{ignore:false},headerLevel:{ignore:false}},variantRenameDomRef:function(e){return e.getTitle().getDomRef("inner")},customData:{},tool:{start:function(e){var r=true;t(e,r)},stop:function(e){var r=false;t(e,r)}},actions:{controlVariant:function(t){var r=e.getAppComponentForControl(t);var n=t.getId();var o=r.getModel(e.VARIANT_MODEL_NAME);var a=r.getLocalId(n)||n;return{validators:["noEmptyText",{validatorFunction:function(e){var t=o._getVariantTitleCount(e,a)||0;return t===0},errorMessage:sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText("VARIANT_MANAGEMENT_ERROR_DUPLICATE")}]}}}}});
//# sourceMappingURL=VariantManagement.designtime.js.map
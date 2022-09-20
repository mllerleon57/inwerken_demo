/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","./thirdparty/UploadCollectionItem"],function(e,t){"use strict";var a=t.UploadState;var l=e.extend("sap.ui.webc.fiori.UploadCollectionItem",{metadata:{library:"sap.ui.webc.fiori",tag:"ui5-upload-collection-item-ui5",interfaces:["sap.ui.webc.fiori.IUploadCollectionItem"],properties:{disableDeleteButton:{type:"boolean",defaultValue:false},file:{type:"object",defaultValue:null},fileName:{type:"string",defaultValue:""},fileNameClickable:{type:"boolean",defaultValue:false},hideRetryButton:{type:"boolean",defaultValue:false},hideTerminateButton:{type:"boolean",defaultValue:false},progress:{type:"int",defaultValue:0},uploadState:{type:"sap.ui.webc.fiori.UploadState",defaultValue:a.Ready}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},thumbnail:{type:"sap.ui.core.Control",multiple:false,slot:"thumbnail"}},events:{fileNameClick:{parameters:{}},rename:{parameters:{}},retry:{parameters:{}},terminate:{parameters:{}}},designtime:"sap/ui/webc/fiori/designtime/UploadCollectionItem.designtime"}});return l});
//# sourceMappingURL=UploadCollectionItem.js.map
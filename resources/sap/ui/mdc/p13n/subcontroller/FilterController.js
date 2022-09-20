/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/condition/FilterOperatorUtil","./BaseController","sap/ui/mdc/p13n/P13nBuilder","sap/ui/mdc/p13n/FlexUtil","sap/base/Log","sap/base/util/merge"],function(t,e,n,r,o,i){"use strict";var a=e.extend("sap.ui.mdc.p13n.subcontroller.FilterController",{constructor:function(){e.apply(this,arguments);this._bResetEnabled=true}});a.prototype.getStateKey=function(){return"filter"};a.prototype.getUISettings=function(){return{title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("filter.PERSONALIZATION_DIALOG_TITLE"),tabText:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("p13nDialog.TAB_Filter"),afterClose:function(t){var e=t.getSource();if(e){var n=e.getContent()[0];if(n.isA("sap.m.p13n.Container")){n.removeView("Filter")}else{e.removeAllContent()}}e.destroy()}}};a.prototype.getChangeOperations=function(){return{add:"addCondition",remove:"removeCondition"}};a.prototype.getBeforeApply=function(){var t=this.getAdaptationControl().getInbuiltFilter();var e=t?t.createConditionChanges():Promise.resolve([]);return e};a.prototype.getFilterControl=function(){return this.getAdaptationControl().isA("sap.ui.mdc.IFilter")?this.getAdaptationControl():this.getAdaptationControl()._oP13nFilter};a.prototype.sanityCheck=function(t){a.checkConditionOperatorSanity(t);return t};a.checkConditionOperatorSanity=function(e){for(var n in e){var r=e[n];for(var i=0;i<r.length;i++){var a=r[i];var p=a.operator;if(!t.getOperator(p)){r.splice(i,1);if(e[n].length==0){delete e[n]}o.warning("The provided conditions for field '"+n+"' contain unsupported operators - these conditions will be neglected.")}}}};a.prototype._getPresenceAttribute=function(t){return"isFiltered"};a.prototype.getAdaptationUI=function(t,e){var n=this._getP13nModel(t);return this.getAdaptationControl().retrieveInbuiltFilter().then(function(t){t.setP13nData(n.oData);t.setLiveMode(false);this._oAdaptationFB=t;return t.createFilterFields().then(function(){return t})}.bind(this))};a.prototype.update=function(){e.prototype.update.apply(this,arguments);var t=this.getAdaptationControl();var n=t&&t.getInbuiltFilter();if(n){n.createFilterFields()}};a.prototype.getDelta=function(t){t.applyAbsolute=true;return r.getConditionDeltaChanges(t)};a.prototype.model2State=function(){var t={},e=this.getCurrentState();this._oAdaptationModel.getProperty("/items").forEach(function(n){if(n.active&&Object.keys(e).includes(n.name)){t[n.name]=e[n.name]}});return t};a.prototype.mixInfoAndState=function(t){var e=this.getCurrentState()||{};var r=n.prepareAdaptationData(t,function(t,n){t.name=n.path||n.name;var r=e[t.name];t.active=r&&r.length>0?true:false;return!(n.filterable===false)});n.sortP13nData({visible:undefined,position:undefined},r.items);return r};a.prototype.changesToState=function(t,e,n){var r={};t.forEach(function(t){var e=i({},t.changeSpecificData.content);var o=e.name;r[o]=n[o]});return r};return a});
//# sourceMappingURL=FilterController.js.map
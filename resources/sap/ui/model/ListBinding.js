/*!

 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Binding","./Filter","./FilterType","./Sorter","sap/base/util/array/diff"],function(t,e,i,n,r){"use strict";var o=t.extend("sap.ui.model.ListBinding",{constructor:function(i,r,o,a,u,p){t.call(this,i,r,o,p);this.aSorters=s(a,n);this.aFilters=[];this.aApplicationFilters=s(u,e);this.oCombinedFilter=null;this.bUseExtendedChangeDetection=false;this.bDetectUpdates=true},metadata:{abstract:true,publicMethods:["getContexts","getCurrentContexts","sort","attachSort","detachSort","filter","attachFilter","detachFilter","getDistinctValues","isGrouped","getLength","isLengthFinal"]}});function s(t,e){if(Array.isArray(t)){return t}return t instanceof e?[t]:[]}o.prototype._checkKeepCurrentSupported=function(t){if(this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: "+this.getMetadata().getName()+"#getContexts, must not use bKeepCurrent if extended change detection is"+" enabled")}if(t){throw new Error("Unsupported operation: "+this.getMetadata().getName()+"#getContexts, must not use both iMaximumPrefetchSize and bKeepCurrent")}};o.prototype.getCurrentContexts=function(){return this.getContexts()};o.prototype.getCount=function(){return this.isLengthFinal()?this.getLength():undefined};o.prototype.getLength=function(){return 0};o.prototype.isLengthFinal=function(){return true};o.prototype.getDistinctValues=function(t){return null};o.prototype.attachSort=function(t,e){this.attachEvent("sort",t,e)};o.prototype.detachSort=function(t,e){this.detachEvent("sort",t,e)};o.prototype._fireSort=function(t){this.fireEvent("sort",t)};o.prototype.attachFilter=function(t,e){this.attachEvent("filter",t,e)};o.prototype.detachFilter=function(t,e){this.detachEvent("filter",t,e)};o.prototype._fireFilter=function(t){this.fireEvent("filter",t)};o.prototype.isGrouped=function(){return!!(this.aSorters&&this.aSorters[0]&&this.aSorters[0].fnGroup)};o.prototype.getGroup=function(t){return this.aSorters[0].getGroup(t)};o.prototype.diffData=function(t,e){return r(t,e,this.oExtendedChangeDetectionConfig)};o.prototype.enableExtendedChangeDetection=function(t,e,i){this.bUseExtendedChangeDetection=true;this.bDetectUpdates=t;this.oExtendedChangeDetectionConfig=i;if(typeof e==="string"){this.getEntryKey=function(t){return t.getProperty(e)}}else if(typeof e==="function"){this.getEntryKey=e}if(this.update){this.update()}};o.prototype.getContextData=function(t){var e;if(this.getEntryKey&&!this.bDetectUpdates){e=this.getEntryKey(t);if(this.isGrouped()){e+="-"+this.getGroup(t).key}}else{e=this.getEntryData(t)}return e};o.prototype.getEntryData=function(t){return JSON.stringify(t.getObject())};o.prototype.getFilters=function(t){switch(t){case i.Application:return this.aApplicationFilters&&this.aApplicationFilters.slice()||[];case i.Control:return this.aFilters&&this.aFilters.slice()||[];default:throw new Error("Invalid FilterType: "+t)}};o.prototype.getFilterInfo=function(t){if(this.oCombinedFilter){return this.oCombinedFilter.getAST(t)}return null};return o});
//# sourceMappingURL=ListBinding.js.map
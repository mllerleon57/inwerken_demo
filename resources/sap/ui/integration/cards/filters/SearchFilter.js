/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseFilter","sap/m/SearchField"],function(e,t){"use strict";var i=e.extend("sap.ui.integration.cards.filters.SearchFilter",{metadata:{library:"sap.ui.integration",aggregations:{_searchField:{type:"sap.m.SearchField",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2}});i.prototype.getField=function(){return this._getSearchField()};i.prototype.getValueForModel=function(){return{value:this._escapeDoubleQuotes(this._getSearchField().getValue())}};i.prototype._getSearchField=function(){var e=this.getAggregation("_searchField");if(!e){e=this._createSearchField();this.setAggregation("_searchField",e)}return e};i.prototype._createSearchField=function(){var e=this.getConfig();var i=new t({value:e.value,placeholder:e.placeholder});var r=this.createLabel(e);if(r){i.addAriaLabelledBy(r)}i.attachChange(function(){this._setValue()}.bind(this));return i};i.prototype._escapeDoubleQuotes=function(e){return e.replaceAll('"','\\"')};return i});
//# sourceMappingURL=SearchFilter.js.map
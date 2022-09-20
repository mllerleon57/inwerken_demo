/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Icon","sap/ui/core/library","sap/m/Text","sap/ui/events/KeyCodes","sap/f/ProductSwitchItemRenderer"],function(e,t,i,s,r,n){"use strict";var o=i.TextAlign;var a=e.extend("sap.f.ProductSwitchItem",{metadata:{library:"sap.f",properties:{src:{type:"sap.ui.core.URI",defaultValue:null},title:{type:"string",defaultValue:null},subTitle:{type:"string",defaultValue:null},targetSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},target:{type:"string",group:"Behavior",defaultValue:null}},aggregations:{_icon:{type:"sap.ui.core.Icon",visibility:"hidden",multiple:false},_title:{type:"sap.m.Text",visibility:"hidden",multiple:false}}}});a.prototype.init=function(){this._bSpaceEnterPressed=false;this._bEscapeShiftKeyPress=false};a.prototype.setTitle=function(e){this.setProperty("title",e);this._getTitle().setText(e);return this};a.prototype.setSrc=function(e){this.setProperty("src",e);this._getIcon().setSrc(e);return this};a.prototype.setSubTitle=function(e){this.setProperty("subTitle",e);this._getTitle().setMaxLines(e?1:2);return this};a.prototype._getIcon=function(){var e=this.getAggregation("_icon");if(!e){e=new t;if(this.getSrc()){e.setSrc(this.getSrc())}this.setAggregation("_icon",e)}return e};a.prototype._getTitle=function(){var e=this.getAggregation("_title");if(!e){e=new s({text:this.getTitle(),maxLines:2,textAlign:o.Initial}).addStyleClass("sapFPSItemMainTitle").addStyleClass("sapFPSItemTitle");this.setAggregation("_title",e)}return e};a.prototype._getProductSwitch=function(){return this.getParent().getParent()};a.prototype.onkeyup=function(e){if(e.keyCode===r.SPACE&&!this._bEscapeShiftKeyPress){this.fireEvent("_itemPress")}if(e.keyCode===r.SPACE||e.keyCode===r.ENTER){this._bSpaceEnterPressed=false;this._bEscapeShiftKeyPress=false}};a.prototype.ontap=function(){this.fireEvent("_itemPress")};a.prototype.onkeydown=function(e){if((e.keyCode===r.ESCAPE||e.keyCode===r.SHIFT)&&this._bSpaceEnterPressed){this._bEscapeShiftKeyPress=true}if(e.keyCode===r.SPACE||e.keyCode===r.ENTER){this._bSpaceEnterPressed=true;if(e.keyCode===r.ENTER&&!this._bEscapeShiftKeyPress){this.fireEvent("_itemPress")}e.preventDefault()}};return a});
//# sourceMappingURL=ProductSwitchItem.js.map
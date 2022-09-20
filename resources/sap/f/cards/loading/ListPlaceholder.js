/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core"],function(e,t){"use strict";var r=e.extend("sap.f.cards.loading.ListPlaceholder",{metadata:{library:"sap.f",properties:{maxItems:{type:"int",group:"Misc"},item:{type:"any"},itemHeight:{type:"sap.ui.core.CSSSize"}}},renderer:{apiVersion:2,render:function(e,r){var i=r.getMaxItems(),a=r.getItem(),s=t.getLibraryResourceBundle("sap.ui.core"),o=s.getText("BUSY_TEXT");e.openStart("div",r).class("sapFCardContentPlaceholder").class("sapFCardContentListPlaceholder").attr("tabindex","0").attr("title",o);e.accessibilityState(r,{role:"progressbar",valuemin:"0",valuemax:"100"});e.openEnd();for(var n=0;n<i;n++){e.openStart("div").class("sapFCardListPlaceholderItem").style("height",r.getItemHeight()).openEnd();if(a&&a.icon){e.openStart("div").class("sapFCardListPlaceholderImg").class("sapFCardLoadingShimmer").openEnd().close("div")}e.openStart("div").class("sapFCardListPlaceholderRows").openEnd();if(a){this.renderTitleAndDescription(e,a);this.renderAttributes(e,a);if(a.chart){this.renderRow(e)}if(a.actionsStrip){this.renderRow(e)}}e.close("div");e.close("div")}e.close("div")},renderTitleAndDescription:function(e,t){if(t.attributes&&t.title&&t.description){this.renderRow(e,true);return}if(t.title){this.renderRow(e)}if(t.description){this.renderRow(e)}},renderRow:function(e,t){e.openStart("div").class("sapFCardListPlaceholderRow").class("sapFCardLoadingShimmer");if(t){e.class("sapFCardListPlaceholderRowCombined")}e.openEnd().close("div")},renderAttributes:function(e,t){if(!t.attributes){return}var r=t.attributes.length/2+1;for(var i=0;i<r;i++){e.openStart("div").class("sapFCardListPlaceholderRow").openEnd();var a=i===r-1?1:2;for(var s=0;s<a;s++){e.openStart("div").class("sapFCardListPlaceholderAttr").class("sapFCardLoadingShimmer").openEnd().close("div")}e.close("div")}}}});return r});
//# sourceMappingURL=ListPlaceholder.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core"],function(e,a){"use strict";var i=e.extend("sap.f.cards.loading.TimelinePlaceholder",{metadata:{library:"sap.f",properties:{maxItems:{type:"int",group:"Misc"},item:{type:"any"},itemHeight:{type:"sap.ui.core.CSSSize"}}},renderer:{apiVersion:2,render:function(e,i){var r=i.getMaxItems(),s=i.getItem(),t=a.getLibraryResourceBundle("sap.ui.core"),n=t.getText("BUSY_TEXT");e.openStart("div",i).class("sapFCardContentPlaceholder").class("sapFCardContentTimelinePlaceholder").attr("tabindex","0").attr("title",n);e.accessibilityState(i,{role:"progressbar",valuemin:"0",valuemax:"100"});e.openEnd();for(var o=0;o<r;o++){e.openStart("div").class("sapFCardTimelinePlaceholderItem").style("height",i.getItemHeight()).openEnd();if(s){e.openStart("div").class("sapFCardTimelineNavGroup").openEnd();e.openStart("div").class("sapFCardTimelinePlaceholderImg").class("sapFCardLoadingShimmer").openEnd().close("div");if(o!==r-1){e.openStart("div").class("sapFCardTimelinePlaceholderLine").class("sapFCardLoadingShimmer").openEnd().close("div")}e.close("div")}e.openStart("div").class("sapFCardTimelinePlaceholderRows").openEnd();if(s){this.renderRow(e,100);this.renderRow(e,40);this.renderRow(e,60)}e.close("div");e.close("div")}e.close("div")},renderRow:function(e,a){e.openStart("div").class("sapFCardTimelinePlaceholderRow").class("sapFCardTimelinePlaceholderRow"+a).class("sapFCardLoadingShimmer").openEnd().close("div")}}});return i});
//# sourceMappingURL=TimelinePlaceholder.js.map
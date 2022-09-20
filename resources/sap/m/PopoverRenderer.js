/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library","sap/ui/dom/getScrollbarSize","sap/ui/core/IconPool"],function(e,o,t,s){"use strict";var a=o.PlacementType;var r={apiVersion:2};r.render=function(e,o){e.openStart("div",o);var t=this.generateRootClasses(o);t.forEach(function(o){e.class(o)});if(!o.getHorizontalScrolling()){e.class("sapMPopoverHorScrollDisabled")}if(!o.getVerticalScrolling()){e.class("sapMPopoverVerScrollDisabled")}var s=o.getTooltip_AsString();if(s){e.attr("title",s)}e.attr("tabindex","-1").accessibilityState(o,o._getAccessibilityOptions()).openEnd();if(o.getResizable()){e.icon("sap-icon://resize-corner",["sapMPopoverResizeHandle"],{title:""})}this.renderContent(e,o);e.close("div")};r.isButtonFooter=function(e){if(e&&e.isA("sap.m.Bar")){var o=e.getContentLeft(),t=e.getContentRight(),s=e.getContentMiddle(),a=!o||o.length===0,r=!t||t.length===0,n=false;if(s&&s.length===2){if(s[0]&&s[0].isA("sap.m.Button")&&(s[1]&&s[1].isA("sap.m.Button"))){n=true}}return a&&r&&n}else{return false}};r.renderContent=function(o,s){var a=s._getAnyHeader(),r=s.getId(),n=0,i=s._getAllContent(),p=s.getFooter(),l=s.getSubHeader(),c=s.getContentWidth(),d=s.getContentMinWidth(),g=s.getContentHeight();if(e.system.desktop){o.openStart("span",s.getId()+"-firstfe").class("sapMPopoverHiddenFocusable").attr("tabindex","0").openEnd().close("span")}if(a){o.openStart("header").class("sapMPopoverHeader").openEnd();if(a._applyContextClassFor){a._applyContextClassFor("header")}o.renderControl(a);o.close("header")}if(l){o.openStart("header").class("sapMPopoverSubHeader").openEnd();if(l._applyContextClassFor){l._applyContextClassFor("subheader")}o.renderControl(l);o.close("header")}o.openStart("div",r+"-cont");if(c){o.style("width",c)}if(d){o.style("min-width",d)}if(g){o.style("height",g)}o.class("sapMPopoverCont");if(sap.ui.getCore().getConfiguration().getAccessibility()&&s.getProperty("ariaRoleApplication")){o.attr("role","application")}o.openEnd();o.openStart("div",s.getId()+"-scroll").class("sapMPopoverScroll");if(!s.getHorizontalScrolling()){o.style(sap.ui.getCore().getConfiguration().getRTL()?"margin-left":"margin-right",t().width+"px")}o.openEnd();for(n=0;n<i.length;n++){o.renderControl(i[n])}o.close("div");o.close("div");if(p){o.openStart("footer").class("sapMPopoverFooter");if(this.isButtonFooter(p)){o.class("sapMPopoverSpecialFooter")}o.openEnd();if(p._applyContextClassFor){p._applyContextClassFor("footer");p.addStyleClass("sapMTBNoBorders")}o.renderControl(p);o.close("footer")}if(s.getShowArrow()){o.openStart("span",r+"-arrow").class("sapMPopoverArr").openEnd().close("span")}if(e.system.desktop){o.openStart("span",s.getId()+"-middlefe").class("sapMPopoverHiddenFocusable").attr("tabindex","-1").openEnd().close("span");o.openStart("span",s.getId()+"-lastfe").class("sapMPopoverHiddenFocusable").attr("tabindex","0").openEnd().close("span")}};r.generateRootClasses=function(e){var o=["sapMPopover"],t=e.getSubHeader(),s=e.getFooter(),r=e.getVerticalScrolling()&&!e._forceDisableScrolling,n=e.getHorizontalScrolling()&&!e._forceDisableScrolling,i=e._getAnyHeader();if(i){o.push("sapMPopoverWithBar")}else{o.push("sapMPopoverWithoutBar")}if(t){o.push("sapMPopoverWithSubHeader")}else{o.push("sapMPopoverWithoutSubHeader")}if(e._hasSingleNavContent()){o.push("sapMPopoverNav")}if(e._hasSinglePageContent()){o.push("sapMPopoverPage")}if(s){o.push("sapMPopoverWithFooter")}else{o.push("sapMPopoverWithoutFooter")}if(e.getPlacement()===a.Top){o.push("sapMPopoverPlacedTop")}if(!r){o.push("sapMPopoverVerScrollDisabled")}if(!n){o.push("sapMPopoverHorScrollDisabled")}o.push("sapMPopup-CTX");if(e._bSizeCompact){o.push("sapUiSizeCompact")}return o.concat(e.aCustomStyleClasses)};return r},true);
//# sourceMappingURL=PopoverRenderer.js.map
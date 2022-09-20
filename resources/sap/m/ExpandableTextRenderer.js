/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Renderer","sap/ui/core/library","sap/m/HyphenationSupport","./library"],function(e,t,a,n,r){"use strict";var s=a.TextDirection;var i=r.WrappingType;var p=r.EmptyIndicatorMode;var o=e.getLibraryResourceBundle("sap.m");var d={apiVersion:2};d.render=function(e,a){var r=a._getDisplayedText(),p=a.getTextDirection(),o=a.getTooltip_AsString(),c=a.getWrappingType(),l=a.getTextAlign(),x=a.getRenderWhitespace(),g=a._isExpandable(),T=a.getProperty("expanded"),E=T?" ":"... ";e.openStart("div",a);e.class("sapMExText");e.class("sapUiSelectable");if(c!==i.Hyphenated){if(r&&r.length>0&&!/\s/.test(r)){e.class("sapMExTextBreakWord")}}e.attr("dir",p!==s.Inherit?p.toLowerCase():"auto");if(o){e.attr("title",o)}if(l){l=t.getTextAlign(l,p);if(l){e.style("text-align",l)}}if(x){e.class("sapMExTextRenderWhitespaceWrap")}n.writeHyphenationClass(e,a);e.openEnd();e.openStart("span",a.getId()+"-string");e.class("sapMExTextString");e.openEnd();d.renderText(e,a);e.close("span");if(g){e.openStart("span");e.class("sapMExTextEllipsis");e.openEnd();e.unsafeHtml(E);e.close("span");e.renderControl(a._getShowMoreLink())}e.close("div")};d.renderText=function(e,t){if(t.getEmptyIndicatorMode()!==p.Off&&!t.getText()){this.renderEmptyIndicator(e,t)}else{e.text(n.getTextForRender(t,"main"))}};d.renderEmptyIndicator=function(e,t){e.openStart("span");e.class("sapMEmptyIndicator");if(t.getEmptyIndicatorMode()===p.Auto){e.class("sapMEmptyIndicatorAuto")}e.openEnd();e.openStart("span");e.attr("aria-hidden",true);e.openEnd();e.text(o.getText("EMPTY_INDICATOR"));e.close("span");e.openStart("span");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(o.getText("EMPTY_INDICATOR_TEXT"));e.close("span");e.close("span")};return d},true);
//# sourceMappingURL=ExpandableTextRenderer.js.map
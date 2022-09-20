/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeXML","sap/ui/core/library"],function(e,t){"use strict";var i=t.TitleLevel;var a=function(){};a.render=function(t,a){var l=a.getId();var s=sap.ui.getCore().getConfiguration().getAccessibility();var n=r(a.getHeight());var d=r(a.getWidth());a.getScrollTop();a.getScrollLeft();t.write("<section");t.writeControlData(a);t.addClass("sapUiPanel");t.addStyle("width",a.getWidth());if(!a.getCollapsed()){t.addStyle("height",a.getHeight())}else{t.addClass("sapUiPanelColl");t.addStyle("height","auto")}if(n){t.addClass("sapUiPanelHeightSet")}if(d){t.addClass("sapUiPanelWidthSet")}if(a.getApplyContentPadding()){t.addClass("sapUiPanelWithPadding")}if(!a.getEnabled()){t.addClass("sapUiPanelDis")}if(a.getShowCollapseIcon()){t.addClass("sapUiPanelWithCollapseIcon")}t.addClass("sapUiPanelBorderDesign"+a.getBorderDesign());t.addClass("sapUiPanelAreaDesign"+a.getAreaDesign());t.writeClasses();t.writeStyles();if(s){t.writeAttribute("aria-labelledby",l+"-title ");t.writeAttribute("aria-describedby",l+"-acc");t.writeAttribute("role","region");if(a.getCollapsed()){t.writeAttribute("aria-expanded","false")}else{t.writeAttribute("aria-expanded","true")}t.writeAttribute("tabindex","0")}var o=a.getTooltip_AsString();if(o){t.writeAttributeEscaped("title",o)}t.write("><header id='"+l+"-hdr'");t.addClass("sapUiPanelHdr");var p=a.getTitle();var g;var w=i.H5;var c=true;if(p){g=p.getTooltip_AsString();if(g){t.writeAttributeEscaped("title",g)}if(p.getLevel()!=i.Auto){w=p.getLevel();c=p.getEmphasized()}}if(c){t.addClass("sapUiPanelHdrEmph")}t.writeClasses();t.write(">");if(a.getShowCollapseIcon()&&s){t.write('<span id="'+l+'-acc" style="display:none;">');t.writeEscaped(a._rb.getText("PANEL_HEAD_ACC"));t.write("</span>")}var C=a._rb.getText(a.getCollapsed()?"PANEL_EXPAND":"PANEL_COLLAPSE");if(a.getShowCollapseIcon()){t.write("<a id='"+l+"-collArrow' class='sapUiPanelHdrItem sapUiPanelCollArrow' href='#' tabindex='0' title='"+C+"'");if(s){t.writeAttribute("role","button")}t.write(">&nbsp;</a>")}if(p&&p.getIcon()){var u=p.getIcon();var f=[];var h={};h["id"]=l+"-ico";h["title"]=null;f.push("sapUiPanelIco");f.push("sapUiPanelHdrItem");f.push("sapUiTv"+w);t.writeIcon(u,f,h)}var b=e(a.getText());if(!b){b="&nbsp;"}t.write("<"+w+" ");t.addClass("sapUiTv"+w);t.write(" id='"+l+"-title' ");t.addClass("sapUiPanelHdrItem");t.addClass("sapUiPanelTitle");t.writeClasses();if(s){t.writeAttribute("role","heading")}t.write(">");t.write(b);t.write("</"+w+">");var v=a.getButtons();if(v&&v.length>0){t.write("<div id='"+l+"-tb' class='sapUiPanelHdrItem sapUiPanelTb sapUiTbDesignFlat'>");for(var P=0;P<v.length;P++){t.renderControl(v[P])}t.write("</div>")}if(a.getShowCollapseIcon()){t.write("<a id='"+l+"-collIco' class='sapUiPanelHdrRightItem sapUiPanelCollIco' href='#' tabindex='0' title='"+C+"'");if(s){t.writeAttribute("role","button")}t.write(">&nbsp;</a>")}t.write("</header>");if(!a.getCollapsed()){t.write("<div class='sapUiPanelCont' id='",l,"-cont'>");var A=a.getContent(),U=A.length;for(var P=0;P<U;P++){t.renderControl(A[P])}t.write("</div>")}else{a.getContent().forEach(function(e){t.cleanupControlWithoutRendering(e)})}t.write("</section>")};function r(e){return e&&e!=="auto"&&e!=="inherit"}return a},true);
//# sourceMappingURL=PanelRenderer.js.map
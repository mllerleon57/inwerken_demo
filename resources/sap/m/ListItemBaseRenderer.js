/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/Device","sap/ui/core/InvisibleText"],function(l,D,I){"use strict";var L=l.ListType;var a=l.ListMode;var b={};b.renderInvisible=function(r,o){this.openItemTag(r,o);r.writeInvisiblePlaceholderData(o);r.write(">");this.closeItemTag(r,o);};b.renderHighlight=function(r,o){var h=o.getHighlight();if(h=="None"){return;}r.write("<div");r.addClass("sapMLIBHighlight");r.addClass("sapMLIBHighlight"+h);r.writeClasses();r.write("></div>");};b.isModeMatched=function(m,o){var O=(sap.ui.require("sap/m/ListBaseRenderer")||{}).ModeOrder||{};return O[m]==o;};b.renderMode=function(r,o,O){var m=o.getMode();if(!this.isModeMatched(m,O)){return;}var M=o.getModeControl(true);if(M){this.renderModeContent(r,o,M);}};b.renderModeContent=function(r,o,m){this.decorateMode(m,o);r.renderControl(m);};b.decorateMode=function(m,o){m.removeStyleClass("sapMLIBSelectAnimation sapMLIBUnselectAnimation");if(!sap.ui.getCore().getConfiguration().getAnimation()||!o.getListProperty("modeAnimationOn")){return;}var M=o.getMode(),s=o.getListProperty("lastMode");if(!s||s==M){return;}if(M==a.None){m.addStyleClass("sapMLIBUnselectAnimation");}else{m.addStyleClass("sapMLIBSelectAnimation");}};b.renderCounter=function(r,o){var c=o.getCounter();if(c){this.renderCounterContent(r,o,c);}};b.renderCounterContent=function(r,o,c){r.write("<div");r.writeAttribute("id",o.getId()+"-counter");var A=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_COUNTER",c);r.writeAttribute("aria-label",A);r.addClass("sapMLIBCounter");r.writeClasses();r.write(">");r.write(c);r.write("</div>");};b.renderType=function(r,o){var t=o.getTypeControl(true);if(t){r.renderControl(t);}};b.openItemTag=function(r,o){r.write("<"+o.TagName);};b.closeItemTag=function(r,o){r.write("</"+o.TagName+">");};b.renderTabIndex=function(r,o){r.writeAttribute("tabindex","-1");};b.renderTooltip=function(r,o){var t=o.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}};b.addFocusableClasses=function(r,o){if(D.system.desktop){r.addClass("sapMLIBFocusable");this.addLegacyOutlineClass(r,o);}};b.addLegacyOutlineClass=function(r,o){if(D.browser.msie||D.browser.edge){r.addClass("sapMLIBLegacyOutline");}};b.getAriaAnnouncement=function(k,B){return I.getStaticId("sap.m",B||"LIST_ITEM_"+k.toUpperCase());};b.getAriaRole=function(o){return"option";};b.getAriaLabelledBy=function(o){if(!o.getContentAnnouncement&&o.getAriaLabelledBy().length){return o.getId();}};b.getAriaDescribedBy=function(o){if(o.getContentAnnouncement){return"";}var d=[],t=o.getType();if(o.getListProperty("showUnread")&&o.getUnread()){d.push(this.getAriaAnnouncement("unread"));}if(o.getMode()==a.Delete){d.push(this.getAriaAnnouncement("deletable"));}if(t==L.Navigation){d.push(this.getAriaAnnouncement("navigation"));}else{if(t==L.Detail||t==L.DetailAndActive){d.push(this.getAriaAnnouncement("detail"));}if(t==L.Active||t==L.DetailAndActive){d.push(this.getAriaAnnouncement("active"));}}return d.join(" ");};b.getAccessibilityState=function(o){var A=this.getAriaLabelledBy(o),s=this.getAriaDescribedBy(o),m={role:this.getAriaRole(o)};if(o.isSelectable()){m.selected=o.getProperty("selected");}if(A){m.labelledby={value:A.trim(),append:true};}if(s){m.describedby={value:s.trim(),append:true};}return m;};b.renderLIContent=function(r,o){};b.renderLIAttributes=function(r,o){};b.renderContentFormer=function(r,o){this.renderHighlight(r,o);this.renderMode(r,o,-1);};b.renderContentLatter=function(r,o){this.renderCounter(r,o);this.renderType(r,o);this.renderMode(r,o,1);};b.renderLIContentWrapper=function(r,o){r.write('<div class="sapMLIBContent"');r.writeAttribute("id",o.getId()+"-content");r.write(">");this.renderLIContent(r,o);r.write('</div>');};b.render=function(r,o){if(!o.getVisible()){this.renderInvisible(r,o);return false;}this.openItemTag(r,o);r.writeControlData(o);r.addClass("sapMLIB");r.addClass("sapMLIB-CTX");r.addClass("sapMLIBShowSeparator");r.addClass("sapMLIBType"+o.getType());if(D.system.desktop&&o.isActionable()){r.addClass("sapMLIBActionable");r.addClass("sapMLIBHoverable");}if(o.getSelected()){r.addClass("sapMLIBSelected");}if(o.getListProperty("showUnread")&&o.getUnread()){r.addClass("sapMLIBUnread");}this.addFocusableClasses(r,o);this.renderTooltip(r,o);this.renderTabIndex(r,o);if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAccessibilityState(o,this.getAccessibilityState(o));}this.renderLIAttributes(r,o);r.writeClasses();r.writeStyles();r.write(">");this.renderContentFormer(r,o);this.renderLIContentWrapper(r,o);this.renderContentLatter(r,o);this.closeItemTag(r,o);};return b;},true);

/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/IconPool","sap/ui/core/ShortcutHintsMixin","sap/m/library","sap/ui/core/InvisibleText","sap/ui/core/AccessKeysEnablement"],function(e,t,a,i,n,s){"use strict";var r=i.ButtonType;var c=i.ButtonAccessibilityType;var o=e.TextDirection;var l=i.BadgeState;var p=e.aria.HasPopup;var d={apiVersion:2};d.render=function(e,i){var n=i.getId();var c=i.getType();var l=i.getEnabled();var p=i.getWidth();var b=i._getTooltip();var g=i._getText();var I=i.getTextDirection();var T=I===o.Inherit;var A=t.getIconURI("nav-back");var f;e.openStart("button",i);e.class("sapMBtnBase");e.attr("data-ui5-accesskey",i.getProperty("accesskey"));if(!i._isUnstyled()){e.class("sapMBtn");if((c===r.Back||c===r.Up)&&i._getAppliedIcon()&&!g){e.class("sapMBtnBack")}}var B=d.generateAccProps(i);if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(e,i,B)}e.accessibilityState(i,B);if(!l){e.attr("disabled","disabled");if(!i._isUnstyled()){e.class("sapMBtnDisabled")}}else{switch(c){case r.Accept:case r.Reject:case r.Emphasized:case r.Attention:e.class("sapMBtnInverted");break;default:break}}if(b&&!a.isDOMIDRegistered(n)){e.attr("title",b)}if(p!=""||p.toLowerCase()==="auto"){e.style("width",p);if(i._getAppliedIcon()&&g){f="4rem"}else{f="2.25rem"}e.style("min-width",f)}u(i,e);e.openEnd();e.openStart("span",n+"-inner");if(!i._isUnstyled()){e.class("sapMBtnInner")}if(i._isHoverable()){e.class("sapMBtnHoverable")}if(l){e.class("sapMFocusable")}if(!i._isUnstyled()){if(g){e.class("sapMBtnText")}if(c===r.Back||c===r.Up){e.class("sapMBtnBack")}if(i._getAppliedIcon()){if(i.getIconFirst()){e.class("sapMBtnIconFirst")}else{e.class("sapMBtnIconLast")}}}if(this.renderButtonAttributes){this.renderButtonAttributes(e,i)}if(!i._isUnstyled()&&c!==""){e.class("sapMBtn"+c)}u(i,e);e.openEnd();if(c===r.Back||c===r.Up){this.writeInternalIconPoolHtml(e,i,A)}if(i.getIconFirst()&&i._getAppliedIcon()){this.writeImgHtml(e,i)}if(g){e.openStart("span",n+"-content");e.class("sapMBtnContent");if(I!==o.Inherit){e.attr("dir",I.toLowerCase())}if(i.getProperty("highlightAccKeysRef")){e.class(s.CSS_CLASS)}e.openEnd();if(T){e.openStart("bdi",n+"-BDI-content");e.openEnd()}e.text(g);if(T){e.close("bdi")}e.close("span")}if(!i.getIconFirst()&&i._getAppliedIcon()){this.writeImgHtml(e,i)}e.close("span");if(b){e.openStart("span",n+"-tooltip");e.class("sapUiInvisibleText");e.openEnd();e.text(b);e.close("span")}e.close("button")};d.writeImgHtml=function(e,t){var a=t.getType(),i=t.getIcon(),n=a===r.Back||a===r.Up;if(!i&&n){return}e.renderControl(t._getImage(t.getId()+"-img",t._getAppliedIcon(),t.getActiveIcon(),t.getIconDensityAware()))};d.writeInternalIconPoolHtml=function(e,t,a){e.renderControl(t._getInternalIconBtn(t.getId()+"-iconBtn",a))};function u(e,t){if(e._bExcludeFromTabChain){t.attr("tabindex",-1)}}var b={Accept:"BUTTON_ARIA_TYPE_ACCEPT",Reject:"BUTTON_ARIA_TYPE_REJECT",Attention:"BUTTON_ARIA_TYPE_ATTENTION",Emphasized:"BUTTON_ARIA_TYPE_EMPHASIZED",Critical:"BUTTON_ARIA_TYPE_CRITICAL",Negative:"BUTTON_ARIA_TYPE_NEGATIVE",Success:"BUTTON_ARIA_TYPE_SUCCESS"};d.getButtonTypeAriaLabelId=function(e){return n.getStaticId("sap.m",b[e])};d.getBadgeTextId=function(e){return e._oBadgeData&&e._oBadgeData.value!==""&&e._oBadgeData.state!==l.Disappear?e._getBadgeInvisibleText().getId():""};d.generateAccProps=function(e){var t=e._getText(),a=e.getAriaHasPopup(),i;if(t){i=d.generateTextButtonAccProps(e)}else{i=d.generateIconOnlyButtonAccProps(e)}i["disabled"]=null;i["haspopup"]=a===p.None?null:a.toLowerCase();return i};d.generateIconOnlyButtonAccProps=function(e){var t=d.getButtonTypeAriaLabelId(e.getType()),a=this.getBadgeTextId(e),i=e._getTooltip(),n=e.getId()+"-tooltip",s=e._determineAccessibilityType(),r={},o;switch(s){case c.Default:r["label"]={value:i,append:true};break;case c.Described:r["label"]={value:i,append:true};o=(t+" "+a).trim();o&&(r["describedby"]={value:o,append:true});break;case c.Labelled:r["describedby"]={value:n,append:true};break;case c.Combined:r["describedby"]={value:(n+" "+t+" "+a).trim(),append:true};break;default:break}return r};d.generateTextButtonAccProps=function(e){var t=e.getId(),a=d.getButtonTypeAriaLabelId(e.getType()),i=this.getBadgeTextId(e),n=e._getTooltip()?t+"-tooltip":"",s=t+"-content",r=e._determineAccessibilityType(),o=e._determineSelfReferencePresence(),l={},p;switch(r){case c.Default:n&&(l["describedby"]={value:n,append:true});break;case c.Described:p=(n+" "+a+" "+i).trim();p&&(l["describedby"]={value:p,append:true});break;case c.Labelled:o&&(l["labelledby"]={value:s,append:true});n&&(l["describedby"]={value:n,append:true});break;case c.Combined:p=(n+" "+a+" "+i).trim();p&&(l["describedby"]={value:p,append:true});o&&(l["labelledby"]={value:s,append:true});break;default:break}return l};return d},true);
//# sourceMappingURL=ButtonRenderer.js.map
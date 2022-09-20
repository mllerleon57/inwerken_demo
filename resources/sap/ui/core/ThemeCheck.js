/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/base/Log","sap/base/util/each","sap/ui/dom/includeStylesheet","./theming/ThemeHelper"],function(e,t,r,s,a,i){"use strict";var n=150;var h=t.extend("sap.ui.core.ThemeCheck",{constructor:function(e){this._oCore=e;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;this._sFallbackTheme=null;this._mThemeFallback={}},getInterface:function(){return this},fireThemeChangedEvent:function(e){l(this);d.apply(this,[true]);if(!e&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()})}}});h.themeLoaded=false;function o(e){try{return e.cssRules}catch(e){return null}}function u(e){var t=o(e);return!!t&&t.length>0}h.checkStyle=function(e,t){var s=document.getElementById(e);try{var a=false,i=false,n=false,h=false;a=!s;i=!!(s&&(s.getAttribute("data-sap-ui-ready")==="true"||s.getAttribute("data-sap-ui-ready")==="false"));n=!!(s&&s.sheet&&s.sheet.href===s.href&&u(s.sheet));h=!!(s&&s.innerHTML&&s.innerHTML.length>0);var o=a||n||h||i;if(t){r.debug("ThemeCheck: "+e+": "+o+" (noLinkElement: "+a+", sheet: "+n+", innerHtml: "+h+", linkElementFinishedLoading: "+i+")")}return o}catch(s){if(t){r.error("ThemeCheck: "+e+": Error during check styles '"+e+"'",s)}}return false};function l(e){h.themeLoaded=false;if(e._sThemeCheckId){clearTimeout(e._sThemeCheckId);e._sThemeCheckId=null;e._iCount=0;e._sFallbackTheme=null;e._mThemeFallback={}}}function m(e){var t=e._oCore.getLoadedLibraries();var n=e._oCore.getConfiguration().getTheme();var o=e._oCore._getThemePath("sap.ui.core",n)+"custom.css";var l=n.indexOf("sap_")===0||n==="base";var m=true;var d=[];if(e._customCSSAdded&&e._themeCheckedForCustom===n){t[e._CUSTOMID]={}}function f(e,t){var s=h.checkStyle(e+t,true);if(s){var a=document.querySelectorAll("link[data-sap-ui-foucmarker='"+e+t+"']");if(a.length>0){for(var i=0,n=a.length;i<n;i++){a[i].remove()}r.debug("ThemeCheck: Old stylesheets removed for library: "+t)}}return s}function C(s){var i="sap-ui-theme-"+s;var h=f("sap-ui-theme-",s);if(h&&document.getElementById("sap-ui-themeskeleton-"+s)){h=f("sap-ui-themeskeleton-",s)}m=m&&h;if(m){if(e._themeCheckedForCustom!=n){if(!l&&c(e,s)){var C=o;var g=e._oCore._getLibraryCssQueryParams(t["sap.ui.core"]);if(g){C+=g}a(C,e._CUSTOMID);e._customCSSAdded=true;r.debug("ThemeCheck: delivered custom CSS needs to be loaded, Theme not yet applied");e._themeCheckedForCustom=n;m=false;return false}else{var _=document.querySelector("LINK[id='"+e._CUSTOMID+"']");if(_){_.remove();r.debug("ThemeCheck: Custom CSS removed")}e._customCSSAdded=false}}}if(!l&&h&&!e._mThemeFallback[s]){var T=document.getElementById(i);if(T&&T.getAttribute("data-sap-ui-ready")==="false"&&!(T.sheet&&u(T.sheet))){d.push(s)}}}s(t,C);if(d.length>0){if(!e._sFallbackTheme){for(var g in t){var _=i.getMetadata(g);if(_&&_.Extends&&_.Extends[0]){e._sFallbackTheme=_.Extends[0];break}}}if(e._sFallbackTheme){d.forEach(function(t){var s="sap-ui-theme-"+t;var a=document.getElementById(s);r.warning("ThemeCheck: Custom theme '"+n+"' could not be loaded for library '"+t+"'. "+"Falling back to its base theme '"+e._sFallbackTheme+"'.");e._oCore._updateThemeUrl(a,e._sFallbackTheme);e._mThemeFallback[t]=true});m=false}}if(!m){r.debug("ThemeCheck: Theme not yet applied.")}else{e._themeCheckedForCustom=n}return m}function c(t,s){var a=window.document.getElementById("sap-ui-theme-"+s);if(!a){return false}var i=window.getComputedStyle(a,":after");var n=i?i.getPropertyValue("content"):null;if(!n&&e.browser.safari){var h=document.documentElement;h.classList.add("sapUiThemeDesignerCustomCss");n=window.getComputedStyle(h,":after").getPropertyValue("content");h.classList.remove("sapUiThemeDesignerCustomCss")}if(n&&n!=="none"){try{if(n[0]==="'"||n[0]==='"'){n=n.substring(1,n.length-1)}return n==="true"}catch(e){r.error("Custom check: Error parsing JSON string for custom.css indication.",e)}}var u=a.sheet?o(a.sheet):null;if(!u||u.length===0){r.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+s);return false}for(var l=0;l<2&&l<u.length;l++){if(t._CUSTOMCSSCHECK.test(u[l].selectorText)){return true}}return false}function d(e){this._iCount++;var t=this._iCount>n;if(!m(this)&&!t){var s;if(this._iCount<=100){s=2}else if(this._iCount<=110){s=500}else{s=1e3}this._sThemeCheckId=setTimeout(d.bind(this),s)}else if(!e){l(this);h.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(t){r.error("ThemeCheck: max. check cycles reached.")}}else{h.themeLoaded=true}}return h});
//# sourceMappingURL=ThemeCheck.js.map
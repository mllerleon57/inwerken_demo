/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/delegate/ItemNavigation","./GridItemNavigation","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(t,e,o,jQuery){"use strict";function s(t){if(t.onfocusin){t.onfocusin()}}var i=e.extend("sap.f.delegate.GridContainerItemNavigation",{constructor:function(){e.apply(this,arguments);this.attachEvent(t.Events.FocusLeave,this._onFocusLeave,this)},metadata:{library:"sap.f",properties:{},events:{}}});i.prototype._onFocusLeave=function(t){var e=this.getFocusedDomRef();this.getItemDomRefs().forEach(function(t,o){if(e===t){var s=o++;this.setFocusedIndex(s)}}.bind(this));this._bFocusLeft=true};i.prototype.forwardTab=function(t){var e=this._getRootDomRefId()+"-"+(t?"after":"before");document.getElementById(e).focus()};i.prototype._getRootDomRefId=function(t){return this.getRootDomRef().getAttribute("id")};i.prototype.onsaptabnext=function(t){var e=this.getItemDomRefs(),o=this.getFocusedIndex(),s=jQuery(e[o]),i=[];var n=s.find(":sapTabbable");n.map(function(t,e){if(e.className.indexOf("DummyArea")===-1){i.push(e)}});var r=jQuery(i),a=r.length===1?0:r.length-1;if(a===-1||r.control(a)&&r.control(a).getId()===t.target.id){this._lastFocusedElement=t.target;this.forwardTab(true)}};i.prototype.onsaptabprevious=function(t){if(!t.target.classList.contains("sapFGridContainerItemWrapper")){this._lastFocusedElement=t.target;return}var e=t.target.id;if(e===this._getRootDomRefId()+"-nodata"){this.forwardTab(false)}this._lastFocusedElement=null;this.forwardTab(false)};i.prototype.onmousedown=function(e){this._bIsMouseDown=true;t.prototype.onmousedown.call(this,e)};i.prototype.onmouseup=function(t){var e=jQuery(t.target).closest(".sapFGridContainerItemWrapperNoVisualFocus"),o;if(e.length){o=e.children().eq(0).control()[0];if(o&&o.getFocusDomRef()===document.activeElement){this._lastFocusedElement=null;e.trigger("focus");s(o)}}this._bIsMouseDown=false};i.prototype.ondragend=function(){this._bIsMouseDown=false};i.prototype.ondrop=function(){this._bIsMouseDown=false};i.prototype.onfocusin=function(t){e.prototype.onfocusin.call(this,t);if(t.target===this._getGridInstance().getDomRef("after")&&!this.getRootDomRef().contains(t.relatedTarget)){this._focusPrevious(t);return}var i=jQuery(t.target).closest(".sapFGridContainerItemWrapperNoVisualFocus"),n,r,a,u;if(i.length){n=i.children().eq(0).control()[0];if(n){s(n);if(!this._bIsMouseDown&&n.getFocusDomRef()===t.target){this._lastFocusedElement=null;i.trigger("focus");return}}}if(t.target.classList.contains("sapFGridContainerItemWrapper")){this._lastFocusedElement=null}if(this._bFocusLeft&&!this._bIsMouseDown){r=this.getItemDomRefs();a=this.getFocusedIndex();u=this._lastFocusedElement||r[a];if(!o(u,t.target)){u.focus()}}this._bFocusLeft=false};i.prototype._focusPrevious=function(t){var e=this.getItemDomRefs();var o=this.getFocusedIndex();if(!e.length){return}var s;if(o<0){s=e[0];this.setFocusedIndex(0)}else{s=e[o]}var i=jQuery(s);var n=i.find(":sapTabbable");i.add(n).eq(-1).focus()};i.prototype.focusItem=function(e,o){var s,i,n;if(e===this.iFocusedIndex&&this.aItemDomRefs[this.iFocusedIndex]===document.activeElement){this.fireEvent(t.Events.FocusAgain,{index:e,event:o});return}this.fireEvent(t.Events.BeforeFocus,{index:e,event:o});this.setFocusedIndex(e);this.bISetFocus=true;if(o&&jQuery(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot")){s=jQuery(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot");s._sFocusEvent=o.type}if(!this._bIsMouseDown&&this.aItemDomRefs.length){this.aItemDomRefs[this.iFocusedIndex].focus();i=jQuery(this.aItemDomRefs[this.iFocusedIndex].firstChild).control()[0];if(i){n=i.getFocusDomRef();if(n){this.scrollIntoViewIfNeeded(n)}}}this.fireEvent(t.Events.AfterFocus,{index:e,event:o})};i.prototype.scrollIntoViewIfNeeded=function(t){var e=t.parentElement,o,s;while(e&&e.offsetWidth>=e.scrollWidth&&e.offsetHeight>=e.scrollHeight){e=e.parentElement}if(!e){return}e=e.parentElement;if(!e){return}o=e.getBoundingClientRect();s=t.getBoundingClientRect();if(s.top<o.top||s.bottom>o.bottom||s.right>o.right||s.left<o.left){t.scrollIntoView()}};return i});
//# sourceMappingURL=GridContainerItemNavigation.js.map
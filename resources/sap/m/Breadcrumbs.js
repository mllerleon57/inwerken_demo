/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/util/openWindow","sap/m/Text","sap/m/Link","sap/m/Select","sap/ui/core/Item","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/Device","sap/m/library","./BreadcrumbsRenderer","sap/ui/base/ManagedObject","sap/ui/core/InvisibleText"],function(t,e,i,r,o,n,s,a,l,h,u,c,g,d){"use strict";var p=u.SelectType,_=u.BreadcrumbsSeparatorStyle,f=sap.ui.getCore().getLibraryResourceBundle("sap.m");var b=t.extend("sap.m.Breadcrumbs",{metadata:{library:"sap.m",interfaces:["sap.m.IBreadcrumbs","sap.m.IOverflowToolbarContent","sap.ui.core.IShrinkable"],designtime:"sap/m/designtime/Breadcrumbs.designtime",properties:{currentLocationText:{type:"string",group:"Behavior",defaultValue:null},separatorStyle:{type:"sap.m.BreadcrumbsSeparatorStyle",group:"Appearance",defaultValue:_.Slash}},aggregations:{links:{type:"sap.m.Link",multiple:true,singularName:"link"},_currentLocation:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},defaultAggregation:"links",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});b.STYLE_MAPPER={Slash:"/",BackSlash:"\\",DoubleSlash:"//",DoubleBackSlash:"\\\\",GreaterThan:">",DoubleGreaterThan:">>"};b._getResourceBundleText=function(t,e){return f.getText(t,e)};b.prototype.init=function(){this._sSeparatorSymbol=b.STYLE_MAPPER[this.getSeparatorStyle()];this._aCachedInvisibleTexts=[];this._getInvisibleText()};b.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(this._sResizeListenerId){a.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._bControlsInfoCached){this._updateSelect(true)}this._destroyInvisibleTexts();this._aCachedInvisibleTexts=this._buildInvisibleTexts()};b.prototype.onAfterRendering=function(){if(!this._sResizeListenerId){this._sResizeListenerId=a.register(this,this._handleScreenResize.bind(this))}if(!this._bControlsInfoCached){this._updateSelect(true);return}this._configureKeyboardHandling();this.bRenderingPhase=false};b.prototype.onThemeChanged=function(){this._resetControl()};b.prototype.exit=function(){this._resetControl();this._destroyItemNavigation();this._destroyInvisibleTexts();if(this._oInvisibleText){this._oInvisibleText.destroy();this._oInvisibleText=null}};b.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;b.prototype._getAugmentedId=function(t){return this.getId()+"-"+t};b.prototype._getInvisibleText=function(){var t=b._getResourceBundleText("BREADCRUMB_LABEL");if(!this._oInvisibleText){this._oInvisibleText=new d({id:this.getId()+"-InvisibleText"});this._oInvisibleText.setText(t).toStatic()}return this._oInvisibleText};b.prototype._getSelect=function(){if(!this.getAggregation("_select")){this.setAggregation("_select",this._decorateSelect(new o({id:this._getAugmentedId("select"),change:this._selectChangeHandler.bind(this),forceSelection:false,autoAdjustWidth:true,icon:l.getIconURI("slim-arrow-down"),type:p.IconOnly,tooltip:b._getResourceBundleText("BREADCRUMB_SELECT_TOOLTIP")})),true)}return this.getAggregation("_select")};b.prototype._getCurrentLocation=function(){if(!this.getAggregation("_currentLocation")){var t=new i({id:this._getAugmentedId("currentText"),text:this.getCurrentLocationText(),wrapping:false}).addStyleClass("sapMBreadcrumbsCurrentLocation");t.addEventDelegate({onAfterRendering:function(){this._setCurrentLocationAccInfo(t)}.bind(this)});this.setAggregation("_currentLocation",t).addStyleClass("sapMBreadcrumbsCurrentLocation")}return this.getAggregation("_currentLocation")};b.prototype._setCurrentLocationAccInfo=function(t){var e=this._getControlsForBreadcrumbTrail(),i=b._getResourceBundleText("BREADCRUMB_ITEM_POS",[e.length,e.length]);t.$().attr("aria-current","page");t.$().attr("tabindex",0);t.$().attr("role","link");t.$().attr("aria-label",this.getCurrentLocationText()+" "+i)};function C(t,e){var i=Array.prototype.slice.apply(e);i.unshift(t);return i}b.prototype.insertLink=function(t,e){var i=this.insertAggregation.apply(this,C("links",arguments));this._registerControlListener(t);this._resetControl();return i};b.prototype.addLink=function(t){var e=this.addAggregation.apply(this,C("links",arguments));this._registerControlListener(t);this._resetControl();return e};b.prototype.removeLink=function(t){var e=this.removeAggregation.apply(this,C("links",arguments));this._deregisterControlListener(e);this._resetControl();return e};b.prototype.removeAllLinks=function(){var t=this.getAggregation("links",[]);var e=this.removeAllAggregation.apply(this,C("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};b.prototype.destroyLinks=function(){var t=this.getAggregation("links",[]);var e=this.destroyAggregation.apply(this,C("links",arguments));t.forEach(this._deregisterControlListener,this);this._resetControl();return e};b.prototype._destroyInvisibleTexts=function(){var t;this._aCachedInvisibleTexts.forEach(function(e){t=sap.ui.getCore().byId(e.controlId);if(t&&t.removeAriaLabelledBy){t.removeAriaLabelledBy(e.invisibleText.getId())}e.invisibleText.destroy()});this._aCachedInvisibleTexts=[]};b.prototype._decorateSelect=function(t){t.getPicker().attachAfterOpen(this._removeItemNavigation,this).attachBeforeClose(this._restoreItemNavigation,this);t._onBeforeOpenDialog=this._onSelectBeforeOpenDialog.bind(this);t._onBeforeOpenPopover=this._onSelectBeforeOpenPopover.bind(this);t.onsapescape=this._onSelectEscPress.bind(this);return t};b.prototype._removeItemNavigation=function(){this.removeDelegate(this._getItemNavigation())};b.prototype._onSelectBeforeOpenDialog=function(){var t=this._getSelect();if(this.getCurrentLocationText()&&h.system.phone){t.setSelectedIndex(0)}else{t.setSelectedItem(null)}o.prototype._onBeforeOpenDialog.call(t);this._removeItemNavigation()};b.prototype._onSelectBeforeOpenPopover=function(){this._getSelect().setSelectedItem(null);this._removeItemNavigation()};b.prototype._restoreItemNavigation=function(){this.addDelegate(this._getItemNavigation())};b.prototype._onSelectEscPress=function(){this._getSelect().close()};b.prototype._createSelectItem=function(t){return new n({key:t.getId(),text:g.escapeSettingsValue(t.getText())})};b.prototype._selectChangeHandler=function(t){var i,o,n,s=t.getParameter("selectedItem");if(!s){return}if(!this._getSelect().isOpen()){return}i=sap.ui.getCore().byId(s.getKey());if(!(i instanceof r)){return}o=i.getHref();n=i.getTarget();i.firePress();if(o){if(n){e(o,n)}else{window.location.href=o}}};b.prototype._getItemsForMobile=function(){var t=this.getLinks().filter(function(t){return t.getVisible()});if(this.getCurrentLocationText()){t.push(this._getCurrentLocation())}return t};b.prototype._updateSelect=function(t){var e=this._getSelect(),i,r=this._getControlDistribution();if(!this._bControlDistributionCached||t){e.destroyItems();i=h.system.phone?this._getItemsForMobile():r.aControlsForSelect;i.map(this._createSelectItem).reverse().forEach(e.insertItem,e);this._bControlDistributionCached=true;this.invalidate(this)}e.setVisible(!!r.aControlsForSelect.length);if(!this._sResizeListenerId&&!this.bRenderingPhase){this._sResizeListenerId=a.register(this,this._handleScreenResize.bind(this))}};b.prototype._getControlsForBreadcrumbTrail=function(){var t;if(this._bControlDistributionCached&&this._oDistributedControls){return this._oDistributedControls.aControlsForBreadcrumbTrail}t=this.getLinks().filter(function(t){return t.getVisible()});if(this.getCurrentLocationText()){return t.concat([this._getCurrentLocation()])}return t};b.prototype._getControlInfo=function(t){return{id:t.getId(),control:t,width:m(t.$().parent()),bCanOverflow:t instanceof r}};b.prototype._buildInvisibleTexts=function(){var t=this._getControlsForBreadcrumbTrail(),e=t.length,i,r=[];t.forEach(function(t,o){if(!t.isA("sap.m.Link")){return}i=new d({text:b._getResourceBundleText("BREADCRUMB_ITEM_POS",[o+1,e])}).toStatic();if(t.getAriaLabelledBy().indexOf(t.getId())===-1){t.addAriaLabelledBy(t.getId())}t.addAriaLabelledBy(i.getId());r.push({controlId:t.getId(),invisibleText:i})});return r};b.prototype._getControlDistribution=function(t){t=t||this._iContainerSize;this._iContainerSize=t;this._oDistributedControls=this._determineControlDistribution(t);return this._oDistributedControls};b.prototype._getSelectWidth=function(){return this._getSelect().getVisible()&&this._iSelectWidth||0};b.prototype._determineControlDistribution=function(t){var e,i,r=this._getControlsInfo().aControlInfo,o=this._getSelectWidth(),n=[],s=[],a=o;for(e=r.length-1;e>=0;e--){i=r[e];a+=i.width;if(r.length-1===e){s.push(i.control);continue}if(e===0){a-=o}if(a>t&&i.bCanOverflow){n.unshift(i.control)}else{s.unshift(i.control)}}return{aControlsForBreadcrumbTrail:s,aControlsForSelect:n}};b.prototype._getControlsInfo=function(){if(!this._bControlsInfoCached){this._iSelectWidth=m(this._getSelect().$().parent())||0;this._aControlInfo=this._getControlsForBreadcrumbTrail().map(this._getControlInfo);this._iContainerSize=Math.ceil(m(this.$()));this._bControlsInfoCached=true}return{aControlInfo:this._aControlInfo,iSelectWidth:this._iSelectWidth,iContentSize:this._iContainerSize}};b.prototype._handleScreenResize=function(t){var e,i,r;if(t.size.width===t.oldSize.width||t.size.width===0){return this}e=this._oDistributedControls.aControlsForBreadcrumbTrail.length;i=this._getControlDistribution(Math.ceil(m(this.$())));r=i.aControlsForBreadcrumbTrail.length;if(e!==r){this._updateSelect(true)}return this};b.prototype._getItemsToNavigate=function(){var t=this._getControlsForBreadcrumbTrail().slice(),e=this._getSelect();if(e.getVisible()){t.unshift(e)}return t};b.prototype._getItemNavigation=function(){if(!this._itemNavigation){this._itemNavigation=new s}return this._itemNavigation};b.prototype._destroyItemNavigation=function(){if(this._itemNavigation){this.removeEventDelegate(this._itemNavigation);this._itemNavigation.destroy();this._itemNavigation=null}};b.prototype._configureKeyboardHandling=function(){var t=this._getItemNavigation(),e=-1,i=this._getItemsToNavigate(),r=[];if(i.length===0){return}i.forEach(function(t,e){if(e===0){t.$().attr("tabindex","0")}t.$().attr("tabindex","-1");r.push(t.getFocusDomRef())});this.addDelegate(t);t.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"],saphome:["alt"],sapend:["alt"]});t.setCycling(false);t.setPageSize(b.PAGEUP_AND_PAGEDOWN_JUMP_SIZE);t.setRootDomRef(this.getDomRef());t.setItemDomRefs(r);t.setSelectedIndex(e);return this};b.prototype._registerControlListener=function(t){if(t){t.attachEvent("_change",this._resetControl,this)}};b.prototype._deregisterControlListener=function(t){if(t){t.detachEvent("_change",this._resetControl,this)}};b.prototype.setCurrentLocationText=function(t){var e=this._getCurrentLocation(),i=this.setProperty("currentLocationText",t,true);if(e.getText()!==t){e.setText(t);this._resetControl()}return i};b.prototype.setSeparatorStyle=function(t){this.setProperty("separatorStyle",t);var e=b.STYLE_MAPPER[this.getSeparatorStyle()];if(e){this._sSeparatorSymbol=e}return this};b.prototype._resetControl=function(){this._aControlInfo=null;this._iContainerSize=null;this._bControlsInfoCached=null;this._bControlDistributionCached=null;this._oDistributedControls=null;if(this._sResizeListenerId){a.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.removeDelegate(this._getItemNavigation());this.invalidate(this);return this};b.prototype.getOverflowToolbarConfig=function(){var t={canOverflow:true,getCustomImportance:function(){return"Medium"}};return t};function m(t){var e;if(t.length){e=t.outerWidth(true)-t.outerWidth();return t.get(0).getBoundingClientRect().width+e}}return b});
//# sourceMappingURL=Breadcrumbs.js.map
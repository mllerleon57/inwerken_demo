/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/Text","sap/ui/core/HTML","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Button","sap/m/GenericTileRenderer","sap/m/GenericTileLineModeRenderer","sap/m/Image","sap/ui/Device","sap/ui/core/ResizeHandler","sap/base/strings/camelize","sap/base/util/deepEqual","sap/ui/events/PseudoEvents","sap/ui/core/theming/Parameters","sap/ui/thirdparty/jquery","sap/ui/core/library"],function(e,t,i,o,s,a,n,r,l,h,p,d,c,u,g,f,jQuery,_){"use strict";var y=e.GenericTileScope,m=e.LoadState,T=_.CSSColor,v=e.FrameType,M=e.Size,A=e.GenericTileMode,S=e.TileSizeBehavior,I=e.WrappingType,C=e.URLHelper,b;b=f.get({name:"sapLegendColor9",callback:function(e){b=e}});var R="GenericTileDeviceSet";var x={};var L=t.extend("sap.m.GenericTile",{metadata:{library:"sap.m",properties:{mode:{type:"sap.m.GenericTileMode",group:"Appearance",defaultValue:A.ContentMode},header:{type:"string",group:"Appearance",defaultValue:null},subheader:{type:"string",group:"Appearance",defaultValue:null},failedText:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Misc",defaultValue:M.Auto,deprecated:true},frameType:{type:"sap.m.FrameType",group:"Misc",defaultValue:v.OneByOne},systemInfo:{type:"string",group:"Misc",defaultValue:null},appShortcut:{type:"string",group:"Misc",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},headerImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},state:{type:"sap.m.LoadState",group:"Misc",defaultValue:m.Loaded},imageDescription:{type:"string",group:"Accessibility",defaultValue:null},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:y.Display},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:S.Responsive},ariaLabel:{type:"string",group:"Accessibility",defaultValue:null},ariaRole:{type:"string",group:"Accessibility",defaultValue:null},ariaRoleDescription:{type:"string",group:"Accessibility",defaultValue:null},url:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},enableNavigationButton:{type:"boolean",group:"Misc",defaultValue:false},pressEnabled:{type:"boolean",group:"Misc",defaultValue:true},navigationButtonText:{type:"string",group:"Misc",defaultValue:null},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:I.Normal},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},additionalTooltip:{type:"string",group:"Accessibility",defaultValue:null},tileIcon:{type:"sap.ui.core.URI",multiple:false},backgroundColor:{type:"string",group:"Appearance",defaultValue:b},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"None"},iconLoaded:{type:"boolean",group:"Misc",defaultValue:true},renderOnThemeChange:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"tileContent",aggregations:{tileContent:{type:"sap.m.TileContent",multiple:true,bindable:"bindable"},icon:{type:"sap.ui.core.Control",multiple:false,deprecated:true},actionButtons:{type:"sap.m.Button",multiple:true,bindable:"bindable"},_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_failedMessageText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_tileIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_tileIconImage:{type:"sap.m.Image",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}},renderer:{apiVersion:2,render:function(e,t){if(t.getMode()===A.LineMode){l.render(e,t)}else{r.render(e,t)}}}});L._Action={Press:"Press",Remove:"Remove",More:"More"};L.LINEMODE_SIBLING_PROPERTIES=["state","subheader","header","scope"];L.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");if(!p.media.hasRangeSet(R)){p.media.initRangeSet(R,[450],"px",["small","large"])}this._oTitle=new i(this.getId()+"-title");this._oTitle.addStyleClass("sapMGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("_titleText",this._oTitle,true);this._oAppShortcut=new i(this.getId()+"-appShortcut");this._oAppShortcut.cacheLineHeight=false;this.addDependent(this._oAppShortcut);this._oSystemInfo=new i(this.getId()+"-systemInfo");this._oSystemInfo.cacheLineHeight=false;this.addDependent(this._oSystemInfo);this._oSubTitle=new i(this.getId()+"-subTitle");this._oSubTitle.cacheLineHeight=false;this.addDependent(this._oSubTitle);this._sFailedToLoad=this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._oRb.getText("INFOTILE_LOADING");this._oFailedText=new i(this.getId()+"-failed-txt",{maxLines:2});this._oFailedText.cacheLineHeight=false;this._oFailedText.addStyleClass("sapMGTFailed");this.setAggregation("_failedMessageText",this._oFailedText,true);this._oWarningIcon=new s(this.getId()+"-warn-icon",{src:"sap-icon://notification",size:"1.375rem"});this._oWarningIcon.addStyleClass("sapMGTFtrFldIcnMrk");this._oBusy=new o(this.getId()+"-overlay");this._oBusy.setBusyIndicatorDelay(0);this._bTilePress=true;this._sBGColor=b;this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}this._oNavigateAction=new n(this.getId()+"-navigateAction");this._oNavigateAction._bExcludeFromTabChain=true;this.addDependent(this._oNavigateAction)};L.prototype.setWrappingType=function(e){this.setProperty("wrappingType",e,true);this._oTitle.setWrappingType(e);this._oFailedText.setWrappingType(e);this._oSubTitle.setWrappingType(e);this._oAppShortcut.setWrappingType(e);this._oSystemInfo.setWrappingType(e);return this};L.prototype.setSubheader=function(e){this.setProperty("subheader",e);this._oSubTitle.setText(e);return this};L.prototype.setAppShortcut=function(e){this.setProperty("appShortcut",e);this._oAppShortcut.setText(e);return this};L.prototype.setSystemInfo=function(e){this.setProperty("systemInfo",e);this._oSystemInfo.setText(e);return this};L.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};L.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._oTitle.clampHeight();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};L.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getRenderOnThemeChange()){this.invalidate()}};L.prototype._initScopeContent=function(e){if(!this.getState||this.getState()!==m.Disabled){if(this._oMoreIcon){this._oMoreIcon.destroy();this._oMoreIcon=null}if(this.isA("sap.m.GenericTile")&&this._isIconMode()&&this.getFrameType()===v.TwoByHalf){this._oMoreIcon=this._oMoreIcon||new n({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Transparent",tooltip:this._oRb.getText("GENERICTILE_MORE_ACTIONBUTTON_TEXT")}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon").addStyleClass(e+"ActionMoreButton");this._oMoreIcon.ontouchstart=function(){this.removeFocus()}.bind(this)}else{this._oMoreIcon=this._oMoreIcon||new n({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Unstyled"}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon");this._oMoreIcon._bExcludeFromTabChain=true}this._oRemoveButton=this._oRemoveButton||new n({id:this.getId()+"-action-remove",icon:"sap-icon://decline",tooltip:this._oRb.getText("GENERICTILE_REMOVEBUTTON_TEXT")}).addStyleClass("sapUiSizeCompact").addStyleClass(e+"RemoveButton");this._oRemoveButton._bExcludeFromTabChain=true;switch(this.getScope()){case y.Actions:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(true);break;case y.ActionMore:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(false);break;case y.ActionRemove:this._oRemoveButton.setVisible(true);this._oMoreIcon.setVisible(false);break;default:}}};L.prototype._addClassesForButton=function(){this._oMoreIcon.getDomRef().classList.add("sapMBtn");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnInner");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnTransparent")};L.prototype.removeFocus=function(){this.getDomRef().classList.add("sapMGTActionButtonPress");this._oMoreIcon._activeButton()};L.prototype._isSmall=function(){return this.getSizeBehavior()===S.Small||window.matchMedia("(max-width: 374px)").matches};L.prototype.exit=function(){if(this._sParentResizeListenerId){d.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}p.media.detachHandler(this._handleMediaChange,this,R);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());this._$RootNode=null}this._clearAnimationUpdateQueue();this._oWarningIcon.destroy();if(this._oImage){this._oImage.destroy()}this._oBusy.destroy();if(this._oMoreIcon){this._oMoreIcon.destroy()}if(this._oRemoveButton){this._oRemoveButton.destroy()}if(this._oNavigateAction){this._oNavigateAction.destroy()}};L.prototype.onBeforeRendering=function(){var e=!!this.getSubheader();if(this.getMode()===A.HeaderMode||this.getMode()===A.IconMode){this._applyHeaderMode(e)}else{this._applyContentMode(e)}var t=this.getTileContent().length;for(var i=0;i<t;i++){this.getTileContent()[i].setProperty("disabled",this.getState()===m.Disabled,true)}this._initScopeContent("sapMGT");this._generateFailedText();this.$().off("mouseenter");this.$().off("mouseleave");if(this._sParentResizeListenerId){d.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}var o=this.getParent();if(o&&o.isA("sap.f.GridContainer")){this._applyExtraWidth()}if(o&&o.getParent()&&o.getParent().isA("sap.f.GridContainer")&&o.isA("sap.m.SlideTile")){this._applyExtraWidth(o.getParent(),true)}p.media.detachHandler(this._handleMediaChange,this,R);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents())}if(this.getFrameType()===v.Auto){this.setProperty("frameType",v.OneByOne,true)}if(this.getMode()!==A.LineMode&&(this.getAppShortcut()||this.getSystemInfo())){this._setMaxLines()}if(this._isNavigateActionEnabled()){var s=this.getNavigationButtonText()?this.getNavigationButtonText():this._oRb.getText("ACTION_READ_MORE");this._oNavigateAction.setText(s);this._oNavigateAction.detachPress(this._navigateEventHandler,this)}if(this._isIconMode()){this._validateBackgroundColor()}};L.prototype.onAfterRendering=function(){this._setupResizeClassHandler();this.$().on("mouseenter",this._updateAriaAndTitle.bind(this));this.$().on("mouseleave",this._removeTooltipFromControl.bind(this));var e=this.getMode();var i=this._isScreenLarge();if(e===A.LineMode){var o=this.$().parent();if(i){this._updateHoverStyle(true);if(this.getParent()instanceof t){this._sParentResizeListenerId=d.register(this.getParent(),this._handleResize.bind(this))}else{this._sParentResizeListenerId=d.register(o,this._handleResize.bind(this))}}}if(e===A.LineMode&&this._bUpdateLineTileSiblings){this._updateLineTileSiblings();this._bUpdateLineTileSiblings=false}if(e===A.LineMode){p.media.attachHandler(this._handleMediaChange,this,R)}if(this._isNavigateActionEnabled()){this._oNavigateAction.attachPress(this._navigateEventHandler,this)}if(this._oMoreIcon&&this._oMoreIcon.getDomRef()&&!this._isIconMode()){this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMBtnHoverable");this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMFocusable")}if(this._isIconMode()&&this.getFrameType()===v.TwoByHalf&&this._oMoreIcon.getDomRef()){this._addClassesForButton()}if(this.getFrameType()===v.TwoByOne&&this.getMode()===A.ActionMode&&this.getState()===m.Loaded){this._applyExtraHeight()}this.onDragComplete()};L.prototype._applyExtraHeight=function(){var e=this.getDomRef("hdr-text").offsetHeight,t=parseInt(getComputedStyle(this.getDomRef("title")).lineHeight.slice(0,2)),i=Math.ceil(e/t);if(i===1&&!this.getHeaderImage()){this.getDomRef("content").classList.add("sapMGTFtrMarginTop")}else{this.getDomRef("content").classList.remove("sapMGTFtrMarginTop")}};L.prototype._validateBackgroundColor=function(){var e=this.getBackgroundColor();if(T.isValid(e)){this._sBGColor=e}else{var t=f.get({name:e,callback:function(e){this._sBGColor=e?e:b}.bind(this)});if(t){this._sBGColor=t}}};L.prototype._setMaxLines=function(){var e=this.getFrameType(),t=e===v.OneByOne||e===v.TwoByHalf?1:2;this._oAppShortcut.setProperty("maxLines",t,true);this._oSystemInfo.setProperty("maxLines",t,true);if(this.getFrameType()===v.TwoByHalf){var i=this.getAppShortcut().length>11,o=this.getSystemInfo().length>11;if(i&&o||i){this._oAppShortcut.setProperty("maxLines",2,true)}else if(o){this._oSystemInfo.setProperty("maxLines",2,true)}}};L.prototype.onDragComplete=function(){if(this.hasStyleClass("sapMGTPressActive")){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===A.LineMode){this.removeStyleClass("sapMGTLineModePress")}}};L.prototype._handleResize=function(){if(this.getMode()===A.LineMode&&this._isScreenLarge()&&this.getParent()){this._queueAnimationEnd()}};L.prototype._setupResizeClassHandler=function(){var e=function(){if(this.getSizeBehavior()===S.Small||window.matchMedia("(max-width: 374px)").matches||this._isSmallStretchTile()){this.$().addClass("sapMTileSmallPhone");if(this._isSmallStretchTile()){this.addStyleClass("sapMGTStretch")}}else{this.$().removeClass("sapMTileSmallPhone");this.removeStyleClass("sapMGTStretch")}}.bind(this);jQuery(window).on("resize",e);e()};L.prototype._isSmallStretchTile=function(){return this.getFrameType()===v.Stretch&&window.matchMedia("(max-width: 600px)").matches};L.prototype._isCompact=function(){return jQuery("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0};L.prototype._calculateStyleData=function(){this.$("lineBreak").remove();if(!this._isScreenLarge()||!this.getDomRef()||this.$().is(":hidden")){return null}var e=this.$(),t=this.$("endMarker"),i=this.$("startMarker");if(t.length===0||i.length===0){return null}var o=this._getLineCount(),s,a,n=Math.ceil(l._getCSSPixelValue(this,"margin-top")),r,h=this.$().parent().innerWidth(),d=Math.ceil(l._getCSSPixelValue(this,"min-height")),c=l._getCSSPixelValue(this,"line-height"),u=this.$().is(":not(:first-child)")&&o>1,g=jQuery("<span><br></span>"),f=0,_=sap.ui.getCore().getConfiguration().getRTL(),y=t.position();if(u){g.attr("id",this.getId()+"-lineBreak");e.prepend(g);o=this._getLineCount();y=t.position()}var m={rtl:_,lineBreak:u,startOffset:i.offset(),endOffset:t.offset(),availableWidth:h,lines:[]};var T;if(p.browser.msie||p.browser.edge){T=g.find("br").position()}else{T=g.position()}var v=T;if(!(p.browser.mozilla||p.browser.msie||p.browser.edge)&&T.left<y.left){v=y}m.positionLeft=u?T.left:e.position().left;m.positionRight=u?e.width()-v.left:m.availableWidth-e.position().left;if(!u&&o>1){m.positionRight=i.parent().innerWidth()-(i.position().left+i.width())}for(f;f<o;f++){if(u&&f===0){continue}if(o===1){s=_?m.availableWidth-m.positionLeft:m.positionLeft;r=e.width()}else if(f===o-1){s=0;r=_?e.width()-y.left:y.left}else if(u&&f===1){s=0;r=h}else{s=0;r=h}a=f*c+n;m.lines.push({offset:{x:s,y:a},width:r,height:d})}return m};L.prototype._getStyleData=function(){var e=this._calculateStyleData();if(!u(this._oStyleData,e)){delete this._oStyleData;this._oStyleData=e;return true}return false};L.prototype._getAnimationEvents=function(){return"transitionend.sapMGT$id animationend.sapMGT$id".replace(/\$id/g,c(this.getId()))};L.prototype._updateHoverStyle=function(e){if(!this._getStyleData()&&!e){return}this._clearAnimationUpdateQueue();this._cHoverStyleUpdates=-1;this._oAnimationEndCallIds={};if(this._oStyleData&&this._oStyleData.lineBreak&&this.getUIArea()){this._$RootNode=jQuery(this.getUIArea().getRootNode());this._$RootNode.on(this._getAnimationEvents(),this._queueAnimationEnd.bind(this))}this._queueAnimationEnd()};L.prototype._queueAnimationEnd=function(e){if(e){var t=jQuery(e.target);if(t.is(".sapMGT, .sapMGT *")){return false}}if(typeof this._cHoverStyleUpdates!=="number"){this._cHoverStyleUpdates=-1}if(!this._oAnimationEndCallIds){this._oAnimationEndCallIds={}}this._cHoverStyleUpdates++;this._oAnimationEndCallIds[this._cHoverStyleUpdates]=setTimeout(this._handleAnimationEnd.bind(this,this._cHoverStyleUpdates),10)};L.prototype._handleAnimationEnd=function(e){delete this._oAnimationEndCallIds[e];if(this._cHoverStyleUpdates===e){this._getStyleData();l._updateHoverStyle.call(this)}};L.prototype._clearAnimationUpdateQueue=function(){for(var e in this._oAnimationEndCallIds){clearTimeout(this._oAnimationEndCallIds[e]);delete this._oAnimationEndCallIds[e]}};L.prototype._getLineCount=function(){var e=this.getDomRef().getBoundingClientRect(),t=l._getCSSPixelValue(this,"line-height");return Math.round(e.height/t)};L.prototype.getBoundingRects=function(){var e=this.$().offset();return[{offset:{x:e.left,y:e.top},width:this.$().outerWidth(),height:this.$().height()}]};L.prototype._updateLineTileSiblings=function(){var e=this.getParent();if(this.getMode()===A.LineMode&&this._isScreenLarge()&&e){var t=e.indexOfAggregation(this.sParentAggregationName,this);var i=e.getAggregation(this.sParentAggregationName).splice(t+1);for(t=0;t<i.length;t++){var o=i[t];if(o instanceof L&&o.getMode()===A.LineMode){o._updateHoverStyle()}}}};L.prototype.ontouchstart=function(e){if(e&&e.target.id.indexOf("-action-more")===-1&&this.getDomRef()){this.getDomRef().classList.remove("sapMGTActionButtonPress")}this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}if(this.getMode()===A.LineMode){this.addStyleClass("sapMGTLineModePress")}};L.prototype.ontouchcancel=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}};L.prototype.ontouchend=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===A.LineMode){this.removeStyleClass("sapMGTLineModePress")}};L.prototype.ontap=function(e){if(!B(e,this)){var t;if(this._bTilePress&&this.getState()!==m.Disabled){this.$().trigger("focus");t=this._getEventParams(e);if(!(this.isInActionRemoveScope()&&t.action===L._Action.Press)){this.firePress(t)}e.preventDefault()}}};var P=false;L.prototype.onkeydown=function(e){if(!B(e,this)){P=e.keyCode===16||e.keyCode===27?true:false;var t=x[e.keyCode];if(!t){x[e.keyCode]=true;if(x[32]||x[13]){e.preventDefault()}}if(g.events.sapselect.fnCheck(e)&&this.getState()!==m.Disabled){this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}e.preventDefault()}}};L.prototype._updateAriaLabel=function(){var e=this._getAriaText(),t=this.$(),i=false;if(t.attr("aria-label")!==e){t.attr("aria-label",e);i=true}return i};L.prototype.onsaptabnext=function(e){if(this._isIconMode()&&this.getFrameType()===v.TwoByHalf&&e&&e.keyCode){if(e.keyCode===9&&e.srcControl.getId()==this._oMoreIcon.getId()){this._oMoreIcon.removeStyleClass("sapMGTVisible")}else if(e.keyCode===9){this._oMoreIcon.addStyleClass("sapMGTVisible")}}};L.prototype.onkeyup=function(e){if(!B(e,this)){var t=x[e.keyCode];if(t){delete x[e.keyCode]}var i,o=false,s=this.getScope(),a=s===y.Actions||s===y.ActionRemove;if(a&&(g.events.sapdelete.fnCheck(e)||g.events.sapbackspace.fnCheck(e))){i={scope:s,action:L._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};o=true}if(x[16]&&e.keyCode!==16&&this.getState()!==m.Disabled){P===false}if((g.events.sapselect.fnCheck(e)||P)&&this.getState()!==m.Disabled){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}i=this._getEventParams(e);o=true}if(!P&&o){this.firePress(i);e.preventDefault()}this._updateAriaLabel()}};L.prototype.setProperty=function(e){t.prototype.setProperty.apply(this,arguments);if(this.getMode()===A.LineMode&&L.LINEMODE_SIBLING_PROPERTIES.indexOf(e)!==-1){this._bUpdateLineTileSiblings=true}return this};L.prototype.getHeader=function(){return this._oTitle.getText()};L.prototype.setHeader=function(e){this.setProperty("header",e);this._oTitle.setText(e);return this};L.prototype.setHeaderImage=function(e){var t=!u(this.getHeaderImage(),e);if(t){if(this._oImage){this._oImage.destroy();this._oImage=undefined}if(e){this._oImage=a.createControlByURI({id:this.getId()+"-icon-image",src:e},h);this._oImage.addStyleClass("sapMGTHdrIconImage")}}return this.setProperty("headerImage",e)};L.prototype._applyHeaderMode=function(e){var t=this.getFrameType();if(this._isIconMode()){if(e){this._oTitle.setProperty("maxLines",1,true)}else{this._oTitle.setProperty("maxLines",2,true)}}else if(t===v.TwoByOne&&this.getMode()===A.ActionMode){this._oTitle.setProperty("maxLines",2,true)}else if(t===v.OneByHalf||t===v.TwoByHalf){this._oTitle.setProperty("maxLines",2,true)}else{if(e){this._oTitle.setProperty("maxLines",4,true)}else{this._oTitle.setProperty("maxLines",5,true)}}this._changeTileContentContentVisibility(false)};L.prototype._applyContentMode=function(e){var t=this.getFrameType();var i=this.getTileContent();var o=false;if(t===v.TwoByHalf||t===v.OneByHalf){if(i.length){for(var s=0;s<i.length;s++){var a=i[s].getAggregation("content");if(a!==null){if(t===v.OneByHalf&&a.getMetadata().getName()==="sap.m.ImageContent"){o=true;this._oTitle.setProperty("maxLines",2,true);break}else{this._oTitle.setProperty("maxLines",1,true);break}}this._oTitle.setProperty("maxLines",2,true)}}else{this._oTitle.setProperty("maxLines",2,true)}}else if(t===v.TwoByOne&&this.getMode()===A.ActionMode){if(e){this._oTitle.setProperty("maxLines",1,true)}else{this._oTitle.setProperty("maxLines",2,true)}}else if(e){this._oTitle.setProperty("maxLines",2,true)}else{this._oTitle.setProperty("maxLines",3,true)}this._changeTileContentContentVisibility(true,t,o)};L.prototype._changeTileContentContentVisibility=function(e,t,i){var o;o=this.getTileContent();for(var s=0;s<o.length;s++){if(t==v.OneByHalf&&i){o[s].setRenderContent(false)}else{o[s].setRenderContent(e)}}};L.prototype._getHeaderAriaAndTooltipText=function(){var e="";var t=true;if(this.getHeader()){e+=this.getHeader();t=false}if(this.getSubheader()){e+=(t?"":"\n")+this.getSubheader();t=false}if(this.getImageDescription()){e+=(t?"":"\n")+this.getImageDescription()}return e};L.prototype._getContentAriaAndTooltipText=function(){var e="";var t=true;var i=this.getTileContent();var o=this.getAdditionalTooltip();if(!this._isInActionScope()&&(this.getMode()===A.ContentMode||this.getMode()===A.ArticleMode||this.getMode()===A.ActionMode)){for(var s=0;s<i.length;s++){if(i[s].getVisible()){if(typeof i[s]._getAriaAndTooltipText==="function"){e+=(t?"":"\n")+i[s]._getAriaAndTooltipText()}else if(i[s].getTooltip_AsString()){e+=(t?"":"\n")+i[s].getTooltip_AsString()}t=false}}}if(o){e+=(t?"":"\n")+o}return e};L.prototype._getAriaAndTooltipText=function(){var e=this.getTooltip_AsString()&&!this._isTooltipSuppressed()?this.getTooltip_AsString():this._getHeaderAriaAndTooltipText()+"\n"+this._getContentAriaAndTooltipText();switch(this.getState()){case m.Disabled:return"";case m.Loading:return e+"\n"+this._sLoading;case m.Failed:return e+"\n"+this._oFailedText.getText();default:if(e.trim().length===0){return""}else{return e}}};L.prototype._getAriaText=function(){var e=this.getTooltip_Text();var t=this.getAriaLabel();if(!e||this._isTooltipSuppressed()){e=this._getAriaAndTooltipText()}if(this._isInActionScope()&&this.getScope()!==y.ActionMore){e=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+" "+e}if(t){e=t+" "+e}return e};L.prototype._getTooltipText=function(){var e=this.getTooltip_Text();if(this._isTooltipSuppressed()===true){e=null}return e};L.prototype._checkFooter=function(e,t){var i=t.getState();var o=this._isInActionScope()||this._bShowActionsView===true;var s=this.getFrameType();var a=e.getAggregation("content");if(this._isIconMode()){e.setRenderFooter(false)}else if(i===m.Failed||o&&i!==m.Disabled){e.setRenderFooter(false)}else if(s===v.TwoByHalf&&(a!==null||this.getSubheader())){e.setRenderFooter(false)}else if(s===v.OneByHalf&&(a!==null&&a.getMetadata().getName()!=="sap.m.ImageContent"||this.getSubheader())){e.setRenderFooter(false)}else{e.setRenderFooter(true);return true}};L.prototype._isInActionScope=function(){return this.getScope()===y.Actions||this.getScope()===y.ActionMore||this.getScope()===y.ActionRemove};L.prototype.isInActionRemoveScope=function(){return this.getScope()===y.ActionRemove};L.prototype._generateFailedText=function(){var e=this.getFailedText();var t=e?e:this._sFailedToLoad;this._oFailedText.setProperty("text",t,true);this._oFailedText.setAggregation("tooltip",t,true)};L.prototype._isTooltipSuppressed=function(){var e=this.getTooltip_Text();if(e&&e.length>0&&e.trim().length===0){return true}else{return false}};L.prototype._isHeaderTextTruncated=function(){var e,t,i,o;if(this.getMode()===A.LineMode){i=this.$("hdr-text");if(i.length>0){o=Math.ceil(i[0].getBoundingClientRect().width);return i[0]&&o<i[0].scrollWidth}else{return false}}else{e=this.getAggregation("_titleText").getDomRef("inner");t=this.getAggregation("_titleText").getClampHeight(e);return t<e.scrollHeight}};L.prototype._isSubheaderTextTruncated=function(){var e;if(this.getMode()===A.LineMode){e=this.$("subHdr-text")}else{e=this.$("subTitle")}if(e.length>0){var t=Math.ceil(e[0].getBoundingClientRect().width);return e[0]&&t<e[0].scrollWidth}else{return false}};L.prototype._setTooltipFromControl=function(){var e=this._getAriaAndTooltipText();if(e&&!this._getTooltipText()&&!this._isTooltipSuppressed()){this.$().attr("title",e.trim());this._bTooltipFromControl=true}};L.prototype._updateAriaAndTitle=function(){var e=this._getAriaAndTooltipText();var t=this._getAriaText();var i=this.$();if(i.attr("title")!==e){i.attr("aria-label",t)}if(this._isInActionScope()){i.find("*:not(.sapMGTRemoveButton,.sapMGTActionMoreButton)").removeAttr("aria-label").removeAttr("title").off("mouseenter")}else{i.find("*").removeAttr("aria-label").removeAttr("title").off("mouseenter")}this._setTooltipFromControl()};L.prototype._removeTooltipFromControl=function(){if(this._bTooltipFromControl){this.$().removeAttr("title");this._bTooltipFromControl=false}};L.prototype._isScreenLarge=function(){return this._getCurrentMediaContainerRange(R).name==="large"};L.prototype._getEventParams=function(e){var t,i=L._Action.Press,o=this.getScope(),s=this.getDomRef();if((o===y.Actions||y.ActionRemove)&&e.target.id.indexOf("-action-remove")>-1){i=L._Action.Remove;s=this._oRemoveButton.getPopupAnchorDomRef()}else if((o===y.Actions||o===y.ActionMore)&&this._isIconMode&&this._isIconMode()&&e.target.id.indexOf("-action-more")>-1){i=L._Action.More;s=this._oMoreIcon.getDomRef()}else if(o===y.Actions||o===y.ActionMore){s=this._oMoreIcon.getDomRef()}t={scope:o,action:i,domRef:s};return t};L.prototype._handleMediaChange=function(){this._bUpdateLineTileSiblings=true;this.invalidate()};L.prototype.setPressEnabled=function(e){this._bTilePress=e;this.setProperty("pressEnabled",e);return this};L.prototype.showActionsView=function(e){if(this._bShowActionsView!==e){this._bShowActionsView=e;this.invalidate()}};L.prototype._generateIconAggregation=function(e){var t="";this._oIcon=a.createControlByURI({size:this.getFrameType()===v.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e});if(!this._oIcon){this._oIcon=a.createControlByURI({height:this.getFrameType()===v.OneByOne?"2rem":"1.25rem",width:this.getFrameType()===v.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e},h).addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon")}this._oIcon.addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon");if(this._oIcon instanceof h){t="_tileIconImage"}else if(this._oIcon instanceof s){t="_tileIcon"}if(t){this.setAggregation(t,this._oIcon)}return t};L.prototype._isIconMode=function(){if(this.getMode()===A.IconMode&&(this.getFrameType()===v.OneByOne||this.getFrameType()===v.TwoByHalf)){if(this.getTileIcon()&&this.getBackgroundColor()){return true}else{if(!this.getIconLoaded()){return true}else{return false}}}else{return false}};L.prototype._isNavigateActionEnabled=function(){return this.getMode()===A.ArticleMode&&this.getUrl()&&this.getEnableNavigationButton()};L.prototype._applyExtraWidth=function(e,t){var i;if(t==true){i=e.getActiveLayoutSettings().getGap()}else{i=this.getParent().getActiveLayoutSettings().getGap()}var o=this.getFrameType()===v.TwoByHalf||this.getFrameType()===v.TwoByOne,s=i==="16px"||i==="1rem";if(s&&o){this.addStyleClass("sapMGTWidthForGridContainer")}else if(!s&&this.hasStyleClass("sapMGTWidthForGridContainer")){this.removeStyleClass("sapMGTWidthForGridContainer")}};L.prototype._isActionMode=function(){return this.getFrameType()===v.TwoByOne&&this.getMode()===A.ActionMode&&this.getActionButtons().length};L.prototype._getNavigateAction=function(){return this._oNavigateAction};L.prototype._navigateEventHandler=function(e){e.preventDefault();var t=e.getSource().getParent().getUrl();C.redirect(t,true)};function B(e,t){var i=false,o=false;if(t._isActionMode()){var s=document.querySelector("#"+t.getId()+"-actionButtons");i=s&&s!==e.target&&s.contains(e.target)}if(t._isNavigateActionEnabled()){var a=document.querySelector("#"+t.getId()+"-navigateActionContainer");o=a&&a!==e.target&&a.contains(e.target)}return i||o}return L});
//# sourceMappingURL=GenericTile.js.map
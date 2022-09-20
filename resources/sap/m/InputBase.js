/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","./delegate/ValueStateMessage","sap/ui/core/message/MessageMixin","sap/ui/core/InvisibleMessage","sap/ui/core/library","sap/ui/Device","./InputBaseRenderer","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(e,t,a,s,i,n,o,r,u,l,p,c,jQuery){"use strict";var h=r.TextDirection;var g=r.TextAlign;var f=r.ValueState;var d=t.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:f.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:g.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:h.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{formattedValueStateText:{type:"sap.m.FormattedText",multiple:false,defaultValue:null},_invisibleFormattedValueStateText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden",defaultValue:null},_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"}});a.call(d.prototype);s.insertFontFaceStyle();n.call(d.prototype);d.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";d.ICON_CSS_CLASS="sapMInputBaseIcon";d.prototype.bShowLabelAsPlaceholder=!u.support.input.placeholder;d.prototype._getPlaceholder=function(){return this.getPlaceholder()||""};d.prototype._getInputValue=function(e){return e===undefined?this.$("inner").val()||"":e.toString()};d.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName}return this._sInputTagElementName};d.prototype.init=function(){this.setLastValue("");this.bRenderingPhase=false;this._oValueStateMessage=new i(this);this._bIsComposingCharacter=false;this.setLastValueStateText("");this.setErrorMessageAnnouncementState(false);this.fnCloseValueStateOnClick=function(){this.closeValueStateMessage()}};d.prototype.oncompositionstart=function(){this._bIsComposingCharacter=true};d.prototype.oncompositionend=function(e){this._bIsComposingCharacter=false;if(!u.browser.firefox){this._bCheckDomValue=true}};d.prototype.isComposingCharacter=function(){return this._bIsComposingCharacter};d.prototype.onBeforeRendering=function(){var e=this.getFocusDomRef();var t=this.getFormattedValueStateText();var a;if(!this._oInvisibleMessage){this._oInvisibleMessage=o.getInstance()}if(this._bCheckDomValue&&!this.bRenderingPhase){if(this.isActive()){this._sDomValue=this._getInputValue()}else{this._bCheckDomValue=false}}if(!t){a=false}else{var s=this.getAggregation("_invisibleFormattedValueStateText");a=t.getHtmlText()!==(s&&s.getHtmlText())}if(this.getValueState()===f.Error&&e){var i=a||this.getValueStateText()!==this.getLastValueStateText();this.setErrorMessageAnnouncementState(!e.hasAttribute("aria-invalid")||i)}if(a){s&&s.destroy();this.setAggregation("_invisibleFormattedValueStateText",t.clone())}this.bRenderingPhase=true};d.prototype.onAfterRendering=function(){var e=this.getValueState();var t=this.getFocusDomRef()===document.activeElement;var a=e===f.None;var s=document.getElementById(this.getValueStateMessageId()+"-sr");if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue)}if(this.getErrorMessageAnnouncementState()&&this.hasStyleClass("sapMFocus")){s&&this._oInvisibleMessage.announce(s.textContent);this.setErrorMessageAnnouncementState(false)}this.$("message").text(this.getValueStateText());this._bCheckDomValue=false;this.bRenderingPhase=false;if(t){this[a?"closeValueStateMessage":"openValueStateMessage"]()}if(this.getAggregation("_invisibleFormattedValueStateText")){this.getAggregation("_invisibleFormattedValueStateText").getControls().forEach(function(e){e.getDomRef()&&e.getDomRef().setAttribute("tabindex",-1)})}this.setLastValueStateText(this.getValueStateText())};d.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy()}if(this._oInvisibleMessage){this._oInvisibleMessage.destroy();this._oInvisibleMessage=null}this._oValueStateMessage=null};d.prototype.ontouchstart=function(e){e.setMarked()};d.prototype.onfocusin=function(e){this.addStyleClass("sapMFocus");this.openValueStateMessage()};d.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");if(!this._bClickOnValueStateLink(e)){this.closeValueStateMessage()}};d.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e)}};d.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering};d.prototype.getChangeEventParams=function(){return{}};d.prototype.ontap=function(e){return};d.prototype.onChange=function(e,t,a){t=t||this.getChangeEventParams();if(this.getDomRef()&&(!this.getEditable()||!this.getEnabled())){return}var s=this._getInputValue(a);if(s!==this.getLastValue()){this.setValue(s);s=this.getValue();this.setLastValue(s);this.fireChangeEvent(s,t);return true}else{this._bCheckDomValue=false}};d.prototype.fireChangeEvent=function(e,t){var a=jQuery.extend({value:e,newValue:e},t);this.fireChange(a)};d.prototype.onValueRevertedByEscape=function(e,t){this.fireEvent("liveChange",{value:e,escPressed:true,previousValue:t,newValue:e})};d.prototype.onsapenter=function(e){if(u.browser.safari&&this.isComposingCharacter()){e.setMarked("invalid");return}this.onChange(e)};d.prototype.onsapescape=function(e){var t=this._getInputValue();if(t!==this.getLastValue()){e.setMarked();e.preventDefault();this.updateDomValue(this.getLastValue());this.onValueRevertedByEscape(this.getLastValue(),t)}};d.prototype.oninput=function(e){this._bCheckDomValue=true};d.prototype.onkeydown=function(e){if(this.getDomRef("inner")&&this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==c.BACKSPACE){e.preventDefault()}};d.prototype.oncut=function(e){};d.prototype.selectText=function(e,t){this.$("inner").selectText(e,t);return this};d.prototype.getSelectedText=function(){return this.$("inner").getSelectedText()};d.prototype.setProperty=function(e,a,s){if(e=="value"){this._bCheckDomValue=false}return t.prototype.setProperty.apply(this,arguments)};d.prototype.getFocusInfo=function(){var e=t.prototype.getFocusInfo.call(this),a=this.getFocusDomRef();jQuery.extend(e,{cursorPos:0,selectionStart:0,selectionEnd:0});if(a){e.cursorPos=jQuery(a).cursorPos();try{e.selectionStart=a.selectionStart;e.selectionEnd=a.selectionEnd}catch(e){}}return e};d.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.call(this,e);this.$("inner").cursorPos(e.cursorPos);this.selectText(e.selectionStart,e.selectionEnd);return this};d.prototype.updateDomValue=function(e){var t=this.getFocusDomRef();if(!this.isActive()){return this}e=this._getInputValue(e);if(this._getInputValue()===e){return this}this._bCheckDomValue=true;if(this._bPreferUserInteraction){this.handleInputValueConcurrency(e)}else{t.value=e}return this};d.prototype._aValueStateLinks=function(){if(this.getFormattedValueStateText()&&this.getFormattedValueStateText().getHtmlText()&&this.getFormattedValueStateText().getControls().length){return this.getFormattedValueStateText().getControls()}else{return[]}};d.prototype._bClickOnValueStateLink=function(e){var t=this._aValueStateLinks();return t.some(function(t){return e.relatedTarget===t.getDomRef()})};d.prototype._attachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(e){e.attachPress(this.fnCloseValueStateOnClick,this)},this)};d.prototype._detachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(e){e.detachPress(this.fnCloseValueStateOnClick,this)},this)};d.prototype.handleInputValueConcurrency=function(e){var t=this.getFocusDomRef(),a=t&&this._getInputValue(),s=this.getProperty("value"),i=document.activeElement===t,n=this.isBound("value")&&this.getBindingInfo("value").skipModelUpdate;if(i&&n&&a&&s!==a){return this}t.value=e;if(i&&n&&!a){t.select()}};d.prototype._setPreferUserInteraction=function(e){this._bPreferUserInteraction=e};d.prototype.closeValueStateMessage=function(){setTimeout(function(){if(this._oValueStateMessage){this._detachValueStateLinkPress();this._oValueStateMessage.close()}}.bind(this),0)};d.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content")};d.prototype.getPopupAnchorDomRef=function(){return this.getDomRef()};d.prototype.iOpenMessagePopupDuration=0;d.prototype.getValueStateMessageId=function(){return this.getId()+"-message"};d.prototype.getErrorMessageAnnouncementState=function(){return this._bErrorStateShouldBeAnnounced};d.prototype.setErrorMessageAnnouncementState=function(e){this._bErrorStateShouldBeAnnounced=e};d.prototype.setLastValueStateText=function(e){this._sLastValueStateText=e};d.prototype.getLastValueStateText=function(){return this._sLastValueStateText};d.prototype.getLabels=function(){var e=this.getAriaLabelledBy().map(function(e){return sap.ui.getCore().byId(e)});var t=sap.ui.require("sap/ui/core/LabelEnablement");if(t){e=e.concat(t.getReferencingLabels(this).map(function(e){return sap.ui.getCore().byId(e)}))}return e};d.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){setTimeout(function(){if(!this.bIsDestroyed){this._detachValueStateLinkPress();this._attachValueStateLinkPress();this._oValueStateMessage.open()}}.bind(this),0)}};d.prototype.shouldValueStateMessageBeOpened=function(){return this.getValueState()!==f.None&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage()};d.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],t=this.getAggregation("_beginIcon")||[],a=e.concat(t),s,i;return a.reduce(function(e,t){s=t&&t.getDomRef()?parseFloat(getComputedStyle(t.getDomRef()).marginRight):0;i=t&&t.getDomRef()?t.getDomRef().offsetWidth:0;return e+i+s},0)};d.prototype.setValue=function(e){e=this.validateProperty("value",e);e=this._getInputValue(e);this.updateDomValue(e);if(e!==this.getProperty("value")){this.setLastValue(e)}this.setProperty("value",e,true);return this};d.prototype.getFocusDomRef=function(){return this.getDomRef("inner")};d.prototype.getIdForLabel=function(){return this.getId()+"-inner"};d.prototype.getAccessibilityInfo=function(){var e=this.getRequired()?"Required":"",t=this.getRenderer();return{role:t.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_INPUT"),description:[this.getValueDescriptionInfo(),t.getLabelledByAnnouncement(this),t.getDescribedByAnnouncement(this),e].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()}};d.prototype.getValueDescriptionInfo=function(){return this.getValue()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_EMPTY")};d.prototype._addIcon=function(e,t,a){if(["begin","end"].indexOf(e)===-1){p.error('icon position is not "begin", neither "end", please check again the passed setting');return null}var i=s.createControlByURI(t).addStyleClass(d.ICON_CSS_CLASS);if(a!==undefined){this.insertAggregation("_"+e+"Icon",i,a)}else{this.addAggregation("_"+e+"Icon",i)}return i};d.prototype.addBeginIcon=function(e){return this._addIcon("begin",e)};d.prototype.addEndIcon=function(e,t){return this._addIcon("end",e,t)};Object.defineProperty(d.prototype,"_$input",{get:function(){return this.$("inner")}});d.prototype.setLastValue=function(e){this._lastValue=e;return this};d.prototype.getLastValue=function(){return this._lastValue};return d});
//# sourceMappingURL=InputBase.js.map
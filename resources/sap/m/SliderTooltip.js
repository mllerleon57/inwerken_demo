/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","./SliderUtilities","./SliderTooltipBase","sap/ui/core/library","sap/ui/core/Core","./delegate/ValueStateMessage","sap/ui/core/ValueStateSupport","sap/ui/core/InvisibleMessage","./SliderTooltipRenderer"],function(e,t,a,i,s,o,r,l,u){"use strict";var n=i.ValueState;var p=i.InvisibleMessageMode;var d=a.extend("sap.m.SliderTooltip",{metadata:{library:"sap.m",properties:{value:{type:"float",group:"Data",defaultValue:0,bindable:"bindable"},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},editable:{type:"boolean",defaultValue:false},step:{type:"float",group:"Data",defaultValue:1},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:n.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}}}}});d.prototype.init=function(){this._oValueStateMessage=new o(this);this._fLastValidValue=0};d.prototype.exit=function(){if(this.oInvisibleMessage){this.oInvisibleMessage.destroy();this.oInvisibleMessage=null}};d.prototype.onBeforeRendering=function(){a.prototype.setValue.call(this,this.getValue());if(!this.oInvisibleMessage){this.oInvisibleMessage=l.getInstance()}};d.prototype.onAfterRendering=function(){var e=!this.getEditable()?"add":"remove";if(this.getDomRef()){this.getFocusDomRef().classList[e](t.CONSTANTS.TOOLTIP_CLASS+"NotEditable")}};d.prototype.getValueStateText=function(){return""};d.prototype.getFocusDomRef=function(){return this.getDomRef("input")};d.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef()};d.prototype.sliderValueChanged=function(e){if(this.getDomRef()){this.getFocusDomRef().value=e}this._fLastValidValue=e;this.setValueState(n.None)};d.prototype.setValueState=function(e){var a=this.getDomRef(),i=this.getFocusDomRef(),s,o;e=this.validateProperty("valueState",e);s=a&&e===n.Error;o=a&&s;this.setProperty("valueState",e,true);this._oValueStateMessage[o?"open":"close"]();if(i){a.classList[s?"add":"remove"](t.CONSTANTS.TOOLTIP_CLASS+"ErrorState");i[s?"setAttribute":"removeAttribute"]("aria-invalid",s);i[o?"setAttribute":"removeAttribute"]("aria-errormessage",this.getId()+"-message");this._invisibleMessageAnnouncement(e)}return this};d.prototype._invisibleMessageAnnouncement=function(e){if(e!==n.Error){return}var t=s.getLibraryResourceBundle("sap.m"),a,i;a=t.getText("INPUTBASE_VALUE_STATE_"+e.toUpperCase());i=a+" "+r.getAdditionalText(this);this.oInvisibleMessage.announce(i,p.Assertive);this._bInvisibleMessageUpdated=true};d.prototype.onfocusout=function(e){var t=parseFloat(this.getFocusDomRef().value);this._validateValue(t);if(this._bInvisibleMessageUpdated){document.getElementById(this.oInvisibleMessage.getId()+"-assertive").textContent="";this._bInvisibleMessageUpdated=false}};d.prototype.onsapenter=function(e){var t=parseFloat(this.getFocusDomRef().value);this._validateValue(t)};d.prototype.onsapescape=function(e){this.sliderValueChanged(this._fLastValidValue);this.setValueState(n.None)};d.prototype._validateValue=function(e){if(this._isValueValid(e)){this.sliderValueChanged(e);this.fireChange({value:e})}else{this.setValueState(n.Error)}};d.prototype._isValueValid=function(e){return!(isNaN(e)||e<this.getMin()||e>this.getMax())};return d});
//# sourceMappingURL=SliderTooltip.js.map
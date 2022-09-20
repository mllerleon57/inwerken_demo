/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","./RadioButtonRenderer","sap/ui/core/library"],function(jQuery,e,t,i,a){"use strict";var r=a.TextDirection;var o=a.ValueState;var s=t.extend("sap.ui.commons.RadioButton",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{text:{type:"string",group:"Data",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},selected:{type:"boolean",group:"Data",defaultValue:false},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:o.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:r.Inherit},groupName:{type:"string",group:"Behavior",defaultValue:"sapUiRbDefaultGroup"},key:{type:"string",group:"Data",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{}}}});s.prototype.init=function(){this._changeGroupName(this.getGroupName())};s.prototype.exit=function(){var e=this.getGroupName(),t=this._groupNames[e];t.splice(t.indexOf(this),1)};s.prototype.onclick=function(e){if(this.getEnabled()&&e.target.id==this.getId()+"-RB"){this.focus()}this.userSelect(e)};s.prototype._groupNames={};s.prototype.onsapspace=function(e){if(this.getEnabled()&&e.target.id==this.getId()+"-RB"){this.focus()}this.userSelect(e)};s.prototype.onfocusin=function(e){if(this.getEnabled()&&e.target.id==this.getId()+"-RB"){this.focus()}};s.prototype.userSelect=function(e){if(this.getEnabled()&&this.getEditable()){var t=this.getSelected();if(!t){this.setSelected(true);this.fireSelect({})}}else{e.preventDefault()}};s.prototype.setSelected=function(e){var t,i=this.getSelected(),a=this.getGroupName(),r=this._groupNames[a],o=r&&r.length;this.setProperty("selected",e,true);if(e&&a&&a!==""){for(var u=0;u<o;u++){t=r[u];if(t instanceof s&&t!==this&&t.getSelected()){t.setSelected(false)}}}if(i!=e&&this.getDomRef()&&this.getRenderer().setSelected){this.getRenderer().setSelected(this,e)}return this};s.prototype.setGroupName=function(e){e=this.validateProperty("groupName",e);this._changeGroupName(e,this.getGroupName());return this.setProperty("groupName",e,false)};s.prototype.getTooltipDomRefs=function(){return this.getDomRef().children};s.prototype._changeGroupName=function(e,t){var i=this._groupNames[e],a=this._groupNames[t];if(!i){i=this._groupNames[e]=[]}if(i.indexOf(this)===-1){i.push(this)}if(a&&a.indexOf(this)!==-1){a.splice(a.indexOf(this),1)}};return s});
//# sourceMappingURL=RadioButton.js.map
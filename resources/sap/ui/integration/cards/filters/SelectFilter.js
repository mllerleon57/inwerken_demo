/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseFilter","sap/m/Select","sap/ui/core/ListItem","sap/ui/model/json/JSONModel","sap/ui/integration/util/BindingResolver"],function(e,t,i,a,r){"use strict";var s=e.extend("sap.ui.integration.cards.filters.SelectFilter",{metadata:{library:"sap.ui.integration",aggregations:{_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2}});s.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy()}};s.prototype.getField=function(){return this._getSelect()};s.prototype.onDataChanged=function(){var e=this._getSelect();e.setSelectedKey(this.getValue().value)};s.prototype.getValueForModel=function(){var e=this._getSelect().getSelectedItem();if(e){return{value:e.getKey(),selectedItem:{title:e.getText(),key:e.getKey()}}}return{value:this._getSelect().getSelectedKey()}};s.prototype.getStaticConfiguration=function(){var e=this.getConfig();var t="/";var i=this.getModel().getProperty(t);var a=[];if(e.item&&e.item.path){t=e.item.path}for(var s=0;s<i.length;s++){if(t==="/"){a.push(r.resolveValue(e.item,this,t+s))}else{a.push(r.resolveValue(e.item,this,t+"/"+s))}}var l=Object.assign({},e);delete l.item;l.items=a;return l};s.prototype._getSelect=function(){var e=this.getAggregation("_select");if(!e){e=this._createSelect();this.setAggregation("_select",e)}return e};s.prototype._createSelect=function(){var e=new t,s,l,n="/",o=this.getConfig(),p=this.createLabel(o);e.attachChange(function(e){this._setValue()}.bind(this));if(o&&o.item){n=o.item.path||n}if(o&&o.item&&o.item.template){s=o.item.template.key;l=o.item.template.title}if(o&&o.items){s="{key}";l="{title}";this.setModel(new a(o.items))}this._oItemTemplate=new i({key:s,text:l});e.bindItems({path:n,template:this._oItemTemplate});e.setSelectedKey(r.resolveValue(o.value,this.getCardInstance()));if(p){e.addAriaLabelledBy(p)}return e};return s});
//# sourceMappingURL=SelectFilter.js.map
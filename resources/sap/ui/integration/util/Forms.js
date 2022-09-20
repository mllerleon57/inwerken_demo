/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./Validators","./BindingResolver"],function(e,t,r){"use strict";var a=e.ValueState;function n(e){if(e.isA("sap.m.ComboBox")){return{key:e.getSelectedKey(),value:e.getValue()}}else{return e.getValue()}}function i(e){switch(e.type){case"ComboBox":return"keyValuePair";default:return"string"}}function o(e,t){var r="/"+e._oItem.id,n=t.getData(),i,o=false;e.setValueState(a.None);for(i=0;i<n.records.length;i++){if(n.records[i].bindingPath===r){n.records.splice(i,1);o=true;break}}if(o){t.setData(n)}}function u(e){var t=e.getProperty("/records");e.setProperty("/hasErrors",!!t.find(function(e){return e.type===a.Error}));e.setProperty("/hasWarnings",!!t.find(function(e){return e.type===a.Warning}))}var s={validateControl:function(e,s,l){var f=n(e),d=s.getModel("messages"),c=s.getModel("i18n").getResourceBundle(),g=e._oItem,p,v,y,V,h,S,b,m=false,P,x;o(e,d);if(!g||!g.validations){return}x=r.resolveValue(g.validations,e,e.getBindingContext().getPath());p=i(g);v=t[p];x.forEach(function(t){if(m){return}for(var r in t){V=v[r];y=t[r];if(typeof V!=="function"){continue}b=V(f,y);if(!b){h=t.type||a.Error;S=t.message||c.getText(v[r+"Txt"],y);P=d.getData();P.records.push({message:S,type:h,bindingPath:"/"+g.id});d.setData(P);if(l||e._bShowValueState){e._bShowValueState=true;e.setValueState(h);e.setValueStateText(S)}m=true}}});u(d)},getRequiredValidationValue:function(e){var t=e.validations||[],r,a,n;for(a=0;a<t.length;a++){r=t[a];for(n in r){if(n==="required"){return r[n]}}}return false}};return s});
//# sourceMappingURL=Forms.js.map
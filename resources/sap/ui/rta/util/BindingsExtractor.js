/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/ElementUtil","sap/ui/dt/OverlayRegistry","sap/base/util/isPlainObject","sap/base/util/restricted/_uniqWith","sap/base/util/deepEqual"],function(t,e,n,a,i){"use strict";var r={};r.collectBindingPaths=function(e,a,i){var g={bindingPaths:[],bindingContextPaths:[]};var o=e.sParentAggregationName;var d=e.getParent();var l=r.getBindings({element:e,model:a,relevantContainerElement:i,parent:d});if(d){var s=d.getMetadata().getAggregation();if(s){var u=t.getAggregation(d,o).indexOf(e);var f=s.name;var v=d.getBindingInfo(f);var p=v&&v.template;if(p){var c=p.getMetadata().getAggregation();if(c){var m=c.name;var P=t.getAggregation(p,m)[u];l=l.concat(r.getBindings({model:a,element:P,template:true,relevantContainerElement:i,parent:d}))}}}}for(var h=0,B=l.length;h<B;h++){if(l[h].getPath){var C=l[h].getPath();if(C&&g.bindingPaths.indexOf(C)===-1){g.bindingPaths.push(C)}}if(l[h].getContext&&l[h].getContext()&&l[h].getContext().getPath){var b=l[h].getContext().getPath();if(b&&g.bindingContextPaths.indexOf(b)===-1){g.bindingContextPaths.push(b)}}if(n(l[h])){var x=l[h].parts[0]&&l[h].parts[0].path;if(x&&g.bindingPaths.indexOf(x)===-1){g.bindingPaths.push(x)}}}return g};function g(t,n){if(n&&t!==n){var a=e.getOverlay(t);var i=a&&(a.getRelevantContainer()||a.getElement());return i?i.getId()===n.getId():true}return true}r.getBindings=function(t){var e=t.element;var n=t.model;var d=t.parent;var s=t.aggregationName;var u=t.relevantContainerElement;var f=[];if(g(e,u)){f=t.template?l(e,d,n):r.getBindingsFromProperties(e,n)}var v=s?[s]:Object.keys(e.getMetadata().getAllAggregations());v.forEach(function(a){f=f.concat(o(e,n,t.template,a,u))});return a(f,i)};function o(e,n,a,i,o){var d=[];var s=[];var u=a;var f=e.getBindingInfo(i);var v=f&&f.template;if(v){u=true;s=[v]}else{s=t.getAggregation(e,i)}s.forEach(function(t){if(t.getMetadata){if(g(e,o)){d=d.concat(u?l(t,e,n):r.getBindingsFromProperties(t,n))}d=d.concat(r.getBindings({element:t,model:n,template:u,relevantContainerElement:o,parent:e}))}});return d}r.filterAndFlattenBindings=function(t,e){var n=[];var a=t.getMetadata().getName();if(a==="sap.ui.model.CompositeBinding"){t.getBindings().forEach(function(t){n=n.concat(r.filterAndFlattenBindings(t,e))})}else if((a==="sap.ui.model.odata.ODataPropertyBinding"||a==="sap.ui.model.odata.v2.ODataPropertyBinding"||a==="sap.ui.model.odata.v4.ODataPropertyBinding"||a==="sap.ui.model.json.JSONPropertyBinding"||a==="sap.ui.model.json.XMLPropertyBinding"||a==="sap.ui.model.resource.ResourcePropertyBinding")&&t.getModel()===e&&t.isRelative()&&typeof t.getPath==="function"&&t.getPath()){n.push(t)}return n};function d(t){var e=[];var n=t.parts;n.forEach(function(t){e.push({parts:[t]})});return e}r.getBindingsFromProperties=function(t,e){var n=Object.keys(t.getMetadata().getAllProperties());return n.filter(t.getBinding.bind(t)).reduce(function(n,a){return n.concat(r.filterAndFlattenBindings(t.getBinding(a),e))},[])};function l(t,e,n){var a=Object.keys(t.getMetadata().getAllProperties());var i;return a.filter(function(a){var r=t.mBindingInfos[a];var g=r&&r.parts[0]&&r.parts[0].model;if(!g){var o=e.getDefaultModel?e.getDefaultModel():null;var d=t.getDefaultModel?t.getDefaultModel():null;i=o===d}else{i=n===e.getModel(g)}return r&&i}).reduce(function(e,n){return e.concat(d(t.mBindingInfos[n]))},[])}r.getBindingContextPath=function(t){if(t.getBindingContext()&&t.getBindingContext().getPath){return t.getBindingContext().getPath()}return undefined};return r},true);
//# sourceMappingURL=BindingsExtractor.js.map
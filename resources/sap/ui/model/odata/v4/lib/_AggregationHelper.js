/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","./_Parser","sap/ui/model/Filter"],function(e,t,r){"use strict";var n=/,|%2C|%2c/,i={aggregate:{"*":{grandTotal:"boolean",max:"boolean",min:"boolean",name:"string",subtotals:"boolean",unit:"string",with:"string"}},"grandTotal like 1.84":"boolean",grandTotalAtBottomOnly:"boolean",group:{"*":{additionally:["string"]}},groupLevels:["string"],search:"string",subtotalsAtBottomOnly:"boolean"},a=new RegExp("^("+t.sODataIdentifier+"(?:/"+t.sODataIdentifier+")*"+")(?:"+t.sWhitespace+"+(?:asc|desc))?$"),o={expandTo:/^[1-9]\d*$/,hierarchyQualifier:"string",search:"string"},s;function u(e,t,r,n,i,a,o){var s=e.aggregate[i],u=s.name||i,l=s.unit,f=s.with;if(n){if(f==="average"||f==="countdistinct"){throw new Error("Cannot aggregate totals with '"+f+"'")}u=i;i="UI5grand__"+i}if(f){u+=" with "+f+" as "+i}else if(s.name){u+=" as "+i}r.push(u);if(l&&!r.includes(l)&&!o.includes(l,a+1)&&!t.includes(l)){r.push(l)}}function l(e){var t=[];if(e.$skip){t.push("skip("+e.$skip+")")}delete e.$skip;if(e.$top<Infinity){t.push("top("+e.$top+")")}delete e.$top;return t.join("/")}s={buildApply:function(e,t,r,n,i){var a,o="",f=[],g=e["grandTotal like 1.84"],c,d,p,h=[],y,$=[];function b(t,r){var n,a=e.aggregate[t];if(a[r]){n="UI5"+r+"__"+t;h.push(t+" with "+r+" as "+n);if(i){i[n]={measure:t,method:r}}}}if(e.hierarchyQualifier){return s.buildApply4Hierarchy(e,t)}t=Object.assign({},t);e.groupLevels=e.groupLevels||[];d=!r||r>e.groupLevels.length;e.group=e.group||{};e.groupLevels.forEach(function(t){e.group[t]=e.group[t]||{}});c=d?Object.keys(e.group).sort().filter(function(t){return!e.groupLevels.includes(t)}):[e.groupLevels[r-1]];if(!r){c=e.groupLevels.concat(c)}e.aggregate=e.aggregate||{};a=Object.keys(e.aggregate).sort();if(r===1&&!n){a.filter(function(t){return e.aggregate[t].grandTotal}).forEach(u.bind(null,e,[],f,g))}if(!n){a.forEach(function(e){b(e,"min");b(e,"max")})}a.filter(function(t){return d||e.aggregate[t].subtotals}).forEach(u.bind(null,e,c,$,false));if($.length){o="aggregate("+$.join(",")+")"}if(c.length){c.forEach(function(t){var r=e.group[t].additionally;if(r){c.push.apply(c,r)}});o="groupby(("+c.join(",")+(o?"),"+o+")":"))")}if(n){delete t.$count}else if(t.$count){h.push("$count as UI5__count");delete t.$count}if(t.$filter){o+="/filter("+t.$filter+")";delete t.$filter}if(t.$orderby){o+="/orderby("+t.$orderby+")";delete t.$orderby}y=l(t);if(g&&f.length){if(e.groupLevels.length){throw new Error("Cannot combine visual grouping with grand total")}o+="/concat(aggregate("+f.join(",")+"),aggregate("+h.join(",")+"),"+(y||"identity")+")"}else{if(h.length){o+="/concat(aggregate("+h.join(",")+"),"+(y||"identity")+")"}else if(y){o+="/"+y}if(r===1&&t.$$leaves&&!n){p="groupby(("+Object.keys(e.group).sort().join(",")+"))/aggregate($count as UI5__leaves)"}delete t.$$leaves;if(f.length){o="concat("+(p?p+",":"")+"aggregate("+f.join(",")+"),"+o+")"}else if(p){o="concat("+p+","+o+")"}}if(e.search){o="search("+e.search+")/"+o}if(t.$$filterBeforeAggregate){o="filter("+t.$$filterBeforeAggregate+")/"+o;delete t.$$filterBeforeAggregate}if(o){t.$apply=o}return t},buildApply4Hierarchy:function(e,t){var r="",n=e.hierarchyQualifier,i=e.$path,a=t?e.$fetchMetadata(i+"/@Org.OData.Aggregation.V1.RecursiveHierarchy#"+n+"/NodeProperty/$PropertyPath").getResult():"???",o,s="";function u(r){if(t.$select){if(!o){o=e.$fetchMetadata(i+"/@com.sap.vocabularies.Hierarchy.v1.RecursiveHierarchy#"+n).getResult()}t.$select.push(o[r].$PropertyPath)}}t=Object.assign({},t);if(t.$select){t.$select=t.$select.slice()}if(t.$filter||e.search){if(t.$filter){r="filter("+t.$filter;s=")/";delete t.$filter}if(e.search){r+=s+"search("+e.search}r="ancestors($root"+i+","+n+","+a+","+r+"),keep start)/"}if(t.$$filterBeforeAggregate){r+="descendants($root"+i+","+n+","+a+",filter("+t.$$filterBeforeAggregate+"),1)";delete t.$$filterBeforeAggregate;if(t.$orderby){r+="/orderby("+t.$orderby+")";delete t.$orderby}}else{if(t.$orderby){r+="orderby("+t.$orderby+")/";delete t.$orderby}r+="com.sap.vocabularies.Hierarchy.v1.TopLevels(HierarchyNodes=$root"+i+",HierarchyQualifier='"+n+"',NodeProperty='"+a+"',Levels="+(e.expandTo||1)+")";if(e.expandTo>1){u("DescendantCountProperty");u("DistanceFromRootProperty")}}u("DrillStateProperty");t.$apply=r;return t},checkTypeof:function(e,t,r){if(Array.isArray(t)){if(!Array.isArray(e)){throw new Error("Not an array value for '"+r+"'")}e.forEach(function(e,n){s.checkTypeof(e,t[0],r+"/"+n)})}else if(t instanceof RegExp){if(!t.test(e)){throw new Error("Not a matching value for '"+r+"'")}}else if(typeof t==="object"){var n="*"in t;if(typeof e!=="object"||!e||Array.isArray(e)){throw new Error("Not an object value for '"+r+"'")}Object.keys(e).forEach(function(i){if(!n&&!(i in t)){throw new Error("Unsupported property: '"+r+"/"+i+"'")}s.checkTypeof(e[i],t[n?"*":i],r+"/"+i)})}else if(typeof e!==t){throw new Error("Not a "+t+" value for '"+r+"'")}},createPlaceholder:function(t,r,n){var i={"@$ui5.node.level":t};e.setPrivateAnnotation(i,"index",r);e.setPrivateAnnotation(i,"parent",n);return i},extractSubtotals:function(e,t,r,n){var i=t["@$ui5.node.level"];Object.keys(e.aggregate).forEach(function(a){var o=e.aggregate[a],s,u=o.unit;if(!o.subtotals){return}r[a]=t[a];if(n){n[a]=null}if(u){r[u]=t[u];if(n){s=e.groupLevels.indexOf(u);if(s<0||s>=i){n[u]=null}}}})},filterOrderby:function(e,t,r){var n=s.getFilteredOrderby(e.$orderby,t,r);e=Object.assign({},e);if(n){e.$orderby=n}else{delete e.$orderby}return e},getAllProperties:function(e){var t=Object.keys(e.aggregate),r=Object.keys(e.group),n=t.concat(r);t.forEach(function(t){var r=e.aggregate[t].unit;if(r){n.push(r)}});r.forEach(function(t){var r=e.group[t].additionally;if(r){r.forEach(function(e){n.push(e.includes("/")?e.split("/"):e)})}});return n},getFilteredOrderby:function(e,t,r){var i=!r||r>t.groupLevels.length;function o(e){return Object.keys(t.aggregate).some(function(r){var n=t.aggregate[r];return n.subtotals&&e===n.unit})}function s(e){if(e in t.group&&(!r||!t.groupLevels.includes(e))){return true}return Object.keys(t.aggregate).some(function(r){return e===t.aggregate[r].unit})||Object.keys(t.group).some(function(n){return(!r||!t.groupLevels.includes(n))&&u(e,n)})}function u(e,r){return e===r||t.group[r].additionally&&t.group[r].additionally.includes(e)}if(e){return e.split(n).filter(function(e){var n=a.exec(e),l;if(n){l=n[1];return l in t.aggregate&&(i||t.aggregate[l].subtotals)||i&&s(l)||!i&&(u(l,t.groupLevels[r-1])||o(l))}return true}).join(",")}},getOrCreateExpandedObject:function(t,r){var n,i=e.getPrivateAnnotation(r,"expanded");if(!i){n={"@$ui5.node.isExpanded":false};e.setPrivateAnnotation(r,"collapsed",n);i={"@$ui5.node.isExpanded":true};e.setPrivateAnnotation(r,"expanded",i);if(t.subtotalsAtBottomOnly!==undefined){s.extractSubtotals(t,r,n,t.subtotalsAtBottomOnly?i:null)}}return i},hasGrandTotal:function(e){return e&&Object.keys(e).some(function(t){return e[t].grandTotal})},hasMinOrMax:function(e){return e&&Object.keys(e).some(function(t){var r=e[t];return r.min||r.max})},isAffected:function(t,r,n){function i(t,r){if(t.endsWith("/*")){t=t.slice(0,-2)}return e.hasPathPrefix(r,t)||e.hasPathPrefix(t,r)}function a(e,t){return t.some(function(t){return t.aFilters?a(e,t.aFilters):i(e,t.sPath)})}return n.some(function(e){var n=i.bind(null,e);return e===""||e==="*"||Object.keys(t.aggregate).some(function(r){var n=t.aggregate[r];return i(e,n.name||r)})||Object.keys(t.group).some(n)||t.groupLevels.some(n)||a(e,r)})},removeUI5grand__:function(e){Object.keys(e).forEach(function(t){if(t.startsWith("UI5grand__")){e[t.slice(10)]=e[t];delete e[t]}})},setAnnotations:function(t,r,n,i,a){e.setAnnotation(t,"@$ui5.node.isExpanded",r);e.setAnnotation(t,"@$ui5.node.isTotal",n);t["@$ui5.node.level"]=i;if(a){a.forEach(function(r){if(Array.isArray(r)){e.createMissing(t,r)}else if(!(r in t)){t[r]=null}})}},splitFilter:function(e,t){var n=[],i=[];function a(e){return e.aFilters?e.aFilters.some(a):e.sPath in t.aggregate}function o(e){if(e.aFilters&&e.bAnd){e.aFilters.forEach(o)}else{(a(e)?n:i).push(e)}}function s(e){return e.length>1?new r(e,true):e[0]}if(!t||!t.aggregate){return[e]}o(e);return[s(n),s(i)]},validateAggregation:function(e,t,r,n){if(e.hierarchyQualifier&&!n){throw new Error("Missing parameter autoExpandSelect at model")}s.checkTypeof(e,e.hierarchyQualifier?o:i,"$$aggregation");e.$fetchMetadata=r;e.$path=t}};return s},false);
//# sourceMappingURL=_AggregationHelper.js.map
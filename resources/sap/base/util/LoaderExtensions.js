/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/util/XMLHelper","sap/base/Log","sap/base/assert","sap/base/util/extend","sap/base/util/mixedFetch"],function(e,r,t,n,s){"use strict";var a={};var i={js:["controller","designtime","fragment","support","view"],json:["fragment","view"],html:["fragment","view"],xml:["fragment","view"]};var o=new RegExp("\\.("+Object.keys(i).join("|")+")$");a.getKnownSubtypes=function(){return i};a.getAllRequiredModules=function(){var e=[],r=sap.ui.loader._.getAllModules(true),t;for(var n in r){t=r[n];if(t.ui5&&t.state!==-1){e.push(t.ui5)}}return e};var u=Object.create(null);a.registerResourcePath=function(e,t){if(!t){t={url:null}}if(!u[e]){var n;if(typeof t==="string"||t instanceof String){n=t}else{n=t.url;if(t.final){u[e]=t.final}}var s=sap.ui.require.toUrl(e);var a;if(n!==s||t.final){a={paths:{}};a.paths[e]=n;sap.ui.loader.config(a);r.info("LoaderExtensions.registerResourcePath ('"+e+"', '"+n+"')"+(t["final"]?" (final)":""))}}else{r.warning("LoaderExtensions.registerResourcePath with prefix "+e+" already set as final. This call is ignored.")}};a.resolveUI5Url=function(e){if(e.startsWith("ui5:")){var r=e.replace("ui5:","");if(!r.startsWith("//")){throw new Error("URLs using the 'ui5' protocol must be absolute. Relative and server absolute URLs are reserved for future use.")}r=r.replace("//","");return sap.ui.loader._.resolveURL(sap.ui.require.toUrl(r))}else{return e}};a.loadResource=function(i,u){var l,f,c,d=function(){},p;if(a.notifyResourceLoading){d=a.notifyResourceLoading()}if(typeof i==="string"){u=u||{}}else{u=i||{};i=u.name}u=n({failOnError:true,async:false},u);l=u.dataType;if(l==null&&i){l=(l=o.exec(i||u.url))&&l[1]}t(/^(xml|html|json|text)$/.test(l),"type must be one of xml, html, json or text");function h(r){switch(l){case"json":return JSON.parse(r);case"xml":return e.parse(r);default:return r}}f=sap.ui.loader._.getModuleContent(i,u.url);if(f!=undefined){f=h(f);if(u.async){return Promise.resolve(f)}else{return f}}else{p=sap.ui.loader._.getSyncCallBehavior();if(!u.async&&p){if(p>=1){r.error("[nosync] loading resource '"+(i||u.url)+"' with sync XHR")}else{throw new Error("[nosync] loading resource '"+(i||u.url)+"' with sync XHR")}}var g={};if(l){g["Accept"]=s.ContentTypes[l.toUpperCase()]}c=u.url||sap.ui.loader._.getResourcePath(i);var v=s(c,{headers:Object.assign(g,u.headers)},!u.async).then(function(e){if(e.ok){return e.text().then(function(e){return{data:h(e)}})}else{var r=new Error("resource "+i+" could not be loaded from "+c+". Check for 'file not found' or parse errors. Reason: "+e.statusText||e.status);r.status=e.statusText;r.statusCode=e.status;throw r}}).catch(function(e){return{data:null,error:e}}).then(function(e){d();if(e.data!==null){return e.data}else if(u.failOnError){r.error(e.error);throw e.error}else{return null}});if(u.async){return v}else{return v.unwrap()}}};a.notifyResourceLoading=null;return a});
//# sourceMappingURL=LoaderExtensions.js.map
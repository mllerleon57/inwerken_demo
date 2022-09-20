/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/initial/_internal/StorageResultMerger","sap/ui/fl/initial/_internal/storageResultDisassemble","sap/ui/fl/write/api/Version","sap/ui/fl/Utils","sap/ui/fl/write/_internal/FlexInfoSession"],function(e,n,r,t,i,a){"use strict";function l(e,n,r){if(!n.layers||n.layers[0]!=="ALL"&&n.layers.indexOf("CUSTOMER")===-1){delete e.version;return e}if(o(r.reference)){e.allContexts=true}if(r.version!==undefined){e.version=r.version;return e}var a=i.getUrlParameter(t.UrlParameter);if(a===null){delete e.version}else{e.version=parseInt(a)}return e}function o(e){var n=a.getByReference(e);return n&&n.initialAllContexts}function s(n,r){var t=r.map(function(r){var t=Object.assign({},n,{url:r.url,path:r.path});t=l(t,r,n);return r.loadConnectorModule.loadFlexData(t).then(function(n){return n||e.getEmptyFlexDataResponse()}).catch(e.logAndResolveDefault.bind(undefined,e.getEmptyFlexDataResponse(),r,"loadFlexData"))});return Promise.all(t)}function u(e){var n=[];e.forEach(function(e){if(Array.isArray(e)){n=n.concat(e)}else{n.push(e)}});return n}function f(e){return e.map(function(e){return r(e)})}function c(e){return Promise.resolve(e).then(u).then(f).then(u).then(n.merge)}function d(n){return e.getStaticFileConnector().then(s.bind(this,n))}var p={};p.completeFlexData=function(e){if(!e||!e.reference){return Promise.reject("No reference was provided")}return Promise.all([d(e),e.partialFlexData]).then(c)};p.loadFlexData=function(n){if(!n||!n.reference){return Promise.reject("No reference was provided")}return e.getLoadConnectors().then(s.bind(this,n)).then(c)};return p});
//# sourceMappingURL=Storage.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/base/util/each","sap/base/util/merge","sap/base/util/ObjectPath","sap/base/Log","sap/ui/core/Component","sap/ui/fl/apply/_internal/flexState/appDescriptorChanges/prepareAppDescriptorMap","sap/ui/fl/apply/_internal/flexState/changes/prepareChangesMap","sap/ui/fl/apply/_internal/flexState/compVariants/prepareCompVariantsMap","sap/ui/fl/apply/_internal/flexState/controlVariants/prepareVariantsMap","sap/ui/fl/apply/_internal/flexState/Loader","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/LayerUtils","sap/ui/fl/Utils","sap/ui/fl/write/_internal/FlexInfoSession"],function(e,n,t,a,r,i,o,s,p,c,l,f,u,g,d,h){"use strict";var m={};var v={};var S={};var R={};var F;var C;var D;var I={appDescriptorChanges:{prepareFunction:o,pathInResponse:[]},changes:{prepareFunction:s,pathInResponse:["changes"]},variants:{prepareFunction:c,pathInResponse:["variants","variantChanges","variantDependentControlChanges","variantManagementChanges"]},compVariants:{prepareFunction:p,pathInResponse:["comp.variants","comp.standardVariants","comp.defaultVariants","comp.changes"]}};var x={compVariants:{},variants:{}};function y(e){var n=i.get(e.componentId);e.componentData=e.componentData||n.getComponentData()||{};e.manifest=e.manifest||e.rawManifest||n.getManifestObject();e.reference=e.reference||f.getFlexReference(e)}function V(e,n){if(!v[e]){throw new Error("State is not yet initialized")}if(!v[e].preparedMaps[n]){if(!v[e].storageResponse){v[e].storageResponse=z(v[e].unfilteredStorageResponse)}var t={unfilteredStorageResponse:v[e].unfilteredStorageResponse,storageResponse:v[e].storageResponse,componentId:v[e].componentId,componentData:v[e].componentData,reference:e};v[e].preparedMaps[n]=m.callPrepareFunction(n,t)}return v[e].preparedMaps[n]}function P(e){return V(e,"appDescriptorChanges")}function M(e){return V(e,"changes")}function U(e){return V(e,"variants")}function b(e){return V(e,"compVariants")}function L(e){if(e.reference.endsWith(".Component")){var n=e.reference.split(".");n.pop();var a=n.join(".");v[a]=t({},{storageResponse:{changes:u.getEmptyFlexDataResponse()},unfilteredStorageResponse:{changes:u.getEmptyFlexDataResponse()},preparedMaps:{},componentId:e.componentId,partialFlexState:e.partialFlexState});R[a]=R[e.reference]}}function z(e){var r=t({},e);var i=r.changes;var o=B("URLParsing");if(g.isLayerFilteringRequired(o)){n(I,function(e,n){n.pathInResponse.forEach(function(e){a.set(e,g.filterChangeDefinitionsByMaxLayer(a.get(e,i),o),i)})})}return r}function _(e){R[e.reference]=l.loadFlexData(e).then(function(n){v[e.reference]=t({},{unfilteredStorageResponse:n,preparedMaps:{},componentId:e.componentId,componentData:e.componentData,partialFlexState:e.partialFlexState});L(e);E(e.reference);N(e.reference,n);return n});return R[e.reference]}function N(e,n){var t=n&&n.changes||{};if(t.info!==undefined){var a=h.getByReference(e);if(a===null){a={}}a.allContextsProvided=t.info.allContextsProvided;h.setByReference(a,e)}}function E(e){var n=B("ShellNavigation");if(n&&!S[e]){S[e]=O.bind(null,e);n.registerNavigationFilter(S[e])}}function j(e){var n=B("ShellNavigation");if(n){if(S[e]){n.unregisterNavigationFilter(S[e]);delete S[e]}}}function O(e,n,t){var a=B("ShellNavigation");if(a){try{var i=g.getMaxLayerTechnicalParameter(n,B("URLParsing"));var o=g.getMaxLayerTechnicalParameter(t,B("URLParsing"));if(i!==o){m.clearFilteredResponse(e)}}catch(e){r.error(e.message)}return a.NavigationFilterStatus.Continue}return undefined}function w(e){var n=v[e.reference];if(n.partialFlexState===true&&e.partialFlexState!==true){n.partialFlexState=false;e.partialFlexData=t({},n.unfilteredStorageResponse.changes);e.reInitialize=true}return e}function k(e){var n=v[e.reference].componentId;if(!e.reInitialize&&n!==e.componentId){e.reInitialize=true}return e}function A(){return Promise.all([d.getUShellService("ShellNavigation"),d.getUShellService("URLParsing")]).then(function(e){F=e[0];C=e[1]}).catch(function(e){r.error("Error getting service from Unified Shell: "+e.message)})}function B(e){if(d.getUshellContainer()){if(e==="ShellNavigation"){return F}else if(e==="URLParsing"){return C}}return undefined}function q(){return Promise.all([d.requireAsync("sap/ui/fl/ChangePersistenceFactory")]).then(function(e){D=e[0]}).catch(function(e){r.error("Error loading modules: "+e.message)})}m.initialize=function(e){return Promise.all([A(),q()]).then(function(){y(e);var n=e.reference;if(R[n]){return R[n].then(w.bind(null,e)).then(k).then(function(e){return e.reInitialize?_(e):v[n].unfilteredStorageResponse})}return _(e)}).then(function(e){if(!v[e.reference].componentData){var n=i.get(e.componentId);v[e.reference].componentData=n?n.getComponentData():e.componentData}}.bind(null,e))};m.clearAndInitialize=function(e){y(e);m.clearState(e.reference);m.clearState(d.normalizeReference(e.reference));return m.initialize(e)};m.clearState=function(e){if(e){j(e);delete v[e];delete R[e];if(D&&(D._instanceCache||{}).hasOwnProperty(e)){D._instanceCache[e].removeDirtyChanges()}}else{Object.keys(v).forEach(function(e){j(e)});v={};R={}}};m.setInitialNonFlCompVariantData=function(e,n,t,a){x.compVariants[e]=x.compVariants[e]||{};x.compVariants[e][n]={};x.compVariants[e][n].standardVariant=t;x.compVariants[e][n].variants=a};m.getInitialNonFlCompVariantData=function(e){return x.compVariants[e]};m.setFakeStandardVariant=function(e,n,a){var r=m.getVariantsState(e);if(!r[Object.keys(a)[0]]){t(r,a);x.variants[e]=x.variants[e]||{};x.variants[e][n]=x.variants[e][n]||{};t(x.variants[e][n],a)}};m.resetFakedStandardVariants=function(e,n){if(x.variants[e]){delete x.variants[e][n]}};m.clearFilteredResponse=function(e){if(v[e]){v[e].preparedMaps={};delete v[e].storageResponse}};m.getUIChanges=function(e){return M(e).changes};m.getAppDescriptorChanges=function(e){return P(e).appDescriptorChanges};m.getVariantsState=function(e){var t=U(e);if(x.variants[e]){n(x.variants[e],function(a,r){if(v[e].componentId===a){n(r,function(e,n){if(!t[e]){t[e]=n}})}})}return t};m.getUI2Personalization=function(e){return v[e].unfilteredStorageResponse.changes.ui2personalization};m.getCompVariantsMap=function(e){return b(e)};m.callPrepareFunction=function(e,n){return I[e].prepareFunction(n)};m.getStorageResponse=function(e){if(R[e]){return R[e].then(function(){return v[e].unfilteredStorageResponse})}return Promise.resolve()};m.getFlexObjectsFromStorageResponse=function(e){return v[e]&&v[e].unfilteredStorageResponse.changes};return m});
//# sourceMappingURL=FlexState.js.map
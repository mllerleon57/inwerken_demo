/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/modification/ModificationHandler"],function(e){"use strict";var t;var n=new WeakMap;var a=e.extend("sap.m.p13n.modification.LocalStorageModificationHandler");a.prototype.processChanges=function(t,n){var a=e.prototype.processChanges.apply(this,arguments);var r=t&&t[0]?t[0].selectorElement:undefined;return a.then(function(){return sap.m.p13n.Engine.getInstance().retrieveState(r).then(function(e){localStorage.setItem("$p13n.Engine.data--"+r.getId(),JSON.stringify(e))})})};a.prototype.initialize=function(e){var t=JSON.parse(localStorage.getItem("$p13n.Engine.data--"+e.getId()));var a;if(!t){a=sap.m.p13n.Engine.getInstance().retrieveState(e).then(function(e){t=e})}else{a=sap.m.p13n.Engine.getInstance().applyState(e,t,true)}n.set(e,t);return a};a.prototype.waitForChanges=function(e,t){return Promise.resolve()};a.prototype.reset=function(e,t){var a=e.selector;localStorage.removeItem("$p13n.Engine.data--"+a.getId());return sap.m.p13n.Engine.getInstance().applyState(a,n.get(a),true)};a.prototype.isModificationSupported=function(e,t){return false};a.getInstance=function(){if(!t){t=new a}return t};return a});
//# sourceMappingURL=LocalStorageModificationHandler.js.map
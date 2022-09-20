/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/mdc/p13n/PersistenceProvider","sap/ui/fl/Utils"],function(e,t,r){"use strict";var i="DefaultProviderRegistry: This class is a singleton and should not be used without an AdaptationProvider. Please use 'sap.ui.mdc.p13n.Engine.getInstance().defaultProviderRegistry' instead";var o;var n=e.extend("sap.ui.mdc.p13n.modules.DefaultProviderRegistry",{constructor:function(t){if(o){throw Error(i)}e.call(this);this._mDefaultProviders={};this._oEngine=t}});n.prototype.destroy=function(){Object.keys(this._mDefaultProviders).forEach(function(e){this._mDefaultProviders[e].destroy();delete this._mDefaultProviders[e]}.bind(this));this._oEngine=null;e.prototype.destroy.apply(this,arguments);o=null};n.prototype.attach=function(e,t){if(this._oEngine.isRegisteredForModification(e)){throw new Error("DefaultProviderRegistry: You must not change the modificationSettings for an already registered element")}var r=typeof e==="string"?sap.ui.getCore().byId(e):e,i=typeof e==="string"?e:e.getId();var o=this._retrieveDefaultProvider(r,t);if(o.getFor().indexOf(i)===-1){o.addFor(e)}return o};n.prototype.detach=function(e){Object.keys(this._mDefaultProviders).forEach(function(t){var r=this._mDefaultProviders[t];r.removeFor(e)}.bind(this))};n.prototype._retrieveDefaultProvider=function(e,i){if(!this._mDefaultProviders[i]){var o=new t("defaultProviderRegistry"+i,{mode:i});var n=function(){var t=e.getModel(r.VARIANT_MODEL_NAME);if(t){o.setModel(t,r.VARIANT_MODEL_NAME);e.detachEvent("modelContextChange",n)}};e.attachEvent("modelContextChange",n);this._mDefaultProviders[i]=o}return this._mDefaultProviders[i]};n.getInstance=function(e){if(!o){o=new n(e)}return o};return n});
//# sourceMappingURL=DefaultProviderRegistry.js.map
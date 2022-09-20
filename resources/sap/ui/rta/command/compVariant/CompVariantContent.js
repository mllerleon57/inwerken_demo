/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/BaseCommand"],function(t){"use strict";var e=t.extend("sap.ui.rta.command.compVariant.CompVariantContent",{metadata:{library:"sap.ui.rta",properties:{variantId:{type:"string"},persistencyKey:{type:"string"},oldContent:{type:"object"},newContent:{type:"object"}}}});e.prototype.execute=function(){this.setOldContent(i.call(this));n.call(this,this.getNewContent());return Promise.resolve()};e.prototype.undo=function(){n.call(this,this.getOldContent());return Promise.resolve()};function n(t){var e={};var n=this.getElement();if(n.isPageVariant()){e[this.getPersistencyKey()]=t;n._applyVariantByPersistencyKey(this.getPersistencyKey(),e,"KEY_USER")}else{e=t;n._applyVariant(n._getPersoController(),e,"KEY_USER")}}function i(){var t=this.getElement();var e=t._getVariantContent(this.getVariantId());if(t.isPageVariant()){e=e&&e[this.getPersistencyKey()]}return e}return e});
//# sourceMappingURL=CompVariantContent.js.map
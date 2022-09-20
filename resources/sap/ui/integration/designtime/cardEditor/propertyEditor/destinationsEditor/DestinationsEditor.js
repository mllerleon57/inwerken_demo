/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/cardEditor/propertyEditor/complexMapEditor/ComplexMapEditor","sap/base/util/restricted/_merge"],function(e,t,a){"use strict";var r=t.extend("sap.ui.integration.designtime.cardEditor.propertyEditor.destinationsEditor.DestinationsEditor",{metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer().render});r.configMetadata=Object.assign({},t.configMetadata,{allowedValues:{defaultValue:[],mergeStrategy:"intersection"}});r.prototype.onBeforeConfigChange=function(e){var r={};if(e["allowKeyChange"]){r={template:{label:{label:this.getI18nProperty("CARD_EDITOR.LABEL"),type:"string",path:"label"},name:{label:this.getI18nProperty("CARD_EDITOR.DESTINATION.NAME"),type:"select",path:"name",items:(e["allowedValues"]||[]).map(function(e){return{key:e}}),allowCustomValues:true,allowBindings:false},defaultUrl:{label:this.getI18nProperty("CARD_EDITOR.DESTINATION.DEFAULT_URL"),type:"string",path:"defaultUrl"}}}}else{r={collapsibleItems:false,showItemLabel:false,template:{name:{label:"{= ${label} || ${key}}",type:"select",path:"name",items:(e["allowedValues"]||[]).map(function(e){return{key:e}}),allowCustomValues:false,allowBindings:false}}}}var i=a({},r,e);return t.prototype.onBeforeConfigChange.call(this,i)};return r});
//# sourceMappingURL=DestinationsEditor.js.map
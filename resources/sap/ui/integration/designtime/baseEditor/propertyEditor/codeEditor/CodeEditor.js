/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/core/Fragment"],function(BasePropertyEditor,Fragment){"use strict";function json2str(t){if(!t){return""}var e=Array.isArray(t);var o=[];var i=function(t){if(typeof t==="object"&&t!==null){return json2str(t)}if(typeof t==="function"){return t.toString().replaceAll("\t","")}if(typeof t==="string"){return'"'+t+'"'}return t};for(var r in t){var n=i(t[r]);if(!e){n='"'+r+'": '+n}o.push(n)}var s=o.join(",");if(e){s="["+s+"]"}else{s="{"+s+"}"}return s}var CodeEditor=BasePropertyEditor.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.codeEditor.CodeEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.codeEditor.CodeEditor",metadata:{library:"sap.ui.integration"},renderer:BasePropertyEditor.getMetadata().getRenderer().render});CodeEditor.configMetadata=Object.assign({},BasePropertyEditor.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},typeLabel:{defaultValue:"BASE_EDITOR.TYPES.OBJECT"}});CodeEditor.prototype.setConfig=function(t){BasePropertyEditor.prototype.setConfig.apply(this,arguments);this._sCodeType=this.getConfig().codeType?this.getConfig().codeType:"json"};CodeEditor.prototype._onLiveChange=function(){var t=this.getContent();if(this._sCodeType==="json"){var e=this._parseJson(t.getValue());if(e instanceof Error){t.setValueState("Error");t.setValueStateText("Error: "+e)}else{t.setValueState("None");this.setValue(e)}}};CodeEditor.prototype._parseJson=function(t){try{var e=JSON.parse(t);return e}catch(t){return t}};CodeEditor.prototype.formatValue=function(t){t=json2str(t);return t};CodeEditor.prototype._openCodeEditor=function(){if(this._oDialog){this._oDialog.destroy()}return Fragment.load({name:"sap.ui.integration.designtime.baseEditor.propertyEditor.codeEditor.CodeEditorDialog",controller:this}).then(function(t){this._oDialog=t;this._oEditor=this._oDialog.getContent()[0];this._oEditor.getInternalEditorInstance().getSession().on("changeAnnotation",this.onChangeAnnotation.bind(this));this._oDialog.attachAfterOpen(function(){this._oEditor.getInternalEditorInstance().focus();this._oEditor.getInternalEditorInstance().navigateFileEnd()},this);this.addDependent(this._oDialog);this._openDialog();return this._oDialog}.bind(this))};CodeEditor.prototype._openDialog=function(){var t=this.getContent().getValue();try{var e=JSON.stringify(JSON.parse(t),0,"\t");this._oEditor.setValue(e)}catch(e){this._oEditor.setValue(t)}this._oDialog.open();this._oEditor.prettyPrint()};CodeEditor.prototype.onClose=function(){this._oCode=null;this._oDialog.close()};CodeEditor.prototype.onBeautify=function(){try{var t=JSON.stringify(JSON.parse(this._oEditor.getValue()),0,"\t");this._oEditor.setValue(t)}catch(t){this._oEditor.prettyPrint()}};CodeEditor.prototype.onChangeAnnotation=function(){if(!this._oDialog.isOpen()){return}var t=(this._oEditor.getInternalEditorInstance().getSession().getAnnotations()||[]).filter(function(t){return t.type==="error"});if(t.length>0){this._oDialog.getBeginButton().setEnabled(false)}else{var e=this._oEditor.getInternalEditorInstance().getValue();if(e&&e!==""){switch(this._sCodeType){case"json":this._oCode=JSON.parse(e);break;case"javascript":default:this._oCode=e}}this._oDialog.getBeginButton().setEnabled(true)}};CodeEditor.prototype.onSave=function(){var oInput=this.getContent();if(this._oCode&&this._oCode!==""){oInput.setValueState("None");if(this._oCode&&this._oCode!==""){switch(this._sCodeType){case"json":oInput.setValue(JSON.stringify(this._oCode));break;case"javascript":default:this._oCode=eval("("+this._oCode+")");oInput.setValue(this._oCode)}}this.setValue(this._oCode)}this._oDialog.close()};return CodeEditor});
//# sourceMappingURL=CodeEditor.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/mdc/p13n/P13nBuilder","sap/m/p13n/Container","sap/m/p13n/AbstractContainerItem","sap/base/util/UriParameters","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,n,i,r,o,jQuery){"use strict";var a="UIManager: This class is a singleton and should not be used without an AdaptationProvider. Please use 'sap.ui.mdc.p13n.Engine.getInstance().uimanager' instead";var s;var c=r.fromQuery(window.location.search);var u=t.extend("sap.ui.mdc.p13n.UIManager",{constructor:function(e){if(s){throw Error(a)}this.oAdaptationProvider=e;t.call(this)}});u.prototype.show=function(t,e,n){this.bLiveMode=false;if(c.get("sap-ui-xx-p13nLiveMode")==="true"){this.bLiveMode=true;o.warning("Please note that the p13n liveMode is experimental")}if(!this.hasActiveP13n(t)){this.setActiveP13n(t,e);return this.create(t,e).then(function(i){this._openP13nControl(t,e,i,n);return i}.bind(this),function(e){this.setActiveP13n(t,null);o.error("Engine UI failure:"+e.stack)}.bind(this))}else{return Promise.resolve()}};u.prototype.create=function(t,e,n){var i=e instanceof Array?e:[e];var r=typeof t=="string"?sap.ui.getCore().byId(t):t;return this.oAdaptationProvider.initAdaptation(t,i,n).then(function(){return this._retrieveP13nContainer(r,i).then(function(t){r.addDependent(t);return t})}.bind(this))};u.prototype._openP13nControl=function(t,e,n,i){var r=e instanceof Array?e:[e];if(this.bLiveMode){n.openBy(i);delete this.bLiveMode}else{n.open()}if(this.oAdaptationProvider&&this.oAdaptationProvider.validateP13n instanceof Function){r.forEach(function(e){var i=r.length>1;var o;var a=n.getContent()[0];if(i&&a.isA("sap.m.p13n.Container")&&a.getView(e)){o=a.getView(e).getContent()}else{o=a}this.oAdaptationProvider.validateP13n(t,e,o)}.bind(this))}};u.prototype._retrieveP13nContainer=function(t,e){var r=[];var o=e instanceof Array&&e.length>1;var a=this.oAdaptationProvider.getUISettings(t,e);e.forEach(function(t){if(!a[t]){e.splice(e.indexOf(t),1);return}});e.forEach(function(n){var i=a[n].adaptationUI;i._key=n;var s=i.then(function(n){if(this.bLiveMode&&n&&n.attachChange){n.attachChange(function(){this.oAdaptationProvider.handleP13n(t,e)}.bind(this))}if(n&&n.attachChange){n.attachChange(function(i){var r=o?i.getSource().getParent().getParent().getCurrentViewKey():e[0];this.oAdaptationProvider.validateP13n(t,r,n)}.bind(this))}var r=a[i._key];return{key:i._key,tab:r.containerSettings&&r.containerSettings.tabText?r.containerSettings.tabText:i._key,panel:n}}.bind(this));r.push(s)}.bind(this));return Promise.all(r).then(function(r){var s=o?new n({afterViewSwitch:function(e){this.oAdaptationProvider.validateP13n(t,e.getParameter("target"),e.getSource().getCurrentViewContent())}.bind(this)}):r[0].panel;if(o){r.forEach(function(t){if(t.panel){s.addView(new i({key:t.key,text:t.tab,content:t.panel}))}});s.switchView(r[0].key)}return this._createUIContainer(t,e,s,a).then(function(t){return t})}.bind(this))};u.prototype._createUIContainer=function(t,e,n,i){var r;var o=e.length>1?this._getDefaultContainerConfig(i):i[e[0]];if(this.bLiveMode){r=this._createPopover(t,e,n,o)}else{r=this._createModalDialog(t,e,n,o)}return r.then(function(n){n.addStyleClass("sapUiMdcPersonalizationDialog");n.isPopupAdaptationAllowed=function(){return false};if(this.bLiveMode===false){n.setEscapeHandler(function(r){this.setActiveP13n(t,null);e.forEach(function(t){if(i[t].containerSettings&&i[t].containerSettings.afterClose instanceof Function){i[t].containerSettings.afterClose({getSource:function(){return n}})}});n.close();n.destroy();r.resolve()}.bind(this))}n.toggleStyleClass("sapUiSizeCompact",!!jQuery(t).closest(".sapUiSizeCompact").length);return n}.bind(this))};u.prototype._createPopover=function(t,n,i,r){var o=function(e){var n=e.getSource();this.setActiveP13n(t,null);n.destroy()}.bind(this);var a=Object.assign({verticalScrolling:true,reset:r.reset,afterClose:o},r.containerSettings);if(r.resetEnabled){a.reset={onExecute:function(){n.forEach(function(e){this.oAdaptationProvider.reset(t,e)}.bind(this))}}}return e.createP13nPopover(i,a)};u.prototype._createModalDialog=function(t,n,i,r){var o=function(e){var r=e.getSource().getParent();var o=this._confirmContainer(t,n,i);o.then(function(){this.setActiveP13n(t,null);r.close()}.bind(this))}.bind(this);var a=function(e){var n=e.getSource().getParent();this.setActiveP13n(t,null);n.close()}.bind(this);var s=Object.assign({verticalScrolling:true,reset:r.reset||{},afterClose:function(t){var e=t.getSource();if(e){e.destroy()}},cancel:a},r.containerSettings);if(r.resetEnabled){s.reset.onExecute=function(){this.oAdaptationProvider.reset(t,n)}.bind(this)}s.confirm={handler:function(t){o(t)}};return e.createP13nDialog(i,s)};u.prototype.setActiveP13n=function(t,e){if(this.oAdaptationProvider.setActiveP13n instanceof Function){this.oAdaptationProvider.setActiveP13n(t,e)}};u.prototype.hasActiveP13n=function(t){var e=false;if(this.oAdaptationProvider.hasActiveP13n instanceof Function){e=this.oAdaptationProvider.hasActiveP13n(t)}return e};u.prototype._getDefaultContainerConfig=function(t){var e=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var n=Object.keys(t);var i={containerSettings:{title:e.getText("p13nDialog.VIEW_SETTINGS"),verticalScrolling:false,contentHeight:t.contentHeight,contentWidth:t.contentWidth,afterClose:function(e){n.forEach(function(n){if(t[n]&&t[n].containerSettings&&t[n].containerSettings.afterClose instanceof Function){t[n].containerSettings.afterClose(e)}});e.getSource().destroy()}}};if(t.resetEnabled!==false){i.reset={onExecute:function(t){this.oAdaptationProvider.reset(t,n)}.bind(this),warningText:e.getText("p13nDialog.RESET_WARNING_TEXT")}}return i};u.prototype._confirmContainer=function(t,e){return this.oAdaptationProvider.handleP13n(t,e)};u._checkValidInterface=function(t){if(!t||!t.isA("sap.ui.mdc.p13n.AdaptationProvider")){throw Error("The UIManager singleton must not be accessed without an AdaptationProvider interface!")}};u.getInstance=function(t){if(!s){this._checkValidInterface(t);s=new u(t)}return s};u.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);s=null};return u});
//# sourceMappingURL=UIManager.js.map
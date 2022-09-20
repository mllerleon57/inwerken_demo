/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./ObjectPageDynamicHeaderContentRenderer","sap/f/DynamicPageHeader"],function(e,t,n){"use strict";var a=n.extend("sap.uxap.ObjectPageDynamicHeaderContent",{metadata:{interfaces:["sap.uxap.IHeaderContent"],library:"sap.uxap"}});a.createInstance=function(e,t,n,r,i){return new a({content:e,visible:t,pinnable:r,id:i})};a.prototype.supportsPinUnpin=function(){return true};a.prototype.supportsChildPageDesign=function(){return false};a.prototype.supportsAlwaysExpanded=function(){return false};a.prototype.setContentDesign=function(e){};a.prototype.setVisible=function(e){this.getParent()&&this.getParent().toggleStyleClass("sapUxAPObjectPageLayoutNoHeaderContent",!e);return this.setProperty("visible",e)};return a});
//# sourceMappingURL=ObjectPageDynamicHeaderContent.js.map
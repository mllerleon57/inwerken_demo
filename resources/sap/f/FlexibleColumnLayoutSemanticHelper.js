/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./FlexibleColumnLayout","sap/base/assert"],function(e,n,t){"use strict";var o=e.LayoutType;var u=function(e,n){var t={Normal:3,MasterDetail:2,SingleColumn:1},u,l;n||(n={});this._oFCL=e;this._defaultLayoutType=o.OneColumn;this._defaultTwoColumnLayoutType=[o.TwoColumnsBeginExpanded,o.TwoColumnsMidExpanded].indexOf(n.defaultTwoColumnLayoutType)!==-1?n.defaultTwoColumnLayoutType:o.TwoColumnsBeginExpanded;this._defaultThreeColumnLayoutType=[o.ThreeColumnsMidExpanded,o.ThreeColumnsEndExpanded].indexOf(n.defaultThreeColumnLayoutType)!==-1?n.defaultThreeColumnLayoutType:o.ThreeColumnsMidExpanded;if(["Normal","MasterDetail","SingleColumn"].indexOf(n.mode)!==-1&&!n.maxColumnsCount){l=t[n.mode]}else{l=n.maxColumnsCount?parseInt(n.maxColumnsCount):3;if(l<1||l>3){l=3}}this._maxColumnsCount=l;u=n.initialColumnsCount?parseInt(n.initialColumnsCount):1;if(u<1||u>2||this._maxColumnsCount===1){u=1}this._initialColumnsCount=u};u._oInstances={};u.getInstanceFor=function(e,o){t(e instanceof n,"Passed control is not FlexibleColumnLayout");var l=e.getId();if(typeof u._oInstances[l]==="undefined"){u._oInstances[l]=new u(e,o);var i={onDestroy:function(){delete u._oInstances[l]}};e.addEventDelegate(i)}return u._oInstances[l]};u.prototype.getCurrentUIState=function(){var e=this._oFCL.getLayout();return this._getUIStateForLayout(e)};u.prototype.getNextUIState=function(e){var n=this._oFCL.getLayout(),t=this._initialColumnsCount,u;if(e===0){if(t===2&&this._canShowTwoColumns()){u=this._defaultTwoColumnLayoutType}else{u=o.OneColumn}}if(e===1){if(this._maxColumnsCount===1){u=o.MidColumnFullScreen}else{if([o.TwoColumnsBeginExpanded,o.TwoColumnsMidExpanded].indexOf(n)!==-1){u=n}else if([o.MidColumnFullScreen,o.EndColumnFullScreen].indexOf(n)!==-1){u=o.MidColumnFullScreen}else{u=this._defaultTwoColumnLayoutType}}}if(e===2){if(this._maxColumnsCount<3){u=o.EndColumnFullScreen}else{if([o.ThreeColumnsMidExpandedEndHidden,o.ThreeColumnsBeginExpandedEndHidden].indexOf(n)!==-1){u=this._defaultThreeColumnLayoutType}else if([o.ThreeColumnsMidExpanded,o.ThreeColumnsEndExpanded].indexOf(n)!==-1){u=n}else if([o.MidColumnFullScreen,o.EndColumnFullScreen].indexOf(n)!==-1){u=o.EndColumnFullScreen}else{u=this._defaultThreeColumnLayoutType}}}if(e>2){u=o.EndColumnFullScreen}return this._getUIStateForLayout(u)};u.prototype._getUIStateForLayout=function(e){var n=this._oFCL._getColumnWidthDistributionForLayout(e,true),t=n.join("/"),o=this._oFCL.getMaxColumnsCount();return{layout:e,maxColumnsCount:o,columnsSizes:this._getColumnsSizes(n),columnsVisibility:this._getColumnsVisibility(n),isFullScreen:this._getIsFullScreen(n),isLogicallyFullScreen:this._getIsLogicallyFullScreen(e),actionButtonsInfo:this._getActionButtonsInfo(t,o)}};u.prototype._getColumnsSizes=function(e){return{beginColumn:e[0],midColumn:e[1],endColumn:e[2]}};u.prototype._getColumnsVisibility=function(e){return{beginColumn:e[0]!==0,midColumn:e[1]!==0,endColumn:e[2]!==0}};u.prototype._getIsFullScreen=function(e){return e.indexOf(100)!==-1};u.prototype._getIsLogicallyFullScreen=function(e){return[o.OneColumn,o.MidColumnFullScreen,o.EndColumnFullScreen].indexOf(e)!==-1};u.prototype._getActionButtonsInfo=function(e,n){var t={fullScreen:null,exitFullScreen:null,closeColumn:null},u={fullScreen:null,exitFullScreen:null,closeColumn:null},l,i;if(this._maxColumnsCount===1){return{midColumn:t,endColumn:u}}if(n===1){t.closeColumn=this._defaultLayoutType;u.closeColumn=this._defaultTwoColumnLayoutType}else{if(e==="67/33/0"||e==="33/67/0"){t.fullScreen=o.MidColumnFullScreen;t.closeColumn=this._defaultLayoutType}if(e==="25/50/25"||e==="25/25/50"||e==="0/67/33"||e==="0/33/67"){u.fullScreen=o.EndColumnFullScreen;u.closeColumn=this._defaultTwoColumnLayoutType}if(e==="0/100/0"){l=[o.TwoColumnsBeginExpanded,o.TwoColumnsMidExpanded,o.ThreeColumnsBeginExpandedEndHidden,o.ThreeColumnsMidExpandedEndHidden];i=this._oFCL._getLayoutHistory().getClosestEntryThatMatches(l)||this._defaultTwoColumnLayoutType;t.exitFullScreen=i;t.closeColumn=this._defaultLayoutType}if(e==="0/0/100"){if(this._maxColumnsCount!==2){l=[o.ThreeColumnsMidExpanded,o.ThreeColumnsEndExpanded];i=this._oFCL._getLayoutHistory().getClosestEntryThatMatches(l)||this._defaultThreeColumnLayoutType;u.exitFullScreen=i;u.closeColumn=this._defaultTwoColumnLayoutType}}}return{midColumn:t,endColumn:u}};u.prototype.getDefaultLayouts=function(){return{defaultLayoutType:this._defaultLayoutType,defaultTwoColumnLayoutType:this._defaultTwoColumnLayoutType,defaultThreeColumnLayoutType:this._defaultThreeColumnLayoutType}};u.prototype._canShowTwoColumns=function(){var e=this._oFCL._getControlWidth(),n=this._oFCL._getMaxColumnsCountForWidth(e||window.innerWidth);return n>1};u.prototype.isReady=function(){return this.isDOMReady()};u.prototype.isDOMReady=function(){return this._oFCL.getDomRef()!==null};u.prototype.whenReady=function(){var e=this;return new Promise(function(n,t){e.whenDOMReady().then(function(){n()}).catch(function(e){t(e)})})};u.prototype.whenDOMReady=function(){var e=this;var n=new Promise(function(n,t){if(!e._oFCL||e._oFCL.bIsDestroyed){t("FlexibleColumnLayout reference missing. Please make sure FlexibleColumnLayoutSemanticHelper is properly initialized.")}if(e._oFCL.getDomRef()){n()}else{var o={onAfterRendering:function(){e._oFCL.removeEventDelegate(o);n()}};e._oFCL.addEventDelegate(o)}});return n};return u},true);
//# sourceMappingURL=FlexibleColumnLayoutSemanticHelper.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/base/FilterableListContent","sap/ui/mdc/util/loadModules","sap/base/util/deepEqual","sap/ui/mdc/enum/SelectType","sap/ui/mdc/library","sap/m/library","sap/ui/table/library","sap/ui/thirdparty/jquery","sap/ui/mdc/condition/FilterConverter","sap/base/util/restricted/_throttle","sap/ui/mdc/util/Common","sap/base/Log"],function(e,t,i,n,a,o,l,jQuery,s,r,h,c){"use strict";var d=o.ListMode;var u=o.Sticky;var g=a.SelectionMode;var p=l.VisibleRowCountMode;var _=l.SelectionMode;var b=l.SelectionBehavior;var f=function(e){var t,i=t=e&&e.getType();if(!i){t="Table"}else if(typeof i==="object"){if(i.isA("sap.ui.mdc.table.ResponsiveTableType")){t="ResponsiveTable"}else{t="Table"}}return t};var v=function(){var e=this._getTable();var t=e&&e._oTable;var i=e.getRowBinding();var a=function(){return this._oUITableSelectionPlugin||t}.bind(this);var o=function(e,t){var i=t?n.Add:n.Remove;if(!t&&this._isSingleSelect()){i=n.Add}this._fireSelect({type:i,conditions:e})};var l={ResponsiveTable:{getListBindingInfo:function(){return t&&t.getBindingInfo("items")},getItems:function(){return t.getItems()},getSelectedItems:function(){return t.getSelectedItems()},modifySelection:function(e,t){if(e.getSelected()!==t){e.setSelected(t)}},handleItemPress:function(e){var t=e.getParameter("listItem");if(!this.isTypeahead()||!this._isSingleSelect()){t.setSelected(!t.getSelected())}var i=this._getListBindingInfo().model;var n=t.getBindingContext(i);var a=this._getItemFromContext(n);var l=a&&this._createCondition(a.key,a.description,a.payload);o.call(this,[l],t.getSelected())},handleSelectionChange:function(e){if(!this.isTypeahead()||!this._isSingleSelect()){var t=e.getParameters();var i=t.listItems||t.listItem&&[t.listItem];var n=this._getListBindingInfo().model;var a=i.map(function(e){var t=e.getBindingContext(n);var i=this._getItemFromContext(t);return i&&this._createCondition(i.key,i.description,i.payload)}.bind(this));o.call(this,a,t.selected)}},adjustTable:function(){var e=t.getSticky();if(!e||e.length===0){t.setSticky([u.ColumnHeaders])}if(this._isSingleSelect()){t.setMode(d.SingleSelectLeft)}else{t.setMode(d.MultiSelect)}},handleScrolling:function(e){var i=this.getScrollDelegate();if(i){t.scrollToIndex(e).catch(function(e){});return true}},handleListBinding:function(){}},Table:{getListBindingInfo:function(){return t&&t.getBindingInfo("rows")},getItems:function(){return t.getRows().filter(function(e){var t=e.getBindingContext();return t&&t.getObject()})},getSelectedItems:function(){var e=a().getSelectedIndices();var i=e.reduce(function(e,i){var n=t.getContextByIndex(i);return n?e.concat(n):e},[]);return l["Table"].getItems().filter(function(e){return i.indexOf(e.getBindingContext())>=0})},modifySelection:function(e,t){var i=e.getBindingContext();var n=l["Table"].getContexts().indexOf(i);var o=a().getSelectedIndices().indexOf(n)>=0;if(t&&!o){return this._isSingleSelect()?a().setSelectedIndex(n):a().addSelectionInterval(n,n)}else if(!t&&o){return a().removeSelectionInterval(n,n)}},handleItemPress:function(e){},handleSelectionChange:function(e){if(this._bScrolling||this._bBusy){return}var t=e.getParameter("rowIndices");var i=l["Table"].getContexts().filter(function(e,i){return t.indexOf(i)>=0});var n=l["Table"].getItems().filter(function(e,t){return i.indexOf(e.getBindingContext())>=0});var a=[],s=[];var r=l["Table"].getSelectedItems();var h=this.getConditions();n.forEach(function(e,t){var i=this._isItemSelected(e,h);var n=r.indexOf(e)!==-1;if(i!==n){var o=r.indexOf(e)!==-1?a:s;var l=this._getItemFromContext(e.getBindingContext());var c=l&&this._createCondition(l.key,l.description,l.payload);o.push(c)}}.bind(this));var c=this._isSingleSelect();if(a.length){o.call(this,a,true);if(c){return}}if(s.length){o.call(this,s,false)}},adjustTable:function(){var e=t.getRowMode();if(!e){t.setVisibleRowCountMode(p.Auto);t.setMinAutoRowCount(3)}else if(e.isA("sap.ui.table.rowmodes.AutoRowMode")){e.setMinRowCount(3)}var i=this._isSingleSelect()?_.Single:_.MultiToggle;t.setSelectionBehavior(b.Row);a().setSelectionMode(i)},handleScrolling:function(e){var i=t.getFirstVisibleRow();if(typeof e==="undefined"||e<0){e=i-1}if(e>=0&&e!=i){t.setFirstVisibleRow(e);return Promise.resolve()}return false},getContexts:function(){return i&&i.getAllCurrentContexts()},handleListBinding:function(){i.attachEvent("change",this._handleUpdateFinished.bind(this))}}};return l[this._sTableType]};function S(){if(this._oTableHelper&&!this._bSelectionIsUpdating){this._bSelectionIsUpdating=true;var e=this._oTableHelper.getItems();var t=this.getConditions();var i=[];for(var n in e){var a=e[n];var o=this._isItemSelected(a,t);i.push(this._oTableHelper.modifySelection.call(this,a,o))}Promise.all(i).then(function(){this._bSelectionIsUpdating=false}.bind(this))}}var T=r(S,100,{leading:true});var y=e.extend("sap.ui.mdc.valuehelp.content.MDCTable",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.IDialogContent"],properties:{forceBind:{type:"boolean",defaultValue:false}},aggregations:{table:{type:"sap.ui.mdc.Table",multiple:false}},events:{},defaultAggregation:"table"}});y.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver.observe(this,{aggregations:["table"]});this._addPromise("listBinding");this._bRebindTable=false};var m=function(){var e=this._getTable().getRowBinding();if(e){this._oTableHelper=v.call(this);this._oTableHelper.handleListBinding.call(this);x.call(this);this._resolvePromise("listBinding",e)}};var C=function(){if(this._oTable&&!this._oTable.getHeader()){this._oTable.setHeader(this._oResourceBundle.getText("valuehelp.TABLETITLENONUMBER"))}};y.prototype._handleConditionsUpdate=function(){T.call(this)};y.prototype._handleUpdateFinished=function(e){this._bScrolling=false;T.call(this)};y.prototype._handleFirstVisibleRowChanged=function(e){this._bScrolling=true;T.call(this)};y.prototype._handleBusyStateChanged=function(e){this._bBusy=e.getParameter("busy")};var B=function(e,t){if(!e){return}if(t==="remove"){if(this._sTableType==="Table"){e.detachEvent("cellClick",this._handleItemPress,this);e.detachEvent("rowSelectionChange",this._handleSelectionChange,this);e.detachEvent("rowsUpdated",this._handleUpdateFinished,this);e.detachEvent("firstVisibleRowChanged",this._handleFirstVisibleRowChanged,this);e.detachEvent("busyStateChanged",this._handleBusyStateChanged,this);if(this._oUITableSelectionPlugin){this._oUITableSelectionPlugin.detachEvent("selectionChange",this._handleSelectionChange,this)}this._oUITableSelectionPlugin=undefined}else if(this._sTableType==="ResponsiveTable"){e.detachEvent("itemPress",this._handleItemPress,this);e.detachEvent("selectionChange",this._handleSelectionChange,this);e.detachEvent("updateFinished",this._handleUpdateFinished,this)}this._oObserver.unobserve(e)}else{if(this._sTableType==="Table"){this._oObserver.observe(e,{bindings:["rows"],aggregations:["plugins"]});e.attachEvent("cellClick",this._handleItemPress,this);e.attachEvent("rowSelectionChange",this._handleSelectionChange,this);e.attachEvent("rowsUpdated",this._handleUpdateFinished,this);e.attachEvent("firstVisibleRowChanged",this._handleFirstVisibleRowChanged,this);e.attachEvent("busyStateChanged",this._handleBusyStateChanged,this);this._oUITableSelectionPlugin=e.getPlugins().find(function(e){return e.isA("sap.ui.table.plugins.SelectionPlugin")});if(this._oUITableSelectionPlugin){this._oUITableSelectionPlugin.attachEvent("selectionChange",this._handleSelectionChange,this)}}else if(this._sTableType==="ResponsiveTable"){this._oObserver.observe(e,{bindings:["items"]});e.attachEvent("itemPress",this._handleItemPress,this);e.attachEvent("selectionChange",this._handleSelectionChange,this);e.attachEvent("updateFinished",this._handleUpdateFinished,this)}}};y.prototype._observeChanges=function(t){if(["_defaultFilterBar","filterBar"].indexOf(t.name)!==-1){I.call(this)}if(t.name==="table"){var i=t.child;if(t.mutation==="remove"){this._oObserver.unobserve(i);this._oTable=null;this._oTableHelper=null;this._addPromise("listBinding")}else{this._oTable=i;if(this._oTable.getAutoBindOnInit()){c.warning("Usage of autobound tables may lead to unnecessary requests.")}else if(this.getForceBind()){this._bRebindTable=true}this._oObserver.observe(i,{aggregations:["_content"]});this._sTableType=f(i);i.addDelegate({onmouseover:function(e){var t=jQuery(e.target).control(0);if(t&&t.isA("sap.m.ColumnListItem")){t.setType("Active")}}});B.call(this,this._oTable._oTable,"insert");m.call(this);C.call(this);I.call(this)}return}if(t.name==="_content"){B.call(this,t.child,t.mutation);return}if(["rows","items"].indexOf(t.name)!==-1&&t.mutation==="ready"){m.call(this);return}if(t.name==="config"){x.call(this)}if(t.name==="plugins"){this._oUITableSelectionPlugin=t.mutation==="remove"||!t.child.isA("sap.ui.table.plugins.SelectionPlugin")?undefined:t.child;if(this._oUITableSelectionPlugin){this._oUITableSelectionPlugin.attachEvent("selectionChange",this._handleSelectionChange,this)}}e.prototype._observeChanges.apply(this,arguments)};y.prototype._getTable=function(){return this._oTable};function I(){var e=this._getPriorityFilterBar();if(this._oTable&&e&&this._oTable.getFilter()!==e.getId()){this._oTable.setFilter(e)}}function x(){if(this._oTableHelper){this._oTableHelper.adjustTable.call(this)}}y.prototype.getContent=function(){return this._retrievePromise("wrappedContent",function(){return t(["sap/ui/layout/FixFlex","sap/m/VBox","sap/m/ScrollContainer"]).then(function(e){var t=e[0];var i=e[1];var n=e[2];if(!this._oContentLayout){this._oFilterBarVBox=new i(this.getId()+"-FilterBarBox",{visible:"{$this>/_filterBarVisible}"});this._oFilterBarVBox.addStyleClass("sapMdcValueHelpPanelFilterbar");this._oFilterBarVBox._oWrapper=this;this._oFilterBarVBox.getItems=function(){var e=this._oWrapper._getPriorityFilterBar.call(this._oWrapper);var t=e?[e]:[];return t};this._oTableBox=new i(this.getId()+"-TB",{height:"100%"});this._oTableBox.addStyleClass("sapMdcValueHelpPanelTableBox");this._oTableBox._oWrapper=this;this._oTableBox.getItems=function(){var e=this._oWrapper._sTableType==="ResponsiveTable"?this._oWrapper._oScrollContainer:this._oWrapper._oTable;var t=e?[e]:[];return t};this._oContentLayout=new t(this.getId()+"-FF",{minFlexSize:200,fixContent:this._oFilterBarVBox,flexContent:this._oTableBox});this._oScrollContainer=new n(this.getId()+"-SC",{height:"calc(100% - 0.5rem)",width:"100%",vertical:true});this._oScrollContainer._oWrapper=this;this._oScrollContainer.getContent=function(){var e=[];var t=this._oWrapper&&this._oWrapper._oTable;if(t){e.push(t)}return e}}this.setAggregation("displayContent",this._oContentLayout);if(!this._getPriorityFilterBar()){return this._createDefaultFilterBar().then(function(){this._oFilterBarVBox.invalidate();return this._oContentLayout}.bind(this))}return this._oContentLayout}.bind(this))}.bind(this))};y.prototype.getListBinding=function(){var e=this.getTable();return e&&e.getRowBinding()};y.prototype._getListBindingInfo=function(){return this._oTableHelper&&this._oTableHelper.getListBindingInfo()};y.prototype.onBeforeShow=function(){return Promise.resolve(e.prototype.onBeforeShow.apply(this,arguments)).then(function(){var e=this.getTable();var t=e&&e.isTableBound()&&e._oTable.getShowOverlay();var i=e&&this._bRebindTable;if(i||t){e.rebind();this._bRebindTable=false}}.bind(this))};y.prototype.onShow=function(){if(this._oTable){var t=e.prototype._isSingleSelect.apply(this)?g.Single:g.Multi;if(this._oTable.getSelectionMode()===g.None){this._oTable.setSelectionMode(t)}if(this._oTable.getSelectionMode()!==t){throw new Error("Table selectionMode needs to be "+t)}}e.prototype.onShow.apply(this,arguments)};y.prototype._handleScrolling=function(e){return this._oTableHelper&&this._oTableHelper.handleScrolling.call(this,e)};y.prototype.getScrollDelegate=function(){if(!this.isTypeahead()&&this._oScrollContainer){return this._oScrollContainer.getScrollDelegate()}return e.prototype.getScrollDelegate.apply(this,arguments)};y.prototype._handleItemPress=function(e){this._oTableHelper.handleItemPress.call(this,e)};y.prototype._handleSelectionChange=function(e){if(!this._bSelectionIsUpdating){this._oTableHelper.handleSelectionChange.call(this,e)}};y.prototype.isQuickSelectSupported=function(){return true};y.prototype.setParent=function(t){e.prototype.setParent.apply(this,arguments);x.call(this)};y.prototype._isSingleSelect=function(){if(this._oTable){if(this._oTable.getSelectionMode()===g.Multi){return false}else{return true}}else{return e.prototype._isSingleSelect.apply(this,arguments)}};y.prototype.exit=function t(i){h.cleanup(this,["_oContentLayout","_oFilterBarVBox","_oTableBox","_oResourceBundle","_oScrollContainer","_oTableHelper","_bSelectionIsUpdating","_bScrolling","_bBusy","_sTableType","_oUITableSelectionPlugin","_oTable","_bRebindTable"]);e.prototype.exit.apply(this,arguments)};return y});
//# sourceMappingURL=MDCTable.js.map
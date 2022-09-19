/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ColumnListItem','./P13nPanel','./P13nColumnsItem','./SearchField','./Table','./library','sap/ui/core/library','sap/ui/model/ChangeReason','sap/ui/model/json/JSONModel','sap/ui/model/BindingMode','sap/ui/core/ResizeHandler','sap/ui/core/IconPool','sap/m/ScrollContainer'],function(q,C,P,c,S,T,l,d,e,J,B,R,I,f){"use strict";var O=l.OverflowToolbarPriority;var g=l.ButtonType;var h=l.ToolbarDesign;var L=l.ListType;var i=l.ListMode;var j=l.P13nPanelType;var k=P.extend("sap.m.P13nColumnsPanel",{metadata:{library:"sap.m",properties:{visibleItemsThreshold:{type:"int",group:"Behavior",defaultValue:-1}},aggregations:{columnsItems:{type:"sap.m.P13nColumnsItem",multiple:true,singularName:"columnsItem",bindable:"bindable"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"}},events:{addColumnsItem:{parameters:{newItem:{type:"sap.m.P13nColumnsItem"}}},changeColumnsItems:{parameters:{newItems:{type:"sap.m.P13nColumnsItem[]"},existingItems:{type:"sap.m.P13nColumnsItem[]"},items:{type:"object[]"}}},setData:{}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.addClass("sapMP13nColumnsPanel");r.writeClasses();r.write(">");var a=o.getAggregation("content");if(a){a.forEach(function(b){r.renderControl(b);});}r.write("</div>");}});k.prototype.init=function(){this._iLiveChangeTimer=0;this._iSearchTimer=0;this._bIgnoreUpdateInternalModel=false;this._bUpdateInternalModel=true;this._bTableItemsChanged=false;this._bOnAfterRenderingFirstTimeExecuted=false;var m=new J({items:[],columnKeyOfMarkedItem:undefined,isMoveDownButtonEnabled:undefined,isMoveUpButtonEnabled:undefined,showOnlySelectedItems:undefined,countOfSelectedItems:0,countOfItems:0});m.setDefaultBindingMode(B.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapmP13nColumnsPanel");this.setType(j.columns);this.setTitle(sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("COLUMSPANEL_TITLE"));this._createTable();this._createToolbar();this.setVerticalScrolling(false);var s=new f({horizontal:false,vertical:true,content:[this._oTable],width:'100%',height:'100%'});this.addAggregation("content",s);var t=this;this._fnHandleResize=function(){var b=false,a,n;if(t.getParent){var $=null,o,H;var p=t.getParent();var r=t._getToolbar();if(p&&p.$){$=p.$("cont");if($.children().length>0&&r.$().length>0){a=s.$()[0].clientHeight;o=$.children()[0].clientHeight;H=r?r.$()[0].clientHeight:0;n=o-H;if(a!==n){s.setHeight(n+'px');b=true;}}}}return b;};this._sContainerResizeListener=R.register(s,this._fnHandleResize);};k.prototype.reInitialize=function(){};k.prototype.onBeforeRendering=function(){this._updateInternalModel();if(!this._getInternalModel().getProperty("/columnKeyOfMarkedItem")){this._setColumnKeyOfMarkedItem(this._getColumnKeyByTableItem(this._getVisibleTableItems()[0]));}this._switchMarkedTableItemTo(this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem")));this._updateControlLogic();};k.prototype.onAfterRendering=function(){if(!this._bOnAfterRenderingFirstTimeExecuted){this._bOnAfterRenderingFirstTimeExecuted=true;window.clearTimeout(this._iLiveChangeTimer);var t=this;this._iLiveChangeTimer=window.setTimeout(function(){t._fnHandleResize();},0);}};k.prototype.getOkPayload=function(){this._updateInternalModel();var m=this._getInternalModel().getProperty("/items");return{tableItems:m.map(function(M){return{columnKey:M.columnKey,index:M.persistentIndex===-1?undefined:M.persistentIndex,visible:M.persistentSelected,width:M.width};}),tableItemsChanged:this._bTableItemsChanged,selectedItems:m.filter(function(M){return M.persistentSelected;}).map(function(M){return{columnKey:M.columnKey};})};};k.prototype.getResetPayload=function(){return{oPanel:this};};k.prototype.exit=function(){R.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;this._getToolbar().destroy();this._oTable.destroy();this._oTable=null;if(this._getInternalModel()){this._getInternalModel().destroy();}window.clearTimeout(this._iLiveChangeTimer);window.clearTimeout(this._iSearchTimer);};k.prototype.addItem=function(o){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.addAggregation("items",o);return this;};k.prototype.insertItem=function(o,a){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.insertAggregation("items",o,a);return this;};k.prototype.removeItem=function(o){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}o=this.removeAggregation("items",o);return o;};k.prototype.removeAllItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAllAggregation("items");};k.prototype.destroyItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.destroyAggregation("items");return this;};k.prototype.addColumnsItem=function(o){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.addAggregation("columnsItems",o);return this;};k.prototype.insertColumnsItem=function(o,a){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.insertAggregation("columnsItems",o,a);return this;};k.prototype.updateColumnsItems=function(r){this.updateAggregation("columnsItems");if(r===e.Change&&!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}};k.prototype.removeColumnsItem=function(o){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAggregation("columnsItems",o);};k.prototype.removeAllColumnsItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}return this.removeAllAggregation("columnsItems");};k.prototype.destroyColumnsItems=function(){if(!this._bIgnoreUpdateInternalModel){this._bUpdateInternalModel=true;}this.destroyAggregation("columnsItems");return this;};k.prototype.onBeforeNavigationFrom=function(){var m=this._getSelectedModelItems();var v=this.getVisibleItemsThreshold();return!(m&&v!==-1&&m.length>v);};k.prototype._notifyChange=function(){this._bTableItemsChanged=true;var a=this.getChangeNotifier();if(a){a(this);}};k.prototype._scrollToSelectedItem=function(o){if(!o){return;}sap.ui.getCore().applyChanges();if(!!o.getDomRef()){o.focus();}};k.prototype._getInternalModel=function(){return this.getModel("$sapmP13nColumnsPanel");};k.prototype._createTable=function(){this._oTable=new T({mode:i.MultiSelect,rememberSelections:false,itemPress:q.proxy(this._onItemPressed,this),selectionChange:q.proxy(this._onSelectionChange,this),columns:[new sap.m.Column({vAlign:d.VerticalAlign.Middle,header:new sap.m.Text({text:{parts:[{path:'/countOfSelectedItems'},{path:'/countOfItems'}],formatter:function(a,b){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText('COLUMNSPANEL_SELECT_ALL_WITH_COUNTER',[a,b]);}}})})],items:{path:"/items",templateShareable:false,template:new C({cells:[new sap.m.Text({text:"{text}"})],visible:"{visible}",selected:"{persistentSelected}",tooltip:"{tooltip}",type:L.Active})}});this._oTable.setModel(this._getInternalModel());};k.prototype._createToolbar=function(){var t=this;var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var o=new sap.m.OverflowToolbar(this.getId()+"-toolbar",{design:h.Auto,content:[new sap.m.ToolbarSpacer(),new S(this.getId()+"-searchField",{liveChange:function(E){var v=E.getSource().getValue(),D=(v?300:0);window.clearTimeout(t._iSearchTimer);if(D){t._iSearchTimer=window.setTimeout(function(){t._onExecuteSearch();},D);}else{t._onExecuteSearch();}},search:q.proxy(this._onExecuteSearch,this),layoutData:new sap.m.OverflowToolbarLayoutData({minWidth:"12.5rem",maxWidth:"23.077rem",shrinkable:true,moveToOverflow:false,stayInOverflow:false})}),new sap.m.Button({text:{path:'/showOnlySelectedItems',formatter:function(s){return s?r.getText('COLUMNSPANEL_SHOW_ALL'):r.getText('COLUMNSPANEL_SHOW_SELECTED');}},tooltip:{path:'/showOnlySelectedItems',formatter:function(s){return s?r.getText('COLUMNSPANEL_SHOW_ALL'):r.getText('COLUMNSPANEL_SHOW_SELECTED');}},type:g.Transparent,press:q.proxy(this._onSwitchButtonShowSelected,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:O.High})}),new sap.m.OverflowToolbarButton({icon:I.getIconURI("collapse-group"),text:r.getText('COLUMNSPANEL_MOVE_TO_TOP'),tooltip:r.getText('COLUMNSPANEL_MOVE_TO_TOP'),type:g.Transparent,enabled:{path:'/isMoveUpButtonEnabled'},press:q.proxy(this.onPressButtonMoveToTop,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:O.Low,group:2})}),new sap.m.OverflowToolbarButton({icon:I.getIconURI("slim-arrow-up"),text:r.getText('COLUMNSPANEL_MOVE_UP'),tooltip:r.getText('COLUMNSPANEL_MOVE_UP'),type:g.Transparent,enabled:{path:'/isMoveUpButtonEnabled'},press:q.proxy(this.onPressButtonMoveUp,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:O.High,group:1})}),new sap.m.OverflowToolbarButton({icon:I.getIconURI("slim-arrow-down"),text:r.getText('COLUMNSPANEL_MOVE_DOWN'),tooltip:r.getText('COLUMNSPANEL_MOVE_DOWN'),type:g.Transparent,enabled:{path:'/isMoveDownButtonEnabled'},press:q.proxy(this.onPressButtonMoveDown,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:O.High,group:1})}),new sap.m.OverflowToolbarButton({icon:I.getIconURI("expand-group"),text:r.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),tooltip:r.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),type:g.Transparent,enabled:{path:'/isMoveDownButtonEnabled'},press:q.proxy(this.onPressButtonMoveToBottom,this),layoutData:new sap.m.OverflowToolbarLayoutData({moveToOverflow:true,priority:O.Low,group:2})})]});o.setModel(this._getInternalModel());this.addAggregation("content",o);};k.prototype.onPressButtonMoveToTop=function(){this._moveMarkedTableItem(this._getMarkedTableItem(),this._getVisibleTableItems()[0]);};k.prototype.onPressButtonMoveUp=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())-1]);};k.prototype.onPressButtonMoveDown=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())+1]);};k.prototype.onPressButtonMoveToBottom=function(){var v=this._getVisibleTableItems();this._moveMarkedTableItem(this._getMarkedTableItem(),v[v.length-1]);};k.prototype._onSwitchButtonShowSelected=function(){this._getInternalModel().setProperty("/showOnlySelectedItems",!this._getInternalModel().getProperty("/showOnlySelectedItems"));this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();this._fnHandleResize();};k.prototype._onExecuteSearch=function(){this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();this._updateControlLogic();};k.prototype._switchVisibilityOfUnselectedModelItems=function(){var s=this._isFilteredByShowSelected();var m=this._getInternalModel().getProperty("/items");m.forEach(function(M){if(M.persistentSelected){M.visible=true;return;}M.visible=!s;});this._getInternalModel().setProperty("/items",m);};k.prototype._getVisibleModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(m){return!!m.visible;});};k.prototype._moveMarkedTableItem=function(t,o){var m=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(t));var M=this._getModelItemByColumnKey(this._getColumnKeyByTableItem(o));var a=this._getModelItemIndexByColumnKey(m.columnKey);var b=this._getModelItemIndexByColumnKey(M.columnKey);this._moveModelItems(a,b);this._scrollToSelectedItem(this._getMarkedTableItem());this._updateControlLogic();this._fireChangeColumnsItems();this._fireSetData();this._notifyChange();};k.prototype._moveModelItems=function(a,b){var m=this._getInternalModel().getProperty("/items");if(a<0||b<0||a>m.length-1||b>m.length-1){return false;}this._removeStyleOfMarkedTableItem();var M=m.splice(a,1);m.splice(b,0,M[0]);this._updateModelItemsPersistentIndex(m);this._updateCounts(m);this._getInternalModel().setProperty("/items",m);this._switchMarkedTableItemTo(this._getMarkedTableItem());return true;};k.prototype._getModelItemByColumnKey=function(s){var m=this._getInternalModel().getProperty("/items").filter(function(M){return M.columnKey===s;});return m[0];};k.prototype._updateCounts=function(m){var a=0;var b=0;m.forEach(function(M){a++;if(M.persistentSelected){b++;}});this._getInternalModel().setProperty("/countOfItems",a);this._getInternalModel().setProperty("/countOfSelectedItems",b);};k.prototype._sortModelItemsByPersistentIndex=function(m){m.sort(function(a,b){if(a.persistentSelected===true&&(b.persistentSelected===false||b.persistentSelected===undefined)){return-1;}else if((a.persistentSelected===false||a.persistentSelected===undefined)&&b.persistentSelected===true){return 1;}else if(a.persistentSelected===true&&b.persistentSelected===true){if(a.persistentIndex>-1&&a.persistentIndex<b.persistentIndex){return-1;}else if(b.persistentIndex>-1&&a.persistentIndex>b.persistentIndex){return 1;}else{return 0;}}else if((a.persistentSelected===false||a.persistentSelected===undefined)&&(b.persistentSelected===false||b.persistentSelected===undefined)){if(a.text<b.text){return-1;}else if(a.text>b.text){return 1;}else{return 0;}}});};k.prototype._getColumnKeyByTableItem=function(t){var a=this._oTable.indexOfItem(t);if(a<0){return null;}return this._oTable.getBinding("items").getContexts()[a].getObject().columnKey;};k.prototype._getModelItemIndexByColumnKey=function(s){var a=-1;this._getInternalModel().getProperty("/items").some(function(m,b){if(m.columnKey===s){a=b;return true;}});return a;};k.prototype._getSelectedModelItems=function(){return this._getInternalModel().getProperty("/items").filter(function(m){return m.persistentSelected;});};k.prototype._getVisibleTableItems=function(){return this._oTable.getItems().filter(function(t){return t.getVisible();});};k.prototype._getTableItemByColumnKey=function(s){var a=this._oTable.getBinding("items").getContexts();var t=this._oTable.getItems().filter(function(o,b){return a[b].getObject().columnKey===s;});return t[0];};k.prototype._getToolbar=function(){return sap.ui.getCore().byId(this.getId()+"-toolbar")||null;};k.prototype._getSearchField=function(){return sap.ui.getCore().byId(this.getId()+"-searchField")||null;};k.prototype._getSearchText=function(){var s=this._getSearchField();return s?s.getValue():"";};k.prototype._isFilteredBySearchText=function(){return!!this._getSearchText().length;};k.prototype._isFilteredByShowSelected=function(){return this._getInternalModel().getData().showOnlySelectedItems;};k.prototype._updateControlLogic=function(){var b=this._isFilteredBySearchText();var s=this._isFilteredByShowSelected();var v=this._getVisibleTableItems();this._getInternalModel().setProperty("/isMoveUpButtonEnabled",v.indexOf(this._getMarkedTableItem())>0);this._getInternalModel().setProperty("/isMoveDownButtonEnabled",v.indexOf(this._getMarkedTableItem())>-1&&v.indexOf(this._getMarkedTableItem())<v.length-1);var t=sap.ui.getCore().byId(this._oTable.getId()+'-sa');if(t){t.setEnabled(!b&&!s);}};k.prototype._updateModelItemsPersistentIndex=function(m){var p=-1;m.forEach(function(M){M.persistentIndex=-1;if(M.persistentSelected){p++;M.persistentIndex=p;}});};k.prototype._fireSetData=function(){this._bIgnoreUpdateInternalModel=true;this.fireSetData();this._bIgnoreUpdateInternalModel=false;};k.prototype._fireChangeColumnsItems=function(){this._bIgnoreUpdateInternalModel=true;var m=this._getInternalModel().getProperty("/items");var E={newItems:[],existingItems:[],items:m.map(function(M){return{columnKey:M.columnKey,visible:M.persistentSelected,index:M.persistentIndex===-1?undefined:M.persistentIndex,width:M.width,total:M.total};})};m.forEach(function(M){var o=this._getColumnsItemByColumnKey(M.columnKey);if(o){o.setVisible(M.persistentSelected);o.setIndex(M.persistentIndex===-1?undefined:M.persistentIndex);if(M.width!==undefined){o.setWidth(M.width);}if(M.total!==undefined){o.setTotal(M.total);}E.existingItems.push(o);}else{E.newItems.push(new c({columnKey:M.columnKey,visible:M.persistentSelected,index:M.persistentIndex===-1?undefined:M.persistentIndex,width:M.width,total:M.total}));}},this);this.fireChangeColumnsItems(E);this._bIgnoreUpdateInternalModel=false;};k.prototype._getColumnsItemByColumnKey=function(s){var a=this.getColumnsItems().filter(function(o){return o.getColumnKey()===s;});return a[0];};k.prototype._getMarkedTableItem=function(){return this._getTableItemByColumnKey(this._getInternalModel().getProperty("/columnKeyOfMarkedItem"));};k.prototype._setColumnKeyOfMarkedItem=function(s){this._getInternalModel().setProperty("/columnKeyOfMarkedItem",s);};k.prototype._onItemPressed=function(E){this._switchMarkedTableItemTo(E.getParameter('listItem'));this._updateControlLogic();};k.prototype._onSelectionChange=function(E){if(!E.getParameter("selectAll")&&E.getParameter("listItems").length===1){this._switchMarkedTableItemTo(E.getParameter("listItem"));}this._selectTableItem();};k.prototype._selectTableItem=function(){this._updateControlLogic();var m=this._getInternalModel().getProperty("/items");this._updateModelItemsPersistentIndex(m);this._updateCounts(m);this._getInternalModel().setProperty("/items",m);this._fireChangeColumnsItems();this._fireSetData();this._notifyChange();var v=this.getValidationExecutor();if(v){v();}};k.prototype._switchMarkedTableItemTo=function(t){this._removeStyleOfMarkedTableItem();var s=this._getColumnKeyByTableItem(t);if(s){this._setColumnKeyOfMarkedItem(s);t.addStyleClass("sapMP13nColumnsPanelItemSelected");}};k.prototype._removeStyleOfMarkedTableItem=function(){if(this._getMarkedTableItem()){this._getMarkedTableItem().removeStyleClass("sapMP13nColumnsPanelItemSelected");}};k.prototype._filterModelItemsBySearchText=function(){var s=this._getSearchText();s=s.replace(/(^\s+)|(\s+$)/g,'');s=s.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');var r=new RegExp(s,'igm');if(!r){return;}this._getVisibleModelItems().forEach(function(m){m.visible=false;if(typeof m.text==="string"&&m.text.match(r)){m.visible=true;}if(typeof m.tooltip==="string"&&m.tooltip.match(r)){m.visible=true;}});this._getInternalModel().refresh();};k.prototype._updateInternalModel=function(){if(!this._bUpdateInternalModel){return;}this._bUpdateInternalModel=false;this._removeStyleOfMarkedTableItem();var m=this._getInternalModel().getProperty("/items");this._getInternalModel().setProperty("/items",this.getItems().map(function(o){return{columnKey:o.getColumnKey(),visible:true,text:o.getText(),tooltip:o.getTooltip(),persistentIndex:-1,persistentSelected:o.getVisible(),width:undefined,total:undefined};},this));this.getColumnsItems().forEach(function(o){var a=this._getModelItemByColumnKey(o.getColumnKey());if(!a){return;}if(o.getIndex()!==undefined){a.persistentIndex=o.getIndex();}if(o.getVisible()!==undefined){a.persistentSelected=o.getVisible();}if(o.getWidth()!==undefined){a.width=o.getWidth();}if(o.getTotal()!==undefined){a.total=o.getTotal();}},this);this._switchVisibilityOfUnselectedModelItems();this._filterModelItemsBySearchText();var M=this._getInternalModel().getProperty("/items");this._sortModelItemsByPersistentIndex(M);this._updateCounts(M);this._getInternalModel().setProperty("/items",M);this._switchMarkedTableItemTo(this._getMarkedTableItem());if(q(M).not(m).length!==0||q(m).not(M).length!==0){this._bTableItemsChanged=true;}};return k;});

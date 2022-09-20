/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BasePanel","sap/m/Label","sap/m/ColumnListItem","sap/m/HBox","sap/m/VBox","sap/ui/core/library","sap/ui/core/Icon","sap/m/Text","sap/m/Column","sap/m/Table","sap/m/library","sap/m/ToolbarSpacer","sap/m/Button","sap/m/OverflowToolbar","sap/ui/model/Filter","sap/base/util/merge","sap/ui/core/InvisibleText"],function(t,e,o,i,s,n,r,a,l,h,p,u,d,c,_,g,m){"use strict";var y=n.IconColor;var v=p.ListKeyboardMode;var f=p.FlexJustifyContent;var C=p.ListType;var S=t.extend("sap.m.p13n.SelectionPanel",{metadata:{library:"sap.m",properties:{title:{type:"string",defaultValue:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("p13n.DEFAULT_TITLE_SELECTION")},showHeader:{type:"boolean",defaultValue:false},enableCount:{type:"boolean",defaultValue:false},fieldColumn:{type:"string",defaultValue:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("p13n.DEFAULT_DESCRIPTION")},activeColumn:{type:"string",defaultValue:""},itemFactory:{type:"function"}}},renderer:{apiVersion:2}});S.prototype.applySettings=function(){t.prototype.applySettings.apply(this,arguments);this._setTemplate(this._getListTemplate());this.addStyleClass("sapMSelectionPanel");this._aInitializedFields=[];this._bShowFactory=false;this.addStyleClass("SelectionPanelHover");this._displayColumns();this._updateMovement(this.getEnableReorder())};S.prototype.setItemFactory=function(t){this.setProperty("itemFactory",t);this._oListControl.setGrowing(!!t);return this};S.prototype._getListTemplate=function(){return new o({selected:"{"+this.P13N_MODEL+">"+this.PRESENCE_ATTRIBUTE+"}",type:C.Active,cells:[new s({items:[new e({wrapping:true,required:"{"+this.P13N_MODEL+">required}",tooltip:"{"+this.P13N_MODEL+">tooltip}",text:"{"+this.P13N_MODEL+">label}"})]}),new i({justifyContent:f.Center,items:[new r({src:"sap-icon://circle-task-2",size:"0.5rem",color:y.Neutral,visible:{path:this.P13N_MODEL+">active",formatter:function(t){if(t){return true}else{return false}}}}),new m({text:{path:this.P13N_MODEL+">active",formatter:function(t){return t?this._getResourceText("p13n.ACTIVESTATE_ACTIVE"):this._getResourceText("p13n.ACTIVESTATE_INACTIVE")}.bind(this)}})]})]})};S.prototype.setShowHeader=function(t){if(t){var e=this._getResourceText("p13n.SHOW_SELECTED");var o=this._getResourceText("p13n.SHOW_ALL");this._oListControl.setHeaderToolbar(new c({content:[this._getSearchField(),new u,new d({press:function(t){this._bShowSelected=t.getSource().getText()==e;this._filterList(this._bShowSelected,this._sSearch);t.getSource().setText(this._bShowSelected?o:e)}.bind(this),text:e})]}))}this.setProperty("showHeader",t);return this};S.prototype.getSelectedFields=function(){var t=[];this._loopItems(this._oListControl,function(e,o){if(e.getSelected()){t.push(o)}});return t};S.prototype._filterList=function(t,e){var o=[],i=[];if(t){i=new _(this.PRESENCE_ATTRIBUTE,"EQ",true)}if(e){o=new _("label","Contains",e)}this._oListControl.getBinding("items").filter(new _([].concat(i,o),true))};S.prototype._onSearchFieldLiveChange=function(t){this._sSearch=t.getSource().getValue();this._filterList(this._bShowSelected,this._sSearch)};S.prototype._handleActivated=function(t){this._removeMoveButtons();if(this._oHoveredItem&&!this._oHoveredItem.bIsDestroyed&&this._oHoveredItem.getBindingContextPath()){var e=!!this._getP13nModel().getProperty(this._oHoveredItem.getBindingContextPath()).active;var o=this._oHoveredItem.getCells()[1].getItems()[0];o.setVisible(e)}var i=t.getCells()[1].getItems()[0];i.setVisible(false);this._oHoveredItem=t;this._updateEnableOfMoveButtons(t,false);this._addMoveButtons(t)};S.prototype._removeMoveButtons=function(){var t=this._getMoveButtonContainer();if(t){t.removeItem(this._getMoveTopButton());t.removeItem(this._getMoveUpButton());t.removeItem(this._getMoveDownButton());t.removeItem(this._getMoveBottomButton())}};S.prototype._getMoveButtonContainer=function(){if(this._oMoveBottomButton&&this._oMoveBottomButton.getParent()&&this._oMoveBottomButton.getParent().isA("sap.m.FlexBox")){return this._oMoveBottomButton.getParent()}};S.prototype.showFactory=function(t){this._bShowFactory=t;this._displayColumns();if(t){this.removeStyleClass("SelectionPanelHover");this._oListControl.setKeyboardMode(v.Edit);this._addFactoryControl()}else{this.addStyleClass("SelectionPanelHover");this._oListControl.setKeyboardMode(v.Navigation);this._removeFactoryControl()}};S.prototype._loopItems=function(t,e){t.getItems().forEach(function(t){var o=t.getBindingContextPath();var i=this._getP13nModel().getProperty(o).name;e.call(this,t,i)}.bind(this))};S.prototype.setP13nData=function(e){if(this.getEnableCount()){e=g([],e);this._oListControl.removeSelections()}t.prototype.setP13nData.call(this,e);this._updateCount();this._removeMoveButtons();this._oSelectedItem=null;return this};S.prototype._updateCount=function(){this._getP13nModel().setProperty("/selectedItems",this._oListControl.getSelectedContexts(true).length)};S.prototype._selectTableItem=function(e,o){t.prototype._selectTableItem.apply(this,arguments);this._updateCount()};S.prototype._removeFactoryControl=function(){this._oListControl.getItems().forEach(function(t){var e=t.getCells()[0];if(e.getItems().length>1){e.removeItem(e.getItems()[1])}});this.removeStyleClass("sapUiMDCAFLabelMarkingList");return this._aInitializedFields};S.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveButtonContainer().getParent();t.prototype._moveSelectedItem.apply(this,arguments)};S.prototype._getShowFactory=function(){return this._bShowFactory};S.prototype._updateMovement=function(e){t.prototype._updateMovement.apply(this,arguments);this._displayColumns()};S.prototype._displayColumns=function(){var t=[this.getFieldColumn()];var e=this.getEnableReorder()||this.getActiveColumn();if(!this._bShowFactory&&e){t.push(new l({width:"30%",hAlign:"Center",vAlign:"Middle",header:new a({text:this.getActiveColumn()})}))}this._setPanelColumns(t)};S.prototype._setPanelColumns=function(e){this._sText=e[0];var o=this.getEnableCount();if(o){var i=new l({header:new a({text:{parts:[{path:this.P13N_MODEL+">/selectedItems"},{path:this.P13N_MODEL+">/items"}],formatter:function(t,e){return this._sText+" "+this._getResourceText("p13n.HEADER_COUNT",[t,e instanceof Array?e.length:0])}.bind(this)}})});e[0]=i}t.prototype._setPanelColumns.apply(this,arguments)};S.prototype._addFactoryControl=function(t){this._oListControl.getItems().forEach(function(t){var e=t.getBindingContext(this.P13N_MODEL);var o=this.getItemFactory().call(this,e);var i=t.getCells()[0];var s=i.getItems()[0];if(s){s.setLabelFor(o)}i.addItem(o)}.bind(this));this.addStyleClass("sapUiMDCAFLabelMarkingList")};S.prototype._createInnerListControl=function(){return new h(this.getId()+"-innerSelectionPanelTable",Object.assign({growing:false,growingThreshold:25,growingScrollToLoad:true,updateStarted:function(){this._removeMoveButtons();this._removeFactoryControl()}.bind(this),updateFinished:function(){if(this._getShowFactory()){this._addFactoryControl()}}.bind(this)},this._getListControlConfig()))};S.prototype.filterContent=function(t){if(this._oListControl.getBinding("items")){this._oListControl.getBinding("items").filter(t,true)}};S.prototype._addMoveButtons=function(t){var e=t;if(!e){return}var o=this._getP13nModel().getProperty(e.getBindingContextPath())[this.PRESENCE_ATTRIBUTE];if(o){e.getCells()[1].addItem(this._getMoveTopButton());e.getCells()[1].addItem(this._getMoveUpButton());e.getCells()[1].addItem(this._getMoveDownButton());e.getCells()[1].addItem(this._getMoveBottomButton())}};S.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._aInitializedFields=null;this._oHoveredItem=null;this._bShowFactory=null;this._sSearch=null;this._bShowSelected=null};return S});
//# sourceMappingURL=SelectionPanel.js.map
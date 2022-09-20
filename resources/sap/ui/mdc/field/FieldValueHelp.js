/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/FieldHelpBase","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/enum/OutParameterMode","sap/ui/mdc/enum/ConditionValidated","sap/ui/mdc/condition/FilterConverter","sap/ui/base/ManagedObjectObserver","sap/ui/base/SyncPromise","sap/base/util/ObjectPath","sap/base/util/deepEqual","sap/base/util/merge","sap/ui/model/resource/ResourceModel","sap/ui/model/Context","sap/ui/Device","sap/m/library","sap/ui/core/library","sap/ui/mdc/util/loadModules","sap/ui/events/KeyCodes"],function(e,t,i,a,r,n,s,l,o,h,u,d,f,g,c,p,v,_){"use strict";var m;var b;var y;var C;var F;var P;var O;var S;var I;var D=c.ButtonType;var A=p.OpenState;var B=e.extend("sap.ui.mdc.field.FieldValueHelp",{metadata:{library:"sap.ui.mdc",properties:{delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/field/FieldValueHelpDelegate"}},filterFields:{type:"string",defaultValue:""},keyPath:{type:"string",defaultValue:""},descriptionPath:{type:"string",defaultValue:""},showConditionPanel:{type:"boolean",defaultValue:false},title:{type:"string",group:"Appearance",defaultValue:""},noDialog:{type:"boolean",group:"Appearance",defaultValue:false},caseSensitive:{type:"boolean",defaultValue:true},_enableOK:{type:"boolean",group:"Appearance",defaultValue:true,visibility:"hidden"}},aggregations:{content:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},suggestContent:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},dialogContent:{type:"sap.ui.mdc.field.FieldValueHelpContentWrapperBase",multiple:false},filterBar:{type:"sap.ui.mdc.filterbar.FilterBarBase",multiple:false},inParameters:{type:"sap.ui.mdc.field.InParameter",group:"Data",multiple:true},outParameters:{type:"sap.ui.mdc.field.OutParameter",group:"Data",multiple:true},_dialog:{type:"sap.m.Dialog",multiple:false,visibility:"hidden"},_filterBar:{type:"sap.ui.mdc.filterbar.FilterBarBase",multiple:false,visibility:"hidden"},collectiveSearchItems:{type:"sap.ui.core.Item",multiple:true,singularName:"collectiveSearchItem"}},defaultAggregation:"content",events:{dataRequested:{}}}});B._init=function(){e._init.apply(this,arguments);m=undefined;b=undefined;y=undefined;C=undefined;F=undefined};B.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver=new s(V.bind(this));this._oObserver.observe(this,{properties:["filterValue","conditions","showConditionPanel","filterFields"],aggregations:["content","suggestContent","dialogContent","filterBar","_filterBar","inParameters","collectiveSearchItems"]});this.setBindingContext(null);this._oConditions={}};B.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._oManagedObjectModel){this._oManagedObjectModel.destroy();delete this._oManagedObjectModel}this._oObserver.disconnect();this._oObserver=undefined;delete this._oConditions;if(this._iUpdateTimer){clearTimeout(this._iUpdateTimer);this._iUpdateTimer=null}if(this._iFilterTimer){clearTimeout(this._iFilterTimer);this._iFilterTimer=null}if(this._iSearchFieldTimer){clearTimeout(this._iSearchFieldTimer);this._iSearchFieldTimer=null}if(this._oCollectiveSearchSelect){this._oCollectiveSearchSelect.destroy();delete this._oCollectiveSearchSelect}if(this._oResourceBundleM){this._oResourceBundleM=null}if(this._oResourceBundle){this._oResourceBundle=null}};B.prototype.invalidate=function(t){if(t){var i=Be.call(this,true);var a=Be.call(this,false);var r=this.getAggregation("_dialog");if(i&&t===i||a&&t===a){var n=this.getAggregation("_popover");if(r&&r.isOpen()){var s=r.getContent()[0];s.invalidate(t)}else if(n&&n.isOpen()){n.invalidate(t)}return}var l=this._getFilterBar();if(r&&t===r||l&&t===l){if(t.bOutput&&!this._bIsBeingDestroyed){var o=this.getParent();if(o){o.invalidate(this)}}return}}e.prototype.invalidate.apply(this,arguments)};B.prototype.connect=function(t){e.prototype.connect.apply(this,arguments);Oe.call(this);pe.call(this,this.getShowConditionPanel());return this};B.prototype.getIcon=function(){if(this.getNoDialog()){return"sap-icon://slim-arrow-down"}else{return"sap-icon://value-help"}};B.prototype._createPopover=function(){var t=e.prototype._createPopover.apply(this,arguments);var i=function(e){this.fireSwitchToValueHelp()}.bind(this);if(t){t.addDelegate({onsapshow:i});var a=Be.call(this,true);if(a){l.resolve(a.initialize(true)).then(function(){if(a.enableShowAllItems()){v(["sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer"]).then(function(e){var r=e[0];var n=e[1];var s=e[2];var l=Se.apply(this);var o=new r(this.getId()+"-showAllItems",{text:l.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:i});var h=[new s(this.getId()+"-Spacer")].concat(o);var u=new n(this.getId()+"-TB",{content:h,visible:!a.getAllItemsShown()}).setModel(this._oFooterModel,"$config");t.setFooter(u)}.bind(this))}}.bind(this))}t._getAllContent=function(){var e=this.getParent();var t=[];if(e){var i=Pe.call(e);if(i){t.push(i)}}return t};if(this._bNavigate){this.navigate(this._iStep)}}return t};B.prototype._handleAfterOpen=function(t){e.prototype._handleAfterOpen.apply(this,arguments);var i=Be.call(this,true);if(i){i.fieldHelpOpen(true)}};B.prototype.open=function(t){if(this.getNoDialog()&&!t){t=true}Oe.call(this);if(this._bOpenAfterPromise){this._bSuggestion=t;return}var i=Be.call(this,t);var a=function(){if(this._bOpenAfterPromise){delete this._bOpenAfterPromise;this.open(this._bSuggestion);delete this._bSuggestion}}.bind(this);var r=this._bOpen?this._callContentRequest(!!t,a):this._fireOpen(!!t,a);delete this._bOpen;if(!r){this._bSuggestion=t;if(t){this._getPopover()}else{ue.call(this)}this._bOpenAfterPromise=true;return}this._bOpenHandled=true;i=Be.call(this,t);if(i&&i.getFilterEnabled()&&!this._bNavigateRunning){this._bApplyFilter=false;if(!i.isSuspended()||t||this.getFilterValue()){this._bApplyFilter=true}me.call(this)}if(this._bUpdateFilterAfterClose){this._bUpdateFilterAfterClose=false;j.call(this,this.getFilterValue())}if(t){if(!i){this._bOpenIfContent=true}else{i.fieldHelpOpen(t);if(!this.getFilterValue()&&!this._bNavigateRunning){ie.call(this,true)}e.prototype.open.apply(this,[t])}}else{var n=this.getAggregation("_popover");if(n){if(n.isOpen()){this.close();this._bSwitchToDialog=true}n.$().remove()}var s=ue.call(this);if(s){Fe.call(this);Ae.call(this,true);_e.call(this);s.setFieldGroupIds(this._oField.getFieldGroupIds());var l=s.getContent()[0];l.setShowTokenizer(this.getMaxConditions()!==1&&!!i);l.setFormatOptions(this._getFormatOptions());l.bindProperty("conditions",{path:"$help>/conditions"});if(i){i.fieldHelpOpen(false);K.call(this)}this._aOldConditions=this.getConditions();s.open();this._bDialogOpen=true}else{this._bOpen=true}}this._bOpenHandled=false;return};B.prototype.toggleOpen=function(t){if(this.getNoDialog()&&!t){t=true}if(t){e.prototype.toggleOpen.apply(this,[t])}else if(this._bOpen||this._bOpenIfContent||this._bOpenAfterPromise){delete this._bOpen;delete this._bSuggestion;delete this._bOpenIfContent;delete this._bOpenAfterPromise}else{var i=ue.call(this);if(i){if(i.isOpen()){var a=i.oPopup.getOpenState();if(a!=="CLOSED"&&a!=="CLOSING"){this.close()}else{this._bReopen=true}}else{this.open(t)}}else{this.open(t)}}};B.prototype.close=function(){if(!this._bDialogOpen){e.prototype.close.apply(this,arguments)}else{var t=this.getAggregation("_dialog");if(t){this._bClosing=true;t.close();var i=t.getContent()[0];i.unbindProperty("conditions",true);if(i._oDefineConditionPanel){i._oDefineConditionPanel.cleanUp()}}this._bReopen=false;this._bSwitchToDialog=false;delete this._bOpen;delete this._bOpenAfterPromise}};B.prototype.isOpen=function(t){var i=e.prototype.isOpen.apply(this,arguments);if(!i&&(!t||!this._bClosing)){var a=this.getAggregation("_dialog");if(a){i=a.isOpen()}}return i};B.prototype.getDomRef=function(){if(!this._bDialogOpen){return e.prototype.getDomRef.apply(this,arguments)}else{var t=this.getAggregation("_dialog");if(t){return t.getDomRef()}}};function T(){var e=this._getFilterBar();var t;if(e){t=e.getInternalConditions()}else{t=this._oConditions}var i=false;for(var a in t){if(t[a].length>0){Ce.call(this,a);i=true}}if(i){ie.call(this,true)}}B.prototype._handleAfterClose=function(t){var i=this.getAggregation("_dialog");var a=!i||t.getSource()!==i;var r=Be.call(this,a);if(r){if(!r.getAsyncKeyText()){T.call(this)}r.fieldHelpClose()}if(!this.isOpen()){this._bApplyFilter=false}this._bNavigateRunning=false;e.prototype._handleAfterClose.apply(this,arguments)};function V(e){if(e.object==this){var t;if(e.name==="content"){he.call(this,e.mutation,e.child,e.name)}if(e.name==="suggestContent"){he.call(this,e.mutation,e.child,e.name)}if(e.name==="dialogContent"){he.call(this,e.mutation,e.child,e.name)}if(e.name==="filterBar"){if(e.mutation==="insert"&&this.getAggregation("_filterBar")){this.destroyAggregation("_filterBar");delete this._oSearchField}ve.call(this,e.mutation,e.child,false)}if(e.name==="_filterBar"){ve.call(this,e.mutation,e.child,true)}if(e.name==="conditions"){q.call(this,e.current)}if(e.name==="filterValue"){if(this._bClosing){this._bUpdateFilterAfterClose=true}else{j.call(this,e.current)}}if(e.name==="showConditionPanel"){pe.call(this,e.current)}if(e.name==="filterFields"){t=this.getAggregation("_dialog");if(t){if(t.isOpen()){if(e.current){Fe.call(this)}else if(this.getAggregation("_filterBar")){this.destroyAggregation("_filterBar")}}}}if(e.name==="inParameters"){$.call(this,e.child,e.mutation)}if(e.name==="collectiveSearchItems"){Ae.call(this,false)}}else if(e.object.isA("sap.ui.mdc.field.InParameter")){if(e.name==="value"){W.call(this,e.object.getHelpPath(),e.current,e.old,e.object.getUseConditions(),e.object.getInitialValueFilterEmpty())}if(e.name==="helpPath"){G.call(this,e.current,e.old,e.object.getValue(),e.object.getUseConditions(),e.object.getInitialValueFilterEmpty())}}}B.prototype.openByTyping=function(){if(!this._bDetermineSearchSupportedCalled&&!this.isOpen()&&!this._bOpen&&!this._bOpenIfContent&&!this._bOpenAfterPromise){if(!this.bDelegateInitialized&&!this.bDelegateLoading){this.initControlDelegate()}if(this.bDelegateInitialized){return M.call(this)}else{this._bDetermineSearchSupportedCalled=true;return this.awaitControlDelegate().then(function(){return M.call(this)}.bind(this))}}return!!this.getFilterFields()};function M(){this.fireOpen({suggestion:true});this._bDetermineSearchSupportedCalled=true;var e=this.getControlDelegate().determineSearchSupported(this.getPayload(),this);if(e instanceof Promise){return e.then(function(){return!!this.getFilterFields()}.bind(this))}else{return!!this.getFilterFields()}}B.prototype.isFocusInHelp=function(){if(!this.getNoDialog()){var e=this.getAggregation("_dialog");if(e&&e.isOpen()||this._bDialogRequested&&this._bOpen||this._bOpenAfterPromise&&!this._bSuggestion){return true}}if(this._bFocusPopover){return true}return false};B.prototype.removeFocus=function(){var e=Be.call(this,true);if(e){e.removeFocus()}};B.prototype.navigate=function(e){var t=Be.call(this,true);var i=this.getAggregation("_popover");Oe.call(this);if(!i||!i.isOpen()){var a=function(){this.navigate(e)}.bind(this);var r=this._bNavigate?this._callContentRequest(true,a):this._fireOpen(true,a);if(!r){t=Be.call(this,true);this._bNavigate=false;this._iStep=null;if(t){this._getPopover()}return}}this._bNavigate=false;this._iStep=null;t=Be.call(this,true);if(t){i=this._getPopover();this._bApplyFilter=true;this._bNavigateRunning=true;me.call(this);ie.call(this,true)}if(!i){this._bNavigate=true;this._iStep=e;return}if(t){t.navigate(e,i.isOpen())}};function x(e){var t=this._getPopover();var i=e.getParameter("disableFocus");var a=e.getParameter("key");var r=e.getParameter("description");var n=e.getParameter("inParameters");var s=e.getParameter("outParameters");var l=e.getParameter("leave");var o=e.getParameter("itemId");var h;if(l){this.fireNavigate({key:undefined,value:undefined,condition:undefined,itemId:undefined,leaveFocus:l});return}if(a===undefined&&!i){this._bFocusPopover=true}if(!t.isOpen()){this._bOpenHandled=true;this.open(true);this._bOpenHandled=false}this._bNavigateRunning=false;if(a===undefined){this._bFocusPopover=false;return}if(n){n=X.call(this,n)}if(s){s=J.call(this,s)}h=this._createCondition(a,r,n,s);this.setProperty("conditions",[h],true);this.fireNavigate({value:r,key:a,condition:h,itemId:o,leaveFocus:l})}B.prototype._getTextOrKey=function(e,t,i,a,r,n,s,o,h,u,d){var g="";var c=Be.call(this,true);if(c){var p=c.getListBinding();if(!p){this.fireDataRequested()}if(i&&!i.getModel()){return null}d=d||this.getCaseSensitive();var v=this.oBindingContexts[undefined];var _=this.getInParameters();var m=false;if(i&&f.hasChanged(v,i)){m=true}var b=w.call(this,_,m,i,v,s,o);g=l.resolve().then(function(){return H.call(this,b)}.bind(this)).then(function(){return l.resolve().then(function(){if(i&&!i.getModel()){return null}else if(u){return c.getKeyAndText(h,e,te.call(this,a,_,false,b,i,true),te.call(this,r,this.getOutParameters(),true,undefined,undefined,true),d)}else if(t){return c.getTextForKey(e,te.call(this,a,_,false,b,i,true),te.call(this,r,this.getOutParameters(),true,undefined,undefined,true),n,d)}else{return c.getKeyForText(e,te.call(this,undefined,_,false,b,i,true),n,d)}}.bind(this)).then(function(e){R.call(this,b,m);return E.call(this,e)}.bind(this)).unwrap()}.bind(this)).unwrap()}return g};function w(e,t,i,a,r,n){var s=[];for(var l=0;l<e.length;l++){var o=e[l];var u=o.getBinding("value");if(o.getUseConditions()&&r){var d=this.getModel(n);if(d!==r){s.push(r.bindProperty("/"+o.getFieldPath()))}}else if(u){var f=u.getPath();var g=u.getContext();if(t&&u.isRelative()&&(g===a||!g&&a)){if(i.getProperty(f)===undefined){var c=u.getModel();s.push(c.bindProperty(f,i))}}else if(!g&&u.isRelative()||g&&g.getProperty(f)===undefined||u.getValue()===undefined||g&&!h(o.validateProperty("value",g.getProperty(f)),o.getValue())){s.push(u)}}}return s}function R(e,t){if(!t){return}for(var i=0;i<e.length;i++){e[i].destroy()}}function H(e){if(e.length===0){return null}if(!this.bDelegateInitialized&&!this.bDelegateLoading){this.initControlDelegate()}if(this.bDelegateInitialized){return this.getControlDelegate().checkBindingsPending(this.getPayload(),e)}else{return this.awaitControlDelegate().then(function(){return this.getControlDelegate().checkBindingsPending(this.getPayload(),e)}.bind(this))}}function E(e){if(e&&typeof e==="object"){e=u({},e);if(e.inParameters){e.inParameters=X.call(this,e.inParameters)}if(e.outParameters){e.outParameters=J.call(this,e.outParameters)}}return e}B.prototype._isTextOrKeyRequestSupported=function(){var e=Be.call(this,true);return!!e};B.prototype.isUsableForValidation=function(){var e=Be.call(this,true);return!!e};function N(e){var t=e.getParameter("selectedItems");var i=e.getParameter("itemPress");var a;var n=this.getConditions();var s;var l=0;var o=0;var u=false;var d=this.getMaxConditions();var f=this._getOperator();for(l=n.length-1;l>=0;l--){s=n[l];s.inParameters=Z.call(this,s.inParameters);s.outParameters=ee.call(this,s.outParameters);if(s.operator===f.name&&s.validated===r.Validated){u=false;for(o=0;o<t.length;o++){a=t[o];if(s.values[0]===a.key&&(!s.inParameters||!a.inParameters||h(s.inParameters,a.inParameters))&&(!s.outParameters||!a.outParameters||h(s.outParameters,a.outParameters))){u=true;if(s.values[1]!==a.description&&a.description){if(s.values.length===1){s.values.push(a.description)}else{s.values[1]=a.description}}break}}if(!u){n.splice(l,1)}}}for(l=0;l<t.length;l++){a=t[l];u=false;for(o=0;o<n.length;o++){s=n[o];if(s.operator===f.name&&s.validated===r.Validated&&s.values[0]===a.key&&(!s.inParameters||h(s.inParameters,a.inParameters))&&(!s.outParameters||h(s.outParameters,a.outParameters))){u=true;s.inParameters=a.inParameters;s.outParameters=a.outParameters;break}}if(!u){s=this._createCondition(a.key,a.description,a.inParameters,a.outParameters);n.push(s)}}if(d>0&&n.length>d){n.splice(0,n.length-d)}for(l=0;l<n.length;l++){s=n[l];if(s.inParameters){s.inParameters=X.call(this,s.inParameters)}else{delete s.inParameters}if(s.outParameters){s.outParameters=J.call(this,s.outParameters)}else{delete s.outParameters}}if(this._bDialogOpen){this.setProperty("conditions",n,true)}else{var g=false;var c=false;if(this.getMaxConditions()===1||i){this.close();c=true}if(this.getMaxConditions()===1){g=true}this.setProperty("conditions",n,true);this.fireSelect({conditions:n,add:g,close:c})}}function U(e){var t=e.getParameter("contentChange");var i=e.getSource();var a;if(i.enableShowAllItems()){a=this.getAggregation("_popover");var r=a&&a.getFooter();if(r){r.setVisible(!i.getAllItemsShown())}}if(t){a=a||this.getAggregation("_popover");var n=this.getAggregation("_dialog");if(a&&this._bOpenIfContent){i=Be.call(this,true);if(i){var s=this._getField();if(s){i.fieldHelpOpen(true);a.openBy(this._getControlForSuggestion());ie.call(this)}this._bOpenIfContent=false}}else if(n){i=Be.call(this,false);if(i){var l=n.getContent()[0];oe.call(this,l,i.getDialogContent());if(!this._bApplyFilter&&!this._bClosing&&(this.isOpen()||this._bOpen)&&!i.isSuspended()){this._bApplyFilter=true}}}}if(!i||!i.getAsyncKeyText()){this.fireDataUpdate()}}function q(e){var t=false;for(var a=0;a<e.length;a++){var r=e[a];if(!r.validated){i.checkConditionValidated(r);t=true}}if(t){this.setConditions(e)}else{K.call(this)}}function K(){if(!this._oField){return}k.call(this,Be.call(this,true));k.call(this,Be.call(this,false))}function k(e){if(e){var t=this._getOperator();var i=this.getConditions();var a=[];for(var n=0;n<i.length;n++){var s=i[n];if(s.operator===t.name&&s.validated===r.Validated){a.push({key:s.values[0],description:s.values[1],inParameters:Z.call(this,s.inParameters),outParameters:ee.call(this,s.outParameters)})}}if(!h(a,e.getSelectedItems())){e.setSelectedItems(a)}}}function j(e){var i=this.getFilterFields();if(!i){return}var a=be.call(this,i);var n=a.length>0?a[0].values[0]:"";if(e===n){return}Ce.call(this,i);e=e.trim();if(e){this._bOwnFilterChange=false;var s=t.createCondition("StartsWith",[e],undefined,undefined,r.NotValidated);ye.call(this,i,s)}ie.call(this,true)}function $(e,t){var i=e.getHelpPath();var a=false;if(t==="remove"){this._oObserver.unobserve(e);if(this._getField()&&this.isOpen()){a=z.call(this,i)}}else{this._oObserver.observe(e,{properties:true});if(this._getField()&&this.isOpen()){var r=e.getValue();var n=e.getUseConditions();var s=e.getInitialValueFilterEmpty();a=z.call(this,i);a=L.call(this,i,r,n,s)||a;K.call(this)}}ie.call(this,true)}function L(e,i,a,n){var s;var l=false;if(e&&(i||n&&!a)){if(a){if(Array.isArray(i)){for(var o=0;o<i.length;o++){s=u({},i[o]);if(s.inParameters){s.inParameters=Z.call(this,s.inParameters,true)}if(s.outParameters){s.outParameters=ee.call(this,s.outParameters,false,true)}ye.call(this,e,s);l=true}}}else{if(!i&&n){s=t.createCondition("Empty",[]);s.isEmpty=false}else{s=t.createItemCondition(i);s.validated=r.Validated}ye.call(this,e,s);l=true}}return l}function z(e){var t=false;if(e&&be.call(this,e).length>0){Ce.call(this,e);t=true}return t}function W(e,t,i,a,r){if(this._bNoInOutFilterUpdate){return}if(!this._iUpdateTimer){this._iUpdateTimer=setTimeout(function(){this._iUpdateTimer=undefined;this.fireDataUpdate()}.bind(this),0)}if(!this._getField()||!this.isOpen()){return}var n=false;n=z.call(this,e);n=L.call(this,e,t,a,r)||n;K.call(this);ie.call(this,true)}function G(e,t,i,a,r){if(!this._getField()||!this.isOpen()){return}var n=false;n=z.call(this,t);n=L.call(this,e,i,a,r)||n;ie.call(this,true)}function Q(){var e=this.getInParameters();var t=false;for(var i=0;i<e.length;i++){var a=e[i];var r=a.getHelpPath();var n=a.getValue();var s=a.getUseConditions();var l=a.getInitialValueFilterEmpty();t=z.call(this,r)||t;t=L.call(this,r,n,s,l)||t}if(t||this._bApplyFilter&&this._bPendingFilterUpdate){this._bPendingFilterUpdate=false;ie.call(this,true)}}B.prototype.onFieldChange=function(){var e=this.getOutParameters();Oe.call(this);var n=w.call(this,e,false);l.resolve().then(function(){return H.call(this,n)}.bind(this)).then(function(){if(this.bIsDestroyed){return}var n=this.getConditions();for(var s=0;s<n.length;s++){var l=n[s];if(l.outParameters){for(var o in l.outParameters){for(var h=0;h<e.length;h++){var u=e[h];var d=u.getValue();var f=u.getUseConditions();var g=true;if(u.getMode()===a.WhenEmpty){if(f){g=!d||Array.isArray(d)&&d.length===0}else{g=!d}}if(g){if(f){var c;if(!u.getHelpPath()){c=t.createCondition("EQ",[u.getFixedValue()],undefined,undefined,r.NotValidated)}else if(u.getFieldPath()===o){c=t.createCondition("EQ",[l.outParameters[o]],undefined,undefined,r.Validated)}else{continue}if(!d){d=[]}if(!Array.isArray(d)){throw new Error("Value on OutParameter must be an array "+u)}if(i.indexOfCondition(c,d)<0){c.validated=r.Validated;d.push(c);u.setValue(d)}}else if(!u.getHelpPath()){u.setValue(u.getFixedValue())}else if(u.getFieldPath()===o){u.setValue(l.outParameters[o])}}}}}}}.bind(this)).unwrap()};function X(e){return Y.call(this,e,this.getInParameters())}function J(e){return Y.call(this,e,this.getOutParameters())}function Y(e,t){if(!e||t.length===0){return null}var i={};for(var a=0;a<t.length;a++){var r=t[a];var n=r.getHelpPath();var s=r.getFieldPath();if(n&&s){for(var l in e){if(n===l){i[s]=e[l];break}}}else if(!n&&s&&r.getFixedValue){i[s]=r.getFixedValue()}}return i}function Z(e,t){return te.call(this,e,this.getInParameters(),false,undefined,undefined,false,t)}function ee(e,t,i){return te.call(this,e,this.getOutParameters(),t,undefined,undefined,false,i)}function te(e,i,a,s,l,o,h){var d;var f;var g;var c;var p=0;var v;if(i.length>0){if(!e){if(!a){var _=this.getBindingContext();for(p=0;p<i.length;p++){f=i[p];g=h?"conditions/"+f.getHelpPath():f.getHelpPath();var m=f.getValue();var b=f.getUseConditions();var y=f.getInitialValueFilterEmpty();var C=0;if(s||l){var F=f.getBinding("value");var P=false;if(F||b){c=f.getFieldPath();for(C=0;C<s.length;C++){if(F&&F.getPath()===s[C].getPath()||b&&s[C].getPath()==="/"+c){m=s[C].getValue();P=true;break}}if(!P&&!b&&l&&F&&F.isRelative()&&(!F.getContext()||F.getContext()!==l&&F.getContext()===_)){m=l.getProperty(F.getPath())}}}if(g){if(!d){d={}}if(o){d[g]=[];if(b){if(!m){m=[]}for(C=0;C<m.length;C++){v=u({},m[C]);if(v.inParameters){v.inParameters=Z.call(this,v.inParameters,true)}if(v.outParameters){v.outParameters=ee.call(this,v.outParameters,false,true)}d[g].push(v)}}else{if(!m&&y){v=t.createCondition("Empty",[]);v.isEmpty=false}else if(m){v=t.createItemCondition(m);v.validated=r.Validated}if(v){d[g].push(v)}}v=undefined}else{if(b){if(m&&m.length>0){d[g]=m[0].values[0]}}else{d[g]=m}}}}}}else{for(var O in e){for(p=0;p<i.length;p++){f=i[p];g=h?"conditions/"+f.getHelpPath():f.getHelpPath();c=f.getFieldPath();if(c&&(c===O||c==="conditions/"+O)&&g){if(!d){d={}}if(o){d[g]=[];v=t.createItemCondition(e[O]);v.validated=r.Validated;d[g].push(v)}else{d[g]=e[O]}}}}}if(o){var S=this._getTypesForConditions(d);var I=n.createFilters(d,S);d=I}}return d}function ie(e){if(e){if(!this._iFilterTimer){this._iFilterTimer=setTimeout(function(){this._iFilterTimer=undefined;ie.call(this)}.bind(this),0)}return}else if(this._iFilterTimer){clearTimeout(this._iFilterTimer);this._iFilterTimer=undefined}if(!this.isOpen()&&!this._bNavigateRunning&&!this._bOpen||this._bClosing&&!this._bSwitchToDialog||!this._bApplyFilter){this._bPendingFilterUpdate=true;return}if(this._bFilterWaitingForBinding){return}var t=this.getInParameters();var i=w.call(this,t,false);var a=H.call(this,i);if(a instanceof Promise){a.then(function(){this._bFilterWaitingForBinding=false;ie.call(this,true)}.bind(this));this._bFilterWaitingForBinding=true;return}var r=this.getAggregation("_dialog");var s=(!r||!r.isOpen())&&!(this._bClosing&&this._bSwitchToDialog);var l=Be.call(this,s);if(l){var o=this._getFilterBar();var h;if(o){h=o.getInternalConditions()}else{h=this._oConditions}var u=this._getTypesForConditions(h);var d=n.createFilters(h,u,undefined,this.getCaseSensitive());var f=[];var g=h["$search"];var c;if(d){f.push(d)}if(g&&g.length>0){c=g[0].values[0]}l.applyFilters(f,c,o)}}B.prototype._getTypesForConditions=function(e){var t=this.getFilterBar();var i=this.getInParameters();var a;var r;if(t){a=n.createConditionTypesMapFromFilterBar(e,t)}else{a={};for(r in e){a[r]={type:null}}}for(r in a){if(!a[r].type){for(var s=0;s<i.length;s++){var l=i[s];if(l.getHelpPath()===r){a[r].type=l.getDataType();break}}}}return a};B.prototype.getMaxConditions=function(){if(this._oField&&this._oField.getMaxConditionsForHelp){return this._oField.getMaxConditionsForHelp()}else if(this._oField&&this._oField.getMaxConditions){return this._oField.getMaxConditions()}else{return 1}};B.prototype.getDisplay=function(){if(this._oField&&this._oField.getDisplay){return this._oField.getDisplay()}};B.prototype.getRequired=function(){if(this._oField&&this._oField.getRequired){return this._oField.getRequired()}else{return false}};B.prototype.getDataType=function(){if(this._oField.getDataType){return this._oField.getDataType()}else{return"sap.ui.model.type.String"}};B.prototype._getFormatOptions=function(){if(this._oField&&this._oField._getFormatOptions){return this._oField._getFormatOptions()}else{return{}}};B.prototype._getKeyPath=function(){var e=this.getKeyPath();if(!e&&this._oField&&this._oField.getFieldPath&&this._oField.getFieldPath()){e=this._oField.getFieldPath()}return e};B.prototype._getFilterBar=function(){var e=this.getFilterBar();if(!e){e=this.getAggregation("_filterBar")}return e};B.prototype.clone=function(t,i){var a=[this.getContent(),this.getSuggestContent(),this.getDialogContent()];var r=this.getFilterBar();var n=0;var s;for(n=0;n<a.length;n++){s=a[n];if(s){s.detachEvent("navigate",x,this);s.detachEvent("selectionChange",N,this);s.detachEvent("dataUpdate",U,this)}}if(r){r.detachEvent("search",_e,this)}var l=e.prototype.clone.apply(this,arguments);for(n=0;n<a.length;n++){s=a[n];if(s){s.attachEvent("navigate",x,this);s.attachEvent("selectionChange",N,this);s.attachEvent("dataUpdate",U,this)}}if(r){r.attachEvent("search",_e,this)}return l};function ae(){var e;if((!m||!b||!y||!C||!F||!P||!O||!S||!I)&&!this._bDialogRequested){m=sap.ui.require("sap/m/Dialog");b=sap.ui.require("sap/m/Button");y=sap.ui.require("sap/ui/mdc/field/ValueHelpPanel");C=sap.ui.require("sap/ui/mdc/field/DefineConditionPanel");F=sap.ui.require("sap/ui/model/base/ManagedObjectModel");P=sap.ui.require("sap/ui/mdc/filterbar/vh/FilterBar");O=sap.ui.require("sap/ui/mdc/FilterField");S=sap.ui.require("sap/ui/mdc/filterbar/vh/CollectiveSearchSelect");I=sap.ui.require("sap/ui/core/Item");if(!m||!b||!y||!C||!F||!P||!O||!S||!I){sap.ui.require(["sap/m/Dialog","sap/m/Button","sap/ui/mdc/field/ValueHelpPanel","sap/ui/mdc/field/DefineConditionPanel","sap/ui/model/base/ManagedObjectModel","sap/ui/mdc/filterbar/vh/FilterBar","sap/ui/mdc/FilterField","sap/ui/mdc/filterbar/vh/CollectiveSearchSelect","sap/ui/core/Item"],se.bind(this));this._bDialogRequested=true}}if(m&&b&&y&&C&&F&&P&&O&&S&&I&&!this._bDialogRequested){if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")}var t=new b(this.getId()+"-ok",{text:this._oResourceBundle.getText("valuehelp.OK"),enabled:"{$help>/_enableOK}",type:D.Emphasized,press:de.bind(this)});var i=new b(this.getId()+"-cancel",{text:this._oResourceBundle.getText("valuehelp.CANCEL"),press:fe.bind(this)});this._oManagedObjectModel=new F(this);var a=le.call(this);e=new m(this.getId()+"-dialog",{contentHeight:re(),contentWidth:ne(),horizontalScrolling:false,verticalScrolling:false,title:"{$help>/title}",stretch:g.system.phone,resizable:true,draggable:true,content:[a],afterOpen:ge.bind(this),afterClose:ce.bind(this),buttons:[t,i]}).setModel(this._oManagedObjectModel,"$help");e.isPopupAdaptationAllowed=function(){return false};e.addStyleClass("sapMdcValueHelpTitle");this.setAggregation("_dialog",e,true);this.setModel(new d({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");pe.call(this,this.getShowConditionPanel())}return e}function re(){if(g.system.desktop){return"700px"}if(g.system.tablet){return g.orientation.landscape?"600px":"600px"}}function ne(){if(g.system.desktop){return"1080px"}if(g.system.tablet){return g.orientation.landscape?"920px":"600px"}}function se(e,t,i,a,r,n,s,l,o){m=e;b=t;y=i;C=a;F=r;P=n;O=s;S=l;I=o;this._bDialogRequested=false;if(!this._bIsBeingDestroyed){ae.call(this);if(this._bOpen){this.open()}}}function le(){var e=Be.call(this,false);var t=this._getFilterBar();var i=new y(this.getId()+"-VHP",{height:"100%",showFilterbar:!!t,formatOptions:this._getFormatOptions(),inputOK:"{$help>/_enableOK}"});i.setModel(this._oManagedObjectModel,"$help");if(e){e.initialize(false);oe.call(this,i,e.getDialogContent())}if(t){i.setFilterbar(t)}return i}function oe(e,t){e.setTable(t)}function he(e,t,i){var a=this.getAggregation("_popover");var r=this.getAggregation("_dialog");if(e==="remove"){t.detachEvent("navigate",x,this);t.detachEvent("selectionChange",N,this);t.detachEvent("dataUpdate",U,this);t=undefined}else{t.attachEvent("navigate",x,this);t.attachEvent("selectionChange",N,this);t.attachEvent("dataUpdate",U,this);K.call(this)}this.fireDataUpdate();if(this._bNavigate){this.navigate(this._iStep)}else if(a){a.invalidate();var n=this.getFilterValue();if(n){j.call(this,n)}Q.call(this);if(t&&this._bOpenIfContent){t.initialize(true);var s=this._getField();if(s){t.fieldHelpOpen(true);a.openBy(this._getControlForSuggestion())}this._bOpenIfContent=false}}else if(t&&this._bOpenIfContent){this._bOpenIfContent=false;this.open(true)}if(r&&i!=="suggestContent"&&!(i==="content"&&this.getDialogContent())){if(t){t.initialize(false);var l=r.getContent()[0];l.setShowTokenizer(this.getMaxConditions()!==1);oe.call(this,l,t.getDialogContent());if(r.isOpen()||this._bOpen){t.fieldHelpOpen(false)}}}}function ue(){var e=this.getAggregation("_dialog");if(!e){e=ae.call(this)}return e}function de(e){this.close();var a=this.getConditions();a=t._removeEmptyConditions(a);a=t._removeInitialFlags(a);i.updateConditionsValues(a);this.setProperty("conditions",a,true);this._bOK=true}function fe(e){this.close();this.setProperty("conditions",this._aOldConditions,true)}function ge(e){this._bSwitchToDialog=false}function ce(e){var t=this.getConditions();this._bDialogOpen=false;this._aOldConditions=undefined;this._handleAfterClose(e);if(this._bOK){this.fireSelect({conditions:t,add:false,close:true})}this._bOK=undefined;this.setProperty("_enableOK",true,true)}function pe(e){var t=this.getAggregation("_dialog");if(t&&this._oField){var i=t.getContent()[0];if(e){if(!i._oDefineConditionPanel){var a=new C(this.getId()+"-DCP",{label:"{$help>/title}"});i.setDefineConditions(a)}}else{i.setDefineConditions()}}}function ve(e,t,i){if(e==="remove"){t.detachEvent("search",_e,this);if(!i){var a=t.getBasicSearchField();if(a&&a._bCreadedByFVH){t.setBasicSearchField()}if(t.getCollectiveSearch&&t.getCollectiveSearch()){t.setCollectiveSearch()}}t=undefined}else{t.attachEvent("search",_e,this);Ae.call(this,false)}var r=this.getAggregation("_dialog");if(r){var n=r.getContent()[0];n.setFilterbar(t);n.setShowFilterbar(!!t);if(this.isOpen()){me.call(this);if(!i||e==="remove"){Fe.call(this,e==="remove")}}}}function _e(e){var t=this._getFilterBar();if(t){var i=this.getFilterFields();if(i&&!this._bUpdateFilterAfterClose){var a=be.call(this,i);var r=a.length>0?a[0].values[0]:"";if(r!==this.getFilterValue()){this.setProperty("filterValue",r,true)}}if(this._bApplyFilter||!this._bApplyFilter&&(e||t.getLiveMode())){this._bApplyFilter=true;ie.call(this,true)}}}function me(){var e=this._getFilterBar();if(e){e.setInternalConditions(Object.keys(e.getConditions()).reduce(function(e,t){e[t]=[];return e},{}))}j.call(this,this.getFilterValue());Q.call(this)}function be(e){var t=this._getFilterBar();var i;if(t){i=t.getInternalConditions()}else{i=this._oConditions}return i[e]||[]}function ye(e,t){var i=this._getFilterBar();var a;if(i){a=i.getInternalConditions()}else{a=this._oConditions}if(!a[e]){a[e]=[]}a[e].push(t);if(i){i.setInternalConditions(a)}}function Ce(e){var t=this._getFilterBar();var i;if(t){i=t.getInternalConditions()}else{i=this._oConditions}if(i[e]&&i[e].length>0){i[e]=[]}if(t){t.setInternalConditions(i)}}function Fe(e){if(e){if(!this._iSearchFieldTimer){this._iSearchFieldTimer=setTimeout(function(){this._iSearchFieldTimer=undefined;Fe.call(this,false)}.bind(this),0)}return}else if(this._iSearchFieldTimer){clearTimeout(this._iSearchFieldTimer);this._iSearchFieldTimer=null}var t=this.getFilterFields();var i=Be.call(this,false);if(t&&i){var a=this._getFilterBar();if(!a){a=new P(this.getId()+"-FB",{liveMode:!i.isSuspended(),showGoButton:false});a.setInternalConditions(this._oConditions);this._oConditions={};this.setAggregation("_filterBar",a,true)}if(!a.getBasicSearchField()){if(!this._oSearchField){this._oSearchField=new O(this.getId()+"-search",{conditions:"{$filters>/conditions/"+t+"}",placeholder:"{$i18n>filterbar.SEARCH}",label:"{$i18n>filterbar.SEARCH}",maxConditions:1,width:"50%"});this._oSearchField._bCreadedByFVH=true}else{this._oSearchField.setConditions([])}a.setBasicSearchField(this._oSearchField)}}if(this._oSearchField&&!this._oSearchField.getParent()){this._oSearchField.destroy();delete this._oSearchField}}function Pe(){var e=Be.call(this,true);if(e){return e.getSuggestionContent()}}function Oe(){var e=this._oField?this._oField.getBindingContext():null;this.setBindingContext(e);var t=this._getFormatOptions();if(t.conditionModel&&this.getModel(t.conditionModelName)!==t.conditionModel){this.setModel(t.conditionModel,t.conditionModelName)}}function Se(){if(!this._oResourceBundleM){this._oResourceBundleM=sap.ui.getCore().getLibraryResourceBundle("sap.m")}return this._oResourceBundleM}B.prototype.getScrollDelegate=function(){var t=this.getAggregation("_dialog");if(t&&(t.isOpen()||t.oPopup.getOpenState()===A.OPENING)){var i=Be.call(this,false);var a=i&&i.getDialogContent();if(a&&a.getScrollDelegate){return a.getScrollDelegate()}else{return undefined}}else{return e.prototype.getScrollDelegate.apply(this,arguments)}};B.prototype._fireOpen=function(t){if(!this._bOpenHandled){return e.prototype._fireOpen.apply(this,arguments)}return true};B.prototype.getRoleDescription=function(e){if(!e||e===1){return null}else if(!Be.call(this,false)&&this.getShowConditionPanel()&&!this.getNoDialog()){return null}else{var t=Se.apply(this);return t.getText("MULTICOMBOBOX_ARIA_ROLE_DESCRIPTION")}};B.prototype.getAriaHasPopup=function(){if(this.getNoDialog()){return"listbox"}else if(this.getShowConditionPanel()){return"dialog"}else{return"listbox"}};B.prototype.getValueHelpEnabled=function(){if(this.getNoDialog()){return false}else{return true}};B.prototype._getContenRequestProperties=function(e){var t={};var i=this.getCollectiveSearchItems();if(i.length>0){var a=this.getAggregation("_dialog");if(a&&a.isOpen()&&this._oCollectiveSearchSelect){var r=this._oCollectiveSearchSelect.getSelectedItemKey();t.collectiveSearchKey=r}else{t.collectiveSearchKey=i[0].getKey()}}return t};function Ie(){if(!this._oCollectiveSearchSelect){var e=new I(this.getId()+"-collSearchItem",{key:"{$help>key}",text:"{$help>text}",enabled:"{$help>enabled}",textDirection:"{$help>textDirection}"});this._oCollectiveSearchSelect=new S(this.getId()+"-collSearch",{title:"{$i18n>COL_SEARCH_SEL_TITLE}",items:{path:"$help>/collectiveSearchItems",template:e},select:De.bind(this)}).setModel(this._oManagedObjectModel,"$help")}return this._oCollectiveSearchSelect}function De(e){var t=function(){ie.call(this,true)}.bind(this);this.setProperty("filterValue","",true);var i=this._callContentRequest(false,t);if(i){t()}}function Ae(e){var t=this.getAggregation("_dialog");var i=this._getFilterBar();if(t&&i){var a=this.getCollectiveSearchItems();if(a.length<=1){if(i.getCollectiveSearch&&i.getCollectiveSearch()){i.setCollectiveSearch()}}else{if(i.getCollectiveSearch&&!i.getCollectiveSearch()){i.setCollectiveSearch(Ie.call(this))}if(e&&this._oCollectiveSearchSelect){this._oCollectiveSearchSelect.setSelectedItemKey(a[0].getKey())}}}}function Be(e){var t;if(e){t=this.getSuggestContent()}else{t=this.getDialogContent()}if(!t){t=this.getContent()}return t}return B});
//# sourceMappingURL=FieldValueHelp.js.map
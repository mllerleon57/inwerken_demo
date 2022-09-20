/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","./ComboBox","./library","sap/ui/core/History","sap/ui/core/SeparatorItem","./DropdownBoxRenderer","sap/ui/Device","./TextField","sap/ui/core/ListItem","sap/ui/dom/containsOrEquals","sap/ui/events/jquery/EventExtension","sap/ui/events/KeyCodes","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/selectText"],function(jQuery,e,t,s,i,o,r,a,h,p,n,l,u){"use strict";var d=t.extend("sap.ui.commons.DropdownBox",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{searchHelpEnabled:{type:"boolean",group:"Behavior",defaultValue:false},searchHelpText:{type:"string",group:"Appearance",defaultValue:null},searchHelpAdditionalText:{type:"string",group:"Appearance",defaultValue:null},searchHelpIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},maxHistoryItems:{type:"int",group:"Behavior",defaultValue:0}},events:{searchHelp:{parameters:{value:{type:"string"}}}}}});d.prototype.init=function(){t.prototype.init.apply(this,arguments);this._oValueBeforePaste=null;this._oValueBeforeOpen=null;this.__aItems=null;this._iCursorPosBeforeBackspace=null;this._searchHelpItem=null;this._iItemsForHistory=10;this._oHistory=new i(this.getId())};d.prototype.exit=function(){var e=this.getId()+"-h-";if(this._searchHelpItem){this._searchHelpItem[0].destroy();this._searchHelpItem[1].destroy();this._searchHelpItem=null}t.prototype.exit.apply(this,arguments);function s(e){var t=sap.ui.getCore().byId(e);if(t){t.destroy()}}for(var i=0;i<this.getMaxHistoryItems();i++){s(e+i)}if(this.__oSeparator){this.__oSeparator.destroy();this.__oSeparator=null}this._oHistory=null;this.__aItems=null;this._sWantedValue=undefined};d.prototype.onAfterRendering=function(e){t.prototype.onAfterRendering.apply(this,arguments);if(!this._sHandleItemsChanged){this.checkValueInItems()}};d.prototype.getItems=function(){if(this.oPopup&&this.oPopup.isOpen()){return this.__aItems}else{return t.prototype.getItems.apply(this,arguments)}};d.prototype.insertItem=function(e,s){if(this.oPopup&&this.oPopup.isOpen()){this.__aItems.splice(s,0,e);if(this.__aItems.length<=this._iItemsForHistory&&!this._searchHelpItem){this._getListBox().insertItem(e,s)}if(!this._bNoItemCheck){var i=jQuery(this.getInputDomRef());var o=i.cursorPos();this._doTypeAhead(i.val().substr(0,o),"")}return this}else{return t.prototype.insertItem.apply(this,arguments)}};d.prototype.addItem=function(e){if(this.oPopup&&this.oPopup.isOpen()){this.__aItems.push(e);if(this.__aItems.length<=this._iItemsForHistory&&!this._searchHelpItem){this._getListBox().addItem(e)}if(!this._bNoItemCheck){var s=jQuery(this.getInputDomRef());var i=s.cursorPos();this._doTypeAhead(s.val().substr(0,i),"")}return this}else{return t.prototype.addItem.apply(this,arguments)}};d.prototype.removeItem=function(s){if(this.oPopup&&this.oPopup.isOpen()){var i=null;var o=s;if(typeof s=="string"){s=sap.ui.getCore().byId(s)}if(typeof s=="object"){for(var r=0;r<this.__aItems.length;r++){if(this.__aItems[r]==s){s=r;break}}}if(typeof s=="number"){if(s<0||s>=this.__aItems.length){e.warning("Element.removeAggregation called with invalid index: Items, "+s)}else{i=this.__aItems[s];this.__aItems.splice(s,1)}}if(this.__aItems.length<=this._iItemsForHistory&&!this._searchHelpItem){this._getListBox().removeItem(o)}if(!this._bNoItemCheck){var a=jQuery(this.getInputDomRef());var h=a.cursorPos();this._doTypeAhead(a.val().substr(0,h),"")}return i}else{return t.prototype.removeItem.apply(this,arguments)}};d.prototype.removeAllItems=function(){if(this.oPopup&&this.oPopup.isOpen()){var e=this.__aItems;if(!e){return[]}t.prototype.removeAllItems.apply(this,arguments);this.__aItems=[];return e}else{return t.prototype.removeAllItems.apply(this,arguments)}};d.prototype.indexOfItem=function(e){if(this.oPopup&&this.oPopup.isOpen()){if(this.__aItems){if(this.__aItems.length==undefined){return-2}for(var s=0;s<this.__aItems.length;s++){if(this.__aItems[s]==e){return s}}}return-1}else{return t.prototype.indexOfItem.apply(this,arguments)}};d.prototype.destroyItems=function(){if(this.oPopup&&this.oPopup.isOpen()){if(!this.__aItems){return this}this._getListBox().removeAllItems();for(var e=0;e<this.__aItems.length;e++){if(this.__aItems[e]){this.__aItems[e].destroy()}}this.__aItems=[];return this}else{return t.prototype.destroyItems.apply(this,arguments)}};d.prototype.updateItems=function(){t.prototype.updateItems.apply(this,arguments);if(this.oPopup&&this.oPopup.isOpen()){var e=jQuery(this.getInputDomRef());var s=e.cursorPos();this._doTypeAhead(e.val().substr(0,s),"")}};d.prototype._handleItemsChanged=function(e,s){if(s){this._sHandleItemsChanged=null;this._bNoItemCheck=undefined}if(this._bNoItemCheck){return}if(this.__aItems&&(!this.oPopup||!this.oPopup.isOpen())){throw new Error("DropdownBox "+this.getId()+" : this.__aItems is not empty!")}if(this.getListBox()&&this.oPopup&&this.oPopup.isOpen()){if(this.__aItems.length>this._iItemsForHistory||this._searchHelpItem){var i;var o=0;switch(e.getParameter("event")){case"destroyItems":for(o=0;o<this.__aItems.length;o++){i=this.__aItems[o];if(!i.bIsDestroyed){i.destroy()}}this.__aItems=[];if(this.getSearchHelpEnabled()){this._searchHelpItem=null;this.setSearchHelpEnabled(this.getSearchHelpEnabled(),this.getSearchHelpText(),this.getSearchHelpAdditionalText(),this.getSearchHelpIcon())}break;case"removeAllItems":this.__aItems=[];break;case"removeItem":i=e.getParameter("item");for(o=0;o<this.__aItems.length;o++){if(this.__aItems[o]==i){this.__aItems.splice(o,1);break}}if(this.__aItems.length<=this._iItemsForHistory){this._getListBox().setItems(this.__aItems,false,true)}break;case"insertItem":this.__aItems.splice(e.getParameter("index"),0,e.getParameter("item"));break;case"addItem":this.__aItems.push(e.getParameter("item"));break;case"setItems":this.__aItems=e.getParameter("items");break;case"updateItems":for(o=0;o<this.__aItems.length;o++){i=this.__aItems[o];if(!i.bIsDestroyed){i.destroy()}}if(this.getSearchHelpEnabled()){this._searchHelpItem=null;this.setSearchHelpEnabled(this.getSearchHelpEnabled(),this.getSearchHelpText(),this.getSearchHelpAdditionalText(),this.getSearchHelpIcon())}this.__aItems=this._getListBox().getItems();break;default:break}}else{this.__aItems=this._getListBox().getItems()}var r=jQuery(this.getInputDomRef());var a=r.cursorPos();this._doTypeAhead(r.val().substr(0,a),"")}t.prototype._handleItemsChanged.apply(this,arguments);this.checkValueInItems()};d.prototype.onclick=function(e){if(!this.mobile&&this.getEnabled&&this.getEnabled()&&this.getEditable()){if(this.oPopup&&this.oPopup.isOpen()){this._close();this._doSelect()}else if(!this._F4ForClose){this._open()}this.focus()}this._F4ForClose=false};d.prototype.onmousedown=function(e){if(!this.getEnabled()||!this.getEditable()){return}if(this.oPopup&&this.oPopup.isOpen()){this._F4ForClose=true}else{this._F4ForOpen=true}t.prototype.onmousedown.apply(this,arguments)};d.prototype.onsapshow=function(e){if(this.mobile){return}if(!this.getEnabled()||!this.getEditable()){e.preventDefault();e.stopImmediatePropagation();return}if(e.which===u.F4&&this._searchHelpItem){this._close();this.fireSearchHelp({value:jQuery(this.getInputDomRef()).val()});e.preventDefault();e.stopImmediatePropagation();return}if(this.oPopup&&this.oPopup.isOpen()){this._close()}else{this._open();var t=this._getListBox();t.scrollToIndex(t.getSelectedIndex());this._doSelect()}e.preventDefault();e.stopImmediatePropagation()};d.prototype.onkeydown=function(e){if(e.target.id==this.getId()+"-select"){return}if(a.browser.webkit&&(e.which==u.DELETE||e.which==u.BACKSPACE)){this.onkeypress(e)}if(e.which!==u.BACKSPACE){return}};d.prototype.onpaste=function(e){if(e.target.id==this.getId()+"-select"){return}if(this._oValueBeforePaste===null){this._oValueBeforePaste=jQuery(this.getInputDomRef()).val()}};d.prototype.oncut=d.prototype.onpaste;d.prototype.oninput=function(e){if(this.mobile){return}var t=jQuery(this.getInputDomRef());var s=t.val();if(!this.oPopup||!this.oPopup.isOpen()){this.noTypeAheadByOpen=true;this._open();this.noTypeAheadByOpen=undefined}var i=this._doTypeAhead(s,"");if(!i&&this._oValueBeforePaste){this._doTypeAhead("",this._oValueBeforePaste)}this._oValueBeforePaste=null;this._fireLiveChange(e)};d.prototype.onkeyup=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}var t=e.which;h.prototype.onkeyup.apply(this,arguments);if(this._oValueBeforePaste===null||t===u.TAB){return}if(!this.oPopup||!this.oPopup.isOpen()){this.noTypeAheadByOpen=true;this._open();this.noTypeAheadByOpen=undefined}var s=jQuery(this.getInputDomRef()),i=false;if(t===u.BACKSPACE&&this._iCursorPosBeforeBackspace!==null){var o=s.cursorPos();if(this._iCursorPosBeforeBackspace!==o){o++}this._iCursorPosBeforeBackspace=null;i=this._doTypeAhead(s.val().substr(0,o-1),"")}else if(!(i=this._doTypeAhead("",s.val()))){s.val(this._oValueBeforePaste)}if(i){this._getListBox().rerender()}this._oValueBeforePaste=null};d.prototype.onsaphome=function(e){if(e.target.id==this.getId()+"-select"){return}if((!this.oPopup||!this.oPopup.isOpen())&&this.getEditable()&&this.getEnabled()){h.prototype.onsaphome.apply(this,arguments);var s=jQuery(this.getInputDomRef());s.cursorPos(0);this._updateSelection();e.preventDefault()}else{t.prototype.onsaphome.apply(this,arguments)}};d.prototype.onsapdelete=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.oPopup||!this.oPopup.isOpen()){return}var t=this._getListBox(),s=t.getSelectedItem(),i=s.getId().match(/\-h\-([0-4])/),o=t.getSelectedIndex();if(i&&i.length===2){this._oHistory.remove(s.getText());t.removeItem(o);var r=this._oHistory.get().length;if(r===0){t.removeItem(0)}t.rerender();var a=o+(this._searchHelpItem?2:0);if(a==r){a++}t.setSelectedIndex(a);this.setValue(t.getSelectedItem().getText())}};d.prototype.onkeypress=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}var s=e.which,i=e.keyCode;if((t._isHotKey(e)||a.browser.firefox&&i===u.HOME||i===u.F4&&e.which===0)&&!(e.ctrlKey&&e.which==120)){return}else if(i==u.ESCAPE){var o=this.getProperty("value");var r=this.getInputDomRef();if(r&&r.value!==o){jQuery(r).val(o)}return}var h=String.fromCharCode(s),p=jQuery(this.getInputDomRef()),n=p.cursorPos(),l=p.val();if(!this.oPopup||!this.oPopup.isOpen()){this.noTypeAheadByOpen=true;this._open();this.noTypeAheadByOpen=undefined}if(s===u.BACKSPACE){this._doTypeAhead(l.substr(0,n-1),"")}else{this._doTypeAhead(l.substr(0,n),h)}if(l!=p.val()){this._fireLiveChange(e)}this._bFocusByOpen=undefined;e.preventDefault()};d.prototype.onsapright=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}var t=sap.ui.getCore().getConfiguration().getRTL();if(!t){this._updateSelection(1)}else{this._updateSelection(-1)}e.preventDefault()};d.prototype.onsapleft=function(e){if(e.target.id==this.getId()+"-select"){return}if(!this.getEnabled()||!this.getEditable()){return}var t=sap.ui.getCore().getConfiguration().getRTL();if(!t){this._updateSelection(-1)}else{this._updateSelection(1)}e.preventDefault()};d.prototype.onfocusin=function(e){if(!this.oPopup||!this.oPopup.isOpen()||this._bFocusByOpen){var s=jQuery(this.getInputDomRef()),i=s.val().length;if(i>0&&!this.mobile){this._callDoSelectAfterFocusIn(0,i)}this._bFocusByOpen=undefined}t.prototype.onfocusin.apply(this,arguments)};d.prototype._callDoSelectAfterFocusIn=function(e,t){this._doSelect(e,t)};d.prototype.onselect=function(e){var t=(new Date).getTime();if(this._bIgnoreSelect){this._bIgnoreSelect=false;this.iOldTimestamp=t;return}if(this.iOldTimestamp&&t-this.iOldTimestamp<50){return}this.iOldTimestamp=undefined;if(!this.getEnabled()||!this.getEditable()){return}var s=jQuery(this.getInputDomRef()),i=s.cursorPos(),o=s.val();if(o.length>0&&i>0){this._doTypeAhead(o.substr(0,i),"");if(!this.oPopup||!this.oPopup.isOpen()){this._cleanupClose(this._getListBox())}}e.preventDefault()};d.prototype._determinePosinset=function(e,t){var s=t+1;if(this.oPopup&&this.oPopup.isOpen()){this.dontSetPoisinset=undefined;var i=e[t];var o=e[0].getId().search(this.getId()+"-h-")!=-1;if(i.getId().search(this.getId()+"-h-")==-1){if(o){s=s-1}if(this._searchHelpItem){s=s-2}}}return s};d.prototype._doSelect=function(e,t){this._bIgnoreSelect=true;var s=this.getInputDomRef();if(s){var i=jQuery(s);i.selectText(e?e:0,t?t:i.val().length)}return this};d.prototype._updateSelection=function(e){var t=jQuery(this.getInputDomRef()),s=t.cursorPos()+(e||0),i=t.val();this._doTypeAhead(i.substr(0,s),"");if(!this.oPopup||!this.oPopup.isOpen()){this._cleanupClose(this._getListBox())}else{this._getListBox().rerender()}};d.prototype._doTypeAhead=function(e,t,s,i){if(this.__doTypeAhead===true){return}this.__doTypeAhead=true;this._sWantedSelectedKey=undefined;this._sWantedSelectedItemId=undefined;this._sWantedValue=undefined;var o=this._getListBox(),r=this.getMaxPopupItems(),a=this.__aItems||o.getItems(),h=a.length,p=this.getMaxHistoryItems()>0&&a.length>this._iItemsForHistory,n=!s&&p,l=e+t,u=new RegExp("[.*+?|()\\[\\]{}\\\\]","g"),d=l.toLowerCase().replace(u,"\\$&"),f=RegExp("^"+d+".*$"),c=t&&t.length||0,_=jQuery(this.getInputDomRef());this.__aItems=a;if(h<=0){this.__doTypeAhead=false;return false}var g,m=this._getFilteredItems(a,f),I=m.length>0;if(!I){n=false}if(n){g=m}else{g=a.slice(0)}var y=[];if(p){y=this._addHistoryItems(g,n&&f);o.setItems(g,false,true);h=g.length}o.setVisibleItems(r<h?r:-1);var v,H=y.length;var x=0;if(i>=0){v=a[i]}if(!n&&H>0&&I){y=this._getFilteredItems(y,f);v=y[0]}if(n){v=m[0]}else if(!v){if(m.length>0){v=m[0]}else{var P=_.val();var b=0;for(x=0;x<g.length;x++){var S=g[x];if(S.getEnabled()){if(!b){b=x}if(S.getText()==P){v=S;break}}}if(!v){v=g[b]}}}var T=this._searchHelpItem;if(T){g.splice(H++,0,T[0],T[1]);o.setItems(g,false,true)}x=o.indexOfItem(v);var B=v.getText();var A=x+1;var C=g.length;if(y.length>0){C=C-1}if(T){C=C-2}if(A>y.length){if(y.length>0){A=A-1}if(T){A=A-2}}this._updatePosInSet(_,A,v.getAdditionalText?v.getAdditionalText():"");_.attr("aria-setsize",C);_.val(B);this._sTypedChars=l;this._doSelect(e.length+c,B.length);o.setSelectedIndex(x);if(T&&x==2){o.scrollToIndex(0)}else{o.scrollToIndex(x)}this._iClosedUpDownIdx=x;if(!I){_=this.$();_.addClass("sapUiTfErr");setTimeout(function(){_.removeClass("sapUiTfErr")},300);_.cursorPos(e.length);this._doSelect(e.length,B.length)}this.__doTypeAhead=false;return I};d.prototype._prepareOpen=function(e,t){this._oValueBeforeOpen=jQuery(this.getInputDomRef()).val();this._bOpening=true;if(!this.noTypeAheadByOpen){var s;if(this._iClosedUpDownIdx>=0){s=this._iClosedUpDownIdx}else if(this.getSelectedItemId()){s=this.indexOfItem(sap.ui.getCore().byId(this.getSelectedItemId()))}this._doTypeAhead("",jQuery(this.getInputDomRef()).val(),true,s);this._doSelect()}return this};d.prototype._handleOpened=function(){t.prototype._handleOpened.apply(this,arguments);jQuery(this.getInputDomRef()).trigger("focus")};d.prototype._cleanupClose=function(e){if(this.__aItems){var t=e.getSelectedItem();e.setItems(this.__aItems,false,true);this._iClosedUpDownIdx=e.indexOfItem(t);e.setSelectedIndex(this._iClosedUpDownIdx);this.__aItems=undefined}this._oValueBeforeOpen=null;this._bOpening=undefined;return this};d.prototype._getFilteredItems=function(e,t){var s=e.slice(0),i;for(var o=s.length-1;o>=0;o--){i=s[o];if(!t.test(i.getText().toLowerCase())||!i.getEnabled()){s.splice(o,1)}}return s};d.prototype._addHistoryItems=function(e,t){var s=this.getId()+"-h-",i,o=this._oHistory.get(),r=o.length,a=[];for(var h=0,n=0;n<this.getMaxHistoryItems()&&h<r;h++){if(!t||t.test(o[h])){i=(i=sap.ui.getCore().byId(s+n))&&i.setText(o[h])||new p(s+n,{text:o[h]});a.push(i);n++}}if(a.length>0){var l=s+"separator",u=this._getSeparator(l);a.push(u)}e.unshift.apply(e,a);return a};d.prototype._getSeparator=function(e){if(!this.__oSeparator&&e){this.__oSeparator=sap.ui.getCore().byId(e)||new o(e)}return this.__oSeparator||null};d.prototype.fireChange=function(e){this.fireEvent("change",e);if(e.newValue&&this.getMaxHistoryItems()>0){this._oHistory.add(e.newValue)}this._sWantedValue=undefined;return this};d.prototype.setValue=function(e,s){e=e===undefined||e===null||e===""?"":e;var i=this.getItems(),o,r=false,a;for(var h=0,p=i.length;h<p&&!r;h++){var n=i[h];var l=n.getEnabled();o=n.getText();if(l&&!a){a=o}r=o===e&&l}if(r){t.prototype.setValue.call(this,e,s);this._sWantedValue=undefined}else if(e===""&&i.length>0){t.prototype.setValue.call(this,a,s)}else{this._sWantedValue=e}return this};d.prototype.applyFocusInfo=function(e){t.prototype.applyFocusInfo.apply(this,arguments);if(!this._bOpening&&(!this.oPopup||!this.oPopup.isOpen())){this._cleanupClose(this._getListBox())}return this};d.prototype._focusAfterListBoxClick=function(){if(!a.browser.webkit){this.focus()}else{var e=this._getListBox();e.addDelegate({onclick:function(){e.removeDelegate(this);this.focus()}.bind(this)})}};d.prototype.onsapfocusleave=function(e){var t=this._getListBox();if(e.relatedControlId&&n(t.getFocusDomRef(),sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){this._focusAfterListBoxClick()}else{if(this.oPopup&&this.oPopup.isOpen()){this._close()}h.prototype.onsapfocusleave.apply(this,arguments)}};d.prototype.getTooltip_AsString=function(){var e=t.prototype.getTooltip_AsString.apply(this,arguments);if(!this._searchHelpItem){return e}else{var s=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");var i=s.getText("DDBX_SHI_ARIA");i=i==="DDBX_SHI_ARIA"?"Open search help via {0}":i;var o=this._searchHelpItem[0]&&this._searchHelpItem[0].getAdditionalText()||s.getText("DDBX_SHIF4");o=o==="DDBX_SHIF4"?"F4":o;i=i.replace("{0}",o);return(e?e+" - ":"")+i}};d.prototype._handleSelect=function(e){if(this._searchHelpItem&&e.getParameter("selectedItem")===this._searchHelpItem[0]){var s=new jQuery.Event("sapshow");s.which=u.F4;this.onsapshow(s)}else{var i=e.getParameter("selectedItem");if(!i){i=sap.ui.getCore().byId(e.getParameter("selectedId"))}if(i.getId().search(this.getId()+"-h-")!=-1){var o=this._getListBox(),r=o.getItems();var a=this._oHistory.get().length;if(a>this.getMaxHistoryItems()){a=Math.max(this.getMaxHistoryItems(),0)}for(var h=a;h<r.length;h++){if(r[h].getText()==i.getText()&&r[h].getEnabled()){e.mParameters.selectedIndex=h;if(!e.getParameter("selectedIndices")){e.mParameters.selectedIndices=new Array(1);e.mParameters.aSelectedIndices=new Array(1)}e.mParameters.selectedIndices[0]=h;e.mParameters.aSelectedIndices[0]=h;e.mParameters.selectedItem=r[h];break}}}this._sWantedValue=undefined;return t.prototype._handleSelect.apply(this,arguments)}};d.prototype.setSearchHelpEnabled=function(e,t,s,i){this.setProperty("searchHelpEnabled",e);if(t){this.setProperty("searchHelpText",t)}else{t=this.getSearchHelpText()}if(s){this.setProperty("searchHelpAdditionalText",s)}else{s=this.getSearchHelpAdditionalText()}if(i){this.setProperty("searchHelpIcon",i)}else{i=this.getSearchHelpIcon()}if(e){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(r){t=t||r.getText("DDBX_SHI");t=t==="DDBX_SHI"?"Search Help":t;s=s||r.getText("DDBX_SHIF4");s=s==="DDBX_SHIF4"?"F4":s}i=i||sap.ui.require.toUrl("sap/ui/commons/images/dropdown/ico12_f4.gif");if(!this._searchHelpItem){this._searchHelpItem=[new p(this.getId()+"_shi",{text:t,additionalText:s,enabled:true,icon:i}),new o]}else{this._searchHelpItem[0].setText(t).setAdditionalText(s).setIcon(i)}}else{if(this._searchHelpItem){this._searchHelpItem[0].destroy();this._searchHelpItem[1].destroy();this._searchHelpItem=null}}return this};d.prototype.setSearchHelpText=function(e){this.setProperty("searchHelpText",e);this.setSearchHelpEnabled(this.getSearchHelpEnabled(),e,this.getSearchHelpAdditionalText(),this.getSearchHelpIcon());return this};d.prototype.setSearchHelpAdditionalText=function(e){this.setProperty("searchHelpAdditionalText",e);this.setSearchHelpEnabled(this.getSearchHelpEnabled(),this.getSearchHelpText(),e,this.getSearchHelpIcon());return this};d.prototype.setSearchHelpIcon=function(e){this.setProperty("searchHelpIcon",e);this.setSearchHelpEnabled(this.getSearchHelpEnabled(),this.getSearchHelpText(),this.getSearchHelpAdditionalText(),e);return this};d.prototype.checkValueInItems=function(){var e=this.getValue();var s=t.prototype.getItems.apply(this);var i=this._sWantedSelectedKey;var o=this._sWantedSelectedItemId;if(s&&s.length>0){var r=false;var a;var h=0,p=0;var n;var l=false;var u="";if(this._sWantedValue){for(h=0,p=s.length;h<p&&!r;h++){n=s[h];l=n.getEnabled();u=n.getText();if(l&&!a){a=u}r=u===this._sWantedValue&&l}if(r){e=this._sWantedValue;this._sWantedValue=undefined;i=undefined;o=undefined;t.prototype.setValue.call(this,e)}}if(!r){for(h=0,p=s.length;h<p&&!r;h++){n=s[h];l=n.getEnabled();u=n.getText();if(l&&!a){a=u}r=u===e&&l}}if(!r){e=a;t.prototype.setValue.call(this,e)}}else{e="";t.prototype.setValue.call(this,e)}this._sWantedSelectedKey=i;this._sWantedSelectedItemId=o;return e};d.prototype.setMaxHistoryItems=function(e){var t=this.getMaxHistoryItems();var s=this.getId()+"-h-";var i;this.setProperty("maxHistoryItems",e,true);if(e<t){var o=this._getListBox();for(var r=Math.max(e,0);r<t;r++){i=sap.ui.getCore().byId(s+r);if(i){o.removeItem(i);i.destroy()}}if(e<=0&&this.__oSeparator){o.removeItem(this.__oSeparator)}}return this};d.prototype.clearHistory=function(){this._oHistory.clear();var e=this.getId()+"-h-";var t=this._getListBox();var s;for(var i=0;i<this.getMaxHistoryItems();i++){s=sap.ui.getCore().byId(e+i);if(s){t.removeItem(s);s.destroy()}}if(this.__oSeparator){t.removeItem(this.__oSeparator)}};d.prototype.ondrop=function(e){e.preventDefault()};d.prototype._isSetEmptySelectedKeyAllowed=function(){return false};return d});
//# sourceMappingURL=DropdownBox.js.map
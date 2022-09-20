/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./BaseContent","./ObjectContentRenderer","sap/ui/integration/library","sap/m/library","sap/m/FlexItemData","sap/m/HBox","sap/m/VBox","sap/m/Text","sap/m/Title","sap/m/Avatar","sap/m/Link","sap/m/Label","sap/m/ObjectStatus","sap/m/ComboBox","sap/m/TextArea","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/core/ResizeHandler","sap/ui/layout/AlignedFlowLayout","sap/ui/dom/units/Rem","sap/ui/integration/util/BindingHelper","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/Utils","sap/ui/integration/util/Forms","sap/f/AvatarGroup","sap/f/AvatarGroupItem","sap/f/cards/NumericIndicators","sap/f/cards/NumericSideIndicator","sap/f/library","sap/m/OverflowToolbar","sap/m/OverflowToolbarButton","sap/ui/core/ListItem"],function(e,t,a,i,r,n,o,s,l,p,u,d,c,f,m,h,g,v,b,y,C,I,_,w,S,x,A,F,B,G,L,O){"use strict";var T=i.AvatarSize;var E=i.AvatarColor;var j=i.ButtonType;var P=i.FlexRendertype;var V=i.FlexJustifyContent;var R=a.CardActionArea;var D=B.AvatarGroupType;var k=i.ToolbarStyle;var z=e.extend("sap.ui.integration.cards.ObjectContent",{metadata:{library:"sap.ui.integration"},renderer:t});z.prototype.exit=function(){e.prototype.exit.apply(this,arguments);delete this._aValidationControls;if(this._sResizeListenerId){v.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};z.prototype.onDataChanged=function(){this._handleNoItemsError(this.getParsedConfiguration().hasData);this._validateInputFields(false)};z.prototype.validateControls=function(){this._validateInputFields(true)};z.prototype._validationControlChanged=function(e){w.validateControl(e.getSource(),this.getCardInstance(),true)};z.prototype._validateInputFields=function(e){(this._aValidationControls||[]).forEach(function(t){w.validateControl(t,this.getCardInstance(),e)}.bind(this))};z.prototype._prepareValidationControl=function(e,t,a){e.attachEvent(a,this._validationControlChanged.bind(this));this._aValidationControls.push(e);e._oItem=t};z.prototype._handleNoItemsError=function(e){if(!e){return}var t=I.resolveValue(e,this,this.getBindingContext().getPath());if(!t||Array.isArray(t)&&!t.length||g(t)){this.getParent()._handleError("No items available",true)}};z.prototype.setConfiguration=function(t){e.prototype.setConfiguration.apply(this,arguments);t=this.getParsedConfiguration();if(!t){return this}this._aValidationControls=[];if(t.groups){this._addGroups(t)}return this};z.prototype._getRootContainer=function(){var e=this.getAggregation("_content");if(!e){e=new o({renderType:P.Bare});this.setAggregation("_content",e);this._sResizeListenerId=v.register(e,this._onResize.bind(this))}return e};z.prototype._addGroups=function(e){var t=this._getRootContainer(),a,i=true,n=e.groups||[];this._formElementsIds=new Set;n.forEach(function(e,o){var s=this._createGroup(e);if(e.alignment==="Stretch"){s.setLayoutData(new r({growFactor:1}));t.addItem(s);i=true}else{if(i){a=this._createAFLayout();t.addItem(a);i=false}a.addContent(s)}if(o===n.length-1){s.addStyleClass("sapFCardObjectGroupLastInColumn")}},this);this._oActions.attach({area:R.Content,actions:e.actions,control:this})};z.prototype._createGroup=function(e){var t;if(typeof e.visible=="string"){t=!_.hasFalsyValueAsString(e.visible)}else{t=e.visible}var a=new o({visible:t,renderType:P.Bare}).addStyleClass("sapFCardObjectGroup");if(e.title){a.addItem(new s({text:e.title,maxLines:e.titleMaxLines||1}).addStyleClass("sapFCardObjectItemTitle sapMTitle sapMTitleStyleAuto"));a.addStyleClass("sapFCardObjectGroupWithTitle")}e.items.forEach(function(t){t.labelWrapping=e.labelWrapping;this._createGroupItems(t).forEach(a.addItem,a)},this);return a};z.prototype._createGroupItems=function(e){var t=e.label,a,i,s;if(typeof e.visible=="string"){i=!_.hasFalsyValueAsString(e.visible)}else{i=e.visible}if(t){t=C.formattedProperty(t,function(e){return e&&(e[e.length-1]===":"?e:e+":")});a=new d({text:t,visible:i,wrapping:e.labelWrapping}).addStyleClass("sapFCardObjectItemLabel");a.addEventDelegate({onBeforeRendering:function(){a.setVisible(a.getVisible()&&!!a.getText())}})}s=this._createItem(e,i,a);if(s){s.addStyleClass("sapFCardObjectItemValue")}if(e.icon){var l=new o({renderType:P.Bare,justifyContent:V.Center,items:[a,s]}).addStyleClass("sapFCardObjectItemPairContainer");var p=this._createGroupItemAvatar(e.icon);p.setLayoutData(new r({shrinkFactor:0}));var u=new n({visible:i,renderType:P.Bare,items:[p,l]}).addStyleClass("sapFCardObjectItemLabel");return[u]}else{return[a,s]}};z.prototype._createGroupItemAvatar=function(e){var t=C.formattedProperty(e.src,function(e){return this._oIconFormatter.formatSrc(e)}.bind(this));var a=new p({displaySize:e.size||T.XS,src:t,initials:e.text,displayShape:e.shape,tooltip:e.alt,backgroundColor:e.backgroundColor||(e.text?undefined:E.Transparent)}).addStyleClass("sapFCardObjectItemAvatar sapFCardIcon");return a};z.prototype._createItem=function(e,t,a){var i,r=e.value,n=e.tooltip,o;switch(e.type){case"NumericData":i=this._createNumericDataItem(e,t);break;case"Status":i=this._createStatusItem(e,t);break;case"IconGroup":i=this._createIconGroupItem(e,t);break;case"ButtonGroup":i=this._createButtonGroupItem(e,t);break;case"ComboBox":i=this._createComboBoxItem(e,t,a);break;case"TextArea":i=this._createTextAreaItem(e,t,a);break;case"link":h.warning("Usage of Object Group Item property 'type' with value 'link' is deprecated. Use Card Actions for navigation instead.",null,"sap.ui.integration.widgets.Card");i=new u({href:e.url||r,text:r,tooltip:n,target:e.target||"_blank",visible:C.reuse(t)});break;case"email":h.warning("Usage of Object Group Item property 'type' with value 'email' is deprecated. Use Card Actions for navigation instead.",null,"sap.ui.integration.widgets.Card");var s=[];if(e.value){s.push(e.value)}if(e.emailSubject){s.push(e.emailSubject)}o=C.formattedProperty(s,function(e,t){if(t){return"mailto:"+e+"?subject="+t}else{return"mailto:"+e}});i=new u({href:o,text:r,tooltip:n,visible:C.reuse(t)});break;case"phone":h.warning("Usage of Object Group Item property 'type' with value 'phone' is deprecated. Use Card Actions for navigation instead.",null,"sap.ui.integration.widgets.Card");o=C.formattedProperty(r,function(e){return"tel:"+e});i=new u({href:o,text:r,tooltip:n,visible:C.reuse(t)});break;default:i=this._createTextItem(e,t,a)}return i};z.prototype._createNumericDataItem=function(e,t){var a=new o({visible:C.reuse(t)});var i=new A({number:e.mainIndicator.number,numberSize:e.mainIndicator.size,scale:e.mainIndicator.unit,trend:e.mainIndicator.trend,state:e.mainIndicator.state}).addStyleClass("sapUiIntOCNumericIndicators");a.addItem(i);if(e.sideIndicators){e.sideIndicators.forEach(function(e){i.addSideIndicator(new F({title:e.title,number:e.number,unit:e.unit,state:e.state}))})}if(e.details){a.addItem(new s({text:e.details,maxLines:1}).addStyleClass("sapUiIntOCNumericIndicatorsDetails"))}return a};z.prototype._createStatusItem=function(e,t){var a=new c({text:e.value,visible:C.reuse(t),state:e.state});return a};z.prototype._createTextItem=function(e,t,a){var i=e.value,r=e.tooltip,o;if(i&&e.actions){o=new u({text:i,tooltip:r,visible:C.reuse(t)});if(a){o.addAriaLabelledBy(a)}else{h.warning("Missing label for Object group item with actions.",null,"sap.ui.integration.widgets.Card")}this._oActions.attach({area:R.ContentItemDetail,actions:e.actions,control:this,actionControl:o,enabledPropertyName:"enabled"});o=new n({renderType:P.Bare,items:o})}else if(i){o=new s({text:i,visible:C.reuse(t),maxLines:e.maxLines})}return o};z.prototype._createButtonGroupItem=function(e,t){var a=e.template;if(!a){return null}var i=new G({visible:C.reuse(t),style:k.Clear});i.addStyleClass("sapUiIntCardObjectButtonGroup");var r=new L({icon:C.formattedProperty(a.icon,function(e){return this._oIconFormatter.formatSrc(e)}.bind(this)),text:a.text||a.tooltip,tooltip:a.tooltip||a.text,type:j.Transparent,visible:a.visible});if(a.actions){r.attachPress(function(e){this._onButtonGroupPress(e,a.actions)}.bind(this))}i.bindAggregation("content",{path:e.path||"/",template:r,templateShareable:false});return i};z.prototype._onButtonGroupPress=function(e,t){var a=e.getSource();var i=I.resolveValue(t,a,a.getBindingContext().getPath());var r=i[0];this.getActions().fireAction(this,r.type,r.parameters)};z.prototype._createIconGroupItem=function(e,t){var a=e.template;if(!a){return null}var i=new S({avatarDisplaySize:e.size||T.XS,groupType:D.Individual,visible:C.reuse(t)});i._oShowMoreButton.setType(j.Transparent);i._oShowMoreButton.setEnabled(false);if(a.actions){i.attachPress(function(e){this._onIconGroupPress(e,a.actions)}.bind(this))}else{i._setInteractive(false)}var r=new x({src:C.formattedProperty(a.icon.src,function(e){return this._oIconFormatter.formatSrc(e)}.bind(this)),initials:a.icon.text,tooltip:a.icon.alt});i.bindAggregation("items",{path:e.path||"/",template:r,templateShareable:false});return i};z.prototype._onIconGroupPress=function(e,t){if(e.getParameter("overflowButtonPressed")){}else{var a=e.getParameter("eventSource");var i=I.resolveValue(t,a,a.getBindingContext().getPath());var r=i[0];this.getActions().fireAction(this,r.type,r.parameters)}};z.prototype._createComboBoxItem=function(e,t,a){var i=this.getCardInstance(),r=i.getModel("form"),n={visible:C.reuse(t),placeholder:e.placeholder,required:w.getRequiredValidationValue(e)},o,s,l;if(e.selectedKey){n.selectedKey=e.selectedKey}else if(e.value){n.value=e.value}o=new f(n);if(a){a.setLabelFor(o)}if(e.item){s=new O({key:e.item.template.key,text:e.item.template.title});o.bindItems({path:e.item.path||"/",template:s,templateShareable:false})}if(!e.id){h.error("Each input element must have an ID.","sap.ui.integration.widgets.Card");return o}else if(this._formElementsIds.has(e.id)){h.error("Duplicate form element ID - "+"'"+e.id+"'","sap.ui.integration.widgets.Card")}this._formElementsIds.add(e.id);l=function(){r.setProperty("/"+e.id,{key:o.getSelectedKey(),value:o.getValue()})};o.attachChange(l);o.addEventDelegate({onAfterRendering:l});this._prepareValidationControl(o,e,"change");return o};z.prototype._createTextAreaItem=function(e,t,a){var i=this.getCardInstance(),r=i.getModel("form"),n=new m({required:w.getRequiredValidationValue(e),value:e.value,visible:C.reuse(t),rows:e.rows,placeholder:e.placeholder}),o;if(a){a.setLabelFor(n)}if(!e.id){h.error("Each input element must have an ID.","sap.ui.integration.widgets.Card");return n}else if(this._formElementsIds.has(e.id)){h.error("Duplicate form element ID - "+"'"+e.id+"'","sap.ui.integration.widgets.Card")}this._formElementsIds.add(e.id);o=function(){r.setProperty("/"+e.id,n.getValue())};n.attachChange(o);n.addEventDelegate({onAfterRendering:o});this._prepareValidationControl(n,e,"liveChange");return n};z.prototype._createAFLayout=function(){var e=new b;e.addEventDelegate({onAfterRendering:function(){this.getContent().forEach(function(e){if(!e.getVisible()){document.getElementById("sap-ui-invisible-"+e.getId()).parentElement.classList.add("sapFCardInvisibleContent")}})}},e);return e};z.prototype._onResize=function(e){if(e.size.width===e.oldSize.width){return}var t=this._getRootContainer().getItems();t.forEach(function(a,i){if(a.isA("sap.ui.layout.AlignedFlowLayout")){this._onAlignedFlowLayoutResize(a,e,i===t.length-1)}}.bind(this))};z.prototype._onAlignedFlowLayoutResize=function(e,t,a){var i=e.getMinItemWidth(),r,n=e.getContent().filter(function(e){return e.getVisible()}).length;if(i.lastIndexOf("rem")!==-1){r=y.toPx(i)}else if(i.lastIndexOf("px")!==-1){r=parseFloat(i)}var o=Math.floor(t.size.width/r);if(o>n){o=n}var s=o-1,l=Math.ceil(n/o);e.getContent().forEach(function(e,t){e.addStyleClass("sapFCardObjectSpaceBetweenGroup");if(s===t&&s<n){e.removeStyleClass("sapFCardObjectSpaceBetweenGroup");s+=o}if(a&&t+1>(l-1)*o){e.addStyleClass("sapFCardObjectGroupLastInColumn")}else{e.removeStyleClass("sapFCardObjectGroupLastInColumn")}})};return z});
//# sourceMappingURL=ObjectContent.js.map
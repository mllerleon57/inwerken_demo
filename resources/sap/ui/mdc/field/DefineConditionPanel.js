/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","sap/base/util/merge","sap/base/util/deepEqual","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/condition/Operator","sap/ui/mdc/field/ConditionType","sap/ui/mdc/enum/EditMode","sap/ui/mdc/enum/FieldDisplay","sap/ui/mdc/enum/BaseType","sap/ui/mdc/enum/ConditionValidated","sap/ui/mdc/Field","sap/ui/mdc/ValueHelp","sap/ui/mdc/valuehelp/Popover","sap/ui/mdc/valuehelp/content/FixedList","sap/ui/mdc/field/ListFieldHelpItem","sap/ui/model/base/ManagedObjectModel","sap/ui/model/json/JSONModel","sap/ui/model/resource/ResourceModel","sap/ui/model/type/String","sap/ui/core/library","sap/ui/core/InvisibleText","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/m/library","sap/m/Button","sap/m/Panel","sap/base/Log","sap/ui/core/InvisibleMessage","sap/ui/thirdparty/jquery"],function(e,t,i,a,n,r,s,o,l,d,u,p,h,f,v,g,c,y,m,C,O,b,T,x,I,_,P,S,V,D,jQuery){"use strict";var M=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");sap.ui.getCore().attachLocalizationChanged(function(){M=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")});var w=_.ButtonType;var N=b.ValueState;var $=b.InvisibleMessageMode;var F=["EQ","NE"];var E=e.extend("sap.ui.mdc.field.DefineConditionPanel",{metadata:{library:"sap.ui.mdc",properties:{conditions:{type:"object[]",group:"Data",defaultValue:[],byValue:true},formatOptions:{type:"object",defaultValue:{}},label:{type:"string",defaultValue:""},inputOK:{type:"boolean",defaultValue:true}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{fieldHelp:{type:"sap.ui.mdc.ValueHelp",multiple:false}},events:{conditionProcessed:{}}},_oManagedObjectModel:null,renderer:{apiVersion:2,render:function(e,t){e.openStart("section",t);e.class("sapUiMdcDefineConditionPanel");e.openEnd();e.renderControl(t.getAggregation("_content"));e.close("section")}},init:function(){sap.ui.getCore().getMessageManager().registerObject(this,true);e.prototype.init.apply(this,arguments);this.oInvisibleMessage=D.getInstance();this._oManagedObjectModel=new y(this);this._oObserver=new t(L.bind(this));this._oObserver.observe(this,{properties:["conditions","formatOptions"]});z.call(this);this.setModel(this._oManagedObjectModel,"$this");this.setModel(this._oManagedObjectModel,"$condition")},exit:function(){sap.ui.getCore().getMessageManager().unregisterObject(this,true);this._oObserver.disconnect();this._oObserver=undefined;if(this._sConditionsTimer){clearTimeout(this._sConditionsTimer);this._sConditionsTimer=null}if(this._oDefaultType){this._oDefaultType.destroy();delete this._oDefaultType}this._oManagedObjectModel.destroy();delete this._oManagedObjectModel},byId:function(e){return sap.ui.getCore().byId(this.getId()+"--"+e)},onBeforeRendering:function(){if(!this.getModel("$i18n")){this.setModel(new C({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n")}if(this.getConditions().length===0){this.updateDefineConditions()}},removeCondition:function(e){var t=e.oSource;var i=t.getBindingContext("$this");var a=this.getConditions();var n=i.getPath();var r=n.match(/^.*\/(\d+)\/$/);var s;if(r){s=parseInt(r[1])}if(s>0&&a.length-1===s){this._bFocusLastRemoveBtn=true}this.oInvisibleMessage.announce(M.getText("valuehelp.DEFINECONDITIONS_REMOVECONDITION_ANNOUNCE"),$.Polite);var o=this.byId("conditions");var l=o.getContent();var d=0;for(var u=0;u<l.length&&d<=s;u++){var p=l[u];if(d===s&&p instanceof h&&p.hasOwnProperty("_iValueIndex")){if(p._bParseError){p.setValue(null)}}if(p instanceof P&&p.getId().endsWith("-removeBtnLarge")){d++}}if(a.length===1&&s===0){this.addDummyCondition(1);a=this.getConditions()}a.splice(s,1);this.setProperty("conditions",a,true);pe.call(this,undefined);this.fireConditionProcessed()},addCondition:function(e){var t=this.getConditions();var i=this.getFormatOptions();var a=i.maxConditions;if(a===-1||t.length<a){this.addDummyCondition(t.length+1);if(this.getConditions().length===a){this._bFocusLastCondition=true}}},addDummyCondition:function(e){var t=H.call(this);var i=A.call(this);var a=i.name;var o=n.createCondition(a,i.valueDefaults?i.valueDefaults:[],undefined,undefined,p.NotValidated);if(i.valueTypes[0]&&i.valueTypes[0]!==s.ValueType.Static){o.isInitial=true}r.updateConditionValues(o);r.checkConditionsEmpty(o,t);var l=this.getConditions();if(e!==undefined){l.splice(e,0,o)}else{l.push(o)}this.setProperty("conditions",l,true);if(!o.isInitial){this.fireConditionProcessed()}},updateDefineConditions:function(){var e=this.getConditions().filter(function(e){var t=r.getOperator(e.operator);return e.validated!==p.Validated||t.exclude});Q.call(this,e,true,false);if(e.length===0){this.addDummyCondition()}},onChange:function(e){var t=e&&e.getParameter("promise");var i=e&&e.getSource();var a=function(e){var t=H.call(this);var i=this.getConditions();r.checkConditionsEmpty(i,t);r.updateConditionsValues(i,t);if(e){i.forEach(function(e){if(!e.isEmpty){delete e.isInitial}})}this.setProperty("conditions",i,true)}.bind(this);if(t){t.then(function(e){this._bPendingChange=false;a({mParameters:{value:e}});if(this._bPendingValidateCondition){ue.call(this,i);delete this._bPendingValidateCondition}}.bind(this)).catch(function(e){this._bPendingChange=false;if(this._bPendingValidateCondition){ue.call(this,i);delete this._bPendingValidateCondition}}.bind(this));this._bPendingChange=true;return}else{a()}},onSelectChange:function(e){var t=e.getSource();var i=e.getParameter("promise");i.then(function(e){var i=t._sOldKey;var n=r.getOperator(e);var o=i&&r.getOperator(i);var l=t.getBindingContext("$this").getObject();var d=this.getConditions();var u=r.indexOfCondition(l,d);if(u>=0){l=d[u]}if(n&&o){var p=false;if(!a(n.valueTypes[0],o.valueTypes[0])&&n.valueTypes[0]!==s.ValueType.Static){if(u>=0){l.values.forEach(function(e,t){if(e!==null){if(n.valueTypes[t]===s.ValueType.Self&&o.valueTypes[t]===s.ValueType.SelfNoParse||n.valueTypes[t]===s.ValueType.SelfNoParse&&o.valueTypes[t]===s.ValueType.Self){var i=k.call(this,n.name,t);var a=k.call(this,o.name,t);var r=a.formatValue(l.values[t],"string");var d=i.parseValue(r,"string");if(d!==l.values[t]){l.values[t]=i.parseValue(r,"string");p=true}}else{l.values[t]=null;p=true}}}.bind(this))}}if(u>=0&&n.valueDefaults){l.values.forEach(function(e,t){if(l.isInitial&&e!==n.valueDefaults[t]||e===null){l.values[t]=n.valueDefaults[t];l.isInitial=true;p=true}})}if(!n.valueTypes[1]&&o.valueTypes[1]){if(u>=0){if(l.values.length>1&&l.values[1]){l.values=l.values.slice(0,1);p=true}}}if(l.invalid){delete l.invalid;p=true}if(p){r.checkConditionsEmpty(l,H.call(this));this.setProperty("conditions",d,true);pe.call(this,false)}}delete t._sOldKey}.bind(this)).catch(function(e){var i=t.getBindingContext("$this").getObject();var a=this.getConditions();var n=r.indexOfCondition(i,a);if(n>=0){i=a[n]}i.invalid=true;this.setProperty("conditions",a,true);t._sOldKey=t.getValue();pe.call(this,true)}.bind(this))},onPaste:function(e){var t;var a=e.srcControl;var n=this.getFormatOptions();var s=n.hasOwnProperty("maxConditions")?n.maxConditions:-1;var l=a.getBindingContext("$condition").getPath();var u=parseInt(l.split("/")[2]);if(window.clipboardData){t=window.clipboardData.getData("Text")}else{t=e.originalEvent.clipboardData.getData("text/plain")}var p=t.split(/\r\n|\r|\n/g);if(p&&p.length>1){setTimeout(function(){var e=i({},this.getFormatOptions());delete e.fieldHelpID;delete e.conditionModelName;e.maxConditions=1;e.display=d.Value;var t=new o(e);var n=p.length;var l=this.getConditions();for(var h=0;h<n;h++){if(p[h]){var f=p[h].trim();var v=f.split(/\t/g);if(v.length==2&&v[0]&&v[1]){var g=r.getOperator("BT");f=g.tokenFormat;for(var c=0;c<2;c++){f=f.replace(new RegExp("\\{"+c+"\\}","g"),v[c])}}try{var y=t.parseValue(f,"string");t.validateValue(y);if(l.length>u){l.splice(u,1,y)}else{l.push(y)}u++}catch(e){V.error("Paste handling","the pasted value '"+f+"' could not be handled! "+e.message)}}}if(s>=0&&l.length>s){l.splice(s,l.length-s)}if(a.setDOMValue){a.setDOMValue("")}r.checkConditionsEmpty(l);this.setProperty("conditions",l,true);this.fireConditionProcessed()}.bind(this),0)}},cleanUp:function(){var e=this.byId("conditions");var t=e.getContent();for(var i=0;i<t.length;i++){var a=t[i];if(a instanceof h&&a.hasOwnProperty("_iValueIndex")){if(a._bParseError){a.setValue()}}}this.setProperty("inputOK",true,true)}});function L(e){if(e.name==="value"){B.call(this,e.object,e.current,e.old)}if(e.name==="formatOptions"){var t=this.getConditions();var i=e.current&&e.current.operators;var n=e.old&&e.old.operators;var r=false;if(!a(i,n)){r=true;X.call(this)}var s=e.current&&e.current.valueType&&e.current.valueType.getMetadata().getName();var o=e.old&&e.old.valueType&&e.old.valueType.getMetadata().getName();if(s!==o&&t.length>0){if(!r){X.call(this)}this._bUpdateType=true;Z.call(this);this._bUpdateType=false;Q.call(this,t,true,true)}}if(e.name==="conditions"){if(this._sConditionsTimer){clearTimeout(this._sConditionsTimer);this._sConditionsTimer=null}this._sConditionsTimer=setTimeout(function(){this._sConditionsTimer=null;this.updateDefineConditions();Z.call(this)}.bind(this),0)}}function B(e,t,i){e._sOldKey=i;var a=0;if(t&&i){var n=r.getOperator(t);var s=r.getOperator(i);var o=e.getParent();var l;var d;a=o.indexOfContent(e);l=o.getContent()[a+2];if(l&&l.hasOwnProperty("_iValueIndex")&&l._iValueIndex===0){if(l instanceof h&&!l._bParseError){l.setValueState(N.None);l.setValueStateText()}d=o.getContent()[a+3];if(d&&d.hasOwnProperty("_iValueIndex")&&d._iValueIndex===1){if(d instanceof h&&!d._bParseError){d.setValueState(N.None);d.setValueStateText()}}else{d=undefined}}else{l=undefined}if(F.length===0||F.indexOf(t)>=0){var u=this.getFieldHelp();l&&l.setFieldHelp&&l.setFieldHelp(u);d&&d.setFieldHelp&&d.setFieldHelp(u)}else{l&&l.setFieldHelp&&l.setFieldHelp();d&&d.setFieldHelp&&d.setFieldHelp()}if(n.createControl||s.createControl){if(l){l.destroy()}if(d){d.destroy()}}else{if(l&&n.valueTypes[0]!==s.valueTypes[0]){l.unbindProperty("value")}if(d&&n.valueTypes[1]!==s.valueTypes[1]&&s.valueTypes[1]){d.unbindProperty("value")}}}if(!t){var p=e.getBindingContext("$this").getObject();if(p){var f=this.getConditions();a=r.indexOfCondition(p,f);if(a>=0){p=f[a];p.operator=i;this.setProperty("conditions",f,true)}}}var v=this.oOperatorModel.getData();var g;for(var c=0;c<v.length;c++){var y=v[c];if(y.key===t){g=y.text;break}}e.setAdditionalValue(g);this.onChange()}function j(e,t,i,a){var n=r.getOperator(e.operator);if(!n||!n.valueTypes[t]){return null}var s=k.call(this,n.name,t);var o=this._oManagedObjectModel.getContext(a.getPath()+"values/"+t+"/");var l;if(n.createControl){l=n.createControl(s,"$this>",t,i)}if(!l){l=new h(i,{delegate:q.call(this),value:{path:"$this>",type:s,mode:"TwoWay",targetType:"raw"},editMode:{parts:[{path:"$condition>operator"},{path:"$condition>invalid"}],formatter:ie},multipleLines:false,width:"100%",fieldHelp:F.length===0||F.indexOf(e.operator)>=0?this.getFieldHelp():null})}if(l.getMetadata().hasProperty("placeholder")){if(t===0){l.bindProperty("placeholder",{path:"$condition>operator",formatter:se})}else{l.bindProperty("placeholder",{path:"$condition>operator",formatter:oe})}}l._iValueIndex=t;if(l.attachChange){l.attachChange(this.onChange.bind(this))}l.onpaste=this.onPaste.bind(this);l.setLayoutData(new I({span:{parts:[{path:"$condition>"},{path:"$this>/formatOptions"}],formatter:re.bind(this)}}));l.setBindingContext(o,"$this");l.setBindingContext(a,"$condition");l.setFieldGroupIds([a.getPath()]);return l}function k(e,t){var i=G.call(this);var a=r.getOperator(e);if(a.valueTypes[t]&&[s.ValueType.Self,s.ValueType.Static].indexOf(a.valueTypes[t])===-1){i=a._createLocalType(a.valueTypes[t],i)}var n=false;if(a.valueTypes[t]===s.ValueType.Static){n=true;i=K.call(this)}var o=n?u.String:W.call(this,i);var l;switch(o){case u.Numeric:var d=i.getFormatOptions();if(d&&d.hasOwnProperty("emptyString")&&d.emptyString===null){l=i}else{l=R(i,{emptyString:null})}break;case u.Date:case u.Time:case u.DateTime:l=i;break;default:if(i.getConstraints()&&i.getConstraints().hasOwnProperty("nullable")&&i.getConstraints().nullable===false){l=R(i);if(i._bCreatedByOperator){l=a._createLocalType(a.valueTypes[t],i)}}else{l=i}break}return l}function R(e,t,a){var n=sap.ui.require(e.getMetadata().getName().replace(/\./g,"/"));var r=i(e.getFormatOptions(),t||{});var s=i(e.getConstraints(),a||{});if(s.hasOwnProperty("nullable")&&s.nullable===false){s.nullable=true}return new n(r,s)}function A(){var e=H.call(this);var t;var i=this.getFormatOptions().defaultOperatorName;if(i){t=r.getOperator(i)}else{var a=G.call(this);var n=W.call(this,a);t=r.getDefaultOperator(n)}if(t&&e.indexOf(t.name)<0){for(var s=0;s<e.length;s++){t=r.getOperator(e[s]);if(!t||t.exclude||!t.hasRequiredValues()){t=undefined}else{break}}}if(!t){t=r.getOperator(e[0])}return t}function H(){var e=this.getFormatOptions();var t=e&&e.operators;if(!t||t.length===0){t=r.getOperatorsForType(u.String)}return t}function U(){var e;var t=H.call(this);for(var i=0;i<t.length;i++){var a=t[i];var n=r.getOperator(a);if(!e){e=n.group.id}else if(e!==n.group.id){return true}}return false}function X(){if(!this.oOperatorModel){return}var e=G.call(this);var t=H.call(this);var i=[];var a=U.call(this);var n=this.getId()+"--rowSelect-help-pop-fl";var s=sap.ui.getCore().byId(n);var o;if(a){o=new c({key:"{om>key}",text:"{om>text}",additionalText:"{om>additionalText}",groupKey:"{om>groupId}",groupText:"{om>groupText}"})}else{o=new c({key:"{om>key}",text:"{om>text}",additionalText:"{om>additionalText}"})}s.bindAggregation("items",{path:"om>/",templateShareable:false,template:o});s.setGroupable(a);for(var l=0;l<t.length;l++){var d=t[l];var u=r.getOperator(d);if(!u||u.showInSuggest!==undefined&&u.showInSuggest==false){continue}var p=u.textKey||"operators."+u.name+".longText";var h=u.getTypeText(p,W.call(this,e).toLowerCase());if(h===p){h=u.longText}var f=u.additionalInfo;if(f===undefined){if(f!==""&&u.formatRange){f=u.formatRange(u._getRange(undefined,e),e)}else if(!a){f=u.group.text}}i.push({key:u.name,text:h,additionalText:f,groupId:u.group.id,groupText:u.group.text})}this.oOperatorModel.setData(i)}function G(){var e=this.getFormatOptions();var t=e&&e.valueType;if(!t){t=K.call(this)}return t}function K(){if(!this._oDefaultType){this._oDefaultType=new O}return this._oDefaultType}function W(e){var t=e.getMetadata().getName();var i=e.getFormatOptions();var a=e.getConstraints();var n=this.getFormatOptions().delegate;var r=this.getFormatOptions().payload;var s=n?n.getTypeUtil(r).getBaseType(t,i,a):u.String;if(s===u.Unit){s=u.Numeric}return s}function q(){var e=this.getFormatOptions();var t=e.delegateName||"sap/ui/mdc/field/FieldBaseDelegate";var i=e.payload;return{name:t,payload:i}}function Q(e,t,i){var a=G.call(this);var n=[];var o=0;for(o=0;o<e.length;o++){var l=e[o];var d=r.getOperator(l.operator);if(d&&d.valueTypes[0]===s.ValueType.Static&&(l.values.length===0||i)){if(d.getStaticText){var u=d.getStaticText(a,W.call(this,a));if(l.values.length>0){l.values[0]=u}else{l.values.push(u)}n.push(o)}}}if(n.length>0){this.setProperty("conditions",e,true)}}function z(){var e=new T(this.getId()+"--ivtOperator",{text:"{$i18n>valuehelp.DEFINECONDITIONS_OPERATORLABEL}"});var t=new S({headerText:"{$this>/label}",expanded:true,height:"100%",backgroundDesign:"Transparent"}).addStyleClass("sapMdcDefineconditionPanel");t.addDependent(new f(this.getId()+"--rowSelect-help",{typeahead:new v(this.getId()+"--rowSelect-help-pop",{content:[new g(this.getId()+"--rowSelect-help-pop-fl",{filterList:false,useFirstMatch:true})]})}));var i=new x(this.getId()+"--conditions",{width:"100%",hSpacing:0,vSpacing:0,containerQuery:true}).addStyleClass("sapUiMdcDefineConditionGrid");te.call(this,undefined,i,0,null,0);t.addContent(e);t.addContent(i);this._oInvisibleAddOperatorButtonText=new T({text:M.getText("valuehelp.DEFINECONDITIONS_ADDCONDITION_DESCRIPTION")});t.addContent(this._oInvisibleAddOperatorButtonText);var a=new P(this.getId()+"--addBtn",{press:this.addCondition.bind(this),type:w.Default,text:"{$i18n>valuehelp.DEFINECONDITIONS_ADDCONDITION}",layoutData:new I({span:"XL2 L3 M3 S3",indent:"XL9 L8 M8 S7",linebreak:true,visibleS:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:J.bind(this)},visibleM:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:J.bind(this)},visibleL:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:J.bind(this)},visibleXL:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:J.bind(this)}}),ariaDescribedBy:this._oInvisibleAddOperatorButtonText});i.addContent(a);i.attachValidateFieldGroup(de,this);this.setAggregation("_content",t)}function J(e,t){var i=t.hasOwnProperty("maxConditions")?t.maxConditions:-1;return i===-1||e.length<i}function Y(e,t){var i=t.hasOwnProperty("maxConditions")?t.maxConditions:-1;return i!==1}function Z(){var e=this.getConditions();var t=this.byId("conditions");var i;var a=-1;var n=0;for(var s=0;s<e.length;s++){var o=e[s];var l=r.getOperator(o.operator);if(o.validated!==p.Validated||l.exclude){var d=this._oManagedObjectModel.getContext("/conditions/"+s+"/");a++;if(!this.oOperatorModel){this.oOperatorModel=new m;this.setModel(this.oOperatorModel,"om");X.call(this)}i=t.getContent();if(i[n]&&i[n].isA("sap.ui.mdc.Field")){n=le.call(this,o,t,n,d,a)}else{n=te.call(this,o,t,n,d,a)}}}i=t.getContent();while(i[n]&&i[n]!==this.byId("addBtn")){i[n].destroy();n++}if(this._bFocusLastCondition){i[0].focus();this._bFocusLastCondition=false}if(this._bFocusLastRemoveBtn){n=ee.call(this,["-removeBtnLarge","-removeBtnSmall"]);i[n].focus();this._bFocusLastRemoveBtn=false}}function ee(e){var t=this.byId("conditions");var i=t.getContent();var a=i.length-1;if(!Array.isArray(e)){e=[e]}var n=0;var r=e[n];while(a>=0&&r!==undefined){var s=i[a];if(s.getId().endsWith(r)){var o=jQuery(s.getDomRef());if(o.is(":visible")){return a}else{n++;r=e[n]}}a--}return 0}function te(e,t,i,a,n){var r=this.getId()+"--"+n;if(!this._oOperatorFieldType){this._oOperatorFieldType=new O({},{minLength:1})}var s=new h(r+"-operator",{value:{path:"$this>operator",type:this._oOperatorFieldType},width:"100%",display:d.Description,editMode:l.Editable,multipleLines:false,fieldHelp:this.getId()+"--rowSelect-help",change:this.onSelectChange.bind(this),ariaLabelledBy:this.getId()+"--ivtOperator"}).setLayoutData(new I({span:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:ne.bind(this)},linebreak:true})).setBindingContext(a,"$this");if(a){s.setFieldGroupIds([a.getPath()])}this._oObserver.observe(s,{properties:["value"]});t.insertContent(s,i);i++;var o=new P(r+"--removeBtnSmall",{press:this.removeCondition.bind(this),type:w.Transparent,icon:"sap-icon://decline",tooltip:"{$i18n>valuehelp.DEFINECONDITIONS_REMOVECONDITION}"}).setLayoutData(new I({span:"XL1 L1 M1 S2",indent:{path:"$this>operator",formatter:ae},visibleS:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:Y.bind(this)},visibleM:false,visibleL:false,visibleXL:false})).setBindingContext(a,"$this");if(a){o.setFieldGroupIds([a.getPath()])}t.insertContent(o,i);i++;if(e){for(var u=0;u<e.values.length;u++){var p=j.call(this,e,u,r+"-values"+u,a);if(p){t.insertContent(p,i);i++}}}var f=new P(r+"--removeBtnLarge",{press:this.removeCondition.bind(this),type:w.Transparent,icon:"sap-icon://decline",tooltip:"{$i18n>valuehelp.DEFINECONDITIONS_REMOVECONDITION}"}).setLayoutData(new I({span:"XL1 L1 M1 S1",indent:{path:"$this>operator",formatter:ae},visibleS:false,visibleM:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:Y.bind(this)},visibleL:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:Y.bind(this)},visibleXL:{parts:[{path:"$this>/conditions"},{path:"$this>/formatOptions"}],formatter:Y.bind(this)}})).setBindingContext(a,"$this");t.insertContent(f,i);i++;return i}function ie(e,t){if(!e){return l.Display}else if(t){return l.ReadOnly}var i=r.getOperator(e);var a=false;if(i&&i.valueTypes[0]===s.ValueType.Static){a=true}return a?l.Display:l.Editable}function ae(e){var t=e&&r.getOperator(e);if(!t||!t.valueTypes[0]||t.valueTypes[0]===s.ValueType.Static&&!t.getStaticText){return"XL8 L8 M8 S0"}else{return""}}function ne(e,t){var i=t.hasOwnProperty("maxConditions")?t.maxConditions:-1;var a="XL3 L3 M3 ";if(i===1){a+="S12"}else{a+="S10"}return a}function re(e,t){var i=t.hasOwnProperty("maxConditions")?t.maxConditions:-1;var a=e&&r.getOperator(e.operator);var n="";if(a&&a.valueTypes[1]){n="XL4 L4 M4 "}else{n="XL8 L8 M8 "}if(i===1){n+="S12"}else{n+="S10"}return n}function se(e){var t=e&&r.getOperator(e);if(t&&t.aLabels){return t.aLabels[0]}else if(t&&t.valueTypes[1]){return M.getText("valuehelp.DEFINECONDITIONS_FROM")}else{return M.getText("valuehelp.DEFINECONDITIONS_VALUE")}}function oe(e){var t=e&&r.getOperator(e);if(t&&t.aLabels){return t.aLabels[1]}else if(t&&t.valueTypes[1]){return M.getText("valuehelp.DEFINECONDITIONS_TO")}}function le(e,t,i,a,n){var r=this.getId()+"--"+n;var s=t.getContent();var o;var l=s[i];l.setBindingContext(a,"$this");if(a){l.setFieldGroupIds([a.getPath()])}if(l.getValueState()===N.Error&&!e.invalid){l.setValue(l.getValue())}i++;var d=s[i];d.setBindingContext(a,"$this");if(a){d.setFieldGroupIds([a.getPath()])}i++;var u;var p=s[i];var h;if(p.hasOwnProperty("_iValueIndex")&&p._iValueIndex===0){if(e.values.length>0){u=this._oManagedObjectModel.getContext(a.getPath()+"values/0/");p.setBindingContext(u,"$this");p.setBindingContext(a,"$condition");if(p.getMetadata().hasProperty("value")&&(this._bUpdateType||!p.getBindingInfo("value"))){o=k.call(this,e.operator,0);p.bindProperty("value",{path:"$this>",type:o})}i++;h=s[i];if(h.hasOwnProperty("_iValueIndex")&&h._iValueIndex===1){if(e.values.length>1){u=this._oManagedObjectModel.getContext(a.getPath()+"values/1/");h.setBindingContext(u,"$this");if(h.getMetadata().hasProperty("value")&&(this._bUpdateType||!h.getBindingInfo("value"))){o=k.call(this,e.operator,1);h.bindProperty("value",{path:"$this>",type:o})}i++}else{h.destroy()}}else if(e.values.length>1){h=j.call(this,e,1,r+"-values1",a);if(h){t.insertContent(h,i);i++}}}else{p.destroy();p=undefined;h=s[i+1];if(h&&h.hasOwnProperty("_iValueIndex")&&h._iValueIndex===1){h.destroy()}}}else if(e.values.length>0){for(var f=0;f<e.values.length;f++){var v=j.call(this,e,f,r+"-values"+f,a);if(v){t.insertContent(v,i);i++}}}s=t.getContent();var g=s[i];g.setBindingContext(a,"$this");i++;return i}function de(e){if(this._bPendingChange){this._bPendingValidateCondition=true;return}var t=e.getSource();while(!(t.getParent()instanceof x)){t=t.getParent()}ue.call(this,t)}function ue(e){var t=e.getParent();var i=t.indexOfContent(e);var a;if(e.getId().endsWith("-operator")){a=e.getBindingContext("$this");i=i+2;e=t.getContent()[i]}else if(e.getId().endsWith("-removeBtnSmall")){a=e.getBindingContext("$this");i=i+1;e=t.getContent()[i]}else{a=e.getBindingContext("$condition")}var n;var o=a.getObject();var l=r.getOperator(o.operator);var d=!!o.invalid;if(!d&&l.valueTypes.length>0&&l.valueTypes[0]!==s.ValueType.Static){if(l.valueTypes.length>1&&l.valueTypes[1]){if(e.hasOwnProperty("_iValueIndex")&&e._iValueIndex===0){n=t.getContent()[i+1]}else if(e.hasOwnProperty("_iValueIndex")&&e._iValueIndex===1){n=t.getContent()[i-1]}}if(e.getMetadata().getAllProperties().valueState&&!e._bParseError&&(!n||!n._bParseError)){var u=e.getBinding("value").getType();try{l.validate(o.values,u);e.setValueState(N.None);e.setValueStateText();if(n&&n.getMetadata().getAllProperties().valueState){n.setValueState(N.None);n.setValueStateText()}}catch(t){d=true;e.setValueState(N.Error);e.setValueStateText(t.message);if(n&&n.getMetadata().getAllProperties().valueState){n.setValueState(N.Error);n.setValueStateText(t.message)}}}}pe.call(this,d);this.fireConditionProcessed()}function pe(e){var t=0;if(e!==true){var i=this.getConditions();for(t=0;t<i.length;t++){if(i[t].invalid){e=true;break}}}if(e!==true){var a=this.byId("conditions");var n=a.getContent();e=false;for(t=0;t<n.length;t++){var r=n[t];if(r.hasOwnProperty("_iValueIndex")&&r.getValueState&&r.getValueState()===N.Error){e=true;break}}}this.setProperty("inputOK",!e,true)}return E});
//# sourceMappingURL=DefineConditionPanel.js.map
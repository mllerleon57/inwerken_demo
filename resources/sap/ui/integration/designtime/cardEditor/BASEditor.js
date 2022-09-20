/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_CancelablePromise","sap/base/util/restricted/_isEqual","sap/base/util/restricted/_omit","sap/base/util/merge","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/ObjectPath","./CardEditor","sap/ui/integration/designtime/baseEditor/BaseEditor","sap/ui/integration/Designtime","sap/ui/integration/util/CardMerger","sap/base/util/LoaderExtensions","sap/base/Log"],function(e,t,i,a,n,s,r,o,f,l,g,p,u){"use strict";var m="";m=p.loadResource("sap/ui/integration/designtime/cardEditor/ConfigurationTemplate.js",{dataType:"text",failOnError:false,async:false});var h=o.extend("sap.ui.integration.designtime.cardEditor.BASEditor",{metadata:{library:"sap.ui.integration",events:{configurationChange:{},createConfiguration:{},error:{},designtimeInited:{}}},renderer:o.getMetadata().getRenderer()});h.prototype.getManifest=function(){return this._oCurrent.manifest};h.prototype.getConfigurationClass=function(){return this._oCurrent.configurationclass};h.prototype.getConfiguration=function(){return this._oCurrent.configuration};h.prototype.getConfigurationString=function(){return this._oCurrent.configurationstring};h.prototype._generateDesigntimeJSConfig=function(){var e=this._formatExportedDesigntimeMetadata(this.getDesigntimeMetadata());var i=this.getJson();if(this._eventTimeout){clearTimeout(this._eventTimeout);this._eventTimeout=null}this._eventTimeout=setTimeout(function(){var n={form:{items:{}}};var o=a(n,this._oDesigntimeJSConfig);var f={};var g=[];var p;if(!r.get(["sap.card","configuration"],i)){r.set(["sap.card","configuration"],{parameters:{}},i)}else if(!r.get(["sap.card","configuration","parameters"],i)){r.set(["sap.card","configuration","parameters"],{},i)}var u=r.get(["sap.card","configuration","parameters"],i);var m={};var h={};if(i){var c=r.get(["sap.card","configuration","parameters"],this._oDesigntimeMetadataModel.getData());if(s(u,{})&&!c){this._oDesigntimeJSConfig.form.items={};this._oCurrent={configuration:this._cleanConfig(this._oDesigntimeJSConfig),manifest:this._cleanJson(),configurationclass:this._fnDesigntime,configurationstring:this._cleanConfig(this._oDesigntimeJSConfig,true)};this.fireConfigurationChange(this._oCurrent);return}var d=Object.keys(u);for(var v in o.form.items){p=a({},o.form.items[v]);if(!u[v]){if(c[v]){if(p.type==="group"||p.type==="separator"){u[v]={}}else if(p.manifestpath&&!p.manifestpath.startsWith("/sap.card/configuration/parameters")){var _=p.manifestpath;if(_.startsWith("/")){_=_.substring(1)}var y=r.get(_.split("/"),i)||"";u[v]={value:y}}}else{delete o.form.items[v];continue}}else if(p.manifestpath&&!p.manifestpath.startsWith("/sap.card/configuration/parameters")){var _=p.manifestpath;if(_.startsWith("/")){_=_.substring(1)}var C=_.split("/");var y=r.get(C,i);var b=r.get(C,this._oInitialJson);if(!t(y,b)){u[v].value=y}else{r.set(C,u[v].value,i)}}var D=d.indexOf(v);if(D>-1){d.splice(D,1)}if(u[v].visualization){m[v]=u[v].visualization}if(u[v].values){h[v]=u[v].values}o.form.items[v]=a(p,u[v]);if(!c[v].__value.visualization){delete o.form.items[v].visualization}else if(m[v]){o.form.items[v].visualization=m[v];delete m[v]}if(!c[v].__value.values){delete o.form.items[v].values}else if(h[v]){o.form.items[v].values=h[v];delete h[v]}if(p.type==="group"||p.type==="separator"){delete o.form.items[v].manifestpath}else if(!o.form.items[v].manifestpath){c[v].manifestpath="/sap.card/configuration/parameters/"+v+"/value";c[v].__value.manifestpath="/sap.card/configuration/parameters/"+v+"/value";o.form.items[v].manifestpath="/sap.card/configuration/parameters/"+v+"/value"}}if(d.length>0){for(var J=0;J<d.length;J++){var S=d[J];var I=u[S];var E="string";if(I.type){E=I.type}else if(c[S]&&c[S].__value){E=c[S].__value.type}o.form.items[S]={manifestpath:"/sap.card/configuration/parameters/"+S+"/value",type:E,label:I.label,translatable:false,editable:I.editable,visible:I.visible}}u[S]=a(o.form.items[S],u[S])}}if(e){if(o){for(var v in e){var z=e[v];var M=v.substring(v.lastIndexOf("/")+1);if(!v.startsWith("sap.card/configuration/parameters")){continue}var j=o.form.items[M]||{};if(j.visualization){m[v]=j.visualization}if(j.values){h[v]=j.values}p=a(j,u[M]);if(z.hasOwnProperty("label")){p.label=z.label}if(z.hasOwnProperty("position")){p.position=z.position}if(p.editable==="false"){p.editable=false}else if(p.editable==="true"){p.editable=false}if(p.visible==="false"){p.visible=false}else if(p.visible==="true"){p.visible=false}if(p.type==="group"||p.type==="separator"){delete p.manifestpath}if(m[M]){p.visualization=m[M];delete m[M]}if(h[M]){p.values=h[M];delete h[M]}p.__key=M;g[p.position]=p}for(var J=0;J<g.length;J++){p=g[J];if(!p){continue}f[p.__key]=p;delete p.__key;delete p.position}o.form.items=f}}this._oDesigntimeJSConfig=o;var T=this._cleanConfig(this._oDesigntimeJSConfig);this._fnDesigntime=function(e){return new l(e)}.bind(this,T);this._oCurrent={configuration:T,manifest:this._cleanJson(i),configurationclass:this._fnDesigntime,configurationstring:this._cleanConfig(this._oDesigntimeJSConfig,true)};this._oDataModel.setData(this._prepareData(i));this.fireConfigurationChange(this._oCurrent);this._oInitialJson=i}.bind(this),500)};h.prototype.init=function(){o.prototype.init.apply(this,arguments);this._oCurrent={configuration:null,manifest:null,configurationclass:null}};h.prototype._applyDefaultValue=function(e){if(e.value===undefined||e.value===null){switch(e.type){case"boolean":e.value=false;break;case"integer":case"number":e.value=0;break;case"string[]":e.value=[];break;default:e.value=""}}};h.prototype.getJson=function(e){if(e===true){return this._cleanJson()}else{return f.prototype.getJson.apply(this,arguments)}};h.prototype._cleanJson=function(e,t){e=e||this.getJson();var i=d(r.get(["sap.card","configuration","editor"],e)||"");if(i===""){i=d(r.get(["sap.card","designtime"],e)||"")}if(!i){r.set(["sap.card","designtime"],"sap/ui/integration/designtime/cardEditor/ConfigurationTemplate",e)}e=n(e);var t=t!==false;if(t){var a=r.get(["sap.card","configuration","parameters"],e);for(var s in a){var o=a[s];if(o&&(o.type==="group"||o.type==="separator")){delete a[s];continue}if(this._oDesigntimeJSConfig&&this._oDesigntimeJSConfig.form&&this._oDesigntimeJSConfig.form.items){var f=this._oDesigntimeJSConfig.form.items[s]||{};if(f.type==="group"||f.type==="separator"){delete a[s];continue}if(f.manifestpath&&!f.manifestpath.startsWith("/sap.card/configuration/parameters")){var l=f.manifestpath;if(l.startsWith("/")){l=l.substring(1)}if(f.type==="simpleicon"){f.type="string"}if(f.type==="string[]"){f.type="array"}r.set(l.split("/"),f.value,e);delete a[s];continue}}a[s]={value:a[s].value}}}if(this._i18n){r.set(["sap.app","i18n"],this._i18n,e)}return e};h.prototype._cleanConfig=function(e,t){var e=a({},e);for(var i in e.form.items){var n=e.form.items[i];if(n.type==="simpleicon"){if(!n.visualization){n.visualization={type:"IconSelect",settings:{value:"{currentSettings>value}",editable:"{currentSettings>editable}"}}}n.type="string"}if(n.type==="array"){n.type="string[]"}if(n.type==="objectArray"){n.type="object[]"}if(n.type!=="string[]"&&n.type!="string"&&n.type!=="object[]"&&n.type!="object"){delete n.values}delete n.value}if(t){var s=JSON.stringify(e,null,"\t");s=s.replace(/\"\$\$([a-zA-Z]*)\$\$\"/g,function(e){return e.substring(3,e.length-3)});return s}return e};h.prototype._generateMetadataFromJSConfig=function(e){var t={};if(e){this._oDesigntimeJSConfig=a(this._oDesigntimeJSConfig,e)}if(this._oDesigntimeJSConfig){var i=this._oDesigntimeJSConfig.form.items;var n=0;for(var s in i){var o="sap.card/configuration/parameters/"+s,f=o.split("/"),l;t[o]=a({},i[s]);l=t[o];l.position=n++;if(l.visualization){if(l.visualization.type==="IconSelect"){l.type="simpleicon"}}if(l.type==="string[]"){l.type="array"}if(l.manifestpath&&(!l.manifestpath.startsWith("/sap.card/configuration/parameters/")||!r.get(f,this._oInitialJson))){r.set(f,l,this._oInitialJson)}if(!l.hasOwnProperty("type")){this.fireError({name:"Designtime Error",detail:{message:"Type of parameter "+s+" not exist"}})}else if(l.type===""){this.fireError({name:"Designtime Error",detail:{message:"Type of parameter "+s+" is Invalid"}})}if(l.type!=="group"&&l.type!=="separator"){if(!l.hasOwnProperty("value")){var g=l.manifestpath.substring(1).split("/"),p=r.get(g,this._oInitialJson);if(p!==undefined){l.value=p}else{this._applyDefaultValue(l)}}else{this._applyDefaultValue(l)}if(r.get(f,this._oInitialJson)){if(r.get(f,this._oInitialJson).value===undefined){r.get(f,this._oInitialJson).value=l.value}}}}}return t};h.prototype.setJson=function(t){if(!this._i18n){this._i18n=r.get(["sap.app","i18n"],t)}f.prototype.setJson.apply(this,arguments);if(!this.__generateDesigntimeJSConfigAttached){this.attachDesigntimeMetadataChange(this._generateDesigntimeJSConfig.bind(this));this.attachJsonChange(this._generateDesigntimeJSConfig.bind(this));this.__generateDesigntimeJSConfigAttached=true}var t=this.getJson();var i=r.get(["sap.app","id"],t);if(this._bDesigntimeInit&&this._bCardId!==i){if(this._oDesigntimePromise){this._oDesigntimePromise.cancel()}delete this._bCardId;delete this._bDesigntimeInit}if(!this._bDesigntimeInit){this.setPreventInitialization(true);this._bCardId=i;var a;var n=d(r.get(["sap.card","configuration","editor"],t)||"");if(n===""){n=d(r.get(["sap.card","designtime"],t)||"")}if(!n){var s=m;r.set(["sap.card","designtime"],"sap/ui/integration/designtime/cardEditor/ConfigurationTemplate",t);a="sap/ui/integration/designtime/cardEditor/ConfigurationTemplate";this.fireCreateConfiguration({file:"sap/ui/integration/designtime/cardEditor/ConfigurationTemplate.js",content:s,manifest:this._cleanJson(t,false)});return}var o=d(this.getBaseUrl()||""),l={},p=null,h=null,_=null,y=null;if(n&&n.indexOf("cardEditor/ConfigurationTemplate")>0){a=n;h=v(n);_=i.replace(/\./g,"/")+"/"+h;l[_]=h;l[_+"js"]=h.substring(0,h.lastIndexOf("/"));y=h.replace(l[_+"js"]+"/","")}else if(o&&n){p=d(o);h=v(n);var C=p+"/"+h;_=i.replace(/\./g,"/")+"/"+h;l[_]=C;l[_+"js"]=C.substring(0,C.lastIndexOf("/"));y=C.replace(l[_+"js"]+"/","")}if(o&&n){sap.ui.loader.config({paths:l});var b=this;this._oDesigntimePromise=new e(function(e){var t=_+"js"+"/"+y+".js";if(a){t=a+".js"}sap.ui.loader._.loadJSResourceAsync(t).then(function(t){if(!t){b.fireError({name:"Designtime Error",detail:{message:"Invalid file format"}})}else if(t){var i=new t;b._oDesigntimeJSConfig=i.getSettings();b._fnDesigntime=t;var a=b._generateMetadataFromJSConfig();t=i.getMetadata().getClass();e(a)}}).catch(function(e){u.error(e);b.fireError({name:"Designtime Error",detail:e})})});this._oDesigntimePromise.then(function(e){this.setPreventInitialization(false);var t=e;t=g.mergeCardDesigntimeMetadata(t,this.getDesigntimeChanges());this._oInitialDesigntimeMetadata=t;this.setDesigntimeMetadata(c(t),true);this._bDesigntimeInit=true;this.fireDesigntimeInited()}.bind(this))}else{this.setPreventInitialization(false)}}};h.prototype.initialize=function(){if(!this._bDesigntimeInit){this.attachEventOnce("designtimeInited",this.initialize);return}if(!this._bPreventInitialization){this._initialize()}};h.prototype.getConfigurationTemplate=function(){return m};h.prototype.updateDesigntimeMetadata=function(e,t){var i=this._generateMetadataFromJSConfig(e);this._oInitialDesigntimeMetadata=i;this.setDesigntimeMetadata(c(i),t)};h.prototype.setDestinations=function(e){if(Array.isArray(e)&&e.length>0){var t=this.getConfig();if(!t.properties){t.properties={destinations:{}}}else if(!t.properties.destinations){t.properties.destinations={}}t.properties.destinations.allowedValues=e;this.setConfig(t)}};function c(e){var t={};Object.keys(e).forEach(function(i){r.set(i.split("/"),{__value:n(e[i])},t)});return t}function d(e){return e.trim().replace(/\/*$/,"")}function v(e){return e.replace(/^\.\//,"")}return h});
//# sourceMappingURL=BASEditor.js.map
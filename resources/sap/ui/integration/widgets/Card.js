/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CardRenderer","../cards/Footer","../controls/ActionsToolbar","sap/ui/base/Interface","sap/ui/thirdparty/jquery","sap/ui/core/Core","sap/ui/integration/util/Manifest","sap/ui/integration/util/ServiceManager","sap/base/Log","sap/base/util/merge","sap/base/util/deepEqual","sap/base/util/each","sap/ui/integration/util/DataProviderFactory","sap/ui/model/json/JSONModel","sap/ui/integration/model/ObservableModel","sap/ui/model/resource/ResourceModel","sap/ui/integration/model/ContextModel","sap/base/util/LoaderExtensions","sap/f/CardBase","sap/f/library","sap/ui/integration/library","sap/ui/integration/util/Destinations","sap/ui/integration/util/LoadingProvider","sap/ui/integration/util/HeaderFactory","sap/ui/integration/util/ContentFactory","sap/ui/integration/util/BindingResolver","sap/ui/integration/formatters/IconFormatter","sap/ui/integration/cards/filters/FilterBarFactory","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/util/CardObserver","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/ui/integration/util/Utils","sap/ui/integration/util/ParameterMap","sap/ui/performance/Measurement","sap/m/HBox","sap/m/library"],function(t,e,i,a,jQuery,r,n,s,o,d,h,f,g,p,l,c,u,_,y,C,m,v,M,P,b,R,A,D,E,T,I,w,S,F,x,O,L,H){"use strict";var B={TYPE:"/sap.card/type",DATA:"/sap.card/data",HEADER:"/sap.card/header",HEADER_POSITION:"/sap.card/headerPosition",CONTENT:"/sap.card/content",FOOTER:"/sap.card/footer",SERVICES:"/sap.ui5/services",APP_TYPE:"/sap.app/type",PARAMS:"/sap.card/configuration/parameters",DESTINATIONS:"/sap.card/configuration/destinations",CSRF_TOKENS:"/sap.card/configuration/csrfTokens",FILTERS:"/sap.card/configuration/filters",ERROR_MESSAGES:"/sap.card/configuration/messages"};var N=["parameters","filters","paginator","form","messages","context","i18n"];var U=["visibleItems","allItems"];var k=C.cards.HeaderPosition;var W=m.CardArea;var V=m.CardDataMode;var j="Card is destroyed!";var q=H.FlexRendertype;var z=H.FlexJustifyContent;var J=H.FlexAlignItems;var Y="module:";function G(){if(performance&&performance.now){return"Start since page load: "+performance.now()}return""}var K=y.extend("sap.ui.integration.widgets.Card",{metadata:{library:"sap.ui.integration",properties:{referenceId:{type:"string",defaultValue:""},manifest:{type:"any",defaultValue:""},parameters:{type:"object",defaultValue:null},dataMode:{type:"sap.ui.integration.CardDataMode",group:"Behavior",defaultValue:V.Active},baseUrl:{type:"sap.ui.core.URI",defaultValue:null},manifestChanges:{type:"object[]"}},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true,forwarding:{getter:"_getActionsToolbar",aggregation:"actionDefinitions"}},_header:{type:"sap.f.cards.IHeader",multiple:false,visibility:"hidden"},_filterBar:{type:"sap.ui.integration.cards.filters.FilterBar",multiple:false,visibility:"hidden"},_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_footer:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_extension:{type:"sap.ui.integration.Extension",multiple:false,visibility:"hidden"},_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},events:{action:{allowPreventDefault:true,parameters:{actionSource:{type:"sap.ui.core.Control"},manifestParameters:{type:"object"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}},configurationChange:{parameters:{changes:{type:"object"}}},manifestReady:{},manifestApplied:{}},associations:{host:{},openerReference:{visibility:"hidden"}}},renderer:t});K.prototype.init=function(){y.prototype.init.call(this);this.setAggregation("_loadingProvider",new M);this._oIntegrationRb=r.getLibraryResourceBundle("sap.ui.integration");this._initModels();this._oContentFactory=new b(this);this._oCardObserver=new T(this);this._bFirstRendering=true;this._aFundamentalErrors=[];this._sPerformanceId="UI5 Integration Cards - "+this.getId()+"---";this._fnOnDataReady=function(){this._bDataReady=true}.bind(this);this._oLimitedInterface=new a(this,["getDomRef","setVisible","getParameters","getCombinedParameters","getManifestEntry","resolveDestination","request","refresh","refreshData","showMessage","getBaseUrl","getRuntimeUrl","getTranslatedText","getModel","triggerAction","addActionDefinition","removeActionDefinition","insertActionDefinition","getActionDefinition","indexOfActionDefinition","destroyActionDefinition","showLoadingPlaceholders","hideLoadingPlaceholders","showCard","hide","getOpener","validateControls"])};K.prototype._initModels=function(){this.setModel(new p);N.forEach(function(t){var e;switch(t){case"context":e=new u;break;case"i18n":e=new c({bundle:this._oIntegrationRb});break;case"parameters":e=new p(x.getParamsForModel());break;case"messages":e=new p({hasErrors:false,hasWarnings:false,records:[]});break;default:e=new p;break}this.setModel(e,t)}.bind(this))};K.prototype.clone=function(){var t=y.prototype.clone.apply(this,arguments);t._initModels();return t};K.prototype._initReadyState=function(){this._aReadyPromises=[];this._awaitEvent("_dataReady");this._awaitEvent("_dataPassedToContent");this._awaitEvent("_headerReady");this._awaitEvent("_filterBarReady");this._awaitEvent("_contentReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready")}.bind(this));this.attachEventOnce("_dataReady",this._fnOnDataReady)};K.prototype._clearReadyState=function(){this._bReady=false;this._bDataReady=false;this._aReadyPromises=[];this.detachEvent("_dataReady",this._fnOnDataReady)};K.prototype.onBeforeRendering=function(){if(this.getDataMode()!==V.Active){return}this.startManifestProcessing()};K.prototype.onAfterRendering=function(){if(O.getActive()&&this._isManifestReady){if(!O.getMeasurement(this._sPerformanceId+"firstRenderingWithStaticData").end){O.end(this._sPerformanceId+"firstRenderingWithStaticData")}if(this._bDataReady&&!O.getMeasurement(this._sPerformanceId+"firstRenderingWithDynamicData").end){O.end(this._sPerformanceId+"firstRenderingWithDynamicData")}}var t=this.getDomRef();if(this.getDataMode()===V.Auto&&this._bFirstRendering){this._oCardObserver.oObserver.observe(t)}this._bFirstRendering=false};K.prototype.startManifestProcessing=function(){if(!F.isBindingSyntaxComplex()){this._logFundamentalError("Cannot parse manifest. Complex binding syntax is not enabled - "+"To enable it, set the 'compatVersion' configuration option to 'edge', e.g.: data-sap-ui-compatVersion='edge' - "+"sap.ui.integration.widgets.Card")}if(this._bApplyManifest||this._bApplyParameters){this._clearReadyState();this._initReadyState()}var t=this.getManifest();if(t&&this._bApplyManifest){this._cleanupOldManifest();this.createManifest(t,this.getBaseUrl())}if(!this._bApplyManifest&&this._bApplyParameters){this._oCardManifest.processParameters(this._getContextAndRuntimeParams());this._applyManifestSettings()}this._bApplyManifest=false;this._bApplyParameters=false;this._refreshActionsMenu()};K.prototype.setManifest=function(t){if(!h(this.getProperty("manifest"),t)){this.destroyActionDefinitions()}if(!t){this._destroyManifest()}this._bApplyManifest=true;this.setProperty("manifest",t);return this};K.prototype.setManifestChanges=function(t){this.setProperty("manifestChanges",t);this._bApplyManifest=true;return this};K.prototype.setParameters=function(t){this.setProperty("parameters",t);this._bApplyParameters=true;return this};K.prototype.setParameter=function(t,e){var i=this.getParameters()||{};i[t]=e;this.setParameters(i);return this};K.prototype.setHost=function(t){this.setAssociation("host",t);var e=this.getHostInstance();if(t&&!e){o.error("Host with id '"+t+"' is not available during card initialization. It must be available for host specific features to work.","Make sure that the host already exists, before assigning it to the card.","sap.ui.integration.widgets.Card");return this}this.getModel("context").setHost(e);if(this._oDestinations){this._oDestinations.setHost(e)}if(this._oDataProviderFactory){this._oDataProviderFactory.setHost(e)}if(e&&e.bUseExperimentalCaching){this.addStyleClass("sapFCardExperimentalCaching")}else{this.removeStyleClass("sapFCardExperimentalCaching")}return this};K.prototype.createManifest=function(t,e){var i={};this._isManifestReady=false;if(typeof t==="string"){i.manifestUrl=t;t=null}if(this._oCardManifest){this._oCardManifest.destroy()}O.start(this._sPerformanceId+"initManifest","Load and initialize manifest. "+G());O.start(this._sPerformanceId+"firstRenderingWithStaticData","First rendering with static data (includes initManifest). "+G());O.start(this._sPerformanceId+"firstRenderingWithDynamicData","First rendering with dynamic card level data (includes firstRenderingWithStaticData). "+G());this._oCardManifest=new n("sap.card",t,e,this.getManifestChanges());this._oCardManifest.load(i).then(function(){if(this.bIsDestroyed){throw new Error(j)}O.end(this._sPerformanceId+"initManifest");this._registerManifestModulePath();this._isManifestReady=true;this.fireManifestReady();return this._loadExtension()}.bind(this)).then(this._applyManifest.bind(this)).catch(function(t){if(t.message===j){return}this._logFundamentalError(t.message);this._applyManifest()}.bind(this))};K.prototype._loadExtension=function(){var t=this._oCardManifest.get("/sap.card/extension"),e;if(!t){return null}if(t.startsWith(Y)){e=t.replace(Y,"")}else{e=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+t}return new Promise(function(t,i){sap.ui.require([e],function(e){var i=new e;i._setCard(this,this._oLimitedInterface);this.setAggregation("_extension",i);t()}.bind(this),function(t){this._logFundamentalError("Failed to load "+e+". Check if the path is correct. Reason: "+t);i(t)}.bind(this))}.bind(this))};K.prototype._logFundamentalError=function(t){o.error(t);this._aFundamentalErrors.push(t)};K.prototype.getFundamentalErrors=function(){return this._aFundamentalErrors};K.prototype.validateControls=function(){var t=this.getCardContent();if(t){t.validateControls()}return!this.getModel("messages").getProperty("/hasErrors")};K.prototype._applyManifest=function(){var t=this._oCardManifest;if(!t.get("/sap.card")){this._logFundamentalError("There must be a 'sap.card' section in the manifest.")}if(t&&t.getResourceBundle()){this._enhanceI18nModel(t.getResourceBundle())}this.getModel("context").resetHostProperties();if(this._hasContextParams()){this._resolveContextParams().then(function(t){this._oContextParameters=t;this._applyManifestWithParams()}.bind(this));return}this._applyManifestWithParams()};K.prototype._applyManifestWithParams=function(){var t=this._oCardManifest,e=this._getContextAndRuntimeParams();t.processParameters(e);this._prepareToApplyManifestSettings().then(function(){this._applyManifestSettings()}.bind(this))};K.prototype._enhanceI18nModel=function(t){var e=this.getModel("i18n"),i;i=new c({bundle:t,enhanceWith:[this._oIntegrationRb]});this.setModel(i,"i18n");e.destroy()};K.prototype._hasContextParams=function(){var t=this._oCardManifest.get(B.PARAMS),e,i;for(e in t){i=t[e].value;if(typeof i==="string"&&i.indexOf("{context>")!==-1){return true}}return false};K.prototype._resolveContextParams=function(){var t=this.getModel("context"),e=this._oCardManifest.get(B.PARAMS),i={},a,r;for(a in e){r=e[a].value;if(typeof r==="string"&&r.indexOf("{context>")!==-1){i[a]=r}}R.resolveValue(i,this,"/");return t.waitForPendingProperties().then(function(){return R.resolveValue(i,this,"/")}.bind(this))};K.prototype._getContextAndRuntimeParams=function(){var t=this._oContextParameters||{},e=this.getParameters()||{};return d(t,e)};K.prototype._awaitEvent=function(t){this._aReadyPromises.push(new Promise(function(e){this.attachEventOnce(t,function(){e()})}.bind(this)))};K.prototype.isReady=function(){return this._bReady};K.prototype.refresh=function(){if(this.getDataMode()===V.Active){this._bApplyManifest=true;this.invalidate()}};K.prototype.refreshData=function(){if(!this.isReady()){return}var t=this.getCardHeader(),e=this.getCardContent(),i=this.getAggregation("_filterBar");if(this._oDataProvider){this._oDataProvider.triggerDataUpdate()}if(t){t.refreshData()}if(e&&e.isA("sap.ui.integration.cards.BaseContent")){e.refreshData()}else{this.destroyAggregation("_content");this._destroyTemporaryContent();this._applyContentManifestSettings()}if(i){i.refreshData()}};K.prototype._refreshActionsMenu=function(){var t=this.getCardHeader(),e=this.getHostInstance(),i=this.getAggregation("_extension"),a=[];if(!t){return}if(e){a=a.concat(e.getActions()||[])}if(i){a=a.concat(i.getActions()||[])}if(h(a,this._getActionsToolbar()._aActions)){return}this._getActionsToolbar().initializeContent(this)};K.prototype.exit=function(){y.prototype.exit.call(this);this._destroyManifest();this._oCardObserver.destroy();this._oCardObserver=null;this._oContentFactory=null;this._bFirstRendering=null;this._oIntegrationRb=null;if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null}};K.prototype._destroyManifest=function(){if(this._oCardManifest){this._oCardManifest.destroy();this._oCardManifest=null}if(this._oServiceManager){this._oServiceManager.destroy();this._oServiceManager=null}if(this._oDestinations){this._oDestinations.destroy();this._oDestinations=null}if(this._oIconFormatter){this._oIconFormatter.destroy();this._oIconFormatter=null}if(this._oActionsToolbar){this._oActionsToolbar.destroy();this._oActionsToolbar=null}this.destroyAggregation("_header");this.destroyAggregation("_filterBar");this.destroyAggregation("_content");this.destroyAggregation("_footer");this._cleanupOldManifest()};K.prototype._cleanupOldManifest=function(){this._aReadyPromises=null;this.getModel("filters").setData({});this.getModel("parameters").setData({});this.getModel("paginator").setData({});this._oContextParameters=null;this._deregisterCustomModels();this.destroyAggregation("_extension");this._destroyTemporaryContent();if(this._oDataProviderFactory){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null;this._oDataProvider=null}};K.prototype._registerManifestModulePath=function(){if(!this._oCardManifest){return}this._sAppId=this._oCardManifest.get("/sap.app/id");if(this._sAppId){_.registerResourcePath(this._sAppId.replace(/\./g,"/"),this._oCardManifest.getUrl()||"/")}else{this._logFundamentalError("Card sap.app/id entry in the manifest is mandatory")}};K.prototype.getManifest=function(){var t=this.getProperty("manifest");if(t&&typeof t==="object"){return jQuery.extend(true,{},t)}return t};K.prototype.getParameters=function(){var t=this.getProperty("parameters");if(t&&typeof t==="object"){return jQuery.extend(true,{},t)}return t};K.prototype.getCombinedParameters=function(){if(!this._isManifestReady){o.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}var t=this._oCardManifest.getProcessedParameters(this._getContextAndRuntimeParams()),e={},i;for(i in t){e[i]=t[i].value}return e};K.prototype.getManifestEntry=function(t){if(!this._isManifestReady){o.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}return this._oCardManifest.get(t)};K.prototype.getManifestRawJson=function(){if(!this._oCardManifest||!this._oCardManifest){o.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{}}return this._oCardManifest.getInitialJson()};K.prototype.getManifestWithMergedChanges=function(){if(!this._oCardManifest||!this._oCardManifest._oManifest){o.error("The manifest is not ready. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return{}}return jQuery.extend(true,{},this._oCardManifest._oManifest.getRawJson())};K.prototype.resolveDestination=function(t){return this._oDestinations.getUrl(t)};K.prototype.processDestinations=function(t){return this._oDestinations.process(t)};K.prototype.showMessage=function(t,e){if(this._createContentPromise){this._createContentPromise.then(function(i){i.showMessage(t,e)})}else{o.error("'showMessage' cannot be used before the card instance is ready. Consider using the event 'manifestApplied' event.","sap.ui.integration.widgets.Card")}};K.prototype.getTranslatedText=function(t,e,i){var a=this.getModel("i18n"),r;if(!a){o.warning("There are no translations available. Either the i18n configuration is missing or the method is called too early.");return null}r=a.getResourceBundle();return r.getText(t,e,i)};K.prototype.getDataProviderFactory=function(){if(!this._oDataProviderFactory){o.error("The DataProviderFactory instance is not ready yet. Consider using the event 'manifestApplied'.","sap.ui.integration.widgets.Card");return null}return this._oDataProviderFactory};K.prototype.getRuntimeUrl=function(t){var e=this._sAppId,i,a=t&&t.trim().replace(/^\//,"");if(e===null){o.error("The manifest is not ready so the URL can not be resolved. Consider using the 'manifestReady' event.","sap.ui.integration.widgets.Card");return null}if(!e||t.startsWith("http://")||t.startsWith("https://")||t.startsWith("//")){return t}i=e.replace(/\./g,"/");return sap.ui.require.toUrl(i)+"/"+a};K.prototype._prepareToApplyManifestSettings=function(){var t=this._oCardManifest.get(B.APP_TYPE),e=this.getAggregation("_extension");if(t&&t!=="card"){o.error("sap.app/type entry in manifest is not 'card'")}if(this._oDataProviderFactory){this._oDataProviderFactory.destroy()}this._oDestinations=new v({host:this.getHostInstance(),card:this,manifestConfig:this._oCardManifest.get(B.DESTINATIONS)});this._oIconFormatter=new A({card:this});return this.processDestinations(this._oCardManifest.getJson()).then(function(t){this._oCardManifest.setJson(t);this._oDataProviderFactory=new g({host:this.getHostInstance(),extension:e,csrfTokensConfig:this._oCardManifest.get(B.CSRF_TOKENS),card:this});this._registerCustomModels();if(e){e.onCardReady()}}.bind(this))};K.prototype._applyManifestSettings=function(){this._setParametersModelData();this._applyServiceManifestSettings();this._applyFilterBarManifestSettings();this._applyDataManifestSettings();this._applyHeaderManifestSettings();this._applyContentManifestSettings();this._applyFooterManifestSettings();this.fireManifestApplied()};K.prototype._setParametersModelData=function(){var t=x.getParamsForModel(),e={},i=this.getCombinedParameters(),a;for(a in i){if(U.indexOf(a)>=0){o.warning("The parameter name '"+a+"' is reserved for cards. Can not be used for creating custom parameter.")}else{e[a]={value:i[a]}}}this.getModel("parameters").setData(d(t,e))};K.prototype._applyDataManifestSettings=function(){var t=this._oCardManifest.get(B.DATA),e;if(!t){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");return}this.bindObject(R.resolveValue(t.path||"/",this));if(this._oDataProvider){this._oDataProvider.destroy()}this._oDataProvider=this._oDataProviderFactory.create(t,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(t.name){e=this.getModel(t.name)}else if(this._oDataProvider){e=new l;this.setModel(e)}if(!e){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");return}e.attachEvent("change",function(){var t=this.getAggregation("_content");if(t&&!t.isA("sap.ui.integration.cards.BaseContent")){this.destroyAggregation("_content");this._destroyTemporaryContent();this._applyContentManifestSettings()}if(this._createContentPromise){this._createContentPromise.then(function(t){t.onDataChanged();this.fireEvent("_dataPassedToContent");this.onDataRequestComplete()}.bind(this))}else{this.fireEvent("_dataPassedToContent");this.onDataRequestComplete()}}.bind(this));if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this._showLoadingPlaceholders()}.bind(this));this._oDataProvider.attachDataChanged(function(t){this.fireEvent("_dataReady");e.setData(t.getParameter("data"))}.bind(this));this._oDataProvider.attachError(function(t){this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent");this._handleError("Data service unavailable. "+t.getParameter("message"));this.onDataRequestComplete()}.bind(this));this._oDataProvider.triggerDataUpdate()}else{this.fireEvent("_dataReady");this.fireEvent("_dataPassedToContent")}};K.prototype._applyServiceManifestSettings=function(){var t=this._oCardManifest.get(B.SERVICES);if(!t){return}if(!this._oServiceManager){this._oServiceManager=new s(t,this)}};K.prototype.getCardHeader=function(){return this.getAggregation("_header")};K.prototype.getCardHeaderPosition=function(){if(!this._oCardManifest){return"Top"}return this._oCardManifest.get(B.HEADER_POSITION)||k.Top};K.prototype.getCardContent=function(){return this.getAggregation("_content")};K.prototype._getActionsToolbar=function(){if(!this._oActionsToolbar){this._oActionsToolbar=new i;this._oActionsToolbar.setCard(this)}return this._oActionsToolbar};K.prototype._applyHeaderManifestSettings=function(){var t=this.createHeader();this.destroyAggregation("_header");if(!t){this.fireEvent("_headerReady");return}t.attachEvent("_error",function(t){this._handleError(t.getParameter("message"))}.bind(this));this.setAggregation("_header",t);if(t.isReady()){this.fireEvent("_headerReady")}else{t.attachEvent("_ready",function(){this.fireEvent("_headerReady")}.bind(this))}};K.prototype._applyFilterBarManifestSettings=function(){var t=this.createFilterBar();this.destroyAggregation("_filterBar");if(!t){this.fireEvent("_filterBarReady");return}t.attachEventOnce("_filterBarDataReady",function(){this.fireEvent("_filterBarReady")}.bind(this));this.setAggregation("_filterBar",t)};K.prototype._applyFooterManifestSettings=function(){var t=this.createFooter();this.destroyAggregation("_footer");if(t){this.setAggregation("_footer",t)}};K.prototype.getHostInstance=function(){var t=this.getHost();if(!t){return null}return r.byId(t)};K.prototype._applyContentManifestSettings=function(){var t=this._oCardManifest.get(B.TYPE),e=this.getContentManifest(),i=t+" "+this._oRb.getText("ARIA_ROLEDESCRIPTION_CARD");this._ariaText.setText(i);if(!e){this.fireEvent("_contentReady");return}this._setTemporaryContent(t,e);if(this._bIsPreviewMode){this.fireEvent("_contentReady");return}this._createContentPromise=this.createContent({cardType:t,contentManifest:e,serviceManager:this._oServiceManager,dataProviderFactory:this._oDataProviderFactory,iconFormatter:this._oIconFormatter,appId:this._sAppId}).then(function(t){this._setCardContent(t);return t}.bind(this));this._createContentPromise.catch(function(t){if(t){this._handleError(t)}}.bind(this))};K.prototype.createHeader=function(){var t=this._oCardManifest.get(B.HEADER),e=new P(this);return e.create(t,this._getActionsToolbar())};K.prototype.createFilterBar=function(){var t=this._oCardManifest.get(B.FILTERS),e=new D(this);return e.create(t,this.getModel("filters"))};K.prototype.createFooter=function(){var t=this._oCardManifest.get(B.FOOTER);if(!t){return null}return e.create(this,t)};K.prototype.getContentManifest=function(){var t=this._oCardManifest.get(B.TYPE),e=t&&t.toLowerCase()==="component",i=this._oCardManifest.get(B.CONTENT),a=!!i;if(a&&!t){this._logFundamentalError("Card type property is mandatory!");return null}if(!a&&!e){return null}if(e){i=d(i,{componentManifest:this._oCardManifest.getJson()})}return i};K.prototype.createContent=function(t){t.cardManifest=this._oCardManifest;return this._oContentFactory.create(t)};K.prototype._setCardContent=function(t){if(this._bShowContentLoadingPlaceholders){t.showLoadingPlaceholders();this._bShowContentLoadingPlaceholders=false}t.attachEvent("_error",function(t){this._handleError(t.getParameter("logMessage"))}.bind(this));var e=this.getAggregation("_content");if(e&&e!==this._oTemporaryContent){e.destroy()}this.setAggregation("_content",t);if(t.isReady()){this.fireEvent("_contentReady")}else{t.attachReady(function(){this.fireEvent("_contentReady")}.bind(this))}};K.prototype._setTemporaryContent=function(t,e){var i=this._getTemporaryContent(t,e),a=this.getAggregation("_content");if(a&&a!==i){a.destroy()}this.setAggregation("_content",i)};K.prototype._preserveMinHeightInContent=function(t){t.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return}var e=this._oCardManifest.get(B.TYPE),i=this._oCardManifest.get(B.CONTENT),a=this._oContentFactory.getClass(e),r;if(!a){return}r=a.getMetadata().getRenderer().getMinHeight(i,t,this);if(this.getHeight()==="auto"){t.$().css({"min-height":r})}}},this)};K.prototype._destroyPreviousContent=function(t){if(t&&!t.hasStyleClass("sapFCardErrorContent")){t.destroy();if(t===this._oTemporaryContent){this._oTemporaryContent=null}}};K.prototype._destroyTemporaryContent=function(){if(this._oTemporaryContent){this._oTemporaryContent.destroy();this._oTemporaryContent=null}};K.prototype._handleError=function(t,e){if(!e){o.error(t,null,"sap.ui.integration.widgets.Card")}this.fireEvent("_error",{message:t});var i=this._oCardManifest.get(B.ERROR_MESSAGES),a=this._getIllustratedMessage(i,e),r=this._oCardManifest.get(B.CONTENT),n=d({},this.getCardContent());if(r){this._handleNoDataItems(n,a,e);this._destroyPreviousContent(this.getCardContent());this._preserveMinHeightInContent(a);this.setAggregation("_content",a);this.fireEvent("_contentReady")}else{this.getCardHeader().setAggregation("_error",a)}};K.prototype._getIllustratedMessage=function(t,e){var i=w.UnableToLoad,a=S.Spot,r,n;if(e&&!t){switch(this._oCardManifest.get(B.TYPE)){case"List":case"Timeline":i=w.NoData;r=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Table":i=w.NoEntries;r=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_LISTS");break;case"Analytical":i=w.NoEntries;r=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_CHART");break;case"Object":i=w.NoData;r=this._oIntegrationRb.getText("CARD_NO_ITEMS_ERROR_CHART");break}}if(t&&t.noData&&e){var s=t.noData;i=w[s.type];a=S[s.size];r=s.title;n=s.description}var o=new I({illustrationType:i,illustrationSize:a,title:r,description:n?n:" "});var d=new L({renderType:q.Bare,justifyContent:z.Center,alignItems:J.Center,width:"100%",items:[o]}).addStyleClass("sapFCardErrorContent");return d};K.prototype._handleNoDataItems=function(t,e,i){if(i){e._oCardOriginalContent=t}};K.prototype._getTemporaryContent=function(t,e){var i=this.getAggregation("_loadingProvider");if(!this._oTemporaryContent&&i){this._oTemporaryContent=i.createContentPlaceholder(e,t,this);this._oTemporaryContent.addEventDelegate({onAfterRendering:function(){if(!this._oCardManifest){return}var i=this._oContentFactory.getClass(t).getMetadata().getRenderer().getMinHeight(e,this._oTemporaryContent,this);if(this.getHeight()==="auto"){this._oTemporaryContent.$().css({"min-height":i})}}},this)}return this._oTemporaryContent};K.prototype.setDataMode=function(t){if(this._oDataProviderFactory&&t===V.Inactive){this._oDataProviderFactory.destroy();this._oDataProviderFactory=null}this.setProperty("dataMode",t,true);if(this.getProperty("dataMode")===V.Active){this.refresh()}if(this.getProperty("dataMode")===V.Auto){this._oCardObserver.createObserver(this);if(!this._bFirstRendering){this._oCardObserver.oObserver.observe(this.getDomRef())}}return this};K.prototype.loadDesigntime=function(){if(this._oDesigntime){return Promise.resolve(this._oDesigntime)}if(!this._oCardManifest){return new Promise(function(t,e){this.attachManifestReady(function(){this.loadDesigntime().then(t,e)}.bind(this))}.bind(this))}var t=this._oCardManifest.get("/sap.app/id");if(!t){return Promise.reject("App id not maintained")}return new Promise(function(t,e){var i=this._oCardManifest.get("/sap.card/configuration/editor");if(i===undefined){i=this._oCardManifest.get("/sap.card/designtime")}var a=this._oCardManifest.get("/sap.app/id").replace(/\./g,"/")+"/"+i;if(a){sap.ui.require([a],function(e){e=new e;e._readyPromise(this._oLimitedInterface,this).then(function(){this._oDesigntime=e;t(e)}.bind(this))}.bind(this),function(){e({error:a+" not found"})})}else{e()}}.bind(this))};K.prototype.showLoadingPlaceholders=function(t){var e;switch(t){case W.Header:e=this.getCardHeader();if(e){e.showLoadingPlaceholders()}break;case W.Filters:e=this.getAggregation("_filterBar");if(e){e.showLoadingPlaceholders()}break;case W.Content:if(this._createContentPromise){this._createContentPromise.then(function(t){t.showLoadingPlaceholders()})}else{this._bShowContentLoadingPlaceholders=true}break;default:this.showLoadingPlaceholders(W.Header);this.showLoadingPlaceholders(W.Filters);this.showLoadingPlaceholders(W.Content);this.getAggregation("_loadingProvider").setLoading(true)}return this};K.prototype.hideLoadingPlaceholders=function(t){var e;switch(t){case W.Header:e=this.getCardHeader();if(e){e.hideLoadingPlaceholders()}break;case W.Filters:e=this.getAggregation("_filterBar");if(e){e.hideLoadingPlaceholders()}break;case W.Content:if(this._createContentPromise){this._createContentPromise.then(function(t){t.hideLoadingPlaceholders()})}else{this._bShowContentLoadingPlaceholders=false}break;default:this.hideLoadingPlaceholders(W.Header);this.hideLoadingPlaceholders(W.Filters);this.hideLoadingPlaceholders(W.Content);this.getAggregation("_loadingProvider").setLoading(false)}return this};K.prototype.isLoading=function(){var t=this.getAggregation("_loadingProvider");return t?t.getLoading():false};K.prototype.getFocusDomRef=function(){var t=this.getCardHeader();if(t&&t.getFocusDomRef()){return t.getFocusDomRef()}return this.getDomRef()};K.prototype._showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true)};K.prototype.onDataRequestComplete=function(){var t=this.getCardContent(),e=this.getAggregation("_loadingProvider");this.hideLoadingPlaceholders(W.Header);this.hideLoadingPlaceholders(W.Filters);if(t&&t.isA("sap.ui.integration.cards.BaseContent")&&t.isReady()){this.hideLoadingPlaceholders(W.Content)}if(e){e.setLoading(false)}this._fireContentDataChange()};K.prototype.request=function(t){return this.processDestinations(t).then(function(t){return this._oDataProviderFactory.create({request:t}).setAllowCustomDataType(true).getData()}.bind(this))};K.prototype.triggerAction=function(t){E.fireAction({card:this,host:this.getHostInstance(),action:t,parameters:t.parameters,source:this})};K.prototype._setPreviewMode=function(t){this._bIsPreviewMode=t;if(t){this.addStyleClass("sapFCardPreview")}else{this.removeStyleClass("sapFCardPreview")}this._bApplyManifest=true;this.invalidate()};K.prototype.getBindingNamespaces=function(){var t={},e=this.getAggregation("_extension");if(e){t.extension={formatters:e.getFormatters()}}return t};K.prototype._registerCustomModels=function(){var t=this._oCardManifest.findDataSections();if(!this._aCustomModels){this._aCustomModels=[]}this._deregisterCustomModels();t.forEach(function(t){var e=t&&t.name;if(!e){return}if(N.indexOf(e)>-1){o.error("The model name (data section name) '"+e+"' is reserved for cards. Can not be used for creating a custom model.");return}if(this._aCustomModels.indexOf(e)>-1){o.error("The model name (data section name) '"+e+"' is already used.");return}this.setModel(new l,e);this._aCustomModels.push(e)}.bind(this))};K.prototype._deregisterCustomModels=function(){if(!this._aCustomModels){return}this._aCustomModels.forEach(function(t){this.getModel(t).destroy();this.setModel(null,t)}.bind(this));this._aCustomModels=[]};K.prototype._fireConfigurationChange=function(t){var e=this.getHostInstance();if(!this._bReady){return}this.fireConfigurationChange({changes:t});if(e){e.fireCardConfigurationChange({card:this,changes:t})}};K.prototype._fireContentDataChange=function(){this.fireEvent("_contentDataChange")};K.prototype.isSkeleton=function(){return false};K.prototype.getContentPageSize=function(t){var e=0,i=this.getAggregation("_footer"),a;if(t.maxItems!==undefined){if(typeof t.maxItems==="number"){e=t.maxItems}else{e=parseInt(R.resolveValue(t,this).maxItems)||0}}if(!i){return e}a=i.getAggregation("paginator");if(!a){return e}if(a.getPageSize()){return a.getPageSize()}return e};K.prototype.hasPaginator=function(){var t=this._oCardManifest.get(B.FOOTER);return t&&t.paginator};K.prototype.showCard=function(t){var e=this._createChildCard(t);t._cardId=e.getId();this.triggerAction({type:"ShowCard",parameters:t});return Promise.resolve(e)};K.prototype.hide=function(){this.triggerAction({type:"HideCard"})};K.prototype.getOpener=function(){var t=r.byId(this.getAssociation("openerReference"));if(!t){return null}return t._oLimitedInterface};K.prototype._createChildCard=function(t){var e=t.manifest,i=t.baseUrl,a=t.data,r=this._createCard({width:t.width,host:this.getHostInstance(),parameters:t.parameters,referenceId:this.getReferenceId()});r.setAssociation("openerReference",this);if(a){f(a,function(t,e){var i=new p(e);r.setModel(i,t)})}if(typeof e==="string"){r.setManifest(this.getRuntimeUrl(e));if(i){r.setBaseUrl(i)}}else{r.setManifest(e);r.setBaseUrl(i||this.getRuntimeUrl("/"))}return r};K.prototype._createCard=function(t){return new K(t)};return K});
//# sourceMappingURL=Card.js.map
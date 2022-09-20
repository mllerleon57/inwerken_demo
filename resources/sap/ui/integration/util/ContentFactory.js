/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseFactory","sap/ui/integration/cards/actions/CardActions","sap/ui/integration/cards/AdaptiveContent","sap/ui/integration/cards/AnalyticalContent","sap/ui/integration/cards/AnalyticsCloudContent","sap/ui/integration/cards/CalendarContent","sap/ui/integration/cards/ComponentContent","sap/ui/integration/cards/ListContent","sap/ui/integration/cards/ObjectContent","sap/ui/integration/cards/TableContent","sap/ui/integration/cards/TimelineContent","sap/ui/integration/cards/WebPageContent"],function(t,e,a,n,r,i,s,o,c,d,u,p){"use strict";var C=t.extend("sap.ui.integration.util.ContentFactory");C.prototype.create=function(t){var n=this._oCard,r=t.cardType;return new Promise(function(i,s){var o=this.getClass(r);if(!o){s(r.toUpperCase()+" content type is not supported.");return}var c=new o;c.setCard(n);if(c instanceof a){c.setCardDataProvider(n._oDataProvider)}c.loadDependencies(t.cardManifest).then(function(){if(t.cardManifest&&t.cardManifest.isDestroyed()||t.dataProviderFactory&&t.dataProviderFactory.isDestroyed()){s();return}var a=new e({card:n});c._sAppId=t.appId;c.setServiceManager(t.serviceManager);c.setDataProviderFactory(t.dataProviderFactory);c.setIconFormatter(t.iconFormatter);c.setActions(a);c.setConfiguration(t.contentManifest,r);i(c)}).catch(function(t){s(t)})}.bind(this))};C.prototype.getClass=function(t){switch(t.toLowerCase()){case"adaptivecard":return a;case"analytical":return n;case"analyticscloud":return r;case"calendar":return i;case"component":return s;case"list":return o;case"object":return c;case"table":return d;case"timeline":return u;case"webpage":return p;default:return null}};return C});
//# sourceMappingURL=ContentFactory.js.map
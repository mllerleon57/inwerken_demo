/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/base/Log","sap/ui/fl/changeHandler/AddIFrame","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame"],function(e,t,n,r,a){"use strict";var i=Object.assign({},n);i.applyChange=function(e,t,i){var o=i.modifier;var s=e.getDefinition();var c=s.content.targetAggregation;if(c!=="sections"){return Promise.resolve().then(n.applyChange.bind(n,e,t,i))}var u=i.view;var g=i.appComponent;var l=s.content.selector;var p=sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_TITLE_FOR_IFRAME");var f;var v;return Promise.resolve().then(o.createControl.bind(o,"sap.uxap.ObjectPageSection",g,u,l,{title:p},false)).then(function(e){f=e;var t=Object.create(l);t.id+="-subSection";return o.createControl("sap.uxap.ObjectPageSubSection",g,u,t,{title:p},false)}).then(function(e){v=e;return o.insertAggregation(f,"subSections",v,0,u)}).then(function(){var t=Object.create(l);t.id+="-iframe";return a(e,i,t)}).then(function(e){return o.insertAggregation(v,"blocks",e,0,u)}).then(r.bind(null,e,t,i)).then(function(e){return o.insertAggregation(t,"sections",f,e,u)}).then(function(){e.setRevertData([o.getId(f)])})};return i},true);
//# sourceMappingURL=AddIFrameObjectPageLayout.js.map
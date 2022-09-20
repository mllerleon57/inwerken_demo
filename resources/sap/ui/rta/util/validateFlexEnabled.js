/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/m/MessageBox","sap/base/util/ObjectPath","sap/ui/rta/util/validateStableIds","sap/ui/rta/util/showMessageBox","sap/base/Log","sap/ui/rta/Utils","sap/ui/dt/Util"],function(e,t,a,n,o,i,s,r){"use strict";return function(l){var g={};var u=[];var p=e.getAppComponentForControl(l.getRootControlInstance());function f(e,a,n,i,r){var l=a.getId();if(!g[l]){o(e._getTextResources().getText(n),{icon:t.Icon[i],title:e._getTextResources().getText(r),styleClass:s.getRtaStyleClassName()},"show");c(l,true)}}function c(e,t){g[e]=t}function d(e){var t=e.getManifest();return a.get(["sap.app","id"],t)!=="sap.ui.documentation.sdk"&&!(a.get(["sap.app","id"],t)||"").startsWith("sap.ui.rta")&&!a.get(["sap.ovp"],t)}function m(){return"QUnit"in window||window.frameElement&&(window.frameElement.getAttribute("id")||"").toLowerCase()==="opaframe"}function v(e){return e&&!e._bIsBeingDestroyed}function E(t){var a=t.getParameters().mode;if(a==="adaptation"){var n=t.getSource();var o=e.getAppComponentForControl(n.getRootControlInstance());u=u.filter(v);R(n,o,u);u=[]}}function I(t,a){var n=t.getParameters().elementOverlay;if(a.getMode()==="adaptation"){var o=e.getAppComponentForControl(a.getRootControlInstance());r.waitForSynced(a._oDesignTime,function(e){if(v(e)){R(a,o,[e])}})(n)}else{u.push(n)}}function R(e,t,a){var o=n(a,t);if(o.length){o.forEach(function(e){i.error("Control ID was generated dynamically by SAPUI5. To support SAPUI5 flexibility, a stable control ID is needed to assign the changes to.",e.getElement().getId())});f(e,t,"MSG_UNSTABLE_ID_FOUND","ERROR","HEADER_ERROR")}}l.attachEventOnce("stop",function(){c(p.getId(),false)});if(p&&d(p)){var C=p.getManifest();var _=a.get(["sap.ui5","flexEnabled"],C);if(typeof _!=="boolean"){if(!m()){f(l,p,"MSG_NO_FLEX_ENABLED_FLAG","WARNING","HEADER_WARNING")}}else{l.attachEvent("modeChanged",E);l._oDesignTime.attachEvent("elementOverlayCreated",l,I);R(l,p,l._oDesignTime.getElementOverlays())}}}});
//# sourceMappingURL=validateFlexEnabled.js.map
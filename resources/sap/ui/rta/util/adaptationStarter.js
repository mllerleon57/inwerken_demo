/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/UriParameters","sap/base/Log","sap/ui/core/Control","sap/ui/core/UIComponent","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/rta/util/showMessageBox","sap/ui/rta/RuntimeAuthoring","sap/ui/core/Core"],function(t,e,r,n,o,a,i,s,u,l,f){"use strict";function T(t){if(i.CUSTOMER===t){return o.isKeyUser().then(function(t){if(!t){var e=f.getLibraryResourceBundle("sap.ui.rta");var r=new Error(e.getText("MSG_NO_KEY_USER_RIGHTS_ERROR_MESSAGE"));r.reason="isKeyUser";throw r}})}return Promise.resolve()}function c(e){var r=t.fromQuery(window.location.search).get("fiori-tools-rta-mode");if(!r||r==="false"){var n=e.getManifest()||{};var o=n["sap.ui5"]&&n["sap.ui5"].flexEnabled;if(o===false){var a=Error("This app is not enabled for key user adaptation");a.reason="flexEnabled";throw a}}}function _(t,o,_,A,E){var p;return Promise.resolve().then(function(){if(!(t.rootControl instanceof r)&&!(t.rootControl instanceof n)){var e=Error("An invalid root control was passed");e.reason="rootControl";throw e}t.rootControl=s.getAppComponentForControl(t.rootControl)}).then(T.bind(undefined,t.flexSettings.layer)).then(function(){return c(t.rootControl)}).then(function(){p=new l(t);if(_){p.attachEvent("start",_)}if(A){p.attachEvent("failed",A)}var e=E||function(){p.destroy()};p.attachEvent("stop",e);if(o){return o(p)}}).then(function(){return p.start()}).then(function(){if(t.flexSettings.layer==="CUSTOMER"){var e={oComponent:t.rootControl,selector:t.rootControl,invalidateCache:false,includeVariants:true,includeCtrlVariants:true,currentLayer:i.CUSTOMER};a.getChangesWarning(e).then(function(t){if(t.showWarning){var e=f.getLibraryResourceBundle("sap.ui.rta");var r=t.warningType==="mixedChangesWarning"?{text:"MSG_ADAPTATION_STARTER_MIXED_CHANGES_WARNING",title:"TIT_ADAPTATION_STARTER_MIXED_CHANGES_TITLE"}:{text:"MSG_ADAPTATION_STARTER_NO_CHANGES_IN_P_WARNING",title:"TIT_ADAPTATION_STARTER_NO_CHANGES_IN_P_TITLE"};u(e.getText(r.text),{title:e.getText(r.title)},"warning")}})}return p}).catch(function(t){if(t!=="Reload triggered"){var r=f.getLibraryResourceBundle("sap.ui.rta");u(r.getText("MSG_GENERIC_ERROR_MESSAGE",t.message),{title:r.getText("MSG_ADAPTATION_COULD_NOT_START")},"error");e.error("UI Adaptation could not be started",t.message)}throw t})}return _});
//# sourceMappingURL=adaptationStarter.js.map
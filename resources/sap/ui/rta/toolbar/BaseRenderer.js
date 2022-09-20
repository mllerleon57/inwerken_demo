/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/HBoxRenderer"],function(e,r){"use strict";var a=e.extend.call(r,"sap.ui.rta.toolbar.BaseRenderer");a.render=function(e,a){e.addClass("sapUiRtaToolbar");e.addClass("color_"+a.getColor());a.type&&e.addClass("type_"+a.type);var d=a.getZIndex();d&&e.addStyle("z-index",d);r.render(e,a)};return a});
//# sourceMappingURL=BaseRenderer.js.map
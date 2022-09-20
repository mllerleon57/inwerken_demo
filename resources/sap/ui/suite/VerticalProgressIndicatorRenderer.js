/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var t={};t.render=function(t,e){var i=t;var r=e.getPercentage();if(r<0){r=0}if(r>100){r=100}var a=Math.round(r*58/100);var s=58-a;var n=r.toString();i.write("<div");i.writeControlData(e);i.writeAttribute("tabindex","0");if(e.getTooltip_AsString()){i.writeAttributeEscaped("title",e.getTooltip_AsString())}else{i.writeAttributeEscaped("title",n)}if(sap.ui.getCore().getConfiguration().getAccessibility()){i.writeAttribute("role","progressbar");i.writeAccessibilityState(e,{valuemin:"0%"});i.writeAccessibilityState(e,{valuemax:"100%"});i.writeAccessibilityState(e,{valuenow:r+"%"})}i.writeAttribute("class","sapUiVerticalProgressOuterContainer");i.write(">");i.write("<div");i.writeAttribute("id",e.getId()+"-bar");i.writeAttribute("class","sapUiVerticalProgressInnerContainer");i.addStyle("top",s+"px");i.addStyle("height",a+"px");i.writeClasses();i.writeStyles();i.write(">");i.write("</div>");i.write("</div>")};return t},true);
//# sourceMappingURL=VerticalProgressIndicatorRenderer.js.map
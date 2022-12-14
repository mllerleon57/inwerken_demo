/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/commons/CalloutBaseRenderer","sap/ui/core/Renderer","sap/ui/core/IconPool"],function(t,e,i){"use strict";var r=e.extend(t);r.renderContent=function(t,e){var r=sap.ui.getCore().getConfiguration().getAccessibility();var a=e.getType(),s=e.getFirstTitle(),n=e.getFirstTitleHref(),d=e.getIcon(),o=e.getSecondTitle(),w=e.getWidth(),l=e.getId(),c=e.getTooltip_AsString(),u;t.write("<div");if(c){t.writeAttributeEscaped("title",c)}if(r){t.writeAttribute("role","dialog");t.writeAttribute("aria-labelledby",l+"-title")}t.addClass("sapUiUx3QV");t.writeClasses();if(w){t.addStyle("width",w);t.writeStyles()}t.write(">");t.write("<div");t.writeAttribute("id",l+"-title");t.writeAttribute("tabindex","-1");t.addClass("sapUiUx3QVHeader");t.writeClasses();t.write(">");t.writeEscaped(a);t.write("</div>");if(d||s||o){t.write("<div");if(r){t.writeAttribute("role","heading")}t.addClass("sapUiUx3QVHeading");t.writeClasses();t.write(">");if(d){if(i.isIconURI(d)){u={title:s,tabindex:"-1"}}t.writeIcon(d,"sapUiUx3QVIcon",u)}t.write("<span");t.writeAttribute("id",l+"-name");if(r&&o){t.writeAttribute("aria-describedby",l+"-descr")}t.addClass("sapUiUx3QVTitle1");t.writeClasses();t.write(">");if(n){t.write("<a");t.writeAttribute("id",l+"-link");t.writeAttributeEscaped("href",n);t.writeAttribute("tabindex","-1");t.write(">")}t.writeEscaped(s||"");if(n){t.write("</a>")}t.write("</span>");if(o){t.write("<br><span");t.writeAttribute("id",l+"-descr");t.writeAttribute("tabindex","-1");t.addClass("sapUiUx3QVTitle2");t.writeClasses();t.write(">");t.writeEscaped(o);t.write("</span>")}t.write("</div>")}t.write('<div id="'+l+'-content">');this.renderBody(t,e);t.write("</div>");t.write("</div>");if(e.getShowActionBar()&&e.getActionBar()){t.renderControl(e.getActionBar())}};r.renderBody=function(t,e){var i=e.getContent();for(var r=0;r<i.length;r++){t.write('<div class="sapUiUx3QVBody">');if(i[r]instanceof sap.ui.core.Control){t.renderControl(i[r])}else if(i[r].getContent&&typeof i[r].getContent=="function"){var a=i[r].getContent();for(var s=0;s<a.length;s++){if(a[s]instanceof sap.ui.core.Control){t.renderControl(a[s])}}}t.write("</div>")}};return r},true);
//# sourceMappingURL=QuickViewRenderer.js.map
/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/ui/core/Renderer","sap/ui/core/Core","sap/ui/Device","sap/m/StandardListItemRenderer"],function(e,t,s,i,r){"use strict";var n=t.extend(r);n.apiVersion=2;var a=e.AttributesLayoutType;n.renderLIAttributes=function(e,t){r.renderLIAttributes.apply(this,arguments);e.class("sapUiIntLCI");if(t.getIcon()){e.class("sapUiIntLCIIconSize"+t.getIconSize())}if(t.getMicrochart()){e.class("sapUiIntLCIWithChart")}if(t.getActionsStrip()){e.class("sapUiIntLCIWithActionsStrip")}if(t._getVisibleAttributes().length){e.class("sapUiIntLCIWithAttributes")}};n.renderLIContent=function(e,t){var s=t.getInfo(),i=t.getTitle(),r=t.getDescription(),n=t.getAdaptTitleSize(),a=!i&&s;if(t.getIcon()||t.getIconInitials()){e.renderControl(t._getAvatar())}e.openStart("div").class("sapMSLIDiv");if(!r&&n&&s||a){e.class("sapMSLIInfoMiddle")}e.openEnd();this.renderTitleWrapper(e,t);if(i&&r){this.renderDescription(e,t)}if(a&&!t.getWrapping()){this.renderInfo(e,t)}e.close("div")};n.render=function(e,t){if(!t.getVisible()){this.renderInvisible(e,t);return}this.openItemTag(e,t);e.class("sapMLIB");e.class("sapMLIB-CTX");e.class("sapMLIBShowSeparator");e.class("sapMLIBType"+t.getType());e.class("sapMLIB");if(i.system.desktop&&t.isActionable()){e.class("sapMLIBActionable");e.class("sapMLIBHoverable")}if(t.getSelected()){e.class("sapMLIBSelected")}if(t.getListProperty("showUnread")&&t.getUnread()){e.class("sapMLIBUnread")}this.addFocusableClasses(e,t);this.renderTooltip(e,t);this.renderTabIndex(e,t);if(s.getConfiguration().getAccessibility()){e.accessibilityState(t,this.getAccessibilityState(t))}this.renderLIAttributes(e,t);e.openEnd();this.renderContentFormer(e,t);this.renderLIContentWrapper(e,t);this.renderContentLatter(e,t);this.renderItemAttributes(e,t);this.renderFooter(e,t);this.closeItemTag(e,t)};n.renderItemAttributes=function(e,t){var s=t._getVisibleAttributes(),i=t.getAttributesLayoutType(),r=s.length,n;if(!r){return}e.openStart("div").class("sapUiIntLCIAttrs").openEnd();for(n=0;n<r;n++){e.openStart("div").class("sapUiIntLCIAttrRow").openEnd();e.openStart("span").class("sapUiIntLCIAttrCell").openEnd();e.renderControl(s[n]);e.close("span");if(i===a.TwoColumns){n++;if(s[n]){e.openStart("span").class("sapUiIntLCIAttrCell").class("sapUiIntLCIAttrSecondCell").openEnd();e.renderControl(s[n]);e.close("span")}}e.close("div")}e.close("div")};n.renderFooter=function(e,t){var s=t.getMicrochart(),i=t.getActionsStrip();if(!s&&!i){return}e.openStart("div").class("sapUiIntLCIFooter").openEnd();if(s){e.renderControl(s)}if(i){e.renderControl(i)}e.close("div")};return n},true);
//# sourceMappingURL=ListContentItemRenderer.js.map
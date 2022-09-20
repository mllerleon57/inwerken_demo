/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library"],function(e,t){"use strict";var i=t.TextDirection;var a=t.ValueState;var r={};r.render=function(t,i){var r=i.getId();var d=i.getTooltip_AsString();t.addClass("sapUiRb");t.write("<span");t.writeControlData(i);t.writeAccessibilityState(i,{role:"radio",checked:i.getSelected()===true,invalid:i.getValueState()==a.Error,disabled:!i.getEditable(),labelledby:r+"-label",describedby:d?r+"-Descr":undefined});var s=i.getEnabled()!=null&&i.getEnabled();var l=i.getEditable()!=null&&i.getEditable();var n=false;var c=false;if(i.getValueState()!=null){n=a.Error==i.getValueState();c=a.Warning==i.getValueState()}if(i.getSelected()){t.addClass("sapUiRbSel")}var b=0;var u=false;if(!s){b=-1;u=true;t.addClass("sapUiRbDis")}if(!l){u=true;t.addClass("sapUiRbRo")}if(n){t.addClass("sapUiRbErr")}else if(c){t.addClass("sapUiRbWarn")}if(s&&l&&!n&&!c){t.addClass("sapUiRbStd")}if(s&&l){t.addClass("sapUiRbInteractive")}t.writeClasses();if(i.getWidth()&&i.getWidth()!=""){t.writeAttribute("style","width:"+i.getWidth()+";")}t.writeAttribute("tabindex",b);var w=e.enrichTooltip(i,d?d:i.getText());if(w){t.writeAttributeEscaped("title",w)}t.write(">");t.write("<input type='radio' tabindex='-1' id='");t.write(r);t.write("-RB' name=\"");t.writeEscaped(i.getGroupName());t.write('" ');if(i.getSelected()){t.write(" checked='checked'")}if(!s){t.write(" disabled='disabled'")}if(u){t.write(" readonly='readonly'");t.write(" disabled='disabled'")}if(i.getKey()){t.writeAttributeEscaped("value",i.getKey())}t.write(">");t.write('<label id="'+r+'-label"');t.writeAttribute("for",r+"-RB");if(!i.getText()){t.write(' class="sapUiRbNoText"')}t.write(">");if(i.getText()){this.renderText(t,i.getText(),i.getTextDirection())}t.write("</label>");if(d){t.write('<span id="'+r+'-Descr" style="visibility: hidden; display: none;">');t.writeEscaped(d);t.write("</span>")}t.write("</span>")};r.renderText=function(e,t,a){if(!a||a==i.Inherit){e.writeEscaped(t)}else{e.write('<span style="direction:'+a.toLowerCase()+';">');e.writeEscaped(t);e.write("</span>")}};r.setSelected=function(e,t){e.$().toggleClass("sapUiRbSel",t).attr("aria-checked",t);var i=e.getDomRef("RB");if(t){i.checked=true;i.setAttribute("checked","checked")}else{i.checked=false;i.removeAttribute("checked")}};return r},true);
//# sourceMappingURL=RadioButtonRenderer.js.map
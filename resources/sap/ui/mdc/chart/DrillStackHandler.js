/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/m/ResponsivePopover","sap/m/List","sap/m/Bar","sap/m/StandardListItem","sap/ui/core/InvisibleText","sap/m/library","sap/ui/Device","sap/base/Log"],function(e,t,n,r,o,a,i,s,l){"use strict";var d=i.PlacementType;var c=i.ListType;var u=i.ListMode;function p(e){var t=e.getControlDelegate().getDrillStack(e);var n=[];t.forEach(function(e){e.dimension.forEach(function(e){if(e!=null&&e!=""&&n.indexOf(e)==-1){n.push(e)}})});return n}var m=function(){};m.createDrillDownPopover=function(o){var i=new r;var l=new t({id:o.getId()+"-drilldownPopover",contentWidth:"25rem",contentHeight:"20rem",placement:d.Bottom,subHeader:i});var c=new n({mode:u.SingleSelectMaster,selectionChange:function(e){var t=e.getParameter("listItem");if(t){o.getEngine().createChanges({control:o,key:"Item",state:[{name:t.data("dim").dim.name,position:o.getItems().length}]})}l.close()}});l.attachAfterClose(function(){l.destroy()});var p=e.getLibraryResourceBundle("sap.ui.mdc");if(s.system.desktop){var m=new a({text:p.getText("chart.CHART_DRILLDOWN_TITLE")});l.setShowHeader(false);l.addContent(m);l.addAriaLabelledBy(m)}else{l.setTitle(p.getText("chart.CHART_DRILLDOWN_TITLE"))}l.addContent(c);o._oDrillDownPopover=l;return l};m.showDrillDownPopover=function(e,t){var r=e.getControlDelegate().getSortedDimensions(e);return r.then(function(r){var a=e._oDrillDownPopover;var i,s,d;var u=a.getContent().filter(function(e){return e.getMetadata().getClass()==n});var m=u.length>0?u[0]:null;if(!m){l.error("MDC Chart: Could not determine list to show drilldown. This should not happen. Did the application modify the drill-down popover?");return}m.destroyItems();i=p(e);for(var v=0;v<r.length;v++){s=r[v];if(i.indexOf(s.name)>-1){continue}d=new o({title:s.label,type:c.Active});d.data("dim",{dim:s});m.addItem(d)}return new Promise(function(e,n){a.attachEventOnce("afterOpen",function t(n){e(a)});a.openBy(t)})})};return m});
//# sourceMappingURL=DrillStackHandler.js.map
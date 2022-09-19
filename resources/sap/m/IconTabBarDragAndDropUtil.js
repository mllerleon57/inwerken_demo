/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var I="Before",a="insertBefore",b="insertAfter",i,D="IconTabReorder";var c={_insertControl:function(i,d,$){if(i===b){d.insertAfter($);}else{d.insertBefore($);}},handleDrop:function(d,s,o,e,f){var B=d.indexOfItem(o),g=d.indexOfItem(e),$=o.$(),h=e.$(),A=0,r=sap.ui.getCore().getConfiguration().getRTL(),j=s===I;if(r&&!f){if(j){A=B<g?g:g+1;i=b;}else{A=B<g?g-1:g;i=a;}}else{if(j){A=B<g?g-1:g;i=a;}else{A=B<g?g:g+1;i=b;}}c._insertControl(i,$,h);c._handleConfigurationAfterDragAndDrop.call(d,o,A);},_updateAccessibilityInfo:function(){var o=this.getItems(),A=1,d;o.forEach(function(e){d=e.getDomRef();if(d&&d.getAttribute("aria-posinset")!==null){d.setAttribute("aria-posinset",A++);}});},_handleConfigurationAfterDragAndDrop:function(d,e){this.removeAggregation('items',d,true);this.insertAggregation('items',d,e,true);c._updateAccessibilityInfo.call(this);},_decreaseDropIndex:function(B){if(B===0){i=b;return B;}i=a;return B-1;},_increaseDropIndex:function(B,C){if(B===C-1){i=a;return B;}i=b;return B+1;},moveItem:function(d,k){var $=d.$(),e=this.getItems(),B=this.indexOfItem(d),r=sap.ui.getCore().getConfiguration().getRTL(),n,f,K=jQuery.sap.KeyCodes;switch(k){case K.HOME:n=0;i=a;break;case K.END:n=e.length-1;i=b;break;case K.ARROW_LEFT:if(r){n=c._increaseDropIndex(B,e.length);}else{n=c._decreaseDropIndex(B);}break;case K.ARROW_RIGHT:if(r){n=c._decreaseDropIndex(B);}else{n=c._increaseDropIndex(B,e.length);}break;case K.ARROW_DOWN:n=c._increaseDropIndex(B,e.length);break;case K.ARROW_UP:n=c._decreaseDropIndex(B);break;default:return;}f=e[n].$();c._insertControl(i,$,f);c._handleConfigurationAfterDragAndDrop.call(this,d,n);return true;},getDraggedDroppedItemsFromList:function(d,o,e){var f,g,s,h,j;j=o._tabFilter?o._tabFilter.getId():o.getId();h=e._tabFilter?e._tabFilter.getId():e.getId();if(!d&&!o&&!e){return;}d.forEach(function(k){s=k._tabFilter.getId();if(!s){return;}if(s===h){f=k;}if(s===j){g=k;}});return{oDraggedControlFromList:g,oDroppedControlFromList:f};},setDragDropAggregations:function(d,e,f,s){var g=d._iconTabHeader?d._iconTabHeader.getId():d.getId();d.addDragDropConfig(new e({sourceAggregation:"items",groupName:D+g}));d.addDragDropConfig(new f({targetAggregation:"items",dropPosition:"Between",dropLayout:s,drop:d._handleDragAndDrop.bind(d),groupName:D+g}));}};return c;});
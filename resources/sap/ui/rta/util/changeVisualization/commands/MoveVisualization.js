/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/util/changeVisualization/ChangeVisualizationUtils","sap/ui/core/util/reflection/JsControlTreeModifier"],function(t,e){"use strict";var r={};r.getDescription=function(r,n,i){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var o=a.getText("TXT_CHANGEVISUALIZATION_CHANGE_MOVE_WITHIN",t.shortenString(n));var T=a.getText("TXT_CHANGEVISUALIZATION_CHANGE_MOVE_WITHIN",n);var I;var N=i.appComponent;var A=r.sourceParentContainer&&e.getControlIdBySelector(r.sourceParentContainer,N);var C=r.targetParentContainer&&e.getControlIdBySelector(r.targetParentContainer,N);if(A!==C){o=a.getText("TXT_CHANGEVISUALIZATION_CHANGE_MOVE",t.shortenString(n));T=A&&a.getText("TXT_CHANGEVISUALIZATION_CHANGE_MOVE",n)||"";I=A&&a.getText("BTN_CHANGEVISUALIZATION_SHOW_DEPENDENT_CONTAINER_MOVE")}return{descriptionText:o,descriptionTooltip:T,buttonText:I}};return r});
//# sourceMappingURL=MoveVisualization.js.map
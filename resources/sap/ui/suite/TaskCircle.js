/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","./library","./TaskCircleRenderer"],function(e,a,r,t){"use strict";var i=r.TaskCircleColor;var o=e.extend("sap.ui.suite.TaskCircle",{metadata:{library:"sap.ui.suite",properties:{value:{type:"int",group:"Misc",defaultValue:0},maxValue:{type:"int",group:"Misc",defaultValue:100},minValue:{type:"int",group:"Misc",defaultValue:0},color:{type:"sap.ui.suite.TaskCircleColor",group:"Misc",defaultValue:i.Gray}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}}});a.call(o.prototype);o.prototype.init=function(){};o.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation()};o.prototype.focus=function(){var e=this.getDomRef();if(e){e.focus()}};return o});
//# sourceMappingURL=TaskCircle.js.map
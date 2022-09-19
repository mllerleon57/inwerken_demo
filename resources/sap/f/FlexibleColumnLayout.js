/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/Control","sap/m/library","sap/m/Button","sap/m/NavContainer","sap/ui/core/Configuration","./FlexibleColumnLayoutRenderer","jquery.sap.events"],function(q,l,D,R,C,m,B,N,a,F){"use strict";var L=l.LayoutType;var b=C.extend("sap.f.FlexibleColumnLayout",{metadata:{properties:{layout:{type:"sap.f.LayoutType",defaultValue:L.OneColumn},defaultTransitionNameBeginColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameMidColumn:{type:"string",group:"Appearance",defaultValue:"slide"},defaultTransitionNameEndColumn:{type:"string",group:"Appearance",defaultValue:"slide"},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:m.BackgroundDesign.Transparent}},aggregations:{beginColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getBeginColumn",aggregation:"pages"}},midColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getMidColumn",aggregation:"pages"}},endColumnPages:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getEndColumn",aggregation:"pages"}},_beginColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_midColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_endColumnNav:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"},_beginColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_midColumnBackArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_endColumnForwardArrow:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{initialBeginColumnPage:{type:"sap.ui.core.Control",multiple:false},initialMidColumnPage:{type:"sap.ui.core.Control",multiple:false},initialEndColumnPage:{type:"sap.ui.core.Control",multiple:false}},events:{stateChange:{parameters:{layout:{type:"sap.f.LayoutType"},maxColumnsCount:{type:"int"},isNavigationArrow:{type:"boolean"},isResize:{type:"boolean"}}},beginColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterBeginColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},midColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterMidColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},endColumnNavigate:{allowPreventDefault:true,parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}},afterEndColumnNavigate:{parameters:{from:{type:"sap.ui.core.Control"},fromId:{type:"string"},to:{type:"sap.ui.core.Control"},toId:{type:"string"},firstTime:{type:"boolean"},isTo:{type:"boolean"},isBack:{type:"boolean"},isBackToTop:{type:"boolean"},isBackToPage:{type:"boolean"},direction:{type:"string"}}}}}});b.COLUMN_RESIZING_ANIMATION_DURATION=560;b.prototype.init=function(){this._initNavContainers();this._initButtons();this._oLayoutHistory=new c();};b.prototype._createNavContainer=function(s){var d=s.charAt(0).toUpperCase()+s.slice(1);return new N(this.getId()+"-"+s+"ColumnNav",{navigate:function(e){this._handleNavigationEvent(e,false,s);}.bind(this),afterNavigate:function(e){this._handleNavigationEvent(e,true,s);}.bind(this),defaultTransitionName:this["getDefaultTransitionName"+d+"Column"]()});};b.prototype._handleNavigationEvent=function(e,A,s){var E,d;if(A){E="after"+(s.charAt(0).toUpperCase()+s.slice(1))+"ColumnNavigate";}else{E=s+"ColumnNavigate";}d=this.fireEvent(E,e.mParameters,true);if(!d){e.preventDefault();}};b.prototype._getBeginColumn=function(){return this.getAggregation("_beginColumnNav");};b.prototype._getMidColumn=function(){return this.getAggregation("_midColumnNav");};b.prototype._getEndColumn=function(){return this.getAggregation("_endColumnNav");};b.prototype._flushColumnContent=function(s){var o=this.getAggregation("_"+s+"ColumnNav"),r=sap.ui.getCore().createRenderManager();r.renderControl(o);r.flush(this._$columns[s].find(".sapFFCLColumnContent")[0],undefined,true);r.destroy();};b.prototype.setLayout=function(n){n=this.validateProperty("layout",n);var s=this.getLayout();if(s===n){return this;}var r=this.setProperty("layout",n,true);this._oLayoutHistory.addEntry(n);this._resizeColumns();this._hideShowArrows();return r;};b.prototype.setBackgroundDesign=function(n){n=this.validateProperty("backgroundDesign",n);var s=this.getBackgroundDesign();if(s===n){return this;}var r=this.setProperty("backgroundDesign",n,true);if(s!==m.BackgroundDesign.Transparent){this.$().removeClass("sapFFCLBackgroundDesign"+s);}if(n!==m.BackgroundDesign.Transparent){this.$().addClass("sapFFCLBackgroundDesign"+n);}return r;};b.prototype.onBeforeRendering=function(){this._deregisterResizeHandler();};b.prototype.onAfterRendering=function(){this._registerResizeHandler();this._cacheDOMElements();this._hideShowArrows();this._resizeColumns();this._flushColumnContent("begin");this._flushColumnContent("mid");this._flushColumnContent("end");this._fireStateChange(false,false);};b.prototype._getControlWidth=function(){return this.$().width();};b.prototype.exit=function(){this._deregisterResizeHandler();this._handleEvent(q.Event("Destroy"));};b.prototype._registerResizeHandler=function(){this._iResizeHandlerId=R.register(this,this._onResize.bind(this));};b.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){R.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null;}};b.prototype._initNavContainers=function(){this.setAggregation("_beginColumnNav",this._createNavContainer("begin"),true);this.setAggregation("_midColumnNav",this._createNavContainer("mid"),true);this.setAggregation("_endColumnNav",this._createNavContainer("end"),true);};b.prototype._initButtons=function(){var o=new B(this.getId()+"-beginBack",{icon:"sap-icon://slim-arrow-left",tooltip:b._getResourceBundle().getText("FCL_BEGIN_COLUMN_BACK_ARROW"),press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_beginColumnBackArrow",o,true);var M=new B(this.getId()+"-midForward",{icon:"sap-icon://slim-arrow-right",tooltip:b._getResourceBundle().getText("FCL_MID_COLUMN_FORWARD_ARROW"),press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_midColumnForwardArrow",M,true);var d=new B(this.getId()+"-midBack",{icon:"sap-icon://slim-arrow-left",tooltip:b._getResourceBundle().getText("FCL_MID_COLUMN_BACK_ARROW"),press:this._onArrowClick.bind(this,"left")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonRight");this.setAggregation("_midColumnBackArrow",d,true);var e=new B(this.getId()+"-endForward",{icon:"sap-icon://slim-arrow-right",tooltip:b._getResourceBundle().getText("FCL_END_COLUMN_FORWARD_ARROW"),press:this._onArrowClick.bind(this,"right")}).addStyleClass("sapFFCLNavigationButton").addStyleClass("sapFFCLNavigationButtonLeft");this.setAggregation("_endColumnForwardArrow",e,true);};b.prototype._cacheDOMElements=function(){this._cacheColumns();if(!D.system.phone){this._cacheArrows();}};b.prototype._cacheColumns=function(){this._$columns={begin:this.$("beginColumn"),mid:this.$("midColumn"),end:this.$("endColumn")};};b.prototype._cacheArrows=function(){this._$columnButtons={beginBack:this.$("beginBack"),midForward:this.$("midForward"),midBack:this.$("midBack"),endForward:this.$("endForward")};};b.prototype._getVisibleColumnsCount=function(){return["begin","mid","end"].filter(function(s){return this._getColumnSize(s)>0;},this).length;};b.prototype._resizeColumns=function(){var p,n,s,t,A,d=false,e=["begin","mid","end"],r=sap.ui.getCore().getConfiguration().getRTL(),f,v;if(!this.isActive()){return;}v=this._getVisibleColumnsCount();if(v===0){return;}t=(v-1)*b.COLUMN_MARGIN;A=this._getControlWidth()-t;e.forEach(function(g){var o=this._$columns[g];p=this._getColumnSize(g);o.toggleClass("sapFFCLColumnMargin",d&&p>0);o.toggleClass("sapFFCLColumnActive",p>0);o.removeClass("sapFFCLColumnOnlyActive");o.removeClass("sapFFCLColumnLastActive");o.removeClass("sapFFCLColumnFirstActive");n=Math.round(A*(p/100));if([100,0].indexOf(p)!==-1){s=p+"%";}else{s=n+"px";}if(sap.ui.getCore().getConfiguration().getAnimationMode()!==a.AnimationMode.none){var h=o.get(0);R.suspend(h);if(o._iResumeResizeHandlerTimeout){clearTimeout(o._iResumeResizeHandlerTimeout);}o._iResumeResizeHandlerTimeout=setTimeout(function(){R.resume(h);o._iResumeResizeHandlerTimeout=null;},b.COLUMN_RESIZING_ANIMATION_DURATION);}o.width(s);if(!D.system.phone){this._updateColumnContextualSettings(g,n);this._updateColumnCSSClasses(g,n);}if(p>0){d=true;}},this);f=e.filter(function(g){return this._getColumnSize(g)>0;},this);if(r){e.reverse();}if(f.length===1){this._$columns[f[0]].addClass("sapFFCLColumnOnlyActive");}if(f.length>1){this._$columns[f[0]].addClass("sapFFCLColumnFirstActive");this._$columns[f[f.length-1]].addClass("sapFFCLColumnLastActive");}};b.prototype._propagateContextualSettings=function(){};b.prototype._updateColumnContextualSettings=function(s,w){var o,d;o=this.getAggregation("_"+s+"ColumnNav");if(!o){return;}d=o._getContextualSettings();if(!d||d.contextualWidth!==w){o._applyContextualSettings({contextualWidth:w});}};b.prototype._updateColumnCSSClasses=function(s,w){var n="";this._$columns[s].removeClass("sapUiContainer-Narrow sapUiContainer-Medium sapUiContainer-Wide sapUiContainer-ExtraWide");if(w<D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0]){n="Narrow";}else if(w<D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1]){n="Medium";}else if(w<D.media._predefinedRangeSets[D.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2]){n="Wide";}else{n="ExtraWide";}this._$columns[s].addClass("sapUiContainer-"+n);};b.prototype._getColumnSize=function(s){var d=this.getLayout(),e=this._getColumnWidthDistributionForLayout(d),S=e.split("/"),M={begin:0,mid:1,end:2},f=S[M[s]];return parseInt(f,10);};b.prototype.getMaxColumnsCount=function(){return this._getMaxColumnsCountForWidth(this._getControlWidth());};b.prototype._getMaxColumnsCountForWidth=function(w){if(w>=b.DESKTOP_BREAKPOINT){return 3;}if(w>=b.TABLET_BREAKPOINT&&w<b.DESKTOP_BREAKPOINT){return 2;}if(w>0){return 1;}return 0;};b.prototype._onResize=function(e){var o=e.oldSize.width,n=e.size.width,O,M;if(n===0){return;}O=this._getMaxColumnsCountForWidth(o);M=this._getMaxColumnsCountForWidth(n);this._resizeColumns();if(M!==O){this._hideShowArrows();this._fireStateChange(false,true);}};b.prototype._onArrowClick=function(s){var d=this.getLayout(),i=typeof b.SHIFT_TARGETS[d]!=="undefined"&&typeof b.SHIFT_TARGETS[d][s]!=="undefined",n;n=i?b.SHIFT_TARGETS[d][s]:L.OneColumn;this.setLayout(n);if(b.ARROWS_NAMES[n][s]!==b.ARROWS_NAMES[d][s]&&i){var o=s==='right'?'left':'right';this._$columnButtons[b.ARROWS_NAMES[n][o]].focus();}this._fireStateChange(true,false);};b.prototype._hideShowArrows=function(){var s=this.getLayout(),M={},n=[],i;if(!this.isActive()||D.system.phone){return;}i=this.getMaxColumnsCount();if(i>1){M[L.TwoColumnsBeginExpanded]=["beginBack"];M[L.TwoColumnsMidExpanded]=["midForward"];M[L.ThreeColumnsMidExpanded]=["midForward","midBack"];M[L.ThreeColumnsEndExpanded]=["endForward"];M[L.ThreeColumnsMidExpandedEndHidden]=["midForward","midBack"];M[L.ThreeColumnsBeginExpandedEndHidden]=["beginBack"];if(typeof M[s]==="object"){n=M[s];}}this._toggleButton("beginBack",n.indexOf("beginBack")!==-1);this._toggleButton("midForward",n.indexOf("midForward")!==-1);this._toggleButton("midBack",n.indexOf("midBack")!==-1);this._toggleButton("endForward",n.indexOf("endForward")!==-1);};b.prototype._toggleButton=function(s,S){this._$columnButtons[s].toggle(S);};b.prototype._fireStateChange=function(i,I){if(this._getControlWidth()===0){return;}this.fireStateChange({isNavigationArrow:i,isResize:I,layout:this.getLayout(),maxColumnsCount:this.getMaxColumnsCount()});};b.prototype.setInitialBeginColumnPage=function(p){this._getBeginColumn().setInitialPage(p);this.setAssociation('initialBeginColumnPage',p,true);return this;};b.prototype.setInitialMidColumnPage=function(p){this._getMidColumn().setInitialPage(p);this.setAssociation('initialMidColumnPage',p,true);return this;};b.prototype.setInitialEndColumnPage=function(p){this._getEndColumn().setInitialPage(p);this.setAssociation('initialEndColumnPage',p,true);return this;};b.prototype.to=function(p,t,d,T){if(this._getBeginColumn().getPage(p)){this._getBeginColumn().to(p,t,d,T);}else if(this._getMidColumn().getPage(p)){this._getMidColumn().to(p,t,d,T);}else{this._getEndColumn().to(p,t,d,T);}return this;};b.prototype.backToPage=function(p,o,t){if(this._getBeginColumn().getPage(p)){this._getBeginColumn().backToPage(p,o,t);}else if(this._getMidColumn().getPage(p)){this._getMidColumn().backToPage(p,o,t);}else{this._getEndColumn().backToPage(p,o,t);}return this;};b.prototype._safeBackToPage=function(p,t,d,T){if(this._getBeginColumn().getPage(p)){this._getBeginColumn()._safeBackToPage(p,t,d,T);}else if(this._getMidColumn().getPage(p)){this._getMidColumn()._safeBackToPage(p,t,d,T);}else{this._getEndColumn()._safeBackToPage(p,t,d,T);}};b.prototype.toBeginColumnPage=function(p,t,d,T){this._getBeginColumn().to(p,t,d,T);return this;};b.prototype.toMidColumnPage=function(p,t,d,T){this._getMidColumn().to(p,t,d,T);return this;};b.prototype.toEndColumnPage=function(p,t,d,T){this._getEndColumn().to(p,t,d,T);return this;};b.prototype.backBeginColumn=function(d,t){return this._getBeginColumn().back(d,t);};b.prototype.backMidColumn=function(d,t){return this._getMidColumn().back(d,t);};b.prototype.backEndColumn=function(d,t){return this._getEndColumn().back(d,t);};b.prototype.backBeginColumnToPage=function(p,d,t){return this._getBeginColumn().backToPage(p,d,t);};b.prototype.backMidColumnToPage=function(p,d,t){return this._getMidColumn().backToPage(p,d,t);};b.prototype.backEndColumnToPage=function(p,d,t){return this._getEndColumn().backToPage(p,d,t);};b.prototype.backToTopBeginColumn=function(o,t){this._getBeginColumn().backToTop(o,t);return this;};b.prototype.backToTopMidColumn=function(o,t){this._getMidColumn().backToTop(o,t);return this;};b.prototype.backToTopEndColumn=function(o,t){this._getEndColumn().backToTop(o,t);return this;};b.prototype.getCurrentBeginColumnPage=function(){return this._getBeginColumn().getCurrentPage();};b.prototype.getCurrentMidColumnPage=function(){return this._getMidColumn().getCurrentPage();};b.prototype.getCurrentEndColumnPage=function(){return this._getEndColumn().getCurrentPage();};b.prototype.setDefaultTransitionNameBeginColumn=function(t){this.setProperty("defaultTransitionNameBeginColumn",t,true);this._getBeginColumn().setDefaultTransitionName(t);return this;};b.prototype.setDefaultTransitionNameMidColumn=function(t){this.setProperty("defaultTransitionNameMidColumn",t,true);this._getMidColumn().setDefaultTransitionName(t);return this;};b.prototype.setDefaultTransitionNameEndColumn=function(t){this.setProperty("defaultTransitionNameEndColumn",t,true);this._getEndColumn().setDefaultTransitionName(t);return this;};b.prototype._getLayoutHistory=function(){return this._oLayoutHistory;};b.prototype._getColumnWidthDistributionForLayout=function(s,A){var M=this.getMaxColumnsCount(),o={},r;if(M===0){r="0/0/0";}else{o[L.OneColumn]="100/0/0";o[L.MidColumnFullScreen]="0/100/0";o[L.EndColumnFullScreen]="0/0/100";if(M===1){o[L.TwoColumnsBeginExpanded]="0/100/0";o[L.TwoColumnsMidExpanded]="0/100/0";o[L.ThreeColumnsMidExpanded]="0/0/100";o[L.ThreeColumnsEndExpanded]="0/0/100";o[L.ThreeColumnsMidExpandedEndHidden]="0/0/100";o[L.ThreeColumnsBeginExpandedEndHidden]="0/0/100";}else{o[L.TwoColumnsBeginExpanded]="67/33/0";o[L.TwoColumnsMidExpanded]="33/67/0";o[L.ThreeColumnsMidExpanded]=M===2?"0/67/33":"25/50/25";o[L.ThreeColumnsEndExpanded]=M===2?"0/33/67":"25/25/50";o[L.ThreeColumnsMidExpandedEndHidden]="33/67/0";o[L.ThreeColumnsBeginExpandedEndHidden]="67/33/0";}r=o[s];}if(A){r=r.split("/").map(function(d){return parseInt(d,10);});}return r;};b.COLUMN_MARGIN=8;b.DESKTOP_BREAKPOINT=1280;b.TABLET_BREAKPOINT=960;b.ARROWS_NAMES={TwoColumnsBeginExpanded:{"left":"beginBack"},TwoColumnsMidExpanded:{"right":"midForward"},ThreeColumnsMidExpanded:{"left":"midBack","right":"midForward"},ThreeColumnsEndExpanded:{"right":"endForward"},ThreeColumnsMidExpandedEndHidden:{"left":"midBack","right":"midForward"},ThreeColumnsBeginExpandedEndHidden:{"left":"beginBack"}};b._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f");};b.SHIFT_TARGETS={TwoColumnsBeginExpanded:{"left":L.TwoColumnsMidExpanded},TwoColumnsMidExpanded:{"right":L.TwoColumnsBeginExpanded},ThreeColumnsMidExpanded:{"left":L.ThreeColumnsEndExpanded,"right":L.ThreeColumnsMidExpandedEndHidden},ThreeColumnsEndExpanded:{"right":L.ThreeColumnsMidExpanded},ThreeColumnsMidExpandedEndHidden:{"left":L.ThreeColumnsMidExpanded,"right":L.ThreeColumnsBeginExpandedEndHidden},ThreeColumnsBeginExpandedEndHidden:{"left":L.ThreeColumnsMidExpandedEndHidden}};function c(){this._aLayoutHistory=[];}c.prototype.addEntry=function(s){if(typeof s!=="undefined"){this._aLayoutHistory.push(s);}};c.prototype.getClosestEntryThatMatches=function(d){var i;for(i=this._aLayoutHistory.length-1;i>=0;i--){if(d.indexOf(this._aLayoutHistory[i])!==-1){return this._aLayoutHistory[i];}}};return b;});

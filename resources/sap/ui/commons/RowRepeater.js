/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control',"./RowRepeaterRenderer"],function(q,a,C,R){"use strict";var b=C.extend("sap.ui.commons.RowRepeater",{metadata:{library:"sap.ui.commons",properties:{numberOfRows:{type:"int",group:"Dimension",defaultValue:5},currentPage:{type:"int",group:"Data",defaultValue:1},showMoreSteps:{type:"int",group:"Behavior",defaultValue:0},fixedRowHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},design:{type:"sap.ui.commons.RowRepeaterDesign",group:"Appearance",defaultValue:sap.ui.commons.RowRepeaterDesign.Standard},threshold:{type:"int",defaultValue:null}},defaultAggregation:"rows",aggregations:{rows:{type:"sap.ui.core.Control",multiple:true,singularName:"row",bindable:"bindable"},title:{type:"sap.ui.core.Title",multiple:false},filters:{type:"sap.ui.commons.RowRepeaterFilter",multiple:true,singularName:"filter"},sorters:{type:"sap.ui.commons.RowRepeaterSorter",multiple:true,singularName:"sorter"},noData:{type:"sap.ui.core.Control",multiple:false},filterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},sorterToolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"},headerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerShowMoreButton:{type:"sap.ui.commons.Button",multiple:false,visibility:"hidden"},footerPager:{type:"sap.ui.commons.Paginator",multiple:false,visibility:"hidden"}},events:{filter:{parameters:{filterId:{type:"string"}}},sort:{parameters:{sorterId:{type:"string"}}},page:{parameters:{currentPage:{type:"int"},previousPage:{type:"int"}}},resize:{parameters:{numberOfRows:{type:"int"},previousNumberOfRows:{type:"int"}}}}}});b.prototype.bPagingMode=true;b.prototype.bShowAnimation=true;b.SHOW_MORE="show_more";b.RESIZE="resize";b.FIRST_PAGE="first_page";b.LAST_PAGE="last_page";b.PREVIOUS_PAGE="previous_page";b.NEXT_PAGE="next_page";b.GOTO_PAGE="goto_page";b.prototype.init=function(){var i=this.getId();this.oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.sCurrentAnimation=null;this.aAnimationQueue=[];this.aRemoveBuffer=[];this.iPreviousPage=this.getCurrentPage();this.iPreviousNumberOfRows=this.getNumberOfRows();this.setAggregation("filterToolbar",new sap.ui.commons.Toolbar(i+"-ftb",{standalone:false,design:sap.ui.commons.ToolbarDesign.Transparent}));this.setAggregation("sorterToolbar",new sap.ui.commons.Toolbar(i+"-stb",{standalone:false}));var p=new sap.ui.commons.Paginator(i+"-fp",{page:[this.paging,this]});this.setAggregation("footerPager",p);var s=this.oResourceBundle.getText("SHOW_MORE");this.setAggregation("headerShowMoreButton",new sap.ui.commons.Button(i+"-hsm",{text:s,tooltip:s,press:[this.triggerShowMore,this]}));this.setAggregation("footerShowMoreButton",new sap.ui.commons.Button(i+"-fsm",{text:s,tooltip:s,press:[this.triggerShowMore,this]}));this._bSecondPage=false;};b.prototype.triggerShowMore=function(){if(this.getShowMoreSteps()<=0){return this;}var s=this.getShowMoreSteps();var n=this.getNumberOfRows();var N=Math.min(this._getRowCount(),n+s);if(n===N){return this;}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.SHOW_MORE,animationFunction:this.triggerShowMore,args:arguments});return this;}else{this.sCurrentAnimation=b.SHOW_MORE;}this.iPreviousNumberOfRows=n;this.setProperty("numberOfRows",N,true);this.startResizeAnimation();}else{this.setNumberOfRows(N);}this.fireResize({numberOfRows:N,previousNumberOfRows:n});return this;};b.prototype.resize=function(n){if(this.getShowMoreSteps()<=0){return this;}var N=this.getNumberOfRows();if(n<=0||n>this._getRowCount()||n===N){return this;}if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.RESIZE,animationFunction:this.resize,args:arguments});return this;}else{this.sCurrentAnimation=b.RESIZE;}this.iPreviousNumberOfRows=N;this.setProperty("numberOfRows",n,true);this.startResizeAnimation();}else{this.setNumberOfRows(n);}this.fireResize({numberOfRows:n,previousNumberOfRows:N});return this;};b.prototype.applyFilter=function(i){var f=this.getFilters();var l=this.getBinding("rows");var F,n;if(f.length===0||l===null){return this;}for(n=0;n<f.length;n++){if(f[n].getId()===i){F=f[n];break;}}if(F){l.filter(F.getFilters(),sap.ui.model.FilterType.Control);this.fireFilter({filterId:i});this.firstPage();}return this;};b.prototype.triggerSort=function(i){var s=this.getSorters();var l=this.getBinding("rows");var S,n;if(s.length===0||l===null){return this;}for(n=0;n<s.length;n++){if(s[n].getId()===i){S=s[n];break;}}if(S){l.sort(S.getSorter());this.fireSort({sorterId:i});this.firstPage();}return this;};b.prototype.firstPage=function(){if(this.getShowMoreSteps()>0){return this;}var c=this.getCurrentPage();if(c===1){return this;}this.getAggregation("footerPager").setCurrentPage(1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.FIRST_PAGE,animationFunction:this.firstPage,args:arguments});return this;}else{this.sCurrentAnimation=b.FIRST_PAGE;}this.iPreviousPage=c;this.setProperty("currentPage",1,true);this.startPagingAnimation();}else{this.setCurrentPage(1);}this.firePage({currentPage:1,previousPage:c});return this;};b.prototype.lastPage=function(){if(this.getShowMoreSteps()>0){return this;}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(c===l){return this;}this.getAggregation("footerPager").setCurrentPage(l);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.LAST_PAGE,animationFunction:this.lastPage,args:arguments});return this;}else{this.sCurrentAnimation=b.LAST_PAGE;}this.iPreviousPage=c;this.setProperty("currentPage",l,true);this.startPagingAnimation();}else{this.setCurrentPage(l);}this.firePage({currentPage:l,previousPage:c});return this;};b.prototype.previousPage=function(){if(this.getShowMoreSteps()>0){return this;}var c=this.getCurrentPage();if(c<=1){return this;}this.getAggregation("footerPager").setCurrentPage(c-1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.PREVIOUS_PAGE,animationFunction:this.previousPage,args:arguments});return this;}else{this.sCurrentAnimation=b.PREVIOUS_PAGE;}this.iPreviousPage=c;this.setProperty("currentPage",c-1,true);this.startPagingAnimation();}else{this.setCurrentPage(c-1);}this.firePage({currentPage:c-1,previousPage:c});return this;};b.prototype.nextPage=function(){if(this.getShowMoreSteps()>0){return this;}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(c>=l){return this;}this.getAggregation("footerPager").setCurrentPage(c+1);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.NEXT_PAGE,animationFunction:this.nextPage,args:arguments});return this;}else{this.sCurrentAnimation=b.NEXT_PAGE;}this.iPreviousPage=c;this.setProperty("currentPage",c+1,true);this.startPagingAnimation();}else{this.setCurrentPage(c+1);}this.firePage({currentPage:c+1,previousPage:c});return this;};b.prototype.gotoPage=function(p){if(this.getShowMoreSteps()>0){return this;}var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(p<1||p>l||c===p){return this;}this.getAggregation("footerPager").setCurrentPage(p);if(this.getDomRef()&&this.bShowAnimation){if(this.sCurrentAnimation!==null){this.aAnimationQueue.push({name:b.GOTO_PAGE,animationFunction:this.gotoPage,args:arguments});return this;}else{this.sCurrentAnimation=b.GOTO_PAGE;}this.iPreviousPage=c;this.setProperty("currentPage",p,true);this.startPagingAnimation();}else{this.setCurrentPage(p);}this.firePage({currentPage:p,previousPage:c});return this;};b.prototype.setNumberOfRows=function(n){this.setProperty("numberOfRows",n);if(this.getBinding("rows")){this.updateRows(true);}this.updateChildControls();return this;};b.prototype.setCurrentPage=function(c){if(this.getCurrentPage()!=c){this.setProperty("currentPage",c);if(this.getBinding("rows")){this.updateRows(true);}this.updateChildControls();}return this;};b.prototype.setShowMoreSteps=function(s){var n=s>0?false:true,B=this.getBinding("rows");if(n!==this.bPagingMode){this.bPagingMode=n;this.setCurrentPage(1);}this.setProperty("showMoreSteps",s);if(B){this._bSecondPage=false;this.updateRows(true);}return this;};b.prototype.insertRow=function(r,i){this.insertAggregation("rows",r,i);this.updateChildControls();return this;};b.prototype.addRow=function(r){this.addAggregation("rows",r);this.updateChildControls();return this;};b.prototype.removeRow=function(e){this.removeAggregation("rows",e);this.updateChildControls();return this;};b.prototype.removeAllRows=function(){this.removeAllAggregation("rows");this.updateChildControls();return this;};b.prototype.destroyRows=function(){this.destroyAggregation("rows");this.updateChildControls();return this;};b.prototype.setThreshhold=function(t){this.setProperty("threshold",t,true);return this;};b.prototype.insertFilter=function(f,i){var t=this.getAggregation("filterToolbar");var F=f.getId();var B=new sap.ui.commons.Button({text:f.getText(),icon:f.getIcon(),tooltip:f.getTooltip(),press:[function(){this.applyFilter(F);},this]});t.insertItem(B,i);this.insertAggregation("filters",f,i);return this;};b.prototype.addFilter=function(f){var t=this.getAggregation("filterToolbar");var F=f.getId();var B=new sap.ui.commons.Button({text:f.getText(),icon:f.getIcon(),tooltip:f.getTooltip(),press:[function(){this.applyFilter(F);},this]});t.addItem(B);this.addAggregation("filters",f);return this;};b.prototype.removeFilter=function(e){var t=this.getAggregation("filterToolbar");t.removeItem(e);return this.removeAggregation("filters",e);};b.prototype.removeAllFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();return this.removeAllAggregation("filters");};b.prototype.destroyFilters=function(){var t=this.getAggregation("filterToolbar");t.removeAllItems();this.destroyAggregation("filters");return this;};b.prototype.insertSorter=function(s,i){var t=this.getAggregation("sorterToolbar");var S=s.getId();var B=new sap.ui.commons.Button({text:s.getText(),icon:s.getIcon(),tooltip:s.getTooltip(),press:[function(){this.triggerSort(S);},this]});t.insertItem(B,i);this.insertAggregation("sorters",s,i);return this;};b.prototype.addSorter=function(s){var t=this.getAggregation("sorterToolbar");var S=s.getId();var B=new sap.ui.commons.Button({text:s.getText(),icon:s.getIcon(),tooltip:s.getTooltip(),press:[function(){this.triggerSort(S);},this]});t.addItem(B);this.addAggregation("sorters",s);return this;};b.prototype.removeSorter=function(e){var t=this.getAggregation("sorterToolbar");t.removeItem(e);return this.removeAggregation("sorters",e);};b.prototype.removeAllSorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();return this.removeAllAggregation("sorters");};b.prototype.destroySorters=function(){var t=this.getAggregation("sorterToolbar");t.removeAllItems();this.destroyAggregation("sorters");return this;};b.prototype.startPagingAnimation=function(){var c=sap.ui.getCore(),r=c.getRenderManager(),i=this.getId(),p=this.iPreviousPage,P=this.getCurrentPage(),N=this.getNumberOfRows(),s=(P-1)*N,d=this.getRows(),e=this._getRowCount()>N*P?N:this._getRowCount()-N*(P-1),n,B=this.getBinding("rows");var D,j=this.$("page_"+p),o=this.getDomRef("body"),J=q(o);J.css("height",J.outerHeight());var f;if(sap.ui.getCore()&&sap.ui.getCore().getConfiguration()&&sap.ui.getCore().getConfiguration().getRTL()){f=(P<p)?"left":"right";}else{f=(P<p)?"right":"left";}if(B){this._bSecondPage=!this._bSecondPage;this.updateRows(true);d=this.getRows();s=(this._bSecondPage?1:0)*N;}var S="\"top:-"+j.outerHeight(true)+"px;"+f+":"+j.outerWidth(true)+"px;\"";q("<ul id=\""+i+"-page_"+P+"\" class=\"sapUiRrPage\" style="+S+"/>").appendTo(o);var g=o.lastChild;var h=q(g);for(n=s;n<s+e;n++){q("<li id=\""+i+"-row_"+n+"\" class=\"sapUiRrRow\"/>").appendTo(g);D=g.lastChild;r.render(d[n],D);}if(f==="right"){j.animate({right:-j.outerWidth(true)},"slow");h.animate({right:0},"slow");}else{j.animate({left:-j.outerWidth(true)},"slow");h.animate({left:0},"slow");}J.animate({height:h.outerHeight(true)},"slow",q.proxy(this.endPagingAnimation,this));};b.prototype.endPagingAnimation=function(){var d=this.getDomRef("body");var D=this.getDomRef("page_"+this.iPreviousPage);var o=this.getDomRef("page_"+this.getCurrentPage());var j=q(o);q(d).css("height","");q(D).remove();var s;if(sap.ui.getCore()&&sap.ui.getCore().getConfiguration()&&sap.ui.getCore().getConfiguration().getRTL()){s=(this.getCurrentPage()<this.iPreviousPage)?"left":"right";}else{s=(this.getCurrentPage()<this.iPreviousPage)?"right":"left";}j.css("top","");j.css(s,"");this.sCurrentAnimation=null;this.nextQueuedAnimation();};b.prototype.startResizeAnimation=function(){var r=sap.ui.getCore().getRenderManager(),N=this.getNumberOfRows(),o=this.iPreviousNumberOfRows,i=this.getId(),s=0,c,B=this.getBinding("rows");var d,D=this.getDomRef("body"),j=q(D),e=this.getDomRef("page_"+this.getCurrentPage());j.css("height",j.outerHeight());if(B){this.updateRows(true);}c=this.getRows();if(N>o){for(var n=o;n<N;n++){q("<li id=\""+i+"-row_"+n+"\" class=\"sapUiRrRow\"/>").appendTo(e);d=e.lastChild;r.render(c[n],d);}}else{for(var n=N;n<o;n++){d=this.getDomRef("row_"+n);s-=q(d).outerHeight(true);this.aRemoveBuffer.push(d);}}j.animate({height:q(e).outerHeight(true)+s},"slow",q.proxy(this.endResizeAnimation,this));};b.prototype.endResizeAnimation=function(){var d=this.getDomRef("body");while(this.aRemoveBuffer.length>0){q(this.aRemoveBuffer.pop()).remove();}q(d).css("height","");this.sCurrentAnimation=null;this.nextQueuedAnimation();};b.prototype.nextQueuedAnimation=function(){var n,l;var c=1;var Q=this.aAnimationQueue;var p,N;if(Q.length>0){n=Q.shift();}if(n&&Q.length>0){while(Q[0]&&Q[0].name===n.name){c++;l=Q.shift();}if(c>0){switch(n.name){case b.SHOW_MORE:N=Math.min(this._getRowCount(),this.getNumberOfRows()+this.getShowMoreSteps()*c);n={name:b.RESIZE,animationFunction:this.resize,args:[N]};break;case b.RESIZE:n=l;break;case b.FIRST_PAGE:break;case b.LAST_PAGE:break;case b.PREVIOUS_PAGE:p=Math.max(1,this.getCurrentPage()-c);n={name:b.GOTO_PAGE,animationFunction:this.gotoPage,args:[p]};break;case b.NEXT_PAGE:p=Math.min(Math.ceil(this._getRowCount()/this.getNumberOfRows()),this.getCurrentPage()+c);n={name:b.GOTO_PAGE,animationFunction:this.gotoPage,args:[p]};break;case b.GOTO_PAGE:n=l;break;}}}if(n){n.animationFunction.apply(this,n.args);}};b.prototype.paging=function(e){switch(e.getParameter("type")){case sap.ui.commons.PaginatorEvent.First:this.firstPage();break;case sap.ui.commons.PaginatorEvent.Last:this.lastPage();break;case sap.ui.commons.PaginatorEvent.Previous:this.previousPage();break;case sap.ui.commons.PaginatorEvent.Next:this.nextPage();break;case sap.ui.commons.PaginatorEvent.Goto:this.gotoPage(e.getParameter("targetPage"));break;}};b.prototype.updateChildControls=function(){var s,p;var S;if(this.bPagingMode){var c=this.getCurrentPage();var l=Math.ceil(this._getRowCount()/this.getNumberOfRows());if(this._getRowCount()==0){l=1;}p=this.getAggregation("footerPager");if(p){p.setCurrentPage(c);p.setNumberOfPages(l);}}else{S=this._getRowCount()>this.getNumberOfRows();s=this.getAggregation("headerShowMoreButton");if(s){s.setEnabled(S);}s=this.getAggregation("footerShowMoreButton");if(s){s.setEnabled(S);}}};b.prototype.isBound=function(n){return sap.ui.core.Element.prototype.isBound.call(this,n||"rows");};b.prototype._getRowCount=function(){var B=this.getBinding("rows");if(B){return B.getLength();}else{return this.getRows().length;}};b.prototype.unbindAggregation=function(n){sap.ui.core.Element.prototype.unbindAggregation.apply(this,arguments);if(n==="rows"){this.destroyRows();}return this;};b.prototype.refreshRows=function(){var B=this.getBindingInfo("rows"),o=B.binding,r=this._getRowCount(),n=this.getNumberOfRows(),N=Math.min(r,n),t=this.getThreshold();this.setProperty("currentPage",1,true);o.getContexts(0,N,t);};b.prototype.updateRows=function(v){var B=this.getBindingInfo("rows"),f=B.factory,o=B.binding,s=this.getShowMoreSteps(),S=s>0,c=this.getCurrentPage(),r=this._getRowCount(),n=this.getNumberOfRows(),N=Math.min(r,n),L=Math.ceil(r/n)||1;if(c>L){c=L;this.setProperty("currentPage",c);this._bSecondPage=false;}var F=S?0:(c-1)*N,d=(this._bSecondPage?1:0)*N,t=this.getThreshold(),e=o?o.getContexts(F,N,t):[];if(v!==true){this._bSecondPage=false;this.destroyRows();for(var i=0,l=N;i<l;i++){var I=this.getId()+"-"+i,g=f(I,e[i]);g.setBindingContext(e[i],B.model);this.addRow(g);}}else{this._bSuppressInvalidate=true;for(var i=0,l=N;i<l;i++){var h=d+i;var j=this.getRows()[h];if(!S){if(j){this.removeAggregation("rows",j,true);j.destroy();}j=undefined;}if(!j){var I=this.getId()+"-"+h;j=f(I,e[i]);j.setBindingContext(e[i],B.model);this.insertAggregation("rows",j,h,true);}else{j.setBindingContext(e[i],B.model);}}this._bSuppressInvalidate=false;}this.updateChildControls();};b.prototype.invalidate=function(o){if(this._bSuppressInvalidate){return;}C.prototype.invalidate.apply(this,arguments);};return b;},true);
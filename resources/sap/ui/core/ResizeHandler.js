/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','jquery.sap.act','jquery.sap.script'],function(q,B){"use strict";var l=q.sap.log.getLogger("sap.ui.core.ResizeHandler",q.sap.log.Level.ERROR);var c=null;var R=B.extend("sap.ui.core.ResizeHandler",{constructor:function(C){B.apply(this);c=C;this.aResizeListeners=[];this.aSuspendedDomRefs=[];this.bRegistered=false;this.iIdCounter=0;this.fDestroyHandler=this.destroy.bind(this);q(window).bind("unload",this.fDestroyHandler);q.sap.act.attachActivate(b,this);}});function a(){if(this.bRegistered){this.bRegistered=false;sap.ui.getCore().detachIntervalTimer(this.checkSizes,this);}}function b(){if(!this.bRegistered&&this.aResizeListeners.length>0){this.bRegistered=true;sap.ui.getCore().attachIntervalTimer(this.checkSizes,this);}}R.prototype.destroy=function(e){q.sap.act.detachActivate(b,this);q(window).unbind("unload",this.fDestroyHandler);c=null;this.aResizeListeners=[];this.aSuspendedDomRefs=[];a.call(this);};R.prototype.attachListener=function(r,h){var i=B.isA(r,'sap.ui.core.Control'),d=i?r.getDomRef():r,w=d?d.offsetWidth:0,H=d?d.offsetHeight:0,I="rs-"+Date.now()+"-"+this.iIdCounter++,e;if(i){e=("Control "+r.getId());}else if(r.id){e=r.id;}else{e=String(r);}this.aResizeListeners.push({sId:I,oDomRef:i?null:r,oControl:i?r:null,fHandler:h,iWidth:w,iHeight:H,dbg:e});l.debug("registered "+e);b.call(this);return I;};R.prototype.detachListener=function(I){var r=this.aResizeListeners;for(var i=0;i<r.length;i++){if(r[i].sId===I){r.splice(i,1);l.debug("deregistered "+I);break;}}if(r.length===0){a.call(this);}};R.prototype.checkSizes=function(){var d=l.isLoggable();if(d){l.debug("checkSizes:");}this.aResizeListeners.forEach(function(r){if(r){var C=!!r.oControl,D=C?r.oControl.getDomRef():r.oDomRef;if(D&&q.contains(document.documentElement,D)&&!this._isSuspended(D)){var o=r.iWidth,O=r.iHeight,n=D.offsetWidth,N=D.offsetHeight;if(o!=n||O!=N){r.iWidth=n;r.iHeight=N;var e=q.Event("resize");e.target=D;e.currentTarget=D;e.size={width:n,height:N};e.oldSize={width:o,height:O};e.control=C?r.oControl:null;if(d){l.debug("resize detected for '"+r.dbg+"': "+e.oldSize.width+"x"+e.oldSize.height+" -> "+e.size.width+"x"+e.size.height);}r.fHandler(e);}}}},this);if(R._keepActive!=true&&R._keepActive!=false){R._keepActive=false;}if(!q.sap.act.isActive()&&!R._keepActive){a.call(this);}};R.register=function(r,h){if(!c||!c.oResizeHandler){return null;}return c.oResizeHandler.attachListener(r,h);};R.deregister=function(i){if(!c||!c.oResizeHandler){return;}c.oResizeHandler.detachListener(i);};R.deregisterAllForControl=function(C){if(!c||!c.oResizeHandler){return;}c.oResizeHandler.aResizeListeners.filter(function(r){return r&&r.oControl&&r.oControl.getId()===C;}).forEach(function(r){R.deregister(r.sId);});};R.suspend=function(d){if(!c||!c.oResizeHandler){return false;}if(!d||!q.contains(document.documentElement,d)){return false;}var r=c.oResizeHandler;if(r.aSuspendedDomRefs.indexOf(d)===-1){r.aSuspendedDomRefs.push(d);}return true;};R.resume=function(d){if(!c||!c.oResizeHandler){return false;}var r=c.oResizeHandler,i=r.aSuspendedDomRefs.indexOf(d);if(i===-1){return false;}r.aSuspendedDomRefs.splice(i,1);r.checkSizes();return true;};R.prototype._isSuspended=function(d){var s=this.aSuspendedDomRefs,n;for(var i=0;i<s.length;i++){n=s[i];if(n===d||q.contains(n,d)){return true;}}return false;};return R;});
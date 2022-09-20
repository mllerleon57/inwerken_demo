sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/renderer/executeTemplate","sap/ui/webc/common/thirdparty/icons/error","sap/ui/webc/common/thirdparty/icons/alert","sap/ui/webc/common/thirdparty/icons/sys-enter-2","./types/SemanticColor","./types/ListItemType","./TabContainer","./Icon","./Button","./CustomListItem","./generated/templates/TabTemplate.lit","./generated/templates/TabInStripTemplate.lit","./generated/templates/TabInOverflowTemplate.lit","./generated/themes/Tab.css","./generated/themes/TabInStrip.css","./generated/themes/TabInOverflow.css"],function(e,t,i,s,a,r,n,l,d,u,o,h,c,f,p,b,m,g,T){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=v(t);i=v(i);s=v(s);l=v(l);d=v(d);u=v(u);o=v(o);h=v(h);c=v(c);f=v(f);p=v(p);b=v(b);m=v(m);g=v(g);T=v(T);function v(e){return e&&e.__esModule?e:{default:e}}const _={tag:"ui5-tab",managedSlots:true,languageAware:true,slots:{default:{type:Node,propertyName:"content",invalidateOnChildChange:{properties:true,slots:false}},subTabs:{type:HTMLElement,individualSlots:true,invalidateOnChildChange:{properties:true,slots:false}}},properties:{text:{type:String},disabled:{type:Boolean},additionalText:{type:String},icon:{type:String},design:{type:l.default,defaultValue:l.default.Default},selected:{type:Boolean},_tabIndex:{type:String,defaultValue:"-1",noAttribute:true},_selected:{type:Boolean},_realTab:{type:Object},_isTopLevelTab:{type:Boolean}},events:{}};class y extends t.default{static get metadata(){return _}static get render(){return i.default}static get template(){return f.default}static get stripTemplate(){return p.default}static get overflowTemplate(){return b.default}static get styles(){return m.default}static get dependencies(){return[o.default,h.default,c.default]}get displayText(){let e=this.text;if(this._isInline&&this.additionalText){e+=` (${this.additionalText})`}return e}get isSeparator(){return false}get stripPresentation(){return(0,s.default)(this.constructor.stripTemplate,this)}get overflowPresentation(){return(0,s.default)(this.constructor.overflowTemplate,this)}get stableDomRef(){return this.getAttribute("stable-dom-ref")||`${this._id}-stable-dom-ref`}get requiresExpandButton(){return this.subTabs.length>0&&this._isTopLevelTab&&this._hasOwnContent}get isSingleClickArea(){return this.subTabs.length>0&&this._isTopLevelTab&&!this._hasOwnContent}get isOnSelectedTabPath(){return this._realTab===this||this.tabs.some(e=>e.isOnSelectedTabPath)}get _effectiveSlotName(){return this.isOnSelectedTabPath?this._individualSlot:`disabled-${this._individualSlot}`}get _defaultSlotName(){return this._realTab===this?"":"disabled-slot"}get _hasOwnContent(){return this.content.some(e=>e.nodeType!==Node.COMMENT_NODE&&(e.nodeType!==Node.TEXT_NODE||e.nodeValue.trim().length!==0))}getTabInStripDomRef(){return this._tabInStripDomRef}getFocusDomRef(){let e=super.getFocusDomRef();if(this._getTabContainerHeaderItemCallback){e=this._getTabContainerHeaderItemCallback()}return e}get isMixedModeTab(){return!this.icon&&this._mixedMode}get isTextOnlyTab(){return!this.icon&&!this._mixedMode}get isIconTab(){return!!this.icon}get effectiveDisabled(){return this.disabled||undefined}get effectiveSelected(){const e=this.tabs.some(e=>e.effectiveSelected);return this.selected||this._selected||e}get effectiveHidden(){return!this.effectiveSelected}get tabs(){return this.subTabs.filter(e=>!e.isSeparator)}get ariaLabelledBy(){const e=[];if(this.text){e.push(`${this._id}-text`)}if(this.additionalText){e.push(`${this._id}-additionalText`)}if(this.icon){e.push(`${this._id}-icon`)}return e.join(" ")}get stripClasses(){const e=["ui5-tab-strip-item"];if(this.effectiveSelected){e.push("ui5-tab-strip-item--selected")}if(this.disabled){e.push("ui5-tab-strip-item--disabled")}if(this._isInline){e.push("ui5-tab-strip-item--inline")}if(this.additionalText){e.push("ui5-tab-strip-item--withAddionalText")}if(!this.icon&&!this._mixedMode){e.push("ui5-tab-strip-item--textOnly")}if(this.icon){e.push("ui5-tab-strip-item--withIcon")}if(!this.icon&&this._mixedMode){e.push("ui5-tab-strip-item--mixedMode")}if(this.design!==l.default.Default){e.push(`ui5-tab-strip-item--${this.design.toLowerCase()}`)}if(this.isSingleClickArea){e.push(`ui5-tab-strip-item--singleClickArea`)}return e.join(" ")}get semanticIconName(){switch(this.design){case l.default.Positive:return"sys-enter-2";case l.default.Negative:return"error";case l.default.Critical:return"alert";default:return null}}get semanticIconClasses(){const e=["ui5-tab-semantic-icon"];if(this.design!==l.default.Default&&this.design!==l.default.Neutral){e.push(`ui5-tab-semantic-icon--${this.design.toLowerCase()}`)}return e.join(" ")}get overflowClasses(){const e=["ui5-tab-overflow-item"];if(this.design!==l.default.Default&&this.design!==l.default.Neutral){e.push(`ui5-tab-overflow-item--${this.design.toLowerCase()}`)}if(this.effectiveDisabled){e.push("ui5-tab-overflow-item--disabled")}if(this.selected){e.push("ui5-tab-overflow-item--selectedSubTab")}return e.join(" ")}get overflowState(){return this.disabled||this.isSingleClickArea?d.default.Inactive:d.default.Active}}y.define();u.default.registerTabStyles(g.default);u.default.registerStaticAreaTabStyles(T.default);var S=y;e.default=S});
//# sourceMappingURL=Tab.js.map
sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(o,e){"use strict";Object.defineProperty(o,"__esModule",{value:true});o.default=void 0;const i=(o,i,s)=>(0,e.html)`<div class="${(0,e.classMap)(o.classes.colorPaletteRoot)}" @click=${o._onclick} @keyup=${o._onkeyup} @keydown=${o._onkeydown}>${o.showDefaultColor?l(o,i,s):undefined}<div class="ui5-cp-item-container" role="region" aria-label="${(0,e.ifDefined)(o.colorContainerLabel)}" @keydown="${o._onColorContainerKeyDown}">${(0,e.repeat)(o.displayedColors,(o,e)=>o._id||e,(e,l)=>t(e,l,o,i,s))}</div>${o._showMoreColors?r(o,i,s):undefined}${o.showRecentColors?n(o,i,s):undefined}</div>`;const l=(o,i,l)=>l?(0,e.html)`<div class="ui5-cp-default-color-button-wrapper"><${(0,e.scopeTag)("ui5-button",i,l)} class="ui5-cp-default-color-button" design="Transparent" @click=${o._onDefaultColorClick} @keydown=${o._onDefaultColorKeyDown}>Default color</${(0,e.scopeTag)("ui5-button",i,l)}><div class="ui5-cp-separator"></div></div>`:(0,e.html)`<div class="ui5-cp-default-color-button-wrapper"><ui5-button class="ui5-cp-default-color-button" design="Transparent" @click=${o._onDefaultColorClick} @keydown=${o._onDefaultColorKeyDown}>Default color</ui5-button><div class="ui5-cp-separator"></div></div>`;const t=(o,i,l,t,r)=>(0,e.html)`<slot name="${(0,e.ifDefined)(o._individualSlot)}"></slot>`;const r=(o,i,l)=>l?(0,e.html)`<div class="ui5-cp-more-colors-wrapper"><div class="ui5-cp-separator"></div><${(0,e.scopeTag)("ui5-button",i,l)} design="Transparent" class="ui5-cp-more-colors" @click="${o._openMoreColorsDialog}" @keydown=${o._onMoreColorsKeyDown}>${(0,e.ifDefined)(o.colorPaleteMoreColorsText)}</${(0,e.scopeTag)("ui5-button",i,l)}></div>`:(0,e.html)`<div class="ui5-cp-more-colors-wrapper"><div class="ui5-cp-separator"></div><ui5-button design="Transparent" class="ui5-cp-more-colors" @click="${o._openMoreColorsDialog}" @keydown=${o._onMoreColorsKeyDown}>${(0,e.ifDefined)(o.colorPaleteMoreColorsText)}</ui5-button></div>`;const n=(o,i,l)=>(0,e.html)`<div class="ui5-cp-recent-colors-wrapper"><div class="ui5-cp-separator"></div><div class="ui5-cp-recent-colors-container" @keydown="${o._onRecentColorsContainerKeyDown}">${(0,e.repeat)(o.recentColors,(o,e)=>o._id||e,(e,t)=>s(e,t,o,i,l))}</div></div>`;const s=(o,i,l,t,r)=>r?(0,e.html)`<${(0,e.scopeTag)("ui5-color-palette-item",t,r)} value="${(0,e.ifDefined)(o)}"></${(0,e.scopeTag)("ui5-color-palette-item",t,r)}>`:(0,e.html)`<ui5-color-palette-item value="${(0,e.ifDefined)(o)}"></ui5-color-palette-item>`;var a=i;o.default=a});
//# sourceMappingURL=ColorPaletteTemplate.lit.js.map
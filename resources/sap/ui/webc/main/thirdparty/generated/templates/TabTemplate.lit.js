sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const i=(e,i,a)=>(0,t.html)`<div id="${(0,t.ifDefined)(e._id)}" class="ui5-tab-root"><slot name="${(0,t.ifDefined)(e._defaultSlotName)}"></slot>${(0,t.repeat)(e.tabs,(e,t)=>e._id||t,(t,o)=>d(t,o,e,i,a))}</div>`;const d=(e,i,d,a,o)=>(0,t.html)`<slot name="${(0,t.ifDefined)(e._effectiveSlotName)}"></slot>`;var a=i;e.default=a});
//# sourceMappingURL=TabTemplate.lit.js.map
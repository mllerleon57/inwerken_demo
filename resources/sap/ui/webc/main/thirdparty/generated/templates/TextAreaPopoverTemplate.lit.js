sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const a=(e,a,o)=>(0,t.html)`${e.displayValueStateMessagePopover?s(e,a,o):undefined}`;const s=(e,a,s)=>s?(0,t.html)`<${(0,t.scopeTag)("ui5-popover",a,s)} skip-registry-update prevent-focus-restore hide-arrow _disable-initial-focus class="ui5-valuestatemessage-popover" style="${(0,t.styleMap)(e.styles.valueStateMsgPopover)}" placement-type="Bottom" horizontal-align="${(0,t.ifDefined)(e._valueStatePopoverHorizontalAlign)}"><div slot="header" class="ui5-valuestatemessage-root ${(0,t.classMap)(e.classes.valueStateMsg)}"><${(0,t.scopeTag)("ui5-icon",a,s)} class="ui5-input-value-state-message-icon" name="${(0,t.ifDefined)(e._valueStateMessageIcon)}"></${(0,t.scopeTag)("ui5-icon",a,s)}>${e.hasCustomValueState?o(e,a,s):l(e,a,s)}</div></${(0,t.scopeTag)("ui5-popover",a,s)}>`:(0,t.html)`<ui5-popover skip-registry-update prevent-focus-restore hide-arrow _disable-initial-focus class="ui5-valuestatemessage-popover" style="${(0,t.styleMap)(e.styles.valueStateMsgPopover)}" placement-type="Bottom" horizontal-align="${(0,t.ifDefined)(e._valueStatePopoverHorizontalAlign)}"><div slot="header" class="ui5-valuestatemessage-root ${(0,t.classMap)(e.classes.valueStateMsg)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${(0,t.ifDefined)(e._valueStateMessageIcon)}"></ui5-icon>${e.hasCustomValueState?o(e,a,s):l(e,a,s)}</div></ui5-popover>`;const o=(e,a,s)=>(0,t.html)`${(0,t.repeat)(e.valueStateMessageText,(e,t)=>e._id||t,(t,o)=>i(t,o,e,a,s))}`;const i=(e,a,s,o,i)=>(0,t.html)`${(0,t.ifDefined)(e)}`;const l=(e,a,s)=>(0,t.html)`${(0,t.ifDefined)(e.valueStateText)}`;var u=a;e.default=u});
//# sourceMappingURL=TextAreaPopoverTemplate.lit.js.map
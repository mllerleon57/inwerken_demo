sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,o){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const i=(e,i,s)=>s?(0,o.html)`<${(0,o.scopeTag)("ui5-responsive-popover",i,s)} horizontal-align="Center" placement-type="Bottom" aria-label="${(0,o.ifDefined)(e.actionSheetStepsText)}" class="${(0,o.classMap)(e.classes.popover)}" @ui5-after-close=${(0,o.ifDefined)(e._afterClosePopover)} content-only-on-desktop prevent-focus-restore _hide-header><ul class="ui5-wizard-responsive-popover-list">${(0,o.repeat)(e._groupedTabs,(e,o)=>e._id||o,(o,n)=>t(o,n,e,i,s))}</ul><div slot="footer" class="ui5-responsive-popover-footer"><${(0,o.scopeTag)("ui5-button",i,s)} design="Transparent" @click="${e._closeRespPopover}">Cancel</${(0,o.scopeTag)("ui5-button",i,s)}></div></${(0,o.scopeTag)("ui5-responsive-popover",i,s)}>`:(0,o.html)`<ui5-responsive-popover horizontal-align="Center" placement-type="Bottom" aria-label="${(0,o.ifDefined)(e.actionSheetStepsText)}" class="${(0,o.classMap)(e.classes.popover)}" @ui5-after-close=${(0,o.ifDefined)(e._afterClosePopover)} content-only-on-desktop prevent-focus-restore _hide-header><ul class="ui5-wizard-responsive-popover-list">${(0,o.repeat)(e._groupedTabs,(e,o)=>e._id||o,(o,n)=>t(o,n,e,i,s))}</ul><div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${e._closeRespPopover}">Cancel</ui5-button></div></ui5-responsive-popover>`;const t=(e,i,t,s,n)=>n?(0,o.html)`<li><${(0,o.scopeTag)("ui5-button",s,n)} icon="${(0,o.ifDefined)(e.icon)}" ?disabled="${e.disabled}" design="Transparent" data-ui5-header-tab-ref-id="${(0,o.ifDefined)(e.accInfo.ariaPosinset)}" @click="${t._onOverflowStepButtonClick}">${(0,o.ifDefined)(e.titleText)}</${(0,o.scopeTag)("ui5-button",s,n)}></li>`:(0,o.html)`<li><ui5-button icon="${(0,o.ifDefined)(e.icon)}" ?disabled="${e.disabled}" design="Transparent" data-ui5-header-tab-ref-id="${(0,o.ifDefined)(e.accInfo.ariaPosinset)}" @click="${t._onOverflowStepButtonClick}">${(0,o.ifDefined)(e.titleText)}</ui5-button></li>`;var s=i;e.default=s});
//# sourceMappingURL=WizardPopoverTemplate.lit.js.map
sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const n=(e,n,a)=>(0,i.html)`<li part="native-li" tabindex="${(0,i.ifDefined)(e.tabIndex)}" class="${(0,i.classMap)(e.classes.main)}" @focusin="${e._onfocusin}" @focusout="${e._onfocusout}" @keyup="${e._onkeyup}" @keydown="${e._onkeydown}" @mouseup="${e._onmouseup}" @mousedown="${e._onmousedown}" @touchstart="${e._ontouchstart}" @touchend="${e._ontouchend}" @click="${e._onclick}" role="${(0,i.ifDefined)(e._accInfo.role)}" aria-expanded="${(0,i.ifDefined)(e._accInfo.ariaExpanded)}" title="${(0,i.ifDefined)(e.title)}" aria-level="${(0,i.ifDefined)(e._accInfo.ariaLevel)}" aria-haspopup="${(0,i.ifDefined)(e._accInfo.ariaHaspopup)}" aria-posinset="${(0,i.ifDefined)(e._accInfo.posinset)}" aria-setsize="${(0,i.ifDefined)(e._accInfo.setsize)}" aria-describedby="${(0,i.ifDefined)(e._id)}-invisibleText-describedby" aria-labelledby="${(0,i.ifDefined)(e._accessibleNameRef)}" aria-disabled="${(0,i.ifDefined)(e.ariaDisabled)}">${e.placeSelectionElementBefore?t(e,n,a):undefined}<div id="${(0,i.ifDefined)(e._id)}-content" class="ui5-li-content">${e.displayImage?c(e,n,a):undefined}${e.displayIconBegin?s(e,n,a):undefined}<div class="ui5-li-text-wrapper"><span part="title" class="ui5-li-title"><slot></slot></span>${e.description?o(e,n,a):undefined}${!e.typeActive?f(e,n,a):undefined}</div>${!e.description?r(e,n,a):undefined}</div>${e.displayIconEnd?b(e,n,a):undefined}${e.typeDetail?p(e,n,a):undefined}${e.placeSelectionElementAfter?m(e,n,a):undefined}<span id="${(0,i.ifDefined)(e._id)}-invisibleText" class="ui5-hidden-text">${(0,i.ifDefined)(e._accInfo.listItemAriaLabel)}${(0,i.ifDefined)(e.accessibleName)}</span><span id="${(0,i.ifDefined)(e._id)}-invisibleText-describedby" class="ui5-hidden-text">${(0,i.ifDefined)(e._accInfo.ariaSelectedText)}</span></li> `;const t=(e,n,t)=>(0,i.html)`${e.modeSingleSelect?a(e,n,t):undefined}${e.modeMultiSelect?d(e,n,t):undefined}${e.renderDeleteButton?l(e,n,t):undefined}`;const a=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-radio-button",n,t)} ?disabled="${e.isInactive}" accessible-name="${(0,i.ifDefined)(e._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0,i.ifDefined)(e._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${e.selected}" @click="${e.onSingleSelectionComponentPress}"></${(0,i.scopeTag)("ui5-radio-button",n,t)}>`:(0,i.html)`<ui5-radio-button ?disabled="${e.isInactive}" accessible-name="${(0,i.ifDefined)(e._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0,i.ifDefined)(e._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${e.selected}" @click="${e.onSingleSelectionComponentPress}"></ui5-radio-button>`;const d=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-checkbox",n,t)} ?disabled="${e.isInactive}" ?indeterminate=${e.indeterminate} tabindex="-1" id="${(0,i.ifDefined)(e._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${e.selected}" aria-label="${(0,i.ifDefined)(e._accInfo.ariaLabel)}" @click="${e.onMultiSelectionComponentPress}"></${(0,i.scopeTag)("ui5-checkbox",n,t)}>`:(0,i.html)`<ui5-checkbox ?disabled="${e.isInactive}" ?indeterminate=${e.indeterminate} tabindex="-1" id="${(0,i.ifDefined)(e._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${e.selected}" aria-label="${(0,i.ifDefined)(e._accInfo.ariaLabel)}" @click="${e.onMultiSelectionComponentPress}"></ui5-checkbox>`;const l=(e,n,t)=>t?(0,i.html)`<div class="ui5-li-deletebtn"><${(0,i.scopeTag)("ui5-button",n,t)} tabindex="-1" data-sap-no-tab-ref id="${(0,i.ifDefined)(e._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${e.disableDeleteButton}" @click="${e.onDelete}" tooltip="${(0,i.ifDefined)(e.deleteText)}"></${(0,i.scopeTag)("ui5-button",n,t)}></div>`:(0,i.html)`<div class="ui5-li-deletebtn"><ui5-button tabindex="-1" data-sap-no-tab-ref id="${(0,i.ifDefined)(e._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${e.disableDeleteButton}" @click="${e.onDelete}" tooltip="${(0,i.ifDefined)(e.deleteText)}"></ui5-button></div>`;const c=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-avatar",n,t)} shape="Square" class="ui5-li-img"><img src="${(0,i.ifDefined)(e.image)}" class="ui5-li-img-inner" /></${(0,i.scopeTag)("ui5-avatar",n,t)}>`:(0,i.html)`<ui5-avatar shape="Square" class="ui5-li-img"><img src="${(0,i.ifDefined)(e.image)}" class="ui5-li-img-inner" /></ui5-avatar>`;const s=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-icon",n,t)} part="icon" name="${(0,i.ifDefined)(e.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${(0,i.scopeTag)("ui5-icon",n,t)}>`:(0,i.html)`<ui5-icon part="icon" name="${(0,i.ifDefined)(e.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`;const o=(e,n,t)=>(0,i.html)`<div class="ui5-li-description-info-wrapper"><span part="description" class="ui5-li-desc">${(0,i.ifDefined)(e.description)}</span>${e.additionalText?u(e,n,t):undefined}</div>`;const u=(e,n,t)=>(0,i.html)`<span part="additional-text" class="ui5-li-additional-text">${(0,i.ifDefined)(e.additionalText)}</span>`;const f=(e,n,t)=>(0,i.html)`<span class="ui5-hidden-text">${(0,i.ifDefined)(e.type)}</span>`;const r=(e,n,t)=>(0,i.html)`${e.additionalText?$(e,n,t):undefined}`;const $=(e,n,t)=>(0,i.html)`<span part="additional-text" class="ui5-li-additional-text">${(0,i.ifDefined)(e.additionalText)}</span>`;const b=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-icon",n,t)} part="icon" name="${(0,i.ifDefined)(e.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></${(0,i.scopeTag)("ui5-icon",n,t)}>`:(0,i.html)`<ui5-icon part="icon" name="${(0,i.ifDefined)(e.icon)}" class="ui5-li-icon" accessible-role="presentation" aria-hidden="true"></ui5-icon>`;const p=(e,n,t)=>t?(0,i.html)`<div class="ui5-li-detailbtn"><${(0,i.scopeTag)("ui5-button",n,t)} design="Transparent" icon="edit" @click="${e.onDetailClick}"></${(0,i.scopeTag)("ui5-button",n,t)}></div>`:(0,i.html)`<div class="ui5-li-detailbtn"><ui5-button design="Transparent" icon="edit" @click="${e.onDetailClick}"></ui5-button></div>`;const m=(e,n,t)=>(0,i.html)`${e.modeSingleSelect?D(e,n,t):undefined}${e.modeMultiSelect?h(e,n,t):undefined}${e.renderDeleteButton?g(e,n,t):undefined}`;const D=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-radio-button",n,t)} ?disabled="${e.isInactive}" accessible-name="${(0,i.ifDefined)(e._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0,i.ifDefined)(e._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${e.selected}" @click="${e.onSingleSelectionComponentPress}"></${(0,i.scopeTag)("ui5-radio-button",n,t)}>`:(0,i.html)`<ui5-radio-button ?disabled="${e.isInactive}" accessible-name="${(0,i.ifDefined)(e._accInfo.ariaLabelRadioButton)}" tabindex="-1" id="${(0,i.ifDefined)(e._id)}-singleSelectionElement" class="ui5-li-singlesel-radiobtn" ?checked="${e.selected}" @click="${e.onSingleSelectionComponentPress}"></ui5-radio-button>`;const h=(e,n,t)=>t?(0,i.html)`<${(0,i.scopeTag)("ui5-checkbox",n,t)} ?disabled="${e.isInactive}" ?indeterminate=${e.indeterminate} tabindex="-1" id="${(0,i.ifDefined)(e._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${e.selected}" aria-label="${(0,i.ifDefined)(e._accInfo.ariaLabel)}" @click="${e.onMultiSelectionComponentPress}"></${(0,i.scopeTag)("ui5-checkbox",n,t)}>`:(0,i.html)`<ui5-checkbox ?disabled="${e.isInactive}" ?indeterminate=${e.indeterminate} tabindex="-1" id="${(0,i.ifDefined)(e._id)}-multiSelectionElement" class="ui5-li-multisel-cb" ?checked="${e.selected}" aria-label="${(0,i.ifDefined)(e._accInfo.ariaLabel)}" @click="${e.onMultiSelectionComponentPress}"></ui5-checkbox>`;const g=(e,n,t)=>t?(0,i.html)`<div class="ui5-li-deletebtn"><${(0,i.scopeTag)("ui5-button",n,t)} tabindex="-1" data-sap-no-tab-ref id="${(0,i.ifDefined)(e._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${e.disableDeleteButton}" @click="${e.onDelete}" tooltip="${(0,i.ifDefined)(e.deleteText)}"></${(0,i.scopeTag)("ui5-button",n,t)}></div>`:(0,i.html)`<div class="ui5-li-deletebtn"><ui5-button tabindex="-1" data-sap-no-tab-ref id="${(0,i.ifDefined)(e._id)}-deleteSelectionElement" design="Transparent" icon="decline" ?disabled="${e.disableDeleteButton}" @click="${e.onDelete}" tooltip="${(0,i.ifDefined)(e.deleteText)}"></ui5-button></div>`;var x=n;e.default=x});
//# sourceMappingURL=StandardListItemTemplate.lit.js.map
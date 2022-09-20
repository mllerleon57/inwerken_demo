sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* eslint no-unused-vars: 0 */
  const block0 = (context, tags, suffix) => suffix ? (0, _LitRenderer.html)`<div class="ui5-uc-root" role="region" aria-roledescription="${(0, _LitRenderer.ifDefined)(context._roleDescription)}" @drop="${context._ondrop}"><div class="${(0, _LitRenderer.classMap)(context.classes.content)}"><${(0, _LitRenderer.scopeTag)("ui5-list", tags, suffix)} accessible-name="${(0, _LitRenderer.ifDefined)(context.accessibleName)}" mode="${(0, _LitRenderer.ifDefined)(context.mode)}" @ui5-selection-change="${(0, _LitRenderer.ifDefined)(context._onSelectionChange)}" @ui5-item-delete="${(0, _LitRenderer.ifDefined)(context._onItemDelete)}"><slot slot="header" name="header"></slot><slot></slot></${(0, _LitRenderer.scopeTag)("ui5-list", tags, suffix)}>${context._showNoData ? block1(context, tags, suffix) : undefined}${context._showDndOverlay ? block2(context, tags, suffix) : undefined}</div></div>` : (0, _LitRenderer.html)`<div class="ui5-uc-root" role="region" aria-roledescription="${(0, _LitRenderer.ifDefined)(context._roleDescription)}" @drop="${context._ondrop}"><div class="${(0, _LitRenderer.classMap)(context.classes.content)}"><ui5-list accessible-name="${(0, _LitRenderer.ifDefined)(context.accessibleName)}" mode="${(0, _LitRenderer.ifDefined)(context.mode)}" @ui5-selection-change="${(0, _LitRenderer.ifDefined)(context._onSelectionChange)}" @ui5-item-delete="${(0, _LitRenderer.ifDefined)(context._onItemDelete)}"><slot slot="header" name="header"></slot><slot></slot></ui5-list>${context._showNoData ? block1(context, tags, suffix) : undefined}${context._showDndOverlay ? block2(context, tags, suffix) : undefined}</div></div>`;

  const block1 = (context, tags, suffix) => suffix ? (0, _LitRenderer.html)`<div class="${(0, _LitRenderer.classMap)(context.classes.noFiles)}"><div class="icon-container"><${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)} name="document"></${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)}></div><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)} class="title" wrapping-type="Normal">${(0, _LitRenderer.ifDefined)(context._noDataText)}</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)} class="subtitle" wrapping-type="Normal">${(0, _LitRenderer.ifDefined)(context._noDataDescription)}</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></div>` : (0, _LitRenderer.html)`<div class="${(0, _LitRenderer.classMap)(context.classes.noFiles)}"><div class="icon-container"><ui5-icon name="document"></ui5-icon></div><ui5-label class="title" wrapping-type="Normal">${(0, _LitRenderer.ifDefined)(context._noDataText)}</ui5-label><ui5-label class="subtitle" wrapping-type="Normal">${(0, _LitRenderer.ifDefined)(context._noDataDescription)}</ui5-label></div>`;

  const block2 = (context, tags, suffix) => suffix ? (0, _LitRenderer.html)`<div class="${(0, _LitRenderer.classMap)(context.classes.dndOverlay)}" @dragenter="${context._ondragenter}" @dragleave="${context._ondragleave}" @dragover="${context._ondragover}"><${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)} name="upload-to-cloud"></${(0, _LitRenderer.scopeTag)("ui5-icon", tags, suffix)}><span class="dnd-overlay-text">${(0, _LitRenderer.ifDefined)(context._dndOverlayText)}</span></div>` : (0, _LitRenderer.html)`<div class="${(0, _LitRenderer.classMap)(context.classes.dndOverlay)}" @dragenter="${context._ondragenter}" @dragleave="${context._ondragleave}" @dragover="${context._ondragover}"><ui5-icon name="upload-to-cloud"></ui5-icon><span class="dnd-overlay-text">${(0, _LitRenderer.ifDefined)(context._dndOverlayText)}</span></div>`;

  var _default = block0;
  _exports.default = _default;
});
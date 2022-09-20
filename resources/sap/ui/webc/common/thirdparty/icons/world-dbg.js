sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/world", "./v4/world"], function (_exports, _Theme, _world, _world2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _world.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _world.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _world.pathData : _world2.pathData;
  _exports.pathData = pathData;
  var _default = "world";
  _exports.default = _default;
});
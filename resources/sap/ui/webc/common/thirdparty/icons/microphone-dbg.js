sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/microphone", "./v4/microphone"], function (_exports, _Theme, _microphone, _microphone2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _microphone.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _microphone.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _microphone.pathData : _microphone2.pathData;
  _exports.pathData = pathData;
  var _default = "microphone";
  _exports.default = _default;
});
sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/main/thirdparty/Dialog","sap/ui/webc/main/thirdparty/Button","sap/ui/webc/main/thirdparty/BusyIndicator","sap/ui/webc/fiori/lib/zxing","./generated/templates/BarcodeScannerDialogTemplate.lit","./generated/themes/BarcodeScannerDialog.css","./generated/i18n/i18n-defaults"],function(e,t,a,i,s,r,n,o,d,c,l){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=u(t);a=u(a);s=u(s);r=u(r);n=u(n);d=u(d);c=u(c);function u(e){return e&&e.__esModule?e:{default:e}}const g={audio:false,video:{height:{min:480,ideal:960,max:1440},aspectRatio:1.333333333,facingMode:"environment"}};const h={tag:"ui5-barcode-scanner-dialog",languageAware:true,slots:{},properties:{loading:{type:Boolean}},events:{"scan-success":{detail:{text:{type:String},rawBytes:{type:Object}}},"scan-error":{detail:{message:{type:String}}}}};class m extends t.default{constructor(){super();this._codeReader=new o.BrowserMultiFormatReader}static get metadata(){return h}static get render(){return a.default}static get template(){return null}static get staticAreaTemplate(){return d.default}static get styles(){return null}static get staticAreaStyles(){return[c.default]}static async onDefine(){m.i18nBundle=await(0,i.getI18nBundle)("@ui5/webcomponents-fiori")}show(){if(this.loading){console.warn("Barcode scanning is already in progress.");return}if(!this._hasGetUserMedia()){this.fireEvent("scan-error",{message:"getUserMedia() is not supported by your browser"});return}this.loading=true;this._getUserPermission().then(()=>this._showDialog()).catch(e=>{this.fireEvent("scan-error",{message:e});this.loading=false})}close(){this._closeDialog();this.loading=false}_hasGetUserMedia(){return!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)}_getUserPermission(){return navigator.mediaDevices.getUserMedia(g)}async _getDialog(){const e=await this.getStaticAreaItemDomRef();return e.querySelector("[ui5-dialog]")}async _getVideoElement(){const e=await this.getStaticAreaItemDomRef();return e.querySelector(".ui5-barcode-scanner-dialog-video")}async _showDialog(){this.dialog=await this._getDialog();this.dialog.show()}_closeDialog(){if(this._isOpen){this.dialog.close()}}_startReader(){this._decodeFromCamera(null)}async _resetReader(){const e=await this._getVideoElement();e.pause();this._codeReader.reset()}async _decodeFromCamera(e){const t=await this._getVideoElement();this._codeReader.decodeFromVideoDevice(e,t,(e,t)=>{this.loading=false;if(e){this.fireEvent("scan-success",{text:e.getText(),rawBytes:e.getRawBytes()})}if(t&&!(t instanceof o.NotFoundException)){this.fireEvent("scan-error",{message:t})}}).catch(e=>this.fireEvent("scan-error",{message:e}))}get _isOpen(){return!!this.dialog&&this.dialog.opened}get _cancelButtonText(){return m.i18nBundle.getText(l.BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT)}get _busyIndicatorText(){return m.i18nBundle.getText(l.BARCODE_SCANNER_DIALOG_LOADING_TXT)}static get dependencies(){return[s.default,n.default,r.default]}}m.define();var p=m;e.default=p});
//# sourceMappingURL=BarcodeScannerDialog.js.map
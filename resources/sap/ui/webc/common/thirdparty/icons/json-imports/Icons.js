sap.ui.define(["require","sap/ui/webc/common/thirdparty/base/asset-registries/Icons"],function(e,s){"use strict";const i=async s=>{let i=null;if(s==="SAP-icons-v5"){i=(await Promise.resolve().then(()=>new Promise(s=>e([`../generated/assets/v5/SAP-icons.json`],s)))).default}else{i=(await Promise.resolve().then(()=>new Promise(s=>e([`../generated/assets/v4/SAP-icons.json`],s)))).default}if(typeof i==="string"&&i.endsWith(".json")){throw new Error('[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import "@ui5/webcomponents-icons/dist/Assets-static.js". Check the "Assets" documentation for more information.')}return i};const n=()=>{(0,s.registerIconLoader)("SAP-icons",i);(0,s.registerIconLoader)("SAP-icons-v5",i)};n()});
//# sourceMappingURL=Icons.js.map
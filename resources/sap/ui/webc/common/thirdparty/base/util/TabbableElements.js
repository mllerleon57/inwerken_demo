sap.ui.define(["exports","./isNodeTabbable"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.getTabbableElements=e.getLastTabbableElement=void 0;t=n(t);function n(e){return e&&e.__esModule?e:{default:e}}const a=e=>o(e.children);e.getTabbableElements=a;const r=e=>{const t=o(e.children);return t.length?t[t.length-1]:null};e.getLastTabbableElement=r;const o=(e,n)=>{const a=n||[];if(!e){return a}Array.from(e).forEach(e=>{if(e.nodeType===Node.TEXT_NODE||e.nodeType===Node.COMMENT_NODE||e.hasAttribute("data-sap-no-tab-ref")){return}if(e.shadowRoot){const t=e.shadowRoot.children;e=Array.from(t).find(e=>e.tagName!=="STYLE")}if(!e){return}if((0,t.default)(e)){a.push(e)}if(e.tagName==="SLOT"){o(e.assignedNodes(),a)}else{o(e.children,a)}});return a}});
//# sourceMappingURL=TabbableElements.js.map
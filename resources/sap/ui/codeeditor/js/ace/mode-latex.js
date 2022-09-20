ace.define("ace/mode/latex_highlight_rules",[],function(e,t,r){"use strict";var a=e("../lib/oop");var n=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:"comment",regex:"%.*$"},{token:["keyword","lparen","variable.parameter","rparen","lparen","storage.type","rparen"],regex:"(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"},{token:["keyword","lparen","variable.parameter","rparen"],regex:"(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(verbatim)(})",next:"verbatim"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\begin)({)(lstlisting)(})",next:"lstlisting"},{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\(?:begin|end))({)([\\w*]*)(})"},{token:"storage.type",regex:/\\verb\b\*?/,next:[{token:["keyword.operator","string","keyword.operator"],regex:"(.)(.*?)(\\1|$)|",next:"start"}]},{token:"storage.type",regex:"\\\\[a-zA-Z]+"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"constant.character.escape",regex:"\\\\[^a-zA-Z]?"},{token:"string",regex:"\\${1,2}",next:"equation"}],equation:[{token:"comment",regex:"%.*$"},{token:"string",regex:"\\${1,2}",next:"start"},{token:"constant.character.escape",regex:"\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"},{token:"error",regex:"^\\s*$",next:"start"},{defaultToken:"string"}],verbatim:[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(verbatim)(})",next:"start"},{defaultToken:"text"}],lstlisting:[{token:["storage.type","lparen","variable.parameter","rparen"],regex:"(\\\\end)({)(lstlisting)(})",next:"start"},{defaultToken:"text"}]};this.normalizeRules()};a.inherits(i,n);t.LatexHighlightRules=i});ace.define("ace/mode/folding/latex",[],function(e,t,r){"use strict";var a=e("../../lib/oop");var n=e("./fold_mode").FoldMode;var i=e("../../range").Range;var o=e("../../token_iterator").TokenIterator;var s={"\\subparagraph":1,"\\paragraph":2,"\\subsubsubsection":3,"\\subsubsection":4,"\\subsection":5,"\\section":6,"\\chapter":7,"\\part":8,"\\begin":9,"\\end":10};var l=t.FoldMode=function(){};a.inherits(l,n);(function(){this.foldingStartMarker=/^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/;this.foldingStopMarker=/^\s*\\(end)\b|^\s*}/;this.getFoldWidgetRange=function(e,t,r){var a=e.doc.getLine(r);var n=this.foldingStartMarker.exec(a);if(n){if(n[1])return this.latexBlock(e,r,n[0].length-1);if(n[2])return this.latexSection(e,r,n[0].length-1);return this.openingBracketBlock(e,"{",r,n.index)}var n=this.foldingStopMarker.exec(a);if(n){if(n[1])return this.latexBlock(e,r,n[0].length-1);return this.closingBracketBlock(e,"}",r,n.index+n[0].length)}};this.latexBlock=function(e,t,r,a){var n={"\\begin":1,"\\end":-1};var s=new o(e,t,r);var l=s.getCurrentToken();if(!l||!(l.type=="storage.type"||l.type=="constant.character.escape"))return;var g=l.value;var u=n[g];var p=function(){var e=s.stepForward();var t=e.type=="lparen"?s.stepForward().value:"";if(u===-1){s.stepBackward();if(t)s.stepBackward()}return t};var c=[p()];var h=u===-1?s.getCurrentTokenColumn():e.getLine(t).length;var f=t;s.step=u===-1?s.stepBackward:s.stepForward;while(l=s.step()){if(!l||!(l.type=="storage.type"||l.type=="constant.character.escape"))continue;var d=n[l.value];if(!d)continue;var v=p();if(d===u)c.unshift(v);else if(c.shift()!==v||!c.length)break}if(c.length)return;if(u==1){s.stepBackward();s.stepBackward()}if(a)return s.getCurrentTokenRange();var t=s.getCurrentTokenRow();if(u===-1)return new i(t,e.getLine(t).length,f,h);else return new i(f,h,t,s.getCurrentTokenColumn())};this.latexSection=function(e,t,r){var a=new o(e,t,r);var n=a.getCurrentToken();if(!n||n.type!="storage.type")return;var l=s[n.value]||0;var g=0;var u=t;while(n=a.stepForward()){if(n.type!=="storage.type")continue;var p=s[n.value]||0;if(p>=9){if(!g)u=a.getCurrentTokenRow()-1;g+=p==9?1:-1;if(g<0)break}else if(p>=l)break}if(!g)u=a.getCurrentTokenRow()-1;while(u>t&&!/\S/.test(e.getLine(u)))u--;return new i(t,e.getLine(t).length,u,e.getLine(u).length)}}).call(l.prototype)});ace.define("ace/mode/latex",[],function(e,t,r){"use strict";var a=e("../lib/oop");var n=e("./text").Mode;var i=e("./latex_highlight_rules").LatexHighlightRules;var o=e("./behaviour/cstyle").CstyleBehaviour;var s=e("./folding/latex").FoldMode;var l=function(){this.HighlightRules=i;this.foldingRules=new s;this.$behaviour=new o({braces:true})};a.inherits(l,n);(function(){this.type="text";this.lineCommentStart="%";this.$id="ace/mode/latex";this.getMatching=function(e,t,r){if(t==undefined)t=e.selection.lead;if(typeof t=="object"){r=t.column;t=t.row}var a=e.getTokenAt(t,r);if(!a)return;if(a.value=="\\begin"||a.value=="\\end"){return this.foldingRules.latexBlock(e,t,r,true)}}}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/latex"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-latex.js.map
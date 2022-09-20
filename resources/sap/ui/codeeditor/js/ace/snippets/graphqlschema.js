ace.define("ace/snippets/graphqlschema",[],function(n,e,t){"use strict";e.snippetText="# Type Snippet\ntrigger type\nsnippet type\n\ttype ${1:type_name} {\n\t\t${2:type_siblings}\n\t}\n\n# Input Snippet\ntrigger input\nsnippet input\n\tinput ${1:input_name} {\n\t\t${2:input_siblings}\n\t}\n\n# Interface Snippet\ntrigger interface\nsnippet interface\n\tinterface ${1:interface_name} {\n\t\t${2:interface_siblings}\n\t}\n\n# Interface Snippet\ntrigger union\nsnippet union\n\tunion ${1:union_name} = ${2:type} | ${3: type}\n\n# Enum Snippet\ntrigger enum\nsnippet enum\n\tenum ${1:enum_name} {\n\t\t${2:enum_siblings}\n\t}\n";e.scope="graphqlschema"});(function(){ace.require(["ace/snippets/graphqlschema"],function(n){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=n}})})();
//# sourceMappingURL=graphqlschema.js.map
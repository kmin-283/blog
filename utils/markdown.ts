import marked from "marked";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/stackoverflow-dark.css";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code, lang, _callback) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

const markedString = (markdown: string) => marked(markdown);

export default markedString;

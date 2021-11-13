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

const makeInternalLinks = (markdown: string) => {
  const internalLinks = markdown.match(/^#{1,6}\s{1}.*/gm);
  
  return internalLinks ? internalLinks.map((internalLink) => {
    let breakPos = 0;
    for (let i = 0; i < internalLink.length; ++i) {
      if (internalLink[i] === ' ') {
        breakPos = i;
        break;
      } else if (i > 5) {
        return '';
      }
    }

    return internalLink.slice(breakPos + 1)
      .replace(/\s/g, '-')
      .replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9_\-:\.]/g, '');
  }) : [];
};

export {markedString, makeInternalLinks};

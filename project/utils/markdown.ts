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

const renderer = {
  heading(text: string, level: number) {
    console.log(encodeURIComponent(text.replace(/\s/g, '-')));
    return `<h${level} id=${encodeURI(text.replace(/\s/g, '-'))}>${text}</h${level}>`;
  }
};
marked.use({renderer});

const markedString = (markdown: string) => marked(markdown);

const getHeadingLevel = (heading: string) => {
  return heading.indexOf(' ');
};

export interface heading {
  headingLevel: number;
  value: string;
  child: heading[];
  parent: null | heading;
}

const stringifyWithReplacer = (nestedObject: heading[]) => JSON.stringify(nestedObject, ['headingLevel', 'value', 'child']);

const makeInternalLinks = (markdown: string) => {
  const internalLinks = markdown.match(/^#{2,6}\s.*/gm);
  const ret: heading[] = [];
  let curr: heading;
  let prevHeadingLevel = 1;
  
  internalLinks ? internalLinks.forEach((internalLink) => {
    const headingLevel = getHeadingLevel(internalLink);
    const h: heading = {
      headingLevel: headingLevel,
      value: internalLink.slice(headingLevel+1),
      child: [],
      parent: null,
    };
    
    if (headingLevel === 2) {
      ret.push(h);
    } else if (headingLevel > prevHeadingLevel) {
      h.parent = curr;
      curr.child.push(h);
    } else if (headingLevel < prevHeadingLevel) {
      while (curr.headingLevel > h.headingLevel) {
        if (!curr.parent) {
          break;
        }
        curr = curr.parent;
      }
      h.parent = curr.parent;
      curr.parent?.child.push(h);
      prevHeadingLevel = curr.headingLevel;
    } else {
      h.parent = curr.parent;
      h.parent?.child.push(h);
    }
    prevHeadingLevel = headingLevel > prevHeadingLevel ? headingLevel : prevHeadingLevel;
    curr = h;
  }) : '';
  
  return stringifyWithReplacer(ret);
};

export {markedString, makeInternalLinks};

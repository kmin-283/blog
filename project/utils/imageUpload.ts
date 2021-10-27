const getThumbnail = (markdown: string) => {
  const imageTag = (markdown as string).match(/!\[.*\]\((.*)\)/);
  if (imageTag && imageTag.length > 0) {
    let imageSource = imageTag[0].match(/\([^\s]*\)?/);
    if (!imageSource) {
      return "";
    }
    if (imageSource[0][imageSource.length - 1] !== ')') {
      return imageSource[0].slice(1);
    } else {
      return imageSource[0].slice(1, -1);
    }
  } else {
    return "";
  }
};

export {getThumbnail};

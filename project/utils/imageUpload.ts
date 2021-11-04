const getThumbnail = (markdown: string) => {
  const thumbnailTag = markdown.match(/!\[[^()[\]]*\]\([^)]+\)/)![0];
  const thumbnail = thumbnailTag.match(/\([^\s]*\)?/)![0];
  return thumbnail[thumbnail.length - 1] !== ')' ? thumbnail.slice(1) : thumbnail.slice(1, -1);
};

export {getThumbnail};

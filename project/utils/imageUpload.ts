const getThumbnail = (markdown: string) => {
  const imageTag = (markdown as string).match(/!\[(\w+)?\]\((.*)?\)/);
  if (imageTag && imageTag.length > 0) {
    return imageTag[0].match(/\(.*\)/)![0].slice(1, -1);
  } else {
    return "";
  }
};

export { getThumbnail };

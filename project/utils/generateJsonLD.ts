const generateJsonLD = (
  {
    title, description, thumbnail, updatedAt, tags
  }: {
    title: string, description: string, thumbnail: string, updatedAt: Date, tags: string[]
  }) => {
  return ({
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: title,
    image: thumbnail,
    keywords: tags,
    description,
    url: `https://kmin.com/${title}`,
    author: {
      "@type": "Person",
      name: "kmin",
      url: "https://kmin.com"
    },
    editor: {
      "@type": "Person",
      name: "kmin",
      url: "https://kmin.com"
    },
    publisher: {
      "@type": "Person",
      name: "kmin",
      url: "https://kmin.com"
    },
    dateCreated: updatedAt,
    datePublished: updatedAt,
    dateModified: updatedAt,
    
  });
};

export default generateJsonLD;
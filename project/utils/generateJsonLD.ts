const generateJsonLD = ({
  title,
  description,
  thumbnail,
  updatedAt,
  tags,
}: {
  title: string;
  description: string;
  thumbnail: string;
  updatedAt: Date;
  tags: string[];
}) => {
  const DOMANE_NAME = "https://kmin283.com";
  return {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: title,
    image: thumbnail,
    keywords: tags,
    description,
    url: `${DOMANE_NAME}/${title}`,
    author: {
      "@type": "Person",
      name: "kmin",
      url: DOMANE_NAME,
    },
    editor: {
      "@type": "Person",
      name: "kmin",
      url: DOMANE_NAME,
    },
    publisher: {
      "@type": "Person",
      name: "kmin",
      url: DOMANE_NAME,
    },
    dateCreated: updatedAt,
    datePublished: updatedAt,
    dateModified: updatedAt,
  };
};

export default generateJsonLD;

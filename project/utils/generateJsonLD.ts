const generateJsonLD = ({
  title,
  description,
  thumbnail,
  updatedAt,
  createdAt,
  tags,
}: {
  title: string;
  description: string;
  thumbnail: string;
  updatedAt: Date;
  createdAt: Date;
  tags: string[];
}) => {
  const DOMAIN_NAME = "https://kmin283.com";
  return {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: title,
    image: thumbnail,
    keywords: tags,
    description,
    url: `${DOMAIN_NAME}/${title}`,
    author: {
      "@type": "Person",
      name: "kmin",
      url: DOMAIN_NAME,
    },
    editor: {
      "@type": "Person",
      name: "kmin",
      url: DOMAIN_NAME,
    },
    publisher: {
      "@type": "Person",
      name: "kmin",
      url: DOMAIN_NAME,
    },
    dateCreated: createdAt,
    datePublished: createdAt,
    dateModified: updatedAt,
  };
};

export default generateJsonLD;

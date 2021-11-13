import generateJsonLD from "@/utils/generateJsonLD";

test('JSONLd 만들기', () => {
  const now = new Date();
  const DOMAIN_NAME = 'https://kmin283.com';
  const title = "JsonLD를 만들어주는 함수";
  const description = "JsonLD를 자동으로 만들어주는 함수입니다";
  const thumbnail = "/__mocks__/fileMock.js";
  const tags = ['JsonLD', '어떻게 만드나요'];
  expect(generateJsonLD({
    title,
    description,
    thumbnail,
    updatedAt: now,
    tags,
  })).toStrictEqual({
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: title,
    image: thumbnail,
    keywords: tags,
    description: description,
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
    dateCreated: now,
    datePublished: now,
    dateModified: now,
  });
});
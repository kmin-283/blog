import { IPost } from "@/models/post";

const mockGetPosts = jest.fn(async (url: string): Promise<IPost[]> => {
  if (url === "/posts") {
    return [
      {
        _id: "mock1",
        title: "test post1",
        tags: ["test1", "test2", "test3"],
        file: "/test/test.md",
        thumbnail: "/test/test.jpg",
        description: "this is test post1",
        internalLinks:
          '"[" +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-1 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":5,\\"value\\":\\"2-1-2-1 헤딩\\",\\"child\\":[]}]}]}," +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-2-1 헤딩\\",\\"child\\":[]}]}]}]"',
        updatedAt: new Date("2020-11-30"),
      },
      {
        _id: "mock2",
        title: "test post2",
        tags: ["test11", "test22", "test33"],
        file: "/test/test2.md",
        thumbnail: "/test/test2.jpg",
        description: "this is test post2",
        internalLinks:
          '"[" +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-1 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":5,\\"value\\":\\"2-1-2-1 헤딩\\",\\"child\\":[]}]}]}," +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-2-1 헤딩\\",\\"child\\":[]}]}]}]"',
        updatedAt: new Date("2020-11-30"),
      },
    ];
  }
  return [];
});

const mockDeletePost = jest.fn(async (url: string, title: string) => {
  if (url === "/posts/mock2") {
    return [
      {
        _id: "mock1",
        title: "test post1",
        tags: ["test1", "test2", "test3"],
        file: "/test/test.md",
        thumbnail: "/test/test.jpg",
        description: "this is test post1",
        internalLinks:
          '"[" +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":2,\\"value\\":\\"2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-1 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-1 헤딩\\",\\"child\\":[]}," +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-1-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":5,\\"value\\":\\"2-1-2-1 헤딩\\",\\"child\\":[]}]}]}," +\n' +
          '      "{\\"headingLevel\\":3,\\"value\\":\\"2-2 헤딩\\",\\"child\\":[" +\n' +
          '      "{\\"headingLevel\\":4,\\"value\\":\\"2-2-1 헤딩\\",\\"child\\":[]}]}]}]"',
        updatedAt: new Date("2020-11-30"),
      },
    ];
  }
  return [];
});
export { mockGetPosts, mockDeletePost };

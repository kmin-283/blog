import { IPost, IPostWithMarkdown } from "@/models/post";

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

const mockGetPost = jest.fn(async (url: string): Promise<IPostWithMarkdown> => {
  if (url === "/posts/mock1") {
    return {
      _id: "mock1",
      title: "test post1",
      tags: ["test1", "test2", "test3"],
      file: "/test/test.md",
      markdown: "# hello world",
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
    };
  }
  return {
    _id: "error",
    title: "",
    tags: [],
    file: "",
    markdown: "",
    thumbnail: "",
    description: "",
    updatedAt: new Date("2020-11-30"),
  };
});

const mockWritePost = jest.fn(
  async ({
    url,
    title,
    tags,
    description,
    markdown,
  }: {
    url: string;
    title: string;
    tags: string[];
    description: string;
    markdown: string;
  }) => {
    if (url === "/api/write") {
      return { success: true };
    }
    return { success: false };
  }
);

const mockUpdatePost = jest.fn(
  async ({
    url,
    prevTitle,
    title,
    tags,
    description,
    markdown,
  }: {
    url: string;
    prevTitle: string;
    title: string;
    tags: string[];
    description: string;
    markdown: string;
  }) => {
    if (url === "/api/write/mock1") {
      return { success: true };
    }
    return { success: false };
  }
);

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

const mockUploadImage = jest.fn(async (url: string, files: FileList | null) => {
  if (!files) {
    return { success: false, data: "empty" };
  }
  if (url === "/api/images") {
    return { success: true, data: "success" };
  }
  return { success: false, data: "" };
});

export {
  mockGetPosts,
  mockGetPost,
  mockWritePost,
  mockUpdatePost,
  mockDeletePost,
  mockUploadImage,
};

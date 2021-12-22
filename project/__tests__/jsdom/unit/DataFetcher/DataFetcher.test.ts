import DataFetcher, { IDataFetcher } from "@/libs/DataFetcher";
import {
  mockGetPosts as getPosts,
  mockGetPost as getPost,
  mockWritePost as writePost,
  mockUpdatePost as updatePost,
  mockDeletePost as deletePost,
  mockUploadImage as uploadImage,
} from "../../../../__mocks__/postMock";
import { setMockFiles } from "../../../../__mocks__/fs";

jest.mock("@/libs/DataFetcher");

describe("DataFetcher 테스트", () => {
  let dataFetcher: DataFetcher;
  let files: FileList;
  const MOCK_FILE_INFO = {
    "/path/to/file1.js": 'console.log("file1 contents");',
    "/path/to/file2.txt": "file2 contents",
  };
  (DataFetcher as unknown as jest.Mock<IDataFetcher>).mockImplementation(() => {
    return {
      getPosts,
      getPost,
      writePost,
      updatePost,
      deletePost,
      uploadImage,
    };
  });
  beforeEach(() => {
    dataFetcher = new DataFetcher();
    files = setMockFiles(MOCK_FILE_INFO);
  });
  afterEach(() => {
    getPosts.mockClear();
    getPost.mockClear();
    writePost.mockClear();
    updatePost.mockClear();
    deletePost.mockClear();
    uploadImage.mockClear();
  });
  test("정상적인 getPosts 테스트", async () => {
    const posts = await dataFetcher.getPosts("/api/posts");

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getPosts).toHaveBeenLastCalledWith("/api/posts");
    expect(posts).toStrictEqual([
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
        createdAt: new Date("2020-11-30"),
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
        createdAt: new Date("2020-11-30"),
      },
    ]);
  });
  test("에러 발생 시 getPosts 테스트", async () => {
    const posts = await dataFetcher.getPosts("/error");

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getPosts).toHaveBeenLastCalledWith("/error");
    expect(posts).toStrictEqual([]);
  });

  test("정상적인 getPost 테스트", async () => {
    const post = await dataFetcher.getPost("/api/posts/mock1");

    expect(getPost).toHaveBeenCalledTimes(1);
    expect(getPost).toHaveBeenLastCalledWith("/api/posts/mock1");
    expect(post).toStrictEqual({
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
      createdAt: new Date("2020-11-30"),
    });
  });
  test("에러 발생 시 getPost 테스트", async () => {
    const post = await dataFetcher.getPost("/posts/error");

    expect(getPost).toHaveBeenCalledTimes(1);
    expect(getPost).toHaveBeenLastCalledWith("/posts/error");
    expect(post).toStrictEqual({
      _id: "error",
      title: "",
      tags: [],
      file: "",
      markdown: "",
      thumbnail: "",
      description: "",
      updatedAt: new Date("2020-11-30"),
      createdAt: new Date("2020-11-30"),
    });
  });

  test("정상적인 writePost 테스트", async () => {
    const ret = await dataFetcher.writePost({
      url: "/api/write",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });

    expect(writePost).toHaveBeenCalledTimes(1);
    expect(writePost).toHaveBeenLastCalledWith({
      url: "/api/write",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });
    expect(ret.success).toBe(true);
  });

  test("에러 발생 시 writePost 테스트", async () => {
    const ret = await dataFetcher.writePost({
      url: "/api/error",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });

    expect(writePost).toHaveBeenCalledTimes(1);
    expect(writePost).toHaveBeenLastCalledWith({
      url: "/api/error",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });
    expect(ret.success).toBe(false);
  });

  test("정상적인 updatePost 테스트", async () => {
    const ret = await dataFetcher.updatePost({
      url: "/api/write/mock1",
      prevTitle: "",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });

    expect(updatePost).toHaveBeenCalledTimes(1);
    expect(updatePost).toHaveBeenLastCalledWith({
      url: "/api/write/mock1",
      prevTitle: "",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });
    expect(ret.success).toBe(true);
  });

  test("에러 발생 시 updatePost 테스트", async () => {
    const ret = await dataFetcher.updatePost({
      url: "/api/write/error",
      prevTitle: "",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });

    expect(updatePost).toHaveBeenCalledTimes(1);
    expect(updatePost).toHaveBeenLastCalledWith({
      url: "/api/write/error",
      prevTitle: "",
      title: "",
      tags: [],
      description: "",
      markdown: "",
    });
    expect(ret.success).toBe(false);
  });

  test("정상적인 deletePost 테스트", async () => {
    const posts = await dataFetcher.getPosts("/api/posts");

    expect(posts).toHaveLength(2);
    const afterDeletePost = await dataFetcher.deletePost(
      "/api/posts/mock2",
      "test post2"
    );

    expect(afterDeletePost).toHaveLength(1);
    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenLastCalledWith(
      "/api/posts/mock2",
      "test post2"
    );
  });

  test("에러 발생 시 deletePost 테스트", async () => {
    const afterDeletePost = await dataFetcher.deletePost(
      "/posts/mock1",
      "test post1"
    );

    expect(afterDeletePost).toHaveLength(0);
    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenLastCalledWith("/posts/mock1", "test post1");
  });

  test("정상적인 uploadImage 테스트", async () => {
    const ret = await dataFetcher.uploadImage("/api/images", files);

    expect(uploadImage).toHaveBeenCalledTimes(1);
    expect(uploadImage).toHaveBeenLastCalledWith("/api/images", files);
    expect(ret.success).toBe(true);
    expect(ret.data).toBe("success");
  });

  test("파일이 없는 경우 에러", async () => {
    const ret = await dataFetcher.uploadImage("/api/images", null);

    expect(uploadImage).toHaveBeenCalledTimes(1);
    expect(uploadImage).toHaveBeenLastCalledWith("/api/images", null);
    expect(ret.success).toBe(false);
    expect(ret.data).toBe("empty");
  });

  test("에러 발생 시 uploadImage 테스트", async () => {
    const ret = await dataFetcher.uploadImage("/api/error", files);

    expect(uploadImage).toHaveBeenCalledTimes(1);
    expect(uploadImage).toHaveBeenLastCalledWith("/api/error", files);
    expect(ret.success).toBe(false);
    expect(ret.data).toBe("");
  });
});

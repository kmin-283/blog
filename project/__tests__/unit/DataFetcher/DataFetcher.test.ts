import DataFetcher, { IDataFetcher } from "@/libs/DataFetcher";
import {
  mockGetPosts as getPosts,
  mockDeletePost as deletePost,
} from "../../../__mocks__/postMock";
import { expect } from "@jest/globals";

jest.mock("@/libs/DataFetcher");

describe("DataFetcher 테스트", () => {
  let dataFetcher: DataFetcher;
  (DataFetcher as unknown as jest.Mock<IDataFetcher>).mockImplementation(() => {
    return {
      getPosts,
      deletePost,
    };
  });
  beforeEach(() => {
    dataFetcher = new DataFetcher();
  });
  afterEach(() => {
    getPosts.mockClear();
    deletePost.mockClear();
  });
  test("정상적인 getPosts 테스트", async () => {
    const posts = await dataFetcher.getPosts("/posts");

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getPosts).toHaveBeenLastCalledWith("/posts");
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
    ]);
  });
  test("에러 발생 시 getPosts 테스트", async () => {
    const posts = await dataFetcher.getPosts("/error");

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(getPosts).toHaveBeenLastCalledWith("/error");
    expect(posts).toStrictEqual([]);
  });
  test("정상적인 deletePost 테스트", async () => {
    const posts = await dataFetcher.getPosts("/posts");

    expect(posts).toHaveLength(2);
    const afterDeletePost = await dataFetcher.deletePost(
      "/posts/mock2",
      "test post2"
    );

    expect(afterDeletePost).toHaveLength(1);
    expect(deletePost).toHaveBeenCalledTimes(1);
    expect(deletePost).toHaveBeenLastCalledWith("/posts/mock2", "test post2");
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
});

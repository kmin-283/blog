import Database, { IDatabase } from "@/libs/Database";
import { Model, Connection, Schema } from "mongoose";
import { IPost } from "@/models/post";
import {
  mockConnect as connect,
  mockCreate as create,
  mockFind as find,
  mockDeleteOne as deleteOne,
  mockFindById as findById,
  mockFindByIdAndUpdate as findByIdAndUpdate,
} from "../../../../__mocks__/mongooseMock";

// 만약 mongoose를 직접 mock하고 싶다면 아래와 같이 시도한다.
// jest.mock("mongoose", () => ({
//   createConnection: jest
//     .fn()
//     .mockImplementation(
//       (uri: string, options?: ConnectOptions): Connection | null => {
//         if (uri === "mongodb://localhost:27017/test") {
//           return {
//             db: jest.fn().mockReturnThis(),
//             model: mockModel,
//           } as unknown as Connection;
//         }
//         return null;
//       }
//     ),
//   Connection: jest.fn(),
// }));

jest.mock("@/libs/Database");

interface ModelWithClear extends Model<any, {}, {}, {}> {
  clear: () => void;
}

describe("Database 테스트", () => {
  let db: Database;
  const modelSchema = {} as Schema;

  // type을 IPost로 IDatabase에 명시하면 해결됨.
  // 하지만 generic을 유지하는게 확장성있다고 생각해서 ts-ignore를 사용함.
  // @ts-ignore
  (Database as unknown as jest.Mock<IDatabase>).mockImplementation(() => {
    return {
      connect,
      create,
      find,
      deleteOne,
      findById,
      findByIdAndUpdate,
    };
  });
  beforeEach(() => {
    db = new Database();
  });

  test("정상 connect 테스트", () => {
    const good = db.connect("mongodb://localhost:27017/test", "testDb");
    expect(good?.db).not.toBe(undefined);
  });

  test("에러 connect 테스트", () => {
    const error = db.connect("mongodb://localhost:27017/error", "testDb");
    expect(error).toBe(null);
  });

  describe("정상적으로 db 생성 후 연결", () => {
    let conn: Connection | null;
    beforeEach(async () => {
      conn = db.connect("mongodb://localhost:27017/test", "testDb");
      await db.create<IPost>({
        document: {
          _id: "61ab94276a37b01a5c121ce1",
          title: "test1",
          tags: ["test1", "test2", "test3"],
          file: "./mds/test1.md",
          thumbnail: "/test1.jpg",
          description: "test1 posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-04T16:15:35.981Z"),
        },
        modelName: "Post",
        modelSchema,
      });

      await db.create<IPost>({
        document: {
          _id: "61ab94666a37b01a5c121ce6",
          title: "test22",
          tags: ["test21", "test22", "test23"],
          file: "./mds/test2.md",
          thumbnail: "/test2.jpg",
          description: "test2 posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-04T16:16:38.843Z"),
        },
        modelName: "Post",
        modelSchema,
      });
    });
    afterEach(() => {
      const postModel = conn?.model("Posts");
      (postModel as ModelWithClear)?.clear();
    });

    test("하나의 document를 생성한다", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });
      expect(posts.data).toHaveLength(2);

      await db.create<IPost>({
        document: {
          _id: "13ab54276k38b01a5c341ck6",
          title: "test3",
          tags: ["test31", "test32", "test33"],
          file: "./mds/test3.md",
          thumbnail: "/test3.jpg",
          description: "test3 posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-04T16:15:35.981Z"),
        },
        modelName: "Post",
        modelSchema,
      });

      posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });
      expect(posts.data).toHaveLength(3);
    });

    test("하나의 document 생성 실패", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "Fail",
        modelSchema,
      });

      expect(posts.data).toHaveLength(2);

      await db.create<IPost>({
        document: {
          _id: "13ab54276k38b01a5c341ck6",
          title: "failToCreate",
          tags: ["test31", "test32", "test33"],
          file: "./mds/test3.md",
          thumbnail: "/test3.jpg",
          description: "test3 posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-04T16:15:35.981Z"),
        },
        modelName: "FailToCreate",
        modelSchema,
      });

      posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });
      expect(posts.data).toHaveLength(2);
    });

    test("모든 document를 가져온다", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });

      expect(posts.data).toHaveLength(2);
      expect((posts.data as unknown as IPost[])[0]).toStrictEqual({
        _id: "61ab94276a37b01a5c121ce1",
        title: "test1",
        tags: ["test1", "test2", "test3"],
        file: "./mds/test1.md",
        thumbnail: "/test1.jpg",
        description: "test1 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:15:35.981Z"),
      });
    });

    test("모든 document를 가져오지 못한다", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "FailToFind",
        modelSchema,
      });

      expect(posts.success).toBe(false);
      expect(posts.data).toBe(undefined);
    });

    test("특정 프로퍼티와 매칭되는 documents를 가져온다", async () => {
      let post = await db.find({
        filter: {
          title: "test1",
        },
        modelName: "Post",
        modelSchema,
      });

      expect((post.data as unknown as IPost[])[0]).toStrictEqual({
        _id: "61ab94276a37b01a5c121ce1",
        title: "test1",
        tags: ["test1", "test2", "test3"],
        file: "./mds/test1.md",
        thumbnail: "/test1.jpg",
        description: "test1 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:15:35.981Z"),
      });
    });

    test("특정 프로퍼티에 매칭되는 documents를 가져오지 못한다", async () => {
      let post = await db.find({
        filter: {
          title: "test1",
        },
        modelName: "FailToFind",
        modelSchema,
      });
      expect(post.success).toBe(false);
      expect(post.data).toBe(undefined);
    });

    test("하나의 document를 삭제한다", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });

      expect(posts.data).toHaveLength(2);
      await db.deleteOne({
        filter: { _id: "61ab94666a37b01a5c121ce6" },
        modelName: "Post",
        modelSchema,
      });
      posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });

      expect(posts.data).toHaveLength(1);
    });

    test("하나의 document를 삭제하지 못한다", async () => {
      let posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });

      expect(posts.data).toHaveLength(2);

      posts = await db.deleteOne({
        filter: { _id: "61ab94666a37b01a5c121ce6" },
        modelName: "FailToDelete",
        modelSchema,
      });

      expect(posts.success).toBe(false);

      posts = await db.find({
        filter: {},
        modelName: "Post",
        modelSchema,
      });

      expect(posts.data).toHaveLength(2);
    });

    test("id로 document를 찾는다", async () => {
      const post = await db.findById<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        modelName: "Post",
        modelSchema,
      });

      expect(post.data).toStrictEqual({
        _id: "61ab94666a37b01a5c121ce6",
        title: "test22",
        tags: ["test21", "test22", "test23"],
        file: "./mds/test2.md",
        thumbnail: "/test2.jpg",
        description: "test2 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:16:38.843Z"),
      });
    });

    test("id로 document를 찾지 못한다", async () => {
      const post = await db.findById<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        modelName: "FailToFindById",
        modelSchema,
      });

      expect(post.success).toBe(false);
      expect(post.data).toBe(undefined);
    });

    test("id로 document를 찾은 후 update한다", async () => {
      let post = await db.findById<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        modelName: "Post",
        modelSchema,
      });

      expect(post.data).toStrictEqual({
        _id: "61ab94666a37b01a5c121ce6",
        title: "test22",
        tags: ["test21", "test22", "test23"],
        file: "./mds/test2.md",
        thumbnail: "/test2.jpg",
        description: "test2 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:16:38.843Z"),
      });

      post = await db.findByIdAndUpdate<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        update: {
          title: "test22-update",
          tags: ["test21-update", "test22-update", "test23-update"],
          file: "./mds/test2-update.md",
          thumbnail: "/test2-update.jpg",
          description: "test2-update posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-05T16:16:38.843Z"),
        },
        modelName: "Post",
        modelSchema,
      });

      expect(post.data).toStrictEqual({
        _id: "61ab94666a37b01a5c121ce6",
        title: "test22-update",
        tags: ["test21-update", "test22-update", "test23-update"],
        file: "./mds/test2-update.md",
        thumbnail: "/test2-update.jpg",
        description: "test2-update posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-05T16:16:38.843Z"),
      });
    });

    test("id로 document를 찾은 후 update하지 못한다", async () => {
      let post = await db.findById<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        modelName: "Post",
        modelSchema,
      });

      expect(post.data).toStrictEqual({
        _id: "61ab94666a37b01a5c121ce6",
        title: "test22",
        tags: ["test21", "test22", "test23"],
        file: "./mds/test2.md",
        thumbnail: "/test2.jpg",
        description: "test2 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:16:38.843Z"),
      });

      post = await db.findByIdAndUpdate<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        update: {
          title: "test22-update",
          tags: ["test21-update", "test22-update", "test23-update"],
          file: "./mds/test2-update.md",
          thumbnail: "/test2-update.jpg",
          description: "test2-update posting description",
          internalLinks: "[]",
          updatedAt: new Date("2021-12-05T16:16:38.843Z"),
        },
        modelName: "FailToFindByIdAndUpdate",
        modelSchema,
      });

      expect(post.success).toBe(false);

      post = await db.findById<IPost>({
        id: "61ab94666a37b01a5c121ce6",
        modelName: "Post",
        modelSchema,
      });

      expect(post.data).toStrictEqual({
        _id: "61ab94666a37b01a5c121ce6",
        title: "test22",
        tags: ["test21", "test22", "test23"],
        file: "./mds/test2.md",
        thumbnail: "/test2.jpg",
        description: "test2 posting description",
        internalLinks: "[]",
        updatedAt: new Date("2021-12-04T16:16:38.843Z"),
      });
    });
  });
});

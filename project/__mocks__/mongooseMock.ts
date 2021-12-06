import { Connection, Schema } from "mongoose";
import { ReturnState } from "@/libs/Database";
import { IPost } from "@/models/post";

type post = {
  _id: string;
};

type documents<T> = { [P in keyof T]?: T[P] };

let posts: documents<post>[] = [];

const mockModel = jest.fn(
  (name: string, schema?: Schema<any>, collection?: string) => {
    return {
      clear: () => {
        posts = [];
      },
      find: async (filter: {}) => {
        return posts;
      },
      deleteOne: async ({ _id: __id }: { _id: string }) => {
        posts = posts.filter(({ _id }) => _id !== __id);
      },
      create: async <T>(obj: documents<post>) => {
        posts.push(obj);
      },
      findById: (id: string) => {
        posts = posts.filter(({ _id }) => _id === id);
        return posts[0];
      },
      findByIdAndUpdate: <T>(id: string, update: documents<post>) => {
        posts = posts.map((post) => {
          if (post._id === id) {
            return { _id: post._id, ...update };
          }
          return post;
        });
        return posts.filter(({ _id }) => _id === id)[0];
      },
    };
  }
);

const mockConnect = jest.fn((uri: string, dbName: string) => {
  if (uri === "mongodb://localhost:27017/test") {
    return {
      db: jest.fn().mockReturnThis(),
      model: mockModel,
    } as unknown as Connection;
  }
  return null;
});

const mockCreate = jest.fn(
  async <T>({
    document,
    modelName,
    modelSchema,
  }: {
    document: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<IPost>> => {
    if (modelName === "FailToCreate") {
      return { success: false };
    }
    await mockModel("name", {} as Schema, "collections").create(document);
    return { success: true };
  }
);

const mockFind = jest.fn(
  async <T>({
    modelName,
    modelSchema,
  }: {
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> => {
    if (modelName === "FailToFind") {
      return { success: false };
    }
    const data = await mockModel("name", {} as Schema, "collections").find({});
    return { success: true, data: data as unknown as T[] };
  }
);
const mockDeleteOne = jest.fn(
  async <T>({
    filter,
    modelName,
    modelSchema,
  }: {
    filter: { _id: string };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> => {
    if (modelName === "FailToDelete") {
      return { success: false };
    }
    await mockModel("name", {} as Schema, "collections").deleteOne(filter);
    return { success: true };
  }
);

const mockFindById = jest.fn(
  async <T>({
    id,
    modelName,
    modelSchema,
  }: {
    id: string;
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> => {
    if (modelName === "FailToFindById") {
      return { success: false };
    }
    const data = await mockModel("name", {} as Schema, "collections").findById(
      id
    );
    return { success: true, data: data as unknown as T };
  }
);
const mockFindByIdAndUpdate = jest.fn(
  async <T>({
    id,
    update,
    modelName,
    modelSchema,
  }: {
    id: string;
    update: { [P in keyof T]?: T[P] };
    modelName: string;
    modelSchema: Schema;
  }): Promise<ReturnState<T>> => {
    if (modelName === "FailToFindByIdAndUpdate") {
      return { success: false };
    }
    const data = await mockModel(
      "name",
      {} as Schema,
      "collections"
    ).findByIdAndUpdate(id, update);
    return { success: true, data: data as unknown as T };
  }
);

export {
  mockConnect,
  mockModel,
  mockCreate,
  mockFind,
  mockDeleteOne,
  mockFindById,
  mockFindByIdAndUpdate,
};

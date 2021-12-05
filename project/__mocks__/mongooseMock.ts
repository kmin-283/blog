import { Schema } from "mongoose";

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
      find: async (filter: {}): Promise<documents<post>[]> => {
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

export { mockModel };

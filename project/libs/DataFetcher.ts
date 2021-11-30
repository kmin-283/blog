import { IPost } from "@/models/post";

export default class DataFetcher implements IDataFetcher {
  constructor() {}

  async getPosts(url: string) {
    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      //TODO res가 실패했다는 로그
      return [];
    } catch (error) {
      //TODO 에러 로그
      return [];
    }
  }

  async deletePost(url: string, title: string) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        return data;
      }
      //TODO res가 실패했다는 로그
      return [];
    } catch (error) {
      //TODO 에러 로그
      return [];
    }
  }
}

export interface IDataFetcher {
  getPosts: (url: string) => Promise<IPost[]>;
  deletePost: (url: string, title: string) => Promise<IPost[]>;
}

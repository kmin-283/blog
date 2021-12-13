import { IPost, IPostWithMarkdown } from "@/models/post";

export default class DataFetcher implements IDataFetcher {
  constructor() {}

  async getPosts(url: string): Promise<IPost[]> {
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

  async getPost(url: string): Promise<IPostWithMarkdown> {
    const errorObj: IPostWithMarkdown = {
      _id: "error",
      title: "",
      tags: [],
      file: "",
      markdown: "",
      thumbnail: "",
      description: "",
      updatedAt: new Date(),
    };
    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (res.ok) {
        const { data } = await res.json();
        return data;
      }
      //TODO res가 실패했다는 로그
      return errorObj;
    } catch (error) {
      //TODO 에러 로그
      return errorObj;
    }
  }

  async writePost({
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
  }): Promise<{ success: boolean }> {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ title, tags, description, markdown }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        return { success: true };
      }
      //TODO res가 실패했다는 로그
      return { success: false };
    } catch (error) {
      //TODO 에러 로그
      return { success: false };
    }
  }

  async updatePost({
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
  }): Promise<{ success: boolean }> {
    try {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ prevTitle, title, tags, description, markdown }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        return { success: true };
      }
      //TODO res가 실패했다는 로그
      return { success: false };
    } catch (error) {
      //TODO 에러 로그
      return { success: false };
    }
  }

  async deletePost(url: string, title: string): Promise<IPost[]> {
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

  async uploadImage(
    url: string,
    files: FileList | null
  ): Promise<{ success: boolean; data: string }> {
    try {
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        const res = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const {
            data: { Location },
          } = await res.json();
          return { success: true, data: Location };
        }
      }
      //TODO 파일이 없음
      return { success: false, data: "empty" };
    } catch (error) {
      //TODO 에러 로그
      return { success: false, data: "" };
    }
  }
}

export interface IDataFetcher {
  getPosts: (url: string) => Promise<IPost[]>;
  getPost: (url: string) => Promise<IPostWithMarkdown>;
  writePost: ({
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
  }) => Promise<{ success: boolean }>;
  updatePost: ({
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
  }) => Promise<{ success: boolean }>;
  deletePost: (url: string, title: string) => Promise<IPost[]>;
  uploadImage: (
    url: string,
    file: FileList | null
  ) => Promise<{ success: boolean; data: string }>;
}

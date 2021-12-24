import React from "react";
import Admin from "../../../../pages/_blog-admin";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DataFetcher, { IDataFetcher } from "@/libs/DataFetcher";
import {
  mockDeletePost as deletePost,
  mockGetPost as getPost,
  mockGetPosts as getPosts,
  mockUpdatePost as updatePost,
  mockUploadImage as uploadImage,
  mockWritePost as writePost,
} from "../../../../__mocks__/postMock";

jest.mock("@/libs/DataFetcher");

describe("_blog-admin 페이지", () => {
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

  const session = {};
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
    render(<Admin session={session} />, {
      baseElement: element,
    });
  });

  afterEach(() => {
    getPosts.mockClear();
    getPost.mockClear();
    writePost.mockClear();
    updatePost.mockClear();
    deletePost.mockClear();
    uploadImage.mockClear();
    if (element) {
      document.body.removeChild(element);
    }
  });

  test("render", async () => {
    const post = screen.queryByText("글")!;
    fireEvent.click(post);
    await waitFor(() => {});
    expect(element).toHaveTextContent("test post1");
    expect(element).toHaveTextContent("test post2");
  });

  test("포스트를 삭제할 수 있어야 한다", async () => {
    let post = screen.queryByText("글")!;
    fireEvent.click(post);
    await waitFor(() => {});

    const dropdowns = screen.queryAllByTitle("openDropdown")!;
    expect(dropdowns).toHaveLength(2);

    fireEvent.click(dropdowns[1]);
    await waitFor(() => {});

    const firstDeleteButton = screen.queryByText("삭제하기")!;
    fireEvent.click(firstDeleteButton);
    await waitFor(() => {});

    fireEvent.click(screen.queryByText("예")!);
    await waitFor(() => {});

    expect(element).toHaveTextContent("test post1");
    expect(element).not.toHaveTextContent("test post2");
  });
});

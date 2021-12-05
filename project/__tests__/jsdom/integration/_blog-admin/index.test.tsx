import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Admin from "../../../../pages/_blog-admin";

describe("_blog-admin 페이지", () => {
  afterAll(cleanup);

  test("통계 또는 글을 클릭하면 해당 주제가 활성화된다", async () => {
    const session = {};

    const { container } = render(<Admin session={session} />);
    const posts = screen.queryByText("글")!;
    const stats = screen.queryByText("통계")!;
    expect(container).toHaveTextContent(
      "statistics 컴포넌트, grid를 활용하여 통계적인 자료를 보여줄 수 있을까?"
    );
    fireEvent.click(posts);

    await waitFor(() => {
      expect(container).toHaveTextContent(
        "블로그에 글을 발행하거나 관리합니다."
      );
    });
    fireEvent.click(stats);

    await waitFor(() => {
      expect(container).toHaveTextContent(
        "statistics 컴포넌트, grid를 활용하여 통계적인 자료를 보여줄 수 있을까?"
      );
    });
  });
});

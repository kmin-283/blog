import React from "react";
import Tags from "@/components/Tags/Tags";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Tags 컴포넌트", () => {
  const tags = ["firstTag", "secondTag", "thirdTag"];
  afterAll(cleanup);

  test("Tags 내부에 Tag가 있어야 한다", () => {
    const { getAllByRole } = render(<Tags tags={tags} howMany={3} />);
    const tagItems = getAllByRole("listitem");

    expect(tagItems).toHaveLength(3);
  });

  test("howMany만큼의 Tag가 보여야한다", () => {
    const { getAllByRole } = render(<Tags tags={tags} howMany={2} />);
    const tagItems = getAllByRole("listitem");

    expect(tagItems).toHaveLength(2);
  });

  test("Tag를 클릭하면 함수가 동작해야 한다", () => {
    const div = document.createElement("div");
    const fn = jest.fn((index: number) => {
      div.innerText = `${index} key is pressed`;
    });
    const { getAllByRole } = render(
      <Tags tags={tags} howMany={2} onClickHandler={fn} />
    );
    const tagItems = getAllByRole("listitem");

    expect(div.innerText).toBe(undefined);
    fireEvent.click(tagItems[0]);
    expect(div.innerText).toBe("0 key is pressed");
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

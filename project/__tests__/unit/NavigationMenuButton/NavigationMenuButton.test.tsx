import React from "react";
import NavigationMenuButton from "@/components/NavigationMenuButton/NavigationMenuButton";
import {
  render,
  cleanup,
  screen,
  fireEvent,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

describe("NavigationMenuButton 컴포넌트", () => {
  const internalLinks =
    "[" +
    '{"headingLevel":2,"value":"1 헤딩","child":[]},' +
    '{"headingLevel":2,"value":"2 헤딩","child":[' +
    '{"headingLevel":3,"value":"2-1 헤딩","child":[' +
    '{"headingLevel":4,"value":"2-1-1 헤딩","child":[]},' +
    '{"headingLevel":4,"value":"2-1-2 헤딩","child":[' +
    '{"headingLevel":5,"value":"2-1-2-1 헤딩","child":[]}]},' +
    '{"headingLevel":4,"value":"2-1-3 헤딩","child":[]}]},' +
    '{"headingLevel":3,"value":"2-2 헤딩","child":[]}]}]\n';
  let componenet: RenderResult;

  afterAll(cleanup);
  beforeEach(() => {
    componenet = render(<NavigationMenuButton internalLinks={internalLinks} />);
  });

  test("렌더링", () => {
    const navigationMenuButton = renderer
      .create(<NavigationMenuButton internalLinks={internalLinks} />)
      .toJSON();
    expect(navigationMenuButton).toMatchSnapshot();
  });

  test("클릭 이전엔 항목이 보이지 않는다", () => {
    expect(screen.queryByRole("ol")).not.toBeInTheDocument();
  });

  test("클릭 이후 항목이 보여야 한다", () => {
    const { getByRole } = componenet;
    const btn = getByRole("button");

    fireEvent.click(btn);

    const menu = getByRole("menu");

    expect(menu).toBeInTheDocument();
    expect(menu.children).toHaveLength(2);
  });
});

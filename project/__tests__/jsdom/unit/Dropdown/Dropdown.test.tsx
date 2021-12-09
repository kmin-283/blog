import React from "react";
import Dropdown from "@/components/Dropdown/Dropdown";
import DropdownItem from "@/components/Dropdown/DropdownItem/DropdownItem";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

describe("InpageNavigation 컴포넌트", () => {
  const playGround = document.createElement("div");
  const click1st = jest.fn(() => {
    playGround.innerText = "첫 번째 버튼이 클릭되었습니다";
  });
  const click2nd = jest.fn(() => {
    playGround.innerText = "두 번째 버튼이 클릭되었습니다";
  });
  let component: RenderResult;
  afterAll(cleanup);
  beforeEach(() => {
    component = render(
      <Dropdown>
        <DropdownItem onClick={click1st} icon={<span>dummyIcon</span>}>
          첫 번째 동작
        </DropdownItem>
        <DropdownItem onClick={click2nd} icon={<span>dummyIcon</span>}>
          두 번째 동작
        </DropdownItem>
      </Dropdown>
    );
  });

  test("렌더링", () => {
    const dropdown = renderer
      .create(
        <Dropdown>
          <DropdownItem onClick={click1st} icon={<span>dummyIcon</span>}>
            첫 번째 동작
          </DropdownItem>
          <DropdownItem onClick={click2nd} icon={<span>dummyIcon</span>}>
            두 번째 동작
          </DropdownItem>
        </Dropdown>
      )
      .toJSON();
    expect(dropdown).toMatchSnapshot();
  });

  test("dropdownIcon 클릭시 DropdownContent 생성", () => {
    const { container } = component;
    const dropdownIcon = container.querySelector(".dropdownIcon")!;

    expect(container.querySelector(".dropdownContent")).not.toBeInTheDocument();
    fireEvent.click(dropdownIcon);
    expect(container.querySelector(".dropdownContent")).toBeInTheDocument();
    fireEvent.click(dropdownIcon);
  });

  test("DropdownItem 클릭시 함수 동작", () => {
    const { getByText, container } = component;
    const dropdownIcon = container.querySelector(".dropdownIcon")!;

    expect(container.querySelector(".dropdownContent")).not.toBeInTheDocument();
    fireEvent.click(dropdownIcon);

    const firstItem = getByText("첫 번째 동작");
    fireEvent.click(firstItem);
    expect(playGround.innerText).toBe("첫 번째 버튼이 클릭되었습니다");
    expect(click1st).toHaveBeenCalledTimes(1);

    const secondItem = getByText("두 번째 동작");
    fireEvent.click(secondItem);
    expect(playGround.innerText).toBe("두 번째 버튼이 클릭되었습니다");
    expect(click1st).toHaveBeenCalledTimes(1);
  });
});

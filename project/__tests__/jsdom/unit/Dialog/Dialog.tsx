import React, { useContext } from "react";
import {
  render,
  RenderResult,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { DialogContext, DialogProvider } from "@/context/dialogContext";

const mockFn = jest.fn();

const AlertComponent = () => {
  const { handleModal } = useContext(DialogContext);
  return (
    <div>
      <button onClick={handleModal}>Close dialog</button>
      <button onClick={mockFn}>기능 실행</button>
    </div>
  );
};

const TestPage = () => {
  const { handleDialog } = useContext(DialogContext);
  return (
    <div>
      <button onClick={() => handleDialog(<AlertComponent />)}>
        dialog toggle
      </button>
    </div>
  );
};

describe("Dialog 컴포넌트", () => {
  let component: RenderResult;
  const element = document.createElement("div");
  element.setAttribute("id", "dialog-root");
  document.body.appendChild(element);
  const otherElement = document.createElement("div");
  otherElement.setAttribute("id", "not-dialog-root");
  document.body.appendChild(otherElement);

  beforeEach(() => {
    component = render(
      <DialogProvider>
        <TestPage />
      </DialogProvider>
    );
  });
  test("dialog는 react portal로 생성되므로 #dialog-root 아래에서 렌더링되어야 한다.", async () => {
    const { queryByText } = component;
    fireEvent.click(queryByText("dialog toggle")!);
    await waitFor(() => {});
    expect(document.body).toMatchSnapshot();
  });

  test("버튼을 클릭하면 dialog는 나타나거나 사라진다.", async () => {
    const { queryByText } = component;
    expect(document.querySelector("#dialog-root")).not.toHaveTextContent(
      "Close dialog"
    );
    fireEvent.click(queryByText("dialog toggle")!);
    await waitFor(() => {});
    expect(document.querySelector("#dialog-root")).toHaveTextContent(
      "Close dialog"
    );
    fireEvent.click(queryByText("dialog toggle")!);
    await waitFor(() => {});
    expect(document.querySelector("#dialog-root")).not.toHaveTextContent(
      "Close dialog"
    );
  });

  test("dialog가 열리고, 예(동의) 버튼을 누르면 특정 기능이 실행된다.", async () => {
    const { queryByText } = component;
    fireEvent.click(queryByText("dialog toggle")!);
    await waitFor(() => {});
    fireEvent.click(queryByText("기능 실행")!);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

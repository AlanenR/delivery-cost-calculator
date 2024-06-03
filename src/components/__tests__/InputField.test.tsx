import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../InputField";

describe("InputField Component", () => {
  const mockOnChange = jest.fn();

  it("renders correctly with provided props", () => {
    render(
      <InputField
        type="text"
        id="testInput"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        testId="testId"
      />
    );

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Test Label" })).toHaveValue(
      "Test Value"
    );
  });

  it("associates the label correctly with the input field", () => {
    render(
      <InputField
        type="text"
        id="testInput"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        testId="testId"
      />
    );

    const input = screen.getByLabelText("Test Label");
    expect(input).toHaveAttribute("id", "testInput");
    expect(input).toHaveAttribute("name", "testName");
    expect(input).toHaveAttribute("type", "text");
  });

  it("displays the correct value", () => {
    render(
      <InputField
        type="text"
        id="testInput"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        testId="testId"
      />
    );

    expect(screen.getByRole("textbox")).toHaveValue("Test Value");
  });

  it("calls onChange when the input value changes", () => {
    render(
      <InputField
        type="text"
        id="testInput"
        name="testName"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        testId="testId"
      />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});

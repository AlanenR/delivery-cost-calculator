import { render, screen } from "@testing-library/react";
import SubmitBtn from "../SubmitBtn";

describe("SubmitBtn Component", () => {
  const ctaText = "Click";

  it("renders the component with the correct button text", () => {
    render(<SubmitBtn cta={ctaText} testId="testId" />);

    const buttonElement = screen.getByTestId('testId');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(ctaText);
  });
});

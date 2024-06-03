import { render, screen } from "@testing-library/react";
import DisplayFee from "../DisplayFee";

describe("DisplayFee Component", () => {
  it("renders correctly and displays the fee", () => {
    const fee = "10.00";
    render(<DisplayFee fee={fee} testId="testId" />);

    const regexFee: RegExp = new RegExp(`${fee}€`);
    expect(screen.getByText(regexFee)).toBeInTheDocument();
  });
});

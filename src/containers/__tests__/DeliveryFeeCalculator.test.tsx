import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import DeliveryFeeCalculator from "../DeliveryFeeCalculator";
import calculateTotalDeliveryFee from "../../utils/calculateTotalDeliveryFee";

jest.mock("../../utils/calculateTotalDeliveryFee", () => jest.fn());

describe("DeliveryFeeCalculator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (calculateTotalDeliveryFee as jest.Mock).mockReturnValue(10);
  });

  it("calculates and displays the delivery fee on form submission", async () => {
    render(<DeliveryFeeCalculator />);
    const user = userEvent.setup();

    // Fill the form
    await user.type(screen.getByTestId("numberOfItems"), "5");
    await user.type(screen.getByTestId("cartValue"), "100");
    await user.type(screen.getByTestId("deliveryDistance"), "1000");
    await user.type(screen.getByTestId("orderTime"), "2023-01-01T12:00");

    // Submit
    await user.click(screen.getByTestId("calculateDeliveryFeeBtn"));

    await waitFor(() => {
      expect(calculateTotalDeliveryFee).toHaveBeenCalledWith({
        numOfItems: 5,
        cartValue: 100,
        deliveryDistance: 1000,
        orderTime: expect.any(Date),
      });
    });

    const fee = "10.00";
    const regexFee: RegExp = new RegExp(`${fee}€`);
    await waitFor(() => {
      expect(screen.getByText(regexFee)).toBeInTheDocument();
    });
  });
});

describe("Renders DeliveryFeeCalculator component with correct components", () => {
  it("Renders the form", () => {
    render(<DeliveryFeeCalculator />);

    const form = screen.getByTestId("deliveryFeeCalculator");
    const inputNumOfItems = screen.getByTestId("numberOfItems");
    const inputCartValue = screen.getByTestId("cartValue");
    const inputDistance = screen.getByTestId("deliveryDistance");
    const inputOrderTime = screen.getByTestId("orderTime");
    const button = screen.getByTestId("calculateDeliveryFeeBtn");
    const displayFee = screen.getByTestId("fee");

    expect(form).toBeInTheDocument();
    expect(inputNumOfItems).toBeInTheDocument();
    expect(inputCartValue).toBeInTheDocument();
    expect(inputDistance).toBeInTheDocument();
    expect(inputOrderTime).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(displayFee).toBeInTheDocument();
  });
});

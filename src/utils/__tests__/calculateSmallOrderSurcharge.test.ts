import calculateSmallOrderSurcharge from "../calculateSmallOrderSurcharge";
import deliveryConfig from "../../constants";

describe("SmallOrderSurcharge returns accurate sums", () => {
  const { SMALL_ORDER_THRESHOLD } = deliveryConfig;

  it("Returns 0 surcharge for cart values at the threshold", () => {
    const cartValue = SMALL_ORDER_THRESHOLD;
    expect(calculateSmallOrderSurcharge(cartValue)).toEqual(0);
  });

  it("Returns 0 surcharge for cart values above the threshold", () => {
    const cartValue = SMALL_ORDER_THRESHOLD + 1;
    expect(calculateSmallOrderSurcharge(cartValue)).toEqual(0);
  });

  it("Calculates the correct surcharge for cart values just below the threshold", () => {
    const cartValue = SMALL_ORDER_THRESHOLD - 0.01;
    const expectedSurcharge = 0.01;
    expect(calculateSmallOrderSurcharge(cartValue)).toEqual(expectedSurcharge);
  });

  it("Calculates the correct surcharge for cart values significantly below the threshold", () => {
    const cartValue = SMALL_ORDER_THRESHOLD - 5;
    const expectedSurcharge = 5;
    expect(calculateSmallOrderSurcharge(cartValue)).toEqual(expectedSurcharge);
  });
});

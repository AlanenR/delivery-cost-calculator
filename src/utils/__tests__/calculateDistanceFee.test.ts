import deliveryConfig from "../../constants";
import calculateDistanceFee from "../calculateDistanceFee";

describe("calculateDistanceFee returns accurate sums", () => {
  it("Returns base delivery fee for distances within the base distance", () => {
    const distance = 1000;
    const expectedFee = deliveryConfig.BASE_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Calculates additional fee correctly for distances beyond the base distance", () => {
    const distance = 1500;
    const expectedFee =
      deliveryConfig.BASE_DELIVERY_FEE + deliveryConfig.ADDITIONAL_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Calculates multiple additional fees correctly for longer distances", () => {
    const distance = 2000;
    const expectedFee =
      deliveryConfig.BASE_DELIVERY_FEE +
      2 * deliveryConfig.ADDITIONAL_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Applies minimum additional fee for any distance beyond the base distance", () => {
    const distance = 1100;
    const expectedFee =
      deliveryConfig.BASE_DELIVERY_FEE + deliveryConfig.ADDITIONAL_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Applies additional fees correctly for exact increments of additional distance rate", () => {
    const distance = 2000;
    const expectedFee =
      deliveryConfig.BASE_DELIVERY_FEE +
      2 * deliveryConfig.ADDITIONAL_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Handles edge case of very small distance", () => {
    const distance = 0;
    const expectedFee = deliveryConfig.BASE_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });

  it("Handles edge case of distance just at the threshold for an additional fee", () => {
    const distance = 1001;
    const expectedFee =
      deliveryConfig.BASE_DELIVERY_FEE + deliveryConfig.ADDITIONAL_DELIVERY_FEE;
    expect(calculateDistanceFee(distance)).toEqual(expectedFee);
  });
});

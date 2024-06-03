import calculateItemSurcharge from "../calculateItemSurcharge";
import deliveryConfig from "../../constants";

describe("calculateItemSurcharge returns accurate sums", () => {
  it("Returns 0.50 surcharge when the number of items is at the threshold", () => {
    const numOfItems = deliveryConfig.BULK_ITEM_THRESHOLD;
    expect(calculateItemSurcharge(numOfItems)).toEqual(0.50);
  });

  it("Returns 0 surcharge when the number of items is below the threshold", () => {
    const numOfItems = deliveryConfig.BULK_ITEM_THRESHOLD - 1;
    expect(calculateItemSurcharge(numOfItems)).toEqual(0);
  });

  it("Calculates the correct surcharge when the number of items is above the threshold", () => {
    const numOfItems = deliveryConfig.BULK_ITEM_THRESHOLD + 1;
    expect(calculateItemSurcharge(numOfItems)).toEqual(1.00);
  });

  it("Calculates the correct surcharge for a significantly higher number of items", () => {
    const extraItems = 5;
    const numOfItems = deliveryConfig.BULK_ITEM_THRESHOLD + extraItems;
    const expectedSurcharge = (extraItems + 1) * deliveryConfig.ITEM_SURCHARGE;
    expect(calculateItemSurcharge(numOfItems)).toEqual(expectedSurcharge);
  });
});

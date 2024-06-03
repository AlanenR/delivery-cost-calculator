import calculateExtraBulkFee from "../calculateExtraBulkFee";
import deliveryConfig from "../../constants";

describe("calculateExtraBulkFee returns accurate sums", () => {
  it("Returns 0 when the number of items is at the threshold", () => {
    const numOfItems = deliveryConfig.EXTRA_BULK_THRESHOLD;
    expect(calculateExtraBulkFee(numOfItems)).toEqual(0);
  });

  it("Returns 0 when the number of items is below the threshold", () => {
    const numOfItems = deliveryConfig.EXTRA_BULK_THRESHOLD - 1;
    expect(calculateExtraBulkFee(numOfItems)).toEqual(0);
  });

  it("Returns the EXTRA_BULK_FEE when the number of items is above the threshold", () => {
    const numOfItems = deliveryConfig.EXTRA_BULK_THRESHOLD + 1;
    expect(calculateExtraBulkFee(numOfItems)).toEqual(
      deliveryConfig.EXTRA_BULK_FEE
    );
  });

  it("Handles edge cases correctly, just at the threshold", () => {
    const numOfItemsAtThreshold = deliveryConfig.EXTRA_BULK_THRESHOLD;
    expect(calculateExtraBulkFee(numOfItemsAtThreshold)).toEqual(0);

    const numOfItemsJustOverThreshold = deliveryConfig.EXTRA_BULK_THRESHOLD + 1;
    expect(calculateExtraBulkFee(numOfItemsJustOverThreshold)).toEqual(
      deliveryConfig.EXTRA_BULK_FEE
    );
  });
});

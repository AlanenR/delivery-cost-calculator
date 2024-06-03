import deliveryConfig from "../constants";

const calculateExtraBulkFee = (numOfItems: number): number => {
  const { EXTRA_BULK_THRESHOLD, EXTRA_BULK_FEE } = deliveryConfig;

  return numOfItems > EXTRA_BULK_THRESHOLD ? EXTRA_BULK_FEE : 0;
};

export default calculateExtraBulkFee;

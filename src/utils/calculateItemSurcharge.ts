import deliveryConfig from "../constants";

const calculateItemSurcharge = (numOfItems: number): number => {
  const { BULK_ITEM_THRESHOLD, ITEM_SURCHARGE } = deliveryConfig;

  if (numOfItems >= BULK_ITEM_THRESHOLD) {
    return (numOfItems - BULK_ITEM_THRESHOLD + 1) * ITEM_SURCHARGE;
  }

  return 0;
};

export default calculateItemSurcharge;

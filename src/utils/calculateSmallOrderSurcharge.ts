import deliveryConfig from "../constants";

const SmallOrderSurcharge = (cartValue: number): number => {
  const SMALL_ORDER_THRESHOLD = deliveryConfig.SMALL_ORDER_THRESHOLD;

  if (cartValue < SMALL_ORDER_THRESHOLD) {
    const total = SMALL_ORDER_THRESHOLD - cartValue;
    const roundedTotal = Math.round(total * 100) / 100;
    return roundedTotal;
  }
  return 0;
};

export default SmallOrderSurcharge;

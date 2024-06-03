import calculateItemSurcharge from "./calculateItemSurcharge";
import calculateDistanceFee from "./calculateDistanceFee";
import calculateExtraBulkFee from "./calculateExtraBulkFee";
import calculateSmallOrderSurcharge from "./calculateSmallOrderSurcharge";
import getRushMultiplier from "./getRushMultiplier";
import deliveryConfig from "../constants";

const calculateTotalDeliveryFee = ({
  numOfItems,
  cartValue,
  deliveryDistance,
  orderTime,
}: {
  numOfItems: number;
  cartValue: number;
  deliveryDistance: number;
  orderTime: Date;
}): number => {
  const { MAX_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } = deliveryConfig;

  const itemSurcharge = calculateItemSurcharge(numOfItems);
  const smallOrderSurcharge = calculateSmallOrderSurcharge(cartValue);
  const distanceFee = calculateDistanceFee(deliveryDistance);
  const bulkFee = calculateExtraBulkFee(numOfItems);

  const total =
    (itemSurcharge + smallOrderSurcharge + distanceFee + bulkFee) *
    getRushMultiplier(orderTime);

  if (cartValue >= FREE_DELIVERY_THRESHOLD) return 0;
  if (total > MAX_DELIVERY_FEE) return MAX_DELIVERY_FEE;

  return total;
};

export default calculateTotalDeliveryFee;

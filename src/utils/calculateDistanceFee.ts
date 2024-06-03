import deliveryConfig from "../constants";

const calculateDistanceFee = (deliveryDistance: number): number => {
  const {
    BASE_DISTANCE,
    BASE_DELIVERY_FEE,
    ADDITIONAL_DISTANCE_RATE,
    ADDITIONAL_DELIVERY_FEE,
  } = deliveryConfig;

  if (deliveryDistance <= BASE_DISTANCE) {
    return BASE_DELIVERY_FEE;
  }

  const extraDistance = deliveryDistance - BASE_DISTANCE;
  const extraCharges = Math.ceil(extraDistance / ADDITIONAL_DISTANCE_RATE) * ADDITIONAL_DELIVERY_FEE;

  return BASE_DELIVERY_FEE + extraCharges;
};

export default calculateDistanceFee;

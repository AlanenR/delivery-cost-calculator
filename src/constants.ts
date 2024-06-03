const deliveryConfig = {
  BASE_DELIVERY_FEE: 2, // A delivery fee for the first 1000 meters
  BASE_DISTANCE: 1000,
  ADDITIONAL_DELIVERY_FEE: 1, // Fee for every additional 500 meters
  ADDITIONAL_DISTANCE_RATE: 500,
  SMALL_ORDER_THRESHOLD: 10, // Minimum cart value before a small order surcharge applies
  SMALL_ORDER_SURCHARGE: (cartValue: number) => deliveryConfig.SMALL_ORDER_THRESHOLD - cartValue, // Calculates small order surcharge
  BULK_ITEM_THRESHOLD: 5,
  ITEM_SURCHARGE: 0.5,
  EXTRA_BULK_THRESHOLD: 12,
  EXTRA_BULK_FEE: 1.2,
  MAX_DELIVERY_FEE: 15, // Maximum delivery fee, including possible surcharges
  FREE_DELIVERY_THRESHOLD: 200, // Cart value for free delivery
  RUSH_HOUR_MULTIPLIER: 1.2,
  RUSH_HOUR_DAY: 5, // Friday
  RUSH_HOURS: [{ start: 15, end: 19 }], // The timezone of the browser
};

export default deliveryConfig;

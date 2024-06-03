import deliveryConfig from "../constants";

const getRushMultiplier = (orderTime: Date) => {
  const day = orderTime.getDay();
  const hours = orderTime.getHours();

  const {
    RUSH_HOUR_DAY,
    RUSH_HOUR_MULTIPLIER,
    RUSH_HOURS: [{ start: RUSH_HOUR_START, end: RUSH_HOUR_END }],
  } = deliveryConfig;

  if (
    day === RUSH_HOUR_DAY &&
    hours >= RUSH_HOUR_START &&
    hours < RUSH_HOUR_END
  ) {
    return RUSH_HOUR_MULTIPLIER;
  }
  return 1;
};

export default getRushMultiplier;
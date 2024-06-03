import getRushMultiplier from "../getRushMultiplier";
import deliveryConfig from "../../constants";

describe("getRushMultiplier", () => {
  const { RUSH_HOUR_DAY, RUSH_HOUR_MULTIPLIER, RUSH_HOURS } = deliveryConfig;
  const [rushHour] = RUSH_HOURS;

  // Helper function
 const createDate = (day: number, hour: number) => {
  const date = new Date();
  date.setDate(date.getDate() + ((day - date.getDay() + 7) % 7));
  date.setHours(hour, 0, 0, 0);
  return date;
};

  it("Applies multiplier during rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.start + 1);
    expect(getRushMultiplier(orderTime)).toEqual(RUSH_HOUR_MULTIPLIER);
  });

  it("Does not apply multiplier outside of rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.end + 1);
    expect(getRushMultiplier(orderTime)).toEqual(1);
  });

  it("Applies multiplier at the exact start of rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.start);
    expect(getRushMultiplier(orderTime)).toEqual(RUSH_HOUR_MULTIPLIER);
  });

  it("Does not apply multiplier at the exact end of rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.end);
    expect(getRushMultiplier(orderTime)).toEqual(1);
  });

  it("Does not apply multiplier just before the start of rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.start - 1);
    expect(getRushMultiplier(orderTime)).toEqual(1);
  });

  it("Does not apply multiplier just after the end of rush hour", () => {
    const orderTime = createDate(RUSH_HOUR_DAY, rushHour.end + 1);
    expect(getRushMultiplier(orderTime)).toEqual(1);
  });
});

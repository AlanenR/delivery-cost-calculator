import calculateItemSurcharge from "../calculateItemSurcharge";
import calculateDistanceFee from "../calculateDistanceFee";
import calculateExtraBulkFee from "../calculateExtraBulkFee";
import calculateSmallOrderSurcharge from "../calculateSmallOrderSurcharge";
import getRushMultiplier from "../getRushMultiplier";
import calculateTotalDeliveryFee from "../calculateTotalDeliveryFee";
import deliveryConfig from "../../constants";

jest.mock("../calculateItemSurcharge");
jest.mock("../calculateDistanceFee");
jest.mock("../calculateExtraBulkFee");
jest.mock("../calculateSmallOrderSurcharge");
jest.mock("../getRushMultiplier");

const mockCalculateItemSurcharge = jest.mocked(calculateItemSurcharge);
const mockCalculateDistanceFee = jest.mocked(calculateDistanceFee);
const mockCalculateExtraBulkFee = jest.mocked(calculateExtraBulkFee);
const mockCalculateSmallOrderSurcharge = jest.mocked(calculateSmallOrderSurcharge);
const mockGetRushMultiplier = jest.mocked(getRushMultiplier);

describe("calculateTotalDeliveryFee returns accurate sums", () => {
  const {
    FREE_DELIVERY_THRESHOLD,
    MAX_DELIVERY_FEE,
    RUSH_HOUR_DAY,
    RUSH_HOURS: [{ start: RUSH_HOUR_START, end: RUSH_HOUR_END }],
  } = deliveryConfig;

  // Helper function
  const createDate = (day: number, hours: number, minutes: number = 0) => {
    const date = new Date();
    date.setDate(day);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("Returns 0 for cart values equal to or above the free delivery threshold", () => {
    const cartValue = FREE_DELIVERY_THRESHOLD;
    const result = calculateTotalDeliveryFee({
      numOfItems: 5,
      cartValue,
      deliveryDistance: 1000,
      orderTime: new Date(),
    });
    expect(result).toEqual(0);
  });

  it("Applies the max delivery fee cap", () => {
    mockCalculateItemSurcharge.mockReturnValue(10);
    mockCalculateDistanceFee.mockReturnValue(10);
    mockCalculateExtraBulkFee.mockReturnValue(10);
    mockCalculateSmallOrderSurcharge.mockReturnValue(10);
    mockGetRushMultiplier.mockReturnValue(1.2);

    const orderTime = createDate(RUSH_HOUR_DAY, RUSH_HOUR_START + 1);

    const result = calculateTotalDeliveryFee({
      numOfItems: 20,
      cartValue: 50,
      deliveryDistance: 3000,
      orderTime: orderTime, // During rush hour
    });

    expect(result).toEqual(MAX_DELIVERY_FEE);
  });
});

import { ChangeEvent, useState } from "react";
import InputField from "../components/InputField";
import SubmitBtn from "../components/SubmitBtn";
import DisplayFee from "../components/DisplayFee";
import calculateTotalDeliveryFee from "../utils/calculateTotalDeliveryFee";
import styles from "./DeliveryFeeCalculator.module.css";
import scooterImage from "../assets/images/mopedi.png";

const DeliveryFeeCalculator = () => {
  const [numOfItems, setNumOfItems] = useState<number>(0);
  const [cartValue, setCartValue] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [errors, setErrors] = useState({
    numOfItems: "",
    cartValue: "",
    distance: "",
    orderTime: "",
  });

  const numOfItemsHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setNumOfItems(parseInt(event.target.value) || 0);
  const cartValueHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setCartValue(parseFloat(event.target.value) || 0);
  const distanceHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setDistance(parseInt(event.target.value) || 0);
  const orderTimeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setOrderTime(event.target.value);

  const validateNumOfItems = (value: number) => {
    if (value <= 0) return "Number of items cannot be negative or 0.";
    return "";
  };

  const validateCartValue = (value: number) => {
    if (value <= 0) return "Cart value cannot be negative or 0.";
    return "";
  };

  const validateDistance = (value: number) => {
    if (value <= 0) return "Distance cannot be negative or 0.";
    return "";
  };

  const validateOrderTime = (value: string) => {
    if (!value) return "Order time is required.";
    return "";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      numOfItems: validateNumOfItems(numOfItems),
      cartValue: validateCartValue(cartValue),
      distance: validateDistance(distance),
      orderTime: validateOrderTime(orderTime),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    const calculatedFee = calculateTotalDeliveryFee({
      numOfItems,
      cartValue,
      deliveryDistance: distance,
      orderTime: new Date(orderTime),
    });
    setDeliveryFee(calculatedFee);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.scooterContainer}>
          <img
            src={scooterImage}
            className={styles.scooter}
            alt="Delivery character"
          />
        </div>
        <form
          className={styles.deliveryForm}
          onSubmit={handleSubmit}
          data-testid="deliveryFeeCalculator"
        >
          <InputField
            type="number"
            id="numOfItems"
            name="numOfItems"
            label="Number of Items"
            value={numOfItems}
            onChange={numOfItemsHandler}
            error={errors.numOfItems}
            hasError={!!errors.numOfItems}
            testId="numberOfItems"
          ></InputField>
          <InputField
            type="number"
            id="cartValue"
            name="cartValue"
            label="Cart Value"
            value={cartValue}
            symbol="€"
            onChange={cartValueHandler}
            error={errors.cartValue}
            hasError={!!errors.cartValue}
            testId="cartValue"
          ></InputField>
          <InputField
            type="number"
            id="distance"
            name="distance"
            label="Delivery Distance"
            value={distance}
            symbol="m"
            onChange={distanceHandler}
            error={errors.distance}
            hasError={!!errors.distance}
            testId="deliveryDistance"
          ></InputField>
          <InputField
            type="datetime-local"
            id="orderTime"
            name="orderTime"
            label="Order Time"
            value={orderTime}
            onChange={orderTimeHandler}
            error={errors.orderTime}
            hasError={!!errors.orderTime}
            testId="orderTime"
          ></InputField>
          <SubmitBtn
            cta="Calculate Delivery Fee"
            testId="calculateDeliveryFeeBtn"
          />
          <DisplayFee fee={deliveryFee.toFixed(2)} testId="fee" />
        </form>
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;

import styles from "./DisplayFee.module.css";

type props = {
  fee: string;
  testId: string;
};

const DisplayFee: React.FC<props> = ({ fee, testId }) => {
  return (
    <div className={styles["result-container"]} data-testid={testId}>
      <div className={styles.result} key={fee}>
        {fee}€
      </div>
    </div>
  );
};

export default DisplayFee;

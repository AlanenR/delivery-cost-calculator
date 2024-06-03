import styles from "./SubmitBtn.module.css";

type props = {
  cta: string;
  testId: string;
};

const SubmitBtn: React.FC<props> = ({ cta, testId }) => {
  return (
    <div>
      <button className={styles.submitBtn} type="submit" data-testid={testId}>
        {cta}
      </button>
    </div>
  );
};

export default SubmitBtn;

import styles from "./InputField.module.css";

type props = {
  type: string;
  id: string;
  name: string;
  label: string;
  value: number | string;
  symbol?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  hasError?: boolean;
  testId: string;
};

const InputField: React.FC<props> = ({
  label,
  type,
  id,
  name,
  value,
  symbol,
  onChange,
  error,
  hasError = false,
  testId,
}) => {
  return (
    <div
      className={`${styles["form-group"]} ${hasError ? styles["error"] : ""}`}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles["input-wrapper"]}>
        {symbol && <span className={styles.symbol}>{symbol}</span>}
        <input
          className={hasError ? styles["input-error"] : ""}
          type={type}
          id={id}
          name={name}
          value={value.toString()}
          onChange={onChange}
          aria-describedby={hasError ? `${id}-error` : undefined}
          data-testid={testId}
        />
      </div>
      {hasError && (
        <div id={`${id}-error`} className={styles["error-msg"]}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;

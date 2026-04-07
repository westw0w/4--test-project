import CustomIcon from "@/shared/ui/CustomIcon";
import styles from "./Tariffs.module.scss";
import type { AgreementProps } from "./types";

/**
 * Компонент соглашения с условиями
 */
const Agreement = ({ agreed, onAgreementChange }: AgreementProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAgreementChange(e.target.checked);
  };

  return (
    <div className={styles.agreement}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id="agreement"
          checked={agreed}
          onChange={handleCheckboxChange}
          className={`${styles.checkbox}`}
        />
        <CustomIcon
          id="check"
          width={20}
          height={14}
          className={styles.check}
        />
      </div>
      <label htmlFor="agreement" className={styles.agreementLabel}>
        <p className={styles.agreementText}>
          Я согласен с&nbsp;
          <a href="#" onClick={(e) => e.preventDefault()}>
            офертой рекуррентных платежей
          </a>
          &nbsp;и&nbsp;
          <a href="#" onClick={(e) => e.preventDefault()}>
            Политикой конфиденциальности
          </a>
        </p>
      </label>
    </div>
  );
};

export default Agreement;
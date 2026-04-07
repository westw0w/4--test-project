import { useDispatch } from "react-redux";
import { setSelectedTariffId } from "@/app/store/tariffsSlice";
import { calculateDiscountPercentage } from "@/shared/lib/utils/tariffUtils";
import styles from "./Tariffs.module.scss";
import type { TariffCardProps } from "./types";

/**
 * Компонент карточки тарифа
 */
const TariffCard = ({
  tariff,
  isSelected,
  isTimerEnded,
  onSelect,
}: TariffCardProps) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(tariff.id);
    } else {
      dispatch(setSelectedTariffId(tariff.id));
    }
  };

  const discountPercentage = calculateDiscountPercentage(
    tariff.full_price,
    tariff.price
  );

  const currentPrice = isTimerEnded ? tariff.full_price : tariff.price;
  const showDiscount = discountPercentage > 0 && !isTimerEnded;

  return (
    <label
      className={`${styles.tariffCard} ${tariff.is_best && styles.best} ${isSelected ? styles.selected : ""
        }`}
    >
      <input
        type="radio"
        name="choice"
        value={tariff.id}
        checked={isSelected}
        onChange={handleSelect}
        className="visually-hidden"
      />

      {tariff.is_best && (
        <div className={styles.bestBadge}>
          <span>хит!</span>
        </div>
      )}

      <div className={`${styles.tariffContent} ${tariff.is_best && styles.best}`}>
        <div className={styles.tariffInfo}>
          <h3 className={styles.period}>{tariff.period}</h3>
          <div className={styles.tariffPrice}>
            <span
              className={`${styles.price} ${isSelected ? styles.selected : ""
                } ${isTimerEnded ? styles.updating : ""}`}
            >
              {currentPrice} ₽
            </span>
            <span className={`${styles.fullPrice} ${isTimerEnded ? styles.hiding : ""}`}>
              {tariff.full_price}
            </span>
          </div>
        </div>
        <p className={styles.tariffText}>{tariff.text}</p>
      </div>

      {showDiscount && (
        <div className={`${styles.discount} ${isTimerEnded ? styles.hiding : ""}`}>
          <span>-{discountPercentage}%</span>
        </div>
      )}
    </label>
  );
};

export default TariffCard;
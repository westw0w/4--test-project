import styles from "./Tariffs.module.scss";

/**
 * Компонент гарантии возврата
 */
const Guarantee = () => {
  return (
    <div className={styles.guarantee}>
      <p className={styles.guaranteeTitle}>гарантия возврата 30 дней</p>
      <p className={styles.guaranteeText}>
        Мы уверены, что наш план сработает для тебя и ты увидишь видимые
        результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
        деньги в течение 30 дней с момента покупки, если ты не получишь
        видимых результатов.
      </p>
    </div>
  );
};

export default Guarantee;
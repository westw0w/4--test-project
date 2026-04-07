import { useState } from "react";
import manImage from "@/shared/assets/images/man.png";
import { useTariffs } from "@/features/tariffs/useTariffs";
import { useTimer } from "@/features/timer/useTimer";
import { TariffCard, Agreement, Guarantee } from "./index";
import CustomIcon from "@/shared/ui/CustomIcon";
import styles from "./Tariffs.module.scss";

const Tariffs = () => {
  const [agreed, setAgreed] = useState(false);
  const { isTimerEnded } = useTimer();

  const {
    sortedTariffs,
    loading,
    error,
    selectedTariffId,
    handleSelectTariff,
    handleBuy,
    hasTariffs,
  } = useTariffs();

  const handleBuyClick = () => {
    const success = handleBuy(agreed);
    if (success) {
      // Дополнительные действия после успешной покупки
    }
  };

  return (
    <section className={styles.tariffs}>
      <div className="container">
        <h1 className={styles.title}>
          Выбери подходящий для себя
          <span className={`${styles.title} ${styles.titleLight}`}> тариф</span>
        </h1>

        <div className={styles.layout}>
          <div className={styles.imageCard}>
            <img
              src={manImage}
              alt="Фитнес тренировка"
              height={767}
              width={380}
              className={styles.image}
            />
          </div>

          <div className={styles.tariffsSection}>
            {loading && (
              <div className={styles.loading}>Загрузка тарифов...</div>
            )}

            {error && (
              <div className={styles.error}>{error}</div>
            )}

            <form>
              <div className={styles.tariffsGrid}>
                {hasTariffs && sortedTariffs.map((tariff) => (
                  <TariffCard
                    key={tariff.id}
                    tariff={tariff}
                    isSelected={selectedTariffId === tariff.id}
                    isTimerEnded={isTimerEnded}
                    onSelect={handleSelectTariff}
                  />
                ))}
              </div>

              <div className={styles.chit}>
                <CustomIcon id="alert-icon" width={44} height={26} />
                <p className={styles.chitText}>
                  Следуя плану на 3 месяца и более, люди получают в 2 раза
                  лучший результат, чем за 1 месяц
                </p>
              </div>

              <Agreement
                agreed={agreed}
                onAgreementChange={setAgreed}
              />

              <button
                onClick={handleBuyClick}
                disabled={!agreed || !selectedTariffId}
                className={`${styles.buyButton} ${agreed && selectedTariffId ? styles.active : styles.disabled
                  }`}
              >
                Купить
              </button>

              <p className={styles.footerNote}>
                Нажимая кнопку «Купить», Пользователь соглашается на разовое
                списание денежных средств для получения пожизненного доступа к
                приложению. Пользователь соглашается, что данные кредитной/дебетовой
                карты будут сохранены для осуществления покупок дополнительных
                услуг сервиса в случае желания пользователя.
              </p>
            </form>
          </div>
        </div>

        <Guarantee />
      </div>
    </section>
  );
};

export default Tariffs;
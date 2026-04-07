import styles from "./Header.module.scss";
import { useTimer } from "@/features/timer/useTimer";
import { formatTime } from "@/shared/lib/utils/timerUtils";
import CustomIcon from "@/shared/ui/CustomIcon";

const Header = () => {
  const { timeLeft, isTimerEnded, isWarning, isBlinking } = useTimer();

  const timerClass = `${styles.timerWrapper} ${isWarning ? styles.timerWarning : ""} ${isBlinking ? styles.timerBlink : ""} ${isTimerEnded ? styles.timerZero : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <p className={styles.text}>Успейте открыть пробную неделю</p>
        <div className={timerClass}>
          <CustomIcon id="star-icon" width={12} height={12} />
          <div className={styles.timer}>
            {timeLeft > 0 ? formatTime(timeLeft) : "00:00"}
          </div>
          <CustomIcon id="star-icon" width={12} height={12} />
        </div>
      </div>
    </header>
  );
};

export default Header;
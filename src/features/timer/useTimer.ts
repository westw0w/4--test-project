import { useState, useEffect } from "react";
import { getTimerEndTime, calculateTimeLeft, WARNING_THRESHOLD } from "@/shared/lib/utils/timerUtils";

/**
 * Кастомный хук для управления таймером
 */
export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [blinkToggle, setBlinkToggle] = useState<boolean>(false);
  const [isTimerEnded, setIsTimerEnded] = useState<boolean>(false);

  // Эффект для основного таймера
  useEffect(() => {
    const endTime = getTimerEndTime();
    let interval: number | null = null;

    const updateTimer = () => {
      const remaining = calculateTimeLeft(endTime);
      setTimeLeft(remaining);

      // Проверка на предупреждение (30 секунд или меньше)
      const warning = remaining <= WARNING_THRESHOLD && remaining > 0;
      setIsWarning(warning);

      // Если время истекло, останавливаем интервал и устанавливаем флаг завершения
      if (remaining === 0) {

        setIsTimerEnded(true);
        if (interval !== null) {
          clearInterval(interval);
          interval = null;
        }
      } else {
        // Сбрасываем флаг завершения, если время снова появилось (на случай сброса)
        setIsTimerEnded(false);
      }
    };

    // Первое обновление
    updateTimer();

    // Интервал обновления каждую секунду, только если время не истекло
    if (calculateTimeLeft(endTime) > 0) {
      interval = window.setInterval(updateTimer, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, []);

  // Эффект для мигания с интервалом 500 мс при предупреждении
  useEffect(() => {
    if (!isWarning) {
      return;
    }

    const blinkInterval = window.setInterval(() => {
      setBlinkToggle((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(blinkInterval);
    };
  }, [isWarning]);

  const isBlinking = isWarning && blinkToggle;

  return {
    timeLeft,
    isWarning,
    isBlinking,
    isTimerEnded,
  };
};
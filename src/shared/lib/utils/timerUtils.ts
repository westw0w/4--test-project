export const TIMER_DURATION = 2 * 60; // 2 минуты в секундах
export const WARNING_THRESHOLD = 30; // 30 секунд для предупреждения
export const STORAGE_KEY = "timer_end_time";

/**
 * Получает время окончания таймера из localStorage или создает новое
 * Если время истекло, возвращает истекшее время (таймер останавливается)
 */
export const getTimerEndTime = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const endTime = parseInt(stored, 10);
    // Возвращаем сохраненное время, даже если оно истекло
    return endTime;
  }
  // Если нет в хранилище, создаем новое
  const newEndTime = Date.now() + TIMER_DURATION * 1000;
  localStorage.setItem(STORAGE_KEY, newEndTime.toString());
  return newEndTime;
};

/**
 * Форматирует секунды в строку ММ:СС
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

/**
 * Вычисляет оставшееся время в секундах
 */
export const calculateTimeLeft = (endTime: number): number => {
  const now = Date.now();
  return Math.max(0, Math.floor((endTime - now) / 1000));
};

/**
 * Проверяет, истек ли таймер
 */
export const isTimerExpired = (endTime: number): boolean => {
  return Date.now() >= endTime;
};

/**
 * Сбрасывает таймер, устанавливая новое время окончания
 */
export const resetTimer = (): number => {
  const newEndTime = Date.now() + TIMER_DURATION * 1000;
  localStorage.setItem(STORAGE_KEY, newEndTime.toString());
  return newEndTime;
};

/**
 * Очищает сохраненное время таймера
 */
export const clearTimer = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
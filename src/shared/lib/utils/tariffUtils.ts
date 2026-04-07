import type { Tariff } from "@/app/store/types";


/**
 * Сортирует тарифы по убыванию цены (от самой высокой к самой низкой)
 * @param tariffs Массив тарифов
 * @returns Отсортированный массив тарифов
 */
export const sortTariffsByPriceDesc = (tariffs: Tariff[]): Tariff[] => {
  return [...tariffs].sort((a, b) => b.price - a.price);
};

/**
 * Сортирует тарифы по возрастанию цены (от самой низкой к самой высокой)
 * @param tariffs Массив тарифов
 * @returns Отсортированный массив тарифов
 */
export const sortTariffsByPriceAsc = (tariffs: Tariff[]): Tariff[] => {
  return [...tariffs].sort((a, b) => a.price - b.price);
};

/**
 * Рассчитывает процент скидки на основе полной и текущей цены
 * @param fullPrice Полная цена
 * @param currentPrice Текущая цена (со скидкой)
 * @returns Процент скидки в виде целого числа (например, 25 для 25%)
 */
export const calculateDiscountPercentage = (
  fullPrice: number,
  currentPrice: number
): number => {
  if (fullPrice <= currentPrice || fullPrice <= 0) {
    return 0;
  }
  return Math.round((1 - currentPrice / fullPrice) * 100);
};

/**
 * Форматирует цену с добавлением знака рубля
 * @param price Цена
 * @returns Отформатированная строка с символом рубля
 */
export const formatPrice = (price: number): string => {
  return `${price} ₽`;
};

/**
 * Получает самый дорогой тариф из массива
 * @param tariffs Массив тарифов
 * @returns Самый дорогой тариф или null, если массив пуст
 */
export const getMostExpensiveTariff = (tariffs: Tariff[]): Tariff | null => {
  if (tariffs.length === 0) {
    return null;
  }
  return sortTariffsByPriceDesc(tariffs)[0];
};

/**
 * Получает самый дешевый тариф из массива
 * @param tariffs Массив тарифов
 * @returns Самый дешевый тариф или null, если массив пуст
 */
export const getCheapestTariff = (tariffs: Tariff[]): Tariff | null => {
  if (tariffs.length === 0) {
    return null;
  }
  return sortTariffsByPriceAsc(tariffs)[0];
};

/**
 * Получает рекомендуемый тариф (самый дорогой или помеченный как лучший)
 * @param tariffs Массив тарифов
 * @returns Рекомендуемый тариф или null, если массив пуст
 */
export const getRecommendedTariff = (tariffs: Tariff[]): Tariff | null => {
  if (tariffs.length === 0) {
    return null;
  }

  // Сначала ищем тариф с is_best = true
  const bestTariff = tariffs.find(tariff => tariff.is_best);
  if (bestTariff) {
    return bestTariff;
  }

  // Если нет лучшего, возвращаем самый дорогой
  return getMostExpensiveTariff(tariffs);
};
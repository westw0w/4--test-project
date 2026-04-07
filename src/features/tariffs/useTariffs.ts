import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store/store";
import { fetchTariffs, setSelectedTariffId } from "@/app/store/tariffsSlice";
import { sortTariffsByPriceDesc, getRecommendedTariff } from "@/shared/lib/utils/tariffUtils";

/**
 * Кастомный хук для работы с тарифами
 */
export const useTariffs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tariffs, loading, error, selectedTariffId } = useSelector(
    (state: RootState) => state.tariffs
  );

  // Загрузка тарифов при монтировании компонента
  useEffect(() => {
    dispatch(fetchTariffs());
  }, [dispatch]);

  // Автоматический выбор рекомендуемого тарифа при загрузке
  useEffect(() => {
    if (tariffs.length > 0 && selectedTariffId === null) {
      const recommendedTariff = getRecommendedTariff(tariffs);
      if (recommendedTariff) {
        dispatch(setSelectedTariffId(recommendedTariff.id));
      }
    }
  }, [tariffs, selectedTariffId, dispatch]);

  // Отсортированные тарифы (по убыванию цены)
  const sortedTariffs = useMemo(() => {
    return sortTariffsByPriceDesc(tariffs);
  }, [tariffs]);

  // Выбранный тариф
  const selectedTariff = useMemo(() => {
    return tariffs.find(tariff => tariff.id === selectedTariffId) || null;
  }, [tariffs, selectedTariffId]);

  /**
   * Обработчик выбора тарифа
   */
  const handleSelectTariff = (tariffId: number) => {
    dispatch(setSelectedTariffId(tariffId));
  };

  /**
   * Обработчик покупки тарифа
   */
  const handleBuy = (agreed: boolean): boolean => {
    if (!agreed) {
      alert("Пожалуйста, согласитесь с офертой рекуррентных платежей и Политикой конфиденциальности");
      return false;
    }

    if (!selectedTariffId) {
      alert("Пожалуйста, выберите тариф");
      return false;
    }

    alert("Покупка тарифа оформлена!");
    return true;
  };

  return {
    // Состояние
    tariffs,
    sortedTariffs,
    loading,
    error,
    selectedTariffId,
    selectedTariff,

    // Методы
    handleSelectTariff,
    handleBuy,

    // Утилиты
    hasTariffs: tariffs.length > 0,
    isLoading: loading,
    hasError: error !== null,
  };
};
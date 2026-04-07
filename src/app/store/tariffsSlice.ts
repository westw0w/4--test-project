import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Tariff, TariffsState } from "./types";

// Начальное состояние
const initialState: TariffsState = {
  tariffs: [],
  loading: false,
  error: null,
  selectedTariffId: null,
};

//  Асинхронный thunk для получения тарифов
//  !! Есть ошибка в бэке, 2 тарифа с одинаковым id, так что я просто к id прибавляю индекс. Нужно исправить эту ошибку
//  !! Нет сокращенного текста для мобильного вида
export const fetchTariffs = createAsyncThunk<Tariff[]>(
  "tariffs/fetchTariffs",
  async () => {
    const response = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
    if (!response.ok) {
      throw new Error("Не удалось загрузить тарифы");
    }
    const data = await response.json();
    data.forEach((tariff: Tariff, index: number) => {
      tariff.id = tariff.id + index;
    });
    return Array.isArray(data) ? data : [];
  }
);

const tariffsSlice = createSlice({
  name: "tariffs",
  initialState,
  reducers: {
    setSelectedTariffId: (state, action: PayloadAction<number | null>) => {
      state.selectedTariffId = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTariffs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTariffs.fulfilled, (state, action) => {
        state.loading = false;
        state.tariffs = action.payload;
      })
      .addCase(fetchTariffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка при загрузке тарифов";
      });
  },
});

export const { setSelectedTariffId, clearError } = tariffsSlice.actions;
export default tariffsSlice.reducer;
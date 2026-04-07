export interface Tariff {
  id: number;
  text: string;
  price: number;
  full_price: number;
  period: string;
  is_best: boolean;
}

export interface TariffsState {
  tariffs: Tariff[];
  loading: boolean;
  error: string | null;
  selectedTariffId: number | null;
}
import type { Tariff } from "@/app/store/types";

export interface AgreementProps {
  agreed: boolean;
  onAgreementChange: (agreed: boolean) => void;
}

export interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  isTimerEnded: boolean;
  onSelect?: (tariffId: number) => void;
}
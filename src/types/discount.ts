export type DiscountApplyType =
  | "one-time"
  | "monthly";

export type DiscountValueType =
  | "percentage"
  | "fixed";

export interface Discount {
  id: string;
  name: string;
  applyType: DiscountApplyType;
  valueType: DiscountValueType;
  value: number;
  duration?: number;
  enabled: boolean;
}
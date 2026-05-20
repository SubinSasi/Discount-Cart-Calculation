import { create } from "zustand";

import type { Discount } from "../types/discount";

interface DiscountStore {
  discounts: Discount[];

  addDiscount: (
    discount: Discount
  ) => void;

  updateDiscount: (
    discount: Discount
  ) => void;

  deleteDiscount: (
    id: string
  ) => void;

  toggleDiscount: (
    id: string
  ) => void;
}

export const useDiscountStore =
  create<DiscountStore>((set) => ({
    discounts: [],

    addDiscount: (discount) =>
      set((state) => ({
        discounts: [
          ...state.discounts,
          discount,
        ],
      })),

    updateDiscount: (
      updatedDiscount
    ) =>
      set((state) => ({
        discounts:
          state.discounts.map(
            (discount) =>
              discount.id ===
              updatedDiscount.id
                ? updatedDiscount
                : discount
          ),
      })),

    deleteDiscount: (id) =>
      set((state) => ({
        discounts:
          state.discounts.filter(
            (discount) =>
              discount.id !== id
          ),
      })),

    toggleDiscount: (id) =>
      set((state) => ({
        discounts:
          state.discounts.map(
            (discount) =>
              discount.id === id
                ? {
                    ...discount,
                    enabled:
                      !discount.enabled,
                  }
                : discount
          ),
      })),
  }));
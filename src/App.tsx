import { useState } from "react";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import DiscountModal from "./components/DiscountModal";

import Overview from "./components/Overview";

import Toggle from "./components/Toggle";

import { product } from "./data/product";

import { useDiscountStore } from "./store/discountStore";

import { calculatePrices } from "./utils/calculations";

import type { Discount } from "./types/discount";

export default function App() {
  const [open, setOpen] =
    useState(false);

  const [
    editingDiscount,
    setEditingDiscount,
  ] =
    useState<Discount | null>(
      null
    );

  const {
    discounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscount,
  } = useDiscountStore();

  const prices =
    calculatePrices(
      product.oneTimePrice,
      product.monthlyPrice,
      discounts
    );

  function handleSave(
    discount: Discount
  ) {
    if (editingDiscount) {
      updateDiscount(discount);
    } else {
      addDiscount(discount);
    }
  }

  return (
    <div className="bg-[#edf3f7] min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto flex gap-4 items-start">
        {/* LEFT */}
        <div className="flex-1 bg-white border border-[#e5e5e5]">
          {/* HEADER */}
          <div className="bg-cyan-500 text-white text-[14px] px-5 py-3">
            Discounts
          </div>

          {/* DISCOUNT LIST */}
          <div>
            {discounts.map(
              (discount) => (
                <div
                  key={discount.id}
                  className="flex items-center justify-between px-8 py-8 border-b border-[#efefef]"
                >
                  <div className="flex-1">
                    <h3 className="text-[14px] text-[#333]">
                      {
                        discount.name
                      }
                    </h3>

                    <p className="text-[13px] text-[#666] mt-1">
                      {discount.valueType ===
                      "fixed"
                        ? `€ ${discount.value}`
                        : `${discount.value} %`}

                      {" "}

                      {
                        discount.applyType
                      }

                      {discount.duration
                        ? ` first ${discount.duration} months`
                        : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => {
                        setEditingDiscount(
                          discount
                        );

                        setOpen(
                          true
                        );
                      }}
                    >
                      <Pencil
                        size={16}
                        className="text-cyan-300"
                      />
                    </button>

                    <button
                      onClick={() =>
                        deleteDiscount(
                          discount.id
                        )
                      }
                    >
                      <Trash2
                        size={16}
                        className="text-cyan-300"
                      />
                    </button>

                    <Toggle
                      checked={
                        discount.enabled
                      }
                      onChange={() =>
                        toggleDiscount(
                          discount.id
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>

          {/* MANUAL DISCOUNT */}
          <div className="px-8 py-6 flex justify-end">
            <button
              onClick={() => {
                setEditingDiscount(
                  null
                );

                setOpen(true);
              }}
              className="text-cyan-500 text-[14px]"
            >
              + Add manual discount
            </button>
          </div>

          {/* FOOTER */}
          <div className="bg-[#dcdcdc] h-[120px] px-8 py-4 text-[13px] text-[#777] space-y-4">
            <div>
              Klantgegevens
            </div>

            <div>
              Productgegevens
            </div>

            <div>
              Checkout
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <Overview
          oneTime={
            prices.oneTimeFinal
          }
          monthly={
            prices.monthlyFirstPeriod
          }
          remaining={
            prices.monthlyRemaining
          }
          discounts={discounts}
        />
      </div>

      {open && (
        <DiscountModal
          editingDiscount={
            editingDiscount
          }
          onClose={() =>
            setOpen(false)
          }
          onSave={handleSave}
        />
      )}
    </div>
  );
}
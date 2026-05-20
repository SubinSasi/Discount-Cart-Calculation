import { product } from "../data/product";

import type { Discount } from "../types/discount";

interface Props {
  oneTime: number;

  monthly: number;

  remaining: number;

  discounts: Discount[];
}

export default function Overview({
  oneTime,
  monthly,
  remaining,
  discounts,
}: Props) {
  const monthlyDiscounts =
    discounts.filter(
      (d) =>
        d.enabled &&
        d.applyType === "monthly"
    );

  const oneTimeDiscounts =
    discounts.filter(
      (d) =>
        d.enabled &&
        d.applyType === "one-time"
    );

  return (
    <div className="w-[360px] bg-white border border-[#e5e5e5]">
      {/* TOP */}
      <div className="p-6">
        <img
          src={product.image}
          className="w-14 h-14 object-cover mx-auto mb-5"
        />

        <h2 className="text-[30px] font-light mb-5">
          Overview
        </h2>

        <div className="space-y-2 text-[13px] text-[#444]">
          <div className="flex justify-between">
            <span>
              {
                product.name
              }
            </span>

            <span>
              € 1.000,00
            </span>
          </div>

          <div className="flex justify-between italic">
            <span>
              Maandelijkse prijs
            </span>

            <span>
              € 10,00
            </span>
          </div>

          <button className="text-cyan-500 text-[13px] mt-2">
            Edit
          </button>
        </div>
      </div>

      {/* MONTHLY SECTION */}
      <div className="bg-[#eef7fb] px-6 py-5 border-y border-[#e5e5e5]">
        {/* ACTIVE MONTHLY DISCOUNTS */}
        {monthlyDiscounts.length >
          0 && (
          <div className="mb-5 space-y-3">
            {monthlyDiscounts.map(
              (discount) => (
                <div
                  key={
                    discount.id
                  }
                  className="flex justify-between text-[13px]"
                >
                  <div>
                    <div className="italic text-[#666]">
                      {
                        discount.name
                      }
                    </div>

                    {discount.duration && (
                      <div className="text-[#888] text-[12px]">
                        First{" "}
                        {
                          discount.duration
                        }{" "}
                        months
                      </div>
                    )}
                  </div>

                  <div className="italic text-[#666]">
                    -{" "}
                    {
                      discount.value
                    }

                    {discount.valueType ===
                    "percentage"
                      ? "%"
                      : "€"}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* FIRST PERIOD */}
        <div className="flex justify-between text-[13px] font-semibold mb-3">
          <span>
            First period monthly
          </span>

          <span>
            €
            {monthly.toFixed(
              2
            )}
          </span>
        </div>

        {/* REMAINING */}
        <div className="flex justify-between text-[13px] font-semibold">
          <span>
            Eventually per month excl. btw
          </span>

          <span>
            €
            {remaining.toFixed(
              2
            )}
          </span>
        </div>
      </div>

      {/* ONE TIME */}
      <div className="px-6 py-6">
        <div className="flex justify-between text-[13px] mb-3">
          <span>
            Subtotal onetime costs excl. btw
          </span>

          <span>
            € 1.000,00
          </span>
        </div>

        {oneTimeDiscounts.map(
          (discount) => (
            <div
              key={
                discount.id
              }
              className="flex justify-between text-[13px] italic text-[#666] mb-2"
            >
              <span>
                {
                  discount.name
                }
              </span>

              <span>
                -{" "}
                {
                  discount.value
                }

                {discount.valueType ===
                "percentage"
                  ? "%"
                  : "€"}
              </span>
            </div>
          )
        )}

        <div className="flex justify-between text-[14px] font-semibold mt-4">
          <span>
            One time costs excl. btw
          </span>

          <span>
            €
            {oneTime.toFixed(
              2
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
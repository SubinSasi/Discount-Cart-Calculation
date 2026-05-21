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
  const monthlyDiscounts = discounts.filter(
    (d) => d.enabled && d.applyType === "monthly",
  );
  const oneTimeDiscounts = discounts.filter(
    (d) => d.enabled && d.applyType === "one-time",
  );

  return (
    <div className="w-[360px] bg-white border border-[#e5e5e5]">
      <div className="p-6">
        <img src={product.image} className="w-12 object-cover mx-auto mb-5" />
        <h2 className="text-[24px] text-[#8A8A8A] font-medium mb-5">
          Overview
        </h2>
        <div className="space-y-2 text-[14px] text-[#444]">
          <div className="flex justify-between">
            <span>{product.name}</span>
            <span>€ 1.000,00</span>
          </div>
          <div className="flex justify-between italic">
            <span>Maandelijkse prijs</span>
            <span>€ 10,00</span>
          </div>
          <button className="text-cyan-500 text-[14px] mt-2">Edit</button>
        </div>
      </div>
      <div className="bg-[#eef7fb] px-6 py-5 border-y border-[#e5e5e5]">
        {monthlyDiscounts.length > 0 && (
          <div className="mb-5 space-y-3">
            {monthlyDiscounts.map((discount) => (
              <div
                key={discount.id}
                className="flex justify-between text-[14px]"
              >
                <div>
                  <div className="italic text-[#4b4646]">{discount.name}</div>
                  {discount.duration && (
                    <div className="text-[#4b4646] text-[14px]">
                      First {discount.duration} months
                    </div>
                  )}
                </div>
                <div className="mt-2 italic text-[#4b4646]">
                  - {discount.value}
                  {discount.valueType === "percentage" ? "%" : "€"}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between text-[14px] font-semibold mb-3">
          <span>First period monthly</span>
          <span>€{monthly.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[14px] font-semibold">
          <span>Eventually per month excl. btw</span>
          <span>€{remaining.toFixed(2)}</span>
        </div>
      </div>
      <div className="px-6 py-6">
        <div className="flex justify-between text-[14px] mb-3">
          <span>Subtotal onetime costs excl. btw</span>

          <span>€ 1.000,00</span>
        </div>
        {oneTimeDiscounts.map((discount) => (
          <div
            key={discount.id}
            className="flex justify-between text-[14px] italic text-[#4b4646] mb-2"
          >
            <span>{discount.name}</span>
            <span>
              - {discount.value}
              {discount.valueType === "percentage" ? "%" : "€"}
            </span>
          </div>
        ))}
        <div className="flex justify-between text-[14px] font-semibold mt-4">
          <span>One time costs excl. btw</span>
          <span>€{oneTime.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

import type { Discount } from "../types/discount";

function getDiscountAmount(
  price: number,
  discount: Discount
) {
  if (discount.valueType === "percentage") {
    return (
      (price * discount.value) /
      100
    );
  }
  return discount.value;
}

export function calculatePrices(
  oneTimePrice: number,
  monthlyPrice: number,
  discounts: Discount[]
) {
  const activeDiscounts =
    discounts.filter(
      (d) => d.enabled
    );
  let oneTimeFinal =
    oneTimePrice;
  let monthlyFirstPeriod =
    monthlyPrice;
  let monthlyRemaining =
    monthlyPrice;
  activeDiscounts.forEach(
    (discount) => {
      if (
        discount.applyType ===
        "one-time"
      ) {
        const amount =
          getDiscountAmount(
            oneTimePrice,
            discount
          );
        oneTimeFinal -= amount;
      }
      if (
        discount.applyType ===
        "monthly"
      ) {
        const amount =
          getDiscountAmount(
            monthlyPrice,
            discount
          );
        if (
          discount.duration &&
          discount.duration > 0
        ) {
          monthlyFirstPeriod -=
            amount;
        } else {
          monthlyFirstPeriod -=
            amount;
          monthlyRemaining -=
            amount;
        }
      }
    }
  );
  return {
    oneTimeFinal:
      Math.max(
        oneTimeFinal,
        0
      ),
    monthlyFirstPeriod:
      Math.max(
        monthlyFirstPeriod,
        0
      ),
    monthlyRemaining:
      Math.max(
        monthlyRemaining,
        0
      ),
  };
}
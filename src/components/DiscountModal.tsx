import { useState } from "react";

import type { Discount } from "../types/discount";

import { product } from "../data/product";

interface Props {
  onClose: () => void;

  onSave: (
    discount: Discount
  ) => void;

  editingDiscount?: Discount | null;
}

export default function DiscountModal({
  onClose,
  onSave,
  editingDiscount,
}: Props) {
  const [name, setName] =
    useState(
      editingDiscount?.name || ""
    );

  const [
    applyType,
    setApplyType,
  ] = useState<
    "one-time" | "monthly"
  >(
    editingDiscount
      ?.applyType || "monthly"
  );

  const [
    valueType,
    setValueType,
  ] = useState<
    "percentage" | "fixed"
  >(
    editingDiscount
      ?.valueType ||
      "percentage"
  );

  const [value, setValue] =
    useState(
      editingDiscount?.value || 0
    );

  const [
    duration,
    setDuration,
  ] = useState(
    editingDiscount?.duration ||
      3
  );

  const [error, setError] =
    useState("");

  function validate() {
    setError("");

    // NAME
    if (!name.trim()) {
      setError(
        "Discount name required"
      );

      return false;
    }

    // VALUE
    if (value <= 0) {
      setError(
        "Discount must be greater than 0"
      );

      return false;
    }

    // PERCENTAGE
    if (
      valueType ===
        "percentage" &&
      value > 100
    ) {
      setError(
        "Percentage cannot exceed 100%"
      );

      return false;
    }

    // MONTHLY FIXED
    if (
      applyType ===
        "monthly" &&
      valueType === "fixed" &&
      value >
        product.monthlyPrice
    ) {
      setError(
        `Monthly discount cannot exceed €${product.monthlyPrice}`
      );

      return false;
    }

    // ONE TIME FIXED
    if (
      applyType ===
        "one-time" &&
      valueType === "fixed" &&
      value >
        product.oneTimePrice
    ) {
      setError(
        `Discount cannot exceed €${product.oneTimePrice}`
      );

      return false;
    }

    // DURATION
    if (
      applyType ===
        "monthly" &&
      duration < 1
    ) {
      setError(
        "Duration must be at least 1 month"
      );

      return false;
    }

    if (
      applyType ===
        "monthly" &&
      duration > 12
    ) {
      setError(
        "Duration cannot exceed 12 months"
      );

      return false;
    }

    return true;
  }

  function handleSave() {
    if (!validate()) return;

    onSave({
      id:
        editingDiscount?.id ||
        crypto.randomUUID(),

      name,

      applyType,

      valueType,

      value,

      duration:
        applyType ===
        "monthly"
          ? duration
          : undefined,

      enabled:
        editingDiscount?.enabled ??
        true,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[750px] p-10">
        <h2 className="text-4xl mb-10">
          {editingDiscount
            ? "Edit discount"
            : "Add discount"}
        </h2>

        <p className="mb-3">
          Apply discount to
        </p>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() =>
              setApplyType(
                "one-time"
              )
            }
            className={`px-8 py-5 ${
              applyType ===
              "one-time"
                ? "bg-cyan-400 text-white"
                : "bg-gray-100"
            }`}
          >
            One time price
          </button>

          <button
            onClick={() =>
              setApplyType(
                "monthly"
              )
            }
            className={`px-8 py-5 ${
              applyType ===
              "monthly"
                ? "bg-cyan-400 text-white"
                : "bg-gray-100"
            }`}
          >
            Monthly price
          </button>
        </div>

        <input
          placeholder="Discount name"
          className="w-full border p-4 mb-6"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <div className="flex mb-6">
          <select
            className="border p-4"
            value={valueType}
            onChange={(e) =>
              setValueType(
                e.target.value as
                  | "percentage"
                  | "fixed"
              )
            }
          >
            <option value="percentage">
              %
            </option>

            <option value="fixed">
              €
            </option>
          </select>

          <input
            type="number"
            placeholder="Discount value"
            className="flex-1 border p-4"
            value={value}
            onChange={(e) =>
              setValue(
                Number(
                  e.target.value
                )
              )
            }
          />
        </div>

        {applyType ===
          "monthly" && (
          <input
            type="number"
            placeholder="Duration months"
            className="w-full border p-4 mb-6"
            value={duration}
            onChange={(e) =>
              setDuration(
                Number(
                  e.target.value
                )
              )
            }
          />
        )}

        {error && (
          <div className="text-red-500 mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-cyan-400 text-white px-8 py-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
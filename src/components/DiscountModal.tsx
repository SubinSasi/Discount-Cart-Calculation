import { useState } from "react";
import type { Discount } from "../types/discount";
import { product } from "../data/product";
import { ChevronDown } from "lucide-react";

interface Props {
  onClose: () => void;
  onSave: (discount: Discount) => void;
  editingDiscount?: Discount | null;
}

export default function DiscountModal({
  onClose,
  onSave,
  editingDiscount,
}: Props) {
  const [name, setName] = useState(editingDiscount?.name || "");
  const [applyType, setApplyType] = useState<"one-time" | "monthly">(
    editingDiscount?.applyType || "monthly",
  );
  const [valueType, setValueType] = useState<"percentage" | "fixed">(
    editingDiscount?.valueType || "percentage",
  );
  const [value, setValue] = useState(editingDiscount?.value || 0);
  const [duration, setDuration] = useState(editingDiscount?.duration || 0);
  const [error, setError] = useState("");
  function validate() {
    setError("");

    if (!name.trim()) {
      setError("Discount name required");

      return false;
    }

    if (value <= 0) {
      setError("Discount must be greater than 0");
      return false;
    }

    if (valueType === "percentage" && value > 100) {
      setError("Percentage cannot exceed 100%");
      return false;
    }

    if (
      applyType === "monthly" &&
      valueType === "fixed" &&
      value > product.monthlyPrice
    ) {
      setError(`Monthly discount cannot exceed €${product.monthlyPrice}`);
      return false;
    }

    if (
      applyType === "one-time" &&
      valueType === "fixed" &&
      value > product.oneTimePrice
    ) {
      setError(`Discount cannot exceed €${product.oneTimePrice}`);
      return false;
    }

    if (applyType === "monthly" && duration < 1) {
      setError("Duration must be at least 1 month");
      return false;
    }

    if (applyType === "monthly" && duration > 12) {
      setError("Duration cannot exceed 12 months");
      return false;
    }

    return true;
  }

  function handleSave() {
    if (!validate()) return;
    onSave({
      id: editingDiscount?.id || crypto.randomUUID(),
      name,
      applyType,
      valueType,
      value,
      duration: applyType === "monthly" ? duration : undefined,
      enabled: editingDiscount?.enabled ?? true,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-[750px] p-8 rounded-sm">
        <h2 className="text-[22px] font-semibold text-[#333] mb-8">
          {editingDiscount ? "Edit manual discount" : "Add manual discount"}
        </h2>
        <p className="text-[15px] text-[#444] mb-3">
          For which price do you calculate the discount?
        </p>
        <div className="flex gap-3 mb-7">
          <button
            onClick={() => setApplyType("one-time")}
            className={`w-[190px] h-[72px] rounded-[12px] px-5 flex items-center justify-between transition-all ${
              applyType === "one-time"
                ? "bg-[#2fb6cf] text-white"
                : "bg-[#efefef] text-[#7a7a7a]"
            }`}
          >
            <span className="text-[16px] font-semibold">One time price</span>
            <div
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                applyType === "one-time"
                  ? "border-white bg-white"
                  : "border-[#d8d8d8]"
              }`}
            >
              {applyType === "one-time" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#2fb6cf"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>
          <button
            onClick={() => setApplyType("monthly")}
            className={`w-[190px] h-[72px] rounded-[12px] px-5 flex items-center justify-between transition-all ${
              applyType === "monthly"
                ? "bg-[#2fb6cf] text-white"
                : "bg-[#efefef] text-[#7a7a7a]"
            }`}
          >
            <span className="text-[16px] font-semibold">Monthly price</span>
            <div
              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                applyType === "monthly"
                  ? "border-white bg-white"
                  : "border-[#d8d8d8]"
              }`}
            >
              {applyType === "monthly" && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#2fb6cf"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-[15px] text-[#333] mb-2">Discount</label>
          <div className="flex h-[48px] border border-[#cfcfcf] overflow-hidden">
            <div className="relative">
              <select
                className="w-[72px] border-r border-[#cfcfcf] px-4 text-[18px] bg-[#f7f7f7] outline-none appearance-none h-[48px]"
                value={valueType}
                onChange={(e) =>
                  setValueType(e.target.value as "percentage" | "fixed")
                }
              >
                <option value="percentage">%</option>
                <option value="fixed">€</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#777] text-[12px]">
                <ChevronDown size={20} />
              </div>
            </div>
            <input
              type="number"
              className="flex-1 px-4 text-[16px] outline-none"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
        </div>
        {applyType === "monthly" && (
          <div className="mb-6">
            <label className="block text-[15px] text-[#333] mb-2">
              Duration
            </label>

            <input
              type="number"
              placeholder="Number of months"
              className="w-full h-[48px] border border-[#cfcfcf] px-4 text-[16px] outline-none placeholder:text-[#b9b9b9]"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-[15px] text-[#333] mb-2">
            Description
          </label>
          <input
            className="w-full h-[48px] border border-[#cfcfcf] px-4 text-[16px] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={onClose}
            className="text-[#1eb5d6] text-[16px] font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#2fb6cf] hover:bg-[#27a7be] text-white h-[48px] px-6 text-[17px] font-medium transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

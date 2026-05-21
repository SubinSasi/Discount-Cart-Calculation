import { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import DiscountModal from "./components/DiscountModal";
import Overview from "./components/Overview";
import Toggle from "./components/Toggle";
import { product } from "./data/product";
import { useDiscountStore } from "./store/discountStore";
import { calculatePrices } from "./utils/calculations";
import type { Discount } from "./types/discount";

export default function App() {
  const [open, setOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const {
    discounts,
    addDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscount,
  } = useDiscountStore();
  const prices = calculatePrices(
    product.oneTimePrice,
    product.monthlyPrice,
    discounts,
  );
  function handleSave(discount: Discount) {
    if (editingDiscount) {
      updateDiscount(discount);
    } else {
      addDiscount(discount);
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(discounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiscounts = discounts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="bg-[#edf3f7] min-h-screen p-8">
      <div className="max-w-[1400px] mx-auto flex gap-4 items-start">
        <div className="flex-1 bg-white border border-[#e5e5e5]">
          <div className="bg-cyan-500 text-white text-[16px] px-5 py-3">
            Discounts
          </div>
          <div>
            {paginatedDiscounts.map((discount) => (
              <div
                key={discount.id}
                className="grid grid-cols-[1.2fr_1fr_120px_90px] items-center px-8 py-6 border-b border-[#efefef]"
              >
                <div>
                  <h3 className="text-[15px] text-[#333]">{discount.name}</h3>
                </div>
                <div>
                  <p className="text-[15px] text-[#555]">
                    {discount.valueType === "fixed"
                      ? `- € ${discount.value}`
                      : `- ${discount.value} %`}{" "}
                    {discount.applyType}
                    {discount.duration
                      ? ` first ${discount.duration} months`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setEditingDiscount(discount);
                      setOpen(true);
                    }}
                  >
                    <Pencil size={18} className="text-cyan-400" />
                  </button>
                  <button onClick={() => setDeleteId(discount.id)}>
                    <Trash size={18} className="text-cyan-400" />
                  </button>
                </div>
                <div className="flex justify-end">
                  <Toggle
                    checked={discount.enabled}
                    onChange={() => toggleDiscount(discount.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-8 py-6 flex justify-end border-b border-[#efefef]">
            <button
              onClick={() => {
                setEditingDiscount(null);
                setOpen(true);
              }}
              className="text-cyan-500 text-[16px] flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add manual discount</span>
            </button>
          </div>
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#efefef]">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`text-[16px] ${
                currentPage === 1 ? "text-[#9fddea]" : "text-cyan-500"
              }`}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`h-[44px] px-6 text-[16px] text-white ${
                currentPage === totalPages ? "bg-[#9fddea]" : "bg-cyan-500"
              }`}
            >
              Next
            </button>
          </div>
          <div className="bg-[#dcdcdc] h-[120px] px-8 py-4 text-[14px] text-[#777] space-y-4">
            <div>Klantgegevens</div>
            <div>Productgegevens</div>
            <div>Checkout</div>
          </div>
        </div>
        <Overview
          oneTime={prices.oneTimeFinal}
          monthly={prices.monthlyFirstPeriod}
          remaining={prices.monthlyRemaining}
          discounts={discounts}
        />
      </div>
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-[550px] rounded-sm shadow-lg">
            <div className="flex items-center justify-between px-5 py-4">
              <h3 className="text-[20px] font-semibold text-[#808080]">
                Delete discount
              </h3>
              <button
                onClick={() => setDeleteId(null)}
                className="text-[#999] text-[26px] leading-none"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-6">
              <p className="text-[16px] text-[#5c5656] leading-6">
                Are you sure you want to delete this discount?
              </p>
            </div>
            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#efefef]">
              <button
                onClick={() => {
                  deleteDiscount(deleteId);

                  setDeleteId(null);
                }}
                className="bg-[#CC4B37] text-white px-5 py-2 text-[16px]"
              >
                Delete discount
              </button>
            </div>
          </div>
        </div>
      )}
      {open && (
        <DiscountModal
          editingDiscount={editingDiscount}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

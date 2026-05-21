interface Props {
  checked: boolean;
  onChange: () => void;
}

export default function Toggle({ checked, onChange }: Props) {
  return (
    <button
      onClick={onChange}
      className={`w-14 h-7 flex items-center px-1 transition ${
        checked ? "bg-cyan-400" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-5 h-5 transition ${
          checked ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}

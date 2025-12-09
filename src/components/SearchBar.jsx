import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  const debounced = useDebounce(query, 400);

  return (
  <div className="flex flex-col md:flex-row md:items-center gap-3 bg-[#14532d] p-4 rounded-lg border border-[#16a34a]">
      <input
        className="flex-1 border border-[#16a34a] px-3 py-2 rounded bg-[#14532d] text-[#dcfce7]"
  placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex gap-2">
        {[
          { value: "all", label: "Todo" },
          { value: "pending", label: "Pendiente" },
          { value: "completed", label: "Completado" }
        ].map((f) => {
          return (
            <button
              key={f.value}
              className={`px-3 py-2 rounded border border-[#16a34a] font-bold shadow-md ${filter === f.value ? "bg-[#16a34a] text-white" : "bg-[#14532d] text-[#dcfce7]"}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

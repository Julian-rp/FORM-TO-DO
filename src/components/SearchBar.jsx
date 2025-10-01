import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ query, setQuery, filter, setFilter }) {
  const debounced = useDebounce(query, 400);

  return (
  <div className="flex flex-col md:flex-row md:items-center gap-3 bg-[#23272f] p-4 rounded-lg border border-[#2c5282]">
      <input
        className="flex-1 border border-[#2c5282] px-3 py-2 rounded bg-[#23272f] text-[#e2e8f0]"
  placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex gap-2">
        {["Todo", "Pendiente", "Completado"].map((f) => {
          const labels = { Todo: "Todo", Pendiente: "Pendiente", Completado: "Completado" };
          return (
            <button
              key={f}
              className={`px-3 py-2 rounded border border-[#2c5282] font-bold shadow-md ${filter === f ? "bg-[#2c5282] text-white" : "bg-[#23272f] text-[#e2e8f0]"}`}
              onClick={() => setFilter(f)}
            >
              {labels[f]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

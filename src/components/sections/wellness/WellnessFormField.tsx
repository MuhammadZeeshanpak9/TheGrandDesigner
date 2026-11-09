// Ported from NTWGC's src/components/ui/FormField.tsx — the dark
// glass-card input style used inside OfferingBlock's gold pricing panel.
// No backend coupling here (presentation only); values are lifted by the parent.

type WellnessFormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "number" | "password" | "textarea" | "select";
  options?: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  tone?: "light" | "dark";
  className?: string;
};

export function WellnessFormField({
  label,
  name,
  type = "text",
  options,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 5,
  tone = "dark",
  className = "",
}: WellnessFormFieldProps) {
  const base =
    "w-full rounded-xl px-4 py-3 font-sans text-[14px] outline-none transition-all duration-300";
  const toneClass =
    tone === "dark"
      ? "wellness-glass-card-dark text-paper placeholder:text-paper/35 wellness-input-glow-focus"
      : "wellness-glass-card-light text-ink placeholder:text-ink/40 wellness-input-glow-focus";

  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span
        className={`font-sans text-[11px] font-semibold uppercase tracking-[0.2em] ${
          tone === "dark" ? "text-paper/70" : "text-ink/70"
        }`}
      >
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${base} ${toneClass} resize-none`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`${base} ${toneClass}`}
        >
          <option value="" disabled style={{ color: "#16151a", backgroundColor: "#ffffff" }}>
            {placeholder ?? "Select..."}
          </option>
          {options?.map((o) => (
            <option
              key={o.value}
              value={o.value}
              style={{ color: "#16151a", backgroundColor: "#ffffff" }}
            >
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`${base} ${toneClass}`}
        />
      )}
      {error && <span className="font-sans text-[12px] text-red-400">{error}</span>}
    </label>
  );
}

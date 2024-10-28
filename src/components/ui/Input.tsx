interface Props {
  type: string;
  name: string;
  label?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type,
  name,
  label,
  value,
  required,
  placeholder,
  change,
}: Props) {
  return (
    <label htmlFor={name} className="w-full flex flex-col gap-0 items-start">
      {label && <span className="capitalize">{label}</span>}
      <div className="w-full p-2 rounded-xl border-2 border-light focus-within:border-primary transition-colors duration-150 bg-solid dark:bg-solidDark">
        <input
          autoComplete="off"
          type={type}
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={change}
          placeholder={placeholder || ""}
          className="w-full outline-none bg-transparent"
        />
      </div>
    </label>
  );
}

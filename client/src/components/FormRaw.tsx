type Props = {
  label: string;
  defaultValue?: string;
  name: string;
  type: "text" | "email" | "password";
};
export default function FormRaw({ label, defaultValue, name, type }: Props) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        type={type}
        className="form-input"
        id={name}
        name={name}
        required
      />
    </div>
  );
}

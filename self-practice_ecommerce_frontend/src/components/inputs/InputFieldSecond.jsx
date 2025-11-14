export default function InputFieldSecond({
  label = "",
  name = "",
  type = "text",
  defaultValue = "",
  placeholderText = "Enter Something",
  required = false,
  disable = false,
  updaterFunction = () => {},
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholderText}
        required={required}
        disabled={disable}
        onChange={updaterFunction}
        className="w-[300px] px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

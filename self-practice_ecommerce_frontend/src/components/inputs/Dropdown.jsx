export default function Dropdown({
  name = "",
  defaultValue = "",
  required = false,
  updaterFunction = () => {},
  values = [],
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      required={required}
      onChange={updaterFunction}
    >
      {values.map((value, index) => {
        return (
          <option value={value} key={index}>
            {value}
          </option>
        );
      })}
    </select>
  );
}

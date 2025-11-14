export default function Dropdown({
  name = "",
  defaultValue = "",
  required = false,
  updaterFunction = () => {},
  values = [],
  style = "",
}) {
  return (
    <select
      className={style}
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

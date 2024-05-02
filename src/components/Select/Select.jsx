const Select = ({ name, value, options, onChange }) => {
  return (
    <select className="dropdown" name={name} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

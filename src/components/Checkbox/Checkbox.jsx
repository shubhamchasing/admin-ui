const Checkbox = ({ handleSelect, isSelected, id = null }) => {
  const handleOnChange = (event) => {
    handleSelect(event.target.checked, id);
  };
  return (
    <input
      type="checkbox"
      className="custom-checkbox"
      checked={isSelected}
      onChange={handleOnChange}
    />
  );
};

export default Checkbox;

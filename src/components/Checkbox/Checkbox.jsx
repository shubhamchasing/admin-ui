import { useEffect, useRef } from "react";
import "./style.css"
const Checkbox = ({
  handleSelect,
  isSelected,
  id = null,
  indeterminate = false,
}) => {
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleOnChange = (event) => {
    // console.log(event);
    handleSelect(event.target.checked, id);
  };

  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={isSelected}
        onChange={handleOnChange}
        ref={checkboxRef}
      />
     </label>
  );
};

export default Checkbox;

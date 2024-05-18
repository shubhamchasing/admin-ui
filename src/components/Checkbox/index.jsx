import { useEffect, useRef } from "react";
import "./style.css";

const Checkbox = ({
  onChange,
  checked = false,
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
    onChange(event.target.checked, id);
  };

  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={checked}
        onChange={handleOnChange}
        ref={checkboxRef}
      />
    </label>
  );
};

export default Checkbox;

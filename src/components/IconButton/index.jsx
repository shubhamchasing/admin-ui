import "./style.css"

const IconButton = ({
  icon,
  className,
  onClick,
  id = null,
  data = null,
  isDisabled = false,
}) => {
  const handleOnClick = () => {
    onClick(id, data);
  };

  return (
    <button
      type="button"
      className={`icon-btn ${className}`}
      disabled={isDisabled}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;

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
  // console.log(id,icon, className);
  return (
    <button
      type="button"
      className={`${className}`}
      disabled={isDisabled}
      onClick={handleOnClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;

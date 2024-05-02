const Button = ({ children, onClick, isDisabled = false, className }) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

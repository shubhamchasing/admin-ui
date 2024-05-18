import "./style.css";

const Button = ({ children, onClick, disabled = false, className }) => {
  return (
    <button
      type="button"
      className={`btn ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

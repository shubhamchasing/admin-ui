const Button = ({ children, onClick, isDisabled }) => {
  return (
    <button type="button" disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

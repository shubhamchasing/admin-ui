const FeedbackScreen = ({
  title,
  message,
  showButton,
  buttonText,
  onClick,
}) => {
  return (
    <div className="feedback-screen">
      <div className="feedback-screen-content">
        <h2>{title}</h2>
        <p>{message}</p>
        {showButton && <button onClick={onClick}>{buttonText}</button>}
      </div>
    </div>
  );
};

export default FeedbackScreen;

import Button from "../Button/Button";

import "./style.css"

const FeedbackScreen = ({
  title,
  message,
  showButton,
  buttonText,
  onClick,
}) => {
  return (
    <div className="feedback-screen">
        <h2>{title}</h2>
        <p>{message}</p>
        {showButton && (
          <Button className="feedback-screen-btn" onClick={onClick}>
            {buttonText}
          </Button>
        )}
    </div>
  );
};

export default FeedbackScreen;

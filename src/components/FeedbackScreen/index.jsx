import Button from "../Button";

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
          <Button className="btn-primary" onClick={onClick}>
            {buttonText}
          </Button>
        )}
    </div>
  );
};

export default FeedbackScreen;

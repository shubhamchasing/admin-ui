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
      {/* <div className="feedback-screen-content"> */}
        <h2>{title}</h2>
        <p>{message}</p>
        {showButton && (
          <Button className="feedback-screen-btn" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      {/* </div> */}
    </div>
  );
};

export default FeedbackScreen;

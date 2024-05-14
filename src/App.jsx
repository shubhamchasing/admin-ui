import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import FeedbackScreen from "./components/FeedbackScreen/FeedbackScreen";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="app">
      <ErrorBoundary
        fallback={
          <FeedbackScreen
            title="Error"
            message="Something went wrong, please try again later."
          />
        }
      >
        <Dashboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;

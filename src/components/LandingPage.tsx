import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate("/app");
  };

  return (
    <div className="landing-page">
      <div className="landing-background-image"></div>
      <div className="landing-overlay">
        <div className="landing-text-message">
          <h1 className="landing-text-message1">
            Learn About Bacteria Cell Growth Today
          </h1>
          <button className="landing-text-message2" onClick={handleProceed}>
            Click Here
          </button>
        </div>
        <img
          src="/images/botanist2.jpg"
          alt="Lecturer"
          className="lecturer-image"
        />
      </div>
    </div>
  );
};

export default LandingPage;

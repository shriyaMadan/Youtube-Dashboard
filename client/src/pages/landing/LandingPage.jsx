import React from "react";
import { Card } from "../../components/card/Card";
import "./landingpage.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="card-container">
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
};

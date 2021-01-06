import React from "react";
import { Card } from "../../components/card/Card";

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="card-container">
        <Card />
        <Card />
      </div>
    </div>
  );
};

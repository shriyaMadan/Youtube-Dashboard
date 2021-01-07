import React from "react";
import { Card } from "../../components/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEye, faVideo } from "@fortawesome/free-solid-svg-icons";
import "./landingpage.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="card-container">
        <div className="card-container">
          <Card>
            <div className="card-head">
              <img
                className="channel-image"
                src="https://pbs.twimg.com/profile_images/870589688465182720/RhRnOiGG_400x400.jpg"
                alt=""
              />
              <div className="channel-main">
                <h1 className="channel-name">Tanmay Bhat</h1>
                <p className="channel-description">
                  This is the most awesome channel on Youtube
                </p>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <div className="card-stats">
                <FontAwesomeIcon
                  className="channel-stats-icon"
                  icon={faUsers}
                />
                <div className="channel-stats-num">784,899,200</div>
              </div>
              <hr />
              <div className="card-stats">
                <FontAwesomeIcon className="channel-stats-icon" icon={faEye} />
                <div className="channel-stats-num">784,899</div>
              </div>
              <hr />
              <div className="card-stats">
                <FontAwesomeIcon
                  className="channel-stats-icon"
                  icon={faVideo}
                />
                <div className="channel-stats-num">784,899,200</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="card-head">
              <img
                className="channel-image"
                src="https://pbs.twimg.com/profile_images/870589688465182720/RhRnOiGG_400x400.jpg"
                alt=""
              />
              <div className="channel-main">
                <h1 className="channel-name">Tanmay Bhat</h1>
                <p className="channel-description">
                  This is the most awesome channel on Youtube
                </p>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <div className="card-stats">
                <FontAwesomeIcon
                  className="channel-stats-icon"
                  icon={faUsers}
                />
                <div className="channel-stats-num">784,899,200</div>
              </div>
              <hr />
              <div className="card-stats">
                <FontAwesomeIcon className="channel-stats-icon" icon={faEye} />
                <div className="channel-stats-num">784,899</div>
              </div>
              <hr />
              <div className="card-stats">
                <FontAwesomeIcon
                  className="channel-stats-icon"
                  icon={faVideo}
                />
                <div className="channel-stats-num">784,899,200</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

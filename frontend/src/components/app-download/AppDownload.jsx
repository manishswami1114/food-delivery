import React from "react";
import playstore from "../../assets/play_store.png";
import appstore from "../../assets/app_store.png";
import "./AppDownload.css";
const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>For better experience download our DineDivine App</p>
      <div className="platforms">
        <img src={playstore} alt="" />
        <img src={appstore} alt="" />
      </div>
    </div>
  );
};

export default AppDownload;

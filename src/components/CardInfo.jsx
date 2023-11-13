import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, btnTxt, link }) => (
  <div className="info-box">
    <p className="sm:text-xl font-medium text-center"> {text}</p>
    <Link to="/about" className="neo-brutalism-white neo-btn">
      {btnTxt}
      <img src={arrow} className="w-4 h-4 object-contain " />
    </Link>
  </div>
);

const infoContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I'am <span className="font-semibold">Arifin Widyatmoko</span>👋
      <br />A Software Engineer from Indonesia 🇮🇩
      <br />
      Drag your mouse to enjoy my world, have fun ! 😊
    </h1>
  ),
  2: (
    <InfoBox
      text="worked in Transfez as Front-end Developer and willing to learn about many skills"
      link="/about"
      btnTxt="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Led multiple project before, curious about the impact ?"
      link="/project"
      btnTxt="Visit my Portofolio"
    />
  ),
  4: (
    <InfoBox
      text="worked in Transfez as Front-end Developer and willing to learn about many skills"
      link="/contact"
      btnTxt="Learn more"
    />
  ),
};

const CardInfo = ({ currentStage }) => {
  return infoContent[currentStage] || null;
};

export default CardInfo;

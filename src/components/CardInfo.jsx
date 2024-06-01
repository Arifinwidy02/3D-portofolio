import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, btnTxt, link }) => (
  <div className="info-box">
    <p className="sm:text-xl font-medium text-center"> {text}</p>
    <Link
      to={link}
      className="neo-brutalism-white neo-btn"
      // target="_blank"
    >
      {/* <a target="_blank"> */}
      {btnTxt}
      {/* </a> */}
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
      text="Embark on a Journey to Uncover the Layers of My Story – Click the Button Below to Explore More About Me"
      link="/about"
      btnTxt="About Me"
    />
  ),
  3: (
    <InfoBox
      text="Step into the Gallery of My Achievements – Click Below to Explore My Diverse Portfolio"
      link="/projects"
      btnTxt="Visit my Portofolio"
    />
  ),
  4: (
    <InfoBox
      text="Let's Connect! Click Below to Reach Out and Start a Conversation – Visit My Contact Page on the Website."
      link="/contact"
      btnTxt="Keep in Touch !"
    />
  ),
};

const CardInfo = ({ currentStage }) => {
  return infoContent[currentStage] || null;
};

export default CardInfo;

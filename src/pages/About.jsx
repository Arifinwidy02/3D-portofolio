import React from "react";
import { skills, experiences } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CTA from "../components/CTA";

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hallo, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Arifin
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>A Software Engineer from Indonesia 🇮🇩</p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skill</h3>
        <div className="mt-16 flex flex-wrap gap-8">
          {skills.map(({ imageUrl, name }) => (
            <div
              className="block-contain w-20 h-20 flex justify-center items-center flex-col
            "
            >
              <div className="btn-back rounded-xl" />
              <div className="btn-front flex justify-center items-center rounded-xl">
                <img src={imageUrl} alt={name} className=" object-contain" />
              </div>
              <p className="text-center">{name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="subhead-text">My Experiences</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>I've worked in Tech company and non-tech Company</p>
        </div>
        <VerticalTimeline>
          {experiences.map(
            ({ title, company_name, points, date, icon, iconBg }) => (
              <VerticalTimelineElement
                key={company_name}
                date={date}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={icon}
                      alt={company_name}
                      className="w-[60%] h-[60%] object object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: iconBg,
                  boxShadow: "none",
                }}
                iconStyle={{ background: iconBg }}
              >
                <div>
                  <h3 className="text-black text-xl font-semibold font-poppins mb-2">
                    {title}
                  </h3>
                  <p
                    className="text-black-500 font-medium font-base"
                    style={{ margin: 0 }}
                  >
                    {company_name}
                  </p>
                </div>
                {points.map((point, index) => (
                  <ul className="list-disc my-5 ml-4 space-y-2">
                    <li
                      key={`experience-point-${index}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  </ul>
                ))}
              </VerticalTimelineElement>
            )
          )}
        </VerticalTimeline>
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default About;

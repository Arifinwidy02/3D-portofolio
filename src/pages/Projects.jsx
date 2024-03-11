import React from "react";
import { projects } from "../constants";
console.log("projects:", projects);
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import CTA from "../components/CTA";

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Projects
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>I've projects mobile and web developer</p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map(({ name, iconUrl, theme, description, link }) => (
          <div className="lg:[400px] w-full" key={name}>
            <div className="block-container h-12 w-12">
              <div className={`btn-back rounded-xl ${theme}`}>
                <div className="btn-front flex justify-center items-center rounded-xl">
                  <img
                    src={iconUrl}
                    alt="Project Icon"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col ">
              <h4 className="mt-2 font-poppins font-semibold">{name}</h4>
              <p className="text-slate-500 mt-2">{description}</p>
              <div className="flex flex-row mt-3">
                <Link
                  to={link}
                  className="font-semibold text-blue-600"
                  target="_blank"
                >
                  Live Link
                </Link>
                <img src={arrow} alt="arrow" className="ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default Projects;
